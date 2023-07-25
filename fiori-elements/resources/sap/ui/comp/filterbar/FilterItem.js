/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/m/Label","sap/ui/core/Element","sap/ui/comp/util/IdentifierUtil"],function(t,e,r){"use strict";var o=e.extend("sap.ui.comp.filterbar.FilterItem",{metadata:{library:"sap.ui.comp",properties:{label:{type:"string",group:"Misc",defaultValue:null},name:{type:"string",group:"Misc",defaultValue:null},mandatory:{type:"boolean",group:"Misc",defaultValue:false},visible:{type:"boolean",group:"Misc",defaultValue:true},labelTooltip:{type:"string",group:"Misc",defaultValue:null},controlTooltip:{type:"string",group:"Misc",defaultValue:null},partOfCurrentVariant:{type:"boolean",group:"Misc",defaultValue:true},visibleInFilterBar:{type:"boolean",group:"Misc",defaultValue:true},hiddenFilter:{type:"boolean",group:"Misc",defaultValue:false},entitySetName:{type:"string",group:"Misc",defaultValue:null},entityTypeName:{type:"string",group:"Misc",defaultValue:null}},aggregations:{control:{type:"sap.ui.core.Control",multiple:false}},events:{change:{parameters:{propertyName:{type:"string"}}}}}});o.prototype.init=function(){this._oLabel=null;this._bIsParameter=false;this._sControlId=null};o.prototype.setControl=function(t){if(t&&t.getId){this._sControlId=t.getId()}this.setAggregation("control",t);return this};o.prototype.getControl=function(){var t=this.getAggregation("control");if(t){return t}if(this._sControlId===null){return null}return sap.ui.getCore().byId(this._sControlId)};o.prototype._getControl=function(){return this.getControl.apply(this,arguments)};o.prototype._isParameter=function(){return this._bIsParameter};o.prototype.setVisible=function(t){this.setProperty("visible",t);this.fireChange({propertyName:"visible"});return this};o.prototype.setVisibleInFilterBar=function(t){this.setProperty("visibleInFilterBar",t);this.fireChange({propertyName:"visibleInFilterBar"});return this};o.prototype.setPartOfCurrentVariant=function(t){if(t){this.fireChange({propertyName:"partOfCurrentVariant"})}return this};o.prototype.getPartOfCurrentVariant=function(){return true};o.prototype._getGroupName=function(){var t="";if(this.getGroupName){t=r.replace(this.getGroupName())}return t};o.prototype._getName=function(){var t=r.replace(this.getName());var e=this._getGroupName();if(e){t=e+"-"+t}return t};o.prototype._createLabelControl=function(e){var r=this.getLabel();var o="filterItem-"+this._getName();if(e){o=e+"-"+o}var i=new t({id:o,required:this.getMandatory(),textAlign:"Begin"});i.setText(r);i.setTooltip(this.getLabelTooltip());return i};o.prototype.setMandatory=function(t){this.setProperty("mandatory",t);if(this._oLabel){this._oLabel.setRequired(t)}this.fireChange({propertyName:"mandatory"});return this};o.prototype.setLabel=function(t){this.setProperty("label",t);if(this._oLabel){this._oLabel.setText(t)}if(!this.getLabelTooltip()){this.setLabelTooltip(t)}this.fireChange({propertyName:"label"});return this};o.prototype.setLabelTooltip=function(t){this.setProperty("labelTooltip",t);if(this._oLabel){this._oLabel.setTooltip(t)}this.fireChange({propertyName:"labelTooltip"});return this};o.prototype.setControlTooltip=function(t){this.setProperty("controlTooltip",t);this.fireChange({propertyName:"controlTooltip"});return this};o.prototype.getLabelControl=function(t){if(!this._oLabel){this._oLabel=this._createLabelControl(t)}return this._oLabel};o.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);if(this._oLabel&&!this._oLabel.bIsDestroyed){this._oLabel.destroy()}if(this._getControl()&&!this._getControl().bIsDestroyed){this._getControl().destroy()}var t=this.getId()+"__filterGroupItem",r=sap.ui.getCore().byId(t);if(r){e.prototype.destroy.apply(r,arguments);if(r._oLabel&&!r._oLabel.bIsDestroyed){r._oLabel.destroy()}r._oLabel=null}this._oLabel=null;this._sQuickinfo=null};return o});