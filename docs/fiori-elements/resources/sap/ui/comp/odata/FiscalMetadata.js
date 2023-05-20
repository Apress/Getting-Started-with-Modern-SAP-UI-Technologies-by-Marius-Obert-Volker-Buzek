/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define([],function(){"use strict";var a={isFiscalValue:function(a){for(var o=0;o<this.aAnnotations.length;o++){if(this.isTermDefaultTrue(a[this.aAnnotations[o]])){return true}}return false},isFiscalYear:function(a){return this.isTermDefaultTrue(a["com.sap.vocabularies.Common.v1.IsFiscalYear"])},isFiscalYearPeriod:function(a){return this.isTermDefaultTrue(a["com.sap.vocabularies.Common.v1.IsFiscalYearPeriod"])},getFiscalAnotationType:function(a){for(var o=0;o<this.aAnnotations.length;o++){var s=a[this.aAnnotations[o]];if(s&&s.Bool!=="false"){return this.aAnnotations[o]}}return null},isTermDefaultTrue:function(a){if(a){return a.Bool?a.Bool!=="false":true}return false},updateViewMetadata:function(a){var o=this.getFiscalAnotationType(a);if(o==="com.sap.vocabularies.Common.v1.IsFiscalYearPeriod"||o==="com.sap.vocabularies.Common.v1.IsFiscalYearQuarter"||o==="com.sap.vocabularies.Common.v1.IsFiscalYearWeek"){a.maxLength=(parseInt(a.maxLength)+1).toString()}return a},aAnnotations:["com.sap.vocabularies.Common.v1.IsFiscalYear","com.sap.vocabularies.Common.v1.IsFiscalPeriod","com.sap.vocabularies.Common.v1.IsFiscalYearPeriod","com.sap.vocabularies.Common.v1.IsFiscalQuarter","com.sap.vocabularies.Common.v1.IsFiscalYearQuarter","com.sap.vocabularies.Common.v1.IsFiscalWeek","com.sap.vocabularies.Common.v1.IsFiscalYearWeek","com.sap.vocabularies.Common.v1.IsDayOfFiscalYear"]};return a});