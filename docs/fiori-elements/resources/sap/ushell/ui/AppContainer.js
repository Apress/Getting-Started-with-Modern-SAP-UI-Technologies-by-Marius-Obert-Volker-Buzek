// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/Element","sap/ui/Device","sap/base/Log","./AppContainerRenderer"],function(e,t,r,o,i,a){"use strict";var n=e.extend("sap.ushell.ui.AppContainer",{metadata:{library:"sap.ushell",properties:{visible:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"pages"}},events:{beforeNavigate:{parameters:{fromId:{type:"string"},from:{type:"sap.ui.core.Control"},toId:{type:"string"},to:{type:"sap.ui.core.Control"}}},afterNavigate:{parameters:{fromId:{type:"string"},from:{type:"sap.ui.core.Control"},toId:{type:"string"},to:{type:"sap.ui.core.Control"}}}}},renderer:a});n.prototype.addPages=function(e){if(this.getPages().indexOf(e)>-1){return}if(e.hasStyleClass("sapUShellApplicationContainerShiftedIframe")){e.toggleStyleClass("sapUShellApplicationContainerIframeHidden",true)}else{e.toggleStyleClass("hidden",true)}this.addAggregation("pages",e,true);var r=this.getDomRef();if(r){var o=t.createRenderManager();o.render(e,r);o.destroy()}};n.prototype.addCenterViewPort=n.prototype.addPages;n.prototype.removeCenterViewPort=function(e){this.removeAggregation("pages",e,true)};n.prototype.getCurrentCenterPage=function(){return this.getPages().reduce(function(e,t){if(t&&t.hasStyleClass("sapUShellApplicationContainerShiftedIframe")){return!t.hasStyleClass("sapUShellApplicationContainerIframeHidden")?t.getId():e}return t&&!t.hasStyleClass("hidden")?t.getId():e},null)};n.prototype.navTo=function(e,r){var a=t.byId(r),n=this.getCurrentCenterPage(),s=t.byId(n)||null,p=sap.ushell.Container.getRenderer("fiori2").byId("Shell-home-component-container"),l=p&&p.getId(),d=n&&l===n,u=l===r;if(e!=="centerViewPort"){i.error("Navigation to "+e+" is not allowed in Fiori3");return}if(this.getPages().indexOf(a)===-1){i.error("AppContainer: invalid navigation target");return}if(o.system.desktop&&d){this._saveFocus()}if(n!==r){this.fireBeforeNavigate({toId:r,to:a,fromId:n,from:s})}this.getPages().forEach(function(e){if(e){if(e.hasStyleClass("sapUShellApplicationContainerShiftedIframe")){e.toggleStyleClass("sapUShellApplicationContainerIframeHidden",e.getId()!==r)}else{e.toggleStyleClass("hidden",e.getId()!==r)}}});if(o.system.desktop&&u){this._restoreFocus()}if(n!==r){this.fireAfterNavigate({toId:r,to:a,fromId:n,from:s})}};n.prototype._restoreFocus=function(){sap.ui.require(["sap/ushell/renderers/fiori2/AccessKeysHandler"],function(e){var r;if(this.sLastFocusId){e.registerAppKeysHandler(this.fnLastAppKeyHandler);r=t.byId(this.sLastFocusId);if(r){r.focus()}}}.bind(this))};n.prototype._saveFocus=function(){sap.ui.require(["sap/ushell/renderers/fiori2/AccessKeysHandler"],function(e){var t=r.closestTo(document.activeElement);this.sLastFocusId=t?t.getId():null;this.fnLastAppKeyHandler=e.getAppKeysHandler()}.bind(this))};n.prototype.getViewPortControl=function(e,t){return this.getPages().reduce(function(r,o){return e==="centerViewPort"&&o&&o.getId()===t?o:r},null)};var s=function(){};n.prototype.switchState=s;n.prototype._handleSizeChange=s;n.prototype.shiftCenterTransitionEnabled=s;n.prototype.shiftCenterTransition=s;n.prototype.addLeftViewPort=s;n.prototype.addRightViewPort=s;n.prototype.attachAfterSwitchState=s;n.prototype.detachAfterSwitchState=s;n.prototype.attachAfterSwitchStateAnimationFinished=s;n.prototype.detachAfterSwitchStateAnimationFinished=s;n.prototype.getCurrentState=function(){return"Center"};return n});