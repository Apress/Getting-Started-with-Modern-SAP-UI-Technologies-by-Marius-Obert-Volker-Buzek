/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var a=t.getId();var n=t.getTooltip_AsString();e.openStart("div",t);e.class("sapUiCal");e.class("sapUiCalInt");e.class("sapUiCalMonthInt");if(t._getShowItemHeader()){e.class("sapUiCalIntHead")}var i=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var o={labelledby:{value:"",append:false}};if(t._bPoupupMode){o["role"]="dialog"}e.accessibilityState(t,o);if(n){e.attr("title",n)}var r=t.getWidth();if(r&&r!=""){e.style("width",r)}e.openEnd();var s=t.getAggregation("header");e.renderControl(s);e.openStart("div",a+"-content");e.class("sapUiCalContent");e.openEnd();e.renderControl(t.getAggregation(t.getProperty("_currentPicker")));e.close("div");e.openStart("button",a+"-cancel");e.class("sapUiCalCancel");e.attr("tabindex","-1");e.openEnd();e.text(i.getText("CALENDAR_CANCEL"));e.close("button");if(t.getPickerPopup()){e.openStart("div",a+"-contentOver");e.class("sapUiCalContentOver");if(!t._oPopup||!t._oPopup.isOpen()){e.style("display","none")}e.openEnd();e.close("div")}e.close("div")};return e},true);