/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SelectionController","sap/ui/mdc/p13n/P13nBuilder","sap/m/p13n/SortPanel"],function(t,e,r){"use strict";var o=t.extend("sap.ui.mdc.p13n.subcontroller.SortController",{constructor:function(){t.apply(this,arguments);this._bResetEnabled=true}});o.prototype.getStateKey=function(){return"sorters"};o.prototype.getUISettings=function(){return{tabText:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("p13nDialog.TAB_Sort"),title:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("sort.PERSONALIZATION_DIALOG_TITLE")}};o.prototype.getDelta=function(e){e.deltaAttributes.push("descending");return t.prototype.getDelta.apply(this,arguments)};o.prototype.initAdaptationUI=function(t){var e;e=new r;var o=this.mixInfoAndState(t);e.setP13nData(o.items);this._oPanel=e;return Promise.resolve(e)};o.prototype.model2State=function(){var t=[];if(this._oPanel){this._oPanel.getP13nData(true).forEach(function(e){if(e.sorted){t.push({name:e.name})}});return t}};o.prototype.getChangeOperations=function(){return{add:"addSort",remove:"removeSort",move:"moveSort"}};o.prototype._getPresenceAttribute=function(t){return"sorted"};o.prototype.mixInfoAndState=function(t){var r=this.getCurrentState();var o=e.arrayToMap(r);var n=this.prepareAdaptationData(t,function(t,e){var r=o[e.name];t.sorted=r?true:false;t.sortPosition=r?r.position:-1;t.descending=r?!!r.descending:false;return!(e.sortable===false)});this.sortP13nData({visible:"sorted",position:"sortPosition"},n.items);n.presenceAttribute=this._getPresenceAttribute();n.items.forEach(function(t){delete t.sortPosition});return n};return o});