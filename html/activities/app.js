
const ROUTES = [{"playPath": "#/play/add-subtract-fractions-hub-pizza-and-chocolate-models", "source": "pages/Add-Subtract-Fractions-Hub-Pizza-and-Chocolate-Models.html", "title": "Add Subtract Fractions Hub Pizza And Chocolate Models", "category": "Fractions", "slug": "add-subtract-fractions-hub-pizza-and-chocolate-models", "catSlug": "fractions"}, {"playPath": "#/play/construction-site-perimeter-and-area-builder", "source": "pages/Construction-Site-Perimeter-and-Area-Builder.html", "title": "Construction Site Perimeter And Area Builder", "category": "Measurement", "slug": "construction-site-perimeter-and-area-builder", "catSlug": "measurement"}, {"playPath": "#/play/decimals-discovery-pack-scuba-dive-theme", "source": "pages/Decimals-Discovery-Pack-Scuba-Dive-Theme.html", "title": "Decimals Discovery Pack Scuba Dive Theme", "category": "Decimals", "slug": "decimals-discovery-pack-scuba-dive-theme", "catSlug": "decimals"}, {"playPath": "#/play/desert-trail-rounding-quest-for-grade-4", "source": "pages/Desert-Trail-Rounding-Quest-for-Grade-4.html", "title": "Desert Trail Rounding Quest For Grade 4", "category": "Number & Operations", "slug": "desert-trail-rounding-quest-for-grade-4", "catSlug": "number-operations"}, {"playPath": "#/play/division-expedition-exploring-quotients-and-remainders", "source": "pages/Division-Expedition-Exploring-Quotients-and-Remainders.html", "title": "Division Expedition Exploring Quotients And Remainders", "category": "Division", "slug": "division-expedition-exploring-quotients-and-remainders", "catSlug": "division"}, {"playPath": "#/play/geometry-gallery-walk-exploring-lines-angles-and-symmetry", "source": "pages/Geometry-Gallery-Walk-Exploring-Lines-Angles-and-Symmetry.html", "title": "Geometry Gallery Walk Exploring Lines Angles And Symmetry", "category": "Geometry", "slug": "geometry-gallery-walk-exploring-lines-angles-and-symmetry", "catSlug": "geometry"}, {"playPath": "#/play/grade-4-multiplication-strategies-studio", "source": "pages/Grade-4-Multiplication-Strategies-Studio.html", "title": "Grade 4 Multiplication Strategies Studio", "category": "Multiplication", "slug": "grade-4-multiplication-strategies-studio", "catSlug": "multiplication"}, {"playPath": "#/play/interactive-equivalent-fractions", "source": "pages/Interactive-Equivalent-Fractions.html", "title": "Interactive Equivalent Fractions", "category": "Fractions", "slug": "interactive-equivalent-fractions", "catSlug": "fractions"}, {"playPath": "#/play/math-patterns-workshop-factors-multiples-prime-numbers", "source": "pages/Math-Patterns-Workshop-Factors-Multiples-Prime-Numbers.html", "title": "Math Patterns Workshop Factors Multiples Prime Numbers", "category": "Number & Operations", "slug": "math-patterns-workshop-factors-multiples-prime-numbers", "catSlug": "number-operations"}, {"playPath": "#/play/mini-course-on-multiplying-fractions-with-visuals", "source": "pages/Mini-Course-on-Multiplying-Fractions-with-Visuals.html", "title": "Mini Course On Multiplying Fractions With Visuals", "category": "Fractions", "slug": "mini-course-on-multiplying-fractions-with-visuals", "catSlug": "fractions"}, {"playPath": "#/play/mini-market-math-problem-solving-deck", "source": "pages/Mini-Market-Math-Problem-Solving-Deck.html", "title": "Mini Market Math Problem Solving Deck", "category": "Other", "slug": "mini-market-math-problem-solving-deck", "catSlug": "other"}, {"playPath": "#/play/mixed-number-makeover-activity-design", "source": "pages/Mixed-Number-Makeover-Activity-Design.html", "title": "Mixed Number Makeover Activity Design", "category": "Fractions", "slug": "mixed-number-makeover-activity-design", "catSlug": "fractions"}, {"playPath": "#/play/multiplication-as-comparison", "source": "pages/Multiplication-as-Comparison.html", "title": "Multiplication As Comparison", "category": "Multiplication", "slug": "multiplication-as-comparison", "catSlug": "multiplication"}, {"playPath": "#/play/units-and-conversions-arcade-game-design", "source": "pages/Units-and-Conversions-Arcade-Game-Design.html", "title": "Units And Conversions Arcade Game Design", "category": "Measurement", "slug": "units-and-conversions-arcade-game-design", "catSlug": "measurement"}, {"playPath": "#/play/place-value-canva-code-game", "source": "pages/place-value-canva-code-game.html", "title": "Place Value Canva Code Game", "category": "Number & Operations", "slug": "place-value-canva-code-game", "catSlug": "number-operations"}];
const ICONS = {"Fractions": "🍰", "Decimals": "💰", "Multiplication": "✖️", "Division": "➗", "Geometry": "📐", "Measurement": "📏", "Number & Operations": "🔢", "Other": "🧩"};

