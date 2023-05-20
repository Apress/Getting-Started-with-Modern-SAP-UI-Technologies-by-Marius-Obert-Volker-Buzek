/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","sap/m/library","sap/m/FlexBox","sap/suite/ui/microchart/MicroChartUtils","sap/ui/core/ResizeHandler","./StackedBarMicroChartRenderer"],function(t,e,i,r,a,o,s,n){"use strict";var l=r.Size;var p=r.ValueColor;var u=i.extend("sap.suite.ui.microchart.StackedBarMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{size:{type:"sap.m.Size",group:"Appearance",defaultValue:l.Auto},maxValue:{type:"float",group:"Appearance",defaultValue:null},precision:{type:"int",group:"Appearance",defaultValue:1},displayZeroValue:{type:"boolean",group:"Appearance",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Misc"},height:{type:"sap.ui.core.CSSSize",group:"Misc"},showLabels:{type:"boolean",group:"Misc",defaultValue:true},hideOnNoData:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"bars",aggregations:{bars:{type:"sap.suite.ui.microchart.StackedBarMicroChartBar",multiple:true,bindable:"bindable"}},events:{press:{}}},renderer:n});u.THRESHOLD_SMALL_LOOK=1.125;u.BAR_COLOR_PARAM_DEFAULT="sapUiChartPaletteQualitativeHue";u.BAR_LABEL_CSSCLASS=".sapSuiteStackedMCBarLabel";u.BAR_CSSCLASS=".sapSuiteStackedMCBar";u.prototype.attachEvent=function(){i.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer")}return this};u.prototype.detachEvent=function(){i.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer")}return this};u.prototype.onclick=function(t){if(this.hasListeners("press")){t.stopPropagation();this.firePress()}};u.prototype.onsapspace=u.prototype.onclick;u.prototype.onsapenter=u.prototype.onclick;u.prototype.setMaxValue=function(e){var i=t.isNumeric(e);this.setProperty("maxValue",i?e:null);return this};u.prototype.setTooltip=function(t){this._title=null;this.setAggregation("tooltip",t,true);return this};u.prototype._getAccessibilityControlType=function(){return this._oRb.getText("ACC_CTR_TYPE_STACKEDBARMICROCHART")};u.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","((AltText))",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}};u.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)};u.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate()};u.prototype.onBeforeRendering=function(){if(this._sChartResizeHandlerId){s.deregister(this._sChartResizeHandlerId)}this.$().off("mouseenter");this.$().off("mouseleave")};u.prototype.onAfterRendering=function(){e._checkControlIsVisible(this,this._onControlIsVisible)};u.prototype._onControlIsVisible=function(){this._sChartResizeHandlerId=s.register(this,this._onResize.bind(this));this._onResize();this.$().on("mouseenter",this._addTitleAttribute.bind(this));this.$().on("mouseleave",this._removeTitleAttribute.bind(this))};u.prototype.exit=function(){s.deregister(this._sChartResizeHandlerId)};u.prototype._getLocalizedColorMeaning=function(t){return this._oRb.getText(("SEMANTIC_COLOR_"+t).toUpperCase())};u.prototype._calculateChartData=function(){var t=[];var e=this.getBars();var i=e.length;var r=12;var a=1;var o=this.getPrecision();var s=function(){if(r){if(a===r){a=1}return u.BAR_COLOR_PARAM_DEFAULT+a++}};var n=0;var l=this.getMaxValue();var p=0;for(p;p<i;p++){if(!isNaN(e[p].getValue())){n=n+e[p].getValue()}}var h=Math.max(l,n);var d=l>=n;var c=0;var _=0;var f;for(p=0;p<i;p++){f={oBarData:e[p]};f.color=e[p].getValueColor();if(!f.color){f.color=s()}var g=isNaN(e[p].getValue())?0:e[p].getValue();var y=h===0?0:g*100/h;f.value=this._roundFloat(y,o);f.width=this._roundFloat(y,2);c=c+f.value;_=_+f.width;if(d){f.displayValue=e[p].getDisplayValue()||String(g)}else{f.displayValue=e[p].getDisplayValue()||String(f.value+"%")}t.push(f)}c=this._roundFloat(c,o);_=this._roundFloat(_,2);var C;if(_>100&&t.length>0){C=t.slice(0).sort(function(t,e){return e.width-t.width})[0];C.width=this._roundFloat(C.width-_+100,2)}var A=function(t){return t.some(function(t){return t.width>0})};if(l>n){f={value:this._roundFloat(100-c,o),width:this._roundFloat(100-_,2)};t.push(f)}else if(t.length>0&&_<100&&(!this.getDisplayZeroValue()||A(t))){C=t.slice(0).sort(function(t,e){return e.width-t.width})[0];C.width=this._roundFloat(C.width-_+100,2)}return t};u.prototype._roundFloat=function(t,e){return parseFloat(t.toFixed(e))};u.prototype._onResize=function(){this._resizeVertically();this._resizeHorizontally()};u.prototype._resizeVertically=function(){var t=this.$();var e=parseFloat(t.height());if(e<=this.convertRemToPixels(u.THRESHOLD_SMALL_LOOK)){t.addClass("sapSuiteStackedMCSmallLook")}else{t.removeClass("sapSuiteStackedMCSmallLook")}};u.prototype._resizeHorizontally=function(){this._hideTruncatedLabels(u.BAR_LABEL_CSSCLASS)};u.prototype._hideTruncatedLabels=function(t){var e=this.$();var i=e.find(t);i.removeClass("sapSuiteStackedMCBarLabelHidden");for(var r=0;r<i.length;r++){if(this._isLabelTruncated(i[r])){e.find(i[r]).addClass("sapSuiteStackedMCBarLabelHidden")}}};u.prototype._getAltHeaderText=function(t){var i=this._calculateChartData(),r=this._oRb.getText("STACKEDBARMICROCHART");if(t){r+=" "+this._oRb.getText("IS_ACTIVE")}r+="\n";if(!this._hasData()){r+=this._oRb.getText("NO_DATA");return r}var a,o,s,n=false;for(var l=0;l<i.length;l++){a=i[l];o=a.oBarData;s=o&&o.getTooltip_AsString();if(e._isTooltipSuppressed(s)){continue}if(n){r+="\n"}n=true;if(s){r+=s}else if(a.displayValue){r+=a.displayValue;if(p[a.color]){r+=" "+this._getLocalizedColorMeaning(a.color)}}}return r};u.prototype._isTooltipSuppressed=function(){var t=this.getTooltip_AsString();return t&&t.trim().length===0};u.prototype._addTitleAttribute=function(){if(this.$().attr("title")){return}if(!this._title&&this._hasData()){this._title=this.getTooltip_AsString()}if(this._title){this.$().attr("title",this._title)}};u.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this._title=this.$().attr("title");this.$().removeAttr("title")}};u.prototype._hasData=function(){return this.getBars().length>0};u.prototype.firePress=function(){if(this._hasData()){i.prototype.fireEvent.call(this,"press",arguments)}};o.extendMicroChart(u);return u});