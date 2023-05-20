/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Element","sap/chart/utils/ChartUtils","sap/chart/data/MeasureSemantics","sap/ui/thirdparty/jquery"],function(e,t,a,r){"use strict";var i={axis1:true,axis2:true,axis3:true,axis4:true};var s=e.extend("sap.chart.data.Measure",{metadata:{library:"sap.chart",properties:{name:{type:"string"},label:{type:"string"},unitBinding:{type:"string"},valueFormat:{type:"string",defaultValue:null},role:{type:"string",defaultValue:"axis1"},semantics:{type:"sap.chart.data.MeasureSemantics",defaultValue:a.Actual},semanticallyRelatedMeasures:{type:"object",defaultValue:null},analyticalInfo:{type:"object",defaultValue:null}}}});s.prototype.setLabel=t.makeNotifyParentProperty("label");var l=t.makeNotifyParentProperty("role");s.prototype.setRole=function(e,t){if(!i[e]){throw new TypeError("Invalide Measure role: "+e)}return l.apply(this,arguments)};s.prototype.setUnitBinding=t.makeNotifyParentProperty("unitBinding");s.prototype.setValueFormat=t.makeNotifyParentProperty("valueFormat");s.prototype.setSemantics=t.makeNotifyParentProperty("semantics");s.prototype.setSemanticallyRelatedMeasures=t.makeNotifyParentProperty("semanticallyRelatedMeasures");s.prototype._getFixedRole=function(){return this._sFixedRole||this.getRole()};return s});