const qs=(s,e=document)=>e.querySelector(s), qsa=(s,e=document)=>Array.from(e.querySelectorAll(s));
const slugify=s=>(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const setThemeMode=m=>{document.body.classList.toggle('light', m==='light'); localStorage.setItem('theme', m);};
const getThemeMode=()=>localStorage.getItem('theme')||'dark';
const setThemeClass=cat=>{
  const slug=(cat||'Other').toLowerCase().replace(/[^a-z0-9]+/g,'-');
  document.body.className = document.body.className
    .split(' ')
    .filter(c=>!c.startsWith('theme-'))
    .join(' ');
  document.body.classList.add('theme-' + (slug||'other'));
};

const CAT_NAMES=[...new Set(ROUTES.map(r=>r.category))].sort((a,b)=>a.localeCompare(b));
const CAT_SLUGS=Object.fromEntries(CAT_NAMES.map(c=>[slugify(c), c]));

function buildTopNav(){
  const nav=qs('#topNav'); if(!nav) return;
  nav.innerHTML = CAT_NAMES.map(c=>`<a class="btn" href="#/${slugify(c)}/">${c}</a>`).join('');
}

function buildSidebar(){
  const aside=qs('aside'); if(!aside) return;
  aside.innerHTML='';
  const home=document.createElement('a'); home.className='link'; home.href='#/home'; home.innerHTML='🏠 <span>Home</span>'; aside.appendChild(home);
  const byCat={}; ROUTES.forEach(r=> (byCat[r.category] ||= []).push(r));
  Object.keys(byCat).sort((a,b)=>a.localeCompare(b)).forEach(cat=>{
    const sec=document.createElement('div'); sec.className='section'; sec.textContent=(ICONS[cat]||'🧩')+' '+cat; aside.appendChild(sec);
    byCat[cat].sort((a,b)=>a.title.localeCompare(b.title)).forEach(r=>{
      const a=document.createElement('a'); a.href=r.playPath; a.className='link';
      a.innerHTML=`<span class="badge">${ICONS[r.category]||'🧩'}</span> <span>${r.title}</span>`;
      aside.appendChild(a);
    });
  });
}

function HOME(){
  setThemeClass('Other');
  const byCat={}; ROUTES.forEach(r=> (byCat[r.category] ||= []).push(r));
  let html=`<div class="card pop-in"><h1 class="wobble">🎉 Grade 4 Math Hub</h1><p class="small">Choose a category or use search.</p></div>`;
  Object.keys(byCat).sort((a,b)=>a.localeCompare(b)).forEach(cat=>{
    const items=byCat[cat].sort((a,b)=>a.title.localeCompare(b.title));
    html+=`<h2>${ICONS[cat]||'🧩'} ${cat}</h2>`;
    html+=`<div class="grid-tiles">` + items.slice(0,12).map(r=>`<a class="tile bouncy" href="${r.playPath}"><div class="badge">${ICONS[r.category]||'🧩'}</div><div class="t">${r.title}</div><div class="small">${r.category}</div></a>`).join('') + `</div>`;
  });
  const c=qs('#content'); c.innerHTML=html;
  document.title='Home • Grade 4 Math Hub'; try{ confettiBurst(); }catch(e){}
}

function CATEGORY(catSlug){
  const catName = CAT_SLUGS[catSlug];
  if(!catName){ ERROR('Category not found.', '404'); return; }
  setThemeClass(catName);
  const list = ROUTES.filter(r=> r.catSlug===catSlug).sort((a,b)=>a.title.localeCompare(b.title));
  let html = `<div class="card pop-in"><h1>${catName}</h1><div class="small">Choose a lesson:</div><hr/>`;
  html += `<div class="grid-tiles">` + list.map(r=>`<a class="tile" href="${r.playPath}"><div class="badge">${ICONS[r.category]||'🧩'}</div><div class="t">${r.title}</div><div class="small">${r.category}</div></a>`).join('') + `</div></div>`;
  const c=qs('#content'); c.innerHTML=html;
  document.title = catName + ' • Grade 4 Math Hub';
}

function PLAY(slug){
  const r = ROUTES.find(x=>x.slug===slug);
  if(!r){ ERROR('Page not found.','404'); return; }
  setThemeClass(r.category);
  const c=qs('#content'); c.innerHTML='';
  const wrap=document.createElement('div'); wrap.className='card';
  wrap.innerHTML=`<div class="breadcrumbs"><a href="#/home">Home</a> / <a href="#/${r.catSlug}/">${r.category}</a> / <span>${r.title}</span></div>` +
                 `<h1 class="floaty" style="cursor:pointer" title="Full screen">${r.title} <span id="fsIcon" class="small" style="margin-left:8px">[Full screen]</span></h1>` +
                 `<div class="small">${r.category}</div><hr/>`;
  const frame=document.createElement('iframe'); frame.className='viewer'; frame.src=r.source;
  frame.onload=()=>{ document.title=r.title+' • Grade 4 Math Hub'; };
  wrap.appendChild(frame); c.appendChild(wrap);
  const goFull=()=>{ document.body.classList.add('focus-mode'); try{ frame.requestFullscreen(); }catch(e){} };
  wrap.querySelector('h1').onclick=goFull; wrap.querySelector('#fsIcon').onclick=(e)=>{ e.stopPropagation(); goFull(); };
}

function ERROR(msg, title='Error'){
  const c=qs('#content'); c.innerHTML = `<div class="card"><h1>${title}</h1><p>${msg}</p></div>`;
  document.title = title + ' • Grade 4 Math Hub';
}

function route(){ closeSearch && closeSearch();
  const h=location.hash||'#/home';
  const catMatch = h.match(/^#\/([a-z0-9\-]+)\/?$/);
  const playMatch = h.match(/^#\/play\/([a-z0-9\-]+)$/);
  if(h==='#/home') return HOME();
  if(catMatch) return CATEGORY(catMatch[1]);
  if(playMatch) return PLAY(playMatch[1]);
  // unknown route
  const bySlug = Object.fromEntries(ROUTES.map(r=>[r.playPath, r]));
  if(bySlug[h]) return PLAY(bySlug[h].slug);
  ERROR('Page not found.','404');
}

function wire(){
  window.addEventListener('hashchange', route);
  qs('#toggleSidebar')?.addEventListener('click', ()=> document.body.classList.toggle('sidebar-collapsed'));
  qs('#toggleTabs')?.addEventListener('click', ()=> document.body.classList.toggle('show-tabs'));
  qs('#toggleTheme')?.addEventListener('click', ()=>{
    const next = getThemeMode()==='light' ? 'dark' : 'light';
    setThemeMode(next); qs('#toggleTheme').textContent = next==='light' ? 'Dark' : 'Light';
  });
  const exitBtn = qs('#exitFocusBtn');
  if(exitBtn){ exitBtn.onclick = ()=>{ document.body.classList.remove('focus-mode'); if(document.fullscreenElement) try{document.exitFullscreen();}catch(e){} }; }
  setThemeMode(getThemeMode());
  qs('#toggleTheme').textContent = getThemeMode()==='light' ? 'Dark' : 'Light';
}


function setKidMode(on){
  document.body.classList.toggle('kid', !!on);
  localStorage.setItem('kid', on ? '1' : '0');
}
function getKidMode(){ return localStorage.getItem('kid') !== '0'; } // default ON


let _confettiOnce = false;
function confettiBurst(){
  if(_confettiOnce) return; _confettiOnce = true;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const resize=()=>{ canvas.width=innerWidth; canvas.height=innerHeight; };
  resize(); window.addEventListener('resize', resize);
  const colors = ['#ff7ab6','#ffd166','#6bd1ff','#9cff6b','#ff9f6b'];
  const pieces = Array.from({length:120}, (_,i)=> ({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height*0.2,
    r: 2+Math.random()*4,
    c: colors[i%colors.length],
    v: 2+Math.random()*3,
    w: (Math.random()*0.04)+0.01
  }));
  let t=0;
  const step=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.y += p.v;
      p.x += Math.sin((t+p.y)*p.w)*1.5;
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    });
    t+=1;
    if(t<220) requestAnimationFrame(step); else canvas.remove();
  };
  requestAnimationFrame(step);
}


