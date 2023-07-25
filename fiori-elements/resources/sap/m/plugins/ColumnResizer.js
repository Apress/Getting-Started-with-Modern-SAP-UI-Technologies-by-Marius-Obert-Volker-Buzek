/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","sap/ui/core/Core","sap/ui/core/Element","sap/ui/core/InvisibleText","sap/ui/Device","sap/m/ColumnPopoverActionItem","sap/m/table/columnmenu/QuickAction","sap/m/Button","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Aria"],function(e,t,i,n,o,s,a,r,l){"use strict";var u=e.extend("sap.m.plugins.ColumnResizer",{metadata:{library:"sap.m",properties:{},events:{columnResize:{allowPreventDefault:true,parameters:{column:{type:"sap.ui.core.Element"},width:{type:"sap.ui.core.CSSSize"}}}}}});var d={};var h=false;var c="sapMPluginsColumnResizer";var f=t.getConfiguration().getRTL();var p=f?"right":"left";var m=f?"left":"right";var _=f?-1:1;u.getPlugin=e.getPlugin;u.prototype.init=function(){this._iHoveredColumnIndex=-1;this._aPositions=[];this._oHandle=null};u.prototype.onActivate=function(e){e.addEventDelegate(this,this);if(e.isActive()){this.onAfterRendering()}};u.prototype.onDeactivate=function(e){e.removeEventDelegate(this,this);this.onBeforeRendering();this._oHandle=null};u.prototype.onBeforeRendering=function(){if(this._$Container){this._$Container.removeClass(c+"Container").off("."+c);this._$Container.find(this.getConfig("resizable")).removeClass(c+"Resizable");this._updateAriaDescribedBy("remove")}};u.prototype.onAfterRendering=function(){this._$Container=this.getControl().$(this.getConfig("container"));o.system.desktop&&this._$Container.on("mousemove."+c,this._onmousemove.bind(this));this._$Container.addClass(c+"Container").on("mouseleave."+c,this._onmouseleave.bind(this));this._aResizables=this._$Container.find(this.getConfig("resizable")).addClass(c+"Resizable").get();this._updateAriaDescribedBy("add");this._invalidatePositions()};u.prototype._updateAriaDescribedBy=function(e){this._aResizables.forEach(function(t){var o=i.closestTo(t,true);var s=o&&o.getFocusDomRef();l(s)[e+"AriaDescribedBy"](n.getStaticId("sap.m","COLUMNRESIZER_RESIZABLE"))})};u.prototype.ontouchstart=function(e){if(this.getConfig("allowTouchResizing")&&l(e.target).closest(this._aResizables)[0]){this._onmousemove(e)}else if(this._iHoveredColumnIndex==-1&&this._oHandle&&this._oHandle.style[p]){this._onmousemove(e);if(this._iHoveredColumnIndex==-1){this._oHandle.style[p]="";this._oAlternateHandle.style[p]=""}}h=this._iHoveredColumnIndex>-1;if(!h){return}this._startResizeSession(this._iHoveredColumnIndex);d.iTouchStartX=e.targetTouches[0].clientX;d.fHandleX=parseFloat(this._oHandle.style[p]);this._$Container.addClass(c+"Resizing");l(document).on("touchend."+c+" mouseup."+c,this._ontouchend.bind(this))};u.prototype.ontouchmove=function(e){if(!h){return}this._setSessionDistanceX(e.targetTouches[0].clientX-d.iTouchStartX);this._oHandle.style[p]=d.fHandleX+d.iDistanceX+"px"};u.prototype._onmousemove=function(e){if(h||this.getControl().getBusy()||this.getControl().getBlocked()){return}this._setPositions();var t=e.targetTouches?e.targetTouches[0].clientX:e.clientX;var i=this._getHoveredColumnIndex(t);this._displayHandle(i)};u.prototype._onmouseleave=function(){this._invalidatePositions();this.onsapescape()};u.prototype._ontouchend=function(){this._setColumnWidth();this._cancelResizing(true)};u.prototype.onsapescape=function(){if(h){this._cancelResizing()}};u.prototype.onsaprightmodifiers=function(e){this._onLeftRightModifiersKeyDown(e,16)};u.prototype.onsapleftmodifiers=function(e){this._onLeftRightModifiersKeyDown(e,-16)};u.prototype.ondblclick=function(e){var t=e.clientX,i=this._getHoveredColumnIndex(t);if(i==-1){return}this._startResizeSession(i);this._setSessionDistanceX(this._calculateAutoColumnDistanceX());this._setColumnWidth();this._endResizeSession()};u.prototype._getHoveredColumnIndex=function(e){return this._aPositions.findIndex(function(t){return Math.abs(t-e)<=(this._oAlternateHandle||u._isInTouchMode()?20:3)},this)};u.prototype._calculateAutoColumnDistanceX=function(){var e=this.getConfig("columnRelatedCells",this._$Container,d.oCurrentColumn.getId());if(!e||!e.length){return}var t=l("<div></div>").addClass(c+"SizeDetector").addClass(this.getConfig("cellPaddingStyleClass"));var i=e.children().clone().removeAttr("id");this.getConfig("additionalColumnWidth",e,i);this._$Container.append(t);var n=Math.round(t.append(i)[0].getBoundingClientRect().width);var o=n-d.fCurrentColumnWidth;t.remove();return o};u.prototype._invalidatePositions=function(){window.setTimeout(function(){this._bPositionsInvalid=true}.bind(this))};u.prototype._displayHandle=function(e,t){if(this._iHoveredColumnIndex==e){return}if(!this._oHandle){this._oHandle=document.createElement("div");this._oHandle.className=c+"Handle";this._oHandle.onmouseleave=function(){this.style[p]=""};if(t||u._isInTouchMode()){var i=document.createElement("div");i.className=c+"HandleCircle";i.style.top=this._aResizables[e].offsetHeight-8+"px";this._oHandle.appendChild(i);this._oAlternateHandle=this._oHandle.cloneNode(true)}}if(this._$Container[0]!==this._oHandle.parentNode){this._$Container.append(this._oHandle);if(t){this._$Container.append(this._oAlternateHandle)}}this._oHandle.style[p]=e>-1?(this._aPositions[e]-this._fContainerX)*_+"px":"";if(t){this._oAlternateHandle.style[p]=--e>-1?(this._aPositions[e]-this._fContainerX)*_+"px":""}else{if(this._oAlternateHandle){this._oAlternateHandle.style[p]=""}this._iHoveredColumnIndex=e}};u.prototype._cancelResizing=function(e){this._$Container.removeClass(c+"Resizing");if(d.iDistanceX||!e){this._oHandle.style[p]=""}else{setTimeout(function(){this._oHandle.style[p]=""}.bind(this),300)}this._iHoveredColumnIndex=-1;l(document).off("."+c);this._endResizeSession();h=false};u.prototype._getColumnMinWidth=function(e){return e?48:0};u.prototype._startResizeSession=function(e){d.$CurrentColumn=l(this._aResizables[e]);d.oCurrentColumn=i.closestTo(d.$CurrentColumn[0],true);d.fCurrentColumnWidth=d.$CurrentColumn.width();d.iMaxDecrease=this._getColumnMinWidth(d.oCurrentColumn)-d.fCurrentColumnWidth;d.iEmptySpace=this.getConfig("emptySpace",this.getControl());if(d.iEmptySpace!=-1){d.$NextColumn=l(this._aResizables[e+1]);d.oNextColumn=i.closestTo(d.$NextColumn[0],true);d.fNextColumnWidth=d.$NextColumn.width()||0;d.iMaxIncrease=d.iEmptySpace+d.fNextColumnWidth-this._getColumnMinWidth(d.oNextColumn)}else{d.iMaxIncrease=window.innerWidth}};u.prototype._setSessionDistanceX=function(e){d.iDistanceX=(e>0?Math.min(e,d.iMaxIncrease):Math.max(e,d.iMaxDecrease))*_};u.prototype._setColumnWidth=function(){if(!d.iDistanceX){return}var e=d.fCurrentColumnWidth+d.iDistanceX+"px";if(!this._fireColumnResize(d.oCurrentColumn,e)){return}d.oCurrentColumn.setWidth(e);if(d.oNextColumn&&(d.iEmptySpace<3||d.iDistanceX>d.iEmptySpace)){e=d.fNextColumnWidth-d.iDistanceX+d.iEmptySpace+"px";if(this._fireColumnResize(d.oNextColumn,e)){d.oNextColumn.setWidth(e)}}this.getConfig("fixAutoWidthColumns")&&this._aResizables.forEach(function(e){var t=l(e),n=i.closestTo(e,true),o=n.getWidth();if(o&&o.toLowerCase()!="auto"){return}o=t.css("width");if(o&&this._fireColumnResize(n,o)){n.setWidth(o)}},this)};u.prototype._fireColumnResize=function(e,t){return this.fireColumnResize({column:e,width:t})};u.prototype._onLeftRightModifiersKeyDown=function(e,t){if(!e.shiftKey||e.ctrlKey||e.metaKey||e.altKey||u.detectTextSelection(e.target)){return}var i=l(e.target).closest(this._aResizables)[0],n=this._aResizables.indexOf(i);if(n===-1){return}this._startResizeSession(n);this._setSessionDistanceX(t);this._setColumnWidth();this._endResizeSession()};u.detectTextSelection=function(e){var t=window.getSelection(),i=t.toString().replace("/n","");return i&&(e!==t.focusNode&&e.contains(t.focusNode))};u.prototype._endResizeSession=function(){d={}};u.prototype._setPositions=function(){if(!this._bPositionsInvalid){return this._aPositions}this._bPositionsInvalid=false;this._fContainerX=this._$Container[0].getBoundingClientRect()[p];this._aPositions=this._aResizables.map(function(e,t,i){return e.getBoundingClientRect()[m]-(++t==i.length?1.25*_:0)},this)};u.prototype.startResizing=function(e){var t=this._aResizables.indexOf(e);this._setPositions();this._displayHandle(t,true)};u.prototype.getColumnResizeQuickAction=function(e,i){if(!e||!u._isInTouchMode()){return}return new a({content:new r({text:t.getLibraryResourceBundle("sap.m").getText("table.COLUMNMENU_RESIZE"),press:function(){i.close();this.startResizing(e.getDomRef())}.bind(this)})})};u.prototype.getColumnResizeButton=function(e){if(!e||!u._isInTouchMode()){return}return new s({text:t.getLibraryResourceBundle("sap.m").getText("COLUMNRESIZER_RESIZE_BUTTON"),icon:"sap-icon://resize-horizontal",press:this.startResizing.bind(this,e.getDomRef())})};u._isInTouchMode=function(){return window.matchMedia("(hover:none)").matches};e.setConfigs({"sap.m.Table":{container:"listUl",resizable:".sapMListTblHeaderCell:not([aria-hidden=true])",focusable:".sapMColumnHeaderFocusable",cellPaddingStyleClass:"sapMListTblCell",fixAutoWidthColumns:true,onActivate:function(e){this._vOrigFixedLayout=e.getFixedLayout();if(!e.bActiveHeaders){e.bFocusableHeaders=true;this.allowTouchResizing=u._isInTouchMode()}e.setFixedLayout("Strict")},onDeactivate:function(e){e.bFocusableHeaders=false;e.setFixedLayout(this._vOrigFixedLayout);if(this._vOrigFixedLayout=="Strict"){e.rerender()}delete this._vOrigFixedLayout;delete this.allowTouchResizing},emptySpace:function(e){var t=e.getDomRef("tblHeadDummyCell");return t?t.clientWidth:0},columnRelatedCells:function(e,t){return e.find(".sapMListTblCell[data-sap-ui-column='"+t+"']")},additionalColumnWidth:function(e,t){var i=e[0];if(!i.hasAttribute("aria-sort")||i.getAttribute("aria-sort")==="none"){return}var n=t[0];var o=window.getComputedStyle(i.firstChild,":after");n.style.marginLeft=Math.round(parseInt(o.getPropertyValue("width")))+"px"}}},u);return u});