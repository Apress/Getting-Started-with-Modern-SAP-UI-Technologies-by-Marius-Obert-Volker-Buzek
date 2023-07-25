// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ushell/services/_ClientSideTargetResolution/Utils"],function(e,n){"use strict";var o={};function r(e){var n;var r;var t=e();if(!t.hasOwnProperty("logId")){throw new Error("'logId' argument was not provided in #begin method of StagedLogger.")}n=t.logId;if(o[n]){throw new Error("'cannot call #begin twice with same log id: '"+n+"'")}else{o[n]={}}r=o[n];r.title=t.title||null;r.moduleName=t.moduleName||null;var l=function(e,n){if(n===1){return e}return l(e,n-1)+e};r.stages=t.stages.map(function(e){return[e,l("-",e.length)]});return n}function t(e){var n,r,t,l,i,a,g,u;u=e();if(!u.hasOwnProperty("logId")){throw new Error("'logId' argument was not provided in #log method of StagedLogger.")}n=u.logId;a=u.stage;i=u.prefix;l=u.lines;t=u.line;g=u.number;if(!l&&t&&i){t=i+" "+t}r=o[n].stages[a-1];if(t){r.push(t)}if(l){if(i){i=(t?" ":"")+i}var d=l.map(function(e,n){return(g?n+1:"")+(i?i+" ":"")+e});r.push.apply(r,d)}}function l(n){var r,t,l;r=n();if(!r.hasOwnProperty("logId")){throw new Error("'logId' argument was not provided in #log method of StagedLogger.")}l=r.logId;t=o[l];if(typeof t!=="object"){throw new Error("Logger .end was called on an already ended logger")}var i=t.stages.map(function(e){return e.join("\n")}).join("\n\n");e.debug("[REPORT #"+l+"] "+t.title,"\n"+i+"\n",t.moduleName);delete o[l]}function i(){return o}return{begin:function(){if(e.getLevel()>=e.Level.DEBUG){r.apply(null,arguments)}},log:function(){if(e.getLevel()>=e.Level.DEBUG){t.apply(null,arguments)}},end:function(){if(e.getLevel()>=e.Level.DEBUG){l.apply(null,arguments)}},_getLogs:i}});