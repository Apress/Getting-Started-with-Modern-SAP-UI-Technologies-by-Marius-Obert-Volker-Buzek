/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./RedlineElement","./Redline","sap/base/Log"],function(t,e,r){"use strict";var i=t.extend("sap.ui.vk.RedlineElementLine",{metadata:{library:"sap.ui.vk",properties:{deltaX:{type:"float",defaultValue:0},deltaY:{type:"float",defaultValue:0},endArrowHead:{type:"boolean",defaultValue:false}}}});i.prototype.edit=function(t,e){var r=this.getParent(),i=r._toVirtualSpace(t,e);this.setDeltaX(i.x-this.getOriginX());this.setDeltaY(i.y-this.getOriginY());return this};i.prototype.applyZoom=function(t){this.setProperty("deltaX",this.getDeltaX()*t,true);this.setProperty("deltaY",this.getDeltaY()*t,true);return this};i.prototype.getP2=function(t){return this.getParent()._toPixelSpace(this.getOriginX()+this.getDeltaX(),this.getOriginY()+this.getDeltaY())};i.prototype.setDeltaX=function(t){this.setProperty("deltaX",t,true);var e=this.getDomRef();if(e){e.setAttribute("x2",this.getP2().x)}};i.prototype.setDeltaY=function(t){this.setProperty("deltaY",t,true);var e=this.getDomRef();if(e){e.setAttribute("y2",this.getP2().y)}};i.prototype.renderElement=function(t,e){var r=this.getParent()._toPixelSpace(this.getOriginX(),this.getOriginY());var i=this.getP2();t.openStart("line",this);t.attr("x1",r.x);t.attr("y1",r.y);t.attr("x2",i.x);t.attr("y2",i.y);t.attr("stroke",this.getStrokeColor());t.attr("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){t.attr("stroke-dasharray",this.getStrokeDashArray().toString())}t.attr("opacity",this.getOpacity());if(e){t.attr("filter",this._getHaloFilter())}if(this.getEndArrowHead()){var a=this._colorToArray(this.getStrokeColor()).join("");t.attr("marker-end","url(#endArrowHead"+a+")")}t.openEnd();t.close("line")};i.prototype.getLength=function(){var t=this.getDomRef();if(t){return t.getTotalLength()}return 0};i.prototype.exportJSON=function(){return jQuery.extend(true,t.prototype.exportJSON.call(this),{type:e.ElementType.Line,version:1,deltaX:this.getDeltaX(),deltaY:this.getDeltaY(),endArrowHead:this.getEndArrowHead()})};i.prototype.importJSON=function(i){if(i.type===e.ElementType.Line){if(i.version===1){t.prototype.importJSON.call(this,i);if(i.hasOwnProperty("deltaX")){this.setDeltaX(i.deltaX)}if(i.hasOwnProperty("deltaY")){this.setDeltaY(i.deltaY)}if(i.hasOwnProperty("endArrowHead")){this.setEndArrowHead(i.endArrowHead)}}else{r.error("wrong version number")}}else{r.error("Redlining JSON import: Wrong element type")}return this};i.prototype.exportSVG=function(){var t=document.createElementNS(e.svgNamespace,"line");t.setAttribute("x1",this.getOriginX());t.setAttribute("y1",this.getOriginY());t.setAttribute("x2",this.getOriginX()+this.getDeltaX());t.setAttribute("y2",this.getOriginY()+this.getDeltaY());t.setAttribute("stroke",this.getStrokeColor());t.setAttribute("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){t.setAttribute("stroke-dasharray",this.getStrokeDashArray().toString())}if(this.getOpacity()<1){t.setAttribute("opacity",this.getOpacity())}t.setAttribute("data-sap-element-id",this.getElementId());t.setAttribute("data-sap-halo",this.getHalo());t.setAttribute("data-sap-end-arrow",this.getEndArrowHead());return t};i.prototype.importSVG=function(e){if(e.tagName==="line"){t.prototype.importSVG.call(this,e);if(e.getAttribute("x1")){this.setOriginX(parseFloat(e.getAttribute("x1")))}if(e.getAttribute("y1")){this.setOriginY(parseFloat(e.getAttribute("y1")))}if(e.getAttribute("x2")){this.setDeltaX(parseFloat(e.getAttribute("x2"))-this.getOriginX())}if(e.getAttribute("y2")){this.setDeltaY(parseFloat(e.getAttribute("y2"))-this.getOriginY())}if(e.getAttribute("data-sap-end-arrow")){this.setEndArrowHead(e.getAttribute("data-sap-end-arrow")==="true")}}else{r("Redlining SVG import: Wrong element type")}return this};return i});