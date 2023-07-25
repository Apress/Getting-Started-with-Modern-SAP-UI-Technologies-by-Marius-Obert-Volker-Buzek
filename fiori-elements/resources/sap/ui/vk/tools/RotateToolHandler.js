/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/m/Menu","sap/m/MenuItem","../getResourceBundle","../thirdparty/three","./CoordinateSystem"],function(t,e,i,s,n,o){"use strict";var r=t.extend("sap.ui.vk.tools.RotateToolHandler",{metadata:{library:"sap.ui.vk"},constructor:function(t){this._priority=12;this._tool=t;this._gizmo=t.getGizmo();this._rect=null;this._rayCaster=new n.Raycaster;this._rayCaster.linePrecision=.2;this._handleIndex=-1;this._gizmoIndex=-1;this._matrixOrigin=new n.Matrix4;this._levelingQuaternion=new n.Quaternion;this._mouse=new n.Vector2;this._mouseOrigin=new n.Vector2}});r.prototype._updateMouse=function(t){var e=this.getViewport().getRenderer().getSize(new n.Vector2);this._mouse.x=(t.x-this._rect.x)/e.width*2-1;this._mouse.y=(t.y-this._rect.y)/e.height*-2+1;this._rayCaster.setFromCamera(this._mouse,this.getViewport().getCamera().getCameraRef())};r.prototype._updateHandles=function(t,e){var i=this._handleIndex;this._handleIndex=-1;if(t.n===1||t.event&&t.event.type==="contextmenu"){for(var s=0,n=this._gizmo.getGizmoCount();s<n;s++){var o=this._gizmo.getTouchObject(s);var r=this._rayCaster.intersectObject(o,true);if(r.length>0){this._handleIndex=o.children.indexOf(r[0].object);if(this._handleIndex>=0&&this._handleIndex<3){this._gizmoIndex=s;this._matrixOrigin.copy(o.matrixWorld);this._gizmo._getLevelingQuaternion(this._levelingQuaternion,s);this._objectSize=this._gizmo._getObjectSize(s)/this._gizmo._getGizmoScale(o.position)}}}}this._gizmo.highlightHandle(this._handleIndex,e||this._handleIndex===-1);if(i!==this._handleIndex){this.getViewport().setShouldRenderFrame()}};r.prototype.hover=function(t){if(this._inside(t)&&!this._gesture){this._updateMouse(t);this._updateHandles(t,true);t.handled|=this._handleIndex>=0}};r.prototype.click=function(t){if(this._inside(t)&&!this._gesture){this._updateMouse(t);this._updateHandles(t,true);this._gizmo.selectHandle(this._handleIndex,this._gizmoIndex);t.handled|=this._handleIndex>=0}};r.prototype._getMouseAngle=function(){var t=this._rayCaster.ray;var e=this._rotationPoint.clone().sub(t.origin);var i=this._rotationAxis.dot(e)/this._rotationAxis.dot(t.direction);var s=t.direction.clone().multiplyScalar(i).sub(e).normalize();return Math.atan2(s.dot(this._axis2),s.dot(this._axis1))};r.prototype.beginGesture=function(t){if(this._inside(t)&&!this._gesture){this._updateMouse(t);this._updateHandles(t,false);if(this._handleIndex>=0&&this._handleIndex<3){t.handled=true;this._gesture=true;this._mouseOrigin.copy(t);this._gizmo.selectHandle(this._handleIndex,this._gizmoIndex);this._gizmo.beginGesture();this._axis1=(new n.Vector3).setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+1)%3).normalize();this._axis2=(new n.Vector3).setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+2)%3).normalize();this._rotationAxis=(new n.Vector3).crossVectors(this._axis1,this._axis2).normalize();this._rotationPoint=(new n.Vector3).setFromMatrixPosition(this._matrixOrigin);if(Math.abs(this._rayCaster.ray.direction.dot(this._rotationAxis))<Math.cos(Math.PI*85/180)){var e=this.getViewport().getCamera().getCameraRef().matrixWorld;this._axis1.setFromMatrixColumn(e,0).normalize();this._axis2.setFromMatrixColumn(e,1).normalize();this._rotationAxis.setFromMatrixColumn(e,2).normalize()}this._startAngle=this._getMouseAngle();this._prevDeltaAngle=0}}};r.prototype.move=function(t){if(this._gesture){t.handled=true;this._updateMouse(t);var e=this._startAngle;var i=this._getMouseAngle()-e;if(i>Math.PI){i-=Math.PI*2}else if(i<-Math.PI){i+=Math.PI*2}if(Math.abs(this._prevDeltaAngle)>Math.PI/4){if(this._prevDeltaAngle*i<0){i+=Math.PI*2*Math.sign(this._prevDeltaAngle)}}i=i%(Math.PI*2);var s=e+i;if(this._tool.getEnableStepping()){var o=5;if(this._objectSize>0){var r=[.1,1,5,15];var a=[2e3,1e3,300,0];for(var h=0;h<4;h++){if(this._objectSize>=a[h]){o=r[h];break}}}o=n.MathUtils.degToRad(o);var _=s-e;s+=Math.round(_/o)*o-_}this._prevDeltaAngle=s-e;if(this._tool.getEnableSnapping()){this._tool.getDetector().detect({viewport:this._tool._viewport,gizmo:this._gizmo,detectType:"rotate",handleIndex:this._handleIndex,angle1:e,angle2:s})}if(isFinite(e)&&isFinite(s)){this._gizmo._setRotationAxisAngle(this._handleIndex,e,s)}}};r.prototype.endGesture=function(t){if(this._gesture){this._gesture=false;t.handled=true;this._updateMouse(t);this._gizmo.endGesture();this._updateHandles(t,true);this.getViewport().setShouldRenderFrame()}};r.prototype.contextMenu=function(t){if(!this._tool.getAllowContextMenu()){return}if(this._inside(t)){this._updateMouse(t);this._updateHandles(t,true);if(this._handleIndex>=0){t.handled=true;var n=new e({items:[new i({text:s().getText("TOOL_COORDINATE_SYSTEM_WORLD"),key:o.World}),new i({text:s().getText("TOOL_COORDINATE_SYSTEM_LOCAL"),key:o.Local}),new i({text:s().getText("TOOL_COORDINATE_SYSTEM_SCREEN"),key:o.Screen}),new i({text:s().getText("TOOL_COORDINATE_SYSTEM_CUSTOM"),key:o.Custom})],itemSelected:function(t){var e=t.getParameters("item").item;this._tool.setCoordinateSystem(e.getKey())}.bind(this)});n.openAsContextMenu(t.event,this.getViewport())}}};r.prototype.getViewport=function(){return this._tool._viewport};r.prototype._getOffset=function(t){var e=t.getBoundingClientRect();var i={x:e.left+window.pageXOffset,y:e.top+window.pageYOffset};return i};r.prototype._inside=function(t){if(this._rect===null||true){var e=this._tool._viewport.getIdForLabel();var i=document.getElementById(e);if(i===null){return false}var s=this._getOffset(i);this._rect={x:s.x,y:s.y,w:i.offsetWidth,h:i.offsetHeight}}return t.x>=this._rect.x&&t.x<=this._rect.x+this._rect.w&&t.y>=this._rect.y&&t.y<=this._rect.y+this._rect.h};return r});