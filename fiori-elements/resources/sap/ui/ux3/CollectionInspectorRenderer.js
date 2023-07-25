/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,t){e.write("<div");e.addClass("sapUiUx3CI");if(t.getSidebarVisible()){e.addClass("sapUiUx3CISidebarOpened")}else{e.addClass("sapUiUx3CISidebarClosed")}if(t.getFitParent()){e.addClass("sapUiUx3CIFitParent")}e.writeClasses();e.writeControlData(t);e.write(">");e.write("<div");e.addClass("sapUiUx3CIToolBar");e.writeClasses();e.write(">");this.renderToggleButton(e,t);this.renderCollectionSelector(e,t);e.write("</div>");e.write("<div");e.addClass("sapUiUx3CISidebar");e.writeClasses();e.writeAttribute("id",t.getId()+"-sidebar");e.write(">");this.renderSidebar(e,t);e.write("</div>");e.write("<div");e.addClass("sapUiUx3CIContent");e.writeAttribute("id",t.getId()+"-content");e.writeClasses();e.write(">");this.renderContent(e,t);e.write("</div>");e.write("<div");e.addClass("sapUiUx3CIClear");e.writeClasses();e.write(">");e.write("</div>");e.write("</div>")};e.renderToggleButton=function(e,t){if(t.getToggleButton()){e.write("<div");e.writeAttribute("id",t.getId()+"-togglebutton");e.addClass("sapUiUx3CIToggleButton");e.writeClasses();e.write(">");e.renderControl(t.getToggleButton());e.write("</div>")}};e.renderCollectionSelector=function(e,t){if(t.getCollectionSelector()){e.write("<div");e.addClass("sapUiUx3CICollectionSelector");e.writeClasses();e.write(">");e.renderControl(t.getCollectionSelector());e.write("</div>")}};e.renderSidebar=function(e,t){e.write("<div");e.addClass("sapUiUx3CICollectionListContainer");e.writeClasses();e.write(">");e.write('<ul tabindex="-1"');e.addClass("sapUiUx3CICollectionList");e.writeClasses();var i=sap.ui.getCore().byId(t.getSelectedCollection());if(t.getSelectedCollection()){e.writeAccessibilityState(i,{role:"listbox",multiselectable:i.getMultiSelection()})}e.write(">");if(t.getSelectedCollection()){var r=i.getItems().length;i.getItems().forEach(function(t,s){e.write('<li tabindex="-1"');e.writeElementData(t);e.writeAttributeEscaped("title",t.getText());e.addClass("sapUiUx3CICollectionListItem");e.writeClasses();e.writeAccessibilityState(t,{role:"option",selected:i.getSelectedItems().indexOf(t.getId())>=0,setsize:r,posinset:s});e.write(">");e.writeEscaped(t.getText());e.write("</li>")})}e.write("</ul></div>");e.renderControl(t.getEditButton())};e.renderContent=function(e,t){t.getContent().forEach(function(t){e.renderControl(t)})};return e},true);