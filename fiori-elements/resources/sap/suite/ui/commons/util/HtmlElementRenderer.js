/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Control","sap/base/Log"],function(e,t,r){"use strict";var n;var i=e.extend("sap.suite.ui.commons.util.HtmlElementRenderer",{constructor:function(t){e.apply(this,arguments);this._oHtmlElement=t}});i.apiVersion=2;i.prototype.render=function(e){e.openStart(this._oHtmlElement._sName);this._renderAttributes(e);e.openEnd();if(this._oHtmlElement._aChildren.length>0){this._renderChildren(e)}e.close(this._oHtmlElement._sName)};i.prototype._renderAttributes=function(e){var t=this._oHtmlElement._mAttributes;for(var r in t){if(!t.hasOwnProperty(r)){continue}var n=t[r];switch(r){case"class":if(Array.isArray(n)){for(var i in n){e.class(n[i])}}else{e.class(n)}break;case"style":if(typeof n==="object"&&!!n){for(var s in n){e.style(s,n[s])}}break;default:if(Array.isArray(n)){n=n.join("")}e.attr(r,n)}}};i.prototype._renderChildren=function(e){if(typeof n==="undefined"){n=sap.ui.require("sap/suite/ui/commons/util/HtmlElement")}this._oHtmlElement._aChildren.forEach(function(i){if(typeof i==="string"){e.unsafeHtml(i)}else if(n&&i instanceof n){i.getRenderer().render(e)}else if(i instanceof t){e.renderControl(i)}else{r.error(typeof i+" cannot be a child of a HTML element. Skipping rendering for this child.")}})};return i});