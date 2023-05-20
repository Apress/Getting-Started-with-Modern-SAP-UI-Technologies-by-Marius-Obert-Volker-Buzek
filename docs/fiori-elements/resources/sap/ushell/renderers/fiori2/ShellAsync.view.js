// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/library","sap/ushell/library","sap/ui/Device","sap/ushell/components/_HeaderManager/ControlManager","sap/ushell/components/_HeaderManager/ShellHeader.controller","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/ushell/resources","sap/ushell/utils","sap/ushell/Config","sap/ushell/EventHub","sap/ui/model/json/JSONModel","sap/ui/core/mvc/View","sap/ui/core/mvc/XMLView","sap/ui/core/Fragment"],function(e,t,n,i,l,o,a,r,s,h,u,d,c,g){"use strict";function p(e,t){return sap.ui.getCore().byId(t.getObject())}return d.extend("sap.ushell.renderers.fiori2.ShellAsync",{createContent:function(e){this.oController=e;var t=this.getViewData()||{},n=t.config||{};this.oConfig=n;this.aDanglingControls=[];this._allowUpToThreeActionInShellHeader(n);return Promise.all([this.createShellLayout(e),this.createShellHeader(n,this.getViewData().shellModel)]).then(function(e){var t=e[0];var n=e[1];t.setHeader(n);n.setShellLayout(t);h.once("CreateToolArea").do(function(){sap.ui.require(["sap/ushell/ui/shell/ToolArea"],function(e){var n=new e({id:"shell-toolArea",toolAreaItems:{path:"/currentState/toolAreaItems",factory:p}});n.updateAggregation=this.updateShellAggregation;n.addEventDelegate({onAfterRendering:function(){t.applySplitContainerSecondaryContentSize()}});t.setToolArea(n)}.bind(this))}.bind(this));this.setOUnifiedShell(t);this.setDisplayBlock(true);this.addDanglingControl(sap.ui.getCore().byId("viewPortContainer"));r.setPerformanceMark("FLP - Shell.view rendering started!");return t}.bind(this))},_allowUpToThreeActionInShellHeader:function(e){if(Object.keys(e).length>3){var t=["moveAppFinderActionToShellHeader","moveUserSettingsActionToShellHeader","moveContactSupportActionToShellHeader","moveEditHomePageActionToShellHeader"],n=0,i;for(var l=0;l<5;l++){i=t[l];if(n===3){e[i]=false}else if(e[i]){n++}}}},createShellLayout:function(e){return g.load({name:"sap.ushell.ui.ShellLayout",controller:e}).then(function(e){var t=sap.ui.getCore().byId("menuBarComponentContainer");return sap.ushell.Container.getServiceAsync("Menu").then(function(e){return e.isMenuEnabled()}).then(function(n){if(n){t.addStyleClass("sapUshellMenuBarHeight")}return e})})},createShellHeader:function(e,t){var n=s.createModel("/core/shellHeader",u),o=new l;o.onInit();return g.load({name:"sap.ushell.ui.ShellHeader",controller:o}).then(function(l){i.init(e,o,t);if(e.appState==="embedded"){l.setNoLogo()}l.setModel(n);l.setModel(a.i18nModel,"i18n");l.createUIArea();return l})},createPostCoreExtControls:function(){sap.ui.require(["sap/ushell/ui/shell/FloatingContainer","sap/ushell/ui/shell/ShellFloatingActions"],function(e,t){var i=sap.ui.getCore().byId("shell");if(!i){return}var l=new e({id:"shell-floatingContainer",content:{path:"/currentState/floatingContainerContent",factory:p}});if(n.system.desktop){l.addCustomData(new o({key:"tabindex",value:"-1",writeToDom:true}))}l.setModel(i.getModel());this.addDanglingControl(l);var a=new t({id:"shell-floatingActions",floatingActions:{path:"/currentState/floatingActions",factory:p}});a.updateAggregation=this.updateShellAggregation;var r=this.getOUnifiedShell();r.setFloatingContainer(l);r.setFloatingActionsContainer(a);this._createAllMyAppsView()}.bind(this))},_createAllMyAppsView:function(){var e=function(e){if(e.isEnabled()){this._initializeAllMyAppsView()}}.bind(this);sap.ushell.Container.getServiceAsync("AllMyApps").then(e)},_initializeAllMyAppsView:function(){c.create({id:"allMyAppsView",viewName:"sap.ushell.renderers.fiori2.allMyApps.AllMyApps"}).then(function(e){var t=this.getModel();e.setModel(t);e.setModel(a.i18nModel,"i18n");e.addCustomData(new o({key:"aria-label",value:a.i18n.getText("allMyApps_headerTitle"),writeToDom:true}));this.getOUnifiedShell().getHeader().getAppTitle().setAllMyApps(e)}.bind(this))},getOUnifiedShell:function(){return this.oUnifiedShell},setOUnifiedShell:function(e){this.oUnifiedShell=e},updateShellAggregation:function(e){var t=this.mBindingInfos[e],n=this.getMetadata().getJSONKeys()[e],i;this[n._sGetter]().forEach(function(e){this[n._sRemoveMutator](e)}.bind(this));t.binding.getContexts().forEach(function(e,l){i=t.factory(this.getId()+"-"+l,e)?t.factory(this.getId()+"-"+l,e).setBindingContext(e,t.model):"";this[n._sMutator](i)}.bind(this))},getControllerName:function(){return"sap.ushell.renderers.fiori2.Shell"},addDanglingControl:function(e){this.aDanglingControls.push(e)},destroyDanglingControls:function(){if(this.aDanglingControls){this.aDanglingControls.forEach(function(e){if(e.destroyContent){e.destroyContent()}e.destroy()})}}})});