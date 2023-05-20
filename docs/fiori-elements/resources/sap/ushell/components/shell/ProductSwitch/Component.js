// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ui/Device","sap/ui/core/UIComponent","sap/ui/model/json/JSONModel","sap/ushell/Config","sap/ushell/resources","sap/ushell/utils/WindowUtils","sap/ushell/ui/shell/ShellHeadItem"],function(e,t,o,n,i,r,s,u){"use strict";function a(){return sap.ui.getCore().byId("productSwitchBtn")}function c(){return sap.ui.getCore().byId("sapUshellProductSwitchPopover")}return o.extend("sap.ushell.components.shell.ProductSwitch.Component",{metadata:{version:"1.113.0",library:"sap.ushell.components.shell.ProductSwitch",dependencies:{libs:{"sap.m":{},"sap.f":{lazy:true}}}},createContent:function(){this.oModel=this._getModel()},_getModel:function(){var t=this,o=new n;o.loadData(i.last("/core/productSwitch/url")).then(function(){var n=o.getData();if(n.length===0){e.debug("There are no other profucts configured for your user. ProductSwitch button will be hidden.")}else{t._addProductSwitchButtonToHeader()}}).catch(function(t){e.debug(t)});return o},_openProductSwitch:function(){var e=c(),o=Promise.resolve();if(!e){o=new Promise(function(e,t){sap.ui.require(["sap/ui/core/Fragment"],function(o){o.load({name:"sap.ushell.components.shell.ProductSwitch.ProductSwitch",type:"XML",controller:this}).then(e).catch(t)}.bind(this),t)}.bind(this)).then(function(o){e=o;e.setModel(this.oModel);e.setModel(r.i18nModel,"i18n");if(t.system.phone){e.setShowHeader(true)}}.bind(this))}o.then(function(){var t=a();if(!t||!t.$().width()){t=sap.ui.getCore().byId("endItemsOverflowBtn")}e.openBy(t)});return o},onProductItemPress:function(e){var t=e.getParameter("itemPressed").getTargetSrc();c().close();s.openURL(t,"_blank")},_addProductSwitchButtonToHeader:function(){var e=new u({id:"productSwitchBtn",icon:"sap-icon://grid",visible:true,text:r.i18n.getText("productSwitch"),ariaHaspopup:"dialog",press:this._openProductSwitch.bind(this)});sap.ushell.Container.getRenderer("fiori2").showHeaderEndItem([e.getId()],false)},exit:function(){var e=c();if(!e){e.destroy()}var t=a();if(t){t.destroy()}}})});