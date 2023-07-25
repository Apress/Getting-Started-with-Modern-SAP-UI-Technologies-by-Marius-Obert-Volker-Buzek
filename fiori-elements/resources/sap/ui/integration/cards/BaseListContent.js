/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/cards/BaseContent","sap/ui/integration/util/BindingResolver","sap/m/IllustratedMessageType","sap/ui/integration/library","sap/base/Log","sap/ui/model/Sorter"],function(t,e,i,n,r,s){"use strict";var a=t.extend("sap.ui.integration.cards.BaseListContent",{metadata:{library:"sap.ui.integration"},renderer:{apiVersion:2}});a.prototype.init=function(){t.prototype.init.apply(this,arguments);this._oAwaitingPromise=null;this._fMinHeight=0;this._bIsFirstRendering=true};a.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this._oAwaitingPromise=null};a.prototype.onAfterRendering=function(){if(!this._bIsFirstRendering){this._keepHeight()}this._bIsFirstRendering=false};a.prototype.onDataChanged=function(){if(this.hasData()){this.destroyAggregation("_noDataMessage")}else{this.showNoDataMessage({type:i.NoEntries,title:this.getCardInstance().getTranslatedText("CARD_NO_ITEMS_ERROR_LISTS")})}};a.prototype._keepHeight=function(){if(!this.getDomRef()){return}var t=this.getDomRef().getBoundingClientRect().height;if(t>this._fMinHeight){this._fMinHeight=t}if(this._fMinHeight){this.getDomRef().style.minHeight=this._fMinHeight+"px"}this._keepPlaceholderMinItems()};a.prototype._keepPlaceholderMinItems=function(){var t=this.getAggregation("_loadingPlaceholder"),e=!!this.getAggregation("_content"),i,n;if(!t||!t.getMinItems||!e){return}if(this.getInnerList().getItems){i=this.getInnerList().getItems().length}else{i=this.getInnerList().getContent().length}n=Math.max(t.getMinItems(),i);t.setMinItems(n)};a.prototype.applyConfiguration=function(){var t=this.getConfiguration();if(!t){return}var e=this.getInnerList(),i=this.getCard()?this.getCardInstance().hasPaginator():false,n=t.maxItems;if(!Number.isNaN(parseInt(n))){n=parseInt(n)}if(e&&n&&!i){e.applySettings({growing:true,growingThreshold:n});e.addStyleClass("sapFCardMaxItems")}this._fMinHeight=0};a.prototype.getInnerList=function(){return null};a.prototype._checkHiddenNavigationItems=function(t){if(!t.actions){return}if(!this.getInnerList()){return}var i=this.getInnerList(),n=this.isA("sap.ui.integration.cards.TimelineContent")?i.getContent():i.getItems(),s=[],a=t.actions[0],o,g=0;if(!a||!a.service||a.type!=="Navigation"){return}if(a.service==="object"){o=a.service.name}else{o=a.service}n.forEach(function(t){var i=e.resolveValue(a.parameters,this,t.getBindingContext().getPath());s.push(this._oServiceManager.getService(o).then(function(t){if(!t.hidden){return false}return t.hidden({parameters:i})}).then(function(e){t.setVisible(!e);if(!e){g++}}).catch(function(t){r.error(t)}))}.bind(this));this.awaitEvent("_filterNavItemsReady");var h=this._oAwaitingPromise=Promise.all(s).then(function(){if(this._oAwaitingPromise===h){if(this.getModel("parameters")){this.getModel("parameters").setProperty("/visibleItems",g)}this.fireEvent("_filterNavItemsReady")}}.bind(this))};a.prototype.hasData=function(){var t=this.getInnerList(),e=t.getBinding(t.getMetadata().getDefaultAggregationName()),i=e.getModel(),n=e.getPath(),r=i.getProperty(n);if(r&&r.length){return true}return false};a.prototype._getGroupSorter=function(t){var i=false;if(t.order.dir&&t.order.dir==="DESC"){i=true}var n=new s(t.order.path,i,function(i){return e.resolveValue(t.title,i.getModel(),i.getPath())});return n};a.prototype.sliceData=function(t,e){this.getModel().sliceData(t,e);if(t!==0){this._keepHeight()}};a.prototype.getDataLength=function(){var t=this.getModel().getProperty(this.getInnerList().getBindingContext().getPath());if(Array.isArray(t)){return t.length}return Object.getOwnPropertyNames(t).length};return a});