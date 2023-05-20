/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_CancelablePromise","sap/base/util/restricted/_isEqual","sap/base/util/restricted/_omit","sap/base/util/restricted/_castArray","sap/base/util/deepEqual","sap/base/util/each","sap/base/util/merge","sap/base/util/deepClone","sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/ui/integration/designtime/baseEditor/BaseEditor","sap/ui/integration/util/CardMerger","sap/ui/thirdparty/jquery","./config/index"],function(t,i,e,a,n,s,r,o,u,p,d,l,g,c){"use strict";var h=d.extend("sap.ui.integration.designtime.cardEditor.CardEditor",{metadata:{library:"sap.ui.integration",properties:{layout:{type:"string",defaultValue:"form"},designtimeChanges:{type:"array",defaultValue:[]},baseUrl:{type:"sap.ui.core.URI",defaultValue:null},config:{type:"object",defaultValue:{i18n:[].concat(d.getMetadata().getProperty("config").getDefaultValue().i18n,"sap/ui/integration/designtime/cardEditor/i18n/i18n.properties")}}}},constructor:function(t){t=t||{};d.prototype.constructor.apply(this,arguments);this.setPreventInitialization(true);if(!t["config"]){this.addConfig(c,true)}},renderer:d.getMetadata().getRenderer()});h.prototype.init=function(){d.prototype.init.apply(this,arguments);this.attachJsonChange(function(t){if(!this._oInitialJson){this._oInitialJson=t.getParameter("json")}},this)};h.prototype.setJson=function(){d.prototype.setJson.apply(this,arguments);var i=this.getJson();var e=u.get(["sap.app","id"],i);if(this._bDesigntimeInit&&this._bCardId!==e){if(this._oDesigntimePromise){this._oDesigntimePromise.cancel()}delete this._bCardId;delete this._bDesigntimeInit}if(!this._bDesigntimeInit){this.setPreventInitialization(true);this._bDesigntimeInit=true;this._bCardId=e;var n=m(u.get(["sap.card","configuration","editor"],i)||"");if(n===""){n=m(u.get(["sap.card","designtime"],i)||"")}var s=m(this.getBaseUrl()||"");if(s&&n){var o={};var c=m(s);var h=b(n);var y=c+"/"+h;var _=e.replace(/\./g,"/")+"/"+h;o[_]=y;sap.ui.loader.config({paths:o});var v=_+"/editor.config";var C=_+"/i18n/i18n.properties";var D=y+"/metadata.json";this._oDesigntimePromise=new t(function(t){Promise.all([new Promise(function(t){sap.ui.require([v],t,function(){t({})})}),new Promise(function(t){g.getJSON(D).done(t).fail(function(){t({})})})]).then(t)});this._oDesigntimePromise.then(function(t){this.setPreventInitialization(false);var i=t[1];i=l.mergeCardDesigntimeMetadata(i,this.getDesigntimeChanges());this._oInitialDesigntimeMetadata=i;this.setDesigntimeMetadata(f(i),true);var e=t[0];if(p(e)){this.addConfig({i18n:C})}else{e=r({},e);e.i18n=e.i18n?a(e.i18n):[];e.i18n.push(C);this._addSpecificConfig(e)}}.bind(this))}else{this.setPreventInitialization(false);this.addConfig({})}}};h.prototype.setDesigntimeChanges=function(t){if(this._oInitialDesigntimeMetadata){throw Error("Designtime Changes can only be set initially")}this.setProperty("designtimeChanges",t)};function f(t){var i={};Object.keys(t).forEach(function(e){u.set(e.split("/"),{__value:o(t[e])},i)});return i}function m(t){return t.trim().replace(/\/*$/,"")}function b(t){return t.replace(/^\.\//,"")}return h});