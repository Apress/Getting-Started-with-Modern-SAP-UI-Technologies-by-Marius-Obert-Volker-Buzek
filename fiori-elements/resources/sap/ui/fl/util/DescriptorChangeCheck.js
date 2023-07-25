/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/ui/fl/Layer"],function(r,e){"use strict";function t(r,e,t){if(Array.isArray(r)){r.forEach(function(r){a(r,e,t)})}else{a(r,e,t)}}function o(r){var e=[];var t=r.filter(function(r){return r.endsWith("/*")});t.forEach(function(r){var t=r.replaceAll("/*","");if(t){e.push(t)}});return e}function n(r,e){var t=o(r);return t.some(function(r){return e.startsWith(r)})}function a(e,t,o){if(!e.propertyPath){throw new Error("Invalid change format: The mandatory 'propertyPath' is not defined. Please define the mandatory property 'propertyPath'")}if(!e.operation){throw new Error("Invalid change format: The mandatory 'operation' is not defined. Please define the mandatory property 'operation'")}if(e.operation.toUpperCase()!=="DELETE"){if(!e.hasOwnProperty("propertyValue")){throw new Error("Invalid change format: The mandatory 'propertyValue' is not defined. Please define the mandatory property 'propertyValue'")}}if(!r(t,e.propertyPath)&&!n(t,e.propertyPath)){throw new Error("Changing "+e.propertyPath+" is not supported. The supported 'propertyPath' is: "+t.join("|"))}if(!r(o,e.operation)){throw new Error("Operation "+e.operation+" is not supported. The supported 'operation' is "+o.join("|"))}}function i(r,e,o){var n=Object.keys(r).filter(function(r){return r.endsWith("Id")}).shift();if(!r[n]){throw new Error('Mandatory "'+n+'" parameter is not provided.')}if(!r.entityPropertyChange){throw new Error('Changes for "'+r[n]+'" are not provided.')}t(r.entityPropertyChange,e,o)}var p={};p[e.CUSTOMER]="customer.";p[e.CUSTOMER_BASE]="customer.";p[e.PARTNER]="partner.";p[e.VENDOR]=null;function s(r,e){var t=e.getLayer();if(!t){throw new Error("Mandatory layer parameter is not provided.")}var o=h(t);if(o===null){Object.keys(p).forEach(function(e){if(p[e]&&r.startsWith(p[e])){throw new Error("Id "+r+" must not start with reserved "+p[e])}})}else if(!r.startsWith(o)){throw new Error("Id "+r+" must start with "+o)}}function h(r){var e=p[r];if(e===undefined){throw new Error("Layer "+r+" not supported.")}return e}return{checkEntityPropertyChange:i,checkIdNamespaceCompliance:s,getNamespacePrefixForLayer:h,getClearedGenericPath:o,isGenericPropertyPathSupported:n}});