/* Télécommande mobile : se connecte à la régie via PeerJS (WebRTC). */
(function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (s) => { s = Math.max(0, Math.floor(s || 0)); const m = Math.floor(s / 60); return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
  const ICON = { video: '🎬', image: '🖼️', audio: '🎵', youtube: '▶️', web: '🌐' };

  const hostId = decodeURIComponent(location.hash.slice(1));
  let conn = null, peer = null, state = null, deck = null, library = [], timer = null, vstat = null, clockSkew = 0;
  let laserMode = false, zoomMode = false;

  if (!hostId) { $('#r-connect').hidden = false; $('#r-status').textContent = 'Pas de régie'; return; }

  function setStatus(text, ok) {
    $('#r-status').textContent = text;
    $('#r-dot').className = 'r-dot' + (ok ? ' is-on' : '');
  }

  function connect() {
    setStatus('Connexion…', false);
    if (!peer || peer.destroyed) {
      peer = new Peer({ debug: 0 });
      peer.on('open', openConn);
      peer.on('error', (e) => { setStatus(e.type === 'peer-unavailable' ? 'Régie introuvable — nouvel essai…' : 'Erreur : ' + e.type, false); retry(); });
      peer.on('disconnected', () => peer.reconnect());
    } else openConn();
  }
  function openConn() {
    if (conn && conn.open) return;
    conn = peer.connect(hostId, { reliable: true });
    conn.on('open', () => { setStatus('Connectée', true); send({ t: 'hello' }); });
    conn.on('data', onData);
    conn.on('close', () => { setStatus('Déconnectée — nouvel essai…', false); retry(); });
  }
  let retryTimer = 0;
  function retry() { clearTimeout(retryTimer); retryTimer = setTimeout(() => { conn = null; connect(); }, 2500); }
  function send(m) { if (conn && conn.open) conn.send(m); }
  const act = (action) => { send({ t: 'action', action }); navigator.vibrate?.(15); };

  function onData(m) {
    if (m.t === 'state') {
      if (m.deck) deck = m.deck;
      if (m.library) library = m.library;
      state = m.state;
      timer = m.timer;
      clockSkew = Date.now() - m.timer.now;
      render(m);
      if (m.library) renderLib();
      if (m.deck) renderGrid();
    } else if (m.t === 'video') { vstat = m.s; renderVideo(); }
  }

  // ---------- Rendu ----------
  let lastSlide = 0;
  function render(m) {
    $('#r-main').hidden = false;
    const n = state.slide;
    if (n !== lastSlide) {
      lastSlide = n;
      $('#r-img').src = window.DECK ? DECK.image(n) : '';
      $$('.r-grid button').forEach((b) => b.classList.toggle('is-on', +b.dataset.n === n));
    }
    $('#r-num').textContent = `${n} / ${deck ? deck.n : '?'}`;
    $('#r-title').textContent = deck ? deck.titles[n - 1] : '';
    $('#r-notes').innerHTML = m.notes ? esc(m.notes).replace(/\n/g, '<br>') : '<span class="muted">Pas de notes pour cette diapo.</span>';
    $('#r-next').textContent = state.overlay ? 'Fermer ▶' : state.blank ? 'Reprendre ▶' : 'Suivante ▶';
    $$('[data-blank]').forEach((b) => b.classList.toggle('is-on', state.blank === b.dataset.blank));
    const ov = state.overlay;
    $('#r-ov').hidden = !ov && !state.blank;
    $('#r-ov').textContent = ov ? (ov.kind === 'message' ? '💬 ' + ov.text : ov.kind === 'share' ? '🖥️ Partage de fenêtre' : (ICON[ov.mediaKind] || '') + ' ' + (ov.name || 'Média'))
      : state.blank ? { black: '⬛ Écran noir', white: '⬜ Écran blanc', pause: '☕ Pause' }[state.blank] : '';
    const isPlayable = ov && ov.kind === 'media' && ['video', 'audio', 'youtube'].includes(ov.mediaKind);
    $('#r-video').hidden = !isPlayable;
    $('#r-close-ov').hidden = !ov || isPlayable;
    const els = deck && deck.elements[n];
    $('#r-inter').hidden = !(els && els.some((e) => e.type === 'answer'));
    $('#r-zoom-btn').classList.toggle('is-on', !!state.zoom || zoomMode);
    setStatus(m.screen ? 'Connectée · écran public actif' : 'Connectée · écran public fermé', true);
    $$('.r-lib-item').forEach((b) => b.classList.toggle('is-live', !!ov && ov.id === b.dataset.id));
  }
  function renderVideo() {
    if (!vstat) return;
    $('#r-vtoggle').textContent = vstat.paused ? '▶' : '⏸';
    $('#r-vmute').textContent = vstat.muted ? '🔇' : '🔊';
    $('#r-vbar').style.width = vstat.d ? (vstat.t / vstat.d) * 100 + '%' : '0';
    $('#r-vtime').textContent = `${fmt(vstat.t)} / ${fmt(vstat.d)}`;
  }
  function renderLib() {
    $('#r-lib').innerHTML = library.length
      ? library.map((m) => `<button class="r-lib-item" data-id="${esc(m.id)}"><span>${ICON[m.kind] || '📄'}</span><span class="r-lib-name">${esc(m.name)}</span>${m.slide.length ? `<span class="r-lib-tag">diapo ${m.slide.join(', ')}</span>` : ''}</button>`).join('')
      : '<p class="muted">Médiathèque vide. Ajoutez des médias depuis la régie.</p>';
    $$('.r-lib-item').forEach((b) => (b.onclick = () => { send({ t: 'show', id: b.dataset.id }); navigator.vibrate?.(15); }));
  }
  function renderGrid() {
    $('#r-grid').innerHTML = Array.from({ length: deck.n }, (_, i) => i + 1)
      .map((n) => `<button data-n="${n}" class="${state && state.slide === n ? 'is-on' : ''}"><img src="${window.DECK ? DECK.thumb(n) : ''}" alt="" loading="lazy"><span>${n}</span></button>`).join('');
    $$('#r-grid button').forEach((b) => (b.onclick = () => act({ type: 'goto', n: +b.dataset.n })));
  }
  setInterval(() => {
    if (!timer) return;
    const ms = timer.acc + (timer.start ? Date.now() - clockSkew - timer.start : 0);
    $('#r-timer').textContent = fmt(ms / 1000);
    $('#r-timer').classList.toggle('is-over', ms > timer.target);
  }, 500);

  // ---------- Commandes ----------
  $('#r-next').onclick = () => act({ type: 'next' });
  $('#r-prev').onclick = () => act({ type: 'prev' });
  $$('[data-blank]').forEach((b) => (b.onclick = () => act({ type: 'blank', mode: b.dataset.blank })));
  $$('[data-v]').forEach((b) => (b.onclick = () => send({ t: 'video', cmd: { cmd: b.dataset.v, d: +b.dataset.d } })));
  $('#r-vtoggle').onclick = () => send({ t: 'video', cmd: { cmd: 'toggle' } });
  $('#r-vmute').onclick = () => send({ t: 'video', cmd: { cmd: 'mute', m: !(vstat && vstat.muted) } });
  $('#r-vclose').onclick = $('#r-ovclose').onclick = () => act({ type: 'overlay', value: null });
  $('#r-reveal-next').onclick = () => {
    const els = (deck.elements[state.slide] || []).filter((e) => e.type === 'answer');
    const next = els.find((e) => state.reveals[state.slide + ':' + e.id] == null);
    if (next) act({ type: 'reveal', slide: state.slide, el: next.id, value: next.answer ?? 0 });
  };
  $('#r-reveal-all').onclick = () => act({ type: 'revealAll', slide: state.slide });
  $('#r-reveal-hide').onclick = () => act({ type: 'revealAll', slide: state.slide, hide: true });
  $('#r-ttoggle').onclick = () => send({ t: 'timer', cmd: 'toggle' });
  $('#r-treset').onclick = () => send({ t: 'timer', cmd: 'reset' });
  $$('[data-cd]').forEach((b) => (b.onclick = () => act({ type: 'countdown', value: { end: Date.now() - clockSkew + b.dataset.cd * 1000, total: +b.dataset.cd, big: true } })));
  $('#r-cdstop').onclick = () => act({ type: 'countdown', value: null });
  $('#r-clear').onclick = () => send({ t: 'ink', cmd: 'clear' });

  $('#r-laser-btn').onclick = () => { laserMode = !laserMode; zoomMode = false; $('#r-laser-btn').classList.toggle('is-on', laserMode); $('#r-zoom-btn').classList.remove('is-on'); };
  $('#r-zoom-btn').onclick = () => {
    if (state && state.zoom) { act({ type: 'zoom', value: null }); zoomMode = false; }
    else { zoomMode = !zoomMode; laserMode = false; $('#r-laser-btn').classList.remove('is-on'); }
    $('#r-zoom-btn').classList.toggle('is-on', zoomMode);
  };

  // Pointeur laser / zoom au doigt sur l'aperçu
  const slideEl = $('#r-slide');
  const pos = (e) => {
    const r = $('#r-img').getBoundingClientRect();
    return [Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))];
  };
  let lastSend = 0;
  function laserAt(e) {
    const p = pos(e);
    const dot = $('#r-laser');
    dot.hidden = false;
    dot.style.left = p[0] * 100 + '%';
    dot.style.top = p[1] * 100 + '%';
    const now = performance.now();
    if (now - lastSend > 30) { lastSend = now; send({ t: 'laser', p }); }
  }
  slideEl.addEventListener('pointerdown', (e) => {
    if (zoomMode) { const p = pos(e); act({ type: 'zoom', value: { x: p[0], y: p[1], s: 2 } }); zoomMode = false; return; }
    if (!laserMode) return;
    slideEl.setPointerCapture(e.pointerId);
    laserAt(e);
  });
  slideEl.addEventListener('pointermove', (e) => { if (laserMode && e.buttons) laserAt(e); });
  const laserOff = () => { if (!laserMode) return; $('#r-laser').hidden = true; send({ t: 'laser', p: null }); };
  slideEl.addEventListener('pointerup', laserOff);
  slideEl.addEventListener('pointercancel', laserOff);

  // Balayage gauche / droite sur l'aperçu pour changer de diapo
  let sx = null;
  slideEl.addEventListener('touchstart', (e) => { sx = laserMode || zoomMode ? null : e.touches[0].clientX; }, { passive: true });
  slideEl.addEventListener('touchend', (e) => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) act({ type: dx < 0 ? 'next' : 'prev' });
    sx = null;
  });

  $$('.r-tabs button').forEach((b) => (b.onclick = () => {
    $$('.r-tabs button').forEach((x) => x.classList.toggle('is-on', x === b));
    $$('.r-panel').forEach((p) => (p.hidden = p.dataset.rp !== b.dataset.rt));
  }));

  // Garder l'écran du téléphone allumé
  async function wake() { try { await navigator.wakeLock?.request('screen'); } catch {} }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { wake(); if (!conn || !conn.open) connect(); } });
  wake();

  connect();
})();
