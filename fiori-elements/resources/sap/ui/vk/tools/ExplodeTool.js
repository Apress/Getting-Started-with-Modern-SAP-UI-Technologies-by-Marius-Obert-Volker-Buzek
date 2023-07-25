/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Tool","./ExplodeAxis","./ExplodeDirection","./ExplodeItemGroup","./ExplodeType","./ExplodeToolHandler","./ExplodeToolGizmo","../AnimationPlayback","../AnimationTrackType","../AnimationTrackValueType","../OrthographicCamera","sap/ui/base/ManagedObjectObserver","../getResourceBundle","../TransformationMatrix","../thirdparty/three"],function(e,t,i,o,a,r,s,n,p,l,u,d,c,h,m){"use strict";var g=e.extend("sap.ui.vk.tools.ExplodeTool",{metadata:{library:"sap.ui.vk",properties:{type:{type:"sap.ui.vk.tools.ExplodeType",defaultValue:a.Linear},axis:{type:"sap.ui.vk.tools.ExplodeAxis"},direction:{type:"sap.ui.vk.tools.ExplodeDirection"},magnitude:{type:"float",defaultValue:0},anchor:{type:"float[]",defaultValue:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}},aggregations:{items:{type:"sap.ui.vk.tools.ExplodeItemGroup",multiple:true}},associations:{selectedItem:{type:"sap.ui.vk.tools.ExplodeItemGroup",multiple:false}},events:{axisSelected:{parameters:{axis:{type:"sap.ui.vk.tools.ExplodeAxis"},direction:{type:"sap.ui.vk.tools.ExplodeDirection"}}},magnitudeChanging:{parameters:{type:{type:"sap.ui.vk.tools.ExplodeType"},axis:{type:"sap.ui.vk.tools.ExplodeAxis"},direction:{type:"sap.ui.vk.tools.ExplodeDirection"},magnitude:{type:"float"}}},magnitudeChanged:{parameters:{type:{type:"sap.ui.vk.tools.ExplodeType"},axis:{type:"sap.ui.vk.tools.ExplodeAxis"},direction:{type:"sap.ui.vk.tools.ExplodeDirection"},magnitude:{type:"float"}}},itemSequenceChangePressed:{parameters:{item:{type:"sap.ui.vk.tools.ExplodeItemGroup"},moveUp:{type:"boolean"}}},itemPositionAdjusting:{parameters:{item:{type:"sap.ui.vk.tools.ExplodeItemGroup"},magnitudeAdjustmentMultiplier:{type:"float"}}},itemPositionAdjusted:{parameters:{item:{type:"sap.ui.vk.tools.ExplodeItemGroup"},magnitudeAdjustmentMultiplier:{type:"float"}}}}},constructor:function(t,i){e.apply(this,arguments);this._viewport=null;this._handler=new r(this);this._gizmo=null}});g.prototype.init=function(){if(e.prototype.init){e.prototype.init.call(this)}this.setFootprint(["sap.ui.vk.threejs.Viewport"]);this.setAggregation("gizmo",new s);this._groupObserver=new d(this._onGroupChanged.bind(this));this._groupsObserver=new d(this._onGroupsChanged.bind(this));this._groupsObserver.observe(this,{aggregations:["items"]})};g.prototype.destroy=function(){g._cleanAssociatedLoaders();this._groupsObserver.disconnect();this._groupsObserver=null;this._groupObserver.disconnect();this._groupObserver=null};g.prototype.setActive=function(t,i,o){e.prototype.setActive.call(this,t,i,o);if(this._viewport){if(t){this._gizmo=this.getGizmo();this._gizmo.show(this._viewport,this);this._addLocoHandler()}else{this._removeLocoHandler();if(this._gizmo){this._gizmo.hide();this._gizmo=null}}}return this};g.prototype.queueCommand=function(e){if(this._addLocoHandler()){if(this.isViewportType("sap.ui.vk.threejs.Viewport")){e()}}return this};g.prototype.setType=function(e){this.setProperty("type",e,true);if(this._gizmo){this._gizmo._recalculateOffsets()}};g.prototype.setAxis=function(e){this.setProperty("axis",e,true);if(this._gizmo){this._gizmo._updateAxis()}};g.prototype.setDirection=function(e){this.setProperty("direction",e,true);if(this._gizmo){this._gizmo._updateAxis()}};g.prototype.setAnchor=function(e){this.setProperty("anchor",e,true);if(this._gizmo){this._gizmo._updateAxis()}};g.prototype.pickAnchorFromNodesList=function(e){var t=null;var i=-1;var o=new m.Vector3;(Array.isArray(e)?e:[e]).forEach(function(e){var a=new m.Box3;e._expandBoundingBox(a,false,true,true);var r=a.getSize(new m.Vector3).manhattanLength();if(i<r){i=r;t=e;a.getCenter(o)}});if(t!==null){this.setAnchor(t.matrixWorld.clone().setPosition(o).elements)}return t};g.prototype.setMagnitude=function(e){e=Math.max(e,0);this.setProperty("magnitude",e,true);if(this._gizmo){this._gizmo._setMagnitude(e)}};g.prototype.setSelectedItem=function(e){this.setAssociation("selectedItem",e);if(this._gizmo){this._gizmo._handleSelectedItemChanged()}};g.prototype._onGroupsChanged=function(e){this._groupObserver.disconnect();this.getItems().forEach(function(e){this._groupObserver.observe(e,{aggregations:["items"]})}.bind(this));if(this._gizmo){this._gizmo._handleGroupsChanged(e)}};g.prototype._onGroupChanged=function(e){if(this._gizmo){this._gizmo._handleGroupsChanged(e)}};g.prototype.reset=function(){this.getItems().forEach(function(e){e.setMagnitudeAdjustmentMultiplier(0)});this.setMagnitude(0);this.setType(a.Linear);this.setAxis(undefined);this.setDirection(undefined)};g.prototype._activateView=function(e){var t=this._viewport.getScene();var i=t.getViewStateManager();var o=t.getViews()[e];i.activateView(o);var a=this._viewport._viewStateManager.getAnimationPlayer();if(a){setTimeout(function(){a.play()},100)}};g.prototype._createView=function(e,t,i,o,a,r,s){var n=this._viewport.getScene();var p=n.getViewStateManager();var l=n.createView({name:t});var d=[];if(e){var c=e.getNodeInfos();c.forEach(function(e){var t={target:e.target,transform:e.transform?e.transform.slice():null,meshId:e.meshId,materialId:e.materialId,visible:e.visible,opacity:e.opacity};d.push(t)})}else{var h=p.getNodeHierarchy();var m=function(e){if(e.visible){d.push({target:e,visible:e.visible})}h.enumerateChildren(e,m,false,true)};h.enumerateChildren(null,m,false,true)}l.setNodeInfos(d);var g={name:t,nodes:[]};if(e){g.sourceId=e.getViewId();g.exclude="PLAYBACK";var v=this._viewport.getCamera();var f={origin:v.getPosition(),target:v.getTargetDirection(),up:v.getUpDirection(),ortho:v instanceof u};if(f.ortho){f.zoom=v.getZoomFactor()}else{f.fov=v.getFov()/180*Math.PI}g.camera=f;var y=this._viewport._viewStateManager.getAnimationPlayer();if(y){g.time=y.getTime()}}d=[];o.forEach(function(e){var t=e.node;var i=a.get(t);g.nodes.push({sid:n.nodeRefToPersistentId(t),transform:i.localMatrix});d.push({target:t,transform:i.localMatrix})});l.updateNodeInfos(d);var x=n.findViewGroupByView(e);g.groupIds=x?[x.getViewGroupId()]:[r];if(s!==null){g.sequence=s}if(i){i.push(g)}return l};g.prototype.generateRequestData=function(e,t){var i=e?e.viewPrefix:null;var o=[];var r=1;var s=this._viewport.getScene();var u=this._viewport.getCurrentView();var d=new Map;var g=new Map;var v=[];var f=[];var y=[];var x=[];var _=null;var w=[];var E=null;var T=this.getType();if(t){if(Array.isArray(t.views)){var P=t.views.findIndex(function(e){return e.id===u.getViewId()});if(P>=0){_=t.views[P].sequence+1}w=t.views.slice(P+1)}E=t.id}var V=new Map;if(e&&e.animation&&e.animation.enabled){this.getItems().forEach(function(e){e.getItems().forEach(function(e){var t=e.getNodeRef();t.updateMatrixWorld();var i=(new m.Vector3).setFromMatrixPosition(t.matrixWorld);g.set(t.uuid,i);var o=new m.Matrix4;o.copy(t.parent.matrixWorld).invert().multiply(t.matrixWorld);var a=new m.Vector3;var r=new m.Quaternion;var s=new m.Vector3;o.decompose(a,r,s);V.set(t,{localMatrix:h.convertTo4x3(o.elements),position:a,worldPosition:i})})});this._gizmo._nodes.forEach(function(e){var t=e.node;t.matrix.elements[12]=e.local.x;t.matrix.elements[13]=e.local.y;t.matrix.elements[14]=e.local.z;t.position.setFromMatrixPosition(t.matrix);t.updateMatrixWorld(true);d.set(t,[e.local.x,e.local.y,e.local.z]);var i=(new m.Vector3).setFromMatrixPosition(t.matrixWorld);var o=new m.Matrix4;o.copy(t.parent.matrixWorld).invert().multiply(t.matrixWorld);var a=new m.Vector3;var r=new m.Quaternion;var s=new m.Vector3;o.decompose(a,r,s);var n=V.get(t);n.originalPosition=a;n.originalWorldPosition=i})}var A=new Set;var I=this._createView(u,i?i:c().getText("EXPLODETOOL_VIEW"),o,A,V,E,_);var k=o[o.length-1];if(e&&e.animation&&e.animation.enabled){if(!e.animation.separateAnimations){e.animation.separateViews=false}var O=e.animation.sequencePrefix;var b=1;var z=new Map;var M=null;var L=[];var C=[];var D="";this.getItems().forEach(function(t){y.push({name:t.getName()?t.getName():c().getText("EXPLODETOOL_GROUP_NODE",b),contentType:"REFERENCE",transform:[1,0,0,0,1,0,0,0,1,0,0,0]});k=o[o.length-1];if(e.animation.separateAnimations||e.animation.separateViews||b==1){if(L.length>0){f.push({name:D,endTime:r,joints:C,nodes:L});L=[];C=[]}if(e.animation.separateViews){D=c().getText("EXPLODETOOL_SEQUENCE_NAME",[k.name,1])}else{D=c().getText("EXPLODETOOL_SEQUENCE_NAME",[k.name,b])}D=O?c().getText("EXPLODETOOL_PREFIX_n",[O,b]):D;M=s.createSequence(I.getId()+"_seq"+b,{name:D,duration:r});var d=new n({sequence:M});I.addPlayback(d);I.resetPlaybacksStartTimes();if(!k.playbacks){k.playbacks=[]}k.playbacks.push({start:e.animation.separateViews?0:(b-1)*r,sequence:f.length})}var h=s.createTrack(null,{trackValueType:l.Vector3,isAbsoluteValue:false});this._gizmo._nodes.forEach(function(e){if(e.group==t){var i=e.node;var o=s.nodeRefToPersistentId(i);C.push(x.length);x.push({parent:b-1,childSid:o});var n=g.get(i.uuid);if(T===a.Radial||h.getKeysCount()==0){if(T===a.Radial&&h.getKeysCount()>0){h=s.createTrack(null,{trackValueType:l.Vector3,isAbsoluteValue:false})}var u=V.get(i);var d=[u.worldPosition.x-u.originalWorldPosition.x,u.worldPosition.y-u.originalWorldPosition.y,u.worldPosition.z-u.originalWorldPosition.z];h.insertKey(0,[0,0,0]);h.insertKey(r,d);v.push({time:[0,r],vector3:[0,0,0,d[0],d[1],d[2]]})}if(T===a.Radial){L.push({sid:o,rtranslate:{track:v.length-1}})}M.setNodeAnimation(i,p.Translate,h);z.set(i,[n.x,n.y,n.z]);A.add(e)}});if(T===a.Linear){L.push({node:b-1,rtranslate:{track:v.length-1}})}b++;if(e.animation.separateViews&&b<=this.getItems().length){I=this._createView(u,i?c().getText("EXPLODETOOL_PREFIX_n",[i,b]):c().getText("EXPLODETOOL_VIEW_n",b),o,A,V,E,_?++_:_)}}.bind(this));if(L.length>0){f.push({name:D,endTime:r,joints:C,nodes:L})}}else{var S=[];k.nodes=[];this.getItems().forEach(function(e){e.getItems().forEach(function(e){var t=e.getNodeRef();var i=t.matrix.elements;var o=[i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10],i[12],i[13],i[14]];S.push({target:t,transform:o});k.nodes.push({sid:s.nodeRefToPersistentId(t),transform:o})})});I.updateNodeInfos(S)}var G=function(){var e={data:{views:o}};w.forEach(function(t){e.data.views.push({id:t.id,sequence:++_})});if(f.length>0){e.data.tree={nodes:y};e.data.animation={sequences:f,tracks:v,joints:x}}return e};return G()};return g});