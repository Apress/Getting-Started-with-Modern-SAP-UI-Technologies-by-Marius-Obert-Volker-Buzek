/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/util/merge","sap/base/util/ObjectPath","sap/base/util/uid","sap/ui/base/Metadata","sap/ui/core/mvc/ControllerMetadata"],function(t,e,n,r,i){"use strict";var o={};const a=function(e){e.metadata=t({controllerExtensions:{},properties:{},aggregations:{},associations:{},methods:{},events:{},interfaces:[]},e.metadata||{});return e.metadata};function s(t){return function(e,n){if(!e.override){e.override={}}let r=e.override;if(t){if(!r.extension){r.extension={}}if(!r.extension[t]){r.extension[t]={}}r=r.extension[t]}r[n.toString()]=e[n.toString()]}}o.methodOverride=s;function c(t){return function(e,n){const r=a(e);if(!r.methods[n.toString()]){r.methods[n.toString()]={}}r.methods[n.toString()].overrideExecution=t}}o.extensible=c;function u(){return function(t,e,n){const r=a(t);n.enumerable=true;if(!r.methods[e.toString()]){r.methods[e.toString()]={}}r.methods[e.toString()].public=true}}o.publicExtension=u;function f(){return function(t,e,n){const r=a(t);n.enumerable=true;if(!r.methods[e.toString()]){r.methods[e.toString()]={}}r.methods[e.toString()].public=false}}o.privateExtension=f;function d(){return function(t,e,n){const r=a(t);n.enumerable=true;if(!r.methods[e.toString()]){r.methods[e.toString()]={}}r.methods[e.toString()].final=true}}o.finalExtension=d;function l(t){return function(e,n,r){const i=a(e);delete r.initializer;i.controllerExtensions[n.toString()]=t;return r}}o.usingExtension=l;function g(){return function(t,e){const n=a(t);if(!n.events[e.toString()]){n.events[e.toString()]={}}}}o.event=g;function p(t){return function(e,n,r){const i=a(e);if(!i.properties[n]){i.properties[n]=t}delete r.writable;delete r.initializer;return r}}o.property=p;function m(t){return function(e,n,r){const i=a(e);if(t.multiple===undefined){t.multiple=false}if(!i.aggregations[n]){i.aggregations[n]=t}if(t.isDefault){i.defaultAggregation=n}delete r.writable;delete r.initializer;return r}}o.aggregation=m;function h(t){return function(e,n,r){const i=a(e);if(!i.associations[n]){i.associations[n]=t}delete r.writable;delete r.initializer;return r}}o.association=h;function v(t){return function(e){const n=a(e);n.interfaces.push(t)}}o.implementInterface=v;function b(){return function(t,e){const n=t.constructor;n[e.toString()]=function(){for(var t=arguments.length,r=new Array(t),i=0;i<t;i++){r[i]=arguments[i]}if(r&&r.length){const t=n.getAPI(r[0]);t===null||t===void 0?void 0:t[e.toString()](...r)}}}}o.xmlEventHandler=b;function y(t,e){return function(n){if(!n.prototype.metadata){n.prototype.metadata={}}if(e){for(const t in e){n.prototype.metadata[t]=e[t]}}return E(n,t,n.prototype)}}o.defineUI5Class=y;function x(){return{current:undefined,setCurrent:function(t){this.current=t}}}o.createReference=x;function S(){return function(t,e,n){delete n.writable;delete n.initializer;n.initializer=x;return n}}o.defineReference=S;function E(t,o,a){var s,c,u,f;if(t.getMetadata&&t.getMetadata().isA("sap.ui.core.mvc.ControllerExtension")){Object.getOwnPropertyNames(a).forEach(t=>{const e=Object.getOwnPropertyDescriptor(a,t);if(e&&!e.enumerable){e.enumerable=true}})}const d={};d.metadata=a.metadata||{};d.override=a.override;d.constructor=t;d.metadata.baseType=Object.getPrototypeOf(t.prototype).getMetadata().getName();if((t===null||t===void 0?void 0:(s=t.getMetadata())===null||s===void 0?void 0:s.getStereotype())==="control"){const e=a.renderer||t.renderer||t.render;d.renderer={apiVersion:2};if(typeof e==="function"){d.renderer.render=e}else if(e!=undefined){d.renderer=e}}d.metadata.interfaces=((c=a.metadata)===null||c===void 0?void 0:c.interfaces)||((u=t.metadata)===null||u===void 0?void 0:u.interfaces);Object.keys(t.prototype).forEach(e=>{if(e!=="metadata"){try{d[e]=t.prototype[e]}catch(t){}}});if((f=d.metadata)!==null&&f!==void 0&&f.controllerExtensions&&Object.keys(d.metadata.controllerExtensions).length>0){for(const t in d.metadata.controllerExtensions){d[t]=d.metadata.controllerExtensions[t]}}const l=t.extend(o,d);const g=l.prototype.init;l.prototype.init=function(){if(g){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++){e[n]=arguments[n]}g.apply(this,e)}this.metadata=d.metadata;if(d.metadata.properties){const t=Object.keys(d.metadata.properties);t.forEach(t=>{Object.defineProperty(this,t,{configurable:true,set:e=>this.setProperty(t,e),get:()=>this.getProperty(t)})});const e=Object.keys(d.metadata.aggregations);e.forEach(t=>{Object.defineProperty(this,t,{configurable:true,set:e=>this.setAggregation(t,e),get:()=>{const e=this.getAggregation(t);if(d.metadata.aggregations[t].multiple){return e||[]}else{return e}}})});const n=Object.keys(d.metadata.associations);n.forEach(t=>{Object.defineProperty(this,t,{configurable:true,set:e=>this.setAssociation(t,e),get:()=>{const e=this.getAssociation(t);if(d.metadata.associations[t].multiple){return e||[]}else{return e}}})})}};t.override=function(e){const o={};o.constructor=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++){n[r]=arguments[r]}return t.apply(this,n)};const a=r.createClass(t,`anonymousExtension~${n()}`,o,i);a.getMetadata()._staticOverride=e;a.getMetadata()._override=t.getMetadata()._override;return a};e.set(o,l);return l}return o},false);