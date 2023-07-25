// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["./UserRecentsBase","sap/ui/thirdparty/jquery"],function(e,t){"use strict";var i=e.extend("sap.ushell.services.RecentsList");i.prototype._updateIfAlreadyIn=function(e,t){return this.aRecents.some(function(i){var s;if(this._compareItems(i.oItem,e)){i.oItem=e;i.iTimestamp=t;i.iCount=i.iCount+1;s=true}else{s=false}return s}.bind(this))};i.prototype._insertNew=function(t,i){var s={oItem:t,iTimestamp:i,iCount:1};if(this.aRecents.length===this.iMaxItems){this.aRecents.sort(e._itemSorter);this.aRecents.pop()}this.aRecents.push(s)};i.prototype.clearAllActivities=function(){return this._save([])};i.prototype.newItem=function(e){var i=new t.Deferred;var s=Date.now();var n;this._load().done(function(t){this.aRecents=t||[];n=this._updateIfAlreadyIn(e,s);if(!n){this._insertNew(e,s)}this._save(this.aRecents).done(function(){i.resolve()}).fail(function(){i.reject()})}.bind(this));return i.promise()};i.prototype.getRecentItems=function(){var i=new t.Deferred;this._load().done(function(s){s=s||[];s.sort(e._itemSorter);this.aRecents=s.slice(0,this.iMaxItems);i.resolve(t.map(this.aRecents,function(e){return e.oItem}))}.bind(this));return i.promise()};return i});