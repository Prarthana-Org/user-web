const fs = require('fs');

let js = fs.readFileSync('src/components/GalaxyBackground.jsx', 'utf8');

// Set a custom soft background color for light mode instead of being transparent to the stark white body
js = js.replace(
  /renderer\.setPixelRatio\(Math\.min\(2, window\.devicePixelRatio || 1\)\);/,
  `renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  if (L) {
    renderer.setClearColor(0xdbe3f0, 1); // Soft pastel cosmic blue, not bright white
  } else {
    renderer.setClearColor(0x000000, 0); // Transparent in dark mode
  }`
);

// Make light mode nebulae less glaringly "white" by lowering opacity
js = js.replace(
  /const m3 = new THREE\.SpriteMaterial\(\{ map: nebTexture\(nb\[4\], nb\[5\]\), transparent: true, opacity: 0\.85, depthWrite: false, blending: BL \}\);/,
  `const m3 = new THREE.SpriteMaterial({ map: nebTexture(nb[4], nb[5]), transparent: true, opacity: L ? 0.4 : 0.85, depthWrite: false, blending: BL });`
);

fs.writeFileSync('src/components/GalaxyBackground.jsx', js);
console.log("Updated GalaxyBackground light mode");
