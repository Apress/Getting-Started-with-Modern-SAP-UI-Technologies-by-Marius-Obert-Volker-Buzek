/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["./library","sap/m/library","sap/ui/core/Control","sap/m/FlexBox","sap/ui/core/ResizeHandler","sap/ui/events/KeyCodes","sap/suite/ui/microchart/MicroChartUtils","./BulletMicroChartRenderer"],function(e,t,i,a,s,r,o,l){"use strict";var u=t.Size;var n=i.extend("sap.suite.ui.microchart.BulletMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{size:{type:"sap.m.Size",group:"Misc",defaultValue:u.Auto},mode:{type:"sap.suite.ui.microchart.BulletMicroChartModeType",group:"Misc",defaultValue:"Actual"},scale:{type:"string",group:"Misc",defaultValue:""},forecastValue:{type:"float",group:"Misc",defaultValue:null},targetValue:{type:"float",group:"Misc",defaultValue:null},minValue:{type:"float",group:"Misc",defaultValue:null},maxValue:{type:"float",group:"Misc",defaultValue:null},showActualValue:{type:"boolean",group:"Misc",defaultValue:true},showDeltaValue:{type:"boolean",group:"Misc",defaultValue:true},showActualValueInDeltaMode:{type:"boolean",group:"Misc",defaultValue:false},showTargetValue:{type:"boolean",group:"Misc",defaultValue:true},showValueMarker:{type:"boolean",group:"Misc",defaultValue:false},showThresholds:{type:"boolean",group:"Misc",defaultValue:true},actualValueLabel:{type:"string",group:"Misc",defaultValue:""},deltaValueLabel:{type:"string",group:"Misc",defaultValue:""},targetValueLabel:{type:"string",group:"Misc",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Misc"},height:{type:"sap.ui.core.CSSSize",group:"Misc"},scaleColor:{type:"sap.suite.ui.microchart.CommonBackgroundType",group:"Misc",defaultValue:"MediumLight"},isResponsive:{type:"boolean",group:"Appearance",defaultValue:false},hideOnNoData:{type:"boolean",group:"Appearance",defaultValue:false},smallRangeAllowed:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"actual",aggregations:{actual:{type:"sap.suite.ui.microchart.BulletMicroChartData",multiple:false,bindable:"bindable"},thresholds:{type:"sap.suite.ui.microchart.BulletMicroChartData",multiple:true,singularName:"threshold",bindable:"bindable"}},events:{press:{}}},renderer:l});n.THRESHOLD_SMALL_LABEL=3.5;n.THRESHOLD_BIG_LABEL=4.5;n.THRESHOLD_SMALL_LOOK=3.5;n.THRESHOLD_EXTRASMALL_LOOK=1.3125;n.THRESHOLD_THRESHOLDS=6;n.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","((AltText))",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}};n.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)}};n.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this)};n.prototype._calculateChartData=function(){var t=98,i=this.getThresholds(),a=[],s=this.getTargetValue(),r=this.getForecastValue(),o=this.getActual()&&this.getActual().getValue()?this.getActual().getValue():0,l=[],u=0,n=0,h=0,p;if(this.getActual()&&this.getActual()._isValueSet){l.push(o)}if(this._isForecastValueSet){l.push(r)}if(this._isTargetValueSet){l.push(s)}if(this._isMinValueSet){l.push(this.getMinValue())}if(this._isMaxValueSet){l.push(this.getMaxValue())}for(p=0;p<i.length;p++){l.push(i[p].getValue())}if(l.length>0){u=n=l[0];for(p=0;p<l.length;p++){if(l[p]<u){u=l[p]}if(l[p]>n){n=l[p]}}if(this.getSmallRangeAllowed()==false){n=n<0&&n<3*(u-n)?0:n;u=u>0&&u>3*(n-u)?0:u}h=n-u;for(p=0;p<i.length;p++){a[p]={color:i[p].getColor(),valuePct:!i[p]._isValueSet||h===0?0:((i[p].getValue()-u)*t/h).toFixed(2)}}}var f,c;if(this.getMode()===e.BulletMicroChartModeType.Delta){f=!this.getActual()||!this.getActual()._isValueSet||h===0?49:(.05+(o-u)*t/h).toFixed(2);c=!this._isTargetValueSet||h===0?49:((s-u)*t/h).toFixed(2)}else{f=!this.getActual()||!this.getActual()._isValueSet||h===0||u===0&&this.getActual().getValue()===0?0:(.05+(o-u)*t/h).toFixed(2);c=!this._isTargetValueSet||h===0?0:((s-u)*t/h).toFixed(2)}return{actualValuePct:f,targetValuePct:c,forecastValuePct:!this._isForecastValueSet||h===0?0:((r-u)*t/h).toFixed(2),thresholdsPct:a,fScaleWidthPct:t}};n.prototype._calculateDeltaValue=function(){if(!this.getActual()._isValueSet||!this._isTargetValueSet){return 0}else{var e=this.getActual().getValue();var t=this.getTargetValue();return Math.abs(e-t).toFixed(Math.max(this._digitsAfterDecimalPoint(e),this._digitsAfterDecimalPoint(t)))}};n.prototype.setMinValue=function(e){this._isMinValueSet=this._fnIsNumber(e);return this.setProperty("minValue",this._isMinValueSet?e:NaN)};n.prototype.setMaxValue=function(e){this._isMaxValueSet=this._fnIsNumber(e);return this.setProperty("maxValue",this._isMaxValueSet?e:NaN)};n.prototype.setTargetValue=function(e){this._isTargetValueSet=this._fnIsNumber(e);return this.setProperty("targetValue",this._isTargetValueSet?e:NaN)};n.prototype.setForecastValue=function(e){this._isForecastValueSet=this._fnIsNumber(e);return this.setProperty("forecastValue",this._isForecastValueSet?e:NaN)};n.prototype.setSize=function(e){if(this.getSize()!==e){if(e===u.Responsive){this.setProperty("isResponsive",true)}else{this.setProperty("isResponsive",false)}this.setProperty("size",e,false)}return this};n.prototype.setIsResponsive=function(e){var t,i=this.getSize();this.setProperty("isResponsive",e);if(e){t=u.Responsive}else{t=i===u.Responsive?u.Auto:i}this.setProperty("size",t);return this};n.prototype.ontap=function(e){this.firePress()};n.prototype.onkeydown=function(e){if(e.which===r.SPACE){e.preventDefault()}};n.prototype.onkeyup=function(e){if(e.which===r.ENTER||e.which===r.SPACE){this.firePress();e.preventDefault()}};n.prototype._fnIsNumber=function(e){return typeof e==="number"&&!isNaN(e)&&isFinite(e)};n.prototype.attachEvent=function(e,t,a,s){i.prototype.attachEvent.call(this,e,t,a,s);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer")}return this};n.prototype.detachEvent=function(e,t,a){i.prototype.detachEvent.call(this,e,t,a);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer")}return this};n.prototype.onBeforeRendering=function(){if(this._sChartResizeHandlerId){s.deregister(this._sChartResizeHandlerId)}this._unbindMouseEnterLeaveHandler()};n.prototype.onAfterRendering=function(){e._checkControlIsVisible(this,this._onControlIsVisible);this._bindMouseEnterLeaveHandler()};n.prototype._onControlIsVisible=function(){this._onResize();this._sChartResizeHandlerId=s.register(this,this._onResize.bind(this))};n.prototype._onResize=function(){var e=this.$(),t=parseInt(e.css("height")),i=parseInt(e.css("width"));if(this.getShowValueMarker()){this._adjustValueToMarker()}e.removeClass("sapSuiteBMCSmallFont sapSuiteBMCNoLabels sapSuiteBMCSmallLook sapSuiteBMCExtraSmallLook sapSuiteBMCThresholdHidden");if(t<=this.convertRemToPixels(n.THRESHOLD_EXTRASMALL_LOOK)){e.addClass("sapSuiteBMCExtraSmallLook")}else if(t<=this.convertRemToPixels(n.THRESHOLD_SMALL_LOOK)){e.addClass("sapSuiteBMCSmallLook")}if(t>=this.convertRemToPixels(n.THRESHOLD_SMALL_LABEL)&&t<=this.convertRemToPixels(n.THRESHOLD_BIG_LABEL)){e.addClass("sapSuiteBMCSmallFont")}if(t<this.convertRemToPixels(n.THRESHOLD_SMALL_LABEL)||this._isAnyChartLabelTruncated()){e.addClass("sapSuiteBMCNoLabels")}if(i<this.convertRemToPixels(n.THRESHOLD_THRESHOLDS)){e.addClass("sapSuiteBMCThresholdHidden")}this._adjustLabelsPos()};n.prototype._isAnyChartLabelTruncated=function(){var e=this.$().find(".sapSuiteBMCItemValue, .sapSuiteBMCTargetValue");return this._isAnyLabelTruncated(e)};n.prototype.exit=function(){s.deregister(this._sChartResizeHandlerId)};n.prototype._adjustLabelsPos=function(){var t=sap.ui.getCore().getConfiguration().getRTL();var i=this.$("bc-target-bar-value");var a=this.$("chart-bar");var s=a.width();if(s){var r=0;if(i&&i.offset()){r=i.offset().left-a.offset().left;if(t){r=s-r}this._adjustLabelPos(this.$("bc-target-value"),s,r,t)}var o=this.$("bc-bar-value");if(o&&o.offset()){var l=o.offset().left+o.width()-a.offset().left;if(t){l=s-(o.offset().left-a.offset().left)}if(this.getMode()===e.BulletMicroChartModeType.Delta){l=o.width();if(!this.getShowActualValueInDeltaMode()){l=l/2}var u=this.getTargetValue()<this.getActual().getValue()?1:-1;l=i.offset().left-a.offset().left+l*u}this._adjustLabelPos(this.$("bc-item-value"),s,l,t)}}};n.prototype._adjustLabelPos=function(e,t,i,a){var s=a?"right":"left";var r=e.width();if(r>t){e.css(s,"0")}else{var o=i-.5*r;if(o<0){o=0}if(o+r>t){o=t-r}e.css(s,o)}};n.prototype._adjustValueToMarker=function(){var e=this.$("bc-bar-value");var t=this.$("bc-bar-value-marker");var i=this.$().find(".sapSuiteBMCVerticalAlignmentContainer");if(e.offset()&&t.offset()){var a=e.width();var s=e.offset().left;var r=t.width();var o=t.offset().left;if(sap.ui.getCore().getConfiguration().getRTL()){if(o<s){t.css("right","");t.offset({left:s})}if(o+r>s+a){t.css("right","");t.offset({left:s+a-r})}}else{if(o<s){t.offset({left:s})}if(o+r>s+a){e.width((o+r-s)/i.width()*100+"%")}}}};n.prototype._getLocalizedColorMeaning=function(e){return this._oRb.getText(("SEMANTIC_COLOR_"+e).toUpperCase())};n.prototype._getAltHeaderText=function(t){var i=this._oRb.getText("BULLETMICROCHART");if(t){i+=" "+this._oRb.getText("IS_ACTIVE")}if(!this._hasData()){i+="\n"+this._oRb.getText("NO_DATA");return i}var a=this.getActual()&&this.getActual()._isValueSet;var s=this.getScale();var r=this.getTargetValueLabel();var o=!this.getActual()||!this.getActual().getColor()?"":this._getLocalizedColorMeaning(this.getActual().getColor());if(a){var l=this.getActualValueLabel();var u=l?l:""+this.getActual().getValue();i+="\n"+this._oRb.getText("BULLETMICROCHART_ACTUAL_TOOLTIP",[u+s,o])}if(this.getMode()===e.BulletMicroChartModeType.Delta){if(this._isTargetValueSet&&a){var n=this.getDeltaValueLabel();var h=n?n:""+this._calculateDeltaValue();i+="\n"+this._oRb.getText("BULLETMICROCHART_DELTA_TOOLTIP",[h+s,o])}}else if(this._isForecastValueSet){i+=this._isForecastValueSet?"\n"+this._oRb.getText("BULLETMICROCHART_FORECAST_TOOLTIP",[this.getForecastValue()+s,o]):""}if(this._isTargetValueSet){var p=r?r:""+this.getTargetValue();i+="\n"+this._oRb.getText("BULLETMICROCHART_TARGET_TOOLTIP",[p+s])}return i};n.prototype._getAltSubText=function(e){var t="";var i=this.getThresholds().sort(function(e,t){return e.getValue()-t.getValue()});for(var a=0;a<i.length;a++){var s=i[a],r=s.getTooltip_AsString(),o="";if(!r){continue}o+=(e?"":"\n")+this._oRb.getText("BULLETMICROCHART_THRESHOLD_TOOLTIP",[s.getValue()+this.getScale(),this._getLocalizedColorMeaning(s.getColor())]);o=r.split("((AltText))").join(o);if(o){t+=o;e=false}}return t};n.prototype._getAccessibilityControlType=function(){return this._oRb.getText("ACC_CTR_TYPE_BULLETMICROCHART")};n.prototype.clone=function(e,t,a){var s=i.prototype.clone.apply(this,arguments);s._isMinValueSet=this._isMinValueSet;s._isMaxValueSet=this._isMaxValueSet;s._isForecastValueSet=this._isForecastValueSet;s._isTargetValueSet=this._isTargetValueSet;return s};n.prototype._addTitleAttribute=function(){if(!this.$().attr("title")&&this._hasData()){this.$().attr("title",this.getTooltip_AsString())}};n.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this.$().removeAttr("title")}};n.prototype._bindMouseEnterLeaveHandler=function(){if(!this._oMouseEnterLeaveHandler){this._oMouseEnterLeaveHandler={mouseEnterChart:this._addTitleAttribute.bind(this),mouseLeaveChart:this._removeTitleAttribute.bind(this)}}this.$().on("mouseenter",this._oMouseEnterLeaveHandler.mouseEnterChart);this.$().on("mouseleave",this._oMouseEnterLeaveHandler.mouseLeaveChart)};n.prototype._unbindMouseEnterLeaveHandler=function(){if(this._oMouseEnterLeaveHandler){this.$().off("mouseenter",this._oMouseEnterLeaveHandler.mouseEnterChart);this.$().off("mouseleave",this._oMouseEnterLeaveHandler.mouseLeaveChart)}};n.prototype._hasData=function(){return this.getActual()};n.prototype.firePress=function(){if(this._hasData()){i.prototype.fireEvent.call(this,"press",arguments)}};o.extendMicroChart(n);return n});