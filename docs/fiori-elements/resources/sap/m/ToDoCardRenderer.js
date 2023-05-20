/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/base/security/encodeCSS"],function(e,t){"use strict";var n=e.LoadState;var r={apiVersion:2};r.render=function(e,r){var o=r.getState();var i=r.getAriaRoleDescription();var s=r.getAriaRole();var a=r.hasListeners("press");var d=t("sapMATState"+o);e.openStart("div",r);e.class("sapMToDoCard");e.class(d);if(o!==n.Disabled){if(!r.isInActionRemoveScope()&&r.getPressEnabled()){e.class("sapMPointer")}if(!r.getPressEnabled()){e.class("sapMATAutoPointer")}e.attr("tabindex","0")}if(i){e.attr("aria-roledescription",i)}if(s){e.attr("role",s)}else{e.attr("role",a?"button":"presentation")}if(r.getWidth()){e.style("width",r.getWidth())}e.openEnd();if(o===n.Loading){this._renderLoadingShimmers(e,r)}else{this._renderHeader(e,r);this._renderContent(e,r);this._renderButton(e,r)}if(o!==n.Disabled){this._renderFocusDiv(e,r)}e.close("div")};r._renderHeader=function(e,t){e.openStart("div",t.getId()+"-hdr-text");e.class("sapMGTHdrContent");e.openEnd();e.renderControl(t._oTitle);e.close("div")};r._renderContent=function(e,t){t.getTileContent().forEach(function(t){e.renderControl(t)})};r._renderFocusDiv=function(e,t){e.openStart("div",t.getId()+"-focus");e.class("sapMATFocusDiv");e.openEnd();e.close("div")};r._renderButton=function(e,t){e.openStart("div",t.getId()+"-actionButtons");e.class("sapMATActionModeContainer");e.openEnd();t.getActionButtons().forEach(function(t){e.renderControl(t)});e.close("div")};r._renderLoadingShimmers=function(e,t){e.openStart("div").class("sapMGTContentShimmerPlaceholderItem");e.class("sapMGTContentShimmerPlaceholderWithDescription");e.openEnd();for(var n=0;n<5;n++){this._renderShimmer(e,t)}e.close("div")};r._renderShimmer=function(e,t){e.openStart("div").class("sapMGTContentShimmerPlaceholderRows").openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderItemHeader").class("sapMGTLoadingShimmer").openEnd().close("div");e.openStart("div").class("sapMGTContentShimmerPlaceholderItemText").class("sapMGTLoadingShimmer").openEnd().close("div");e.close("div")};return r},true);