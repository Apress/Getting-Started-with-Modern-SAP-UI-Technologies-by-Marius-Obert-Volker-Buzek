/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseListContent","./ListContentRenderer","sap/ui/util/openWindow","sap/m/library","sap/m/List","sap/ui/integration/controls/ObjectStatus","sap/ui/integration/library","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/ui/integration/controls/Microchart","sap/ui/integration/controls/MicrochartLegend","sap/ui/integration/controls/ListContentItem","sap/ui/integration/controls/ActionsStrip","sap/ui/integration/cards/list/MicrochartsResizeHelper"],function(t,i,e,o,n,s,r,a,c,h,l,p,g,u){"use strict";var d=o.AvatarSize;var f=o.AvatarColor;var m=o.ListType;var y=o.ListSeparators;var v=r.CardActionArea;var _=o.EmptyIndicatorMode;var I="_legendColorsLoad";var S=t.extend("sap.ui.integration.cards.ListContent",{metadata:{library:"sap.ui.integration",aggregations:{_legend:{multiple:false,visibility:"hidden"}}},renderer:i});S.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.apply(this,arguments);this._getList().setBackgroundDesign(this.getDesign())};S.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy();this._oItemTemplate=null}if(this._oMicrochartsResizeHelper){this._oMicrochartsResizeHelper.destroy();this._oMicrochartsResizeHelper=null}};S.prototype.loadDependencies=function(t){if(!this.isSkeleton()&&t.get("/sap.card/content/item/chart")){return h.loadDependencies()}return Promise.resolve()};S.prototype.applyConfiguration=function(){t.prototype.applyConfiguration.apply(this,arguments);var i=this.getParsedConfiguration();if(!i){return}if(i.items){this._setStaticItems(i.items);return}if(i.item){this._setItem(i)}};S.prototype.getStaticConfiguration=function(){var t=this.getInnerList().getItems(),i=this.getParsedConfiguration(),e=t[0]&&t[0].isA("sap.m.GroupHeaderListItem"),o=[],n=[],s;t.forEach(function(t){if(t.isA("sap.m.GroupHeaderListItem")){if(s){n.push(s)}o=[];s={title:t.getTitle(),items:o}}else{o.push(c.resolveValue(i.item,this,t.getBindingContext().getPath()))}}.bind(this));if(s){n.push(s)}var r={};if(e){r.groups=n}else{r.groups=[{items:o}]}return r};S.prototype.onDataChanged=function(){t.prototype.onDataChanged.apply(this,arguments);this._checkHiddenNavigationItems(this.getParsedConfiguration().item)};S.prototype._getList=function(){if(this._bIsBeingDestroyed){return null}if(!this._oList){this._oList=new n({id:this.getId()+"-list",growing:false,showNoData:false,ariaLabelledBy:this.getHeaderTitleId(),updateFinished:function(){if(this._iVisibleItems){var t=this._oList.getItems();for(var i=this._iVisibleItems+1;i<t.length;i++){t[i].setVisible(false)}}}.bind(this)});this._oList.addEventDelegate({onfocusin:function(t){if(!(t.srcControl instanceof p)){return}var i=t.target.getBoundingClientRect().bottom;var e=this.getDomRef().getBoundingClientRect().bottom;var o=Math.abs(i-e);var n=10;if(o<n){t.srcControl.addStyleClass("sapUiIntLCIRoundedCorners")}}},this);this.setAggregation("_content",this._oList)}return this._oList};S.prototype._setItem=function(t){var i=t.item,e=this._getList(),o=this.isSkeleton(),n,r={title:i.title&&(i.title.value||i.title),description:i.description&&(i.description.value||i.description),highlight:i.highlight,highlightText:i.highlightText,info:i.info&&i.info.value,infoState:i.info&&i.info.state,showInfoStateIcon:i.info&&i.info.showStateIcon,customInfoStatusIcon:i.info&&i.info.customStateIcon,attributes:[]};if(i.icon){r.icon=a.formattedProperty(i.icon.src,function(t){return this._oIconFormatter.formatSrc(t)}.bind(this));r.iconAlt=i.icon.alt;r.iconDisplayShape=i.icon.shape;r.iconInitials=i.icon.initials||i.icon.text;r.iconVisible=i.icon.visible;if(p.getLinesCount(i)===1){r.iconSize=d.XS}else{r.iconSize=d.S}r.iconSize=i.icon.size||r.iconSize;r.iconBackgroundColor=i.icon.backgroundColor||(r.iconInitials?undefined:f.Transparent)}if(i.attributesLayoutType){r.attributesLayoutType=i.attributesLayoutType}if(i.attributes){i.attributes.forEach(function(t){n=new s({text:t.value,state:t.state,emptyIndicatorMode:_.On,visible:t.visible,showStateIcon:t.showStateIcon,icon:t.customStateIcon});r.attributes.push(n)})}if(!o){if(i.chart){r.microchart=this._createChartAndAddLegend(i.chart)}if(i.actionsStrip){r.actionsStrip=g.create(this.getCardInstance(),i.actionsStrip);e.setShowSeparators(y.All)}else{e.setShowSeparators(y.None)}}this._oItemTemplate=new p(r);this._oActions.attach({area:v.ContentItem,actions:i.actions,control:this,actionControl:this._oItemTemplate,enabledPropertyName:"type",enabledPropertyValue:m.Active,disabledPropertyValue:m.Inactive});var c=t.group;if(c){this._oSorter=this._getGroupSorter(c)}var h={template:this._oItemTemplate,sorter:this._oSorter};this._bindAggregationToControl("items",e,h)};S.prototype._createChartAndAddLegend=function(t){var i=h.create(t);this.destroyAggregation("_legend");if(t.type==="StackedBar"){var e=new l({chart:i.getChart(),colorsLoad:function(){this.fireEvent(I)}.bind(this)});e.initItemsTitles(t.bars,this.getBindingContext().getPath());this.setAggregation("_legend",e);this.awaitEvent(I)}this._oMicrochartsResizeHelper=new u(this._oList);return i};S.prototype._setStaticItems=function(t){var i=this._getList();t.forEach(function(t){var o=new p({title:t.title?t.title:"",description:t.description?t.description:"",icon:t.icon?t.icon:"",infoState:t.infoState?t.infoState:"None",info:t.info?t.info:"",highlight:t.highlight?t.highlight:"None",highlightText:t.highlightText?t.highlightText:""});if(t.action){o.setType("Navigation");if(t.action.url){o.attachPress(function(){e(t.action.url,t.target||"_blank")})}}i.addItem(o)});this.fireEvent("_actionContentReady")};S.prototype.getInnerList=function(){return this._getList()};return S});