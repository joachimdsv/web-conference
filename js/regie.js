/* Régie : pilote l'écran public (et relaie la télécommande mobile). */
(function () {
  const { $, $$, DECK, N, library, mediaSrc, fmtTime, esc, slideCfg, slideTitle, store, KIND_ICON } = WC;
  const bus = WC.createBus('regie');
  const stage = WC.Stage($('#cur-host'), { preview: true, noTransition: true });

  document.title = 'Régie — ' + DECK.title;
  $('#deck-title').textContent = DECK.title;
  $('#nav-total').textContent = '/ ' + N;
  $('#nav-input').max = N;

  // ---------- Notifications ----------
  function toast(text, action) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span>${esc(text)}</span>`;
    if (action) {
      const b = document.createElement('button');
      b.className = 'btn btn-sm btn-primary';
      b.textContent = action.label;
      b.onclick = () => { action.run(); t.remove(); };
      t.appendChild(b);
    }
    $('#toasts').appendChild(t);
    setTimeout(() => t.remove(), action ? 8000 : 4500);
  }

  // ---------- Pellicule + grille ----------
  const film = $('#filmstrip');
  const grid = $('#grid');
  for (let n = 1; n <= N; n++) {
    const item = (cls) => {
      const b = document.createElement('button');
      b.className = cls + (slideCfg(n).skip ? ' is-skip' : '');
      b.dataset.n = n;
      b.title = `${n}. ${slideTitle(n)}` + (slideCfg(n).skip ? ' (sautée par défaut)' : '');
      b.innerHTML = `<img src="${DECK.thumb(n)}" alt="" loading="lazy"><span class="num">${n}</span>${(slideCfg(n).elements || []).length ? '<span class="tag">✨</span>' : ''}`;
      b.onclick = () => { bus.dispatch({ type: 'goto', n }); $('#grid-dlg').close(); };
      return b;
    };
    film.appendChild(item('thumb'));
    const g = item('thumb thumb-lg');
    g.insertAdjacentHTML('beforeend', `<span class="cap">${esc(slideTitle(n))}</span>`);
    grid.appendChild(g);
  }

  // ---------- Rendu de l'état ----------
  let lastSlide = 0;
  function render(state) {
    stage.render(state);
    const n = state.slide;
    if (n !== lastSlide) {
      lastSlide = n;
      $('#nav-input').value = n;
      $('#nav-title').textContent = slideTitle(n);
      const nx = Math.min(n + 1, N);
      $('#next-img').src = DECK.thumb(nx);
      $('#next-img').style.opacity = n === N ? 0.3 : 1;
      $('#next-num').textContent = n === N ? '(fin)' : `· ${nx}`;
      $('#next-title').textContent = n === N ? 'Dernière diapo' : slideTitle(nx);
      $$('.thumb').forEach((t) => t.classList.toggle('is-current', +t.dataset.n === n));
      film.querySelector(`.thumb[data-n="${n}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      loadNotes();
      setTool(tool === 'zoom' ? 'none' : tool);
    }
    $('#nav-prev').disabled = n === 1 && !state.overlay && !state.blank;
    $$('[data-blank]').forEach((b) => b.classList.toggle('is-on', state.blank === b.dataset.blank));
    const badges = [];
    if (state.overlay) badges.push({ message: '💬 Message à l\'écran', share: '🖥️ Partage à l\'écran', qr: '📱 QR code à l\'écran' }[state.overlay.kind] || (KIND_ICON[state.overlay.mediaKind] || '') + ' Média à l\'écran');
    if (state.blank) badges.push({ black: '⬛ Écran noir', white: '⬜ Écran blanc', pause: '☕ Pause' }[state.blank]);
    if (state.zoom) badges.push('🔍 Zoom ×' + state.zoom.s);
    if (state.countdown) badges.push('⏱️ Compte à rebours');
    $('#cur-badges').innerHTML = badges.map((b) => `<span class="badge">${b}</span>`).join('');
    renderLive(state);
    renderInteractions(state);
    renderSlideMedia();
    $('#pause-text').value !== state.pauseText && document.activeElement !== $('#pause-text') && ($('#pause-text').value = state.pauseText);
    remoteBroadcast();
  }
  bus.on('state', render);

  // ---------- Navigation ----------
  $('#nav-prev').onclick = () => bus.dispatch({ type: 'prev' });
  $('#nav-next').onclick = () => bus.dispatch({ type: 'next' });
  $('#nav-input').onchange = (e) => bus.dispatch({ type: 'goto', n: +e.target.value });
  $$('[data-blank]').forEach((b) => (b.onclick = () => bus.dispatch({ type: 'blank', mode: b.dataset.blank })));
  $('#open-grid').onclick = () => $('#grid-dlg').showModal();
  $$('dialog [data-close]').forEach((b) => (b.onclick = () => b.closest('dialog').close()));
  $$('dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

  // ---------- Ouvrir l'écran public ----------
  let screenWin = null;
  $('#open-screen').onclick = () => {
    if (screenWin && !screenWin.closed) { screenWin.focus(); bus.send('fullscreen'); return; }
    screenWin = window.open('ecran.html', 'webconf-ecran', 'popup,width=1280,height=720');
    if (!screenWin) toast("Le navigateur a bloqué la fenêtre : autorisez les pop-ups ou ouvrez ecran.html dans un nouvel onglet.");
    else toast("Glissez la nouvelle fenêtre sur le projecteur, puis cliquez dedans pour le plein écran.");
  };

  // Présence de l'écran public
  let screenSeen = 0, screenInfo = {};
  function renderScreenStatus() {
    const on = Date.now() - screenSeen < 5000;
    const p = $('#st-screen');
    p.classList.toggle('is-on', on);
    p.classList.toggle('is-warn', on && !screenInfo.activated);
    p.querySelector('span').textContent = !on ? 'Écran public : fermé' : screenInfo.activated ? (screenInfo.fullscreen ? 'Écran public : plein écran' : 'Écran public : connecté') : 'Écran public : cliquez dessus';
  }
  setInterval(renderScreenStatus, 1000);

  // ---------- Outils de pointage ----------
  let tool = 'none', color = '#ff3b5c';
  function setTool(t) {
    tool = t;
    $$('#tools button').forEach((b) => b.classList.toggle('is-on', b.dataset.tool === t));
    $('#cur-host').dataset.tool = t;
    if (t !== 'laser') { bus.send('laser', { p: null }); stage.setLaser(null); }
  }
  $$('#tools button').forEach((b) => (b.onclick = () => setTool(tool === b.dataset.tool ? 'none' : b.dataset.tool)));
  $$('#colors button').forEach((b) => (b.onclick = () => {
    color = b.dataset.color;
    $$('#colors button').forEach((x) => x.classList.toggle('is-on', x === b));
    if (tool === 'none' || tool === 'laser' || tool === 'zoom') setTool('pen');
  }));
  function clearInk() { stage.clearInk(); bus.send('inkClear'); }
  $('#ink-clear').onclick = clearInk;
  $('#ink-undo').onclick = () => { stage.undoInk(); bus.send('inkUndo'); };

  const host = $('#cur-host');
  let drawing = null, lastLaser = 0;
  host.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    const p = stage.toSlide(e);
    if (tool === 'pen' || tool === 'hl') {
      host.setPointerCapture(e.pointerId);
      drawing = { id: WC.uid('s'), c: tool === 'hl' ? (color === '#ff3b5c' ? '#ffd23f' : color) : color, w: tool === 'hl' ? 0.022 : 0.0045, hl: tool === 'hl', pts: [p] };
      stage.strokeStart(drawing);
      bus.send('inkStart', drawing);
    } else if (tool === 'zoom') {
      const z = bus.state.zoom;
      bus.dispatch({ type: 'zoom', value: z ? null : { x: p[0], y: p[1], s: 2 } });
    }
  });
  host.addEventListener('pointermove', (e) => {
    if (tool === 'laser') {
      const now = performance.now();
      if (now - lastLaser < 16) return;
      lastLaser = now;
      const p = stage.toSlide(e);
      stage.setLaser(p);
      bus.send('laser', { p });
    } else if (drawing) {
      const p = stage.toSlide(e);
      stage.strokePoint(drawing.id, p);
      bus.send('inkPoint', { id: drawing.id, pt: p });
    }
  });
  const endDraw = () => { drawing = null; };
  host.addEventListener('pointerup', endDraw);
  host.addEventListener('pointercancel', endDraw);
  host.addEventListener('pointerleave', () => { if (tool === 'laser') { stage.setLaser(null); bus.send('laser', { p: null }); } });
  host.addEventListener('wheel', (e) => {
    if (tool !== 'zoom') return;
    e.preventDefault();
    const p = stage.toSlide(e);
    const z = bus.state.zoom;
    const s = WC.clamp(Math.round(((z ? z.s : 1) + (e.deltaY < 0 ? 0.5 : -0.5)) * 2) / 2, 1, 4);
    bus.dispatch({ type: 'zoom', value: s <= 1 ? null : { x: z ? z.x : p[0], y: z ? z.y : p[1], s } });
  }, { passive: false });

  // ---------- Notes ----------
  const notesEl = $('#notes');
  const notesStore = store.get('notes', {});
  function loadNotes() {
    const n = bus.state.slide;
    notesEl.value = notesStore[n] ?? slideCfg(n).notes ?? '';
  }
  notesEl.addEventListener('input', () => {
    notesStore[bus.state.slide] = notesEl.value;
    store.set('notes', notesStore);
    remoteBroadcast();
  });
  const notesFor = (n) => notesStore[n] ?? slideCfg(n).notes ?? '';

  // ---------- Interactions de la diapo (quiz, zones) ----------
  let libItems = [];
  function renderInteractions(state) {
    const n = state.slide;
    const cfg = slideCfg(n);
    const list = cfg.elements || [];
    const box = $('#interactions');
    const answers = list.filter((e) => e.type === 'answer' || e.type === 'cover');
    const zones = list.filter((e) => e.type === 'zone');
    let html = '';
    if (cfg.links?.length) {
      html += `<div class="inter"><div class="inter-head"><h3>🔗 Ouvrir pour la démo</h3></div><div class="links">${cfg.links
        .map((l) => `<a class="btn btn-sm" href="${esc(l.url)}" target="webconf-demo" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div></div>`;
    }
    if (cfg.prompts?.length) {
      html += `<div class="inter"><div class="inter-head"><h3>📋 Prompts à copier</h3></div>${cfg.prompts.map((p, i) => `
        <div class="prompt-item"><div class="prompt-head"><span class="inter-label">${esc(p.label)}</span>
        <button class="btn btn-sm btn-primary" data-copy="${i}">Copier</button></div>
        <div class="prompt-text">${esc(p.text)}</div></div>`).join('')}</div>`;
    }
    if (list.length) {
      html += '<div class="inter"><div class="inter-head"><h3>✨ Interactions</h3>';
      if (answers.length) html += '<button class="btn btn-sm btn-primary" data-all="show">Tout révéler</button><button class="btn btn-sm" data-all="hide">Tout masquer</button>';
      html += '</div>';
      for (const z of zones) {
        const def = z.default && libItems.find((m) => m.id === 'preset:' + z.default);
        const cur = state.zones[n + ':' + z.id] || (def ? def.id : '');
        const opts = libItems.filter((m) => m.kind === 'image' || m.kind === 'video')
          .map((m) => `<option value="${esc(m.id)}" ${m.id === cur ? 'selected' : ''}>${esc(m.name)}</option>`).join('');
        html += `<div class="inter-row"><span class="inter-label">🖼️ ${esc(z.label || z.id)}</span><span class="inter-zone">
          <select data-zone="${esc(z.id)}"><option value="">— vide —</option>${opts}</select>
          ${cur ? `<button class="icon-btn" data-zone-full="${esc(cur)}" title="Afficher en plein écran (avec le son pour une vidéo)">⛶</button>` : ''}</span></div>`;
      }
      for (const a of answers) {
        const v = state.reveals[n + ':' + a.id];
        html += `<div class="inter-row"><span class="inter-label">${esc(a.label || a.id)}</span><div class="seg seg-sm">
          <button data-reveal="${esc(a.id)}" data-v="" class="${v == null ? 'is-on' : ''}">Masqué</button>
          ${a.choices.map((c, i) => `<button data-reveal="${esc(a.id)}" data-v="${i}" class="${v === i ? 'is-on' : ''}">${esc(c)}${i === a.answer ? ' ✓' : ''}</button>`).join('')}
        </div></div>`;
      }
      if (zones.length) html += '<p class="muted small">Astuce : glissez une image ou une vidéo directement sur une zone de l\'aperçu.</p>';
      html += '</div>';
    }
    box.innerHTML = html;
    box.querySelectorAll('[data-reveal]').forEach((b) => (b.onclick = () =>
      bus.dispatch({ type: 'reveal', slide: n, el: b.dataset.reveal, value: b.dataset.v === '' ? null : +b.dataset.v })));
    box.querySelectorAll('[data-all]').forEach((b) => (b.onclick = () => bus.dispatch({ type: 'revealAll', slide: n, hide: b.dataset.all === 'hide' })));
    box.querySelectorAll('[data-zone]').forEach((s) => (s.onchange = () => bus.dispatch({ type: 'zone', slide: n, el: s.dataset.zone, mediaId: s.value || null })));
    box.querySelectorAll('[data-zone-full]').forEach((b) => (b.onclick = () => {
      const m = libItems.find((x) => x.id === b.dataset.zoneFull);
      if (m) showMedia(m);
    }));
    box.querySelectorAll('[data-copy]').forEach((b) => (b.onclick = () => copyText(cfg.prompts[+b.dataset.copy].text)));
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      document.execCommand('copy'); t.remove();
    }
    toast('Prompt copié : collez-le dans l\'outil d\'IA (Ctrl+V)');
  }
  function revealNext() {
    const n = bus.state.slide;
    const next = (slideCfg(n).elements || []).find((e) => (e.type === 'answer' || e.type === 'cover') && bus.state.reveals[n + ':' + e.id] == null);
    if (next) bus.dispatch({ type: 'reveal', slide: n, el: next.id, value: next.answer ?? 0 });
    return !!next;
  }

  // ---------- Médiathèque ----------
  const pins = store.get('pins', {});
  const slideMediaIds = (n) => [...(slideCfg(n).media || []).map((id) => 'preset:' + id), ...(pins[n] || [])];

  function showMedia(item) {
    bus.dispatch({ type: 'overlay', value: { kind: 'media', id: item.id, name: item.name, mediaKind: item.kind, at: Date.now() } });
  }
  function mediaThumb(m) {
    if (m.kind === 'image') return `<img src="${esc(mediaSrc(m))}" alt="" loading="lazy">`;
    if (m.kind === 'video') return `<video src="${esc(mediaSrc(m))}#t=1" preload="metadata" muted></video>`;
    if (m.kind === 'youtube') return `<img src="https://i.ytimg.com/vi/${WC.youtubeId(m.url)}/mqdefault.jpg" alt="" loading="lazy">`;
    return `<span class="lib-icon">${KIND_ICON[m.kind] || '📄'}</span>`;
  }
  function mediaCard(m, { compact = false } = {}) {
    const n = bus.state.slide;
    const pinned = (pins[n] || []).includes(m.id);
    const zones = (slideCfg(n).elements || []).filter((e) => e.type === 'zone' && (m.kind === 'image' || m.kind === 'video'));
    const live = bus.state.overlay && bus.state.overlay.id === m.id;
    return `<div class="lib-item ${live ? 'is-live' : ''}" data-id="${esc(m.id)}">
      <div class="lib-thumb">${mediaThumb(m)}<span class="lib-kind">${KIND_ICON[m.kind] || ''}</span></div>
      <div class="lib-body">
        <div class="lib-name" title="${esc(m.name)}">${esc(m.name)}</div>
        <div class="lib-actions">
          <button class="btn btn-sm btn-primary" data-act="show">${live ? '● À l\'écran' : '▶ Afficher'}</button>
          ${zones.map((z) => `<button class="btn btn-sm" data-act="zone" data-zone="${esc(z.id)}" title="Placer dans ${esc(z.label || z.id)}">→ ${esc(z.id)}</button>`).join('')}
          ${compact ? '' : `<button class="icon-btn" data-act="pin" title="${pinned ? 'Retirer de cette diapo' : 'Épingler à cette diapo'}">${pinned ? '📌' : '📍'}</button>`}
          ${compact || m.preset ? '' : '<button class="icon-btn" data-act="rename" title="Renommer">✎</button><button class="icon-btn" data-act="del" title="Supprimer">🗑</button>'}
        </div>
      </div>
    </div>`;
  }
  function bindCards(root) {
    root.querySelectorAll('.lib-item').forEach((card) => {
      const m = libItems.find((x) => x.id === card.dataset.id);
      if (!m) return;
      card.querySelectorAll('[data-act]').forEach((b) => (b.onclick = async () => {
        const n = bus.state.slide;
        switch (b.dataset.act) {
          case 'show': showMedia(m); break;
          case 'zone': bus.dispatch({ type: 'zone', slide: n, el: b.dataset.zone, mediaId: m.id }); break;
          case 'pin': {
            const list = pins[n] || (pins[n] = []);
            const i = list.indexOf(m.id);
            i >= 0 ? list.splice(i, 1) : list.push(m.id);
            store.set('pins', pins);
            renderLibrary();
            break;
          }
          case 'rename': {
            const name = prompt('Nouveau nom :', m.name);
            if (name) { await library.rename(m.id, name); refreshLibrary(); }
            break;
          }
          case 'del':
            if (confirm(`Supprimer « ${m.name} » de la médiathèque ?`)) { await library.remove(m.id); refreshLibrary(); }
            break;
        }
      }));
    });
  }
  function renderLibrary() {
    const lib = $('#lib');
    lib.innerHTML = libItems.length ? libItems.map((m) => mediaCard(m)).join('') : '<p class="muted empty">Aucun média pour l\'instant.</p>';
    bindCards(lib);
    $('#media-count').textContent = libItems.length || '';
    renderSlideMedia();
  }
  function renderSlideMedia() {
    const ids = slideMediaIds(bus.state.slide);
    const items = ids.map((id) => libItems.find((m) => m.id === id)).filter(Boolean);
    const box = $('#slide-media');
    box.innerHTML = items.length ? `<h3 class="sub">🎬 Médias de cette diapo</h3>${items.map((m) => mediaCard(m, { compact: true })).join('')}` : '';
    bindCards(box);
  }
  async function refreshLibrary() {
    libItems = await library.list();
    renderLibrary();
    renderInteractions(bus.state);
    remoteBroadcast(true);
  }
  async function addFiles(files, opts = {}) {
    const added = [];
    for (const f of files) {
      if (!WC.kindFromName(f.name || '', f.type)) { toast(`Format non pris en charge : ${f.name}`); continue; }
      try { added.push(await library.addFile(f)); } catch (e) { toast(`Impossible d'enregistrer ${f.name} : ${e.message || e}`); }
    }
    if (!added.length) return [];
    await refreshLibrary();
    if (opts.zone) bus.dispatch({ type: 'zone', slide: bus.state.slide, el: opts.zone, mediaId: added[0].id });
    else if (added.length === 1) toast(`« ${added[0].name} » ajouté à la médiathèque`, { label: '▶ Afficher', run: () => showMedia(added[0]) });
    else toast(`${added.length} médias ajoutés`);
    return added;
  }
  $('#file-input').onchange = (e) => { addFiles([...e.target.files]); e.target.value = ''; };
  $('#url-form').onsubmit = async (e) => {
    e.preventDefault();
    const url = $('#url-input').value.trim();
    if (!url) return;
    const item = await library.addUrl(url);
    $('#url-input').value = '';
    await refreshLibrary();
    if (item.kind === 'web') toast('Page web ajoutée (certains sites refusent de s\'afficher dans un cadre).');
  };

  // Glisser-déposer (n'importe où) — sur une zone de l'aperçu, l'image y est placée.
  let dragDepth = 0;
  window.addEventListener('dragenter', (e) => { if (e.dataTransfer?.types?.includes('Files')) { dragDepth++; document.body.classList.add('is-dragging'); } });
  window.addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; document.body.classList.remove('is-dragging'); } });
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDepth = 0;
    document.body.classList.remove('is-dragging');
    const files = [...(e.dataTransfer?.files || [])];
    if (!files.length) {
      const url = e.dataTransfer?.getData('text/uri-list') || e.dataTransfer?.getData('text/plain');
      if (url && /^https?:/.test(url)) library.addUrl(url.trim()).then(refreshLibrary);
      return;
    }
    let zone = null;
    if (host.contains(e.target)) {
      const [x, y] = stage.toSlide(e);
      const z = (slideCfg(bus.state.slide).elements || []).find((el) => el.type === 'zone'
        && x * 100 >= el.rect[0] && x * 100 <= el.rect[0] + el.rect[2] && y * 100 >= el.rect[1] && y * 100 <= el.rect[1] + el.rect[3]);
      if (z) zone = z.id;
    }
    addFiles(files, { zone });
  });
  // Coller une image (ex. : image générée pendant une démo)
  document.addEventListener('paste', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'textarea' || (tag === 'input' && e.target.type !== 'range')) return;
    const files = [...(e.clipboardData?.files || [])];
    if (files.length) {
      e.preventDefault();
      addFiles(files.map((f, i) => (f.name && f.name !== 'image.png') ? f : new File([f], `Collage ${new Date().toLocaleTimeString('fr-FR')}${i ? ' ' + i : ''}.${(f.type.split('/')[1] || 'png')}`, { type: f.type })));
      return;
    }
    const text = e.clipboardData?.getData('text/plain')?.trim();
    if (text && /^https?:\/\/\S+$/.test(text)) {
      e.preventDefault();
      library.addUrl(text).then(async (item) => { await refreshLibrary(); toast('Lien ajouté', { label: '▶ Afficher', run: () => showMedia(item) }); });
    }
  });

  // ---------- Média en cours + contrôles vidéo ----------
  let vstat = null;
  function renderLive(state) {
    const ov = state.overlay;
    $('#live').hidden = !ov;
    if (!ov) { vstat = null; return; }
    const label = ov.kind === 'message' ? '💬 Message : ' + ov.text
      : ov.kind === 'share' ? '🖥️ Partage de fenêtre'
      : ov.kind === 'qr' ? '📱 QR code : ' + ov.url
      : (KIND_ICON[ov.mediaKind] || '') + ' ' + (ov.name || 'Média');
    $('#live-label').textContent = label;
    $('#vctl').hidden = !(ov.kind === 'media' && ['video', 'audio', 'youtube'].includes(ov.mediaKind));
    $$('.lib-item').forEach((c) => c.classList.toggle('is-live', ov.kind === 'media' && c.dataset.id === ov.id));
  }
  $('#live-close').onclick = () => {
    if (bus.state.overlay?.kind === 'share') sharer.stop();
    bus.dispatch({ type: 'overlay', value: null });
  };
  const video = (d) => bus.send('video', d);
  $$('[data-v]').forEach((b) => (b.onclick = () => video({ cmd: b.dataset.v, d: +b.dataset.d || 0 })));
  $('#v-toggle').onclick = () => video({ cmd: 'toggle' });
  $('#v-mute').onclick = () => video({ cmd: 'mute', m: !(vstat && vstat.muted) });
  $('#v-vol').oninput = (e) => video({ cmd: 'volume', v: +e.target.value });
  $('#v-loop').onchange = (e) => video({ cmd: 'loop', on: e.target.checked });
  let seeking = false;
  $('#v-seek').addEventListener('pointerdown', () => (seeking = true));
  $('#v-seek').addEventListener('change', (e) => { seeking = false; if (vstat?.d) video({ cmd: 'seek', t: (+e.target.value / 1000) * vstat.d }); });
  function renderVideoStatus() {
    const s = vstat;
    if (!s) return;
    $('#v-toggle').textContent = s.paused ? '▶' : '⏸';
    $('#v-mute').textContent = s.muted ? '🔇' : '🔊';
    $('#v-time').textContent = fmtTime(s.t);
    $('#v-dur').textContent = fmtTime(s.d);
    if (!seeking && s.d) $('#v-seek').value = Math.round((s.t / s.d) * 1000);
    if (document.activeElement !== $('#v-vol')) $('#v-vol').value = s.vol ?? 1;
    $('#v-loop').checked = !!s.loop;
  }

  // ---------- Événements venant de l'écran public ----------
  bus.on('event', (type, d) => {
    switch (type) {
      case 'screen':
        if (d.closed) { screenSeen = 0; } else { screenSeen = Date.now(); screenInfo = d; }
        renderScreenStatus();
        remoteBroadcast();
        break;
      case 'videoStatus': vstat = d; renderVideoStatus(); remoteSend({ t: 'video', s: d }); break;
      case 'notice': toast(d.text); break;
      case 'peer':
        if (d.role === 'ecran') setTimeout(() => bus.send('inkSync', { slide: bus.state.slide, strokes: stage.strokes }), 300);
        break;
    }
  });
  bus.send('ping');

  // ---------- Outils : message, compte à rebours, partage, pause ----------
  const presets = ['Posez vos questions !', 'Levez la main : IA ou pas IA ?', 'Démo en direct 🚀', 'Merci !'];
  $('#msg-presets').innerHTML = presets.map((p) => `<button class="chip">${esc(p)}</button>`).join('');
  $$('#msg-presets .chip').forEach((c) => (c.onclick = () => { $('#msg-text').value = c.textContent; showMessage(); }));
  function showMessage() {
    const text = $('#msg-text').value.trim();
    if (!text) return $('#msg-text').focus();
    bus.dispatch({ type: 'overlay', value: { kind: 'message', text, style: $('#msg-style').value } });
  }
  $('#msg-show').onclick = showMessage;
  $('#msg-hide').onclick = () => bus.state.overlay?.kind === 'message' && bus.dispatch({ type: 'overlay', value: null });

  const startCountdown = (sec) => bus.dispatch({ type: 'countdown', value: { end: Date.now() + sec * 1000, total: sec, big: $('#cd-big').checked } });
  $$('[data-cd]').forEach((b) => (b.onclick = () => startCountdown(+b.dataset.cd)));
  $('#cd-stop').onclick = () => bus.dispatch({ type: 'countdown', value: null });
  $('#cd-add').onclick = () => {
    const cd = bus.state.countdown;
    if (!cd) return startCountdown(30);
    const end = Math.max(cd.end, Date.now()) + 30000;
    bus.dispatch({ type: 'countdown', value: { ...cd, end, total: Math.max(cd.total, (end - Date.now()) / 1000) } });
  };
  $('#cd-big').onchange = () => bus.state.countdown && bus.dispatch({ type: 'countdown', value: { ...bus.state.countdown, big: $('#cd-big').checked } });

  const sharer = WC.share.createSender(bus, {
    onEnd() {
      $('#share-start').disabled = false;
      $('#share-stop').disabled = true;
      if (bus.state.overlay?.kind === 'share') bus.dispatch({ type: 'overlay', value: null });
    },
  });
  $('#share-start').onclick = async () => {
    try {
      await sharer.start();
      $('#share-start').disabled = true;
      $('#share-stop').disabled = false;
      bus.dispatch({ type: 'overlay', value: { kind: 'share', at: Date.now() } });
    } catch (e) {
      if (e.name !== 'NotAllowedError') toast('Partage impossible : ' + (e.message || e));
    }
  };
  $('#share-stop').onclick = () => sharer.stop();

  $('#qr-show').onclick = () => {
    let url = $('#qr-url').value.trim();
    if (!url) return $('#qr-url').focus();
    if (!/^[a-z]+:/i.test(url)) url = 'https://' + url;
    bus.dispatch({ type: 'overlay', value: { kind: 'qr', url, title: $('#qr-title').value.trim() } });
  };
  $('#qr-hide').onclick = () => bus.state.overlay?.kind === 'qr' && bus.dispatch({ type: 'overlay', value: null });

  $('#pause-text').onchange = (e) => bus.dispatch({ type: 'pauseText', text: e.target.value });
  $('#pause-show').onclick = () => bus.dispatch({ type: 'blank', mode: 'pause' });

  // ---------- Onglets ----------
  $$('.tabs [data-tab]').forEach((t) => (t.onclick = () => {
    $$('.tabs [data-tab]').forEach((x) => x.classList.toggle('is-on', x === t));
    $$('.tab-panel').forEach((p) => (p.hidden = p.dataset.panel !== t.dataset.tab));
    store.set('tab', t.dataset.tab);
  }));
  $(`.tabs [data-tab="${store.get('tab', 'slide')}"]`)?.click();

  // ---------- Chrono ----------
  const timer = store.get('timer', { start: null, acc: 0 });
  const elapsed = () => timer.acc + (timer.start ? Date.now() - timer.start : 0);
  const targetMs = (DECK.durationMinutes || 60) * 60000;
  $('#t-target').textContent = fmtTime(targetMs / 1000);
  function timerToggle() {
    if (timer.start) { timer.acc += Date.now() - timer.start; timer.start = null; } else timer.start = Date.now();
    store.set('timer', timer);
    tickTimer();
    remoteBroadcast();
  }
  function timerReset() {
    timer.acc = 0;
    timer.start = timer.start ? Date.now() : null;
    store.set('timer', timer);
    tickTimer();
    remoteBroadcast();
  }
  $('#t-toggle').onclick = timerToggle;
  $('#t-reset').onclick = timerReset;
  function tickTimer() {
    const ms = elapsed();
    $('#t-elapsed').textContent = fmtTime(ms / 1000);
    $('#t-toggle').textContent = timer.start ? '⏸' : '▶';
    $('#t-bar').style.width = Math.min(100, (ms / targetMs) * 100) + '%';
    $('#timer').classList.toggle('is-over', ms > targetMs);
    $('#timer').classList.toggle('is-running', !!timer.start);
    $('#t-clock').textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    renderPace(ms);
    const cd = bus.state.countdown;
    $('#cd-local').textContent = cd ? (cd.end > Date.now() ? '⏳ ' + fmtTime(Math.ceil((cd.end - Date.now()) / 1000)) : '⌛ terminé') : '';
  }
  setInterval(tickTimer, 500);

  // Avance / retard par rapport aux minutes prévues dans deck.js (début de la diapo courante)
  function renderPace(ms) {
    const el = $('#t-pace');
    let planned = 0;
    for (let n = 1; n < bus.state.slide; n++) planned += slideCfg(n).minutes || 0;
    if (!ms || !Object.values(DECK.slides).some((s) => s.minutes)) { el.textContent = ''; return; }
    const diff = ms / 60000 - planned;
    const abs = Math.round(Math.abs(diff));
    el.textContent = `Prévu ici : ${fmtTime(planned * 60)} · ` + (abs < 1 ? 'à l\'heure ✓' : diff > 0 ? `${abs} min de retard` : `${abs} min d'avance`);
    el.className = 'timer-pace' + (diff > 2 ? ' is-late' : diff < -2 ? ' is-early' : '');
  }

  // ---------- Télécommande mobile (PeerJS / WebRTC) ----------
  let peer = null, conns = [];
  const remoteUrl = () => new URL('telecommande.html', location.href).href.split('#')[0] + '#' + store.get('peerId');
  function remoteStatus() {
    const n = conns.filter((c) => c.open).length;
    const p = $('#st-remote');
    p.classList.toggle('is-on', n > 0);
    p.classList.toggle('is-warn', !!peer && !peer.open);
    p.querySelector('span').textContent = n ? `Télécommande : ${n} connectée${n > 1 ? 's' : ''}` : peer ? 'Télécommande : en attente' : 'Télécommande';
    $('#remote-state').textContent = !peer ? '' : !peer.open ? 'Connexion au relais…' : n ? `✅ ${n} téléphone(s) connecté(s)` : 'Prêt : en attente d\'un téléphone…';
  }
  function startRemote() {
    if (peer && !peer.destroyed) return;
    if (!window.Peer) { $('#remote-state').textContent = 'Bibliothèque PeerJS introuvable.'; return; }
    if (!store.get('peerId')) store.set('peerId', 'wc-' + Math.random().toString(36).slice(2, 12));
    store.set('remoteOn', true);
    peer = new Peer(store.get('peerId'), { debug: 0 });
    peer.on('open', remoteStatus);
    peer.on('disconnected', () => { remoteStatus(); setTimeout(() => peer && !peer.destroyed && peer.reconnect(), 2000); });
    peer.on('error', (err) => {
      if (err.type === 'unavailable-id') { store.set('peerId', null); peer.destroy(); peer = null; startRemote(); renderQr(); return; }
      if (err.type === 'network' || err.type === 'server-error') $('#remote-state').textContent = 'Relais injoignable (connexion internet ?)';
      remoteStatus();
    });
    peer.on('connection', (conn) => {
      conns.push(conn);
      conn.on('open', () => { remoteStatus(); remoteBroadcast(true, conn); toast('📱 Télécommande connectée'); });
      conn.on('data', (msg) => onRemote(msg, conn));
      conn.on('close', () => { conns = conns.filter((c) => c !== conn); remoteStatus(); });
    });
    remoteStatus();
  }
  function renderQr() {
    const url = remoteUrl();
    $('#remote-link').value = url;
    if (!window.qrcode) return;
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    $('#qr').innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
  }
  $('#open-remote').onclick = () => {
    startRemote();
    renderQr();
    if (location.protocol === 'file:') $('#remote-state').textContent = '⚠️ Le site est ouvert en local (file://) : le téléphone ne pourra pas ouvrir ce lien. Utilisez la version en ligne (GitHub Pages).';
    $('#remote-dlg').showModal();
  };
  $('#remote-copy').onclick = () => { navigator.clipboard?.writeText($('#remote-link').value); toast('Lien copié'); };
  $('#remote-new').onclick = () => {
    if (!confirm('Créer un nouveau lien ? Les télécommandes actuelles seront déconnectées.')) return;
    store.set('peerId', null);
    if (peer) peer.destroy();
    peer = null; conns = [];
    startRemote();
    renderQr();
  };
  if (store.get('remoteOn')) startRemote();

  function remoteSend(msg, only) {
    for (const c of only ? [only] : conns) if (c.open) try { c.send(msg); } catch {}
  }
  let rbTimer = 0;
  function remoteBroadcast(full, only) {
    if (!conns.length && !only) return;
    const send = () => {
      const s = bus.state;
      const msg = {
        t: 'state', state: s,
        notes: notesFor(s.slide),
        timer: { ...timer, now: Date.now(), target: targetMs },
        screen: Date.now() - screenSeen < 5000,
      };
      if (full) {
        msg.deck = { title: DECK.title, n: N, titles: Array.from({ length: N }, (_, i) => slideTitle(i + 1)), elements: Object.fromEntries(Object.entries(DECK.slides).filter(([, v]) => v.elements).map(([k, v]) => [k, v.elements])) };
        msg.library = libItems.map((m) => ({ id: m.id, name: m.name, kind: m.kind, slide: Object.keys(pins).filter((k) => pins[k].includes(m.id)).map(Number) }));
      }
      remoteSend(msg, only);
      if (vstat) remoteSend({ t: 'video', s: vstat }, only);
    };
    if (full || only) return send();
    clearTimeout(rbTimer);
    rbTimer = setTimeout(send, 30);
  }
  const REMOTE_ACTIONS = ['goto', 'next', 'prev', 'blank', 'overlay', 'countdown', 'reveal', 'revealAll', 'zoom'];
  function onRemote(msg, conn) {
    if (!msg || typeof msg !== 'object') return;
    switch (msg.t) {
      case 'hello': remoteBroadcast(true, conn); break;
      case 'action': if (msg.action && REMOTE_ACTIONS.includes(msg.action.type)) bus.dispatch(msg.action); break;
      case 'show': { const m = libItems.find((x) => x.id === msg.id); if (m) showMedia(m); break; }
      case 'video': video(msg.cmd); break;
      case 'laser': stage.setLaser(msg.p); bus.send('laser', { p: msg.p }); break;
      case 'ink': if (msg.cmd === 'clear') clearInk(); break;
      case 'timer': msg.cmd === 'reset' ? timerReset() : timerToggle(); break;
    }
  }

  // ---------- Raccourcis clavier ----------
  WC.bindNavKeys(bus, {
    l: () => setTool(tool === 'laser' ? 'none' : 'laser'),
    d: () => setTool(tool === 'pen' ? 'none' : 'pen'),
    h: () => setTool(tool === 'hl' ? 'none' : 'hl'),
    z: () => setTool(tool === 'zoom' ? 'none' : 'zoom'),
    c: clearInk,
    k: () => { if (!bus.state.overlay) return false; video({ cmd: 'toggle' }); },
    r: revealNext,
    g: () => ($('#grid-dlg').open ? $('#grid-dlg').close() : $('#grid-dlg').showModal()),
    t: timerToggle,
    '?': () => $('#help-dlg').showModal(),
    Escape: () => {
      if (tool !== 'none' && !bus.state.overlay && !bus.state.zoom && !bus.state.blank) { setTool('none'); return; }
      return false;
    },
  });
  $('#open-help').onclick = () => $('#help-dlg').showModal();

  refreshLibrary().then(() => render(bus.state));
  render(bus.state);
  tickTimer();
})();
