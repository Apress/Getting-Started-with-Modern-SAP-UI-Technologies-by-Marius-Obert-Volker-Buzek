/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/library","sap/m/ShellRenderer","sap/ui/util/Mobile","sap/base/Log","sap/ui/core/theming/Parameters"],function(e,t,a,r,o,i,p,s){"use strict";var n=r.TitleLevel;var u=a.extend("sap.m.Shell",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},logo:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},showLogout:{type:"boolean",group:"Behavior",defaultValue:true},headerRightText:{type:"string",group:"Data",defaultValue:null},appWidthLimited:{type:"boolean",group:"Appearance",defaultValue:true},backgroundColor:{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},backgroundRepeat:{type:"boolean",group:"Appearance",defaultValue:false},backgroundOpacity:{type:"float",group:"Appearance",defaultValue:1},homeIcon:{type:"object",group:"Misc",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:n.H1}},defaultAggregation:"app",aggregations:{app:{type:"sap.ui.core.Control",multiple:false}},events:{logout:{}}},renderer:o});u.prototype.init=function(){t.attachThemeChanged(function(){var e=this.$("hdr"),t=this._getImageSrc();if(e.length&&t){this._getImage().setSrc(t);this._getImage().rerender()}},this);i.init({statusBar:"default",hideBrowser:true})};u.prototype.onBeforeRendering=function(){var e=this._getImageSrc();if(e){this._getImage().setSrc(e)}};u.prototype.onAfterRendering=function(){var e=this.getDomRef().parentNode;if(e&&!e._sapui5_heightFixed){e._sapui5_heightFixed=true;while(e&&e!==document.documentElement){if(e.getAttribute("data-sap-ui-root-content")){break}if(!e.style.height){e.style.height="100%"}e=e.parentNode}}this.$("content").css("height","")};u.prototype.exit=function(){if(this.oImg){this.oImg.destroy()}};u.prototype.ontap=function(e){if(e.target.className&&e.target.className.indexOf&&e.target.className.indexOf("sapMShellHeaderLogout")>-1){this.fireLogout()}};u.prototype.setTitle=function(e){this.$("hdrTxt").text(e);this.setProperty("title",e,true);return this};u.prototype.setHeaderRightText=function(e){this.setProperty("headerRightText",e,true);if(!e){e=""}this.$("hdrRightTxt").text(e).css("display",e?"inline":"none");return this};u.prototype.setAppWidthLimited=function(e){this.$().toggleClass("sapMShellAppWidthLimited",e);this.setProperty("appWidthLimited",e,true);return this};u.prototype.setBackgroundOpacity=function(e){if(e>1||e<0){p.warning("Invalid value "+e+" for Shell.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this}this.$("BG").css("opacity",e);return this.setProperty("backgroundOpacity",e,true)};u.prototype.setHomeIcon=function(e){this.setProperty("homeIcon",e,true);i.setIcons(e);return this};u.prototype._getImage=function(){if(!this.oImg){this.oImg=new sap.m.Image(this.getId()+"-logo",{decorative:false,alt:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("SHELL_ARIA_LOGO")});this.oImg.addStyleClass("sapMShellLogoImg")}return this.oImg};u.prototype._getImageSrc=function(){return this.getLogo()?this.getLogo():s._getThemeImage()};return u});