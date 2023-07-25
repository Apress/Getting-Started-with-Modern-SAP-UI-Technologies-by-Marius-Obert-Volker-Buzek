/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepEqual","sap/base/strings/hash"],function(e,n){"use strict";var i=function(i,l,t){var f={},s=[],u=[],d,r,o,h,p=0,a=0,y,g,b,m,C,O=[];if(i===l||e(i,l)){return O}if(!t||typeof t=="function"){h=t}else{h=t.symbol;C=t.replace}h=h||function(e){if(typeof e!=="string"){e=JSON.stringify(e)||""}return n(e)};for(var c=0;c<l.length;c++){r=h(l[c]);o=f[r];if(!o){o=f[r]={iNewCount:0,iOldCount:0}}o.iNewCount++;u[c]={symbol:o}}for(var c=0;c<i.length;c++){r=h(i[c]);o=f[r];if(!o){o=f[r]={iNewCount:0,iOldCount:0}}o.iOldCount++;o.iOldLine=c;s[c]={symbol:o}}for(var c=0;c<u.length;c++){o=u[c].symbol;if(o.iNewCount===1&&o.iOldCount===1){u[c].line=o.iOldLine;s[o.iOldLine].line=c}}for(var c=0;c<u.length-1;c++){d=u[c].line;if(d!==undefined&&d<s.length-1){if(s[d+1].symbol===u[c+1].symbol){s[d+1].line=c+1;u[c+1].line=d+1}}}for(var c=u.length-1;c>0;c--){d=u[c].line;if(d!==undefined&&d>0){if(s[d-1].symbol===u[c-1].symbol){s[d-1].line=c-1;u[c-1].line=d-1}}}while(p<i.length||a<l.length){g=s[p]&&s[p].line;y=u[a]&&u[a].line;if(C&&g===undefined&&y===undefined&&p<i.length&&a<l.length){O.push({index:a,type:"replace"});p++;a++}else if(p<i.length&&(g===undefined||g<a)){O.push({index:a,type:"delete"});p++}else if(a<l.length&&(y===undefined||y<p)){O.push({index:a,type:"insert"});a++}else if(a===g){a++;p++}else{m=g-a;b=y-p;if(m<=b){O.push({index:a,type:"insert"});a++}else{O.push({index:a,type:"delete"});p++}}}return O};return i});