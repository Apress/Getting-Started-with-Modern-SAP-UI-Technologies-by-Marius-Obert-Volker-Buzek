/*!
 * Copyright (c) 2009-2023 SAP SE, All Rights Reserved
 */
sap.ui.define(["sap/base/util/UriParameters","sap/ui/Device","sap/ushell/appRuntime/ui5/plugins/baseRta/AppLifeCycleUtils"],function(e,t,n){"use strict";var a={_getAppDescriptor:function(e){if(e&&e.getMetadata){var t=e.getMetadata();if(t&&t.getManifest){return t.getManifest()}}return{}},checkRestartRTA:function(t){var n=e.fromQuery(window.location.search);var a=n.get("sap-ui-layer");t=a||t;return!!window.sessionStorage.getItem("sap.ui.rta.restart."+t)},checkUI5App:function(){return n.getCurrentRunningApplication().then(function(e){if(e){var t=e.applicationType==="UI5";var n=e.componentInstance&&e.componentInstance.getManifestEntry&&e.componentInstance.getManifestEntry("sap.app").type==="application";return t&&n}return false})},checkDesktopDevice:function(){return t.system.desktop}};return a},true);