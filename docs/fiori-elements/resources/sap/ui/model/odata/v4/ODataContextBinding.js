/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/ContextBinding"],function(e,t,n,i,o,r,a,s,h){"use strict";var u="sap.ui.model.odata.v4.ODataContextBinding",d={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true},c=h.extend("sap.ui.model.odata.v4.ODataContextBinding",{constructor:p});function l(e,t){var n=e.slice(0,e.lastIndexOf("/")),i=n.indexOf("(");return(i<0?n:e.slice(0,i))+t}function p(n,i,r,a){var s=i.indexOf("(...)"),u=this;h.call(this,n,i);t.call(this);if(i.endsWith("/")){throw new Error("Invalid path: "+i)}this.bHasFetchedExpandSelectProperties=false;this.oOperation=undefined;this.oParameterContext=null;this.oReturnValueContext=null;if(s>=0){if(s!==this.sPath.length-5){throw new Error("The path must not continue after a deferred operation: "+this.sPath)}this.oOperation={bAction:undefined,mChangeListeners:{},mParameters:{},sResourcePath:undefined};if(!this.bRelative){this.oParameterContext=e.create(this.oModel,this,this.sPath+"/$Parameter")}}a=o.clone(a)||{};this.checkBindingParameters(a,["$$canonicalPath","$$groupId","$$inheritExpandSelect","$$ownRequest","$$patchWithoutSideEffects","$$updateGroupId"]);this.sGroupId=a.$$groupId;this.bInheritExpandSelect=a.$$inheritExpandSelect;this.sUpdateGroupId=a.$$updateGroupId;this.applyParameters(a);this.oElementContext=this.bRelative?null:e.createNewContext(this.oModel,this,i);if(!this.oOperation&&(!this.bRelative||r&&!r.fetchValue)){this.createReadGroupLock(this.getGroupId(),true)}this.setContext(r);n.bindingCreated(this);Promise.resolve().then(function(){u.bInitial=false})}t(c.prototype);c.prototype._execute=function(t,n,i,a,h){var d=this.oModel.getMetaModel(),c,p,f=this.getResolvedPathWithReplacedTransientPredicates(),g=o.getMetaPath(f),C=this;function m(){C._fireChange({reason:s.Change});return C.refreshDependentBindings("",t.getGroupId(),true)}p=d.fetchObject(g+"/@$ui5.overload").then(function(e){var o,r,s;if(!e){c=d.getObject(g);if(!c||c.$kind!=="NavigationProperty"||!h){throw new Error("Unknown operation: "+f)}}else if(e.length!==1){throw new Error("Expected a single overload, but found "+e.length+" for "+f)}else{c=e[0]}if(C.bRelative&&C.oContext.getBinding){r=C.sPath.lastIndexOf("/");s=r>=0?C.sPath.slice(0,r):"";o=C.oContext.getValue.bind(C.oContext,s)}return C.createCacheAndRequest(t,f,c,n,o,i,a)}).then(function(t){return m().then(function(){var n,i,a,s;if(C.isReturnValueLikeBindingParameter(c)){i=C.oContext.getValue();n=i&&o.getPrivateAnnotation(i,"predicate");a=o.getPrivateAnnotation(t,"predicate");if(a){if(n===a){C.oContext.patch(t)}if(C.hasReturnValueContext()){if(h){C.oCache=null;C.oCachePromise=r.resolve(null);s=C.oContext.getBinding().doReplaceWith(C.oContext,t,a);s.setNewGeneration();return s}C.oReturnValueContext=e.createNewContext(C.oModel,C,l(f,a));C.oCache.setResourcePath(C.oReturnValueContext.getPath().slice(1));return C.oReturnValueContext}}}if(h){throw new Error("Cannot replace w/o return value context")}})},function(e){o.adjustTargetsInError(e,c,C.oParameterContext.getPath(),C.bRelative?C.oContext.getPath():undefined);return m().then(function(){throw e})}).catch(function(e){t.unlock(true);C.oModel.reportError("Failed to execute "+f,u,e);throw e});return Promise.resolve(p)};c.prototype.adjustPredicate=function(e,n){t.prototype.adjustPredicate.apply(this,arguments);if(this.mCacheQueryOptions){this.fetchCache(this.oContext,true)}if(this.oElementContext){this.oElementContext.adjustPredicate(e,n)}};c.prototype.applyParameters=function(e,t){this.mQueryOptions=this.oModel.buildQueryOptions(e,true);this.mParameters=e;if(this.isRootBindingSuspended()){if(!this.oOperation){this.sResumeChangeReason=s.Change}}else if(!this.oOperation){this.fetchCache(this.oContext);if(t){this.refreshInternal("",undefined,true).catch(this.oModel.getReporter())}}else if(this.oOperation.bAction===false){this.execute().catch(this.oModel.getReporter())}};c.prototype.attachEvent=function(e,t,n,i){if(!(e in d)){throw new Error("Unsupported event '"+e+"': v4.ODataContextBinding#attachEvent")}return h.prototype.attachEvent.apply(this,arguments)};c.prototype.computeOperationQueryOptions=function(){return Object.assign({},this.oModel.mUriParameters,this.getQueryOptionsFromParameters())};c.prototype.checkKeepAlive=function(){throw new Error("Unsupported "+this)};c.prototype.createCacheAndRequest=function(e,t,i,a,s,h,u){var d=i.$kind==="Action",c,p=s,f=this.oModel,g=o.getMetaPath(t),C=t.slice(1),m=f.oRequestor,x=this;function P(e){if(x.isReturnValueLikeBindingParameter(i)){if(x.hasReturnValueContext()){return l(C,o.getPrivateAnnotation(e,"predicate"))}if(o.getPrivateAnnotation(p,"predicate")===o.getPrivateAnnotation(e,"predicate")){return C.slice(0,C.lastIndexOf("/"))}}return C}function y(e){var t;o.adjustTargetsInError(e,i,x.oParameterContext.getPath(),x.bRelative?x.oContext.getPath():undefined);e.error.$ignoreTopLevel=true;t=u(o.extractMessages(e).map(function(e){return x.oModel.createUI5Message(e)}));if(!(t instanceof Promise)){throw new Error("Not a promise: "+t)}return t}if(u&&i.$kind!=="Action"){throw new Error("Not an action: "+t)}if(!d&&i.$kind!=="Function"&&i.$kind!=="NavigationProperty"){throw new Error("Not an operation: "+t)}if(d&&s){p=s()}if(h&&!(d&&i.$IsBound&&p)){throw new Error("Not a bound action: "+t)}if(this.bInheritExpandSelect&&!this.isReturnValueLikeBindingParameter(i)){throw new Error("Must not set parameter $$inheritExpandSelect on this binding")}if(i.$kind!=="NavigationProperty"){g+="/@$ui5.overload/0/$ReturnType";if(i.$ReturnType&&!i.$ReturnType.$Type.startsWith("Edm.")){g+="/$Type"}}else if(Object.keys(a).length){throw new Error("Unsupported parameters for navigation property")}if(x.oReturnValueContext){x.oReturnValueContext.destroy();x.oReturnValueContext=null}this.oOperation.bAction=d;this.oOperation.mRefreshParameters=a;a=Object.assign({},a);this.mCacheQueryOptions=this.computeOperationQueryOptions();t=m.getPathAndAddQueryOptions(t,i,a,this.mCacheQueryOptions,p);c=n.createSingle(m,t,this.mCacheQueryOptions,f.bAutoExpandSelect,f.bSharedRequests,undefined,d,g);this.oCache=c;this.oCachePromise=r.resolve(c);return d?c.post(e,a,p,h,u&&y,P):c.fetchValue(e,"",undefined,undefined,false,P)};c.prototype.delete=function(e,t,n,i,o,r){var a=this._findEmptyPathParentContext(this.oElementContext),h=a.getBinding(),u=h.getContext(),d=h.oReturnValueContext,c=this;function l(){r();a.oDeletePromise=null}if(!h.execute){n.oDeletePromise=h.delete(e,t,a,n.getValue(),o,l);return n.oDeletePromise}h.oElementContext=null;if(d){h.oReturnValueContext=null}this._fireChange({reason:s.Remove});n.oDeletePromise=a.doDelete(e,t,"",null,this,function(e,t){if(t>0){l()}}).then(function(){a.destroy();if(d){d.destroy()}},function(e){l();if(!h.isRelative()||u===h.getContext()){h.oElementContext=a;if(d){h.oReturnValueContext=d}c._fireChange({reason:s.Add})}throw e});return n.oDeletePromise};c.prototype.destroy=function(){if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=undefined}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=undefined}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=undefined}this.oModel.bindingDestroyed(this);this.oOperation=undefined;this.mParameters=undefined;this.mQueryOptions=undefined;t.prototype.destroy.call(this);h.prototype.destroy.call(this)};c.prototype.doCreateCache=function(e,t,i,o){return n.createSingle(this.oModel.oRequestor,e,t,this.oModel.bAutoExpandSelect,this.oModel.bSharedRequests,o)};c.prototype.doDeregisterChangeListener=function(e,n){if(this.oOperation&&(e==="$Parameter"||e.startsWith("$Parameter/"))){o.removeByPath(this.oOperation.mChangeListeners,e.slice(11),n);return}t.prototype.doDeregisterChangeListener.apply(this,arguments)};c.prototype.doFetchQueryOptions=function(e){return this.fetchResolvedQueryOptions(e)};c.prototype.doSetProperty=function(e,t,i){if(this.oOperation&&(e==="$Parameter"||e.startsWith("$Parameter/"))){o.updateAll(this.oOperation.mChangeListeners,"",this.oOperation.mParameters,n.makeUpdateData(e.split("/").slice(1),t));this.oOperation.bAction=undefined;if(i){i.unlock()}return r.resolve()}};c.prototype.doSuspend=function(){if(this.bInitial&&!this.oOperation){this.sResumeChangeReason=s.Change}};c.prototype.execute=function(e,t,n,i){var r=this.getResolvedPath();this.checkSuspended();o.checkGroupId(e);if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(this.bRelative){if(!r){throw new Error("Unresolved binding: "+this.sPath)}if(this.oContext.isTransient&&this.oContext.isTransient()){throw new Error("Execute for transient context not allowed: "+r)}if(this.oContext.getPath().includes("(...)")){throw new Error("Nested deferred operation bindings not supported: "+r)}if(i){if(!this.oContext.getBinding){throw new Error("Cannot replace this parent context: "+this.oContext)}this.oContext.getBinding().checkKeepAlive(this.oContext)}}else if(i){throw new Error("Cannot replace when operation is not relative")}return this._execute(this.lockGroup(e,true),o.publicClone(this.oOperation.mParameters,true),t,n,i)};c.prototype.doFetchExpandSelectProperties=function(){var e,t=this;if(this.bHasFetchedExpandSelectProperties||!this.oModel.bAutoExpandSelect||!this.mParameters.$expand&&!this.mParameters.$select){return}e=this.getResolvedPath();o.convertExpandSelectToPaths(this.oModel.buildQueryOptions(this.mParameters,true)).forEach(function(n){t.oContext.fetchValue(o.buildPath(e,n)).catch(t.oModel.getReporter())});this.bHasFetchedExpandSelectProperties=true};c.prototype.fetchValue=function(e,t,n){var a=n&&this.oCache!==undefined?r.resolve(this.oCache):this.oCachePromise,s,h=this.getRootBinding(),d=this;if(h&&h.isSuspended()){s=new Error("Suspended binding provides no value");s.canceled="noDebugLog";throw s}return a.then(function(r){var a,s=false,h,c=d.getResolvedPath(),l=r||d.oOperation?d.getRelativePath(e):undefined,p,f;if(d.oOperation){if(l===undefined){return d.oContext.fetchValue(e,t,n)}p=l.split("/");if(p[0]==="$Parameter"){if(p.length===1){return undefined}o.addByPath(d.oOperation.mChangeListeners,l.slice(11),t);f=o.drillDown(d.oOperation.mParameters,p.slice(1));return f===undefined?null:f}}if(r&&l!==undefined){if(n){h=i.$cached}else{h=d.oReadGroupLock||d.lockGroup();d.oReadGroupLock=undefined}a=d.isRefreshWithoutBubbling();return d.resolveRefreshPromise(r.fetchValue(h,l,function(){s=true;d.fireDataRequested(a)},t)).then(function(e){d.assertSameCache(r);return e}).then(function(e){if(s){d.fireDataReceived({data:{}},a)}return e},function(e){h.unlock(true);if(s){d.oModel.reportError("Failed to read path "+c,u,e);d.fireDataReceived(e.canceled?{data:{}}:{error:e},a)}throw e})}if(!d.oOperation&&d.oContext){if(!n){d.doFetchExpandSelectProperties()}return d.oContext.fetchValue(e,t,n)}})};c.prototype.findContextForCanonicalPath=function(e){var t=this.oOperation?this.oReturnValueContext:this.oElementContext,n,i;if(t){n=t.getValue();if(n&&o.hasPrivateAnnotation(n,"predicate")){i=t.fetchCanonicalPath();i.caught();if(i.getResult()===e){return t}}}};c.prototype.getDependentBindings=function(){return this.oModel.getDependentBindings(this)};c.prototype.getParameterContext=function(){if(!this.oOperation){throw new Error("Not a deferred operation binding: "+this)}return this.oParameterContext};c.prototype.getQueryOptionsFromParameters=function(){var e,t=this.mQueryOptions;if(this.bInheritExpandSelect){e=this.oContext.getBinding().getInheritableQueryOptions();t=Object.assign({},t);if("$select"in e){t.$select=t.$select&&t.$select.slice();o.addToSelect(t,e.$select)}if("$expand"in e){t.$expand=e.$expand}}return t};c.prototype.getResolvedPathWithReplacedTransientPredicates=function(){var e="",t=this.getResolvedPath(),n,i=this;if(t&&t.includes("($uid=")){n=t.slice(1).split("/");t="";n.forEach(function(n){var r,a,s;e+="/"+n;s=n.indexOf("($uid=");if(s>=0){r=i.oContext.getValue(e);a=r&&o.getPrivateAnnotation(r,"predicate");if(!a){throw new Error("No key predicate known at "+e)}t+="/"+n.slice(0,s)+a}else{t+="/"+n}})}return t};c.prototype.hasReturnValueContext=function(){var e=o.getMetaPath(this.getResolvedPath()).split("/");return e.length===3&&this.oModel.getMetaModel().getObject("/"+e[1]).$kind==="EntitySet"};c.prototype.initialize=function(){this.bInitial=false;if(this.isResolved()&&!this.getRootBinding().isSuspended()){this._fireChange({reason:s.Change})}};c.prototype.isReturnValueLikeBindingParameter=function(e){var t,n;if(!(this.bRelative&&this.oContext&&this.oContext.getBinding)){return false}if(e.$kind==="NavigationProperty"){if(e.$isCollection||this.sPath.includes("/")){return false}n=o.getMetaPath(this.oContext.getPath());if(n.lastIndexOf("/")>0){return false}t=this.oModel.getMetaModel().getObject(n);return t.$kind==="EntitySet"&&t.$Type===e.$Type&&t.$NavigationPropertyBinding&&t.$NavigationPropertyBinding[this.sPath.slice(0,-5)]===n.slice(1)}return e.$IsBound&&e.$ReturnType&&!e.$ReturnType.$isCollection&&e.$EntitySetPath&&!e.$EntitySetPath.includes("/")};c.prototype.refreshDependentBindings=function(e,t,n,i){return r.all(this.getDependentBindings().map(function(o){return o.refreshInternal(e,t,n,i)}))};c.prototype.refreshInternal=function(t,n,i,o){var a=this;if(this.oOperation&&this.oOperation.bAction!==false){return r.resolve()}this.bHasFetchedExpandSelectProperties=false;if(this.isRootBindingSuspended()){this.refreshSuspended(n);return this.refreshDependentBindings(t,n,i,o)}this.createReadGroupLock(n,this.isRoot());return this.oCachePromise.then(function(h){var u,d=a.oRefreshPromise,c=a.oReadGroupLock;if(!a.oElementContext){a.oElementContext=e.create(a.oModel,a,a.getResolvedPath());if(!h){a._fireChange({reason:s.Refresh})}}if(a.oOperation){a.oReadGroupLock=undefined;return a._execute(c,a.oOperation.mRefreshParameters)}if(h&&!d){u=h.hasChangeListeners();a.removeCachesAndMessages(t);a.fetchCache(a.oContext,false,false,o?n:undefined);d=u?a.createRefreshPromise(o):undefined;if(o&&d){d=d.catch(function(e){return a.fetchResourcePath(a.oContext).then(function(e){if(!a.bRelative||h.getResourcePath()===e){a.oCache=h;a.oCachePromise=r.resolve(h);h.setActive(true);return a.checkUpdateInternal()}}).then(function(){throw e})})}if(!i){a.fetchValue("").catch(a.oModel.getReporter())}}return r.all([d,a.refreshDependentBindings(t,n,i,o)])})};c.prototype.refreshReturnValueContext=function(e,t,i){var a=this.oCache,s=this.mCacheQueryOptions,h=this.oModel,u,d=this;if(this.oReturnValueContext!==e){return null}this.mCacheQueryOptions=this.computeOperationQueryOptions();if(this.mLateQueryOptions){o.aggregateExpandSelect(this.mCacheQueryOptions,this.mLateQueryOptions)}this.oCache=n.createSingle(h.oRequestor,e.getPath().slice(1),this.mCacheQueryOptions,true,h.bSharedRequests);this.oCachePromise=r.resolve(this.oCache);this.createReadGroupLock(t,true);u=e.refreshDependentBindings("",t,true,i);if(i){u=u.catch(function(t){d.oCache=a;d.oCachePromise=r.resolve(a);d.mCacheQueryOptions=s;a.setActive(true);return e.checkUpdateInternal().then(function(){throw t})})}return u};c.prototype.requestSideEffects=function(e,t,n){var i=this.oModel,o=[],a=this;function s(e){return e.catch(function(e){i.reportError("Failed to request side effects",u,e);if(!e.canceled){throw e}})}if(t.indexOf("")<0){try{o.push(this.oCache.requestSideEffects(this.lockGroup(e),t,n&&n.getPath().slice(1)));this.visitSideEffects(e,t,n,o);return r.all(o.map(s)).then(function(){return a.refreshDependentListBindingsWithoutCache()})}catch(e){if(!e.message.startsWith("Unsupported collection-valued navigation property ")){throw e}}}return n&&this.refreshReturnValueContext(n,e,true)||this.refreshInternal("",e,true,true)};c.prototype.requestObject=function(e){return this.oElementContext?this.oElementContext.requestObject(e):Promise.resolve()};c.prototype.resumeInternal=function(e,t){var n=this.sResumeChangeReason,i=this;function o(){i.getDependentBindings().forEach(function(t){t.resumeInternal(e,!!n)})}this.sResumeChangeReason=undefined;if(this.oOperation){o();return}if(t||n){this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.removeCachesAndMessages("");this.fetchCache(this.oContext)}o();if(n){this._fireChange({reason:n})}};c.prototype.setContext=function(t){if(this.oContext!==t){if(this.bRelative&&(this.oContext||t)){this.checkSuspended(true);if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=null}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=null}this.fetchCache(t);if(t){this.oElementContext=e.create(this.oModel,this,this.oModel.resolve(this.sPath,t));if(this.oOperation){this.oParameterContext=e.create(this.oModel,this,this.oModel.resolve(this.sPath+"/$Parameter",t))}}this.bHasFetchedExpandSelectProperties=false;a.prototype.setContext.call(this,t)}else{this.oContext=t}}};c.prototype.setParameter=function(e,t){var n;if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(!e){throw new Error("Missing parameter name")}if(t===undefined){throw new Error("Missing value for parameter: "+e)}n=this.oOperation.mParameters[e];this.oOperation.mParameters[e]=t;o.informAll(this.oOperation.mChangeListeners,e,n,t);this.oOperation.bAction=undefined;return this};return c});