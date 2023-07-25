/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/m/library","sap/m/Bar","sap/m/Button","sap/m/Label","sap/ui/core/IconPool"],function(t,e,o,i,s,n){"use strict";var r=e.ButtonType;var a=o.extend("sap.viz.ui5.controls.chartpopover.HeaderBar",{metadata:{properties:{showNavButton:"boolean",title:"string"},publicMethods:[],events:{navButtonPress:{},closeButtonPress:{}}},renderer:{apiVersion:2}});a.prototype.getContentLeft=function(){if(!this._oNavButton){this._oNavButton=new i(this._createId("popoverNavButton"),{type:r.Back,tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PAGE_NAVBUTTON_TEXT"),press:t.proxy(function(){this.fireNavButtonPress()},this)}).addStyleClass("viz-controls-chartPopover-backButton")}this._oNavButton.setVisible(this.getShowNavButton());this._oNavButton.onAfterRendering=function(){this.focus()};return[this._oNavButton]};a.prototype.getContentMiddle=function(){if(!this._oTitleLabel){this._oTitleLabel=new s(this._createId("popoverHeaderTitle")).addStyleClass("viz-controls-chartPopover-titleLabel");this.addAriaLabelledBy(this._oTitleLabel)}this._oTitleLabel.setText(this.getTitle());return[this._oTitleLabel]};a.prototype.getContentRight=function(){if(!this._oCloseButton){this._oCloseButton=new i(this._createId("popoverCloseButton"),{icon:n.getIconURI("decline"),tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("MESSAGEPOPOVER_CLOSE"),press:t.proxy(function(){this.fireCloseButtonPress()},this)}).addStyleClass("viz-controls-chartPopover-closeButton")}return[this._oCloseButton]};a.prototype.exit=function(){if(this._oCloseButton){this._oCloseButton.destroy();this._oCloseButton=null}if(this._oTitleLabel){this._oTitleLabel.destroy();this._oTitleLabel=null}if(this._oNavButton){this._oNavButton.destroy();this._oNavButton=null}o.prototype.exit.apply(this,arguments)};a.prototype._createId=function(t){return this.getId()+"-"+t};return a});