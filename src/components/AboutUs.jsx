import React, { useState, useEffect } from 'react';
import './AboutUs.css';

export default function AboutUs() {
  const [filter, setFilter] = useState('all');

  const onFilter = (e) => {
    const f = e.currentTarget.getAttribute('data-filter');
    setFilter(prev => prev === f ? 'all' : f);
  };

  useEffect(() => {
    document.querySelectorAll('[data-group]').forEach(el => {
      const on = filter === 'all' || el.getAttribute('data-group') === filter;
      el.style.opacity = on ? '1' : '.28';
      el.style.filter = on ? 'none' : 'saturate(.35)';
    });
    document.querySelectorAll('[data-filter]').forEach(el => {
      const fAttr = el.getAttribute('data-filter');
      if(fAttr === 'learn' || fAttr === 'practice' || fAttr === 'daily' || fAttr === 'connect') {
        const active = filter !== 'all' && fAttr === filter;
        const c = el.getAttribute('data-c');
        if (c) {
          el.style.background = active ? c : 'transparent';
          el.style.color = active ? '#fff' : 'var(--faint)';
          el.style.borderColor = active ? c : 'var(--line)';
        }
      }
    });
  }, [filter]);

  useEffect(() => {
    if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(!('IntersectionObserver' in window)) return;
  }, []);

  const groups = [
        { id:'learn', name:'LEARN & DISCOVER', color:'var(--gold)', sub:'video · shorts · docs · map', leaves:['Video library','Shorts','Vedic docs','Hotspot locator'] },
        { id:'practice', name:'PRACTICE', color:'var(--green)', sub:'yoga · jap · āyurveda', leaves:['Yoga cards','Jap','Āyurveda'] },
        { id:'daily', name:'DAILY CONNECTION', color:'var(--sindoor)', sub:'sky · quote · reminders', leaves:['Sky today','Daily quote','Reminders'] },
        { id:'connect', name:'COMMUNITY & LIVE', color:'var(--blue)', sub:'aarti · group VC', leaves:['Live aarti','Group VC + reader'] },
      ];
  const branches = [
        { title:'SCIENCES', sub:'Vedāṅga · Śāstra — math · astro · logic', feeds:'feeds → Docs & Courses' },
        { title:'MEDICINE', sub:'Āyurveda — Caraka · Suśruta', feeds:'feeds → Āyurveda feature' },
        { title:'MIND & BODY', sub:'Yoga Sūtras · Upaniṣads · Gītā', feeds:'feeds → Yoga · Jap · Meditation' },
        { title:'CALENDAR / SKY', sub:'Jyotiṣa · pañcāṅga — real astronomy', feeds:'feeds → Daily Sky & Quote' },
        { title:'HERITAGE', sub:'temples · tīrtha — Sthala-purāṇa · arts', feeds:'feeds → Locator & Aarti' },
      ];
  const learnFeatures = [
        { num:'FEATURE 01', title:'Video Library', body:'Curated courses & playlists on Indian culture, embedded from YouTube by topic — history, scriptures, arts, science.', plabel:'Powered by', powered:'The full canon tree → topic taxonomy; the 52 science correspondences become course spines.', tags:[{ isCost:true, text:'Zero hosting cost' }] },
        { num:'FEATURE 02', title:'Shorts Feed', body:'Vertically scrollable short clips — bite-size facts, verses, and “did you know” science parallels.', plabel:'Powered by', powered:'T1/T2 fact snippets from the reference table, one card each.', tags:[{ isCost:true, text:'Zero hosting cost' }] },
        { num:'FEATURE 04 + 10', title:'Vedic Docs & Facts', body:'Long-form documentaries and readable fact-cards presenting the scientific significance of scriptures — with exact references and honesty tiers.', plabel:'Powered by', powered:'The “Bhārata Vidyā” paper — Parts I & II, verbatim source material.', tags:[{ isAi:true, text:'AI: level-shift & summarize' }] },
        { num:'FEATURE 03', title:'Cultural Hotspot Locator', body:'Wherever the user travels, surfaces the nearest cultural sites from a curated database — temples, heritage sites, museums, festivals.', plabel:'Powered by', powered:'Sthala-purāṇa & heritage database; geolocation + your feeded dataset.', tags:[{ isAi:true, text:'AI: auto-generate site blurbs' }] },
      ];
  const practiceFeatures = [
        { num:'FEATURE 08', title:'Yoga Flashcards', body:'Swipeable āsana & meditation cards to inspire physical and mental fitness, with pose, breath, and benefit.', plabel:'Powered by', powered:'Yoga Sūtras (Patañjali) + Haṭha texts; benefits cited to contemplative-neuroscience research (Lutz 2008, Tang 2015).', tags:[] },
        { num:'FEATURE 06', title:'Jap Counter', body:'A digital mālā for meditation — tap or auto-count, set targets, track streaks calmly (no dark-pattern pressure).', plabel:'Powered by', powered:'Mantra corpus; the 108-bead tradition explained factually.', tags:[] },
        { num:'FEATURE 07', title:'Āyurvedic Lifestyle', body:'Weekly Āyurvedic tips to improve wellbeing — routine, diet-as-culture, seasonal living.', plabel:'Powered by', powered:'Caraka & Suśruta Saṃhitās — framed as historical/lifestyle wisdom.', tags:[{ isAi:true, text:'AI: personalize weekly tip' }] },
      ];
  const dailyFeatures = [
        { num:'FEATURE 05', title:'Scientific “Horoscope” / Sky Today', body:'A minimal daily astro-segment that keeps users hooked — but shows the real sky: today’s tithi, nakṣatra, moon phase, planetary positions, and any real events (eclipses, conjunctions), each explained.', plabel:'Powered by', powered:'Jyotiṣa as observational astronomy + a live ephemeris; the honest core of the tradition.', tags:[{ isAi:true, text:'AI: plain-language daily sky note' }] },
        { num:'FEATURE 12a', title:'Daily Quote', body:'One verse or teaching per day — with reference, meaning, and a reflective prompt. The “thought for the day” people seek from horoscopes, grounded in the corpus.', plabel:'Powered by', powered:'Gītā, Upaniṣads, Tirukkuṟaḷ, sant poetry — tiered & referenced.', tags:[] },
        { num:'FEATURE 12b', title:'Wellbeing Reminders', body:'Gentle nudges — water, yoga time, breath breaks, the day’s Āyurvedic tip — as a calm ritual, not a compulsive streak-trap.', plabel:'Powered by', powered:'Dinacaryā (daily-routine) tradition + wellbeing best practice.', tags:[] },
      ];
  const communityFeatures = [
        { num:'FEATURE 09', title:'Live Aarti Viewing', body:'Live aarti streamed directly through the app via YouTube — zero running cost. Scales as temples add their streams once the userbase grows.', plabel:'Powered by', powered:'Embedded live streams; a temple-partner directory over time.', tags:[{ isCost:true, text:'Zero streaming cost' }] },
        { num:'FEATURE 13', title:'Group Video Calling + Reader', body:'Far-away families do a video call on the app — with an integrated reader to chant, meditate, or do aarti together on auspicious occasions. This is the unique, first-of-its-kind feature.', plabel:'Powered by', powered:'WebRTC group calls + a synced chant/aarti reader pane; occasion calendar from the pañcāṅga.', tags:[{ isAi:true, text:'AI: syllable-sync & pronunciation guide' }] },
      ];
  const aiFeatures = [
        { num:'AI 01', title:'“Ask Prarthana” Guide', body:'A chatbot grounded only in your verified corpus — answers with references and honesty tiers, never invents. Unique because the knowledge base is unique.', plabel:'Cost control', powered:'Small open model + retrieval over your own docs = minimal per-query cost; cache common answers.' },
        { num:'AI 02', title:'Translation & Access', body:'Body content into many languages (Sanskrit terms preserved & glossed) + text-to-speech narration — the biggest lever for going global.', plabel:'Cost control', powered:'Translate once, cache; on-device TTS where possible.' },
        { num:'AI 03', title:'Pronunciation & Sync', body:'For jap, chant, and the group-call reader: syllable-sync and pronunciation scoring so anyone can recite correctly.', plabel:'Cost control', powered:'On-device speech APIs; forced alignment runs locally.' },
        { num:'AI 04', title:'Personalization & Verification', body:'Sequences content to each user; and behind the scenes, an AI checks every new fact against sources and flags its tier before publish.', plabel:'The moat', powered:'Verification AI keeps thousands of claims rigorous — the credibility engine.' },
      ];
  const knowledgeCards = [
        { title:'Sciences → Docs & Courses', items:[{b:'Piṅgala’s binary',s:'Chandaḥśāstra 8'},{b:'Brahmagupta’s zero',s:'BSpS ch. 18'},{b:'Āryabhaṭa’s astronomy',s:'Āryabhaṭīya'},{b:'Nyāya logic',s:'Nyāya Sūtras'}] },
        { title:'Medicine → Āyurveda Feature', items:[{b:'Internal medicine',s:'Caraka Saṃhitā'},{b:'Surgery',s:'Suśruta Saṃhitā'},{b:'Daily routine',s:'dinacaryā texts'},{b:'Seasonal living',s:'ṛtucaryā'}] },
        { title:'Mind & Body → Yoga / Jap', items:[{b:'Eight limbs of yoga',s:'Yoga Sūtras 2.29'},{b:'Meditation states',s:'Māṇḍūkya Up.'},{b:'Breath practices',s:'Vijñāna Bhairava'},{b:'Mantra tradition',s:'108 mālā'}] },
        { title:'Sky → Daily Connection', items:[{b:'Calendar science',s:'Vedāṅga Jyotiṣa'},{b:'Real pañcāṅga',s:'live ephemeris'},{b:'Festival logic',s:'lunisolar calendar'},{b:'Reformed calendar',s:'Saha Committee 1952'}] },
        { title:'Heritage → Locator & Aarti', items:[{b:'Temple lore',s:'Sthala-purāṇas'},{b:'Pilgrimage atlas',s:'Skanda Purāṇa'},{b:'Sacred geography',s:'tīrtha tradition'},{b:'Arts & architecture',s:'Vāstu · Nāṭyaśāstra'}] },
        { title:'Wisdom → Daily Quote', items:[{b:'Action & focus',s:'Bhagavad Gītā'},{b:'Self-knowledge',s:'Upaniṣads'},{b:'Ethics (secular)',s:'Tirukkuṟaḷ'},{b:'Devotional poetry',s:'sant & bhakti canons'}] },
      ];

  return (
    <div className="about-container">
      <div style={{minHeight: '100vh'}}>

<header style={{position: 'sticky', top: '0', zIndex: '30', background: 'color-mix(in srgb,var(--bg) 84%,transparent)', backdropFilter: 'blur(12px)', webkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)'}}>
  <div style={{maxWidth: '1160px', margin: '0 auto', padding: '9px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      <span style={{color: 'var(--gold)', fontFamily: 'var(--disp)', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '.02em', display: 'inline-block', animation: 'breathe 4.5s ease-in-out infinite'}}>P</span>
      <span style={{fontFamily: 'var(--disp)', fontWeight: '800', letterSpacing: '.16em', color: 'var(--ink)', fontSize: '1rem'}}>PRARTHANA</span>
    </div>
    
  </div>
  <div style={{maxWidth: '1160px', margin: '0 auto', padding: '0 18px 9px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center'}}>
    <span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--faint)', marginRight: '2px'}}>Trace a path</span>
    <button  data-filter="learn" data-c="var(--gold)" onClick={onFilter} style={{display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', padding: '5px 11px', cursor: 'pointer', transition: 'all .25s ease'}}><span style={{width: '9px', height: '9px', borderRadius: '3px', background: 'var(--gold)'}}></span>Learn</button>
    <button  data-filter="practice" data-c="var(--green)" onClick={onFilter} style={{display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', padding: '5px 11px', cursor: 'pointer', transition: 'all .25s ease'}}><span style={{width: '9px', height: '9px', borderRadius: '3px', background: 'var(--green)'}}></span>Practice</button>
    <button  data-filter="daily" data-c="var(--sindoor)" onClick={onFilter} style={{display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', padding: '5px 11px', cursor: 'pointer', transition: 'all .25s ease'}}><span style={{width: '9px', height: '9px', borderRadius: '3px', background: 'var(--sindoor)'}}></span>Daily</button>
    <button  data-filter="connect" data-c="var(--blue)" onClick={onFilter} style={{display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', padding: '5px 11px', cursor: 'pointer', transition: 'all .25s ease'}}><span style={{width: '9px', height: '9px', borderRadius: '3px', background: 'var(--blue)'}}></span>Community</button>
  </div>
</header>

<div style={{maxWidth: '1160px', margin: '0 auto', padding: '0 20px'}}>

<header style={{textAlign: 'center', padding: '56px 6px 8px'}}>
  <div style={{fontWeight: '600', fontSize: '.64rem', letterSpacing: '.32em', color: 'var(--sindoor)', textTransform: 'uppercase', marginBottom: '12px'}}>Master Architecture · App × Knowledge</div>
  <h1 style={{fontFamily: 'var(--disp)', fontWeight: '800', color: 'var(--ink)', fontSize: 'clamp(2.6rem,11vw,5.4rem)', lineHeight: '.98', letterSpacing: '.02em'}}>PRARTHANA</h1>
  <div style={{width: '64px', height: '3px', background: 'linear-gradient(90deg,var(--gold),var(--sindoor))', borderRadius: '2px', margin: '18px auto 0'}}></div>
  <p style={{maxWidth: '640px', margin: '20px auto 0', fontSize: '1.02rem'}}>Science with spirituality, from the ancient culture and scriptures of Bhārata — presented globally with elegance, modernized for today.</p>
  <p style={{marginTop: '16px', fontStyle: 'italic', color: 'var(--faint)', fontSize: '.94rem', lineHeight: '1.9'}}>“Reviving and modernizing the ancient culture of Bhārata.”<br/>“Traditional practice, presented with scientific fact.”</p>
</header>

<section aria-label="Combined architecture map" style={{margin: '30px 0 8px'}}>
  <div style={{textAlign: 'center', fontFamily: 'var(--sans)', fontWeight: '600', fontSize: '.62rem', letterSpacing: '.28em', color: 'var(--faint)', textTransform: 'uppercase'}}>The Combined Map</div>
  <p style={{textAlign: 'center', fontSize: '.9rem', color: 'var(--faint)', marginTop: '6px'}}>The app above · the ancient knowledge below, feeding it. Tap a colour to trace one path.</p>

  <div  style={{display: 'flex', justifyContent: 'center', marginTop: '22px'}}>
    <div style={{background: 'var(--gold-bg)', border: '1.6px solid var(--gold)', borderRadius: '14px', padding: '12px 26px', textAlign: 'center'}}>
      <div style={{fontFamily: 'var(--disp)', fontWeight: '700', letterSpacing: '.14em', color: 'var(--gold)', fontSize: '1.05rem'}}>PRARTHANA</div>
      <div style={{fontSize: '.6rem', letterSpacing: '.24em', color: 'var(--faint)', textTransform: 'uppercase', marginTop: '2px'}}>The App</div>
    </div>
  </div>
  <div style={{width: '2px', height: '20px', background: 'var(--gold-dim)', margin: '0 auto'}}></div>

  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,205px),1fr))', gap: '12px'}}>
    {groups .map((g, index) => (
<React.Fragment key={index}>

      <button data-group="{g.id }" data-filter="{g.id }" onClick={onFilter} style={{textAlign: 'left', background: 'var(--panel)', border: '1px solid var(--line)', borderTop: '3px solid {g.color }', borderRadius: '14px', padding: '14px 15px', cursor: 'pointer', boxShadow: 'var(--shadow)', transition: 'transform .25s ease,box-shadow .25s ease,opacity .3s ease'}} >
        <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.82rem', letterSpacing: '.1em', color: '{g.color }'}}>{g.name }</div>
        <div style={{fontSize: '.72rem', color: 'var(--faint)', margin: '3px 0 9px', letterSpacing: '.03em'}}>{g.sub }</div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
          {g.leaves .map((lf, index) => (
<React.Fragment key={index}>

            <span style={{fontSize: '.66rem', color: 'var(--body)', background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: '6px', padding: '3px 7px'}}>{lf }</span>
          
</React.Fragment>
))}
        </div>
      </button>
    
</React.Fragment>
))}
  </div>

  <div  style={{marginTop: '14px', background: 'var(--blue-bg)', border: '1.4px dashed var(--blue)', borderRadius: '12px', padding: '13px 18px', textAlign: 'center'}}>
    <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.72rem', letterSpacing: '.14em', color: 'var(--blue)'}}>AI LAYER · CROSS-CUTTING</div>
    <div style={{fontSize: '.78rem', color: 'var(--faint)', marginTop: '3px'}}>free chatbot guide · translation · verification · personalization — powers every module above</div>
  </div>

  <div style={{display: 'flex', alignItems: 'center', gap: '12px', margin: '26px 0 20px'}}>
    <div style={{flex: '1', height: '1px', background: 'var(--line)'}}></div>
    <div style={{fontSize: '.62rem', letterSpacing: '.16em', color: 'var(--faint)', textTransform: 'uppercase', whiteSpace: 'nowrap'}}>▲ The app · the knowledge that feeds it ▼</div>
    <div style={{flex: '1', height: '1px', background: 'var(--line)'}}></div>
  </div>

  <div  style={{display: 'flex', justifyContent: 'center'}}>
    <div style={{background: 'color-mix(in srgb,var(--ink) 8%,var(--panel))', border: '1.4px solid var(--ink)', borderRadius: '14px', padding: '12px 24px', textAlign: 'center', maxWidth: '100%'}}>
      <div style={{fontFamily: 'var(--disp)', fontWeight: '700', letterSpacing: '.06em', color: 'var(--ink)', fontSize: '.92rem'}}>ANCIENT INDIAN KNOWLEDGE</div>
      <div style={{fontSize: '.6rem', letterSpacing: '.2em', color: 'var(--faint)', textTransform: 'uppercase', marginTop: '2px'}}>Śruti · Smṛti · Śāstra · Darśana</div>
    </div>
  </div>
  <div style={{width: '2px', height: '18px', background: 'var(--line)', margin: '0 auto'}}></div>

  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,168px),1fr))', gap: '12px'}}>
    {branches .map((b, index) => (
<React.Fragment key={index}>

      <div style={{background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: '12px', padding: '13px 14px', boxShadow: 'var(--shadow)'}}>
        <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.78rem', letterSpacing: '.06em', color: 'var(--ink)'}}>{b.title }</div>
        <div style={{fontSize: '.72rem', color: 'var(--faint)', margin: '4px 0 9px', lineHeight: '1.5'}}>{b.sub }</div>
        <div style={{fontSize: '.68rem', fontWeight: '600', color: 'var(--gold)', letterSpacing: '.02em'}}>{b.feeds }</div>
      </div>
    
</React.Fragment>
))}
  </div>

  <div style={{display: 'flex', justifyContent: 'center', marginTop: '14px'}}>
    <div style={{width: '2px', height: '18px', background: 'var(--gold-dim)', animation: 'feedpulse 2.4s ease-in-out infinite'}}></div>
  </div>
  <div style={{background: 'var(--gold-bg)', border: '1.2px dashed var(--gold)', borderRadius: '12px', padding: '12px 18px', textAlign: 'center'}}>
    <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.72rem', letterSpacing: '.1em', color: 'var(--gold)'}}>ALL KNOWLEDGE → THE APP’S FEATURES ABOVE</div>
    <div style={{fontSize: '.76rem', color: 'var(--faint)', marginTop: '3px'}}>each verified, tiered, and referenced before it appears in a feature</div>
  </div>

  <div style={{marginTop: '14px', background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '14px 18px', textAlign: 'center'}}>
    <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.8rem', letterSpacing: '.05em', color: 'var(--ink)'}}>EVERY FEATURE CARRIES A SCIENTIFIC / FACTUAL REFERENCE</div>
    <div style={{fontSize: '.76rem', color: 'var(--faint)', marginTop: '3px'}}>tradition presented as verifiable knowledge — the core promise</div>
  </div>
</section>

<section  style={{padding: '44px 0 4px'}}>
  <div style={{fontWeight: '600', fontSize: '.62rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--sindoor)', marginBottom: '8px'}}>Group 1 · Learn &amp; Discover</div>
  <h3 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: 'clamp(1.5rem,4.4vw,2.1rem)', letterSpacing: '-.01em', lineHeight: '1.15'}}>Content that teaches the culture — as knowledge, not doctrine</h3>
  <p style={{maxWidth: '760px', margin: '10px 0 0', fontSize: '.98rem'}}>Zero-to-low content cost by embedding, with Prarthana adding the layer nobody else has: the <strong style={{color: 'var(--ink)', fontWeight: '600'}}>scientific and factual significance</strong> beside every piece.</p>
</section>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,265px),1fr))', gap: '14px', marginTop: '20px'}}>
  {learnFeatures .map((f, index) => (
<React.Fragment key={index}>

    <div  data-group="learn" style={{background: 'var(--panel)', border: '1px solid var(--line)', borderTop: '3px solid var(--gold)', borderRadius: '12px', padding: '16px 18px', boxShadow: 'var(--shadow)', transition: 'transform .25s ease,box-shadow .25s ease,opacity .3s ease,filter .3s ease'}} >
      <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.7rem', color: 'var(--faint)', letterSpacing: '.1em'}}>{f.num }</div>
      <h4 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: '1.12rem', margin: '3px 0 6px', letterSpacing: '.01em'}}>{f.title }</h4>
      <p style={{fontSize: '.9rem', marginBottom: '8px', lineHeight: '1.55'}}>{f.body }</p>
      <div style={{fontSize: '.78rem', color: 'var(--body)', borderTop: '1px dashed var(--line)', paddingTop: '8px', marginTop: '8px'}}><b style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '2px'}}>{f.plabel }</b>{f.powered }</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px'}}>
        {f.tags .map((t, index) => (
<React.Fragment key={index}>

          {t.isCost  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid color-mix(in srgb,var(--green) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
          {t.isAi  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid color-mix(in srgb,var(--blue) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
        
</React.Fragment>
))}
      </div>
    </div>
  
</React.Fragment>
))}
</div>

<section  style={{padding: '44px 0 4px'}}>
  <div style={{fontWeight: '600', fontSize: '.62rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--sindoor)', marginBottom: '8px'}}>Group 2 · Practice &amp; Wellbeing</div>
  <h3 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: 'clamp(1.5rem,4.4vw,2.1rem)', letterSpacing: '-.01em', lineHeight: '1.15'}}>Do the tradition — with the science of why it works</h3>
  <p style={{maxWidth: '760px', margin: '10px 0 0', fontSize: '.98rem'}}>Each practice pairs the authentic instruction with the actual contemplative-science or health note — honest about what is proven and what is heritage.</p>
