/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function e(e){var t=new Headers;e.trim().split("\r\n").forEach(function(e){if(e){var r=e.indexOf(": ");if(r>0){t.append(e.slice(0,r),e.slice(r+2))}else{t.append(e,"")}}});return t}function t(t,r){var n=e(t.getAllResponseHeaders());Object.defineProperties(this,{headers:{value:n},ok:{value:t.status>=200&&t.status<300},status:{value:t.status},statusText:{value:t.statusText}});this.json=function(){if(t.responseType==="json"){return r.resolve(t.response)}else{try{var e=JSON.parse(t.responseText);return r.resolve(e)}catch(e){return r.reject(e)}}};this.text=function(){return r.resolve(t.responseText)}}var r=["include","omit","same-origin"];function n(e,n,s){n=Object.assign({body:null,credentials:"same-origin",method:"GET",signal:(new AbortController).signal},n);var a=s&&s.promiseImpl||Promise;return new a(function(i,o){var l=new URL(e,document.baseURI);if(l.username||l.password){o(new TypeError("Failed to execute 'fetch': Request cannot be constructed from a URL that includes credentials:"+e))}e=e.replace(/^\/\//,l.protocol+"//");if(n.body!==null&&(n.method=="GET"||n.method=="HEAD")){o(new TypeError("Failed to execute 'fetch': Request with GET/HEAD method cannot have body."))}var d=new XMLHttpRequest;d.addEventListener("load",function(){var e=new t(d,a);if(s&&s.responseMixin){s.responseMixin.apply(e)}i(e)});d.addEventListener("error",function(){o(new TypeError("Failed to fetch."))});d.open(n.method,e,s?false:true);n.signal.addEventListener("abort",function(){d.abort();o(new DOMException("The user aborted a request.","AbortError"))});var c;if(n.headers instanceof Headers){c=Object.fromEntries(n.headers)}else{c=n.headers||{}}Object.keys(c).forEach(function(e){d.setRequestHeader(e,c[e])});if(r.includes(n.credentials)){if(n.credentials==="omit"){d.withCredentials=false}else if(n.credentials==="include"){d.withCredentials=true}}else{o(new TypeError("Failed to execute 'fetch': Failed to read the 'credentials' property from 'RequestInit': The provided value "+n.credentials+" is not a valid enum value of type RequestCredentials."))}try{d.send(n.body)}catch(e){o(new TypeError(e.message))}})}n.ContentTypes={TEXT:"text/plain",HTML:"text/html",XML:"application/xml, text/xml",JSON:"application/json, text/javascript"};return n});