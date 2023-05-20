/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/core/format/DateFormat"],function(t,e){"use strict";var r=t.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.dateEditor.DateEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.dateEditor.DateEditor",metadata:{library:"sap.ui.integration"},renderer:t.getMetadata().getRenderer().render});r.prototype.getDefaultValidators=function(){var e=this.getConfig();return Object.assign({},t.prototype.getDefaultValidators.call(this),{isValidBinding:{type:"isValidBinding",isEnabled:e.allowBindings},notABinding:{type:"notABinding",isEnabled:!e.allowBindings},isDate:{type:"isDate",config:{formatterInstance:function(){var t=(this.getConfig()||{}).pattern;var e=t?{pattern:t}:undefined;return this.getFormatterInstance(e)}.bind(this)}}})};r.prototype.formatValue=function(t){var e=this._parse(t);return this._format(e,true)||t};r.configMetadata=Object.assign({},t.configMetadata,{allowBindings:{defaultValue:true},typeLabel:{defaultValue:"BASE_EDITOR.TYPES.DATE"},pattern:{defaultValue:"YYYY-MM-dd'T'HH:mm:ss.SSS'Z'"},utc:{defaultValue:false}});r.prototype.onFragmentReady=function(){var t=this.getContent();t.onkeypress=function(t){if(!t.charCode||t.metaKey||t.ctrlKey){return}}};r.prototype._onChange=function(t){var e=t.getParameter("newValue");var r=this._parse(e,true);var a=this._format(r)||e;this.setValue(a)};r.prototype._parse=function(t,e){if(t==null||t===""){return t}var r=(this.getConfig()||{}).utc!==false;if(e){return this.getFormatterInstance().parse(t,r)}var a=(this.getConfig()||{}).pattern;if(a){var n=this.getFormatterInstance({pattern:a});return n.parse(t,r)}return undefined};r.prototype._format=function(t,e){if(!this._isValidDate(t)){return undefined}var r=(this.getConfig()||{}).utc!==false;if(e){return this.getFormatterInstance().format(t,r)}var a=(this.getConfig()||{}).pattern;if(a){var n=this.getFormatterInstance({pattern:a});return n.format(t,r)}return undefined};r.prototype._isValidDate=function(t){return t&&!isNaN(t.getTime())};r.prototype.getFormatterInstance=function(t){return e.getDateInstance(t||{pattern:"YYYY-MM-dd"})};return r});