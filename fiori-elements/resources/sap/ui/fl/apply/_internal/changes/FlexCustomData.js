/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/base/Log","sap/ui/core/CustomData"],function(a,t){"use strict";var e={};e.appliedChangesCustomDataKey="sap.ui.fl.appliedChanges";e.failedChangesCustomDataKeyJs="sap.ui.fl.failedChanges.js";e.failedChangesCustomDataKeyXml="sap.ui.fl.failedChanges.xml";e.notApplicableChangesCustomDataKey="sap.ui.fl.notApplicableChanges";function u(a,t,e,u){var s=u.modifier.getCustomDataInfo(a,t);if(!s.customData){return u.modifier.createAndAddCustomData(a,t,e,u.appComponent)}return Promise.resolve(u.modifier.setProperty(s.customData,"value",e))}function s(a,t){var e=t.getRevertData();if(a&&e!==undefined){return JSON.stringify(e)}return"true"}e.getAppliedCustomDataValue=function(a,t,u){var s=u.getCustomDataInfo(a,e._getCustomDataKey(t,e.appliedChangesCustomDataKey));return s.customDataValue};e.getParsedRevertDataFromCustomData=function(a,u,s){var o=e.getAppliedCustomDataValue(a,u,s);try{return o&&JSON.parse(o)}catch(a){t.error("Could not parse revert data from custom data",o);return undefined}};e.hasChangeApplyFinishedCustomData=function(a,t,u){var s=u.getCustomDataInfo(a,e._getCustomDataKey(t,e.appliedChangesCustomDataKey));if(s.customData){return true}var o=u.getCustomDataInfo(a,e._getCustomDataKey(t,e.failedChangesCustomDataKeyJs));if(o.customData){return true}var r=u.getCustomDataInfo(a,e._getCustomDataKey(t,e.notApplicableChangesCustomDataKey));if(r.customData){return true}return false};e.addAppliedCustomData=function(a,t,o,r){var n=s(r,t);var i=e._getCustomDataKey(t,e.appliedChangesCustomDataKey);return u(a,i,n,o)};e.addFailedCustomData=function(a,t,s,o){var r=e._getCustomDataKey(t,o);return u(a,r,"true",s)};e.destroyAppliedCustomData=function(a,t,u){var s=e._getCustomDataKey(t,e.appliedChangesCustomDataKey);var o=u.getCustomDataInfo(a,s);if(o.customData){u.destroy(o.customData)}};e.getCustomDataIdentifier=function(a,t,u){if(a){return e.appliedChangesCustomDataKey}if(!t){return e.notApplicableChangesCustomDataKey}if(u){return e.failedChangesCustomDataKeyXml}return e.failedChangesCustomDataKeyJs};e._getCustomDataKey=function(a,t){return t+"."+a.getId()};return e},true);