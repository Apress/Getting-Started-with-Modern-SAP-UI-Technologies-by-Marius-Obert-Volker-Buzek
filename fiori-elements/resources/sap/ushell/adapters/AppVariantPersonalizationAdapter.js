// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_Personalization/constants","sap/ui/fl/apply/api/UI2PersonalizationApplyAPI","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,n,i){"use strict";function r(e){var t="sap.ushell.personalization#";if(e.substring(0,t.length)!==t){n.error("Unexpected ContainerKey "+e);return e}var i=e.substring(t.length);i=i.split("#")[0];return i}o.prototype._determineCategory=function(t){if(!t){return"U"}if(t.keyCategory&&t.keyCategory===e.keyCategory.FIXED_KEY&&t.writeFrequency&&t.writeFrequency===e.writeFrequency.LOW&&t.clientStorageAllowed&&t.clientStorageAllowed===true){return"P"}return"U"};o.prototype.getMap=function(){return{category:this._category,service:this._oService,changedKeys:this._oChangedKeys,component:this._oComponent,deletedKeys:this._oDeletedKeys,container:this._aJSONContainer,scope:this._oScope,appName:this._sAppName,appVarId:this._sAppVarId,appVersion:this._sAppVersion,containerKey:this._sContainerKey}};function o(e,t,n,i){this._oService=t;this._oScope=n;this._sAppVarId=n.appVarId;this._sAppVersion=n.appVersion;this._oComponent=n.component;this._sContainerKey=r(e);this._sAppName=i||"";this._category=this._determineCategory(n);this._aJSONContainer=[];this._oChangedKeys={};this._oDeletedKeys={}}o.prototype._reset=function(){this._aJSONContainer=[]};o.prototype.load=function(){var e=new i.Deferred;sap.ui.getCore().loadLibrary("sap/ui/fl",{async:true}).then(function(){return t.load({selector:this._oComponent,containerKey:this._sContainerKey})}.bind(this)).then(function(t){this._aJSONContainer=t||[];e.resolve(t)}.bind(this)).catch(function(t){n.warning(t);this._reset();e.reject(t)}.bind(this));return e.promise()};o.prototype.save=function(){var e=[];var t=new i.Deferred;sap.ui.require(["sap/ui/fl/write/api/UI2PersonalizationWriteAPI"],function(n){Object.keys(this._oChangedKeys).forEach(function(t){var i=this._oChangedKeys[t];var r=Object.assign({selector:this._oComponent},i);e.push(n.create(r))},this);Object.keys(this._oDeletedKeys).forEach(function(t){e.push(n.deletePersonalization({selector:this._oComponent,containerKey:this._sContainerKey,itemName:t}))},this);Promise.all(e).then(function(e){this._oChangedKeys={};this._oDeletedKeys={};t.resolve()}.bind(this),function(e){t.reject(e)})}.bind(this));return t.promise()};o.prototype.del=function(){var e=new i.Deferred;sap.ui.require(["sap/ui/fl/write/api/UI2PersonalizationWriteAPI"],function(t){this.load().then(function(){var n=[];this._aJSONContainer.forEach(function(e){n.push(t.deletePersonalization({selector:this._oComponent,containerKey:this._sContainerKey,itemName:e.itemName}))},this);Promise.all(n).then(function(t){e.resolve()},function(t){e.reject(t)})}.bind(this))}.bind(this));return e.promise()};o.prototype.getItemKeys=function(){var e=[];this._aJSONContainer.forEach(function(t){if(t.category==="V"){e.push("VARIANTSET#"+t.itemName)}else if(t.category==="I"){e.push("ITEM#"+t.itemName)}});return e};o.prototype.containsItem=function(e){return this.getItemKeys().indexOf(e)>=0};o.prototype._findItemIndex=function(e,t){var n;for(n=0;n<this._aJSONContainer.length;n=n+1){if(this._aJSONContainer[n].itemName===e&&this._aJSONContainer[n].category===t){return n}}return undefined};o.prototype._locateItem=function(e){var t={index:-1};if(e.indexOf("ITEM#")===0){t.trueItemKey=e.substring("ITEM#".length,"ITEM#".length+40);t.category="I"}else if(e.indexOf("VARIANTSET#")===0){t.trueItemKey=e.substring("VARIANTSET#".length,"VARIANTSET#".length+40);t.category="V"}else if(e.indexOf("ADMIN#")!==0){n.error("Unknown itemkey prefix"+e)}t.index=this._findItemIndex(t.trueItemKey,t.category);return t};o.prototype.getItemValue=function(e){var t="",n,i=this._locateItem(e);if(i.index>=0){t=this._aJSONContainer[i.index].content;n=t}return n};o.prototype.setItemValue=function(e,t){var n=this._locateItem(e);var i;if(n.index>=0){i=this._aJSONContainer[n.index];i.content=t}else{i={reference:this._sAppVarId,content:t,itemName:n.trueItemKey,category:n.category,containerKey:this._sContainerKey,containerCategory:this._category};this._aJSONContainer.push(i)}this._oChangedKeys[n.trueItemKey]=i;delete this._oDeletedKeys[n.trueItemKey]};o.prototype.delItem=function(e){var t=this._locateItem(e);if(t.index>=0){this._aJSONContainer.splice(t.index,1);this._oDeletedKeys[t.trueItemKey]=true;return}};var s=function(){};s.prototype.getAdapterContainer=function(e,t,n){return new o(e,this,t,n)};s.prototype.delAdapterContainer=function(e,t){return this.getAdapterContainer(e,t).del()};return s});