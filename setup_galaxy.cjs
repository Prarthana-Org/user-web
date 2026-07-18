const fs = require('fs');

let src = fs.readFileSync('src/components/ChakraModel3D.jsx', 'utf8');

// --- 1. Create GalaxyBackground.jsx ---
let galaxySrc = src;
galaxySrc = galaxySrc.replace('ChakraModel3D.jsx', 'GalaxyBackground.jsx');
galaxySrc = galaxySrc.replace(/export default ChakraModel;/, 'export default GalaxyBackground;');
galaxySrc = galaxySrc.replace(/function ChakraModel\(/, 'function GalaxyBackground(');

// Remove the text hints in GalaxyBackground
galaxySrc = galaxySrc.replace(/const wordWrap = document.createElement[\s\S]*?el\.appendChild\(hint\);/, '');

// Inside buildScene, we want to REMOVE:
// - the meditator (body lattice, star body, aura shell, chakra orbs, lotus mandala, orbits, ground)
galaxySrc = galaxySrc.replace(/\/\/ body lattice[\s\S]*?\/\/ sky/, '// sky');

// But wait, the `group` was added to `scene`, we still need `group` for rotation if the sky is not attached to group.
// In original: `const sky = new THREE.Group(); scene.add(sky);`
// `group.rotation.y = ry; group.rotation.x = rx;`
// We should remove all references to `group`, `fig`, `bg`, `auraMat`, `sprites`, `bodyMat`, `starBodyMat`, `petalPivot`, `petalMat`, `o1`, `o2`, `o3`, `ground` in tick().
// Instead of complex regex for tick(), let's just rewrite buildScene entirely for GalaxyBackground.

const galaxyBuildScene = `
function buildScene(el, THREE, L) {
  const BL = L ? THREE.NormalBlending : THREE.AdditiveBlending;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.domElement.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block;';
  el.insertBefore(renderer.domElement, el.firstChild);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 1.12, 3.6); camera.lookAt(0, 1.05, 0);
  
  function dotTexture(soft) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(soft ? 0.25 : 0.45, 'rgba(255,255,255,' + (soft ? 0.55 : 0.9) + ')');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }
  const dotHard = dotTexture(false), dotSoft = dotTexture(true);

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
    ? [[0.4, 0.34, 0.78], [0.3, 0.4, 0.75], [0.6, 0.3, 0.62], [0.72, 0.5, 0.2]]
    : [[0.8, 0.85, 1], [1, 0.95, 0.8], [0.7, 0.75, 1], [1, 1, 1]];
  const sl1 = starLayer(L ? 350 : 700, 9, 15, 0.06, tints);
  const sl2 = starLayer(L ? 250 : 500, 7, 12, 0.045, tints);
  const sl3 = starLayer(L ? 150 : 300, 6, 10, 0.09, L ? [[0.5, 0.4, 0.82]] : [[0.9, 0.78, 0.5], [0.75, 0.7, 1]]);
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
    ? [[-6, 4.5, -9, 9, 'rgba(150,120,235,', 'rgba(100,140,225,'], [6.5, -1, -10, 11, 'rgba(200,120,200,', 'rgba(150,120,235,'], [1, 6.5, -11, 12, 'rgba(110,150,230,', 'rgba(170,140,240,'], [-4, -3.5, -9, 8, 'rgba(230,170,90,', 'rgba(200,120,200,']]
    : [[-6, 4.5, -9, 9, 'rgba(110,90,220,', 'rgba(60,120,200,'], [6.5, -1, -10, 11, 'rgba(150,80,190,', 'rgba(80,60,180,'], [1, 6.5, -11, 12, 'rgba(50,110,190,', 'rgba(120,100,230,'], [-4, -3.5, -9, 8, 'rgba(190,140,70,', 'rgba(150,80,190,']];
  const nebulae = [];
  nebDefs.forEach((nb) => {
    const m3 = new THREE.SpriteMaterial({ map: nebTexture(nb[4], nb[5]), transparent: true, opacity: 0.85, depthWrite: false, blending: BL });
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
  let px = 0, py = 0, mx = 0, my = 0;
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
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}
`;

galaxySrc = galaxySrc.replace(/function buildScene\([\s\S]*?function ChakraModel/, galaxyBuildScene + '\nfunction ChakraModel');
galaxySrc = galaxySrc.replace(/cleanup = buildScene\(el, window\.THREE, L, wordWrap, hint\);/, 'cleanup = buildScene(el, window.THREE, L);');
galaxySrc = galaxySrc.replace(/const canvas = renderer\.domElement;/g, ''); 

fs.writeFileSync('src/components/GalaxyBackground.jsx', galaxySrc);


// --- 2. Update ChakraModel3D.jsx ---
let chakraSrc = src;
chakraSrc = chakraSrc.replace(/\/\/ sky[\s\S]*?\/\/ interaction/, '// interaction');

// Remove sky references in tick()
chakraSrc = chakraSrc.replace(/sky\.rotation\.y \+=[\s\S]*?\} else \{ shootMat\.opacity = 0; trailMats\.forEach\(\(tm2\) => \{ tm2\.material\.opacity = 0; \}\); \}/, '');

fs.writeFileSync('src/components/ChakraModel3D.jsx', chakraSrc);
