/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/InvisibleText","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/base/Log","./library","./SliderTooltipContainer","./SliderTooltip","./SliderUtilities","./SliderRenderer","./ResponsiveScale","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ui/core/Configuration"],function(e,t,i,o,s,a,n,r,l,p,h,u,g,f,d){"use strict";var c=n.touch;var _=e.extend("sap.m.Slider",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},step:{type:"float",group:"Data",defaultValue:1},progress:{type:"boolean",group:"Misc",defaultValue:true},value:{type:"float",group:"Data",defaultValue:0},showHandleTooltip:{type:"boolean",group:"Appearance",defaultValue:true},showAdvancedTooltip:{type:"boolean",group:"Appearance",defaultValue:false},inputsAsTooltips:{type:"boolean",group:"Appearance",defaultValue:false},enableTickmarks:{type:"boolean",group:"Appearance",defaultValue:false},handlePressed:{type:"boolean",defaultValue:false,group:"Appearance",visibility:"hidden"}},defaultAggregation:"scale",aggregations:{_tooltipContainer:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},scale:{type:"sap.m.IScale",multiple:false,singularName:"scale"},_defaultScale:{type:"sap.m.ResponsiveScale",multiple:false,visibility:"hidden"},_defaultTooltips:{type:"sap.m.SliderTooltipBase",multiple:true,visibility:"hidden"},customTooltips:{type:"sap.m.SliderTooltipBase",multiple:true},_handlesLabels:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}},designtime:"sap/m/designtime/Slider.designtime"},renderer:h});t.apply(_.prototype,[true]);_.prototype._getUsedScale=function(){if(!this.getEnableTickmarks()){return}return this.getAggregation("scale")||this.getAggregation("_defaultScale")};_.prototype._syncScaleUsage=function(){var e=this.getEnableTickmarks(),t=this.getAggregation("scale"),i=this.getAggregation("_defaultScale");if(i&&!e||t&&i){this.destroyAggregation("_defaultScale",true)}if(e&&!t&&!i){this.setAggregation("_defaultScale",new u,true)}};_.prototype._showTooltipsIfNeeded=function(){if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this.updateAdvancedTooltipDom(this.getValue())}};_.prototype._convertValueToRtlMode=function(e){return this.getMax()-e+this.getMin()};_.prototype._recalculateStyles=function(){var e=this.$();this._fSliderWidth=e.width();this._fSliderPaddingLeft=parseFloat(e.css("padding-left"));this._fSliderOffsetLeft=e.offset().left;this._fHandleWidth=this.$("handle").width()};_.prototype._validateProperties=function(){var e=this.getMin(),t=this.getMax(),i=this.getStep(),o=false,s=false;if(e>=t){o=true;s=true;a.warning("Warning: "+"Property wrong min: "+e+" >= max: "+t+" on ",this)}if(i<=0){a.warning("Warning: "+"The step could not be negative on ",this)}if(i>t-e&&!o){s=true;a.warning("Warning: "+"Property wrong step: "+i+" > max: "+t+" - "+"min: "+e+" on ",this)}return s};_.prototype._getPercentOfValue=function(e){return p.getPercentOfValue(e,this.getMin(),this.getMax())};_.prototype._getValueOfPercent=function(e){var t=this.getMin(),i=e*(this.getMax()-t)/100+t,o=this.toFixed(i,this.getDecimalPrecisionOfNumber(this.getStep()));return Number(o)};_.prototype._validateStep=function(e){if(typeof e==="undefined"){return 1}if(typeof e!=="number"){a.warning('Warning: "iStep" needs to be a number',this);return 0}if(Math.floor(e)===e&&isFinite(e)){return e}a.warning('Warning: "iStep" needs to be a finite interger',this);return 0};_.prototype._handleSliderResize=function(e){var t=this._getUsedScale();if(this.getEnableTickmarks()&&t&&t.handleResize){t.handleResize(e)}if(this.getShowAdvancedTooltip()){this._handleTooltipContainerResponsiveness()}};_.prototype._handleTooltipContainerResponsiveness=function(){this.getAggregation("_tooltipContainer").setWidth(this.$().width()+"px")};_.prototype.getDecimalPrecisionOfNumber=function(e){if(Math.floor(e)===e){return 0}var t=e.toString(),i=t.indexOf("."),o=t.indexOf("e-"),s=o!==-1,a=i!==-1;if(s){var n=+t.slice(o+2);if(a){return n+t.slice(i+1,o).length}return n}if(a){return t.length-i-1}return 0};_.prototype.toFixed=function(e,t){if(t===undefined){t=this.getDecimalPrecisionOfNumber(e)}if(t>20){t=20}else if(t<0){t=0}return e.toFixed(t)+""};_.prototype.setDomValue=function(e){var t=this.getDomRef(),i=this._formatValueByCustomElement(e),o=this.getAggregation("_tooltipContainer");if(!t){return}var s=Math.max(this._getPercentOfValue(+e),0)+"%",a=this.getDomRef("handle");if(this.getName()){this.getDomRef("input").setAttribute("value",i)}if(this.getProgress()){this.getDomRef("progress").style.width=s}a.style[d.getRTL()?"right":"left"]=s;if(this.getShowAdvancedTooltip()&&o.getDomRef()){this.updateAdvancedTooltipDom(e)}if(this.getShowHandleTooltip()&&!this.getShowAdvancedTooltip()){a.title=i}this._updateHandleAriaAttributeValues(a,e,i)};_.prototype._updateHandleAriaAttributeValues=function(e,t,i){if(this._isElementsFormatterNotNumerical(t)){e.setAttribute("aria-valuenow",t);e.setAttribute("aria-valuetext",i)}else{e.setAttribute("aria-valuenow",i);e.removeAttribute("aria-valuetext")}};_.prototype._formatValueByCustomElement=function(e,t){var i=this._getUsedScale(),o=this.getUsedTooltips()[0],s=""+e;if(t==="slider"){return s}if(this.getEnableTickmarks()&&i&&i.getLabel){s=""+i.getLabel(e,this)}if(t==="scale"){return s}if(this.getShowAdvancedTooltip()&&o&&o.getLabel){s=""+o.getLabel(e,this)}return s};_.prototype._isElementsFormatterNotNumerical=function(e){var t=this._formatValueByCustomElement(e);return isNaN(t)};_.prototype.updateAdvancedTooltipDom=function(e){var t=this.getUsedTooltips();this.updateTooltipsPositionAndState(t[0],parseFloat(e))};_.prototype.getUsedTooltips=function(){var e=this.getCustomTooltips(),t=this.getAggregation("_defaultTooltips")||[];return e.length?e:t};_.prototype.updateTooltipsPositionAndState=function(e,t){var i=this.getAggregation("_tooltipContainer");e.setValue(t);i.repositionTooltips(this.getMin(),this.getMax())};_.prototype.getClosestHandleDomRef=function(){return this.getDomRef("handle")};_.prototype._increaseValueBy=function(e){var t,i;if(this.getEnabled()){t=this.getValue();this.setValue(t+(e||1));i=this.getValue();if(t<i){this._fireChangeAndLiveChange({value:i})}}};_.prototype._decreaseValueBy=function(e){var t,i;if(this.getEnabled()){t=this.getValue();this.setValue(t-(e||1));i=this.getValue();if(t>i){this._fireChangeAndLiveChange({value:i})}}};_.prototype._getLongStep=function(){var e=this.getMin(),t=this.getMax(),i=this.getStep(),o=(t-e)/10,s=(t-e)/i;return s>10?o:i};_.prototype._fireChangeAndLiveChange=function(e){this.fireChange(e);this.fireLiveChange(e)};_.prototype.handleTooltipChange=function(e){var t=parseFloat(e.getParameter("value"));this.setValue(t);this._fireChangeAndLiveChange({value:t})};_.prototype._registerResizeHandler=function(){if(!this._parentResizeHandler){this._parentResizeHandler=s.register(this,this._handleSliderResize.bind(this))}};_.prototype._deregisterResizeHandler=function(){if(this._parentResizeHandler){s.deregister(this._parentResizeHandler);this._parentResizeHandler=null}};_.prototype.init=function(){var e;this._iActiveTouchId=-1;this._bSetValueFirstCall=true;this._fValueBeforeFocus=0;this._parentResizeHandler=null;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTooltipContainer=null;e=new i({text:this._oResourceBundle.getText("SLIDER_HANDLE")});this.addAggregation("_handlesLabels",e)};_.prototype.exit=function(){if(this._oResourceBundle){this._oResourceBundle=null}if(this.getAggregation("_defaultTooltips")){this.destroyAggregation("_defaultTooltips")}this._deregisterResizeHandler()};_.prototype.onBeforeRendering=function(){var e=this._validateProperties();if(!e){this.setValue(this.getValue());this._sProgressValue=Math.max(this._getPercentOfValue(this.getValue()),0)+"%"}if(this.getShowAdvancedTooltip()){this.initAndSyncTooltips(["leftTooltip"])}this._deregisterResizeHandler();this._syncScaleUsage()};_.prototype.forwardProperties=function(e,t){e.forEach(function(e){t.setProperty(e,this.getProperty(e),true)},this)};_.prototype.forwardPropertiesToDefaultTooltips=function(e){var t=this.getAggregation("_defaultTooltips")||[];for(var i=0;i<e;i++){this.forwardProperties(["min","max","step"],t[i]);t[i].setProperty("width",this._getMaxTooltipWidth()+"px",true);t[i].setProperty("editable",this.getInputsAsTooltips(),true)}};_.prototype.associateCustomTooltips=function(e){this.destroyAggregation("_defaultTooltips",true);this._oTooltipContainer.removeAllAssociation("associatedTooltips",true);for(var t=0;t<e;t++){this._oTooltipContainer.addAssociation("associatedTooltips",this.getCustomTooltips()[t],true)}};_.prototype.assignDefaultTooltips=function(e){var t=this.getAggregation("_defaultTooltips")||[];if(t.length===0){this._oTooltipContainer.removeAllAssociation("associatedTooltips",true);e.forEach(function(e){this.initDefaultTooltip(e)},this)}this.forwardProperties(["enabled"],this._oTooltipContainer);this.forwardPropertiesToDefaultTooltips(e.length)};_.prototype.initAndSyncTooltips=function(e){var t=this.getCustomTooltips(),i=t.length,o=e.length;this.initTooltipContainer();if(i<o){this.assignDefaultTooltips(e)}else{if(i>o){a.warning("Warning: More than "+o+" Custom Tooltips are provided. Only the first will be used.")}this.associateCustomTooltips(o)}};_.prototype.initDefaultTooltip=function(e){var t=new l(this.getId()+"-"+e,{change:this.handleTooltipChange.bind(this)});this.getAggregation("_tooltipContainer").addAssociation("associatedTooltips",t,true);this.addAggregation("_defaultTooltips",t,true)};_.prototype.initTooltipContainer=function(){if(!this._oTooltipContainer){this._oTooltipContainer=new r;this.setAggregation("_tooltipContainer",this._oTooltipContainer,true)}};_.prototype._getMaxTooltipWidth=function(){var e=[Math.abs(this.getMin()),Math.abs(this.getMax())],t=e[0]>e[1]?0:1;return(e[t].toString().length+this.getDecimalPrecisionOfNumber(this.getStep())+1)*p.CONSTANTS.CHARACTER_WIDTH_PX};_.prototype.onAfterRendering=function(){if(this.getShowAdvancedTooltip()){this._recalculateStyles();this._handleTooltipContainerResponsiveness()}this._handleSliderResize({control:this});this._registerResizeHandler()};_.prototype.ontouchstart=function(e){var t=this.getMin(),i=e.targetTouches[0],o,s=this.getRenderer().CSS_CLASS,a="."+s;e.setMarked();if(e.target.className.indexOf("sapMInput")===-1){e.preventDefault()}this.focus();if(c.countContained(e.touches,this.getId())>1||!this.getEnabled()||e.button||e.srcControl!==this){return}this._iActiveTouchId=i.identifier;g(document).on("touchend"+a+" touchcancel"+a+" mouseup"+a,this._ontouchend.bind(this)).on(e.originalEvent.type==="touchstart"?"touchmove"+a:"touchmove"+a+" mousemove"+a,this._ontouchmove.bind(this));var n=this.getClosestHandleDomRef();if(i.target!==n){setTimeout(n["focus"].bind(n),0)}this._recalculateStyles();this._fDiffX=this._fSliderPaddingLeft;this._fInitialValue=this.getValue();this.$("inner").addClass(s+"Pressed");this.setProperty("handlePressed",true);if(i.target===this.getDomRef("handle")){this._fDiffX=i.pageX-g(n).offset().left+this._fSliderPaddingLeft-this._fHandleWidth/2}else{o=(i.pageX-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth*(this.getMax()-t)+t;if(d.getRTL()){o=this._convertValueToRtlMode(o)}this.setValue(o);o=this.getValue();if(this._fInitialValue!==o){this.fireLiveChange({value:o})}}};_.prototype._ontouchmove=function(e){e.setMarked();e.preventDefault();if(e.isMarked("delayedMouseEvent")||!this.getEnabled()||e.button){return}var t=this.getMin(),i=this.getValue(),o=c.find(e.changedTouches,this._iActiveTouchId),s=o?o.pageX:e.pageX,a=(s-this._fDiffX-this._fSliderOffsetLeft)/this._fSliderWidth*(this.getMax()-t)+t;if(d.getRTL()){a=this._convertValueToRtlMode(a)}this.setValue(a);a=this.getValue();if(i!==a){this.fireLiveChange({value:a})}};_.prototype._ontouchend=function(e){var t=this.getRenderer().CSS_CLASS,i="."+t;e.setMarked();if(e.isMarked("delayedMouseEvent")||!this.getEnabled()||e.button){return}g(document).off(i);var o=this.getValue();this.setProperty("handlePressed",false);if(this._fInitialValue!==o){this.fireChange({value:o})}};_.prototype.onfocusin=function(e){this._fValueBeforeFocus=this.getValue();if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this._setAriaControls();this.updateAdvancedTooltipDom(this.getValue())}};_.prototype._setAriaControls=function(){var e=this.getUsedTooltips()[0],t=this.getFocusDomRef();if(this.getInputsAsTooltips()&&e&&e.getDomRef()){t.setAttribute("aria-controls",e.getId())}};_.prototype.onfocusout=function(e){if(!this.getShowAdvancedTooltip()){return}var t=g.contains(this.getDomRef(),e.relatedTarget),i=g.contains(this.getAggregation("_tooltipContainer").getDomRef(),e.relatedTarget);if(t||i){return}this.getAggregation("_tooltipContainer").hide()};_.prototype.onmouseover=function(e){var t,i;if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);i=this.getAggregation("_tooltipContainer");t=g.contains(i.getDomRef(),document.activeElement);this._setAriaControls();if(t){return}this.updateAdvancedTooltipDom(this.getValue())}};_.prototype.onmouseout=function(e){if(!this.getShowAdvancedTooltip()){return}var t=this.getAggregation("_tooltipContainer").getDomRef(),i=this.getDomRef(),o=g.contains(i,document.activeElement),s=g.contains(t,document.activeElement);if(!t||o||s){return}if(g.contains(this.getDomRef(),e.toElement)||i===e.toElement){return}if(g.contains(this.getAggregation("_tooltipContainer").getDomRef(),e.toElement)){return}this.getAggregation("_tooltipContainer").hide()};_.prototype.onkeydown=function(e){var t=this.getUsedTooltips();if(e.keyCode===p.CONSTANTS.F2_KEYCODE&&t[0]&&this.getInputsAsTooltips()){t[0].focus()}if(e.keyCode===f.SPACE){e.preventDefault()}};_.prototype.onsapincrease=function(e){var t,i;e.preventDefault();e.setMarked();if(this.getEnabled()){t=this.getValue();this.stepUp(1);i=this.getValue();if(t<i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};_.prototype.onsapincreasemodifiers=function(e){if(e.altKey){return}e.preventDefault();e.stopPropagation();e.setMarked();this._increaseValueBy(this._getLongStep());this._showTooltipsIfNeeded()};_.prototype.onsapdecrease=function(e){var t,i;e.preventDefault();e.setMarked();if(this.getEnabled()){t=this.getValue();this.stepDown(1);i=this.getValue();if(t>i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};_.prototype.onsapdecreasemodifiers=function(e){if(e.altKey){return}e.preventDefault();e.stopPropagation();e.setMarked();this._decreaseValueBy(this._getLongStep());this._showTooltipsIfNeeded()};_.prototype.onsapplus=function(e){var t,i;e.setMarked();if(this.getEnabled()){t=this.getValue();this.stepUp(1);i=this.getValue();if(t<i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};_.prototype.onsapminus=function(e){var t,i;e.setMarked();if(this.getEnabled()){t=this.getValue();this.stepDown(1);i=this.getValue();if(t>i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};_.prototype.onsapescape=function(){this.setValue(this._fValueBeforeFocus)};_.prototype.onsappageup=_.prototype.onsapincreasemodifiers;_.prototype.onsappagedown=_.prototype.onsapdecreasemodifiers;_.prototype.onsaphome=function(e){e.setMarked();var t=this.getMin();e.preventDefault();if(this.getEnabled()&&this.getValue()>t){this.setValue(t);this._fireChangeAndLiveChange({value:t})}this._showTooltipsIfNeeded()};_.prototype.onsapend=function(e){e.setMarked();var t=this.getMax();e.preventDefault();if(this.getEnabled()&&this.getValue()<t){this.setValue(t);this._fireChangeAndLiveChange({value:t})}this._showTooltipsIfNeeded()};_.prototype.getFocusDomRef=function(){return this.getDomRef("handle")};_.prototype.stepUp=function(e){return this.setValue(this.getValue()+this._validateStep(e)*this.getStep(),{snapValue:false})};_.prototype.stepDown=function(e){return this.setValue(this.getValue()-this._validateStep(e)*this.getStep(),{snapValue:false})};_.prototype.setValue=function(e,t){if(this._bSetValueFirstCall){this._bSetValueFirstCall=false;return this.setProperty("value",e,true)}var i=this.getMin(),o=this.getMax(),s=this.getStep(),a=this.getValue(),n,r=true,l;if(t){r=!!t.snapValue}if(typeof e!=="number"||!isFinite(e)){return this}l=Math.abs((e-i)%s);if(r&&l!==0){e=l*2>=s?e+s-l:e-l}if(e<i){e=i}else if(e>o){e=o}n=this.toFixed(e,this.getDecimalPrecisionOfNumber(s));e=Number(n);this.setProperty("value",e);if(a!==this.getValue()){this.setDomValue(n)}return this};return _});