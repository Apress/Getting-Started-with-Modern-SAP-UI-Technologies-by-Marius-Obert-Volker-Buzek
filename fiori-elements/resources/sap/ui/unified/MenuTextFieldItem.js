/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","./MenuItemBase","./library","sap/ui/core/library","sap/ui/Device","sap/base/Log","sap/ui/events/PseudoEvents","sap/ui/core/InvisibleText","sap/ui/core/Core","sap/ui/core/Configuration","sap/ui/core/IconPool","sap/ui/dom/jquery/cursorPos"],function(t,e,i,s,n,o,a,r,p,u){"use strict";var l=s.ValueState;var c=e.extend("sap.ui.unified.MenuTextFieldItem",{metadata:{library:"sap.ui.unified",properties:{label:{type:"string",group:"Appearance",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},value:{type:"string",group:"Misc",defaultValue:null},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:l.None}}}});c.prototype.render=function(t,e,i,s){var n=t,o=i.checkEnabled(e),a=e.getId();n.openStart("li",e);n.class("sapUiMnuItm").class("sapUiMnuTfItm");if(s.iItemNo==1){n.class("sapUiMnuItmFirst")}else if(s.iItemNo==s.iTotalItems){n.class("sapUiMnuItmLast")}if(!i.checkEnabled(e)){n.class("sapUiMnuItmDsbl")}if(e.getStartsSection()){n.class("sapUiMnuItmSepBefore")}if(!o){n.attr("disabled","disabled")}if(s.bAccessible){n.attr("role","menuitem");n.attr("aria-posinset",s.iItemNo);n.attr("aria-setsize",s.iTotalItems)}n.openEnd();n.openStart("div").class("sapUiMnuItmL").openEnd().close("div");if(e.getIcon()){n.openStart("div").class("sapUiMnuItmIco").openEnd();n.icon(e.getIcon(),null,{title:null});n.close("div")}n.openStart("div",a+"-txt").class("sapUiMnuItmTxt").openEnd();n.openStart("label",a+"-lbl").class("sapUiMnuTfItemLbl").openEnd();n.text(e.getLabel());n.close("label");n.openStart("div",a+"-str").class("sapUiMnuTfItmStretch").openEnd().close("div");n.openStart("div").class("sapUiMnuTfItemWrppr").openEnd();n.voidStart("input",a+"-tf").attr("tabindex","-1");if(e.getValue()){n.attr("value",e.getValue())}n.class("sapUiMnuTfItemTf").class(o?"sapUiMnuTfItemTfEnbl":"sapUiMnuTfItemTfDsbl");if(!o){n.attr("disabled","disabled")}if(s.bAccessible){n.accessibilityState(e,{disabled:null,multiline:false,autocomplete:"none",describedby:a+"-lbl "+e._fnInvisibleDescriptionFactory(s).getId()})}n.voidEnd().close("div").close("div");n.openStart("div").class("sapUiMnuItmR").openEnd().close("div");n.close("li")};c.prototype.exit=function(){if(this._invisibleDescription){this._fnInvisibleDescriptionFactory().destroy();this._invisibleDescription=null}};c.prototype.hover=function(t,e){this.$().toggleClass("sapUiMnuItmHov",t);if(t&&e.checkEnabled(this)){e.closeSubmenu(false,true)}};c.prototype.focus=function(t){if(this.getEnabled()&&this.getVisible()){this.$("tf").get(0).focus()}else{t.focus()}};c.prototype.onAfterRendering=function(){this._adaptSizes();this.setValueState(this.getValueState())};c.prototype.onsapup=function(t){this.getParent().onsapprevious(t)};c.prototype.onsapdown=function(t){this.getParent().onsapnext(t)};c.prototype.onsaphome=function(t){if(this._checkCursorPosForNav(false)){this.getParent().onsaphome(t)}};c.prototype.onsapend=function(t){if(this._checkCursorPosForNav(true)){this.getParent().onsapend(t)}};c.prototype.onsappageup=function(t){this.getParent().onsappageup(t)};c.prototype.onsappagedown=function(t){this.getParent().onsappagedown(t)};c.prototype.onsapescape=function(t){this.getParent().onsapescape(t)};c.prototype.onkeydown=function(t){t.stopPropagation()};c.prototype.onclick=function(t){this.getParent().closeSubmenu(false,true);if(!n.system.desktop&&this.getParent().checkEnabled(this)){this.focus()}t.stopPropagation()};c.prototype.onkeyup=function(t){if(!a.events.sapenter.fnCheck(t)&&t.key!=="Enter"){return}var e=this.$("tf").val();this.setValue(e);this.getParent().selectItem(this);t.preventDefault();t.stopPropagation()};c.prototype.setSubmenu=function(t){o.warning("The aggregation 'submenu' is not supported for this type of menu item.","","sap.ui.unified.MenuTextFieldItem");return this};c.prototype.setLabel=function(t){this.setProperty("label",t,true);this.$("lbl").text(t);this._adaptSizes();return this};c.prototype.setValue=function(t){this.setProperty("value",t,true);this.$("tf").val(t);return this};c.prototype.setValueState=function(e){this.setProperty("valueState",e,true);var i=this.$("tf");i.toggleClass("sapUiMnuTfItemTfErr",e==l.Error);i.toggleClass("sapUiMnuTfItemTfWarn",e==l.Warning);var s=t.enrichTooltip(this,this.getTooltip_AsString());if(s){this.$().attr("title",s)}return this};c.prototype.getFocusDomRef=function(){var t=this.$("tf");return t.length?t.get(0):null};c.prototype._adaptSizes=function(){var t=this.$("tf");var e=this.$("lbl");var i=e.length?e.get(0).offsetLeft:0;if(p.getConfiguration().getRTL()){t.parent().css({width:"auto",right:this.$().outerWidth(true)-i+(e.outerWidth(true)-e.outerWidth())+"px"})}else{t.parent().css({width:"auto",left:i+e.outerWidth(true)+"px"})}};c.prototype._checkCursorPosForNav=function(t){var e=u.getRTL();var i=t?e:!e;var s=this.$("tf");var n=s.cursorPos();var o=s.val().length;if(e){n=o-n}if(!i&&n!=o||i&&n!=0){return false}return true};c.prototype._fnInvisibleDescriptionFactory=function(t){var e,i,s;if(!this._invisibleDescription){s=p.getLibraryResourceBundle("sap.ui.unified");e=s.getText("UNIFIED_MENU_ITEM_COUNT_TEXT",[t.iItemNo,t.iTotalItems]);i=s.getText("UNIFIED_MENU_ITEM_HINT_TEXT");this._invisibleDescription=new r({text:e+" "+i}).toStatic()}return this._invisibleDescription};return c});