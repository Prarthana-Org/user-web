const fs = require('fs');
let file = fs.readFileSync('src/components/Features.jsx', 'utf8');
file = file.replace(
  '<section id="features" className="features-section">',
  '<section id="features" className="features-section" style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "80px 0" }}>'
);
fs.writeFileSync('src/components/Features.jsx', file);
console.log("Features.jsx updated with glass section background");
