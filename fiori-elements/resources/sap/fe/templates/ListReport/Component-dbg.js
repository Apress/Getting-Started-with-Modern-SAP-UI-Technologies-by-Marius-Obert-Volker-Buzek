/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport","sap/fe/templates/ListComponent"],function(e,r){"use strict";var t,i,n,a,l,o,u,s,c,f,p,b,d;var y=e.property;var m=e.defineUI5Class;function v(e,r,t,i){if(!t)return;Object.defineProperty(e,r,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function w(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function h(e,r){e.prototype=Object.create(r.prototype);e.prototype.constructor=e;z(e,r)}function z(e,r){z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(r,t){r.__proto__=t;return r};return z(e,r)}function g(e,r,t,i,n){var a={};Object.keys(i).forEach(function(e){a[e]=i[e]});a.enumerable=!!a.enumerable;a.configurable=!!a.configurable;if("value"in a||a.initializer){a.writable=true}a=t.slice().reverse().reduce(function(t,i){return i(e,r,t)||t},a);if(n&&a.initializer!==void 0){a.value=a.initializer?a.initializer.call(n):void 0;a.initializer=undefined}if(a.initializer===void 0){Object.defineProperty(e,r,a);a=null}return a}function j(e,r){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let O=(t=m("sap.fe.templates.ListReport.Component",{library:"sap.fe.templates",manifest:"json"}),i=y({type:"object"}),n=y({type:"boolean",defaultValue:true}),a=y({type:"object"}),l=y({type:"boolean",defaultValue:false}),o=y({type:"boolean",defaultValue:false}),t(u=(s=function(e){h(r,e);function r(){var r;for(var t=arguments.length,i=new Array(t),n=0;n<t;n++){i[n]=arguments[n]}r=e.call(this,...i)||this;v(r,"views",c,w(r));v(r,"stickyMultiTabHeader",f,w(r));v(r,"keyPerformanceIndicators",p,w(r));v(r,"hideFilterBar",b,w(r));v(r,"useHiddenFilterBar",d,w(r));return r}return r}(r),c=g(s.prototype,"views",[i],{configurable:true,enumerable:true,writable:true,initializer:null}),f=g(s.prototype,"stickyMultiTabHeader",[n],{configurable:true,enumerable:true,writable:true,initializer:null}),p=g(s.prototype,"keyPerformanceIndicators",[a],{configurable:true,enumerable:true,writable:true,initializer:null}),b=g(s.prototype,"hideFilterBar",[l],{configurable:true,enumerable:true,writable:true,initializer:null}),d=g(s.prototype,"useHiddenFilterBar",[o],{configurable:true,enumerable:true,writable:true,initializer:null}),s))||u);return O},false);