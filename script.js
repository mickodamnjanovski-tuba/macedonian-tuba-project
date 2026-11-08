document.getElementById("year").textContent=new Date().getFullYear();const toggle=document.querySelector(".navtoggle"),nav=document.getElementById("nav");toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));
// To activate a card, add its real YouTube video ID to data-youtube-id in index.html.
document.querySelectorAll('.video-card').forEach(card => {
  const id = (card.dataset.youtubeId || '').trim();
  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
  card.classList.add('is-ready');
  const frame = card.querySelector('.video-frame');
  frame.setAttribute('role', 'button'); frame.setAttribute('tabindex', '0');
  frame.setAttribute('aria-label', 'Play ' + card.querySelector('h3').textContent);
  const play = () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1';
    iframe.title = card.querySelector('h3').textContent;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true; frame.replaceChildren(iframe);
  };
  frame.addEventListener('click', play, {once:true});
  frame.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();play();} });
});

// Center a navigated section in the usable viewport when it fits; otherwise
// align its heading below the sticky navigation. Applies to direct hash loads too.
(function(){
  const header=document.querySelector('.header');
  const getTarget=()=>{try{return document.getElementById(decodeURIComponent(location.hash.slice(1)))}catch{return null}};
  const position=(target,behavior='smooth')=>{
    if(!target)return;
    const headerHeight=header?header.getBoundingClientRect().height:70;
    const available=window.innerHeight-headerHeight;
    const sectionHeight=target.getBoundingClientRect().height;
    const spare=Math.max(0,available-sectionHeight);
    const offset=headerHeight+Math.min(spare/2,55);
    const top=window.scrollY+target.getBoundingClientRect().top-offset;
    window.scrollTo({top:Math.max(0,top),behavior});
  };
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{
    const target=document.getElementById(link.getAttribute('href').slice(1));
    if(!target)return;
    e.preventDefault();
    if(location.hash!==link.getAttribute('href'))history.pushState(null,'',link.getAttribute('href'));
    position(target);
  }));
  window.addEventListener('hashchange',()=>position(getTarget()));
  window.addEventListener('load',()=>{if(location.hash)position(getTarget(),'instant')});
})();
