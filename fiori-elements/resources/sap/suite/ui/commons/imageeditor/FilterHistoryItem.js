sap.ui.define(["./HistoryItem","sap/base/assert"],function(t,e){"use strict";var i=t.extend("sap.suite.ui.commons.imageeditor.FilterHistoryItem",{constructor:function(i){t.apply(this,arguments);i=i||{};e(typeof i.type==="string","Filter type must be a string.");e(typeof i.value==="number","Filter value must be a number.");e(typeof i.unit==="string","Filter unit must be a string.");this._sType=i.type;this._iValue=i.value;this._sUnit=i.unit}});i.prototype.getType=function(){return this._sType};i.prototype.getValue=function(){return this._iValue};i.prototype.getUnit=function(){return this._sUnit};i.prototype.compare=function(t){return false};return i});