/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/fe/core/formatters/FPMFormatter","sap/fe/core/formatters/StandardFormatter","sap/fe/core/formatters/ValueFormatter","sap/fe/core/services/AsyncComponentServiceFactory","sap/fe/core/services/CacheHandlerServiceFactory","sap/fe/core/services/EnvironmentServiceFactory","sap/fe/core/services/NavigationServiceFactory","sap/fe/core/services/ResourceModelServiceFactory","sap/fe/core/services/RoutingServiceFactory","sap/fe/core/services/ShellServicesFactory","sap/fe/core/services/SideEffectsServiceFactory","sap/fe/core/services/TemplatedViewServiceFactory","sap/fe/core/type/DateTimeWithTimezone","sap/fe/core/type/Email","sap/fe/core/type/FiscalDate","sap/fe/navigation/library","sap/fe/placeholder/library","sap/ui/base/DataType","sap/ui/core/Core","sap/ui/core/library","sap/ui/core/service/ServiceFactoryRegistry","sap/ui/fl/library","sap/ui/mdc/library"],function(e,a,r,i,o,t,s,n,c,l,p,f,d,v,u,y,S,m,g,C,b,F,w,D){"use strict";var E={};const M="sap.fe";E.feNamespace=M;const N="sap.fe.core";E.feCoreNamespace=N;const I="sap.fe.controllerextensions";E.feCextNamespace=I;const h="sap.fe.core.fpm";E.feFpmNamespace=h;const A=C.initLibrary({name:"sap.fe.core",dependencies:["sap.ui.core","sap.fe.navigation","sap.fe.placeholder","sap.ui.fl","sap.ui.mdc","sap.f"],types:["sap.fe.core.CreationMode","sap.fe.core.VariantManagement"],interfaces:[],controls:[],elements:[],version:"1.113.0",noLibraryCSS:true,extensions:{"sap.ui.support":{publicRules:true,internalRules:true},flChangeHandlers:{"sap.fe.core.controls.FilterBar":"sap/ui/mdc/flexibility/FilterBar"}}});A.InvocationGrouping={Isolated:"Isolated",ChangeSet:"ChangeSet"};A.CreationMode={NewPage:"NewPage",Sync:"Sync",Async:"Async",Deferred:"Deferred",Inline:"Inline",CreationRow:"CreationRow",InlineCreationRows:"InlineCreationRows",External:"External"};A.VariantManagement={None:"None",Page:"Page",Control:"Control"};A.Constants={CancelActionDialog:"cancel",ActionExecutionFailed:"actionExecutionFailed",CreationFailed:"creationFailed"};A.ProgrammingModel={Draft:"Draft",Sticky:"Sticky",NonDraft:"NonDraft"};A.DraftStatus={Saving:"Saving",Saved:"Saved",Clear:"Clear"};A.EditMode={Display:"Display",Editable:"Editable"};A.TemplateContentView={Hybrid:"Hybrid",Chart:"Chart",Table:"Table"};let R;(function(e){e["Enabled"]="Enabled";e["Disabled"]="Disabled";e["Auto"]="Auto"})(R||(R={}));E.InitialLoadMode=R;A.InitialLoadMode=R;A.StartupMode={Normal:"Normal",Deeplink:"Deeplink",Create:"Create",AutoCreate:"AutoCreate"};const L=g.createType("sap.fe.core.InitialLoadMode",{defaultValue:A.InitialLoadMode.Auto,isValid:function(a){if(typeof a==="boolean"){e.warning("DEPRECATED: boolean value not allowed for 'initialLoad' manifest setting - supported values are: Disabled|Enabled|Auto")}return a===undefined||a===null||typeof a==="boolean"||A.InitialLoadMode.hasOwnProperty(a)}});L.setNormalizer(function(e){if(!e){return A.InitialLoadMode.Disabled}return e===true?A.InitialLoadMode.Enabled:e});F.register("sap.fe.core.services.TemplatedViewService",new d);F.register("sap.fe.core.services.ResourceModelService",new c);F.register("sap.fe.core.services.CacheHandlerService",new t);F.register("sap.fe.core.services.NavigationService",new n);F.register("sap.fe.core.services.RoutingService",new l);F.register("sap.fe.core.services.SideEffectsService",new f);F.register("sap.fe.core.services.ShellServices",new p);F.register("sap.fe.core.services.EnvironmentService",new s);F.register("sap.fe.core.services.AsyncComponentService",new o);return A},false);