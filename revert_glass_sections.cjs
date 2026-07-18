const fs = require('fs');

let f1 = fs.readFileSync('src/components/Features.jsx', 'utf8');
f1 = f1.replace(
  '<section id="features" className="features-section" style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "80px 0" }}>',
  '<section id="features" className="features-section">'
);
fs.writeFileSync('src/components/Features.jsx', f1);

let f2 = fs.readFileSync('src/components/AppShowcase.jsx', 'utf8');
f2 = f2.replace(
  '<section id="showcase" className="overflow-hidden relative py-20 mt-12" data-theme={theme} style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>',
  '<section id="showcase" className="overflow-hidden relative py-20 mt-12" data-theme={theme} style={{ background: "transparent" }}>'
);
fs.writeFileSync('src/components/AppShowcase.jsx', f2);

console.log("Reverted section backgrounds to transparent");
