/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["sap/ui/base/Object","./Utilities","./PolygonHandler","./ModelHandler","./thirdparty/three","./thirdparty/DecalGeometry","./thirdparty/html2canvas","sap/base/Log"],function(e,t,r,i,a,s,n,o){"use strict";var l="sap.ui.vbm.adapter3d.SceneBuilder";var c=a.Matrix4;var d=a.Vector3;var u=a.Math.degToRad;var p=t.toArray;var h=t.toBoolean;var f=t.toVector3;var _=t.createMaterial;var y=t.propertyChanged;var m=t.propertyRemoved;var g=t.propertyAdded;var x=t.updateProperty;var v=t.refCountableDispose;var b;var w;var D=e.extend("sap.ui.vbm.adapter3d.SceneBuilder",{constructor:function(t,a){e.call(this);this._context=t;this._viewport=a;this._root=a.getRoot();this._scene=a.getScene();this._hotInstance=null;this._decalHelper=null;this._targets=new Map;this._instanceDecals=new Map;this._textures=new Map;this._box4=null;this._box6=null;this._cylinder=null;this._cylinderCaps=null;this._polygonHandler=new r(this._root);this._modelHandler=new i(this._context.resources,this._textures,this._scene,this._root);this._textureLoader=null}});D.prototype.destroy=function(){this._root=null;this._scene=null;this._viewport=null;this._context=null;this._hotInstance=null;if(this._box4){this._box4.dispose()}if(this._box6){this._box6.dispose()}if(this._cylinder){this._cylinder.dispose()}if(this._cylinderCaps){this._cylinderCaps.dispose()}if(this._decalHelper){this._decalHelper.material.dispose();this._decalHelper.geometry.dispose();this._scene.remove(this._decalHelper);this._decalHelper=null}this._polygonHandler.destroy();this._polygonHandler=null;this._modelHandler.destroy();this._modelHandler=null;this._textures.forEach(function(e){e.dispose()});this._targets.clear();this._targets=null;this._instanceDecals.clear();this._instanceDecals=null;e.prototype.destroy.call(this)};D.prototype.synchronize=function(){var e=this;function t(t){var r=e._textures.get(t);if(!r){e._textures.set(t,null)}}return new Promise(function(r,i){var a=sap.ui.vbm.findInArray(e._context.windows,function(e){return e.type==="default"});var s=a&&sap.ui.vbm.findInArray(e._context.scenes,function(e){return e.id===a.refScene});if(!s){r();return}e._context.scene=s;if(e._context.setupView){var n=e._context.setupView;e._setupView(n.position,n.zoom,n.pitch,n.yaw,n.home,n.flyTo);e._context.setupView=undefined}var o=[];var l=[],c=[];var d=e._context.voQueues.toAdd.get(s)||[];var u=e._context.voQueues.toUpdate.get(s)||[];var p=e._context.voQueues.toRemove.get(s)||[];[].concat(d,u).forEach(function(r){if(r.isModel){e._modelHandler.addModel(r)}if(r.texture&&y(r,"texture")){t(r.texture)}if(r.textureCap&&y(r,"textureCap")){t(r.textureCap)}if(r.isDecal&&r.text&&y(r,["text","size"])){o.push(r)}});e._loadTextures().then(function(){return e._modelHandler.loadModels()}).then(function(){return e._renderTexts(o)}).then(function(){p.forEach(e._removeInstance.bind(e));u.forEach(e._updateInstance.bind(e,c));d.forEach(e._addInstance.bind(e,l));e._polygonHandler.update();e._modelHandler.update();e._scene.updateMatrixWorld(true);c.forEach(e._updateInstance.bind(e,null));l.forEach(e._addInstance.bind(e,null));e._cleanupCache();r()}).catch(function(e){i(e)})})};D.prototype._findMesh=function(e){var t=null;e.traverse(function(e){if(!t&&e.isMesh){t=e}});return t};D.prototype._getGeometrySize=function(){return 2};D.prototype._getZoomFactor=function(e,t){var r=new d;r.subVectors(t,e);return this._getGeometrySize()*2/r.length()};D.prototype._setupView=function(e,t,r,i,a,s){e=f(e||"0;0;0");t=parseFloat(t||"1");if(t===0){t=1}else if(t<0){t=.1}var n=this._getGeometrySize()*2/t;r=parseFloat(r||"0");i=parseFloat(i||"0");r=r%180===0?r+1:r;var o=new c;o.makeRotationX(u(r+180));var l=new c;l.makeRotationZ(u(-(i+180)));var p=new c;p.multiplyMatrices(l,o);var h=new d(0,0,-5);var _=new d(0,0,0);var y=new d;y.subVectors(_,h).normalize();y.multiplyScalar(n);y.applyMatrix4(p);y.add(e);_.add(e);var m={zoom:1,target:new d(-_.x,-_.z,_.y),position:new d(-y.x,-y.z,y.y)};if(a){this._viewport._setCameraHome(m);this._viewport._applyCamera(m,s)}else{this._viewport._applyCamera(m,s)}};D.prototype._getDecalTextKey=function(e){return e.size+";"+e.text};D.prototype._renderTexts=function(e){var t=[];e.forEach(function(e){if(!this._textures.has(this._getDecalTextKey(e))){t.push(this._renderText(e))}},this);return Promise.all(t)};D.prototype._renderText=function(e){var r=this;return new Promise(function(i,s){var c=f(e.size);if(c.length()<1e-6){o.error("Unable render text to html: decal size is invalid","",l);i()}else{var d=512;var u=c.x/c.y;var p=Math.ceil(u>=1?d:d*u);var h=Math.ceil(u<=1?d:d/u);var _=document.createElement("iframe");_.style.visibility="hidden";_.sandbox="allow-same-origin";_.width=p;_.height=h;document.body.appendChild(_);var y=_.contentDocument||_.contentWindow.document;y.open();y.close();y.body.innerHTML=e.text;var m=document.createElement("canvas");m.width=_.width*window.devicePixelRatio;m.height=_.height*window.devicePixelRatio;m.style.width=_.width+"px";m.style.height=_.height+"px";var g=m.getContext("2d");g.scale(window.devicePixelRatio,window.devicePixelRatio);n(y.body,{canvas:m,width:p,height:h,backgroundColor:null,logging:false}).then(function(s){if(s.width>0&&s.height>0){var n=new a.Texture(s);n.needsUpdate=true;t.addRef(n);r._textures.set(r._getDecalTextKey(e),n)}else{o.error("Failed render text to html","",l)}document.body.removeChild(_);i()})}})};D.prototype._loadTextures=function(){var e=[];this._textures.forEach(function(t,r){if(!t){e.push(this._loadTexture(r))}},this);return Promise.all(e)};D.prototype._loadTexture=function(e){var r=this;var i=this._context.resources.get(e);if(!i){this._textures.delete(e);o.error("Failed to get texture from context",e,l);return Promise.resolve()}return new Promise(function(a,s){r._getTextureLoader().load(t.makeDataUri(i),function(t){t.flipY=false;r._textures.set(e,t);a()},null,function(t){r._textures.delete(e);o.error("Failed to load texture from Data URI: "+e,"status: "+t.status+", status text: "+t.statusText,l);a()})})};D.prototype._cleanupCache=function(){this._textures.forEach(function(e){if(v(e)){e.dispose();this._textures.delete(e)}},this);if(this._box4&&v(this._box4)){this._box4.dispose();this._box4=null}if(this._box6&&v(this._box6)){this._box6.dispose();this._box6=null}if(this._cylinder&&v(this._cylinder)){this._cylinder.dispose();this._cylinder=null}if(this._cylinderCaps&&v(this._cylinderCaps)){this._cylinderCaps.dispose();this._cylinderCaps=null}};D.prototype._addInstance=function(e,t){if(!t.isDecal){this._updateInstanceKeys(t)}if(t.isPolygon){this._polygonHandler.addInstance(t)}else if(t.isModel){this._modelHandler.addInstance(t)}else if(t.isBox){this._assignBoxProperties(t)}else if(t.isCylinder){this._assignCylinderProperties(t)}else if(t.isDecal){if(e){e.push(t)}else{this._assignDecalProperties(t)}}else{o.error("Unable to add instance: instance type is unknown","",l)}};D.prototype._updateInstance=function(e,t){if(!t.isDecal){this._updateInstanceKeys(t)}if(t.isPolygon){this._polygonHandler.updateInstance(t)}else if(t.isModel){this._modelHandler.updateInstance(t)}else if(t.isBox){this._assignBoxProperties(t,t===this._hotInstance)}else if(t.isCylinder){this._assignCylinderProperties(t,t===this._hotInstance)}else if(t.isDecal){if(e){e.push(t)}else{this._assignDecalProperties(t)}}else{o.error("Unable to update instance: instance type is unknown","",l)}};D.prototype._removeInstance=function(e){if(!e.isDecal){this._removeInstanceKeys(e)}if(e.isPolygon){this._polygonHandler.removeInstance(e)}else if(e.isModel){this._modelHandler.removeInstance(e)}else if(e.isBox||e.isCylinder||e.isDecal){if(e.object3D){this._deleteObject3D(e.object3D);e.object3D=null;e._last={};if(e.isDecal&&e.target){var t=this._targets.get(e.target);if(t){this._instanceDecals.get(t).delete(e)}else{o.error("Unable to remove decal from (instance <-> decals) map","",l)}}}else{o.error("Unable to remove instance: object3D is missing","",l)}}else{o.error("Unable to remove instance: instance type is unknown","",l)}if(this._hotInstance===e){this._hotInstance=null}};D.prototype.updateSelection=function(e,t){e.concat(t).forEach(function(e){if(e.isPolygon){this._polygonHandler.updateInstance(e)}else if(e.isModel){this._modelHandler.updateInstance(e)}else if(e.isBox){this._assignBoxProperties(e,e===this._hotInstance)}else if(e.isCylinder){this._assignCylinderProperties(e,e===this._hotInstance)}},this);this._polygonHandler.update();this._modelHandler.update()};D.prototype._updateHotStatus=function(e,t){if(e.isBox){this._assignBoxProperties(e,t)}else if(e.isCylinder){this._assignCylinderProperties(e,t)}};D.prototype.updateHotInstance=function(e){this._polygonHandler.updateHotInstance(e);this._modelHandler.updateHotInstance(e);this._polygonHandler.update();this._modelHandler.update();if(this._hotInstance){this._updateHotStatus(this._hotInstance,false)}if(e){this._updateHotStatus(e,true)}this._hotInstance=e};D.prototype._assignBoxProperties=function(e,r){var i=e.object3D||null;if(!i||y(e,"texture6")){var s=this._getBoxGeometry(h(e.texture6));t.addRef(s);if(i){t.subRef(i.geometry);i.geometry=s}else{i=new a.Mesh(s,_(false));i.matrixAutoUpdate=false;i.layers.set(0);i._sapInstance=e;this._root.add(i);e.object3D=i}}x(e,"texture6");this._assignProperties(e,r)};D.prototype._assignCylinderProperties=function(e,r){var i,s=false,n=h(e.isOpen),c=e.object3D||null;if(!c||y(e,"isOpen")){var d=this._getCylinderGeometry(n);t.addRef(d);if(c){t.subRef(c.geometry);c.geometry=d;if(n){i=c.material[1];if(i.map){t.subRef(i.map);i.dispose()}c.material=c.material[0];c.material.side=a.DoubleSide;c.material.needsUpdate=true}else{i=c.material.clone();i.map=null;c.material=[c.material,i,i];c.material.forEach(function(e){e.needsUpdate=true;e.side=a.FrontSide});s=true}}else{if(n){c=new a.Mesh(d,_(true))}else{i=_(false);c=new a.Mesh(d,[_(false),i,i])}c.matrixAutoUpdate=false;c.layers.set(0);c._sapInstance=e;this._root.add(c);e.object3D=c}}if(y(e,"textureCap")||s){i=Array.isArray(c.material)?c.material[1]:null;if(i){if(i.map){t.subRef(i.map);i.map=null;i.needsUpdate=true}if(e.textureCap){i.map=this._textures.get(e.textureCap);if(i.map){i.needsUpdate=true;t.addRef(i.map)}else{o.error("Unable to apply cap texture on cylinder, texture not found",e.textureCap,l)}}}}x(e,["isOpen","textureCap"]);this._assignProperties(e,r)};D.prototype._assignProperties=function(e,r){var i,s,n=e.object3D;if(y(e,"texture")){s=Array.isArray(n.material)?n.material[0]:n.material;if(s.map){t.subRef(s.map);s.map=null;s.needsUpdate=true}if(e.texture){s.map=this._textures.get(e.texture);if(s.map){s.needsUpdate=true;t.addRef(s.map)}else{o.error("Unable to apply texture, texture not found",e.texture,l)}}}if(y(e,["color","selectColor","VB:s"])||r!==undefined){i=t.getColor(e,e.color,r);t.toArray(n.material).forEach(function(e){e.color.copy(i.rgb);e.opacity=i.opacity;e.transparent=e.opacity<1;e.needsUpdate=true})}var d=n.children.length===0?null:n.children[0];if(m(e,"colorBorder")){d.material.dispose();d.geometry.dispose();n.remove(d)}else if(e.colorBorder){if(g(e,"colorBorder")){var u=e.isBox?new a.EdgesGeometry(n.geometry):new a.EdgesGeometry(n.geometry,60);d=new a.LineSegments(u,t.createLineMaterial());d.matrixAutoUpdate=false;d.layers.set(1);n.add(d)}if(y(e,["colorBorder","selectColor,","VB:s"])||r!==undefined){s=d.material;i=t.getColor(e,e.colorBorder,r);s.color.copy(i.rgb);s.opacity=i.opacity;s.transparent=s.opacity<1;s.needsUpdate=true}}if(y(e,["pos","rot","scale","normalize"])){var p=new c,f=new c;if(h(e.normalize)){n.position.set(0,0,0);n.rotation.set(0,0,0);n.scale.set(1,1,1);n.updateMatrix();t.normalizeObject3D(n,p)}t.getInstanceMatrix(e,f);f.multiply(p);f.decompose(n.position,n.quaternion,n.scale);n.updateMatrix()}x(e,["texture","color","selectColor","VB:s","colorBorder","normalize","pos","rot","scale"])};D.prototype._assignDecalProperties=function(e){var r=false,i;if(y(e,["position","direction","size","rotation","target"])){r=true}if(!e.target&&y(e,["planeOrigin","planeNormal"])){r=true}if(r){if(e.object3D){i=e.object3D.material.clone();this._deleteObject3D(e.object3D);e.object3D=null}var a=this._getDecalTarget(e);if(!a){o.error("Unable to create decal","target is missing",l);return}var s=this._createDecal(e,a,i);this._disposeDecalTarget(e,a);if(!s){return}}if(y(e,["texture","text"])){i=e.object3D.material;if(i.map){t.subRef(i.map);i.map=null}i.map=this._textures.get(e.text?this._getDecalTextKey(e):e.texture);if(i.map){i.map.flipY=true;i.needsUpdate=true;t.addRef(i.map)}else{o.error("Unable to apply texture, texture not found",e.texture,l)}}if(y(e,"target")){var n=this._targets.get(e._last.target);if(n){this._instanceDecals.get(n).delete(e)}n=this._targets.get(e.target);if(n){if(!this._instanceDecals.has(n)){this._instanceDecals.set(n,new Set)}this._instanceDecals.get(n).add(e)}}x(e,["position","direction","size","rotation","target","texture","text","planeOrigin","planeNormal"])};D.prototype._createDecal=function(e,r,i){this._root.updateMatrixWorld(true);var s=f(e.position);var n=f(e.direction).normalize();if(n.length()<1e-6){o.error("Unable create decal: direction is invalid","",l);return false}var c=u(t.toFloat(e.rotation));var d=f(e.size);if(d.length()<1e-6){o.error("Unable create decal: size is invalid","",l);return false}s.applyMatrix4(r.matrixWorld);n.transformDirection(r.matrixWorld);var p=new a.Raycaster(s,n);var h=p.intersectObject(r);if(!h.length){o.error("Unable create decal: cannot project decal to plane","",l);return false}if(!this._decalHelper){this._decalHelper=new a.Mesh(new a.BoxBufferGeometry(1,1,5));this._decalHelper.visible=false;this._decalHelper.layers.set(1);this._decalHelper.up.set(0,1,0);this._scene.add(this._decalHelper)}var _=h[0];var y=_.point;var m=n.clone().negate();var g=(new a.Box3).setFromObject(r);var x=g.max.clone().sub(g.min).length();m.multiplyScalar(x);m.add(y);this._decalHelper.position.copy(y);this._decalHelper.lookAt(m);this._decalHelper.rotation.z+=c;i=i||new a.MeshPhongMaterial({specular:4473924,shininess:0,opacity:.99,transparent:true,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetUnits:.1,polygonOffsetFactor:-1});var v=new a.DecalGeometry(r,y,this._decalHelper.rotation,d);e.object3D=new a.Mesh(v,i);e.object3D.renderOrder=100;e.object3D.matrixAutoUpdate=false;e.object3D.layers.set(1);this._scene.add(e.object3D);return true};D.prototype._createPlane=function(e,t){var r=f(e.planeOrigin);var i=f(e.planeNormal).normalize();if(i.length()<1e-6){o.error("Unable to create plane for decal: normal is invalid","",l);return null}var s=new d(i.x===0?10:-i.x,i.y===0?-10:i.y,i.z===0?10:-i.z);var n=r.clone(r).add(s);n.sub(i.clone().multiplyScalar(i.dot(n.clone().sub(r))));var c=1e4;s=n.clone().sub(r).normalize();var u=i.clone().cross(s).normalize();s.multiplyScalar(c);u.multiplyScalar(c);var p=r.clone().add(s);var h=r.clone().sub(s);var _=r.clone().add(u);var y=r.clone().sub(u);var m=new a.BufferGeometry;m.setAttribute("position",new a.Float32BufferAttribute([p.x,p.y,p.z,_.x,_.y,_.z,h.x,h.y,h.z,h.x,h.y,h.z,y.x,y.y,y.z,p.x,p.y,p.z],3));m.setAttribute("normal",new a.Float32BufferAttribute([i.x,i.y,i.z,i.x,i.y,i.z,i.x,i.y,i.z,i.x,i.y,i.z,i.x,i.y,i.z,i.x,i.y,i.z],3));var g=new a.Mesh(m);t.add(g);return g};D.prototype._getDecalTarget=function(e){if(e.target){var t=this._targets.get(e.target);if(t){if(t.isBox||t.isCylinder){return t.object3D}else if(t.isPolygon){return this._polygonHandler.getTarget(t)}else if(t.isModel){return this._modelHandler.getTarget(t)}else{o.error("Unable to get decal's target","target instance type is unknown",l);return null}}}else if(e.planeOrigin&&e.planeNormal){return this._createPlane(e,this._root)}else{o.error("Unable to get/create decal's target","missing parameters",l);return null}};D.prototype._disposeDecalTarget=function(e,t){if(e.target){var r=this._targets.get(e.target);if(r){if(r.isPolygon||r.isModel){this._deleteObject3D(t)}}else{o.error("Unable to dispose decal's target","target not found",l)}}else{this._deleteObject3D(t)}};D.prototype._updateInstanceKeys=function(e){var t=this._getInstanceKeys(e);if(t){if(t.key!==e._last.key){this._targets.delete(e._last.key);this._targets.delete(e._last.group);this._targets.set(t.key,e);this._targets.set(t.group,e);e._last.key=t.key;e._last.group=t.group}}};D.prototype._removeInstanceKeys=function(e){var t=this._getInstanceKeys(e);if(t){this._targets.delete(t.key);this._targets.delete(t.group)}};D.prototype._getInstanceKeys=function(e){if(e.dataInstance){var t=e.voGroup.keyAttributeName;if(t){var r=e.dataInstance[t];if(r){return{key:r,group:e.voGroup.id+"."+r}}}}return null};D.prototype._deleteObject3D=function(e){e.traverse(function(e){if(e.geometry){if(t.refCountable(e.geometry)){t.subRef(e.geometry)}else{e.geometry.dispose()}}p(e.material).forEach(function(e){if(e.map){t.subRef(e.map)}e.dispose()})});e.parent.remove(e)};D.prototype._getBoxGeometry=function(e){if(e){return this._box6||(this._box6=b(e))}else{return this._box4||(this._box4=b(e))}};D.prototype._getCylinderGeometry=function(e){if(e){return this._cylinder||(this._cylinder=w(e))}else{return this._cylinderCaps||(this._cylinderCaps=w(e))}};D.prototype._getTextureLoader=function(){return this._textureLoader||(this._textureLoader=new a.TextureLoader)};b=function(e){var t=new a.BufferGeometry;t.setAttribute("position",new a.Float32BufferAttribute([.1,.1,-.1,-.1,-.1,-.1,-.1,.1,-.1,.1,.1,-.1,.1,-.1,-.1,-.1,-.1,-.1,.1,.1,.1,-.1,.1,.1,-.1,-.1,.1,.1,.1,.1,-.1,-.1,.1,.1,-.1,.1,.1,.1,-.1,.1,-.1,.1,.1,-.1,-.1,.1,.1,-.1,.1,.1,.1,.1,-.1,.1,.1,-.1,-.1,-.1,-.1,.1,-.1,-.1,-.1,.1,-.1,-.1,.1,-.1,.1,-.1,-.1,.1,-.1,-.1,-.1,-.1,.1,.1,-.1,.1,-.1,-.1,-.1,-.1,-.1,-.1,.1,-.1,.1,.1,.1,.1,.1,-.1,.1,-.1,-.1,.1,.1,.1,.1,.1,.1,.1,-.1,-.1,.1,-.1],3));t.setAttribute("normal",new a.Float32BufferAttribute([0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],3));t.setAttribute("color",new a.Float32BufferAttribute([.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5],3));if(e){t.setAttribute("uv",new a.Float32BufferAttribute([2/3,.5,1,1,2/3,1,2/3,.5,1,.5,1,1,2/3,0,1,0,1,.5,2/3,0,1,.5,2/3,.5,2/3,.5,1/3,1,1/3,.5,2/3,.5,2/3,1,1/3,1,2/3,0,1/3,.5,1/3,0,2/3,0,2/3,.5,1/3,.5,1/3,.5,0,1,0,.5,1/3,.5,1/3,1,0,1,0,.5,1/3,0,1/3,.5,0,.5,0,0,1/3,0],2))}else{t.setAttribute("uv",new a.Float32BufferAttribute([.5,.5,1,1,.5,1,.5,.5,1,.5,1,1,1,.5,1,1,.5,1,1,.5,.5,1,.5,.5,.5,.5,0,1,0,.5,.5,.5,.5,1,0,1,.5,.5,1,0,1,.5,.5,.5,.5,0,1,0,.5,.5,0,1,0,.5,.5,.5,.5,1,0,1,0,.5,.5,0,.5,.5,0,.5,0,0,.5,0],2))}return t};w=function(e){var t=.1;return new a.CylinderGeometry(t,t,2*t,24,1,e)};return D});