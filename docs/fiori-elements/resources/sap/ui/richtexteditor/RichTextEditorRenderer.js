/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Core"],function(e){"use strict";var t={apiVersion:2};t.render=function(t,i){var r=i.getAggregation("_toolbarWrapper");var s=r&&i._bCustomToolbarRequirementsFullfiled;var a=e.getLibraryResourceBundle("sap.ui.richtexteditor");var o=i.getPlugins();var l=false;t.openStart("div",i);t.class("sapUiRTE");if(i.getRequired()){t.class("sapUiRTEReq")}if(i.getUseLegacyTheme()){t.class("sapUiRTELegacyTheme")}if(s){t.class("sapUiRTEWithCustomToolbar")}t.style("width",i.getWidth());l=o.some(function(e){return e.name==="autoresize"});if(i.getHeight()&&!l){t.style("height",i.getHeight())}if(i.getTooltip_AsString()){t.attr("title",i.getTooltip_AsString())}t.accessibilityState(i,{role:"region",label:a.getText("RTE_ARIA_LABEL"),labelledby:null});t.openEnd();if(s){t.renderControl(r)}var n="render"+i.getEditorType()+"Editor";if(this[n]&&typeof this[n]==="function"){this[n].call(this,t,i)}t.close("div")};return t},true);