import React from 'react';

const WhyPrarthana = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen content-center flowchart-container">
            <style dangerouslySetInnerHTML={{__html: `
                .flowchart-container { 
                  --midnight: var(--background-color);
                  --body: var(--text-secondary);
                  --text: var(--font-sans);
                  --thread: #A9791E;
                  --thread-dim: rgba(169,121,30,.35);
                  --sindoor: #C24A26;
                  --ink: var(--text-primary);
                  --faint: var(--text-hint);
                  --disp: var(--font-sans);
                  --mono: ui-monospace, monospace;
                  --line: rgba(0, 0, 0, 0.1);
                  --panel: var(--card-background);
                  --panel-2: var(--surface-color);
                  
                  background: var(--midnight); color: var(--body); font-family: var(--text); font-weight: 300; line-height: 1.65; overflow-x: hidden; 
                }
                [data-theme="dark"] .flowchart-container {
                  --thread: #D4A342;
                  --thread-dim: rgba(212,163,66,.35);
                  --sindoor: #E06D4A;
                  --line: rgba(255, 255, 255, 0.1);
                }
                .sim { position: relative; max-width: 1060px; margin: 0 auto; padding: 70px 24px 40px 84px; z-index: 1; min-height: 100vh; }
                .sim::before { content: ""; position: absolute; left: 44px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg,transparent,var(--thread) 4%,var(--thread) 96%,transparent); box-shadow: 0 0 14px rgba(232,180,74,.35); }
                .phase { position: relative; margin-bottom: 84px; opacity: 1; transform: none; margin-top: 50px; }
                .phase::before { content: "1"; position: absolute; left: -63px; top: 2px; width: 40px; height: 40px; border-radius: 50%; background: var(--midnight); border: 1.5px solid var(--thread); color: var(--thread); font-family: var(--mono); font-size: .78rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 18px rgba(232,180,74,.28); }
                .eyebrow { font-family: var(--mono); font-size: .66rem; letter-spacing: .3em; text-transform: uppercase; color: var(--sindoor); margin-bottom: 8px; }
                .phase h2 { font-family: var(--disp); font-weight: 600; color: var(--ink); font-size: clamp(1.7rem,3.6vw,2.5rem); line-height: 1.08; }
                .dates { font-family: var(--mono); font-size: .7rem; color: var(--faint); margin: 10px 0 14px; letter-spacing: .06em; }
                .dates b { color: var(--thread); font-weight: 500; }
                .phase > p.lead { max-width: 760px; font-size: 1rem; margin-bottom: 20px; }
                .phase > p.lead strong { color: var(--ink); font-weight: 500; }
                .tree { border-left: 1px solid var(--line); margin-left: 6px; padding-left: 0; }
                .tree details { margin: 0 0 10px 18px; position: relative; }
                .tree details::before { content: ""; position: absolute; left: -19px; top: 17px; width: 14px; height: 1px; background: var(--line); }
                .tree summary { list-style: none; cursor: pointer; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 9px 14px; transition: border-color .25s,background .25s; }
                .tree summary::-webkit-details-marker { display: none; }
                .tree summary:hover { border-color: var(--thread-dim); background: var(--panel-2); }
                .tree summary .tw { font-family: var(--mono); color: var(--thread); font-size: .7rem; transition: transform .25s; flex: none; }
                .tree details[open] > summary .tw { transform: rotate(90deg); }
                .tree summary .name { font-family: var(--disp); font-size: 1.13rem; font-weight: 600; color: var(--ink); }
                .tree summary .skt { font-style: italic; color: var(--faint); font-size: .88rem; }
                .tree details .body { padding: 12px 6px 4px 16px; border-left: 1px dashed var(--line); margin: 8px 0 0 8px; }
                .tree details .body p { font-size: .93rem; margin-bottom: 10px; max-width: 720px; }
                .leaf { margin: 0 0 8px 18px; position: relative; background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 9px 14px; font-size: .9rem; }
                .leaf::before { content: ""; position: absolute; left: -19px; top: 17px; width: 14px; height: 1px; background: var(--line); }
                .leaf b { font-family: var(--disp); font-size: 1.02rem; color: var(--ink); font-weight: 600; }
                .leaf i { color: var(--faint); }
                @media (max-width:640px) {
                  .sim { padding-left: 58px; }
                  .sim::before { left: 26px; }
                  .phase::before { left: -45px; width: 32px; height: 32px; font-size: .66rem; }
                  .tree details { margin-left: 8px; } .leaf { margin-left: 8px; }
                }
            `}} />
            <main className="sim">
                <section className="phase" data-n="1">
                    <div className="eyebrow">The Present · The Purpose</div>
                    <h2>Why Prarthana</h2>
                    <div className="dates"><b>Present Day</b></div>
                    <p className="lead">Prarthana exists to trace this unbroken thread, presenting the vast ecosystem of Indian knowledge with precision, aesthetic clarity, and uncompromising verified sourcing.</p>
                    <div className="tree">
                        <details open>
                            <summary><span className="tw">▸</span><span className="name">Our Mission</span><span className="skt">preserve and transmit</span></summary>
                            <div className="body">
                                <p>To bridge the gap between ancient wisdom and the modern digital native by building interactive, verifiable, and beautiful interfaces to the scriptures and sciences.</p>
                            </div>
                        </details>
                        <div className="leaf"><b>Clarity over Clutter</b> <i>— A clean taxonomy that separates verified history from myth, providing a credible foundation for learning.</i></div>
                        <div className="leaf"><b>The Living Tradition</b> <i>— Ensuring that the knowledge systems remain an active, accessible part of modern life rather than just historical artifacts.</i></div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default WhyPrarthana;
