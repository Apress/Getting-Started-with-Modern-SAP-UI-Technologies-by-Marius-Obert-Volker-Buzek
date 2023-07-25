/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/ux3/ThingViewerRenderer"],function(e,t){"use strict";var i=e.extend(t);i.renderContent=function(e,t){e.write("<div");e.addClass("sapSuiteTvMinHeight");e.writeClasses();e.write(">");e.write("<header");e.writeAttribute("id",t.getId()+"-header");e.addClass("sapSuiteTvTitle");e.writeClasses();e.addStyle("width",t.getSidebarWidth());e.writeStyles();e.write(">");this.renderHeader(e,t);e.write("</header>");e.write("<nav");e.writeAttribute("id",t.getId()+"-navigation");e.addClass("sapSuiteTvNav");if(!t.getLogo()){e.addClass("sapSuiteTvNavNoLogo")}e.writeClasses();e.addStyle("width",t.getSidebarWidth());e.writeStyles();e.write(">");e.renderControl(t._getNavBar());e.write("</nav>");e.write("<aside");e.writeAttribute("id",t.getId()+"-headerContent");e.addClass("sapSuiteTvHeader");e.writeClasses();e.write(">");this.renderHeaderContent(e,t);e.write("</aside>");e.write("<div");e.writeAttribute("id",t.getId()+"-facetContent");e.addClass("sapSuiteTvFacet");e.writeClasses();e.write(">");this.renderFacetContent(e,t);e.write("</div>");if(t.getLogo()){e.write("<footer");e.writeAttribute("id",t.getId()+"-footer");e.addClass("sapSuiteTvLogo");e.writeClasses();e.addStyle("width",t.getSidebarWidth());e.writeStyles();e.write(">");e.write("<img");e.writeAttribute("id",t.getId()+"-logo");e.writeAttribute("role","presentation");e.writeAttributeEscaped("src",t.getLogo());e.addClass("sapSuiteTvLogoIcon");e.writeClasses();e.write("/>");e.write("</footer>")}e.write("</div>")};i.renderHeader=function(e,t){var i=t.getMenuContent().length;e.write("<div");e.addClass("sapSuiteTvTitleBar");e.writeClasses();e.write(">");if(t.getIcon()){e.write("<img");e.writeAttribute("id",t.getId()+"-swatch");e.writeAttribute("role","presentation");e.writeAttributeEscaped("src",t.getIcon());e.addClass("sapSuiteTvTitleIcon");e.writeClasses();e.write("/>")}if(i>0){e.renderControl(t._oMenuButton)}e.write("<div");e.writeAttribute("role","heading");e.writeAttribute("aria-level",1);e.writeAttributeEscaped("title",t.getType());e.addClass("sapSuiteTvTitleType");e.addClass("sapSuiteTvTextCrop");e.writeClasses();e.write(">");e.writeEscaped(t.getType());e.write("</div>");e.write("<div");e.writeAttribute("role","heading");e.writeAttribute("aria-level",2);e.writeAttributeEscaped("title",t.getTitle());e.addClass("sapSuiteTvTitleFirst");e.writeClasses();e.write(">");e.writeEscaped(t.getTitle());e.write("</div>");e.write("<div");e.writeAttribute("role","heading");e.writeAttribute("aria-level",3);e.writeAttributeEscaped("title",t.getSubtitle());e.addClass("sapSuiteTvTitleSecond");e.addClass("sapSuiteTvTextCrop");e.writeClasses();e.write(">");e.writeEscaped(t.getSubtitle());e.write("</div>");e.write("</div>");this.renderFlyOutMenu(e,t)};i.renderFacetContent=function(e,t){var i=t.getFacetContent();for(var r=0;r<i.length;r++){var a=i[r];e.write("<div");e.writeAttribute("role","form");if(a.getColspan()){e.addClass("sapUiUx3TVFacetThingGroupSpan")}else{e.addClass("sapUiUx3TVFacetThingGroup")}e.writeClasses();e.write(">");e.write("<div");e.writeAttributeEscaped("title",a.getTitle());e.addClass("sapUiUx3TVFacetThingGroupContentTitle");e.writeClasses();e.write(">");e.write("<span>");e.writeEscaped(a.getTitle());e.write("</span>");e.write("</div>");e.write("<div");e.addClass("sapUiUx3TVFacetThingGroupContent");e.writeClasses();e.write(">");var s=a.getContent();for(var d=0;d<s.length;d++){e.renderControl(s[d])}e.write("</div>");e.write("</div>")}};i.renderFlyOutMenu=function(e,t){e.write("<div");e.writeAttribute("id",t.getId()+"-menu-popup");e.writeAttribute("role","menu");e.addClass("sapSuiteTvPopupMenu");e.writeClasses();e.write(">");var i=t.getMenuContent();for(var r=0;r<i.length;r++){var a=i[r];a.addStyleClass("sapSuiteTvPopupMenuLink");e.renderControl(a)}e.write("</div>")};return i},true);