/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["./library","sap/ui/core/Element"],function(t,e){"use strict";var i=e.extend("sap.suite.ui.microchart.InteractiveDonutChartSegment",{metadata:{library:"sap.suite.ui.microchart",properties:{label:{type:"string",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Appearance",defaultValue:false},value:{type:"float",group:"Data",defaultValue:null},displayedValue:{type:"string",group:"Data",defaultValue:null},color:{type:"sap.m.ValueColor",group:"Misc",defaultValue:"Neutral"}}}});i.prototype.init=function(){this._bNullValue=true;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart")};i.prototype.validateProperty=function(t,i){if(t==="value"){this._bNullValue=i===null||isNaN(i)||typeof i==="undefined"||i<0}return e.prototype.validateProperty.apply(this,arguments)};i.prototype.getTooltip_AsString=function(){var e=this.getTooltip_Text();this._bCustomTooltip=true;if(!e){e=this._createTooltipText();this._bCustomTooltip=false}else if(t._isTooltipSuppressed(e)){e=null}return e};i.prototype._createTooltipText=function(){var t="";var e=this.getLabel();if(e&&e.length>0){t=e+":\n"}if(this._bNullValue){t+=this._oRb.getText("INTERACTIVECHART_NA")}else{t+=this.getDisplayedValue()?this.getDisplayedValue():this.getValue()}var i=this._getSemanticColor();if(i){t+=" "+i}return t};i.prototype._getSemanticColor=function(){var t=this.getColor();var e=this.getParent();if(e&&e._bSemanticTooltip){return this._oRb.getText("SEMANTIC_COLOR_"+t.toUpperCase())}return""};i.prototype._getSegmentTooltip=function(){var t=this.getTooltip_AsString();if(t&&!this._bCustomTooltip){t=t.replace("\n"," ")}return t};return i});