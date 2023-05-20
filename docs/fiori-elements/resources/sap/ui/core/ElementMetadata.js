/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/ObjectPath","sap/ui/base/ManagedObjectMetadata","sap/ui/core/Renderer"],function(e,t,r,n){"use strict";var i=Function.prototype.call.bind(Object.prototype.hasOwnProperty);var o=function(e,t){r.apply(this,arguments)};o.prototype=Object.create(r.prototype);o.prototype.constructor=o;o.uid=r.uid;o.prototype.getElementName=function(){return this._sClassName};o.prototype.getRendererName=function(){return this._sRendererName};o.prototype.getRenderer=function(){if(this._oRenderer){return this._oRenderer}var r=this.getRendererName();if(!r){return undefined}this._oRenderer=sap.ui.require(r.replace(/\./g,"/"))||t.get(r);if(this._oRenderer){return this._oRenderer}e.warning("Synchronous loading of Renderer for control class '"+this.getName()+"', due to missing Renderer dependency.","SyncXHR",null,function(){return{type:"SyncXHR",name:r}});this._oRenderer=sap.ui.requireSync(r.replace(/\./g,"/"))||t.get(r);return this._oRenderer};o.prototype.applySettings=function(e){var a=e.metadata;this._sVisibility=a.visibility||"public";var d=i(e,"renderer")?e.renderer||"":undefined;delete e.renderer;r.prototype.applySettings.call(this,e);var s=this.getParent();this._sRendererName=this.getName()+"Renderer";this.dnd=Object.assign({draggable:false,droppable:false},s.dnd,typeof a.dnd=="boolean"?{draggable:a.dnd,droppable:a.dnd}:a.dnd);if(typeof d!=="undefined"){if(typeof d==="string"){this._sRendererName=d||undefined;return}if((typeof d==="object"||typeof d==="function")&&typeof d.render==="function"){var p=sap.ui.require(this.getRendererName().replace(/\./g,"/"))||t.get(this.getRendererName());if(p===d){this._oRenderer=d;return}if(p===undefined&&typeof d.extend==="function"){t.set(this.getRendererName(),d);this._oRenderer=d;return}}if(typeof d==="function"){d={render:d}}var u;if(s instanceof o){u=s.getRenderer()}this._oRenderer=n.extend.call(u||n,this.getRendererName(),d)}};o.prototype.afterApplySettings=function(){r.prototype.afterApplySettings.apply(this,arguments);this.register&&this.register(this)};o.prototype.isHidden=function(){return this._sVisibility==="hidden"};var a=o.prototype.metaFactoryAggregation;function d(e,t,r){a.apply(this,arguments);this.dnd=Object.assign({draggable:false,droppable:false,layout:"Vertical"},typeof r.dnd=="boolean"?{draggable:r.dnd,droppable:r.dnd}:r.dnd)}d.prototype=Object.create(a.prototype);d.prototype.constructor=d;o.prototype.metaFactoryAggregation=d;o.prototype.getDragDropInfo=function(e){if(!e){return this.dnd}var t=this._mAllAggregations[e]||this._mAllPrivateAggregations[e];if(!t){return{}}return t.dnd};return o},true);