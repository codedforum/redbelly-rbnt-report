const $ = (s) => document.querySelector(s);
const cache = {};

// ---- inline SVG icons ----
const I = {
  overview:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  report:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  charts:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  explainer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M8 7h8M8 11h6"/></svg>',
  defillama:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
  rwa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg>',
  downloads:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  coin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M9 9h4a2 2 0 0 1 0 4H9m0 0v3m0-7V7"/></svg>',
  gas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="3" width="9" height="18" rx="1.5"/><path d="M13 8h3a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-2-2"/></svg>',
  chain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1"/></svg>',
  tvl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 17l5-5 4 3 8-8M21 7v5M21 7h-5"/></svg>',
};
const HERO_ART = `<svg class="heroart" viewBox="0 0 240 240">
  <g class="ring" stroke="#e23b54" stroke-width="1" fill="none" opacity=".5"><circle cx="120" cy="120" r="92" stroke-dasharray="4 7"/></g>
  <g class="ring2" stroke="#7db0ff" stroke-width="1" fill="none" opacity=".4"><circle cx="120" cy="120" r="68" stroke-dasharray="2 9"/></g>
  <circle cx="120" cy="28" r="5" fill="#16c0c8"/><circle cx="212" cy="120" r="5" fill="#f5a623"/><circle cx="120" cy="212" r="5" fill="#7c6cf2"/><circle cx="28" cy="120" r="5" fill="#7db0ff"/>
  <circle cx="120" cy="120" r="34" fill="rgba(226,59,84,.16)" stroke="#e23b54" stroke-width="1.5"/>
  <text x="120" y="128" text-anchor="middle" font-size="22" font-weight="800" fill="#ff8095" font-family="system-ui">RBNT</text>
  <image href="mascot.png" class="mascot" x="150" y="150" width="86" height="86"/>
</svg>`;

const NAVI = [["overview","Overview"],["report","Utility report"],["charts","Charts"],["explainer","Explainer"],["defillama","DeFiLlama kit"],["rwa","RWA.xyz kit"],["downloads","Downloads"]];
$("#nav").innerHTML = NAVI.map(([s,l],i)=>`<a data-s="${s}" class="${i===0?'active':''}">${I[s]||''}<span>${l}</span></a>`).join("");

async function md(file){ if(!cache[file]) cache[file]=await (await fetch("content/"+file,{cache:"no-cache"})).text(); const h=marked.parse(cache[file]); return window.DOMPurify?DOMPurify.sanitize(h):h; }
function highlight(r){ r.querySelectorAll("pre code").forEach(c=>{try{hljs.highlightElement(c)}catch{}}); }

const HTML_SECTIONS = {
  overview: () => `
    <div class="hero reveal">${HERO_ART}
      <div class="htext"><h1>RBNT · Token Utility and Ecosystem Visibility</h1>
      <p class="lead">How Redbelly Network's native coin works, and the kits to make RBNT and its real-world assets visible on DeFiLlama and RWA.xyz. Every figure is sourced; no price predictions.</p>
      <div class="meta"><span class="chip">Official sources</span><span class="chip">Reproducible charts</span><span class="chip">No speculation</span></div></div>
    </div>
    <div class="stats">
      <div class="stat reveal">${I.coin}<div class="n" data-count="10" data-suffix="B">0</div><div class="l">Fixed RBNT supply</div></div>
      <div class="stat reveal">${I.gas}<div class="n">$0.01</div><div class="l">USD-denominated gas</div></div>
      <div class="stat reveal">${I.chain}<div class="n" data-count="151">0</div><div class="l">Mainnet chain ID</div></div>
      <div class="stat reveal">${I.tvl}<div class="n" data-count="43.6" data-suffix="K" data-pre="$">0</div><div class="l">DeFiLlama TVL (rbn)</div></div>
    </div>
    <div class="section reveal"><h2 class="sech">The deliverables</h2>
    <div class="fcards">
      <div class="fcard" data-go="report"><div class="ic">${I.report}</div><h3>Utility report</h3><p>11 sections: token, allocation, fee model, staking, and the adoption-to-demand thesis.</p><div class="go">Read &rsaquo;</div></div>
      <div class="fcard" data-go="charts"><div class="ic">${I.charts}</div><h3>Charts</h3><p>Allocation, fee distribution, and realized-vs-pipeline, reproducible from cited data.</p><div class="go">View &rsaquo;</div></div>
      <div class="fcard" data-go="explainer"><div class="ic">${I.explainer}</div><h3>Explainer</h3><p>A community-friendly version, under 500 words.</p><div class="go">Read &rsaquo;</div></div>
      <div class="fcard" data-go="defillama"><div class="ic">${I.defillama}</div><h3>DeFiLlama kit</h3><p>Contract registry, API docs, reference adapter, and the chainId-151 fix.</p><div class="go">Open &rsaquo;</div></div>
      <div class="fcard" data-go="rwa"><div class="ic">${I.rwa}</div><h3>RWA.xyz kit</h3><p>Network submission, filled asset templates, and the listing walkthrough.</p><div class="go">Open &rsaquo;</div></div>
      <div class="fcard" data-go="downloads"><div class="ic">${I.downloads}</div><h3>Downloads</h3><p>Every raw deliverable file.</p><div class="go">Get &rsaquo;</div></div>
    </div></div>`,
  charts: () => `
    <div class="hero reveal">${HERO_ART}<div class="htext"><h1>Charts</h1><p class="lead">Generated by build_charts.py from cited CSV data. Click any chart to enlarge.</p></div></div>
    <div class="charts reveal">
      <figure data-zoom="charts/allocation.png"><img src="charts/allocation.png" alt="RBNT allocation"></figure>
      <figure data-zoom="charts/fee-distribution.png"><img src="charts/fee-distribution.png" alt="Fee distribution"></figure>
      <figure data-zoom="charts/adoption.png"><img src="charts/adoption.png" alt="Realized vs pipeline"></figure>
    </div>`,
  downloads: () => `
    <div class="hero reveal">${HERO_ART}<div class="htext"><h1>Downloads</h1><p class="lead">Raw deliverable files.</p></div></div>
    <div class="dl reveal">
      <a class="btn" href="content/report.md" download>Utility report</a><a class="btn" href="content/explainer.md" download>Explainer</a>
      <a class="btn" href="content/defillama.md" download>DeFiLlama kit</a><a class="btn" href="content/rwa.md" download>RWA.xyz kit</a>
      <a class="btn" href="charts/allocation.png" download>Allocation chart</a><a class="btn" href="charts/fee-distribution.png" download>Fee chart</a><a class="btn" href="charts/adoption.png" download>Adoption chart</a>
    </div>`,
};
const MD_SECTIONS = { report:"report.md", explainer:"explainer.md", defillama:"defillama.md", rwa:"rwa.md" };

