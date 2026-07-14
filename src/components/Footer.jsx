import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" className="relative z-10 pt-20 pb-24 text-center max-w-4xl mx-auto px-6">
            <div className="text-[var(--thread)] text-3xl mb-4 font-disp">॥</div>
            <h3 className="font-disp text-[var(--ink)] text-3xl font-semibold mb-4">One app. Infinite depth.</h3>
            
            <p className="text-[var(--body)] font-sans max-w-2xl mx-auto mb-10">
                From ancient oral traditions to modern neuro-tracking. Every metric grounded in science, every practice rooted in millennia of testing. The thread never snapped.
            </p>
            
            <p className="font-disp italic text-[var(--faint)] text-lg mb-8">
                “ekaṃ sad viprā bahudhā vadanti” — Truth is one; the wise call it by many names.
                <span className="font-mono text-[10px] text-[var(--thread)] bg-[var(--thread)]/10 border border-[var(--thread-dim)] rounded px-2 py-0.5 ml-3 not-italic">RV 1.164.46</span>
            </p>

            <div className="font-mono text-[10px] text-[var(--faint)] tracking-widest leading-loose mt-12 border-t border-[var(--line)] pt-8">
                <p>LINKS · <a href="#home" className="hover:text-[var(--thread)] transition-colors">HOME</a> · <a href="#showcase" className="hover:text-[var(--thread)] transition-colors">INTERFACE</a> · <a href="#features" className="hover:text-[var(--thread)] transition-colors">TOOLKIT</a></p>
                <p className="mt-2">LEGAL · <a href="#" className="hover:text-[var(--thread)] transition-colors">PRIVACY POLICY</a> · <a href="#" className="hover:text-[var(--thread)] transition-colors">TERMS OF SERVICE</a></p>
                <p className="mt-4">© 2026 PRARTHANA SCIENCES. ALL RIGHTS RESERVED.</p>
            </div>
        </footer>
    );
};

export default Footer;
