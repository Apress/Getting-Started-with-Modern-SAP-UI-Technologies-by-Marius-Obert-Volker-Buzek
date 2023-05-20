/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../thirdparty/three","sap/ui/base/ManagedObject","./PolylineGeometry","./PolylineMaterial","./PolylineMesh","../LeaderLineMarkStyle"],function(e,t,r,a,s,i){"use strict";var n=t.extend("sap.ui.vk.threejs.Thrustline",{metadata:{library:"sap.ui.vk",properties:{node:{type:"object"},renderOrder:{type:"int",defaultValue:0},depthTest:{type:"boolean",defaultValue:true},principleAxis:{type:"object",defaultValue:new e.Vector3(0,0,0)},material:{type:"object"},items:{type:"object[]"},segments:{type:"object[]"}}}});n.prototype.init=function(){if(t.prototype.init){t.prototype.init.call(this)}this._needUpdateMeshes=false};n.prototype.setNode=function(t){if(t instanceof e.Object3D){this.setProperty("node",t,true);this._needUpdateMeshes=true}return this};n.prototype.setRenderOrder=function(e){this.setProperty("renderOrder",e,true);this._needUpdateMeshes=true;return this};n.prototype.setDepthTest=function(e){this.setProperty("depthTest",e,true);this._needUpdateMeshes=true;return this};n.prototype.setMaterial=function(t){if(t instanceof e.Material){this.setProperty("material",t,true);this._needUpdateMeshes=true}return this};n.prototype.setItems=function(e){this.setProperty("items",e,true);this._needUpdateMeshes=true;return this};n.prototype.setSegments=function(e){this.setProperty("segments",e,true);this._needUpdateMeshes=true;return this};n.prototype._updateMeshes=function(t){var i=this.getNode();var n=this.getMaterial();var o=this.getDepthTest();var p=this.getRenderOrder();var l=n&&n.userData.lineStyle?n.userData.lineStyle:{};var d=l.width;var h=l.dashPatternScale;if(l.widthCoordinateSpace===3){d=d?d*t.y:1;h=h?h*t.y:1}d=d||1;l.haloWidth=l.haloWidth||0;l.endCapStyle=l.endCapStyle||0;this.getSegments().forEach(function(t){if(t.polylineMesh){i.remove(t.polylineMesh);t.polylineMesh=null}if(t.haloMesh){i.remove(t.haloMesh);t.haloMesh=null}var u=[];for(var y=0,c=t.ratios.length;y<c;y++){u.push(new e.Vector3)}var f=new r;f.setVertices(u);var v=l.endCapStyle||u.length>2?1:0;var m=(v&&l.endCapStyle===0?1:0)|(v&&l.endCapStyle===0?2:0);if(l.haloWidth>0){var M=new a({color:16777215,lineColor:16777215,linewidth:d*(l.haloWidth*2+1),dashCapStyle:l.endCapStyle,segmentCapStyle:v,trimStyle:m,transparent:true,depthTest:o});var g=new s(f,M);g.matrixAutoUpdate=false;g.renderOrder=p;g.userData.skipIt=true;t.haloMesh=g;i.add(g)}var S=new a({color:16777215,lineColor:n.color,linewidth:d,dashCapStyle:l.endCapStyle,segmentCapStyle:v,trimStyle:m,dashPattern:l.dashPattern||[],dashScale:h||1,transparent:true,depthTest:o,polygonOffset:true,polygonOffsetFactor:-4});var w=new s(f,S);w.matrixAutoUpdate=false;w.renderOrder=p;w.userData.skipIt=true;t.polylineMesh=w;i.add(w)})};var o=new e.Matrix4,p=new e.Matrix4,l=new e.Vector3,d=new e.Vector3,h=new e.Vector3,u=new e.Vector3;n.prototype._update=function(t,r,a){var s=this.getNode();if(!s||!s.visible){return}if(this._needUpdateMeshes){this._needUpdateMeshes=false;this._updateMeshes(a)}o.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse);p.copy(o);var i=r instanceof e.PerspectiveCamera?r.near:undefined;var n=this.getItems();l.copy(this.getPrincipleAxis()).normalize();this.getSegments().forEach(function(t){var r=t.polylineMesh;if(r){var s=r.geometry;var o=n[t.startItemIndex];var y=(new e.Vector3).copy(o.boundPoints[t.startBoundIndex]).applyMatrix4(o.target.matrixWorld);var c=n[t.endItemIndex];var f=(new e.Vector3).copy(c.boundPoints[t.endBoundIndex]).applyMatrix4(c.target.matrixWorld);d.copy(f).sub(y);h.copy(l).multiplyScalar(d.dot(l));u.copy(d).sub(h);var v=s.vertices;var m=[];for(var M=0,g=t.ratios.length;M<g;M++){m.push(M);var S=t.ratios[M];var w=v[M];w.copy(y);d.copy(h).multiplyScalar(S.x);w.add(d);d.copy(u).multiplyScalar(S.y);w.add(d)}s._updateVertices(m);r.material.resolution.copy(a);r.computeLineDistances(p,a,i)}var x=t.haloMesh;if(x){x.material.resolution.copy(a);x.computeLineDistances(p,a,i)}})};return n});