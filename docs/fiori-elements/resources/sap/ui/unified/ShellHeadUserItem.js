/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/IconPool","./library","sap/base/security/encodeXML"],function(e,t,a,i){"use strict";var r=e.extend("sap.ui.unified.ShellHeadUserItem",{metadata:{library:"sap.ui.unified",deprecated:true,properties:{username:{type:"string",group:"Appearance",defaultValue:""},showPopupIndicator:{type:"boolean",group:"Accessibility",defaultValue:true},image:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});t.insertFontFaceStyle();r.prototype.onclick=function(e){this.firePress();e.preventDefault()};r.prototype.onsapspace=r.prototype.onclick;r.prototype.onsapenter=r.prototype.onclick;r.prototype.setImage=function(e){this.setProperty("image",e,true);if(this.getDomRef()){this._refreshImage()}return this};r.prototype._refreshImage=function(){var e=this.$("img");var a=this.getImage();if(!a){e.html("").attr("style","").css("display","none")}else if(t.isIconURI(a)){var r=t.getIconInfo(a);e.html("").attr("style","");if(r){e.text(r.content).attr("role","presentation").attr("aria-label",r.text||r.name).css("font-family","'"+r.fontFamily+"'")}}else{var s=this.$("img-inner");if(s.length==0||s.attr("src")!=a){e.attr("style","").attr("aria-label",null).html("<img role='presentation' id='"+this.getId()+"-img-inner' src='"+i(a)+"'>")}}};r.prototype._checkAndAdaptWidth=function(e){if(!this.getDomRef()){return false}var t=this.$(),a=this.$("name");var i=t.width();t.toggleClass("sapUiUfdShellHeadUsrItmLimit",false);var r=240;if(e){r=Math.min(r,.5*document.documentElement.clientWidth-225)}if(r<a.width()){t.toggleClass("sapUiUfdShellHeadUsrItmLimit",true)}return i!=t.width()};return r});