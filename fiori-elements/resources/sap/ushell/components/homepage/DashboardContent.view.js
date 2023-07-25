// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/library","sap/ui/core/library","sap/m/Page","sap/ui/core/Component","sap/ui/core/mvc/View","sap/ui/Device","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/thirdparty/jquery","sap/ushell/components/homepage/DashboardGroupsBox","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/resources","sap/ushell/ui/launchpad/AnchorItem","sap/ushell/ui/launchpad/AnchorNavigationBar","sap/ushell/utils","sap/ushell/components/homepage/DashboardContent.controller","sap/ushell/components/homepage/ActionMode"],function(e,t,o,i,n,s,a,r,l,h,d,u,c,p,g,f,b,m){"use strict";var v=t.AccessibleLandmarkRole;return n.extend("sap.ushell.components.homepage.DashboardContent",{createContent:function(e){this.oModel=this.getController().getOwnerComponent().getModel();var t=this.oModel.getProperty("/personalization");var n=this.oModel.getProperty("/enableTileActionsIcon");this.isCombi=s.system.combi;this.isTouch=this.isCombi?false:s.system.phone||s.system.tablet;this.parentComponent=i.getOwnerComponentFor(this);this.addStyleClass("sapUshellDashboardView");this.oRenderer=sap.ushell.Container.getRenderer("fiori2");this.bIsHomeIntentRootIntent=f.isFlpHomeIntent(this.oRenderer.getShellConfig().rootIntent);sap.ui.getCore().getEventBus().subscribe("launchpad","actionModeInactive",this._handleEditModeChange,this);sap.ui.getCore().getEventBus().subscribe("launchpad","actionModeActive",this._handleEditModeChange,this);sap.ui.getCore().getEventBus().subscribe("launchpad","contentRefresh",this._onDashboardShown,this);sap.ui.getCore().getEventBus().subscribe("launchpad","dashboardModelContentLoaded",this._onDashboardShown,this);this.oDoable=u.once("CoreResourcesComplementLoaded").do(function(){this.oAnchorNavigationBar.setOverflowEnabled(true);if(t||n){sap.ui.require(["sap/ushell/components/homepage/ActionMode"],function(e){e.init(this.oModel)}.bind(this))}if(t){this._createFooter();this._createActionModeButton()}}.bind(this));this.oFilterSelectedGroup=new a("isGroupSelected",r.EQ,true);this.oRenderer.getRouter().getRoute("home").attachMatched(this._onHomeNavigation,this);this.oAnchorNavigationBar=this._getAnchorNavigationBar(e);var d=new h;this.oDashboardGroupsBox=d.createGroupsBox(e,this.oModel);this.oPage=new o("sapUshellDashboardPage",{customHeader:this.oAnchorNavigationBar,landmarkInfo:{headerRole:v.Navigation,headerLabel:c.i18n.getText("Dashboard.Page.Header.AriaLabel"),contentRole:v.Region,contentLabel:c.i18n.getText("Dashboard.Page.Content.AriaLabel"),rootRole:v.None},floatingFooter:true,content:[this.oDashboardGroupsBox]});this.oPage.addEventDelegate({onAfterRendering:function(){var t=this.getDomRef();var o=t.getElementsByTagName("section");l(o[0]).off("scrollstop",e.handleDashboardScroll);l(o[0]).on("scrollstop",e.handleDashboardScroll)}.bind(this)});return this.oPage},getAnchorItemTemplate:function(){var e=this;var t=new p({index:"{index}",title:"{title}",groupId:"{groupId}",defaultGroup:"{isDefaultGroup}",helpId:"{helpId}",selected:false,isGroupRendered:"{isRendered}",visible:{parts:["/tileActionModeActive","isGroupVisible","visibilityModes"],formatter:function(e,t,o){if(!o[e?1:0]){return false}return t||e}},locked:"{isGroupLocked}",isGroupDisabled:{parts:["isGroupLocked","/isInDrag","/homePageGroupDisplay"],formatter:function(e,t,o){return e&&t&&o==="tabs"}},press:function(t){e.oAnchorNavigationBar.handleAnchorItemPress(t)}});t.attachBrowserEvent("focus",function(){this.setNavigationBarItemsVisibility()}.bind(this.oAnchorNavigationBar));return t},_getAnchorNavigationBar:function(e){var t=new g("anchorNavigationBar",{selectedItemIndex:"{/topGroupInViewPortIndex}",itemPress:[function(e){this._handleAnchorItemPress(e)},e],overflowEnabled:false});if(s.system.desktop){sap.ui.require(["sap/ushell/components/ComponentKeysHandler"],function(e){e.getInstance().then(function(e){t.addEventDelegate({onBeforeFastNavigationFocus:function(t){if(l(".sapUshellAnchorItem").is(":visible")){t.preventDefault();e.goToSelectedAnchorNavigationItem()}},onsapenter:function(e){e.srcControl.getDomRef().click()},onsapspace:function(e){e.srcControl.getDomRef().click()},onsaptabnext:function(){if(!sap.ui.getCore().byId("sapUshellAnchorBarOverflowButton").getVisible()){e.goToLastVisitedTile()}}})})})}t.addStyleClass("sapContrastPlus");return t},_actionModeButtonPress:function(){this.oDashboardGroupsBox.getBinding("groups").filter([]);var e=this.oDashboardGroupsBox.getGroups();m.toggleActionMode(this.oModel,"Menu Item",e);this._updateAnchorNavigationBarVisibility();if(this.oModel.getProperty("/homePageGroupDisplay")==="tabs"){if(this.oModel.getProperty("/tileActionModeActive")){var t=this.oModel.getProperty("/groups"),o;for(var i=0;i<t.length;i++){if(t[i].isGroupSelected){o=i;break}}this.getController()._scrollToGroup("launchpad","scrollToGroup",{group:{getGroupId:function(){return t[o].groupId}},groupChanged:false,focus:true})}else{this.getController()._deactivateActionModeInTabsState()}}},_createActionModeButton:function(){var e={id:"ActionModeBtn",text:c.i18n.getText("activateEditMode"),icon:"sap-icon://edit",press:this._actionModeButtonPress.bind(this)};var t=this.oRenderer.getShellConfig().moveEditHomePageActionToShellHeader;if(t){this._createActionModeButtonInHeader(e)}else{this._createActionModeButtonInUserMenu(e)}},_createActionModeButtonInHeader:function(e){sap.ui.require(["sap/ushell/ui/shell/ShellHeadItem"],function(t){this.oTileActionsButton=new t(e);if(d.last("/core/extension/enableHelp")){this.oTileActionsButton.addStyleClass("help-id-ActionModeBtn")}if(!this.bIsHomeIntentRootIntent){this.oRenderer.showHeaderEndItem(this.oTileActionsButton.getId(),true)}else{this.oRenderer.showHeaderEndItem(this.oTileActionsButton.getId(),false,["home"])}}.bind(this))},_createActionModeButtonInUserMenu:function(e){var t={controlType:"sap.ushell.ui.launchpad.ActionItem",oControlProperties:e,bIsVisible:true,aStates:["home"]};if(!this.bIsHomeIntentRootIntent){t.aStates=null;t.bCurrentState=true}this.oRenderer.addUserAction(t).done(function(e){this.oTileActionsButton=e;if(d.last("/core/extension/enableHelp")){this.oTileActionsButton.addStyleClass("help-id-ActionModeBtn")}}.bind(this))},_handleEditModeChange:function(){if(this.oTileActionsButton){this.oTileActionsButton.toggleStyleClass("sapUshellAcionItemActive")}},_createFooter:function(){sap.ui.require(["sap/m/Bar","sap/m/Button","sap/m/ToolbarSpacer"],function(t,o,i){this.oPage.setFooter(new t("sapUshellDashboardFooter",{visible:"{/tileActionModeActive}",contentRight:[new i,new o("sapUshellDashboardFooterDoneBtn",{type:e.ButtonType.Emphasized,text:c.i18n.getText("closeEditMode"),tooltip:c.i18n.getText("exitEditMode"),press:this._actionModeButtonPress.bind(this)})]}))}.bind(this))},_onDashboardShown:function(){var e=this.oRenderer&&this.oRenderer.getCurrentCoreView()==="home";if(e){if(!s.system.phone){this.oRenderer.showRightFloatingContainer(false)}this._updateAnchorNavigationBarVisibility();this.getController().resizeHandler();f.refreshTiles();if(s.system.desktop){var t=document.activeElement?document.activeElement.tagName:"";if(t!=="INPUT"&&t!=="TEXTAREA"){sap.ui.require(["sap/ushell/components/ComponentKeysHandler"],function(e){e.getInstance().then(function(e){e.goToLastVisitedTile()})})}}if(u.last("firstSegmentCompleteLoaded")){u.emit("CloseFesrRecord",Date.now())}}},_onHomeNavigation:function(){this._onDashboardShown();if(!this.bIsHomeIntentRootIntent){if(this.oRenderer.getShellConfig().moveEditHomePageActionToShellHeader){this.oRenderer.showHeaderEndItem(this.oTileActionsButton.getId(),true)}else{this.oRenderer.showActionButton(this.oTileActionsButton.getId(),true)}}},_updateAnchorNavigationBarVisibility:function(){var e=this.oPage.getShowHeader(),t=this.getModel().getObject("/tileActionModeActive"),o=this.getModel().getProperty("/groups").filter(function(e){if(t){return e.isGroupVisible&&e.visibilityModes[1]}return e.isGroupVisible&&e.visibilityModes[0]}),i=o.length>1;this.oPage.setShowHeader(i);if(i&&!e){var n=this.getModel().getProperty("/groups"),s=this.getModel().getProperty("/iSelectedGroup");for(var a=0;a<o.length;a++){if(o[a].getGroupId&&o[a].getGroupId()===n[s].groupId){this.oAnchorNavigationBar.setSelectedItemIndex(a);break}}}},getControllerName:function(){return"sap.ushell.components.homepage.DashboardContent"},exit:function(){n.prototype.exit.apply(this,arguments);if(this.oAnchorNavigationBar){this.oAnchorNavigationBar.destroy()}if(this.oTileActionsButton){this.oTileActionsButton.destroy()}if(this.oDoable){this.oDoable.off()}if(this.oPage){this.oPage.destroy()}sap.ui.getCore().getEventBus().unsubscribe("launchpad","actionModeInactive",this._handleEditModeChange,this);sap.ui.getCore().getEventBus().unsubscribe("launchpad","actionModeActive",this._handleEditModeChange,this);sap.ui.getCore().getEventBus().unsubscribe("launchpad","contentRefresh",this._onDashboardShown,this);sap.ui.getCore().getEventBus().unsubscribe("launchpad","dashboardModelContentLoaded",this._onDashboardShown,this)}})});