/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/core/Core","sap/ui/core/Fragment"],function(e,t,n){"use strict";var a=t.getLibraryResourceBundle("sap.m.designtime");var o=function(t,o){return new Promise(function(r){var s=[];var c=t.getItems();c.forEach(function(e){if(!e.isA("sap.m.IconTabSeparator")){s.push({text:e.getText()||e.getKey(),key:e.getKey()})}});var i={selectedKey:t.getSelectedKey(),titleText:a.getText("ICON_TAB_BAR_SELECT_TAB"),cancelBtn:a.getText("ICON_TAB_BAR_CANCEL_BTN"),okBtn:a.getText("ICON_TAB_BAR_SELECT_BTN"),items:s};var l=new e;l.setData(i);n.load({name:"sap.m.designtime.IconTabBarSelectTab",controller:this}).then(function(e){e.setModel(l);e.getBeginButton().attachPress(function(t){var n=sap.ui.getCore().byId("targetCombo").getSelectedKey();r(n);e.close()});e.getEndButton().attachPress(function(t){e.close()});e.attachEventOnce("afterClose",function(t){e.destroy()});e.addStyleClass(o.styleClass);e.open()})}).then(function(e){return[{selectorControl:t,changeSpecificData:{changeType:"selectIconTabBarFilter",content:{selectedKey:e,previousSelectedKey:t.getSelectedKey(),fireEvent:true}}}]})};return{name:{singular:"ICON_TAB_BAR_NAME",plural:"ICON_TAB_BAR_NAME_PLURAL"},palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/IconTabBar.icon.svg"}},aggregations:{items:{domRef:":sap-domref > .sapMITH",actions:{move:"moveControls"}},content:{domRef:function(e){var t=e._getIconTabHeader().oSelectedItem;if(t&&t.getContent().length){return}return e.getDomRef("content")},actions:{move:"moveControls"}}},actions:{settings:function(){return{selectIconTabBarFilter:{name:a.getText("ICON_TAB_BAR_SELECT_TAB"),isEnabled:function(e){return!!e._getIconTabHeader().oSelectedItem},handler:o}}}},templates:{create:"sap/m/designtime/IconTabBar.create.fragment.xml"}}});