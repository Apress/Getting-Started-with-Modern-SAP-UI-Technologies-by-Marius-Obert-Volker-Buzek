/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/vk/uuidv4"],function(e,t){"use strict";var n=e.extend("sap.ui.vk.RedlineElementComment",{metadata:{library:"sap.ui.vk",properties:{text:{type:"string",defaultValue:""},createdByUser:{type:"any",defaultValue:""},createTimestamp:{type:"int",defaultValue:null}}},constructor:function(n,s){e.apply(this,arguments);if(typeof n==="object"){s=n;n=undefined}this._elementId=s&&s.elementId?s.elementId:t()}});n.prototype.getElementId=function(){return this._elementId};n.prototype.getContent=function(){if(!this._elements){this._elements=new Set}var e=Array.from(this._elements);return e};n.prototype.addContent=function(e){if(!this._elements){this._elements=new Set}if(e instanceof sap.ui.vk.RedlineElement){var t=e.getElementId();this._elements.add(t)}else{this._elements.add(e)}return this};n.prototype.removeContent=function(e){if(this._elements){var t;if(e instanceof sap.ui.vk.RedlineElement){t=e.getElementId()}else{t=e}this._elements.delete(t)}return this};n.prototype.addMeasurement=function(e){if(!this._measurements){this._measurements=new Set}this._measurements.add(e);return this};n.prototype.getMeasurements=function(){if(!this._measurements){this._measurements=new Set}var e=Array.from(this._measurements);return e};n.prototype.removeMeasurement=function(e){if(this._measurements){this._measurements.delete(e)}return this};n.prototype.clearContent=function(){if(this._elements){this._elements.clear()}return this};n.prototype.exportJSON=function(){var e={elementId:this.getElementId(),createdByUser:this.getCreatedByUser(),createTimestamp:this.getCreateTimestamp()?this.getCreateTimestamp():Date.now(),text:this.getText(),content:this.getContent(),measurements:this.getMeasurements()};return e};n.prototype.importJSON=function(e){if(e.hasOwnProperty("elementId")){this._elementId=e.elementId}if(e.hasOwnProperty("createTimestamp")){this.setCreateTimestamp(e.createTimestamp)}if(e.hasOwnProperty("text")){this.setText(e.text)}if(e.hasOwnProperty("content")){var t=e.content;if(t){for(var n=0;n<t.length;n++){this.addContent(t[n])}}}if(e.hasOwnProperty("createdByUser")){this.setCreatedByUser(e.createdByUser);return e.createdByUser}if(e.hasOwnProperty("measurements")){var s=e.measurements;if(s){for(var r=0;r<s.length;r++){this.addMeasurement(s[r])}}}};return n});