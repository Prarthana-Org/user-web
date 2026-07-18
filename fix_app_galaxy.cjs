const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

app = app.replace(
  '<div className="min-h-screen bg-[var(--background-color)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-orange-200 selection:text-orange-900">\n          <Navbar />',
  '<div className="min-h-screen bg-transparent text-[var(--text-primary)] transition-colors duration-300 selection:bg-orange-200 selection:text-orange-900">\n          <GalaxyBackground theme={theme} />\n          <Navbar />'
);

fs.writeFileSync('src/App.jsx', app);
