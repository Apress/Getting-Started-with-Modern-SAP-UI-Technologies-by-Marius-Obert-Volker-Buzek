// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/CrossApplicationNavigation","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/ushell/services/_AppState/AppState","sap/ui/thirdparty/jquery","sap/base/Log","sap/ushell/appRuntime/ui5/AppRuntimeContext","sap/base/util/deepClone","sap/ushell/utils/UrlParsing"],function(e,s,t,i,n,a,r,o){"use strict";function l(l,p,c){e.call(this,l,p,c);this.backToPreviousApp=function(){if(a.checkDataLossAndContinue()){return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.backToPreviousApp")}};this.expandCompactHashLocal=this.expandCompactHash;this.expandCompactHash=function(e){if(a.getIsScube()){return this.expandCompactHashLocal(e)}return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.expandCompactHash",{sHashFragment:e})};this.getDistinctSemanticObjectsLocal=this.getDistinctSemanticObjects;this.getDistinctSemanticObjects=function(){if(a.getIsScube()){return this.getDistinctSemanticObjectsLocal()}return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getDistinctSemanticObjects")};this.getLinksLocal=this.getDistinctSemanticObjects;this.getLinks=function(e){var t=new i.Deferred;function n(e){if(Array.isArray(e)){e.forEach(function(e){if(e[0]){delete e[0].ui5Component}})}else{delete e.ui5Component}}if(a.getIsScube()){this.getLinksLocal(e).then(function(i){n(e);s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getLinks",e).done(function(e){if(i.length===0){t.resolve(e)}else{e=e.concat(i);t.resolve(e)}})})}else{n(e);s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getLinks",e).done(t.resolve,t.reject)}return t.promise()};this.getPrimaryIntent=function(e,t){return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getPrimaryIntent",{sSemanticObject:e,mParameters:t})};this.getSemanticObjectLinks=function(e,t,i,n,a,r){return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getSemanticObjectLinks",{sSemanticObject:e,mParameters:t,bIgnoreFormFactor:i,sAppStateKey:a,bCompactIntents:r})};this.historyBack=function(e){if(a.checkDataLossAndContinue()){s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.historyBack",{iSteps:e})}};this.isIntentSupported=function(e,t){if(a.getIsScube()){var n=new i.Deferred;sap.ushell.Container.getServiceAsync("NavTargetResolution").then(function(s){s.isIntentSupported(e,t).done(n.resolve,n.reject)});return n.promise()}return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isIntentSupported",{aIntents:e})};this.isNavigationSupported=function(e,t){if(a.getIsScube()){var n=new i.Deferred,o;o=e.map(function(e){if(typeof e==="object"){var s=e;if(e.params&&e.params.hasOwnProperty("sap-app-origin")){s=r(e);delete s.params["sap-app-origin"]}return s}return e});sap.ushell.Container.getServiceAsync("NavTargetResolution").then(function(e){e.isNavigationSupported(o,t).done(n.resolve,n.reject)});return n.promise()}return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isNavigationSupported",{aIntents:e})};this.toExternal=function(e,t){if(a.getIsScube()){if(e.target&&e.target.shellHash){var n=o.parseShellHash(e.target.shellHash);if(n.params){delete n.params["sap-app-origin"];e.target.shellHash=o.constructShellHash(n)}}else if(e.params){delete e.params["sap-app-origin"]}sap.ushell.Container.getServiceAsync("ShellNavigation").then(function(s){s.toExternal(e,t)})}else if(a.checkDataLossAndContinue()){s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.toExternal",{oArgs:e})}return(new i.Deferred).resolve().promise()};this.getAppState=function(e,n){var a=new i.Deferred;s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getAppState",{sAppStateKey:n}).done(function(e){sap.ushell.Container.getServiceAsync("AppState").then(function(s){var i=new t(s,e._sKey,e._bModifiable,e._sData,e._sAppName,e._sACHComponent,e._bTransient);a.resolve(i)})});return a.promise()};this.resolveIntentLocal=this.resolveIntent;this.resolveIntent=function(e){if(a.getIsScube()){return this.resolveIntentLocal(e)}return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.resolveIntent",{sHashFragment:e})};this.hrefForExternalAsync=function(e){return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.hrefForExternal",{oArgs:e})};this.hrefForAppSpecificHashAsync=function(e){return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.hrefForAppSpecificHash",{sAppHash:e})};this.isInitialNavigation=function(){n.error("Deprecated API call of 'sap.ushell.CrossApplicationNavigation.isInitialNavigation'. Please use 'isInitialNavigationAsync' instead",null,"sap.ushell.services.CrossApplicationNavigation");return false};this.isInitialNavigationAsync=function(){return s.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isInitialNavigation",{})}}l.prototype=e.prototype;l.hasNoAdapter=e.hasNoAdapter;return l},true);