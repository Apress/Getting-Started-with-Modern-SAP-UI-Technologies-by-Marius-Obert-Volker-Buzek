/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";var r={};r.render=function(e,r){var i=null;r.prepareRendering();e.write("<div");e.writeControlData(r);e.addClass("sapUiUx3DS");e.writeClasses();e.writeStyles();e.write(">");e.write("<div id='"+r.getId()+"-toolbar'");e.addClass("sapUiUx3DSToolbar");if(!r.getShowToolbar()){e.addClass("noPadding")}e.writeClasses();e.write(">");this.renderToolbar(e,r);e.write("</div>");e.write("<div id='"+r.getId()+"-filter'");e.addClass("sapUiUx3DSFilterArea");if(!r.getShowFilter()){e.addClass("noPadding")}e.writeClasses();e.write(">");this.renderFilterArea(e,r);e.write("</div>");e.write("<div");e.writeAttribute("id",r.getId()+"-items");e.addClass("sapUiUx3DSItems");e.writeClasses();e.write(">");i=sap.ui.getCore().byId(r.getSelectedView());e.renderControl(i);e.write("</div>");e.write("</div>")};r.renderToolbar=function(e,r){if(r.getShowToolbar()){e.renderControl(r._getToolbar())}};r.renderFilterArea=function(r,i){var t=i.getFilter();if(i.getShowFilter()){e.each(t,function(e,i){r.renderControl(i)})}};return r},true);