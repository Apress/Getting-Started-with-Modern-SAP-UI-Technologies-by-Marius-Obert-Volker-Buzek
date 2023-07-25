/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/AggregationBaseDelegate","sap/ui/mdc/enum/FilterBarValidationStatus"],function(e,t){"use strict";var r=Object.assign({},e);r.addItem=function(t,r,i){return e.addItem(t,r,i)};r.removeItem=function(t,r,i){return e.removeItem(t,r,i)};r.addCondition=function(e,t,r){return Promise.resolve()};r.removeCondition=function(e,t,r){return Promise.resolve()};r.fetchProperties=function(t){return e.fetchProperties(t)};r.clearFilters=function(e){return Promise.resolve()};r.determineValidationState=function(e){return e.checkFilters()};r.visualizeValidationState=function(e,r){var i;if(r.status===t.NoError){return}if(r.status===t.RequiredHasNoValue){i=e.getText("filterbar.REQUIRED_CONDITION_MISSING")}else if(r.status===t.FieldInErrorState){i=e.getText("filterbar.VALIDATION_ERROR")}if(e.getShowMessages()&&!e._isLiveMode()){sap.ui.require(["sap/m/MessageBox","sap/base/Log"],function(t,r){try{if(e._bIsBeingDestroyed){return}t.error(i,{styleClass:this.$()&&this.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":"",onClose:e.setFocusOnFirstErroneousField.bind(e)})}catch(e){r.error(e.message)}})}};return r});