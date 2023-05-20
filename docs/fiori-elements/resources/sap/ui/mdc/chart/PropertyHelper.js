/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../util/PropertyHelper","sap/ui/mdc/library"],function(e,t){"use strict";var r=e.extend("sap.ui.mdc.chart.PropertyHelper",{constructor:function(t,r){e.call(this,t,r,{filterable:true,sortable:true,propertyInfos:true,groupable:{type:"boolean"},aggregatable:{type:"boolean"},propertyPath:{type:"string"},aggregationMethod:{type:"string"},role:{type:"string"},datapoint:{type:"object"},criticality:{type:"object"},textProperty:{type:"string"},availableRoles:{type:"object"},kind:{type:"string"}})}});r.prototype.prepareProperty=function(t){if(t.groupable){t.availableRoles=this._getLayoutOptionsForType("groupable");t.kind="Groupable"}else if(t.aggregatable){t.availableRoles=this._getLayoutOptionsForType("aggregatable");t.kind="Aggregatable"}if(!t.typeConfig&&t.dataType){var r=t.formatOptions?t.formatOptions:null;var a=t.constraints?t.constraints:{};t.typeConfig=this.getParent().getControlDelegate().getTypeUtil().getTypeConfig(t.dataType,r,a)}e.prototype.prepareProperty.apply(this,arguments);t.isAggregatable=function(){if(t){return t.isComplex()?false:t.aggregatable}}};r.prototype._getLayoutOptionsForType=function(e){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var a={groupable:[{key:t.ChartItemRoleType.category,text:r.getText("chart.PERSONALIZATION_DIALOG_CHARTROLE_CATEGORY")},{key:t.ChartItemRoleType.category2,text:r.getText("chart.PERSONALIZATION_DIALOG_CHARTROLE_CATEGORY2")},{key:t.ChartItemRoleType.series,text:r.getText("chart.PERSONALIZATION_DIALOG_CHARTROLE_SERIES")}],aggregatable:[{key:t.ChartItemRoleType.axis1,text:r.getText("chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS1")},{key:t.ChartItemRoleType.axis2,text:r.getText("chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS2")},{key:t.ChartItemRoleType.axis3,text:r.getText("chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS3")}]};return a[e]};r.prototype.getAllAggregatableProperties=function(){return this.getProperties().filter(function(e){return e.isAggregatable()})};return r});