/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Configuration"],function(t,e){"use strict";var i=t.ActionBarSocialActions;var n={apiVersion:2};n.render=function(t,i){t.openStart("div",i);t.class("sapUiUx3ActionBar");if(e.getAccessibility()){t.attr("role","toolbar")}t.openEnd();t.openStart("ul",i.getId()+"-socialActions");t.class("sapUiUx3ActionBarSocialActions");t.style("min-width",i._getSocialActionListMinWidth()+"px");t.openEnd();this.renderSocialActions(t,i);t.close("ul");t.openStart("ul",i.getId()+"-businessActions");t.class("sapUiUx3ActionBarBusinessActions");t.openEnd();this.renderBusinessActionButtons(t,i);t.close("ul");t.close("div")};n.renderBusinessActionButtons=function(t,e){var i=e._getBusinessActionButtons();var n=e._getMoreMenuButton();if(i&&i.length>0){for(var o=0;o<i.length;o++){var a=i[o];t.openStart("li");t.class("sapUiUx3ActionBarItemRight");t.openEnd();t.renderControl(a);t.close("li")}this._renderMoreMenuButton(t,n)}else if(n){this._renderMoreMenuButton(t,n)}};n._renderMoreMenuButton=function(t,e){if(e){t.openStart("li");t.class("sapUiUx3ActionBarItemRight");t.class("sapUiUx3ActionBarMoreButton");t.openEnd();t.renderControl(e);t.close("li")}};n.renderSocialActions=function(t,e){var n=e.mActionMap;var o=e.mActionKeys;if(n[o.Update]){this._renderSocialActionListItem(t,e,n[o.Update])}if(n[o.Follow]){this._renderSocialActionListItem(t,e,n[o.Follow])}if(n[o.Flag]){this._renderSocialActionListItem(t,e,n[o.Flag])}if(n[o.Favorite]){this._renderSocialActionListItem(t,e,n[o.Favorite])}if(n[o.Open]){this._renderSocialActionListItem(t,e,n[o.Open])}for(var a in n){if(!(a in i)){this._renderSocialActionListItem(t,e,n[a])}}};n._renderSocialActionListItem=function(t,e,i){if(i&&!i.hide){t.openStart("li");t.class("sapUiUx3ActionBarItem");t.openEnd();this._renderSocialAction(t,e,i);t.close("li")}};n._renderSocialAction=function(t,e,i){t.openStart("a",i);t.attr("role","button");t.attr("aria-disabled","false");t.attr("aria-haspopup",i.isMenu&&i.isMenu(e)?"true":"false");if(i.name===e.mActionKeys.Flag||i.name===e.mActionKeys.Favorite){t.attr("aria-pressed",i.fnCalculateState(e)==="Selected"?"true":"false")}t.attr("tabindex","0");t.class(i.cssClass);if(i.fnCalculateState){t.class(i.fnCalculateState(e))}t.class("sapUiUx3ActionBarAction");if(i.getTooltip()){t.attr("title",i.getTooltip())}if(i.text){t.attr("text",e.getLocalizedText(i.getText()))}t.openEnd();t.close("a")};return n});