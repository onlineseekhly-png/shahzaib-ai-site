(function(){
  var C=window.SITE||{}, ur=function(){return document.documentElement.getAttribute("data-lang")==="ur"};
  function two(en,u){return '<span class="en" lang="en">'+en+'</span><span class="ur" lang="ur" dir="rtl">'+u+'</span>';}
  // download bar (mobile) + whatsapp help
  if(!/install\.html$/.test(location.pathname)){
    var b=document.createElement("div"); b.className="dlbar on";
    b.innerHTML='<a class="btn" href="'+(C.apkFile||"https://github.com/onlineseekhly-png/ShahzaibAi/releases/download/latest/ShahzaibAI.apk")+'" data-track="download">'+two("Download free APK","مفت APK ڈاؤن لوڈ")+'</a><small>v'+(C.version||"")+' · '+(C.apkSize||"")+'</small>';
    document.body.appendChild(b);
  }
  if(C.wa){var w=document.createElement("a");w.className="wafab";w.target="_blank";w.rel="noopener";w.setAttribute("aria-label","WhatsApp help");
    w.href="https://wa.me/"+String(C.wa).replace(/\D/g,"")+"?text="+encodeURIComponent("Shahzaib AI help: ");
    w.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>';
    document.body.appendChild(w);}
  // GoatCounter (set goatcounter:"yourcode" in config.js)
  if(C.goatcounter){var s=document.createElement("script");s.async=true;s.src="https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter","https://"+C.goatcounter+".goatcounter.com/count");document.head.appendChild(s);}
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a"); if(!a) return;
    var h=a.getAttribute("href")||"";
    if(/\.apk(\?|$)/.test(h)&&window.goatcounter&&goatcounter.count){goatcounter.count({path:"download-apk",title:"APK download",event:true});}
  });
  // bug report form -> mailto
  var f=document.getElementById("bugform");
  if(f) f.addEventListener("submit",function(e){e.preventDefault();
    var g=function(n){return f.elements[n].value};
    var body="App version: "+g("ver")+"\nAndroid / phone: "+g("phone")+"\n\nProblem:\n"+g("issue");
    location.href="mailto:"+(C.email||"")+"?subject="+encodeURIComponent("Shahzaib AI bug report")+"&body="+encodeURIComponent(body);});
})();
(function(){
  var nav=document.querySelector(".top nav"); if(!nav) return;
  var links=[["index.html#features","Features","خصوصیات"],["index.html#new","Videos","ویڈیوز"],["commands.html","Voice commands","کمانڈز"],["install.html","Install","انسٹال"],["blog.html","Blog","بلاگ"],["about.html","About","تعارف"],["install.html#bug","Contact / report a bug","رابطہ / مسئلہ بتائیں"]];
  var b=document.createElement("button");b.className="mbtn";b.type="button";b.setAttribute("aria-label","Menu");b.setAttribute("aria-expanded","false");b.textContent="☰";
  var p=document.createElement("div");p.className="mpanel";
  p.innerHTML=links.map(function(l){return '<a href="'+l[0]+'"><span class="en" lang="en">'+l[1]+'</span><span class="ur" lang="ur" dir="rtl">'+l[2]+'</span></a>';}).join("");
  var th=document.getElementById("themebtn"); nav.insertBefore(b,th||null); document.body.appendChild(p);
  b.addEventListener("click",function(){var o=p.classList.toggle("open");b.setAttribute("aria-expanded",o);b.textContent=o?"✕":"☰";});
  p.addEventListener("click",function(e){if(e.target.closest("a")){p.classList.remove("open");b.textContent="☰";}});
})();
(function(){
  var C=window.SITE||{};
  document.querySelectorAll("[data-size]").forEach(function(e){e.textContent=C.apkSize||""});
  document.querySelectorAll("[data-date]").forEach(function(e){e.textContent=C.apkDate||""});
  document.querySelectorAll("[data-sha]").forEach(function(e){e.textContent=C.apkSha||""});
  var cp=document.getElementById("shacopy"); if(cp) cp.addEventListener("click",function(){try{navigator.clipboard.writeText(C.apkSha||"");cp.textContent="✓"}catch(e){}});
  // scroll reveal
  var rv=document.querySelectorAll(".rv");
  if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{rootMargin:"0px 0px -8% 0px"});rv.forEach(function(e){io.observe(e)});setTimeout(function(){rv.forEach(function(e){e.classList.add("in")})},2500);}
  else rv.forEach(function(e){e.classList.add("in")});
  // Urdu voice demo (device text-to-speech)
  var pb=document.getElementById("vplay"); if(!pb) return;
  var note=document.getElementById("vnote"), chat=document.getElementById("vchat"), txt=document.getElementById("vtext");
  function urVoice(){var v=(window.speechSynthesis&&speechSynthesis.getVoices())||[];for(var i=0;i<v.length;i++){if(/^ur/i.test(v[i].lang))return v[i]}return null}
  if(!window.speechSynthesis){pb.disabled=true;note.textContent="Your browser cannot read text aloud. Please watch the video.";return}
  pb.addEventListener("click",function(){
    speechSynthesis.cancel(); var v=urVoice();
    if(!v){note.textContent="This browser has no Urdu voice installed. Please watch the video, or open this page in Chrome on Android.";return}
    var u=new SpeechSynthesisUtterance(txt.textContent); u.voice=v; u.lang=v.lang; u.rate=.95;
    u.onstart=function(){chat.classList.add("speaking")}; u.onend=u.onerror=function(){chat.classList.remove("speaking")};
    speechSynthesis.speak(u);
  });
  if(speechSynthesis.onvoiceschanged!==undefined) speechSynthesis.onvoiceschanged=function(){};
})();
