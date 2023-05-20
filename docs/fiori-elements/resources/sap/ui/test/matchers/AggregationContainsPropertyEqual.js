/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/test/matchers/Matcher","sap/base/strings/capitalize"],function(t,e,r){"use strict";return e.extend("sap.ui.test.matchers.AggregationContainsPropertyEqual",{metadata:{publicMethods:["isMatching"],properties:{aggregationName:{type:"string"},propertyName:{type:"string"},propertyValue:{type:"any"}}},constructor:function(r){if(r&&r.propertyValue){r.propertyValue=t.escapeSettingsValue(r.propertyValue)}e.prototype.constructor.call(this,r)},isMatching:function(t){var e=this.getAggregationName(),a=this.getPropertyName(),o=this.getPropertyValue(),i=t["get"+r(e,0)];if(!i){this._oLogger.error("Control '"+t+"' does not have an aggregation called '"+e+"'");this._oLogger.trace("Control '"+t+"' has aggregations: '"+Object.keys(t.mAggregations)+"'");return false}var n=i.call(t);var s=Array.isArray(n)?n:[n];var g=s.some(function(i){var n=i["get"+r(a,0)];if(!n){this._oLogger.trace("Control '"+t+"' aggregation '"+e+"': controls do not have a property '"+a+"'");return false}return n.call(i)===o}.bind(this));if(!g){this._oLogger.debug("Control '"+t+"' has no property '"+a+"' with the value '"+o+"' in the aggregation '"+e+"'")}return g}})});