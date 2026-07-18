const fs = require('fs');

let css = fs.readFileSync('src/components/AppShowcase.css', 'utf8');
css = css.replace(
  '.screen{width:100%;height:100%;background:var(--hero);color:var(--ink);',
  '.screen{width:100%;height:100%;background:transparent;color:var(--ink);'
);
fs.writeFileSync('src/components/AppShowcase.css', css);

let jsx = fs.readFileSync('src/components/AppShowcase.jsx', 'utf8');
jsx = jsx.replace(/style="background:var\(--hero\)"/g, 'style="background:transparent"');
jsx = jsx.replace(/style="background:var\(--grad-hero\)"/g, 'style="background:transparent"');
jsx = jsx.replace(/style="background:var\(--ink\)"/g, 'style="background:transparent"');
fs.writeFileSync('src/components/AppShowcase.jsx', jsx);

console.log("Made all screens transparent in AppShowcase");
