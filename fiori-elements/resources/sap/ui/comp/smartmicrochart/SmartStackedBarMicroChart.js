/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/library","sap/suite/ui/microchart/StackedBarMicroChart","sap/suite/ui/microchart/StackedBarMicroChartBar","sap/ui/core/Control","sap/ui/model/odata/CountMode","sap/ui/core/format/DateFormat","sap/m/library","sap/base/Log","sap/ui/comp/smartmicrochart/SmartMicroChartBase","./SmartMicroChartRenderer"],function(t,a,i,e,r,o,n,s,h,c){"use strict";var p=h.extend("sap.ui.comp.smartmicrochart.SmartStackedBarMicroChart",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmicrochart/SmartStackedBarMicroChart.designtime"},renderer:c});p.prototype._CHART_TYPE=["BarStacked"];p.prototype.init=function(){this._bIsInitialized=false;this._bMetaModelLoadAttached=false;this.setProperty("chartType","BarStacked",true);this.setAggregation("_chart",new a,true)};p.prototype.onBeforeRendering=function(){var t=this.getAggregation("_chart");t.setSize(this.getSize(),true);t.setWidth(this.getWidth(),true);t.setHeight(this.getHeight(),true)};p.prototype._createAndBindInnerChart=function(){if(!(this._oDataPointAnnotations.Value&&this._oDataPointAnnotations.Value.Path)){s.error("Value DataPoint annotation missing! Cannot create the SmartStackedBarMicroChart");return}var t=this.getAggregation("_chart"),a=new i({value:{path:this._oDataPointAnnotations.Value.Path,type:"sap.ui.model.odata.type.Decimal"}});if(this._oDataPointAnnotations.Criticality&&this._oDataPointAnnotations.Criticality.Path){a.bindProperty("valueColor",{path:this._oDataPointAnnotations.Criticality.Path,formatter:this._mapCriticalityTypeWithColor.bind(this)})}var e=this._getPropertyAnnotation.call(this,this._oDataPointAnnotations.Value.Path);var r=e["com.sap.vocabularies.Common.v1.Text"];if(r&&r.Path){a.bindProperty("displayValue",r.Path)}t.bindAggregation("bars",{path:this._getBindingPath(),template:a,events:{change:this._onBindingDataChange.bind(this)}})};p.prototype._onBindingDataChange=function(){var t=this.getAggregation("_chart").getBinding("bars");this._updateAssociations(t)};return p});