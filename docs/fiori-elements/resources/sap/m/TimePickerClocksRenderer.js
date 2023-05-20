/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={apiVersion:2};t.render=function(t,e){t.openStart("div",e);t.class("sapMTPClocksContainer");t.openEnd();this.renderButtons(t,e);this.renderClocks(t,e);t.close("div")};t.renderButtons=function(t,e){var n=e.getAggregation("_buttons"),r=e.getAggregation("_buttonAmPm"),o=e._getTimeSeparators(e._getDisplayFormatPattern()),a,i,s;if(n){if(r){n.push(r)}t.openStart("div");t.class("sapMTPCButtons");t.attr("dir","ltr");t.openEnd();for(s=0;s<n.length;s++){t.renderControl(n[s]);if(s<n.length-1){i=o.length-(n.length-1)+s;a=o[i];if(!a){a=" "}t.openStart("span");t.attr("aria-hidden","true");t.openEnd();t.text(a);t.close("span")}}t.renderControl(e._getCurrentTimeButton());t.close("div")}};t.renderClocks=function(t,e){var n=e.getAggregation("_clocks"),r;if(n){t.openStart("div");t.class("sapMTPCClocks");t.attr("role","img");t.attr("aria-label",e._getAriaLabel());t.openEnd();for(r=0;r<n.length;r++){if(r===e._getActiveClock()){n[r].addStyleClass("sapMTPCActive")}t.renderControl(n[r])}t.close("div")}};return t},true);