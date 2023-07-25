/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/EventProvider"],function(t){"use strict";var e=t.extend("sap.ui.vk.tools.TooltipToolHandler",{metadata:{library:"sap.ui.vk"},constructor:function(t){this._priority=0;this._tool=t;this._rect=null}});e.prototype.destroy=function(){this._tool=null;this._rect=null};e.prototype.hover=function(t){var e=this._tool.getGizmo();if(e&&this._inside(t)&&this.getViewport().getScene()){var o=this._tool._viewport.hitTest(t.x-this._rect.x,t.y-this._rect.y);if(o&&o.object){o=o.object}e.update(t.x-this._rect.x,t.y-this._rect.y,t.x,t.y,o);t.handled=o!=null}};e.prototype.beginGesture=function(t){};e.prototype.move=function(t){};e.prototype.endGesture=function(t){};e.prototype.click=function(t){};e.prototype.doubleClick=function(t){};e.prototype.contextMenu=function(t){};e.prototype.getViewport=function(){return this._tool._viewport};e.prototype._getOffset=function(t){var e=t.getBoundingClientRect();var o={x:e.left+window.pageXOffset,y:e.top+window.pageYOffset};return o};e.prototype._inside=function(t){var e=this._tool._viewport.getIdForLabel();var o=document.getElementById(e);if(o==null){return false}var i=this._getOffset(o);this._rect={x:i.x,y:i.y,w:o.offsetWidth,h:o.offsetHeight};return t.x>=this._rect.x&&t.x<=this._rect.x+this._rect.w&&t.y>=this._rect.y&&t.y<=this._rect.y+this._rect.h};return e});