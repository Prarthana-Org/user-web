import re

with open('src/components/Flowchart.jsx', 'r') as f:
    content = f.read()

# 1. Add scrollTo function
content = content.replace(
    'const Flowchart = () => {\n    return (',
    '''const Flowchart = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // If there's a details element inside or nearby, open it
            const details = el.closest('.tree')?.querySelector('details') || el.nextElementSibling?.querySelector('details');
            if (details) details.open = true;
        }
    };
    return ('''
)

# 2. Add CSS
css_addition = """
.fc-note{fill:var(--faint);font-size:10px;font-weight:500;text-anchor:middle;letter-spacing:.08em}
.fc-node { cursor: pointer; transition: all 0.2s; }
.fc-node:hover { opacity: 0.85; }
.fc-node:hover rect { stroke: var(--gold); stroke-width: 2; }
"""
content = content.replace('.fc-note{fill:var(--faint);font-size:10px;font-weight:500;text-anchor:middle;letter-spacing:.08em}', css_addition.strip())

# 3. Replace SVG nodes with <g>
replacements = {
    # Sruti
    r'(<rect className="fc-box fc-trunk" x="120" y="138" width="220" height="62" rx="12"/>\s*<text className="fc-t" x="230" y="165">ŚRUTI</text>\s*<text className="fc-s" x="230" y="186">HEARD · REVEALED · APAURUṢEYA</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'sruti\')}>\n  \1\n  </g>',
    # Smrti
    r'(<rect className="fc-box fc-trunk" x="660" y="138" width="220" height="62" rx="12"/>\s*<text className="fc-t" x="770" y="165">SMṚTI</text>\s*<text className="fc-s" x="770" y="186">REMEMBERED · COMPOSED · APPLIED</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'smrti\')}>\n  \1\n  </g>',
    # Vedas
    r'(<rect className="fc-box" x="60" y="240" width="200" height="56" rx="10"/>\s*<text className="fc-t" x="160" y="264">THE 4 VEDAS</text>\s*<text className="fc-s" x="160" y="284">ṚG · SĀMA · YAJUR · ATHARVA</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'four-vedas\')}>\n  \1\n  </g>',
    # Upanisads
    r'(<rect className="fc-box" x="300" y="240" width="180" height="56" rx="10"/>\s*<text className="fc-t" x="390" y="264">UPANIṢADS</text>\s*<text className="fc-s" x="390" y="284">108 · MUKHYA 10–13</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'upanisads\')}>\n  \1\n  </g>',
    # 4 layers
    r'(<rect className="fc-box" x="60" y="342" width="200" height="52" rx="10"/>\s*<text className="fc-t" x="160" y="364" font-size="13">1 · SAṂHITĀ</text>\s*<text className="fc-s" x="160" y="382">MANTRA COLLECTION</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'four-layers\')}>\n  \1\n  </g>',
    r'(<rect className="fc-box" x="60" y="418" width="200" height="52" rx="10"/>\s*<text className="fc-t" x="160" y="440" font-size="13">2 · BRĀHMAṆA</text>\s*<text className="fc-s" x="160" y="458">RITUAL EXEGESIS</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'four-layers\')}>\n  \1\n  </g>',
    r'(<rect className="fc-box" x="60" y="494" width="200" height="52" rx="10"/>\s*<text className="fc-t" x="160" y="516" font-size="13">3 · ĀRAṆYAKA</text>\s*<text className="fc-s" x="160" y="534">INTERNALIZATION</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'four-layers\')}>\n  \1\n  </g>',
    r'(<rect className="fc-box" x="60" y="570" width="200" height="52" rx="10"/>\s*<text className="fc-t" x="160" y="592" font-size="13">4 · UPANIṢAD</text>\s*<text className="fc-s" x="160" y="610">JÑĀNA · VEDĀNTA</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'four-layers\')}>\n  \1\n  </g>',
    # Vedanga
    r'(<rect className="fc-box" x="520" y="238" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="630" y="260" font-size="13">VEDĀṄGA · 6 LIMBS</text>\s*<text className="fc-s" x="630" y="277">ŚIKṢĀ · VYĀKARAṆA · CHANDAS</text>\s*<text className="fc-s" x="630" y="290">NIRUKTA · KALPA · JYOTIṢA</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'vedanga\')}>\n  \1\n  </g>',
    # Upaveda
    r'(<rect className="fc-box" x="800" y="285" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="910" y="307" font-size="13">UPAVEDA · 4</text>\s*<text className="fc-s" x="910" y="324">ĀYURVEDA · DHANURVEDA</text>\s*<text className="fc-s" x="910" y="337">GĀNDHARVA · STHĀPATYA</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'upaveda\')}>\n  \1\n  </g>',
    # Itihasa
    r'(<rect className="fc-box" x="520" y="333" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="630" y="355" font-size="13">ITIHĀSA · 2 EPICS</text>\s*<text className="fc-s" x="630" y="372">RĀMĀYAṆA · MAHĀBHĀRATA</text>\s*<text className="fc-s" x="630" y="385">⊃ BHAGAVAD GĪTĀ</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'itihasa\')}>\n  \1\n  </g>',
    # Purana
    r'(<rect className="fc-box" x="800" y="380" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="910" y="402" font-size="13">PURĀṆA · 18 \+ 18</text>\s*<text className="fc-s" x="910" y="419">SĀTTVIKA · RĀJASIKA · TĀMASIKA</text>\s*<text className="fc-s" x="910" y="432">\+ STHALA-PURĀṆAS</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'purana\')}>\n  \1\n  </g>',
    # Dharmasastra
    r'(<rect className="fc-box" x="520" y="428" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="630" y="450" font-size="13">DHARMAŚĀSTRA</text>\s*<text className="fc-s" x="630" y="467">SŪTRA → SMṚTI → NIBANDHA</text>\s*<text className="fc-s" x="630" y="480">LAW · ETHICS · CONDUCT</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'dharmasastra\')}>\n  \1\n  </g>',
    # Agama
    r'(<rect className="fc-box" x="800" y="475" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="910" y="497" font-size="13">ĀGAMA · TANTRA</text>\s*<text className="fc-s" x="910" y="514">ŚAIVA 28 · PĀÑCARĀTRA</text>\s*<text className="fc-s" x="910" y="527">VAIKHĀNASA · ŚĀKTA 64</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'agama\')}>\n  \1\n  </g>',
    # Darsana
    r'(<rect className="fc-box" x="520" y="523" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="630" y="545" font-size="13">DARŚANA · 6 SYSTEMS</text>\s*<text className="fc-s" x="630" y="562">SŪTRA → BHĀṢYA → ṬĪKĀ</text>\s*<text className="fc-s" x="630" y="575">COMMENTARY CASCADES</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'darsana\')}>\n  \1\n  </g>',
    # Stotra
    r'(<rect className="fc-box" x="800" y="570" width="220" height="60" rx="10"/>\s*<text className="fc-t" x="910" y="592" font-size="13">STOTRA · BHAKTI</text>\s*<text className="fc-s" x="910" y="609">SAHASRANĀMA · PRAKARAṆA</text>\s*<text className="fc-s" x="910" y="622">VERNACULAR CANONS</text>)': r'<g className="fc-node" onClick={() => scrollTo(\'stotra\')}>\n  \1\n  </g>',
}

