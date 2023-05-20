// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ushell/resources","sap/ushell/library"],function(t,e,i){"use strict";var a=i.AllMyAppsProviderType;var r=function(){};r.prototype.loadAppsData=function(t,e,i){return sap.ushell.Container.getServiceAsync("AllMyApps").then(function(a){this.oPopover=e;if(!a.isEnabled()){return}this.iNumberOfProviders=0;this.oModel=t;if(a.isHomePageAppsEnabled()){this._handleGroupsData()}if(a.isExternalProviderAppsEnabled()){this._handleExternalProvidersData(t)}if(a.isCatalogAppsEnabled()){this._handleCatalogs(i)}if(!a.isCatalogAppsEnabled()||a.isCatalogAppsEnabled()&&i){var r=sap.ui.getCore().getEventBus();r.publish("launchpad","allMyAppsMasterLoaded")}}.bind(this))};r.prototype._handleGroupsData=function(){var t=this._getGroupsData();var i={title:e.i18n.getText("allMyApps_homeEntryTitle")};var r;return new Promise(function(e,i){t.done(e).fail(i)}).then(function(t){i.groups=t;i.type=a.HOME;if(t.length===0){return}r=this.oModel.getProperty("/AppsData");if(r){var e=this._getIndexByType(r,i.type);if(e!==undefined){r[e]=i}else{r.unshift(i)}}this.oModel.setProperty("/AppsData",r);this.iNumberOfProviders+=1}.bind(this))};r.prototype._getIndexByType=function(t,e){if(t.length<=0){return 0}for(var i=0;i<t.length;i++){if(t[i].type===e){return i}}};r.prototype._getGroupsData=function(){var e=new t.Deferred;sap.ushell.Container.getServiceAsync("LaunchPage").then(function(t){return Promise.all([t.getDefaultGroup(),t.getGroups()])}).then(function(t){this.oDefaultGroup=t[0];var e=t[1];var i=[];e.forEach(function(t){i.push(this._getFormattedGroup(t))}.bind(this));return Promise.all(i)}.bind(this)).then(function(t){var i=t.filter(function(t){return t&&(t.apps.length>0||t.numberCustomTiles>0)});e.resolve(i)});return e.promise()};r.prototype._getFormattedGroup=function(t){var i;var a;var r;return sap.ushell.Container.getServiceAsync("LaunchPage").then(function(s){if(s.isGroupVisible(t)===false){return}if(s.getGroupId(t)===s.getGroupId(this.oDefaultGroup)){a=e.i18n.getText("my_group")}else{a=s.getGroupTitle(t)}i={};i.title=a;i.apps=[];r=s.getGroupTiles(t);return this._getFormattedGroupApps(r)}.bind(this)).then(function(t){if(!t){return}i.apps=t.aFormattedApps;i.numberCustomTiles=t.iNumberOfCustomTiles;if(t.iNumberOfCustomTiles===1){i.sCustomLabel=e.i18n.getText("allMyApps_customStringSingle");i.sCustomLink=e.i18n.getText("allMyApps_customLinkHomePageSingle")}else{i.sCustomLabel=e.i18n.getText("allMyApps_customString",[t.iNumberOfCustomTiles]);i.sCustomLink=e.i18n.getText("allMyApps_customLinkHomePage")}i.handlePress=this._onHandleGroupPress;return i}.bind(this))};r.prototype._getFormattedGroupApps=function(t){var e=[];var i=0;return sap.ushell.Container.getServiceAsync("LaunchPage").then(function(a){var r=[];t.forEach(function(t){if(a.isTileIntentSupported(t)){var s=this._getAppEntityFromTile(t).then(function(t){if(t){e.push(t)}else{i++}});r.push(s)}}.bind(this));return Promise.all(r)}.bind(this)).then(function(){return{iNumberOfCustomTiles:i,aFormattedApps:e}})};r.prototype._onHandleGroupPress=function(t,e){window.hasher.setHash("#Shell-home");this.oPopover.close();var i=sap.ui.getCore().getEventBus();i.subscribe("launchpad","dashboardModelContentLoaded",function(){i.publish("launchpad","scrollToGroupByName",{groupName:e.title,isInEditTitle:false})},this);i.publish("launchpad","scrollToGroupByName",{groupName:e.title,isInEditTitle:false})};r.prototype._handleExternalProvidersData=function(){var t=this;return sap.ushell.Container.getServiceAsync("AllMyApps").then(function(e){var i=e.getDataProviders();var r=Object.keys(i);var s;var o;var n;var l;var p;var u;if(r.length>0){for(p=0;p<r.length;p++){s=r[p];o=i[s];n=o.getTitle();l={};l.title=n;u=o.getData();u.done(function(e){if(e&&e.length>0){this.groups=e;this.type=a.EXTERNAL;t.oModel.setProperty("/AppsData/"+t.iNumberOfProviders,this);t.iNumberOfProviders+=1;var i=sap.ui.getCore().getEventBus();i.publish("launchpad","allMyAppsMasterLoaded")}}.bind(l))}}})};r.prototype._handleNotFirstCatalogsLoad=function(){var t=this.oModel.getProperty("/AppsData");var e=a.CATALOG;if(t.length&&t[t.length-1].type===e){this.bFirstCatalogLoaded=true;sap.ui.getCore().getEventBus().publish("launchpad","allMyAppsFirstCatalogLoaded",{bFirstCatalogLoadedEvent:true})}};r.prototype._handleCatalogs=function(i){if(!i){this._handleNotFirstCatalogsLoad();return Promise.resolve()}this.bFirstCatalogLoaded=false;this.aPromises=[];return sap.ushell.Container.getServiceAsync("LaunchPage").then(function(i){i.getCatalogs().done(function(){t.when.apply(t,this.aPromises).then(this._onDoneLoadingCatalogs.bind(this))}.bind(this)).fail(function(){this._onGetCatalogsFail(e.i18n.getText("fail_to_load_catalog_msg"))}.bind(this)).progress(this._addCatalogToModel.bind(this))}.bind(this))};r.prototype._addCatalogToModel=function(t){var i;var r={apps:[],numberCustomTiles:0,type:null};var s;var o=[sap.ushell.Container.getServiceAsync("LaunchPage")];if(this._oAddCatalogToModelPromise){o.push(this._oAddCatalogToModelPromise)}this._oAddCatalogToModelPromise=Promise.all(o).then(function(e){i=e[0];r.type=a.CATALOG;var s=i.getCatalogTiles(t);this.aPromises.push(s);return s}.bind(this)).then(function(e){var o;if(e.length===0){return}var n=i.getCatalogTitle(t);o=this.oModel.getProperty("/AppsData");for(s=0;s<o.length;s++){if(o[s].type===a.CATALOG&&o[s].title===n){r=o[s];break}}r.title=i.getCatalogTitle(t);return this._getFormattedGroupApps(e)}.bind(this)).then(function(t){if(!t){return}Array.prototype.push.apply(r.apps,t.aFormattedApps);r.numberCustomTiles=t.iNumberOfCustomTiles;if(r.numberCustomTiles===1){r.sCustomLabel=e.i18n.getText("allMyApps_customStringSingle");r.sCustomLink=e.i18n.getText("allMyApps_customLinkAppFinderSingle")}else{r.sCustomLabel=e.i18n.getText("allMyApps_customString",[r.numberCustomTiles]);r.sCustomLink=e.i18n.getText("allMyApps_customLinkAppFinder")}r.handlePress=function(t,e){this.oPopover.close();window.hasher.setHash("#Shell-home&/appFinder/catalog/"+JSON.stringify({catalogSelector:e.title,tileFilter:"",tagFilter:"[]",targetGroup:""}))}.bind(this);if(r.apps.length>0||r.numberCustomTiles>0){this.oModel.setProperty("/AppsData/"+s,r);if(this.bFirstCatalogLoaded===false){sap.ui.getCore().getEventBus().publish("launchpad","allMyAppsFirstCatalogLoaded",{bFirstCatalogLoadedEvent:true});this.bFirstCatalogLoaded=true}this.iNumberOfProviders+=1}}.bind(this));return this._oAddCatalogToModelPromise};r.prototype._onGetCatalogsFail=function(t){return sap.ushell.Container.getServiceAsync("Message").then(function(e){e.info(t)})};r.prototype._onDoneLoadingCatalogs=function(){var t=this.oModel.getProperty("/AppsData");t.sort(function(t,e){var i=t.title.toUpperCase();var a=e.title.toUpperCase();if(i<a){return-1}if(i>a){return 1}return 0});this.oModel.setProperty("/AppsData",t);var e=sap.ui.getCore().getEventBus();if(!this.bFirstCatalogLoaded){e.publish("launchpad","allMyAppsNoCatalogsLoaded")}};r.prototype._getAppEntityFromTile=function(t){return sap.ushell.Container.getServiceAsync("LaunchPage").then(function(e){var i;var a=e.getCatalogTilePreviewTitle(t);var r=e.getCatalogTilePreviewSubtitle(t);var s=e.getCatalogTileTargetURL(t);if(s&&(a||r)){i={};i.url=s;if(a){i.title=a;i.subTitle=r}else{i.title=r}return i}})};return new r},true);