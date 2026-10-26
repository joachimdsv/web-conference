/*
 * Noyau partagé : état de la présentation, synchronisation entre fenêtres
 * (BroadcastChannel) et médiathèque locale (IndexedDB).
 */
(function () {
  const DECK = window.DECK;
  const N = DECK.slideCount;

  // ---------- Utilitaires ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const uid = (p = 'm') => p + '-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmtTime = (s) => {
    if (!isFinite(s) || s < 0) s = 0;
    s = Math.floor(s);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    const mm = String(m).padStart(2, '0'), ss = String(sec).padStart(2, '0');
    return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slideCfg = (n) => DECK.slides[n] || {};
  const slideTitle = (n) => slideCfg(n).title || `Diapo ${n}`;

  // ---------- Stockage local tolérant ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('wc:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('wc:' + k, JSON.stringify(v)); } catch {} },
  };

  // ---------- Types de médias ----------
  function youtubeId(url) {
    const m = String(url).match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function kindFromName(name, mime = '') {
    if (mime.startsWith('video/')) return 'video';
    if (mime.startsWith('image/')) return 'image';
    if (mime.startsWith('audio/')) return 'audio';
    const ext = String(name).split(/[?#]/)[0].split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'mov', 'm4v', 'ogv', 'mkv'].includes(ext)) return 'video';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg', 'bmp'].includes(ext)) return 'image';
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(ext)) return 'audio';
    return null;
  }
  function kindFromUrl(url) {
    if (youtubeId(url)) return 'youtube';
    return kindFromName(url) || 'web';
  }
  const KIND_ICON = { video: '🎬', image: '🖼️', audio: '🎵', youtube: '▶️', web: '🌐' };

  // ---------- Médiathèque (IndexedDB, partagée entre les fenêtres du même site) ----------
  const DB_NAME = 'web-conference', DB_STORE = 'media';
  let dbp = null;
  function db() {
    if (!dbp) dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(DB_STORE, { keyPath: 'id' });
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function tx(mode, fn) {
    const d = await db();
    return new Promise((res, rej) => {
      const t = d.transaction(DB_STORE, mode);
      const out = fn(t.objectStore(DB_STORE));
      t.oncomplete = () => res(out && 'result' in out ? out.result : out);
      t.onerror = () => rej(t.error);
    });
  }
  const presetMedia = () => (DECK.media || []).map((m) => ({
    id: 'preset:' + m.id, name: m.name || m.src, kind: m.kind || kindFromUrl(m.src), url: m.src, preset: true,
  }));
  const library = {
    async list() {
      let items = [];
      try { items = await tx('readonly', (s) => s.getAll()); } catch (e) { console.warn('IndexedDB indisponible', e); }
      items.sort((a, b) => (a.added || 0) - (b.added || 0));
      return presetMedia().concat(items);
    },
    async get(id) {
      if (String(id).startsWith('preset:')) return presetMedia().find((m) => m.id === id) || null;
      try { return (await tx('readonly', (s) => s.get(id))) || null; } catch { return null; }
    },
    async addFile(file) {
      const item = { id: uid('f'), name: file.name || 'Collage', kind: kindFromName(file.name || '', file.type) || 'image', blob: file, added: Date.now() };
      await tx('readwrite', (s) => s.put(item));
      return item;
    },
    async addUrl(url, name) {
      const item = { id: uid('u'), name: name || url, kind: kindFromUrl(url), url, added: Date.now() };
      await tx('readwrite', (s) => s.put(item));
      return item;
    },
    async rename(id, name) {
      const item = await this.get(id);
      if (!item || item.preset) return;
      item.name = name;
      await tx('readwrite', (s) => s.put(item));
    },
    async remove(id) { if (!String(id).startsWith('preset:')) await tx('readwrite', (s) => s.delete(id)); },
  };
  // URL lisible par <video>/<img> pour un élément de la médiathèque (avec cache).
  const urlCache = new Map();
  function mediaSrc(item) {
    if (!item) return '';
    if (item.url) return item.url;
    if (!urlCache.has(item.id)) urlCache.set(item.id, URL.createObjectURL(item.blob));
    return urlCache.get(item.id);
  }

  // ---------- État partagé ----------
  const initialState = () => ({
    slide: 1,
    blank: null,          // null | 'black' | 'white' | 'pause'
    pauseText: 'Pause — on reprend dans quelques minutes',
    overlay: null,        // null | {kind:'media', id, name, mediaKind} | {kind:'message', text, style} | {kind:'share'}
    countdown: null,      // null | {end, total, big}
    reveals: {},          // 'slide:elId' -> index du choix affiché
    zones: {},            // 'slide:elId' -> id de média
    zoom: null,           // null | {x, y, s}
    rev: 0,
  });

  function reduce(st, a) {
    const s = { ...st };
    switch (a.type) {
      case 'goto': {
        const n = clamp(a.n | 0, 1, N);
        if (n !== s.slide) { s.slide = n; s.zoom = null; }
        break;
      }
      case 'next':
        if (s.overlay) s.overlay = null;
        else if (s.blank) s.blank = null;
        else if (s.slide < N) { s.slide++; s.zoom = null; }
        break;
      case 'prev':
        if (s.overlay) s.overlay = null;
        else if (s.blank) s.blank = null;
        else if (s.slide > 1) { s.slide--; s.zoom = null; }
        break;
      case 'blank': s.blank = s.blank === a.mode ? null : a.mode; break;
      case 'pauseText': s.pauseText = a.text; break;
      case 'overlay': s.overlay = a.value; break;
      case 'countdown': s.countdown = a.value; break;
      case 'reveal': {
        s.reveals = { ...s.reveals };
        const k = a.slide + ':' + a.el;
        if (a.value == null) delete s.reveals[k]; else s.reveals[k] = a.value;
        break;
      }
      case 'revealAll': {
        s.reveals = { ...s.reveals };
        for (const el of slideCfg(a.slide).elements || []) {
          if (el.type !== 'answer') continue;
          const k = a.slide + ':' + el.id;
          if (a.hide) delete s.reveals[k]; else s.reveals[k] = el.answer ?? 0;
        }
        break;
      }
      case 'zone': {
        s.zones = { ...s.zones };
        const k = a.slide + ':' + a.el;
        if (a.mediaId) s.zones[k] = a.mediaId; else delete s.zones[k];
        break;
      }
      case 'zoom': s.zoom = a.value; break;
      case 'replace': return { ...a.state };
      default: return st;
    }
    s.rev = (st.rev || 0) + 1;
    return s;
  }

  // ---------- Bus de synchronisation ----------
  // Chaque fenêtre garde une copie de l'état ; une action est appliquée localement
  // puis diffusée, et toutes les fenêtres appliquent le même réducteur.
  function createBus(role) {
    const me = uid(role);
    const listeners = { state: [], event: [] };
    let state = store.get('state', null) || initialState();
    if (state.slide > N) state.slide = 1;
    let ch = null;
    try { ch = new BroadcastChannel('web-conference'); } catch (e) { console.warn('BroadcastChannel indisponible', e); }

    const emitState = (origin) => listeners.state.forEach((f) => f(state, origin));
    const post = (msg) => { if (ch) ch.postMessage({ ...msg, from: me, role }); };

    function apply(action, origin) {
      const next = reduce(state, action);
      if (next === state) return;
      state = next;
      if (role === 'regie' || role === 'ecran') store.set('state', state);
      emitState(origin || 'local');
    }

    const bus = {
      id: me, role,
      get state() { return state; },
      dispatch(action) { apply(action); post({ t: 'action', action }); },
      // Événements éphémères (laser, dessin, commandes vidéo, statut…)
      send(type, data = {}) { post({ t: 'event', type, data }); },
      on(kind, fn) { listeners[kind].push(fn); },
      // Relaie une action venue d'ailleurs (télécommande) vers les autres fenêtres
      relay(action) { bus.dispatch(action); },
    };

    if (ch) ch.onmessage = (e) => {
      const m = e.data;
      if (!m || m.from === me) return;
      if (m.t === 'action') apply(m.action, 'remote');
      else if (m.t === 'event') listeners.event.forEach((f) => f(m.type, m.data, m));
      else if (m.t === 'hello') {
        // Une nouvelle fenêtre arrive : la régie (ou l'écran à défaut) lui donne l'état.
        if (role === 'regie' || (role === 'ecran' && m.role !== 'ecran')) post({ t: 'welcome', to: m.from, state });
        listeners.event.forEach((f) => f('peer', { role: m.role }, m));
      } else if (m.t === 'welcome' && m.to === me) {
        if (m.state && (m.role === 'regie' || m.state.rev > state.rev)) apply({ type: 'replace', state: m.state }, 'remote');
      }
    };
    post({ t: 'hello' });
    return bus;
  }

  // ---------- Raccourcis clavier communs (télécommandes de présentation incluses) ----------
  function bindNavKeys(bus, extra = {}) {
    let typed = '';
    let typedTimer = 0;
    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (['input', 'textarea', 'select'].includes(tag) || e.target.isContentEditable) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key;
      if (extra[k] && extra[k](e) !== false) { e.preventDefault(); return; }
      if (/^[0-9]$/.test(k)) {
        typed += k; clearTimeout(typedTimer); typedTimer = setTimeout(() => (typed = ''), 1500);
        return;
      }
      if (k === 'Enter' && typed) { bus.dispatch({ type: 'goto', n: +typed }); typed = ''; e.preventDefault(); return; }
      switch (k) {
        case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
          bus.dispatch({ type: 'next' }); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
          bus.dispatch({ type: 'prev' }); break;
        case 'Home': bus.dispatch({ type: 'goto', n: 1 }); break;
        case 'End': bus.dispatch({ type: 'goto', n: N }); break;
        case 'b': case 'B': case '.': bus.dispatch({ type: 'blank', mode: 'black' }); break;
        case 'w': case 'W': case ',': bus.dispatch({ type: 'blank', mode: 'white' }); break;
        case 'p': case 'P': bus.dispatch({ type: 'blank', mode: 'pause' }); break;
        case 'Escape':
          if (bus.state.overlay) bus.dispatch({ type: 'overlay', value: null });
          else if (bus.state.zoom) bus.dispatch({ type: 'zoom', value: null });
          else if (bus.state.blank) bus.dispatch({ type: 'blank', mode: bus.state.blank });
          else return;
          break;
        default: return;
      }
      e.preventDefault();
    });
  }

  window.WC = {
    DECK, N, $, $$, uid, clamp, fmtTime, esc, slideCfg, slideTitle, store,
    youtubeId, kindFromName, kindFromUrl, KIND_ICON,
    library, mediaSrc, initialState, reduce, createBus, bindNavKeys,
  };
})();