</section>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,265px),1fr))', gap: '14px', marginTop: '20px'}}>
  {practiceFeatures .map((f, index) => (
<React.Fragment key={index}>

    <div  data-group="practice" style={{background: 'var(--panel)', border: '1px solid var(--line)', borderTop: '3px solid var(--green)', borderRadius: '12px', padding: '16px 18px', boxShadow: 'var(--shadow)', transition: 'transform .25s ease,box-shadow .25s ease,opacity .3s ease,filter .3s ease'}} >
      <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.7rem', color: 'var(--faint)', letterSpacing: '.1em'}}>{f.num }</div>
      <h4 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: '1.12rem', margin: '3px 0 6px', letterSpacing: '.01em'}}>{f.title }</h4>
      <p style={{fontSize: '.9rem', marginBottom: '8px', lineHeight: '1.55'}}>{f.body }</p>
      <div style={{fontSize: '.78rem', color: 'var(--body)', borderTop: '1px dashed var(--line)', paddingTop: '8px', marginTop: '8px'}}><b style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '2px'}}>{f.plabel }</b>{f.powered }</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px'}}>
        {f.tags .map((t, index) => (
<React.Fragment key={index}>

          {t.isCost  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid color-mix(in srgb,var(--green) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
          {t.isAi  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid color-mix(in srgb,var(--blue) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
        
</React.Fragment>
))}
      </div>
    </div>
  
</React.Fragment>
))}
</div>
<div  style={{background: 'var(--sindoor-bg)', border: '1px solid color-mix(in srgb,var(--sindoor) 26%,transparent)', borderLeft: '4px solid var(--sindoor)', borderRadius: '10px', padding: '18px 22px', margin: '24px 0', fontSize: '.92rem'}}>
  <b style={{fontFamily: 'var(--disp)', color: 'var(--sindoor)', fontWeight: '700'}}>One care note on Āyurveda &amp; wellbeing.</b> Present these as lifestyle and heritage wisdom, with a clear “not a substitute for medical advice” line on any health-adjacent tip. That honesty protects your users and your brand — and it’s exactly what lets a wellness feature scale globally without legal or credibility risk.
</div>

<section  style={{padding: '44px 0 4px'}}>
  <div style={{fontWeight: '600', fontSize: '.62rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--sindoor)', marginBottom: '8px'}}>Group 3 · Daily Connection</div>
  <h3 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: 'clamp(1.5rem,4.4vw,2.1rem)', letterSpacing: '-.01em', lineHeight: '1.15'}}>The daily ritual — real sky, real calendar, real reflection</h3>
  <p style={{maxWidth: '760px', margin: '10px 0 0', fontSize: '.98rem'}}>This is the segment-retention hook you wanted (like horoscope/astrology) — but reframed so it stays credible forever: keep the daily touchpoint, replace prediction with astronomy + reflection.</p>
