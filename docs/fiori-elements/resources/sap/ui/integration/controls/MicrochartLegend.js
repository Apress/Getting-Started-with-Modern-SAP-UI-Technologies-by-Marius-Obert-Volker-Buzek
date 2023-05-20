/*!
* OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./MicrochartLegendRenderer","sap/m/Text","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/theming/Parameters","sap/ui/integration/util/BindingHelper"],function(e,t,i,n,o,r){"use strict";var s=i.extend("sap.ui.integration.controls.MicrochartLegend",{metadata:{library:"sap.ui.integration",aggregations:{_titles:{type:"sap.m.Text",multiple:true,visibility:"hidden"}},associations:{chart:{type:"sap.ui.core.Control",multiple:false}},events:{colorsLoad:{}}},renderer:e});s.prototype.onBeforeRendering=function(){this._mLegendColors={};this._loadLegendColors()};s.prototype.onAfterRendering=function(){this._equalizeWidths()};s.prototype._equalizeWidths=function(){var e=this.$().children(".sapUiIntMicrochartLegendItem"),t=0;e.css("width","");e.each(function(){var e=this.getBoundingClientRect().width;if(e>t){t=e}});e.css("min-width",t+"px")};s.prototype.initItemsTitles=function(e,i){this.destroyAggregation("_titles");e.forEach(function(e,n){var o=r.prependRelativePaths(e.legendTitle,i+"/"+n);var s=new t({text:o});s.addEventDelegate({onAfterRendering:this._equalizeWidths},this);this.addAggregation("_titles",s)}.bind(this))};s.prototype._loadLegendColors=function(){var e=n.byId(this.getChart()),t=[],i;if(e){t=e._calculateChartData().map(function(e){return e.color}).filter(function(e){return e.startsWith("sapUi")})}if(t.length>0){i=o.get({name:t,callback:function(e){this._handleColorsLoad(t,e)}.bind(this)})}if(this._mLegendColors!==undefined){this._handleColorsLoad(t,i)}};s.prototype._handleColorsLoad=function(e,t){if(typeof t==="string"){this._mLegendColors={};this._mLegendColors[e[0]]=t}else if(t){this._mLegendColors=t}this.fireColorsLoad()};return s});