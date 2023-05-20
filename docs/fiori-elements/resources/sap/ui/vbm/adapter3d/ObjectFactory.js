/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["sap/ui/base/Object"],function(e){"use strict";var t={id:undefined,type:"default",caption:undefined,refScene:undefined,refParent:undefined,width:"0",height:"0",modal:"true",pos:"0;0;0"};var r={id:undefined,type:"default",voGroups:undefined,getVisualObjectGroupById:function(e){for(var t=0,r=this.voGroups.length;t<r;++t){var n=this.voGroups[t];if(n.id===e){return n}}return undefined}};var n={id:undefined,type:undefined,datasource:undefined,scene:undefined,vos:undefined,maxSel:"-1",minSel:"0",keyAttributeName:undefined,template:undefined,isDataBound:false,isDirty:true};var a=Object.create(Object.prototype);a["VB:c"]="false";a["VB:s"]="false";a.color="RGB(128,128,128)";a.fxdir="false";a.fxsize="false";a.hotDeltaColor="RHLSA(0;1.1;1;1)";a.opacity="1";a.pos="0;0;0";a.rot="0;0;0";a.scale="1;1;1";a.selectColor="RGBA(178;127;0;255)";a.zsort="false";a.dragSource=undefined;a.dropTarget=undefined;var i=Object.create(a);i.isBox=true;i.object3D=undefined;i.type="{00100000-2012-0004-B001-BFED458C3076}";i.colorBorder=undefined;i.texture=undefined;i.texture6="false";i.normalize="false";i.tooltip=undefined;var u=Object.create(a);u.object3D=undefined;u.isCylinder=true;u.type="{00100000-2012-0004-AFC0-5FDB345FC47E}";u.colorBorder=undefined;u.texture=undefined;u.textureCap=undefined;u.isOpen=false;u.normalize="false";u.tooltip=undefined;var d=Object.create(a);d.isPolygon=true;d.type="{00100000-2014-0004-BDA8-87B904609063}";d.OuterNormal="0;0;1";d.colorBorder=undefined;d.tooltip=undefined;var o=Object.create(a);o.isModel=true;o.type="{00100000-2012-0070-1000-35762CF28B6B}";o.model=undefined;o.text=undefined;o.texture=undefined;o.normalize="false";o.tooltip=undefined;var f={object3D:undefined,isDecal:true,type:"{388951f5-a66b-4423-a5ad-e0ee13c2246f}",position:"0;0;0",direction:"0;0;0",size:"0;0;0",rotation:"0",texture:undefined,text:undefined,target:undefined,planeOrigin:undefined,planeNormal:undefined};var s=Object.create(Object.prototype);s.left="0";s.top="0";s.right="0";s.bottom="0";s.align="0";s.tooltip=undefined;var c=Object.create(s);c.isCaption=true;c.type="{00100000-2013-1000-1100-50059A6A47FA}";c.level="0";c.text=undefined;var p=Object.create(s);p.isLabel=true;p.type="{00100000-2013-1000-3700-AD84DDBBB31B}";p.text=undefined;var l=Object.create(s);l.isImage=true;l.type="{00100000-2013-1000-2200-6B060A330B2C}";l.image=undefined;var y=Object.create(s);y.isButton=true;y.type="{00100000-2013-1000-1200-855B919BB0E9}";y.text=undefined;var b=Object.create(s);b.isLink=true;b.type="{00100000-2013-1000-2400-D305F7942B98}";b.href=undefined;b.text=undefined;var v=new Map;v.set(i.type,i);v.set(u.type,u);v.set(o.type,o);v.set(d.type,d);v.set(f.type,f);v.set(c.type,c);v.set(p.type,p);v.set(l.type,l);v.set(y.type,y);v.set(b.type,b);var B={name:undefined,key:undefined,minSel:"-1",maxSel:"0",attributes:undefined,dataTypes:undefined,getKeyAttribute:function(){return this.key?this.getAttributeByName(this.key):undefined},getAttributeByAlias:function(e){for(var t=0,r=this.attributes.length;t<r;++t){var n=this.attributes[t];if(n.alias===e){return n}}return undefined},getAttributeByName:function(e){for(var t=0,r=this.attributes.length;t<r;++t){var n=this.attributes[t];if(n.name===e){return n}}return undefined},getDataTypeByName:function(e){for(var t=0,r=this.dataTypes.length;t<r;++t){var n=this.dataTypes[t];if(n.name===e){return n}}return undefined}};var j={name:undefined,alias:undefined,type:"string"};var O=e.extend("sap.ui.vbm.adapter3d.ObjectFactory",{});O.prototype.createVisualObject=function(e){var t=v.get(e.type);var r=t&&Object.create(t,{voGroup:{writable:true},dataInstance:{writable:true}});if(r){r._last={};r.voGroup=e;e.vos.push(r)}return r};O.prototype.createVisualObjectGroup=function(e){var t=Object.create(n);t.scene=e;e.voGroups.push(t);t.template={};t.vos=[];t.selected=[];return t};O.prototype.createScene=function(e){var t=Object.create(r);t.voGroups=[];t.sceneGeo=e;return t};O.prototype.createWindow=function(){return Object.create(t)};O.prototype.createDataType=function(){var e=Object.create(B);e.attributes=[];e.dataTypes=[];return e};O.prototype.createDataTypeAttribute=function(){return Object.create(j)};O.prototype.createDataNode=function(){return[]};O.prototype.createDataInstance=function(){return Object.create(Object.prototype,{isDirty:{writable:true},visualObject:{writable:true}})};return O});