</section>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,265px),1fr))', gap: '14px', marginTop: '20px'}}>
  {dailyFeatures .map((f, index) => (
<React.Fragment key={index}>

    <div  data-group="daily" style={{background: 'var(--panel)', border: '1px solid var(--line)', borderTop: '3px solid var(--sindoor)', borderRadius: '12px', padding: '16px 18px', boxShadow: 'var(--shadow)', transition: 'transform .25s ease,box-shadow .25s ease,opacity .3s ease,filter .3s ease'}} >
      <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.7rem', color: 'var(--faint)', letterSpacing: '.1em'}}>{f.num }</div>
      <h4 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: '1.12rem', margin: '3px 0 6px', letterSpacing: '.01em'}}>{f.title }</h4>
      <p style={{fontSize: '.9rem', marginBottom: '8px', lineHeight: '1.55'}}>{f.body }</p>
      <div style={{fontSize: '.78rem', color: 'var(--body)', borderTop: '1px dashed var(--line)', paddingTop: '8px', marginTop: '8px'}}><b style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '2px'}}>{f.plabel }</b>{f.powered }</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px'}}>
        {f.tags .map((t, index) => (
<React.Fragment key={index}>

          {t.isCost  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid color-mix(in srgb,var(--green) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
          {t.isAi  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid color-mix(in srgb,var(--blue) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
        
</React.Fragment>
))}
      </div>
    </div>
  
</React.Fragment>
))}
</div>

<section  style={{padding: '44px 0 4px'}}>
  <div style={{fontWeight: '600', fontSize: '.62rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--sindoor)', marginBottom: '8px'}}>Group 4 · Community &amp; Live</div>
  <h3 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: 'clamp(1.5rem,4.4vw,2.1rem)', letterSpacing: '-.01em', lineHeight: '1.15'}}>Together, across distance — the emotional heart</h3>
  <p style={{maxWidth: '760px', margin: '10px 0 0', fontSize: '.98rem'}}>The features that turn an app into a shared practice — and the most defensible against copycats, because they build a network.</p>
