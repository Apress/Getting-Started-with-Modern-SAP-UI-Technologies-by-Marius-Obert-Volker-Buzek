// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/ButtonRenderer","sap/ushell/resources","sap/ushell/ui/launchpad/ActionItem"],function(t,e,o){"use strict";var i=o.extend("sap.ushell.ui.footerbar.AboutButton",{metadata:{library:"sap.ushell"},renderer:t});i.prototype.init=function(){if(o.prototype.init){o.prototype.init.apply(this,arguments)}this.setIcon("sap-icon://hint");this.setText(e.i18n.getText("about"));this.attachPress(this.showAboutDialog)};i.prototype.showAboutDialog=function(){return new Promise(function(t,o){sap.ui.require(["sap/ushell/ui/footerbar/AboutDialog.controller","sap/ui/core/Fragment"],function(i,n){n.load({id:"aboutDialogFragment",name:"sap.ushell.ui.footerbar.AboutDialog",type:"XML",controller:new i}).then(function(o){o.setModel(e.getTranslationModel(),"i18n");o.open();t()}).catch(o)})})};return i});