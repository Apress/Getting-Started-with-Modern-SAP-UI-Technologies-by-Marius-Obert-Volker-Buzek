/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../abgrToColor","../ObjectType","../thirdparty/three","../NodeContentType","./ThreeUtils"],function(e,t,i,a,r){"use strict";i.Object3D.prototype.defaultEmissive={r:.0235,g:.0235,b:.0235};i.Object3D.prototype.defaultSpecular={r:.0602,g:.0602,b:.0602};i.Object3D.prototype._vkCalculateObjectOrientedBoundingBox=function(){r.computeObjectOrientedBoundingBox(this,this.userData.boundingBox=new i.Box3)};i.Object3D.prototype._vkTraverseNodeGeometry=function(e){e(this);for(var t=0,i=this.children.length;t<i;t++){var a=this.children[t];if(a.geometry!==undefined&&a.userData.skipIt){if(a.children){a._vkTraverseNodeGeometry(e)}else{e(a)}}else if(a.children){a._vkTraverseNodeGeometry(e)}}};i.Object3D.prototype._vkSetHighlightColor=function(e){this._vkTraverseNodeGeometry(function(t){t.userData.highlightingColor=e;t._vkUpdateMaterialColor()})};i.Object3D.prototype._vkSetTintColor=function(e){this._vkTraverseNodeGeometry(function(t){t.userData.tintColor=e;t._vkUpdateMaterialColor()})};i.Object3D.prototype._vkSetOpacity=function(e,t){this.userData.opacity=e;var i;var a;if(t){i=new Map;a=new Map;t.forEach(function(e){if(!e.node||!e.parent){return}i.set(e.node,e);if(e.parent){var t=a.get(e.parent);if(!t){t=[]}t.push(e);a.set(e.parent,t)}})}this._vkTraverseNodes(function(e){e._vkUpdateMaterialOpacity(i)},i,a)};i.Object3D.prototype._vkUpdateMaterialColor=function(){if(!this.material||!this.material.color){return}var t=this.userData;if(t.originalMaterial){if(t.originalMaterial.color.r===undefined){t.originalMaterial=null}else if(t.originalMaterial.map!==this.material.map||t.originalMaterial.bumpMap!==this.material.bumpMap||t.originalMaterial.alphaMap!==this.material.alphaMap||t.originalMaterial.envMap!==this.material.envMap||t.originalMaterial.emissiveMap!==this.material.emissiveMap||t.originalMaterial.aoMap!==this.material.aoMap){this.material=t.originalMaterial.clone()}else{this.material.color.copy(t.originalMaterial.color);if(this.material.emissive!==undefined){this.material.emissive.copy(t.originalMaterial.emissive)}if(this.material.specular!==undefined){this.material.specular.copy(t.originalMaterial.specular)}}}if(t.highlightColor!==undefined||t.tintColor!==undefined||t.highlightingColor!==undefined){if(!t.originalMaterial){t.originalMaterial=this.material;this.material=this.material.clone()}if(t.highlightingColor!==undefined){var a=new i.Color;a.fromArray(t.highlightingColor).lerp(t.originalMaterial.color,1-t.highlightingColor[3]);this.material.color.copy(a)}var r;if(t.tintColor!==undefined){r=e(t.tintColor);this.material.color.lerp(new i.Color(r.red/255,r.green/255,r.blue/255),r.alpha);if(this.material.emissive!==undefined){if(this.material.userData.defaultHighlightingEmissive){this.material.emissive.copy(this.material.userData.defaultHighlightingEmissive)}else{this.material.emissive.copy(i.Object3D.prototype.defaultEmissive)}}if(this.material.specular!==undefined){if(this.material.userData.defaultHighlightingSpecular){this.material.specular.copy(this.material.userData.defaultHighlightingSpecular)}else{this.material.specular.copy(i.Object3D.prototype.defaultSpecular)}}}if(t.highlightColor!==undefined){r=e(t.highlightColor);this.material.color.lerp(new i.Color(r.red/255,r.green/255,r.blue/255),r.alpha);if(this.material.emissive!==undefined&&t.highlightColor!==0){if(this.material.userData.defaultHighlightingEmissive){this.material.emissive.copy(this.material.userData.defaultHighlightingEmissive)}else{this.material.emissive.copy(i.Object3D.prototype.defaultEmissive)}}if(this.material.specular!==undefined&&t.highlightColor!==0){if(this.material.userData.defaultHighlightingSpecular){this.material.specular.copy(this.material.userData.defaultHighlightingSpecular)}else{this.material.specular.copy(i.Object3D.prototype.defaultSpecular)}}}}this._vkUpdateMaterialOpacity()};i.Object3D.prototype._vkUpdateMaterialOpacity=function(e){if(!this.material){return}var t=this.userData;if(t.originalMaterial){this.material.opacity=t.originalMaterial.opacity;this.material.transparent=t.originalMaterial.transparent}var i=1;var a=false;var r=this;do{var o=null,n=null;if(e){n=e.get(r)}if(n&&n.opacity!=null){o=n.opacity}else if(r.userData&&r.userData.opacity!==undefined){o=r.userData.opacity}var s=1;if(n&&n.opacity!=null&&r.userData&&r.userData.offsetOpacity!=null){s=r.userData.offsetOpacity}if(o!=null){i*=o;i*=s;a=true}if(n&&n.parent){r=n.parent;continue}r=r.parent}while(r);if(a||this.renderOrder>0){if(!t.originalMaterial){t.originalMaterial=this.material;this.material=this.material.clone()}if(this.renderOrder>0){this.material.depthTest=false;this.material.transparent=true}if(this.material.opacity){this.material.opacity*=i;this.material.transparent=t.originalMaterial.transparent||this.material.opacity<.99}}};i.Object3D.prototype._vkGetTotalOpacity=function(e){var t;if(e){t=new Map;e.forEach(function(e){if(!e.node||!e.parent){return}t.set(e.node,e)})}var i=1;var a=this;do{var r=null,o=null;if(t){o=t.get(a)}if(o&&o.opacity!=null){r=o.opacity}else if(a.userData&&a.userData.opacity!==undefined){r=a.userData.opacity}var n=1;if(o&&o.opacity!=null&&a.userData&&a.userData.offsetOpacity!=null){n=a.userData.offsetOpacity}if(r!=null){i*=r;i*=n}if(o&&o.parent){a=o.parent;continue}a=a.parent}while(a);return i};i.Object3D.prototype._vkTraverseMeshNodes=function(e){if(this._vkUpdate!==undefined||this.isDetailView){return}e(this);var t=this.children;for(var i=0,a=t.length;i<a;i++){t[i]._vkTraverseMeshNodes(e)}};i.Object3D.prototype._vkTraverseNodes=function(e,t,i){e(this);var a;if(i){a=i.get(this)}var r;if(a){for(r=0;r<a.length;r++){a[r].node._vkTraverseNodes(e,t,i)}}var o=this.children;if(o){for(r=0;r<o.length;r++){var n=o[r];if(t){var s=t.get(n);if(s){continue}}n._vkTraverseNodes(e,t,i)}}};function o(e,t){var i=e.min,a=e.max,r=t.elements,o=(i.x+a.x)*.5,n=(i.y+a.y)*.5,s=(i.z+a.z)*.5,l=a.x-o,h=a.y-n,p=a.z-s;var u=r[0]*o+r[4]*n+r[8]*s+r[12];var c=r[1]*o+r[5]*n+r[9]*s+r[13];var f=r[2]*o+r[6]*n+r[10]*s+r[14];var d=Math.abs(r[0]*l)+Math.abs(r[4]*h)+Math.abs(r[8]*p);var m=Math.abs(r[1]*l)+Math.abs(r[5]*h)+Math.abs(r[9]*p);var v=Math.abs(r[2]*l)+Math.abs(r[6]*h)+Math.abs(r[10]*p);i.set(u-d,c-m,f-v);a.set(u+d,c+m,f+v)}i.Object3D.prototype._expandBoundingBox=function(e,t,a,r){var n=new i.Box3;function s(i){var a=i.geometry;if(a!==undefined){var r=i.userData.renderGroup;if(r&&r.boundingBox){n.setFromPackedArray(r.boundingBox)}else{if(!a.boundingBox){a.computeBoundingBox()}n.copy(a.boundingBox)}if(!n.isEmpty()){o(n,i.matrixWorld);if(isFinite(n.min.x)&&isFinite(n.min.y)&&isFinite(n.min.z)&&isFinite(n.max.x)&&isFinite(n.max.y)&&isFinite(n.max.z)){e.min.min(n.min);e.max.max(n.max)}}}var s=i.userData.boundingBox;if(s!==undefined&&s.min&&s.max&&!s.isEmpty()&&!t){n.copy(s);o(n,i.matrixWorld);e.min.min(n.min);e.max.max(n.max)}}function l(e){if(e._vkUpdate!==undefined&&(a||r&&e.userData.is2D)){return}if(!t||e.visible){s(e);var i=e.children;for(var o=0,n=i.length;o<n;o++){l(i[o])}}}l(this);return e};i.Object3D.prototype._vkPersistentId=function(){var e=this;do{if(e.userData.treeNode&&e.userData.treeNode.sid){return e.userData.treeNode.sid}e=e.parent}while(e);return null};i.Object3D.prototype._vkSetNodeContentType=function(e){this.userData.nodeContentType=e;if(e===a.Reference){this.visible=false;this.userData.skipIt=true}else if(e===a.Background){this.userData.renderStage=-1}else if(e===a.Symbol){this.userData.renderStage=1;this.updateMatrix();this.updateMatrixWorld(true);this.userData.direction=(new i.Vector3).setFromMatrixColumn(this.matrixWorld,2).normalize()}};i.Object3D.prototype._vkGetNodeContentType=function(){return this.userData.nodeContentType};i.Camera.prototype._vkZoomTo=function(e,t){t=t||0;var a=new i.Vector3;e.getSize(a);if(a.lengthSq()===0){return this}var r=e.min,o=e.max;var n=[new i.Vector3(r.x,r.y,r.z),new i.Vector3(o.x,o.y,o.z),new i.Vector3(r.x,r.y,o.z),new i.Vector3(r.x,o.y,o.z),new i.Vector3(o.x,r.y,o.z),new i.Vector3(o.x,o.y,r.z),new i.Vector3(r.x,o.y,r.z),new i.Vector3(o.x,r.y,r.z)];var s=new i.Matrix4,l=new i.Vector3,h=new i.Box2;function p(e){n.forEach(function(t){l=t.project(e);h.expandByPoint(new i.Vector2(l.x,l.y))})}var u=this.view;if(u&&u.enabled){p(this);var c=u.offsetX+u.width*(.5+.25*(h.min.x+h.max.x));var f=u.offsetY+u.height*(.5-.25*(h.min.y+h.max.y));var d=Math.max(h.max.x-h.min.x,h.max.y-h.min.y)*.5*(1+t);u.width*=d;u.height*=d;u.offsetX=c-u.width*.5;u.offsetY=f-u.height*.5;return this}function m(e){s.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse);for(var t in n){l.copy(n[t]).applyMatrix4(s);if(l.x<-1||l.x>1||l.y<-1||l.y>1){return false}}return true}var v=new i.Vector3;e.getCenter(v);var y=new i.Vector3;this.getWorldDirection(y);y.multiplyScalar(a.length());this.position.copy(v).sub(y);this.updateMatrixWorld(true);if(this.isPerspectiveCamera){while(!m(this)){this.position.sub(y);this.updateMatrixWorld(true)}var g=10;var x=this.position.clone();var M=v.clone();for(var D=0;D<g;D++){this.position.copy(x).add(M).multiplyScalar(.5);this.updateMatrixWorld(true);if(m(this)){x.copy(this.position)}else{M.copy(this.position)}}this.position.copy(x).sub(v).multiplyScalar(t).add(x);this.updateMatrixWorld(true)}else if(this.isOrthographicCamera){p(this);this.zoom/=Math.max(h.max.x-h.min.x,h.max.y-h.min.y)*.5*(1+t);this.updateProjectionMatrix()}return this};i.Mesh.prototype._vkClone=function(){var e=new i.Mesh;r.disposeMaterial(e.material);e.copy(this);return e}});