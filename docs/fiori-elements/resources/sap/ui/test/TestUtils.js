/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/merge","sap/base/util/UriParameters","sap/ui/base/SyncPromise","sap/ui/thirdparty/jquery","sap/ui/core/Lib","sap/ui/core/Core"],function(e,t,r,n,s,a){"use strict";var i=/\/\$batch($|\?)/,o=/(?:^|\r\n)Content-Id\s*:\s*(\S+)/i,u=/^(.*)?:\s*(.*)$/,c="application/json;charset=UTF-8;IEEE754Compatible=true",f={},p="\r\nContent-Type: application/http\r\n"+"Content-Transfer-Encoding: binary\r\n",l=/^Content-Type:\s*multipart\/mixed;\s*boundary=/i,d=r.fromQuery(window.location.search),h=d.get("autoRespondAfter"),y=d.get("realOData"),g=/^(\S+) (\S+)$/,m=/^(GET|DELETE|MERGE|PATCH|POST) (\S+) HTTP\/1\.1$/,E={},x=/^(OData-Version|DataServiceVersion)$/,v=y==="true"||y==="direct",T=null,b;if(v){document.title=document.title+" (real OData)"}function q(e,t,r){var n=QUnit.objectType(e),s=QUnit.objectType(t),a;if(n==="string"&&s==="regexp"){if(!t.test(e)){throw new Error(r+": actual value "+e+" does not match expected regular expression "+t)}return}if(n!==s){throw new Error(r+": actual type "+n+" does not match expected type "+s)}if(n==="array"){if(e.length<t.length){throw new Error(r+": array length: "+e.length+" < "+t.length)}}if(n==="array"||n==="object"){for(a in t){q(e[a],t[a],r==="/"?r+a:r+"/"+a)}}else if(e!==t){throw new Error(r+": actual value "+e+" does not match expected value "+t)}}function R(e,t,r,n){try{q(e,t,"/");QUnit.assert.pushResult({result:n,actual:e,expected:t,message:r})}catch(s){QUnit.assert.pushResult({result:!n,actual:e,expected:t,message:(r||"")+" failed because of "+s.message})}}b={awaitRendering:function(){return new Promise(function(e){function t(){if(sap.ui.getCore().getUIDirty()){setTimeout(t,1)}else{e()}}t()})},checkGetAndRequest:function(e,t,r,s,a,i){var o,u=s.replace("fetch","get"),c=e.mock(Promise),f=new Error("rejected"),p=Promise.reject(f),l=s.replace("fetch","request"),d={},h=n.resolve(p);o=e.mock(t).expects(s).exactly(4);o=o.withExactArgs.apply(o,a);o.returns(n.resolve(d));r.strictEqual(t[u].apply(t,a),d);o.returns(h);c.expects("resolve").withExactArgs(sinon.match.same(h)).returns(p);r.strictEqual(t[l].apply(t,a),p);c.restore();if(i){r.throws(function(){t[u].apply(t,a)},new Error("Result pending"))}else{r.strictEqual(t[u].apply(t,a),undefined,"pending")}return h.catch(function(){if(i){r.throws(function(){t[u].apply(t,a)},f)}else{r.strictEqual(t[u].apply(t,a),undefined,"rejected")}})},deepContains:function(e,t,r){R(e,t,r,true)},notDeepContains:function(e,t,r){R(e,t,r,false)},useFakeServer:function(r,n,a,d,y,g){var E,v;function b(e,t){var r=H(e,t.requestBody),n=k(t);if(T){T(t.requestBody)}t.respond(200,s.extend({},n,{"Content-Type":"multipart/mixed;boundary="+r.boundary}),D(r,n))}function q(e){var t={buildResponse:e.buildResponse,code:e.code||200,headers:e.headers||{},ifMatch:e.ifMatch};if(e.source){t.message=F(n+e.source);t.headers["Content-Type"]=t.headers["Content-Type"]||w(e.source)}else if(typeof e.message==="object"){t.headers["Content-Type"]=c;t.message=JSON.stringify(e.message)}else{t.message=e.message}return t}function R(){var e,t,r={};for(t in a){e=a[t];if(!t.includes(" ")){t="GET "+t}if(Array.isArray(e)){r[t]=e.map(q)}else{r[t]=[q(e)]}}return r}function w(e){if(/\.xml$/.test(e)){return"application/xml"}if(/\.json$/.test(e)){return c}return"application/x-octet-stream"}function O(t,r,n){e.error(r.requestLine||r.method+" "+r.url,n,"sap.ui.test.TestUtils");return{code:t,headers:{"Content-Type":"text/plain"},message:n}}function C(e){return e.slice(0,e.indexOf("\r\n"))}function D(e,t){var r=[""];e.parts.every(function(e){r.push(e.boundary?"\r\nContent-Type: multipart/mixed;boundary="+e.boundary+"\r\n\r\n"+D(e,t):S(e,t));return!e.code||e.code<400||t.DataServiceVersion==="2.0"});r.push("--\r\n");return r.join("--"+e.boundary)}function S(e,t){var r=s.extend({},t,e.headers);return p+(e.contentId?"Content-ID: "+e.contentId+"\r\n":"")+"\r\nHTTP/1.1 "+e.code+" \r\n"+Object.keys(r).map(function(e){return e+": "+r[e]}).join("\r\n")+"\r\n\r\n"+(e.message||"")+"\r\n"}function M(t,r){var n,s,a=t+" "+r;if(v[a]){return{responses:v[a]}}if(!E){return undefined}n=[];s=E.filter(function(e){var t=a.match(e.regExp);if(t){n.push(t)}return t});if(s.length>1){e.warning("Multiple matches found for "+a,undefined,"sap.ui.test.TestUtils");return undefined}return s.length?{responses:s[0].response,match:n[0]}:undefined}function k(e){var t,r={};for(t in e.requestHeaders){if(x.test(t)){r[t]=e.requestHeaders[t]}}return r}function A(r,n){var a,i=M(r.method,r.url),o,u=i&&i.responses;u=(u||[]).filter(function(e){if(typeof e.ifMatch==="function"){return e.ifMatch(r)}return!e.ifMatch||e.ifMatch.test(r.requestBody)});if(u.length){o=u[0];if(typeof o.buildResponse==="function"){o=t({},o);o.buildResponse(i.match,o)}if(i.responses.length>1){a=i.responses.indexOf(o)}}else if(!g){switch(r.method){case"HEAD":o={code:200};break;case"DELETE":case"MERGE":case"PATCH":o={code:204};break;case"POST":o={code:200,headers:{"Content-Type":c},message:r.requestBody};break}}if(o){e.info(r.method+" "+r.url+(a!==undefined?", alternative (ifMatch) #"+a:""),'{"If-Match":'+JSON.stringify(r.requestHeaders["If-Match"])+"}","sap.ui.test.TestUtils")}else{o=O(404,r,"No mock data found")}o.headers=s.extend({},k(r),o.headers);if(n&&o.code<300){o.contentId=n}return o}function H(e,t){var r;t=t.replace(/^\s+/,"");r=C(t);return{boundary:C(t).slice(2),parts:t.split(r).slice(1,-1).map(function(t){var r,n,s,a,i,u;t=t.slice(2);n=C(t);if(l.test(n)){a=H(e,t.slice(n.length+4));r=a.parts.filter(function(e){return e.code>=300});return r.length?r[0]:a}u=t.indexOf("\r\n\r\n")+4;i=j(e,t.slice(u));s=o.exec(t.slice(0,u));return A(i,s&&s[1])})}}function j(e,t){var r=t.indexOf("\r\n\r\n"),n,s,a={requestHeaders:{}};a.requestBody=t.slice(r+4,t.length-2);t=t.slice(0,r);n=t.split("\r\n");a.requestLine=n.shift();s=m.exec(a.requestLine);if(s){a.method=s[1];a.url=e+s[2];n.forEach(function(e){var t=u.exec(e);if(t){a.requestHeaders[t[1]]=t[2]}})}return a}function P(e){var t=e.url;if(i.test(t)){b(t.slice(0,t.indexOf("/$batch")+1),e)}else{L(e)}}function F(e){var t=f[e];if(!t){s.ajax({async:false,url:e,dataType:"text",success:function(e){t=e}});if(!t){throw new Error(e+": resource not found")}f[e]=t}return t}function L(e){var t=A(e);if(T){T(e.requestBody)}e.respond(t.code,t.headers,t.message)}function U(){var e,t;v=R();if(d){E=d.map(function(e){return{regExp:e.regExp,response:Array.isArray(e.response)?e.response.map(q):[q(e.response)]}})}t=sinon.fakeServer.create();if(r.getFakes){r.getFakes().push(t)}else{r.add(t)}t.autoRespond=true;if(h){t.autoRespondAfter=parseInt(h)}t.respondWith("GET",/./,L);t.respondWith("DELETE",/./,L);t.respondWith("HEAD",/./,L);t.respondWith("PATCH",/./,L);t.respondWith("MERGE",/./,L);t.respondWith("POST",/./,P);e=t.restore;t.restore=function(){sinon.FakeXMLHttpRequest.filters=[];e.apply(this,arguments)};sinon.xhr.supportsCORS=s.support.cors;sinon.FakeXMLHttpRequest.useFilters=true;sinon.FakeXMLHttpRequest.addFilter(function(e,t){var r=M(e,t)||(y?t.startsWith(y)||i.test(t):e==="DELETE"||e==="HEAD"||e==="MERGE"||e==="PATCH"||e==="POST");return!r});return t}n=sap.ui.require.toUrl(n).replace(/(^|\/)resources\/(~[-a-zA-Z0-9_.]*~\/)?/,"$1test-resources/")+"/";return U()},withNormalizedMessages:function(e){var t;if(sinon.createSandbox){t=sinon.createSandbox()}else{t=sinon.sandbox.create()}try{var r=a.prototype._loadResourceBundle;t.stub(a.prototype,"_loadResourceBundle").callsFake(function(){var e=r.apply(this,[arguments[0],true]);return{getText:function(t,r){var n=t,s=e.getText(t),a;for(a=0;a<10;a+=1){if(s.indexOf("{"+a+"}")>=0){n+=" "+(a>=r.length?"{"+a+"}":r[a])}}return n}}});e.apply(this)}finally{t.verifyAndRestore()}},isRealOData:function(){if(y==="proxy"){throw new Error("realOData=proxy is no longer supported")}return v},getRealOData:function(){return y?"&realOData="+y:""},onRequest:function(e){T=e},proxy:function(t){e.warning("#proxy is no longer supported",null,"sap.ui.test.TestUtils");return t},retrieveData:function(e){var t=E[e];delete E[e];return t},setData:function(e,t){E[e]=t},setupODataV4Server:function(e,t,r,n,s){if(this.isRealOData()){return}if(!n){n="/"}else if(n.slice(-1)!=="/"){n+="/"}b.useFakeServer(e,r||"sap/ui/core/qunit/odata/v4/data",b.normalizeFixture(t,n),s,n!=="/"?n:undefined)},normalizeFixture:function(e,t){var r={};Object.keys(e).forEach(function(n){var s=g.exec(n),a,i;if(s){a=s[1]||"GET";i=s[2]}else{a="GET";i=n}if(!i.startsWith("/")){i=t+i}r[a+" "+i]=e[n]});return r},spyFetch:function(e){var t=e.spy(XMLHttpRequest.prototype,"open");t.calledWithUrl=function(e){return t.getCall(e).args[1]};return t}};return b},true);