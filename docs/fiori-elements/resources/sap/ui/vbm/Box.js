/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["./VoBase","./library"],function(t,e){"use strict";var o=t.extend("sap.ui.vbm.Box",{metadata:{library:"sap.ui.vbm",properties:{position:{type:"string",group:"Misc",defaultValue:"0;0;0"},scale:{type:"string",group:"Misc",defaultValue:"1;1;1"},color:{type:"string",group:"Misc",defaultValue:"RGB(255;0;0)"},colorBorder:{type:"string",group:"Misc",defaultValue:"RGB(255;0;0)"}},events:{}}});o.prototype.openDetailWindow=function(t,e,o){this.oParent.openDetailWindow(this,{caption:t,offsetX:e,offsetY:o},true)};o.prototype.openContextMenu=function(t){this.oParent.openContextMenu("Box",this,t)};o.prototype.getDataElement=function(){var e=t.prototype.getDataElement.apply(this,arguments);var o=this.oParent.mBindInfo;if(o.P){e.P=this.getPosition()}if(o.S){e.S=this.getScale()}if(o.C){e.C=this.getColor()}if(o.CB){e.CB=this.getColorBorder()}return e};o.prototype.handleChangedData=function(t){if(t.P){this.setPosition(t.P)}if(t.S){this.setScale(t.S)}};return o});