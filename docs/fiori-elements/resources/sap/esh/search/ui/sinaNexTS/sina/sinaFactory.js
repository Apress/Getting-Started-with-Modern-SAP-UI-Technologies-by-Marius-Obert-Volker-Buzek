/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){function r(r,e,n){if(n){return e?e(r):r}if(!r||!r.then){r=Promise.resolve(r)}return e?r.then(e):r}function e(r){return function(){for(var e=[],n=0;n<arguments.length;n++){e[n]=arguments[n]}try{return Promise.resolve(r.apply(this,e))}catch(r){return Promise.reject(r)}}}function n(r,e,n){if(n){return e?e(r()):r()}try{var i=Promise.resolve(r());return e?i.then(e):i}catch(r){return Promise.reject(r)}}sap.ui.define(["../core/util","./Sina","../providers/abap_odata/Provider","../providers/hana_odata/Provider","../providers/sample/Provider","../providers/inav2/Provider","../providers/dummy/Provider","../providers/multi/Provider","../core/Log","../core/errors","./SinaConfiguration"],function(i,o,t,a,v,u,s,c,d,f,l){const p=function(r){return n(g,function(e){if(!e){return}if(r.length===1){U(r[0],e)}else{var n=false;for(var i=0;i<r.length;++i){var o=r[i];if(o.provider===D.DUMMY){continue}if(o.provider!==e.provider){r.splice(i,1);i--;continue}n=true;U(o,e)}if(!n){r.splice(0,0,e)}}})};const P=e(function(r,e){const n=this;var i;var o=new d.Log("sinaFactory");e=e||function(){return true};var t=[];i=function(n){if(n>=r.length){return Promise.reject(new _(t.join(", ")))}var a=r[n];t.push(a.provider);return A(a).then(function(r){if(e(r)){return r}return i(n+1)},function(r){o.info(r);return i(n+1)})}.bind(n);return i(0)});const g=e(function(){var r=i.getUrlParameter("sinaConfiguration");if(r){return E(r)}var e=i.getUrlParameter("sinaProvider");return e?E(e):Promise.resolve()});const A=e(function(e){return r(E(e),function(e){if(e.logTarget){d.Log.persistency=e.logTarget}if(typeof e.logLevel!=="undefined"){d.Log.level=e.logLevel}var n=new d.Log("sinaFactory");n.debug("Creating new eshclient instance using provider "+e.provider);var i;switch(e.provider){case D.HANA_ODATA:{i=new m;break}case D.ABAP_ODATA:{i=new b;break}case D.INAV2:{i=new y;break}case D.MULTI:{i=new M;break}case D.SAMPLE:{i=new w;break}case D.DUMMY:{i=new L;break}default:{throw new Error("Unknown Provider: '"+e.provider+"' - Available Providers: "+D.HANA_ODATA+", "+D.ABAP_ODATA+", "+D.INAV2+", "+D.MULTI+", "+D.SAMPLE+", "+D.DUMMY)}}var o=new h(i);return r(o.initAsync(e),function(){return o})})});var h=o["Sina"];var b=t["Provider"];var m=a["Provider"];var w=v["Provider"];var y=u["Provider"];var L=s["Provider"];var M=c["MultiProvider"];var _=f["NoValidEnterpriseSearchAPIConfigurationFoundError"];var D=l["AvailableProviders"];var E=l["_normalizeConfiguration"];if(typeof process!=="undefined"&&process.env&&process.env.NODE_ENV&&process.env.NODE_ENV==="debug"){var N=new d.Log;d.Log.level=d.Severity.DEBUG;N.debug("SINA log level set to debug!")}function T(r,e){var n;return Promise.all(r.map(E.bind(this))).then(function(r){n=r;return p(n)}.bind(this)).then(function(){return P(n,e)}.bind(this))}function U(r,e){for(var n in e){r[n]=e[n]}}var S={__esModule:true};S.createAsync=A;S.createByTrialAsync=T;return S})})();