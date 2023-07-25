// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/Control","sap/m/Image"],function(e,t){"use strict";var r=e.extend("sap.ushell.components.factsheet.controls.PictureViewerItem",{metadata:{deprecated:true,library:"sap.ushell",properties:{src:{type:"string",group:"Misc",defaultValue:null}},aggregations:{image:{type:"sap.m.Image",multiple:false}}}});r.prototype.setSrc=function(e){this.setProperty("src",e);var r=this.getImage();if(r==null){r=new t}r.setSrc(e);this.setImage(r);return this};r.prototype.exit=function(){var e=this.getImage();if(e){e.destroy()}};return r});