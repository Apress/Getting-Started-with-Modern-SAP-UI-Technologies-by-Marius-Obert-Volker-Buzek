/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e._aAllIconColors=["sapMITBFilterCritical","sapMITBFilterPositive","sapMITBFilterNegative","sapMITBFilterDefault"];e.render=function(e,t){var n=t.getContent(),a=t._getIconTabHeader();e.openStart("div",t).class("sapMITB");if(t.getStretchContentHeight()){e.class("sapMITBStretch")}if(!t.getApplyContentPadding()){e.class("sapMITBNoContentPadding")}e.class("sapMITBBackgroundDesign"+t.getBackgroundDesign()).openEnd();if(!t._bHideHeader){e.renderControl(a)}e.openStart("div",t.getId()+"-containerContent").class("sapMITBContainerContent");if(!t.getExpanded()){e.class("sapMITBContentClosed")}e.openEnd();e.openStart("div",t.getId()+"-content").class("sapMITBContent").attr("role","tabpanel");if(!t.getExpanded()){e.style("display","none")}if(a.oSelectedItem){e.accessibilityState({labelledby:a.oSelectedItem.getId()})}e.openEnd();if(t.getExpanded()){if(a.oSelectedItem&&a.oSelectedItem.getContent()){var o=a.oSelectedItem.getContent();if(o.length>0){n=o}}n.forEach(function(t){e.renderControl(t)})}e.close("div").close("div").close("div")};return e},true);