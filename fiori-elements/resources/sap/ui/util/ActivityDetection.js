/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={},t=true,n=null,i=1e4,r=[],o=false,u=null;function s(){n=null;if(o&&document.hidden!==true){c();return}t=false;u.observe(document.documentElement,{childList:true,attributes:true,subtree:true,characterData:true})}function c(){if(document.hidden){return}if(!t){t=true;d(r);u.disconnect()}if(n){o=true}else{n=setTimeout(s,i);o=false}}function d(e){if(e.length===0){return}var t=e.slice();setTimeout(function(){var e;for(var n=0,i=t.length;n<i;n++){e=t[n];e.fFunction.call(e.oListener||window)}},0)}e.attachActivate=function(e,t){r.push({oListener:t,fFunction:e})};e.detachActivate=function(e,t){for(var n=0,i=r.length;n<i;n++){if(r[n].fFunction===e&&r[n].oListener===t){r.splice(n,1);break}}};e.isActive=function(){return t};e.refresh=c;var f=["resize","orientationchange","mousemove","mousedown","mouseup","paste","cut","keydown","keyup","DOMMouseScroll","mousewheel"];if("ontouchstart"in window){f.push("touchstart","touchmove","touchend","touchcancel")}for(var a=0;a<f.length;a++){window.addEventListener(f[a],e.refresh,{capture:true,passive:true})}if(window.MutationObserver){u=new window.MutationObserver(e.refresh)}else if(window.WebKitMutationObserver){u=new window.WebKitMutationObserver(e.refresh)}else{u={observe:function(){document.documentElement.addEventListener("DOMSubtreeModified",e.refresh)},disconnect:function(){document.documentElement.removeEventListener("DOMSubtreeModified",e.refresh)}}}if(typeof document.hidden==="boolean"){document.addEventListener("visibilitychange",function(){if(document.hidden!==true){e.refresh()}},false)}c();return e});