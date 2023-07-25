/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(e,t,i,n){"use strict";var o="sap.ui.model.odata.v4.Context",r=0,s,h=-9007199254740991,a=n.extend("sap.ui.model.odata.v4.Context",{constructor:d});function d(e,t,i,o,r,s,h){if(i[0]!=="/"){throw new Error("Not an absolute path: "+i)}if(i.endsWith("/")){throw new Error("Unsupported trailing slash: "+i)}n.call(this,e,i);this.oBinding=t;this.oCreatedPromise=r&&Promise.resolve(r).then(function(){});this.oSyncCreatePromise=r;this.oDeletePromise=null;this.iGeneration=s||0;this.bInactive=h||undefined;this.iIndex=o;this.bKeepAlive=false;this.bSelected=false;this.fnOnBeforeDestroy=undefined}a.prototype.adjustPredicate=function(e,t,i){var n=this.sPath;this.sPath=n.replace(e,t);if(i){i(n,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(i){i.adjustPredicate(e,t)})};a.prototype.checkUpdate=function(){this.oModel.getDependentBindings(this).forEach(function(e){e.checkUpdate()})};a.prototype.checkUpdateInternal=function(){return i.all(this.oModel.getDependentBindings(this).map(function(e){return e.checkUpdateInternal()}))};a.prototype.collapse=function(){switch(this.getProperty("@$ui5.node.level")===0?undefined:this.isExpanded()){case true:this.oBinding.collapse(this);break;case false:throw new Error("Already collapsed: "+this);default:throw new Error("Not expandable: "+this)}};a.prototype.created=function(){return this.oCreatedPromise};a.prototype.delete=function(t,n){var o,r=null,s=this;if(this.isDeleted()){throw new Error("Must not delete twice: "+this)}if(this.oBinding.mParameters.$$aggregation){throw new Error("Cannot delete "+this+" when using data aggregation")}this.oBinding.checkSuspended();if(this.isTransient()){t=null}else if(t===null){if(!(this.isKeepAlive()&&this.iIndex===undefined)){throw new Error("Cannot delete "+this)}}if(t===null){o=i.resolve();n=true}else{e.checkGroupId(t);o=this.fetchCanonicalPath().then(function(e){return e.slice(1)});r=this.oBinding.lockGroup(t,true,true)}return Promise.resolve(o.then(function(e){return s.oBinding.delete(r,e,s,null,n,function(){s.oDeletePromise=null})}).catch(function(e){if(r){r.unlock(true)}throw e}))};a.prototype.destroy=function(){var e=this.fnOnBeforeDestroy;if(e){this.fnOnBeforeDestroy=undefined;e()}this.oModel.getDependentBindings(this).forEach(function(e){e.setContext(undefined)});this.oBinding=undefined;this.oCreatedPromise=undefined;this.oSyncCreatePromise=undefined;this.bInactive=undefined;this.bKeepAlive=undefined;this.bSelected=false;this.oModel=undefined;n.prototype.destroy.call(this)};a.prototype.doDelete=function(e,t,i,n,r,s){var h=this.oModel,a=this;this.oDeletePromise=r.deleteFromCache(e,t,i,n,s).then(function(){var e=a.sPath.slice(1);h.getAllBindings().forEach(function(t){t.removeCachesAndMessages(e,true)})}).catch(function(e){h.reportError("Failed to delete "+a.getPath(),o,e);a.checkUpdate();throw e});if(e&&this.oModel.isApiGroup(e.getGroupId())){h.getDependentBindings(this).forEach(function(e){e.setContext(undefined)})}return this.oDeletePromise};a.prototype.doSetProperty=function(t,n,r,s,h){var a=this.oModel,d=a.getMetaModel(),u,c,l=this;if(this.isDeleted()){if(r){r.unlock()}throw new Error("Must not modify a deleted entity: "+this)}if(r&&this.isTransient()&&!this.isInactive()){c=this.getValue();u=c&&e.getPrivateAnnotation(c,"transient");if(u instanceof Promise){r.unlock();r=r.getUnlockedCopy();this.doSetProperty(t,n,null,true,true).catch(this.oModel.getReporter());return i.resolve(u).then(function(e){return e&&l.created()}).then(function(){return l.doSetProperty(t,n,r,s)})}}if(this.oModel.bAutoExpandSelect){t=d.getReducedPath(this.oModel.resolve(t,this),this.oBinding.getBaseForPathReduction())}return this.withCache(function(i,u,c){return c.doSetProperty(u,n,r)||d.fetchUpdateData(t,l,!r).then(function(u){var f=e.getRelativePath(u.entityPath,c.oReturnValueContext?c.oReturnValueContext.getPath():c.getResolvedPath()),p=false;function g(e){a.reportError("Failed to update path "+a.resolve(t,l),o,e);P(false)}function P(e){if(p){c.firePatchCompleted(e);p=false}}function v(){p=true;c.firePatchSent()}if(!r){return i.setProperty(u.propertyPath,n,f,h)}if(l.isInactive()){i.setProperty(u.propertyPath,n,f,h).catch(l.oModel.getReporter());if(c.fireCreateActivate(l)){l.bInactive=false}else{l.bInactive=1}}return i.update(r,u.propertyPath,n,s?undefined:g,u.editUrl,f,d.getUnitOrCurrencyPath(l.oModel.resolve(t,l)),c.isPatchWithoutSideEffects(),v,l.isKeepAlive.bind(l),l.isInactive()).then(function(){P(true)},function(e){P(false);throw e})})},t,false,true)};a.prototype.expand=function(){switch(this.isExpanded()){case false:this.oBinding.expand(this).catch(this.oModel.getReporter());break;case true:throw new Error("Already expanded: "+this);default:throw new Error("Not expandable: "+this)}};a.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};a.prototype.fetchPrimitiveValue=function(e,t,n){var o,r=[this.fetchValue(e,null,n)],s=this.oModel.resolve(e,this);if(t){r.push(this.oModel.getMetaModel().fetchUI5Type(s))}return i.all(r).then(function(e){var i=e[1],n=e[0];if(n&&typeof n==="object"){o=new Error("Accessed value is not primitive: "+s);o.isNotPrimitive=true;throw o}return t?i.formatValue(n,"string"):n})};a.prototype.fetchValue=function(e,t,n){var o=this.oBinding;if(this.iIndex===h){return i.resolve()}if(o.getHeaderContext&&o.getHeaderContext()===this){if(e&&e.startsWith(this.sPath)){e=e.slice(this.sPath.length+1)}if(!e){return o.fetchValue(this.sPath,t,n).then(function(e){return{$count:e.$count}})}else if(e!=="$count"){throw new Error("Invalid header path: "+e)}}if(!e){e=this.sPath}else if(e[0]!=="/"){e=this.oModel.resolve(e,this);if(this.oModel.bAutoExpandSelect){e=this.oModel.getMetaModel().getReducedPath(e,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(e,t,n)};a.prototype.getAndRemoveValue=function(e){return this.withCache(function(e,t){return e.getAndRemoveValue(t)},e,true).getResult()};a.prototype.getBinding=function(){return this.oBinding};a.prototype.getCanonicalPath=e.createGetMethod("fetchCanonicalPath",true);a.prototype.getGeneration=function(e){if(this.iGeneration||e){return this.iGeneration}return this.oBinding.getGeneration()};a.prototype.getGroupId=function(){return this.oBinding.getGroupId()};a.prototype.getIndex=function(){if(this.iIndex===undefined){return undefined}if(this.oBinding.isFirstCreateAtEnd()){if(this.iIndex<0){return this.oBinding.bLengthFinal?this.oBinding.iMaxLength-this.iIndex-1:-this.iIndex-1}return this.iIndex}return this.getModelIndex()};a.prototype.getModelIndex=function(){if(this.iIndex!==undefined&&this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};a.prototype.getObject=function(t){return e.publicClone(this.getValue(t))};a.prototype.getProperty=function(e,i){var n,r;this.oBinding.checkSuspended();r=this.fetchPrimitiveValue(e,i,true);if(r.isRejected()){r.caught();n=r.getResult();if(n.isNotPrimitive){throw n}else if(!n.$cached){t.warning(n.message,e,o)}}return r.isFulfilled()?r.getResult():undefined};a.prototype.getQueryOptionsForPath=function(e){return this.oBinding.getQueryOptionsForPath(e)};a.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};a.prototype.getValue=function(e){var t,i=this;this.oBinding.checkSuspended();t=this.fetchValue(e,null,true).catch(function(e){if(!e.$cached){i.oModel.reportError("Unexpected error",o,e)}});if(t.isFulfilled()){return t.getResult()}};a.prototype.hasPendingChanges=function(){var e=this;return this.isTransient()&&this.isInactive()!==true||this.oDeletePromise&&this.oDeletePromise.isPending()||this.oBinding.hasPendingChangesForPath(this.sPath)||this.oModel.getDependentBindings(this).some(function(t){return t.oCache?t._hasPendingChanges(false,e.sPath):t.hasPendingChangesInDependents(false,e.sPath)})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};a.prototype.isDeleted=function(){return!!this.oDeletePromise};a.prototype.isExpanded=function(){return this.getProperty("@$ui5.node.isExpanded")};a.prototype.isInactive=function(){return this.bInactive};a.prototype.isKeepAlive=function(){return this.bKeepAlive};a.prototype.isSelected=function(){return this.bSelected};a.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};a.prototype.patch=function(e){return this.withCache(function(t,i){t.patch(i,e)},"")};a.prototype.refresh=function(e,t){this.requestRefresh.apply(this,arguments).catch(this.oModel.getReporter())};a.prototype.refreshDependentBindings=function(e,t,n,o){return i.all(this.oModel.getDependentBindings(this).map(function(i){return i.refreshInternal(e,t,n,o)}))};a.prototype.replaceWith=function(t){var i;this.oBinding.checkSuspended();if(this.isTransient()||this.isDeleted()){throw new Error("Cannot replace "+this)}if(t.oBinding!==this.oBinding||t.iIndex!==undefined||t.isDeleted()||!t.isKeepAlive()){throw new Error("Cannot replace with "+t)}i=t.getValue();this.oBinding.doReplaceWith(this,i,e.getPrivateAnnotation(i,"predicate"))};a.prototype.requestCanonicalPath=e.createRequestMethod("fetchCanonicalPath");a.prototype.requestObject=function(t){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(t)).then(e.publicClone)};a.prototype.requestProperty=function(e,n){var r=Array.isArray(e)?e:[e],s=this;this.oBinding.checkSuspended();return Promise.all(r.map(function(e){return s.oBinding.fetchIfChildCanUseCache(s,e,i.resolve({})).then(function(i){if(i){return s.fetchPrimitiveValue(i,n)}t.error("Not a valid property path: "+e,undefined,o)})})).then(function(t){return Array.isArray(e)?t:t[0]})};a.prototype.requestRefresh=function(t,i){var n;e.checkGroupId(t);if(this.oBinding.mParameters.$$aggregation){throw new Error("Cannot refresh "+this+" when using data aggregation")}this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){n=this.oBinding.refreshSingle(this,this.oBinding.lockGroup(t,true),i)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+i)}n=this.oBinding.refreshReturnValueContext(this,t)||this.oBinding.requestRefresh(t)}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1));return Promise.resolve(n).then(function(){})};a.prototype.requestSideEffects=function(t,n){var o,r=this.oModel.getMetaModel(),s=[],h=[],a,d,u=this;function c(e){if(!e){return false}if(e==="*"){return true}if(e.endsWith("/*")){e=e.slice(0,-2)}return!e.includes("*")}this.oBinding.checkSuspended();e.checkGroupId(n);if(this.isTransient()||this.isDeleted()){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(!this.oBinding.isResolved()){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}o=r.getObject("/$EntityContainer");if(!o){throw new Error("Missing metadata")}o="/"+o+"/";t.map(function(e){if(e&&typeof e==="object"){if(c(e.$PropertyPath)){return e.$PropertyPath}if(typeof e.$NavigationPropertyPath==="string"&&!e.$NavigationPropertyPath.includes("*")){return e.$NavigationPropertyPath}}else if(typeof e==="string"&&(!e||c(e))){return e}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(e))}).forEach(function(e){if(e[0]==="/"){if(!e.startsWith(o)){throw new Error("Path must start with '"+o+"': "+e)}h.push(e.slice(o.length-1))}else{s.push(e)}});a=this.oBinding.getRootBinding();d=a.getResolvedPath();s=s.reduce(function(t,i){return t.concat(r.getAllPathReductions(e.buildPath(u.getPath(),i),d))},[]);s=e.filterPaths(h,s);n=n||this.getUpdateGroupId();return Promise.resolve(i.resolve(this.oModel.isAutoGroup(n)&&this.oModel.oRequestor.waitForRunningChangeRequests(n).then(function(){u.oModel.oRequestor.relocateAll("$parked."+n,n)})).then(function(){return i.all([u.oModel.requestSideEffects(n,h),u.requestSideEffectsInternal(s,n)])})).then(function(){})};a.prototype.requestSideEffectsInternal=function(t,n){var o=this,r,s=o,h,a=[],d,u=[],c,l=[];if(!t.length){return undefined}for(;;){r=s.oBinding;c=r.getPath();d=r.getContext();if(r.oCache&&(!h||r.oCache.hasChangeListeners())){h=s}if(h&&c){break}if(!r.getBoundContext){throw new Error("Not a context binding: "+r)}s=d}r=h.oBinding;t.forEach(function(t){var i=e.getRelativePath(t,h.getPath());if(i===undefined){u.push(t)}else{a.push(i)}});if(u.length){l.push(r.getContext().requestSideEffectsInternal(u,n))}if(a.length&&r.oCache!==undefined){l.push(r.requestSideEffects(n,a,h))}return i.all(l)};a.prototype.resetChanges=function(){var e=this.oDeletePromise?[this.oDeletePromise.catch(function(){})]:[],t=this;if(this.iIndex===h||this.isTransient()&&!this.isInactive()||this.oBinding.getHeaderContext&&this===this.oBinding.getHeaderContext()||this.oBinding.getParameterContext&&this===this.oBinding.getParameterContext()){throw new Error("Cannot reset: "+this)}this.oBinding.checkSuspended();this.oBinding.resetChangesForPath(this.sPath,e);if(this.bInactive===1){this.bInactive=true}this.oModel.getDependentBindings(this).forEach(function(i){if(i.oCache){e.push(i._resetChanges(t.sPath))}else{i.resetChangesInDependents(e,t.sPath);i.resetInvalidDataState()}});return Promise.all(e).then(function(){})};a.prototype.resetKeepAlive=function(){this.bKeepAlive=false};a.prototype.setInactive=function(){if(!this.bInactive){throw new Error("Not inactive: "+this.bInactive)}this.bInactive=true};a.prototype.setKeepAlive=function(t,i,n){var o=this;if(this.isTransient()||t&&this.isDeleted()){throw new Error("Unsupported context "+this)}e.getPredicateIndex(this.sPath);this.oBinding.checkKeepAlive(this);if(t&&n){if(!this.oModel.bAutoExpandSelect){throw new Error("Missing parameter autoExpandSelect at model")}this.bKeepAlive=t;this.oModel.getMetaModel().fetchObject(e.getMetaPath(this.sPath)+"/@com.sap.vocabularies.Common.v1.Messages/$Path").then(function(e){if(!e){throw new Error("Missing @com.sap.vocabularies.Common.v1.Messages")}return o.oBinding.fetchIfChildCanUseCache(o,e,{})}).then(function(e){return o.fetchValue(e)}).catch(this.oModel.getReporter())}this.bKeepAlive=t;this.fnOnBeforeDestroy=t?i:undefined};a.prototype.setNewGeneration=function(){r+=1;this.iGeneration=r};a.prototype.setProperty=function(t,i,n,r){var s=null,h=this.oModel,a=this;this.oBinding.checkSuspended();if(typeof i==="function"||i&&typeof i==="object"){throw new Error("Not a primitive value")}if(n!==null){e.checkGroupId(n);s=this.oBinding.lockGroup(n,true,true)}return Promise.resolve(this.doSetProperty(t,i,s,!r)).catch(function(e){if(s){s.unlock(true)}h.reportError("Failed to update path "+h.resolve(t,a),o,e);throw e})};a.prototype.setSelected=function(e){if(!this.oBinding.getHeaderContext){throw new Error("Unsupported context: "+this)}if(e&&this.isDeleted()){throw new Error("Must not select a deleted entity: "+this)}this.bSelected=e};a.prototype.toString=function(){var e="";if(!this.oModel){e=";destroyed"}else if(this.isDeleted()){e=";deleted"}if(this.iIndex!==undefined){if(!e){switch(this.isTransient()){case false:e=";createdPersisted";break;case true:e=this.isInactive()?";inactive":";transient";break}}if(this.bSelected){e+=";selected"}e="["+this.iIndex+e+"]"}return this.sPath+e};a.prototype.updateAfterCreate=function(e,t){i.all(this.oModel.getDependentBindings(this).map(function(i){return i.updateAfterCreate(e,t)})).catch(this.oModel.getReporter())};a.prototype.withCache=function(e,t,n,o){if(this.iIndex===h){return i.resolve()}return this.oBinding.withCache(e,this.oModel.resolve(t,this),n,o)};s={create:function(e,t,i,n,o,r){return new a(e,t,i,n,o,0,r)},createNewContext:function(e,t,i){r+=1;return new a(e,t,i,undefined,undefined,r)}};Object.defineProperty(s,"VIRTUAL",{value:h});return s},false);