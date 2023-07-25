/*
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./transaction/BaseController","./transaction/TransactionController","sap/ui/generic/app/util/ModelUtil","sap/base/Log"],function(e,t,r,i,o){"use strict";var a=t.extend("sap.ui.generic.app.ApplicationController",{constructor:function(e,r){t.apply(this,[e]);this._oGroupChanges={};this.sName="sap.ui.generic.app.ApplicationController";this.oPropertyChangedResolve;this.oPropertyChangedReject;this._initModel(e);this.registerView(r)}});a.prototype.propertyChanged=function(e,t,r){var o=this,a={batchGroupId:"Changes",changeSetId:"Changes",onlyIfPending:true,noShowResponse:true,noBlockUI:true,draftSave:true},n,s={};if(t&&t instanceof sap.ui.model.Context){var u=i.getEntitySetFromContext(t);var f=t.getModel().getMetaModel();var c=f.getODataEntitySet(u).entityType;s=f.getODataEntityType(c)}for(var l in s){if(l.startsWith("com.sap.vocabularies.Common.v1.SideEffects")){n=s[l];if(n.SourceProperties&&n.SourceProperties.length){for(var h=0;h<n.SourceProperties.length;h++){if(n.SourceProperties[h].PropertyPath===e){o.registerGroupChange(o._getSideEffectsQualifier(l))}}}}}if(!o._oDraftMergeTimer.nTimeoutID){o.oResultPromise=new Promise(function(e,i){o.oPropertyChangedResolve=e;o.oPropertyChangedReject=i;o._oDraftMergeTimer.nTimeoutID=setTimeout(function(){o._oDraftMergeTimer.nTimeoutID=null;o.triggerSubmitChanges(a).then(function(t){e(t)},function(e){i(e)})},t.isTransient()||!r?0:r*1e3)})}else if(t.isTransient()){o.triggerSubmitChanges(a).then(function(e){o.oPropertyChangedResolve(e)},function(e){o.oPropertyChangedReject(e)})}return o.oResultPromise};a.prototype.registerGroupChange=function(e){this._oGroupChanges[e]=true};a.prototype.registerView=function(e){var t=this;if(e){this._fnAttachValidateFieldGroup=function(r){var i,o,a,n,s=[];var u=this.getBindingContext();if(!u){return false}if(!t.getTransactionController().getDraftController().getDraftContext().hasDraft(u)){this.detachValidateFieldGroup(t._fnAttachValidateFieldGroup);return false}if(r.mParameters.fieldGroupIds){a=r.mParameters.fieldGroupIds.length}for(n=0;n<a;n++){i=r.mParameters.fieldGroupIds[n];o=e.data(i);if(o){s.push({uuid:i,objid:o})}}t._onValidateFieldGroup(s,e)};e.attachValidateFieldGroup(this._fnAttachValidateFieldGroup)}};a.prototype._initModel=function(e){if(e.getDefaultBindingMode()!==sap.ui.model.BindingMode.TwoWay){o.error("ApplicationController: The model's DefaultBindingMode wasn't but is now set to 'TwoWay'.");e.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay)}if(e.getRefreshAfterChange()!==false){o.error("ApplicationController: The model's setting 'RefreshAfterChange' wasn't but is now set to 'false'.");e.setRefreshAfterChange(false)}e.setDeferredBatchGroups(["Changes"]);e.setChangeBatchGroups({"*":{batchGroupId:"Changes",changeSetId:"Changes",single:false}})};a.prototype._onValidateFieldGroup=function(e,t){var r,i=e.length,o,a={bGlobal:false,aRequests:[],bHasTargets:true},n=[],s=this;for(r=0;r<i;r++){n.push(this._executeFieldGroup(e[r],a,t).then(function(){return true},function(){return false}))}var u=function(e){if(e.find(function(e){return e})){i=a.aRequests.length;for(r=0;r<i;r++){o=a.aRequests[r];o(a.bGlobal)}if(a.bGlobal){s._oModel.refresh(true,false,"Changes")}var t=s.triggerSubmitChanges({batchGroupId:"Changes",noShowSuccessToast:true,forceSubmit:true,noBlockUI:true,urlParameters:{},draftSave:s._oModel.hasPendingChanges(true)});s.fireEvent("beforeSideEffectExecution",{promise:t});return t}};return Promise.all(n).then(u)};a.prototype._executeFieldGroup=function(e,t,r){var i,o,a,n={batchGroupId:"Changes",changeSetId:"SideEffects",noShowSuccessToast:true,forceSubmit:true,noBlockUI:true,urlParameters:{}},s=this;i=this._getSideEffectsQualifier(e.objid.name);n.urlParameters.SideEffectsQualifier=i;o=e.objid.contextObject;a=this._getSideEffect(e.objid);return this._hasClientErrors(e.uuid,r).then(function(){if(!s._oGroupChanges[i]){return Promise.reject()}s._oGroupChanges[i]=false;s._executeSideEffects(a,o,n,t)})};a.prototype._getSideEffectsQualifier=function(e){var t=e.replace("com.sap.vocabularies.Common.v1.SideEffects","");if(t.indexOf("#")===0){t=t.replace("#","")}return t};a.prototype._executeSideEffectsForActions=function(e,t,r){var i;var o="_it/";var a={bGlobal:false,aRequests:[],bHasTargets:true};var n={batchGroupId:"Changes",changeSetId:"SideEffects",noShowSuccessToast:true,forceSubmit:true,noBlockUI:true,urlParameters:{}};var s=0;if(r===false){n.batchGroupId="NonDraftChanges"}if(e.TargetEntities&&e.TargetEntities.length){for(s=0;s<e.TargetEntities.length;s++){if(e.TargetEntities[s].NavigationPropertyPath.indexOf(o)===0){e.TargetEntities[s].NavigationPropertyPath=e.TargetEntities[s].NavigationPropertyPath.substr(4)}}}var u=function(e,t){var r=e[t];if(r&&r.startsWith(o)){e[t]=r.substr(4)}};(e.TargetProperties||[]).forEach(function(e){["PropertyPath","String"].forEach(u.bind(null,e))});for(s=0;s<t.length;s++){this._executeSideEffects(e,t[s],n,a);if(a.aRequests[0]){i=a.aRequests[0];i(a.bGlobal);a.aRequests=[]}}if(a.bGlobal){this._oModel.refresh(true,false,n.batchGroupId)}};a.prototype._executeSideEffects=function(t,r,i,o){var a=this,n,s,u;var f=a.getTransactionController().getDraftController();var c=f.getDraftContext().hasDraft(r);if(t.TriggerAction&&t.TriggerAction.String&&c){s=t.TriggerAction.String}this._setSelect(t,i,o,r);u=o.bHasTargets;n=function(t,o){if(s){var n=a._oModel.getETag(r.getPath());if(n){i.headers={"If-Match":"*"}}a._callAction(s,r,i)}else if(o&&o.callPreparationOnDraftRoot&&c){delete i.urlParameters.SideEffectsQualifier;f.prepareDraft(o.draftRootContext,i)}if(!t&&u){var l=e.extend({},i);l.context=r;a._read("",l,true)}};o.aRequests.push(n)};a.prototype._hasClientErrors=function(e,t){var r,i=[];r=t.getControlsByFieldGroupId(e);r.forEach(function(e){var t=e.getParent();var r={handleSuccess:false};i.push(t&&t.checkValuesValidity&&t.checkValuesValidity(r))});return Promise.all(i)};a.prototype._setSelect=function(e,t,r,o){var a,n=0,s,u=[],f=[],c=[],l;if(!r.bGlobal){if((!e.TargetEntities||e.TargetEntities.length===0)&&(!e.TargetProperties||e.TargetProperties.length===0)){r.bHasTargets=false;return}if(e.TargetEntities){n=e.TargetEntities.length;if(n>0){for(a=0;a<n;a++){s=e.TargetEntities[a];if(s.NavigationPropertyPath===""){u.push("*")}else{u.push(s.NavigationPropertyPath);if(f.indexOf(s.NavigationPropertyPath)===-1){f.push(s.NavigationPropertyPath)}}c.push(s.NavigationPropertyPath)}}}if(e.TargetProperties){n=e.TargetProperties.length;if(n>0){for(a=0;a<n;a++){s=e.TargetProperties[a];l="";if(s.PropertyPath?s.PropertyPath.indexOf("/")!==-1:s.String.indexOf("/")!==-1){var h=i.getEntitySetFromContext(o);var g=this._oModel.getMetaModel();var p=g.getODataEntitySet(h).entityType;var d=g.getODataEntityType(p);var v=s.PropertyPath?s.PropertyPath.split("/"):s.String.split("/");var S;if(v.length>1){for(var C=0;C<v.length-1;C++){S=g.getODataAssociationEnd(d,v[C]);if(S){d=g.getODataEntityType(S.type);if(l){l=l+"/"}l=l+v[C]}else{break}}}}if(c.indexOf(l)===-1){if(l&&f.indexOf(l)===-1){f.push(l)}u.push(s.PropertyPath||s.String)}}}}}if(u.length>0){t.readParameters={$select:u.join(",")};if(f.length>0){t.readParameters["$expand"]=f.join(",")}}};a.prototype._getSideEffect=function(e){var t,r,i,o;t=this._oModel.getMetaModel();i="getOData"+e.originType.substring(0,1).toUpperCase()+e.originType.substring(1);if(e.originNamespace){o=e.originNamespace+"."+e.originName}else{o=e.originName}if(t[i]){r=t[i](o);if(r){return r[e.name]}}throw"Unknown SideEffect originType: "+e.originType};a.prototype.getTransactionController=function(){if(!this._oTransaction){this._oTransaction=new r(this._oModel,this._oQueue,{noBatchGroups:true},this._oDraftMergeTimer)}return this._oTransaction};a.prototype.invokeActions=function(e,t,r){var i,o,a,n,s=[],u,f=false;r=r||{};if(this._oDraftMergeTimer.nTimeoutID){f=true;if(r.triggerChanges){s.push(this.triggerSubmitChanges({batchGroupId:"Changes",successMsg:"Call of action succeeded",failedMsg:"Call of action failed",forceSubmit:true,context:i,actionInvokedWithPendingChanges:this._oModel.hasPendingChanges()}))}}a=t.length;n=this._getChangeSetFunc(t,r.operationGrouping);if(a===0){s.push(this._invokeAction(e,null,null,r))}else{for(o=0;o<a;o++){s.push(this._invokeAction(e,t[o],n(o),r))}}var c=this._oModel.getMetaModel().getODataFunctionImport(e.split("/")[1]);for(var l in c){if(l.startsWith("com.sap.vocabularies.Common.v1.SideEffects")){u=c[l];break}}if(u){this._executeSideEffectsForActions(u,t,r.triggerChanges)}if(r.triggerChanges!==false&&!f){r={batchGroupId:"Changes",changeSetId:"Action"+n(o+1),successMsg:"Call of action succeeded",failedMsg:"Call of action failed",forceSubmit:true,context:i};s.push(this.triggerSubmitChanges(r))}var h=this;return this._newPromiseAll(s).then(function(e){var i=false;if(e&&r.triggerChanges!==false&&e.length>t.length){e.pop()}i=h._checkAtLeastOneSuccess(t,e);if(i){if(f){h.oPropertyChangedResolve(e)}return e}else{if(f){h.oPropertyChangedReject(e)}return Promise.reject(e)}})};a.prototype.executeSideEffects=function(e,t,r,o,a){var n,s,u,f,c,l;var h=false;var g=!t&&!r;var p={bGlobal:false,aRequests:[],bHasTargets:true};var d={batchGroupId:"Changes",changeSetId:"SideEffects",noShowSuccessToast:true,forceSubmit:true,noBlockUI:true,urlParameters:{}};var v=i.getEntitySetFromContext(e);var S=e.getModel().getMetaModel();var C=S.getODataEntitySet(v).entityType;var m=S.getODataEntityType(C);var P=0;o=!(o===false);r=r||[];t=t||[];var y=function(t){if(l){d.urlParameters.SideEffectsQualifier=l}else{delete d.urlParameters.SideEffectsQualifier}this._executeSideEffects(t,e,d,p);if(p.aRequests[0]){c=p.aRequests[0];c(p.bGlobal,a);p.aRequests=[]}}.bind(this);for(var b in m){if(b.startsWith("com.sap.vocabularies.Common.v1.SideEffects")){n=m[b];f=false;l=this._getSideEffectsQualifier(b);if(g){if(!n.SourceProperties&&!n.SourceEntities){y(n);f=true;h=true;break}}else{if(n.SourceEntities&&n.SourceEntities.length){for(P=0;P<n.SourceEntities.length;P++){s=n.SourceEntities[P].NavigationPropertyPath;if(r.indexOf(s)!==-1){f=true}}}if(!f&&n.SourceProperties&&n.SourceProperties.length){for(P=0;P<n.SourceProperties.length;P++){u=n.SourceProperties[P].PropertyPath;if(t.indexOf(u)!==-1){f=true}}}if(f){y(n);h=true}}}}if(g&&!f){y({});h=true}if(o&&!p.bHasTargets){this._oModel.refresh(true,false,"Changes");h=true}var _=null;if(h){_=this.triggerSubmitChanges({batchGroupId:"Changes",noShowSuccessToast:true,forceSubmit:true,noBlockUI:true,urlParameters:{},draftSave:this._oModel.hasPendingChanges(true)})}else{_=Promise.resolve()}this.fireEvent("beforeSideEffectExecution",{promise:_});return _};a.prototype._checkAtLeastOneSuccess=function(e,t){var r,i=false;if(e.length<=t.length){for(r=0;r<e.length;r++){t[r].actionContext=e[r];if(!t[r].error){i=true}}if(e.length===0){for(r=0;r<t.length;r++){if(!t[r].error){i=true}}}}return i};a.prototype._newPromiseAll=function(e){var t=[];var r=Promise.resolve(null);e.forEach(function(e){r=r.then(function(){return e}).then(function(e){t.push({response:e})},function(e){t.push({error:e})})});return r.then(function(){return Promise.resolve(t)})};a.prototype._getChangeSetFunc=function(e,t){var r=e.length;var i=function(){return"Changes"};if(r===1){return i}if(t==="com.sap.vocabularies.UI.v1.OperationGroupingType/ChangeSet"){return i}return function(e){return"Changes"+e}};a.prototype.getNewActionContext=function(t,r,i){var o=this;i=e.extend({batchGroupId:"Changes",changeSetId:"SingleAction",successMsg:"Call of action succeeded",failedMsg:"Call of action failed",forceSubmit:true,context:r,functionImport:this._oMeta.getODataFunctionImport(t.split("/")[1])},i);var a=this._createFunctionContext(r,i);a.result=a.result.then(function(e){return o._normalizeResponse(e,true)},function(e){var t=o._normalizeError(e);throw t});return a};a.prototype.submitActionContext=function(e,t,r){var i;var o=this._oModel.getMetaModel().getODataFunctionImport(r);for(var a in o){if(a.startsWith("com.sap.vocabularies.Common.v1.SideEffects")){i=o[a];break}}if(i){this._executeSideEffectsForActions(i,[e])}this.triggerSubmitChanges({batchGroupId:"Changes",successMsg:"Call of action succeeded",failedMsg:"Call of action failed",forceSubmit:true,context:t})};a.prototype._invokeAction=function(e,t,r,i){var o=this;var a=Object.assign({},i.headers);var n=Object.assign({},i.urlParameters);var s={batchGroupId:"Changes",changeSetId:r,successMsg:"Call of action succeeded",failedMsg:"Call of action failed",urlParameters:n,forceSubmit:true,context:t,headers:a};if(i.triggerChanges===false){s.batchGroupId="NonDraftChanges"}return this._callAction(e,t,s).then(function(e){return o._normalizeResponse(e,true)},function(e){var t=o._normalizeError(e);throw t})};a.prototype.synchronizeDraftAsync=function(){var e={batchGroupId:"Changes",changeSetId:"Changes",onlyIfPending:true,noShowResponse:true,noBlockUI:true,draftSave:this._oModel.hasPendingChanges()};return this.triggerSubmitChanges(e)};a.prototype.destroy=function(){t.prototype.destroy.apply(this,[]);if(this._oTransaction){this._oTransaction.destroy()}this._oModel=null;this._oTransaction=null;this._oGroupChanges=null};return a},true);