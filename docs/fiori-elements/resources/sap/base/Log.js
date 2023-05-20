/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/now"],function(e){"use strict";var n={};n.Level={NONE:-1,FATAL:0,ERROR:1,WARNING:2,INFO:3,DEBUG:4,TRACE:5,ALL:5+1};var t=[],o={"":n.Level.ERROR},i=3e3,r=null,s=false;function l(e,n){return("000"+String(e)).slice(-n)}function f(e){return!e||isNaN(o[e])?o[""]:o[e]}function c(){var e=t.length;if(e){var n=Math.min(e,Math.floor(i*.7));if(r){r.onDiscardLogEntries(t.slice(0,e-n))}if(n){t=t.slice(-n,e)}else{t=[]}}}function a(){if(!r){r={listeners:[],onLogEntry:function(e){for(var n=0;n<r.listeners.length;n++){if(r.listeners[n].onLogEntry){r.listeners[n].onLogEntry(e)}}},onDiscardLogEntries:function(e){for(var n=0;n<r.listeners.length;n++){if(r.listeners[n].onDiscardLogEntries){r.listeners[n].onDiscardLogEntries(e)}}},attach:function(e,n){if(n){r.listeners.push(n);if(n.onAttachToLog){n.onAttachToLog(e)}}},detach:function(e,n){for(var t=0;t<r.listeners.length;t++){if(r.listeners[t]===n){if(n.onDetachFromLog){n.onDetachFromLog(e)}r.listeners.splice(t,1);return}}}}}return r}n.fatal=function(e,t,o,i){u(n.Level.FATAL,e,t,o,i)};n.error=function(e,t,o,i){u(n.Level.ERROR,e,t,o,i)};n.warning=function(e,t,o,i){u(n.Level.WARNING,e,t,o,i)};n.info=function(e,t,o,i){u(n.Level.INFO,e,t,o,i)};n.debug=function(e,t,o,i){u(n.Level.DEBUG,e,t,o,i)};n.trace=function(e,t,o,i){u(n.Level.TRACE,e,t,o,i)};n.setLevel=function(e,t,i){t=t||"";if(!i||o[t]==null){o[t]=e;var r;Object.keys(n.Level).forEach(function(t){if(n.Level[t]===e){r=t}});u(n.Level.INFO,"Changing log level "+(t?"for '"+t+"' ":"")+"to "+r,"","sap.base.log")}};n.getLevel=function(e){return f(e)};n.isLoggable=function(e,t){return(e==null?n.Level.DEBUG:e)<=f(t)};n.logSupportInfo=function(e){s=e};function u(o,a,u,g,L){if(!L&&!g&&typeof u==="function"){L=u;u=""}if(!L&&typeof g==="function"){L=g;g=""}if(o<=f(g)){var h=e(),v=new Date(h),E=Math.floor((h-Math.floor(h))*1e3),d={time:l(v.getHours(),2)+":"+l(v.getMinutes(),2)+":"+l(v.getSeconds(),2)+"."+l(v.getMilliseconds(),3)+l(E,3),date:l(v.getFullYear(),4)+"-"+l(v.getMonth()+1,2)+"-"+l(v.getDate(),2),timestamp:h,level:o,message:String(a||""),details:String(u||""),component:String(g||"")};if(s&&typeof L==="function"){d.supportInfo=L()}if(i){if(t.length>=i){c()}t.push(d)}if(r){r.onLogEntry(d)}if(console){var p=u instanceof Error,R=d.date+" "+d.time+" "+d.message+" - "+d.details+" "+d.component;switch(o){case n.Level.FATAL:case n.Level.ERROR:p?console.error(R,"\n",u):console.error(R);break;case n.Level.WARNING:p?console.warn(R,"\n",u):console.warn(R);break;case n.Level.INFO:if(console.info){p?console.info(R,"\n",u):console.info(R)}else{p?console.log(R,"\n",u):console.log(R)}break;case n.Level.DEBUG:p?console.debug(R,"\n",u):console.debug(R);break;case n.Level.TRACE:p?console.trace(R,"\n",u):console.trace(R);break}if(console.info&&d.supportInfo){console.info(d.supportInfo)}}return d}}n.getLogEntries=function(){return t.slice()};n.getLogEntriesLimit=function(){return i};n.setLogEntriesLimit=function(e){if(e<0){throw new Error("The log entries limit needs to be greater than or equal to 0!")}i=e;if(t.length>=i){c()}};n.addLogListener=function(e){a().attach(this,e)};n.removeLogListener=function(e){a().detach(this,e)};function g(e){this.fatal=function(t,o,i,r){n.fatal(t,o,i||e,r);return this};this.error=function(t,o,i,r){n.error(t,o,i||e,r);return this};this.warning=function(t,o,i,r){n.warning(t,o,i||e,r);return this};this.info=function(t,o,i,r){n.info(t,o,i||e,r);return this};this.debug=function(t,o,i,r){n.debug(t,o,i||e,r);return this};this.trace=function(t,o,i,r){n.trace(t,o,i||e,r);return this};this.setLevel=function(t,o){n.setLevel(t,o||e);return this};this.getLevel=function(t){return n.getLevel(t||e)};this.isLoggable=function(t,o){return n.isLoggable(t,o||e)}}n.getLogger=function(e,n){if(!isNaN(n)&&o[e]==null){o[e]=n}return new g(e)};return n});