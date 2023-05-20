/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
(function(){"use strict";console.log("MataiLoaderWorker started.");function e(e){this.sceneBuilderId=e}e.prototype.setScene=function(e){e.cameraId=e.cameraRef;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"setScene",args:[e]})};function t(e){var t=[];for(var s in e){var r=s.indexOf("/");if(r>=0){var i=[];var a=e[s];if(a){for(var o in a){i.push({name:o,value:a[o]})}}t.push({source:s.substr(0,r),type:s.substr(r+1),fields:i})}}return t}e.prototype.createNode=function(e){e.parentId=e.parentRef;if(e.transformType===1){e.transformType="BILLBOARD_VIEW"}else if(e.transformType===257){e.transformType="LOCK_TOVIEWPORT"}e.transform=e.matrix;e.sid=e.nodeRef;if(e.veids){e.veids=t(e.veids)}self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createNode",args:[e]},[e.transform.buffer])};e.prototype.createMesh=function(e){var t=[e.boundingBox.buffer];if(e.transform){t.push(e.matrix.buffer)}self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertSubmesh",args:[{meshId:e.meshRef,materialId:e.materialRef,transform:e.matrix,lods:[{id:e.meshRef,boundingBox:e.boundingBox}]}]},t)};e.prototype.setMeshGeometry=function(e){var t=[e.data.index.buffer,e.data.position.buffer];if(e.data.normal){t.push(e.data.normal.buffer)}if(e.data.uv){t.push(e.data.uv.buffer)}self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"setGeometry",args:[{id:e.meshRef,isPolyline:(e.flags&1)>0,data:{indices:e.data.index,points:e.data.position,normals:e.data.normal,uvs:e.data.uv}}]},t)};e.prototype.insertMesh=function(e,t){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"setMeshNode",args:[e,t]})};e.prototype.createTextAnnotation=function(e){e.coordinateSpace=0;e.nodeId=e.nodeRef;e.fontFace=e.font;e.shape=e.style;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createAnnotation",args:[e]})};e.prototype.createTextNote=function(e){e.coordinateSpace=2;e.nodeId=e.nodeRef;e.id=e.nodeRef;e.sid=e.targetNodeRef;e.fontFace=e.font;e.shape=e.style;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createAnnotation",args:[e]})};e.prototype.createImageNote=function(e){e.properlyAligned=true;e.nodeId=e.nodeRef;e.labelMaterialId=e.materialRef;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createImageNote",args:[e]})};e.prototype.insertLeaderLine=function(e){var t=[];for(var s=0;s<e.points.length;s+=3){var r=[e.points[s],e.points[s+1],e.points[s+2]];t.push(r)}e.points=t;e.annotationId=e.nodeRef;e.nodeId=e.nodeRef;e.startPointSid=e.targetNodeRef;e.materialId=e.materialRef;e.startPointHeadStyle=e.startPointStyle;e.endPointHeadStyle=e.endPointStyle;e.pointHeadConstant=e.styleConstant;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertLeaderLine",args:[e]})};e.prototype.setParametricContent=function(e,t){t.materialID=t.materialID||undefined;var s=[];if(t.t){s.push(t.t.buffer)}if(t.r){s.push(t.r.buffer)}if(t.s){s.push(t.s.buffer)}if(t.segments){t.segments.forEach(function(e){if(e.points){s.push(e.points.buffer)}})}var r=t.lineStyle;if(r){if(r.colour){s.push(r.colour.buffer)}}var i=t.fillStyle;if(i){if(i.colour){s.push(i.colour.buffer)}if(i.start){s.push(i.start.buffer)}if(i.end){s.push(i.end.buffer)}if(i.radii){s.push(i.radii.buffer)}if(i.gradient){s.push(i.gradient.buffer)}if(i.gradientTransform){s.push(i.gradientTransform.buffer)}}self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"setParametricContent",args:[e,t]},s)};e.prototype.createCamera=function(e){e.ortho=e.projection==="orthographic";e.near=e.nearClip;e.far=e.farClip;e.fov=e.fov*Math.PI/180;e.zoom=e.orthoZoomFactor;e.id=e.cameraRef;var t=[e.origin.buffer,e.up.buffer,e.target.buffer];if(e.matrix){t.push(e.matrix.buffer)}e.notUseDirectionVector=true;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createCamera",args:[e]},t)};e.prototype.insertCamera=function(e,t){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertCamera",args:[e,t]})};e.prototype.createViewportGroup=function(e){e.id=e.viewportGroupRef;if(e.veids){e.veids=t(e.veids)}self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertViewGroup",args:[e]})};e.prototype.finalizePlaybacks=function(e){e.viewGroupId=e.viewportGroupRef;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"setAnimationPlaybacks",args:[e]})};e.prototype.insertModelView=function(e){e.viewGroupId=e.viewportGroupRef;e.viewId=e.modelViewRef;e.thumbnailId=e.thumbnail;e.cameraId=e.cameraRef;e.navigationMode=["NoChange","Orbit","NoChange","Turntable","Zoom","Pan"][e.navigationMode]||"NoChange";self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertView",args:[e]})};e.prototype.setModelViewVisibilitySet=function(e){e.viewId=e.modelViewRef;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"setModelViewVisibilitySet",args:[e]})};e.prototype.insertModelViewHighlight=function(e){e.viewId=e.modelViewRef;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertModelViewHighlight",args:[e]})};e.prototype.createThumbnail=function(e){e.imageId=e.imageRef;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createThumbnail",args:[e]})};e.prototype.createDetailView=function(e){e.nodeId=e.nodeRef;e.detailViewId=e.detailViewRef;e.cameraId=e.cameraRef;e.attachment=e.attachmentPoint;var t=[e.origin.buffer,e.size.buffer];if(e.attachment){t.push(e.attachment.buffer)}if(e.visibleNodes){t.push(e.visibleNodes.buffer)}if(e.targetNodes){t.push(e.targetNodes.buffer)}e.properlyAligned=true;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createDetailView",args:[e]},t)};e.prototype.createMaterial=function(e){e.id=e.materialRef;var t=[e.ambientColour.buffer,e.diffuseColour.buffer,e.specularColour.buffer,e.emissiveColour.buffer];if(e.lineColour&&e.lineDashPattern){t.push(e.lineColour.buffer,e.lineDashPattern.buffer)}if(e.textures){for(var s=0;s<e.textures.length;s++){var r=e.textures[s];var i="texture"+r.type.charAt(0).toUpperCase()+r.type.slice(1);e[i]={imageId:r.imageRef,matrix:r.matrix,uvHorizontalScale:r.scaleX,uvVerticalScale:r.scaleY,uvHorizontalOffset:r.offsetX,uvVerticalOffset:r.offsetY,uvRotationAngle:r.angle,influence:r.amount,filterMode:r.filterMode,uvHorizontalTilingEnabled:r.repeatX,uvVerticalTilingEnabled:r.repeatY,uvClampToBordersEnabled:r.clampToBorder,inverted:r.invert,modulate:r.modulate}}}self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createMaterial",args:[e]},t)};e.prototype.createImage=function(e){e.id=e.imageRef;e.binaryData=e.data;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"createImage",args:[e]},[e.binaryData.buffer])};e.prototype.progress=function(e){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"progress",args:[e]})};e.prototype.insertThrustline=function(e){e.thrustlineId=e.thrustlineRef;e.materialId=e.material;self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertThrustline",args:[e]})};e.prototype.insertAnimationGroup=function(e){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertAnimationGroup",args:[e]})};e.prototype.insertAnimation=function(e){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertAnimation",args:[e]})};e.prototype.insertAnimationTarget=function(e){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertAnimationTarget",args:[e]})};e.prototype.insertAnimationTrack=function(e){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"insertAnimationTrack",args:[e]})};e.prototype.finalizeAnimation=function(e){self.postMessage({sceneBuilderId:this.sceneBuilderId,method:"setAnimationTracks",args:[e]})};e.prototype.requestReferencedFile=function(e){self.postMessage({sceneBuilderId:this.sceneBuilderId,event:"referencedFileRequested",fileName:e.FileName,veId:e.VEID,veVersion:e.VEVersion})};var s=new Map;self.onmessage=function(t){var r;var i=0;var a=t.data.method;var o=t.data.args;switch(a){case"createRuntime":console.log("MataiLoaderWorker starting runtime.");sap.ve.matai.createRuntime({prefixURL:o.scriptDirectory}).then(function(e){console.log("MataiLoaderWorker runtime created.");self.matai=e;self.postMessage({event:"runtimeCreated"})});break;case"createContext":r=new e(o.sceneBuilderId);s.set(o.sceneBuilderId,r);i=self.matai.createContext(r,o.buffer,o.fileName,o.locale,"");self.postMessage({event:"contextCreated",sceneBuilderId:o.sceneBuilderId,result:i});break;case"destroyContext":r=s.get(o.sceneBuilderId);s.delete(o.sceneBuilderId);self.matai.destroyContext(r);break;case"loadFile":r=s.get(o.sceneBuilderId);i=self.matai.loadFile(r);self.postMessage({event:"fileLoaded",sceneBuilderId:o.sceneBuilderId,result:i});break;case"loadReferencedFile":r=s.get(o.sceneBuilderId);i=self.matai.loadReferencedFile(r,o.buffer,o.fileName,o.veId,o.veVersion);self.postMessage({event:"referencedFileLoaded",sceneBuilderId:o.sceneBuilderId,fileName:o.fileName,result:i});break;case"buildScene":r=s.get(o.sceneBuilderId);i=self.matai.buildScene(r);self.postMessage({sceneBuilderId:o.sceneBuilderId,event:"sceneBuilt",result:i});break;default:break}};console.log("MataiLoaderWorker initialized.")})();