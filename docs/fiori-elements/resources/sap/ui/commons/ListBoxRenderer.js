/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/ui/core/Renderer","sap/ui/core/IconPool"],function(e,t,i,a){"use strict";var s={};s.render=function(e,t){if(s.borderWidths===undefined){s.borderWidths=0}e.addClass("sapUiLbx");var i=true;if(!t.getEditable()){e.addClass("sapUiLbxRo");i=false}if(!t.getEnabled()){e.addClass("sapUiLbxDis");i=false}if(i){e.addClass("sapUiLbxStd")}e.write("<div");e.writeControlData(t);e.writeAttribute("tabindex","-1");var a=t.getWidth();if(a){e.addStyle("width",a);var r=t.getDisplaySecondaryValues();var l=t.getDisplayIcons();if(!r&&!l){e.addClass("sapUiLbxFixed")}}if(!a||a=="auto"||a=="inherit"){e.addClass("sapUiLbxFlexWidth")}e.writeClasses();var d=t.getMinWidth();var n=t.getMaxWidth();if(d){e.addStyle("min-width",d)}if(n){e.addStyle("max-width",n)}if(t._bHeightInItems){if(t._sTotalHeight!=null){e.addStyle("height",t._sTotalHeight)}}else{var o=t.getHeight();if(o){e.addStyle("height",o)}}e.writeStyles();var g=t.getTooltip_AsString();if(g){e.writeAttributeEscaped("title",g)}e.write(">");this.renderItemList(t,e);e.write("</div>")};s.renderItemList=function(e,i){i.write("<ul id='"+e.getId()+"-list'");i.writeAttribute("tabindex",this.getTabIndex(e));i.writeAccessibilityState(e,{role:"listbox",multiselectable:e.getAllowMultiSelect()});i.write(">");var r=e.getItems(),l=0,d=0;var n;for(n=0;n<r.length;n++){if(!(r[n]instanceof sap.ui.core.SeparatorItem)){d++}}var o=e.getDisplaySecondaryValues();for(n=0;n<r.length;n++){var g=r[n];if(g instanceof sap.ui.core.SeparatorItem){i.write("<div id='",g.getId(),"' class='sapUiLbxSep' role='separator'><hr>");if(e.getDisplayIcons()){i.write("<hr>")}if(o){i.write("<hr>")}i.write("</div>")}else{i.write("<li");i.writeElementData(g);i.writeAttribute("data-sap-ui-lbx-index",n);i.addClass("sapUiLbxI");if(!g.getEnabled()){i.addClass("sapUiLbxIDis")}i.writeAttribute("tabindex","-1");if(e.isIndexSelected(n)){i.addClass("sapUiLbxISel")}i.writeClasses();var c=g.getText();var p=g.getAdditionalText?g.getAdditionalText():"";if(g.getTooltip_AsString()){i.writeAttributeEscaped("title",g.getTooltip_AsString())}else{i.writeAttributeEscaped("title",c+(o&&p?"  --  "+p:""))}i.writeAccessibilityState(g,{role:"option",selected:n===e.getSelectedIndex(),setsize:d,posinset:l+1});i.write(">");if(e.getDisplayIcons()){var f;if(g.getIcon){f=g.getIcon()}i.write("<span");if(a.isIconURI(f)){i.addClass("sapUiLbxIIco");i.addClass("sapUiLbxIIcoFont");var w=a.getIconInfo(f);i.addStyle("font-family","'"+t(w.fontFamily)+"'");if(w&&!w.skipMirroring){i.addClass("sapUiIconMirrorInRTL")}i.writeClasses();i.writeStyles();i.write(">");i.writeEscaped(w.content)}else{i.write(" class='sapUiLbxIIco'><img src='");if(f){i.writeEscaped(f)}else{i.write(sap.ui.resource("sap.ui.commons","img/1x1.gif"))}i.write("'>")}i.write("</span>")}i.write("<span class='sapUiLbxITxt");i.write("'");i.writeAttribute("id",g.getId()+"-txt");var u=s.getTextAlign(e.getValueTextAlign(),null);if(u){i.write("style='text-align:"+u+"'")}i.write(">");if(c===""||c===null){i.write("&nbsp;")}else{i.writeEscaped(c)}if(o){i.write("</span><span class='sapUiLbxISec");i.write("'");var x=s.getTextAlign(e.getSecondaryValueTextAlign(),null);if(x){i.write("style='text-align:"+x+"'")}i.write(">");i.writeEscaped(p)}i.write("</span></li>");l++}}i.write("</ul>")};s.fixWidth=function(e){if(s.borderWidths>0){if(/px$/i.test(e)){var t=parseInt(e.substr(0,e.length-2));var i=t-s.borderWidths;if(i>=0){return i+"px"}}}return e};s.getTabIndex=function(e){if(e.getEnabled()&&e.getEditable()){return 0}else{return-1}};s.handleSelectionChanged=function(e){if(e.getDomRef()){var t=e.getItems();for(var i=0,a=t.length;i<a;i++){if(e.isIndexSelected(i)){t[i].$().addClass("sapUiLbxISel").attr("aria-selected","true")}else{t[i].$().removeClass("sapUiLbxISel").attr("aria-selected","false")}}}};s.handleARIAActivedescendant=function(e,t){var i=e.$("list");if(i.length>0){var a=i.children("li[data-sap-ui-lbx-index="+t+"]");i.attr("aria-activedescendant",a.attr("id"))}};s.getTextAlign=i.getTextAlign;return s},true);