// === Search (dropdown) ===
function normalize(s){ return (s||'').toLowerCase(); }
function scoreMatch(q, title, cat){
  // simple scoring: contains -> +2; startsWith -> +3; category hit -> +1
  let s = 0;
  q.split(/\s+/).filter(Boolean).forEach(t=>{
    if(title.startsWith(t)) s += 3;
    if(title.includes(t)) s += 2;
    if(cat.includes(t)) s += 1;
  });
  return s;
}
function openSearch(){ qs('#searchPanel')?.classList.add('open'); }
function closeSearch(){ const p=qs('#searchPanel'); if(p){ p.classList.remove('open'); p.innerHTML=''; } }
function renderSearch(results){
  const panel = qs('#searchPanel'); if(!panel) return;
  if(results.length===0){ panel.innerHTML = '<div class="no-results">No matches</div>'; return; }
  panel.innerHTML = results.map((r,i)=>`
    <div class="search-item" role="option" data-index="${i}" data-href="${r.playPath}">
      <div class="badge">${ICONS[r.category]||'🧩'}</div>
      <div>
        <div class="title">${r.title}</div>
        <div class="meta">${r.category}</div>
      </div>
    </div>
  `).join('');
  panel.querySelectorAll('.search-item').forEach(el=>{
    el.onclick = ()=>{ location.hash = el.getAttribute('data-href'); closeSearch(); };
  });
}
function searchUpdate(){
  const input = qs('#search'); const q = normalize(input.value.trim());
  const panel = qs('#searchPanel'); if(!panel) return;
  if(!q){ closeSearch(); return; }
  const results = ROUTES.map(r=>({ ...r, _score: scoreMatch(q, normalize(r.title), normalize(r.category)) }))
                        .filter(r=> r._score>0)
                        .sort((a,b)=> b._score - a._score || a.title.localeCompare(b.title))
                        .slice(0, 12);
  renderSearch(results); openSearch();
}
function searchKeydown(e){
  const panel = qs('#searchPanel'); if(!panel || !panel.classList.contains('open')) return;
  const items = Array.from(panel.querySelectorAll('.search-item'));
  if(items.length===0) return;
  let idx = items.findIndex(el=> el.classList.contains('active'));
  if(e.key==='ArrowDown'){ e.preventDefault(); idx = (idx+1) % items.length; }
  else if(e.key==='ArrowUp'){ e.preventDefault(); idx = (idx-1+items.length) % items.length; }
  else if(e.key==='Enter'){ e.preventDefault(); (items[idx>=0?idx:0]).click(); return; }
  else if(e.key==='Escape'){ e.preventDefault(); closeSearch(); return; }
  items.forEach(el=> el.classList.remove('active'));
  if(idx>=0) items[idx].classList.add('active');
  items[idx>=0 ? idx : 0].scrollIntoView({ block:'nearest' });
}
function wireSearch(){
  const input = qs('#search'); const panel = qs('#searchPanel');
  if(!input || !panel) return;
  let debounce;
  input.addEventListener('input', ()=>{ clearTimeout(debounce); debounce = setTimeout(searchUpdate, 120); });
  input.addEventListener('keydown', searchKeydown);
  input.addEventListener('focus', ()=>{ if(panel.innerHTML) openSearch(); });
  document.addEventListener('click', (e)=>{
    if(!panel.contains(e.target) && e.target!==input) closeSearch();
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  buildTopNav(); buildSidebar(); wire(); wireSearch();
  // Kid Mode init + toggle
  setKidMode(getKidMode());
  const km = document.getElementById('toggleKidMode');
  if(km){ km.onclick = ()=> setKidMode(!document.body.classList.contains('kid')); }

  if(!location.hash) location.hash = '#/home';
  route();
});
