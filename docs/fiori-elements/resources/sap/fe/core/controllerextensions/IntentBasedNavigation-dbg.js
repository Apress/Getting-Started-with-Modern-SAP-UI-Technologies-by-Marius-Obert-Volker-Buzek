/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport","sap/ui/core/mvc/ControllerExtension","sap/ui/core/mvc/OverrideExecution"],function(t,e,n){"use strict";var i,r,o,a,p,u,c,l,s;var f={};var v=t.publicExtension;var d=t.finalExtension;var y=t.extensible;var g=t.defineUI5Class;function b(t,e){t.prototype=Object.create(e.prototype);t.prototype.constructor=t;O(t,e)}function O(t,e){O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function t(e,n){e.__proto__=n;return e};return O(t,e)}function x(t,e,n,i,r){var o={};Object.keys(i).forEach(function(t){o[t]=i[t]});o.enumerable=!!o.enumerable;o.configurable=!!o.configurable;if("value"in o||o.initializer){o.writable=true}o=n.slice().reverse().reduce(function(n,i){return i(t,e,n)||n},o);if(r&&o.initializer!==void 0){o.value=o.initializer?o.initializer.call(r):void 0;o.initializer=undefined}if(o.initializer===void 0){Object.defineProperty(t,e,o);o=null}return o}let C;(function(t){t["Default"]="default";t["Initiator"]="initiator"})(C||(C={}));f.ContextStrategy=C;let P=(i=g("sap.fe.core.controllerextensions.IntentBasedNavigation"),r=v(),o=y(n.After),a=v(),p=y(n.After),u=d(),c=v(),i(l=(s=function(t){b(e,t);function e(){return t.apply(this,arguments)||this}var n=e.prototype;n.adaptContextPreparationStrategy=function t(e){return C.Default};n.adaptNavigationContext=function t(e,n){};n.navigateOutbound=function t(e,n){var i,r;const o=(i=this.base)===null||i===void 0?void 0:i.getView().getBindingContext("internal");o.setProperty("externalNavigationContext",{page:false});(r=this.base)===null||r===void 0?void 0:r._intentBasedNavigation.navigateOutbound(e,n)};return e}(e),x(s.prototype,"adaptContextPreparationStrategy",[r,o],Object.getOwnPropertyDescriptor(s.prototype,"adaptContextPreparationStrategy"),s.prototype),x(s.prototype,"adaptNavigationContext",[a,p],Object.getOwnPropertyDescriptor(s.prototype,"adaptNavigationContext"),s.prototype),x(s.prototype,"navigateOutbound",[u,c],Object.getOwnPropertyDescriptor(s.prototype,"navigateOutbound"),s.prototype),s))||l);return P},false);