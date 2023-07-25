// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/analytics/odata4analytics","sap/ushell/components/tiles/indicatorTileUtils/smartBusinessUtil","sap/ushell/components/tiles/sbtilecontent","sap/m/library","sap/ui/core/format/DateFormat","sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/base/Log"],function(e,i,t,l,a,s,o,n,r,u){"use strict";var c=a.DeviationIndicator;var T=a.ValueColor;var h=a.FrameType;var g=a.LoadState;var p=e.extend("sap.ushell.components.tiles.generic",{getTile:function(){return this.oKpiTileView.oGenericTile},_updateTileModel:function(e){var i=this.getTile().getModel().getData();r.extend(i,e);this.getTile().getModel().setData(i)},logError:function(e){this._updateTileModel({value:"",scale:"",unit:""});u.error(e);if(this.getView().getViewData().deferredObj){this.getView().getViewData().deferredObj.reject()}else{this.oKpiTileView.oGenericTile.setState(g.Failed)}},getKeyForCallCheck:function(){if(this.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){return this.oConfig.TILE_PROPERTIES.id+"left"}return this.oConfig.TILE_PROPERTIES.id+"right"},getRelativeTime:function(){var e=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate(),i;if(r.type(this.cacheTime)=="date"){i=this.cacheTime}else{i=new Date(parseInt(this.cacheTime.substr(6),10))}var t=sap.ushell.components.tiles.indicatorTileUtils.util.getTimeDifference(e-i),l,a;switch(t.unit){case"minutes":a=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(t.time,"minutes");e=e-a;l=new Date(e);break;case"hours":a=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(t.time,"hours");e=e-a;l=new Date(e);break;case"days":a=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(t.time,"days");e=e-a;l=new Date(e);break}return l},setTimeStamp:function(){this.updateTimeStampjobScheduled=false;var e=s.getDateTimeInstance({relative:true,relativeSource:"auto",style:"short"});var i=e.format(this.getRelativeTime());this.oKpiTileView.oNVConfS.setRefreshOption(true);this.oKpiTileView.oNVConfS.setTimestamp(i);this.updateTimeStampjobScheduled=false;var t=this.oConfig.TILE_PROPERTIES.id+"time";var l=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(t);if(l){clearTimeout(l);l=undefined}sap.ushell.components.tiles.indicatorTileUtils.util.scheduleTimeStampJob.call(this,this.oTileApi.visible.isVisible())},isACurrencyMeasure:function(e){var i=this.DEFINITION_DATA.EVALUATION.ODATA_ENTITYSET;return sap.ushell.components.tiles.indicatorTileUtils.util.getFormattingMetadata(this.oRunTimeODataModel,i,e)._hasCurrency},isCurrencyMeasure:function(e){var i=this;var t=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(i.oConfig.TILE_PROPERTIES.id);if(t&&t.Data){var l=t.Data&&JSON.parse(t.Data);if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(i.oConfig)){if(i.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){l=l.leftData}else{l=l.rightData}}if(i.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatorcomparison.ComparisonTile"||i.oConfig.TILE_PROPERTIES.tileType==="CM"){if(l&&l.data&&l.data.length){for(var a=0;a<l.data.length;a++){if(l.data[a]&&l.data[a].measure==e){if(r.type(l.data[a].isCurM)=="boolean"){return l.data[a].isCurM}return i.isACurrencyMeasure(e)}return i.isACurrencyMeasure(e)}}else{return i.isACurrencyMeasure(e)}}if(l&&r.type(l.isCurM)=="boolean"){return l.isCurM}return i.isACurrencyMeasure(e)}return i.isACurrencyMeasure(e)},formSelectStatement:function(e){var i=Object.keys(e);var t="";for(var l=0;l<i.length;l++){if(e[i[l]]!==undefined&&e.fullyFormedMeasure){t=t+","+e[i[l]]}}return t},setThresholdValues:function(){var e=this;try{var i={};i.fullyFormedMeasure=this.DEFINITION_DATA.EVALUATION.COLUMN_NAME;if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){var t=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(e.oConfig.TILE_PROPERTIES.id);switch(this.DEFINITION_DATA.EVALUATION.GOAL_TYPE){case"MI":i.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WH","MEASURE");i.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CH","MEASURE");i.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TA","MEASURE");i.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TC","MEASURE");i.fullyFormedMeasure+=e.formSelectStatement(i);if(t&&t.Data&&t.Data.length){t.Data=JSON.parse(t.Data);i.trendValue=Number(t.Data.trend);i.targetValue=Number(t.Data.target);i.criticalHighValue=Number(t.Data.ch);i.warningHighValue=Number(t.Data.wh);t.Data=JSON.stringify(t.Data)}break;case"MA":i.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WL","MEASURE");i.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CL","MEASURE");i.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TA","MEASURE");i.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TC","MEASURE");i.fullyFormedMeasure+=e.formSelectStatement(i);if(t&&t.Data&&t.Data.length){t.Data=JSON.parse(t.Data);i.criticalLowValue=Number(t.Data.cl);i.warningLowValue=Number(t.Data.wl);i.trendValue=Number(t.Data.trend);i.targetValue=Number(t.Data.target);t.Data=JSON.stringify(t.Data)}break;case"RA":i.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WH","MEASURE");i.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CH","MEASURE");i.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TA","MEASURE");i.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TC","MEASURE");i.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WL","MEASURE");i.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CL","MEASURE");i.fullyFormedMeasure+=e.formSelectStatement(i);if(t&&t.Data&&t.Data.length){t.Data=JSON.parse(t.Data);i.criticalLowValue=Number(t.Data.cl);i.warningLowValue=Number(t.Data.wl);i.trendValue=Number(t.Data.trend);i.targetValue=Number(t.Data.target);i.criticalHighValue=Number(t.Data.ch);i.warningHighValue=Number(t.Data.wh);t.Data=JSON.stringify(t.Data)}break}}else if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){i.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TA","MEASURE");i.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TC","MEASURE");i.fullyFormedMeasure+=e.formSelectStatement(i);i.criticalHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CH","FIXED");i.criticalLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CL","FIXED");i.warningHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WH","FIXED");i.warningLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WL","FIXED")}else{i.criticalHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CH","FIXED");i.criticalLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"CL","FIXED");i.warningHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WH","FIXED");i.warningLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"WL","FIXED");i.targetValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TA","FIXED");i.trendValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(e.oConfig,"TC","FIXED")}return i}catch(i){e.logError(i)}},setNoData:function(){var e=this.getView().getViewData();if(e.parentController){e.parentController.setNoData();if(e.deferredObj){e.deferredObj.resolve()}}else{try{this._updateTileModel({value:"",scale:"",unit:"",footerNum:this.oResourceBundle.getText("sb.noDataAvailable"),footerComp:this.oResourceBundle.getText("sb.noDataAvailable")});this.oKpiTileView.oGenericTile.setState(g.Loaded)}catch(e){}}},getLocalCache:function(e){var i={};i.ChipId=e.ChipId;i.Data=e.Data;i.CacheMaxAge=e.CacheMaxAgeUnit;i.CacheMaxAgeUnit=e.CacheMaxAgeUnit;i.CacheType=e.CacheType;i.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();return i},fetchKpiValue:function(e,i,t,l){var a=this;var s=0;try{var o=this.DEFINITION_DATA.EVALUATION.ODATA_ENTITYSET;var n=this.setThresholdValues();var c=n.fullyFormedMeasure;var T=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(a.oConfig.TILE_PROPERTIES.id);var g=a.oTileApi.configuration.getParameterValueAsString("timeStamp");var p=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(a.oConfig.TILE_PROPERTIES.id,g,a.chipCacheTime,a.chipCacheTimeUnit,a.tilePressed);var d=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(t);var f=this.getKeyForCallCheck();var m=true;if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(a.oConfig)){m=sap.ushell.components.tiles.indicatorTileUtils.util.isCallInProgress(f);if(m==undefined){m=true}}if(m){if(!T||!p&&a.oTileApi.visible.isVisible()||d||l&&a.oTileApi.visible.isVisible()||a.getView().getViewData().refresh){sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(f,false);if(a.kpiValueFetchDeferred){a.kpiValueFetchDeferred=false;var E=sap.ushell.components.tiles.indicatorTileUtils.util.prepareFilterStructure(this.DEFINITION_DATA.EVALUATION_FILTERS,this.DEFINITION_DATA.ADDITIONAL_FILTERS);var C=sap.ushell.components.tiles.indicatorTileUtils.util.prepareQueryServiceUri(a.oRunTimeODataModel,o,c,null,E);if(C){this.QUERY_SERVICE_MODEL=C.model;this.queryUriForKpiValue=C.uri;this.queryServiceUriODataReadRef=this.QUERY_SERVICE_MODEL.read(C.uri,null,null,true,function(i){a.backEndCallMade=true;a.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(f,true);if(i&&i.results&&i.results.length&&i.results[0][a.DEFINITION_DATA.EVALUATION.COLUMN_NAME]!=null){s=i.results[0][a.DEFINITION_DATA.EVALUATION.COLUMN_NAME];var t={};if(C.unit[0]){a._updateTileModel({unit:i.results[0][C.unit[0].name]});t.uom=i.results[0][C.unit[0].name]}if(a.oConfig.TILE_PROPERTIES.frameType=="TwoByOne"){t.numericValue=s}else{t.value=s}if(a.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){n.criticalHighValue=i.results[0][n.sCriticalHigh];n.criticalLowValue=i.results[0][n.sCriticalLow];n.warningHighValue=i.results[0][n.sWarningHigh];n.warningLowValue=i.results[0][n.sWarningLow];n.targetValue=i.results[0][n.sTarget];n.trendValue=i.results[0][n.sTrend]}else if(a.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){n.targetValue=Number(i.results[0][n.sTarget]);n.criticalHighValue=n.targetValue*n.criticalHighValue/100;n.criticalLowValue=n.targetValue*n.criticalLowValue/100;n.warningHighValue=n.targetValue*n.warningHighValue/100;n.warningLowValue=n.targetValue*n.warningLowValue/100;n.trendValue=Number(i.results[0][n.sTrend])}t.cl=n.criticalLowValue;t.ch=n.criticalHighValue;t.wl=n.warningLowValue;t.wh=n.warningHighValue;t.trend=n.trendValue;t.target=n.targetValue;t.isCurM=a.isCurrencyMeasure(a.oConfig.EVALUATION.COLUMN_NAME);var l={};l.ChipId=a.oConfig.TILE_PROPERTIES.id;l.Data=JSON.stringify(t);l.CacheMaxAge=Number(a.chipCacheTime);l.CacheMaxAgeUnit=a.chipCacheTimeUnit;l.CacheType=1;var o=a.getLocalCache(l);if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(a.oConfig)){sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(a.oConfig.TILE_PROPERTIES.id,o);var u=false;if(T){u=true}if(a.chipCacheTime){sap.ushell.components.tiles.indicatorTileUtils.util.writeFrontendCacheByChipAndUserId(a.oTileApi,a.oConfig.TILE_PROPERTIES.id,l,u,function(e){if(e){a.cacheTime=e&&e.CachedTime;sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(a.oConfig.TILE_PROPERTIES.id,e);a.setTimeStamp(a.cacheTime)}if(a.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(a.oConfig)){r.proxy(a.setTimeStamp(a.cacheTime),a)}})}}else{var c=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(a.oConfig.TILE_PROPERTIES.id),h;if(c){if(!c.CachedTime){c.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate()}h=c.Data;if(h){h=JSON.parse(h);if(a.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){h.leftData=t}else{h.rightData=t}}c.Data=JSON.stringify(h);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(a.oConfig.TILE_PROPERTIES.id,c)}else{h={};if(a.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){h.leftData=t}else{h.rightData=t}o.Data=JSON.stringify(h);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(a.oConfig.TILE_PROPERTIES.id,o)}a.cacheWriteData=t}a.cacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();a.updateDatajobScheduled=false;var g=a.oConfig.TILE_PROPERTIES.id+"data";var p=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(g);if(p){clearTimeout(p);p=undefined}e.call(a,s,n)}else{sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(a.oConfig.TILE_PROPERTIES.id,{empty:"empty"});a.setNoData()}},function(e){a.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(f,true);if(e&&e.response){u.error(e.message+" : "+e.request.requestUri);i.call(a,e)}})}else{a.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(f,true);a.logError("Error Preparing Query Service URI")}}}else if(a.DEFINITION_DATA.TILE_PROPERTIES.frameType==h.OneByOne){var V;if(T&&T.Data){V=T.Data&&JSON.parse(T.Data);s=V.value;if(V.uom){a._updateTileModel({unit:V.uom})}if(a.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){n.criticalHighValue=V.ch;n.criticalLowValue=V.cl;n.warningHighValue=V.wh;n.warningLowValue=V.wl;n.targetValue=V.target;n.trendValue=V.trend}else if(a.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){n.targetValue=Number(V.target);n.criticalHighValue=n.targetValue*n.ch/100;n.criticalLowValue=n.targetValue*n.cl/100;n.warningHighValue=n.targetValue*n.wh/100;n.warningLowValue=n.targetValue*n.wl/100;n.trendValue=Number(V.trend)}a.cacheTime=T.CachedTime;if(a.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(a.oConfig)){r.proxy(a.setTimeStamp(T.CachedTime),a)}e.call(a,s,n)}else{a.setNoData()}}else if(T&&T.Data){V=T.Data&&JSON.parse(T.Data);if(a.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){V=V.leftData}else{V=V.rightData}s=V.numericValue;if(V.unit){a._updateTileModel({unit:V.unit})}if(a.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){n.criticalHighValue=V.ch;n.criticalLowValue=V.cl;n.warningHighValue=V.wh;n.warningLowValue=V.wl;n.targetValue=V.target;n.trendValue=V.trend}else if(a.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){n.targetValue=Number(V.target);n.criticalHighValue=n.targetValue*n.criticalHighValue/100;n.criticalLowValue=n.targetValue*n.criticalLowValue/100;n.warningHighValue=n.targetValue*n.warningHighValue/100;n.warningLowValue=n.targetValue*n.warningLowValue/100;n.trendValue=Number(V.trend)}a.cacheTime=T.CachedTime;if(a.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(a.oConfig)){r.proxy(a.setTimeStamp(T.CachedTime),a)}e.call(a,s,n)}else{a.setNoData()}}}catch(e){a.logError(e)}},getRunTimeODataModel:function(e,i){if(window["sap-ushell-config"].cacheBusting){e=sap.ushell.components.tiles.indicatorTileUtils.util.cacheBustingMechanism(e)}if(!this.oRunTimeODataModel){this.oRunTimeODataModel=sap.ushell.components.tiles.indicatorTileUtils.util.getODataModelByServiceUri(e)}if(this.oRunTimeODataModel.getServiceMetadata()){i()}else{this.oRunTimeODataModel.attachMetadataLoaded(i)}},parse_sapclient:function(){var e,i,t,l,a;i="P_SAPClient";t="$$$";l=this.oConfig.EVALUATION_FILTERS;if(l.constructor!==Array){return}if(l.length<1){return}for(e in l){a=l[e];if(a.NAME===i&&a.VALUE_1===t){break}a=null}if(a){r.when(sap.ushell.components.tiles.indicatorTileUtils.util.getHanaClient()).done(function(e){a.VALUE_1=e})}},fetchEvaluation:function(e,i,t,l){var a=this;var s=this.oConfig.TILE_PROPERTIES.sb_metadata||"HANA";a.DEFINITION_DATA=e;a._updateTileModel(this.DEFINITION_DATA);var o=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(t);if(a.oTileApi.visible.isVisible()&&!a.firstTimeVisible||o||l){r.when(sap.ushell.components.tiles.indicatorTileUtils.util.getFrontendCache(e,a.oTileApi)).done(function(e){a.firstTimeVisible=true;e=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(a.oConfig.TILE_PROPERTIES.id);if(e||Number(a.oTileApi.configuration.getParameterValueAsString("isSufficient"))){i.call()}else{try{if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(a.oConfig)||!a.dataCallInProgress){a.dataCallInProgress=true;var t=sap.ushell.components.tiles.indicatorTileUtils.cache.getEvaluationById(a.oConfig.TILE_PROPERTIES.id);if(t){a.oConfig.EVALUATION_FILTERS=t.EVALUATION_FILTERS;i.call()}else if(a.evaluationFetchDeferred){a.evaluationFetchDeferred=false;sap.ushell.components.tiles.indicatorTileUtils.util.getFilterFromRunTimeService(a.oConfig,a.oTileApi,function(e){a.evaluationFetchDeferred=true;a.oConfig.EVALUATION_FILTERS=e;if(s.toUpperCase()==="HANA"){a.parse_sapclient()}sap.ushell.components.tiles.indicatorTileUtils.cache.setEvaluationById(a.oConfig.TILE_PROPERTIES.id,a.oConfig);i.call()})}}}catch(e){a.evaluationFetchDeferred=true;a.logError("no evaluation data")}}}).fail(function(){a.firstTimeVisible=true;if(Number(a.oTileApi.configuration.getParameterValueAsString("isSufficient"))){i.call()}else{try{var e=sap.ushell.components.tiles.indicatorTileUtils.cache.getEvaluationById(a.oConfig.TILE_PROPERTIES.id);if(e){a.oConfig.EVALUATION_FILTERS=e.EVALUATION_FILTERS;i.call()}else{sap.ushell.components.tiles.indicatorTileUtils.util.getFilterFromRunTimeService(a.oConfig,a.oTileApi,function(e){a.oConfig.EVALUATION_FILTERS=e;if(s.toUpperCase()==="HANA"){a.parse_sapclient()}sap.ushell.components.tiles.indicatorTileUtils.cache.setEvaluationById(a.oConfig.TILE_PROPERTIES.id,a.oConfig);i.call()})}}catch(e){a.logError("no evaluation data")}}})}},refreshHandler:function(e,i){var t=this;var l=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(e);var a=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(i);if(!t.firstTimeVisible||l||a){t.fetchEvaluation(t.oConfig,function(){var i;if(t.oConfig.TILE_PROPERTIES.tileType=="NT"||t.oConfig.TILE_PROPERTIES.tileType=="AT"||t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"||t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatordeviation.DeviationTile"){i=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);t.getRunTimeODataModel(i,function(){if(t.KPI_VALUE_REQUIRED){t.fetchKpiValue(function(e,i){this.KPIVALUE=e;t.doProcess(e,i)},t.logError,e,a)}else{t.doProcess()}})}else{i=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);t.getRunTimeODataModel(i,function(){if(t.KPI_VALUE_REQUIRED){t.doProcess(t.KPIVALUE,t.setThresholdValues())}else{t.doProcess(l,a)}})}},e,a)}},visibleHandler:function(e){if(!e){this.firstTimeVisible=false;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.trendChartODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.comparisionChartODataRef)}if(e){this.refreshHandler(this)}},getChipConfiguration:function(e){var i=this;try{sap.ushell.components.tiles.indicatorTileUtils.util.getParsedChip(i.oTileApi.configuration.getParameterValueAsString("tileConfiguration"),i.oTileApi.preview.isEnabled(),function(t){i.oConfig=t;var l=sap.ushell.components.tiles.indicatorTileUtils.util.getChipTitle(i.oConfig);var a=sap.ushell.components.tiles.indicatorTileUtils.util.getChipSubTitle(i.oConfig);if(i.oTileApi.search){i.oTileApi.search.setKeywords([l,a])}if(i.oTileApi.preview){i.oTileApi.preview.setTargetUrl(sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(i.oConfig,i.system))}e.call()})}catch(e){i.logError(e.message)}},onAfterTileRendering:function(){var e=this;this.firstTimeVisible=false;this.oKpiTileView=this.getView();this.updateDatajobScheduled=false;this.updateTimeStampjobScheduled=false;this.oViewData=this.oKpiTileView.getViewData();this.tilePressed=false;this.kpiValueFetchDeferred=true;this.evaluationFetchDeferred=true;this.backEndCallMade=false;if(!sap.ushell.components.tiles.utils){sap.ui.require("sap.ushell.components.tiles.utils")}this.oResourceBundle=sap.ushell.components.tiles.utils.getResourceBundleModel().getResourceBundle();this.oTileApi=this.oViewData.chip;this.system=this.oTileApi.url.getApplicationSystem();this.oKpiTileView.oGenericTile.setState(g.Loading);this.getChipConfiguration(function(){var i;e.chipCacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getCachingTime(e.oConfig);e.chipCacheTimeUnit=sap.ushell.components.tiles.indicatorTileUtils.util.getCachingTimeUnit(e.oConfig);if(e.oTileApi.preview.isEnabled()){e.doDummyProcess();e.oKpiTileView.oGenericTile.attachPress(function(){o.show(e.oResourceBundle.getText("sb.NavigationHelp"))})}else if(e.oConfig.BLANKTILE||e.oConfig.TILE_PROPERTIES.blankTile){e.doDummyProcess();i=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(e.oConfig,e.system);e.oKpiTileView.oGenericTile.$().wrap("<a href ='"+i+"'></a>");e.oKpiTileView.oGenericTile.attachPress(function(){e.tilePressed=true;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(e.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(e.oConfig.TILE_PROPERTIES.id,null);window.location.hash=i})}else{if(e.oTileApi.visible&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(e.oConfig)){e.oTileApi.visible.attachVisible(e.visibleHandler.bind(e))}i=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(e.oConfig,e.system);e.oKpiTileView.oGenericTile.$().wrap("<a href ='"+i+"></a>").style="display:block;";e.oKpiTileView.oGenericTile.attachPress(function(){e.tilePressed=true;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(e.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(e.oConfig.TILE_PROPERTIES.id,null);window.location.hash=i});if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(e.oConfig)){e.oKpiTileView.oNVConfS.attachRefresh(function(){e.oKpiTileView.oGenericTile.setState(g.Loading);r.proxy(e.refreshHandler(true),e)})}e.fetchEvaluation(e.oConfig,function(){e.DEFINITION_DATA=e.oConfig;var i=e.oTileApi.url.addSystemToServiceUrl(e.oConfig.EVALUATION.ODATA_URL);var t=e.oTileApi.configuration.getParameterValueAsString("timeStamp");var l=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(e.oConfig.TILE_PROPERTIES.id,t,e.chipCacheTime,e.chipCacheTimeUnit,e.tilePressed);if(!l||e.getView().getViewData().refresh){e.getRunTimeODataModel(i,function(){if(e.KPI_VALUE_REQUIRED){e.fetchKpiValue(function(i,t){this.KPIVALUE=i;e.doProcess(i,t)},e.logError)}else{e.doProcess()}})}else if(e.KPI_VALUE_REQUIRED){e.fetchKpiValue(function(i,t){this.KPIVALUE=i;e.doProcess(i,t)},e.logError)}else{e.doProcess()}})}})},onAfterRendering:function(){this.onAfterTileRendering()},_setLocalModelToTile:function(){if(!this.getTile().getModel()){this.getTile().setModel(new n({}))}},autoFormatter:function(e,i){i=i||false;if(!e){return""}return sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(Number(e),this.oConfig.EVALUATION.SCALING,this.oConfig.EVALUATION.DECIMAL_PRECISION,i)},setToolTip:function(e,i,t){var l=this,a,s=this.setThresholdValues(),o=this.oConfig.EVALUATION.COLUMN_NAME,n=this.isCurrencyMeasure(o),r;if(t=="CONT"||t=="COMP"){if(this.oKpiTileView.getContent()[0].getTileContent().length){a=l.oKpiTileView.getContent()[0].getTileContent()[0].getContent();var u,c,T,h,g,p,d,f,m;if(i&&i[0]){u=i[0].title;h=this.autoFormatter(i[0].value,n);d=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(i[0].color)}if(i&&i[1]){c=i[1].title;g=this.autoFormatter(i[1].value,n);f=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(i[1].color)}if(i&&i[2]){T=i[2].title;p=this.autoFormatter(i[2].value,n);m=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(i[2].color)}var E={};E["0"]=this.oConfig.EVALUATION.COLUMN_NAME+",asc";E["1"]=this.oConfig.EVALUATION.COLUMN_NAME+",desc";E["2"]=this.oConfig.TILE_PROPERTIES.dimension+",asc";E["3"]=this.oConfig.TILE_PROPERTIES.dimension+",desc";var C=E[this.oConfig.TILE_PROPERTIES.sortOrder||"0"].split(",");r={measure:this.oConfig.EVALUATION.COLUMN_NAME,contributionTile:C,m1:u,v1:h,c1:d,m2:c,v2:g,c2:f,m3:T,v3:p,c3:m};sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(a,t,r)}}else{var V="";if(e=="Error"){V="sb.error"}if(e=="Neutral"){V="sb.neutral"}if(e=="Critical"){V="sb.critical"}if(e=="Good"){V="sb.good"}r={status:V,actual:this.autoFormatter(i,n),target:this.autoFormatter(s.targetValue,n),cH:this.autoFormatter(s.criticalHighValue,n),wH:this.autoFormatter(s.warningHighValue,n),wL:this.autoFormatter(s.warningLowValue,n),cL:this.autoFormatter(s.criticalLowValue,n)};a=l.oKpiTileView.getContent()[0].getTileContent()[0]&&l.oKpiTileView.getContent()[0].getTileContent()[0].getContent();sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(a,t,r)}},getTrendColor:function(e){var i=this,t,l,a,s;try{var o=this.DEFINITION_DATA.EVALUATION.GOAL_TYPE;var n=T.Neutral;if(o==="MI"){if(e.criticalHighValue&&e.warningHighValue){s=Number(e.criticalHighValue);a=Number(e.warningHighValue);if(this.CALCULATED_KPI_VALUE<a){n=T.Good}else if(this.CALCULATED_KPI_VALUE<=s){n=T.Critical}else{n=T.Error}}}else if(o==="MA"){if(e.criticalLowValue&&e.warningLowValue){l=Number(e.criticalLowValue);t=Number(e.warningLowValue);if(this.CALCULATED_KPI_VALUE<l){n=T.Error}else if(this.CALCULATED_KPI_VALUE<=t){n=T.Critical}else{n=T.Good}}}else if(e.warningLowValue&&e.warningHighValue&&e.criticalLowValue&&e.criticalHighValue){s=Number(e.criticalHighValue);a=Number(e.warningHighValue);t=Number(e.warningLowValue);l=Number(e.criticalLowValue);if(this.CALCULATED_KPI_VALUE<l||this.CALCULATED_KPI_VALUE>s){n=T.Error}else if(this.CALCULATED_KPI_VALUE>=l&&this.CALCULATED_KPI_VALUE<=t||this.CALCULATED_KPI_VALUE>=a&&this.CALCULATED_KPI_VALUE<=s){n=T.Critical}else{n=T.Good}}return n}catch(e){i.logError(e)}},getTrendIndicator:function(e){var i=this;e=Number(e);try{var t=c.None;if(e>this.CALCULATED_KPI_VALUE){t=c.Down}else if(e<this.CALCULATED_KPI_VALUE){t=c.Up}return t}catch(e){i.logError(e)}},setTextInTile:function(){var e=this;var i=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.oTileApi);this._updateTileModel({header:i.title||sap.ushell.components.tiles.indicatorTileUtils.util.getChipTitle(e.oConfig),subheader:i.subTitle||sap.ushell.components.tiles.indicatorTileUtils.util.getChipSubTitle(e.oConfig)})},_getEvaluationThresholdMeasures:function(){var e=[];e.push(this.oConfig.EVALUATION.COLUMN_NAME);if(this.oConfig.EVALUATION.VALUES_SOURCE==="MEASURE"){var i=this.oConfig.EVALUATION_VALUES;if(i&&i.length){for(var t=0;t<i.length;t++){if(i[t].COLUMN_NAME&&!i[t].FIXED){e.push(i[t].COLUMN_NAME)}}}}return e},onExit:function(){sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.trendChartODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.comparisionChartODataRef)}});return p});