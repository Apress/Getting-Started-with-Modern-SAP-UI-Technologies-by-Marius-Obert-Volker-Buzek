/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/util/loadModules","sap/base/Log"],function(e,t){"use strict";var i=function(e){if(!e||!e.name){throw new Error("Delegate configuration '"+(e&&JSON.stringify(e))+"' invalid")}};var l=function(e){if(!this.bIsDestroyed){if(e instanceof Error){this.fnRejectDelegate(e)}else{this._oDelegate=e[0];this.fnResolveDelegate(this._oDelegate);this.bDelegateInitialized=true}}this.bDelegateLoading=false;delete this.fnResolveDelegate;delete this.fnRejectDelegate};var a={};a.init=function(e){return function(){this.bDelegateInitialized=false;this.bDelegateLoading=false;this._oDelegateInitialized=new Promise(function(e,t){this.fnResolveDelegate=e;this.fnRejectDelegate=t}.bind(this));if(e){e.apply(this,arguments)}}};a.applySettings=function(e){return function(t){e.apply(this,arguments);this._bDelegateLocked=true;return this}};a.setDelegate=function(e){return function(t){if(this._bDelegateLocked){throw new Error("Runtime delegate configuration is not permitted.")}i(t);e.call(this,t);this._oPayload=t&&t.payload;return this}};a.initControlDelegate=function(a){if(this.bIsDestroyed){t.warning("Delegate module initialization omitted as control is being destroyed.")}else if(!this._oDelegate&&!this.bDelegateLoading){if(a){l.call(this,[a])}else{var n=this.getDelegate();i(n);this.bDelegateLoading=true;e(n.name).then(l.bind(this)).catch(l.bind(this))}}return this._oDelegateInitialized};a.isControlDelegateInitialized=function(){return this.bDelegateInitialized};a.getPayload=function(){if(!this._oPayload){var e=this.getDelegate();this._oPayload=e&&e.payload}return this._oPayload};a.getTypeUtil=function(){if(!this._oTypeUtil){if(!this._oDelegate){throw new Error("A delegate instance providing typeUtil is not (yet) available.")}this._oTypeUtil=this._oDelegate.getTypeUtil&&this._oDelegate.getTypeUtil(this._oPayload)}return this._oTypeUtil};a.getControlDelegate=function(){if(!this._oDelegate){throw new Error("A delegate instance is not (yet) available. You must call initControlDelegate before calling getControlDelegate.")}return this._oDelegate};a.awaitControlDelegate=function(){return this._oDelegateInitialized};a.exit=function(e){return function(){this.fnResolveDelegate=null;this.fnRejectDelegate=null;this.bDelegateInitialized=false;this.bDelegateLoading=false;this._oDelegateInitialized=null;this._oDelegate=null;this._oPayload=null;this._oTypeUtil=null;if(e){e.apply(this,arguments)}}};return function(){this.applySettings=a.applySettings(this.applySettings);this.exit=a.exit(this.exit);this.init=a.init(this.init);this.setDelegate=a.setDelegate(this.setDelegate);this.awaitControlDelegate=a.awaitControlDelegate;this.isControlDelegateInitialized=a.isControlDelegateInitialized;this.getControlDelegate=a.getControlDelegate;this.getPayload=a.getPayload;this.getTypeUtil=a.getTypeUtil;this.initControlDelegate=a.initControlDelegate}});