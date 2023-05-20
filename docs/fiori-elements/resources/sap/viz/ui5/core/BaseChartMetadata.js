/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/ElementMetadata"],function(t){"use strict";var e=function(e,r){r=r||{};r.renderer=r.renderer||"sap.viz.ui5.core.BaseChartRenderer";this.sVizChartType=r.metadata&&r.metadata.vizChartType||undefined;t.call(this,e,r)};e.prototype=Object.create(t.prototype);e.prototype.constructor=e;e.prototype.getVIZChartType=function(){return this.sVizChartType};var r=t.prototype.metaFactoryAggregation;function o(t,e,o){r.call(this,t,e,o)}o.prototype=Object.create(r.prototype);o.prototype.constructor=o;o.prototype.generate=function(t){var e=this.name;t(this._sGetter,function(){return this._getOrCreate(e)});r.prototype.generate.call(this,t)};e.prototype.metaFactoryAggregation=o;var a=t.prototype.metaFactoryEvent;function n(t,e,r){a.call(this,t,e,r)}n.prototype=Object.create(a.prototype);n.prototype.constructor=n;n.prototype.generate=function(t){var e=this.name;t(this._sMutator,function(t,r,o){return this._attachVIZEvent(e,t,r,o)});t(this._sDetachMutator,function(t,r,o){return this._detachVIZEvent(e,r,o)});a.prototype.generate.call(this,t)};e.prototype.metaFactoryEvent=n;return e});