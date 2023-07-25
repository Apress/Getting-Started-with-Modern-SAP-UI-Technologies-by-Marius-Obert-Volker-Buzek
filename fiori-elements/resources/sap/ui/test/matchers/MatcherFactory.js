/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/matchers/Interactable","sap/ui/test/matchers/Visible","sap/ui/test/matchers/_Enabled","sap/ui/test/matchers/_Editable","sap/ui/thirdparty/jquery","sap/ui/test/_ValidationParameters","sap/ui/test/matchers/matchers"],function(t,e,r,a,s,i,n){"use strict";var c=t.extend("sap.ui.test.matchers.MatcherFactory",{getStateMatchers:function(t){t=t||{};var i=[];if(t.visible!==false){if(t.enabled){i.push(new a)}if(t.editable){i.push(new s)}if(t.interactable){i.push(new e)}else{i.push(new r)}}return i},getFilteringMatchers:function(t){if(!t){return[]}var e=this._getPlainObjectMatchers(t);if(t.matchers){if(i.isPlainObject(t.matchers)){e=e.concat(this._getPlainObjectMatchers(t.matchers))}else if(Array.isArray(t.matchers)){t.matchers.forEach(function(t){if(i.isPlainObject(t)){e=e.concat(this._getPlainObjectMatchers(t))}else{e.push(t)}}.bind(this))}else{e=e.concat(t.matchers)}}return e},_getPlainObjectMatchers:function(t){if(!t){return[]}if(t["isMatching"]){return[t]}var e=Object.keys(n.OPA5_WAITFOR_DECORATED);var r=this._getSupportedMatchers();return Object.keys(t).filter(function(t){return e.indexOf(t)===-1}).map(function(e){if(!r[e]){throw new Error("Matcher is not supported! Matcher name: '"+e+"', arguments: '"+JSON.stringify(t[e])+"'")}var a=r[e];var s=Array.isArray(t[e])?t[e]:[t[e]];return s.map(function(t){if(Array.isArray(t)){return new function(){return a.apply(this,t)}}else{return new a(t)}})}).reduce(function(t,e){return t.concat(e)},[])},_getSupportedMatchers:function(t){t=t||sap.ui.test.matchers;var e={};Object.keys(t).forEach(function(r){if(!r.match(/^(_|matcher)/i)){var a=r.charAt(0).toLowerCase()+r.substr(1);e[a]=t[r]}});return e}});return c});