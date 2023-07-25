/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Configuration","./TimePickerClockRenderer","sap/ui/Device","sap/ui/thirdparty/jquery"],function(e,t,i,s,o){"use strict";var a=200,n=100,r=1e3;var u=e.extend("sap.m.TimePickerClock",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Misc",defaultValue:true},itemMin:{type:"int",group:"Data",defaultValue:-1},itemMax:{type:"int",group:"Data",defaultValue:-1},innerItems:{type:"boolean",group:"Appearance",defaultValue:false},label:{type:"string",group:"Appearance",defaultValue:null},fractions:{type:"boolean",group:"Appearance",defaultValue:true},lastItemReplacement:{type:"int",group:"Data",defaultValue:-1},prependZero:{type:"boolean",group:"Appearance",defaultValue:false},selectedValue:{type:"int",group:"Data",defaultValue:-1},displayStep:{type:"int",group:"Data",defaultValue:5},valueStep:{type:"int",group:"Data",defaultValue:1},support2400:{type:"boolean",group:"Misc",defaultValue:false}},events:{change:{parameters:{value:{type:"int"},stringValue:{type:"string"},finalChange:{type:"boolean"}}}}},renderer:i});u.prototype.init=function(){this._onMouseWheel=this._onMouseWheel.bind(this);this._iHoveredValue=-1;this._iPrevHoveredValue=-1};u.prototype.onBeforeRendering=function(){var e=this.getDomRef();if(e){this._bFocused=e.contains(document.activeElement);this._detachEvents()}if(this.getSupport2400()&&this._get24HoursVisible()===undefined){this._save2400State()}};u.prototype.onAfterRendering=function(){this._attachEvents()};u.prototype.exit=function(){this._detachEvents()};u.prototype.onThemeChanged=function(e){this.invalidate()};u.prototype.setSelectedValue=function(e){var t=this.getLastItemReplacement(),i=this.getItemMax()*(this.getInnerItems()?2:1);if(!this.getSupport2400()){if(e===0){e=i}if(e===i&&t!==-1){e=t}}this.setProperty("selectedValue",e);this.fireChange({value:e,stringValue:this._getStringValue(e),finalChange:false});return this};u.prototype.getSelectedValue=function(){var e=this.getProperty("selectedValue"),t=this.getLastItemReplacement(),i=this.getItemMax()*(this.getInnerItems()?2:1);if(this.getSupport2400()&&this._get24HoursVisible()&&e===i&&t!==-1){e=t}return parseInt(e)};u.prototype._getStringValue=function(e){var t=e.toString();if(this.getPrependZero()){t=t.padStart(2,"0")}return t};u.prototype._save2400State=function(){this._set24HoursVisible(this.getSupport2400()&&this.getSelectedValue()===0?false:true)};u.prototype._set24HoursVisible=function(e){if(this.getSupport2400()){this._is24HoursVisible=e;this.setLastItemReplacement(e?24:0)}else{this._is24HoursVisible=false}};u.prototype._get24HoursVisible=function(){return this.getSupport2400()?this._is24HoursVisible:false};u.prototype._markToggleAsSelected=function(e){this._selectToggledElement=e;return this};u.prototype._attachEvents=function(){var e=this._getClockCoverContainerDomRef();this.$().on(s.browser.firefox?"DOMMouseScroll":"mousewheel",this._onMouseWheel);document.addEventListener("mouseup",o.proxy(this._onMouseOutUp,this),false);if(e){if(s.system.combi||s.system.phone||s.system.tablet){e.addEventListener("touchstart",o.proxy(this._onTouchStart,this),false);e.addEventListener("touchmove",o.proxy(this._onTouchMove,this),false);e.addEventListener("touchend",o.proxy(this._onTouchEnd,this),false)}if(s.system.desktop||s.system.combi){e.addEventListener("mousedown",o.proxy(this._onTouchStart,this),false);e.addEventListener("mousemove",o.proxy(this._onTouchMove,this),false);e.addEventListener("mouseup",o.proxy(this._onTouchEnd,this),false);e.addEventListener("mouseout",o.proxy(this._onMouseOut,this),false)}}};u.prototype._detachEvents=function(){var e=this._getClockCoverContainerDomRef();this.$().off(s.browser.firefox?"DOMMouseScroll":"mousewheel",this._onMouseWheel);document.removeEventListener("mouseup",o.proxy(this._onMouseOutUp,this),false);if(e){if(s.system.combi||s.system.phone||s.system.tablet){e.removeEventListener("touchstart",o.proxy(this._onTouchStart,this),false);e.removeEventListener("touchmove",o.proxy(this._onTouchMove,this),false);e.removeEventListener("touchend",o.proxy(this._onTouchEnd,this),false)}if(s.system.desktop||s.system.combi){e.removeEventListener("mousedown",o.proxy(this._onTouchStart,this),false);e.removeEventListener("mousemove",o.proxy(this._onTouchMove,this),false);e.removeEventListener("mouseup",o.proxy(this._onTouchEnd,this),false);e.removeEventListener("mouseout",o.proxy(this._onMouseOut,this),false)}}};u.prototype._getClockCoverContainerDomRef=function(){return this.getDomRef("cover")};u.prototype._onMouseOutUp=function(e){this._mouseOrTouchDown=false};u.prototype._onMouseOut=function(e){var t=this.getId(),i=document.getElementById(t+"-"+this._iHoveredValue);i&&i.classList.remove("sapMTPCNumberHover");this._iHoveredValue=-1;this._iPrevHoveredValue=-1};u.prototype.modifyValue=function(e){var t=this.getSelectedValue(),i=this.getLastItemReplacement(),s=this.getInnerItems(),o=this.getItemMin(),a=this.getItemMax()*(s?2:1),n=this.getValueStep(),r;if(t%n!==0){r=e?Math.ceil(t/n)*n:Math.floor(t/n)*n;n=Math.abs(t-r)}if(this.getSupport2400()&&!this._get24HoursVisible()){o=0;a=23;i=-1}if(t===i){t=a}if(e){t+=n;if(t>a){t=this.getSupport2400()?o:t-a}}else{t-=n;if(t<o){t=a}}this.setSelectedValue(t)};u.prototype._onMouseWheel=function(e){var t=e.originalEvent,i=t.detail?-t.detail>0:t.wheelDelta>0;e.preventDefault();if(!this._mouseOrTouchDown){this.modifyValue(i)}};u.prototype._onTouchStart=function(e){this._cancelTouchOut=false;if(!this.getEnabled()){return}this._iMovSelectedValue=this.getSelectedValue();this._calculateDimensions();this._x=e.type==="touchstart"?e.touches[0].pageX:e.pageX;this._y=e.type==="touchstart"?e.touches[0].pageY:e.pageY;this._calculatePosition(this._x,this._y);if(this.getSupport2400()&&e.type==="touchstart"&&(this._iSelectedValue===24||this._iSelectedValue===0)){this._resetLongTouch();this._startLongTouch()}this._mouseOrTouchDown=true};u.prototype._onTouchMove=function(e){var t,i,s;e.preventDefault();if(this._mouseOrTouchDown){this._x=e.type==="touchmove"?e.touches[0].pageX:e.pageX;this._y=e.type==="touchmove"?e.touches[0].pageY:e.pageY;this._calculatePosition(this._x,this._y);if(this.getEnabled()&&this._iSelectedValue!==-1&&this._iSelectedValue!==this._iMovSelectedValue){this.setSelectedValue(this._iSelectedValue);this._iMovSelectedValue=this._iSelectedValue;if(this.getSupport2400()&&e.type==="touchmove"&&(this._iSelectedValue===24||this._iSelectedValue===0)){this._resetLongTouch();this._startLongTouch()}}}else if(e.type==="mousemove"){if(!this._dimensionParameters){this._calculateDimensions()}this._x=e.pageX;this._y=e.pageY;this._calculatePosition(this._x,this._y);i=this.getDisplayStep();if(i>1){this._iHoveredValue=Math.round(this._iHoveredValue/i)*i}if(this.getEnabled()&&this._iHoveredValue!==this._iPrevHoveredValue){t=this.getId();s=document.getElementById(t+"-"+this._iPrevHoveredValue);s&&s.classList.remove("sapMTPCNumberHover");this._iPrevHoveredValue=this._iHoveredValue;s=document.getElementById(t+"-"+this._iPrevHoveredValue);s&&s.classList.add("sapMTPCNumberHover")}}};u.prototype._onTouchEnd=function(e){var i=t.getAnimationMode(),s=i===t.AnimationMode.none||i===t.AnimationMode.minimal;if(!this._mouseOrTouchDown){return}this._mouseOrTouchDown=false;e.preventDefault();if(!this.getEnabled()||this._iSelectedValue===-1){return}if(e.type==="touchend"){this._resetLongTouch()}if(!this._cancelTouchOut){this._changeValueAnimation(this._iSelectedValue,s)}};u.prototype._resetLongTouch=function(){if(this._longTouchId){clearTimeout(this._longTouchId)}};u.prototype._startLongTouch=function(){this._longTouchId=setTimeout(function(){var e=this._iSelectedValue;this._longTouchId=null;if(e===0||e===24){this._toggle2400()}}.bind(this),r)};u.prototype._getMaxValue=function(){var e=this.getItemMax();return this.getInnerItems()?e*2:e};u.prototype._toggle2400=function(e){var t=this._get24HoursVisible(),i=t?0:24;this._cancelTouchOut=true;this._set24HoursVisible(!t);this.setLastItemReplacement(i);if(!e){this._iMovSelectedValue=i;this.setSelectedValue(i)}return this};u.prototype._changeValueAnimation=function(e,t){var i=this._iMovSelectedValue,s=this.getInnerItems(),o=this.getItemMax()*(s?2:1),n,r,u,l=i,p=e,c=1;if(!t){if(l<p){n=p-l;r=o-n;if(r<n){l+=o;c=-1}}else{n=l-p;r=o-n;if(r<n){p+=o}else{c=-1}}if(l===p){u=0}else{u=Math.ceil(a/Math.abs(l-p))}this._animationInProgress=true;h(this,l,p,c,o,e,u,this.getSupport2400(),this._get24HoursVisible())}else{this.setSelectedValue(e);this.fireChange({value:e,stringValue:this._getStringValue(e),finalChange:true})}};u.prototype._calculateDimensions=function(){var e=this._getClockCoverContainerDomRef(),t=Math.round(e.offsetHeight/2),i=o(".sapMTPCDot").first().outerHeight(true),s=o(".sapMTPCNumber").first().outerHeight(true),a=e.getBoundingClientRect();this._dimensionParameters={radius:t,centerX:t,centerY:t,dotHeight:i,numberHeight:s,outerMax:t,outerMin:t-s,innerMax:t-s-1,innerMin:t-s*2-1,offsetX:a.left,offsetY:a.top}};u.prototype._calculatePosition=function(e,t){var i=this.getItemMax(),s=this.getLastItemReplacement(),o=this.getValueStep(),a=e-this._dimensionParameters.offsetX+1-this._dimensionParameters.radius,n=t-this._dimensionParameters.offsetY+1-this._dimensionParameters.radius,r=a>=0?0:180,u=Math.atan(n/a)*180/Math.PI+90+r,h=360/i*o,l=this.getInnerItems(),p=Math.sqrt(a*a+n*n),c=Math.round((u===0?360:u)/h)*h,d=p<=this._dimensionParameters.outerMax&&p>(l?this._dimensionParameters.outerMin:this._dimensionParameters.innerMin),f=l&&p<=this._dimensionParameters.innerMax&&p>this._dimensionParameters.innerMin,_=p<=this._dimensionParameters.outerMax&&p>this._dimensionParameters.outerMin,m=f,g=this.getSupport2400(),v=this._get24HoursVisible();if(c===0){c=360}if(f||d){this._iSelectedValue=c/h*o;if(f){this._iSelectedValue+=i}if(g&&!v&&this._iSelectedValue===24){this._iSelectedValue=0}}else{this._iSelectedValue=-1}if(m||_){this._iHoveredValue=g&&!v&&this._iSelectedValue===0?24:this._iSelectedValue}else{this._iHoveredValue=-1}if(this._iSelectedValue===this._getMaxValue()&&s!==-1){this._iSelectedValue=s}};u.prototype._setEnabled=function(e){this.setEnabled(e);if(e){this.$().removeClass("sapMTPDisabled")}else{this.$().addClass("sapMTPDisabled")}return this};function h(e,t,i,s,o,a,r,u,l){var p;if(t===i){e._animationInProgress=false}p=t>o?t-o:t;if(u){if(p===24&&!l){p=0}else if(p===0&&l){p=24}}e.setSelectedValue(p);if(t!==i){t+=s;setTimeout(function(){h(e,t,i,s,o,a,r,u,l)},r)}else{setTimeout(function(){e.fireChange({value:a,stringValue:e._getStringValue(a),finalChange:true})},n)}}return u});