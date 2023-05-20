/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Tool","./CreateTextToolHandler","./CreateTextToolGizmo"],function(t,e,i){"use strict";var o=t.extend("sap.ui.vk.tools.CreateTextTool",{metadata:{library:"sap.ui.vk",properties:{parentNode:{type:"any",defaultValue:null},fontSize:{type:"string",defaultValue:"14"},fontFace:{type:"string",defaultValue:"Verdana,Arial,Helvetica,sans-serif"}},events:{completed:{parameters:{node:{type:"any"},request:{type:"any"}}}}},constructor:function(i,s){if(o._instance){return o._instance}t.apply(this,arguments);this._viewport=null;this._handler=new e(this);o._instance=this}});o.prototype.init=function(){if(t.prototype.init){t.prototype.init.call(this)}this.setFootprint(["sap.ui.vk.svg.Viewport"]);this.setAggregation("gizmo",new i)};o.prototype.setActive=function(e,i,o){t.prototype.setActive.call(this,e,i,o);var s=this._viewport;if(s){if(e){this._gizmo=this.getGizmo();if(this._gizmo){this._gizmo.show(s,this)}this._addLocoHandler()}else{this._removeLocoHandler();if(this._gizmo){this._gizmo.hide();this._gizmo=null}}}return this};o.prototype.setMaterial=function(t,e,i){this._material=t;this._lineStyle=e;this._fillStyle=i};o.prototype._editText=function(t){if(this._gizmo){this._gizmo._editText(t)}};o.prototype.queueCommand=function(t){if(this._addLocoHandler()){if(this.isViewportType("sap.ui.vk.svg.Viewport")){t()}}return this};o.prototype.setParentNode=function(t){if(t===this.getParentNode()){return this}this.setProperty("parentNode",t,true);if(this._gizmo){this._gizmo.updateParentNode()}return this};return o});