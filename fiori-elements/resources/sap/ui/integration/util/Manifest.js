/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Manifest","sap/base/util/deepClone","sap/base/util/deepExtend","sap/base/util/each","sap/base/util/isPlainObject","sap/base/util/isEmptyObject","sap/base/Log","./ParameterMap","sap/ui/integration/util/CardMerger"],function(e,t,s,i,n,r,o,a,f,u){"use strict";var c="/{SECTION}/configuration/parameters",h="/{SECTION}/configuration/filters",p="/{SECTION}",l="/sap.app/dataSources",d=/\{\{(?!parameters.)(?!destinations.)(?!csrfTokens.)([^\}\}]+)\}\}|\{i18n>([^\}]+)\}/g;var g=e.extend("sap.ui.integration.util.Manifest",{constructor:function(i,n,r,o){e.call(this);this._aChanges=o;this._sSection=i;this.PARAMETERS=c.replace("{SECTION}",i);this.FILTERS=h.replace("{SECTION}",i);this.CONFIGURATION=p.replace("{SECTION}",i);if(n){var f={},u;f.process=false;this._oInitialJson=s(n,500);if(r){f.baseUrl=r;this._sBaseUrl=r}else{a.warning("If no base URL is provided when the manifest is an object static resources cannot be loaded.")}if(this._aChanges){u=this.mergeDeltaChanges(n)}else{u=n}this._oManifest=new t(u,f);this.oJson=this._oManifest.getRawJson()}}});g.prototype.mergeDeltaChanges=function(e){return u.mergeCardDelta(e,this._aChanges,this._sSection)};g.prototype.getJson=function(){return this._unfreeze(this.oJson)};g.prototype.setJson=function(e){y(e);this.oJson=e};g.prototype.getInitialJson=function(){return this._oInitialJson};g.prototype.get=function(e){return this._unfreeze(M(this.oJson,e))};g.prototype.getUrl=function(){return this._oManifest.resolveUri("./","manifest")};g.prototype.getResourceBundle=function(){return this.oResourceBundle};g.prototype._unfreeze=function(e){if(typeof e==="object"){return JSON.parse(JSON.stringify(e))}return e};g.prototype.destroy=function(){this.oJson=null;this.oResourceBundle=null;if(this._oManifest){this._oManifest.destroy()}this._bIsDestroyed=true};g.prototype.isDestroyed=function(){return this._bIsDestroyed};g.prototype.load=function(e){if(!e||!e.manifestUrl){if(this._sBaseUrl&&this._oManifest){return this.loadI18n().then(function(){this.processManifest()}.bind(this))}else{if(this._oManifest){this.processManifest()}return new Promise(function(e){e()})}}return t.load({manifestUrl:e.manifestUrl,async:true,processJson:function(e){this._oInitialJson=s(e,500);if(this._aChanges){return this.mergeDeltaChanges(e)}return e}.bind(this)}).then(function(e){this._oManifest=e;this.oJson=this._oManifest.getRawJson();return this.loadI18n().then(function(){this.processManifest()}.bind(this))}.bind(this))};g.prototype.loadDependenciesAndIncludes=function(){return this._oManifest.loadDependenciesAndIncludes(true)};g.prototype.loadI18n=function(){var e=false;t.processObject(this._oManifest.getJson(),function(t,s,i){if(!e&&i.match(d)){e=true}});if(this.get("/sap.app/i18n")){e=true}if(!e){return Promise.resolve()}return this._oManifest._loadI18n(true).then(function(e){this.oResourceBundle=e}.bind(this))};g.prototype.processManifest=function(){var e=0,t=15,s=i({},this._oManifest.getRawJson()),n=this.get(l);O(s,this.oResourceBundle,e,t,this._oCombinedParams,n,this._oCombinedFilters);this.setJson(s)};function y(e){if(e&&typeof e==="object"&&!Object.isFrozen(e)){Object.freeze(e);for(var t in e){if(e.hasOwnProperty(t)){y(e[t])}}}}function b(e){return typeof e==="string"&&e.match(d)&&e.indexOf("{{")===0&&e.indexOf("}}")===e.length-2}function _(e){return typeof e==="string"&&(e.indexOf("{{parameters.")>-1||e.indexOf("{{dataSources")>-1||e.indexOf("{{filters.")>-1)}g._processPlaceholder=function(e,t,s,i){var n=f.processPredefinedParameter(e),r,a;if(!o(t)){for(var u in t){r=t[u].value;a="{{parameters."+u;n=m(n,r,a)}}if(s){n=m(n,s,"{{dataSources")}if(i){n=m(n,i,"{{filters")}return n};function m(e,t,s){if(r(t)||Array.isArray(t)){for(var i in t){e=m(e,t[i],s+"."+i)}}else if(e.includes(s+"}}")){e=e.replace(new RegExp(s+"}}","g"),t)}return e}function O(e,t,s,i,n,r,o){if(s===i){return}if(Array.isArray(e)){e.forEach(function(e,a,f){if(typeof e==="object"){O(e,t,s+1,i,n,r,o)}else if(_(e)){f[a]=g._processPlaceholder(e,n,r,o)}else if(b(e)&&t){f[a]=t.getText(e.substring(2,e.length-2))}},this)}else{for(var a in e){if(typeof e[a]==="object"){O(e[a],t,s+1,i,n,r,o)}else if(_(e[a])){e[a]=g._processPlaceholder(e[a],n,r,o)}else if(b(e[a])&&t){e[a]=t.getText(e[a].substring(2,e[a].length-2))}}}}function M(e,t){if(t==="/"){return e}if(e&&t&&typeof t==="string"&&t[0]==="/"){var s=t.substring(1).split("/"),i;for(var n=0,r=s.length;n<r;n++){i=s[n];e=e.hasOwnProperty(i)?e[i]:undefined;if(e===null||typeof e!=="object"){if(n+1<r&&e!==undefined){e=undefined}break}}return e}return e&&e[t]}g.prototype.processFilters=function(e){if(!this._oManifest){return}var t=this.get(this.FILTERS),s={};if(e.size&&!t){a.error("If runtime filters are set, they have to be defined in the manifest configuration as well.");return}n(t,function(t,i){var n=e.get(t)||i.value;s[t]=n});this._oCombinedFilters=s;this.processManifest()};g.prototype.processParameters=function(e){if(!this._oManifest){return}var t=this.get(this.PARAMETERS);if(!o(e)&&!t){a.error("If parameters property is set, parameters should be described in the manifest");return}this._oCombinedParams=this._syncParameters(e,t);this.processManifest()};g.prototype.getProcessedParameters=function(e){var t=this.get(this.PARAMETERS),s=this._syncParameters(e,t);O(s,this.oResourceBundle,0,15,e);return s};g.prototype._syncParameters=function(e,t){if(o(e)){return t}var i=s(t||{},500),n=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(i);for(var a=0;a<r.length;a++){for(var f=0;f<n.length;f++){if(r[a]===n[f]){i[r[a]].value=e[n[f]]}}}return i};g.prototype.findDataSections=function(e){var t=[],s;if(!e){e=this.get(this.CONFIGURATION)}if(!r(e)){return[]}if(e.data){t.push(e.data)}for(s in e){if(e[s]){t=t.concat(this.findDataSections(e[s]))}}return t};return g});