/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/util/TypeUtil"],function(e){"use strict";var r=function(){};r.fetchAllAnnotations=function(e,r){var t=e.getMetaContext(r);return e.requestObject("@",t).then(function(e){return e})};r.getAllCustomAggregates=function(e){var r={},t;for(var a in e){if(a.startsWith("@Org.OData.Aggregation.V1.CustomAggregate")){t=a.replace("@Org.OData.Aggregation.V1.CustomAggregate#","");var i=t.split("@");if(i.length==2){if(i[1]=="Org.OData.Aggregation.V1.ContextDefiningProperties"){r[i[0]].contextDefiningProperties=e[a]}if(i[1]=="com.sap.vocabularies.Common.v1.Label"){r[i[0]].label=e[a]}}else if(i.length==1){r[i[0]]={name:i[0],propertyPath:i[0],label:"Custom Aggregate ("+t+")",sortable:true,sortOrder:"both",custom:true}}}}return r};r.getAllAggregatableProperties=function(e){var r={},t,a;if(e["@com.sap.vocabularies.Analytics.v1.AggregatedProperties"]){t=e["@com.sap.vocabularies.Analytics.v1.AggregatedProperties"];for(var i=0;i<t.length;i++){a=t[i];r[a.Value]={name:a.Value,propertyPath:a.AggregatableProperty.$PropertyPath,aggregationMethod:a.AggregationMethod,label:a["@com.sap.vocabularies.Common.v1.Label"]||"Aggregatable property ("+a.Value+")",sortable:true,sortOrder:"both",custom:false}}}return r};r.getAllDataPoints=function(e){var t={};for(var a in e){if(a.startsWith("@com.sap.vocabularies.UI.v1.DataPoint")){var i=a.replace("@com.sap.vocabularies.UI.v1.DataPoint#","");var n=e[a].Value.$Path;t[n]=t[n]||{};t[n][i]=r.createDataPointProperty(e[a])}}return t};r.createDataPointProperty=function(e){var t={};if(e.TargetValue){t.targetValue=e.TargetValue.$Path}if(e.ForeCastValue){t.foreCastValue=e.ForeCastValue.$Path}var a=null;if(e.Criticality){if(e.Criticality.$Path){a={Calculated:e.Criticality.$Path}}else{a={Static:e.Criticality.$EnumMember.replace("com.sap.vocabularies.UI.v1.CriticalityType/","")}}}else if(e.CriticalityCalculation){var i={};var n=r._buildThresholds(i,e.CriticalityCalculation);if(n){a={ConstantThresholds:i}}else{a={DynamicThresholds:i}}}if(a){t.criticality=a}return t};r._buildThresholds=function(e,r){var t=["AcceptanceRangeLowValue","AcceptanceRangeHighValue","ToleranceRangeLowValue","ToleranceRangeHighValue","DeviationRangeLowValue","DeviationRangeHighValue"];var a=true,i;e.ImprovementDirection=r.ImprovementDirection.$EnumMember.replace("com.sap.vocabularies.UI.v1.ImprovementDirectionType/","");var n={oneSupplied:false,usedMeasures:[]};var l={oneSupplied:false};for(var s=0;s<t.length;s++){i=t[s];n[i]=r[i]?r[i].$Path:undefined;n.oneSupplied=n.oneSupplied||n[i];if(!n.oneSupplied){l[i]=r[i];l.oneSupplied=l.oneSupplied||l[i]}else if(n[i]){n.usedMeasures.push(n[i])}}if(n.oneSupplied){a=false;for(var s=0;s<t.length;s++){if(n[t[s]]){e[t[s]]=n[t[s]]}}e.usedMeasures=n.usedMeasures}else{var o;e.AggregationLevels=[];if(l.oneSupplied){o={VisibleDimensions:null};for(var s=0;s<t.length;s++){if(l[t[s]]){o[t[s]]=l[t[s]]}}e.AggregationLevels.push(o)}if(r.ConstantThresholds&&r.ConstantThresholds.length>0){for(var s=0;s<r.ConstantThresholds.length;s++){var u=r.ConstantThresholds[s];var c=u.AggregationLevel?[]:null;if(u.AggregationLevel&&u.AggregationLevel.length>0){for(var f=0;f<u.AggregationLevel.length;f++){c.push(u.AggregationLevel[f].$PropertyPath)}}o={VisibleDimensions:c};for(var f=0;f<t.length;f++){var g=u[t[f]];if(g){o[t[f]]=g}}e.AggregationLevels.push(o)}}}return a};r.getSortRestrictionsInfo=function(e){var r,t,a={sortable:true,propertyInfo:{}};if(e){a.sortable=e.Sortable!=null?e.Sortable:true;if(e.NonSortableProperties){for(r=0;r<e.NonSortableProperties.length;r++){t=e.NonSortableProperties[r].$PropertyPath;a[t]={sortable:false}}}if(e.AscendingOnlyProperties){for(r=0;r<e.AscendingOnlyProperties;r++){t=e.AscendingOnlyProperties[r].$PropertyPath;a[t]={sortable:true,sortDirection:"asc"}}}if(e.DescendingOnlyProperties){for(r=0;r<e.DescendingOnlyProperties;r++){t=e.DescendingOnlyProperties[r].$PropertyPath;a[t]={sortable:true,sortDirection:"desc"}}}}return a};r.addSortInfoForProperty=function(e,r){var t=r[e.name];e.sortable=r.sortable&&t?t.sortable:true;if(e.sortable){e.sortDirection=t?t.sortDirection:"both"}};r.getFilterRestrictionsInfo=function(e){var r,t,a={filterable:true,propertyInfo:{}};if(e){a.filterable=e.Filterable!=null?e.Filterable:true;a.requiresFilter=e.RequiresFilter!=null?e.RequiresFilter:false;a.requiredProperties=[];if(a.RequiredProperties){for(r=0;r<e.NonFilterableProperties;r++){t=e.NonFilterableProperties[r].$PropertyPath;a.requiredProperties.push(t)}}if(e.NonFilterableProperties){for(r=0;r<e.NonFilterableProperties.length;r++){t=e.NonFilterableProperties[r].$PropertyPath;a[t]={filterable:false}}}if(e.FilterExpressionRestrictions){for(r=0;r<e.FilterExpressionRestrictions;r++){t=e.FilterExpressionRestrictions[r].$PropertyPath;a[t]={filterable:true,allowedExpressions:e.FilterExpressionRestrictions[r].AllowedExpressions}}}}return a};r.isMultiValueFilterExpression=function(e){var r=true;switch(e){case"SearchExpression":case"SingleRange":case"SingleValue":r=false;break;default:break}return r};r.addFilterInfoForProperty=function(e,r){var t=r[e.name];e.filterable=r.filterable&&t?t.filterable:true;if(e.filterable){e.allowedExpressions=t?t.allowedExpressions:null}};r.fetchCalendarTag=function(e,r){var t="@com.sap.vocabularies.Common.v1.";return Promise.all([e.requestObject(t+"IsCalendarYear",r),e.requestObject(t+"IsCalendarHalfyear",r),e.requestObject(t+"IsCalendarQuarter",r),e.requestObject(t+"IsCalendarMonth",r),e.requestObject(t+"IsCalendarWeek",r),e.requestObject(t+"IsDayOfCalendarMonth",r),e.requestObject(t+"IsDayOfCalendarYear",r),e.requestObject(t+"IsCalendarYearHalfyear",r),e.requestObject(t+"IsCalendarYearQuarter",r),e.requestObject(t+"IsCalendarYearMonth",r),e.requestObject(t+"IsCalendarYearWeek",r),e.requestObject(t+"IsCalendarDate",r)]).then(function(e){if(e[0]){return"year"}if(e[1]){return"halfYear"}if(e[2]){return"quarter"}if(e[3]){return"month"}if(e[4]){return"week"}if(e[5]){return"dayOfMonth"}if(e[6]){return"dayOfYear"}if(e[7]){return"yearHalfYear"}if(e[8]){return"yearQuarter"}if(e[9]){return"yearMonth"}if(e[10]){return"yearWeek"}if(e[11]){return"date"}return undefined})};r.fetchFiscalTag=function(e,r){var t="@com.sap.vocabularies.Common.v1.";return Promise.all([e.requestObject(t+"IsFiscalYear",r),e.requestObject(t+"IsFiscalPeriod",r),e.requestObject(t+"IsFiscalYearPeriod",r),e.requestObject(t+"IsFiscalQuarter",r),e.requestObject(t+"IsFiscalYearQuarter",r),e.requestObject(t+"IsFiscalWeek",r),e.requestObject(t+"IsFiscalYearWeek",r),e.requestObject(t+"IsDayOfFiscalYear",r),e.requestObject(t+"IsFiscalYearVariant",r)]).then(function(e){if(e[0]){return"year"}if(e[1]){return"period"}if(e[2]){return"yearPeriod"}if(e[3]){return"quarter"}if(e[4]){return"yearQuarter"}if(e[5]){return"week"}if(e[6]){return"yearWeek"}if(e[7]){return"dayOfYear"}if(e[8]){return"yearVariant"}return undefined})};r.fetchCriticality=function(e,r){var t="@com.sap.vocabularies.UI.v1";return e.requestObject(t+".ValueCriticality",r).then(function(e){var r,t;if(e){r={VeryPositive:[],Positive:[],Critical:[],VeryNegative:[],Negative:[],Neutral:[]};for(var a=0;a<e.length;a++){t=e[a];if(t.Criticality.$EnumMember.endsWith("VeryPositive")){r.VeryPositive.push(t.Value)}else if(t.Criticality.$EnumMember.endsWith("Positive")){r.Positive.push(t.Value)}else if(t.Criticality.$EnumMember.endsWith("Critical")){r.Critical.push(t.Value)}else if(t.Criticality.$EnumMember.endsWith("VeryNegative")){r.VeryNegative.push(t.Value)}else if(t.Criticality.$EnumMember.endsWith("Negative")){r.Negative.push(t.Value)}else{r.Neutral.push(t.Value)}}for(var i in r){if(r[i].length==0){delete r[i]}}}return r})};return r});