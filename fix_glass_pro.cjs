const fs = require('fs');
let css = fs.readFileSync('src/components/Features.css', 'utf8');
css = css.replace(
  'background: #111827;',
  'background: rgba(17, 24, 39, 0.4);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.1);'
);
fs.writeFileSync('src/components/Features.css', css);
console.log("Features.css updated pro banner with glass background");
