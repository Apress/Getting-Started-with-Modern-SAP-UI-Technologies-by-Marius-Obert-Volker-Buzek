/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/fe/core/CommonUtils","sap/fe/core/controllerextensions/BusyLocker","sap/fe/core/controllerextensions/collaboration/ActivitySync","sap/fe/core/controllerextensions/editFlow/draft","sap/fe/core/controllerextensions/routing/NavigationReason","sap/fe/core/helpers/ClassSupport","sap/fe/core/helpers/EditState","sap/fe/core/helpers/ModelHelper","sap/fe/core/helpers/SemanticKeyHelper","sap/ui/core/Component","sap/ui/core/Core","sap/ui/core/mvc/ControllerExtension","sap/ui/core/mvc/OverrideExecution","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(t,e,o,n,i,r,a,s,c,g,l,p,u,h,f,d){"use strict";var C,v,P,_,y,m,x,b,w,O,B,R,E,S,A,D,F,M,T,V,I,L,$,j,k,H,N,q,K,z,U,Q;var W=a.publicExtension;var X=a.methodOverride;var G=a.finalExtension;var J=a.extensible;var Y=a.defineUI5Class;var Z=n.isConnected;function tt(t,e){t.prototype=Object.create(e.prototype);t.prototype.constructor=t;et(t,e)}function et(t,e){et=Object.setPrototypeOf?Object.setPrototypeOf.bind():function t(e,o){e.__proto__=o;return e};return et(t,e)}function ot(t,e,o,n,i){var r={};Object.keys(n).forEach(function(t){r[t]=n[t]});r.enumerable=!!r.enumerable;r.configurable=!!r.configurable;if("value"in r||r.initializer){r.writable=true}r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r);if(i&&r.initializer!==void 0){r.value=r.initializer?r.initializer.call(i):void 0;r.initializer=undefined}if(r.initializer===void 0){Object.defineProperty(t,e,r);r=null}return r}let nt=(C=Y("sap.fe.core.controllerextensions.InternalRouting"),v=X(),P=X(),_=W(),y=J(h.After),m=W(),x=J(h.After),b=W(),w=J(h.After),O=W(),B=J(h.After),R=W(),E=W(),S=W(),A=G(),D=W(),F=G(),M=W(),T=G(),V=W(),I=G(),L=W(),$=G(),j=W(),k=G(),H=W(),N=W(),q=G(),K=W(),z=J(h.Before),C(U=(Q=function(n){tt(a,n);function a(){return n.apply(this,arguments)||this}var u=a.prototype;u.onExit=function t(){if(this._oRoutingService){this._oRoutingService.detachRouteMatched(this._fnRouteMatchedBound)}};u.onInit=function t(){this._oView=this.base.getView();this._oAppComponent=e.getAppComponent(this._oView);this._oPageComponent=l.getOwnerComponentFor(this._oView);this._oRouter=this._oAppComponent.getRouter();this._oRouterProxy=this._oAppComponent.getRouterProxy();if(!this._oAppComponent||!this._oPageComponent){throw new Error("Failed to initialize controler extension 'sap.fe.core.controllerextesions.InternalRouting")}if(this._oAppComponent===this._oPageComponent){this._oPageComponent=null}this._oAppComponent.getService("routingService").then(t=>{this._oRoutingService=t;this._fnRouteMatchedBound=this._onRouteMatched.bind(this);this._oRoutingService.attachRouteMatched(this._fnRouteMatchedBound);this._oTargetInformation=t.getTargetInformationFor(this._oPageComponent||this._oView)}).catch(function(){throw new Error("This controller extension cannot work without a 'routingService' on the main AppComponent")})};u.onRouteMatched=function t(){};u.onRouteMatchedFinished=function t(){};u.onBeforeBinding=function t(e,o){const n=this.base.getView().getController().routing;if(n&&n.onBeforeBinding){n.onBeforeBinding(e,o)}};u.onAfterBinding=function t(e,o){this._oAppComponent.getRootViewController().onContextBoundToView(e);const n=this.base.getView().getController().routing;if(n&&n.onAfterBinding){n.onAfterBinding(e,o)}};u.navigateToTarget=function t(e,o,n){const i=this._oPageComponent&&this._oPageComponent.getNavigationConfiguration&&this._oPageComponent.getNavigationConfiguration(o);if(i){const t=i.detail;const o=t.route;const r=t.parameters;this._oRoutingService.navigateTo(e,o,r,n)}else{this._oRoutingService.navigateTo(e,null,null,n)}this._oView.getViewData()};u.navigateToRoute=function t(e,o){return this._oRoutingService.navigateToRoute(e,o)};u.navigateToContext=function e(o,n){const i={};n=n||{};if(o.isA("sap.ui.model.odata.v4.ODataListBinding")){if(n.asyncContext){this._oRouterProxy.activateRouteMatchSynchronization();n.asyncContext.then(t=>{this.navigateToContext(t,{checkNoHashChange:n.checkNoHashChange,editable:n.editable,bPersistOPScroll:n.bPersistOPScroll,updateFCLLevel:n.updateFCLLevel,bForceFocus:n.bForceFocus})}).catch(function(e){t.error("Error with the async context",e)})}else if(!n.bDeferredContext){throw"navigation to a list binding is not yet supported"}}if(n.callExtension){const t=this._oView.getModel("internal");t.setProperty("/paginatorCurrentContext",null);i.sourceBindingContext=o.getObject();i.bindingContext=o;if(n.oEvent){i.oEvent=n.oEvent}const e=this.base.getView().getController().routing.onBeforeNavigation(i);if(e){t.setProperty("/paginatorCurrentContext",o);return Promise.resolve(true)}}n.FCLLevel=this._getFCLLevel();return this._oRoutingService.navigateToContext(o,n,this._oView.getViewData(),this._oTargetInformation)};u.navigateBackFromContext=function t(e,o){o=o||{};o.updateFCLLevel=-1;return this.navigateToContext(e,o)};u.navigateForwardToContext=function t(e,o){var n;if(((n=this._oView.getBindingContext("internal"))===null||n===void 0?void 0:n.getProperty("messageFooterContainsErrors"))===true){return Promise.resolve(true)}o=o||{};o.updateFCLLevel=1;return this.navigateToContext(e,o)};u.navigateBackFromTransientState=function t(){const e=this._oRouterProxy.getHash();if(e.indexOf("(...)")!==-1){this._oRouterProxy.navBack()}};u.navigateToMessagePage=function t(e,o){o=o||{};if(this._oRouterProxy.getHash().indexOf("i-action=create")>-1||this._oRouterProxy.getHash().indexOf("i-action=autoCreate")>-1){return this._oRouterProxy.navToHash(this._oRoutingService.getDefaultCreateHash())}else{o.FCLLevel=this._getFCLLevel();return this._oAppComponent.getRootViewController().displayErrorPage(e,o)}};u.isCurrentStateImpactedBy=function t(e){return this._oRoutingService.isCurrentStateImpactedBy(e)};u._isViewPartOfRoute=function t(e){const o=e===null||e===void 0?void 0:e.targets;if(!o||o.indexOf(this._oTargetInformation.targetName)===-1){if((this._oTargetInformation.viewLevel??0)>=((e===null||e===void 0?void 0:e.routeLevel)??0)){this._setBindingContext(null)}return false}return true};u._buildBindingPath=function t(e,o,n){let i=o.replace(":?query:","");let r=false;for(const t in e){const a=e[t];if(a==="..."&&o.indexOf(`{${t}}`)>=0){r=true;n.bTargetEditable=true}i=i.replace(`{${t}}`,a)}if(e["?query"]&&e["?query"].hasOwnProperty("i-action")){n.bActionCreate=true}if(i&&i[0]!=="/"){i=`/${i}`}return{path:i,deferred:r}};u._onRouteMatched=function t(e){if(!this._isViewPartOfRoute(e.getParameter("routeInformation"))){return}let o;if(this._oPageComponent&&this._oPageComponent.getBindingContextPattern){o=this._oPageComponent.getBindingContextPattern()}o=o||this._oTargetInformation.contextPattern;if(o===null||o===undefined){o=e.getParameter("routePattern")}const n=e.getParameters().arguments;const i=e.getParameter("navigationInfo");const{path:r,deferred:a}=this._buildBindingPath(n,o,i);this.onRouteMatched();const s=this._oView.getModel();let c;if(a){c=this._bindDeferred(r,i)}else{c=this._bindPage(r,s,i)}c.finally(()=>{this.onRouteMatchedFinished()});this._oAppComponent.getRootViewController().updateUIStateForView(this._oView,this._getFCLLevel())};u._bindDeferred=function t(e,o){this.onBeforeBinding(null,{editable:o.bTargetEditable});if(o.bDeferredContext||!o.oAsyncContext){if(this._oPageComponent&&this._oPageComponent.createDeferredContext){this._oPageComponent.createDeferredContext(e,o.useContext,o.bActionCreate)}}const n=this._getBindingContext();if(n!==null&&n!==void 0&&n.hasPendingChanges()){n.getBinding().resetChanges()}this._setBindingContext(null);this.onAfterBinding(null);return Promise.resolve()};u._bindPage=function t(e,o,n){if(e===""){return Promise.resolve(this._bindPageToContext(null,o,n))}else{return this._resolveSemanticPath(e,o).then(t=>{this._bindPageToPath(t,o,n)}).catch(t=>{const e=p.getLibraryResourceBundle("sap.fe.core");this.navigateToMessagePage(e.getText("C_COMMON_SAPFE_DATA_RECEIVED_ERROR"),{title:e.getText("C_COMMON_SAPFE_ERROR"),description:t.message})})}};u._createFilterFromSemanticPath=function t(e,o,n){const i=function(t){if(t.indexOf("'")===0&&t.lastIndexOf("'")===t.length-1){t=decodeURIComponent(t.substring(1,t.length-1))}return t};const r=e.substring(e.indexOf("(")+1,e.length-1).split(",");let a;if(o.length!=r.length){return null}const s=c.isFilteringCaseSensitive(n);if(o.length===1){const t=i(r[0]);a=[new f({path:o[0].$PropertyPath,operator:d.EQ,value1:t,caseSensitive:s})]}else{const t={};r.forEach(function(e){const o=e.split("="),n=i(o[1]);t[o[0]]=n});let e=false;a=o.map(function(o){const n=o.$PropertyPath,i=t[n];if(i!==undefined){return new f({path:n,operator:d.EQ,value1:i,caseSensitive:s})}else{e=true;return new f({path:"XX"})}});if(e){return null}}const g=new f({filters:[new f("IsActiveEntity","EQ",false),new f("SiblingEntity/IsActiveEntity","EQ",null)],and:false});a.push(g);return new f(a,true)};u._getTechnicalPathFromSemanticPath=function t(e,o,n){var i;const r=o.getMetaModel();let a=r.getMetaContext(e).getPath();if(!n||n.length===0){return Promise.resolve(null)}const s=this._createFilterFromSemanticPath(e,n,r);if(s===null){return Promise.resolve(null)}if(!((i=a)!==null&&i!==void 0&&i.startsWith("/"))){a=`/${a}`}const c=o.bindList(a,undefined,undefined,s,{$$groupId:"$auto.Heroes"});return c.requestContexts(0,2).then(function(t){if(t&&t.length){return t[0].getPath()}else{return null}})};u._checkPathForSemanticBookmarking=function t(e,o){const n=/^[/]?(\w+)\([^/]+\)$/.exec(e);if(!n){return false}const i=`/${n[1]}`;const r=o.getObject(`${i}@com.sap.vocabularies.Common.v1.DraftRoot`);const a=o.getObject(`${i}@com.sap.vocabularies.Common.v1.DraftNode`);return r||a?true:false};u._resolveSemanticPath=function t(e,o){const n=o.getMetaModel();const i=this._oRoutingService.getLastSemanticMapping();let r=this._oRouter.getHashChanger().getHash().split("?")[0];if(r&&r.lastIndexOf("/")===r.length-1){r=r.substring(0,r.length-1)}let a=r&&r.substr(0,r.indexOf("("));if(a.indexOf("/")===0){a=a.substring(1)}const s=this._checkPathForSemanticBookmarking(r,n),c=s&&g.getSemanticKeys(n,a);if(!c){return Promise.resolve(e)}else if(i&&i.semanticPath===e){return Promise.resolve(i.technicalPath)}else{return this._getTechnicalPathFromSemanticPath(r,o,c).then(t=>{if(t&&t!==e){this._oRoutingService.setLastSemanticMapping({technicalPath:t,semanticPath:e});return t}else{return e}})}};u._bindPageToPath=function t(e,o,n){const i=this._getBindingContext(),a=i&&i.getPath(),g=n.useContext;if(g&&g.getPath()===e){if(g!==i){const t=this._oAppComponent.getRootViewController();if(t.isFclEnabled()&&n.reason===r.RowPress){const t=g.getModel().getMetaModel();if(!g.getBinding().hasPendingChanges()){g.refresh()}else if(Z(this.getView())||c.isDraftSupported(t,g.getPath())&&c.isCollaborationDraftSupported(t)){g.getBinding().resetChanges();g.refresh()}}this._bindPageToContext(g,o,n)}}else if(a!==e){this._bindPageToContext(this._createContext(e,o),o,n)}else if(n.reason!==r.AppStateChanged&&s.isEditStateDirty()){this._refreshBindingContext(i)}};u._bindPageToContext=function e(o,n,i){if(!o){this.onBeforeBinding(null);this.onAfterBinding(null);return}const r=o.getBinding();const a=this._oAppComponent.getRootViewController();if(a.isFclEnabled()){if(!r||!r.isA("sap.ui.model.odata.v4.ODataListBinding")){o=this._createContext(o.getPath(),n)}try{this._setKeepAlive(o,true,()=>{if(a.isContextUsedInPages(o)){this.navigateBackFromContext(o)}},true)}catch(e){t.error(`View for ${o.getPath()} won't be synchronized. Parent listBinding must have binding parameter $$ownRequest=true`)}}else if(!r||r.isA("sap.ui.model.odata.v4.ODataListBinding")){o=this._createContext(o.getPath(),n)}this.onBeforeBinding(o,{editable:i.bTargetEditable,listBinding:r,bPersistOPScroll:i.bPersistOPScroll,bDraftNavigation:i.bDraftNavigation,showPlaceholder:i.bShowPlaceholder});this._setBindingContext(o);this.onAfterBinding(o)};u._createContext=function e(n,i){const r=this._oPageComponent,a=r&&r.getEntitySet&&r.getEntitySet(),s=r&&r.getContextPath&&r.getContextPath()||a&&`/${a}`,c=i.getMetaModel(),g={$$groupId:"$auto.Heroes",$$updateGroupId:"$auto",$$patchWithoutSideEffects:true};const l=c.getObject(`${s}@com.sap.vocabularies.Common.v1.DraftRoot`);const p=c.getObject(`${s}@com.sap.vocabularies.Common.v1.DraftNode`);const u=this._oAppComponent.getRootViewController();if(u.isFclEnabled()){const t=this._getKeepAliveContext(i,n,false,g);if(!t){throw new Error(`Cannot create keepAlive context ${n}`)}else if(l||p){if(t.getProperty("IsActiveEntity")===undefined){t.requestProperty(["HasActiveEntity","HasDraftEntity","IsActiveEntity"]);if(l){t.requestObject("DraftAdministrativeData")}}else{t.requestSideEffects(l?["HasActiveEntity","HasDraftEntity","IsActiveEntity","DraftAdministrativeData"]:["HasActiveEntity","HasDraftEntity","IsActiveEntity"])}}return t}else{if(a){const t=c.getObject(`${s}/@com.sap.vocabularies.Common.v1.Messages/$Path`);if(t){g.$select=t}}if(l||p){if(g.$select===undefined){g.$select="HasActiveEntity,HasDraftEntity,IsActiveEntity"}else{g.$select+=",HasActiveEntity,HasDraftEntity,IsActiveEntity"}}if(this._oView.getBindingContext()){var h;const e=(h=this._oView.getBindingContext())===null||h===void 0?void 0:h.getBinding();e===null||e===void 0?void 0:e.resetChanges().then(()=>{e.destroy()}).catch(e=>{t.error("Error while reseting the changes to the binding",e)})}const e=i.bindContext(n,undefined,g);e.attachEventOnce("dataRequested",()=>{o.lock(this._oView)});e.attachEventOnce("dataReceived",this.onDataReceived.bind(this));return e.getBoundContext()}};u.onDataReceived=async function e(n){const i=n&&n.getParameter("error");if(o.isLocked(this._oView)){o.unlock(this._oView)}if(i){try{const t=await p.getLibraryResourceBundle("sap.fe.core",true);const e=this.base.messageHandler;let o={};if(i.status===503){o={isInitialLoad503Error:true,shellBack:true}}else if(i.status===400){o={title:t.getText("C_COMMON_SAPFE_ERROR"),description:t.getText("C_COMMON_SAPFE_DATA_RECEIVED_ERROR_DESCRIPTION"),isDataReceivedError:true,shellBack:true}}else{o={title:t.getText("C_COMMON_SAPFE_ERROR"),description:i,isDataReceivedError:true,shellBack:true}}await e.showMessages(o)}catch(e){t.error("Error while getting the core resource bundle",e)}}};u._refreshBindingContext=function t(e){const o=this._oPageComponent;const n=this._oAppComponent.getSideEffectsService();const i=e.getPath();const r=o&&o.getEntitySet&&o.getEntitySet();const a=o&&o.getContextPath&&o.getContextPath()||r&&`/${r}`;const s=this._oView.getModel().getMetaModel();let c;const g=[];const l=[];const p={targetProperties:[],targetEntities:[]};function u(t){let e;const o=(t.getContext()&&t.getContext().getPath()||"").replace(i,"");const n=(o?`${o.slice(1)}/`:o)+t.getPath();if(t.isA("sap.ui.model.odata.v4.ODataContextBinding")){e=t.getDependentBindings();if(e){for(let t=0;t<e.length;t++){u(e[t])}}else if(g.indexOf(n)===-1){g.push(n)}}else if(t.isA("sap.ui.model.odata.v4.ODataListBinding")){if(g.indexOf(n)===-1){g.push(n)}}else if(t.isA("sap.ui.model.odata.v4.ODataPropertyBinding")){if(l.indexOf(n)===-1){l.push(n)}}}if(a){c=s.getObject(`${a}/@com.sap.vocabularies.Common.v1.Messages/$Path`)}u(e.getBinding());let h;for(h=0;h<g.length;h++){p.targetEntities.push({$NavigationPropertyPath:g[h]})}p.targetProperties=l;if(c){p.targetProperties.push(c)}p.targetProperties=p.targetProperties.reduce((t,e)=>{if(e){const o=e.indexOf("/");t.push(o>0?e.slice(0,o):e)}return t},[]);n.requestSideEffects([...p.targetEntities,...p.targetProperties],e)};u._getBindingContext=function t(){if(this._oPageComponent){return this._oPageComponent.getBindingContext()}else{return this._oView.getBindingContext()}};u._setBindingContext=function t(e){var o;let n,i;if(this._oPageComponent){n=this._oPageComponent.getBindingContext();i=this._oPageComponent}else{n=this._oView.getBindingContext();i=this._oView}i.setBindingContext(e);if((o=n)!==null&&o!==void 0&&o.isKeepAlive()&&n!==e){this._setKeepAlive(n,false)}};u._getFCLLevel=function t(){return this._oTargetInformation.FCLLevel};u._setKeepAlive=function t(e,o,n,i){if(e.getPath().endsWith(")")){const t=e.getModel().getMetaModel();const r=t.getMetaPath(e.getPath());const a=t.getObject(`${r}/@com.sap.vocabularies.Common.v1.Messages/$Path`);e.setKeepAlive(o,n,!!a&&i)}};u._getKeepAliveContext=function t(e,o,n,i){const r=o.split("/");const a=[];while(r.length&&!r[r.length-1].endsWith(")")){a.push(r.pop())}if(r.length===0){return undefined}const s=r.join("/");const c=e.getKeepAliveContext(s,n,i);if(a.length===0){return c}else{a.reverse();const t=a.join("/");return e.bindContext(t,c).getBoundContext()}};u.switchFullScreen=function e(){const o=this.base.getView();const n=o.getModel("fclhelper"),i=n.getProperty("/actionButtonsInfo/isFullScreen"),r=n.getProperty(i?"/actionButtonsInfo/exitFullScreen":"/actionButtonsInfo/fullScreen"),a=this._oAppComponent.getRootViewController();const s=a.getRightmostContext?a.getRightmostContext():o.getBindingContext();this.base._routing.navigateToContext(s,{sLayout:r}).catch(function(){t.warning("cannot switch between column and fullscreen")})};u.closeColumn=function t(){const e=this._oView.getViewData();const o=this._oView.getBindingContext();const n=o.getModel().getMetaModel();const r={noPreservationCache:true,sLayout:this._oView.getModel("fclhelper").getProperty("/actionButtonsInfo/closeColumn")};if((e===null||e===void 0?void 0:e.viewLevel)===1&&c.isDraftSupported(n,o.getPath())){i.processDataLossOrDraftDiscardConfirmation(()=>{this.navigateBackFromContext(o,r)},Function.prototype,o,this._oView.getController(),false,i.NavigationType.BackNavigation)}else{this.navigateBackFromContext(o,r)}};return a}(u),ot(Q.prototype,"onExit",[v],Object.getOwnPropertyDescriptor(Q.prototype,"onExit"),Q.prototype),ot(Q.prototype,"onInit",[P],Object.getOwnPropertyDescriptor(Q.prototype,"onInit"),Q.prototype),ot(Q.prototype,"onRouteMatched",[_,y],Object.getOwnPropertyDescriptor(Q.prototype,"onRouteMatched"),Q.prototype),ot(Q.prototype,"onRouteMatchedFinished",[m,x],Object.getOwnPropertyDescriptor(Q.prototype,"onRouteMatchedFinished"),Q.prototype),ot(Q.prototype,"onBeforeBinding",[b,w],Object.getOwnPropertyDescriptor(Q.prototype,"onBeforeBinding"),Q.prototype),ot(Q.prototype,"onAfterBinding",[O,B],Object.getOwnPropertyDescriptor(Q.prototype,"onAfterBinding"),Q.prototype),ot(Q.prototype,"navigateToTarget",[R],Object.getOwnPropertyDescriptor(Q.prototype,"navigateToTarget"),Q.prototype),ot(Q.prototype,"navigateToRoute",[E],Object.getOwnPropertyDescriptor(Q.prototype,"navigateToRoute"),Q.prototype),ot(Q.prototype,"navigateToContext",[S,A],Object.getOwnPropertyDescriptor(Q.prototype,"navigateToContext"),Q.prototype),ot(Q.prototype,"navigateBackFromContext",[D,F],Object.getOwnPropertyDescriptor(Q.prototype,"navigateBackFromContext"),Q.prototype),ot(Q.prototype,"navigateForwardToContext",[M,T],Object.getOwnPropertyDescriptor(Q.prototype,"navigateForwardToContext"),Q.prototype),ot(Q.prototype,"navigateBackFromTransientState",[V,I],Object.getOwnPropertyDescriptor(Q.prototype,"navigateBackFromTransientState"),Q.prototype),ot(Q.prototype,"navigateToMessagePage",[L,$],Object.getOwnPropertyDescriptor(Q.prototype,"navigateToMessagePage"),Q.prototype),ot(Q.prototype,"isCurrentStateImpactedBy",[j,k],Object.getOwnPropertyDescriptor(Q.prototype,"isCurrentStateImpactedBy"),Q.prototype),ot(Q.prototype,"onDataReceived",[H],Object.getOwnPropertyDescriptor(Q.prototype,"onDataReceived"),Q.prototype),ot(Q.prototype,"switchFullScreen",[N,q],Object.getOwnPropertyDescriptor(Q.prototype,"switchFullScreen"),Q.prototype),ot(Q.prototype,"closeColumn",[K,z],Object.getOwnPropertyDescriptor(Q.prototype,"closeColumn"),Q.prototype),Q))||U);return nt},false);