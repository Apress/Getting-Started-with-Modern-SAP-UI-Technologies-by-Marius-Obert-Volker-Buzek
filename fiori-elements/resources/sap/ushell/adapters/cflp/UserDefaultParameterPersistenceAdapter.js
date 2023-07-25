// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils/HttpClient","sap/ui/thirdparty/jquery","sap/base/Log","sap/base/util/ObjectPath"],function(e,t,r,a){"use strict";var s=function(e,t,r){this.sBaseServicePath="/sap/opu/odata/UI2/INTEROP/";this.oConfig={};if(r&&r.userBaseServicePath!==undefined){this.oConfig.sBaseServicePath=r.userBaseServicePath}else{this.oConfig.sBaseServicePath=this.sBaseServicePath}this.oConfig.oHttpClientConfig={"sap-language":sap.ushell.Container.getUser().getLanguage(),"sap-client":sap.ushell.Container.getLogonSystem().getClient(),"sap-statistics":true,headers:{Accept:"application/json"},data:{}};this._mSystems={}};s.prototype.loadParameterValue=function(e,r){var a=new t.Deferred;var s=this._isValidParameterName(e);if(s){this._getUserDefaultParameterContainer(r).done(function(t){var r=t.find(function(t){return t.id===e});if(r!==undefined){var s=JSON.parse(r.value);a.resolve(s)}else{a.reject("Parameter does not exist: "+e)}}).fail(function(e){a.reject(e)})}else{a.reject('Illegal Parameter Key. Parameter must be less than 40 characters and [A-Za-z0-9.-_]+ :"'+e+'"')}return a.promise()};s.prototype._createRequest=function(e){return{data:{PersContainerItems:e,appName:"",category:"P",component:"",id:"sap.ushell.UserDefaultParameter"},headers:{"content-type":"application/json",accept:"application/json"}}};s.prototype.saveParameterValue=function(e,r,a){var s=new t.Deferred;var i=this._isValidParameterName(e);if(i){var n=this._getXHttpWrapper(a);this._getUserDefaultParameterContainer(a).done(function(t){var a=t.findIndex(function(t){return t.id===e});if(a>-1){t[a].value=JSON.stringify(r)}else{var i={category:"I",containerCategory:"P",containerId:"sap.ushell.UserDefaultParameter",id:e,value:JSON.stringify(r)};t.push(i)}n.post("PersContainers",this._createRequest(t)).then(s.resolve).catch(s.reject)}.bind(this)).fail(s.reject)}else{s.reject('Illegal Parameter Key. Parameter must be less than 40 characters and [A-Za-z0-9.-_]+ :"'+e+'"')}return s.promise()};s.prototype.deleteParameter=function(e,r){var a=new t.Deferred;var s=this._isValidParameterName(e);if(s){var i=this._getXHttpWrapper(r);this._getUserDefaultParameterContainer(r).done(function(t){var r=t.findIndex(function(t){return t.id===e});if(r>-1){t.splice(r,1);i.post("PersContainers",this._createRequest(t)).then(a.resolve).catch(a.reject)}else{a.resolve()}}.bind(this)).fail(a.reject)}else{a.reject('Illegal Parameter Key. Parameter must be less than 40 characters and [A-Za-z0-9.-_]+ :"'+e+'"')}return a.promise()};s.prototype.getStoredParameterNames=function(e){var r=new t.Deferred;this._getUserDefaultParameterContainer(e).done(function(e){var t=e.map(function(e){return e.id});t.sort();r.resolve(t)}).fail(function(e){r.reject(e)});return r.promise()};s.prototype._getXHttpWrapper=function(t){if(!this._mSystems[t.id]){this._mSystems[t.id]={}}if(!this._mSystems[t.id].oHttpWrapper){var r=t.getFullyQualifiedXhrUrl(this.oConfig.sBaseServicePath);this._mSystems[t.id].oHttpWrapper=new e(r,this.oConfig.oHttpClientConfig)}return this._mSystems[t.id].oHttpWrapper};s.prototype._isValidParameterName=function(e){var t=!!(typeof e==="string"&&e.length<=40&&/^[A-Za-z0-9.-_]+$/.exec(e));if(!t){r.error('Illegal Parameter Key. Parameter must be less than 40 characters and [A-Za-z0-9.-_]+ :"'+e+'"')}return t};s.prototype._getUserDefaultParameterContainer=function(e){var r=new t.Deferred;var s;try{s=this._getXHttpWrapper(e)}catch(e){r.reject(e.message);return r.promise()}var i=this._mSystems[e.id];if(!i.oContainerCache){i.oContainerCache=r;var n=s.get("PersContainers(category='P',id='sap.ushell.UserDefaultParameter')?$expand=PersContainerItems");n.then(function(e){i.bDataReceived=true;var t=e.responseText?JSON.parse(e.responseText):{};var r=a.get("d.PersContainerItems.results",t)||[];i.oContainerCache.resolve(r)}).catch(function(e){if(e.status===404){i.oContainerCache.resolve([])}else{var t="Server error: "+e.statusText;i.oContainerCache.reject(t)}})}return i.oContainerCache.promise()};return s},false);