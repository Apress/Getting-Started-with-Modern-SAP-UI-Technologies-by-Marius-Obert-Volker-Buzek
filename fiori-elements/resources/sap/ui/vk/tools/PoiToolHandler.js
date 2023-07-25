/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/EventProvider","../thirdparty/three"],function(t,e){"use strict";var i=t.extend("sap.ui.vk.tools.PoiToolHandler",{metadata:{library:"sap.ui.vk"},constructor:function(t){this._priority=30;this._tool=t;this._gizmo=t.getGizmo();this._rect=null;this._poiIndex=-1;this._mouse=new e.Vector2}});i.prototype._updateMouse=function(t){var i=this.getViewport().getRenderer().getSize(new e.Vector2);this._mouse.x=(t.x-this._rect.x)/i.width*2-1;this._mouse.y=(t.y-this._rect.y)/i.height*-2+1};i.prototype._updateActivePOI=function(t){this._poiIndex=-1;if(t.n===1||t.event&&t.event.type==="contextmenu"){var i=this._tool._viewport.getDomRef().getBoundingClientRect();var s=this._tool._viewport.hitTest(t.x-i.left,t.y-i.top);if(s&&s.object){this._poiZ=(new e.Vector3).setFromMatrixPosition(s.object.matrixWorld).project(this.getViewport().getCamera().getCameraRef()).z;for(var o=0,r=this._gizmo.getPOICount();o<r;o++){if(this._gizmo.getPOI(o)===s.object){this._poiIndex=o;break}}}}};i.prototype._getDragPosition=function(){return new e.Vector3(this._mouse.x,this._mouse.y,this._poiZ).unproject(this.getViewport().getCamera().getCameraRef())};i.prototype.click=function(t){if(this._inside(t)&&!this._gesture){this._updateMouse(t);this._updateActivePOI(t,true);this._gizmo.selectPOI(this._poiIndex);t.handled|=this._poiIndex>=0}};i.prototype.beginGesture=function(t){if(this._inside(t)&&!this._gesture){this._updateMouse(t);this._updateActivePOI(t);if(this._poiIndex>=0){this._gesture=true;t.handled=true;this._gizmo.selectPOI(this._poiIndex);this._gizmo.beginGesture();this._dragOrigin=this._getDragPosition()}}};i.prototype._setOffset=function(t){if(isFinite(t.x)&&isFinite(t.y)&&isFinite(t.z)){this._gizmo._setOffset(t,this._poiIndex)}};i.prototype.move=function(t){if(this._gesture){t.handled=true;this._updateMouse(t);if(isFinite(this._dragOrigin.x)&&isFinite(this._dragOrigin.y)&&isFinite(this._dragOrigin.z)){this._setOffset(this._getDragPosition().sub(this._dragOrigin))}}};i.prototype.endGesture=function(t){if(this._gesture){this._gesture=false;t.handled=true;this._updateMouse(t);this._gizmo.endGesture();this._dragOrigin=undefined;this._updateActivePOI(t);this.getViewport().setShouldRenderFrame()}};i.prototype.getViewport=function(){return this._tool._viewport};i.prototype._getOffset=function(t){var e=t.getBoundingClientRect();var i={x:e.left+window.pageXOffset,y:e.top+window.pageYOffset};return i};i.prototype._inside=function(t){if(this._rect===null||true){var e=this._tool._viewport.getIdForLabel();var i=document.getElementById(e);if(i===null){return false}var s=this._getOffset(i);this._rect={x:s.x,y:s.y,w:i.offsetWidth,h:i.offsetHeight}}return t.x>=this._rect.x&&t.x<=this._rect.x+this._rect.w&&t.y>=this._rect.y&&t.y<=this._rect.y+this._rect.h};return i});