// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils/type"],function(e){"use strict";function r(r){function n(r){return e.isPlainObject(r)?{}:[]}function t(r){if(r instanceof Promise){return false}return e.isPlainObject(r)||e.isArray(r)}function a(r){if(e.isPlainObject(r)){return Object.keys(r).map(function(e){return{key:e,value:r[e]}})}var n=r.length;var t=[];for(var a=0;a<n;a++){t.push({value:r[a]})}return t}function u(r,n){var t=e.isPlainObject(n)?function(e,r){r[e.key]=e.value}:function(e,r){r.push(e.value)};t(r,n)}function i(e,r,n){r.push(e.length);Array.prototype.push.apply(n,e)}if(!t(r)){return r}var s=n(r);var f=[s];var l=[];var v=[];var c=new WeakMap;c.set(r,s);i(a(r),v,l);while(f.length>0){var o=f.shift();var p=v.shift();l.splice(0,p).forEach(function(e){var r=e.value;if(!t(r)){u(e,o);return}var s=r;var p=c.get(s);if(p){u({key:e.key,value:p},o);return}var h=n(s);c.set(s,h);u({key:e.key,value:h},o);f.push(h);i(a(s),v,l)})}return s}return r},false);