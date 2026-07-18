import React from "react";
/*
 * ChakraModel.jsx — Prarthana interactive 3D lattice meditator (React component)
 *
 * Usage:
 *   import { ChakraModel } from './ChakraModel.jsx';
 *   <ChakraModel theme="dark" />   // theme: "dark" (galactic) | "light" (ivory/cosmic)
 *
 * Requires React + three.js (r128). If window.THREE is absent it is loaded from CDN.
 * Fonts used (add to your <head> if not already present):
 *   League Spartan, Manrope, Tiro Devanagari Sanskrit
 */
const THREE_URL =
  (typeof window !== 'undefined' && window.__resources && window.__resources.threeJs) ||
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

let _threeP = null;
function loadThree() {
  
  if (!_threeP)
    _threeP = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = THREE_URL;
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });
  return _threeP;
}

const SCALE = 0.5; // lattice density
// capsule parts: ax,ay,az, bx,by,bz, ra,rb, count
const PARTS = [
  [0, 1.63, 0.01, 0, 1.63, 0.01, 0.16, 0.16, 1900],
  [0, 1.53, 0.06, 0, 1.53, 0.06, 0.115, 0.115, 700],
  [0, 1.47, 0.02, 0, 1.4, 0.0, 0.06, 0.07, 260],
  [0, 1.4, 0, -0.24, 1.3, 0, 0.075, 0.07, 480],
  [0, 1.4, 0, 0.24, 1.3, 0, 0.075, 0.07, 480],
  [-0.27, 1.27, 0.01, -0.27, 1.27, 0.01, 0.095, 0.095, 380],
  [0.27, 1.27, 0.01, 0.27, 1.27, 0.01, 0.095, 0.095, 380],
  [0, 1.32, 0.02, 0, 1.05, 0.05, 0.2, 0.165, 2300],
  [-0.11, 1.2, 0.06, 0.11, 1.2, 0.06, 0.135, 0.135, 800],
  [0, 1.05, 0.04, 0, 0.86, 0.05, 0.155, 0.19, 1300],
  [-0.13, 0.78, 0.02, 0.13, 0.78, 0.02, 0.165, 0.165, 1100],
  [-0.28, 1.25, 0, -0.38, 0.96, 0.09, 0.062, 0.052, 620],
  [0.28, 1.25, 0, 0.38, 0.96, 0.09, 0.062, 0.052, 620],
  [-0.38, 0.96, 0.09, -0.52, 0.7, 0.26, 0.05, 0.042, 620],
  [0.38, 0.96, 0.09, 0.52, 0.7, 0.26, 0.05, 0.042, 620],
  [-0.54, 0.665, 0.3, -0.54, 0.665, 0.3, 0.06, 0.06, 280],
  [0.54, 0.665, 0.3, 0.54, 0.665, 0.3, 0.06, 0.06, 280],
  [-0.1, 0.78, 0.06, -0.52, 0.665, 0.22, 0.115, 0.085, 1350],
  [0.1, 0.78, 0.06, 0.52, 0.665, 0.22, 0.115, 0.085, 1350],
  [-0.52, 0.665, 0.22, 0.16, 0.53, 0.38, 0.07, 0.052, 950],
  [0.52, 0.665, 0.22, -0.16, 0.53, 0.38, 0.07, 0.052, 950],
  [0.21, 0.52, 0.41, 0.21, 0.52, 0.41, 0.062, 0.062, 240],
  [-0.21, 0.52, 0.41, -0.21, 0.52, 0.41, 0.062, 0.062, 240],
];
const CHAKRAS = [
  [0, 1.84, 0.01, '#c4b5fd'], [0, 1.56, 0.17, '#818cf8'], [0, 1.4, 0.11, '#60a5fa'],
  [0, 1.19, 0.2, '#34d399'], [0, 1.01, 0.22, '#fbbf24'], [0, 0.85, 0.24, '#fb923c'],
  [0, 0.63, 0.26, '#f87171'],
];

