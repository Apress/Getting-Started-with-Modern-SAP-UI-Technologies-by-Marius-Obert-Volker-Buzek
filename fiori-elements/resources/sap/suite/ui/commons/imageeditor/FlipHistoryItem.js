sap.ui.define(["./HistoryItem","sap/base/assert"],function(t,o){"use strict";var e=t.extend("sap.suite.ui.commons.imageeditor.FlipHistoryItem",{constructor:function(e){t.apply(this,arguments);e=e||{};o(typeof e.vertical==="boolean","Vertical must be a boolean.");o(typeof e.horizontal==="boolean","Horizontal value must be a bolean.");this._bVertical=e.vertical;this._bHorizontal=e.horizontal}});e.prototype.getVertical=function(){return this._bVertical};e.prototype.getHorizontal=function(){return this._bHorizontal};e.prototype.compare=function(t){return false};return e});