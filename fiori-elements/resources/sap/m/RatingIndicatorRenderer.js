/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","sap/ui/Device","sap/ui/core/Core","sap/ui/core/Configuration"],function(e,t,i,n){"use strict";var s={apiVersion:2},o="px";s.render=function(e,t){var i=this;this.initSharedState(t);this.renderControlContainer(e,t,function(){i.renderSelectedItems(e,t);i.renderUnselectedItems(e,t);i.renderHoverItems(e,t);i.renderSelectorDiv(e,t)})};s.renderControlContainer=function(e,t,i){var n=t.getEnabled(),s=t.getEditable(),o=t.getDisplayOnly();e.openStart("div",t);e.style("width",this._iWidth+"px");e.style("height",this._iHeight+"px");e.style("font-size",this._iHeight+"px");if(n&&!o){e.attr("tabindex","0");e.class("sapMPointer");if(!s){e.class("sapMRIReadOnly")}}else{e.attr("tabindex","-1");n?e.class("sapMRIDisplayOnly"):e.class("sapMRIDisabled")}if(!t.getIconSize()){e.class("sapMRINoCustomIconSize")}e.class("sapMRI");e.class("sapUiRatingIndicator"+t._getIconSizeLabel(this._fIconSize));this.writeTooltip(e,t);this.writeAccessibility(e,t);e.openEnd();i();e.close("div")};s.initSharedState=function(e){var i=e._roundValueToVisualMode(e.getValue()),n=e._iPxIconSize,s=e._iPxPaddingSize,o=i*n+(Math.round(i)-1)*s;if(o<0){o=0}this._bUseGradient=t.browser.chrome||t.browser.safari;this._sLabelID=e.getId()+"-ariaLabel";this._iSymbolCount=e.getMaxValue();this._iWidth=this._iSymbolCount*(n+s)-s;this._iHeight=n;this._iSelectedWidth=o;this._fIconSize=n};s.writeTooltip=function(e,t){var i=t.getTooltip_AsString();if(i){e.attr("title",i)}};s.writeAccessibility=function(e,t){var n=i.getLibraryResourceBundle("sap.m");e.accessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:0,disabled:!t.getEnabled()||t.getDisplayOnly(),roledescription:n.getText("RATING_INDICATOR_ARIA_ROLEDESCRIPTION")})};s.renderSelectedItems=function(e,t){e.openStart("div",t.getId()+"-sel");e.class("sapMRISel");if(this._bUseGradient){e.class("sapMRIGrd")}e.style("width",this._iSelectedWidth+o);e.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("SELECTED",e,t,i)}e.close("div")};s.renderUnselectedItems=function(e,t){e.openStart("div",t.getId()+"-unsel-wrapper");e.class("sapMRIUnselWrapper");e.style("width",this._iWidth-this._iSelectedWidth+o);e.openEnd();e.openStart("div",t.getId()+"-unsel");e.class("sapMRIUnsel");if(this._bUseGradient&&(t.getEnabled()||!t.getDisplayOnly())){e.class("sapMRIGrd")}e.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("UNSELECTED",e,t,i)}e.close("div");e.close("div")};s.renderHoverItems=function(e,t){if(t.getEnabled()||!t.getDisplayOnly()){e.openStart("div",t.getId()+"-hov");e.class("sapMRIHov");e.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("HOVERED",e,t,i)}e.close("div")}};s.renderSelectorDiv=function(e,t){e.openStart("div",t.getId()+"-selector");e.class("sapMRISelector");e.openEnd();e.close("div")};s.renderIcon=function(t,i,n,s){var a=this.getIconURI(t,n),r=this.getIconTag(a),l=e.isIconURI(a),c=this._fIconSize+o;if(r==="img"){i.voidStart(r)}else{i.openStart(r)}if(t==="UNSELECTED"&&!n.getEditable()){t="READONLY"}i.class("sapUiIcon");i.class(this.getIconClass(t));if(s>=Math.ceil(n.getValue())){i.class("sapMRIunratedIcon")}i.style("width",c);i.style("height",c);i.style("line-height",c);i.style("font-size",c);if(!l){i.attr("src",a)}if(r==="img"){i.voidEnd()}else{i.openEnd();if(l){i.text(e.getIconInfo(a).content)}i.close(r)}};s.getIconClass=function(e){switch(e){case"SELECTED":return"sapMRIIconSel";case"UNSELECTED":return"sapMRIIconUnsel";case"HOVERED":return"sapMRIIconHov";case"READONLY":return"sapMRIIconReadOnly"}};s.getIconURI=function(t,i){if(n.getTheme()==="sap_hcb"){if(t==="UNSELECTED"&&(i.getEnabled()&&!i.getDisplayOnly())){return e.getIconURI("unfavorite")}return e.getIconURI("favorite")}switch(t){case"SELECTED":return i.getIconSelected()||e.getIconURI("favorite");case"UNSELECTED":if(i.getEditable()&&!i.getDisplayOnly()&&i.getEnabled()){return i.getIconUnselected()||e.getIconURI("unfavorite")}else{return i.getIconUnselected()||e.getIconURI("favorite")}case"HOVERED":return i.getIconHovered()||e.getIconURI("favorite")}};s.getIconTag=function(t){if(e.isIconURI(t)){return"span"}return"img"};return s},true);