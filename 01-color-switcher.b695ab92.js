const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");function r(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(()=>{timerId=setInterval(r,1e3),document.querySelector("[data-start]").disabled=!0})),e.addEventListener("click",(()=>{clearInterval(timerId),document.querySelector("[data-start]").disabled=!1}));
//# sourceMappingURL=01-color-switcher.b695ab92.js.map
