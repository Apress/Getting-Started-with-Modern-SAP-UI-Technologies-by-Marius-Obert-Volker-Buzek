/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/Utils"],function(e,r,n,t){"use strict";var o={};function i(e){if(!e.isApplyProcessFinished()&&e.hasApplyProcessStarted()){return e.addPromiseForApplyProcessing().then(function(r){if(r&&r.error){e.markRevertFinished(r.error);throw Error(r.error)}})}return Promise.resolve()}function a(e,n,t,i){return o.revertChangeOnControl(e,n,t).then(function(t){r.destroyAppliedCustomData(t||n,e,i.modifier);if(t){i.flexController._oChangePersistence._deleteChangeInMap(e)}})}o.revertChangeOnControl=function(r,t,o){var a=n.getControlIfTemplateAffected(r,t,o);var l;return n.getChangeHandler(r,a,o).then(function(e){l=e}).then(i.bind(null,r)).then(function(){if(r.isSuccessfullyApplied()){r.startReverting();return l.revertChange(r,a.control,o)}throw Error("Change was never applied")}).then(function(){a.control=o.modifier.bySelector(r.getSelector(),o.appComponent,o.view);if(a.bTemplateAffected){return o.modifier.updateAggregation(a.control,r.getContent().boundAggregation)}return undefined}).then(function(){r.markRevertFinished();return a.control}).catch(function(n){var t="Change could not be reverted: "+n.message;e.error(t);r.markRevertFinished(t);return false})};o.revertMultipleChanges=function(r,n){var o=[];r.forEach(function(r){r.setQueuedForRevert();o.push(function(){var o=r.getSelector&&r.getSelector();var i=n.modifier.bySelector(o,n.appComponent);if(!i){e.warning("A flexibility change tries to revert changes on a nonexistent control with id "+o.id);return new t.FakePromise}var l={modifier:n.modifier,appComponent:n.appComponent,view:t.getViewForControl(i)};return a(r,i,l,n)})});return t.execPromiseQueueSequentially(o)};return o});