</section>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: '14px', marginTop: '20px'}}>
  {communityFeatures .map((f, index) => (
<React.Fragment key={index}>

    <div  data-group="connect" style={{background: 'var(--panel)', border: '1px solid var(--line)', borderTop: '3px solid var(--blue)', borderRadius: '12px', padding: '16px 18px', boxShadow: 'var(--shadow)', transition: 'transform .25s ease,box-shadow .25s ease,opacity .3s ease,filter .3s ease'}} >
      <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.7rem', color: 'var(--faint)', letterSpacing: '.1em'}}>{f.num }</div>
      <h4 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: '1.12rem', margin: '3px 0 6px', letterSpacing: '.01em'}}>{f.title }</h4>
      <p style={{fontSize: '.9rem', marginBottom: '8px', lineHeight: '1.55'}}>{f.body }</p>
      <div style={{fontSize: '.78rem', color: 'var(--body)', borderTop: '1px dashed var(--line)', paddingTop: '8px', marginTop: '8px'}}><b style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '2px'}}>{f.plabel }</b>{f.powered }</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px'}}>
        {f.tags .map((t, index) => (
<React.Fragment key={index}>

          {t.isCost  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid color-mix(in srgb,var(--green) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
          {t.isAi  ? (<span style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid color-mix(in srgb,var(--blue) 34%,transparent)', borderRadius: '5px', padding: '2px 8px'}}>{t.text }</span>) : null}
        
</React.Fragment>
))}
      </div>
    </div>
  
</React.Fragment>
))}
</div>

<section  style={{padding: '44px 0 4px'}}>
  <div style={{fontWeight: '600', fontSize: '.62rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '8px'}}>Cross-cutting · The AI Layer</div>
  <h3 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: 'clamp(1.5rem,4.4vw,2.1rem)', letterSpacing: '-.01em', lineHeight: '1.15'}}>Unique, and free to run</h3>
  <p style={{maxWidth: '760px', margin: '10px 0 0', fontSize: '.98rem'}}>You wanted a chatbot that’s unique and doesn’t cost you. The answer to both: a <strong style={{color: 'var(--ink)', fontWeight: '600'}}>retrieval-grounded guide</strong> that only answers from Prarthana’s own verified content — cheap, and unique precisely because no other app has this tiered, referenced knowledge base behind it.</p>
</section>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,255px),1fr))', gap: '14px', marginTop: '20px'}}>
  {aiFeatures .map((f, index) => (
<React.Fragment key={index}>

    <div  style={{background: 'var(--panel)', border: '1px solid var(--line)', borderTop: '3px solid var(--blue)', borderRadius: '12px', padding: '16px 18px', boxShadow: 'var(--shadow)', transition: 'transform .25s ease,box-shadow .25s ease'}} >
      <div style={{fontFamily: 'var(--disp)', fontWeight: '700', fontSize: '.7rem', color: 'var(--faint)', letterSpacing: '.1em'}}>{f.num }</div>
      <h4 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: '1.08rem', margin: '3px 0 6px', letterSpacing: '.01em'}}>{f.title }</h4>
      <p style={{fontSize: '.9rem', marginBottom: '8px', lineHeight: '1.55'}}>{f.body }</p>
      <div style={{fontSize: '.78rem', color: 'var(--body)', borderTop: '1px dashed var(--line)', paddingTop: '8px', marginTop: '8px'}}><b style={{fontWeight: '600', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: '2px'}}>{f.plabel }</b>{f.powered }</div>
    </div>
  
</React.Fragment>
))}
</div>

