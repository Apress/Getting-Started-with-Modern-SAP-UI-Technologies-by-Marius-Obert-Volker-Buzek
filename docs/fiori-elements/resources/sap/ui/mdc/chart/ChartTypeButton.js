/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/OverflowToolbarButton","sap/m/ButtonRenderer","sap/ui/base/ManagedObjectObserver","sap/ui/core/library","sap/m/library","sap/m/IllustratedMessage","sap/m/library","sap/base/util/merge","sap/ui/model/Filter"],function(e,t,a,i,r,o,s,n,c){"use strict";var l=r.PlacementType;var p=i.aria.HasPopup;var h,d,u,b,m,f,_;var v=e.extend("sap.ui.mdc.chart.ChartTypeButton",{metadata:{library:"sap.ui.mdc"},constructor:function(t,i){if(!t){e.apply(this);return}this.oMDCChartModel=t.getManagedObjectModel();i=n(i,{type:"Transparent",press:function(e){this.displayChartTypes(e.getSource(),t)}.bind(this),id:t.getId()+"-btnChartType",icon:"{$chart>/getChartTypeInfo/icon}",tooltip:"{$chart>/getChartTypeInfo/text}",text:"{$chart>/getChartTypeInfo/text}",ariaHasPopup:p.ListBox});this.oMDCChart=t;e.apply(this,[i]);this.setModel(this.oMDCChartModel,"$chart");this._oObserver=new a(function(){this.oMDCChartModel.checkUpdate(true)}.bind(this));this._oObserver.observe(this.oMDCChart,{aggregations:["items"],properties:["chartType"]})},renderer:t});v.mMatchingIcon={bar:"sap-icon://horizontal-bar-chart",bullet:"sap-icon://horizontal-bullet-chart",bubble:"sap-icon://bubble-chart",column:"sap-icon://vertical-bar-chart",combination:"sap-icon://business-objects-experience",dual_bar:"sap-icon://horizontal-bar-chart",dual_column:"sap-icon://vertical-bar-chart",dual_combination:"sap-icon://business-objects-experience",dual_horizontal_combination:"sap-icon://business-objects-experience",dual_horizontal_stacked_combination:"sap-icon://business-objects-experience",dual_line:"sap-icon://line-chart",dual_stacked_bar:"sap-icon://full-stacked-chart",dual_stacked_column:"sap-icon://vertical-stacked-chart",dual_stacked_combination:"sap-icon://business-objects-experience",donut:"sap-icon://donut-chart",heatmap:"sap-icon://heatmap-chart",horizontal_stacked_combination:"sap-icon://business-objects-experience",line:"sap-icon://line-chart",pie:"sap-icon://pie-chart",scatter:"sap-icon://scatter-chart",stacked_bar:"sap-icon://full-stacked-chart",stacked_column:"sap-icon://vertical-stacked-chart",stacked_combination:"sap-icon://business-objects-experience",treemap:"sap-icon://Chart-Tree-Map",vertical_bullet:"sap-icon://vertical-bullet-chart","100_dual_stacked_bar":"sap-icon://full-stacked-chart","100_dual_stacked_column":"sap-icon://vertical-stacked-chart","100_stacked_bar":"sap-icon://full-stacked-chart","100_stacked_column":"sap-icon://full-stacked-column-chart",waterfall:"sap-icon://vertical-waterfall-chart",horizontal_waterfall:"sap-icon://horizontal-waterfall-chart"};v.prototype.displayChartTypes=function(e,t){if(!t||!e){return}if(!this.oReadyPromise){this.oReadyPromise=new Promise(function(e){if(h){e(true)}else{sap.ui.require(["sap/m/ResponsivePopover","sap/m/List","sap/m/SearchField","sap/m/StandardListItem","sap/ui/core/InvisibleText","sap/ui/Device"],function(t,a,i,r,o,s){h=t;d=a;u=i;b=r;m=o;f=s;if(!_){sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc",true).then(function(t){_=t;e(true)})}else{e(true)}})}})}this.oReadyPromise.then(function(){if(!this.oPopover){this.oPopover=this._createPopover(t);this.oPopover.attachAfterClose(function(){this.oPopover.destroy();delete this.oPopover}.bind(this));return this.oPopover.openBy(e)}else if(this.oPopover){this.oPopover.close()}}.bind(this))};v.prototype._createPopover=function(e){var t=new b({title:"{$chart>text}",icon:"{$chart>icon}",selected:"{$chart>selected}"});var a=new d({mode:"SingleSelectMaster",noData:new o({title:_.getText("chart.NO_CHART_TYPES_AVAILABLE"),description:_.getText("chart.NO_CHART_TYPES_AVAILABLE_ACTION"),illustrationType:s.IllustratedMessageType.AddDimensions}),items:{path:"$chart>/getAvailableChartTypes",template:t},selectionChange:function(t){if(t&&t.mParameters&&t.mParameters.listItem){var a=t.mParameters.listItem.getBinding("title");if(a){var i=a.getContext();if(i){var o=i.getObject();if(o&&o.key){sap.ui.require(["sap/ui/mdc/flexibility/Chart.flexibility"],function(t){e.getEngine().createChanges({control:e,key:"Type",state:{properties:{chartType:o.key}}})})}}}}r.close()}});var i=new u({placeholder:_.getText("chart.CHART_TYPE_SEARCH"),liveChange:function(t){if(e){this._triggerSearchInPopover(t,a)}}.bind(this)});var r=new h({id:e.getId()+"-btnChartTypePopover",placement:l.VerticalPreferredBottom,subHeader:i,contentWidth:"25rem"});r.setModel(this.oMDCChartModel,"$chart");if(f.system.desktop){var n=new m({text:_.getText("chart.CHART_TYPELIST_TEXT")});r.setShowHeader(false);r.addContent(n);r.addAriaLabelledBy(n)}else{r.setTitle(_.getText("chart.CHART_TYPELIST_TEXT"))}r.addContent(a);if(a.getItems().length<7){i.setVisible(false)}return r};v.prototype._triggerSearchInPopover=function(e,t){if(!e||!t){return}var a=e.getParameter("newValue");var i=[];if(a){i=new c("text","Contains",a)}t.getBinding("items").filter(i)};v.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this.oPopover){this.oPopover.destroy();this.oPopover=null}};return v});