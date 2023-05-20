/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/base/ManagedObjectObserver","./shellBar/Search"],function(e,t,r){"use strict";var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");var a=e.extend("sap.f.SearchManager",{metadata:{library:"sap.f",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},placeholder:{type:"string",group:"Misc",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},enabled:{type:"boolean",group:"Behavior",defaultValue:true},enableSuggestions:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{suggestionItems:{type:"sap.m.SuggestionItem",multiple:true,forwarding:{getter:"_getSearchField",aggregation:"suggestionItems"},singularName:"suggestionItem"}},events:{search:{parameters:{query:{type:"string"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{newValue:{type:"string"}}},suggest:{parameters:{suggestValue:{type:"string"}}}}}});a.prototype.init=function(){this.setProperty("placeholder",i.getText("FACETFILTER_SEARCH"),true);this._oConfigObserver=new t(this._synchronizePropertiesWithConfig.bind(this));this._oConfigObserver.observe(this,{properties:Object.keys(this.getMetadata().getProperties())});this._initShellBarManagedSearch()};a.prototype._synchronizePropertiesWithConfig=function(){var e=this._oSearch._getSearchField(),t=e.getMetadata(),r=this.getMetadata(),i,a;Object.keys(r.getAllProperties()).forEach(function(s){i=t.hasProperty(s);if(i){a=r.getProperty(s).get(this);t.getProperty(s).set(e,a)}},this)};a.prototype._initShellBarManagedSearch=function(){if(!this._oSearch){this._oSearch=new r({search:this._onSearch.bind(this),liveChange:this._onLiveChange.bind(this),suggest:this._onSuggest.bind(this)})}};a.prototype.exit=function(){if(this._oConfigObserver){this._oConfigObserver.disconnect();this._oConfigObserver=null}if(this._oSearch){this._oSearch.destroy()}};a.prototype._onLiveChange=function(e){var t=e.getParameters(),r=e.getParameter("newValue");t.id=this.getId();this.setProperty("value",r,true);this.fireLiveChange(t)};a.prototype._onSearch=function(e){var t=e.getParameters();t.id=this.getId();this.fireSearch(t)};a.prototype._onSuggest=function(e){var t=e.getParameters();t.id=this.getId();this.fireSuggest(t)};a.prototype.suggest=function(e){this._getSearchField().suggest(e)};a.prototype._getSearchField=function(){return this._oSearch._getSearchField()};return a});