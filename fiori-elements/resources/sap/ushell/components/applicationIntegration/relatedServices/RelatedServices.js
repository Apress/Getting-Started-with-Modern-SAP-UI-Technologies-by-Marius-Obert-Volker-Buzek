// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/Core"],function(t){"use strict";function i(){var i=false,a,e=false;this.resetBackNavigationFlag=function(){e=false};t.getEventBus().subscribe("relatedServices","resetBackNavigation",this.resetBackNavigationFlag,this);this._defaultBackNavigation=function(){window.history.back()};this.isBackNavigation=function(){return e};this.navigateBack=function(){var t=this;e=true;if(i===true){this._defaultBackNavigation()}else if(a){a()}else{sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(i){i.isInitialNavigationAsync().then(function(a){if(a){i.toExternal({target:{shellHash:"#"},writeHistory:false});return}t._defaultBackNavigation()})})}};this.setNavigateBack=function(t){i=false;a=t};this.resetNavigateBack=function(){i=true;a=undefined};this.restore=function(t){i=t.bDefaultBrowserBack;a=t.fnCustomBackNavigation};this.store=function(t){t.bDefaultBrowserBack=i;t.fnCustomBackNavigation=a}}return new i},true);