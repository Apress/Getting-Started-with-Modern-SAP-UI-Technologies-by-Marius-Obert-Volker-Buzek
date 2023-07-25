/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Event","./Object","./ObjectPool","sap/base/assert"],function(t,e,n,r){"use strict";var i=e.extend("sap.ui.base.EventProvider",{constructor:function(){e.call(this);this.mEventRegistry={}}});var o="EventHandlerChange";i.M_EVENTS={EventHandlerChange:o};i.prototype.oEventPool=new n(t);i.prototype.attachEvent=function(t,e,n,i){var s=this.mEventRegistry;r(typeof t==="string"&&t,"EventProvider.attachEvent: sEventId must be a non-empty string");if(typeof e==="function"){i=n;n=e;e=undefined}r(typeof n==="function","EventProvider.attachEvent: fnFunction must be a function");r(!i||typeof i==="object","EventProvider.attachEvent: oListener must be empty or an object");i=i===this?undefined:i;var a=s[t];if(!Array.isArray(a)){a=s[t]=[]}a.push({oListener:i,fFunction:n,oData:e});if(s[o]){this.fireEvent(o,{EventId:t,type:"listenerAttached",listener:i,func:n,data:e})}return this};i.prototype.attachEventOnce=function(t,e,n,i){if(typeof e==="function"){i=n;n=e;e=undefined}r(typeof n==="function","EventProvider.attachEventOnce: fnFunction must be a function");var o=function(){this.detachEvent(t,o);n.apply(i||this,arguments)};o.oOriginal={fFunction:n,oListener:i,oData:e};this.attachEvent(t,e,o,undefined);return this};i.prototype.detachEvent=function(t,e,n){var i=this.mEventRegistry;r(typeof t==="string"&&t,"EventProvider.detachEvent: sEventId must be a non-empty string");r(typeof e==="function","EventProvider.detachEvent: fnFunction must be a function");r(!n||typeof n==="object","EventProvider.detachEvent: oListener must be empty or an object");var s=i[t];if(!Array.isArray(s)){return this}var a,f;n=n===this?undefined:n;for(var v=0,u=s.length;v<u;v++){if(s[v].fFunction===e&&s[v].oListener===n){a=s[v];s.splice(v,1);break}}if(!a){for(var v=0,u=s.length;v<u;v++){f=s[v].fFunction.oOriginal;if(f&&f.fFunction===e&&f.oListener===n){a=f;s.splice(v,1);break}}}if(s.length==0){delete i[t]}if(a&&i[o]){this.fireEvent(o,{EventId:t,type:"listenerDetached",listener:a.oListener,func:a.fFunction,data:a.oData})}return this};i.prototype.fireEvent=function(t,e,n,r){if(typeof e==="boolean"){r=n;n=e}var i=this,o=false,s,a,f,v,u;do{s=i.mEventRegistry[t];if(Array.isArray(s)){s=s.slice();a=a||this.oEventPool.borrowObject(t,this,e);for(f=0,v=s.length;f<v;f++){u=s[f];u.fFunction.call(u.oListener||i,a,u.oData)}r=r&&!a.bCancelBubble}i=i.getEventingParent()}while(r&&i);if(a){o=a.bPreventDefault;this.oEventPool.returnObject(a)}return n?!o:this};i.prototype.hasListeners=function(t){return!!this.mEventRegistry[t]};i.getEventList=function(t){return t.mEventRegistry};i.hasListener=function(t,e,n,i){r(typeof e==="string"&&e,"EventProvider.hasListener: sEventId must be a non-empty string");r(typeof n==="function","EventProvider.hasListener: fnFunction must be a function");r(!i||typeof i==="object","EventProvider.hasListener: oListener must be empty or an object");var o=t&&t.mEventRegistry[e];if(o){for(var s=0,a=o.length;s<a;s++){if(o[s].fFunction===n&&o[s].oListener===i){return true}}}return false};i.prototype.getEventingParent=function(){return null};i.prototype.toString=function(){if(this.getMetadata){return"EventProvider "+this.getMetadata().getName()}else{return"EventProvider"}};i.prototype.destroy=function(){this.mEventRegistry={};e.prototype.destroy.apply(this,arguments)};return i});