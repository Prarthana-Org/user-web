import React from 'react';

const Flowchart = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen content-center flowchart-container">
            <style dangerouslySetInnerHTML={{__html: `
:root{
  --bg:#F7F5F0;            /* warm paper */
  --panel:#FFFFFF;
  --panel2:#FCFBF8;
  --ink:#20242E;           /* near-black text */
  --body:#4C5566;
  --faint:#8A91A0;
  --gold:#A9791E;          /* muted amber accent */
  --gold-dim:rgba(169,121,30,.35);
  --gold-bg:rgba(169,121,30,.07);
  --sindoor:#C24A26;       /* muted vermillion */
  --green:#2E7D53;
  --line:#E6E2D8;
  --shadow:0 1px 3px rgba(32,36,46,.06),0 4px 14px rgba(32,36,46,.05);
  --disp:'League Spartan',ui-sans-serif,sans-serif;
  --sans:'Josefin Sans',ui-sans-serif,sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
.flowchart-container{background:var(--bg);color:var(--body);font-family:var(--sans);font-weight:400;line-height:1.65}
::selection{background:var(--sindoor);color:#fff}
.wrap{max-width:1120px;margin:0 auto;padding:0 24px;position:relative}

/* hero */
.hero{text-align:center;padding:84px 24px 36px}
.hero .om{color:var(--gold);font-size:2rem}
.hero .tag{font-family:var(--sans);font-weight:600;font-size:.68rem;letter-spacing:.32em;color:var(--sindoor);text-transform:uppercase;margin:16px 0 12px}
.hero h1{font-family:var(--disp);font-weight:700;color:var(--ink);font-size:clamp(2.4rem,6.4vw,4.4rem);line-height:1.02;letter-spacing:-.01em}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero p{max-width:700px;margin:20px auto 0;font-size:1.02rem}

/* master flowchart */
.mapblock{margin:30px 0 16px;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:26px 16px 14px;box-shadow:var(--shadow);overflow-x:auto}
.mapblock h2{font-family:var(--sans);font-weight:600;font-size:.68rem;letter-spacing:.3em;color:var(--faint);text-transform:uppercase;text-align:center;margin-bottom:10px}
.mapblock svg{min-width:800px}
svg text{font-family:'Josefin Sans',sans-serif}
.fc-box{fill:var(--panel2);stroke:#D8D3C6;stroke-width:1.2}
.fc-root{fill:var(--gold-bg);stroke:var(--gold);stroke-width:1.4}
.fc-trunk{fill:rgba(194,74,38,.06);stroke:rgba(194,74,38,.5);stroke-width:1.4}
.fc-line{stroke:#C9C3B4;stroke-width:1.4;fill:none}
.fc-arrow{stroke:var(--gold);stroke-width:1.5;fill:none;marker-end:url(#arr)}
.fc-dash{stroke:#C9C3B4;stroke-width:1.2;fill:none;stroke-dasharray:3 5}
.fc-t{fill:var(--ink);font-size:14.5px;font-weight:700;text-anchor:middle;letter-spacing:.06em}
.fc-s{fill:var(--faint);font-size:9.8px;font-weight:500;text-anchor:middle;letter-spacing:.09em}
.fc-tr{fill:var(--gold);font-size:16px;font-weight:700;text-anchor:middle;letter-spacing:.16em}
.fc-note{fill:var(--faint);font-size:10px;font-weight:500;text-anchor:middle;letter-spacing:.08em}

/* section headers */
.trunk{position:relative;padding:52px 0 8px}
.trunk .eyebrow{font-family:var(--sans);font-weight:600;font-size:.66rem;letter-spacing:.32em;text-transform:uppercase;color:var(--sindoor);margin-bottom:10px}
.trunk h2{font-family:var(--disp);font-weight:700;color:var(--ink);font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.05;letter-spacing:-.01em}
.trunk p.lead{max-width:800px;margin:14px 0 8px;font-size:1rem}
.trunk p.lead strong{color:var(--ink);font-weight:600}

/* tree */
.tree{border-left:2px solid var(--line);margin:20px 0 0 6px}
details{margin:0 0 12px 20px;position:relative}
details::before{content:"";position:absolute;left:-22px;top:21px;width:16px;height:2px;background:var(--line)}
summary{list-style:none;cursor:pointer;display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:13px 18px;transition:border-color .2s,box-shadow .2s;box-shadow:var(--shadow)}
summary::-webkit-details-marker{display:none}
summary:hover{border-color:var(--gold-dim);box-shadow:0 2px 6px rgba(32,36,46,.08),0 8px 22px rgba(32,36,46,.07)}
summary .tw{color:var(--gold);font-size:.72rem;transition:transform .25s;font-weight:700}
details[open]>summary .tw{transform:rotate(90deg)}
summary .name{font-family:var(--disp);font-size:1.12rem;font-weight:700;color:var(--ink);letter-spacing:.01em}
summary .skt{font-style:italic;color:var(--faint);font-size:.88rem}
summary .meta{font-weight:600;font-size:.62rem;color:var(--faint);letter-spacing:.14em;margin-left:auto;text-transform:uppercase}
..flowchart-container{padding:14px 8px 4px 18px;border-left:2px dashed var(--line);margin:10px 0 0 10px}
.body>p{font-size:.94rem;margin-bottom:10px;max-width:760px}
details details summary{background:var(--panel2);box-shadow:none}
.leaf{margin:0 0 10px 20px;position:relative;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px 16px;font-size:.92rem;box-shadow:var(--shadow)}
.leaf::before{content:"";position:absolute;left:-22px;top:21px;width:16px;height:2px;background:var(--line)}
.leaf b{font-family:var(--disp);font-size:1rem;color:var(--ink);font-weight:700}
.leaf i{color:var(--faint)}

/* DEF / SYMBOL / WHY rows */
.k{display:grid;grid-template-columns:96px 1fr;gap:6px 14px;margin:10px 0 4px;font-size:.92rem}
.k b{font-family:var(--sans);font-weight:700;font-size:.6rem;letter-spacing:.18em;padding-top:5px;text-transform:uppercase}
.k b.d{color:var(--gold)} .k b.s{color:var(--sindoor)} .k b.w{color:var(--green)}
.k span strong{color:var(--ink);font-weight:600}
.ref{font-weight:600;font-size:.68rem;color:var(--gold);background:var(--gold-bg);border:1px solid var(--gold-dim);border-radius:5px;padding:2px 8px;white-space:nowrap;letter-spacing:.04em}

/* tables */
table{border-collapse:collapse;margin:10px 0 14px;font-size:.88rem;width:100%;max-width:800px;background:var(--panel);border-radius:10px;overflow:hidden}
th{font-weight:700;font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--faint);text-align:left;padding:10px 12px;border-bottom:2px solid var(--line);background:var(--panel2)}
td{padding:9px 12px;border-bottom:1px solid #EFECE4;vertical-align:top}
td b{color:var(--ink);font-weight:700;font-family:var(--disp);font-size:.95rem}
td i{color:var(--faint)}

.branchlbl{font-weight:700;font-size:.64rem;letter-spacing:.26em;text-transform:uppercase;color:var(--faint);margin:26px 0 12px 6px}
.branchlbl::before{content:"— ";color:var(--gold)}

/* keys strip */
.keys{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin:26px 0}
.keys div{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px;box-shadow:var(--shadow)}
.keys b{font-family:var(--disp);color:var(--gold);font-size:1.4rem;font-weight:700;display:block;margin-bottom:6px}
.keys p{font-size:.86rem}
.keys strong{color:var(--ink)!important;font-weight:600}

.coda{text-align:center;padding:64px 24px 90px}
.coda .om2{color:var(--gold);font-size:1.5rem}
.coda p{max-width:640px;margin:14px auto 0;font-size:.95rem}
.coda .cite{font-weight:500;font-size:.64rem;color:var(--faint);letter-spacing:.08em;margin-top:24px;line-height:2;text-transform:uppercase}
@media(max-width:640px){summary .meta{margin-left:0;width:100%}.k{grid-template-columns:1fr}.k b{padding-top:8px}}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
`}} />
            

