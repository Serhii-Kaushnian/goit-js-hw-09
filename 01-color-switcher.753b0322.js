const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");function r(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(()=>{timerId=setInterval(r,2e3),document.querySelector("[data-start]").disabled=!0,e.addEventListener("click",(()=>{clearInterval(timerId),document.querySelector("[data-start]").disabled=!1}),{once:!0})}));
//# sourceMappingURL=01-color-switcher.753b0322.js.map