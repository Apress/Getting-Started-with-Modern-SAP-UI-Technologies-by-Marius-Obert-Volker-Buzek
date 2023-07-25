// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(function(){"use strict";var t=function(){this._history=[];this.backwards=false;this._historyPosition=-1;this._virtual={}};t.prototype.hashChange=function(t){var i=this._history.indexOf(t);if(i===-1){if(this._historyPosition+1<this._history.length){this._history=this._history.slice(0,this._historyPosition+1)}this._history.push(t);this._historyPosition+=1;this.backwards=false;this.forwards=false}else{this.backwards=this._historyPosition>i;this.forwards=this._historyPosition<i;this._historyPosition=i}};t.prototype.pop=function(){var t;if(this._history.length>0){t=this._history.pop();this._historyPosition--}return t};t.prototype.isVirtualHashchange=function(t,i){return this._virtual.hasOwnProperty(i)&&this.getCurrentHash()===t&&this._history.length-1>this._historyPosition&&this._history[this._historyPosition+1]===i};t.prototype.setVirtualNavigation=function(t){this._virtual[t]=true};t.prototype.getCurrentHash=function(){return this._history[this._historyPosition]||null};t.prototype.getHashIndex=function(t){return this._history.indexOf(t)};t.prototype.getHistoryLength=function(){return this._history.length};return t},true);