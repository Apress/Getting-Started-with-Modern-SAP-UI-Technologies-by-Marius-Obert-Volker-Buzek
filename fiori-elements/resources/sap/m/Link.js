/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/EnabledPropagator","sap/ui/core/AccessKeysEnablement","sap/ui/core/LabelEnablement","sap/ui/core/library","sap/ui/Device","./LinkRenderer","sap/ui/events/KeyCodes","sap/base/security/URLListValidator"],function(e,t,i,r,a,s,o,n,p,l,u,c){"use strict";var d=n.TextDirection;var f=n.TextAlign;var h=n.aria.HasPopup;var y=e.LinkAccessibleRole;var g=e.EmptyIndicatorMode;var b=i.extend("sap.m.Link",{metadata:{interfaces:["sap.ui.core.IShrinkable","sap.ui.core.IFormContent","sap.ui.core.ITitleContent","sap.ui.core.IAccessKeySupport","sap.m.IToolbarInteractiveControl"],library:"sap.m",designtime:"sap/m/designtime/Link.designtime",properties:{text:{type:"string",group:"Data",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},target:{type:"string",group:"Behavior",defaultValue:null},rel:{type:"string",group:"Behavior",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},validateUrl:{type:"boolean",group:"Data",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:f.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:d.Inherit},subtle:{type:"boolean",group:"Behavior",defaultValue:false},emphasized:{type:"boolean",group:"Behavior",defaultValue:false},ariaHasPopup:{type:"sap.ui.core.aria.HasPopup",group:"Accessibility",defaultValue:h.None},accessibleRole:{type:"sap.m.LinkAccessibleRole",group:"Accessibility",defaultValue:y.Default},emptyIndicatorMode:{type:"sap.m.EmptyIndicatorMode",group:"Appearance",defaultValue:g.Off},highlightAccKeysRef:{type:"boolean",defaultValue:false,visibility:"hidden"},accesskey:{type:"string",defaultValue:"",visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{allowPreventDefault:true,parameters:{ctrlKey:{type:"boolean"},metaKey:{type:"boolean"}}}},dnd:{draggable:true,droppable:false}},renderer:l});a.call(b.prototype);b.prototype.init=function(){s.registerControl(this)};b.prototype.onBeforeRendering=function(){};b.prototype.onAfterRendering=function(){var e=this.getDomRef();if(e&&e.getAttribute("href")=="#"){e.onclick=function(){return false}}};b.prototype.getAccessKeysFocusTarget=function(){return this.getFocusDomRef()};b.prototype.onAccKeysHighlightStart=function(){m.call(this,true)};b.prototype.onAccKeysHighlightEnd=function(){m.call(this,false)};b.prototype.onkeydown=function(e){if(e.which===u.SPACE||e.which===u.SHIFT||e.which===u.ESCAPE){if(e.which===u.SPACE){if(this.getEnabled()||this.getHref()){e.setMarked();e.preventDefault();this._bPressedSpace=true}}if(this._bPressedSpace&&(e.which===u.ESCAPE||e.which===u.SHIFT)){this._bPressedEscapeOrShift=true}}else{if(this._bPressedSpace){e.preventDefault()}}};b.prototype.onkeyup=function(e){if(e.which===u.SPACE){if(!this._bPressedEscapeOrShift){this._handlePress(e);if(this.getHref()&&!e.isDefaultPrevented()){e.preventDefault();e.setMarked();var t=document.createEvent("MouseEvents");t.initEvent("click",false,true);this.getDomRef().dispatchEvent(t)}}else{this._bPressedEscapeOrShift=false}this._bPressedSpace=false}};b.prototype._handlePress=function(e){if(this.getEnabled()){e.setMarked();if(!this.firePress({ctrlKey:!!e.ctrlKey,metaKey:!!e.metaKey})){e.preventDefault()}}else{e.preventDefault()}};b.prototype.onsapenter=b.prototype._handlePress;if(p.support.touch){b.prototype.ontap=b.prototype._handlePress}else{b.prototype.onclick=b.prototype._handlePress}b.prototype.ontouchstart=function(e){if(this.getEnabled()){e.setMarked()}};b.prototype.setSubtle=function(e){this.setProperty("subtle",e);if(e&&!b.prototype._sAriaLinkSubtleId){b.prototype._sAriaLinkSubtleId=r.getStaticId("sap.m","LINK_SUBTLE")}return this};b.prototype.setEmphasized=function(e){this.setProperty("emphasized",e);if(e&&!b.prototype._sAriaLinkEmphasizedId){b.prototype._sAriaLinkEmphasizedId=r.getStaticId("sap.m","LINK_EMPHASIZED")}return this};b.prototype._isHrefValid=function(e){return this.getValidateUrl()?c.validate(e):true};b.prototype.getAccessibilityInfo=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m"),t=this.getEmphasized()?e.getText("LINK_EMPHASIZED"):"",i=this.getSubtle()?e.getText("LINK_SUBTLE"):"",r=this.getText(),a=r,s=this.getAccessibleRole();if(r){t&&(a+=" "+t);i&&(a+=" "+i)}return{role:s===y.Default?"link":s,type:r?e.getText("ACC_CTR_TYPE_LINK"):undefined,description:a,focusable:this.getEnabled(),enabled:this.getEnabled()}};b.prototype.getFormDoNotAdjustWidth=function(){return true};b.prototype._getTabindex=function(){return this.getText()&&this.getEnabled()?"0":"-1"};b.prototype._determineSelfReferencePresence=function(){var e=this.getAriaLabelledBy(),t=e.indexOf(this.getId())!==-1,i=o.getReferencingLabels(this).length>0,r=this.getParent(),a=!!(r&&r.enhanceAccessibilityState);return!t&&(e.length>0||i||a)};b.prototype._getToolbarInteractive=function(){return true};var m=function(e){var i=this.getAriaLabelledBy();if(i.length){var r=t.byId(i[0]);r.setProperty("highlightAccKeysRef",e);if(r.getText&&r.getText()){this.setProperty("accesskey",r.getText()[0].toLowerCase())}}};return b});