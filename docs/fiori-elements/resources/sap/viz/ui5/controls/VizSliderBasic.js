/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/m/library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/m/Input","sap/m/ResponsiveScale","sap/ui/core/InvisibleText","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/base/Log","./VizSliderBasicRenderer"],function(t,e,i,s,a,n,o,r,l,h){"use strict";var u=e.touch;var p=r.TextAlign;var f=i.extend("sap.viz.ui5.controls.VizSliderBasic",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.viz",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},step:{type:"float",group:"Data",defaultValue:1},progress:{type:"boolean",group:"Misc",defaultValue:true},value:{type:"float",group:"Data",defaultValue:0},showHandleTooltip:{type:"boolean",group:"Appearance",defaultValue:true},showAdvancedTooltip:{type:"boolean",group:"Appearance",defaultValue:false},inputsAsTooltips:{type:"boolean",group:"Appearance",defaultValue:false},enableTickmarks:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"scale",aggregations:{scale:{type:"sap.m.IScale",multiple:false,singularName:"scale"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}},designTime:true}});f.prototype._CONSTANTS={CHARACTER_WIDTH_PX:8,INPUT_STATE_NONE:"None",INPUT_STATE_ERROR:"Error",TICKMARKS:{MAX_POSSIBLE:100,MIN_SIZE:{SMALL:8,WITH_LABEL:80}}};s.apply(f.prototype,[true]);f.prototype._convertValueToRtlMode=function(t){return this.getMax()-t+this.getMin()};f.prototype._recalculateStyles=function(){var t=this.$(),e=this.$().find("."+this.getRenderer().CSS_CLASS+"Handle").eq(0),i=parseFloat(e.css("width"))+2*parseFloat(e.css("border-width")),s=parseFloat(this.$("progress").parent().css("width"));this._fSliderWidth=t.width();this._fSliderPaddingLeft=parseFloat(t.css("padding-left"));this._fSliderOffsetLeft=t.offset().left;this._fHandleWidth=this.$("handle").width();this._fTooltipHalfWidthPercent=(this._fSliderWidth-(this._fSliderWidth-(this._iLongestRangeTextWidth/2+this._CONSTANTS.CHARACTER_WIDTH_PX)))/this._fSliderWidth*100;this._fHandleWidthPercent=i/s*100/2};f.prototype._validateProperties=function(){var t=this.getMin(),e=this.getMax(),i=this.getStep(),s=false,a=false;if(t>=e){s=true;a=true;h.warning("Warning: "+"Property wrong min: "+t+" >= max: "+e+" on ",this)}if(i<=0){h.warning("Warning: "+"The step could not be negative on ",this)}if(i>e-t&&!s){a=true;h.warning("Warning: "+"Property wrong step: "+i+" > max: "+e+" - "+"min: "+t+" on ",this)}return a};f.prototype._getPercentOfValue=function(t){var e=this.getMin(),i=(t-e)/(this.getMax()-e)*100;return i};f.prototype._getValueOfPercent=function(t){var e=this.getMin(),i=t*(this.getMax()-e)/100+e,s=this.toFixed(i,this.getDecimalPrecisionOfNumber(this.getStep()));return Number(s)};f.prototype._validateStep=function(t){if(typeof t==="undefined"){return 1}if(typeof t!=="number"){h.warning('Warning: "iStep" needs to be a number',this);return 0}if(Math.floor(t)===t&&isFinite(t)){return t}h.warning('Warning: "iStep" needs to be a finite interger',this);return 0};f.prototype._handleTickmarksResponsiveness=function(){var t,e,i,s,a=this.getAggregation("scale"),n=this.$().find("."+this.getRenderer().CSS_CLASS+"Tick"),o=this.$().find("."+this.getRenderer().CSS_CLASS+"Tickmarks").width(),r=o/n.length>=this._CONSTANTS.TICKMARKS.MIN_SIZE.SMALL;if(this._bTickmarksLastVisibilityState!==r){n.toggle(r);this._bTickmarksLastVisibilityState=r}t=this.$().find("."+this.getRenderer().CSS_CLASS+"TickLabel").toArray();e=parseFloat(t[1].style.left);i=o*e/100;s=a.getHiddenTickmarksLabels(o,t.length,i,this._CONSTANTS.TICKMARKS.MIN_SIZE.WITH_LABEL);t.forEach(function(t,e){t.style.display=s[e]?"none":"inline-block"})};f.prototype.getDecimalPrecisionOfNumber=function(t){if(Math.floor(t)===t){return 0}var e=t.toString(),i=e.indexOf("."),s=e.indexOf("e-"),a=s!==-1,n=i!==-1;if(a){var o=+e.slice(s+2);if(n){return o+e.slice(i+1,s).length}return o}if(n){return e.length-i-1}return 0};f.prototype.toFixed=function(t,e){if(e===undefined){e=this.getDecimalPrecisionOfNumber(t)}if(e>20){e=20}else if(e<0){e=0}return t.toFixed(e)+""};f.prototype.setDomValue=function(t){var e=this.getDomRef();if(!e){return}var i=Math.max(this._getPercentOfValue(+t),0)+"%",s=this.getDomRef("handle");if(this.getName()){this.getDomRef("input").setAttribute("value",t)}if(this.getProgress()){this.getDomRef("progress").style.width=i}s.style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=i;if(this.getShowAdvancedTooltip()){this._updateAdvancedTooltipDom(t)}if(this.getShowHandleTooltip()&&!this.getShowAdvancedTooltip()){s.title=t}s.setAttribute("aria-valuenow",t)};f.prototype._updateAdvancedTooltipDom=function(t){var e=this.getInputsAsTooltips(),i=this.getDomRef("TooltipsContainer"),s=e&&this._oInputTooltip?this._oInputTooltip.tooltip:this.getDomRef("Tooltip"),a=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";if(!e){s.innerHTML=t}else if(e&&s.getValue()!==t){s.setValueState(this._CONSTANTS.INPUT_STATE_NONE);s.setValue(t);s.$("inner").attr("value",t)}i.style[a]=this._getTooltipPosition(t)};f.prototype._getTooltipPosition=function(t){var e=this._getPercentOfValue(+t);if(e<this._fHandleWidthPercent/2){return-this._fHandleWidthPercent+"%"}else if(e>100-this._fTooltipHalfWidthPercent+this._fHandleWidthPercent){return 100-this._fTooltipHalfWidthPercent*2+this._fHandleWidthPercent+"%"}else{return e-this._fTooltipHalfWidthPercent+"%"}};f.prototype.getClosestHandleDomRef=function(){return this.getDomRef("handle")};f.prototype._increaseValueBy=function(t){var e,i;if(this.getEnabled()){e=this.getValue();this.setValue(e+(t||1));i=this.getValue();if(e<i){this._fireChangeAndLiveChange({value:i})}}};f.prototype._decreaseValueBy=function(t){var e,i;if(this.getEnabled()){e=this.getValue();this.setValue(e-(t||1));i=this.getValue();if(e>i){this._fireChangeAndLiveChange({value:i})}}};f.prototype._getLongStep=function(){var t=this.getMin(),e=this.getMax(),i=this.getStep(),s=(e-t)/10,a=(e-t)/i;return a>10?s:i};f.prototype._fireChangeAndLiveChange=function(t){this.fireChange(t);this.fireLiveChange(t)};f.prototype._hasFocus=function(){return document.activeElement===this.getFocusDomRef()};f.prototype._createInputField=function(t,e){var i=new a(this.getId()+"-"+t,{value:this.getMin(),width:this._iLongestRangeTextWidth+2*this._CONSTANTS.CHARACTER_WIDTH_PX+"px",type:"Number",textAlign:p.Center,ariaLabelledBy:e});i.attachChange(this._handleInputChange.bind(this,i));i.addEventDelegate({onsapdown:this._inputArrowDown},this);i.addEventDelegate({onsapup:this._inputArrowUp},this);i.addEventDelegate({onfocusout:function(t){if(t.target.value!==undefined){t.srcControl.fireChange({value:t.target.value})}}});return i};f.prototype._inputArrowDown=function(t){var e=t;e.srcControl=this;t.preventDefault();t.stopPropagation();this.onsapdecrease(e)};f.prototype._inputArrowUp=function(t){var e=t;e.srcControl=this;t.preventDefault();t.stopPropagation();this.onsapincrease(e)};f.prototype._handleInputChange=function(t,e){var i=parseFloat(e.getParameter("value"));if(e.getParameter("value")==""||isNaN(i)||i<this.getMin()||i>this.getMax()){t.setValueState(this._CONSTANTS.INPUT_STATE_ERROR);return}t.setValueState(this._CONSTANTS.INPUT_STATE_NONE);this.setValue(i);this._fireChangeAndLiveChange({value:this.getValue()})};f.prototype.init=function(){this._iActiveTouchId=-1;this._bSetValueFirstCall=true;this._iLongestRangeTextWidth=0;this._fTooltipHalfWidthPercent=0;this._fHandleWidthPercent=0;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m")};f.prototype.exit=function(){if(this._oInputTooltip){this._oInputTooltip.label.destroy();this._oInputTooltip.label=null;this._oInputTooltip.tooltip.destroy();this._oInputTooltip.tooltip=null;this._oInputTooltip=null}if(this._oResourceBundle){this._oResourceBundle=null}if(this._parentResizeHandler){l.deregister(this._parentResizeHandler);this._parentResizeHandler=null}};f.prototype.onBeforeRendering=function(){var t=this._validateProperties(),e=[Math.abs(this.getMin()),Math.abs(this.getMax())],i=e[0]>e[1]?0:1;if(!t){this.setValue(this.getValue());this._sProgressValue=Math.max(this._getPercentOfValue(this.getValue()),0)+"%"}if(!this._hasFocus()){this._fInitialFocusValue=this.getValue()}if(this.getShowAdvancedTooltip()){this._iLongestRangeTextWidth=(e[i].toString().length+this.getDecimalPrecisionOfNumber(this.getStep())+1)*this._CONSTANTS.CHARACTER_WIDTH_PX}if(this.getInputsAsTooltips()&&!this._oInputTooltip){var s=new o({text:this._oResourceBundle.getText("SLIDER_HANDLE")});this._oInputTooltip={tooltip:this._createInputField("Tooltip",s),label:s}}if(this.getEnableTickmarks()&&!this.getAggregation("scale")){this.setAggregation("scale",new n)}};f.prototype.onAfterRendering=function(){if(this.getShowAdvancedTooltip()){this._recalculateStyles();this._updateAdvancedTooltipDom(this.getValue())}if(this.getEnableTickmarks()){setTimeout(function(){this._parentResizeHandler=l.register(this,this._handleTickmarksResponsiveness.bind(this))}.bind(this),0)}};f.prototype.ontouchstart=function(e){var i=this.getMin(),s=e.targetTouches[0],a,n=this.getRenderer().CSS_CLASS,o="."+n;e.setMarked();if(e.target.className.indexOf("sapMInput")===-1){e.preventDefault()}if(u.countContained(e.touches,this.getId())>1||!this.getEnabled()||e.button||e.srcControl!==this){return}this._iActiveTouchId=s.identifier;t(document).on("touchend"+o+" touchcancel"+o+" mouseup"+o,this._ontouchend.bind(this)).on(e.originalEvent.type==="touchstart"?"touchmove"+o:"touchmove"+o+" mousemove"+o,this._ontouchmove.bind(this));var r=this.getClosestHandleDomRef();if(s.target!==r){setTimeout(r["focus"].bind(r),0)}if(!this._hasFocus()){this._fInitialFocusValue=this.getValue()}this._recalculateStyles();this._fDiffX=this._fSliderPaddingLeft;this._fInitialValue=this.getValue();this.$("inner").addClass(n+"Pressed");if(s.target===this.getDomRef("handle")){this._fDiffX=s.pageX-t(r).offset().left+this._fSliderPaddingLeft-this._fHandleWidth/2}else{a=(s.pageX-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth*(this.getMax()-i)+i;if(sap.ui.getCore().getConfiguration().getRTL()){a=this._convertValueToRtlMode(a)}this.setValue(a);a=this.getValue();if(this._fInitialValue!==a){this.fireLiveChange({value:a})}}};f.prototype._ontouchmove=function(t){t.setMarked();t.preventDefault();if(t.isMarked("delayedMouseEvent")||!this.getEnabled()||t.button){return}var e=this.getMin(),i=this.getValue(),s=u.find(t.changedTouches,this._iActiveTouchId),a=s?s.pageX:t.pageX,n=(a-this._fDiffX-this._fSliderOffsetLeft)/this._fSliderWidth*(this.getMax()-e)+e;if(sap.ui.getCore().getConfiguration().getRTL()){n=this._convertValueToRtlMode(n)}this.setValue(n);n=this.getValue();if(i!==n){this.fireLiveChange({value:n})}};f.prototype._ontouchend=function(e){var i=this.getRenderer().CSS_CLASS,s="."+i;e.setMarked();if(e.isMarked("delayedMouseEvent")||!this.getEnabled()||e.button){return}t(document).off(s);var a=this.getValue();this.$("inner").removeClass(i+"Pressed");if(this._fInitialValue!==a){this.fireChange({value:a})}};f.prototype.onfocusin=function(t){this.$("TooltipsContainer").addClass(this.getRenderer().CSS_CLASS+"HandleTooltipsShow");if(!this._hasFocus()){this._fInitialFocusValue=this.getValue()}};f.prototype.onfocusout=function(e){if(this.getInputsAsTooltips()&&t.contains(this.getDomRef(),e.relatedTarget)){return}this.$("TooltipsContainer").removeClass(this.getRenderer().CSS_CLASS+"HandleTooltipsShow");this.$("progress").removeClass("focus")};f.prototype.onsapincrease=function(t){var e,i;if(t.srcControl!==this){return}t.preventDefault();t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepUp(1);i=this.getValue();if(e<i){this._fireChangeAndLiveChange({value:i})}}};f.prototype.onsapincreasemodifiers=function(t){if(t.srcControl!==this||t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();this._increaseValueBy(this._getLongStep())};f.prototype.onsapdecrease=function(t){var e,i;if(t.srcControl!==this){return}t.preventDefault();t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepDown(1);i=this.getValue();if(e>i){this._fireChangeAndLiveChange({value:i})}}};f.prototype.onsapdecreasemodifiers=function(t){if(t.srcControl!==this||t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();this._decreaseValueBy(this._getLongStep())};f.prototype.onsapplus=function(t){var e,i;if(t.srcControl!==this){return}t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepUp(1);i=this.getValue();if(e<i){this._fireChangeAndLiveChange({value:i})}}};f.prototype.onsapminus=function(t){var e,i;if(t.srcControl!==this){return}t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepDown(1);i=this.getValue();if(e>i){this._fireChangeAndLiveChange({value:i})}}};f.prototype.onsappageup=f.prototype.onsapincreasemodifiers;f.prototype.onsappagedown=f.prototype.onsapdecreasemodifiers;f.prototype.onsaphome=function(t){if(t.srcControl!==this){return}t.setMarked();var e=this.getMin();t.preventDefault();if(this.getEnabled()&&this.getValue()>e){this.setValue(e);this._fireChangeAndLiveChange({value:e})}};f.prototype.onsapend=function(t){if(t.srcControl!==this){return}t.setMarked();var e=this.getMax();t.preventDefault();if(this.getEnabled()&&this.getValue()<e){this.setValue(e);this._fireChangeAndLiveChange({value:e})}};f.prototype.onsaptabnext=function(){this._fInitialFocusValue=this.getValue()};f.prototype.onsaptabprevious=function(){this._fInitialFocusValue=this.getValue()};f.prototype.onsapescape=function(){this.setValue(this._fInitialFocusValue)};f.prototype.getFocusDomRef=function(){return this.getDomRef("handle")};f.prototype.stepUp=function(t){return this.setValue(this.getValue()+this._validateStep(t)*this.getStep(),{snapValue:false})};f.prototype.stepDown=function(t){return this.setValue(this.getValue()-this._validateStep(t)*this.getStep(),{snapValue:false})};f.prototype.setValue=function(t,e){if(this._bSetValueFirstCall){this._bSetValueFirstCall=false;return this.setProperty("value",t,true)}var i=this.getMin(),s=this.getMax(),a=this.getStep(),n=this.getValue(),o,r=true,l;if(e){r=!!e.snapValue}if(typeof t!=="number"||!isFinite(t)){return this}l=Math.abs((t-i)%a);if(r&&l!==0){t=l*2>=a?t+a-l:t-l}if(t<i){t=i}else if(t>s){t=s}o=this.toFixed(t,this.getDecimalPrecisionOfNumber(a));t=Number(o);this.setProperty("value",t,true);if(n!==this.getValue()){this.setDomValue(o)}return this};return f});