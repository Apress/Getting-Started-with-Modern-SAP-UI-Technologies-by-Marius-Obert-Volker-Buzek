/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/IconPool"],function(e,t){"use strict";var n={apiVersion:2};n.render=function(t,a){var r=a.getActionBarExpanded();t.openStart("div",a);t.class("sapFSP");a._isSingleItem()&&t.class("sapFSPSingleItem");r&&a.getItems().length!==1&&t.class("sapFSPActionBarExpanded");a._getSideContentExpanded()&&t.class("sapFSPSideContentExpanded");t.openEnd();n.renderMain(t,a);a.getItems().length&&n.renderSide(t,a);!e.system.phone&&n.renderMeasureHelpers(t,a);t.close("div")};n.renderItem=function(n,a,r,i,o){var s=a.getSelectedItem(),d=a._isSingleItem(),l=e.system.phone,p=i===null,c=s===r.getId(),S=p?"aria-expanded":"aria-selected",g=p?a._getOverflowItemText():r.getText();n.openStart("li",r);!o&&n.attr("title",g);n.class("sapFSPItem");if(!r.getEnabled()){n.class("sapFSPDisabled")}if(!p&&c||p&&a._bOverflowMenuOpened){n.class("sapFSPSelected");n.attr(S,"true")}else{n.attr(S,"false")}p&&n.class("sapFSPOverflowItem")&&n.attr("aria-haspopup","menu");n.attr("role",p?"button":"option");!p&&n.attr("aria-posinset",i+1);n.openEnd();n.renderControl(t.createControlByURI({src:i===0&&d&&l?"sap-icon://navigation-up-arrow":r.getIcon(),useIconTooltip:false}));if(d&&l||!d&&o){n.openStart("span");n.class("sapFSPItemText");n.openEnd();n.text(g);n.close("span")}n.close("li")};n.renderMain=function(e,t){var n=t.getMainContent(),a;e.openStart("div");e.class("sapFSPMain");e.attr("data-sap-ui-fastnavgroup","true");e.openEnd();for(a=0;a<n.length;a++){e.renderControl(n[a])}e.close("div")};n.renderSide=function(t,a){var r=e.system.phone,i=a.getSidePanelResizable()&&a._getSideContentExpanded()&&!r;t.openStart("aside");t.class("sapFSPSide");i&&t.class("sapFSPResizable");t.attr("data-sap-ui-fastnavgroup","true");t.attr("role","region");t.attr("aria-label",a._getAriaLabelText());a._getSideContentExpanded()&&!r&&t.style("width",a._getSidePanelWidth());t.openEnd();t.openStart("div");t.class("sapFSPSideInner");t.openEnd();n.renderActionBar(t,a);a.getSelectedItem()&&n.renderSideContent(t,a);i&&n.renderSplitterBar(t,a);t.close("div");t.close("aside")};n.renderSideContent=function(e,t){var a=t._getSelectedItem().getContent(),r;if(t._getSideContentExpanded()){e.openStart("div");e.class("sapFSPSideContent");e.attr("data-sap-ui-fastnavgroup","true");e.attr("role","region");e.attr("aria-label",t._getSideContentHeaderTitle().getText());e.openEnd();n.renderSideContentHeader(e,t);e.openStart("div");e.class("sapFSPSideContentInner");e.attr("aria-labelledby",t.getId()+"-header");e.openEnd();for(r=0;r<a.length;r++){e.renderControl(a[r])}e.close("div");e.close("div")}};n.renderSideContentHeader=function(e,t){e.openStart("div",t.getId()+"-header");e.class("sapFSPSideContentHeader");e.openEnd();e.renderControl(t._getSideContentHeaderIcon());e.renderControl(t._getSideContentHeaderTitle());e.renderControl(t._getSideContentHeaderCloseBtn());e.close("div")};n.renderActionBar=function(t,a){var r=a.getItems(),i=a.getActionBarExpanded(),o=r.length===1,s=e.system.phone,d=a.getAggregation("_arrowButton"),l;t.openStart("div");t.class("sapFSPActionBar");t.openEnd();if(!s){o&&d.setTooltip(a.getItems()[0].getText());t.renderControl(d)}if(r.length){t.openStart("div");t.class("sapFSPActionBarListWrapper");i&&t.class("sapFSPExpanded");t.attr("role","toolbar");t.openEnd();t.openStart("ul",a.getId()+"-ActionBarList");t.class("sapFSPActionBarList");r.length<4&&t.class("sapFSPCenteredItems");t.attr("aria-multiselectable","false");t.attr("aria-label","Actions");t.attr("role","listbox");t.openEnd();if(s||r.length>1){for(l=0;l<r.length;l++){n.renderItem(t,a,r[l],l,i)}if(!s){n.renderItem(t,a,a.getAggregation("_overflowItem"),null,i)}}t.close("ul");t.close("div")}t.close("div")};n.renderSplitterBar=function(e,t){e.openStart("div",t.getId()+"-resizeSplitter");e.class("sapFSPSplitterBar");e.attr("tabindex",0);e.attr("role","separator");e.attr("aria-orientation","vertical");e.attr("aria-roledescription","splitter separator");e.attr("title",t._getSplitterTitle());e.openEnd();e.openStart("div");e.class("sapFSPSplitterBarDecorationBefore");e.openEnd();e.close("div");e.openStart("div");e.class("sapFSPSplitterBarGrip");e.openEnd();e.icon("sap-icon://vertical-grip",["sapFSPSplitterBarGripIcon"]);e.close("div");e.openStart("div");e.class("sapFSPSplitterBarDecorationAfter");e.openEnd();e.close("div");e.close("div")};n.renderMeasureHelpers=function(e,t){e.openStart("div");e.class("sapFSPMinWidth");e.style("width",t.getSidePanelMinWidth());e.openEnd();e.close("div");e.openStart("div");e.class("sapFSPMaxWidth");e.style("width",t.getSidePanelMaxWidth());e.openEnd();e.close("div")};return n});