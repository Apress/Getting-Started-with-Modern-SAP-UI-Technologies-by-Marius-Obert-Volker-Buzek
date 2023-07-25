/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/core/ResizeHandler","./NativeViewport","sap/ui/core/Core"],function(t,e,i,n){"use strict";var r=t.extend("sap.ui.vk.RedlineGesturesHandler",{metadata:{library:"sap.ui.vk",publicMethods:["beginGesture","move","endGesture","click","doubleClick","contextMenu","getViewport"]},constructor:function(t){this._redlineDesign=t;this._x=0;this._y=0;this._d=0;this._zoomFactor=1;this._gesture=false}});r.prototype.destroy=function(){this._redlineDesign=null;this._rect=null;this._gesture=false};r.prototype._getOffset=function(t){var e=t.getBoundingClientRect();return{x:e.left+window.pageXOffset,y:e.top+window.pageYOffset}};r.prototype._inside=function(t,e){var i=e.getDomRef(),n=false;if(i!==null){var r=this._getOffset(i);var o={x:r.x,y:r.y,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height};n=t.x>=o.x&&t.x<=o.x+o.width&&t.y>=o.y&&t.y<=o.y+o.height}return n};r.prototype._onresize=function(t){this._gesture=false};r.prototype.beginGesture=function(t){var e=this.getViewport();if(this._inside(t,e)){this._gesture=true;this._x=t.x;this._y=t.y;this._d=t.d;this._initd=t.d;t.handled=true}return this};r.prototype._pan=function(t){var e=this.getViewport(),i=t.x-this._x,n=t.y-this._y;if(i||n){this._x=t.x;this._y=t.y;var r=e.getPanningRatio();e.firePan({deltaX:i*r,deltaY:n*r});e.getRedlineElements().forEach(function(t){t.setOriginX(t.getOriginX()+e._toVirtualSpace(i));t.setOriginY(t.getOriginY()+e._toVirtualSpace(n))});this._manualRender(e)}};r.prototype._zoom=function(t){var e=this.getViewport(),n=1;var r=t.d-this._d;this._d=t.d;if(this._initd>0){n=1+r*(1/this._initd)}else if(t.n===2){if(t.points[0].y>t.points[1].y){n=Math.max(1-r*.005,.333)}else{n=Math.min(1+r*.005,3)}}n=Math.min(Math.max(n,.88),1.12);var o=e._getTargetViewport();var s=32;var a=1/8;if(o instanceof i){s=o._getZoomInLimit();a=o._getZoomOutLimit();this._zoomFactor=o._getZoomFactor()}n=Math.min(Math.max(this._zoomFactor*n,a),s)/this._zoomFactor;this._zoomFactor*=n;var h=this._getOffset(e.getDomRef());var u=1-n,g=e._toVirtualSpace(t.x-h.x,t.y-h.y);e.getRedlineElements().forEach(function(t){t.applyZoom(n);var e=t.getOriginX(),i=t.getOriginY();e+=(g.x-e)*u;i+=(g.y-i)*u;t.setOriginX(e);t.setOriginY(i)});this._manualRender(e);e.fireZoom({originX:t.x-h.x,originY:t.y-h.y,zoomFactor:n})};r.prototype.move=function(t){if(this.getViewport().getDomRef()){if(t.n===1||t.n===2){this._pan(t)}if(t.n===2&&!t.buttons){this._zoom(t)}}t.handled=true;return this};r.prototype._manualRender=function(t){if(sap.ui.Device.browser.msie||sap.ui.Device.browser.edge){t.invalidate()}else{var e=n.createRenderManager();t.getRedlineElements().forEach(function(t){t.render(e)});e.flush(t.getDomRef(),false,false);e.destroy();var i=t.$();i.html(i.html())}};r.prototype.endGesture=function(t){this._gesture=false;t.handled=true;return this};r.prototype.contextMenu=function(t){t.handled=true};r.prototype.getViewport=function(){return this._redlineDesign};return r});