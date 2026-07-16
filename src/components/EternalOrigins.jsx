import React from 'react';

const EternalOrigins = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen content-center">
            <style dangerouslySetInnerHTML={{__html: `
                .trunk { 
                  --gold: #A9791E;
                  --sindoor: #C24A26;
                  --green: #2E7D53;
                  position: relative; padding: 52px 0 8px; text-align: left; max-width: 1120px; margin: 0 auto; padding-left: 24px; padding-right: 24px; 
                }
                [data-theme="dark"] .trunk {
                  --gold: #D4A342;
                  --sindoor: #E06D4A;
                  --green: #4ADE80;
                }
                .trunk .eyebrow { font-weight: 600; font-size: .66rem; letter-spacing: .32em; text-transform: uppercase; color: var(--sindoor); margin-bottom: 10px; }
                .trunk h2 { font-weight: 700; color: var(--text-primary); font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.05; letter-spacing: -.01em; margin-bottom: 14px; }
                .trunk p.lead { max-width: 800px; margin: 14px 0 8px; font-size: 1rem; color: var(--text-secondary); }
                .trunk p.lead strong { color: var(--text-primary); font-weight: 600; }
                
                .tree { border-left: 2px solid var(--text-hint); margin: 20px 0 0 6px; padding-bottom: 20px; }
                .tree details { margin: 0 0 12px 20px; position: relative; }
                .tree details::before { content: ""; position: absolute; left: -22px; top: 21px; width: 16px; height: 2px; background: var(--text-hint); }
                .tree summary { list-style: none; cursor: pointer; display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; background: var(--card-background); border: 1px solid var(--text-hint); border-radius: 10px; padding: 13px 18px; transition: box-shadow .2s; }
                .tree summary::-webkit-details-marker { display: none; }
                .tree summary .tw { color: var(--gold); font-size: .72rem; transition: transform .25s; font-weight: 700; }
                .tree details[open] > summary .tw { transform: rotate(90deg); }
                .tree summary .name { font-size: 1.12rem; font-weight: 700; color: var(--text-primary); }
                .tree summary .skt { font-style: italic; color: var(--text-secondary); font-size: .88rem; }
                
                .tree .body { padding: 14px 8px 4px 18px; border-left: 2px dashed var(--text-hint); margin: 10px 0 0 10px; }
                .k { display: grid; grid-template-columns: 96px 1fr; gap: 6px 14px; margin: 10px 0 4px; font-size: .92rem; text-align: left; }
                .k b { font-weight: 700; font-size: .6rem; letter-spacing: .18em; padding-top: 5px; text-transform: uppercase; }
                .k b.d { color: var(--gold); }
                .k b.s { color: var(--sindoor); }
                .k b.w { color: var(--green); }
                .k span { color: var(--text-secondary); }
                .k span strong { color: var(--text-primary); font-weight: 600; }
                
                .branchlbl { font-weight: 700; font-size: .64rem; letter-spacing: .26em; text-transform: uppercase; color: var(--text-secondary); margin: 26px 0 12px 6px; text-align: left; }
                .branchlbl::before { content: "— "; color: var(--gold); }
            `}} />

            <section className="trunk">
                <div className="eyebrow">The Source</div>
                <h2>Eternal Origins</h2>
                <p className="lead"><strong>Apauruṣeya</strong> — before the written word, before the spoken hymn, the Veda exists as the eternal structural blueprint of reality itself. It is discovered by the ṛṣis in deep meditative absorption, not authored.</p>

                <div className="branchlbl">The Primordial Sound</div>
                <div className="tree">
                    <details open>
                        <summary><span className="tw">▸</span><span className="name">Nāda-Brahman &amp; Omkāra</span><span className="skt">the universe as vibration</span></summary>
                        <div className="body">
                            <div className="k">
                                <b className="d">DEFINITION</b><span>The ultimate reality (Brahman) manifesting as primordial sound (Nāda). The syllable <strong>Om</strong> represents the entirety of this sonic manifestation, containing all states of consciousness and all possible words within its acoustic structure.</span>
                                <b className="s">SYMBOL</b><span>Creation itself is seen as a sonic event. The entire corpus of Sanātana Dharma scripture is symbolically the unfolding of this single, eternal syllable into cosmic diversity.</span>
                                <b className="w">WHY</b><span>It establishes that the scriptures are not arbitrary human decrees but expressions of the fundamental harmonics of the universe. To chant is to align oneself with this cosmic rhythm.</span>
                            </div>
                        </div>
                    </details>
                </div>

                <div className="branchlbl">The Visionaries</div>
                <div className="tree">
                    <details open>
                        <summary><span className="tw">▸</span><span className="name">The Ṛṣis</span><span className="skt">seers of the mantra</span></summary>
                        <div className="body">
                            <div className="k">
                                <b className="d">DEFINITION</b><span>Sages who "heard" (śruti) the eternal truths. They are referred to as <strong>mantra-draṣṭā</strong> (seers of the mantra), serving as conduits for the revelation rather than its originators.</span>
                                <b className="s">SYMBOL</b><span>The human consciousness acting as an antenna tuned to the subtle frequencies of truth. Knowledge is uncreated; it is only revealed when the mind becomes perfectly still and transparent.</span>
                                <b className="w">WHY</b><span>This shifts the focus from historical authorship to the timeless nature of the wisdom, emphasizing that truth is accessible to anyone who can elevate their consciousness to the required state.</span>
                            </div>
                        </div>
                    </details>
                </div>
            </section>
        </div>
    );
};

export default EternalOrigins;
