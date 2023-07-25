/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/restricted/_omit","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/write/_internal/condenser/Condenser","sap/ui/fl/write/_internal/flexState/FlexObjectState","sap/ui/fl/write/_internal/Storage","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/write/_internal/FlexInfoSession","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/registry/Settings"],function(e,n,r,t,a,s,i,o,l,u,c,g,f,h,p,d){"use strict";var C={};function y(n){return n._getMap&&e(i.getChangeTypes(),n._getMap().changeType)||n.getChangeType&&e(i.getChangeTypes(),n.getChangeType())}function v(e){e.includeCtrlVariants=true;e.invalidateCache=false;return C._getUIChanges(e).then(function(e){return e.length>0})}C.hasDirtyChanges=function(e){return u.hasDirtyFlexObjects(e)};C.hasHigherLayerChanges=function(e){e.upToLayer=e.upToLayer||p.getCurrentLayer();return u.getFlexObjects(e).then(function(n){return n.filter(function(n){return p.isOverLayer(n.getLayer(),e.upToLayer)})}).then(function(e){return e.length>0})};C.save=function(e){return u.saveFlexObjects(e).then(function(n){if(n&&n.length!==0){C.getResetAndPublishInfo(e).then(function(n){f.set(n,e.selector)})}return n})};C.getResetAndPublishInfo=function(e){return Promise.all([v(e),g.isPublishAvailable()]).then(function(n){var t=n[0];var a=n[1];var s=e.layer!==h.USER&&e.layer!==h.PUBLIC;var i={isResetEnabled:t,isPublishEnabled:false,allContextsProvided:true};if(s){return c.getFlexInfo(e).then(function(e){i.allContextsProvided=e.allContextsProvided===undefined||e.allContextsProvided;i.isResetEnabled=e.isResetEnabled;i.isPublishEnabled=a&&e.isPublishEnabled;return i}).catch(function(e){r.error("Sending request to flex/info route failed: "+e.message);return i})}return i})};C.getResetAndPublishInfoFromSession=function(e){var n=o.getFlexReferenceForControl(e)||"true";return JSON.parse(window.sessionStorage.getItem("sap.ui.fl.info."+n))};C.reset=function(e){var n=s.getAppComponentForSelector(e.selector);var r=s.getFlexControllerInstance(n);var t=[e.layer,e.generator,n,e.selectorIds,e.changeTypes];return r.resetChanges.apply(r,t)};C.publish=function(e){e.styleClass=e.styleClass||"";var n=s.getAppComponentForSelector(e.selector);return s.getFlexControllerInstance(n)._oChangePersistence.transportAllUIChanges({},e.styleClass,e.layer,e.appVariantDescriptors)};C.add=function(e){if(y(e.change)){return e.change.store()}var n=s.getAppComponentForSelector(e.selector);return s.getFlexControllerInstance(n).addPreparedChange(e.change,n)};C.remove=function(e){var n;var r;return Promise.resolve().then(function(){if(!e.selector){return Promise.reject(new Error("An invalid selector was passed so change could not be removed with id: "+e.change.getId()))}r=s.getAppComponentForSelector(e.selector);if(!r){return Promise.reject(new Error("Invalid application component for selector, change could not be removed with id: "+e.change.getId()))}if(y(e.change)){var i=s.getFlexControllerInstance(r);i.deleteChange(e.change,r);return undefined}var o=t.bySelector(e.change.getSelector(),r);n=s.getFlexControllerInstance(r);if(o){a.destroyAppliedCustomData(o,e.change,t)}n.deleteChange(e.change,r);return undefined})};C.getChangesWarning=function(e){return this._getUIChanges(e).then(function(e){var n=e.some(function(e){return e.isChangeFromOtherSystem()});var r=d.getInstanceOrUndef();var t=r&&r.isProductiveSystemWithTransports();var a=e.length===0;var s={showWarning:false};if(n){s={showWarning:true,warningType:"mixedChangesWarning"}}if(t&&a){s={showWarning:true,warningType:"noChangesAndPSystemWarning"}}return s})};C._condense=function(e){return Promise.resolve().then(function(){if(!e.selector){throw Error("An invalid selector was passed")}var n=s.getAppComponentForSelector(e.selector);if(!n){throw Error("Invalid application component for selector")}if(!e.changes||e.changes&&!Array.isArray(e.changes)){throw Error("Invalid array of changes")}return l.condense(n,e.changes)})};C._getUIChanges=function(e){if(e.layer){e.currentLayer=e.layer}return u.getFlexObjects(e)};return C});