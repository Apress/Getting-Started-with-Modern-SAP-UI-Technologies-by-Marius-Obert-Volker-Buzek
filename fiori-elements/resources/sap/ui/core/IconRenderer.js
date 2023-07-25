/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_IconRegistry","./library","sap/base/security/encodeCSS"],function(e,t,i){"use strict";var n=t.IconColor;var s={apiVersion:2};s.render=function(t,s){var r=e.getIconInfo(s.getSrc(),undefined,"mixed"),a=s.getWidth(),o=s.getHeight(),l=s.getColor(),c=s.getBackgroundColor(),g=s.getSize(),f=s._getOutputTitle(r),p,d,u,y=false;if(r instanceof Promise){r.then(s.invalidate.bind(s))}else if(r){y=true;p=s.getAriaLabelledBy();u=s._getAccessibilityAttributes(r);d=s.getAggregation("_invisibleText")}t.openStart("span",s);t.class("sapUiIcon");if(y){t.accessibilityState(s,u);t.attr("data-sap-ui-icon-content",r.content);t.style("font-family","'"+i(r.fontFamily)+"'");if(!r.suppressMirroring){t.class("sapUiIconMirrorInRTL")}}if(s.hasListeners("press")){t.class("sapUiIconPointer");if(!s.getNoTabStop()){t.attr("tabindex","0")}}t.style("width",a);t.style("height",o);t.style("line-height",o);t.style("font-size",g);if(l&&!(l in n)){t.style("color",l)}if(c&&!(c in n)){t.style("background-color",c)}t.openEnd();if(f){t.openStart("span").class("sapUiIconTitle").attr("title",f).attr("aria-hidden",true).openEnd().close("span")}if(p&&p.length&&d){t.renderControl(d)}t.close("span")};return s},true);