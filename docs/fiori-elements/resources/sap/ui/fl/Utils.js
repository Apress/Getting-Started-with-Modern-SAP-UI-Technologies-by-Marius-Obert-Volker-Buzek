/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/strings/formatMessage","sap/base/util/ObjectPath","sap/base/util/isPlainObject","sap/base/util/uid","sap/base/util/UriParameters","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/base/ManagedObject","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/core/Component","sap/ui/fl/Scenario","sap/ui/thirdparty/hasher","sap/ui/core/mvc/View","sap/ui/core/Configuration"],function(e,t,r,n,a,i,o,s,u,f,p,c,g,l){"use strict";function m(e){if(e&&e.getEntry){return e.getEntry("sap.app")&&e.getEntry("sap.app").type}return e&&e["sap.app"]&&e["sap.app"].type}function h(e,t){if(e&&e.startupParameters&&t){if(Array.isArray(e.startupParameters[t])){return e.startupParameters[t][0]}}}var d={formatAndLogMessage:function(t,r,n,a){var o=r.join(" ");o=e(o,n);i[t](o,a||"")},isVariantByStartupParameter:function(e){if(e){var t=this.getAppComponentForControl(e);if(t&&t.getComponentData){return!!h(t.getComponentData(),"sap-app-id")}}return false},getAppDescriptor:function(e){if(e){var t=this.getAppComponentForControl(e);if(t&&t.getMetadata){var r=t.getMetadata();if(r&&r.getManifestObject){return r.getManifestObject().getJson()}}}},getSiteIdByComponentData:function(e){return h(e,"hcpApplicationId")},isBinding:function(e){return typeof e==="string"&&!!s.bindingParser(e)||r(e)&&((e.hasOwnProperty("path")||e.hasOwnProperty("parts"))&&!e.hasOwnProperty("ui5object"))},isChangeRelatedToVariants:function(e){return e.getFileType()==="ctrl_variant_change"||e.getFileType()==="ctrl_variant_management_change"||e.getFileType()==="ctrl_variant"||e.getVariantReference()},getComponentForControl:function(e){function t(e){var r=f.getOwnerIdFor(e);if(!r){if(e&&typeof e.getParent==="function"){var n=e.getParent();if(n){return t(n)}}}return r||""}if(e){var r=t(e);if(r){return f.get(r)}}},getAppComponentForControl:function(e){var t=e instanceof f?e:d.getComponentForControl(e);if(t&&t.getAppComponent&&t.getAppComponent()instanceof f){return t.getAppComponent()}if(t&&t.oComponentData&&t.oComponentData.appComponent){return t.oComponentData.appComponent}if(t&&t.getManifestEntry){var r=t.getManifestEntry("sap.app");if(r&&r.type&&r.type!=="application"){if(t instanceof f){t=d.getComponentForControl(t)}return this.getAppComponentForControl(t)}}return t},getViewForControl:function(e){if(e instanceof g){return e}if(e&&typeof e.getParent==="function"){e=e.getParent();return d.getViewForControl(e)}},getClient:function(){var e;var t;e=a.fromQuery(window.location.search);t=e.get("sap-client");return t||undefined},getLrepUrl:function(){var e=l.getFlexibilityServices();var t=e.find(function(e){return e.connector==="LrepConnector"});return t?t.url:""},getCurrentLanguage:function(){var e=l.getLanguage();return d.convertBrowserLanguageToISO639_1(e)},convertBrowserLanguageToISO639_1:function(e){if(!e||typeof e!=="string"){return""}var t=e.indexOf("-");if(t<0&&e.length<=2){return e.toUpperCase()}if(t>0&&t<=2){return e.substring(0,t).toUpperCase()}return""},getControlType:function(e){var t;if(e&&typeof e.getMetadata==="function"){t=e.getMetadata();if(t&&typeof t.getElementName==="function"){return t.getElementName()}}},checkControlId:function(e,t){if(!t){e=e instanceof s?e:sap.ui.getCore().byId(e);t=d.getAppComponentForControl(e)}return u.checkControlId(e,t)},hasLocalIdSuffix:u.hasLocalIdSuffix,getParsedURLHash:function(e){if(e){return e.parseShellHash(c.getHash())||{}}return{}},getUrlParameter:function(e){return a.fromQuery(window.location.search).get(e)},getUshellContainer:function(){return t.get("sap.ushell.Container")},createDefaultFileName:function(e){var t=n().replace(/-/g,"_");if(e){t+="_"+e}return t},createNamespace:function(e,t){var r="changes";if(t==="ctrl_variant"){r="variants"}var n=e.reference.replace(".Component","");var a="apps/"+n+"/"+r+"/";return a},buildLrepRootNamespace:function(e,t,r){var n="apps/";var a=new Error("Error in sap.ui.fl.Utils#buildLrepRootNamespace: ");if(!e){a.message+="for every scenario you need a base ID";throw a}switch(t){case p.VersionedAppVariant:if(!r){a.message+="in a versioned app variant scenario you additionally need a project ID";throw a}n+=e+"/appVariants/"+r+"/";break;case p.AppVariant:if(!r){a.message+="in an app variant scenario you additionally need a project ID";throw a}n+=e+"/appVariants/"+r+"/";break;case p.AdaptationProject:if(!r){a.message+="in a adaptation project scenario you additionally need a project ID";throw a}n+=e+"/adapt/"+r+"/";break;case p.FioriElementsFromScratch:case p.UiAdaptation:default:n+=e+"/"}return n},isApplication:function(e){var t=m(e);return t==="application"},isApplicationComponent:function(e){return e instanceof f&&d.isApplication(e.getManifestObject())},isEmbeddedComponent:function(e){return e instanceof f&&m(e.getManifestObject())==="component"},indexOfObject:function(e,t){var r=-1;e.some(function(e,n){var a;var i;if(!e){a=[]}else{a=Object.keys(e)}if(!t){i=[]}else{i=Object.keys(t)}var o=a.length===i.length;var s=o&&!a.some(function(r){return e[r]!==t[r]});if(s){r=n}return s});return r},execPromiseQueueSequentially:function(e,t,r){if(e.length===0){if(r){return Promise.resolve()}return new d.FakePromise}var n=e.shift();if(typeof n==="function"){var a;try{a=n()}catch(e){a=Promise.reject(e)}return a.then(function(){if(!r&&a instanceof Promise){r=true}}).catch(function(e){var r="Error during execPromiseQueueSequentially processing occurred";r+=e?": "+e.message:"";i.error(r,e);if(t){throw new Error(r)}}).then(function(){return this.execPromiseQueueSequentially(e,t,r)}.bind(this))}i.error("Changes could not be applied, promise not wrapped inside function.");return this.execPromiseQueueSequentially(e,t,r)},FakePromise:function(e,t,r){d.FakePromise.fakePromiseIdentifier="sap.ui.fl.Utils.FakePromise";this.vValue=e;this.vError=t;this.bContinueWithFakePromise=arguments.length<3||r===d.FakePromise.fakePromiseIdentifier;var n=function(e,t){try{var r=t(e,d.FakePromise.fakePromiseIdentifier);if(o.isThenable(r)){return r}return new d.FakePromise(r)}catch(e){var n=e;return new d.FakePromise(undefined,n)}};d.FakePromise.prototype.then=function(e,t){if(!this.bContinueWithFakePromise){return Promise.resolve(e(this.vValue))}if(!this.vError){return n(this.vValue,e)}else if(t){return n(this.vError,t)}return this};d.FakePromise.prototype.catch=function(e){if(!this.bContinueWithFakePromise){return Promise.reject(e(this.vError))}if(this.vError){return n(this.vError,e)}return this};if(this.vValue instanceof Promise||this.vValue instanceof d.FakePromise){return this.vValue}},getChangeFromChangesMap:function(e,t){var r;Object.keys(e).forEach(function(n){e[n].some(function(e){if(e.getId()===t){r=e;return true}})});return r},normalizeReference:function(e){return e.replace(/(.Component)$/g,"")},handleUrlParameters:function(e,t,r,n){if(this.hasParameterAndValue(t,r,n)){if(e.startsWith("?")){e=e.substr(1,e.length)}var a=e.split("&").filter(function(e){return e!==t+"="+r});e="";if(a.length>0){e="?"+a.toString()}}else{e+=(e.length>0?"&":"?")+t+"="+r}return e},hasParameterAndValue:function(e,t,r){return this.getParameter(e,r)===t},getParameter:function(e,t){if(t){var r=d.getParsedURLHash(t);return r.params&&r.params[e]&&r.params[e][0]}return d.getUrlParameter(e)},findAggregation:function(e,t){if(e){if(e.getMetadata){var r=e.getMetadata();var n=r.getAllAggregations();if(n){return n[t]}}}return undefined},getAggregation:function(e,t){var r=d.findAggregation(e,t);if(r){return e[r._sGetter]()}return undefined},getProperty:function(e,t){var r=e.getMetadata().getPropertyLikeSetting(t);if(r){var n=r._sGetter;return e[n]()}return undefined},getUShellService:function(e){if(e){var t=this.getUshellContainer();if(t){return t.getServiceAsync(e)}}return Promise.resolve()},getUShellServices:function(e){var t=e.map(function(e){return this.getUShellService(e)}.bind(this));return Promise.all(t).then(function(t){return e.reduce(function(e,r,n){e[r]=t&&t[n];return e},{})})}};return d},true);