/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,a=e.Severity,i=e.Audiences;var n={id:"drsBindingRule",audiences:[i.Control],categories:[t.Bindings],enabled:true,minversion:"1.28",title:"DateRangeSelection: Either value or dateValue/secondDateValue properties can be bound",description:"Either value or dateValue/secondDateValue properties can be bound",resolution:"Choose one option for binding - either value or dateValue/secondDateValue. They serve the same purpose",resolutionurls:[{text:"SAP Fiori Design Guidelines: DateRangeSelection",href:"https://experience.sap.com/fiori-design-web/date-range-selection/"}],check:function(e,t,i){i.getElementsByClassName("sap.m.DateRangeSelection").forEach(function(t){if(t.getBinding("value")&&(t.getBinding("dateValue")||t.getBinding("secondDateValue"))){var i=t.getId(),n=t.getMetadata().getElementName();e.addIssue({severity:a.High,details:"DateRangeSelection '"+n+"' ("+i+") has value and dataValue/secondDateValue properties bound",context:{id:i}})}})}};var o={id:"drsValueFormatRule",audiences:[i.Control],categories:[t.Functionality],enabled:true,minversion:"1.28",title:"DateRangeSelection: valueFormat property is not supported",description:"valueFormat property is not supported.",resolution:"Do not use the valueFormat property.",resolutionurls:[{text:"SAP Fiori Design Guidelines: DateRangeSelection",href:"https://experience.sap.com/fiori-design-web/date-range-selection/"}],check:function(e,t,i){i.getElementsByClassName("sap.m.DateRangeSelection").forEach(function(t){if(t.getValueFormat()){var i=t.getId(),n=t.getMetadata().getElementName();e.addIssue({severity:a.High,details:"DateRangeSelection '"+n+"' ("+i+") has valueFormat property set.",context:{id:i}})}})}};return[n,o]},true);