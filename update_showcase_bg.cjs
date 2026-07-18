const fs = require('fs');
let file = fs.readFileSync('src/components/AppShowcase.jsx', 'utf8');
file = file.replace(
  '<section id="showcase" className="overflow-hidden relative py-20" data-theme={theme}>',
  '<section id="showcase" className="overflow-hidden relative py-20 mt-12" data-theme={theme} style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>'
);
fs.writeFileSync('src/components/AppShowcase.jsx', file);
console.log("AppShowcase.jsx updated with glass section background");
