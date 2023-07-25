/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/AbstractContainer","sap/m/p13n/AbstractContainerItem","sap/m/p13n/SelectionPanel","./GroupView","sap/ui/model/Filter","sap/m/Button","sap/m/Bar","sap/m/ToolbarSpacer","sap/m/Select","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/m/SearchField","sap/m/OverflowToolbarLayoutData","sap/ui/core/Item","sap/m/library","sap/ui/model/json/JSONModel"],function(e,t,i,s,n,o,r,a,h,c,u,l,p,g,d,_){"use strict";var w=d.BarDesign;var y=e.extend("sap.ui.mdc.p13n.panels.AdaptFiltersPanel",{metadata:{library:"sap.ui.mdc",properties:{itemFactory:{type:"function"},enableReorder:{type:"boolean",defaultValue:true}}},renderer:{apiVersion:2}});y.prototype.GROUP_KEY="group";y.prototype.LIST_KEY="list";y.prototype.P13N_MODEL="$p13n";y.prototype.applySettings=function(n){this.addView(new t({key:this.LIST_KEY,content:new i(this.getId()+"-listView",{activeColumn:this._getResourceText("p13nDialog.LIST_VIEW_ACTIVE"),change:function(e){this.getP13nModel().setProperty("/items",e.getSource().getP13nData())}.bind(this)})}));this.addView(new t({key:this.GROUP_KEY,content:new s(this.getId()+"-groupView",{change:function(e){this.getP13nModel().setProperty("/itemsGrouped",e.getSource().getP13nData())}.bind(this)})}));e.prototype.applySettings.apply(this,arguments);this.getView(this.LIST_KEY).getContent().setEnableReorder(this.getEnableReorder());var o=this._getQuickFilter();var h=this._getViewSwitch();var c=this._getShowHideBtn();var u=new r({contentMiddle:[o,new a,c,h]});u.setDesign(w.SubHeader);this.setHeader(u);var l=new r({contentMiddle:[this._getSearchField()]});l.addStyleClass("sapUiMDCAdaptFiltersSearchBar");l.setDesign(w.SubHeader);this.setSubHeader(l);this.addStyleClass("sapUiMDCAdaptFiltersPanel")};y.prototype.setItemFactory=function(e){this.setProperty("itemFactory",e);this.getViews().forEach(function(t){var i=t.getContent();i.setItemFactory(e)});return this};y.prototype.switchView=function(t){var i=t;e.prototype.switchView.call(this,i);this._getShowHideBtn().setVisible(!this._isCustomView());this._getViewSwitch().setSelectedKey(this.getCurrentViewKey());if(!this._isCustomView(t)){this.showFactory(this.getCurrentViewContent()._getShowFactory())}this._filterByModeAndSearch()};y.prototype.addCustomView=function(e){var i=e.item;var s=i.getKey();var n=e.content;var o=e.search;var r=e.selectionChange;var a=e.filterSelect;if(!s){throw new Error("Please provide an item of type sap.m.SegmentedButtonItem with a key")}if(this._oViewSwitch){this._oViewSwitch.attachSelectionChange(function(e){if(r){r(e.getParameter("item").getKey())}if(this._isCustomView()){if(o instanceof Function){o(this._getSearchField().getValue())}if(a instanceof Function){a(this._getQuickFilter().getSelectedKey())}}}.bind(this))}if(o instanceof Function){this._getSearchField().attachLiveChange(function(e){if(this._isCustomView()){o(this._getSearchField().getValue())}}.bind(this))}if(a instanceof Function){this._getQuickFilter().attachChange(function(e){if(this._isCustomView()){a(this._getQuickFilter().getSelectedKey())}}.bind(this))}this.addView(new t({key:s,content:n.addStyleClass("sapUiMDCPanelPadding")}));var h=this._getViewSwitch();h.addItem(i)};y.prototype.showFactory=function(e){if(this.getCurrentViewContent().showFactory){this.getCurrentViewContent().showFactory(e)}};y.prototype.getSelectedFields=function(){return this.getCurrentViewContent().getSelectedFields()};y.prototype.setGroupExpanded=function(e,t){this.getView(this.GROUP_KEY).getContent().setGroupExpanded(e,t)};y.prototype.setP13nModel=function(e){this.setModel(e,this.P13N_MODEL);this.getView(this.LIST_KEY).getContent().setP13nData(e.getProperty("/items"));this.getView(this.GROUP_KEY).getContent().setP13nData(e.getProperty("/itemsGrouped"));this._filterByModeAndSearch()};y.prototype.setP13nData=function(e){var t=this.getP13nModel();if(!t){this.setP13nModel(new _(e))}else{t.setData(e);this.getView(this.LIST_KEY).getContent().setP13nData(t.getProperty("/items"));this.getView(this.GROUP_KEY).getContent().setP13nData(t.getProperty("/itemsGrouped"))}};y.prototype.restoreDefaults=function(){this._getSearchField().setValue("");this._filterByModeAndSearch()};y.prototype.getP13nModel=function(){return this.getModel(this.P13N_MODEL)};y.prototype._getShowHideBtn=function(){var e=this._getResourceText("filterbar.ADAPT_SHOW_VALUE");var t=this._getResourceText("filterbar.ADAPT_HIDE_VALUE");if(!this._oShowHideBtn){this._oShowHideBtn=new o({press:function(i){this.showFactory(!this.getCurrentViewContent()._getShowFactory());var s=i.oSource;var n=s.getText()===e?t:e;s.setText(n)}.bind(this)})}this._oShowHideBtn.setText(!this._isCustomView()&&this.getCurrentViewContent()._getShowFactory()?t:e);return this._oShowHideBtn};y.prototype._getQuickFilter=function(){if(!this._oGroupModeSelect){this._oGroupModeSelect=new h({items:[new g({key:"all",text:this._getResourceText("p13nDialog.GROUPMODE_ALL")}),new g({key:"visible",text:this._getResourceText("p13nDialog.GROUPMODE_VISIBLE")}),new g({key:"active",text:this._getResourceText("p13nDialog.GROUPMODE_ACTIVE")}),new g({key:"visibleactive",text:this._getResourceText("p13nDialog.GROUPMODE_VISIBLE_ACTIVE")}),new g({key:"mandatory",text:this._getResourceText("p13nDialog.GROUPMODE_MANDATORY")})],tooltip:this._getResourceText("p13nDialog.QUICK_FILTER"),change:this._onGroupModeChange.bind(this)})}return this._oGroupModeSelect};y.prototype._getSearchField=function(){if(!this._oSearchField){this._oSearchField=new l(this.getId()+"-searchField",{liveChange:[this._filterByModeAndSearch,this],width:"100%"});this._oSearchField.setPlaceholder(this._getResourceText("p13nDialog.ADAPT_FILTER_SEARCH"))}return this._oSearchField};y.prototype.getInitialFocusedControl=function(){return this._getSearchField()};y.prototype._onGroupModeChange=function(e){this._sModeKey=e.getParameters().selectedItem.getKey();this._filterByModeAndSearch()};y.prototype._getViewSwitch=function(){if(!this._oViewSwitch){this._oViewSwitch=new c({items:[new u({tooltip:this._getResourceText("filterbar.ADAPT_LIST_VIEW"),icon:"sap-icon://list",key:this.LIST_KEY}),new u({tooltip:this._getResourceText("filterbar.ADAPT_GROUP_VIEW"),icon:"sap-icon://group-2",key:this.GROUP_KEY})],selectionChange:function(e){if(this.getCurrentViewKey()===this.LIST_KEY){this.getCurrentViewContent()._removeMoveButtons()}var t=e.getParameter("item").getKey();this.switchView(t)}.bind(this)})}return this._oViewSwitch};y.prototype._isCustomView=function(){return this._sCurrentView!=this.GROUP_KEY&&this._sCurrentView!=this.LIST_KEY};y.prototype._filterByModeAndSearch=function(){if(this._isCustomView(this.getCurrentViewKey())){return}this._sSearchString=this._getSearchField().getValue();var e=this._createFilterQuery();this._getSearchField().setValue(this._sSearchString);this.getCurrentViewContent().filterContent(e);return e};y.prototype._getResourceText=function(e){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText(e)};y.prototype._createFilterQuery=function(){var e=[],t=[],i=[];if(this._sSearchString){e=[new n("label","Contains",this._sSearchString),new n("tooltip","Contains",this._sSearchString)];i=new n(e,false)}switch(this._sModeKey){case"visible":t=new n("visible","EQ",true);break;case"active":t=new n("active","EQ",true);break;case"mandatory":t=new n("required","EQ",true);break;case"visibleactive":t=new n([new n("active","EQ",true),new n("visible","EQ",true)],true);break;default:}var s=new n("visibleInDialog","EQ",true);return new n([].concat(i,t,s),true)};y.prototype.exit=function(){e.prototype.exit.apply(this,arguments);this._sModeKey=null;this._sSearchString=null};return y});