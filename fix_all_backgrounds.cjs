const fs = require('fs');

// 1. Footer.jsx
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');
footer = footer.replace(
  '<footer id="footer" className="bg-gray-900 text-white pt-20 md:pt-24 pb-12">',
  '<footer id="footer" className="bg-gray-900/40 backdrop-blur-md border-t border-white/10 text-white pt-20 md:pt-24 pb-12">'
);
fs.writeFileSync('src/components/Footer.jsx', footer);

// 2. KnowledgeTree.jsx
let kt = fs.readFileSync('src/components/KnowledgeTree.jsx', 'utf8');
kt = kt.replace(
  '.guide-container {background:var(--bg);color:var(--body);',
  '.guide-container {background:transparent;color:var(--body);'
);
fs.writeFileSync('src/components/KnowledgeTree.jsx', kt);

// 3. AboutUs.css
let aboutCss = fs.readFileSync('src/components/AboutUs.css', 'utf8');
aboutCss = aboutCss.replace(
  '.about-container {background:var(--bg);color:var(--body);',
  '.about-container {background:transparent;color:var(--body);'
);
fs.writeFileSync('src/components/AboutUs.css', aboutCss);

// 4. Navbar.jsx
let nav = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
nav = nav.replace(
  "style={{ backgroundColor: '#0a192f' }}",
  "style={{ backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.7)' : 'transparent', backdropFilter: 'blur(12px)' }}"
);
fs.writeFileSync('src/components/Navbar.jsx', nav);

console.log("All backgrounds updated to be transparent!");
