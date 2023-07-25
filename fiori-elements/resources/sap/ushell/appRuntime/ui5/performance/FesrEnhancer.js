// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/performance/trace/FESR","sap/ui/performance/trace/Interaction","sap/ushell/utils/type"],function(e,t,r){"use strict";var n={_fnOriginalOnBeforeCreated:undefined,_currentAppShortId:undefined,init:function(){if(e.getActive()){this._fnOriginalOnBeforeCreated=e.onBeforeCreated;e.onBeforeCreated=this._onBeforeCreatedHandler.bind(this)}},_onBeforeCreatedHandler:function(e,t){if(this._currentAppShortId){e.appNameShort=this._currentAppShortId}if(e.interactionType===1&&(e.stepName==="undetermined_startup"||e.stepName==="undetermined_appruntime_app_startup")){e.stepName="APPRT@APP_START"}return e},reset:function(){if(e.getActive()){e.onBeforeCreated=this._fnOriginalOnBeforeCreated;this.setAppShortId()}},startInteraction:function(){if(e.getActive()){t.start("appruntime_app_startup")}},setAppShortId:function(t){function n(e,t){var n=e.getManifestEntry(t)||[];if(!r.isArray(n)){n=[n]}return typeof n[0]==="string"?n[0]:undefined}if(e.getActive()){try{if(t){var i=t.getInstance().getComponentData().technicalParameters||{},a=t.getMetadata();this._currentAppShortId=i["sap-fiori-id"]||n(a,"/sap.fiori/registrationIds")}else{this._currentAppShortId=undefined}}catch(e){this._currentAppShortId=undefined}}}};return n},true);