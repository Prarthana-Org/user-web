const fs = require('fs');

let wp = fs.readFileSync('src/components/WhyPrarthana.jsx', 'utf8');
wp = wp.replace(
  'background: var(--midnight); color: var(--body); font-family: var(--text); font-weight: 300; line-height: 1.65; overflow-x: hidden;',
  'background: transparent; color: var(--body); font-family: var(--text); font-weight: 300; line-height: 1.65; overflow-x: hidden;'
);
wp = wp.replace(
  '--midnight: var(--background-color);',
  '--midnight: transparent;'
);

fs.writeFileSync('src/components/WhyPrarthana.jsx', wp);

console.log("WhyPrarthana updated to be transparent!");