<header className="hero">
  <div className="om">ॐ</div>
  <div className="tag">Sanātana Dharma · Complete Scriptural Taxonomy</div>
  <h1>The Canon <em>Tree</em></h1>
  <p>Every component of the scriptures — from the root division of Śruti and Smṛti down to individual texts — with <strong style={{'color': 'var(--gold)', 'fontWeight': '600', }}>definition</strong>, <strong style={{'color': 'var(--sindoor)', 'fontWeight': '600', }}>symbolic meaning</strong>, and <strong style={{'color': 'var(--green)', 'fontWeight': '600', }}>significance</strong> on every node. Open any branch.</p>
</header>

<div className="wrap">

{/* ============ MASTER FLOWCHART ============ */}
<div className="mapblock">
<h2>Master Flowchart — the whole canon at one glance</h2>
<svg viewBox="0 0 1100 760" width="100%" role="img" aria-label="Master flowchart of Sanatana Dharma scriptures">
  <defs><marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#A9791E"/></marker></defs>

  {/* root */}
  <rect className="fc-box fc-root" x="390" y="18" width="320" height="68" rx="12"/>
  <text className="fc-tr" x="550" y="47">SANĀTANA DHARMA</text>
  <text className="fc-s" x="550" y="68">VĀṄMAYA · THE TOTAL SACRED LITERATURE</text>

  {/* root to trunks */}
  <path className="fc-arrow" d="M550 86 L550 110 L230 110 L230 136"/>
  <path className="fc-arrow" d="M550 110 L770 110 L770 136"/>

  {/* trunk I */}
  <rect className="fc-box fc-trunk" x="120" y="138" width="220" height="62" rx="12"/>
  <text className="fc-t" x="230" y="165">ŚRUTI</text>
  <text className="fc-s" x="230" y="186">HEARD · REVEALED · APAURUṢEYA</text>

  {/* trunk II */}
  <rect className="fc-box fc-trunk" x="660" y="138" width="220" height="62" rx="12"/>
  <text className="fc-t" x="770" y="165">SMṚTI</text>
  <text className="fc-s" x="770" y="186">REMEMBERED · COMPOSED · APPLIED</text>

  {/* sruti children */}
  <path className="fc-arrow" d="M230 200 L230 218 L160 218 L160 238"/>
  <path className="fc-arrow" d="M230 218 L390 218 L390 238"/>

  <rect className="fc-box" x="60" y="240" width="200" height="56" rx="10"/>
  <text className="fc-t" x="160" y="264">THE 4 VEDAS</text>
  <text className="fc-s" x="160" y="284">ṚG · SĀMA · YAJUR · ATHARVA</text>

  <rect className="fc-box" x="300" y="240" width="180" height="56" rx="10"/>
  <text className="fc-t" x="390" y="264">UPANIṢADS</text>
  <text className="fc-s" x="390" y="284">108 · MUKHYA 10–13</text>

  {/* 4-layer chain */}
  <path className="fc-arrow" d="M160 296 L160 340"/>
  <rect className="fc-box" x="60" y="342" width="200" height="52" rx="10"/>
  <text className="fc-t" x="160" y="364" font-size="13">1 · SAṂHITĀ</text>
  <text className="fc-s" x="160" y="382">MANTRA COLLECTION</text>

  <path className="fc-arrow" d="M160 394 L160 416"/>
  <rect className="fc-box" x="60" y="418" width="200" height="52" rx="10"/>
  <text className="fc-t" x="160" y="440" font-size="13">2 · BRĀHMAṆA</text>
  <text className="fc-s" x="160" y="458">RITUAL EXEGESIS</text>

  <path className="fc-arrow" d="M160 470 L160 492"/>
  <rect className="fc-box" x="60" y="494" width="200" height="52" rx="10"/>
  <text className="fc-t" x="160" y="516" font-size="13">3 · ĀRAṆYAKA</text>
  <text className="fc-s" x="160" y="534">INTERNALIZATION</text>

  <path className="fc-arrow" d="M160 546 L160 568"/>
  <rect className="fc-box" x="60" y="570" width="200" height="52" rx="10"/>
  <text className="fc-t" x="160" y="592" font-size="13">4 · UPANIṢAD</text>
  <text className="fc-s" x="160" y="610">JÑĀNA · VEDĀNTA</text>

  <path className="fc-dash" d="M260 596 L390 596 L390 296"/>
  <text className="fc-note" x="325" y="586">culminates in</text>

  <text className="fc-note" x="230" y="656">4 LAYERS = 4 ĀŚRAMAS</text>
  <text className="fc-note" x="230" y="674">KARMA → UPĀSANĀ → JÑĀNA</text>

  {/* smrti spine */}
  <path className="fc-line" d="M770 200 L770 646"/>

  {/* row 1 */}
  <path className="fc-arrow" d="M770 268 L742 268"/>
  <rect className="fc-box" x="520" y="238" width="220" height="60" rx="10"/>
  <text className="fc-t" x="630" y="260" font-size="13">VEDĀṄGA · 6 LIMBS</text>
  <text className="fc-s" x="630" y="277">ŚIKṢĀ · VYĀKARAṆA · CHANDAS</text>
  <text className="fc-s" x="630" y="290">NIRUKTA · KALPA · JYOTIṢA</text>

  <path className="fc-arrow" d="M770 315 L798 315"/>
  <rect className="fc-box" x="800" y="285" width="220" height="60" rx="10"/>
  <text className="fc-t" x="910" y="307" font-size="13">UPAVEDA · 4</text>
  <text className="fc-s" x="910" y="324">ĀYURVEDA · DHANURVEDA</text>
  <text className="fc-s" x="910" y="337">GĀNDHARVA · STHĀPATYA</text>

  {/* row 2 */}
  <path className="fc-arrow" d="M770 363 L742 363"/>
  <rect className="fc-box" x="520" y="333" width="220" height="60" rx="10"/>
  <text className="fc-t" x="630" y="355" font-size="13">ITIHĀSA · 2 EPICS</text>
  <text className="fc-s" x="630" y="372">RĀMĀYAṆA · MAHĀBHĀRATA</text>
  <text className="fc-s" x="630" y="385">⊃ BHAGAVAD GĪTĀ</text>

  <path className="fc-arrow" d="M770 410 L798 410"/>
  <rect className="fc-box" x="800" y="380" width="220" height="60" rx="10"/>
  <text className="fc-t" x="910" y="402" font-size="13">PURĀṆA · 18 + 18</text>
  <text className="fc-s" x="910" y="419">SĀTTVIKA · RĀJASIKA · TĀMASIKA</text>
  <text className="fc-s" x="910" y="432">+ STHALA-PURĀṆAS</text>

  {/* row 3 */}
  <path className="fc-arrow" d="M770 458 L742 458"/>
  <rect className="fc-box" x="520" y="428" width="220" height="60" rx="10"/>
  <text className="fc-t" x="630" y="450" font-size="13">DHARMAŚĀSTRA</text>
  <text className="fc-s" x="630" y="467">SŪTRA → SMṚTI → NIBANDHA</text>
  <text className="fc-s" x="630" y="480">LAW · ETHICS · CONDUCT</text>

  <path className="fc-arrow" d="M770 505 L798 505"/>
  <rect className="fc-box" x="800" y="475" width="220" height="60" rx="10"/>
  <text className="fc-t" x="910" y="497" font-size="13">ĀGAMA · TANTRA</text>
  <text className="fc-s" x="910" y="514">ŚAIVA 28 · PĀÑCARĀTRA</text>
  <text className="fc-s" x="910" y="527">VAIKHĀNASA · ŚĀKTA 64</text>

  {/* row 4 */}
  <path className="fc-arrow" d="M770 553 L742 553"/>
  <rect className="fc-box" x="520" y="523" width="220" height="60" rx="10"/>
  <text className="fc-t" x="630" y="545" font-size="13">DARŚANA · 6 SYSTEMS</text>
  <text className="fc-s" x="630" y="562">SŪTRA → BHĀṢYA → ṬĪKĀ</text>
  <text className="fc-s" x="630" y="575">COMMENTARY CASCADES</text>

  <path className="fc-arrow" d="M770 600 L798 600"/>
  <rect className="fc-box" x="800" y="570" width="220" height="60" rx="10"/>
  <text className="fc-t" x="910" y="592" font-size="13">STOTRA · BHAKTI</text>
  <text className="fc-s" x="910" y="609">SAHASRANĀMA · PRAKARAṆA</text>
  <text className="fc-s" x="910" y="622">VERNACULAR CANONS</text>

  {/* rule of hierarchy */}
  <path className="fc-arrow" d="M770 646 L770 666"/>
  <rect className="fc-box" x="560" y="668" width="420" height="58" rx="12" stroke-dasharray="4 4"/>
  <text className="fc-t" x="770" y="691" font-size="13">RULE OF HIERARCHY</text>
  <text className="fc-s" x="770" y="710">WHERE SMṚTI CONFLICTS WITH ŚRUTI, ŚRUTI PREVAILS</text>