<section  style={{padding: '44px 0 4px'}}>
  <div style={{fontWeight: '600', fontSize: '.62rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--sindoor)', marginBottom: '8px'}}>The foundation · Knowledge → Feature mapping</div>
  <h3 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: 'clamp(1.5rem,4.4vw,2.1rem)', letterSpacing: '-.01em', lineHeight: '1.15'}}>Which scripture powers which feature</h3>
  <p style={{maxWidth: '760px', margin: '10px 0 0', fontSize: '.98rem'}}>The content graph beneath the whole app. Every branch of the tradition feeds a specific product surface.</p>
</section>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,285px),1fr))', gap: '14px', marginTop: '20px'}}>
  {knowledgeCards .map((k, index) => (
<React.Fragment key={index}>

    <div  style={{background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 18px', boxShadow: 'var(--shadow)'}}>
      <h4 style={{fontFamily: 'var(--disp)', fontWeight: '700', color: 'var(--ink)', fontSize: '1.02rem', marginBottom: '8px'}}>{k.title }</h4>
      <div>
        {k.items .map((it, index) => (
<React.Fragment key={index}>

          <div style={{fontSize: '.86rem', padding: '6px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline'}}>
            <b style={{fontWeight: '600', color: 'var(--body)'}}>{it.b }</b>
            <span style={{color: 'var(--faint)', fontSize: '.76rem', textAlign: 'right', flex: 'none'}}>{it.s }</span>
          </div>
        
</React.Fragment>
))}
      </div>
    </div>
  
</React.Fragment>
))}
</div>

</div>

<footer  style={{textAlign: 'center', padding: '56px 22px 80px'}}>
  <div style={{width: '44px', height: '3px', borderRadius: '2px', margin: '0 auto', background: 'linear-gradient(90deg,var(--gold),var(--sindoor))'}}></div>
  <p style={{fontFamily: 'var(--disp)', fontWeight: '600', color: 'var(--ink)', fontSize: '1.05rem', marginTop: '12px'}}>PRARTHANA — science with spirituality, first of its kind.</p>
  <p style={{maxWidth: '620px', margin: '12px auto 0', fontSize: '.94rem'}}>One promise runs through every branch: the tradition is presented as verifiable knowledge, with a factual or scientific reference behind it. That is what makes it shareable with the whole world — and impossible to copy without doing the same rigorous work.</p>
</footer>

</div>

    </div>
  );
}
