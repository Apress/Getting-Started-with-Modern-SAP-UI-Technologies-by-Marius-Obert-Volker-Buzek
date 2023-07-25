/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/strings/capitalize","sap/base/util/each","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectObserver","sap/ui/core/Core","sap/ui/core/EventBus","./library"],function(t,e,i,s,o,n,r){"use strict";var a=i.extend("sap.ui.vk.Core",{metadata:{library:"sap.ui.vk",aggregations:{eventBus:{type:"sap.ui.core.EventBus",multiple:false,visibility:"hidden"}}},constructor:function(){if(r.getCore){return r.getCore()}i.call(this);var t=this;r.getCore=function(){return t};this.setAggregation("eventBus",new n)}});a.prototype.getEventBus=function(){return this.getAggregation("eventBus")};function c(e,i){if(i.multiple){return(e==="insert"?"onAdd":"onRemove")+t(i.singularName)}else{return(e==="insert"?"onSet":"onUnset")+t(i.name)}}function u(i,s,o){var n=o.getId();i.forEach(function(i){e(i.getMetadata().getAllAssociations(),function(e,r){if(o.isA(r.type)){var a=i["get"+t(e)]();if(a===n||Array.isArray(a)&&a.indexOf(n)>=0){var u=i[c(s,r)];if(typeof u==="function"){u.call(i,o)}}}})})}a.prototype.observeLifetime=function(t){if(!this._lifetimeObserver){this._lifetimeObserver=new s(function(t){if(t.type==="destroy"&&this._objectsWithAssociations){u(this._objectsWithAssociations.slice(),"remove",t.object)}}.bind(this))}this._lifetimeObserver.observe(t,{destroy:true});if(this._objectsWithAssociations){u(this._objectsWithAssociations.slice(),"insert",t)}return this};a.prototype.observeAssociations=function(i){if(!i.getId()){throw new Error("To observe an object it must have an ID.")}if(!this._objectsWithAssociations){var n=this;this._objectsWithAssociations=[];this._associationObserver=new s(function(i){var s=n._objectsWithAssociations.indexOf(i.object);if(s<0){return}if(i.type==="destroy"){e(i.object.getMetadata().getAllAssociations(),function(e,s){var o;var n=t(s.name);if(s.multiple){o=i.object["removeAll"+n];if(typeof o==="function"){o.call(i.object)}}else{o=i.object["set"+n];if(typeof o==="function"){o.call(i.object,null)}}});n._objectsWithAssociations.splice(s,1)}else if(i.type==="association"){var r=i.object.getMetadata().getAllAssociations()[i.name];var a=i.object[c(i.mutation,r)];if(typeof a==="function"){if(Array.isArray(i.ids)){i.ids.map(function(t){return o.byId(t)}).filter(function(t){return t!=null}).forEach(a.bind(i.object))}else{var u=o.byId(i.ids);if(u){a.call(i.object,u)}}}}})}if(this._objectsWithAssociations.indexOf(i)<0){this._objectsWithAssociations.push(i);this._associationObserver.observe(i,{associations:true,destroy:true});e(i.getMetadata().getAllAssociations(),function(e,s){var n=i[c("insert",s)];if(typeof n==="function"){var r=i["get"+t(e)]();if(Array.isArray(r)){r.map(function(t){return o.byId(t)}).filter(function(t){return t!=null}).forEach(n.bind(i))}else{var a=o.byId(r);if(a){n.call(i,a)}}}})}return this};return new a});