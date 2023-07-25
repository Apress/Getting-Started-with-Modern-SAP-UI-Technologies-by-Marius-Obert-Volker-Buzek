// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/library","sap/ui/core/mvc/Controller","sap/ushell/components/tiles/utils","sap/ushell/components/applicationIntegration/AppLifeCycle","sap/ushell/Config","sap/ushell/utils/WindowUtils","sap/m/library","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/base/Log","sap/ushell/utils/DynamicTileRequest","sap/ushell/utils/UrlParsing","sap/ushell/utils"],function(e,t,i,a,r,s,n,o,l,g,p,u,c){"use strict";var f=n.GenericTileScope;var d=n.GenericTileMode;var _=e.AppType;var v="sap.ushell.components.tiles.applauncherdynamic.DynamicTile";return t.extend(v,{_aDoables:[],oDataRequest:null,sConfigNavigationTargetUrlOld:"",REFRESH_INTERVAL_MIN:10,constructTargetUrlWithSapSystem:function(e,t){var i;if(t){if(u.isIntentUrl(e)){i=u.parseShellHash(e);if(!i.params){i.params={}}i.params["sap-system"]=t;e="#"+u.constructShellHash(i)}else{e+=(e.indexOf("?")<0?"?":"&")+"sap-system="+t}}return e},onInit:function(){var e=this;var t=this.getView();var s=t.getViewData();var n=s.chip;var l=i.getAppLauncherConfig(n,n.configurationUi.isEnabled(),false);var p=l.navigation_target_url;var u=n.url.getApplicationSystem();this.sConfigNavigationTargetUrlOld=l.navigation_target_url;g.setLevel(2,v);this.bIsRequestCompleted=false;this.oShellModel=a.getElementsModel();this.navigationTargetUrl=this.constructTargetUrlWithSapSystem(p,u);var c=new o({sizeBehavior:r.last("/core/home/sizeBehavior"),wrappingType:r.last("/core/home/wrappingType"),config:l,mode:l.display_mode||d.ContentMode,data:i.getDataToDisplay(l,{number:n.preview&&n.preview.isEnabled()?1234:"..."}),nav:{navigation_target_url:n.configurationUi&&n.configurationUi.isEnabled()?"":this.navigationTargetUrl},search:{display_highlight_terms:[]}});t.setModel(c);this._aDoables.push(r.on("/core/home/sizeBehavior").do(function(e){c.setProperty("/sizeBehavior",e)}));if(n.types){n.types.attachSetType(function(t){if(e.tileType!==t){if(t==="link"){c.setProperty("/mode",d.LineMode)}else{c.setProperty("/mode",c.getProperty("/config/display_mode")||d.ContentMode)}e.tileType=t}})}if(!this.tileType){this.tileType="tile"}if(n.search){var f=t.getModel().getProperty("/config/display_search_keywords");var _=f.split(/[, ]+/).filter(function(e,t){return e&&e!==""});if(l.display_title_text&&l.display_title_text!==""&&_.indexOf(l.display_title_text)===-1){_.push(l.display_title_text)}if(l.display_subtitle_text&&l.display_subtitle_text!==""&&_.indexOf(l.display_subtitle_text)===-1){_.push(l.display_subtitle_text)}if(l.display_info_text&&l.display_info_text!==""&&_.indexOf(l.display_info_text)===-1){_.push(l.display_info_text)}if(l.display_number_unit&&l.display_number_unit!==""&&_.indexOf(l.display_number_unit)===-1){_.push(l.display_number_unit)}n.search.setKeywords(_);n.search.attachHighlight(function(e){t.getModel().setProperty("/search/display_highlight_terms",e)})}if(n.bag&&n.bag.attachBagsUpdated){n.bag.attachBagsUpdated(function(e){if(e.indexOf("tileProperties")>-1){i._updateTilePropertiesTexts(t,n.bag.getBag("tileProperties"))}})}if(n.configuration&&n.configuration.attachConfigurationUpdated){n.configuration.attachConfigurationUpdated(function(e){if(e.indexOf("tileConfiguration")>-1){i._updateTileConfiguration(t,n.configuration.getParameterValueAsString("tileConfiguration"))}})}if(n.preview){n.preview.setTargetUrl(this.navigationTargetUrl);n.preview.setPreviewIcon(l.display_icon_url);n.preview.setPreviewTitle(l.display_title_text);if(n.preview.setPreviewSubtitle&&typeof n.preview.setPreviewSubtitle==="function"){n.preview.setPreviewSubtitle(l.display_subtitle_text)}}if(n.configurationUi.isEnabled()){n.configurationUi.setAsyncUiProvider(function(){return i.getConfigurationUi(t,"sap.ushell.components.tiles.applauncherdynamic.Configuration").then(function(t){n.configurationUi.attachCancel(e.onCancelConfiguration.bind(null,t));n.configurationUi.attachSave(e.onSaveConfiguration.bind(null,t));return t})});this.getView().getContent()[0].setTooltip(i.getResourceBundleModel().getResourceBundle().getText("edit_configuration.tooltip"))}else if(!n.preview||!n.preview.isEnabled()){if(!u){sap.ushell.Container.addRemoteSystemForServiceUrl(l.service_url)}this.bNeedsRefresh=true;this.iNrOfTimerRunning=0}if(n.refresh){n.refresh.attachRefresh(this.refreshHandler.bind(this))}if(n.visible){n.visible.attachVisible(this.visibleHandler.bind(this))}if(n.actions){var h;var y=l.actions;if(y){h=y.slice()}else{h=[]}if(r.last("/core/shell/enablePersonalization")){var b=c.getProperty("/mode")===d.LineMode?"link":"tile";var m=i.getTileSettingsAction(c,this.onSaveRuntimeSettings.bind(this),b);h.push(m)}n.actions.setActionsProvider(function(){return h})}sap.ui.getCore().getEventBus().subscribe("launchpad","sessionTimeout",this._clearRequest,this)},stopRequests:function(){if(this.oDataRequest){if(this.oDataRequest.abort()){this.bNeedsRefresh=true}}},_clearRequest:function(){this.stopRequests();clearTimeout(this.timer)},onExit:function(){if(this.oDataRequest){this._clearRequest();this.oDataRequest.destroy()}sap.ui.getCore().getEventBus().unsubscribe("launchpad","sessionTimeout",this._clearRequest,this);this._aDoables.forEach(function(e){e.off()});this._aDoables=[]},onPress:function(e){var t=this.getView();var i=t.getViewData();var a=t.getModel();var n=a.getProperty("/nav/navigation_target_url");var o=i.chip;var l=a.getProperty("/config");if(e.getSource().getScope&&e.getSource().getScope()===f.Display){if(o.configurationUi.isEnabled()){o.configurationUi.display()}else if(n){if(n[0]==="#"){hasher.setHash(n)}else{var g=r.last("/core/shell/enableRecentActivity")&&r.last("/core/shell/enableRecentActivityLogging");if(g){var p={title:l.display_title_text,appType:_.URL,url:l.navigation_target_url,appId:l.navigation_target_url};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(p)}s.openURL(n,"_blank")}}}},onSaveRuntimeSettings:function(e){var t=this.getView();var i=t.getModel();var a=t.getViewData().chip;var r=i.getProperty("/config");var s=e.getModel();r.display_title_text=s.getProperty("/title")||"";r.display_subtitle_text=s.getProperty("/subtitle")||"";r.display_info_text=s.getProperty("/info")||"";r.display_search_keywords=s.getProperty("/keywords")||"";var n=a.bag.getBag("tileProperties");n.setText("display_title_text",r.display_title_text);n.setText("display_subtitle_text",r.display_subtitle_text);n.setText("display_info_text",r.display_info_text);n.setText("display_search_keywords",r.display_search_keywords);function o(e){g.error(e,null,v)}n.save(function(){g.debug("property bag 'tileProperties' saved successfully");i.setProperty("/config",r);i.setProperty("/data/display_title_text",r.display_title_text);i.setProperty("/data/display_subtitle_text",r.display_subtitle_text);i.setProperty("/data/display_info_text",r.display_info_text);i.refresh()},o)},onSaveConfiguration:function(e){var t=new l.Deferred;var a=e.getModel();var r=a.getProperty("/tileModel");var s=e.getViewData().chip;var n=i.tileActionsRows2TileActionsArray(a.getProperty("/config/tile_actions_rows"));var p={display_icon_url:a.getProperty("/config/display_icon_url"),display_number_unit:a.getProperty("/config/display_number_unit"),service_url:a.getProperty("/config/service_url"),service_refresh_interval:a.getProperty("/config/service_refresh_interval"),navigation_use_semantic_object:a.getProperty("/config/navigation_use_semantic_object"),navigation_target_url:a.getProperty("/config/navigation_target_url"),navigation_semantic_object:(a.getProperty("/config/navigation_semantic_object")||"").trim(),navigation_semantic_action:(a.getProperty("/config/navigation_semantic_action")||"").trim(),navigation_semantic_parameters:(a.getProperty("/config/navigation_semantic_parameters")||"").trim(),display_search_keywords:a.getProperty("/config/display_search_keywords")};var u=i.checkInputOnSaveConfig(e);if(!u){u=i.checkTileActions(e)}if(u){t.reject("mandatory_fields_missing");return t.promise()}if(p.navigation_use_semantic_object){p.navigation_target_url=i.getSemanticNavigationUrl(p);a.setProperty("/config/navigation_target_url",p.navigation_target_url)}var c=s.bag.getBag("tileProperties");c.setText("display_title_text",a.getProperty("/config/display_title_text"));c.setText("display_subtitle_text",a.getProperty("/config/display_subtitle_text"));c.setText("display_info_text",a.getProperty("/config/display_info_text"));c.setText("display_search_keywords",p.display_search_keywords);var f=s.bag.getBag("tileNavigationActions");i.populateTileNavigationActionsBag(f,n);function d(e,i){g.error(e,null,v);t.reject(e,i)}s.writeConfiguration.setParameterValues({tileConfiguration:JSON.stringify(p)},function(){var a=i.getAppLauncherConfig(s,false,false);var n=i.getAppLauncherConfig(s,true,false);var l=new o({config:a,tileModel:r});e.setModel(l);r.setData({data:n,nav:{navigation_target_url:""}},false);if(s.preview){s.preview.setTargetUrl(a.navigation_target_url);s.preview.setPreviewIcon(a.display_icon_url);s.preview.setPreviewTitle(a.display_title_text);if(s.preview.setPreviewSubtitle&&typeof s.preview.setPreviewSubtitle==="function"){s.preview.setPreviewSubtitle(a.display_subtitle_text)}}c.save(function(){g.debug("property bag 'tileProperties' saved successfully");if(s.title){s.title.setTitle(a.display_title_text,function(){t.resolve()},d)}else{t.resolve()}},d);f.save(function(){g.debug("property bag 'navigationProperties' saved successfully")},d)},d);return t.promise()},successHandlerFn:function(e){var t=this.getView();var a=t.getModel();var r=a.getProperty("/config");var s=a.getProperty("/config/navigation_target_url");var n=a.getProperty("/config/service_refresh_interval");var o=a.getProperty("/config/service_url");var l=t.getViewData();var p=l.chip;var u=p.url.getApplicationSystem();if(l.properties&&l.properties.info){if(typeof e==="object"){e.info=l.properties.info}}var c=i.getDataToDisplay(r,e);a.setProperty("/data",c);if(this.sConfigNavigationTargetUrlOld!==s){this.navigationTargetUrl=this.constructTargetUrlWithSapSystem(s,u);this.sConfigNavigationTargetUrlOld=this.navigationTargetUrl}a.setProperty("/nav/navigation_target_url",i.addParamsToUrl(this.navigationTargetUrl,c));if(n>0){n=Math.max(n,this.REFRESH_INTERVAL_MIN);g.info("Wait "+n+" seconds before calling "+o+" again",null,v);this.refeshAfterInterval(n)}},errorHandlerFn:function(e,t){var i=this.getView();var a=i.getModel();var r=a.getProperty("/config/service_url");var s=e&&e.message?e.message:e;if(e.statusText==="Abort"||e.aborted===true){g.info("Data request from service "+r+" was aborted",null,v)}else{if(e.response){s+=" - "+e.response.statusCode+" "+e.response.statusText}var n=t?g.warning:g.error;n("Failed to update data via service\n service URL: "+r+"\n "+s,null,v);this._setTileIntoErrorState()}},_setTileIntoErrorState:function(){var e=i.getResourceBundleModel().getResourceBundle();var t=this.getView().getModel();var a=t.getProperty("/config");t.setProperty("/data",i.getDataToDisplay(a,{number:"???",info:e.getText("dynamic_data.error"),infoState:"Critical"}))},onCancelConfiguration:function(e){var t=e.getViewData();var a=e.getModel();var r=a.getProperty("/tileModel");var s=t.chip;var n=i.getAppLauncherConfig(s,false,false);a.setData({config:n,tileModel:r},false)},loadData:function(){var e=this.getView();var t=e.getViewData().chip;var i=e.getModel();var a=i.getProperty("/config/service_url");if(/;o=([;/?]|$)/.test(a)){a=t.url.addSystemToServiceUrl(a)}if(!a){g.error("No service URL given!",v);this._setTileIntoErrorState();return}if(!this.oDataRequest||this.oDataRequest.sUrl!==a){if(this.oDataRequest){this.oDataRequest.destroy()}this.sRequestUrl=a;var r={dataSource:i.getProperty("/config/data_source")};this.oDataRequest=new p(a,this.successHandlerFn.bind(this),this.errorHandlerFn.bind(this),"",r)}else if(this.oDataRequest){this.oDataRequest.refresh()}},refreshTile:function(){var e=this.getView();var t=e.getViewData();var i=t.chip.visible.isVisible();if(i&&this.bNeedsRefresh){this.bNeedsRefresh=false;this.loadData()}},refeshAfterInterval:function(e){this.iNrOfTimerRunning++;this.timer=window.setTimeout(function(){this.iNrOfTimerRunning--;if(this.iNrOfTimerRunning===0){this.bNeedsRefresh=true;this.refreshTile()}}.bind(this),c.sanitizeTimeoutDelay(e*1e3))},refreshHandler:function(){this.bNeedsRefresh=true;this.refreshTile()},visibleHandler:function(e){if(e){this.refreshTile()}else{this.stopRequests()}},formatters:{leanURL:s.getLeanURL.bind(s)}})});