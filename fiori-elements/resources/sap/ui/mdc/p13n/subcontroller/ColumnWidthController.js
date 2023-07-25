/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SelectionController","sap/m/p13n/FlexUtil","sap/m/p13n/modules/xConfigAPI","sap/base/util/merge"],function(t,e,n,a){"use strict";var r=t.extend("sap.ui.mdc.p13n.subcontroller.ColumnWidthController",{constructor:function(){t.apply(this,arguments);this._bXConfigEnabled=true;this._bResetEnabled=true}});r.prototype.sanityCheck=function(t){var e=[];if(t&&t.hasOwnProperty("aggregations")&&t.aggregations.hasOwnProperty("columns")){Object.keys(t.aggregations.columns).forEach(function(n){var a={name:n,width:t.aggregations.columns[n].width};e.push(a)})}return e};r.prototype.getCurrentState=function(){return this.getAdaptationControl().getCurrentState().xConfig};r.prototype.getStateKey=function(){return"supplementaryConfig"};r.prototype.changesToState=function(t){var e;var r=t.length&&t[0].selectorElement;t.forEach(function(t){var o=a({},t.changeSpecificData.content);var i={key:o.name,controlMeta:{aggregation:"columns"},property:"width",value:o.value};e=n.createAggregationConfig(r,i,e)});return e||{}};r.prototype.getDelta=function(t){t.deltaAttribute="width";t.operation="setColumnWidth";t.changedState=t.changedState instanceof Array?t.changedState:this.sanityCheck(t.changedState);t.existingState=this.sanityCheck(t.existingState);return e.getPropertySetterChanges(t)};return r});