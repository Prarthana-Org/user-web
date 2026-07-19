import React, { useEffect, useRef } from "react";

const THREE_URL =
  (typeof window !== 'undefined' && window.__resources && window.__resources.threeJs) ||
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

let _threeP = null;
function loadThree() {
  if (typeof window !== 'undefined' && window.THREE) return Promise.resolve();
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

function dotTexture(THREE, soft) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(soft ? 0.25 : 0.45, 'rgba(255,255,255,' + (soft ? 0.55 : 0.9) + ')');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function buildScene(el, THREE, L) {
  const BL = L ? THREE.NormalBlending : THREE.AdditiveBlending;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  if (L) {
    renderer.setClearColor(0xfff5eb, 1);
  } else {
    renderer.setClearColor(0x000000, 0);
  }
  renderer.domElement.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block;';
  el.insertBefore(renderer.domElement, el.firstChild);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 1.12, 3.6); camera.lookAt(0, 1.05, 0);
  
  const dotHard = dotTexture(THREE, false), dotSoft = dotTexture(THREE, true);

  const sky = new THREE.Group(); scene.add(sky);
  function starLayer(count, rMin, rMax, size, tint) {
    const sp = new Float32Array(count * 3), sc = new Float32Array(count * 3);
    for (let si = 0; si < count; si++) {
      const u = Math.random() * 2 - 1, ph = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      const r = rMin + Math.random() * (rMax - rMin);
      sp[si * 3] = r * s * Math.cos(ph); sp[si * 3 + 1] = r * u * 0.85 + 1.0; sp[si * 3 + 2] = r * s * Math.sin(ph);
      const b = 0.4 + Math.random() * 0.6, c = tint[Math.floor(Math.random() * tint.length)];
      sc[si * 3] = c[0] * b; sc[si * 3 + 1] = c[1] * b; sc[si * 3 + 2] = c[2] * b;
    }
    const g2 = new THREE.BufferGeometry();
    g2.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    g2.setAttribute('color', new THREE.BufferAttribute(sc, 3));
    const m2 = new THREE.PointsMaterial({ size, vertexColors: true, map: dotHard, transparent: true, depthWrite: false, blending: BL, sizeAttenuation: true });
    sky.add(new THREE.Points(g2, m2)); return m2;
  }
  const tints = L
    ? [[0.95, 0.45, 0.15], [1.0, 0.65, 0.2], [0.95, 0.75, 0.1], [0.85, 0.35, 0.1]]
    : [[0.8, 0.85, 1], [1, 0.95, 0.8], [0.7, 0.75, 1], [1, 1, 1]];
  const sl1 = starLayer(L ? 350 : 700, 9, 15, 0.06, tints);
  const sl2 = starLayer(L ? 250 : 500, 7, 12, 0.045, tints);
  const sl3 = starLayer(L ? 150 : 300, 6, 10, 0.09, L ? [[0.9, 0.5, 0.15]] : [[0.9, 0.78, 0.5], [0.75, 0.7, 1]]);
  function nebTexture(c1, c2) {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g3 = c.getContext('2d');
    for (let n = 0; n < 26; n++) {
      const nx = 40 + Math.random() * 176, ny = 40 + Math.random() * 176, nr = 25 + Math.random() * 60;
      const ng = g3.createRadialGradient(nx, ny, 0, nx, ny, nr);
      ng.addColorStop(0, (Math.random() < 0.6 ? c1 : c2) + '0.06)'); ng.addColorStop(1, c1 + '0)');
      g3.fillStyle = ng; g3.beginPath(); g3.arc(nx, ny, nr, 0, 7); g3.fill();
    }
    return new THREE.CanvasTexture(c);
  }
  const nebDefs = L
    ? [[-6, 4.5, -9, 9, 'rgba(255,170,100,', 'rgba(255,200,120,'], [6.5, -1, -10, 11, 'rgba(255,140,80,', 'rgba(255,180,100,'], [1, 6.5, -11, 12, 'rgba(255,190,120,', 'rgba(255,160,90,'], [-4, -3.5, -9, 8, 'rgba(255,150,70,', 'rgba(255,210,130,']]
    : [[-6, 4.5, -9, 9, 'rgba(110,90,220,', 'rgba(60,120,200,'], [6.5, -1, -10, 11, 'rgba(150,80,190,', 'rgba(80,60,180,'], [1, 6.5, -11, 12, 'rgba(50,110,190,', 'rgba(120,100,230,'], [-4, -3.5, -9, 8, 'rgba(190,140,70,', 'rgba(150,80,190,']];
  const nebulae = [];
  nebDefs.forEach((nb) => {
    const m3 = new THREE.SpriteMaterial({ map: nebTexture(nb[4], nb[5]), transparent: true, opacity: L ? 0.4 : 0.85, depthWrite: false, blending: BL });
    const sp3 = new THREE.Sprite(m3); sp3.position.set(nb[0], nb[1], nb[2]); sp3.scale.setScalar(nb[3]);
    sp3.material.rotation = Math.random() * Math.PI; sky.add(sp3); nebulae.push(sp3);
  });
  const shootMat = new THREE.SpriteMaterial({ map: dotSoft, color: L ? 0x6a5fd0 : 0xdfe8ff, transparent: true, opacity: 0, depthWrite: false, blending: BL });
  const shoot = new THREE.Sprite(shootMat); shoot.scale.set(0.5, 0.06, 1); sky.add(shoot);
  let shootT = -2;
  const shootDir = new THREE.Vector3(), shootPos = new THREE.Vector3();
  const trailMats = [];
  for (let tr2 = 0; tr2 < 5; tr2++) {
    const tm = new THREE.SpriteMaterial({ map: dotSoft, color: L ? 0x9a8fe0 : 0xaebcf5, transparent: true, opacity: 0, depthWrite: false, blending: BL });
    const ts = new THREE.Sprite(tm); ts.scale.setScalar(0.12 - tr2 * 0.018); sky.add(ts); trailMats.push(ts);
  }

  // interaction (parallax mouse)
  let mx = 0, my = 0;
  const onMove = (e) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove);

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  let raf = 0, alive = true;
  function tick() {
    if (!alive) return;
    const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
    
    sky.rotation.y += (mx * 0.12 - sky.rotation.y) * dt * 1.5;
    sky.rotation.x += (my * 0.07 - sky.rotation.x) * dt * 1.5;
    sky.rotation.z = t * 0.004;
    sl1.opacity = (L ? 0.5 : 0.75) + Math.sin(t * 1.7) * 0.25;
    sl2.opacity = (L ? 0.45 : 0.7) + Math.sin(t * 2.3 + 2) * 0.25;
    sl3.opacity = (L ? 0.55 : 0.8) + Math.sin(t * 1.1 + 4) * 0.2;
    nebulae.forEach((nb2, ni) => { nb2.material.rotation += dt * 0.01 * (ni % 2 ? 1 : -1); nb2.material.opacity = 0.7 + Math.sin(t * 0.4 + ni * 2) * 0.18; });
    shootT -= dt;
    if (shootT < -1.6) {
      shootPos.set(-8 + Math.random() * 4, 4 + Math.random() * 3, -8 - Math.random() * 3);
      shootDir.set(9 + Math.random() * 4, -(2.5 + Math.random() * 2), 0);
      shootMat.rotation = Math.atan2(shootDir.y, shootDir.x);
      shootT = 1.1 + Math.random() * 5;
      shoot.userData.life = 1.1;
    }
    if (shoot.userData.life > 0) {
      shoot.userData.life -= dt;
      const lf = shoot.userData.life / 1.1, adv = 1 - lf;
      shoot.position.set(shootPos.x + shootDir.x * adv, shootPos.y + shootDir.y * adv, shootPos.z);
      shootMat.opacity = Math.sin(Math.min(1, Math.max(0, lf)) * Math.PI) * 0.9;
      for (let tr3 = 0; tr3 < trailMats.length; tr3++) {
        const lag = (tr3 + 1) * 0.035, adv2 = Math.max(0, adv - lag);
        trailMats[tr3].position.set(shootPos.x + shootDir.x * adv2, shootPos.y + shootDir.y * adv2, shootPos.z);
        trailMats[tr3].material.opacity = shootMat.opacity * (1 - tr3 * 0.18) * 0.6;
      }
    } else { shootMat.opacity = 0; trailMats.forEach((tm2) => { tm2.material.opacity = 0; }); }
    
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  return function cleanup() {
    alive = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}

export default function GalaxyBackground(props) {
  const theme = props && props.theme === 'light' ? 'light' : 'dark';
  const style = (props && props.style) || {};
  const hostRef = useRef(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const L = theme === 'light';
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
      style={{ 
        position: 'fixed', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -10, 
        pointerEvents: 'none', 
        ...style 
      }}
    />
  );
}
