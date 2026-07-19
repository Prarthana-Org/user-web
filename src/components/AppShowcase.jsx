import React, { useEffect, useState, useRef } from 'react';
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

    useEffect(() => {
        // Center the first item on load for mobile view
        if (galleryRef.current && window.innerWidth <= 768) {
            setTimeout(() => {
                const wrapper = galleryRef.current;
                const items = Array.from(wrapper.querySelectorAll('.phone-wrap'));
                if (items.length > 0) {
                    const firstItem = items[0];
                    const scrollLeft = firstItem.offsetLeft - (wrapper.clientWidth / 2) + (firstItem.clientWidth / 2);
                    wrapper.scrollTo({ left: scrollLeft, behavior: 'auto' });
                }
            }, 500);
        }
    }, []);

    // Provide the extracted raw HTML from the prototype
        const galleryRef = useRef(null);

    const scrollGallery = (direction) => {
        if (!galleryRef.current) return;
        
        const wrapper = galleryRef.current;
        const items = Array.from(wrapper.querySelectorAll('.phone-wrap'));
        if (items.length === 0) return;
        
        const wrapperCenter = wrapper.getBoundingClientRect().left + wrapper.clientWidth / 2;
        
        // Find the item currently closest to the center
        let closestIndex = 0;
        let minDistance = Infinity;
        
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(itemCenter - wrapperCenter);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });
        
        let targetIndex = closestIndex;
        if (direction === 'forward') {
            targetIndex = Math.min(items.length - 1, closestIndex + 1);
        } else {
            targetIndex = Math.max(0, closestIndex - 1);
        }
        
        const targetItem = items[targetIndex];
        
        // Scroll target into view, centering it
        const scrollLeft = targetItem.offsetLeft - (wrapper.clientWidth / 2) + (targetItem.clientWidth / 2);
        wrapper.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    };

    const rawHTML = `

<!-- ══════════════════ SCREEN 00 · INTERACTIVE LANDING ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen landing-screen" style="background:transparent">
    <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>

    <!-- ambient blobs -->
    <div class="l-blob b1"></div>
    <div class="l-blob b2"></div>

    <div class="landing-inner">
      <!-- INTERACTIVE CHAKRA LOGO -->
      <div class="chakra-hero" tabindex="0" aria-label="Prarthana logo — hover to spin">
        <!-- glow -->
        <div class="chakra-glow"></div>
        <!-- outer petals ring (slow spin, speeds on hover) -->
        <svg class="chakra-svg outer" viewBox="0 0 200 200">
          <g class="petals"><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(0 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(30 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(60 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(90 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(120 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(150 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(180 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(210 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(240 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(270 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(300 100 100)"/><ellipse cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform="rotate(330 100 100)"/></g>
        </svg>
        <!-- spokes ring (counter-spin) -->
        <svg class="chakra-svg spokes" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="74" fill="none" stroke="var(--saffron)" stroke-width="2" opacity=".5"/>
          <g class="spoke-lines"><path d="M154.0 100.0L172.0 100.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M152.2 114.0L169.5 118.6" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M146.8 127.0L162.4 136.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M138.2 138.2L150.9 150.9" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M127.0 146.8L136.0 162.4" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M114.0 152.2L118.6 169.5" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M100.0 154.0L100.0 172.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M86.0 152.2L81.4 169.5" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M73.0 146.8L64.0 162.4" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M61.8 138.2L49.1 150.9" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M53.2 127.0L37.6 136.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M47.8 114.0L30.5 118.6" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M46.0 100.0L28.0 100.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M47.8 86.0L30.5 81.4" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M53.2 73.0L37.6 64.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M61.8 61.8L49.1 49.1" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M73.0 53.2L64.0 37.6" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M86.0 47.8L81.4 30.5" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M100.0 46.0L100.0 28.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M114.0 47.8L118.6 30.5" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M127.0 53.2L136.0 37.6" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M138.2 61.8L150.9 49.1" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M146.8 73.0L162.4 64.0" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/><path d="M152.2 86.0L169.5 81.4" stroke="var(--saffron)" stroke-width="1.6" opacity=".6"/></g>
          <circle cx="100" cy="100" r="52" fill="none" stroke="var(--saffron)" stroke-width="2.5"/>
        </svg>
        <!-- pulsing rings on hover -->
        <div class="chakra-ping"></div>
        <div class="chakra-ping d2"></div>
        <!-- center: meditating figure -->
        <svg class="meditator" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="medg" cx="50%" cy="35%" r="70%">
              <stop offset="0" stop-color="#FFB068"/><stop offset="1" stop-color="#F1690F"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#medg)"/>
          <!-- lotus base -->
          <g fill="#fff" opacity=".95">
            <circle cx="50" cy="34" r="8.5"/>
            <path d="M50 44c-9 0-16 6.4-16 15 0 5.2 3 8.8 5.6 10.8-4 1.8-9.6 3.4-13.8 7.6-.8.8-.3 2 .8 2h46.8c1.1 0 1.6-1.2.8-2-4.2-4.2-9.8-5.8-13.8-7.6 2.6-2 5.6-5.6 5.6-10.8 0-8.6-7-15-16-15z"/>
          </g>
          <!-- hand mudra dots -->
          <circle cx="33" cy="64" r="2.4" fill="#fff"/>
          <circle cx="67" cy="64" r="2.4" fill="#fff"/>
        </svg>
      </div>

      <!-- wordmark -->
      <div class="l-word">Prarthana</div>
      <div class="l-tag">Ancient knowledge · modern lens</div>
      <div class="l-sanskrit">॥ विद्या अमृतम् अश्नुते ॥</div>

      <!-- pulsing hint -->
      <div class="l-hint">✨ Hover the chakra</div>

      <!-- CTA -->
      <button class="l-cta">
        Begin the journey
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
      </button>
      <div class="l-sub">Explore in 12 languages · every fact sourced</div>
    </div>
  </div></div>
  <div class="screen-label"><b>00</b> · Interactive landing</div>
</div>
<!-- ══════════════════ SCREEN 1 · SPLASH / LOGIN ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen" style="background:transparent">
    <!-- animated aurora bg -->
    <div style="position:absolute;inset:0;overflow:hidden">
      <div style="position:absolute;top:-60px;left:-40px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(255,138,61,.35),transparent 70%);filter:blur(20px);animation:bob 6s ease-in-out infinite"></div>
      <div style="position:absolute;bottom:40px;right:-60px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(56,225,196,.22),transparent 70%);filter:blur(24px);animation:bob 7s ease-in-out infinite .5s"></div>
    </div>
    <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>

    <div style="position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;padding:70px 30px 0" class="stg">
      <!-- logo mark with pulsing ring -->
      <div style="position:relative;width:96px;height:96px;margin-bottom:22px">
        <div style="position:absolute;inset:0;border-radius:28px;border:2px solid rgba(255,138,61,.4);animation:ring 2.4s ease-out infinite"></div>
        <div style="position:absolute;inset:0;border-radius:28px;background:var(--grad-saffron);display:grid;place-items:center;box-shadow:0 16px 40px rgba(255,138,61,.5);animation:bob 4s ease-in-out infinite">
          <svg viewBox="0 0 24 24" width="46" height="46" fill="none"><path d="M12 2l2.4 6.8H21l-5.3 4 2 6.7L12 15.4 6.3 19.5l2-6.7L3 8.8h6.6z" fill="#fff"/></svg>
        </div>
      </div>
      <div style="font-family:var(--font);font-weight:800;font-size:2rem;letter-spacing:.02em">Prarthana</div>
      <div style="color:var(--mid);font-size:.9rem;margin-top:6px">Ancient knowledge, modern lens</div>

      <!-- glass card -->
      <div style="width:100%;margin-top:38px;background:rgba(255,255,255,.05);backdrop-filter:blur(16px);border:1px solid var(--stroke-2);border-radius:26px;padding:24px 20px">
        <div style="font-family:var(--font);font-weight:600;font-size:1.05rem">Welcome back</div>
        <div style="color:var(--lo);font-size:.8rem;margin:4px 0 20px">Sign in to continue exploring</div>

        <div style="display:flex;align-items:center;gap:10px;background:var(--ink-3);border:1px solid var(--stroke);border-radius:14px;padding:13px 15px;margin-bottom:12px">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--lo)" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
          <span style="color:var(--lo);font-size:.86rem">Email address</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;background:var(--ink-3);border:1px solid var(--stroke);border-radius:14px;padding:13px 15px;margin-bottom:20px">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--lo)" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
          <span style="color:var(--lo);font-size:.86rem">Password</span>
        </div>

        <button style="width:100%;border:none;background:var(--grad-saffron);color:#fff;font-family:var(--font);font-weight:600;font-size:1rem;padding:15px;border-radius:14px;box-shadow:0 10px 26px rgba(255,138,61,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
          Continue
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
        </button>
        <div style="text-align:center;margin-top:16px;font-size:.82rem;color:var(--mid)">New here? <span style="color:var(--saffron);font-weight:600">Create account</span></div>
      </div>

      <!-- social proof strip -->
      <div style="display:flex;gap:16px;margin-top:22px;font-family:var(--mono);font-size:.62rem;color:var(--lo);letter-spacing:.05em">
        <span>🌍 12 LANGUAGES</span><span>📚 CITED SOURCES</span>
      </div>
    </div>
  </div></div>
  <div class="screen-label"><b>01</b> · Splash &amp; Login</div>
</div>

<!-- ══════════════════ SCREEN 2 · HOME ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen">
    <div class="scroll">
      <!-- hero header -->
      <div style="background:var(--grad-hero);padding-bottom:22px;position:relative;overflow:hidden">
        <div style="position:absolute;top:-40px;right:-30px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(255,138,61,.25),transparent 70%);animation:bob 6s ease-in-out infinite"></div>
        <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>
        <div class="appbar">
          <div class="brand"><span class="m"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.8H21l-5.3 4 2 6.7L12 15.4 6.3 19.5l2-6.7L3 8.8h6.6z" fill="#fff"/></svg></span> Prarthana</div>
          <div class="acts">
            <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg></div>
            <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg></div>
            <div class="iconbtn on"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></div>
          </div>
        </div>
        <div style="padding:6px 20px 0" class="stg">
          <div style="color:var(--mid);font-size:.86rem;display:flex;align-items:center;gap:6px">Namaste, welcome back <span style="animation:bob 2s ease-in-out infinite;display:inline-block">🙏</span></div>
          <div style="font-family:var(--font);font-weight:700;font-size:1.5rem;margin-top:2px">Explore the knowledge</div>
          <!-- search -->
          <div style="margin-top:16px;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.06);backdrop-filter:blur(10px);border:1px solid var(--stroke-2);border-radius:16px;padding:13px 15px">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--mid)" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/></svg>
            <span style="color:var(--lo);font-size:.86rem">Search texts, concepts, courses…</span>
            <span style="margin-left:auto;font-family:var(--mono);font-size:.6rem;color:var(--teal);background:var(--teal-dim);border:1px solid rgba(56,225,196,.3);padding:2px 6px;border-radius:6px">AI</span>
          </div>
        </div>
      </div>

      <!-- feature grid -->
      <div class="sh"><h2>Explore features</h2></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 20px" class="stg">
        <!-- big chant tile -->
        <div style="grid-row:span 2;background:var(--grad-saffron);border-radius:24px;padding:18px;position:relative;overflow:hidden;min-height:184px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 30px rgba(255,138,61,.35)">
          <div style="position:absolute;bottom:-20px;right:-20px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.12);animation:pulse 3s ease-in-out infinite"></div>
          <div style="width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.2);display:grid;place-items:center">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></svg>
          </div>
          <div>
            <div style="font-family:var(--font);font-weight:700;font-size:1.3rem;color:#fff">Chant</div>
            <div style="color:rgba(255,255,255,.85);font-size:.78rem">Digital mālā · jap counter</div>
            <div style="margin-top:10px;display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:.6rem;color:#fff;background:rgba(0,0,0,.18);padding:3px 8px;border-radius:8px">108 · resonance</div>
          </div>
        </div>
        <!-- streaming -->
        <div style="background:var(--grad-rose);border-radius:24px;padding:16px;min-height:86px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden">
          <div style="position:absolute;top:10px;right:12px;width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 0 0 rgba(255,255,255,.6);animation:ring 1.6s ease-out infinite"></div>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="m17 2-5 5-5-5"/></svg>
          <div style="font-family:var(--font);font-weight:600;color:#fff;font-size:.95rem">Live Aarti</div>
        </div>
        <!-- courses -->
        <div style="background:var(--grad-violet);border-radius:24px;padding:16px;min-height:86px;display:flex;flex-direction:column;justify-content:space-between">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg>
          <div style="font-family:var(--font);font-weight:600;color:#fff;font-size:.95rem">Courses</div>
        </div>
      </div>
      <!-- small row -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:12px 20px 0" class="stg">
        <div style="background:var(--ink-3);border:1px solid var(--stroke);border-radius:18px;padding:12px 8px;text-align:center">
          <div style="width:34px;height:34px;margin:0 auto 6px;border-radius:11px;background:var(--teal-dim);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--teal)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m9 8 5 4-5 4z" fill="var(--teal)"/></svg></div>
          <div style="font-size:.62rem;font-weight:600;color:var(--mid)">Shorts</div>
        </div>
        <div style="background:var(--ink-3);border:1px solid var(--stroke);border-radius:18px;padding:12px 8px;text-align:center">
          <div style="width:34px;height:34px;margin:0 auto 6px;border-radius:11px;background:rgba(255,194,75,.12);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--amber)" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg></div>
          <div style="font-size:.62rem;font-weight:600;color:var(--mid)">Sky Today</div>
        </div>
        <div style="background:var(--ink-3);border:1px solid var(--stroke);border-radius:18px;padding:12px 8px;text-align:center">
          <div style="width:34px;height:34px;margin:0 auto 6px;border-radius:11px;background:rgba(56,225,196,.12);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--teal)" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="1" y="14" width="5" height="7" rx="2"/><rect x="18" y="14" width="5" height="7" rx="2"/></svg></div>
          <div style="font-size:.62rem;font-weight:600;color:var(--mid)">Audio</div>
        </div>
        <div style="background:var(--ink-3);border:1px solid var(--stroke);border-radius:18px;padding:12px 8px;text-align:center">
          <div style="width:34px;height:34px;margin:0 auto 6px;border-radius:11px;background:rgba(255,107,138,.12);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--rose)" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></div>
          <div style="font-size:.62rem;font-weight:600;color:var(--mid)">Video Call</div>
        </div>
      </div>

      <!-- daily card -->
      <div class="sh"><h2>Today</h2><a>See all</a></div>
      <div style="margin:0 20px;background:linear-gradient(135deg,var(--ink-3),var(--ink-2));border:1px solid var(--stroke);border-radius:22px;padding:18px;position:relative;overflow:hidden" class="stg">
        <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(56,225,196,.18),transparent 70%)"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <span style="font-family:var(--mono);font-size:.64rem;letter-spacing:.1em;color:var(--teal)">◐ REAL SKY · 15 JUL</span>
          <span class="tier t1">ASTRONOMY</span>
        </div>
        <div style="font-family:var(--font);font-weight:600;font-size:1rem;line-height:1.4">Waxing Moon in Svāti nakṣatra</div>
        <div style="color:var(--mid);font-size:.82rem;margin-top:6px;line-height:1.5">Tonight the Moon sits ~63% illuminated near Arcturus. A calm evening for reflection.</div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <div style="flex:1;background:var(--ink);border-radius:12px;padding:10px;text-align:center"><div style="font-family:var(--mono);font-size:.9rem;color:var(--saffron);font-weight:700">05:42</div><div style="font-size:.58rem;color:var(--lo)">SUNRISE</div></div>
          <div style="flex:1;background:var(--ink);border-radius:12px;padding:10px;text-align:center"><div style="font-family:var(--mono);font-size:.9rem;color:var(--saffron);font-weight:700">19:11</div><div style="font-size:.58rem;color:var(--lo)">SUNSET</div></div>
          <div style="flex:1;background:var(--ink);border-radius:12px;padding:10px;text-align:center"><div style="font-family:var(--mono);font-size:.9rem;color:var(--teal);font-weight:700">63%</div><div style="font-size:.58rem;color:var(--lo)">MOON</div></div>
        </div>
      </div>

      <div style="height:100px"></div>
    </div>
    <!-- nav -->
    <div class="nav">
      <a class="on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Home</a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m10 8 5 4-5 4z"/></svg>Shorts</a>
      <a class="fab"><span class="b"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></span></a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="1" y="14" width="5" height="7" rx="2"/><rect x="18" y="14" width="5" height="7" rx="2"/></svg>Audio</a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Nearby</a>
    </div>
  </div></div>
  <div class="screen-label"><b>02</b> · Home</div>
</div>

<!-- ══════════════════ SCREEN 3 · CHANT (jap counter, animated) ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen" style="background:transparent">
    <div class="scroll">
      <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>
      <div style="display:flex;align-items:center;gap:14px;padding:8px 20px 0">
        <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></div>
        <div style="font-family:var(--font);font-weight:700;font-size:1.15rem">Chant</div>
        <div style="margin-left:auto" class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg></div>
      </div>

      <!-- mantra pill -->
      <div style="text-align:center;margin-top:22px" class="stg">
        <div style="display:inline-flex;align-items:center;gap:8px;background:var(--ink-3);border:1px solid var(--stroke);border-radius:20px;padding:8px 16px">
          <span style="font-family:var(--font);font-weight:600">ॐ नमः शिवाय</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--lo)" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>

      <!-- BIG counter ring -->
      <div style="position:relative;width:240px;height:240px;margin:28px auto 0">
        <!-- pulsing rings -->
        <div style="position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,138,61,.25);animation:ring 3s ease-out infinite"></div>
        <div style="position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,138,61,.25);animation:ring 3s ease-out infinite 1.5s"></div>
        <!-- progress ring -->
        <svg viewBox="0 0 240 240" style="position:absolute;inset:0;transform:rotate(-90deg)">
          <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="14"/>
          <circle cx="120" cy="120" r="104" fill="none" stroke="url(#g1)" stroke-width="14" stroke-linecap="round"
            stroke-dasharray="653" stroke-dashoffset="228" style="animation:drawline 1.4s cubic-bezier(.16,1,.3,1) forwards"/>
          <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A3D"/><stop offset="1" stop-color="#FFC24B"/></linearGradient></defs>
        </svg>
        <!-- center -->
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div style="font-family:var(--font);font-weight:800;font-size:3.4rem;line-height:1;animation:count .6s ease" class="mono">65</div>
          <div style="color:var(--lo);font-size:.78rem;margin-top:4px">of 108 malas</div>
          <div style="margin-top:8px;font-family:var(--mono);font-size:.62rem;color:var(--teal);background:var(--teal-dim);padding:3px 10px;border-radius:8px">◔ 60% complete</div>
        </div>
      </div>

      <!-- tap button -->
      <button style="display:block;width:150px;height:150px;border-radius:50%;margin:26px auto 0;border:none;background:var(--grad-saffron);color:#fff;box-shadow:0 20px 44px rgba(255,138,61,.5);cursor:pointer;position:relative;animation:bob 3s ease-in-out infinite">
        <div style="position:absolute;inset:0;border-radius:50%;border:3px solid rgba(255,255,255,.3);animation:ring 2s ease-out infinite"></div>
        <div style="font-family:var(--font);font-weight:700;font-size:1.1rem">TAP</div>
        <div style="font-size:.66rem;opacity:.85;margin-top:2px">to count</div>
      </button>

      <!-- science note -->
      <div style="margin:26px 20px 0;background:var(--ink-3);border:1px solid var(--stroke);border-left:3px solid var(--teal);border-radius:16px;padding:14px" class="stg">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span class="tier t1">SCIENCE NOTE</span></div>
        <div style="font-size:.82rem;color:var(--mid);line-height:1.5">Rhythmic mantra repetition slows the breath toward ~6 breaths/min — a rate linked in studies to increased heart-rate variability and vagal tone.</div>
      </div>
      <div style="height:100px"></div>
    </div>
  </div></div>
  <div class="screen-label"><b>03</b> · Chant / Jap</div>
</div>

<!-- ══════════════════ SCREEN 4 · COURSES ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen">
    <div class="scroll">
      <div style="background:var(--grad-hero);padding-bottom:8px">
        <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>
        <div style="display:flex;align-items:center;gap:14px;padding:8px 20px 14px">
          <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></div>
          <div style="font-family:var(--font);font-weight:700;font-size:1.15rem">Courses</div>
        </div>
        <!-- filter chips -->
        <div style="display:flex;gap:8px;padding:0 20px 6px;overflow-x:auto" class="stg">
          <span style="flex:none;background:var(--grad-saffron);color:#fff;font-size:.74rem;font-weight:600;padding:7px 14px;border-radius:20px">All</span>
          <span style="flex:none;background:var(--ink-3);border:1px solid var(--stroke);color:var(--mid);font-size:.74rem;font-weight:600;padding:7px 14px;border-radius:20px">Science</span>
          <span style="flex:none;background:var(--ink-3);border:1px solid var(--stroke);color:var(--mid);font-size:.74rem;font-weight:600;padding:7px 14px;border-radius:20px">Philosophy</span>
          <span style="flex:none;background:var(--ink-3);border:1px solid var(--stroke);color:var(--mid);font-size:.74rem;font-weight:600;padding:7px 14px;border-radius:20px">Āyurveda</span>
          <span style="flex:none;background:var(--ink-3);border:1px solid var(--stroke);color:var(--mid);font-size:.74rem;font-weight:600;padding:7px 14px;border-radius:20px">Math</span>
        </div>
      </div>

      <!-- featured course card -->
      <div style="margin:16px 20px 0" class="stg">
        <div style="background:var(--ink-2);border:1px solid var(--stroke);border-radius:24px;overflow:hidden;box-shadow:var(--shadow)">
          <div style="height:150px;background:linear-gradient(135deg,var(--map-a),var(--map-b));position:relative;display:grid;place-items:center">
            <div style="position:absolute;top:12px;left:12px;font-family:var(--mono);font-size:.6rem;color:#fff;background:rgba(0,0,0,.4);padding:4px 9px;border-radius:8px">⭐ 4.8 · 35 VIDEOS</div>
            <div style="position:absolute;top:12px;right:12px" class="tier t2">PHILOSOPHY</div>
            <div style="width:60px;height:60px;border-radius:50%;background:var(--grad-saffron);display:grid;place-items:center;box-shadow:0 10px 26px rgba(255,138,61,.5);animation:bob 3s ease-in-out infinite">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div style="padding:18px">
            <div style="font-family:var(--font);font-weight:700;font-size:1.15rem">Bhagavad Gītā Complete</div>
            <div style="color:var(--mid);font-size:.82rem;margin-top:4px;line-height:1.5">In-depth study with practical applications — decision-making, focus, and process-over-outcome thinking.</div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:12px">
              <div style="width:26px;height:26px;border-radius:50%;background:var(--grad-violet)"></div>
              <span style="font-size:.78rem;color:var(--mid)">Acharya Prashant</span>
            </div>
            <!-- progress -->
            <div style="margin-top:14px">
              <div style="display:flex;justify-content:space-between;font-size:.68rem;color:var(--lo);margin-bottom:6px"><span>Progress</span><span class="mono" style="color:var(--saffron)">12 / 35</span></div>
              <div style="height:6px;background:var(--ink);border-radius:6px;overflow:hidden"><div style="width:34%;height:100%;background:var(--grad-saffron);border-radius:6px"></div></div>
            </div>
            <button style="width:100%;margin-top:16px;border:none;background:var(--grad-saffron);color:#fff;font-family:var(--font);font-weight:600;padding:13px;border-radius:14px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 20px rgba(255,138,61,.35)">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M8 5v14l11-7z"/></svg> Continue learning
            </button>
          </div>
        </div>
      </div>

      <!-- list courses -->
      <div style="padding:16px 20px 0;display:flex;flex-direction:column;gap:12px" class="stg">
        <div style="display:flex;gap:12px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:12px">
          <div style="width:64px;height:64px;border-radius:14px;background:var(--grad-teal);flex:none;display:grid;place-items:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#062" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:start"><div style="font-family:var(--font);font-weight:600;font-size:.95rem">Patañjali Yoga Sūtras</div><span class="tier t1" style="flex:none">T1</span></div>
            <div style="color:var(--lo);font-size:.76rem;margin-top:2px">Eight limbs · 25 videos · Yogi Krishnan</div>
            <div style="height:5px;background:var(--ink);border-radius:5px;margin-top:8px;overflow:hidden"><div style="width:20%;height:100%;background:var(--teal)"></div></div>
          </div>
        </div>
        <div style="display:flex;gap:12px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:12px">
          <div style="width:64px;height:64px;border-radius:14px;background:var(--grad-violet);flex:none;display:grid;place-items:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="2"><path d="M4 19V5M4 12h10M14 5l6 7-6 7" /></svg></div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:start"><div style="font-family:var(--font);font-weight:600;font-size:.95rem">Binary Before Computers</div><span class="tier t1" style="flex:none">T1</span></div>
            <div style="color:var(--lo);font-size:.76rem;margin-top:2px">Piṅgala's Chandaḥśāstra · 18 videos</div>
            <div style="height:5px;background:var(--ink);border-radius:5px;margin-top:8px;overflow:hidden"><div style="width:0%;height:100%;background:var(--violet)"></div></div>
          </div>
        </div>
        <div style="display:flex;gap:12px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:12px">
          <div style="width:64px;height:64px;border-radius:14px;background:linear-gradient(135deg,#38C172,#2E9E5B);flex:none;display:grid;place-items:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2v8M8 6l4-4 4 4M5 22c0-6 3-10 7-10s7 4 7 10"/></svg></div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:start"><div style="font-family:var(--font);font-weight:600;font-size:.95rem">Charaka Saṃhitā</div><span class="tier t2" style="flex:none">T2</span></div>
            <div style="color:var(--lo);font-size:.76rem;margin-top:2px">Āyurvedic clinical method · 30 videos</div>
            <div style="height:5px;background:var(--ink);border-radius:5px;margin-top:8px;overflow:hidden"><div style="width:0%;height:100%;background:#38C172"></div></div>
          </div>
        </div>
      </div>
      <div style="height:100px"></div>
    </div>
    <div class="nav">
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Home</a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m10 8 5 4-5 4z"/></svg>Shorts</a>
      <a class="fab"><span class="b"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></span></a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="1" y="14" width="5" height="7" rx="2"/><rect x="18" y="14" width="5" height="7" rx="2"/></svg>Audio</a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Nearby</a>
    </div>
  </div></div>
  <div class="screen-label"><b>04</b> · Courses</div>
</div>

<!-- ══════════════════ SCREEN 5 · SKY TODAY (scientific horoscope) ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen" style="background:transparent">
    <div class="scroll">
      <!-- animated stars -->
      <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none">
        <div style="position:absolute;top:60px;left:40px;width:3px;height:3px;border-radius:50%;background:#fff;animation:pulse 3s ease-in-out infinite"></div>
        <div style="position:absolute;top:120px;right:60px;width:2px;height:2px;border-radius:50%;background:var(--teal);animation:pulse 2.4s ease-in-out infinite .5s"></div>
        <div style="position:absolute;top:90px;left:60%;width:2px;height:2px;border-radius:50%;background:#fff;animation:pulse 3.4s ease-in-out infinite 1s"></div>
        <div style="position:absolute;top:200px;left:30px;width:2px;height:2px;border-radius:50%;background:var(--amber);animation:pulse 2.8s ease-in-out infinite .3s"></div>
      </div>
      <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>
      <div style="display:flex;align-items:center;gap:14px;padding:8px 20px 0;position:relative;z-index:3">
        <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></div>
        <div style="font-family:var(--font);font-weight:700;font-size:1.15rem">Sky Today</div>
        <span style="margin-left:auto" class="tier t1">REAL ASTRONOMY</span>
      </div>

      <!-- moon visual -->
      <div style="text-align:center;margin-top:20px;position:relative;z-index:3" class="stg">
        <div style="position:relative;width:150px;height:150px;margin:0 auto">
          <div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 35%,#F4F6FB,#AEB6C9);box-shadow:0 0 60px rgba(255,255,255,.2);animation:bob 5s ease-in-out infinite"></div>
          <div style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(90deg,transparent 63%,rgba(14,18,32,.92) 63%)"></div>
          <!-- craters -->
          <div style="position:absolute;top:40px;left:35px;width:16px;height:16px;border-radius:50%;background:rgba(0,0,0,.08)"></div>
          <div style="position:absolute;top:80px;left:55px;width:10px;height:10px;border-radius:50%;background:rgba(0,0,0,.08)"></div>
        </div>
        <div style="font-family:var(--font);font-weight:700;font-size:1.3rem;margin-top:16px">Waxing Gibbous</div>
        <div style="color:var(--teal);font-family:var(--mono);font-size:.78rem;margin-top:4px">63% ILLUMINATED · SVĀTI NAKṢATRA</div>
      </div>

      <!-- data grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:22px 20px 0;position:relative;z-index:3" class="stg">
        <div style="background:var(--ink-3);border:1px solid var(--stroke);border-radius:18px;padding:16px">
          <div style="color:var(--lo);font-size:.66rem;text-transform:uppercase;letter-spacing:.08em">Tithi</div>
          <div style="font-family:var(--font);font-weight:700;font-size:1.05rem;margin-top:4px">Ekādaśī</div>
          <div style="color:var(--mid);font-size:.72rem">Shukla paksha, 11th</div>
        </div>
        <div style="background:var(--ink-3);border:1px solid var(--stroke);border-radius:18px;padding:16px">
          <div style="color:var(--lo);font-size:.66rem;text-transform:uppercase;letter-spacing:.08em">Visible tonight</div>
          <div style="font-family:var(--font);font-weight:700;font-size:1.05rem;margin-top:4px">Jupiter</div>
          <div style="color:var(--mid);font-size:.72rem">Rising ~21:40 SE</div>
        </div>
        <div style="grid-column:span 2;background:linear-gradient(135deg,var(--teal-dim),transparent);border:1px solid rgba(56,225,196,.25);border-radius:18px;padding:16px;display:flex;align-items:center;gap:14px">
          <div style="width:44px;height:44px;border-radius:50%;background:var(--grad-teal);display:grid;place-items:center;flex:none;animation:spinSlow 20s linear infinite"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#062" stroke-width="2"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4"/></svg></div>
          <div><div style="font-family:var(--font);font-weight:600;font-size:.9rem">Upcoming: Perseid meteor shower</div><div style="color:var(--mid);font-size:.74rem;margin-top:2px">Peak Aug 12 · up to 60/hr · look NE after midnight</div></div>
        </div>
      </div>

      <!-- reframe note -->
      <div style="margin:20px 20px 0;background:var(--ink-2);border:1px solid var(--stroke);border-radius:16px;padding:16px;position:relative;z-index:3" class="stg">
        <div style="font-family:var(--font);font-weight:600;font-size:.9rem;margin-bottom:6px">Why we show the real sky 🔭</div>
        <div style="color:var(--mid);font-size:.8rem;line-height:1.55">We don't predict your future — no one can. Instead we show what's actually happening above you, and a thought to reflect on. Jyotiṣa was, at its root, precise observational astronomy.</div>
      </div>
      <div style="height:90px"></div>
    </div>
  </div></div>
  <div class="screen-label"><b>05</b> · Sky Today</div>
</div>

<!-- ══════════════════ SCREEN 6 · SHORTS (vertical feed) ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen" style="background:transparent">
    <!-- full-bleed short -->
    <div style="position:absolute;inset:0;background:linear-gradient(160deg,#243352,#0c1122)">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,rgba(255,138,61,.15),transparent 60%)"></div>
      <!-- animated equalizer to imply video -->
      <div style="position:absolute;top:44%;left:50%;transform:translate(-50%,-50%);display:flex;gap:5px;align-items:flex-end;height:60px">
        <div style="width:6px;height:40px;background:var(--saffron);border-radius:3px;transform-origin:bottom;animation:wave .6s ease-in-out infinite alternate"></div>
        <div style="width:6px;height:58px;background:var(--amber);border-radius:3px;transform-origin:bottom;animation:wave .5s ease-in-out infinite alternate .1s"></div>
        <div style="width:6px;height:30px;background:var(--teal);border-radius:3px;transform-origin:bottom;animation:wave .7s ease-in-out infinite alternate .2s"></div>
        <div style="width:6px;height:50px;background:var(--saffron-2);border-radius:3px;transform-origin:bottom;animation:wave .55s ease-in-out infinite alternate .15s"></div>
        <div style="width:6px;height:36px;background:var(--rose);border-radius:3px;transform-origin:bottom;animation:wave .65s ease-in-out infinite alternate .05s"></div>
      </div>
    </div>
    <div class="status" style="color:#fff"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>

    <!-- top tabs -->
    <div style="position:absolute;top:52px;left:0;right:0;display:flex;justify-content:center;gap:20px;z-index:5">
      <span style="color:rgba(255,255,255,.5);font-weight:600;font-size:.9rem">Following</span>
      <span style="color:#fff;font-weight:700;font-size:.9rem;position:relative">For You<div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:20px;height:3px;background:var(--saffron);border-radius:3px"></div></span>
    </div>

    <!-- right action rail -->
    <div style="position:absolute;right:14px;bottom:130px;display:flex;flex-direction:column;gap:22px;align-items:center;z-index:5">
      <div style="text-align:center;color:#fff"><div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);display:grid;place-items:center;margin-bottom:4px"><svg viewBox="0 0 24 24" width="24" height="24" fill="var(--rose)" stroke="var(--rose)"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.3 4 2.5.8-1.2 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg></div><span style="font-size:.66rem;font-weight:600">12.4k</span></div>
      <div style="text-align:center;color:#fff"><div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);display:grid;place-items:center;margin-bottom:4px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><span style="font-size:.66rem;font-weight:600">308</span></div>
      <div style="text-align:center;color:#fff"><div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);display:grid;place-items:center;margin-bottom:4px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v14"/></svg></div><span style="font-size:.66rem;font-weight:600">Share</span></div>
      <div style="width:44px;height:44px;border-radius:14px;background:var(--grad-saffron);display:grid;place-items:center;animation:spinSlow 8s linear infinite"><svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><circle cx="12" cy="12" r="4"/></svg></div>
    </div>

    <!-- bottom caption -->
    <div style="position:absolute;left:0;right:64px;bottom:96px;padding:0 18px;z-index:5">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="width:34px;height:34px;border-radius:50%;background:var(--grad-teal)"></div>
        <span style="color:#fff;font-weight:700;font-size:.86rem">@vedicscience</span>
        <span style="border:1px solid rgba(255,255,255,.5);color:#fff;font-size:.64rem;font-weight:600;padding:3px 10px;border-radius:16px">Follow</span>
      </div>
      <div style="color:#fff;font-family:var(--font);font-weight:600;font-size:.95rem;line-height:1.4">Did the Kerala school invent calculus 250 years before Newton? 🤯</div>
      <div style="color:rgba(255,255,255,.7);font-size:.78rem;margin-top:4px">Mādhava's infinite series · Tantrasaṅgraha 1501</div>
      <div style="display:inline-flex;align-items:center;gap:6px;margin-top:8px;font-family:var(--mono);font-size:.6rem;color:var(--teal);background:rgba(56,225,196,.15);padding:3px 9px;border-radius:8px">✓ T1 VERIFIED · TAP FOR SOURCE</div>
    </div>

    <div class="nav">
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Home</a>
      <a class="on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m10 8 5 4-5 4z"/></svg>Shorts</a>
      <a class="fab"><span class="b"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></span></a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="1" y="14" width="5" height="7" rx="2"/><rect x="18" y="14" width="5" height="7" rx="2"/></svg>Audio</a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Nearby</a>
    </div>
  </div></div>
  <div class="screen-label"><b>06</b> · Shorts feed</div>
</div>

<!-- ══════════════════ SCREEN 7 · NEARBY (hotspot locator) ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen">
    <div class="scroll">
      <!-- faux map -->
      <div style="height:300px;background:linear-gradient(135deg,var(--map-a),var(--map-b));position:relative;overflow:hidden">
        <!-- grid lines -->
        <svg viewBox="0 0 340 300" style="position:absolute;inset:0;opacity:.3">
          <g stroke="rgba(56,225,196,.2)" stroke-width="1">
            <path d="M0 60 H340 M0 130 H340 M0 200 H340 M0 270 H340"/>
            <path d="M60 0 V300 M140 0 V300 M220 0 V300 M300 0 V300"/>
          </g>
          <path d="M20 280 Q120 200 200 240 T340 180" stroke="rgba(255,138,61,.4)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
        </svg>
        <div class="status" style="position:relative;z-index:3"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>
        <div style="display:flex;align-items:center;gap:14px;padding:8px 20px 0;position:relative;z-index:3">
          <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></div>
          <div style="font-family:var(--font);font-weight:700;font-size:1.15rem">Near You</div>
        </div>
        <!-- pins -->
        <div style="position:absolute;top:130px;left:90px;z-index:2">
          <div style="width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--grad-saffron);display:grid;place-items:center;box-shadow:0 6px 16px rgba(255,138,61,.5)"><svg viewBox="0 0 24 24" width="16" height="16" fill="#fff" style="transform:rotate(45deg)"><path d="M12 2 3 9v12h6v-6h6v6h6V9z"/></svg></div>
          <div style="position:absolute;inset:0;border-radius:50%;border:2px solid var(--saffron);animation:ring 2s ease-out infinite"></div>
        </div>
        <div style="position:absolute;top:190px;left:210px;z-index:2">
          <div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--grad-teal);display:grid;place-items:center;box-shadow:0 6px 16px rgba(56,225,196,.4)"><svg viewBox="0 0 24 24" width="14" height="14" fill="#062" style="transform:rotate(45deg)"><path d="M12 2 3 9v12h6v-6h6v6h6V9z"/></svg></div>
        </div>
        <!-- you are here -->
        <div style="position:absolute;top:100px;left:180px;z-index:2">
          <div style="width:18px;height:18px;border-radius:50%;background:var(--teal);border:3px solid #fff;box-shadow:0 0 0 4px rgba(56,225,196,.3)"></div>
          <div style="position:absolute;inset:-8px;border-radius:50%;border:2px solid var(--teal);animation:ring 2s ease-out infinite"></div>
        </div>
      </div>

      <!-- bottom sheet -->
      <div style="margin-top:-24px;background:var(--ink);border-radius:26px 26px 0 0;padding:8px 20px 0;position:relative;z-index:4">
        <div style="width:40px;height:4px;border-radius:3px;background:var(--ink-4);margin:6px auto 16px"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div style="font-family:var(--font);font-weight:700;font-size:1.1rem">Cultural hotspots</div>
          <span style="font-family:var(--mono);font-size:.66rem;color:var(--teal);background:var(--teal-dim);padding:4px 10px;border-radius:10px">10 NEARBY</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px" class="stg">
          <div style="display:flex;gap:12px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:12px;align-items:center">
            <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--map-a),var(--map-b));flex:none;display:grid;place-items:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--saffron)" stroke-width="1.6"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg></div>
            <div style="flex:1;min-width:0">
              <div style="font-family:var(--font);font-weight:600;font-size:.95rem">Khajuraho Temples</div>
              <div style="color:var(--lo);font-size:.76rem;margin-top:2px">UNESCO site · sacred geometry</div>
              <div style="display:flex;gap:10px;margin-top:6px;font-size:.7rem"><span style="color:var(--saffron);font-weight:600">◉ 2.4 km</span><span style="color:var(--mid)">⭐ 4.9</span></div>
            </div>
            <div class="iconbtn"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>
          </div>
          <div style="display:flex;gap:12px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:12px;align-items:center">
            <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--teal-dim),var(--ink-3));flex:none;display:grid;place-items:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--teal)" stroke-width="1.6"><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/></svg></div>
            <div style="flex:1;min-width:0">
              <div style="font-family:var(--font);font-weight:600;font-size:.95rem">Heritage Museum</div>
              <div style="color:var(--lo);font-size:.76rem;margin-top:2px">Manuscripts · astronomy instruments</div>
              <div style="display:flex;gap:10px;margin-top:6px;font-size:.7rem"><span style="color:var(--teal);font-weight:600">◉ 5.1 km</span><span style="color:var(--mid)">⭐ 4.7</span></div>
            </div>
            <div class="iconbtn"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>
          </div>
        </div>
        <div style="height:100px"></div>
      </div>
    </div>
    <div class="nav">
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Home</a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m10 8 5 4-5 4z"/></svg>Shorts</a>
      <a class="fab"><span class="b"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></span></a>
      <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="1" y="14" width="5" height="7" rx="2"/><rect x="18" y="14" width="5" height="7" rx="2"/></svg>Audio</a>
      <a class="on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Nearby</a>
    </div>
  </div></div>
  <div class="screen-label"><b>07</b> · Nearby locator</div>
</div>

<!-- ══════════════════ SCREEN 8 · VIDEO CALL + reader ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen" style="background:transparent">
    <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>
    <div style="display:flex;align-items:center;gap:14px;padding:8px 20px 12px">
      <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></div>
      <div><div style="font-family:var(--font);font-weight:700;font-size:1.05rem">Family Aarti</div><div style="font-size:.72rem;color:var(--teal)">● LIVE · 4 joined</div></div>
      <span style="margin-left:auto;font-family:var(--mono);font-size:.7rem;color:var(--mid);background:var(--ink-3);padding:5px 10px;border-radius:10px">12:04</span>
    </div>

    <!-- video grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 16px">
      <div style="aspect-ratio:3/4;border-radius:18px;background:linear-gradient(135deg,var(--map-a),var(--map-b));position:relative;overflow:hidden;border:2px solid var(--saffron)">
        <div style="position:absolute;bottom:8px;left:8px;font-size:.68rem;color:#fff;background:rgba(0,0,0,.4);padding:3px 8px;border-radius:8px">You</div>
        <div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;background:rgba(0,0,0,.4);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/></svg></div>
      </div>
      <div style="aspect-ratio:3/4;border-radius:18px;background:linear-gradient(135deg,var(--violet-dim),var(--ink-3));position:relative;overflow:hidden">
        <div style="position:absolute;bottom:8px;left:8px;font-size:.68rem;color:#fff;background:rgba(0,0,0,.4);padding:3px 8px;border-radius:8px">Maa 🙏</div>
      </div>
      <div style="aspect-ratio:3/4;border-radius:18px;background:linear-gradient(135deg,var(--teal-dim),var(--ink-3));position:relative;overflow:hidden">
        <div style="position:absolute;bottom:8px;left:8px;font-size:.68rem;color:#fff;background:rgba(0,0,0,.4);padding:3px 8px;border-radius:8px">Dada</div>
      </div>
      <div style="aspect-ratio:3/4;border-radius:18px;background:linear-gradient(135deg,var(--rose-dim),var(--ink-3));position:relative;overflow:hidden">
        <div style="position:absolute;bottom:8px;left:8px;font-size:.68rem;color:#fff;background:rgba(0,0,0,.4);padding:3px 8px;border-radius:8px">Didi</div>
      </div>
    </div>

    <!-- synced reader -->
    <div style="margin:14px 16px 0;background:linear-gradient(135deg,var(--ink-3),var(--ink-2));border:1px solid var(--stroke);border-radius:20px;padding:16px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--saffron),transparent);animation:shimmer 2s linear infinite;background-size:200% 100%"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span style="font-family:var(--mono);font-size:.62rem;color:var(--saffron);letter-spacing:.08em">🎵 SYNCED READER · OM JAI JAGDISH</span>
        <span class="tier t1" style="flex:none">AI SYNC</span>
      </div>
      <div style="text-align:center;line-height:1.8">
        <div style="color:var(--lo);font-size:.82rem">जो ध्यावे फल पावे</div>
        <div style="font-family:var(--font);font-weight:700;font-size:1.15rem;color:var(--saffron);margin:2px 0">दुख बिनसे मन का ॥</div>
        <div style="color:var(--lo);font-size:.82rem">स्वामी दुख बिनसे मन का</div>
      </div>
      <!-- karaoke progress -->
      <div style="height:4px;background:var(--ink);border-radius:4px;margin-top:12px;overflow:hidden"><div style="width:55%;height:100%;background:var(--grad-saffron)"></div></div>
    </div>

    <!-- controls -->
    <div style="position:absolute;bottom:22px;left:0;right:0;display:flex;justify-content:center;gap:16px;z-index:5">
      <div style="width:52px;height:52px;border-radius:50%;background:var(--ink-3);border:1px solid var(--stroke);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></div>
      <div style="width:52px;height:52px;border-radius:50%;background:var(--ink-3);border:1px solid var(--stroke);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2"><rect x="2" y="7" width="15" height="10" rx="2"/><path d="m17 9 5-2v10l-5-2"/></svg></div>
      <div style="width:62px;height:62px;border-radius:50%;background:var(--grad-rose);display:grid;place-items:center;box-shadow:0 10px 26px rgba(255,77,109,.5)"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="2"><path d="M16 8 8 16M8 8l8 8"/></svg></div>
      <div style="width:52px;height:52px;border-radius:50%;background:var(--ink-3);border:1px solid var(--stroke);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v14"/></svg></div>
    </div>
  </div></div>
  <div class="screen-label"><b>08</b> · Group call + reader</div>
</div>

<!-- ══════════════════ SCREEN 9 · PROFILE ══════════════════ -->
<div class="phone-wrap">
  <div class="phone"><div class="screen">
    <div class="scroll">
      <div style="background:var(--grad-hero);padding-bottom:60px;position:relative;overflow:hidden">
        <div style="position:absolute;top:-30px;right:-20px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(139,124,246,.25),transparent 70%);animation:bob 6s ease-in-out infinite"></div>
        <div class="status"><span>23:19</span><span class="r">📶 <span class="bat">92</span></span></div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 20px 0">
          <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></div>
          <div class="iconbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2 2 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></div>
        </div>
        <div style="text-align:center;margin-top:14px" class="stg">
          <div style="width:88px;height:88px;border-radius:28px;background:var(--grad-violet);margin:0 auto;display:grid;place-items:center;box-shadow:0 14px 34px rgba(139,124,246,.5);animation:bob 4s ease-in-out infinite"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></div>
          <div style="font-family:var(--font);font-weight:700;font-size:1.4rem;margin-top:12px">Kovid Sharma</div>
          <div style="color:var(--mid);font-size:.82rem">Explorer · Level 4</div>
        </div>
      </div>

      <!-- stat cards -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 20px;margin-top:-40px;position:relative;z-index:3" class="stg">
        <div style="background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:16px 8px;text-align:center">
          <div style="width:36px;height:36px;border-radius:12px;background:rgba(255,138,61,.15);display:grid;place-items:center;margin:0 auto 8px"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--saffron)" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></div>
          <div style="font-family:var(--font);font-weight:800;font-size:1.5rem" class="mono">47</div>
          <div style="font-size:.62rem;color:var(--lo);text-transform:uppercase;letter-spacing:.06em">Chants</div>
        </div>
        <div style="background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:16px 8px;text-align:center">
          <div style="width:36px;height:36px;border-radius:12px;background:rgba(139,124,246,.15);display:grid;place-items:center;margin:0 auto 8px"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--violet)" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5z"/></svg></div>
          <div style="font-family:var(--font);font-weight:800;font-size:1.5rem" class="mono">8</div>
          <div style="font-size:.62rem;color:var(--lo);text-transform:uppercase;letter-spacing:.06em">Courses</div>
        </div>
        <div style="background:var(--ink-2);border:1px solid var(--stroke);border-radius:18px;padding:16px 8px;text-align:center">
          <div style="width:36px;height:36px;border-radius:12px;background:rgba(56,225,196,.15);display:grid;place-items:center;margin:0 auto 8px"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></div>
          <div style="font-family:var(--font);font-weight:800;font-size:1.5rem" class="mono">15</div>
          <div style="font-size:.62rem;color:var(--lo);text-transform:uppercase;letter-spacing:.06em">Places</div>
        </div>
      </div>

      <!-- streak banner -->
      <div style="margin:16px 20px 0;background:linear-gradient(135deg,var(--saffron),var(--rose));border-radius:20px;padding:16px;display:flex;align-items:center;gap:14px;position:relative;overflow:hidden" class="stg">
        <div style="position:absolute;right:-10px;bottom:-10px;font-size:4rem;opacity:.2">🔥</div>
        <div style="font-size:2rem">🔥</div>
        <div style="color:#fff"><div style="font-family:var(--font);font-weight:700;font-size:1.1rem">12-day streak!</div><div style="font-size:.78rem;opacity:.9">Your longest yet. Keep it calm, not compulsive.</div></div>
      </div>

      <!-- settings list -->
      <div style="padding:16px 20px 0;display:flex;flex-direction:column;gap:2px" class="stg">
        <div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:14px 14px 4px 4px">
          <div style="width:34px;height:34px;border-radius:10px;background:var(--teal-dim);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--teal)" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg></div>
          <div style="flex:1"><div style="font-size:.88rem;font-weight:600">Language</div><div style="font-size:.72rem;color:var(--lo)">English (US) · 12 available</div></div>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--lo)" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:4px">
          <div style="width:34px;height:34px;border-radius:10px;background:rgba(255,138,61,.15);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--saffron)" stroke-width="2"><path d="M12 3a9 9 0 1 0 9 9c-4 0-6-2-6-6 0-1 .3-2 1-3z"/></svg></div>
          <div style="flex:1"><div style="font-size:.88rem;font-weight:600">Dark mode</div><div style="font-size:.72rem;color:var(--lo)">Always on</div></div>
          <div style="width:44px;height:26px;border-radius:20px;background:var(--grad-saffron);position:relative"><div style="position:absolute;right:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#fff"></div></div>
        </div>
        <div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--ink-2);border:1px solid var(--stroke);border-radius:4px 4px 14px 14px">
          <div style="width:34px;height:34px;border-radius:10px;background:rgba(139,124,246,.15);display:grid;place-items:center"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--violet)" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/></svg></div>
          <div style="flex:1"><div style="font-size:.88rem;font-weight:600">Daily reminders</div><div style="font-size:.72rem;color:var(--lo)">Quote · water · yoga</div></div>
          <div style="width:44px;height:26px;border-radius:20px;background:var(--grad-saffron);position:relative"><div style="position:absolute;right:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#fff"></div></div>
        </div>
      </div>
      <div style="height:60px"></div>
    </div>
  </div></div>
  <div class="screen-label"><b>09</b> · Profile</div>
</div>


</div>`;

    return (
        <section id="showcase" className="overflow-hidden relative py-20 mt-12" data-theme={theme} style={{ background: "transparent" }}>
            <div className="container mx-auto px-4 md:px-8 lg:px-12 mb-8 flex flex-col items-start justify-center" style={{ paddingLeft: '1rem' }}>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight tracking-tight text-left" style={{ marginLeft: '-0.5rem' }}>
                    Explore Prarthana
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl text-left leading-relaxed mt-4" style={{ marginLeft: '-0.5rem' }}>
                    Explore all screens of the Prarthana App. Scroll horizontally to see the entire gallery.
                </p>
            </div>

            <div className="w-full flex justify-center mb-2">
                <p style={{
                    fontSize: 14, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.15em', color: '#FF6B35', textAlign: 'center',
                    background: 'rgba(255, 107, 53, 0.1)', padding: '6px 16px', borderRadius: '20px'
                }}>
                    App Preview
                </p>
            </div>
            
            <div className="gallery-wrapper" ref={galleryRef} style={{ padding: '4px 16px 0px 16px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', scrollBehavior: 'smooth' }}>
                <div 
                    className="gallery" 
                    style={{ display: 'flex', gap: '34px', flexWrap: 'nowrap', alignItems: 'flex-start', minWidth: 'max-content' }}
                    dangerouslySetInnerHTML={{ __html: rawHTML }} 
                />
            </div>
            
            <div className="mobile-nav-buttons">
                <button onClick={() => scrollGallery('backward')} className="orange-nav-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={() => scrollGallery('forward')} className="orange-nav-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>

        </section>
    );
};

export default AppShowcase;
