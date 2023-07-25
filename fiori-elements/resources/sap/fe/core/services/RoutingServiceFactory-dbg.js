/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/fe/core/controllerextensions/BusyLocker","sap/fe/core/controllerextensions/messageHandler/messageHandling","sap/fe/core/controllerextensions/Placeholder","sap/fe/core/controllerextensions/routing/NavigationReason","sap/fe/core/helpers/AppStartupHelper","sap/fe/core/helpers/ClassSupport","sap/fe/core/helpers/EditState","sap/fe/core/helpers/ModelHelper","sap/fe/core/helpers/SemanticKeyHelper","sap/suite/ui/commons/collaboration/CollaborationHelper","sap/ui/base/BindingParser","sap/ui/base/EventProvider","sap/ui/core/service/Service","sap/ui/core/service/ServiceFactory","sap/ui/model/odata/v4/ODataUtils"],function(t,e,o,n,i,r,a,s,u,h,c,l,g,f,p,d){"use strict";var m,v,P,C,R,_,y;var M={};var b=a.event;var x=a.defineUI5Class;function L(t,e,o,n){if(!o)return;Object.defineProperty(t,e,{enumerable:o.enumerable,configurable:o.configurable,writable:o.writable,value:o.initializer?o.initializer.call(n):void 0})}function T(t){if(t===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t}function S(t,e){t.prototype=Object.create(e.prototype);t.prototype.constructor=t;w(t,e)}function w(t,e){w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function t(e,o){e.__proto__=o;return e};return w(t,e)}function E(t,e,o,n,i){var r={};Object.keys(n).forEach(function(t){r[t]=n[t]});r.enumerable=!!r.enumerable;r.configurable=!!r.configurable;if("value"in r||r.initializer){r.writable=true}r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r);if(i&&r.initializer!==void 0){r.value=r.initializer?r.initializer.call(i):void 0;r.initializer=undefined}if(r.initializer===void 0){Object.defineProperty(t,e,r);r=null}return r}function I(t,e){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let A=(m=x("sap.fe.core.services.RoutingServiceEventing"),v=b(),P=b(),m(C=(R=function(t){S(e,t);function e(){var e;for(var o=arguments.length,n=new Array(o),i=0;i<o;i++){n[i]=arguments[i]}e=t.call(this,...n)||this;L(e,"routeMatched",_,T(e));L(e,"afterRouteMatched",y,T(e));return e}return e}(g),_=E(R.prototype,"routeMatched",[v],{configurable:true,enumerable:true,writable:true,initializer:null}),y=E(R.prototype,"afterRouteMatched",[P],{configurable:true,enumerable:true,writable:true,initializer:null}),R))||C);let O=function(a){S(g,a);function g(){var t;for(var e=arguments.length,o=new Array(e),n=0;n<e;n++){o[n]=arguments[n]}t=a.call(this,...o)||this;t.navigationInfoQueue=[];return t}M.RoutingService=g;var f=g.prototype;f.init=function t(){const e=this.getContext();if(e.scopeType==="component"){var o;this.oAppComponent=e.scopeObject;this.oModel=this.oAppComponent.getModel();this.oMetaModel=this.oModel.getMetaModel();this.oRouter=this.oAppComponent.getRouter();this.oRouterProxy=this.oAppComponent.getRouterProxy();this.eventProvider=new A;const t=this.oAppComponent.getManifestEntry("sap.ui5").routing;this._parseRoutingConfiguration(t);const n=this.oAppComponent.getManifestEntry("sap.app");this.outbounds=(o=n.crossNavigation)===null||o===void 0?void 0:o.outbounds}this.initPromise=Promise.resolve(this)};f.beforeExit=function t(){this.oRouter.detachRouteMatched(this._fnOnRouteMatched,this);this.eventProvider.fireEvent("routeMatched",{})};f.exit=function t(){this.eventProvider.destroy()};f._parseRoutingConfiguration=function e(o){var n;const i=(o===null||o===void 0?void 0:(n=o.config)===null||n===void 0?void 0:n.routerClass)==="sap.f.routing.Router";this._mTargets={};Object.keys(o.targets).forEach(t=>{this._mTargets[t]=Object.assign({targetName:t},o.targets[t]);if(this._mTargets[t].contextPattern!==undefined){this._mTargets[t].viewLevel=this._getViewLevelFromPattern(this._mTargets[t].contextPattern,0)}});this._mRoutes={};for(const e in o.routes){const n=o.routes[e],r=Array.isArray(n.target)?n.target:[n.target],a=Array.isArray(o.routes)?n.name:e,s=n.pattern;if(s.length<8||s.indexOf(":?query:")!==s.length-8){t.warning(`Pattern for route ${a} doesn't end with ':?query:' : ${s}`)}const u=this._getViewLevelFromPattern(s,0);this._mRoutes[a]={name:a,pattern:s,targets:r,routeLevel:u};for(let t=0;t<r.length;t++){const e=this._mTargets[r[t]].parent;if(e){r.push(e)}}if(!i){if(this._mTargets[r[0]].viewLevel===undefined||this._mTargets[r[0]].viewLevel<u){this._mTargets[r[0]].viewLevel=u}this._mTargets[r[0]].FCLLevel=-1}else if(r.length===1&&this._mTargets[r[0]].controlAggregation!=="beginColumnPages"){this._mTargets[r[0]].FCLLevel=3}else{r.forEach(t=>{switch(this._mTargets[t].controlAggregation){case"beginColumnPages":this._mTargets[t].FCLLevel=0;break;case"midColumnPages":this._mTargets[t].FCLLevel=1;break;default:this._mTargets[t].FCLLevel=2}})}}Object.keys(this._mTargets).forEach(t=>{while(this._mTargets[t].parent){const e=this._mTargets[t].parent;this._mTargets[e].viewLevel=this._mTargets[e].viewLevel||this._mTargets[t].viewLevel;this._mTargets[e].contextPattern=this._mTargets[e].contextPattern||this._mTargets[t].contextPattern;this._mTargets[e].FCLLevel=this._mTargets[e].FCLLevel||this._mTargets[t].FCLLevel;this._mTargets[e].controlAggregation=this._mTargets[e].controlAggregation||this._mTargets[t].controlAggregation;t=e}});const r=[];const a=[];let s;for(const t in this._mRoutes){const e=this._mRoutes[t].routeLevel;if(e===0){r.push(t)}else if(e===1){a.push(t)}}if(r.length===1){s=r[0]}else if(a.length===1){s=a[0]}if(s){const e=this._mRoutes[s].targets.slice(-1)[0];this.sContextPath="";if(this._mTargets[e].options&&this._mTargets[e].options.settings){const t=this._mTargets[e].options.settings;this.sContextPath=t.contextPath||`/${t.entitySet}`}if(!this.sContextPath){t.warning(`Cannot determine default contextPath: contextPath or entitySet missing in default target: ${e}`)}}else{t.warning("Cannot determine default contextPath: no default route found.")}Object.keys(this._mTargets).map(t=>this._mTargets[t]).sort((t,e)=>t.viewLevel<e.viewLevel?-1:1).forEach(t=>{if(t.options){const e=t.options.settings;const o=e.contextPath||(e.entitySet?`/${e.entitySet}`:"");if(!e.fullContextPath&&o){e.fullContextPath=`${o}/`}Object.keys(e.navigation||{}).forEach(o=>{const n=this._mRoutes[e.navigation[o].detail.route];if(n&&n.targets){n.targets.forEach(n=>{if(this._mTargets[n].options&&this._mTargets[n].options.settings&&!this._mTargets[n].options.settings.fullContextPath){if(t.viewLevel===0){this._mTargets[n].options.settings.fullContextPath=`${(o.startsWith("/")?"":"/")+o}/`}else{this._mTargets[n].options.settings.fullContextPath=`${e.fullContextPath+o}/`}}})}})}})};f._getViewLevelFromPattern=function t(e,o){e=e.replace(":?query:","");const n=new RegExp("/[^/]*$");if(e&&e[0]!=="/"&&e[0]!=="?"){e=`/${e}`}if(e.length){e=e.replace(n,"");if(this.oRouter.match(e)||e===""){return this._getViewLevelFromPattern(e,++o)}else{return this._getViewLevelFromPattern(e,o)}}else{return o}};f._getRouteInformation=function t(e){return this._mRoutes[e]};f._getTargetInformation=function t(e){return this._mTargets[e]};f._getComponentId=function t(e,o){if(o.indexOf(`${e}---`)===0){return o.substr(e.length+3)}return o};f.getTargetInformationFor=function t(e){const o=this._getComponentId(e._sOwnerId,e.getId());let n=null;Object.keys(this._mTargets).forEach(t=>{if(this._mTargets[t].id===o||this._mTargets[t].viewId===o){n=t}});return this._getTargetInformation(n)};f.getLastSemanticMapping=function t(){return this.oLastSemanticMapping};f.setLastSemanticMapping=function t(e){this.oLastSemanticMapping=e};f.navigateTo=function t(e,o,n,i){let r,a;if(e.getModel()&&e.getModel().getMetaModel&&e.getModel().getMetaModel()){a=u.isStickySessionSupported(e.getModel().getMetaModel())}if(!n){r=Promise.resolve(h.getSemanticPath(e))}else{r=this.prepareParameters(n,o,e).then(t=>this.oRouter.getURL(o,t))}return r.then(t=>{this.oRouterProxy.navToHash(t,i,false,false,!a)})};f.prepareParameters=function e(o,n,i){let r;try{const t=i.getPath();const e=i.getModel().getMetaModel();const n=t.split("/");const a=Object.keys(o).map(t=>{const r=o[t];const a=l.complexParser(r);const s=a.parts||[a];const u=s.map(function(t){const o=t.path.split("../");const r=n.slice(0,n.length-o.length+1);r.push(o[o.length-1]);const a=r.join("/");const s=e.getMetaContext(a);return i.requestProperty(a).then(function(t){const e=s.getObject();const o=e.$Type;return d.formatLiteral(t,o)})});return Promise.all(u).then(e=>{const o=a.formatter?a.formatter.apply(this,e):e.join("");return{key:t,value:o}})});r=Promise.all(a).then(function(t){const e={};t.forEach(function(t){e[t.key]=t.value});return e})}catch(e){t.error(`Could not parse the parameters for the navigation to route ${n}`);r=Promise.resolve(undefined)}return r};f._fireRouteMatchEvents=function t(e){this.eventProvider.fireEvent("routeMatched",e);this.eventProvider.fireEvent("afterRouteMatched",e);s.cleanProcessedEditState()};f.navigateToContext=function t(e,n,i,r){let a="",s,h=false;if(e.getModel()&&e.getModel().getMetaModel){h=u.isStickySessionSupported(e.getModel().getMetaModel())}if(n&&n.targetPath&&i&&i.navigation){const t=i.navigation[n.targetPath].detail;a=t.route;if(t.parameters){s=this.prepareParameters(t.parameters,a,e)}}let c=this._getPathFromContext(e,n);if(c.length===0&&this.bExitOnNavigateBackToRoot){this.oRouterProxy.exitFromApp();return Promise.resolve(true)}if(n!==null&&n!==void 0&&n.asyncContext||n!==null&&n!==void 0&&n.bDeferredContext){c+="(...)"}const l=this._calculateLayout(c,n);if(l){c+=`?layout=${l}`}const g={oAsyncContext:n===null||n===void 0?void 0:n.asyncContext,bDeferredContext:n===null||n===void 0?void 0:n.bDeferredContext,bTargetEditable:n===null||n===void 0?void 0:n.editable,bPersistOPScroll:n===null||n===void 0?void 0:n.bPersistOPScroll,useContext:(n===null||n===void 0?void 0:n.updateFCLLevel)===-1||n!==null&&n!==void 0&&n.bRecreateContext?undefined:e,bDraftNavigation:n===null||n===void 0?void 0:n.bDraftNavigation,bShowPlaceholder:(n===null||n===void 0?void 0:n.showPlaceholder)!==undefined?n===null||n===void 0?void 0:n.showPlaceholder:true,reason:n===null||n===void 0?void 0:n.reason};if(n!==null&&n!==void 0&&n.checkNoHashChange){const t=this.oRouterProxy.getHash().replace(/[&?]{1}sap-iapp-state=[A-Z0-9]+/,"");if(c===t){const t=this.oRouter.getRouteInfoByHash(this.oRouterProxy.getHash());if(t){t.navigationInfo=g;t.routeInformation=this._getRouteInformation(this.sCurrentRouteName);t.routePattern=this.sCurrentRoutePattern;t.views=this.aCurrentViews}this.oRouterProxy.setFocusForced(!!n.bForceFocus);this._fireRouteMatchEvents(t);return Promise.resolve(true)}}if(n!==null&&n!==void 0&&n.transient&&n.editable==true&&c.indexOf("(...)")===-1){if(c.indexOf("?")>-1){c+="&i-action=create"}else{c+="?i-action=create"}}if(r&&r.name==="sap.fe.templates.ListReport"){const t=this.oRouter.getRouteInfoByHash(c);if(t){const e=this._getRouteInformation(t.name);if(e&&e.targets&&e.targets.length>0){const t=e.targets[e.targets.length-1];const n=this._getTargetInformation(t);if(n&&n.name==="sap.fe.templates.ObjectPage"){o.removeUnboundTransitionMessages()}}}}this.navigationInfoQueue.push(g);if(a&&s){return s.then(t=>{t.bIsStickyMode=h;this.oRouter.navTo(a,t);return Promise.resolve(true)})}return this.oRouterProxy.navToHash(c,false,n===null||n===void 0?void 0:n.noPreservationCache,n===null||n===void 0?void 0:n.bForceFocus,!h).then(t=>{if(!t){this.navigationInfoQueue.pop()}return t})};f.navigateToRoute=function t(e,o){const n=this.oRouter.getURL(e,o);return this.oRouterProxy.navToHash(n,undefined,undefined,undefined,!o.bIsStickyMode)};f.isCurrentStateImpactedBy=function t(e){const o=e.getPath();if(this.oRouterProxy.isCurrentStateImpactedBy(o)){return true}else if(/^[^()]+\([^()]+\)$/.test(o)){let t;if(this.oLastSemanticMapping&&this.oLastSemanticMapping.technicalPath===o){t=this.oLastSemanticMapping.semanticPath}else{t=h.getSemanticPath(e)}return t!=o?this.oRouterProxy.isCurrentStateImpactedBy(t):false}else{return false}};f._findPathToNavigate=function t(e){const o=new RegExp("/[^/]*$");e=e.replace(o,"");if(this.oRouter.match(e)||e===""){return e}else{return this._findPathToNavigate(e)}};f._checkIfContextSupportsSemanticPath=function t(e){const o=e.getPath();if(!/^\/[^(]+\([^)]+\)$/.test(o)){return false}const n=e.getModel().getMetaModel();const i=n.getMetaContext(e.getPath()).getObject("@sapui.name");if(!h.getSemanticKeys(n,i)){return false}return u.isDraftSupported(n,o)};f._getPathFromContext=function t(e,o){let n;if(e.isA("sap.ui.model.odata.v4.ODataListBinding")&&e.isRelative()){n=e.getHeaderContext().getPath()}else{n=e.getPath()}if(o.updateFCLLevel===-1){n=this._findPathToNavigate(n);if(this.oLastSemanticMapping&&this.oLastSemanticMapping.technicalPath===n){n=this.oLastSemanticMapping.semanticPath}}else if(this._checkIfContextSupportsSemanticPath(e)){const t=h.getSemanticPath(e,true);if(!t){this.setLastSemanticMapping(undefined)}else if(t!==n){this.setLastSemanticMapping({technicalPath:n,semanticPath:t});n=t}}if(n[0]==="/"){n=n.substring(1)}return n};f._calculateLayout=function t(e,o){let n=o.FCLLevel;if(o.updateFCLLevel){n+=o.updateFCLLevel;if(n<0){n=0}}if(o.updateFCLLevel<0&&!o.sLayout){o.sLayout=this.oRouterProxy.findLayoutForHash(e)}return this.oAppComponent.getRootViewController().calculateLayout(n,e,o.sLayout,o.keepCurrentLayout)};f._beforeRouteMatched=function t(){const o=(new n).isPlaceholderEnabled();if(!o){const t=this.oAppComponent.getRootControl();e.lock(t)}};f._onRouteMatched=function o(r){const a=this.oAppComponent.getAppStateHandler(),s=this.oAppComponent.getRootControl();const u=(new n).isPlaceholderEnabled();if(e.isLocked(s)&&!u){e.unlock(s)}const h=r.getParameters();if(this.navigationInfoQueue.length){h.navigationInfo=this.navigationInfoQueue[0];this.navigationInfoQueue=this.navigationInfoQueue.slice(1)}else{h.navigationInfo={}}if(a.checkIfRouteChangedByIApp()){h.navigationInfo.reason=i.AppStateChanged;a.resetRouteChangedByIApp()}this.sCurrentRouteName=r.getParameter("name");this.sCurrentRoutePattern=h.config.pattern;this.aCurrentViews=r.getParameter("views");h.routeInformation=this._getRouteInformation(this.sCurrentRouteName);h.routePattern=this.sCurrentRoutePattern;this._fireRouteMatchEvents(h);if(!history.state||history.state.feLevel===undefined){this.oRouterProxy.restoreHistory().then(()=>{this.oRouterProxy.resolveRouteMatch()}).catch(function(e){t.error("Error while restoring history",e)})}else{this.oRouterProxy.resolveRouteMatch()}};f.attachRouteMatched=function t(e,o,n){this.eventProvider.attachEvent("routeMatched",e,o,n)};f.detachRouteMatched=function t(e,o){this.eventProvider.detachEvent("routeMatched",e,o)};f.attachAfterRouteMatched=function t(e,o,n){this.eventProvider.attachEvent("afterRouteMatched",e,o,n)};f.detachAfterRouteMatched=function t(e,o){this.eventProvider.detachEvent("afterRouteMatched",e,o)};f.getRouteFromHash=function t(e,o){const n=e.getHashChanger().hash;const i=e.getRouteInfoByHash(n);return o.getMetadata().getManifestEntry("/sap.ui5/routing/routes").filter(function(t){return t.name===i.name})[0]};f.getTargetsFromRoute=function t(e){const o=e.target;if(typeof o==="string"){return[this._mTargets[o]]}else{const t=[];o.forEach(e=>{t.push(this._mTargets[e])});return t}};f.initializeRouting=async function e(){await c.processAndExpandHash();this._fnOnRouteMatched=this._onRouteMatched.bind(this);this.oRouter.attachRouteMatched(this._fnOnRouteMatched,this);const o=(new n).isPlaceholderEnabled();if(!o){this.oRouter.attachBeforeRouteMatched(this._beforeRouteMatched.bind(this))}this.navigationInfoQueue=[];s.resetEditState();this.bExitOnNavigateBackToRoot=!this.oRouter.match("");const i=this.oRouter.getHashChanger().getHash().indexOf("sap-iapp-state")!==-1;try{const t=await this.oAppComponent.getStartupParameters();const e=t!==undefined&&Object.keys(t).length!==0;const o=this.oRouter.getHashChanger().getHash();if(!i&&e&&!o){if(t.preferredMode&&t.preferredMode[0].toUpperCase().indexOf("CREATE")!==-1){await this._manageCreateStartup(t)}else{await this._manageDeepLinkStartup(t)}}}catch(e){t.error("Error during routing initialization",e)}};f.getDefaultCreateHash=function t(e){return r.getDefaultCreateHash(e,this.getContextPath(),this.oRouter)};f._manageCreateStartup=function t(e){return r.getCreateStartupHash(e,this.getContextPath(),this.oRouter,this.oMetaModel).then(t=>{if(t){this.oRouter.getHashChanger().replaceHash(t);if(e!==null&&e!==void 0&&e.preferredMode&&e.preferredMode[0].toUpperCase().indexOf("AUTOCREATE")!==-1){this.oAppComponent.setStartupModeAutoCreate()}else{this.oAppComponent.setStartupModeCreate()}this.bExitOnNavigateBackToRoot=true}})};f._manageDeepLinkStartup=function t(e){return r.getDeepLinkStartupHash(this.oAppComponent.getManifest()["sap.ui5"].routing,e,this.oModel).then(t=>{let e;if(t.context){const o=t.context.getPath();const n=this._checkIfContextSupportsSemanticPath(t.context)?h.getSemanticPath(t.context):o;if(n!==o){this.setLastSemanticMapping({technicalPath:o,semanticPath:n})}e=n.substring(1)}else if(t.hash){e=t.hash}if(e){this.oRouter.getHashChanger().replaceHash(e);this.oAppComponent.setStartupModeDeeplink()}})};f.getOutbounds=function t(){return this.outbounds};f.getContextPath=function t(){return this.sContextPath};f.getInterface=function t(){return this};return g}(f);M.RoutingService=O;let H=function(t){S(e,t);function e(){return t.apply(this,arguments)||this}var o=e.prototype;o.createInstance=function t(e){const o=new O(e);return o.initPromise};return e}(p);return H},false);