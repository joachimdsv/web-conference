/* Écran public : affiche ce que la régie pilote. */
(function () {
  const { $, DECK, library, mediaSrc, youtubeId, fmtTime, esc } = WC;
  const bus = WC.createBus('ecran');
  const stage = WC.Stage($('#stage-host'));
  const overlayEl = $('#overlay');
  const blankEl = $('#blank');
  const cdEl = $('#countdown');
  const splash = $('#splash');
  let activated = false;
  let overlayKey = '';
  let player = null;        // { kind, el, ... } du média affiché
  let shareStream = null;

  document.title = DECK.title + ' — Écran public';

  // ---------- Démarrage : un clic débloque le son et le plein écran ----------
  function activate() {
    if (activated) return;
    activated = true;
    splash.hidden = true;
    goFullscreen();
    if (player && player.el && player.el.paused === false) player.el.muted = false;
    heartbeat();
  }
  function goFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
  }
  splash.addEventListener('click', activate);
  document.addEventListener('keydown', (e) => { if (!activated && (e.key === 'Enter' || e.key === 'f')) activate(); }, true);
  $('#splash-skip').addEventListener('click', (e) => { e.stopPropagation(); activated = true; splash.hidden = true; heartbeat(); });

  // ---------- Curseur masqué après inactivité ----------
  let cursorTimer = 0;
  document.addEventListener('mousemove', () => {
    document.body.classList.remove('hide-cursor');
    clearTimeout(cursorTimer);
    cursorTimer = setTimeout(() => document.body.classList.add('hide-cursor'), 2000);
  });

  // ---------- Rendu de l'état ----------
  function render(state) {
    stage.render(state);
    // Écran noir / blanc / pause
    blankEl.className = 'blank' + (state.blank ? ' is-' + state.blank : '');
    blankEl.innerHTML = state.blank === 'pause'
      ? `<div class="pause-card"><div class="pause-kicker">${esc(DECK.title)}</div><div class="pause-text">${esc(state.pauseText)}</div><div class="pause-clock" id="pause-clock"></div></div>`
      : '';
    renderOverlay(state.overlay);
    renderCountdown(state.countdown);
  }

  function stopPlayer() {
    if (!player) return;
    if (player.el && player.el.pause) player.el.pause();
    player = null;
  }

  async function renderOverlay(ov) {
    const key = ov ? JSON.stringify(ov) : '';
    if (key === overlayKey) return;
    overlayKey = key;
    stopPlayer();
    overlayEl.className = 'overlay';
    overlayEl.innerHTML = '';
    if (!ov) { sendStatus(); return; }

    if (ov.kind === 'message') {
      overlayEl.classList.add('is-on', 'is-message', 'msg-' + (ov.style || 'center'));
      overlayEl.innerHTML = `<div class="msg">${esc(ov.text).replace(/\n/g, '<br>')}</div>`;
      return;
    }
    if (ov.kind === 'share') {
      overlayEl.classList.add('is-on', 'is-media');
      const v = document.createElement('video');
      v.autoplay = true; v.playsInline = true; v.muted = true;
      v.srcObject = shareStream;
      overlayEl.appendChild(v);
      player = { kind: 'share', el: v };
      if (!shareStream) overlayEl.insertAdjacentHTML('beforeend', '<div class="media-wait">Connexion au partage…</div>');
      return;
    }
    if (ov.kind !== 'media') return;
    const item = await library.get(ov.id);
    if (key !== overlayKey) return;
    overlayEl.classList.add('is-on', 'is-media');
    if (!item) {
      overlayEl.innerHTML = `<div class="media-wait">Média introuvable sur cet ordinateur : ${esc(ov.name || '')}</div>`;
      return;
    }
    const src = mediaSrc(item);
    if (item.kind === 'image') {
      overlayEl.innerHTML = `<img src="${esc(src)}" alt="">`;
    } else if (item.kind === 'video' || item.kind === 'audio') {
      const tag = item.kind === 'video' ? 'video' : 'audio';
      const m = document.createElement(tag);
      m.src = src;
      m.preload = 'auto';
      m.playsInline = true;
      if (item.kind === 'audio') {
        overlayEl.innerHTML = `<div class="audio-card"><div class="audio-icon">🎵</div><div class="audio-name">${esc(item.name)}</div><div class="audio-bar"><span></span></div></div>`;
        m.addEventListener('timeupdate', () => {
          const bar = overlayEl.querySelector('.audio-bar span');
          if (bar && m.duration) bar.style.width = (m.currentTime / m.duration) * 100 + '%';
        });
      }
      overlayEl.appendChild(m);
      player = { kind: item.kind, el: m };
      ['timeupdate', 'play', 'pause', 'ended', 'volumechange', 'loadedmetadata'].forEach((ev) => m.addEventListener(ev, sendStatus));
      if (ov.autoplay !== false) play(m);
    } else if (item.kind === 'youtube') {
      const id = youtubeId(item.url);
      const f = document.createElement('iframe');
      f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      f.src = `https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(location.origin)}`;
      overlayEl.appendChild(f);
      player = { kind: 'youtube', el: null, frame: f, info: {} };
      f.addEventListener('load', () => f.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*'));
    } else {
      overlayEl.innerHTML = `<iframe src="${esc(src)}" allow="autoplay; fullscreen"></iframe>`;
    }
  }

  // Lecture avec son si possible ; sinon en muet et on prévient la régie.
  function play(m) {
    m.muted = false;
    const p = m.play();
    if (p) p.catch(() => {
      m.muted = true;
      m.play().catch(() => {});
      bus.send('notice', { text: "Son bloqué par le navigateur : cliquez une fois sur l'écran public pour l'activer." });
      splash.hidden = false;
      activated = false;
      sendStatus();
    });
  }

  // ---------- Commandes vidéo ----------
  function ytCmd(func, args = []) {
    player?.frame?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  }
  window.addEventListener('message', (e) => {
    if (!player || player.kind !== 'youtube' || !String(e.origin).includes('youtube')) return;
    try {
      const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      if (d.event === 'infoDelivery' && d.info) { Object.assign(player.info, d.info); sendStatus(); }
    } catch {}
  });

  function videoCmd(c) {
    if (!player) return;
    if (player.kind === 'youtube') {
      const info = player.info;
      switch (c.cmd) {
        case 'play': ytCmd('playVideo'); break;
        case 'pause': ytCmd('pauseVideo'); break;
        case 'toggle': ytCmd(info.playerState === 1 ? 'pauseVideo' : 'playVideo'); break;
        case 'seek': ytCmd('seekTo', [c.t, true]); break;
        case 'rel': ytCmd('seekTo', [Math.max(0, (info.currentTime || 0) + c.d), true]); break;
        case 'restart': ytCmd('seekTo', [0, true]); ytCmd('playVideo'); break;
        case 'mute': ytCmd(c.m ? 'mute' : 'unMute'); break;
        case 'volume': ytCmd('setVolume', [Math.round(c.v * 100)]); break;
      }
      return;
    }
    const m = player.el;
    if (!m || !('currentTime' in m)) return;
    switch (c.cmd) {
      case 'play': play(m); break;
      case 'pause': m.pause(); break;
      case 'toggle': m.paused ? play(m) : m.pause(); break;
      case 'seek': m.currentTime = c.t; break;
      case 'rel': m.currentTime = Math.max(0, m.currentTime + c.d); break;
      case 'restart': m.currentTime = 0; play(m); break;
      case 'mute': m.muted = !!c.m; break;
      case 'volume': m.volume = WC.clamp(c.v, 0, 1); break;
      case 'loop': m.loop = !!c.on; break;
    }
    sendStatus();
  }

  let lastStatus = 0;
  function sendStatus(e) {
    const now = performance.now();
    if (e && e.type === 'timeupdate' && now - lastStatus < 200) return;
    lastStatus = now;
    if (!player) return bus.send('videoStatus', null);
    if (player.kind === 'youtube') {
      const i = player.info;
      return bus.send('videoStatus', { kind: 'youtube', t: i.currentTime || 0, d: i.duration || 0, paused: i.playerState !== 1, muted: !!i.muted, vol: (i.volume ?? 100) / 100 });
    }
    const m = player.el;
    if (!m || !('currentTime' in m) || player.kind === 'share') return bus.send('videoStatus', null);
    bus.send('videoStatus', { kind: player.kind, t: m.currentTime, d: m.duration || 0, paused: m.paused, muted: m.muted, vol: m.volume, loop: m.loop, ended: m.ended });
  }

  // ---------- Compte à rebours ----------
  function renderCountdown(cd) {
    cdEl.hidden = !cd;
    if (cd) cdEl.className = 'countdown' + (cd.big ? ' is-big' : '');
    tickCountdown();
  }
  function tickCountdown() {
    const cd = bus.state.countdown;
    if (!cd) return;
    const left = Math.max(0, (cd.end - Date.now()) / 1000);
    cdEl.innerHTML = left > 0
      ? `<div class="cd-time">${fmtTime(Math.ceil(left))}</div><div class="cd-bar"><span style="width:${(left / cd.total) * 100}%"></span></div>`
      : '<div class="cd-time is-done">Temps écoulé !</div>';
  }
  setInterval(() => {
    tickCountdown();
    const pc = document.getElementById('pause-clock');
    if (pc) pc.textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }, 250);

  // ---------- Événements de la régie ----------
  bus.on('state', render);
  bus.on('event', (type, d) => {
    switch (type) {
      case 'laser': stage.setLaser(d.p); break;
      case 'inkStart': stage.strokeStart(d); break;
      case 'inkPoint': stage.strokePoint(d.id, d.pt); break;
      case 'inkClear': stage.clearInk(); break;
      case 'inkUndo': stage.undoInk(); break;
      case 'inkSync': if (d.slide === bus.state.slide) stage.setStrokes(d.strokes); break;
      case 'video': videoCmd(d); break;
      case 'ping': heartbeat(); sendStatus(); break;
      case 'fullscreen': goFullscreen(); break;
    }
  });
  WC.share.createReceiver(bus, (stream) => {
    shareStream = stream;
    if (player && player.kind === 'share') {
      player.el.srcObject = stream;
      overlayEl.querySelector('.media-wait')?.remove();
    }
  });

  function heartbeat() { bus.send('screen', { activated, fullscreen: !!document.fullscreenElement }); }
  setInterval(heartbeat, 2000);
  document.addEventListener('fullscreenchange', heartbeat);
  window.addEventListener('pagehide', () => bus.send('screen', { closed: true }));

  WC.bindNavKeys(bus, {
    f: () => { document.fullscreenElement ? document.exitFullscreen() : goFullscreen(); },
    k: () => videoCmd({ cmd: 'toggle' }),
  });
  // Clic gauche / droit sur l'écran = suivant / précédent (comme PowerPoint)
  $('#stage-host').addEventListener('click', () => activated && bus.dispatch({ type: 'next' }));
  $('#stage-host').addEventListener('contextmenu', (e) => { e.preventDefault(); bus.dispatch({ type: 'prev' }); });

  render(bus.state);
  heartbeat();
})();
