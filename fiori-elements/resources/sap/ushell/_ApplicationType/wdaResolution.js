// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/deepExtend","sap/base/util/ObjectPath","sap/ui/thirdparty/URI","sap/ushell/_ApplicationType/systemAlias","sap/ushell/_ApplicationType/utils"],function(s,e,a,t,n){"use strict";function r(e,a){return new Promise(function(t,r){var i=s({},e);if(a.length>0){i["sap-ushell-defaultedParameterNames"]=[JSON.stringify(a)]}delete i["sap-system"];sap.ushell.Container.getServiceAsync("ShellNavigation").then(function(s){s.compactParams(i,["sap-xapp-state","sap-ushell-defaultedParameterNames","sap-intent-params","sap-iframe-hint","sap-keep-alive","sap-wd-configId"],undefined,true).fail(function(s){r(s)}).done(function(s){var e=n.getURLParsing().paramsToString(s);t(e)})}).catch(function(s){r(s)})})}function i(s,e){var a=s.search();if(e){a=a+(a.indexOf("?")<0?"?":"&")+e}return s.search(a).toString()}function p(e,r,i,p,l){var m,c,f,d,y,v=s({},p);if(r){v["sap-wd-configId"]=r}if(v["sap-system"]){m=v["sap-system"][0];delete v["sap-system"]}if(v.hasOwnProperty("sap-system-src")){c=v["sap-system-src"][0];delete v["sap-system-src"]}y=n.getURLParsing().paramsToString(v);if(i){f=u(e,y)}else{f=o(e,y)}d=new a(f);return t.spliceSapSystemIntoURI(d,t.LOCAL_SYSTEM_ALIAS,m,c,"WDA",t.SYSTEM_ALIAS_SEMANTICS.apply,l)}function u(s,e){return"/ui2/nwbc/~canvas;window=app/wda/"+s+"/"+"?"+e}function o(s,e){var a=s.indexOf("/")!==0;if(a){s="sap/"+s}return"/webdynpro/"+s+"?"+e}function l(s,e,a,t){var r={"sap-system":a,url:e,text:s.title,applicationType:"NWBC"};if(typeof t==="string"){r["sap-system-src"]=t}n.setSystemAlias(r,s.resolutionResult);["additionalInformation","applicationDependencies"].forEach(function(e){if(s.resolutionResult.hasOwnProperty(e)){r[e]=s.resolutionResult[e]}});r.url=n.appendParametersToUrl("sap-iframe-hint="+(r.url.indexOf("/ui2/nwbc/")>=0?"NWBC":"WDA"),r.url);return r}function m(s,a,t){var n=e.get("inbound.resolutionResult",s),u=s.mappedIntentParamsPlusSimpleDefaults||{};var o=n.systemAlias;if(u["sap-system"]){o=u["sap-system"][0]}var m;if(u["sap-system-src"]){m=u["sap-system-src"][0]}var c={"sap-system":[o]};if(typeof m==="string"){c["sap-system-src"]=[m]}var f=n["sap.wda"].compatibilityMode;if(f===undefined){f=true}return new Promise(function(e,a){p(n["sap.wda"].applicationId,n["sap.wda"].configId,f,c,t).done(function(t){var n=s.mappedIntentParamsPlusSimpleDefaults;r(n,s.mappedDefaultedParamNames).then(function(a){var r=i(t,a);var p=n["sap-system"]&&n["sap-system"][0];var u=n["sap-system-src"]&&n["sap-system-src"][0];var o=l(s.inbound,r,p,u);e(o)},function(s){a(s)})}).fail(function(s){a(s)})})}function c(s,e,n){var p=s.inbound,u=p&&p.resolutionResult,o=s.mappedIntentParamsPlusSimpleDefaults;var m=new a(e);var c=o["sap-system"]&&o["sap-system"][0];var f=o["sap-system-src"]&&o["sap-system-src"][0];return Promise.all([new Promise(function(s,e){t.spliceSapSystemIntoURI(m,u.systemAlias,c,f,"WDA",u.systemAliasSemantics||t.SYSTEM_ALIAS_SEMANTICS.applied,n).fail(e).done(s)}),r(o,s.mappedDefaultedParamNames)]).then(function(s){var e=s[0];var a=s[1];var t=i(e,a);var n=l(p,t,c,f);return n},function(s){return Promise.reject(s)})}function f(s,a,t,r){var i=s.params["sap-ui2-wd-app-id"][0];var u=(e.get("params.sap-ui2-wd-conf-id",s)||[])[0];var o=Object.keys(s.params).reduce(function(e,a){if(a!=="sap-ui2-wd-app-id"&&a!=="sap-ui2-wd-conf-id"){e[a]=s.params[a]}return e},{});return new Promise(function(e,l){p(i,u,r,o,t).done(function(t){var r=s.params.hasOwnProperty("sap-system-src")&&s.params["sap-system-src"][0];var p=s.params.hasOwnProperty("sap-system")&&s.params["sap-system"][0];var u={url:t.toString(),applicationType:"NWBC",text:i,additionalInformation:"","sap-system":p};if(typeof r==="string"){u["sap-system-src"]=r}if(a&&a.inbound&&a.inbound.resolutionResult&&a.inbound.resolutionResult["sap.platform.runtime"]){u["sap.platform.runtime"]=a.inbound.resolutionResult["sap.platform.runtime"]}u.url=n.appendParametersToUrl("sap-iframe-hint="+(u.url.indexOf("/ui2/nwbc/")>=0?"NWBC":"WDA"),u.url);e(u)}).fail(function(s){l(s)})})}return{resolveEasyAccessMenuIntentWDA:f,constructFullWDAResolutionResult:m,constructWDAResolutionResult:c}},false);