/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./Input","./NumericInputRenderer","./library","sap/ui/core/format/NumberFormat","sap/ui/Device","sap/ui/events/KeyCodes","sap/ui/dom/jquery/cursorPos"],function(e,t,r,i,n,o,s){"use strict";var u=i.InputType;var a=t.extend("sap.m.NumericInput",{metadata:{library:"sap.m"},renderer:r});a.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.call(this);this.setWidth("100%");this._deregisterEvents()};a.prototype.setValue=function(e){t.prototype.setValue.apply(this,arguments);if(this.getDomRef()){this.getDomRef("inner").setAttribute("aria-valuenow",e)}return this};a.prototype.setType=function(e){return t.prototype.setType.call(this,u.Number)};a.prototype.onkeydown=function(e){var r,i,n;t.prototype.onkeydown.apply(this,arguments);if(!o.system.desktop||e.ctrlKey||e.metaKey||e.originalEvent.key&&e.originalEvent.key.length!==1){return}i=this._$input.cursorPos();if(e.which===s.NUMPAD_COMMA){e.preventDefault();r=this.getValue().substring(0,i)+this._getNumberFormat().oFormatOptions.decimalSeparator+this.getValue().substring(i);n=this._getNumberFormat().parse(r);if(n||n===0){this.setDOMValue(r)}return}r=this.getValue().substring(0,i)+e.originalEvent.key+this.getValue().substring(i);n=this._getNumberFormat().parse(r);if(!m(e.which)||!n&&n!==0){e.preventDefault()}};var p=[[s.A,s.Z],[s.OPEN_BRACKET,s.OPEN_BRACKET],[s.PIPE,s.SEMICOLON],[s.GREAT_ACCENT,s.BACKSLASH]];function m(e){return Object.values(s).includes(e)&&!p.some(function(t){return e>=t[0]&&e<=t[1]})}a.prototype._getNumberFormat=function(){if(!this._oNumberFormat){this._oNumberFormat=n.getFloatInstance()}return this._oNumberFormat};return a});