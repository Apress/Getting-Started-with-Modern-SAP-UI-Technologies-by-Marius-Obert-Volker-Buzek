/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/support/library","sap/base/Log"],function(t,e){"use strict";var a=t.Categories;var i=t.Severity;var r=t.Audiences;var n={id:"oSmartChartRebindChartBeforeInitialise",audiences:[r.Application],categories:[a.Usage],enabled:true,minversion:"1.71",title:"SmartChart: The rebindChart method usage",description:"The call to the rebindChart method was done before the SmartChart control is initialized",resolution:'Applications can listen to the "initialized" event of the SmartChart and then call the rebindChart method. This ensures that the SmartChart control can correctly create and update the binding for the inner chart',resolutionurls:[{text:"API Reference: initialized event",href:"https://ui5.sap.com/#/api/sap.ui.comp.smartchart.SmartChart/events/initialized"}],check:function(t,a,r){var n=e.getLogEntries().filter(function(t){return t.component=="sap.ui.comp.smartChart"});r.getElementsByClassName("sap.ui.comp.smartChart").forEach(function(e){var a=e.getId();var r=n.find(function(t){return t.details==a&&t.message.indexOf("rebindChart method called before the metadata is initialized")>-1});if(r){t.addIssue({severity:i.High,details:"The rebindChart method is called before the metadata for SmartChart "+a+" is initialized",context:{id:a}})}})}};var s={id:"oSmartChartGetChartBeforeInitialise",audiences:[r.Application],categories:[a.Usage],enabled:true,minversion:"1.71",title:"SmartChart: The getChart/getChartAsync method usage",description:"The call to the getChart or getChartAsync method was done before the SmartChart control is initialized",resolution:'Applications can listen to the "initialized" event of the SmartChart and then call the getChart/getChartAsync method. This ensures that the SmartChart control can correctly create and update the binding for the inner chart',resolutionurls:[{text:"API Reference: initialized event",href:"https://ui5.sap.com/#/api/sap.ui.comp.smartchart.SmartChart/events/initialized"}],check:function(t,a,r){var n=e.getLogEntries().filter(function(t){return t.component=="sap.ui.comp.smartChart"});r.getElementsByClassName("sap.ui.comp.smartChart").forEach(function(e){var a=e.getId();var r=n.find(function(t){return t.details==a&&t.message.indexOf("Accesing the inner chart before the metadata is initialized will not work. Instead, wait for the initialized event!")>-1});if(r){t.addIssue({severity:i.High,details:"The getChart/getChartAsync method is called before the metadata for SmartChart "+a+" is initialized",context:{id:a}})}})}};return[n,s]},true);