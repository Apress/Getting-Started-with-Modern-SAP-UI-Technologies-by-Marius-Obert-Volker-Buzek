/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ViewRenderer","../RenderManager","sap/ui/thirdparty/jquery"],function(e,t,n){"use strict";var r=t.RenderPrefixes.Dummy,i=t.RenderPrefixes.Invisible,s=t.RenderPrefixes.Temporary;var d={apiVersion:2};d.render=function(d,a){function o(t){d.openStart("div",a);d.class("sapUiView");d.class("sapUiXMLView");e.addDisplayClass(d,a);if(t){d.attr("data-sap-ui-preserve",a.getId())}d.style("width",a.getWidth());d.style("height",a.getHeight());d.openEnd()}function l(){d.close("div")}var f=a._aParsedContent,p;if(a.isBound("content")){o();var v=a.getContent();for(p=0;p<v.length;p++){d.renderControl(v[p])}l()}else{var c=a._$oldContent=t.findPreservedContent(a.getId());if(c.length===0){var g=a.isSubView();if(!g){o(!a.oAsyncState||!a.oAsyncState.suppressPreserve)}if(f){for(p=0;p<f.length;p++){var u=f[p];if(Array.isArray(u)){d[u[0]].apply(d,u[1])}else if(!u._isExtensionPoint){d.renderControl(u);if(!u.bOutput){d.openStart("div",r+u.getId());d.class("sapUiHidden");d.openEnd();d.close("div")}}}}if(!g){l()}}else{d.renderControl(a.oAfterRenderingNotifier);d.openStart("div",s+a.getId());d.class("sapUiHidden");d.openEnd();for(p=0;p<f.length;p++){var y=f[p];if(!Array.isArray(y)&&!y._isExtensionPoint){d.renderControl(y);var h=y.getId(),C=n(document.getElementById(h));if(C.length==0){C=n(document.getElementById(i+h))}if(!t.isPreservedContent(C[0])){C.replaceWith('<div id="'+r+h+'" class="sapUiHidden"></div>')}}}d.close("div")}}};return d},true);