(function(){
  var C = window.SITE || {};
  var user = C.githubUser;
  if(!user && /\.github\.io$/.test(location.hostname)) user = location.hostname.split(".")[0];
  var apk = user ? "https://github.com/"+user+"/"+C.appRepo+"/releases/latest/download/"+C.apkName : "https://github.com/";
  var rel = user ? "https://github.com/"+user+"/"+C.appRepo+"/releases/latest" : "https://github.com/";
  document.querySelectorAll("[data-apk]").forEach(function(a){a.href=apk;});
  document.querySelectorAll("[data-releases]").forEach(function(a){a.href=rel;});
  document.querySelectorAll("[data-version]").forEach(function(e){e.textContent=C.version||"";});
  document.querySelectorAll("[data-email]").forEach(function(e){
    e.textContent=C.email||"(set email in config.js)";
    if(C.email && e.tagName==="A") e.href="mailto:"+C.email;
  });
  document.querySelectorAll("[data-wa]").forEach(function(e){ if(C.wa){e.hidden=false;e.href="https://wa.me/"+String(C.wa).replace(/\D/g,"");} });
  var c=document.getElementById("canon"); if(c) c.href=location.origin+location.pathname;

  // language switch (English first for search engines, Urdu one tap away)
  var root=document.documentElement, btn=document.getElementById("langbtn");
  function setLang(l){
    root.setAttribute("data-lang",l);
    root.setAttribute("lang",l);
    root.setAttribute("dir", l==="ur"?"rtl":"ltr");
    if(btn) btn.textContent = l==="ur" ? "English" : "اردو";
    try{localStorage.setItem("lang",l);}catch(e){}
  }
  var saved=null; try{saved=localStorage.getItem("lang");}catch(e){}
  setLang(saved==="ur"?"ur":"en");
  if(btn) btn.addEventListener("click",function(){ setLang(root.getAttribute("data-lang")==="ur"?"en":"ur"); });

  // screens gallery (sidebar tabs)
  var tabs=document.querySelectorAll(".gal [role=tab]");
  function pick(t){ tabs.forEach(function(x){var on=x===t; x.setAttribute("aria-selected",on); document.getElementById(x.getAttribute("aria-controls")).hidden=!on;}); }
  tabs.forEach(function(t,i){
    t.addEventListener("click",function(){pick(t);});
    t.addEventListener("keydown",function(e){var n=null; if(e.key==="ArrowDown"||e.key==="ArrowRight") n=tabs[(i+1)%tabs.length]; if(e.key==="ArrowUp"||e.key==="ArrowLeft") n=tabs[(i-1+tabs.length)%tabs.length]; if(n){e.preventDefault();n.focus();pick(n);}});
  });

  // hero chat demo: runs once
  var msgs=document.querySelectorAll("#chat .msg");
  if(msgs.length){
    var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
    msgs.forEach(function(m,i){ if(reduce) m.classList.add("show"); else setTimeout(function(){m.classList.add("show");}, 700+i*1250); });
  }

  // theme switch
  var tb=document.getElementById("themebtn");
  if(tb) tb.addEventListener("click",function(){
    var cur=root.getAttribute("data-theme"); var nx=cur==="light"?"dark":"light";
    root.setAttribute("data-theme",nx); try{localStorage.setItem("theme",nx);}catch(e){}
  });

  // glow follows the pointer on cards; gentle 3D tilt on mouse devices only
  var fine=window.matchMedia&&matchMedia("(hover:hover) and (pointer:fine)").matches;
  var noMotion=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".tile,.steps li,.post").forEach(function(el){
    el.addEventListener("pointermove",function(e){
      var r=el.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
      el.style.setProperty("--mx",x+"px"); el.style.setProperty("--my",y+"px");
      if(fine&&!noMotion&&el.classList.contains("tile")){
        el.style.transform="perspective(900px) rotateX("+(((y/r.height)-.5)*-5)+"deg) rotateY("+(((x/r.width)-.5)*6)+"deg) translateY(-3px)";
      }
    });
    el.addEventListener("pointerleave",function(){ el.style.transform=""; });
  });

  // sections fade in once
  if("IntersectionObserver" in window && !noMotion){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){ if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target);} });},{threshold:.08});
    document.querySelectorAll("main section").forEach(function(s,i){ if(i>0){s.classList.add("reveal");io.observe(s);} });
  }
})();
