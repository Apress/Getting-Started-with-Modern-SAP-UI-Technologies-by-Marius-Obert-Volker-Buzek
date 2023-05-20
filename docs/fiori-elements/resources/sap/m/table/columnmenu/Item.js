/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/table/columnmenu/ItemBase"],function(t){"use strict";var e=t.extend("sap.m.table.columnmenu.Item",{metadata:{library:"sap.m",properties:{label:{type:"string"},icon:{type:"sap.ui.core.URI"},showResetButton:{type:"boolean",defaultValue:true},resetButtonEnabled:{type:"boolean",defaultValue:true},showConfirmButton:{type:"boolean",defaultValue:true},showCancelButton:{type:"boolean",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:false}},events:{reset:{},confirm:{},cancel:{}}}});e.prototype.setShowResetButton=function(t){this.setProperty("showResetButton",t);this.changeButtonSettings({reset:{visible:t}});return this};e.prototype.setResetButtonEnabled=function(t){this.setProperty("resetButtonEnabled",t);this.changeButtonSettings({reset:{enabled:t}});return this};e.prototype.setShowConfirmButton=function(t){this.setProperty("showConfirmButton",t);this.changeButtonSettings({confirm:{visible:t}});return this};e.prototype.setShowCancelButton=function(t){this.setProperty("showCancelButton",t);this.changeButtonSettings({cancel:{visible:t}});return this};return e});