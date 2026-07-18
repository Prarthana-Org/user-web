const fs = require('fs');

let css = fs.readFileSync('src/components/Features.css', 'utf8');

// Replace glass with transparent
css = css.replace(/background: rgba\([^)]+\);\s*border-color: rgba\([^)]+\);\s*backdrop-filter: blur\([^)]+\);/g, 'background: transparent;');
// Also cover the dark mode variations
css = css.replace(/background: rgba\([^)]+\);\s*border-color: rgba\([^)]+\);/g, 'background: transparent;');
css = css.replace(/background: rgba\(17, 24, 39, 0\.4\);\s*backdrop-filter: blur\(12px\);\s*border: 1px solid rgba\(255, 255, 255, 0\.1\);/g, 'background: transparent;');

fs.writeFileSync('src/components/Features.css', css);

console.log("Features.css updated to be fully transparent, no glass");
