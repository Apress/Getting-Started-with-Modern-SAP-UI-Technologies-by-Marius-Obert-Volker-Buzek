/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/cssgrid/GridLayoutBase","sap/ui/layout/cssgrid/GridSettings","sap/ui/Device","sap/ui/thirdparty/jquery"],function(t,i,e,s){"use strict";var a=/^([X][L](?:[1-9]|1[0-2]))? ?([L](?:[1-9]|1[0-2]))? ?([M](?:[1-9]|1[0-2]))? ?([S](?:[1-9]|1[0-2]))?$/i;var o=a.exec("XL7 L6 M4 S2");var r={Phone:"sapUiLayoutCSSGridBoxLayoutSizeS",Tablet:"sapUiLayoutCSSGridBoxLayoutSizeM",Desktop:"sapUiLayoutCSSGridBoxLayoutSizeL",LargeDesktop:"sapUiLayoutCSSGridBoxLayoutSizeXL"};var n={XL:"sapUiLayoutCSSGridBoxLayoutSpanXL7",L:"sapUiLayoutCSSGridBoxLayoutSpanL6",M:"sapUiLayoutCSSGridBoxLayoutSpanM4",S:"sapUiLayoutCSSGridBoxLayoutSpanS2"};var p="0.5rem";var l=t.extend("sap.ui.layout.cssgrid.GridBoxLayout",{metadata:{library:"sap.ui.layout",properties:{boxMinWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxesPerRowConfig:{type:"sap.ui.layout.BoxesPerRowConfig",group:"Behavior",defaultValue:"XL7 L6 M4 S2"}}}});l.prototype.getActiveGridSettings=function(){return new i({gridTemplateColumns:this._getTemplateColumns(),gridGap:p+" "+p})};l.prototype._applySingleGridLayout=function(i){t.prototype._applySingleGridLayout.call(this,i);var e=sap.ui.getCore().byId(i.parentElement.id);if(e&&e.isA("sap.f.GridList")&&e.isGrouped()){this._flattenHeight(e)}};l.prototype.addGridStyles=function(i){t.prototype.addGridStyles.apply(this,arguments);this._addSpanClasses(i);i.class("sapUiLayoutCSSGridBoxLayoutContainer")};l.prototype.onGridAfterRendering=function(t){t.getGridDomRefs().forEach(function(t){if(t.children){for(var i=0;i<t.children.length;i++){if(!t.children[i].classList.contains("sapMGHLI")&&!t.children[i].classList.contains("sapUiBlockLayerTabbable")){t.children[i].classList.add("sapUiLayoutCSSGridItem")}}}});if(!this._hasBoxWidth()){this._applySizeClass(t)}if(t.isA("sap.f.GridList")&&t.getGrowing()){var i=t._oGrowingDelegate._onAfterPageLoaded;t._oGrowingDelegate._onAfterPageLoaded=function(){i.call(t._oGrowingDelegate);if(t.isA("sap.f.GridList")&&t.isGrouped()){this._flattenHeight(t)}}.bind(this)}};l.prototype.isResponsive=function(){return true};l.prototype.onGridResize=function(t){if(t.control&&t.control.isA("sap.f.GridList")&&t.control.isGrouped()){this._flattenHeight(t.control)}if(t){if(!this._hasBoxWidth()){this._applySizeClass(t.control)}}};l.prototype._flattenHeight=function(t){var i=0,e;this._loopOverGridItems(t,function(t){if(!t.classList.contains("sapMGHLI")){t.style.height=""}});this._loopOverGridItems(t,function(t){if(!t.classList.contains("sapMGHLI")){i=Math.max(s(t).outerHeight(),i)}});e=i+"px";this._loopOverGridItems(t,function(t){if(!t.classList.contains("sapMGHLI")){t.style.height=e}})};l.prototype._applySizeClass=function(t){var i=e.media.getCurrentRange("StdExt",t.$().width());if(!i){return}var s=r[i.name];t.getGridDomRefs().forEach(function(t){if(!t.classList.contains(s)){Object.keys(r).map(function(i){t.classList.remove(r[i])});t.classList.add(s)}})};l.prototype._getTemplateColumns=function(){var t="";if(this.getBoxWidth()){t="repeat(auto-fit, "+this.getBoxWidth()+")"}else if(this.getBoxMinWidth()){t="repeat(auto-fit, minmax("+this.getBoxMinWidth()+", 1fr))"}return t};l.prototype._hasBoxWidth=function(){if(this.getBoxWidth()||this.getBoxMinWidth()){return true}else{return false}};l.prototype._addSpanClasses=function(t){var i,e=this.getBoxesPerRowConfig(),s,r,p,l;if(this._hasBoxWidth()){return}if(!e||!e.length===0){i=o}else{i=a.exec(e)}if(i){for(var u=1;u<i.length;u++){var d=i[u];if(!d){continue}d=d.toUpperCase();switch(d.substr(0,1)){case"X":if(d.substr(1,1)==="L"){s=this._getBoxesPerRowClass(d,2)}break;case"L":r=this._getBoxesPerRowClass(d,1);break;case"M":p=this._getBoxesPerRowClass(d,1);break;case"S":l=this._getBoxesPerRowClass(d,1);break;default:break}}}s=s||n.XL;r=r||n.L;p=p||n.M;l=l||n.S;t.class(s).class(r).class(p).class(l)};l.prototype._getBoxesPerRowClass=function(t,i){var e=parseInt(t.substr(i,t.length));if(e&&e>0&&e<13){return"sapUiLayoutCSSGridBoxLayoutSpan"+t}};l.prototype._loopOverGridItems=function(t,i){t.getGridDomRefs().forEach(function(t){if(t&&t.children){for(var e=0;e<t.children.length;e++){if(t.children[e].style.display!=="none"&&t.children[e].style.visibility!=="hidden"){i(t.children[e])}}}})};return l});