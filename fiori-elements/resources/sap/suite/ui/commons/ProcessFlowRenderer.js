/*
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","./ProcessFlowLaneHeader","./AriaProperties","sap/ui/Device","sap/base/security/encodeXML"],function(e,t,o,r,a,n){"use strict";var l=t.ProcessFlowZoomLevel;var s={apiVersion:2};s.render=function(e,t){var o=this._getZoomStyleClass(t),r,a,l,d=s,i,c;c=d._renderBasicStructure(e,t);if(c){return}try{r=t._getOrCreateProcessFlow();a=t._getOrCreateLaneMap();i=t._getConnectionsMap()}catch(e){t._handleException(e);return}e.openStart("table");e.attr("id",t.getId()+"-table");e.attr("aria-label",t._getAriaText());e.class("sapSuiteUiCommonsPF");e.class(n(o));e.openEnd();l=Object.keys(a).length;d._renderTableHeader(e,t,a,l);d._renderTableBody(e,t,l,r,i);e.close("table");e.close("div");e.close("div");this._writeCounter(e,t,"Right");e.renderControl(t._getScrollingArrow("right"));e.close("div")};s._renderNormalNodeHeader=function(t,r,a,n,l){t.openStart("th").attr("scope","colgroup").attr("colspan","3").openEnd();t.renderControl(a);t.close("th");if(n<l-1){t.openStart("th").attr("scope","colgroup").attr("colspan","2").openEnd();var s=o.createNewProcessSymbol(r._isHeaderMode());s.attachPress(e.proxy(r.ontouchend,r));t.renderControl(s);t.close("th")}};s._renderMergedNodeHeader=function(t,r,a,n,l,s){var d=r._mergeLaneIdNodeStates(l);a.setState(d);n++;var i=n*3+(n-1)*2;t.openStart("th").attr("scope","colgroup").attr("colspan",i).openEnd();t.renderControl(a);t.close("th");if(s){t.openStart("th").attr("scope","colgroup").attr("colspan","2").openEnd();var c=o.createNewProcessSymbol(r._isHeaderMode());c.attachPress(e.proxy(r.ontouchend,r));t.renderControl(c);t.close("th")}};s._renderNode=function(e,t,o,a){if(a){var n=o.getId()+"-node";var l=o._getCurrentZoomLevelContent();e.attr("id",n);e.attr("tabindex",0);var s={};s.label=o._getAriaText();if(l){s.labelledBy=n+" "+l.getId()}r.writeAriaProperties(e,s,o.getAriaProperties());e.openEnd();a=false}o._setParentFlow(t);o._setZoomLevel(t.getZoomLevel());o._setFoldedCorner(t.getFoldedCorners());e.renderControl(o);return a};s._renderConnection=function(e,t,o,r){if(r){if(o.getAggregation("_labels")&&o.getAggregation("_labels").length>0){e.attr("tabindex",0)}e.openEnd();r=false}o.setZoomLevel(t.getZoomLevel());t.addAggregation("_connections",o);e.renderControl(o);return r};s._renderTableHeader=function(e,t,r,a){var n,l=null,s=null,d,i;e.openStart("thead");e.attr("id",t.getId()+"-thead");e.openEnd();e.openStart("tr");e.class("sapSuiteUiCommonsPFHeader");e.class("sapSuiteUiCommonsPFHeaderHidden");if(t.getShowLabels()){e.class("sapSuiteUiPFWithLabel")}e.openEnd();e.openStart("th").openEnd().close("th");n=0;while(n<a-1){e.openStart("th").openEnd().close("th");e.openStart("th").openEnd().close("th");e.openStart("th").openEnd().close("th");e.openStart("th").openEnd().close("th");e.openStart("th").openEnd().close("th");n++}e.openStart("th").openEnd().close("th");e.openStart("th").openEnd().close("th");e.openStart("th").openEnd().close("th");e.openStart("th").openEnd().close("th");e.close("tr");e.openStart("tr");e.class("sapSuiteUiCommonsPFHeaderRow");e.openEnd();e.openStart("th").attr("scope","col").openEnd();d=o.createNewStartSymbol(t._isHeaderMode());e.renderControl(d);e.close("th");n=0;var c=0;var p=[];var g="1";i=false;while(n<a-1){l=r[n];s=r[n+1];if(l.getLaneId()+g===s.getLaneId()){c=c+1;p.push(l.getState())}else if(c===0){this._renderNormalNodeHeader(e,t,l,n,a)}else{p.push(l.getState());i=true;this._renderMergedNodeHeader(e,t,l,c,p,i);p=[];c=0}n++}if(c===0){if(!s){s=r[0]}this._renderNormalNodeHeader(e,t,s,n,a)}else{p.push(s.getState());i=false;this._renderMergedNodeHeader(e,t,l,c,p,i);c=0}e.openStart("th").attr("scope","col").openEnd();d=o.createNewEndSymbol(t._isHeaderMode());e.renderControl(d);e.close("th");e.close("tr");e.close("thead")};s._renderTableBody=function(e,t,o,r,n){var l,d,i,c,p;var g=s._checkIfHighlightedOrSelectedNodesExists(n);e.openStart("tbody").openEnd();i=r.length;if(i>0){e.openStart("tr").openEnd();e.openStart("td");e.attr("colspan",(o*5).toString());e.openEnd();e.close("td");e.close("tr")}l=0;while(l<i){e.openStart("tr").openEnd();e.openStart("td").openEnd().close("td");c=r[l].length;d=0;while(d<c-1){p=r[l][d];var h=true;if(d==0||d%2){e.openStart("td")}else{e.openStart("td").attr("colspan","4");if(a.browser.chrome){e.class("sapSuiteUiCommonsProcessFlowZIndexForConnectors")}}if(p){if(p.getMetadata().getName()==="sap.suite.ui.commons.ProcessFlowNode"){h=s._renderNode(e,t,p,h)}else{p._setShowLabels(t.getShowLabels());s._setLabelsInConnection(r,n,p,{row:l,column:d},t,g);h=s._renderConnection(e,t,p,h)}}if(h){e.openEnd()}e.close("td");d++}e.openStart("td").openEnd().close("td");e.openStart("td").openEnd().close("td");e.close("tr");l++}e.close("tbody")};s._renderBasicStructure=function(e,t){e.openStart("div",t);var o={};o.label=t._getAriaText();r.writeAriaProperties(e,o,t.getAriaProperties());e.class("sapSuiteUiPFContainer");if(t._arrowScrollable){e.class("sapPFHScrollable");if(t._bPreviousScrollForward){e.class("sapPFHScrollForward")}else{e.class("sapPFHNoScrollForward")}if(t._bPreviousScrollBack){e.class("sapPFHScrollBack")}else{e.class("sapPFHNoScrollBack")}}else{e.class("sapPFHNotScrollable")}e.openEnd();this._writeCounter(e,t,"Left");e.renderControl(t._getScrollingArrow("left"));e.openStart("div");e.attr("id",t.getId()+"-scrollContainer");e.class("sapSuiteUiScrollContainerPF");e.class("sapSuiteUiDefaultCursorPF");e.openEnd();e.openStart("div");e.attr("id",t.getId()+"-scroll-content");e.attr("tabindex",0);e.openEnd();if(!t.getLanes()||t.getLanes().length==0){e.close("div");e.close("div");e.close("div");return true}return false};s._getZoomStyleClass=function(e){switch(e.getZoomLevel()){case l.One:return"sapSuiteUiCommonsPFZoomLevel1";case l.Two:return"sapSuiteUiCommonsPFZoomLevel2";case l.Three:return"sapSuiteUiCommonsPFZoomLevel3";case l.Four:return"sapSuiteUiCommonsPFZoomLevel4";default:break}};s._setLabelsInConnection=function(e,t,o,r,a,n){for(var l=0;l<t.length;l++){var d=t[l];if(d&&d.label){for(var i=0;i<d.connectionParts.length;i++){var c=d.connectionParts[i];if(c.x===r.column&&c.y===r.row){if(e[r.row][r.column+1]&&e[r.row][r.column+1].getMetadata().getName()==="sap.suite.ui.commons.ProcessFlowNode"&&e[r.row][r.column+1].getNodeId()===d.targetNode.getNodeId()){s._setLineTypeInLabel(d,n);if(a._bHighlightedMode&&!d.label._getHighlighted()){d.label.setEnabled(false)}if(d.label.getEnabled()){if(d.label.hasListeners("press")){d.label.detachEvent("press",a._handleLabelClick,a)}d.label.attachPress(a._handleLabelClick,a)}o.addAggregation("_labels",d.label,true)}}}}}};s._setLineTypeInLabel=function(e,t){var o=false,r,a=false,n=false;if(e.sourceNode.getSelected()&&e.targetNode.getSelected()){o=true;e.label._setSelected(true)}else{e.label._setSelected(false)}r=e.targetNode;if(r.getHighlighted()){var l=r.getParents(),s;for(var d=0;d<l.length;d++){s=sap.ui.getCore().byId(l[d]);if(s.getHighlighted()){a=true;break}}}if(a){n=true;e.label._setHighlighted(true)}else{e.label._setHighlighted(false)}if(t&&!o&&!n){e.label._setDimmed(true)}else{e.label._setDimmed(false)}};s._checkIfHighlightedOrSelectedNodesExists=function(e){var t=false;for(var o=0;o<e.length;o++){var r=e[o];if(r.label){if(r.sourceNode.getSelected()&&r.targetNode.getSelected()||r.sourceNode.getHighlighted()&&r.targetNode.getHighlighted()){t=true}}}return t};s._writeCounter=function(e,t,o){e.openStart("span");e.attr("id",t.getId()+"-counter"+o);e.class("suiteUiPFHCounter");e.class(n("suiteUiPFHCounter"+o));e.openEnd();e.text("0");e.close("span")};return s},true);