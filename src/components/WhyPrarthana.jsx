import React, { useEffect, useRef } from 'react';

const WhyPrarthana = () => {
    const simRef = useRef(null);
    const pulseRef = useRef(null);

    useEffect(() => {
        const movePulse = () => {
            if (!simRef.current || !pulseRef.current) return;
            const r = simRef.current.getBoundingClientRect();
            const vh = window.innerHeight * 0.45;
            const y = Math.min(Math.max(vh - r.top, 0), r.height - 8);
            pulseRef.current.style.top = y + 'px';
        };

        window.addEventListener('scroll', movePulse, { passive: true });
        window.addEventListener('resize', movePulse);
        movePulse();

        return () => {
            window.removeEventListener('scroll', movePulse);
            window.removeEventListener('resize', movePulse);
        };
    }, []);

    return (
        <div className="pt-24 pb-16 min-h-screen content-center flowchart-container">
            <style dangerouslySetInnerHTML={{__html: `
                .flowchart-container { 
                  --midnight: transparent;
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
                  
                  background: transparent; color: var(--body); font-family: var(--text); font-weight: 300; line-height: 1.65; overflow-x: hidden; 
                }
                [data-theme="dark"] .flowchart-container {
                  --thread: #D4A342;
                  --thread-dim: rgba(212,163,66,.35);
                  --sindoor: #E06D4A;
                  --line: rgba(255, 255, 255, 0.1);
                }
                .sim { position: relative; max-width: 1060px; margin: 0 auto; padding: 70px 24px 40px 84px; z-index: 1; min-height: 100vh; }
                .sim::before { content: ""; position: absolute; left: 44px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg,transparent,var(--thread) 4%,var(--thread) 96%,transparent); box-shadow: 0 0 14px rgba(232,180,74,.35); }
                
                #pulse {
                  position: absolute;
                  left: 42.5px;
                  width: 5px;
                  height: 5px;
                  background: var(--thread);
                  border-radius: 50%;
                  box-shadow: 0 0 10px 3px var(--thread), 0 0 20px 5px var(--thread);
                  z-index: 2;
                  transition: top 0.1s ease-out;
                }

                .phase { position: relative; margin-bottom: 84px; opacity: 1; transform: none; margin-top: 50px; text-align: left; }
                .phase::before { content: attr(data-n); position: absolute; left: -63px; top: 2px; width: 40px; height: 40px; border-radius: 50%; background: var(--midnight); border: 1.5px solid var(--thread); color: var(--thread); font-family: var(--mono); font-size: .78rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 18px rgba(232,180,74,.28); font-weight: bold; }
                .eyebrow { font-family: var(--mono); font-size: .66rem; letter-spacing: .3em; text-transform: uppercase; color: var(--sindoor); margin-bottom: 8px; font-weight: 600; }
                .phase h2 { font-family: var(--disp); font-weight: 700; color: var(--ink); font-size: clamp(1.7rem,3.6vw,2.5rem); line-height: 1.08; letter-spacing: -.01em; margin-bottom: 14px; }
                .dates { font-family: var(--mono); font-size: .7rem; color: var(--faint); margin: 10px 0 14px; letter-spacing: .06em; text-transform: uppercase; }
                .dates b { color: var(--thread); font-weight: 600; }
                .phase > p.lead { max-width: 760px; font-size: 1rem; margin-bottom: 20px; color: var(--body); }
                .phase > p.lead strong { color: var(--ink); font-weight: 600; }
                
                .tree { border-left: 1.5px solid var(--line); margin-left: 6px; padding-left: 0; }
                .tree details { margin: 0 0 10px 18px; position: relative; }
                .tree details::before { content: ""; position: absolute; left: -19px; top: 17px; width: 14px; height: 1.5px; background: var(--line); }
                .tree summary { list-style: none; cursor: pointer; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 12px 16px; transition: border-color .25s,background .25s; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
                .tree summary::-webkit-details-marker { display: none; }
                .tree summary:hover { border-color: var(--thread-dim); background: var(--panel-2); }
                .tree summary .tw { font-family: var(--mono); color: var(--thread); font-size: .7rem; transition: transform .25s; flex: none; font-weight: bold; }
                .tree details[open] > summary .tw { transform: rotate(90deg); }
                .tree summary .name { font-family: var(--disp); font-size: 1.13rem; font-weight: 600; color: var(--ink); }
                .tree summary .skt { font-style: italic; color: var(--body); font-size: .88rem; }
                .tree summary .meta { font-family: var(--mono); font-size: .63rem; color: var(--faint); letter-spacing: .05em; margin-left: auto; text-transform: uppercase; font-weight: bold; }
                
                .tree details .body { padding: 12px 8px 4px 16px; border-left: 1.5px dashed var(--line); margin: 8px 0 0 8px; }
                .tree details .body p { font-size: .95rem; margin-bottom: 12px; max-width: 720px; color: var(--body); line-height: 1.6; }
                
                .leaf { margin: 0 0 10px 18px; position: relative; background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 12px 16px; font-size: .95rem; color: var(--body); line-height: 1.6; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
                .leaf::before { content: ""; position: absolute; left: -19px; top: 17px; width: 14px; height: 1.5px; background: var(--line); }
                .leaf b { font-family: var(--disp); font-size: 1.05rem; color: var(--ink); font-weight: 600; display: inline-block; margin-right: 6px; }
                .leaf i { color: var(--body); font-style: italic; }
                
                .branchlbl { font-weight: 700; font-size: .64rem; letter-spacing: .26em; text-transform: uppercase; color: var(--body); margin: 26px 0 12px 6px; text-align: left; }
                .branchlbl::before { content: "— "; color: var(--thread); }
                
                .ref { font-family: var(--mono); font-size: .7rem; color: var(--thread); background: var(--thread-dim); border: 1px solid rgba(169, 121, 30, 0.2); border-radius: 6px; padding: 2px 8px; white-space: nowrap; margin: 0 4px; font-weight: bold; }
                
                .tier { font-family: var(--mono); font-size: .65rem; border-radius: 4px; padding: 2px 8px; letter-spacing: .08em; flex: none; margin-left: 6px; font-weight: bold; }
                .tier.T1 { color: #2E7D53; border: 1px solid #2E7D53; background: rgba(46, 125, 83, 0.1); }
                .tier.T2 { color: var(--thread); border: 1px solid var(--thread); background: var(--thread-dim); }
                .tier.T3 { color: var(--sindoor); border: 1px solid var(--sindoor); background: rgba(194, 74, 38, 0.1); }
                [data-theme="dark"] .tier.T1 { color: #4ADE80; border: 1px solid #4ADE80; }
                
                .map { display: block; margin-top: 10px; font-size: .88rem; color: var(--body); background: var(--panel-2); padding: 8px 12px; border-radius: 6px; border-left: 3px solid var(--sindoor); }
                .map::before { content: "↳ MODERN PARALLEL: "; font-family: var(--mono); font-size: .65rem; color: var(--sindoor); letter-spacing: .1em; font-weight: bold; }
                
                .stats { display: flex; gap: 26px; flex-wrap: wrap; margin: 18px 0 26px; }
                .stats div { font-family: var(--mono); font-size: .7rem; color: var(--faint); letter-spacing: .08em; text-transform: uppercase; }
                .stats div b { display: block; font-size: 1.8rem; color: var(--thread); font-weight: 700; letter-spacing: 0; line-height: 1.2; }
                
                @media (max-width:640px) {
                  .sim { padding-left: 58px; }
                  .sim::before { left: 26px; }
                  #pulse { left: 24.5px; }
                  .phase::before { left: -45px; width: 32px; height: 32px; font-size: .66rem; }
                  .tree details { margin-left: 8px; } .leaf { margin-left: 8px; }
                }
            `}} />
            <div className="container mx-auto px-4 md:px-8 lg:px-12 mb-24 md:mb-32 flex flex-col items-start justify-center" style={{ paddingLeft: '1rem' }}>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight tracking-tight text-left" style={{ marginLeft: '-0.5rem' }}>Why Prarthana</h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl text-left leading-relaxed mt-4" style={{ marginLeft: '-0.5rem' }}>Tracing the unbroken thread of Indian knowledge with precision and clarity.</p>
            </div>
            <main className="sim" ref={simRef}>
                <div id="pulse" ref={pulseRef}></div>
                <section className="phase" data-n="0">
  <div className="eyebrow">Cosmic analogue · The Singularity</div>
  <h2>Point 0 — The Oral Substrate</h2>
  <div className="dates">SCHOLARLY <b>before ~1500 BCE</b> · TRADITIONAL <b>apauruṣeya — authorless, eternal</b></div>
  <p className="lead">Before writing, all knowledge exists as <strong>śruti</strong> — “that which is heard.” It is preserved by the most sophisticated error-correction system of the ancient world: interlocking recitation permutations that make any transmission error instantly detectable.</p>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">The Eleven Pāṭhas</span><span className="skt">recitation modes</span><span className="tier T1">T1</span><span className="meta">ERROR-CORRECTION TECHNOLOGY</span></summary>
      <div className="body">
        <p><strong>Saṃhitā · Pada · Krama · Jaṭā · Mālā · Śikhā · Rekhā · Dhvaja · Daṇḍa · Ratha · Ghana.</strong> In ghana-pāṭha every word-pair is chanted in the interlock 1-2·2-1·1-2-3 / 3-2-1·1-2-3 — a redundancy scheme that carried the Ṛgveda phonetically intact for over three millennia before it was widely written down. UNESCO inscribed Vedic chanting on the Intangible Heritage of Humanity list (proclaimed 2003, inscribed 2008).</p>
        <span className="map">information theory · redundancy coding · checksums · Hamming error-correction · blockchain immutability</span>
      </div>
    </details>
    <div className="leaf"><b>Guru–śiṣya paramparā</b> <i>— living transmission chain; the “storage medium” is trained human memory, institutionalized in family śākhās (branches).</i></div>
  </div>
</section>


<section className="phase" data-n="1">
  <div className="eyebrow">Cosmic analogue · t = 0, The Big Bang</div>
  <h2>The Ṛgveda Saṃhitā</h2>
  <div className="dates">SCHOLARLY <b>c. 1500–1200 BCE (composition)</b> · TRADITIONAL <b>timeless śruti</b></div>
  <p className="lead">The single origin-corpus from which everything that follows branches. <strong>The oldest religious text still in continuous liturgical use on Earth.</strong></p>
  <div className="stats">
    <div><b>10</b>MAṆḌALAS</div><div><b>1,028</b>SŪKTAS (HYMNS)</div><div><b>10,552</b>ṚKS (VERSES)</div><div><b>~165k</b>WORDS</div>
  </div>
  <div className="tree">
    <details open>
      <summary><span className="tw">▸</span><span className="name">Seed-Hymns</span><span className="skt">the primordial elements — each becomes a future discipline</span><span className="meta">MAṆḌALAS 1–10</span></summary>
      <div className="body">
        <div className="leaf"><b>Nāsadīya Sūkta</b> <span className="ref">RV 10.129</span> <span className="tier T2">T2</span><br /><i>The hymn of creation — ends in radical epistemic humility: “perhaps even He does not know.”</i><span className="map">cosmology · limits of observation · scientific agnosticism (pair with CMB &amp; Hubble expansion)</span></div>
        <div className="leaf"><b>Hiraṇyagarbha Sūkta</b> <span className="ref">RV 10.121</span> <span className="tier T2">T2</span><br /><i>“Golden embryo” cosmogony — seed of the later Brahmāṇḍa (cosmic egg) model.</i><span className="map">cosmogony narratives · comparative mythology</span></div>
        <div className="leaf"><b>Puruṣa Sūkta</b> <span className="ref">RV 10.90</span><br /><i>Cosmic-person cosmogony; seeds later Vedānta and social philosophy.</i></div>
        <div className="leaf"><b>Dīrghatamas riddle-hymn</b> <span className="ref">RV 1.164</span> <span className="tier T1">T1</span><br /><i>“ekaṃ sad viprā bahudhā vadanti” — Truth is one, the wise call it by many names (1.164.46); 12-spoked, 360-pegged wheel of the year (1.164.11, 48).</i><span className="map">pluralism · comparative philosophy · early calendrics</span></div>
        <div className="leaf"><b>Gāyatrī Mantra</b> <span className="ref">RV 3.62.10</span><br /><i>Solar meditation verse — the most recited mantra in history.</i></div>
      </div>
    </details>
    <div className="leaf"><b>Structure</b> <i>— Family Books (Maṇḍalas 2–7) are the oldest core; 1, 8, 9 (Soma), 10 are later layers. Principal surviving recension: Śākala śākhā (Bāṣkala partially).</i></div>
  </div>
</section>


<section className="phase" data-n="2">
  <div className="eyebrow">Cosmic analogue · Inflation — forces separate</div>
  <h2>The Four Saṃhitās</h2>
  <div className="dates">SCHOLARLY <b>c. 1200–1000 BCE</b> · TRADITIONAL <b>division by Veda-Vyāsa</b></div>
  <p className="lead">One corpus differentiates into four functional streams — recitation, melody, ritual formula, and applied life — like fundamental forces separating in the early universe.</p>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Ṛgveda</span><span className="skt">ṛc — praise verse · priest: Hotṛ</span><span className="meta">1,028 HYMNS</span></summary>
      <div className="body"><div className="leaf"><b>Śākhās</b> <i>— Śākala (complete), Bāṣkala. The recitation stream.</i></div></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Sāmaveda</span><span className="skt">sāman — melody · priest: Udgātṛ</span><span className="meta">1,875 VERSES</span></summary>
      <div className="body">
        <p>Nearly all verses drawn from the Ṛgveda but set to melodic notation (~75 unique) — <strong>the root document of Indian musicology</strong>, ancestral to rāga tradition via Gāndharvaveda.</p>
        <div className="leaf"><b>Śākhās</b> <i>— Kauthuma, Rāṇāyanīya, Jaiminīya.</i><span className="map">music theory · notation systems · acoustics</span></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Yajurveda</span><span className="skt">yajus — ritual formula · priest: Adhvaryu</span><span className="meta">2 STREAMS</span></summary>
      <div className="body">
        <div className="leaf"><b>Kṛṣṇa (Black)</b> <i>— Taittirīya, Maitrāyaṇī, Kaṭha, Kapiṣṭhala saṃhitās (verse + prose mixed).</i></div>
        <div className="leaf"><b>Śukla (White)</b> <i>— Vājasaneyi saṃhitā: Mādhyandina &amp; Kāṇva recensions.</i></div>
        <div className="leaf"><b>Powers of ten to 10¹² (parārdha)</b> <span className="ref">Taittirīya Saṃhitā 4.4.10; 7.2.20</span> <span className="tier T1">T1</span><br /><i>Systematic naming of decimal powers — the place-value mindset in the ritual layer itself.</i><span className="map">decimal place-value · scientific notation · logarithmic scale intuition</span></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Atharvaveda</span><span className="skt">practical life · priest: Brahman (supervisor)</span><span className="meta">730 HYMNS · ~6,000 VERSES</span></summary>
      <div className="body">
        <p>Healing, agriculture, statecraft, marriage, medicine — the stream that seeds <strong>Āyurveda</strong>.</p>
        <div className="leaf"><b>Śākhās</b> <i>— Śaunaka, Paippalāda.</i></div>
        <div className="leaf"><b>Healing hymns on invisible disease agents (krimi)</b> <span className="ref">AV 2.31–2.32</span> <span className="tier T2">T2</span><br /><i>Conceptual parallel to unseen causes of disease — a parallel, not germ theory.</i><span className="map">history of medicine · epidemiological thinking</span></div>
      </div>
    </details>
  </div>
</section>


<section className="phase" data-n="3">
  <div className="eyebrow">Cosmic analogue · Nucleosynthesis — first compounds</div>
  <h2>Brāhmaṇas &amp; Āraṇyakas</h2>
  <div className="dates">SCHOLARLY <b>c. 1000–800 BCE</b></div>
  <p className="lead">Prose layers crystallize around each Saṃhitā — the world’s first commentarial literature. The Āraṇyakas (“forest books”) then turn ritual inward, the bridge to the Upaniṣads.</p>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Brāhmaṇas</span><span className="skt">ritual exegesis, by Veda</span></summary>
      <div className="body">
        <div className="leaf"><b>Ṛgveda</b> <i>— Aitareya, Kauṣītaki.</i> <b>Sāmaveda</b> <i>— Pañcaviṃśa (Tāṇḍya), Ṣaḍviṃśa, Jaiminīya.</i> <b>Yajurveda</b> <i>— Śatapatha (Śukla; among the largest prose works of antiquity), Taittirīya (Kṛṣṇa).</i> <b>Atharvaveda</b> <i>— Gopatha.</i></div>
        <div className="leaf"><b>Manu &amp; the Fish flood narrative</b> <span className="ref">Śatapatha Br. 1.8.1.1–6</span> <span className="tier T1">T1</span><span className="map">comparative mythology — Mesopotamian &amp; Biblical flood parallels</span></div>
        <div className="leaf"><b>Fire-altar geometry (agnicayana)</b> <span className="ref">Śatapatha Br. — altar sections</span> <span className="tier T1">T1</span><br /><i>Bricks, areas and shape-transformations that directly feed the Śulba Sūtras of Phase 5.</i><span className="map">applied geometry · area-preserving transformations</span></div>
        <div className="leaf"><b>“The sun never really sets or rises”</b> <span className="ref">Aitareya Br. 3.44</span> <span className="tier T2">T2</span><br /><i>Day and night as simultaneous for different lands — early frame-relative thinking; frame carefully.</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Āraṇyakas</span><span className="skt">forest books — ritual internalized</span></summary>
      <div className="body"><div className="leaf"><b>Aitareya · Taittirīya · Kauṣītaki · Bṛhad (embedded)</b> <i>— symbolic reinterpretation of sacrifice: the transitional layer between karma-kāṇḍa (ritual) and jñāna-kāṇḍa (knowledge).</i></div></div>
    </details>
  </div>
</section>


<section className="phase" data-n="4">
  <div className="eyebrow">Cosmic analogue · First stars ignite</div>
  <h2>The Upaniṣads</h2>
  <div className="dates">SCHOLARLY <b>c. 800–300 BCE (principal)</b> · CANON <b>108 in the Muktikā list · 10–13 Mukhya</b></div>
  <p className="lead">The turn inward: from ritual to the nature of consciousness and reality — the texts that later reached <strong>Schopenhauer, Schrödinger and Oppenheimer</strong> through documented chains of transmission.</p>
  <div className="tree">
    <details open>
      <summary><span className="tw">▸</span><span className="name">The Principal (Mukhya) Upaniṣads</span><span className="skt">with attached Veda &amp; signature idea</span><span className="meta">13 TEXTS</span></summary>
      <div className="body">
        <div className="leaf"><b>Bṛhadāraṇyaka</b> <i>(Śukla YV)</i> — “aham brahmāsmi” <span className="ref">BU 1.4.10</span>; Yājñavalkya–Maitreyī dialogue on consciousness <span className="ref">BU 2.4</span>; via negativa “neti neti” <span className="ref">BU 2.3.6</span></div>
        <div className="leaf"><b>Chāndogya</b> <i>(SV)</i> — “tat tvam asi” <span className="ref">CU 6.8.7</span>; Uddālaka’s teaching by demonstration: salt-in-water <span className="ref">CU 6.13</span>, banyan seed <span className="ref">CU 6.12</span> <span className="tier T2">T2</span><span className="map">pedagogy by experiment · emergence &amp; the unseen-substrate intuition</span></div>
        <div className="leaf"><b>Taittirīya</b> <i>(Kṛṣṇa YV)</i> — pañcakośa, five sheaths of the person <span className="ref">TU 2.1–2.5</span><span className="map">layered models in biology/psychology (as framing device)</span></div>
        <div className="leaf"><b>Aitareya</b> <i>(RV)</i> — “prajñānaṃ brahma,” consciousness as ground <span className="ref">Ait.U 3.3</span></div>
        <div className="leaf"><b>Kena</b> <i>(SV)</i> — the unknowability of the knower <span className="ref">Kena 1.3–1.4</span></div>
        <div className="leaf"><b>Kaṭha</b> <i>(Kṛṣṇa YV)</i> — Naciketas &amp; Death; the chariot model: senses = horses, mind = reins, intellect = driver <span className="ref">KU 1.3.3–9</span> <span className="tier T2">T2</span><span className="map">cognitive architecture · executive function · compare Plato’s Phaedrus chariot</span></div>
        <div className="leaf"><b>Īśā</b> <i>(Śukla YV)</i> — 18 verses; paradox pedagogy <span className="ref">Īśā 4–5</span></div>
        <div className="leaf"><b>Muṇḍaka</b> <i>(AV)</i> — two knowledges, parā &amp; aparā <span className="ref">MU 1.1.4–5</span>; “satyameva jayate” <span className="ref">MU 3.1.6</span> — India’s national motto</div>
        <div className="leaf"><b>Māṇḍūkya</b> <i>(AV)</i> — 12 verses; Om &amp; the four states: waking, dream, deep sleep, turīya <span className="ref">Māṇḍ. 1–12</span> <span className="tier T2">T2</span><span className="map">consciousness studies · sleep-state comparison seminar (discussion, not equivalence)</span></div>
        <div className="leaf"><b>Praśna</b> <i>(AV)</i> — six-question dialogue structure — a Socratic format</div>
        <div className="leaf"><b>Śvetāśvatara · Kauṣītaki · Maitrī</b> <i>— theism, prāṇa physiology, earliest yoga terminology</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Documented Western Reception</span><span className="skt">the verified transmission chain</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>Dārā Śikoh → Anquetil-Duperron → Schopenhauer</b> <i>— Persian Sirr-i-Akbar (1657) → Latin Oupnek’hat (1801–02) → Schopenhauer’s lifelong engagement (Parerga and Paralipomena).</i></div>
        <div className="leaf"><b>Erwin Schrödinger</b> <i>— explicit Vedānta discussion in “My View of the World” (1961) and the epilogue of “What Is Life?” (1944); biographer Walter Moore documents the depth of engagement (1989).</i> <span className="tier T2">T2</span> <i>inspiration — not derivation of quantum mechanics.</i></div>
        <div className="leaf"><b>J. R. Oppenheimer</b> <i>— studied Sanskrit with A. W. Ryder at Berkeley; famously recalled Bhagavad Gītā 11.32 after Trinity.</i></div>
      </div>
    </details>
  </div>
</section>


<section className="phase" data-n="5">
  <div className="eyebrow">Cosmic analogue · Galaxy formation</div>
  <h2>The Six Vedāṅgas — First Formal Sciences</h2>
  <div className="dates">SCHOLARLY <b>c. 800–400 BCE</b></div>
  <p className="lead">Six technical disciplines are born to preserve the Veda — and three of them become world-historical: <strong>grammar → formal languages, prosody → binary mathematics, ritual geometry → the diagonal theorem.</strong></p>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">1 · Śikṣā</span><span className="skt">phonetics</span><span className="tier T1">T1</span></summary>
      <div className="body"><p>Prātiśākhyas &amp; Pāṇinīya Śikṣā. The varṇamālā is ordered by <strong>place and manner of articulation</strong> (velar → palatal → retroflex → dental → labial) — the organizational logic of the IPA, ~2,500 years early.</p><span className="map">articulatory phonetics · speech science · TTS phoneme systems</span></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">2 · Vyākaraṇa</span><span className="skt">grammar — Pāṇini’s Aṣṭādhyāyī</span><span className="tier T1">T1</span><span className="meta">c. 500–400 BCE</span></summary>
      <div className="body">
        <p><strong>~3,996 sūtras</strong> generating the whole of Sanskrit from ~2,000 roots through ordered rules, meta-rules and recursion — the most complete generative grammar before the 20th century. The Backus–Naur Form has been called the <strong>“Pāṇini–Backus Form”</strong> (P. Z. Ingerman, Communications of the ACM, 1967).</p>
        <div className="leaf"><b>Lineage</b> <i>— Pāṇini → Kātyāyana (vārttikas) → Patañjali’s Mahābhāṣya (c. 150 BCE) → Bhartṛhari’s Vākyapadīya (c. 450 CE, sphoṭa semantics).</i></div>
        <span className="map">formal language theory · compilers · BNF · computational linguistics</span>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">3 · Chandas</span><span className="skt">prosody — Piṅgala’s Chandaḥśāstra</span><span className="tier T1">T1</span><span className="meta">c. 300–200 BCE</span></summary>
      <div className="body">
        <div className="leaf"><b>Binary encoding</b> <i>— laghu/guru (light/heavy) syllables enumerated by prastāra algorithms: binary representation of meters.</i><span className="map">binary numbers · enumeration algorithms</span></div>
        <div className="leaf"><b>Meru-prastāra</b> <i>— Pascal-triangle-like array (explicit in Halāyudha’s 10th-c. commentary).</i><span className="map">binomial coefficients</span></div>
        <div className="leaf"><b>Mātrā-meru</b> <i>— Fibonacci sequence, explicit in Virahāṅka (~700 CE) &amp; Hemacandra (~1150), pre-dating Fibonacci (1202). Ref.: Singh, Historia Mathematica 12 (1985).</i><span className="map">Fibonacci · dynamic programming (staircase problem)</span></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">4 · Nirukta</span><span className="skt">etymology — Yāska</span><span className="meta">c. 600–500 BCE</span></summary>
      <div className="body"><p>Systematic etymology and semantics of Vedic words.</p><span className="map">historical linguistics · semantics</span></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">5 · Kalpa</span><span className="skt">ritual procedure → the Śulba Sūtras</span><span className="tier T1">T1</span><span className="meta">c. 800–300 BCE</span></summary>
      <div className="body">
        <p>Śrauta, Gṛhya and Dharma sūtras — and within them the geometry manuals of altar construction:</p>
        <div className="leaf"><b>Diagonal (Pythagorean) rule</b> <span className="ref">Baudhāyana ŚS 1.12</span><br /><i>“The rope of the diagonal produces the area that length and breadth together produce” — stated before / independently of Pythagoras.</i></div>
        <div className="leaf"><b>√2 ≈ 1 + 1/3 + 1/(3·4) − 1/(3·4·34)</b> <span className="ref">BŚS 1.13 / 2.12 (ed.-dep.)</span><br /><i>= 1.4142156… — correct to five decimals.</i></div>
        <div className="leaf"><b>Other authors</b> <i>— Āpastamba, Kātyāyana, Mānava śulba sūtras; circle–square transformations, Pythagorean triples.</i></div>
        <span className="map">geometry · irrationality · approximation theory · AR construction labs</span>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">6 · Jyotiṣa</span><span className="skt">astronomy &amp; calendar — Lagadha’s Vedāṅga Jyotiṣa</span><span className="meta">SCHOLARLY c. 700–400 BCE · TRAD. c. 1400–1200 BCE</span></summary>
      <div className="body"><p>Five-year yuga cycle, 27 nakṣatras, intercalation rules — calendrical astronomy in verse.</p><span className="map">calendrics · positional astronomy · timekeeping systems</span></div>
    </details>
  </div>
</section>


<section className="phase" data-n="6">
  <div className="eyebrow">Cosmic analogue · Stellar diversity — new star types</div>
  <h2>Upavedas &amp; the Śramaṇa Explosion</h2>
  <div className="dates">SCHOLARLY <b>c. 600–300 BCE</b></div>
  <p className="lead">Applied sciences attach to each Veda, while a parallel burst of <strong>heterodox (nāstika)</strong> systems — Buddhist, Jain, materialist — radically diversifies the intellectual universe.</p>
  <div className="branchlbl">Branch A — The Four Upavedas (applied sciences)</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Āyurveda</span><span className="skt">medicine · attached to Atharvaveda</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>Caraka Saṃhitā</b> <i>— internal medicine (kāyacikitsā); compiled c. 100 BCE–200 CE from the older Agniveśa-tantra. Clinical examination method</i> <span className="ref">CS Vimānasthāna 4, 8</span><i>; codified rules of medical debate (vāda)</i> <span className="ref">CS Vi. 8</span>.</div>
        <div className="leaf"><b>Suśruta Saṃhitā</b> <i>— surgery: eight branches, ~120 instruments</i> <span className="ref">Su. Sūtrasthāna 8, 16</span><i>, ~300 procedures incl. rhinoplasty by cheek/forehead flap</i> <span className="ref">Su. Cikitsāsthāna 16</span><i>. Documented transmission: Gentleman’s Magazine (Oct 1794) → Carpue’s operations (1814) → modern plastic surgery.</i></div>
        <div className="leaf"><b>Vāgbhaṭa — Aṣṭāṅgahṛdaya</b> <i>(~600 CE) completes the “Great Trio” (Bṛhat Trayī).</i></div>
        <div className="leaf"><b>Tridoṣa systems model</b> <span className="ref">CS Sūtrasthāna 1</span> <span className="tier T2">T2</span> <i>— teach as a systems/homeostasis framework &amp; history of medicine, not validated physiology.</i></div>
        <span className="map">history of surgery &amp; clinical method · medical epistemology · scientific-debate ethics</span>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Dhanurveda</span><span className="skt">martial science · YV</span></summary>
      <div className="body"><p>Survives in fragments; chapters preserved in <span className="ref">Agni Purāṇa 249–252</span>. Feeds later martial traditions (e.g., kaḷaripayaṭṭu lineage claims — treat lineage claims as T2).</p></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Gāndharvaveda</span><span className="skt">music &amp; performing arts · SV</span></summary>
      <div className="body"><p>Flows into the Nāṭyaśāstra (Phase 8) and the rāga system; C. V. Raman’s 1920s acoustics papers on the tabla and mṛdaṅgam are its modern continuation <span className="tier T1">T1</span>.</p><span className="map">acoustics · psychoacoustics · music theory</span></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Sthāpatyaveda / Artha tradition</span><span className="skt">architecture &amp; statecraft · AV</span></summary>
      <div className="body"><div className="leaf"><b>Vāstu corpus</b> <i>— Mayamata, Mānasāra (temple architecture, town planning grids).</i><span className="map">architectural geometry · urban-planning history</span></div></div>
    </details>
  </div>
  <div className="branchlbl">Branch B — The Nāstika / Śramaṇa systems</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Buddhism</span><span className="skt">Gautama Buddha, c. 5th c. BCE</span></summary>
      <div className="body">
        <div className="leaf"><b>Tripiṭaka</b> <i>— Vinaya, Sutta, Abhidhamma; Pāli Canon committed to writing c. 29 BCE (Fourth Council, Sri Lanka).</i></div>
        <div className="leaf"><b>Nāgārjuna — Mūlamadhyamakakārikā</b> <i>(c. 150–250 CE): śūnyatā; the catuṣkoṭi four-cornered logic</i> <span className="ref">MMK 18.8</span> <span className="tier T2">T2</span><span className="map">non-classical &amp; paraconsistent logic — see Priest &amp; Garfield, Philosophy East and West</span></div>
        <div className="leaf"><b>Abhidhamma psychology</b> <i>— momentariness, factor-analysis of mind-states.</i><span className="map">cognitive taxonomy · attention science lineage (→ mindfulness research)</span></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Jainism</span><span className="skt">Mahāvīra, c. 5th c. BCE</span></summary>
      <div className="body">
        <div className="leaf"><b>Āgamas</b> <i>— canonical corpus; anekāntavāda (many-sidedness) and syādvāda: the seven-valued saptabhaṅgī predication.</i> <span className="tier T2">T2</span><span className="map">multi-valued logic · epistemic humility frameworks</span></div>
        <div className="leaf"><b>Jain mathematics of the infinite</b> <span className="ref">Sūrya Prajñapti, c. 4th–3rd c. BCE</span> <span className="tier T2">T2</span><br /><i>Numbers classified enumerable / innumerable / infinite — with multiple kinds of infinity.</i><span className="map">set-theoretic intuitions · compare Cantor (parallel, not anticipation)</span></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Cārvāka / Lokāyata</span><span className="skt">indigenous materialism &amp; empiricism</span><span className="tier T1">T1</span></summary>
      <div className="body"><p>Only pratyakṣa (perception) is a valid means of knowledge; rejection of testimony-authority. Survives mainly through opponents’ quotations — e.g., <span className="ref">Sarvadarśanasaṃgraha ch. 1 (Mādhava, 14th c.)</span>. <strong>India’s own skeptical-empiricist school</strong> — crucial for honest curriculum design.</p><span className="map">philosophy of science · evidence standards · skepticism</span></div>
    </details>
    <div className="leaf"><b>Ājīvika</b> <i>— Makkhali Gosāla’s determinism (niyati); known via Buddhist &amp; Jain sources.</i></div>
  </div>
</section>


<section className="phase" data-n="7">
  <div className="eyebrow">Cosmic analogue · Solar systems form</div>
  <h2>The Six Darśanas</h2>
  <div className="dates">SCHOLARLY <b>c. 400 BCE – 500 CE (root texts)</b></div>
  <p className="lead">Orthodox philosophy crystallizes into six systems — three classical pairs — each with a founder-sūtra and a two-millennium commentary chain.</p>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Nyāya</span><span className="skt">logic &amp; epistemology — Gautama Akṣapāda, Nyāya Sūtras</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>Four pramāṇas</b> <span className="ref">NS 1.1.3–8</span> <i>— perception, inference, comparison, testimony.</i><span className="map">epistemology · evidence standards · misinformation literacy</span></div>
        <div className="leaf"><b>Five-membered public syllogism</b> <span className="ref">NS 1.1.32–39</span><span className="map">argumentation theory — compare Aristotle</span></div>
        <div className="leaf"><b>Debate typology: vāda / jalpa / vitaṇḍā</b> <span className="ref">NS 1.2.1–3</span> <i>— truth-seeking vs win-seeking vs destructive debate.</i><span className="map">discourse ethics · social-media literacy</span></div>
        <div className="leaf"><b>Navya-Nyāya</b> <i>— Gaṅgeśa’s Tattvacintāmaṇi (c. 1325): a precision technical language of cognition.</i> <span className="tier T2">T2</span><span className="map">formal semantics (see B. K. Matilal, The Character of Logic in India)</span></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Vaiśeṣika</span><span className="skt">natural categories — Kaṇāda, Vaiśeṣika Sūtras</span><span className="tier T2">T2</span></summary>
      <div className="body"><p>Categories (padārtha) of reality; <strong>paramāṇu</strong> — indivisible atoms combining in dyads and triads <span className="ref">VS 1.1; 4.1–4.2</span>; elaborated by Praśastapāda. <strong>Philosophical atomism</strong> parallel to Democritus — never to be sold as modern atomic theory.</p><span className="map">ancient atomisms compared: Kaṇāda ↔ Democritus ↔ Dalton — how humans reasoned toward discreteness before instruments</span></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Sāṃkhya</span><span className="skt">enumeration — Kapila (trad.); Īśvarakṛṣṇa’s Sāṃkhyakārikā c. 350 CE</span><span className="tier T2">T2</span></summary>
      <div className="body"><p>Puruṣa (consciousness) + prakṛti (nature) → 23 evolutes; three guṇas; satkāryavāda (effect pre-exists in its cause).</p><span className="map">systems thinking · emergence · observer/observed distinction — handle any quantum analogy strictly as T2 discussion</span></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Yoga</span><span className="skt">Patañjali, Yoga Sūtras — 196 sūtras, 4 pādas</span><span className="tier T1">T1</span><span className="meta">c. 200 BCE–400 CE</span></summary>
      <div className="body">
        <div className="leaf"><b>“yogaś citta-vṛtti-nirodhaḥ”</b> <span className="ref">YS 1.2</span> <i>— stilling the fluctuations of mind; attention-training taxonomy</i> <span className="ref">YS 1.12–16; 2.29; 3.1–3</span>.</div>
        <div className="leaf"><b>Modern continuation (real research)</b> <i>— contemplative neuroscience: Lutz, Slagter, Dunne &amp; Davidson, Trends in Cognitive Sciences (2008); Tang, Hölzel &amp; Posner, Nature Reviews Neuroscience (2015); MBSR’s documented adaptation lineage (Kabat-Zinn, 1979).</i></div>
        <span className="map">attention networks · interoception · respiratory physiology (YS 2.49–53; Haṭhayogapradīpikā ch. 2)</span>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Mīmāṃsā</span><span className="skt">hermeneutics — Jaimini, Mīmāṃsā Sūtras</span><span className="meta">c. 300–200 BCE</span></summary>
      <div className="body"><p>Theory of Vedic injunction, language and sentence-meaning; its interpretive maxims were historically applied in Hindu jurisprudence <span className="tier T1">T1</span>.</p><span className="map">philosophy of language · legal interpretation theory</span></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Vedānta</span><span className="skt">Bādarāyaṇa, Brahma Sūtras — systematizing the Upaniṣads</span><span className="meta">c. 200 BCE–200 CE</span></summary>
      <div className="body"><p>The prasthānatrayī — Upaniṣads + Brahma Sūtras + Bhagavad Gītā — becomes the triple foundation every later school must comment on. Its great diversification arrives in Phase 10.</p></div>
    </details>
  </div>
</section>


<section className="phase" data-n="8">
  <div className="eyebrow">Cosmic analogue · Planet formation — specialized worlds</div>
  <h2>Itihāsa · Purāṇa · The Great Śāstras</h2>
  <div className="dates">SCHOLARLY <b>c. 400 BCE – 500 CE (cores); Purāṇas compiled to ~1000 CE</b></div>
  <p className="lead">Knowledge is planetized into vast narrative worlds and specialized technical treatises — law, statecraft, aesthetics, agriculture — plus the parallel <strong>Tamil galaxy</strong>.</p>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Mahābhārata</span><span className="skt">Vyāsa (trad.) — the longest epic on Earth</span><span className="meta">~100,000 VERSES · 18 PARVANS</span></summary>
      <div className="body">
        <p>~10× the Iliad + Odyssey combined. Scholarly citation basis: <strong>BORI critical edition</strong> (Pune, 1919–1966).</p>
        <div className="leaf"><b>Bhagavad Gītā</b> <i>(Bhīṣma Parvan; 18 chapters, 700 verses)</i> — action without attachment to outcomes <span className="ref">BG 2.47</span> <span className="tier T2">T2</span>; impermanence of sensation <span className="ref">BG 2.14</span>; autonomy of reason: “reflect fully, then do as you choose” <span className="ref">BG 18.63</span><span className="map">decision theory under uncertainty · process-over-outcome performance psychology</span></div>
        <div className="leaf"><b>Śānti Parvan science-adjacent passages</b> <span className="ref">MBh 12.184</span> <i>— debate on whether plants sense and respond.</i> <span className="tier T2">T2</span><span className="map">plant-signaling science — J. C. Bose’s crescograph is the historical bridge</span></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Rāmāyaṇa</span><span className="skt">Vālmīki — the ādikāvya, first poem</span><span className="meta">~24,000 VERSES · 7 KĀṆḌAS</span></summary>
      <div className="body"><p>Foundation of Indian poetics and of two millennia of retellings across Asia. Critical edition: Baroda.</p></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">The 18 Mahāpurāṇas</span><span className="skt">encyclopedic narrative universes</span><span className="meta">COMPILED c. 300–1000 CE</span></summary>
      <div className="body">
        <p>Viṣṇu · Bhāgavata · Śiva · Liṅga · Skanda · Mārkaṇḍeya (contains the Devī Māhātmya) · Agni (an encyclopedia: medicine, grammar, archery) · Matsya · Vāyu · Brahmāṇḍa · Brahma · Brahmavaivarta · Padma · Vāmana · Varāha · Kūrma · Nārada · Garuḍa · Bhaviṣya.</p>
        <div className="leaf"><b>Deep-time cyclic cosmology</b> <span className="ref">Bhāgavata P. 3.11 · Viṣṇu P. 1.3 · Manusmṛti 1.64–73</span> <span className="tier T2">T2</span><br /><i>kalpa = 4.32 billion years (“a day of Brahmā”); nested yuga cycles; plural world-systems. Carl Sagan (Cosmos, 1980, ch. 10) noted these are the only ancient timescales commensurate with modern cosmology — conceptual comfort with deep time, not a Big Bang prediction.</i><span className="map">cosmological timescales · cyclic-universe models as idea-parallels</span></div>
        <div className="leaf"><b>Kakudmī’s journey</b> <span className="ref">Bhāgavata P. 9.3.28–36</span> <span className="tier T2">T2</span> <i>— returns to find ages passed: a narrative hook (story-parallel only) for teaching relativistic time dilation.</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Technical Śāstras</span><span className="skt">the specialized planets</span></summary>
      <div className="body">
        <div className="leaf"><b>Arthaśāstra</b> <i>— Kauṭilya/Cāṇakya, c. 300 BCE–300 CE; rediscovered 1905 (Shamasastry). Taxation, espionage, welfare economics; 40 ways of embezzlement</i> <span className="ref">AŚ 2.8</span> <span className="tier T1">T1</span><span className="map">public administration · principal–agent problems · compare Machiavelli (1,800 yrs later)</span></div>
        <div className="leaf"><b>Nāṭyaśāstra</b> <i>— Bharata Muni, c. 200 BCE–200 CE. Rasa theory of aesthetic emotion</i> <span className="ref">NŚ ch. 6–7</span> <i>+ Abhinavagupta’s Abhinavabhāratī.</i> <span className="tier T2">T2</span><span className="map">affective science · emotion taxonomies (compare Ekman) · UX &amp; film studies</span></div>
        <div className="leaf"><b>Dharmaśāstra</b> <i>— Manusmṛti, Yājñavalkya Smṛti (c. 200 BCE–300 CE): legal history — handle social-hierarchy content critically and honestly.</i></div>
        <div className="leaf"><b>Kāmasūtra</b> <i>— Vātsyāyana, c. 200–300 CE: the 64 arts, social history.</i></div>
        <div className="leaf"><b>Kṛṣi-Parāśara</b> <i>(~1000 CE) — agronomy: rainfall prognosis, seed treatment, cattle care.</i><span className="map">sustainable agriculture heritage</span></div>
        <div className="leaf"><b>Aśva- &amp; Gaja-śāstra</b> <i>— veterinary treatises (Śālihotra tradition).</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">The Tamil Galaxy</span><span className="skt">the parallel Dravidian stream</span><span className="tier T1">T1</span><span className="meta">c. 300 BCE–300 CE</span></summary>
      <div className="body"><p><strong>Tolkāppiyam</strong> (grammar &amp; poetics) and the <strong>Saṅgam corpus</strong> (Eṭṭuttokai, Pattuppāṭṭu) — India’s knowledge big bang is not Sanskrit-only. Later: Tirukkuṟaḷ (Tiruvaḷḷuvar, c. 1st c. BCE–5th c. CE), 1,330 couplets of ethics, economics and love.</p><span className="map">comparative poetics · secular ethics curriculum</span></div>
    </details>
  </div>
</section>


<section className="phase" data-n="9">
  <div className="eyebrow">Cosmic analogue · The habitable zone — life-dense era</div>
  <h2>The Classical Scientific Golden Age</h2>
  <div className="dates">SCHOLARLY <b>c. 400 – 1200 CE</b></div>
  <p className="lead">The densest T1 layer in the whole simulation — textbook history of science with exact verses, and a fully documented transmission chain into the Islamic world and Europe.</p>
  <div className="tree">
    <details open>
      <summary><span className="tw">▸</span><span className="name">Āryabhaṭa</span><span className="skt">b. 476 CE — Āryabhaṭīya (499 CE): 121 verses, 4 pādas</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>π ≈ 62832/20000 = 3.1416, flagged “āsanna” (approximate)</b> <span className="ref">ĀBh Gaṇitapāda 10</span> <i>— awareness of inexactness. Critical edition: K. S. Shukla (INSA, 1976).</i></div>
        <div className="leaf"><b>Earth’s rotation — the boat analogy</b> <span className="ref">ĀBh Gola 9–10</span> <i>— as a boatman sees the bank move backward, so the fixed stars appear to move west.</i><span className="map">reference frames · relativity of motion</span></div>
        <div className="leaf"><b>Sine (jyā) table</b> <span className="ref">ĀBh Gītikā 12</span> <i>— trigonometry’s Indian branch (jyā → Arabic jayb → Latin sinus = “sine”: a documented etymological transmission).</i></div>
        <div className="leaf"><b>Kuṭṭaka “pulverizer”</b> <span className="ref">ĀBh Gaṇita 32–33</span> <i>— linear indeterminate equations (extended-Euclid family).</i><span className="map">Diophantine equations · CRT — mathematics inside modern cryptography</span></div>
        <div className="leaf"><b>Rational eclipse mechanics</b> <span className="ref">ĀBh Gola</span> <i>— shadows, not Rāhu. NASA-launched Indian satellite “Aryabhata” (1975) honors him.</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Varāhamihira</span><span className="skt">c. 505–587 — Pañcasiddhāntikā · Bṛhat Saṃhitā</span><span className="tier T1">T1</span></summary>
      <div className="body"><p>Summarizes five astronomical schools including Romaka (“Roman”) and Pauliśa — documenting <strong>Greco-Indian exchange</strong>: knowledge flowed both ways, and the honest platform says so.</p></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Brahmagupta</span><span className="skt">598–668 — Brāhmasphuṭasiddhānta (628 CE)</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>First systematic rules for zero &amp; negative numbers</b> <span className="ref">BSpS ch. 18</span> <i>— fortunes/debts/śūnya arithmetic, incl. a − a = 0; his one famous error: 0/0 = 0.</i><span className="map">number systems · ring axioms · “Biography of Zero” flagship module</span></div>
        <div className="leaf"><b>Cyclic quadrilateral area formula; Brahmagupta identity; 2nd-order interpolation</b> <span className="ref">BSpS ch. 12</span></div>
        <div className="leaf"><b>The Transmission Chain</b> <i>— Sindhind to Baghdad (~770 CE) → al-Khwārizmī (whose name gives “algorithm”) → Hindu-Arabic numerals → Fibonacci’s Liber Abaci (1202) → Europe. Fully documented: Plofker, Mathematics in India (2009), ch. 8.</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Bhāskara I · Mahāvīra · Śrīdhara · Śrīpati</span><span className="skt">7th–11th c. consolidation</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>Bhāskara I — sine approximation</b> <span className="ref">Mahābhāskarīya 7.17–19</span> <i>— rational formula accurate to ~0.2%.</i></div>
        <div className="leaf"><b>Mahāvīra (Jain) — Gaṇitasārasaṅgraha (~850)</b> <i>— first Indian text purely of mathematics; explicit nCr combinations rule.</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Bhāskara II (Bhāskarācārya)</span><span className="skt">1114–1185 — Siddhāntaśiromaṇi</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>Līlāvatī</b> <i>(arithmetic) — problem-based, gamified pedagogy from 1150 CE; permutation &amp; combination verses ready for course decks.</i></div>
        <div className="leaf"><b>Bījagaṇita</b> <i>(algebra) — cakravāla cyclic method solving x² = 61y² + 1; matched in Europe only via Lagrange’s continued fractions (17th–18th c.).</i></div>
        <div className="leaf"><b>Grahagaṇita &amp; Golādhyāya</b> <i>— tātkālika-gati: proto-instantaneous motion in planetary computation.</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Rasaśāstra</span><span className="skt">alchemy &amp; proto-chemistry — Nāgārjuna corpus, Rasaratnākara</span><span className="meta">c. 700–1300</span></summary>
      <div className="body"><p>Distillation, calcination, mercury operations, apparatus (yantras). <span className="tier T1">T1</span> as history of chemistry — never as modern pharmacology claims.</p></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">The University Network</span><span className="skt">institutional layer</span><span className="tier T1">T1</span></summary>
      <div className="body"><p><strong>Takṣaśilā</strong> (older) · <strong>Nālandā</strong> (c. 427–1197 CE; destroyed by Bakhtiyar Khalji) · Vikramaśīla · Vallabhī · Odantapurī — residential, multi-disciplinary, international. Primary source: <strong>Xuanzang’s Great Tang Records of the Western Regions (646 CE)</strong>.</p><span className="map">history of higher education · campus-model archaeology</span></div>
    </details>
  </div>
</section>


<section className="phase" data-n="10">
  <div className="eyebrow">Cosmic analogue · Complex life — speciation</div>
  <h2>Vedānta Diversifies · Tantra · Bhakti · The Kerala School</h2>
  <div className="dates">SCHOLARLY <b>c. 700 – 1600 CE</b></div>
  <p className="lead">Philosophy speciates into rival Vedāntas; knowledge vernacularizes through Bhakti; and on the Malabar coast a lineage of mathematicians reaches <strong>calculus-grade infinite series, ~250 years before Newton and Leibniz.</strong></p>
  <div className="branchlbl">Branch A — The Vedānta speciation event</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Six-plus schools</span><span className="skt">ācārya · dates · thesis · key work</span></summary>
      <div className="body">
        <div className="leaf"><b>Advaita</b> <i>— Ādi Śaṅkara (c. 700–750 CE; trad. earlier): non-dualism; Brahman alone real. Brahmasūtra-bhāṣya, Upadeśasāhasrī.</i></div>
        <div className="leaf"><b>Viśiṣṭādvaita</b> <i>— Rāmānuja (1017–1137): world &amp; souls as the body of Brahman. Śrī Bhāṣya.</i></div>
        <div className="leaf"><b>Dvaita</b> <i>— Madhva (1238–1317): five eternal differences. Anuvyākhyāna.</i></div>
        <div className="leaf"><b>Dvaitādvaita</b> <i>— Nimbārka (~13th c.). Vedānta-pārijāta-saurabha.</i> · <b>Śuddhādvaita</b> <i>— Vallabha (1479–1531). Aṇubhāṣya.</i> · <b>Acintya-bhedābheda</b> <i>— Caitanya (1486–1534), via the Gosvāmī corpus.</i></div>
        <div className="leaf"><b>Kashmir Śaivism</b> <i>(parallel non-Vedāntic summit) — Vasugupta → Abhinavagupta (c. 950–1016): pratyabhijñā recognition-philosophy, spanda dynamism. Tantrāloka.</i> <span className="tier T2">T2</span><span className="map">consciousness-studies seminars · aesthetics (Abhinavagupta bridges rasa &amp; metaphysics)</span></div>
      </div>
    </details>
  </div>
  <div className="branchlbl">Branch B — The Kerala School of Mathematics (c. 1340–1630) — strongest T1 asset</div>
  <div className="tree">
    <details open>
      <summary><span className="tw">▸</span><span className="name">Mādhava of Saṅgamagrāma → lineage</span><span className="skt">infinite series before Europe</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>Mādhava (c. 1340–1425)</b> <i>— infinite series for π (the “Mādhava–Leibniz” series, ~250 yrs before Leibniz); power series for sine &amp; cosine (“Mādhava–Newton”); correction terms giving π to 11 decimals.</i></div>
        <div className="leaf"><b>Parameśvara (c. 1380–1460)</b> <i>— ~55 years of recorded eclipse observations; observational rigor.</i></div>
        <div className="leaf"><b>Nīlakaṇṭha Somayājī (1444–1544) — Tantrasaṅgraha (1501)</b> <i>— planetary model with inner planets orbiting the Sun, pre-dating Tycho Brahe’s comparable geo-heliocentric scheme. Ref.: Ramasubramanian, Srinivas &amp; Sriram, Current Science 66 (1994) 784–790.</i></div>
        <div className="leaf"><b>Jyeṣṭhadeva — Yuktibhāṣā (~1530, in Malayalam)</b> <i>— contains derivations/proofs of the series results; described by historians as among the first texts of calculus-like analysis.</i></div>
        <div className="leaf"><b>Transmission to Europe?</b> <span className="tier T2">T2</span> <i>— the Jesuit-conduit hypothesis (C. K. Raju et al.) is an open research question: interesting, unproven, labeled as such.</i></div>
        <span className="map">calculus · power series · convergence — the “Calculus Was Born Twice” bridge course</span>
      </div>
    </details>
  </div>
  <div className="branchlbl">Branch C — Vernacularization &amp; synthesis</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Bhakti &amp; Sant movements</span><span className="skt">c. 600–1700 — mass knowledge access</span><span className="tier T2">T2</span></summary>
      <div className="body"><p>Āḻvārs &amp; Nāyanmārs (Tamil) → Jñāneśvar’s Jñāneśvarī (1290, Marathi Gītā commentary) → Kabīr, Mīrābāī, Sūrdās, Tulsīdās (Rāmcaritmānas, 1574), Basava’s vacanas (Kannada). Knowledge moves from Sanskrit gatekeeping to the people’s languages.</p><span className="map">open-access publishing parallel · sociology of knowledge</span></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Sikhism</span><span className="skt">Guru Nānak (1469–1539) → Guru Granth Sāhib</span><span className="tier T1">T1</span></summary>
      <div className="body"><p>Ādi Granth compiled 1604 by Guru Arjan; finalized 1705 — unique among world scriptures for canonizing poetry of multiple traditions, Hindu sants and Muslim Sufis alike.</p></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Persian–Sanskrit synthesis</span><span className="skt">the bridge that reached Europe</span><span className="tier T1">T1</span></summary>
      <div className="body"><p>Amir Khusrau’s syntheses → <strong>Dārā Śikoh’s Sirr-i-Akbar (1657)</strong>, Persian translation of 50 Upaniṣads → Anquetil-Duperron’s Latin <strong>Oupnek’hat (1801–02)</strong> → Schopenhauer → Western philosophy. A fully documented transmission chain.</p></div>
    </details>
  </div>
</section>


<section className="phase" data-n="11">
  <div className="eyebrow">Cosmic analogue · Mass extinction &amp; adaptation</div>
  <h2>Colonial Encounter &amp; the Birth of Indology</h2>
  <div className="dates"><b>1600 – 1900 CE</b></div>
  <p className="lead">Old institutions are long gone (Nālandā fell ~1197), the Company and Crown reshape everything — and yet the encounter itself detonates a new science in Europe: <strong>comparative linguistics</strong>.</p>
  <div className="tree">
    <div className="leaf"><b>1784 — Asiatic Society of Bengal</b> <i>founded by Sir William Jones; his Third Anniversary Discourse (1786) proposes the Sanskrit–Greek–Latin common source →</i> <b>Proto-Indo-European &amp; comparative linguistics are born.</b> <span className="tier T1">T1</span></div>
    <div className="leaf"><b>1785 — Wilkins’ English Bhagavad Gītā</b> <i>→ Emerson &amp; Thoreau (Walden; Transcendentalism); Gandhi first reads the Gītā in London through Edwin Arnold’s The Song Celestial (1885) — documented in his Autobiography, Part I.</i> <span className="tier T1">T1</span></div>
    <div className="leaf"><b>1849–1874 — Max Müller’s Ṛgveda edition</b> <i>(with Sāyaṇa’s commentary); then the 50-volume Sacred Books of the East (1879–1910).</i></div>
    <div className="leaf"><b>1881 — Bakhshali Manuscript found</b> <i>— birch-bark mathematics; 2017 Bodleian radiocarbon dating placed folios as early as c. 3rd–4th c. CE — possibly the oldest extant written zero-dot; the dating remains debated: both views shown.</i> <span className="tier T1">T1</span>/<span className="tier T2">T2</span></div>
    <div className="leaf"><b>Indigenous response</b> <i>— Raja Ram Mohan Roy (Brahmo Samāj, 1828; Upaniṣad translations) · Dayānanda Sarasvatī (Ārya Samāj, 1875) · </i><b>Swami Vivekananda, Chicago, 11 September 1893</b><i> — the West’s mass introduction to Vedānta · Sri Aurobindo, The Life Divine.</i></div>
  </div>
</section>


<section className="phase" data-n="12">
  <div className="eyebrow">Cosmic analogue · Modern civilization</div>
  <h2>The Indian Scientific Renaissance</h2>
  <div className="dates"><b>1850 CE – present</b></div>
  <p className="lead">The ancient stream and modern science visibly interweave — in real, citable people and papers.</p>
  <div className="tree">
    <details open>
      <summary><span className="tw">▸</span><span className="name">The Renaissance Generation</span><span className="skt">verified contributions · documented heritage links</span><span className="tier T1">T1</span></summary>
      <div className="body">
        <div className="leaf"><b>Srinivasa Ramanujan (1887–1920)</b> <i>— partition asymptotics with Hardy, mock theta functions, 3,900+ results; the Lost Notebook still yields papers. Attributed insights to goddess Nāmagiri (documented by Hardy; Kanigel, The Man Who Knew Infinity, 1991) — the definitive case study of intuition vs proof.</i></div>
        <div className="leaf"><b>Jagadish Chandra Bose (1858–1937)</b> <i>— millimetre-wave radio pioneer (1895 Kolkata demonstrations; IEEE-recognized priority in mm-band research); plant electrophysiology via the crescograph; refused patents on an openly stated knowledge-as-commons ethic.</i></div>
        <div className="leaf"><b>C. V. Raman (1888–1970)</b> <i>— Raman effect, 28 Feb 1928 → Nobel 1930; earlier acoustics papers on tabla &amp; mṛdaṅgam — Gāndharvaveda-descended music meeting physics.</i></div>
        <div className="leaf"><b>Satyendra Nath Bose (1894–1974)</b> <i>— 1924 photon-statistics paper sent to Einstein → Bose–Einstein statistics, bosons, BEC (realized 1995; Nobel 2001 to Cornell, Wieman, Ketterle).</i></div>
        <div className="leaf"><b>Meghnad Saha (1893–1956)</b> <i>— Saha ionization equation (1920), foundation of stellar spectroscopy; chaired the 1952 Calendar Reform Committee — modern astronomy directly engaging the Jyotiṣa heritage.</i></div>
        <div className="leaf"><b>P. C. Mahalanobis (1893–1972)</b> <i>— Mahalanobis distance; Indian Statistical Institute (1931).</i></div>
        <div className="leaf"><b>Continuing line</b> <i>— Homi Bhabha (Bhabha scattering) · S. Chandrasekhar (Chandrasekhar limit; Nobel 1983) · Venki Ramakrishnan (ribosome; Nobel 2009) · Abhijit Banerjee (Nobel 2019) · ISRO: Aryabhata satellite (1975) → Chandrayaan-3 south-pole landing (23 Aug 2023) → Aditya-L1 — mission names consciously drawn from the Sanskrit heritage.</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">The Policy Layer</span><span className="skt">the present node of the simulation</span><span className="meta">2020 – NOW</span></summary>
      <div className="body"><p><strong>NEP 2020</strong> mandates Indian Knowledge Systems integration; the Ministry of Education’s <strong>IKS Division (2020, AICTE)</strong> funds research &amp; courseware; UGC guidelines (2023) permit IKS credits in degrees. The thread you have been descending is now, again, a living curriculum.</p></div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">The T3 Gallery — What This Simulation Excludes</span><span className="skt">myth-busting = credibility</span><span className="tier T3">T3</span></summary>
      <div className="body"><p>“Vedas contain quantum mechanics / nuclear weapons / spacecraft” — unsupported. The <strong>Vaimānika Śāstra</strong> was analyzed by an IISc Bengaluru team (Mukunda et al., 1974) and shown to be an early-20th-century composition, aeronautically unsound. Parallel ≠ prediction; inspiration ≠ derivation. The strength of everything above is that it needs no exaggeration.</p></div>
    </details>
  </div>
</section>


                <div style={{ marginTop: '80px', padding: '40px 20px', textAlign: 'center', borderTop: '1px solid var(--text-hint)' }}>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
                        “Then, there was neither existence nor non-existence… Whence this creation arose — perhaps it formed itself, or perhaps it did not — only He who surveys it in highest heaven knows. Or perhaps even He does not know.”
                    </p>
                    <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.15em', marginTop: '16px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        NĀSADĪYA SŪKTA · ṚGVEDA 10.129.1, 6–7
                    </p>
                </div>
            
            </main>
        </div>
    );
};

export default WhyPrarthana;
