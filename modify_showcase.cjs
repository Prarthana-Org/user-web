const fs = require('fs');

let jsx = fs.readFileSync('src/components/AppShowcase.jsx', 'utf8');

// We need to add useRef for the gallery wrapper, and scroll functions
const importLine = "import React, { useEffect, useState, useRef } from 'react';";
jsx = jsx.replace("import React, { useEffect, useState } from 'react';", importLine);

const refSetup = `    const galleryRef = useRef(null);

    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const scrollAmount = direction === 'forward' ? 320 : -320;
            galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };`;

jsx = jsx.replace("const rawHTML = `", refSetup + "\n\n    const rawHTML = `");

// Update the gallery-wrapper div
const buttonsJSX = `
            <div className="mobile-nav-buttons">
                <button onClick={() => scrollGallery('backward')} className="orange-nav-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={() => scrollGallery('forward')} className="orange-nav-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>
`;

jsx = jsx.replace(
    /className="gallery-wrapper" style={{[\s\S]*?}}/,
    'className="gallery-wrapper" ref={galleryRef} style={{ padding: \'20px 16px\', overflowX: \'auto\', WebkitOverflowScrolling: \'touch\', width: \'100%\', scrollBehavior: \'smooth\' }}'
);

jsx = jsx.replace("</section>", "    " + buttonsJSX + "\n        </section>");

fs.writeFileSync('src/components/AppShowcase.jsx', jsx);

let css = fs.readFileSync('src/components/AppShowcase.css', 'utf8');

css += `
/* Mobile navigation buttons for gallery */
.gallery-wrapper::-webkit-scrollbar {
    display: none;
}
.gallery-wrapper {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.mobile-nav-buttons {
    display: none;
}

.orange-nav-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--saffron, #F97316), var(--amber, #F59E0B));
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
    transition: transform 0.2s, box-shadow 0.2s;
}

.orange-nav-btn svg {
    width: 24px;
    height: 24px;
}

.orange-nav-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.5);
}

.orange-nav-btn:active {
    transform: translateY(1px);
}

@media (max-width: 768px) {
    .mobile-nav-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
    }
}
`;

fs.writeFileSync('src/components/AppShowcase.css', css);
