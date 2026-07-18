const fs = require('fs');

// 1. Update Hero.jsx
let hero = fs.readFileSync('src/components/Hero.jsx', 'utf8');

// Add imports if missing
if (!hero.includes('ThemeContext')) {
  hero = hero.replace(
    /import React(.*?)\n/,
    "import React$1\nimport { useContext } from 'react';\nimport { ThemeContext } from '../ThemeContext';\n"
  );
}

// Add useContext hook
if (!hero.includes('const { theme }')) {
  hero = hero.replace(
    /function Hero\(\) \{\n/,
    "function Hero() {\n  const { theme } = useContext(ThemeContext);\n"
  );
}

// Pass theme to ChakraModel3D
hero = hero.replace(
  /<ChakraModel3D theme="dark" \/>/,
  '<ChakraModel3D theme={theme} />'
);

fs.writeFileSync('src/components/Hero.jsx', hero);

// 2. Update ChakraModel3D.jsx
let cm = fs.readFileSync('src/components/ChakraModel3D.jsx', 'utf8');

// Change dot colors (cp) for light mode to be darker warm tones instead of purple
cm = cm.replace(
  /const cp = L\s*\?\s*\[\[0\.3, 0\.24, 0\.68\], \[0\.19, 0\.33, 0\.68\], \[0\.56, 0\.22, 0\.54\], \[0\.72, 0\.48, 0\.16\], \[0\.25, 0\.44, 0\.62\]\]/,
  "const cp = L\n        ? [[0.35, 0.15, 0.05], [0.4, 0.2, 0.1], [0.25, 0.1, 0.02], [0.45, 0.25, 0.1], [0.3, 0.12, 0.05]]"
);

// Change bright body stars (cs9) for light mode to be darker warm tones
cm = cm.replace(
  /const cs9 = L \? \[\[0\.42, 0\.32, 0\.85\], \[0\.75, 0\.5, 0\.15\], \[0\.6, 0\.24, 0\.6\]\]/,
  "const cs9 = L ? [[0.45, 0.2, 0.1], [0.55, 0.25, 0.15], [0.35, 0.15, 0.05]]"
);

fs.writeFileSync('src/components/ChakraModel3D.jsx', cm);

console.log("Updated Hero and ChakraModel3D");