for pattern, repl in replacements.items():
    content = re.sub(pattern, repl, content)

# 4. Add IDs to HTML tags
id_replacements = {
    '<h2>Śruti — Revelation</h2>': '<h2 id="sruti">Śruti — Revelation</h2>',
    '<h2>Smṛti — Tradition</h2>': '<h2 id="smrti">Smṛti — Tradition</h2>',
    '<div className="branchlbl">The Four Vedas</div>': '<div className="branchlbl" id="four-vedas">The Four Vedas</div>',
    '<div className="branchlbl">The Four Layers inside every Veda — the master key</div>': '<div className="branchlbl" id="four-layers">The Four Layers inside every Veda — the master key</div>',
    '<div className="branchlbl">The Upaniṣads — full classification</div>': '<div className="branchlbl" id="upanisads">The Upaniṣads — full classification</div>',
    '<div className="branchlbl">Branch 1 · Vedāṅga — the six limbs of the Veda-puruṣa</div>': '<div className="branchlbl" id="vedanga">Branch 1 · Vedāṅga — the six limbs of the Veda-puruṣa</div>',
    '<div className="branchlbl">Branch 2 · Upaveda — the four applied knowledges</div>': '<div className="branchlbl" id="upaveda">Branch 2 · Upaveda — the four applied knowledges</div>',
    '<div className="branchlbl">Branch 3 · Itihāsa — the two epics (“the fifth Veda,” Chāndogya 7.1.2)</div>': '<div className="branchlbl" id="itihasa">Branch 3 · Itihāsa — the two epics (“the fifth Veda,” Chāndogya 7.1.2)</div>',
    '<div className="branchlbl">Branch 4 · Purāṇa — “ancient, yet ever new”</div>': '<div className="branchlbl" id="purana">Branch 4 · Purāṇa — “ancient, yet ever new”</div>',
    '<div className="branchlbl">Branch 5 · Dharmaśāstra — law &amp; conduct</div>': '<div className="branchlbl" id="dharmasastra">Branch 5 · Dharmaśāstra — law &amp; conduct</div>',
    '<div className="branchlbl">Branch 6 · Āgama &amp; Tantra — the worship canon</div>': '<div className="branchlbl" id="agama">Branch 6 · Āgama &amp; Tantra — the worship canon</div>',
    '<div className="branchlbl">Branch 7 · Darśana literature — six sūtra-traditions</div>': '<div className="branchlbl" id="darsana">Branch 7 · Darśana literature — six sūtra-traditions</div>',
    '<div className="branchlbl">Branch 8 · Stotra, Prakaraṇa &amp; Bhakti — the living edge</div>': '<div className="branchlbl" id="stotra">Branch 8 · Stotra, Prakaraṇa &amp; Bhakti — the living edge</div>',
}

for old, new in id_replacements.items():
    content = content.replace(old, new)

with open('src/components/Flowchart.jsx', 'w') as f:
    f.write(content)

