/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
(function(){"use strict";function a(){function a(a){if(!a||typeof a!=="object"||{}.toString.call(a)!="[object Object]"){return false}var t=Object.getPrototypeOf(a);if(t===null){return true}var e=self.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof e=="function"&&e instanceof e&&Function.prototype.toString.call(e)===Function.prototype.toString.call(Object)}function t(e,r,o){for(var n in o){var i=o[n];var f=e?e[n]:e;if(i!==undefined){if(f===null||!a(i)){r[n]=i}else{var l=r[n];if(!l||!a(l)){l=r[n]={}}t(f,l,i)}}}}function e(a,e,r){e=e||{};for(var o=2;o<arguments.length;o++){var n=arguments[o];t(a,e,n)}return e}self.onmessage=function(a){var t={};var r=a.data.allChartNames;for(var o=0;o<r.length;++o){var n=r[o];if(a.data.applicationSet==="fiori"){t[n]=e(a.data.allPropDefs[n],a.data.defaultFioriProps,a.data.generalProps,a.data.specificProps[n.replace("info/","")]);if(/dual/.test(n)){e[n]=e(a.data.allPropDefs[n],t[n],a.data.dualFioriProps)}}else{t[n]=e(a.data.allPropDefs[n],a.data.generalProps,a.data.specificProps[n.replace("info/","")],a.data.defaultFormatString[n])}t[n]=e(a.data.allPropDefs[n],a.data.cvomTemplate[n],t[n],a.data.allUi5Theme[n],a.data.extraProp)}self.postMessage(t)}}if(typeof sap!=="undefined"&&sap.ui&&sap.ui.define){sap.ui.define([],function(){return a})}else{a()}})();