</svg>
</div>
{/* ==================== TRUNK I : SRUTI ==================== */}
<section className="trunk">
  <div className="eyebrow">Trunk I</div>
  <h2>Śruti — Revelation</h2>
  <p className="lead"><strong>Apauruṣeya</strong> — authorless. The ṛṣi is a <strong>mantra-draṣṭā</strong>, a “seer of the mantra,” never its writer. Bṛhadāraṇyaka 2.4.10 calls the Vedas the very <strong>breath of Brahman</strong>. This trunk is the supreme epistemic authority (śabda-pramāṇa) of the whole tradition.</p>

  <div className="branchlbl">The Four Vedas</div>
  <div className="tree">

    <details>
      <summary><span className="tw">▸</span><span className="name">Ṛgveda</span><span className="skt">ṛc — the praise-verse</span><span className="meta">10 MAṆḌALAS · 1,028 SŪKTAS · 10,552 ṚKS</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>The Veda of hymns; oldest religious text in continuous liturgical use on Earth. Two parallel indexing systems (maṇḍala–sūkta–ṛk and aṣṭaka–adhyāya–varga) cross-check each other — an integrity technology. Priest: <strong>Hotṛ</strong>, the invoker. Śākhā: Śākala (complete), Bāṣkala (partial).</span>
          <b className="s">SYMBOL</b><span>The power of the articulate word (<strong>vāk</strong>). Maṇḍala 9, entirely to Soma, is the “distilled essence.” The Gāyatrī <span className="ref">RV 3.62.10</span> is called the mother of the Vedas.</span>
          <b className="w">WHY</b><span>Source-code of the civilization: its seed-hymns become whole disciplines — Nāsadīya <span className="ref">RV 10.129</span> (cosmological questioning), Puruṣa <span className="ref">RV 10.90</span>, Hiraṇyagarbha <span className="ref">RV 10.121</span>, and “Truth is one; the wise call it by many names” <span className="ref">RV 1.164.46</span>.</span>
        </div>
        <div className="leaf"><b>Its Brāhmaṇas</b> <i>— Aitareya (coronation rites, Śunaḥśepa story), Kauṣītaki.</i> <b>Its Āraṇyaka</b> <i>— Aitareya.</i> <b>Its Mukhya Upaniṣads</b> <i>— Aitareya, Kauṣītaki.</i></div>
      </div>
    </details>

    <details>
      <summary><span className="tw">▸</span><span className="name">Sāmaveda</span><span className="skt">sāman — the melody</span><span className="meta">1,875 VERSES · PRIEST: UDGĀTṚ</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>Ṛgvedic verses (~75 unique) rearranged and set to melody. Books: Pūrvārcika &amp; Uttarārcika, plus the four song-collections — Grāmageya (village), Āraṇyageya (forest), Ūha &amp; Ūhya (ritual application). Śākhās: Kauthuma, Rāṇāyanīya, Jaiminīya.</span>
          <b className="s">SYMBOL</b><span>Knowledge as <strong>music</strong> — the same truth transfigured by form; the reconciling principle of harmony. Kṛṣṇa: “of the Vedas I am the Sāmaveda” <span className="ref">BG 10.22</span>.</span>
          <b className="w">WHY</b><span>Fountainhead of all Indian music — svara theory begins here; ancestral (via Gāndharvaveda) to the rāga system.</span>
        </div>
        <div className="leaf"><b>Its Brāhmaṇas</b> <i>— Pañcaviṃśa (Tāṇḍya), Ṣaḍviṃśa, Jaiminīya.</i> <b>Its Mukhya Upaniṣads</b> <i>— Chāndogya, Kena.</i></div>
      </div>
    </details>

    <details>
      <summary><span className="tw">▸</span><span className="name">Yajurveda</span><span className="skt">yajus — the ritual formula</span><span className="meta">2 STREAMS · PRIEST: ADHVARYU</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span><strong>Kṛṣṇa (Black):</strong> mantra and explanatory prose intermixed — śākhās Taittirīya, Maitrāyaṇī, Kaṭha, Kapiṣṭhala. <strong>Śukla (White):</strong> pure mantra (Vājasaneyi Saṃhitā — Mādhyandina, Kāṇva), with the prose separated into the Śatapatha Brāhmaṇa.</span>
          <b className="s">SYMBOL</b><span>Knowledge as <strong>action</strong>. Black/White = mixed vs clarified knowledge — tradition says Yājñavalkya returned the mixed Veda and received the pure from the Sun <span className="ref">Viṣṇu P. 3.5</span>.</span>
          <b className="w">WHY</b><span>Operating manual of the great rituals; contains powers of ten to 10¹² <span className="ref">Taittirīya S. 4.4.10; 7.2.20</span> and the Śatarudriya (source of “namaḥ śivāya”); its altar-geometry demands birth the Śulba Sūtras — mathematics from liturgy.</span>
        </div>
        <div className="leaf"><b>Its Brāhmaṇas</b> <i>— Śatapatha (Śukla; among antiquity’s largest prose works: Manu-flood ŚB 1.8.1, fire-altar geometry, Yājñavalkya cycle), Taittirīya (Kṛṣṇa).</i> <b>Its Mukhya Upaniṣads</b> <i>— Bṛhadāraṇyaka, Īśā (Śukla) · Taittirīya, Kaṭha, Śvetāśvatara, Maitrī (Kṛṣṇa).</i></div>
      </div>
    </details>

    <details>
      <summary><span className="tw">▸</span><span className="name">Atharvaveda</span><span className="skt">the Veda of the everyday world</span><span className="meta">20 KĀṆḌAS · 730 HYMNS · PRIEST: BRAHMAN</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>Hymns of healing, marriage, agriculture, kingship, peace. Śākhās: Śaunaka, Paippalāda. Its priest, the Brahman, silently supervises and repairs ritual error — symbolically, quality control; hence its alternate name Brahmaveda.</span>
          <b className="s">SYMBOL</b><span>The sacred descending into <strong>ordinary life</strong> — the fourth that completes transcendence with immanence. The Pṛthivī Sūkta <span className="ref">AV 12.1</span>: “Earth is my mother, I am her son” (12.1.12) — the canon’s ecological charter.</span>
          <b className="w">WHY</b><span>Seedbed of Āyurveda; earliest Indian medical stratum <span className="ref">AV 2.31–32</span> (unseen disease agents — conceptual parallel only).</span>
        </div>
        <div className="leaf"><b>Its Brāhmaṇa</b> <i>— Gopatha.</i> <b>Its Mukhya Upaniṣads</b> <i>— Muṇḍaka, Māṇḍūkya, Praśna.</i></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">The Four Layers inside every Veda — the master key</div>
  <div className="tree">
    <details open>
      <summary><span className="tw">▸</span><span className="name">Saṃhitā → Brāhmaṇa → Āraṇyaka → Upaniṣad</span><span className="skt">text-structure = life-structure</span></summary>
      <div className="body">
        <table>
          <tr><th>Layer</th><th>What it is</th><th>Symbolic life-stage</th><th>Path (kāṇḍa)</th></tr>
          <tr><td><b>Saṃhitā</b></td><td>the mantra collection</td><td>Brahmacarya — absorb the word</td><td rowspan="2">Karma-kāṇḍa (action)</td></tr>
          <tr><td><b>Brāhmaṇa</b></td><td>prose “why &amp; how” of ritual; bandhu — hidden correspondences (altar = year, bricks = days)</td><td>Gṛhastha — perform the work</td></tr>
          <tr><td><b>Āraṇyaka</b></td><td>“forest books”: ritual internalized (prāṇāgnihotra — the fire-offering in one’s own breath)</td><td>Vānaprastha — withdraw, contemplate</td><td>Upāsanā-kāṇḍa (bridge)</td></tr>
          <tr><td><b>Upaniṣad</b></td><td>the culminating philosophy — <b>Vedānta</b>: both “end of the Veda” and “goal of knowledge”</td><td>Sannyāsa — realize</td><td>Jñāna-kāṇḍa (knowledge)</td></tr>
        </table>
        <div className="k">
          <b className="s">SYMBOL</b><span>Exoteric → esoteric; the Veda’s body → its soul. No stage skipped: ritual is not discarded but <strong>understood, then transcended</strong>.</span>
          <b className="w">WHY</b><span>The architecture itself is the pedagogy — the single most important classification in Śruti.</span>
        </div>
      </div>
    </details>
  </div>

  <div className="branchlbl">The Upaniṣads — full classification</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">The 108 (Muktikā canon)</span><span className="skt">upa-ni-ṣad — “sitting down near” the teacher</span><span className="meta">BY VEDA &amp; BY SUBJECT</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>Intimate, initiatory doctrine; also glossed “that which destroys ignorance.” Canon of 108 listed in the Muktikā Upaniṣad; the 10–13 Mukhya are those Śaṅkara commented on.</span>
          <b className="s">SYMBOL</b><span><strong>108</strong> = 9 × 12, wholeness of inner and outer worlds — the japamālā’s beads; the seating symbolizes knowledge as relationship, not document.</span>
          <b className="w">WHY</b><span>Philosophical crown of Śruti; root of every Vedānta school; the layer that reached Schopenhauer, Emerson, Schrödinger through documented chains.</span>
        </div>
        <div className="leaf"><b>By Veda</b> <i>— Ṛgveda 10 · Śukla YV 19 · Kṛṣṇa YV 32 · Sāmaveda 16 · Atharvaveda 31 = 108.</i></div>
        <div className="leaf"><b>By subject</b> <i>— Mukhya (10–13) · Sāmānya-Vedānta ~24 (Subāla, Paiṅgala, Muktikā) · Sannyāsa ~17 (Jābāla, Nāradaparivrājaka) · Yoga ~20 (Yogatattva, Dhyānabindu, Nādabindu, Haṃsa) · Śaiva ~14 (Kaivalya, Atharvaśiras) · Vaiṣṇava ~14 (Mahānārāyaṇa, Nṛsiṃhatāpanī, Gopālatāpanī) · Śākta ~9 (Devī, Tripurā).</i></div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">The Mukhya Thirteen</span><span className="skt">essence · mahāvākya · symbol of each</span></summary>
      <div className="body">
        <table>
          <tr><th>Upaniṣad</th><th>Veda</th><th>Essence</th><th>Symbol</th></tr>
          <tr><td><b>Bṛhadāraṇyaka</b></td><td>ŚYV</td><td>“Aham brahmāsmi” <span className="ref">1.4.10</span>; neti-neti <span className="ref">2.3.6</span></td><td>the great forest — vastness of inquiry</td></tr>
          <tr><td><b>Chāndogya</b></td><td>SV</td><td>“Tat tvam asi” <span className="ref">6.8.7</span>; salt-in-water <span className="ref">6.13</span></td><td>truth carried by chant</td></tr>
          <tr><td><b>Taittirīya</b></td><td>KYV</td><td>pañcakośa, five sheaths <span className="ref">2.1–2.5</span>; “satyaṃ vada, dharmaṃ cara” <span className="ref">1.11</span></td><td>the person as nested layers</td></tr>
          <tr><td><b>Aitareya</b></td><td>RV</td><td>“Prajñānaṃ brahma” <span className="ref">3.3</span></td><td>consciousness as ground</td></tr>
          <tr><td><b>Kena</b></td><td>SV</td><td>the unknowable knower <span className="ref">1.3–4</span></td><td>the question itself</td></tr>
          <tr><td><b>Kaṭha</b></td><td>KYV</td><td>Naciketas &amp; Death; chariot of the self <span className="ref">1.3.3–9</span></td><td>mastery of the vehicle</td></tr>
          <tr><td><b>Īśā</b></td><td>ŚYV</td><td>renounce and enjoy <span className="ref">v.1</span>; paradox pedagogy <span className="ref">4–5</span></td><td>sacredness of the ordinary</td></tr>
          <tr><td><b>Muṇḍaka</b></td><td>AV</td><td>two knowledges <span className="ref">1.1.4–5</span>; “satyameva jayate” <span className="ref">3.1.6</span></td><td>the razor — cutting distinction</td></tr>
          <tr><td><b>Māṇḍūkya</b></td><td>AV</td><td>Om = A·U·M·silence = waking·dream·sleep·turīya <span className="ref">1–12</span></td><td>Om as the map of consciousness</td></tr>
          <tr><td><b>Praśna</b></td><td>AV</td><td>six seekers, six questions</td><td>knowledge as inquiry</td></tr>
          <tr><td><b>Śvetāśvatara</b></td><td>KYV</td><td>theistic synthesis; early Sāṃkhya-Yoga terms</td><td>purified senses</td></tr>
          <tr><td><b>Kauṣītaki</b></td><td>RV</td><td>prāṇa doctrine</td><td>breath as life-divinity</td></tr>
          <tr><td><b>Maitrī</b></td><td>KYV</td><td>late synthesis; time-speculation</td><td>—</td></tr>
        </table>
        <div className="k"><b className="s">SYMBOL</b><span>The Māṇḍūkya, 12 verses, is said to suffice alone for liberation <span className="ref">Muktikā 1.27</span> — the whole canon compressed to one syllable: the tradition’s own statement that all its texts expand from a single seed.</span></div>
      </div>
    </details>
  </div>
