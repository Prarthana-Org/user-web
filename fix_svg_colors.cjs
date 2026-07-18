const fs = require('fs');

function fixColors(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Scoping CSS
    content = content.replace(/\*\{margin:0;padding:0;box-sizing:border-box\}\nhtml\{scroll-behavior:smooth\}\n/g, '');
    content = content.replace(/::selection\{background:var\(--sindoor\);color:#fff\}/g, '.about-container ::selection{background:var(--sindoor);color:#fff}');
    content = content.replace(/svg\{display:block;margin:0 auto;min-width:940px\}/g, '.mapblock svg{display:block;margin:0 auto;min-width:940px}');
    content = content.replace(/svg text\{font-family:'Josefin Sans',sans-serif\}/g, '.mapblock svg text{font-family:\'Josefin Sans\',sans-serif}');

    // SVG Colors
    content = content.replace(/fill="rgba\(169,121,30,\.08\)"/g, 'fill="var(--gold-bg)"');
    content = content.replace(/fill="rgba\(169,121,30,\.07\)"/g, 'fill="var(--gold-bg)"');
    content = content.replace(/fill="rgba\(169,121,30,\.06\)"/g, 'fill="var(--gold-bg)"');
    content = content.replace(/stroke="#A9791E"/g, 'stroke="var(--gold)"');
    content = content.replace(/fill="#A9791E"/g, 'fill="var(--gold)"');

    content = content.replace(/fill="rgba\(46,125,83,\.07\)"/g, 'fill="var(--green-bg)"');
    content = content.replace(/stroke="#2E7D53"/g, 'stroke="var(--green)"');
    content = content.replace(/fill="#2E7D53"/g, 'fill="var(--green)"');

    content = content.replace(/fill="rgba\(194,74,38,\.07\)"/g, 'fill="var(--sindoor-bg)"');
    content = content.replace(/stroke="#C24A26"/g, 'stroke="var(--sindoor)"');
    content = content.replace(/fill="#C24A26"/g, 'fill="var(--sindoor)"');

    content = content.replace(/fill="rgba\(47,109,143,\.07\)"/g, 'fill="var(--blue-bg)"');
    content = content.replace(/stroke="#2F6D8F"/g, 'stroke="var(--blue)"');
    content = content.replace(/fill="#2F6D8F"/g, 'fill="var(--blue)"');

    content = content.replace(/fill="#FCFBF8"/g, 'fill="var(--panel2)"');
    content = content.replace(/stroke="#D8D3C6"/g, 'stroke="var(--line-2)"');
    content = content.replace(/fill="#FFFFFF"/g, 'fill="var(--panel)"');
    content = content.replace(/fill="#EEEBE3"/g, 'fill="var(--node)"');
    
    content = content.replace(/stroke="#20242E"/g, 'stroke="var(--ink)"');
    content = content.replace(/fill="#20242E"/g, 'fill="var(--ink)"');
    content = content.replace(/stroke="#C9C3B4"/g, 'stroke="var(--line-2)"');
    content = content.replace(/stroke="#E6E2D8"/g, 'stroke="var(--line)"');
    content = content.replace(/fill="#8A91A0"/g, 'fill="var(--faint)"');

    if (filePath.includes('KnowledgeTree')) {
        content = content.replace(/::selection\{background:var\(--sindoor\);color:#fff\}/g, '.guide-container ::selection{background:var(--sindoor);color:#fff}');
    }

    fs.writeFileSync(filePath, content, 'utf-8');
}

fixColors('/Users/kvid/Desktop/Projects/Prarthana/user-web/src/components/AboutUs.jsx');
fixColors('/Users/kvid/Desktop/Projects/Prarthana/user-web/src/components/KnowledgeTree.jsx');

console.log('done');
