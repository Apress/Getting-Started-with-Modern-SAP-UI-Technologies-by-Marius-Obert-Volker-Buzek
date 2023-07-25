/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","sap/ui/core/Popup","./MessageListRenderer","sap/ui/core/Configuration"],function(e,t,i,o,r,s){"use strict";var a=i.extend("sap.ui.commons.MessageList",{metadata:{deprecated:true,library:"sap.ui.commons",properties:{visible:{type:"boolean",group:"Behavior",defaultValue:false},anchorId:{type:"string",group:"Appearance",defaultValue:null},maxListed:{type:"string",group:"Misc",defaultValue:"7"}}}});a.prototype.init=function(){this.aMessages=[];this.iItemHeight=0;this.oPopup=new o(this,false,true,false)};a.prototype.exit=function(){this.close();this.oPopup.destroy();this.oPopup=null};a.prototype.onThemeChanged=function(){this.iItemHeight=0};a.prototype.onAfterRendering=function(){var t=this.getDomRef();var i=e(t);var o=this.getMaxListed();var r=this.aMessages.length;if(r<=o){i.height("auto");return}if(this.iItemHeight==0){var s=t.firstChild;var a=e(s);this.iItemHeight=a.height()}t.style.overflowY="scroll";t.style.overflowX="hidden";var n=o*this.iItemHeight+"px";i.height(n)};a.prototype.open=function(){var e=s.getRTL();var t=200;var i=e?o.Dock.RightTop:o.Dock.LeftTop;var r=e?o.Dock.RightBottom:o.Dock.LeftBottom;var a="0 0";var n=null;var p=this.getAnchorId();if(p){n=document.getElementById(p)}if(!n){n=document.body}this.oPopup.open(t,i,r,n,a)};a.prototype.close=function(){var e=200;this.oPopup.close(e)};a.prototype.setMessages=function(e){this.aMessages=e;if(this.getVisible()){sap.ui.getCore().getRenderManager().render(this,sap.ui.getCore().getStaticAreaRef(),true)}return this};a.prototype.setVisible=function(e){this.setProperty("visible",e);if(e){sap.ui.getCore().getRenderManager().render(this,sap.ui.getCore().getStaticAreaRef(),true);this.open()}else{this.close()}return this};return a});