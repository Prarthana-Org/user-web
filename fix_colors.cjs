const fs = require('fs');

function replaceFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/text-gray-200/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-gray-300/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-gray-400/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-gray-500/g, 'text-[var(--text-hint)]');
  content = content.replace(/text-white(?![\/\w])/g, 'text-[var(--text-primary)]');
  content = content.replace(/bg-gray-900\/40/g, 'bg-[var(--surface-color)]\/60');
  fs.writeFileSync(path, content);
}

replaceFile('src/components/Navbar.jsx');
replaceFile('src/components/Footer.jsx');
console.log("Fixed text colors");
