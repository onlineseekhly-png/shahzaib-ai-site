(function(){
  var C = window.SITE || {};
  var user = C.githubUser;
  if(!user && /\.github\.io$/.test(location.hostname)) user = location.hostname.split(".")[0];
  var apk = user ? "https://github.com/" + user + "/" + C.appRepo + "/releases/latest/download/" + C.apkName
                 : "https://github.com/";
  var rel = user ? "https://github.com/" + user + "/" + C.appRepo + "/releases/latest" : "https://github.com/";
  document.querySelectorAll("[data-apk]").forEach(function(a){ a.href = apk; });
  document.querySelectorAll("[data-releases]").forEach(function(a){ a.href = rel; });
  document.querySelectorAll("[data-version]").forEach(function(e){ e.textContent = C.version || ""; });
  document.querySelectorAll("[data-email]").forEach(function(e){ e.textContent = C.email || "(ای میل config.js میں لکھیں)"; if(C.email && e.tagName==="A") e.href = "mailto:" + C.email; });
  var c = document.getElementById("canon"); if(c) c.href = location.origin + location.pathname;
})();
