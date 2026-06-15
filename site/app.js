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
    <div class="section reveal"><h2 class="sech">Live network metrics · from RPC (chain 151)</h2>
    <div class="stats">
      <div class="stat">${I.coin}<div class="n">10B</div><div class="l">Fixed RBNT supply (whitepaper)</div></div>
      <div class="stat">${I.chain}<div class="n" id="m-chain">…</div><div class="l">Chain ID · eth_chainId</div></div>
      <div class="stat">${I.tvl}<div class="n" id="m-tvl">…</div><div class="l">TVL · DeFi liquidity (reddex)</div></div>
      <div class="stat">${I.rwa}<div class="n" id="m-tvt">…</div><div class="l">TVT · tokenized RWA on-chain</div></div>
    </div>
    <div class="metricnote muted small" id="m-note">Reading live from governors.mainnet.redbelly.network. TVL is DeFi pool liquidity; TVT is tokenized real-world-asset supply (AUDD, Hutly sHUT). These match the report definitions.</div>
    </div>
    <div class="section reveal"><h2 class="sech">Allocation (whitepaper section 5.2)</h2>
    <div class="allocbar">
      <span style="width:37%;background:#FF5050" title="Ecosystem 37%"></span>
      <span style="width:28%;background:#7db0ff" title="Investors 28%"></span>
      <span style="width:20%;background:#16c0c8" title="Reserve 20%"></span>
      <span style="width:10%;background:#f5a623" title="Team 10%"></span>
      <span style="width:3%;background:#7c6cf2" title="Governance DAO 3%"></span>
      <span style="width:2%;background:#8b94a6" title="USYD and CSIRO 2%"></span>
    </div>
    <div class="alloclegend muted small">Ecosystem 37% · Investors 28% · Reserve 20% · Team 10% · Governance DAO 3% · USYD and CSIRO 2%</div>
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
      <a class="btn" href="RBNT-Utility-Report.pdf" download>Report (PDF)</a><a class="btn" href="content/report.md" download>Utility report (md)</a><a class="btn" href="content/explainer.md" download>Explainer</a>
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
  if(HTML_SECTIONS[s]){ c.innerHTML=`<div class="md">${HTML_SECTIONS[s]()}</div>`; observe(c); if(s==="overview") loadLiveMetrics(); }
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


// ---- Live on-chain metrics (raw JSON-RPC, no library) ----
const RPC = "https://governors.mainnet.redbelly.network";
const REDDEX_FACTORY = "0x262E06314Af8f4EEd70dbd8C7EFe2a5De686C142";
const T = { // chain-151 token addresses (lowercased)
  wrbnt: "0x6ed1f491e2d31536d6561f6bdb2adc8f092a6076",
  usdt:  "0x8c4acd74ff4385f3b7911432fa6787aa14406f8b",
  usdce: "0x8201c02d4ab2214471e8c3ad6475c8b0cd9f2d06",
};
const DEC = { [T.wrbnt]:18, [T.usdt]:6, [T.usdce]:6 };
const STABLE = new Set([T.usdt, T.usdce]);
async function rpc(method, params){
  const r = await fetch(RPC,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method,params})});
  const j = await r.json(); if(j.error) throw new Error(j.error.message); return j.result;
}
const call = (to,data)=>rpc("eth_call",[{to,data},"latest"]);
const toInt = (hex)=> (hex && hex!=="0x") ? BigInt(hex) : 0n;
const fromUnits = (v,d)=> Number(v)/Math.pow(10,d);
const addrFromWord = (hex)=> "0x"+hex.slice(-40);
const fmtMoney = (n)=> "$"+n.toLocaleString("en-US",{maximumFractionDigits:0});

async function getTVL(){
  const lenHex = await call(REDDEX_FACTORY,"0x574f2ba3"); // allPairsLength()
  const n = Number(toInt(lenHex));
  const pairs = [];
  for(let i=0;i<n;i++){
    const idx = i.toString(16).padStart(64,"0");
    const a = await call(REDDEX_FACTORY,"0x1e3dd18b"+idx); // allPairs(uint256)
    pairs.push(addrFromWord(a));
  }
  let usdNum=0, wrbntDen=0, stableUsd=0, wrbntLocked=0;
  for(const p of pairs){
    const t0 = addrFromWord(await call(p,"0x0dfe1681")).toLowerCase(); // token0()
    const t1 = addrFromWord(await call(p,"0xd21220a7")).toLowerCase(); // token1()
    const res = await call(p,"0x0902f1ac"); // getReserves() -> 3 words
    const r0 = toInt("0x"+res.slice(2,66)), r1 = toInt("0x"+res.slice(66,130));
    const a0 = fromUnits(r0, DEC[t0]??18), a1 = fromUnits(r1, DEC[t1]??18);
    if(STABLE.has(t0)) stableUsd+=a0; if(STABLE.has(t1)) stableUsd+=a1;
    if(t0===T.wrbnt) wrbntLocked+=a0; if(t1===T.wrbnt) wrbntLocked+=a1;
    if(t0===T.wrbnt && STABLE.has(t1) && a0>0){ usdNum+=a1; wrbntDen+=a0; }
    if(t1===T.wrbnt && STABLE.has(t0) && a1>0){ usdNum+=a0; wrbntDen+=a1; }
  }
  const rbntUsd = wrbntDen>0 ? usdNum/wrbntDen : 0;
  return stableUsd + wrbntLocked*rbntUsd;
}
async function totalSupply(addr,dec){ return fromUnits(toInt(await call(addr,"0x18160ddd")), dec); }

async function loadLiveMetrics(){
  const set=(id,v)=>{const e=document.getElementById(id); if(e) e.textContent=v;};
  try{
    const cid = await rpc("eth_chainId",[]);
    set("m-chain", String(parseInt(cid,16)));
  }catch{ set("m-chain","n/a"); }
  try{
    const tvl = await getTVL();
    set("m-tvl", fmtMoney(tvl));
  }catch{ set("m-tvl","n/a"); }
  try{
    const audd = await totalSupply("0x54a210e824B0F89dA988E4B5586440aB354f0e46",6); // AUDD
    const shut = await totalSupply("0x93239eBEe8c0a43F77453B1bBD9803a9F947Ea84",2); // sHUT
    // TVT headline: AUD-pegged stablecoin value (1 AUDD = 1 AUD) shown in AUD; sHUT shown separately in note.
    set("m-tvt", "A$"+audd.toLocaleString("en-US",{maximumFractionDigits:0}));
    const note=document.getElementById("m-note");
    if(note) note.textContent = `Live from governors.mainnet.redbelly.network. TVL is DeFi pool liquidity (reddex). TVT is tokenized RWA on-chain supply: AUDD ${audd.toLocaleString("en-US")} (A$, 1:1 peg) and Hutly sHUT ${shut.toLocaleString("en-US")} units. TVL and TVT are separate metrics, matching the report.`;
  }catch{ set("m-tvt","n/a"); }
}

// bootstrap after all consts (incl rpc) are initialized
const start=(location.hash||"#overview").slice(1);
show(start in {...HTML_SECTIONS,...MD_SECTIONS}?start:"overview");
