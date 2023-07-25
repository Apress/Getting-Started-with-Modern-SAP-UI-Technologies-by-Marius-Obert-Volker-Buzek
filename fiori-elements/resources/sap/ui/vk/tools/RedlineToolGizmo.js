/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Gizmo","./RedlineToolGizmoRenderer"],function(e,t){"use strict";var i=e.extend("sap.ui.vk.tools.RedlineToolGizmo",{metadata:{library:"sap.ui.vk",aggregations:{redlineElements:{type:"sap.ui.vk.RedlineElement"},activeElement:{type:"sap.ui.vk.RedlineElement",multiple:false,visibility:"hidden"}}}});i.prototype.init=function(){if(e.prototype.init){e.prototype.init.apply(this)}this._activeElement=null;this._virtualLeft=0;this._virtualTop=0;this._virtualSideLength=1};i.prototype.show=function(){this.getParent()._viewport.attachEvent("resize",null,this._onResize,this);this.addStyleClass("sapUiVizkitRedlineInteractionMode")};i.prototype.hide=function(){this.getParent()._viewport.detachEvent("resize",this._onResize,this);this.removeStyleClass("sapUiVizkitRedlineDesignMode");this.removeStyleClass("sapUiVizkitRedlineInteractionMode")};i.prototype._startAdding=function(e){this._activeElement=null;this.setAggregation("activeElement",e);this.removeStyleClass("sapUiVizkitRedlineInteractionMode");this.addStyleClass("sapUiVizkitRedlineDesignMode")};i.prototype._stopAdding=function(e){var t=e?this._activeElement:null;this._activeElement=null;this.setAggregation("activeElement",null);this.removeStyleClass("sapUiVizkitRedlineDesignMode");this.addStyleClass("sapUiVizkitRedlineInteractionMode");if(t){if(t instanceof sap.ui.vk.RedlineElementLine&&t.getLength()===0){t.destroy();t=null}else{this.addRedlineElement(t);if(this.getParent().getEditable()&&t instanceof sap.ui.vk.RedlineElementText){this._createdTextElement=t;this.editTextElement(t,true)}}this.getParent().fireElementCreated({element:t})}};i.prototype._toVirtualSpace=function(e,t){if(arguments.length===1){return e/this._virtualSideLength}else{return{x:(e-this._virtualLeft)/this._virtualSideLength,y:(t-this._virtualTop)/this._virtualSideLength}}};i.prototype._toPixelSpace=function(e,t){if(arguments.length===1){return e*this._virtualSideLength}else{return{x:e*this._virtualSideLength+this._virtualLeft,y:t*this._virtualSideLength+this._virtualTop}}};i.prototype._onResize=function(){if(this.getDomRef()){this.rerender()}};i.prototype._getPanningRatio=function(){var e=this.getDomRef().getBoundingClientRect(),t=e.height,i=e.width;if(this._virtualLeft===0&&(t<i&&this._virtualTop<0||t>i&&this._virtualTop>0)){return t/i}return 1};i.prototype.editTextElement=function(e,t){if(!this.getParent().getEditable()){return}var i=this._textEditingElement&&this._textEditingElement.getDomRef();if(i){i.childNodes[0].blur()}i=e.getDomRef();if(i){e._nextElementSibling=i.nextElementSibling;i.parentNode.appendChild(i);i.childNodes[0].focus();if(t){i.childNodes[0].select()}}};i.prototype.onBeforeRendering=function(){var e=this.getParent()._viewport;if(e&&e.getDomRef()){var t=e.getOutputSize();this._virtualLeft=t.left;this._virtualTop=t.top;this._virtualSideLength=t.sideLength}};i.prototype.onAfterRendering=function(){var e=this;function t(t){var i=t.getDomRef();var n=i&&i.childNodes[0];if(!n){return}n.onfocus=function(i){e._textEditingElement=t;this.style.background="#0004";this.style.backdropFilter="blur(8px)";this.style.resize="both";this.style.overflow="auto"};n.onblur=function(n){e._textEditingElement=null;this.style.background="none";this.style.backdropFilter=null;this.style.resize="none";this.style.overflow="hidden";this.scrollTop=0;t.setWidth(parseFloat(this.style.width));var s=parseFloat(this.style.height);this.style.height="1px";s=Math.max(s,this.scrollHeight);this.style.height=s+"px";t.setHeight(s);if(i===t.getDomRef()){i.parentNode.insertBefore(i,t._nextElementSibling)}delete t._nextElementSibling;if(e._createdTextElement===t){e._createdTextElement=null;e.getParent().fireElementCreated({element:t})}};n.onchange=function(e){t.setText(this.value)};n.addEventListener("keypress",function(e){e.stopPropagation()})}this.getRedlineElements().forEach(function(e){if(e instanceof sap.ui.vk.RedlineElementText){t(e)}});if(this._activeElement instanceof sap.ui.vk.RedlineElementText&&this._activeElement.getDomRef()){t(this._activeElement)}};i.prototype.onkeydown=function(e){if(this._textEditingElement){e.setMarked(true);e.stopPropagation()}};return i});