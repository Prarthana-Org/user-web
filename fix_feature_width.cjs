const fs = require('fs');
let css = fs.readFileSync('src/components/Features.css', 'utf8');

// Fix the width of the grid container so negative margins stretch it properly
css = css.replace(
  /.features-grid \{\n  width: 100%;/g,
  '.features-grid {\n  width: auto;'
);

// Fix the width of the feature card on mobile
// From calc(100vw - 3rem) to calc(100% - 3rem) or just 85% for peeking effect
css = css.replace(
  /flex: 0 0 calc\(100vw - 3rem\);/g,
  'flex: 0 0 calc(100% - 3rem);'
);

fs.writeFileSync('src/components/Features.css', css);
console.log("Fixed feature card mobile widths");
