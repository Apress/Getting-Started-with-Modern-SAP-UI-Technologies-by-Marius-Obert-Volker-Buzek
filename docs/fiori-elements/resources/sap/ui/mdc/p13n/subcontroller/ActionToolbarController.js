/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SelectionController","sap/ui/mdc/p13n/panels/ActionToolbarPanel","sap/m/Column","sap/ui/mdc/p13n/P13nBuilder"],function(t,e,n,o){"use strict";var i=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var a=t.extend("saps.ui.mdc.p13n.subcontroller.ActionToolbarController");a.prototype.initAdaptationUI=function(t){var n=new e({title:i.getText("actiontoolbar.RTA_TITLE"),showHeader:true});n.setFieldColumn(i.getText("actiontoolbar.RTA_COLUMN_HEADER"));var o=this.mixInfoAndState(t);n.setP13nData(o.items);this._oPanel=n;return Promise.resolve(n)};a.prototype.getDelta=function(e){var n=t.prototype.getDelta.apply(this,arguments);n.forEach(function(t){var e=t.changeSpecificData.changeType;if(e==="hideControl"||e==="unhideControl"){t.selectorElement=sap.ui.getCore().byId(t.changeSpecificData.content.name);delete t.changeSpecificData.content}});return n};a.prototype.mixInfoAndState=function(t){var e=this.getCurrentState();var n=this.arrayToMap(e);var o=this.prepareAdaptationData(t,function(t,e){var o=n[e.name];t.visible=!!o;t.position=o?o.position:-1;t.alignment=e.alignment;return e.visible});this.sortP13nData({visible:"visible",position:"position"},o.items);o.items.forEach(function(t){delete t.position});return o};a.prototype.getChangeOperations=function(){return{add:"unhideControl",remove:"hideControl",move:"moveAction"}};return a});