const io = new IntersectionObserver((es)=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); if(e.target.classList.contains("stat")) countup(e.target); io.unobserve(e.target);} }),{threshold:.15});
function observe(root){ root.querySelectorAll(".reveal").forEach(el=>io.observe(el)); }
function countup(stat){ const el=stat.querySelector("[data-count]"); if(!el)return; const to=parseFloat(el.dataset.count),pre=el.dataset.pre||"",suf=el.dataset.suffix||"",dec=(to%1!==0)?1:0; let s=null; const dur=900;
  function step(t){ if(!s)s=t; const p=Math.min(1,(t-s)/dur); el.textContent=pre+(to*(1-Math.pow(1-p,3))).toFixed(dec)+suf; if(p<1)requestAnimationFrame(step);} requestAnimationFrame(step); }
function staggerReveal(root){ const k=root.querySelectorAll(".md > *"); k.forEach((el,i)=>{ if(i<24){el.style.animation="fadeup .5s both";el.style.animationDelay=(i*0.03)+"s";} }); }

async function show(s){
  const c=$("#content");
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("active",a.dataset.s===s));
  c.classList.remove("swap"); void c.offsetWidth; c.classList.add("swap");
  if(HTML_SECTIONS[s]){ c.innerHTML=`<div class="md">${HTML_SECTIONS[s]()}</div>`; observe(c); }
  else if(MD_SECTIONS[s]){ c.innerHTML=`<div class="md">${await md(MD_SECTIONS[s])}</div>`; highlight(c); staggerReveal(c); }
  location.hash=s; window.scrollTo(0,0); $("#sidebar").classList.remove("open");
}
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>show(a.dataset.s)));
document.addEventListener("click",(e)=>{ const g=e.target.closest("[data-go]"); if(g){show(g.dataset.go);return;} const z=e.target.closest("[data-zoom]"); if(z){$("#modalimg").src=z.dataset.zoom;$("#modal").classList.add("open");} });

const modal=$("#modal");
function closeModal(){ modal.classList.remove("open"); $("#modalimg").src=""; }
$("#modalx").addEventListener("click",closeModal);
modal.addEventListener("click",(e)=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape")closeModal();});
const prog=$("#prog");
window.addEventListener("scroll",()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight)*100)+"%";},{passive:true});
$("#menubtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));

// ---- particle network background ----
(function particles(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv=$("#particles"),x=cv.getContext("2d"); let w,h,pts;
  function size(){ w=cv.width=innerWidth; h=cv.height=innerHeight; pts=Array.from({length:Math.min(70,Math.floor(w/22))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25})); }
  size(); addEventListener("resize",size);
  (function loop(){ x.clearRect(0,0,w,h);
    for(const p of pts){ p.x+=p.vx;p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1; }
    for(let i=0;i<pts.length;i++){ for(let j=i+1;j<pts.length;j++){ const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y); if(d<120){ x.strokeStyle="rgba(226,59,84,"+(0.10*(1-d/120))+")"; x.lineWidth=1; x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke(); } } }
    for(const p of pts){ x.fillStyle="rgba(125,176,255,.5)"; x.beginPath();x.arc(p.x,p.y,1.4,0,7);x.fill(); }
    requestAnimationFrame(loop); })();
})();

const start=(location.hash||"#overview").slice(1);
show(start in {...HTML_SECTIONS,...MD_SECTIONS}?start:"overview");
