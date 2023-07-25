/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){function e(e,r,t){if(t){return r?r(e):e}if(!e||!e.then){e=Promise.resolve(e)}return r?e.then(r):e}function r(e,r){var t=e();if(t&&t.then){return t.then(r)}return r(t)}function t(e,r){try{var t=e()}catch(e){return r(e)}if(t&&t.then){return t.then(void 0,r)}return t}function n(e){return function(){for(var r=[],t=0;t<arguments.length;t++){r[t]=arguments[t]}try{return Promise.resolve(e.apply(this,r))}catch(e){return Promise.reject(e)}}}sap.ui.define(["./errors","./util"],function(o,i){function s(e){"@babel/helpers - typeof";return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function a(e,r){if(!(e instanceof r)){throw new TypeError("Cannot call a class as a function")}}function u(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function c(e,r,t){if(r)u(e.prototype,r);if(t)u(e,t);Object.defineProperty(e,"prototype",{writable:false});return e}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */const f=n(function(r){if(typeof window!=="undefined"){return new Promise(function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState==4&&(n.status==200||n.status==201||n.status==204)){e({data:n.responseText||"{}",headers:y(n.getAllResponseHeaders())});return}if(n.readyState==4){t(d(n,y(n.getAllResponseHeaders())))}};var o=v(r.url,r.parameters);n.open(r.method,o,true);for(var i in r.headers){var s=r.headers[i];n.setRequestHeader(i,s)}n.send(r.data)})}else{var n=require("node-fetch");var o=r.url.startsWith("https")?require("https"):require("http");var i=new o.Agent({rejectUnauthorized:false});var s={agent:i,headers:r.headers,method:r.method};if(typeof r.data!=="undefined"){s.body=r.data}var a=v(r.url,r.parameters);var u=function e(r){var t={};for(var n in r){var o=r[n];if(o instanceof Array&&o.length===1){t[n]=o[0]}else{t[n]=o}}return t};return t(function(){return e(n(a,s),function(r){if(r.ok){return e(r.text(),function(e){return{data:e||"{}",headers:u(r.headers.raw())}})}else{const t=r.statusText,n=r.status;return e(r.text(),function(e){throw d({status:n,statusText:t,responseText:e})})}})},function(e){throw d(e)})}});var d=o["ajaxErrorFactory"];var h=o["InternalESHClientError"];var l=i["hasOwnProperty"];var p;(function(e){e["NONE"]="none";e["RECORD"]="record";e["REPLAY"]="replay"})(p||(p={}));function y(e){var r={};var t=e.split("\n");for(var n=0;n<t.length;++n){var o=t[n];var i=o.indexOf(":");if(i>=0){var s=o.slice(0,i).toLowerCase();var a=o.slice(i+1);r[s]=a.trim()}}return r}function m(e){var r=[];for(var t in e){var n=e[t];r.push(encodeURIComponent(t)+"="+encodeURIComponent(n+""))}return r.join("&")}function v(e,r){if(!r){return e}var t=m(r);if(t.length>0){e+="?"+t}return e}function g(e){for(var r in e){if(typeof e[r]!=="boolean"&&typeof e[r]!=="string"&&typeof e[r]!=="number"){return false}}return true}var O=function(){function t(e){var r;a(this,t);this._client=new w(e);this.recordOptions={headers:e.recordingHeaders,mode:(r=e.recordingMode)!==null&&r!==void 0?r:p.NONE,path:e.recordingPath,requestNormalization:e.requestNormalization||this._defaultRequestNormalization};if(typeof window!=="undefined"&&this.recordOptions.mode!==p.NONE){throw new h("Record/Replay is only supported on Node.js")}this.records={};if(this.recordOptions.mode===p.REPLAY){this.records=require(e.recordingPath)}this.authorization=undefined;if(e.authorization){this.authorization={user:e.authorization.user,password:e.authorization.password}}}c(t,[{key:"_encodeObj",value:function e(r){var t=[];for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){t.push(encodeURIComponent(n)+"="+encodeURIComponent(r[n]))}}return t.join("&")}},{key:"getJson",value:function e(r,t){var n=this;if(t&&g(t)){var o="?"+n._encodeObj(t);r=r+o}if(n.recordOptions.mode==="none"){return n._client.getJson(r)}if(n.recordOptions.mode==="replay"){return n._replay(r,null)}return n._client.getJson(r).then(function(e){return n._record(r,null,e)})}},{key:"getXML",value:function t(n){try{let t=false;const i=this;var o=i;if(o.recordOptions.mode==="none"){return e(o._client.getXML(n))}return e(r(function(){if(o.recordOptions.mode==="replay"){return e(o._replay(n,null),function(e){const r=e.data;t=true;return r})}},function(e){return t?e:o._client.getXML(n).then(function(e){return o._record(n,null,e)})}))}catch(e){return Promise.reject(e)}}},{key:"postJson",value:function e(r,t){t=JSON.parse(JSON.stringify(t));var n=this;if(n.recordOptions.mode==="none"){return n._client.postJson(r,t)}if(n.recordOptions.mode==="replay"){return n._replay(r,t)}return n._client.postJson(r,t).then(function(e){return n._record(r,t,e)})}},{key:"mergeJson",value:function e(r,t){t=JSON.parse(JSON.stringify(t));var n=this;if(n.recordOptions.mode==="none"){return n._client.mergeJson(r,t)}if(n.recordOptions.mode==="replay"){return n._replay(r,t)}return n._client.mergeJson(r,t).then(function(e){return n._record(r,t,e)})}},{key:"request",value:function e(r){return this._client.request(r)}},{key:"_record",value:function e(r,t,n){var o=this;var i=r;var s=o.recordOptions.requestNormalization(t);if(s){i+=JSON.stringify(s)}if(o.records[i]===undefined&&i.indexOf("NotToRecord")===-1){try{o.records[i]=JSON.parse(JSON.stringify(n.data))}catch(e){if(e.name==="SyntaxError"){o.records[i]=n+""}else{throw e}}}return o._client.putJson(o.recordOptions.path,o.records).then(function(){return n})}},{key:"_replay",value:function r(t,n){try{const r=this;var o=r;var i=t;var a=o.recordOptions.requestNormalization(n);if(a){i+=JSON.stringify(a)}var u=r.records[i];switch(s(u)){case"object":{var c=JSON.parse(JSON.stringify(u));var f={data:c};if(f.data.error||f.data.Error){return Promise.reject(d({responseText:JSON.stringify(c)}))}return e(f)}case"string":return e({data:u});case"undefined":{throw new h("No recording found for request '"+i+"' in file "+r.recordOptions.path)}default:throw new h("Don't know how to serialize recording data of type "+s(u))}}catch(e){return Promise.reject(e)}}},{key:"_defaultRequestNormalization",value:function e(r){if(r===null){return""}if(s(r)==="object"&&l(r,"SessionID")){delete r.SessionID}if(s(r)==="object"&&l(r,"SessionTimestamp")){delete r.SessionTimestamp}return r}}]);return t}();var w=function(){function t(e){var r;a(this,t);this.csrf=e.csrf;this.csrfByPassCache=e.csrfByPassCache||false;this.csrfToken=null;this.csrfFetchRequest=e.csrfFetchRequest||null;this.getLanguage=e===null||e===void 0?void 0:e.getLanguage;this.recordOptions={headers:e.recordingHeaders,mode:(r=e.recordingMode)!==null&&r!==void 0?r:p.NONE,path:e.recordingPath,requestNormalization:e.requestNormalization};this.authorization=undefined;if(e.authorization){this.authorization={user:e.authorization.user,password:e.authorization.password}}if(typeof window!=="undefined"&&this.recordOptions.mode!==p.NONE){throw new Error("Record/Replay is only supported on Node.js")}}c(t,[{key:"getJsonHeaders",value:function e(){var r={"Content-Type":"application/json",Accept:"application/json"};this.addLanguageToHeader(r);return r}},{key:"getXmlHeaders",value:function e(){var r={"Content-Type":"application/xml",Accept:"application/xml"};this.addLanguageToHeader(r);return r}},{key:"addLanguageToHeader",value:function e(r){if(typeof this.getLanguage==="function"){try{r["Accept-Language"]=this.getLanguage()}catch(e){throw d(e)}}}},{key:"getJson",value:function r(t){try{const r=this;return e(r.request({headers:r.getJsonHeaders(),method:"GET",url:t}),function(e){if(typeof e.data==="string"){e.data=JSON.parse(e.data)}return e})}catch(e){return Promise.reject(e)}}},{key:"getXML",value:function r(t){try{const r=this;return e(r.request({headers:r.getXmlHeaders(),method:"GET",url:t}),function(e){return e.data})}catch(e){return Promise.reject(e)}}},{key:"postJson",value:function r(t,n){try{const r=this;return e(r.request({headers:r.getJsonHeaders(),method:"POST",url:t,data:JSON.stringify(n)}),function(e){if(typeof e.data==="string"){e.data=JSON.parse(e.data)}return e})}catch(e){return Promise.reject(e)}}},{key:"mergeJson",value:function r(t,n){try{const r=this;return e(r.request({headers:r.getJsonHeaders(),method:"MERGE",url:t,data:JSON.stringify(n)}),function(e){if(typeof e.data==="string"){e.data=JSON.parse(e.data)}return e})}catch(e){return Promise.reject(e)}}},{key:"putJson",value:function r(t,n){try{var o=require("fs");return e(new Promise(function(e,r){o.writeFile(t,JSON.stringify(n,null,4),"utf8",function(t){if(t){r(t)}else{e()}})}))}catch(e){return Promise.reject(e)}}},{key:"_fetchCsrf",value:function e(){if(this.csrfFetchRequestPromise){return this.csrfFetchRequestPromise}this.csrfFetchRequest.headers=this.csrfFetchRequest.headers||{};this.csrfFetchRequest.headers["x-csrf-token"]="fetch";this.csrfFetchRequest.parameters=this.csrfFetchRequest.parameters||{};if(this.csrfByPassCache){this.csrfFetchRequest.parameters._=Date.now()}this.csrfFetchRequestPromise=f(this.csrfFetchRequest).then(function(e){this.csrfFetchRequestPromise=null;if(e.headers["set-cookie"]){this.cookies=e.headers["set-cookie"].join("; ")}this.csrfToken=e.headers["x-csrf-token"];return e}.bind(this));return this.csrfFetchRequestPromise}},{key:"_requestWithCsrf",value:function t(n,o){try{let t=false;const i=this;if(v(i.csrfFetchRequest.url,i.csrfFetchRequest.parameters)===v(n.url,n.parameters)){return e(i._fetchCsrf())}return e(r(function(){if(o&&!i.csrfToken){return e(i._fetchCsrf(),function(){const e=i._requestWithCsrf(n,false);t=true;return e})}},function(e){if(t)return e;n.headers=n.headers||{};if(i.cookies){n.headers.Cookie=i.cookies}n.headers["x-csrf-token"]=i.csrfToken;return f(n)["catch"](function(e){if(o&&e&&e.responseHeaders&&e.responseHeaders["x-csrf-token"]&&e.responseHeaders["x-csrf-token"].toLowerCase()==="required"){return this._fetchCsrf().then(function(){return this._requestWithCsrf(n,false)}.bind(this))}return Promise.reject(e)}.bind(i))}))}catch(e){return Promise.reject(e)}}},{key:"request",value:function t(n){try{let t=false;const o=this;n.headers=Object.assign({},n.headers,o.recordOptions.headers);if(o.authorization!==undefined){if(typeof Buffer==="function"){n.headers.Authorization="Basic "+Buffer.from(o.authorization.user+":"+o.authorization.password).toString("base64")}else if(window&&typeof window.btoa==="function"){n.headers.Authorization="Basic "+window.btoa(o.authorization.user+":"+o.authorization.password)}}return e(r(function(){if(!o.csrf){if(o.cookies){n.headers.Cookie=o.cookies}return e(f(n),function(e){t=true;return e})}},function(r){if(t)return r;if(!o.csrfFetchRequest){o.csrfFetchRequest=n}return e(o._requestWithCsrf(n,true))}))}catch(e){return Promise.reject(e)}}}]);return t}();var q={__esModule:true};q.RecordingMode=p;q.parseHeaders=y;q.encodeUrlParameters=m;q.addEncodedUrlParameters=v;q.Client=O;return q})})();