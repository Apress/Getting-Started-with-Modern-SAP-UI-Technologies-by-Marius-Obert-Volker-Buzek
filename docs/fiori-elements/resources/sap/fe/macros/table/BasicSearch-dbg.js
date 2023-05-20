/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport","sap/m/SearchField","sap/ui/core/Control"],function(e,r,t){"use strict";var i,n,a,l,o,u,c,s,f,p,d;var b=e.implementInterface;var _=e.event;var h=e.defineUI5Class;var m=e.aggregation;function v(e,r,t,i){if(!t)return;Object.defineProperty(e,r,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function g(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function y(e,r){e.prototype=Object.create(r.prototype);e.prototype.constructor=e;w(e,r)}function w(e,r){w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(r,t){r.__proto__=t;return r};return w(e,r)}function z(e,r,t,i,n){var a={};Object.keys(i).forEach(function(e){a[e]=i[e]});a.enumerable=!!a.enumerable;a.configurable=!!a.configurable;if("value"in a||a.initializer){a.writable=true}a=t.slice().reverse().reduce(function(t,i){return i(e,r,t)||t},a);if(n&&a.initializer!==void 0){a.value=a.initializer?a.initializer.call(n):void 0;a.initializer=undefined}if(a.initializer===void 0){Object.defineProperty(e,r,a);a=null}return a}function C(e,r){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let O=(i=h("sap.fe.macros.table.BasicSearch"),n=b("sap.ui.mdc.IFilter"),a=_(),l=_(),o=m({type:"sap.ui.core.Control",multiple:false}),i(u=(c=function(e){y(t,e);function t(){var r;for(var t=arguments.length,i=new Array(t),n=0;n<t;n++){i[n]=arguments[n]}r=e.call(this,...i)||this;v(r,"__implements__sap_ui_mdc_IFilter",s,g(r));r.__implements__sap_ui_mdc_IFilterSource=true;v(r,"filterChanged",f,g(r));v(r,"search",p,g(r));v(r,"filter",d,g(r));return r}var i=t.prototype;i.init=function e(){this.setAggregation("filter",new r({placeholder:"{sap.fe.i18n>M_FILTERBAR_SEARCH}",search:()=>{this.fireEvent("search")}}))};i.getConditions=function e(){return undefined};i.getSearch=function e(){return this.filter.getValue()};i.validate=function e(){return Promise.resolve()};t.render=function e(r,t){r.openStart("div",t);r.openEnd();r.renderControl(t.filter);r.close("div")};return t}(t),s=z(c.prototype,"__implements__sap_ui_mdc_IFilter",[n],{configurable:true,enumerable:true,writable:true,initializer:function(){return true}}),f=z(c.prototype,"filterChanged",[a],{configurable:true,enumerable:true,writable:true,initializer:null}),p=z(c.prototype,"search",[l],{configurable:true,enumerable:true,writable:true,initializer:null}),d=z(c.prototype,"filter",[o],{configurable:true,enumerable:true,writable:true,initializer:null}),c))||u);return O},false);