function segDist(px, py, pz, p) {
  const ax = p[0], ay = p[1], az = p[2], bx = p[3], by = p[4], bz = p[5];
  const abx = bx - ax, aby = by - ay, abz = bz - az;
  const len2 = abx * abx + aby * aby + abz * abz;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * abx + (py - ay) * aby + (pz - az) * abz) / len2));
  const dx = px - (ax + abx * t), dy = py - (ay + aby * t), dz = pz - (az + abz * t);
  return { d: Math.sqrt(dx * dx + dy * dy + dz * dz), t };
}
function sdf(px, py, pz) {
  let m = 1e9;
  for (let i = 0; i < PARTS.length; i++) {
    const p = PARTS[i], r = segDist(px, py, pz, p);
    m = Math.min(m, r.d - (p[6] + (p[7] - p[6]) * r.t));
  }
  return m;
}
function samplePart(p, out, scale) {
  scale = scale || 1;
  let cx = 0, cy = 0, cz = 0;
  for (let tries = 0; tries < 14; tries++) {
    const t = Math.random();
    cx = p[0] + (p[3] - p[0]) * t; cy = p[1] + (p[4] - p[1]) * t; cz = p[2] + (p[5] - p[2]) * t;
    const r = (p[6] + (p[7] - p[6]) * t) * scale;
    const u = Math.random() * 2 - 1, ph = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    const x = cx + r * s * Math.cos(ph), y = cy + r * u, z = cz + r * s * Math.sin(ph);
    if (scale > 1.01 || sdf(x, y, z) > -0.01) { out[0] = x; out[1] = y; out[2] = z; return; }
  }
  out[0] = cx; out[1] = cy; out[2] = cz;
}
function dotTexture(THREE, soft) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  if (soft) {
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gr.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  } else {
    g.beginPath();
    g.arc(64, 64, 50, 0, Math.PI * 2);
    g.fillStyle = 'rgba(255,255,255,1)';
    g.fill();
  }
  return new THREE.CanvasTexture(c);
}
function hexToRgb(h) {
  return [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
}

// Builds the full three.js scene inside `el`. Returns a cleanup fn.
function buildScene(el, THREE, L) {
  const BL = L ? THREE.NormalBlending : THREE.AdditiveBlending;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.domElement.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block; cursor:grab;';
  el.insertBefore(renderer.domElement, el.firstChild);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 1.12, 3.6); camera.lookAt(0, 1.05, 0);
  const group = new THREE.Group(); scene.add(group);
  const fig = new THREE.Group(); group.add(fig);
  const dotHard = dotTexture(THREE, false), dotSoft = dotTexture(THREE, true);
  const tmp = [0, 0, 0];

  // body lattice
  const counts = PARTS.map((p) => Math.round(p[8] * SCALE));
  const total = counts.reduce((a, b) => a + b, 0);
  const bpos = new Float32Array(total * 3), bbase = new Float32Array(total * 3),
    bcol = new Float32Array(total * 3), bph = new Float32Array(total);
  let k = 0;
  PARTS.forEach((p, pi2) => {
    for (let i = 0; i < counts[pi2]; i++) {
      samplePart(p, tmp);
      bpos[k * 3] = bbase[k * 3] = tmp[0]; bpos[k * 3 + 1] = bbase[k * 3 + 1] = tmp[1]; bpos[k * 3 + 2] = bbase[k * 3 + 2] = tmp[2];
      const b = 0.65 + Math.random() * 0.35;
      const cp = L
        ? [[1.0, 0.6, 0.2], [1.0, 0.7, 0.3], [0.95, 0.6, 0.25], [1.0, 0.75, 0.3], [0.95, 0.65, 0.2]]
        : [[0.85, 0.88, 1.0], [0.75, 0.7, 1.0], [1.0, 0.92, 0.72], [0.62, 0.78, 1.0], [0.95, 0.72, 0.95]];
      const cc = cp[Math.floor(Math.random() * cp.length)];
      bcol[k * 3] = cc[0] * b; bcol[k * 3 + 1] = cc[1] * b; bcol[k * 3 + 2] = cc[2] * b;
      bph[k] = Math.random() * Math.PI * 2;
      k++;
    }
  });
  const bg = new THREE.BufferGeometry();
  bg.setAttribute('position', new THREE.BufferAttribute(bpos, 3));
  bg.setAttribute('color', new THREE.BufferAttribute(bcol, 3));
  const bodyMat = new THREE.PointsMaterial({ size: L ? 0.034 : 0.03, vertexColors: true, map: dotHard, transparent: true, depthWrite: false, blending: BL, sizeAttenuation: true, opacity: L ? 0.6 : 1.0 });
  fig.add(new THREE.Points(bg, bodyMat));

  // bright body stars
  const SN = 340, spos9 = new Float32Array(SN * 3), scol9 = new Float32Array(SN * 3);
  for (let s9 = 0; s9 < SN; s9++) {
    const p9 = PARTS[Math.floor(Math.random() * PARTS.length)];
    samplePart(p9, tmp);
    spos9[s9 * 3] = tmp[0]; spos9[s9 * 3 + 1] = tmp[1]; spos9[s9 * 3 + 2] = tmp[2];
    const cs9 = L ? [[1.0, 0.6, 0.2], [1.0, 0.7, 0.3], [1.0, 0.65, 0.25]] : [[1, 1, 1], [1, 0.9, 0.6], [0.75, 0.8, 1]];
    const c9 = cs9[Math.floor(Math.random() * cs9.length)];
    scol9[s9 * 3] = c9[0]; scol9[s9 * 3 + 1] = c9[1]; scol9[s9 * 3 + 2] = c9[2];
  }
  const sg9 = new THREE.BufferGeometry();
  sg9.setAttribute('position', new THREE.BufferAttribute(spos9, 3));
  sg9.setAttribute('color', new THREE.BufferAttribute(scol9, 3));
  const starBodyMat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, map: L ? dotHard : dotSoft, transparent: true, opacity: L ? 0.5 : 0.9, depthWrite: false, blending: BL });
  fig.add(new THREE.Points(sg9, starBodyMat));

  // aura shell
  const AN = 2200, apos = new Float32Array(AN * 3), acol = new Float32Array(AN * 3), abase = new Float32Array(AN * 3);
  const stops = CHAKRAS.map((c) => hexToRgb(c[3]));
  for (let i = 0; i < AN; i++) {
    const p = PARTS[Math.floor(Math.random() * PARTS.length)];
    samplePart(p, tmp, 1.25 + Math.random() * 0.6);
    apos[i * 3] = abase[i * 3] = tmp[0]; apos[i * 3 + 1] = abase[i * 3 + 1] = tmp[1]; apos[i * 3 + 2] = abase[i * 3 + 2] = tmp[2];
    const f = Math.max(0, Math.min(0.999, (tmp[1] - 0.4) / 1.5)) * 6;
    const idx = 6 - f, i0 = Math.floor(idx), i1 = Math.min(6, i0 + 1), ft = idx - i0;
    acol[i * 3] = stops[i0][0] + (stops[i1][0] - stops[i0][0]) * ft;
    acol[i * 3 + 1] = stops[i0][1] + (stops[i1][1] - stops[i0][1]) * ft;
    acol[i * 3 + 2] = stops[i0][2] + (stops[i1][2] - stops[i0][2]) * ft;
  }
  const ag = new THREE.BufferGeometry();
  ag.setAttribute('position', new THREE.BufferAttribute(apos, 3));
  ag.setAttribute('color', new THREE.BufferAttribute(acol, 3));
  const auraMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, map: L ? dotHard : dotSoft, transparent: true, opacity: 0, depthWrite: false, blending: BL });
  auraMat.visible = !L;
  fig.add(new THREE.Points(ag, auraMat));

  // chakra orbs
  const sprites = CHAKRAS.map((c) => {
    const m = new THREE.SpriteMaterial({ map: L ? dotHard : dotSoft, color: new THREE.Color(c[3]), transparent: true, opacity: 0.35, depthWrite: false, blending: BL });
    const s = new THREE.Sprite(m); s.position.set(c[0], c[1], c[2]); s.scale.setScalar(0.09); 
    s.visible = !L;
    fig.add(s); return s;
  });

  // lotus mandala halo
  const petalRing = new THREE.Group();
  const petalMat = new THREE.LineBasicMaterial({ color: L ? 0x8a6fd8 : 0xe6c37a, transparent: true, opacity: 0.5, blending: BL });
  for (let pi = 0; pi < 12; pi++) {
    const pts = [];
    for (let s2 = 0; s2 <= 16; s2++) { const q = s2 / 16; pts.push(new THREE.Vector3(0.075 * Math.sin(Math.PI * q), 0.97 + 0.36 * q, 0)); }
    for (let s3 = 16; s3 >= 0; s3--) { const q2 = s3 / 16; pts.push(new THREE.Vector3(-0.075 * Math.sin(Math.PI * q2), 0.97 + 0.36 * q2, 0)); }
    const pg = new THREE.BufferGeometry().setFromPoints(pts);
    const pl = new THREE.Line(pg, petalMat);
    pl.geometry.translate(0, -1.13, 0);
    pl.rotation.z = (pi * Math.PI) / 6;
    petalRing.add(pl);
  }
  const haloPts = [];
  for (let a = 0; a <= 96; a++) { const t2 = (a / 96) * Math.PI * 2; haloPts.push(new THREE.Vector3(Math.cos(t2) * 0.95, Math.sin(t2) * 0.95, 0)); }
  const haloCircle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(haloPts), new THREE.LineBasicMaterial({ color: L ? 0xcabfe8 : 0x3a4470, transparent: true, opacity: 0.55 }));
  haloCircle.position.set(0, 1.13, -0.42);
  const petalPivot = new THREE.Group();
  petalPivot.add(petalRing); petalPivot.position.set(0, 1.13, -0.42);
  group.add(petalPivot); group.add(haloCircle);

  // atomic orbitals + electrons
  const orbits = new THREE.Group(); orbits.position.y = 1.13; group.add(orbits);
  function makeOrbit(tiltZ, color, ecolor) {
    const holder = new THREE.Group(); holder.rotation.z = tiltZ;
    const spinner = new THREE.Group(); holder.add(spinner);
    const pts = [];
    for (let a = 0; a <= 128; a++) { const t3 = (a / 128) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(t3) * 1.42, Math.sin(t3) * 0.5, 0)); }
    spinner.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })));
    const em = new THREE.SpriteMaterial({ map: dotSoft, color: new THREE.Color(ecolor), transparent: true, opacity: 0.95, depthWrite: false, blending: BL });
    const e = new THREE.Sprite(em); e.scale.setScalar(0.12); e.position.set(1.42, 0, 0); spinner.add(e);
    orbits.add(holder);
    return { spinner, e };
  }
  const oc1 = L ? 0x8a7fd0 : 0x7d8bd4, oe1 = L ? 0x5a4fb0 : 0xb7c3ff;
  const o1 = makeOrbit(1.08, oc1, oe1);
  const o2 = makeOrbit(-1.08, oc1, oe1);
  const o3 = makeOrbit(0, L ? 0xc9a75c : 0x54608f, L ? 0xb0762a : 0xe6c37a); o3.spinner.parent.rotation.x = 1.35;

  // ground glow
  const gc = document.createElement('canvas'); gc.width = gc.height = 128;
  const gg = gc.getContext('2d'), gr = gg.createRadialGradient(64, 64, 0, 64, 64, 64);
  const gcol = L ? 'rgba(130,110,220,' : 'rgba(150,160,255,';
  gr.addColorStop(0, gcol + '0.45)'); gr.addColorStop(0.5, gcol + '0.14)'); gr.addColorStop(1, gcol + '0)');
  gg.fillStyle = gr; gg.fillRect(0, 0, 128, 128);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(1.15, 48), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gc), transparent: true, depthWrite: false }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = 0.4; group.add(ground);

  // interaction
  let hover = 0, hoverTarget = 0, dragging = false, px = 0, py = 0, vx = 0, rx = 0, ry = 0;
  let hoverStart = 0;
  const canvas = renderer.domElement;
  const onEnter = () => { hoverTarget = 1; hoverStart = performance.now(); };
  const onLeave = () => { if (!dragging) hoverTarget = 0; };
  const onDown = (e) => { dragging = true; px = e.clientX; py = e.clientY; vx = 0; canvas.style.cursor = 'grabbing'; canvas.setPointerCapture(e.pointerId); hoverTarget = 1; hoverStart = hoverStart || performance.now(); };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
    ry += dx * 0.008; vx = dx * 0.008;
    rx = Math.max(-0.45, Math.min(0.45, rx + dy * 0.004));
  };
  const onUp = () => { if (!dragging) return; dragging = false; canvas.style.cursor = 'grab'; };
  canvas.addEventListener('pointerenter', onEnter);
  canvas.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  function resize() {
    const w = el.clientWidth || 600, h = el.clientHeight || 500;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize();
  let ro = null;
  if (window.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(el); }

  const clock = new THREE.Clock();
  let raf = 0, alive = true;
  function tick() {
    if (!alive || !el.isConnected) { renderer.dispose(); return; }
    const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
    hover += (hoverTarget - hover) * Math.min(1, dt * 4);
    if (!dragging) {
      vx *= 0.92;
      const sway = Math.sin(t * 0.26) * 0.34;
      ry += vx;
      ry += (sway - ry) * dt * 0.7;
      rx += (Math.sin(t * 0.2) * 0.05 - rx) * dt * 1.0;
    }
    group.rotation.y = ry; group.rotation.x = rx;
    const breath = Math.sin(t * 0.9);
    fig.scale.set(1 + breath * 0.008, 1 + breath * 0.014, 1 + breath * 0.008);
    fig.position.y = breath * 0.008;
    fig.rotation.z = Math.sin(t * 0.45) * 0.014;
    fig.rotation.x = Math.sin(t * 0.32) * 0.01;
    const amp = 0.0035 + hover * 0.0045;
    for (let i2 = 0; i2 < total; i2++) {
      const ph0 = bph[i2], y0 = bbase[i2 * 3 + 1];
      const a2 = amp * (0.5 + Math.min(1, Math.max(0, y0 - 0.4) * 0.6));
      bpos[i2 * 3] = bbase[i2 * 3] + Math.sin(t * 1.7 + ph0) * a2;
      bpos[i2 * 3 + 1] = y0 + Math.sin(t * 1.3 + ph0 * 1.7) * a2;
      bpos[i2 * 3 + 2] = bbase[i2 * 3 + 2] + Math.cos(t * 1.5 + ph0) * a2;
    }
    bg.attributes.position.needsUpdate = true;
    const effHover = L ? 0 : hover;
    auraMat.opacity = effHover * (L ? 0.9 : 0.85);
    auraMat.size = 0.04 + hover * 0.03 + Math.sin(t * 2.4) * 0.006 * hover;
    auraMat.opacity = effHover * (L ? 0.9 : 0.85);
    auraMat.size = 0.04 + effHover * 0.03 + Math.sin(t * 2.4) * 0.006 * effHover;
    const drift = 1 + effHover * 0.1 + Math.sin(t * 1.6) * 0.02 * effHover;
    if (effHover > 0.01) {
      for (let i = 0; i < AN; i++) {
        apos[i * 3] = abase[i * 3] * drift;
        apos[i * 3 + 1] = 1.05 + (abase[i * 3 + 1] - 1.05) * drift + Math.sin(t * 1.3 + i) * 0.008 * effHover;
        apos[i * 3 + 2] = abase[i * 3 + 2] * drift;
      }
      ag.attributes.position.needsUpdate = true;
    }
    for (let j = 0; j < sprites.length; j++) {
      const ph2 = Math.max(0, Math.min(1, effHover * 1.8 - j * 0.11));
      sprites[j].scale.setScalar(0.09 + ph2 * 0.14 + Math.sin(t * 2.2 + j) * 0.012 * ph2);
      sprites[j].material.opacity = 0.3 + ph2 * 0.7;
    }
    bodyMat.size = (L ? 0.034 : 0.03) + effHover * 0.005;
    starBodyMat.opacity = (L ? 0.35 : 0.65) + Math.sin(t * 2.1) * 0.25 + effHover * 0.1;
    starBodyMat.size = 0.05 + Math.sin(t * 1.4) * 0.008 + effHover * 0.012;
    petalPivot.rotation.z = t * 0.06;
    petalMat.opacity = 0.38 + effHover * 0.35 + Math.sin(t * 1.8) * 0.05;
    haloCircle.material.opacity = 0.55 + effHover * 0.45;
    o1.spinner.rotation.z = t * 0.85; o2.spinner.rotation.z = -t * 0.62; o3.spinner.rotation.z = t * 0.45;
    ground.material.opacity = 0.5 + effHover * 0.5;
    
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  return function cleanup() {
    alive = false;
    cancelAnimationFrame(raf);
    if (ro) ro.disconnect();
    canvas.removeEventListener('pointerenter', onEnter);
    canvas.removeEventListener('pointerleave', onLeave);
    canvas.removeEventListener('pointerdown', onDown);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerup', onUp);
    canvas.removeEventListener('pointercancel', onUp);
    renderer.dispose();
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}

function ChakraModel(props) {
  const theme = props && props.theme === 'light' ? 'light' : 'dark';
  const style = (props && props.style) || {};
  const hostRef = React.useRef(null);

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const L = theme === 'light';
    if (!document.getElementById('pr-cursive-font')) {
      const lk = document.createElement('link');
      lk.id = 'pr-cursive-font'; lk.rel = 'stylesheet';
      lk.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700&family=Manrope:wght@400;500;600&family=Tiro+Devanagari+Sanskrit&display=swap';
      document.head.appendChild(lk);
    }
    let cleanup = null;
    let disposed = false;
    loadThree().then(() => {
      if (disposed || !el.isConnected) return;
      cleanup = buildScene(el, window.THREE, L);
    });
    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [theme]);

    return (
    <div 
      ref={hostRef}
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', touchAction: 'none', overflow: 'hidden', ...style }}
    />
  );
}



export default ChakraModel;
