/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){function r(r){return function(){for(var t=[],n=0;n<arguments.length;n++){t[n]=arguments[n]}try{return Promise.resolve(r.apply(this,t))}catch(r){return Promise.reject(r)}}}sap.ui.define([],function(){function t(r,t){var e=typeof Symbol!=="undefined"&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=n(r))||t&&r&&typeof r.length==="number"){if(e)r=e;var u=0;var o=function(){};return{s:o,n:function(){if(u>=r.length)return{done:true};return{done:false,value:r[u++]}},e:function(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i=true,f=false,a;return{s:function(){e=e.call(r)},n:function(){var r=e.next();i=r.done;return r},e:function(r){f=true;a=r},f:function(){try{if(!i&&e.return!=null)e.return()}finally{if(f)throw a}}}}function n(r,t){if(!r)return;if(typeof r==="string")return e(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);if(n==="Object"&&r.constructor)n=r.constructor.name;if(n==="Map"||n==="Set")return Array.from(r);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(r,t)}function e(r,t){if(t==null||t>r.length)t=r.length;for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}function u(r){"@babel/helpers - typeof";return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},u(r)}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */function o(r){var t=function r(){};t.prototype=r;return new t}function i(r,t){for(var n in t){r[n]=t[n]}return r}function f(r,t){if(t){if(r[0]==="_"){r=r.slice(1)}}return r[0].toUpperCase()+r.slice(1)}function a(r){if(Object.prototype.toString.call(r)==="[object Array]"){return true}return false}function c(r){if(a(r)){return false}return u(r)==="object"}function l(r){for(var t in r){if(Object.prototype.hasOwnProperty.call(r,t)){return false}}return JSON.stringify(r)===JSON.stringify({})}function s(r){return typeof r==="function"}function y(r){return typeof r==="string"}function p(r){return u(r)!=="object"&&typeof r!=="function"}function v(r,t,n){if(a(r)){return x(r,t,n)}if(c(r)){return b(r,t,n)}return r===t}function x(r,t,n){if(n===undefined){n=true}if(r.length!==t.length){return false}if(n){for(var e=0;e<r.length;++e){if(!v(r[e],t[e],n)){return false}}return true}var u={};for(var o=0;o<r.length;++o){var i=r[o];var f=false;for(var a=0;a<t.length;++a){var c=t[a];if(u[a]){continue}if(v(i,c,n)){f=true;u[a]=true;break}}if(!f){return false}}return true}function b(r,t,n){if(r.equals){return r.equals(t)}if(!c(t)){return false}for(var e in r){var u=r[e];var o=t[e];if(!v(u,o,n)){return false}}return true}function h(r){if(a(r)){return g(r)}if(c(r)){return m(r)}return r}function g(r){var t=[];for(var n=0;n<r.length;++n){var e=r[n];t.push(h(e))}return t}function m(r){if(r.clone){return r.clone()}var t={};for(var n in r){var e=r[n];t[n]=h(e)}return t}const d=r(function(r,t){if(!r){return Promise.resolve()}var n=function n(e){if(e>=r.length){return undefined}var u=r[e];return Promise.resolve().then(function(){if(t){return t(u)}return u()}).then(function(){return n(e+1)})};return n(0)});var S=0;function j(){return"#"+ ++S}function O(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(r){var t=Math.random()*16|0,n=r=="x"?t:t&3|8;return n.toString(16).toUpperCase()})}function A(r,n){var e=r;var u=t(n),o;try{for(u.s();!(o=u.n()).done;){var i=o.value;e=e[i];if(typeof e==="undefined"){return undefined}}}catch(r){u.e(r)}finally{u.f()}return e}var w={__esModule:true};w.object=o;w.extend=i;w.firstCharToUpper=f;w.isList=a;w.isObject=c;w.isEmptyObject=l;w.isFunction=s;w.isString=y;w.isSimple=p;w.equals=v;w._equalsList=x;w._equalsObject=b;w.clone=h;w._cloneList=g;w._cloneObject=m;w.generateId=j;w.generateGuid=O;w.executeSequentialAsync=d;w.getProperty=A;return w})})();