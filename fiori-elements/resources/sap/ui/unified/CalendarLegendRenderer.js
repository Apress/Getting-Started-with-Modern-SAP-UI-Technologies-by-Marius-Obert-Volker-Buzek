/*
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText"],function(e){"use strict";var t={apiVersion:2};t.render=function(e,t){var i=t.getAggregation("_standardItems"),n=t.getItems(),r=this.defineItemsLength(t,n.length),d=(i?i.length:0)+(n?n.length:0),s,a,o,l=1;e.openStart("div",t);e.class("sapUiUnifiedLegend");e.attr("aria-label",t._getLegendAriaLabel());e.attr("role","list");e.openEnd();this.renderItemsHeader(e,t);if(i||n){e.openStart("div");e.class("sapUiUnifiedLegendItems");o=t.getColumnWidth();e.style("column-width",o);e.style("-moz-column-width",o);e.style("-webkit-column-width",o);e.openEnd();if(i){a=t.getId().length+1;for(s=0;s<i.length;++s){var g="sapUiUnifiedLegend"+i[s].getId().slice(a);this.renderLegendItem(e,g,i[s],["sapUiUnifiedLegendSquareColor"],l++,d)}}if(n){for(s=0;s<r;s++){this.renderLegendItem(e,"sapUiCalLegDayType"+t._getItemType(n[s],n).slice(4),n[s],["sapUiUnifiedLegendSquareColor"],l++,d)}}this.renderAdditionalItems(e,t);e.close("div")}this.renderAdditionalContent(e,t);e.close("div")};t.renderLegendItem=function(e,t,i,n,r,d){var s=i.getText();var a=i.getTooltip_AsString();e.openStart("div",i);if(a){e.attr("title",a)}e.attr("role","listitem");e.attr("aria-posinset",r);e.attr("aria-setsize",d);e.class("sapUiUnifiedLegendItem");e.class(t);e.openEnd();e.openStart("div");e.class("sapUiUnifiedLegendSquare");e.openEnd();this.renderColor(e,i.getColor(),n);e.close("div");e.openStart("div",i.getId()+"-Text");e.class("sapUiUnifiedLegendDescription");e.openEnd();e.text(s);e.close("div");e.close("div")};t.renderItemsHeader=function(e,t){};t.renderAdditionalContent=function(e,t){};t.defineItemsLength=function(e,t){return t};t.renderAdditionalItems=function(e,t){};t.renderColor=function(e,t,i){e.openStart("div");for(var n=0;n<i.length;n++){e.class(i[n])}if(t){e.style("background-color",t)}e.openEnd();e.close("div")};t.addCalendarTypeAccInfo=function(e,i,n){var r,d;if(n){var s=n._getItemByType(i);if(s){r=s.getText()}}if(r){e["label"]=e["label"]?e["label"]+"; "+r:r}else{d=t.getTypeAriaText(i);if(d){e["describedby"]=e["describedby"]?e["describedby"]+" "+d.getId():d.getId()}}};t.typeARIATexts={};t.getTypeAriaText=function(i){var n,r;if(i.indexOf("Type")!==0){return}if(!t.typeARIATexts[i]){n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");r=n.getText("LEGEND_UNNAMED_TYPE",parseInt(i.slice(4)).toString());t.typeARIATexts[i]=new e({text:r});t.typeARIATexts[i].toStatic()}return t.typeARIATexts[i]};return t},true);