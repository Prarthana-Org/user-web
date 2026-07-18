const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Import GalaxyBackground
if (!app.includes('GalaxyBackground')) {
    app = app.replace("import { ThemeContext } from './ThemeContext';", "import { ThemeContext } from './ThemeContext';\nimport GalaxyBackground from './components/GalaxyBackground';");
}

// Replace bg-[var(--background-color)] with bg-transparent
app = app.replace(/bg-\[var\(--background-color\)\]/g, 'bg-transparent');

// Insert GalaxyBackground after <div className="min-h-screen bg-transparent...">
app = app.replace(/<div className="min-h-screen bg-transparent[^>]*>/g, '$&\n        <GalaxyBackground theme={theme} />');

fs.writeFileSync('src/App.jsx', app);