</section>

{/* ==================== TRUNK II : SMRTI ==================== */}
<section className="trunk">
  <div className="eyebrow">Trunk II</div>
  <h2>Smṛti — Tradition</h2>
  <p className="lead"><strong>“That which is remembered”</strong> — human-authored texts that expound, apply, and popularize Śruti; authoritative but always corrigible against it <span className="ref">Manusmṛti 2.10</span>. Symbol: if Śruti is the eternal flame, Smṛti is the series of lamps lit from it for each age — a built-in version-control philosophy.</p>

  <div className="branchlbl">Branch 1 · Vedāṅga — the six limbs of the Veda-puruṣa</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">The Six Limbs</span><span className="skt">the Veda imagined as a person — Pāṇinīya Śikṣā 41–42</span></summary>
      <div className="body">
        <table>
          <tr><th>Vedāṅga</th><th>Limb</th><th>Definition &amp; core text</th><th>Significance</th></tr>
          <tr><td><b>Śikṣā</b></td><td>nose / breath</td><td>phonetics — Prātiśākhyas, Pāṇinīya Śikṣā</td><td>articulatory phonetics ~2,500 yrs before the IPA; the guarantee of oral fidelity</td></tr>
          <tr><td><b>Vyākaraṇa</b></td><td>mouth / face</td><td>grammar — Pāṇini’s Aṣṭādhyāyī (~3,996 sūtras) → Patañjali’s Mahābhāṣya → Bhartṛhari’s Vākyapadīya</td><td>the world’s first generative grammar; ancestor-idea of formal language theory</td></tr>
          <tr><td><b>Chandas</b></td><td>feet</td><td>prosody — Piṅgala’s Chandaḥśāstra</td><td>binary enumeration, Pascal-type meru-prastāra, Fibonacci-type mātrā-meru; meters as living deities of rhythm (Gāyatrī 24, Anuṣṭubh 32 — the epic śloka)</td></tr>
          <tr><td><b>Nirukta</b></td><td>ears</td><td>etymology — Yāska on the Nighaṇṭu</td><td>the first systematic semantics</td></tr>
          <tr><td><b>Kalpa</b></td><td>hands / arms</td><td>procedure — Śrauta · Gṛhya (the 16 saṃskāras: biography as liturgy) · Dharma · <b>Śulba</b> sūtras</td><td>Śulba geometry: the diagonal rule, √2, circle–square constructions <span className="ref">Baudhāyana ŚS 1.12–13</span></td></tr>
          <tr><td><b>Jyotiṣa</b></td><td>eyes</td><td>astronomy/calendrics — Lagadha’s Vedāṅga Jyotiṣa</td><td>the yajña needs the true moment: timekeeping becomes sacred science (keep astronomy vs astrology explicit)</td></tr>
        </table>
        <div className="k"><b className="s">SYMBOL</b><span>The Veda <strong>walks</strong> on meter, <strong>acts</strong> through ritual, <strong>sees</strong> by the stars, <strong>hears</strong> true meaning, <strong>breathes</strong> as sound, <strong>speaks</strong> through grammar.</span></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">Branch 2 · Upaveda — the four applied knowledges</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">The Four Upavedas</span><span className="skt">applied sciences, each attached to a Veda</span></summary>
      <div className="body">
        <div className="leaf"><b>Āyurveda</b> <i>(Atharva/Ṛg)</i> — “knowledge of life.” Bṛhat-trayī: Caraka, Suśruta, Aṣṭāṅgahṛdaya; Laghu-trayī: Mādhava-nidāna, Śārṅgadhara, Bhāvaprakāśa.<div className="k"><b className="s">SYMBOL</b><span>life itself as a Veda; medicine as dharma</span><b className="w">WHY</b><span>historic surgery, clinical method, medical-debate ethics <span className="ref">Caraka Vimāna. 8</span></span></div></div>
        <div className="leaf"><b>Dhanurveda</b> <i>(Yajur)</i> — science of the bow, all martial arts; fragments in <span className="ref">Agni P. 249–252</span>.<div className="k"><b className="s">SYMBOL</b><span>the warrior’s discipline as sādhanā</span></div></div>
        <div className="leaf"><b>Gāndharvaveda</b> <i>(Sāma)</i> — music, dance, drama; flows into Nāṭyaśāstra and Śārṅgadeva’s Saṅgītaratnākara (13th c.).<div className="k"><b className="s">SYMBOL</b><span>nāda-brahman — reality as vibration (symbolic doctrine)</span></div></div>
        <div className="leaf"><b>Sthāpatyaveda / Artha</b> <i>(Atharva)</i> — architecture &amp; polity: Mayamata, Mānasāra, Samarāṅgaṇasūtradhāra; Kauṭilya’s Arthaśāstra.<div className="k"><b className="s">SYMBOL</b><span>the vāstu-puruṣa-maṇḍala: the building as a body, space as a living being</span></div></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">Branch 3 · Itihāsa — the two epics (“the fifth Veda,” Chāndogya 7.1.2)</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Rāmāyaṇa</span><span className="skt">Vālmīki — the ādikāvya, first poem</span><span className="meta">~24,000 ŚLOKAS · 7 KĀṆḌAS</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>Bāla · Ayodhyā · Araṇya · Kiṣkindhā · <strong>Sundara</strong> · Yuddha · Uttara.</span>
          <b className="s">SYMBOL</b><span>the ideal — dharma under constraint (maryādā); the southward journey = descent into trial; Hanumān’s leap (Sundara, “the beautiful book,” the traditional heart) = devotion crossing the impossible.</span>
          <b className="w">WHY</b><span>template of Indian ethics and two millennia of pan-Asian literature and performance.</span>
        </div>
      </div>
    </details>
    <details>
      <summary><span className="tw">▸</span><span className="name">Mahābhārata</span><span className="skt">Vyāsa — first called “Jaya,” victory</span><span className="meta">~100,000 ŚLOKAS · 18 PARVANS + HARIVAṂŚA</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>Ādi · Sabhā · Vana · Virāṭa · Udyoga · Bhīṣma · Droṇa · Karṇa · Śalya · Sauptika · Strī · Śānti · Anuśāsana · Aśvamedhika · Āśramavāsika · Mausala · Mahāprasthānika · Svargārohaṇa — plus the Harivaṃśa appendix. Critical edition: BORI, Pune.</span>
          <b className="s">SYMBOL</b><span>the real — the moral gray; the number <strong>18</strong> everywhere (parvans, war-days, armies, Gītā chapters) = the complete field of dharma. Its own claim: “what is not here is nowhere” <span className="ref">MBh 1.56.33</span>; and the canon’s method: “amplify the Veda by epic and Purāṇa” <span className="ref">MBh 1.1.204</span>.</span>
          <b className="w">WHY</b><span>the total map of human situations; carries the Gītā, the Viṣṇu Sahasranāma, the vast Śānti/Anuśāsana dharma-discourses, Nala, Sāvitrī, the Yakṣa-praśna.</span>
        </div>
        <div className="leaf"><b>Bhagavad Gītā</b> <i>(Bhīṣma-parvan; 18 chapters, 700 verses)</i> — synthesis of karma, bhakti, jñāna.<div className="k"><b className="s">SYMBOL</b><span>“dharmakṣetre kurukṣetre” <span className="ref">BG 1.1</span> — the battlefield as every human decision; the Kaṭha chariot completed: here the Divine takes the reins.</span><b className="w">WHY</b><span>the most translated Indian text; third pillar of the Prasthānatrayī (with Upaniṣads &amp; Brahma Sūtras); every Vedānta ācārya wrote a Gītā-bhāṣya.</span></div></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">Branch 4 · Purāṇa — “ancient, yet ever new”</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">18 Mahāpurāṇas · 18 Upapurāṇas · Sthala-purāṇas</span><span className="skt">the Veda democratized</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>A Purāṇa must treat the <strong>Pañcalakṣaṇa</strong> — five topics <span className="ref">Matsya P. 53.65</span>: sarga (creation) · pratisarga (dissolution &amp; re-creation) · vaṃśa (divine genealogies) · manvantara (cosmic ages) · vaṃśānucarita (dynasties).</span>
          <b className="s">SYMBOL</b><span>the Veda’s compassion — scripture opened to all; deep-time cycles (kalpa = 4.32 billion years, “a day of Brahmā”) as impermanence at cosmic scale.</span>
          <b className="w">WHY</b><span>the lived religion of 1,500 years: temples, festivals, pilgrimage, iconography all flow from here.</span>
        </div>
        <table>
          <tr><th>Guṇa class <i>(Padma P., Uttara 236)</i></th><th>Orientation</th><th>The six</th></tr>
          <tr><td><b>Sāttvika</b> (luminous)</td><td>Viṣṇu</td><td>Viṣṇu · <b>Bhāgavata</b> · Nāradīya · Garuḍa · Padma · Varāha</td></tr>
          <tr><td><b>Rājasika</b> (dynamic)</td><td>Brahmā</td><td>Brahma · Brahmāṇḍa · Brahmavaivarta · Mārkaṇḍeya · Bhaviṣya · Vāmana</td></tr>
          <tr><td><b>Tāmasika</b> (dense)</td><td>Śiva</td><td>Śiva · Liṅga · Skanda · Agni · Matsya · Kūrma</td></tr>
        </table>
        <p><i>Note: the guṇa labels are a Vaiṣṇava-source classification — a live lesson that classification encodes perspective; Śaiva sources classify differently.</i></p>
        <div className="leaf"><b>Landmarks</b> <i>— Bhāgavata: summit of bhakti (Book 10, Kṛṣṇa) · Mārkaṇḍeya: contains the <b>Devī Māhātmya</b> (Durgā Saptaśatī, 700 verses) — charter of Goddess worship · Agni: full encyclopedia · Skanda: largest (~81,000 verses) — the pilgrimage atlas of India.</i></div>
        <div className="leaf"><b>18 Upapurāṇas</b> <i>(lists vary) — Devī-Bhāgavata, Kālikā, Narasiṃha, Gaṇeśa, Sāmba, Nandi, Viṣṇudharmottara (the great art-and-iconography encyclopedia), Śivarahasya, Kapila, Bṛhannāradīya, Sanatkumāra, Parāśara, Vasiṣṭha, Durvāsā, Bhārgava, Varuṇa, Vāmana, Haṃsa.</i></div>
        <div className="leaf"><b>Sthala-purāṇas</b> <i>— thousands of local temple-and-place chronicles: the canon’s fractal edge, where the great tradition meets every village.</i></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">Branch 5 · Dharmaśāstra — law &amp; conduct</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Sūtra → Smṛti → Nibandha</span><span className="skt">the three historical strata</span></summary>
      <div className="body">
        <div className="leaf"><b>1 · Dharmasūtras</b> <i>(within Kalpa) — Āpastamba, Gautama, Baudhāyana, Vasiṣṭha (~600–200 BCE).</i></div>
        <div className="leaf"><b>2 · Dharmasmṛtis</b> <i>— Manusmṛti, Yājñavalkya (most influential in later law), Nārada (pure jurisprudence), Parāśara — which assigns one lawgiver per cosmic age</i> <span className="ref">Parāśara Smṛti 1.24</span><i>: Manu/Kṛta, Gautama/Tretā, Śaṅkha-Likhita/Dvāpara, Parāśara/Kali — <b>the tradition’s own doctrine that law must change with time.</b></i></div>
        <div className="leaf"><b>3 · Nibandhas</b> <i>(digests) — <b>Mitākṣarā</b> (Vijñāneśvara, ~1100) and <b>Dāyabhāga</b> (Jīmūtavāhana): these two actually governed Hindu inheritance law into the modern era.</i></div>
        <div className="k"><b className="s">SYMBOL</b><span>dharma as <strong>ṛta</strong> — the same word for cosmic order names personal duty.</span><b className="w">WHY</b><span>a sophisticated legal science (evidence, contracts, procedure) — to be studied critically and honestly, hierarchies examined, not sanitized.</span></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">Branch 6 · Āgama &amp; Tantra — the worship canon</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Śaiva 28 · Pāñcarātra &amp; Vaikhānasa · Śākta 64</span><span className="skt">the operating system of temple Hinduism</span></summary>
      <div className="body">
        <div className="k">
          <b className="d">DEFINITION</b><span>Post-Vedic revealed literatures (their traditions treat them as śruti-equal) governing temple worship, initiation, yoga, mantra. Universal structure — the <strong>four pādas</strong>: jñāna (doctrine) · yoga (discipline) · kriyā (temple &amp; icon construction) · caryā (worship &amp; conduct).</span>
          <b className="s">SYMBOL</b><span>the temple as the text made stone: vimāna = cosmic mountain, garbhagṛha (“womb-house”) = cave of the heart; the mūrti enlivened by prāṇa-pratiṣṭhā — “installation of breath.”</span>
          <b className="w">WHY</b><span>without the Āgamas there is no temple, mūrti-pūjā, or festival calendar as practiced — this is the <strong>lived</strong> scripture; also the source of kuṇḍalinī physiology, mantra-śāstra, yantra geometry.</span>
        </div>
        <div className="leaf"><b>Śaiva Āgamas</b> <i>— 28 (10 Śiva + 18 Rudra) + 200+ Upāgamas; doctrine of pati–paśu–pāśa (Lord–soul–bond); Kāmika, Kāraṇa, Raurava; Kashmir: Mālinīvijayottara → Abhinavagupta’s <b>Tantrāloka</b>; Tamil Śaiva-Siddhānta.</i></div>
        <div className="leaf"><b>Vaiṣṇava Āgamas</b> <i>— <b>Pañcarātra</b> (108 saṃhitās traditional; “three gems”: Sāttvata, Pauṣkara, Jayākhya; plus Ahirbudhnya, Lakṣmī Tantra) and <b>Vaikhānasa</b>; these govern most Viṣṇu temples — Tirupati (Vaikhānasa), Śrīraṅgam (Pañcarātra).</i></div>
        <div className="leaf"><b>Śākta Tantras</b> <i>— traditionally <b>64</b>; Kulārṇava, Tantrarāja, Nityāṣoḍaśikārṇava; the <b>Śrī Vidyā</b> tradition with the <b>Śrī Yantra</b> — nine interlocking triangles: the canon’s supreme geometric symbol, macrocosm and microcosm in one diagram.</i></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">Branch 7 · Darśana literature — six sūtra-traditions</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Sūtra → Bhāṣya → Vārttika → Ṭīkā → Prakaraṇa</span><span className="skt">the commentary ladder as canonical form</span></summary>
      <div className="body">
        <table>
          <tr><th>Darśana</th><th>Root sūtra</th><th>Great bhāṣya</th><th>Later summit</th></tr>
          <tr><td><b>Nyāya</b></td><td>Gautama’s Nyāya Sūtras</td><td>Vātsyāyana</td><td>Gaṅgeśa’s Tattvacintāmaṇi (Navya-Nyāya)</td></tr>
          <tr><td><b>Vaiśeṣika</b></td><td>Kaṇāda’s Vaiśeṣika Sūtras</td><td>Praśastapāda</td><td>Śrīdhara’s Nyāyakandalī</td></tr>
          <tr><td><b>Sāṃkhya</b></td><td>(Kapila, trad.)</td><td>Īśvarakṛṣṇa’s Sāṃkhyakārikā</td><td>Vijñānabhikṣu</td></tr>
          <tr><td><b>Yoga</b></td><td>Patañjali’s Yoga Sūtras</td><td>Vyāsa-bhāṣya</td><td>Vācaspati; Haṭha corpus (Haṭhayogapradīpikā, Gheraṇḍa, Śiva Saṃhitā)</td></tr>
          <tr><td><b>Mīmāṃsā</b></td><td>Jaimini’s Mīmāṃsā Sūtras</td><td>Śabara</td><td>Kumārila vs Prabhākara</td></tr>
          <tr><td><b>Vedānta</b></td><td>Bādarāyaṇa’s Brahma Sūtras</td><td>Śaṅkara / Rāmānuja / Madhva</td><td>the six-plus schools’ libraries</td></tr>
        </table>
        <div className="k"><b className="s">SYMBOL</b><span>truth as a living conversation across centuries — the text never closes.</span></div>
      </div>
    </details>
  </div>

  <div className="branchlbl">Branch 8 · Stotra, Prakaraṇa &amp; Bhakti — the living edge</div>
  <div className="tree">
    <details>
      <summary><span className="tw">▸</span><span className="name">Hymns · Primers · Vernacular canons</span><span className="skt">where the canon breathes today</span></summary>
      <div className="body">
        <div className="leaf"><b>Stotra</b> <i>— Viṣṇu Sahasranāma (MBh, Anuśāsana), Lalitā Sahasranāma (Brahmāṇḍa P.), Śaṅkara’s Bhaja Govindam &amp; Saundaryalaharī.</i><div className="k"><b className="s">SYMBOL</b><span>1,000 names = the infinite refracted into a countable rosary; naming as knowing.</span></div></div>
        <div className="leaf"><b>Prakaraṇa granthas</b> <i>(Vedānta primers) — Tattvabodha, Ātmabodha, Vivekacūḍāmaṇi, Upadeśasāhasrī (Śaṅkara’s one certainly authentic independent work), Pañcadaśī, Vedāntasāra, Dṛg-Dṛśya-Viveka, Aparokṣānubhūti — the pedagogy layer.</i></div>
        <div className="leaf"><b>Vernacular bhakti canons</b> <i>— Nālāyira Divya Prabandham (“the Tamil Veda,” Āḻvārs) · Tēvāram &amp; Tiruvācakam (Nāyanmārs) · Jñāneśvarī (Marathi) · Rāmcaritmānas (Tulsīdās, Avadhī) · vacanas (Kannada) · sant kīrtans.</i><div className="k"><b className="s">SYMBOL</b><span>revelation reborn in the mother tongue — proof the canon can re-enter through any language.</span></div></div>
        <details>
          <summary><span className="tw">▸</span><span className="name">The Gītā-Genre &amp; Advanced Nondual Texts</span><span className="skt">mokṣa-śāstra — the consciousness-philosophy corpus</span><span className="meta">BRIDGES TO MODERN MIND SCIENCE</span></summary>
          <div className="body">
            <div className="leaf"><b>Aṣṭāvakra Gītā</b> <i>(~20 ch., ~298 verses; Aṣṭāvakra teaches King Janaka)</i> — the most uncompromising nondual text: the witness (sākṣī) <span className="ref">AG 1.7</span>; “as one thinks, so one becomes” <span className="ref">AG 1.11</span>; actionless action <span className="ref">AG 18.61</span>.<div className="k"><b className="s">SYMBOL</b><span>the sage’s eight-bent body — wisdom indifferent to the vessel; no ladder, only recognition.</span><b className="w">WHY</b><span>live bridge to self-model theory (Metzinger, <em>Being No One</em>, 2003) and nondual-awareness research (Josipovic; Brewer’s DMN work, PNAS 2011) — a real, citable dialogue with philosophy of mind.</span></div></div>
            <div className="leaf"><b>Yoga-Vāsiṣṭha</b> <i>(~32,000 verses; earliest core, the Mokṣopāya, ~10th c. Kashmir — Slaje)</i> — consciousness-idealism through nested stories: “the world is as you see it”; the Līlā story’s worlds-within-worlds (Book 3).<div className="k"><b className="s">SYMBOL</b><span>the dream as epistemic probe; mind as the builder of worlds.</span><b className="w">WHY</b><span>paired-reading seminars with predictive processing (Seth’s “controlled hallucination”), analytic idealism (Kastrup), and the simulation argument (Bostrom 2003) — parallels, never predictions.</span></div></div>
            <div className="leaf"><b>Gauḍapāda’s Māṇḍūkya Kārikā</b> <i>(~215 verses, 4 chapters; c. 6th c. — the root text of Advaita)</i> — dream–waking parity argument <span className="ref">GK 2.4–10</span>, a millennium before Descartes; ajātivāda (non-origination) <span className="ref">GK 4</span>; the whirling firebrand <span className="ref">GK 4.47–50</span>.<div className="k"><b className="w">WHY</b><span>T1 history of philosophy — Indian priority in dream skepticism is standard comparative scholarship (Ganeri, <em>The Self</em>, OUP 2012).</span></div></div>
            <div className="leaf"><b>Uddhava Gītā</b> <i>(Bhāgavata 11.6–29)</i> — the avadhūta’s <b>24 gurus of nature</b> <span className="ref">Bhāg. 11.7–9</span>: earth, python, sea, moth, bee, spider, arrow-maker…<div className="k"><b className="s">SYMBOL</b><span>nature as the original faculty.</span><b className="w">WHY</b><span>the tradition’s own biomimicry charter — frame with Benyus (1997) and systems ecology.</span></div></div>
            <div className="leaf"><b>The full roster</b> <i>— Avadhūta Gītā (Dattātreya; “one taste”), Ribhu Gītā (Śivarahasya P. — Ramana Maharshi’s documented recommendation), Anu-Gītā (MBh Aśvamedhika 16–51), Guru Gītā, Devī Gītā (Devī-Bhāg. 7.31–40), Rāma Gītā, Haṃsa Gītā, Vyādha Gītā.</i></div>
            <div className="leaf"><b>Kashmir Śaiva advanced corpus</b> <i>— Spanda Kārikās (reality as pulsation — process-philosophy comparisons only, never wave physics), Utpaladeva’s Pratyabhijñā (reflexive awareness — cited in the “Self, No Self?” OUP 2010 debate), <b>Vijñāna Bhairava Tantra</b> (112 attention protocols → contemplative-science taxonomies, Lutz et al. 2008), Abhinavagupta’s Tantrāloka.</i></div>
          </div>
        </details>
      </div>
    </details>
  </div>

  <div className="branchlbl">The symbolic keys that run through everything</div>
  <div className="keys">
    <div><b>4</b><p>4 Vedas · 4 layers · 4 āśramas · 4 puruṣārthas · 4 yugas · 4 Āgama-pādas · A-U-M-turīya — text-structure maps onto life onto cosmos: <strong style={{'color': 'var(--ink)', }}>reading is living is cosmology.</strong></p></div>
    <div><b>18</b><p>Parvans, Gītā chapters, Purāṇas, war-days — the field of dharma in its completeness; the epic’s first name was “Jaya.”</p></div>
    <div><b>108</b><p>Upaniṣads, mālā beads, Pañcarātra saṃhitās — 9 × 12: wholeness of inner and outer worlds.</p></div>
    <div><b>Sound</b><p>Śabda before script: pāṭha recitation technology, mantra-śāstra, nāda-brahman — writing is the concession, sound the original medium.</p></div>
    <div><b>Fire</b><p>Śrauta altar → Āraṇyaka’s inner fire → tapas → the Gītā’s “fire of knowledge” <span className="ref">BG 4.37</span>: one symbol of transformation through every layer.</p></div>
    <div><b>Openness gradient</b><p>Śruti (exact, restricted) → Itihāsa-Purāṇa (open to all) → vernacular bhakti (universal): the canon’s own designed accessibility ramp.</p></div>
  </div>
</section>
</div>


<footer className="coda">
  <div className="om2">॥</div>
  <p style={{'fontFamily': 'var(--disp)', 'fontWeight': '600', 'color': 'var(--ink)', 'fontSize': '1.05rem', }}>“itihāsa-purāṇābhyāṃ vedaṃ samupabṛṃhayet” — amplify the Veda through epic and story. <span className="ref">MBh 1.1.204</span></p>
  <p>Two trunks, one tree: revelation and its living memory. Every node above names its texts; symbolic readings follow the tradition’s own self-description; scholarly and traditional datings are both honored throughout.</p>
  <div className="cite">Companion document · “The Complete Canon of Sanātana Dharma” (reference .md) carries the full prose definitions.<br />Classification sources · Muktikā canon (108) · Padma P. Uttara 236 (guṇa) · Matsya P. 53.65 (pañcalakṣaṇa) · Pāṇinīya Śikṣā 41–42 (limbs) · Parāśara Smṛti 1.24 (law per age)</div>
</footer>

        </div>
    );
};

export default Flowchart;
