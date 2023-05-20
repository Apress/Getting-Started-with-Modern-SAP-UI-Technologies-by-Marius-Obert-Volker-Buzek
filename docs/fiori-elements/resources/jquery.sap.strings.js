/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/strings/capitalize","sap/base/strings/camelize","sap/base/strings/hyphenate","sap/base/strings/escapeRegExp","sap/base/strings/formatMessage"],function(t,s,e,r,a,n){"use strict";t.sap.endsWith=function(t,s){if(typeof s!="string"||s==""){return false}return t.endsWith(s)};t.sap.endsWithIgnoreCase=function(t,s){if(typeof s!="string"||s==""){return false}t=t.toUpperCase();s=s.toUpperCase();return t.endsWith(s)};t.sap.startsWith=function(t,s){if(typeof s!="string"||s==""){return false}return t.startsWith(s)};t.sap.startsWithIgnoreCase=function(t,s){if(typeof s!="string"||s==""){return false}t=t.toUpperCase();s=s.toUpperCase();return t.startsWith(s)};t.sap.charToUpperCase=function(t,e){if(!t){return t}if(!e||isNaN(e)||e<=0||e>=t.length){return s(t)}var r=t.charAt(e).toUpperCase();if(e>0){return t.substring(0,e)+r+t.substring(e+1)}return r+t.substring(e+1)};t.sap.padLeft=function(s,e,r){t.sap.assert(typeof e==="string"&&e,"padLeft: sPadChar must be a non-empty string");if(!s){s=""}if(e&&e.length===1){return s.padStart(r,e)}while(s.length<r){s=e+s}return s};t.sap.padRight=function(s,e,r){t.sap.assert(typeof e==="string"&&e,"padRight: sPadChar must be a non-empty string");if(!s){s=""}if(e&&e.length===1){return s.padEnd(r,e)}while(s.length<r){s=s+e}return s};t.sap.camelCase=e;t.sap.hyphen=r;t.sap.escapeRegExp=a;t.sap.formatMessage=n;return t});