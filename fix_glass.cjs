const fs = require('fs');

let css = fs.readFileSync('src/components/Features.css', 'utf8');
css = css.replace(
  '.feature-card--pink { background: #fdf2f8; border-color: #fbcfe8; }',
  '.feature-card--pink { background: rgba(253, 242, 248, 0.15); border-color: rgba(251, 207, 232, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--cyan { background: #ecfeff; border-color: #a5f3fc; }',
  '.feature-card--cyan { background: rgba(236, 254, 255, 0.15); border-color: rgba(165, 243, 252, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--blue { background: #eff6ff; border-color: #bfdbfe; }',
  '.feature-card--blue { background: rgba(239, 246, 255, 0.15); border-color: rgba(191, 219, 254, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--emerald { background: #ecfdf5; border-color: #a7f3d0; }',
  '.feature-card--emerald { background: rgba(236, 253, 245, 0.15); border-color: rgba(167, 243, 208, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--orange { background: #fff7ed; border-color: #fed7aa; }',
  '.feature-card--orange { background: rgba(255, 247, 237, 0.15); border-color: rgba(254, 215, 170, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--teal { background: #f0fdfa; border-color: #99f6e4; }',
  '.feature-card--teal { background: rgba(240, 253, 250, 0.15); border-color: rgba(153, 246, 228, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--violet { background: #f5f3ff; border-color: #ddd6fe; }',
  '.feature-card--violet { background: rgba(245, 243, 255, 0.15); border-color: rgba(221, 214, 254, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--indigo { background: #eef2ff; border-color: #c7d2fe; }',
  '.feature-card--indigo { background: rgba(238, 242, 255, 0.15); border-color: rgba(199, 210, 254, 0.3); backdrop-filter: blur(12px); }'
).replace(
  '.feature-card--rose { background: #fff1f2; border-color: #fecdd3; }',
  '.feature-card--rose { background: rgba(255, 241, 242, 0.15); border-color: rgba(254, 205, 211, 0.3); backdrop-filter: blur(12px); }'
);

// update dark mode too
css = css.replace(
  '[data-theme="dark"] .feature-card--pink { background: rgba(219, 39, 119, 0.1); border-color: rgba(219, 39, 119, 0.2); }',
  '[data-theme="dark"] .feature-card--pink { background: rgba(219, 39, 119, 0.1); border-color: rgba(219, 39, 119, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--cyan { background: rgba(8, 145, 178, 0.1); border-color: rgba(8, 145, 178, 0.2); }',
  '[data-theme="dark"] .feature-card--cyan { background: rgba(8, 145, 178, 0.1); border-color: rgba(8, 145, 178, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--blue { background: rgba(37, 99, 235, 0.1); border-color: rgba(37, 99, 235, 0.2); }',
  '[data-theme="dark"] .feature-card--blue { background: rgba(37, 99, 235, 0.1); border-color: rgba(37, 99, 235, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--emerald { background: rgba(5, 150, 105, 0.1); border-color: rgba(5, 150, 105, 0.2); }',
  '[data-theme="dark"] .feature-card--emerald { background: rgba(5, 150, 105, 0.1); border-color: rgba(5, 150, 105, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--orange { background: rgba(234, 88, 12, 0.1); border-color: rgba(234, 88, 12, 0.2); }',
  '[data-theme="dark"] .feature-card--orange { background: rgba(234, 88, 12, 0.1); border-color: rgba(234, 88, 12, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--teal { background: rgba(13, 148, 136, 0.1); border-color: rgba(13, 148, 136, 0.2); }',
  '[data-theme="dark"] .feature-card--teal { background: rgba(13, 148, 136, 0.1); border-color: rgba(13, 148, 136, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--violet { background: rgba(124, 58, 237, 0.1); border-color: rgba(124, 58, 237, 0.2); }',
  '[data-theme="dark"] .feature-card--violet { background: rgba(124, 58, 237, 0.1); border-color: rgba(124, 58, 237, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--indigo { background: rgba(79, 70, 229, 0.1); border-color: rgba(79, 70, 229, 0.2); }',
  '[data-theme="dark"] .feature-card--indigo { background: rgba(79, 70, 229, 0.1); border-color: rgba(79, 70, 229, 0.2); backdrop-filter: blur(12px); }'
).replace(
  '[data-theme="dark"] .feature-card--rose { background: rgba(225, 29, 72, 0.1); border-color: rgba(225, 29, 72, 0.2); }',
  '[data-theme="dark"] .feature-card--rose { background: rgba(225, 29, 72, 0.1); border-color: rgba(225, 29, 72, 0.2); backdrop-filter: blur(12px); }'
);

fs.writeFileSync('src/components/Features.css', css);

console.log("Features.css updated with glass background");
