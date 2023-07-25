/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/Deferred","sap/ui/mdc/util/loadModules","sap/base/Log"],function(e,r,t){"use strict";var i={};i.init=function(r){return function(){this._oPropertyHelper=null;this._oPropertyHelperDeferred=new e;this._oApplySettingsDeferred=new e;this._bPropertyHelperFinal=false;this._oPropertiesFinalizedDeferred=new e;this._bPropertyHelperInitializing=false;this._sPropertyInfoStore=null;if(r){r.apply(this,arguments)}}};i.applySettings=function(e){return function(){if(e){e.apply(this,arguments)}if(this._sPropertyInfoStore&&(!arguments[0]||!arguments[0].hasOwnProperty(this._sPropertyInfoStore))){o.call(this,[],false)}this._oApplySettingsDeferred.resolve(this);return this}};i.initPropertyHelper=function(e,r,t){if(e){this._setPropertyHelperClass(e)}return o.call(this,r,t)};i.updatePropertyHelper=function(e,r){return o.call(this,e,r)};i.finalizePropertyHelper=function(){this._pHelperFinalizationPromise=this._pHelperFinalizationPromise||p(this).then(function(e){return o.call(this,e,true)}.bind(this));return this._pHelperFinalizationPromise};i.propertiesFinalized=function(){return this._oPropertiesFinalizedDeferred.promise};i.isPropertyHelperFinal=function(){return this._bPropertyHelperFinal};i.awaitPropertyHelper=function(){if(this._oPropertyHelperDeferred){return this._oPropertyHelperDeferred.promise}else{return Promise.resolve()}};i.getPropertyHelper=function(){return this._oPropertyHelper};i.exit=function(e){return function(){this._oPropertyHelper=null;this._oPropertyHelperDeferred=null;this._oApplySettingsDeferred=null;this._bPropertyHelperFinal=null;this._bPropertyHelperInitializing=null;this._pHelperFinalizationPromise=null;this._oPropertyHelperClass=null;this._sPropertyInfoStore=null;if(this._oPropertyInfoStoreMutatorOverride){this[this._oPropertyInfoStoreMutatorOverride.key]=this._oPropertyInfoStoreMutatorOverride.mutator;this._oPropertyInfoStoreMutatorOverride=null}if(e){e.apply(this,arguments)}}};i._setupPropertyInfoStore=function(e){var r=this.getMetadata().getAllProperties();var t=r&&r[e];if(!t){throw new Error("PropertyHelperMixin: Property '"+e+"' not found.")}var i=this.getMetadata().getJSONKeys()[e];this._oPropertyInfoStoreMutatorOverride={key:i._sMutator,mutator:this[i._sMutator]};this[i._sMutator]=function(){this._oPropertyInfoStoreMutatorOverride.mutator.apply(this,arguments);if(!this._bPropertyHelperFinal){o.call(this,this[i._sGetter](),false)}return this};this._sPropertyInfoStore=e};i._setPropertyHelperClass=function(e){if(this._oPropertyHelper||this._bPropertyHelperInitializing){throw new Error("PropertyHelper already initializing/ed.")}if(e&&(!e.getMetadata||!e.getMetadata().isA("sap.ui.mdc.util.PropertyHelper"))){throw new Error("The custom property helper class must be sap.ui.mdc.util.PropertyHelper or a subclass of it.")}this._oPropertyHelperClass=e};i._getPropertyByName=function(e){return this._oPropertyHelper&&this._oPropertyHelper.getProperty(e)};i._getPropertyByNameAsync=function(e){var r=this._getPropertyByName(e);if(!r){return this.finalizePropertyHelper().then(function(r){return this._getPropertyByName(e)}.bind(this))}return Promise.resolve(r)};function o(e,r){if(!this.bIsDestroyed){if(this._bPropertyHelperInitializing&&typeof e!=="undefined"){return this._oPropertyHelperDeferred.promise.then(function(){return n.call(this,e,r)}.bind(this))}if(this._oPropertyHelper&&typeof e!=="undefined"){n.call(this,e,r)}if(!this._oPropertyHelper){s.call(this,e,r)}}return this._oPropertyHelperDeferred&&this._oPropertyHelperDeferred.promise}function s(e,r){this._bPropertyHelperInitializing=true;if(r||!e){r=true;this._pHelperFinalizationPromise=this._oPropertyHelperDeferred.promise}var t;return this._oApplySettingsDeferred.promise.then(function(){return this.initControlDelegate()}.bind(this)).then(function(i){t=i;return r?p(this):e}.bind(this)).then(function(e){if(this.bIsDestroyed){return[]}return l(this,t).then(function(r){return[e,r]})}.bind(this)).then(function(e){if(this.bIsDestroyed){return undefined}var t=e[0];var i=e[1];this._oPropertyHelper=new i(t,this);this._bPropertyHelperInitializing=false;if(r){this._bPropertyHelperFinal=true;this._oPropertiesFinalizedDeferred.resolve()}return this._oPropertyHelperDeferred.resolve(this._oPropertyHelper)}.bind(this)).catch(function(e){return this._oPropertyHelperDeferred&&this._oPropertyHelperDeferred.reject(e)}.bind(this))}function n(e,r){if(this._bPropertyHelperFinal){throw new Error("This property helper is already final and cannot be updated further.")}this._oPropertyHelper.setProperties(e);this._bPropertyHelperFinal=r||this._bPropertyHelperFinal;if(this._bPropertyHelperFinal){this._oPropertiesFinalizedDeferred.resolve()}return this._oPropertyHelper}function p(e){return e.initControlDelegate().then(function(){var r=e.getControlDelegate(e);return r.fetchProperties(e).then(function(r){if(e.isDestroyed()){return[]}return r})})}function l(e,t){if(t&&typeof t.getPropertyHelperClass==="function"){var i=t.getPropertyHelperClass();var o=e._oPropertyHelperClass?e._oPropertyHelperClass.getMetadata().getName():"sap.ui.mdc.util.PropertyHelper";if(!i||!i.getMetadata||!i.getMetadata().isA(o)){throw new Error("The property helper class must be "+o+" or a subclass of it.")}return Promise.resolve(i)}if(e._oPropertyHelperClass){return Promise.resolve(e._oPropertyHelperClass)}return r("sap/ui/mdc/util/PropertyHelper").then(function(e){return e[0]})}return function(){this.init=i.init(this.init);this.exit=i.exit(this.exit);this.applySettings=i.applySettings(this.applySettings);this.initPropertyHelper=i.initPropertyHelper;this.awaitPropertyHelper=i.awaitPropertyHelper;this.getPropertyHelper=i.getPropertyHelper;this.finalizePropertyHelper=i.finalizePropertyHelper;this.isPropertyHelperFinal=i.isPropertyHelperFinal;this.propertiesFinalized=i.propertiesFinalized;this._getPropertyByName=i._getPropertyByName;this._getPropertyByNameAsync=i._getPropertyByNameAsync;this._setPropertyHelperClass=i._setPropertyHelperClass;this._setupPropertyInfoStore=i._setupPropertyInfoStore}});