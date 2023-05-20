// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/plugins/BaseRTAPlugin","sap/ushell/appRuntime/ui5/plugins/baseRta/CheckConditions","sap/ushell/appRuntime/ui5/plugins/baseRta/Renderer"],function(e,i,t){"use strict";function n(){return new Promise(function(e){sap.ui.require(["sap/ui/fl/write/api/FeaturesAPI"],function(i){e(i.isKeyUser())})})}var s=e.extend("sap.ushell.plugins.rta.Component",{sType:"rta",metadata:{manifest:"json",library:"sap.ushell"},init:function(){var s={sComponentName:"sap.ushell.plugins.rta",layer:"CUSTOMER",developerMode:false,id:"RTA_Plugin_ActionButton",text:"RTA_BUTTON_TEXT",icon:"sap-icon://wrench",visible:true,checkRestartRTA:true};e.prototype.init.call(this,s);this._oPluginPromise=this._oPluginPromise.then(function(){return Promise.all([i.checkUI5App(),n(),i.checkDesktopDevice()])}).then(function(e){var i=this.mConfig.visible&&e[0]&&e[1]&&e[2];return t.createActionButton(this,this._onAdapt.bind(this),i)}.bind(this))}});return s},true);