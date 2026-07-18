const fs = require('fs');

let fCss = fs.readFileSync('src/components/Features.css', 'utf8');
fCss = fCss.replace('background: var(--surface-color);', 'background: transparent;');
fs.writeFileSync('src/components/Features.css', fCss);

let aCss = fs.readFileSync('src/components/AppShowcase.css', 'utf8');
aCss = aCss.replace('background:var(--app-bg);', 'background:transparent;');
fs.writeFileSync('src/components/AppShowcase.css', aCss);

console.log("Fixed final background classes in CSS");
