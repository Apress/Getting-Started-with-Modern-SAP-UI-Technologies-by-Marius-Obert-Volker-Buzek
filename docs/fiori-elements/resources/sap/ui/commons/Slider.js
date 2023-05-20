/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/dom/containsOrEquals","sap/ui/events/ControlEvents","./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/ResizeHandler","./SliderRenderer","sap/ui/core/Configuration"],function(t,i,e,s,a,h,r,o,l,n){"use strict";var g=h.extend("sap.ui.commons.Slider",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},min:{type:"float",group:"Appearance",defaultValue:0},max:{type:"float",group:"Appearance",defaultValue:100},value:{type:"float",group:"Appearance",defaultValue:50},smallStepWidth:{type:"float",group:"Appearance",defaultValue:null},totalUnits:{type:"int",group:"Appearance",defaultValue:null},stepLabels:{type:"boolean",group:"Appearance",defaultValue:false},editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},labels:{type:"string[]",group:"Misc",defaultValue:null},vertical:{type:"boolean",group:"Appearance",defaultValue:false},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}}}});r.call(g.prototype);g.prototype.exit=function(){if(this.sResizeListenerId){o.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};g.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){o.deregister(this.sResizeListenerId);this.sResizeListenerId=null}var t=this.getMin();var e=this.getMax();if(t>e){i.warning("Property wrong: Min:"+t+" > Max:"+e+"; values switched",this);this.setMin(e);this.setMax(t);e=t;t=this.getMin()}};g.prototype.onAfterRendering=function(){this.oGrip=this.getDomRef("grip");this.oBar=this.getDomRef("bar");this.oHiLi=this.getDomRef("hili");this.bRtl=n.getRTL();this.bAcc=n.getAccessibility();this.bTextLabels=this.getLabels()&&this.getLabels().length>0;this.oMovingGrip=this.oGrip;if(this.bTextLabels&&this.getLabels().length-1!=this.getTotalUnits()){i.warning("label count should be one more than total units",this)}this.iDecimalFactor=this.calcDecimalFactor(this.getSmallStepWidth());this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);var e=this.getValue();var s=this.getMin();var a=this.getMax();if(e>a){i.warning("Property wrong: value:"+e+" > Max:"+a+"; value set to Max",this);e=a}else if(e<s){i.warning("Property wrong: value:"+e+" < Min:"+s+"; value set to Min",this);e=s}var h=(e-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl||this.getVertical()){h=this.getBarWidth()-h}this.changeGrip(e,h,this.oGrip);this.repositionTicksAndLabels();this.allowTextSelection(false);this.oDomRef=this.getDomRef();this.sResizeListenerId=o.register(this.oDomRef,t.proxy(this.onresize,this))};g.prototype.onclick=function(i){var e=this.oMovingGrip;if(this.getEditable()&&this.getEnabled()){var s;var a=i.target.getAttribute("ID");var h=this.getValue();var r=this.getOffsetLeft(this.oGrip)+this.iShiftGrip;var o=0;var l=0;var n=0;switch(a){case this.oBar.id:case this.oHiLi.id:if(this.getVertical()){s=this.getBarWidth()-this.getOffsetX(i)}else{s=this.getOffsetX(i)}if(a==this.oHiLi.id){if(this.getVertical()){s-=this.getOffsetLeft(this.oHiLi)}else{s+=this.getOffsetLeft(this.oHiLi)}}h=this.convertRtlValue(this.getMin()+(this.getMax()-this.getMin())/this.getBarWidth()*s);r=this.getOffsetX(i);if(a==this.oHiLi.id){r+=this.getOffsetLeft(this.oHiLi)}if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){e=this.oStartTarget}else if(this.targetIsGrip(a)){e=i.target}else{e=this.getNearestGrip(r)}break;case this.getId()+"-left":r=0;if(this.getVertical()){h=this.getMax();e=this.getRightGrip()}else{h=this.getMin();e=this.getLeftGrip()}break;case this.getId()+"-right":r=this.getBarWidth();if(!this.getVertical()){h=this.getMax();e=this.getRightGrip()}else{h=this.getMin();e=this.getLeftGrip()}break;default:if(this.targetIsGrip(a)){return}o=a.search("-tick");if(o>=0){var g=parseInt(a.slice(this.getId().length+5));r=this.fTickDist*g;var f;if(this.bTextLabels){f=this.getLabels().length-1}else{f=this.getTotalUnits()}h=this.convertRtlValue(this.getMin()+(this.getMax()-this.getMin())/f*g);if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){e=this.oStartTarget}else if(this.targetIsGrip(a)){e=i.target}else{e=this.getNearestGrip(r)}break}l=t(this.oBar).offset();n=t(i.target).offset();if(this.getVertical()){r=this.getOffsetX(i)-(l.top-n.top)}else{r=this.getOffsetX(i)-(l.left-n.left)}if(r<=0){r=0;if(this.getVertical()){h=this.getMax()}else{h=this.getMin()}}else{if(r>=this.getBarWidth()){r=this.getBarWidth();if(this.getVertical()){h=this.getMin()}else{h=this.getMax()}}else{if(this.getVertical()){s=this.getBarWidth()-r}else{s=r}h=this.getMin()+(this.getMax()-this.getMin())/this.getBarWidth()*s}}h=this.convertRtlValue(h);if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){e=this.oStartTarget}else if(this.targetIsGrip(a)){e=i.target}else{e=this.getNearestGrip(r)}break}var p=this.validateNewPosition(h,r,e,this.getValueForGrip(e)>h);h=p.fNewValue;r=p.iNewPos;this.changeGrip(h,r,e);this.handleFireChange()}e.focus();this.oMovingGrip=e;this.oStartTarget=null};g.prototype.onmousedown=function(i){if(this.getEditable()&&this.getEnabled()&&!this._cancelMousedown){var e=i.target.getAttribute("ID");if(this.targetIsGrip(e)){this.bGripMousedown=true;if(i.targetTouches){this.iStartDragX=i.targetTouches[0].pageX;this.iStartDragY=i.targetTouches[0].pageY}else{this.iStartDragX=i.pageX;this.iStartDragY=i.pageY}this.iStartLeft=this.getOffsetLeft(i.target)+this.iShiftGrip;this.oMovingGrip=i.target;var a=this;this.handleMoveCall=function(t){a.handleMove(t)};this.preventSelect=function(t){return false};if(!i.targetTouches){t(window.document).on("mousemove",this.handleMoveCall);t(window.document).on("selectstart",this.preventSelect);s.bindAnyEvent(t.proxy(this.onAnyEvent,this))}}this.oStartTarget=null}};function f(t){return t.originalEvent&&t.originalEvent.type&&t.originalEvent.type.startsWith("mouse")||t.handleObj&&t.handleObj.origType&&t.handleObj.origType.startsWith("mouse")}g.prototype.ontouchstart=function(t){if(f(t)){return}this._cancelMousedown=false;this.onmousedown(t);this._cancelMousedown=true};g.prototype.onmouseup=function(i){if(this.getEditable()&&this.getEnabled()){this.bGripMousedown=false;if(this.handleMoveCall){t(window.document).off("mousemove",this.handleMoveCall);t(window.document).off("selectstart",this.preventSelect);s.unbindAnyEvent(this.onAnyEvent);if(this.iStartLeft!=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip){this.handleFireChange(true)}this.handleMoveCall=null;this.iStartDragX=null;this.iStartDragY=null;this.iStartLeft=null}}};g.prototype.ontouchend=function(t){if(f(t)){return}this.onmouseup(t)};g.prototype.handleMove=function(t){if(this.getEditable()&&this.getEnabled()&&this.bGripMousedown){t=t||window.event;var i,e;if(t.targetTouches){i=t.targetTouches[0].pageX;e=t.targetTouches[0].pageY}else{i=t.pageX;e=t.pageY}var s;var a;if(this.getVertical()){s=this.iStartLeft+e-this.iStartDragY}else{s=this.iStartLeft+i-this.iStartDragX}if(s<=0){s=0;if(this.getVertical()){a=this.getMax()}else{a=this.getMin()}}else{if(s>=this.getBarWidth()){s=this.getBarWidth();if(this.getVertical()){a=this.getMin()}else{a=this.getMax()}}else{var h;if(this.getVertical()){h=this.getBarWidth()-s}else{h=s}a=this.getMin()+(this.getMax()-this.getMin())/this.getBarWidth()*h}}a=this.convertRtlValue(a);var r=this.getValueForGrip(this.oMovingGrip);var o=this.validateNewPosition(a,s,this.oMovingGrip,r>a);a=o.fNewValue;s=o.iNewPos;this.changeGrip(a,s,this.oMovingGrip);a=this.getValueForGrip(this.oMovingGrip);this.fireLiveChangeForGrip(this.oMovingGrip,a,r);this.oStartTarget=this.oMovingGrip}t.cancelBubble=true;return false};g.prototype.ontouchmove=function(t){if(f(t)){return}this.handleMove(t);t.preventDefault()};g.prototype.fireLiveChangeForGrip=function(t,i,e){if(t==this.oGrip){if(e!=i){this.fireLiveChange({value:i})}}};g.prototype.onAnyEvent=function(t){i.debug('onAnyEvent fired: "'+t.type+'"');if(!this.getEditable()||!this.getEnabled()||!this.bGripMousedown){return}var s=t.target;if((!e(this.oDomRef,s)||s.tagName=="BODY")&&t.type=="mouseup"){this.onmouseup(t)}};g.prototype.onsapright=function(t){if(this.getEditable()&&this.getEnabled()){var i=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var e=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){i=i+this.getSmallStepWidth();if(this.getVertical()){e=e-s}else{e=e+s}}else{i=i+1/s*this.getSmallStepWidth();if(this.getVertical()){e=e-1}else{e=e+1}}}else{i=i+(this.getMax()-this.getMin())/this.getBarWidth();if(this.getVertical()){e=e-1}else{e=e+1}}i=this.convertRtlValue(i);var a=this.validateNewPosition(i,e,this.oMovingGrip,!this.getVertical()&&this.bRtl);i=a.fNewValue;e=a.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};g.prototype.onsapleft=function(t){if(this.getEditable()&&this.getEnabled()){var i=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var e=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){i=i-this.getSmallStepWidth();if(this.getVertical()){e=e+s}else{e=e-s}}else{i=i-1/s*this.getSmallStepWidth();if(this.getVertical()){e=e+1}else{e=e-1}}}else{i=i-(this.getMax()-this.getMin())/this.getBarWidth();if(this.getVertical()){e=e+1}else{e=e-1}}i=this.convertRtlValue(i);var a=this.validateNewPosition(i,e,this.oMovingGrip,this.getVertical()||!this.bRtl);i=a.fNewValue;e=a.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};g.prototype.onsapup=function(t){if(this.bRtl&&!this.getVertical()){this.onsapleft(t)}else{this.onsapright(t)}};g.prototype.onsapdown=function(t){if(this.bRtl&&!this.getVertical()){this.onsapright(t)}else{this.onsapleft(t)}};g.prototype.onsapexpand=function(t){if(!this.bRtl){this.onsapright(t)}else{this.onsapleft(t)}};g.prototype.onsapcollapse=function(t){if(!this.bRtl){this.onsapleft(t)}else{this.onsapright(t)}};g.prototype.onsaphome=function(t){if(this.getEditable()&&this.getEnabled()){var i=0;if(this.getVertical()||this.bRtl&&!this.getVertical()){i=this.getBarWidth()}this.changeGrip(this.getMin(),i,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};g.prototype.onsapend=function(t){if(this.getEditable()&&this.getEnabled()){var i=this.getBarWidth();if(this.getVertical()||this.bRtl&&!this.getVertical()){i=0}this.changeGrip(this.getMax(),i,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};g.prototype.onsaprightmodifiers=function(t){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits()}else{this.fPageSize=(this.getMax()-this.getMin())/10}}var i;if(!this.bRtl||this.getVertical()){i=this.getValueForGrip(this.oMovingGrip)+this.fPageSize}else{i=this.getValueForGrip(this.oMovingGrip)-this.fPageSize}var e=(i-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){e=this.getBarWidth()-e}if(this.getVertical()){if(e>this.getBarWidth()){e=this.getBarWidth()}e=this.getBarWidth()-e}var s=this.validateNewPosition(i,e,this.oMovingGrip,!this.getVertical()&&this.bRtl);i=s.fNewValue;e=s.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};g.prototype.onsapleftmodifiers=function(t){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits()}else{this.fPageSize=(this.getMax()-this.getMin())/10}}var i;if(!this.bRtl||this.getVertical()){i=this.getValueForGrip(this.oMovingGrip)-this.fPageSize}else{i=this.getValueForGrip(this.oMovingGrip)+this.fPageSize}var e=(i-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){e=this.getBarWidth()-e}if(this.getVertical()){if(e<0){e=0}e=this.getBarWidth()-e}var s=this.validateNewPosition(i,e,this.oMovingGrip,this.getVertical()||!this.bRtl);i=s.fNewValue;e=s.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};g.prototype.onsapdownmodifiers=function(t){if(this.bRtl&&!this.getVertical()){this.onsaprightmodifiers(t)}else{this.onsapleftmodifiers(t)}};g.prototype.onsapupmodifiers=function(t){if(this.bRtl&&!this.getVertical()){this.onsapleftmodifiers(t)}else{this.onsaprightmodifiers(t)}};g.prototype.onresize=function(t){if(!this.getDomRef()){if(this.sResizeListenerId){o.deregister(this.sResizeListenerId);this.sResizeListenerId=null}return}var i=this.getValue();var e=(i-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.getVertical()||this.bRtl){e=this.getBarWidth()-e}this.changeGrip(i,e,this.oGrip);this.repositionTicksAndLabels()};g.prototype.repositionTicksAndLabels=function(){var i;if(this.bTextLabels){i=this.getLabels().length-1}else{i=this.getTotalUnits()}if(i>0){var e=null;var s=null;this.fTickDist=this.getBarWidth()/i;for(var a=0;a<=i;a++){e=this.getDomRef("tick"+a);var h=0;if(!this.bRtl||this.getVertical()){h=Math.round(this.fTickDist*a)-Math.ceil(this.getOffsetWidth(e)/2)}else{h=Math.round(this.fTickDist*a)-Math.floor(this.getOffsetWidth(e)/2)}if(this.getVertical()){h=this.getBarWidth()-h-this.getOffsetWidth(e)}this.setLeft(h,e);if(this.getStepLabels()&&a>0&&a<i){s=this.getDomRef("text"+a);if(this.getSmallStepWidth()>0&&this.iDecimalFactor>0&&!this.bTextLabels){t(s).text(Math.round(parseFloat(t(s).text())*this.iDecimalFactor)/this.iDecimalFactor)}if(!this.bRtl||this.getVertical()){h=Math.round(this.fTickDist*a)-Math.round(this.getOffsetWidth(s)/2)}else{h=Math.round(this.fTickDist*(i-a))-Math.round(this.getOffsetWidth(s)/2)}if(this.getVertical()){h=this.getBarWidth()-h-this.getOffsetWidth(s)}this.setLeft(h,s)}}}};g.prototype.onThemeChanged=function(t){if(this.getDomRef()){this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);this.onresize()}};g.prototype.changeGrip=function(t,e,s){if(e!=this.getOffsetLeft(s)+this.iShiftGrip){if(this.getSmallStepWidth()>0){var a=parseInt((t-this.getMin())/this.getSmallStepWidth());var h=a*this.getSmallStepWidth()+this.getMin();var r=(a+1)*this.getSmallStepWidth()+this.getMin();if(r>this.getMax()){r=this.getMax()}var o=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(t-h<r-t){t=h;e=a*o}else{t=r;e=(a+1)*o;if(e>this.getBarWidth()){e=this.getBarWidth()}}if(this.getVertical()||this.bRtl){e=this.getBarWidth()-e}t=Math.round(t*this.iDecimalFactor)/this.iDecimalFactor}var l=Math.round(e-this.iShiftGrip);if(isNaN(l)){return}i.debug("iNewPos: "+e+" - iLeft: "+l+" - iShiftGrip: "+this.iShiftGrip);this.updateValueProperty(t,s);if(this.bTextLabels){s.title=this.getNearestLabel(t)}else{s.title=t}this.setLeft(l,s);this.adjustHighlightBar(e,s);if(this.bAcc){this.setAriaState()}}};g.prototype.updateValueProperty=function(t,i){this.setProperty("value",t,true)};g.prototype.adjustHighlightBar=function(t,i){if(this.bRtl){if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(t)+"px"}else{this.oHiLi.style.width=this.getBarWidth()-Math.round(t)+"px"}}else{if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(t)+"px"}else{this.oHiLi.style.width=Math.round(t)+"px"}}};g.prototype.calcDecimalFactor=function(t){var i=1;if(!(t>0)){return i}var e=String(t);var s=0;if(e.indexOf(".")>=0){s=e.length-e.indexOf(".")-1}else{if(e.indexOf("e-")>=0){s=e.slice(e.indexOf("e-")+2)}else{return i}}for(var a=1;a<=s;a++){i=i*10}return i};g.prototype.setEditable=function(i){this.setProperty("editable",i,true);if(this.oDomRef&&this.getEnabled()){if(i){t(this.oDomRef).removeClass("sapUiSliRo").addClass("sapUiSliStd");if(this.bAcc){t(this.oGrip).attr("aria-disabled",false).attr("aria-readonly",false)}}else{t(this.oDomRef).removeClass("sapUiSliStd").addClass("sapUiSliRo");if(this.bAcc){t(this.oGrip).attr("aria-disabled",true).attr("aria-readonly",true)}}}return this};g.prototype.setEnabled=function(i){this.setProperty("enabled",i,true);if(this.oDomRef){t(this.oDomRef).toggleClass("sapUiSliDsbl",!i);if(i){t(this.oGrip).attr("tabindex","0");if(this.getEditable()){t(this.oDomRef).addClass("sapUiSliStd");if(this.bAcc){t(this.oGrip).attr("aria-disabled",false)}}else{t(this.oDomRef).addClass("sapUiSliRo");if(this.bAcc){t(this.oGrip).attr("aria-disabled",true)}}}else{t(this.oGrip).attr("tabindex","-1").attr("aria-disabled",true);if(this.getEditable()){t(this.oDomRef).removeClass("sapUiSliStd")}else{t(this.oDomRef).removeClass("sapUiSliRo")}}}return this};g.prototype.setTotalUnits=function(t){this.setProperty("totalUnits",t,false);this.fPageSize=false;return this};g.prototype.setValue=function(t){var i,e,s,a,h,r=parseFloat(t);this.setProperty("value",t,true);this._lastValue=t;if(!this.oBar||isNaN(t)){return this}e=this.getMin();s=this.getMax();a=this.getBarWidth();h=this.getVertical();if(r>s){r=s;i=a}else if(r<e){r=e;i=0}else{i=(r-e)/(s-e)*a}if(this.bRtl||h){i=a-i}this.changeGrip(r,i,this.oGrip);this._lastValue=r;return this};g.prototype.handleFireChange=function(t){var i=this.getValue();if(i!==this._lastValue){this.fireChange({value:i});if(!t){this.fireLiveChange({value:i})}this._lastValue=i}};g.prototype.setAriaState=function(){var t=this.getValue();if(this.bTextLabels){t=this.getNearestLabel(t)}this.oGrip.setAttribute("aria-valuenow",t)};g.prototype.getValueForGrip=function(t){return this.getValue()};g.prototype.validateNewPosition=function(t,i,e,s){if(!this.bRtl||this.getVertical()){if(s){if(t<=this.getMin()||i<=0){t=this.getMin();if(this.getVertical()){i=this.getBarWidth()}else{i=0}}}else{if(t>=this.getMax()||i>this.getBarWidth()){t=this.getMax();if(!this.getVertical()){i=this.getBarWidth()}else{i=0}}}}else{if(s){if(t<=this.getMin()||i>this.getBarWidth()){t=this.getMin();i=this.getBarWidth()}}else{if(t>=this.getMax()||i<=0){t=this.getMax();i=0}}}return{fNewValue:t,iNewPos:i}};g.prototype.getNearestLabel=function(t){var i=Math.round((this.getLabels().length-1)/(this.getMax()-this.getMin())*(t-this.getMin()));if(this.bRtl){i=this.getLabels().length-1-i}return this.getLabels()[i]};g.prototype.getNearestGrip=function(t){return this.oGrip};g.prototype.getLeftGrip=function(){return this.oGrip};g.prototype.getRightGrip=function(){return this.oGrip};g.prototype.setLeft=function(t,i){if(i==undefined){return}if(this.getVertical()){i.style.top=t+"px"}else{i.style.left=t+"px"}};g.prototype.getOffsetWidth=function(t){if(this.getVertical()){return t.offsetHeight}else{return t.offsetWidth}};g.prototype.getBarWidth=function(){if(this.getVertical()){return this.oBar.clientHeight}else{return this.oBar.clientWidth}};g.prototype.getOffsetLeft=function(t){if(this.getVertical()){return t.offsetTop}else{return t.offsetLeft}};g.prototype.getOffsetX=function(t){if(this.getVertical()){return t.getOffsetY()}else{if(this.bRtl){return t.getOffsetX()}else{return t.getOffsetX()}}};g.prototype.convertRtlValue=function(t){if(this.bRtl&&!this.getVertical()){t=this.getMax()-t+this.getMin()}return t};g.prototype.targetIsGrip=function(t){if(t==this.oGrip.id){return true}return false};g.prototype.getFocusDomRef=function(){return this.oGrip};g.prototype.getIdForLabel=function(){return this.getId()+"-grip"};return g});