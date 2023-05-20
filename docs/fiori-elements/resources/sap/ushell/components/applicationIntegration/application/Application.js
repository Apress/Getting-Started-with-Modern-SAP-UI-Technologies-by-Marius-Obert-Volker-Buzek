// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/components/container/ApplicationContainer","sap/ushell/components/applicationIntegration/application/PostMessageAPI","sap/ushell/utils","sap/ui/thirdparty/jquery","sap/ui/thirdparty/URI","sap/ushell/UI5ComponentType","sap/base/Log","sap/base/util/ObjectPath","sap/ui/core/Core"],function(e,t,r,i,s,n,a,o,p){"use strict";var l,u,c=e.getMetadata().getJSONKeys();function f(){var s=this;this.handleMessageEvent=function(t,i,n,o){var p=i.data;if(o===undefined){o=false}if(typeof p==="string"){try{p=JSON.parse(i.data)}catch(e){a.debug("Message received from origin '"+i.origin+"' cannot be parsed: "+e,p,"sap.ushell.components.container.ApplicationContainer");return}}if(p.action==="pro54_setGlobalDirty"&&localStorage.getItem(t.globalDirtyStorageKey)===sap.ushell.Container.DirtyState.PENDING){if(!e.prototype._isTrustedPostMessageSource(t,i)){a.warning("Received message from untrusted origin: "+i.origin,p,"sap.ushell.components.container.ApplicationContainer");return}a.debug("getGlobalDirty() pro54_setGlobalDirty SetItem key:"+t.globalDirtyStorageKey+" value: "+p.parameters.globalDirty,null,"sap.ushell.components.container.ApplicationContainer");r.localStorageSetItem(t.globalDirtyStorageKey,p.parameters.globalDirty,true)}else{s.handleServiceMessageEvent(t,i,p,n,o)}};this.handleServiceMessageEvent=function(s,n,p,l,u){var c=o.get("sap-ushell-config.services.PostMessage.config")||o.create("sap-ushell-config.services.PostMessage.config"),f=p&&p.service,g,d,h,v,y=false,m=t.getAPIs(),b;a.debug("Received post message request from origin '"+n.origin+"': "+JSON.stringify(p),null,"sap.ushell.components.container.ApplicationContainer");if(u===undefined){u=false}if(p.type!=="request"||!f){return}if(f==="sap.ushell.services.MessageBroker"){if(u===true){f=f.concat("._execute")}else{return}}for(var S in m){if(m.hasOwnProperty(S)){if(f.indexOf(S)!==-1){d=m[S];h=S;y=true;break}}}if(y===false){if(l.bPluginsStatusChecked===false||l.bKeepMessagesForPlugins===true){l.bApiRegistered=false}else{C("error",{code:-1,message:"Unknown service name: '"+f+"'"})}return}b=f.indexOf("user.postapi.")===0;g=f.split(".")[3];if(c&&c.enabled===false){a.warning("Received message for "+g+", but this "+"feature is disabled. It can be enabled via launchpad configuration "+"property 'services.PostMessage.config.enabled: true'",undefined,"sap.ushell.components.container.ApplicationContainer");return}if(u===false&&!e.prototype._isTrustedPostMessageSource(s,n)){a.warning("Received message from untrusted origin '"+n.origin+"': "+JSON.stringify(n.data),null,"sap.ushell.components.container.ApplicationContainer");return}function A(e,t){var r;if(t===true){r={oMessage:n,oMessageData:p}}else{r={matchesLocalSid:w,getLocalSystemInSidForma:I,storeSapSystemData:R,executeSetBackNavigationService:M,sendResponseMessage:C,oMessage:n,oMessageData:p,oContainer:s}}try{e(r).done(function(e){var t=e&&e.hasOwnProperty("_noresponse_")?true:false;if(!t){C("success",{result:e})}}).fail(function(e){C("error",{message:e})})}catch(e){C("error",{message:e.message})}}function C(e,t){var r=JSON.stringify({type:"response",service:p.service,request_id:p.request_id,status:e,body:t});a.debug("Sending post message response to origin ' "+n.origin+"': "+r,null,"sap.ushell.components.container.ApplicationContainer");if(typeof n.source!=="object"||n.source===null){a.debug("Cannot send response message to origin ' "+n.origin,"`source` member of request message is not an object","sap.ushell.components.container.ApplicationContainer");return}n.source.postMessage(r,n.origin)}function M(t,r){var n=new i.Deferred,a;if(r.body&&r.body.callbackMessage&&r.body.callbackMessage.service){a=e.prototype._backButtonPressedCallback.bind(null,t.source,r.body.callbackMessage.service,t.origin)}n.resolve(s.getShellUIService().setBackNavigation(a));return n.promise()}function R(e,t){var i,s,n,o=[e.id];if(arguments.length>1){o.unshift(t)}try{n=JSON.stringify(e)}catch(e){a.error("Cannot stringify and store expanded system data: "+e)}if(n){s=r.getLocalStorage();i=r.generateLocalStorageKey("sap-system-data",o);s.setItem(i,n)}}function I(){var e=sap.ushell.Container.getLogonSystem();var t=e.getName();var r=e.getClient();return"sid("+t+"."+r+")"}function w(e){return I().toLowerCase()===e.toLowerCase()}v=d.oServiceCalls[f.replace(h+".","")];if(v&&v.executeServiceCallFn){A(v.executeServiceCallFn,b)}else{C("error",{code:-1,message:"Unknown service name: '"+f+"'"})}};this.init=function(e){u=e};this.restoreArray=function(e){var t=[],r=0;while(e[r]){t.push(e[r]);r++}return t};this._createWaitForRendererCreatedPromise=function(){var e,t;t=sap.ushell.Container.getRenderer();if(t){a.debug("Shell controller._createWaitForRendererCreatedPromise: shell renderer already created, return empty array.");return[]}e=new Promise(function(e,r){var i;i=function(){a.info("Shell controller: resolving component waitFor promise after shell renderer created event fired.");e();sap.ushell.Container.detachRendererCreatedEvent(i)};t=sap.ushell.Container.getRenderer();if(t){a.debug("Shell controller: resolving component waitFor promise immediately (shell renderer already created");e()}else{sap.ushell.Container.attachRendererCreatedEvent(i)}});return[e]};this.createComponent=function(e,t){var r=this,s=new i.Deferred;sap.ushell.Container.getServiceAsync("Ui5ComponentLoader").then(function(i){i.createComponent(e,t,r._createWaitForRendererCreatedPromise(),n.Application).then(s.resolve,s.reject)});return s.promise()};this.stripURL=function(e){var t=e.indexOf("?"),r=e.indexOf("#"),i;if(t>=0){i=e.substr(0,t)}else if(r>=0){i=e.substr(0,r)}else{i=e}return i};this.createApplicationContainer=function(t,r){var i={};this._cleanTargetResolution(r,i);l=new e("application"+t,r);this._restoreTargetResolution(r,i);if(r.appCapabilities){l.setProperty("frameworkId",r.appCapabilities.appFrameworkId,true)}l.setHandleMessageEvent(this.handleMessageEvent);u.setAppCapabilities(l,r);return l};this.active=function(e){if(e){if(e.active){e.active()}}};this.restore=function(e){var t;if(e.container&&e.container._getIFrame&&e.container._getIFrame()!=undefined){this.postMessageToIframeApp(e.container,"sap.ushell.appRuntime","keepAliveAppShow",{},false)}if(e.app){p.getEventBus().publish("sap.ushell","appKeepAliveActivate",e.appTarget);if(e.app.getUrl){t=e.app.getUrl();l=u.get(this.stripURL(t));if(l){u.restoreApp(l.sApplication)}}if(e.app.isKeepAliveSupported&&e.app.isKeepAliveSupported()===true){e.app.activate()}else{if(e.app.restore){e.app.restore()}if(e.app.getRouter&&e.app.getRouter()&&e.app.getRouter().initialize){if(e.enableRouterRetrigger===false){e.app.getRouter().initialize()}else{e.app.getRouter().initialize(true)}}if(e.app.setInitialConfiguration){e.app.setInitialConfiguration()}}l=e.app}};this.store=function(e){var t;if(e.container&&e.container._getIFrame&&e.container._getIFrame()!=undefined){this.postMessageToIframeApp(e.container,"sap.ushell.appRuntime","keepAliveAppHide",{},false)}if(e.app){p.getEventBus().publish("sap.ushell","appKeepAliveDeactivate",e.appTarget);if(e.app.getUrl){t=e.app.getUrl();l=u.get(this.stripURL(t));if(l){u.storeApp(l.sApplication)}}if(e.app.isKeepAliveSupported&&e.app.isKeepAliveSupported()===true){e.app.deactivate()}else{if(e.app.suspend){e.app.suspend()}if(e.app.getRouter&&e.app.getRouter()){e.app.getRouter().stop()}}}};this.destroy=function(e){var t,r,i=false;if(e){if(e.getUrl){t=e.getUrl();r=u.get(this.stripURL(t));if(u.isStatefulContainerSupported(r)){i=true;u.destroyApp(r.sApplication)}}if(e.destroy&&i===false){try{e.destroy()}catch(t){a.error("exception when trying to close sapui5 application with id '"+(e.sId||"<unknown>")+"'. This error must be fixed in order for FLP to operate properly.\n",t.stack,"sap.ushell.components.applicationIntegration.application.Application::destroy")}}}};this.setActiveAppContainer=function(e){l=e};this.getActiveAppContainer=function(){return l};function c(e){var t=this;try{var r=e.data;if(typeof r==="string"&&r.indexOf("sap.ushell.services.MessageBroker")>0){try{r=JSON.parse(e.data);if(typeof r==="object"&&r.type==="request"&&r.service==="sap.ushell.services.MessageBroker"){sap.ushell.Container.getServiceAsync("MessageBroker").then(function(r){var i=r.getAcceptedOrigins().find(function(t){return t===e.origin});if(i===undefined){return}t.handleMessageEvent(undefined,e,{},true)})}}catch(e){return}}}catch(e){a.error(e.message,e.stack)}}addEventListener("message",c.bind(this))}f.prototype._cleanTargetResolution=function(e,t){var r;if(e){for(r in e){if(c[r]===undefined){t[r]=e[r];delete e[r]}}}};f.prototype._restoreTargetResolution=function(e,t){var r;if(e){for(r in t){e[r]=t[r]}}};f.prototype.getResponseHandler=function(e,r){return t.getResponseHandler(e,r)};f.prototype.isActiveOnly=function(e,r){return t.isActiveOnly(e,r)};f.prototype.isAppTypeSupported=function(e,r,i){var s=t._getPostMesageInterface(r,i);return this.isAppTypeSupportedByPolicy(e,s)};f.prototype.isAppTypeSupportedByPolicy=function(e,t){if(e&&e.getAdditionalInformation&&e.getAdditionalInformation().startsWith("SAPUI5.Component=")){return false}var r=t;if(!r||!r.distributionType){return false}if(r.distributionType.indexOf("all")>=0){return true}if(r.distributionType.indexOf("URL")>=0){return false}if(e.getApplicationType&&r.distributionType.indexOf(e.getApplicationType())>=0){return true}return false};f.prototype.postMessageToIframeApp=function(e,t,r,i,s){var n=t+"."+r,a=this.createPostMessageRequest(n,i);return this.postMessageToIframe(a,e,s)};f.prototype.createPostMessageRequest=function(e,t){var r=Date.now().toString();return{type:"request",request_id:r,service:e,body:t}};f.prototype.createPostMessageResponse=function(e,t,r,i){return{type:"response",request_id:t,service:e,status:i?"success":"error",body:r}};f.prototype.postMessageToIframe=function(e,t,r){var i=t._getIFrame(),n,a;if(!i||!t._getIFrameUrl){return Promise.resolve()}n=new s(t._getIFrameUrl(i));a=n.protocol()+"://"+n.host();return this.postMessageToIframeObject(e,i,a,r,true)};f.prototype.postMessageToIframeObject=function(e,t,r,i,s){var n=e.request_id;return new Promise(function(o,p){function l(r){var i;try{if((s===true?t.contentWindow:t)!==r.source){return}if(typeof r.data==="string"&&r.data.indexOf("{")===0){try{i=JSON.parse(r.data)}catch(e){i={}}}else{return}if(!i.request_id||n!==i.request_id){return}if(i.status==="success"){o(i)}else{p(i)}window.removeEventListener("message",l)}catch(t){o();a.warning("Obtained bad response from framework in response to message "+e.request_id);a.debug("Underlying framework returned invalid response data: '"+r.data+"'")}}if(!t){o()}else{var u=JSON.stringify(e);a.debug("Sending postMessage "+u+" to iframe with id '"+t.id+"'");if(i){window.addEventListener("message",l,false);if(s===true){t.contentWindow.postMessage(u,r)}else{t.postMessage(u,r)}}else{if(s===true){t.contentWindow.postMessage(u,r)}else{t.postMessage(u,r)}o()}}})};f.prototype.registerShellCommunicationHandler=function(e){t.registerShellCommunicationHandler(e)};f.prototype._getPostMesageInterface=function(e,r){return t._getPostMesageInterface(e,r)};return new f},true);