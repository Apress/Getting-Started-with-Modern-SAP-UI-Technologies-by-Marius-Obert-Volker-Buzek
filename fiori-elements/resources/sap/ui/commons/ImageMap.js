/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","./ImageMapRenderer","./Area"],function(e,t,a,i,o,r){"use strict";var s=a.extend("sap.ui.commons.ImageMap",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{name:{type:"string",group:"Misc",defaultValue:null}},aggregations:{areas:{type:"sap.ui.commons.Area",multiple:true,singularName:"area"}},events:{press:{parameters:{areaId:{type:"string"}}}}}});s.prototype.createArea=function(){var e=new r;for(var t=0;t<arguments.length;t++){var a=arguments[t];var e;if(a instanceof r){e=a}else{e=new r(a)}this.addArea(e)}return this};s.prototype.onAfterRendering=function(){this.oDomRef=this.getDomRef();if(!this.oItemNavigation){this.oItemNavigation=new i}this.addDelegate(this.oItemNavigation);this.oItemNavigation.setRootDomRef(this.oDomRef);var e=[];var t=this.getAreas();for(var a=0;a<t.length;a++){var o=t[a].getFocusDomRef();if(o){e.push(o)}}this.oItemNavigation.setItemDomRefs(e);this.oItemNavigation.setCycling(true);this.oItemNavigation.setSelectedIndex(-1);this.oItemNavigation.setFocusedIndex(-1)};s.prototype.exit=function(){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation}};return s});