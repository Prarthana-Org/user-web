const fs = require('fs');
const filePath = 'src/components/AppShowcase.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldHeader = `<div className="container mx-auto px-4 md:px-8 lg:px-12 text-left mb-12 flex flex-col items-start justify-center">
                <p style={{
                    fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: '#FF6B35', marginBottom: 12, textAlign: 'left'
                }}>
                    App Preview
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight tracking-tight text-left">
                    Explore Prarthana
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl text-left leading-relaxed mt-5" style={{ textAlign: 'left' }}>
                    Explore all screens of the Prarthana App. Scroll horizontally to see the entire gallery.
                </p>
            </div>`;

const newHeader = `<div className="container mx-auto px-4 md:px-8 lg:px-12 mb-8 flex flex-col items-start justify-center" style={{ paddingLeft: '1rem' }}>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight tracking-tight text-left" style={{ marginLeft: '-0.5rem' }}>
                    Explore Prarthana
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl text-left leading-relaxed mt-4" style={{ marginLeft: '-0.5rem' }}>
                    Explore all screens of the Prarthana App. Scroll horizontally to see the entire gallery.
                </p>
            </div>

            <div className="w-full flex justify-center mb-6">
                <p style={{
                    fontSize: 14, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.15em', color: '#FF6B35', textAlign: 'center',
                    background: 'rgba(255, 107, 53, 0.1)', padding: '6px 16px', borderRadius: '20px'
                }}>
                    App Preview
                </p>
            </div>`;

if(content.includes('App Preview')) {
    // Basic fallback since exact string replacement might fail on spacing
    content = content.replace(/<div className="container mx-auto[^]*?Explore all screens of the Prarthana App[^]*?<\/div>/, newHeader);
    fs.writeFileSync(filePath, content);
    console.log("Updated AppShowcase.jsx");
} else {
    console.log("Could not find header in AppShowcase.jsx");
}
