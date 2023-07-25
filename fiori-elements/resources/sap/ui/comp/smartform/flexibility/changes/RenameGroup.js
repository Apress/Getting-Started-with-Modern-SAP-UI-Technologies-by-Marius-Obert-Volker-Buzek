/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseRename","sap/base/Log"],function(e,t){"use strict";var r="label";var n="groupLabel";var a="XFLD";var i=e.createRenameChangeHandler({propertyName:r,changePropertyName:n,translationTextType:a});i.applyChange=function(e,t,a){var i=e.getText(n);if(typeof i==="string"){return this.setLabelOrTitleOnControl(t,i,a.modifier,r).then(function(t){e.setRevertData(t)})}return Promise.resolve()};i.revertChange=function(e,n,a){var i=e.getRevertData();if(i||i===""){return this.setLabelOrTitleOnControl(n,i,a.modifier,r).then(e.resetRevertData())}t.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.");return Promise.resolve()};i.setLabelOrTitleOnControl=function(e,t,r,n){return Promise.all([r.getProperty(e,n),r.getAggregation(e,"title")]).then(function(t){var a=t[0];var i=t[1];if(!a&&i){if(typeof i==="string"){n="title"}else{n="text";e=i}}return r.getPropertyBindingOrProperty(e,n)}).then(function(a){r.setPropertyBindingOrProperty(e,n,t);return a})};return i},true);