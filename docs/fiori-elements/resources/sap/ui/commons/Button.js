/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./ButtonRenderer","sap/ui/Device"],function(e,t,o,r,n,i){"use strict";var s=e.ButtonStyle;var a=t.extend("sap.ui.commons.Button",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{text:{type:"string",group:"Appearance",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},helpId:{type:"string",group:"Behavior",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},iconHovered:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},iconSelected:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},styled:{type:"boolean",group:"Appearance",defaultValue:true},lite:{type:"boolean",group:"Appearance",defaultValue:false},style:{type:"sap.ui.commons.ButtonStyle",group:"Appearance",defaultValue:s.Default}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});o.call(a.prototype);a.prototype.onclick=function(e){if(this.getEnabled()&&this.getVisible()){this.firePress({})}e.preventDefault();e.stopPropagation()};a.prototype.onsapenter=function(e){e.stopPropagation()};a.prototype.onmousedown=function(e){this.handleMouseDown(e,true)};a.prototype.handleMouseDown=function(e,t){if(this.getEnabled()&&this.getRenderer().onactive){this.getRenderer().onactive(this)}if(t&&(i.browser.webkit||i.browser.firefox&&navigator.platform.indexOf("Mac")===0)){if(i.browser.mobile&&i.browser.webkit){this.focus()}setTimeout(function(){this.focus()}.bind(this),0)}};a.prototype.onmouseup=function(e){if(this.getEnabled()&&this.getRenderer().ondeactive){this.getRenderer().ondeactive(this)}};a.prototype.onmouseout=function(e){if(this.getEnabled()&&this.getRenderer().onmouseout){this.getRenderer().onmouseout(this)}};a.prototype.onmouseover=function(e){if(this.getEnabled()&&this.getRenderer().onmouseover){this.getRenderer().onmouseover(this)}};a.prototype.onfocusout=function(e){if(this.getEnabled()&&this.getRenderer().onblur){this.getRenderer().onblur(this)}};a.prototype.onfocusin=function(e){if(this.getEnabled()&&this.getRenderer().onfocus){this.getRenderer().onfocus(this)}};a.prototype.setIcon=function(e){this._setIcon(e,"icon");return this};a.prototype.setIconHovered=function(e){this._setIcon(e,"iconHovered");return this};a.prototype.setIconSelected=function(e){this._setIcon(e,"iconSelected");return this};a.prototype._setIcon=function(e,t){var o=this.getProperty(t);if(o==e){return}var n=false;if(r.isIconURI(o)){n=true}var i=false;if(r.isIconURI(e)){i=true}var s=true;if(!o&&e||o&&!e||n!=i){s=false}this.setProperty(t,e,s);if(s==true&&this.getDomRef()&&this.getRenderer().changeIcon){this.getRenderer().changeIcon(this)}};a.prototype.getAccessibilityInfo=function(){var e=this.getText()||this.getTooltip_AsString();if(!e&&this.getIcon()){var t=r.getIconInfo(this.getIcon());if(t){e=t.text||t.name}}return{role:"button",type:sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_TYPE_BUTTON"),description:e,focusable:this.getEnabled(),enabled:this.getEnabled()}};return a});