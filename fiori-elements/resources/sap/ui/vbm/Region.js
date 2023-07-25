/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["sap/ui/core/Element","./library"],function(e,t){"use strict";var a=e.extend("sap.ui.vbm.Region",{metadata:{library:"sap.ui.vbm",properties:{color:{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},code:{type:"string",group:"Misc",defaultValue:null},select:{type:"boolean",group:"Misc",defaultValue:false},labelText:{type:"string",group:"Misc",defaultValue:null},labelType:{type:"sap.ui.vbm.SemanticType",group:"Behavior",defaultValue:sap.ui.vbm.SemanticType.None},labelBgColor:{type:"string",group:"Misc",defaultValue:"RGB(255;255;255)"},labelBorderColor:{type:"string",group:"Misc",defaultValue:null},labelArrow:{type:"boolean",group:"Misc",defaultValue:false}},events:{click:{parameters:{code:{type:"string"}}},contextMenu:{parameters:{code:{type:"string"}}}}}});a.prototype.getInfo=function(){return this.getParent().getRegionsInfo([this.getCode()])[0]};return a});