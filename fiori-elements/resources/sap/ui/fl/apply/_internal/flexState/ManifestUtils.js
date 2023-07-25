/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils"],function(e){"use strict";function t(e,t){if(e&&e.requests&&Array.isArray(e.requests)){return e.requests.find(function(e){return e.name==="sap.ui.fl.changes"&&(!t||e.reference===t)})}}function n(e){var t=e.manifest;var n=e.componentData||{};if(n.startupParameters){if(Array.isArray(n.startupParameters["sap-app-id"])){return n.startupParameters["sap-app-id"][0]}}var a=t.getEntry?t.getEntry("sap.ui5"):t["sap.ui5"];if(a){if(a.appVariantId){return a.appVariantId}if(a.componentName){return a.componentName}}return r(t)}function r(e){if(e){var t="${pro"+"ject.art"+"ifactId}";var n=e.getEntry?e.getEntry("sap.app"):e["sap.app"];var r=n&&n.id;if(r===t){if(e.getComponentName){return e.getComponentName()}if(e.name){return e.name}}return r}throw new Error("No Manifest received, descriptor changes are not possible")}var a={getAppIdFromManifest:r,getFlexReference:n,getFlexReferenceForControl:function(t){var r=e.getAppComponentForControl(t);return r&&n({manifest:r.getManifestObject(),componentData:r.getComponentData()})},getOvpEntry:function(e){return e.getEntry?e.getEntry("sap.ovp"):e["sap.ovp"]},getCacheKeyFromAsyncHints:function(e,n){var r=t(n,e);if(r){return r.cachebusterToken||"<NO CHANGES>"}},getPreviewSectionFromAsyncHints:function(e){var n=t(e);if(n){return n.preview}},getChangeManifestFromAsyncHints:function(e){var n=t(e);if(n){return false}return true},getBaseComponentNameFromManifest:function(e){var t=e.getEntry?e.getEntry("sap.ui5"):e["sap.ui5"];return t&&t.componentName||r(e)},isFlexExtensionPointHandlingEnabled:function(t){var n=e.getAppComponentForControl(t);return!!(n&&n.getManifestEntry("sap.ui5")&&n.getManifestEntry("sap.ui5").flexExtensionPointEnabled)}};return a});