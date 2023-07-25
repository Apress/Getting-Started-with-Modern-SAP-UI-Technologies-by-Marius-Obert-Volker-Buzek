//Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ushell/components/pages/controller/PagesAndSpaceId"],function(e,t){"use strict";return e.extend("sap.ushell.components.runtimeSwitcher.controller.RuntimeSwitcher",{onInit:function(){this.oNavContainer=this.byId("switcherNavContainer");this.oPagesRuntime=this.byId("pagesRuntime");this.oWorkpageRuntime=this.byId("workpagesRuntime");return this._handleRouter().then(function(){var e=sap.ushell.Container.getRenderer();this.oContainerRouter=e.getRouter();this.oContainerRouter.getRoute("home").attachMatched(this._handleRouter,this);this.oContainerRouter.getRoute("openFLPPage").attachMatched(this._handleRouter,this)}.bind(this))},_handleRouter:function(){var e;return Promise.all([t._getPageAndSpaceId(),sap.ushell.Container.getServiceAsync("Menu")]).then(function(t){var o;e=t[0]&&t[0].pageId;if(!e){return Promise.reject("No pageId found")}o=t[1];return o.isWorkPage(e)}).then(function(e){if(e){this._toggleToWorkPagesRuntime()}else{this._toggleToPagesRuntime()}}.bind(this)).catch(function(){this._toggleToPagesRuntime()}.bind(this))},_toggleToPagesRuntime:function(){this.oNavContainer.to(this.oPagesRuntime);if(this.oWorkPageRuntimeComponent){this.oWorkPageRuntimeComponent.hideRuntime()}if(this.oPageRuntimeComponent){this.oPageRuntimeComponent.onRouteMatched()}},_toggleToWorkPagesRuntime:function(){this.oNavContainer.to(this.oWorkpageRuntime);if(this.oPageRuntimeComponent){this.oPageRuntimeComponent.hideRuntime()}if(this.oWorkPageRuntimeComponent){this.oWorkPageRuntimeComponent.onRouteMatched()}},onExit:function(){this.oContainerRouter.getRoute("home").detachRouteMatched(this._handleRouter,this);this.oContainerRouter.getRoute("openFLPPage").detachRouteMatched(this._handleRouter,this)},pageComponentCreated:function(e){this.oPageRuntimeComponent=e.getParameter("component")},workPageComponentCreated:function(e){this.oWorkPageRuntimeComponent=e.getParameter("component")}})});