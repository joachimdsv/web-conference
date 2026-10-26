/*
 * Rendu d'une diapo avec ses couches interactives (éléments révélés, zones média,
 * encre, pointeur laser, zoom). Utilisé par l'écran public et par la régie.
 */
(function () {
  const { DECK, slideCfg, library, mediaSrc, esc } = WC;
  const CHOICE_COLORS = ['#22c58b', '#ff7a45', '#7c6cff', '#ffc53d'];

  function Stage(host, opts = {}) {
    const el = document.createElement('div');
    el.className = 'stage' + (opts.preview ? ' is-preview' : '');
    el.innerHTML = `
      <div class="stage-inner">
        <img class="slide-img" alt="" draggable="false">
        <img class="slide-img slide-img-next" alt="" draggable="false">
        <div class="stage-els"></div>
        <canvas class="stage-ink"></canvas>
        <div class="stage-laser" hidden></div>
      </div>`;
    host.appendChild(el);
    const inner = el.querySelector('.stage-inner');
    const [imgA, imgB] = el.querySelectorAll('.slide-img');
    const els = el.querySelector('.stage-els');
    const canvas = el.querySelector('.stage-ink');
    const laser = el.querySelector('.stage-laser');
    const ctx = canvas.getContext('2d');

    let front = imgA, back = imgB;
    let slide = 0;
    let strokes = [];
    let lastElsKey = '';

    function fit() {
      const cw = host.clientWidth, ch = host.clientHeight;
      if (!cw || !ch) return;
      let w = cw, h = (cw * 9) / 16;
      if (h > ch) { h = ch; w = (ch * 16) / 9; }
      el.style.width = w + 'px';
      el.style.height = h + 'px';
      el.style.setProperty('--sw', w + 'px');
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      redraw();
    }
    new ResizeObserver(fit).observe(host);

    function setSlide(n) {
      if (n === slide) return;
      const first = slide === 0;
      slide = n;
      strokes = [];
      redraw();
      const src = DECK.image(n);
      if (first || opts.noTransition) { front.src = src; return; }
      back.src = src;
      const swap = () => {
        back.classList.add('is-front'); front.classList.remove('is-front');
        [front, back] = [back, front];
      };
      if (back.complete && back.naturalWidth) swap(); else back.onload = () => { back.onload = null; if (back.src.endsWith(src)) swap(); };
    }
    front.classList.add('is-front');

    async function renderEls(state) {
      const list = slideCfg(slide).elements || [];
      const key = slide + '|' + JSON.stringify(list.map((e) => [state.reveals[slide + ':' + e.id], state.zones[slide + ':' + e.id]]));
      if (key === lastElsKey) return;
      lastElsKey = key;
      const parts = await Promise.all(list.map(async (e) => {
        const k = slide + ':' + e.id;
        const [x, y, w, h] = e.rect;
        const pos = `left:${x}%;top:${y}%;width:${w}%;height:${h}%`;
        if (e.type === 'zone') {
          const item = state.zones[k] ? await library.get(state.zones[k]) : null;
          if (!item) return opts.preview ? `<div class="el el-zone is-empty" style="${pos}"><span>${esc(e.label || e.id)}</span></div>` : '';
          const src = esc(mediaSrc(item));
          const media = item.kind === 'video'
            ? `<video src="${src}" muted loop autoplay playsinline></video>`
            : `<img src="${src}" alt="">`;
          return `<div class="el el-zone" style="${pos}">${media}</div>`;
        }
        if (e.type === 'answer') {
          const v = state.reveals[k];
          if (v == null) return opts.preview ? `<div class="el el-answer is-hidden" style="${pos}"></div>` : '';
          const color = CHOICE_COLORS[v % CHOICE_COLORS.length];
          return `<div class="el el-answer${e.pill === 'bottom' ? ' pill-bottom' : ''}" style="${pos};--c:${color}"><span class="el-pill">${esc(e.choices[v])}</span></div>`;
        }
        return '';
      }));
      if (key === lastElsKey) els.innerHTML = parts.join('');
    }

    function render(state) {
      setSlide(state.slide);
      renderEls(state);
      const z = state.zoom;
      inner.style.transformOrigin = z ? `${z.x * 100}% ${z.y * 100}%` : '50% 50%';
      inner.style.transform = z ? `scale(${z.s})` : 'none';
    }

    // ---------- Encre ----------
    function drawStroke(s) {
      const W = canvas.width, H = canvas.height;
      ctx.strokeStyle = s.c;
      ctx.lineWidth = s.w * W;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = s.hl ? 0.35 : 1;
      ctx.beginPath();
      s.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x * W, y * H) : ctx.moveTo(x * W, y * H)));
      if (s.pts.length === 1) ctx.lineTo(s.pts[0][0] * W + 0.1, s.pts[0][1] * H);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokes.forEach(drawStroke);
    }

    return {
      el, inner, render, fit,
      get slide() { return slide; },
      get strokes() { return strokes; },
      setStrokes(list) { strokes = list || []; redraw(); },
      strokeStart(s) { strokes.push({ ...s, pts: s.pts ? [...s.pts] : [] }); redraw(); },
      strokePoint(id, pt) {
        const s = strokes.find((x) => x.id === id);
        if (s) { s.pts.push(pt); redraw(); }
      },
      clearInk() { strokes = []; redraw(); },
      undoInk() { strokes.pop(); redraw(); },
      setLaser(p) {
        if (!p) { laser.hidden = true; return; }
        laser.hidden = false;
        laser.style.left = p[0] * 100 + '%';
        laser.style.top = p[1] * 100 + '%';
      },
      // Convertit un événement pointeur en coordonnées normalisées de la diapo (zoom compris)
      toSlide(ev) {
        const r = inner.getBoundingClientRect();
        return [WC.clamp((ev.clientX - r.left) / r.width, 0, 1), WC.clamp((ev.clientY - r.top) / r.height, 0, 1)];
      },
    };
  }

  WC.Stage = Stage;
})();
