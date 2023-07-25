/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/library","sap/ui/comp/navpopover/flexibility/changes/AddLink","sap/ui/comp/navpopover/flexibility/changes/RemoveLink","sap/base/Log"],function(t,e,n,a){"use strict";var i=t.navpopover.ChangeHandlerType;return{createAndSaveChangesForControl:function(t,e,n){if(!t.length&&!e.length){return Promise.resolve()}return this._createChangesForControl(e.concat(t),n).then(function(t){return this._saveChangesForControl(n,t)}.bind(this),function(t){return Promise.reject(t)})},_getControlPersonalizationWriteAPI:function(){return sap.ui.getCore().loadLibrary("sap.ui.fl",{async:true}).then(function(){return new Promise(function(t){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(e){t(e)})})})},discardChangesForControl:function(t){return this._getControlPersonalizationWriteAPI().then(function(e){return e.reset({selectors:[t]})})},_saveChangesForControl:function(t,e){return this._getControlPersonalizationWriteAPI().then(function(n){return n.save({selector:t,changes:e})})},_createChangesForControl:function(t,e){if(!t.length){return[]}var n=[];t.forEach(function(t){var a={selectorElement:e,changeSpecificData:{changeType:t.visible?i.addLink:i.removeLink,content:t,isUserDependent:true}};n.push(a)});return this._getControlPersonalizationWriteAPI().then(function(t){return t.add({changes:n})})},activateApplyChangeStatistics:function(){var t=this;this.aStatistics=[];var a=function(e,n){if(t.aStatistics.findIndex(function(t){return t.stableId===n.getId()&&t.changeId===e.getId()})<0){var a=n.getAvailableActions().find(function(t){return t.getKey()===e.getContent().key});t.aStatistics.push({stableId:n.getId(),changeId:e.getId(),layer:e.getLayer(),key:e.getContent().key,text:a?a.getText():"",changeType:e.getChangeType()})}};var i=function(e){t.aStatistics=t.aStatistics.filter(function(t){return t.layer!==e})};var r=e.applyChange.bind(e);e.applyChange=function(t,e,n){a(t,e);r(t,e,n)};var o=n.applyChange.bind(n);n.applyChange=function(t,e,n){a(t,e);o(t,e,n)};var s=e.discardChangesOfLayer.bind(e);e.discardChangesOfLayer=function(t,e){i(t);s(t,e)};var c=n.discardChangesOfLayer.bind(n);n.discardChangesOfLayer=function(t,e){i(t);c(t,e)}},_formatStatistic:function(t){var e=t.layer;switch(t.layer){case"VENDOR":e=""+e;break;case"CUSTOMER":e="        "+e;break;case"USER":e="                "+e;break;default:e=""+e}var n;switch(t.changeType){case i.addLink:n="On";break;case i.removeLink:n="Off";break;default:n=""}return{formattedLayer:e,formattedValue:n}},printStatisticAll:function(){if(!this.aStatistics){a.info("Please activate with sap.ui.comp.navpopover.FlexConnector.activateApplyChangeStatistics()");return}var t=this;a.info("idx - VENDOR ------------ CUSTOMER ----------- USER --------------------------------------");this.aStatistics.forEach(function(e,n){var i=t._formatStatistic(e);a.info(n+" "+e.stableId+" "+i.formattedLayer+" '"+e.text+"' "+i.formattedValue)})}}},true);