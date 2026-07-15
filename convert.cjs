const fs = require('fs');

const htmlContent = fs.readFileSync('/Users/kvid/Desktop/Projects/Prarthana/latest prarthana_ui.html', 'utf-8');

// 1. Extract CSS
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
let cssContent = styleMatch ? styleMatch[1] : '';
fs.writeFileSync('/Users/kvid/Desktop/Projects/Prarthana/user-web/src/components/AppShowcase.css', cssContent);

// 2. Extract Gallery
const galleryMatch = htmlContent.match(/<div class="gallery">([\s\S]*?)<!-- \/gallery -->/);
let galleryHtml = galleryMatch ? galleryMatch[1] : '';

// 3. Create JSX using dangerouslySetInnerHTML
const componentCode = `
import React, { useEffect, useState } from 'react';
import './AppShowcase.css';

const AppShowcase = () => {
    const [theme, setTheme] = useState('light');
    
    useEffect(() => {
        // Toggle theme based on web app theme if user toggles it globally
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(initialTheme);
        
        return () => observer.disconnect();
    }, []);

    // Provide the extracted raw HTML from the prototype
    const rawHTML = \`${galleryHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

    return (
        <section id="showcase" className="overflow-hidden relative py-20" data-theme={theme}>
            <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center mb-12">
                <p style={{
                    fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: '#FF6B35', marginBottom: 12,
                }}>
                    App Preview
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                    Experience the <span className="gradient-text">Divine Interface</span>
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mt-5">
                    Explore all screens of the Prarthana App. Scroll horizontally to see the entire gallery.
                </p>
            </div>
            
            <div className="gallery-wrapper" style={{
                padding: '20px 40px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%'
            }}>
                <div 
                    className="gallery" 
                    style={{ display: 'flex', gap: '34px', flexWrap: 'nowrap', alignItems: 'flex-start', minWidth: 'max-content' }}
                    dangerouslySetInnerHTML={{ __html: rawHTML }} 
                />
            </div>
        </section>
    );
};

export default AppShowcase;
`;

fs.writeFileSync('/Users/kvid/Desktop/Projects/Prarthana/user-web/src/components/AppShowcase.jsx', componentCode);
console.log('Conversion with dangerouslySetInnerHTML completed.');
