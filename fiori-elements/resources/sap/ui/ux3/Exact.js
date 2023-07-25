/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/commons/Button","sap/ui/commons/Menu","sap/ui/commons/SearchField","sap/ui/commons/TextView","sap/ui/core/Control","./ExactArea","./ExactAttribute","./ExactBrowser","./library","./ExactRenderer","sap/ui/commons/library"],function(t,e,r,s,a,i,u,n,o,l,c){"use strict";var h=c.TextViewDesign;var g=a.extend("sap.ui.ux3.Exact",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{resultText:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"attributes",aggregations:{settingsMenu:{type:"sap.ui.commons.Menu",multiple:false,forwarding:{idSuffix:"-browser",aggregation:"optionsMenu"}},attributes:{type:"sap.ui.ux3.ExactAttribute",multiple:true,singularName:"attribute",forwarding:{idSuffix:"-browser",aggregation:"attributes"}},controls:{type:"sap.ui.core.Control",multiple:true,singularName:"control",visibility:"hidden"}},events:{search:{parameters:{query:{type:"string"}}},refineSearch:{parameters:{query:{type:"string"},changedAttribute:{type:"sap.ui.ux3.ExactAttribute"},allSelectedAttributes:{type:"object"}}}}}});g.prototype.init=function(){var t=this;this._searchArea=new i(this.getId()+"-searchArea",{toolbarVisible:false});this._searchArea.addStyleClass("sapUiUx3ExactSearchArea");this.addAggregation("controls",this._searchArea);this._search_input=new r(this.getId()+"-searchTF",{enableListSuggest:false});this._search_input.attachSearch(function(e){p(t,e)});this._search_input.addStyleClass("sapUiUx3ExactSearchText");this._searchArea.addContent(this._search_input);this._browser=new n(this.getId()+"-browser",{title:"Attributes"});this._browser.addStyleClass("sapUiUx3ExactBrowseArea");this.addAggregation("controls",this._browser);this._browser.attachAttributeSelected(function(e){d(t,e)});this._resultArea=new i(this.getId()+"-resultArea");this.addAggregation("controls",this._resultArea);this._resultText=new s(this.getId()+"-resultAreaTitle",{design:h.Bold});this._resultText.addStyleClass("sapUiUx3ExactViewTitle");this.addAggregation("controls",this._resultText);this._bDetailsVisible=false};g.prototype.getResultText=function(){return this._resultText.getText()};g.prototype.setResultText=function(t){this._resultText.setText(t);return this};g.prototype.getResultArea=function(){return this._resultArea};g.prototype.getSearchField=function(){return this._search_input};var p=function(t,e){t._sSearchQuery=e.getParameter("query");t.fireSearch({query:t._sSearchQuery});t._bDetailsVisible=true;t.invalidate()};var d=function(t,e){t.fireRefineSearch({query:t._sSearchQuery,changedAttribute:e.getParameter("attribute"),allSelectedAttributes:e.getParameter("allAttributes")})};return g});