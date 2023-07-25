/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport","sap/ui/core/Control"],function(e,t){"use strict";var r,i,n,o,l,a,u,s,c,p,f;var b=e.property;var d=e.implementInterface;var y=e.defineUI5Class;var m=e.aggregation;function h(e,t,r,i){if(!r)return;Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(i):void 0})}function v(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function g(e,t){e.prototype=Object.create(t.prototype);e.prototype.constructor=e;w(e,t)}function w(e,t){w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,r){t.__proto__=r;return t};return w(e,t)}function _(e,t,r,i,n){var o={};Object.keys(i).forEach(function(e){o[e]=i[e]});o.enumerable=!!o.enumerable;o.configurable=!!o.configurable;if("value"in o||o.initializer){o.writable=true}o=r.slice().reverse().reduce(function(r,i){return i(e,t,r)||r},o);if(n&&o.initializer!==void 0){o.value=o.initializer?o.initializer.call(n):void 0;o.initializer=undefined}if(o.initializer===void 0){Object.defineProperty(e,t,o);o=null}return o}function z(e,t){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let j=(r=y("sap.fe.core.controls.FormElementWrapper"),i=d("sap.ui.core.IFormContent"),n=b({type:"sap.ui.core.CSSSize",defaultValue:null}),o=b({type:"boolean",defaultValue:false}),l=m({type:"sap.ui.core.Control",multiple:false,isDefault:true}),r(a=(u=function(e){g(t,e);function t(){var t;for(var r=arguments.length,i=new Array(r),n=0;n<r;n++){i[n]=arguments[n]}t=e.call(this,...i)||this;h(t,"__implements__sap_ui_core_IFormContent",s,v(t));h(t,"width",c,v(t));h(t,"formDoNotAdjustWidth",p,v(t));h(t,"content",f,v(t));return t}var r=t.prototype;r.getAccessibilityInfo=function e(){const t=this.content;return t&&t.getAccessibilityInfo?t.getAccessibilityInfo():{}};t.render=function e(t,r){t.openStart("div",r);t.style("min-height","1rem");t.style("width",r.width);t.openEnd();t.openStart("div");t.style("display","flex");t.style("box-sizing","border-box");t.style("justify-content","space-between");t.style("align-items","center");t.style("flex-wrap","wrap");t.style("align-content","stretch");t.style("width","100%");t.openEnd();t.renderControl(r.content);t.close("div");t.close("div")};return t}(t),s=_(u.prototype,"__implements__sap_ui_core_IFormContent",[i],{configurable:true,enumerable:true,writable:true,initializer:function(){return true}}),c=_(u.prototype,"width",[n],{configurable:true,enumerable:true,writable:true,initializer:null}),p=_(u.prototype,"formDoNotAdjustWidth",[o],{configurable:true,enumerable:true,writable:true,initializer:null}),f=_(u.prototype,"content",[l],{configurable:true,enumerable:true,writable:true,initializer:null}),u))||a);return j},false);