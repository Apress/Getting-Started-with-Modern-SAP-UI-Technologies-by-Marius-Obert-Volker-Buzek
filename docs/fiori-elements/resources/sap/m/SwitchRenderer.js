/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/m/library","sap/ui/core/Configuration"],function(e,t,n){"use strict";var i=t.SwitchType;var a={apiVersion:2};a.CSS_CLASS="sapMSwt";a.render=function(t,i){var s=i.getState(),l=s?i._sOn:i._sOff,d=i.getTooltip_AsString(),r=i.getEnabled(),c=i.getName(),o=n.getAccessibility(),p=n.getAnimationMode(),f=a.CSS_CLASS;t.openStart("div",i);t.class(f+"Cont");if(!r){t.class(f+"ContDisabled")}if(r){t.attr("tabindex","0")}if(d){t.attr("title",d)}if(o){this.writeAccessibilityState(t,i)}t.openEnd();t.openStart("div",i.getId()+"-switch");t.attr("aria-hidden","true");t.class(f);if(p!==n.AnimationMode.none&&p!==n.AnimationMode.minimal){t.class(f+"Trans")}t.class(s?f+"On":f+"Off");t.class(f+i.getType());if(e.system.desktop&&r){t.class(f+"Hoverable")}if(!r){t.class(f+"Disabled")}if(i._sOn===" "&&i._sOff===" "){t.class(f+"NoLabel")}t.openEnd();t.openStart("div",i.getId()+"-inner");t.class(f+"Inner");t.openEnd();this.renderText(t,i);this.renderHandle(t,i,l);t.close("div");t.close("div");if(c){this.renderCheckbox(t,i,l)}if(o){this.renderInvisibleElement(t,i,{id:i.getInvisibleElementId(),text:i.getInvisibleElementText(s)})}t.close("div")};a.renderText=function(e,t){var n=a.CSS_CLASS,s=t.getType()===i.Default;e.openStart("div",t.getId()+"-texton");e.class(n+"Text");e.class(n+"TextOn");e.openEnd();e.openStart("span");e.class(n+"Label");e.class(n+"LabelOn");e.openEnd();if(s){e.text(t._sOn)}e.close("span");e.close("div");e.openStart("div",t.getId()+"-textoff");e.class(n+"Text");e.class(n+"TextOff");e.openEnd();e.openStart("span");e.class(n+"Label");e.class(n+"LabelOff");e.openEnd();if(s){e.text(t._sOff)}e.close("span");e.close("div")};a.renderHandle=function(e,t,n){var i=a.CSS_CLASS;e.openStart("div",t.getId()+"-handle");e.attr("data-sap-ui-swt",n);e.class(i+"Handle");e.openEnd();e.close("div")};a.renderCheckbox=function(e,t,n){e.voidStart("input",t.getId()+"-input");e.attr("type","checkbox");e.attr("name",t.getName());e.attr("value",n);if(t.getState()){e.attr("checked","checked")}if(!t.getEnabled()){e.attr("disabled","disabled")}e.voidEnd()};a.writeAccessibilityState=function(e,t){var n=t.getAriaLabelledBy(),i;if(n){n={value:t.getInvisibleElementId(),append:true}}i={role:"switch",checked:t.getState(),labelledby:n};e.accessibilityState(t,i)};a.renderInvisibleElement=function(e,t,n){e.openStart("span",n.id);e.attr("aria-hidden","true");e.class("sapUiInvisibleText");e.openEnd();e.text(n.text);e.close("span")};return a},true);