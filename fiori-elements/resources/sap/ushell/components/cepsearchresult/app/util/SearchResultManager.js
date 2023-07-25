// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/base/assert","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel","sap/ui/base/ManagedObject","sap/ui/integration/util/DataProviderFactory","sap/ushell/components/cepsearchresult/app/util/SearchResultModel","sap/ushell/components/cepsearchresult/app/util/AdvancedFormatters"],function(e,t,o,r,s,a,i,n){"use strict";var l={"/categories":["/title","/shortTitle","/card/title","/card/subTitle","/list/noDataText","/list/loadingDataText"],"/filters":["/label","/description"]};var u=s.extend("sap.ushell.components.cepsearchresult.app.util.SimpleControl",{metadata:{properties:{resolved:{type:"string"}}}});var p=new u;var d=function(e){t(typeof e==="string"&&(e==="standard"||e==="advanced"),"Edition must be a string: 'standard' or 'advanced'");if(!e){e="standard"}this.oDataProviderFactory=new a;this.sEdition=e;this.oModel=null;this.oResourceModel=null;this._createModel(e)};d.mExtensions={};d.prototype.getResourceModel=function(){return this.oResourceModel};d.prototype.getModel=function(){return this.oModel};d.prototype.getResourceModel=function(){return this.oResourceModel};d.prototype.getFilters=function(){return this.getModel().getProperty("/filters")||[]};d.prototype.getCategoriesModel=function(e){if(typeof e==="string"){e.replace(/ /gi,"");e=e.split(",")}if(e.length===1){var t=this.getCategory(e[0]);if(t&&Array.isArray(t.subCategories)){return new o(t.subCategories)}}var r=[];var s=this.getModel().getData();e.forEach(function(e){r.push(s.categoriesMap[e])});return new o(r)};d.prototype.createSearchResultModel=function(e,t,o){var r;var s=o.getData();for(var a=0;a<s.length;a++){if(s[a].name===e){r=new i(JSON.parse(JSON.stringify(s[a])));break}}var l=r.getData();l.list._currentView=l.list._currentView||l.list.defaultView;l._status=l._status||{};l._status.dataStatusText=l.list.loadingDataText;if(l.extension){r.setExtension(new d.mExtensions[l.extension])}if(t){r.setHost(t.getHost());r.setCard(t)}if(l.list&&l.list.data&&l.list.data.destinations){r.setDestinations(l.list.data.destinations)}for(var u in n){r.addFormatters(u,n[u])}return r};d.prototype.getCategory=function(e){return this.getModel().getProperty("/categoriesMap/"+e)};d.prototype._createResourceModel=function(){if(!this.oResourceModel){this.oResourceModel=new r({bundleName:"sap.ushell.components.cepsearchresult.app.util.i18n.i18n"})}};d.prototype._createModel=function(r){t(typeof r==="string"&&(r==="standard"||r==="advanced"),"Edition must be a string: 'standard' or 'advanced'");this._createResourceModel();if(!this.oModel){var s=d._configPath+"/config."+r+".json";this.oModel=new o;this._loaded=this.oModel.loadData(s).then(function(){if(this.oResourceModel){this._translateModel(this.oModel,this.oResourceModel)}this._normalizeCategories();return this._loadExtensions()}.bind(this)).catch(function(){e.error("Could not load search result configuration for "+r+" from "+s,"sap.ushell.components.cepsearchresult.app.util.SearchResultManager")})}else{this._loaded=Promise.resolve()}};d.prototype._loadExtensions=function(){var e=this.oModel.getProperty("/categories");var t=[];var o=[];e.map(function(e){if(e.extension){o.push(e.extension);t.push(e.extension.replace("module:",""))}});if(o.length===0){return Promise.resolve()}return new Promise(function(e){sap.ui.require(t,function(){var t=Array.from(arguments);t.forEach(function(e,t){d.mExtensions[o[t]]=e});e()})})};d.prototype._normalizeCategories=function(){var e=this.oModel.getProperty("/categories");var t={};e.map(function(e){t[e.name]=e});this.oModel.setProperty("/categoriesMap",t);e.map(function(e){var o=e.subCategories;var r=[];if(Array.isArray(o)){for(var s=0;s<o.length;s++){var a=o[s];var i=t[e.subCategories[s].name];if(!i){continue}var n=JSON.parse(JSON.stringify(i));if(a.pageSize&&n.list&&n.list.paginator){n.list.paginator.pageSize=a.pageSize}r.push(n)}e.subCategories=r}})};d.prototype._translateModel=function(e,t){p.setModel(t,"i18n");for(var o in l){var r=e.getProperty(o);if(Array.isArray(r)){for(var s=0;s<r.length;s++){for(var a=0;a<l[o].length;a++){p.applySettings({resolved:e.getProperty(o+"/"+s+l[o][a])});e.setProperty(o+"/"+s+l[o][a],p.getResolved())}}}}p.setModel(null,"i18n")};d.mExtensions={};d._configPath=sap.ui.require.toUrl("sap/ushell/components/cepsearchresult/app/util");return d});