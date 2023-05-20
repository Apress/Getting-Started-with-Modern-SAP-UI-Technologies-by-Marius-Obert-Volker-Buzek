/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Element","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/apply/_internal/flexState/changes/DependencyHandler","sap/ui/fl/Utils"],function(e,n,r,t,o,a,i){"use strict";var s=new i.FakePromise;function l(e,n){var r=e.getSelector&&e.getSelector();if(!r||!r.id&&!r.name){return Promise.reject(Error("No selector in change found or no selector ID."))}function t(e){if(i.indexOfObject(n.failedSelectors,e)>-1){throw Error("A change depending on that control already failed, so the current change is skipped")}}return n.modifier.bySelectorTypeIndependent(r,n.appComponent,n.view).then(function(o){if(!o){throw Error("A flexibility change tries to change a nonexistent control.")}t(r);var a=e.getDependentControlSelectorList();a.forEach(function(e){var r=n.modifier.bySelector(e,n.appComponent,n.view);if(!r){throw new Error("A dependent selector control of the flexibility change is not available.")}t(e)});return o})}function c(e){return e.modifier.targets==="xmlTree"}function f(e,n,r,a,i){var s=o.getControlIfTemplateAffected(n,e,i);var l=i.modifier;var f=!!t.getAppliedCustomDataValue(s.control,n,l);var u=t.hasChangeApplyFinishedCustomData(s.control,n,l);var d=n.isApplyProcessFinished();var g=i.appComponent;if(d&&!u){if(!c(i)){var p=o.checkIfDependencyIsStillValid.bind(null,g,l,r);a._oChangePersistence.copyDependenciesFromInitialChangesMap(n,p,g)}n.setInitialApplyState()}else if(!d&&u){if(f){n.setRevertData(t.getParsedRevertDataFromCustomData(s.control,n,l));n.markSuccessful()}else{n.markFailed()}}else if(d&&u){n.markSuccessful()}}function u(e,n){var r;if(c(n)&&e.getJsOnly()){r="Change cannot be applied in XML. Retrying in JS."}if(r){e.setInitialApplyState();throw Error(r)}}function d(e,r,o,a){return Promise.resolve().then(function(){if(o instanceof n){r.control=o}if(r.control){return a.modifier.updateAggregation(r.originalControl,e.getContent().boundAggregation)}return undefined}).then(function(){return t.addAppliedCustomData(r.control,e,a,c(a))}).then(function(){var n={success:true};e.markSuccessful(n);return n})}function g(e,n,r,o){var a=c(o);var s={success:false,error:e};var l=n.getId();var f="Change ''{0}'' could not be applied.";var u=e instanceof Error;var d=t.getCustomDataIdentifier(false,u,a);switch(d){case t.notApplicableChangesCustomDataKey:i.formatAndLogMessage("info",[f,e.message],[l]);break;case t.failedChangesCustomDataKeyXml:i.formatAndLogMessage("warning",[f,"Merge error detected while processing the XML tree."],[l],e.stack);break;case t.failedChangesCustomDataKeyJs:i.formatAndLogMessage("error",[f,"Merge error detected while processing the JS control tree."],[l],e.stack);break}return t.addFailedCustomData(r.control,n,o,d).then(function(){if(a){n.setInitialApplyState()}else{n.markFailed(s)}return s})}function p(n,r){var t=r.getChangeType();var o=r.getSelector().id;var a=r.getNamespace()+r.getId()+"."+r.getFileType();var i="A flexibility change could not be applied.";i+="\nThe displayed UI might not be displayed as intedend.";if(n.message){i+="\n   occurred error message: '"+n.message+"'"}i+="\n   type of change: '"+t+"'";i+="\n   LRep location of the change: "+a;i+="\n   id of targeted control: '"+o+"'.";e.warning(i,undefined,"sap.ui.fl.apply._internal.changes.Applier")}function h(e,n,t){var o={appComponent:t,modifier:r};var a=r.bySelector(e.originalSelectorToBeAdjusted,t);var i=n.getBindingInfo(e.getContent().boundAggregation).template;if(a.getParent()){var s=[];var l=a;do{s.push({aggregation:l.sParentAggregationName,index:l.getParent().getAggregation(l.sParentAggregationName).indexOf(l)});l=l.getParent()}while(l.getParent());s.reverse();s.forEach(function(e){i=i.getAggregation(e.aggregation)[e.index]})}e.addDependentControl(i,"originalSelector",o)}function m(e,n,r){var t=e.findIndex(function(e){return e.handler===n});if(t<0){t=e.length;e.push({handler:n,controls:[]})}if(!e[t].controls.includes(r)){e[t].controls.push(r)}}var v={addPreConditionForInitialChangeApplying:function(e){s=s.then(function(){return e})},applyChangeOnControl:function(e,n,r){var t=o.getControlIfTemplateAffected(e,n,r);var a=r.changeHandler?Promise.resolve(r.changeHandler):o.getChangeHandler(e,t,r);return a.then(function(n){u(e,r);return n}).then(function(n){if(e.hasApplyProcessStarted()){return e.addPromiseForApplyProcessing().then(function(n){e.markSuccessful();return n})}else if(!e.isApplyProcessFinished()){return(new i.FakePromise).then(function(){e.startApplying();return n.applyChange(e,t.control,r)}).then(function(n){return d(e,t,n,r)}).catch(function(n){return g(n,e,t,r)})}var o={success:true};e.markSuccessful(o);return o}).catch(function(e){return{success:false,error:e}})},applyAllChangesForControl:function(e,n,t,o){var l=e();var c=o.getId();var u=l.mChanges[c]||[];var d={modifier:r,appComponent:n,view:i.getViewForControl(o)};u.forEach(function(e){f(o,e,l,t,d);if(!e.isApplyProcessFinished()&&!e._ignoreOnce){e.setQueuedForApply()}});s=s.then(function(e,r){var t=[];var o=e.getId();var s=l.mChanges[o]||[];var c;if(l.mControlsWithDependencies[o]){a.removeControlsDependencies(l,o);c=true}s.forEach(function(i){if(i.originalSelectorToBeAdjusted){h(i,e,n);delete i.originalSelectorToBeAdjusted}if(i._ignoreOnce){delete i._ignoreOnce}else if(i.isApplyProcessFinished()){a.resolveDependenciesForChange(l,i.getId(),o)}else if(!l.mDependencies[i.getId()]){t.push(function(){return v.applyChangeOnControl(i,e,r).then(function(){a.resolveDependenciesForChange(l,i.getId(),o)})})}else{var s=v.applyChangeOnControl.bind(v,i,e,r);a.addChangeApplyCallbackToDependency(l,i.getId(),s)}});if(s.length||c){return i.execPromiseQueueSequentially(t).then(function(){return a.processDependentQueue(l,n,o)})}return undefined}.bind(null,o,d));return s},applyAllChangesForXMLView:function(n,r){if(!Array.isArray(r)){var t="No list of changes was passed for processing the flexibility on view: "+n.view+".";e.error(t,undefined,"sap.ui.fl.apply._internal.changes.Applier");r=[]}var a=[];n.failedSelectors=[];return r.reduce(function(e,r){var t;return e.then(l.bind(null,r,n)).then(function(e){t=e;var a=o.getControlIfTemplateAffected(r,t,n);return o.getChangeHandler(r,a,n)}).then(function(e){n.changeHandler=e;r.setQueuedForApply();f(t,r,undefined,undefined,n);if(!r.isApplyProcessFinished()){if(typeof n.changeHandler.onAfterXMLChangeProcessing==="function"){m(a,n.changeHandler,t)}return v.applyChangeOnControl(r,t,n)}return{success:true}}).then(function(e){if(!e.success){throw Error(e.error)}}).catch(function(e){r.getDependentSelectorList().forEach(function(e){if(i.indexOfObject(n.failedSelectors,e)===-1){n.failedSelectors.push(e)}});p(e,r)})},new i.FakePromise).then(function(){delete n.failedSelectors;a.forEach(function(r){r.controls.forEach(function(t){try{r.handler.onAfterXMLChangeProcessing(t,n)}catch(n){e.error("Error during onAfterXMLChangeProcessing",n)}})});return n.view})}};return v});