// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/model/json/JSONModel","sap/suite/ui/commons/library"],function(e,t){"use strict";var a=t.InfoTileValueColor;var i=t.InfoTileSize;var r=t.LoadState;sap.ui.controller("tiles.indicatorHarveyBall.HarveyBallTile",{onInit:function(){this.getView().setModel(new e);this.initializeVariables();this.attachHandlers();this.getVariable("tile").setState(r.Loading);this.readChipConfiguration()},attachHandlers:function(){var e=this;var t=this.getVariable("chip");if(t.visible){t.visible.attachVisible(function(t){if(t){e.onVisible()}else{e.abortAllOpenODataRequests()}})}this.getVariable("tile").attachPress(function(){e.abortAllOpenODataRequests();var t=e.getVariable("indicatorUtils");e.getVariable("cache").setKpivalueById(e.getVariable("chipId"),null);window.location.hash=t.getNavigationTarget(e.getVariable("evalData"),e.getVariable("system"))})},initializeVariables:function(){this._variables={};this._oDataRequests={};var e=this.getView();var t=e.getViewData();var a=e.oTile;var i=t.chip;this.setVariable("indicatorUtils",sap.ushell.components.tiles.indicatorTileUtils.util);this.setVariable("cache",sap.ushell.components.tiles.indicatorTileUtils.cache);this.setVariable("hasAppeared",false);this.setVariable("chip",i);this.setVariable("tile",a);this.setVariable("tileControl",a.getTileContent()[0].getContent());this.setVariable("configurationString",i.configuration.getParameterValueAsString("tileConfiguration"));this.setVariable("system",i.url.getApplicationSystem())},getVariable:function(e){return this._variables[e]},setVariable:function(e,t){this._variables[e]=t},readChipConfiguration:function(){var e=this;var t=this.getVariable("chip");var a=this.getVariable("indicatorUtils");a.getParsedChip(this.getVariable("configurationString"),function(i){e.setVariable("evalData",i);e.setVariable("chipId",i.TILE_PROPERTIES.id);e.setVariable("tileProperties",i.TILE_PROPERTIES);if(t.preview){t.preview.setTargetUrl(a.getNavigationTarget(i,e.getVariable("system")));e.loadPreviewData();if(t.preview.isEnabled()){e.getVariable("tile").setState(r.Loaded)}else{e.loadActualData()}}})},loadPreviewData:function(){var e=this.getVariable("indicatorUtils").getTileTitleSubtitle(this.getVariable("chip"));this.getView().getModel().setData({fractionValue:34,value:100,size:i.Auto,frameType:"OneByOne",color:"Good",state:r.Loading,header:e.title||this.getVariable("indicatorUtils").getChipTitle(this.getVariable("evalData")),subheader:e.subTitle||this.getVariable("indicatorUtils").getChipSubTitle(this.getVariable("evalData"))})},loadActualData:function(){if(Number(this.getVariable("chip").configuration.getParameterValueAsString("isSufficient"))){this.getVariable("cache").setEvaluationById(this.getVariable("chipId"),this.getVariable("evalData"));this.onEvalFiltersFetched()}else{this.fetchEvalFilters(this.onEvalFiltersFetched)}},registerOpenODataRequest:function(e,t){this._oDataRequests[e]=t},deregisterOpenODataRequest:function(e){delete this._oDataRequests[e]},abortAllOpenODataRequests:function(){for(var e in this._oDataRequests){try{this.getVariable("indicatorUtils").abortPendingODataCalls(this._oDataRequests[e]);delete this._oDataRequests[e]}catch(e){}}},fetchKpiValue:function(e){function t(e,t,i,r,l){var s=e.read(t,null,null,true,function(e){a.deregisterOpenODataRequest(i.type);if(e&&e.results&&e.results.length){try{if(i.thresholds&&i.thresholds.length){a._setThresholdValues(e.results[0])}b[i.type]=e.results[0][i.measure];b.unit=b.unit||e.results[0][i.unit]||"";if(--v==0){a.getVariable("cache").setKpivalueById(a.getVariable("chipId"),b);r.call(a,b)}}catch(e){a.logError(e)}}else{l.call(a,"no data")}},function(e){a.deregisterOpenODataRequest(i.type);if(e&&e.response){l.call(a,e.message)}});a.registerOpenODataRequest(i.type,s)}var a=this;var i=this.getVariable("indicatorUtils");var r=this.getVariable("cache").getKpivalueById(this.getVariable("chipId"));if(r){e.fnS.call(a,r)}else{var l=e.measure1,s=e.measure2;var o=e.url,n=e.entitySet;var h=e.filters;var u=e.fractionFilters.concat(h);var c,V;var g,f,b;var v=2;u.forEach(function(e){e.value=e.value+"";e.valueTo=e.valueTo+""});if(e.thresholds&&e.thresholds.length){c=i.prepareQueryServiceUri(this.getVariable("chip").url.addSystemToServiceUrl(o),n,l+","+e.thresholds,null,h)}else{c=i.prepareQueryServiceUri(this.getVariable("chip").url.addSystemToServiceUrl(o),n,l,null,h)}V=i.prepareQueryServiceUri(this.getVariable("chip").url.addSystemToServiceUrl(o),n,s,null,u);g=c.unit[0];f=V.unit[0];b={kpiValue:null,fractionValue:null,unit:""};if(c){t(c.model,c.uri,{measure:l,type:"kpiValue",unit:g,thresholds:e.thresholds},e.fnS,e.fnE)}if(V){t(V.model,V.uri,{measure:s,type:"fractionValue",unit:f},e.fnS,e.fnE)}if(!(c&&V)){e.fnE.call(a,"Error Preparing Query Service URI")}}},_setThresholdValues:function(e){var t=this.getVariable("oThreshold"),a;if(t){if(this.getVariable("evalData").EVALUATION.VALUES_SOURCE=="RELATIVE"){if(t.TA.COLUMN_NAME){t.TA.VALUE=parseFloat(e[t.TA.COLUMN_NAME]);for(a in t){if(!t[a].COLUMN_NAME){t[a].VALUE=t.TA.VALUE*t[a].VALUE/100}}}}else{for(a in t){if(t[a].COLUMN_NAME){t[a].VALUE=parseFloat(e[t[a].COLUMN_NAME])}}}}this.setVariable("oThreshold",t)},getThresholdObject:function(){var e=this.getVariable("oThreshold");if(!e){var t=this.getVariable("evalData").EVALUATION_VALUES;e={};for(var a=0,i=t.length;a<i;a++){e[t[a].TYPE]={VALUE:parseFloat(t[a].FIXED),COLUMN_NAME:t[a].COLUMN_NAME}}this.setVariable("oThreshold",e)}return e},hasSomeValue:function(){var e=true;if(arguments.length){for(var t=0,a=arguments.length;t<a;t++){if(!(arguments[t]||arguments[t]=="0")){e=false;break}}}else{e=false}return e},getTrendColor:function(e){var t="Neutral";var i,r,l,s,o,n;if(this.getVariable("tileProperties").isFractionMeasure){i=this.getThresholdObject();r=this.getVariable("evalData").EVALUATION.GOAL_TYPE;if(r=="MA"){l=i.WL;o=i.CL;if(this.hasSomeValue(l,o)){t="Good";if(e<o.VALUE){t="Error"}else if(e<=l.VALUE){t="Critical"}}}else if(r=="MI"){s=i.WH;n=i.CH;if(this.hasSomeValue(s,n)){t="Error";if(e<s.VALUE){t="Good"}else if(e<=n.VALUE){t="Critical"}}}else{l=i.WL;o=i.CL;s=i.WH;n=i.CH;if(this.hasSomeValue(s,n,o,l)){if(e<=o.VALUE||e>=s.VALUE){t="Error"}else if(l.VALUE>=e&&e>=o.VALUE||n.VALUE>=e&&e>=s.VALUE){t="Critical"}else{t="Good"}}}}return a[t]},_getThresholdMeasures:function(){var e=[];var t=this.getThresholdObject();for(var a in t){if(t[a].COLUMN_NAME){e.push(t[a].COLUMN_NAME)}}return e},onEvalFiltersFetched:function(){var e=this;if(this.getVariable("chip").visible.isVisible()&&!this.getVariable("hasAppeared")){try{var t=this.getVariable("evalData");var a=t.EVALUATION.ODATA_URL;var i=t.EVALUATION.ODATA_ENTITYSET;var r=this.getVariable("tileProperties");var l=[];var s=this.getVariable("indicatorUtils").prepareFilterStructure(t.EVALUATION_FILTERS,t.ADDITIONAL_FILTERS);var o=t.EVALUATION.COLUMN_NAME;var n=o;var h=[];if(r.isFractionMeasure){n=r.harveyTotalMeasure;h=this._getThresholdMeasures()}else{l=this.getVariable("indicatorUtils").prepareFilterStructure(r.harveyFilters||l)}this.setVariable("totalMeasure",n);this.setVariable("fractionMeasure",o);this.fetchKpiValue({measure1:n,measure2:o,entitySet:i,thresholds:h,url:a,filters:s,fractionFilters:l,fnS:function(t){t.kpiValue=Number(t.kpiValue);t.fractionValue=Number(t.fractionValue);e.setVariable("kpiValue",t.kpiValue);e.setVariable("fractionValue",t.fractionValue);e.onKpiValueFetched(t.kpiValue,t.unit,t.fractionValue)},fnE:this.logError});e.setVariable("hasAppeared",true)}catch(e){this.logError(e)}}},fetchEvalFilters:function(e){var t=this;try{var a=this.getVariable("cache").getEvaluationById(this.getVariable("chipId"));if(a){this.getVariable("evalData").EVALUATION_FILTERS=a.EVALUATION_FILTERS;e()}else{var i=this.getVariable("indicatorUtils").getFilterFromRunTimeService(this.getVariable("evalData"),function(a){t.deregisterOpenODataRequest("kpiFilterRequest");t.getVariable("evalData").EVALUATION_FILTERS=a;t.getVariable("cache").setEvaluationById(t.getVariable("chipId"),t.getVariable("evalData"));e.call(t)},function(e){this.logError(e);t.deregisterOpenODataRequest("kpiFilterRequest")});this.registerOpenODataRequest("kpiFilterRequest",i)}}catch(e){this.logError(e)}},onKpiValueFetched:function(e,t,a,i){var l=this.getVariable("indicatorUtils");var s=e;var o=a;var n=this.getVariable("evalData");var h=n.EVALUATION.SCALING;if(h==-2){s*=100;o*=100}var u=this.isACurrencyMeasure(this.getVariable("totalMeasure"));s=l.getLocaleFormattedValue(Number(s),h,null,u,t);u=this.isACurrencyMeasure(this.getVariable("fractionMeasure"));o=l.getLocaleFormattedValue(Number(o),h,null,u,t);this.getView().getModel().setProperty("/totalLabel",s+" "+t);this.getView().getModel().setProperty("/fractionLabel",o+" "+i);this.getView().getModel().setProperty("/color",this.getTrendColor(a));this.getView().getModel().setProperty("/value",e);this.getView().getModel().setProperty("/fractionValue",a);var c=l.getNavigationTarget(this.getVariable("evalData"),this.getVariable("system"));this.getVariable("tile").$().wrap("<a href ='"+c+"'></a>");this.getVariable("tile").setState(r.Loaded)},logError:function(e){this.getVariable("tile").setState(r.Failed);this.getVariable("indicatorUtils").logError(e,this.getVariable("tile"))},onVisible:function(){if(!this.getVariable("hasAppeared")){if(Number(this.getVariable("chip").configuration.getParameterValueAsString("isSufficient"))){this.onEvalFiltersFetched()}else{this.fetchEvalFilters(this.onEvalFiltersFetched)}}},onExit:function(){this.abortAllOpenODataRequests()}})});