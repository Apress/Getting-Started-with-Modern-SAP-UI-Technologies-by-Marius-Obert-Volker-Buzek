/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["./BaseController","sap/m/library","sap/ui/comp/library","./Util","sap/base/util/merge"],function(t,e,o,r,n){"use strict";var a=t.extend("sap.ui.comp.personalization.SortController",{constructor:function(o,r){t.apply(this,arguments);this.setType(e.P13nPanelType.sort);this.setItemType(e.P13nPanelType.sort+"Items")},metadata:{events:{afterSortModelDataChange:{}}}});a.prototype.setTable=function(e){t.prototype.setTable.apply(this,arguments);if(this.getTable()&&e.detachSort&&e.attachSort){e.detachSort(this._onSort,this);e.attachSort(this._onSort,this)}};a.prototype.getColumn2Json=function(t,e,o){if(!r.isSortable(t)){return null}if(!t.getSorted||t.getSorted&&!t.getSorted()){return null}return{columnKey:e,operation:t.getSortOrder()}};a.prototype.getColumn2JsonTransient=function(t,e,o,n){if(!r.isSortable(t)){return null}return{columnKey:e,text:o,tooltip:n!==o?n:undefined}};a.prototype.handleIgnore=function(t,e){t.sort.sortItems.splice(e,1)};a.prototype.syncJson2Table=function(t){var e=this.getColumnMap();var r=n({},e);this.fireBeforePotentialTableChange();if(this.getTableType()===o.personalization.TableType.AnalyticalTable||this.getTableType()===o.personalization.TableType.Table||this.getTableType()===o.personalization.TableType.TreeTable){t.sort.sortItems.forEach(function(t){var o=e[t.columnKey];if(!o){return}if(t.operation===undefined){return}if(!o.getSorted()){o.setSorted(true)}if(o.getSortOrder()!==t.operation){o.setSortOrder(t.operation)}delete r[t.columnKey]});for(var a in r){var s=r[a];if(s&&s.getSorted()){s.setSorted(false)}}}this.fireAfterPotentialTableChange()};a.prototype.getDataSuiteFormat2Json=function(t){var e=this.createControlDataStructure();if(!t.SortOrder||!t.SortOrder.length){return e}e.sort.sortItems=t.SortOrder.map(function(t){return{columnKey:t.Property,operation:t.Descending?"Descending":"Ascending"}});return e};a.prototype.getDataSuiteFormatSnapshot=function(t){var e=this.getUnionData(this.getControlDataInitial(),this.getControlData());if(!e.sort||!e.sort.sortItems||!e.sort.sortItems.length){return}t.SortOrder=e.sort.sortItems.map(function(t){return{Property:t.columnKey,Descending:t.operation==="Descending"}})};a.prototype._onSort=function(t){t.preventDefault();this._updateInternalModel(r.getColumnKey(t.getParameter("column")),t.getParameter("sortOrder"),t.getParameter("columnAdded"));this.syncJson2Table(this.getControlData());this.fireAfterSortModelDataChange()};a.prototype._updateInternalModel=function(t,e,o){if(!t||e!=="Descending"&&e!=="Ascending"&&e!=="None"){return}if(!o){this.getInternalModel().setProperty("/controlData/sort/sortItems",[])}var n=this.getControlData();if(e!="None"){var a=r.getIndexByKey("columnKey",t,n.sort.sortItems);a=a>-1?a:n.sort.sortItems.length;this.getInternalModel().setProperty("/controlData/sort/sortItems/"+a+"/",{columnKey:t,operation:e})}this.updateControlDataBaseFromJson(n)};a.prototype.getPanel=function(){if(!r.hasSortableColumns(this.getColumnMap())){return null}return new Promise(function(t){sap.ui.require(["sap/m/P13nSortPanel","sap/m/P13nItem","sap/m/P13nSortItem"],function(e,o,r){return t(new e({containerQuery:true,items:{path:"$sapmP13nPanel>/transientData/sort/sortItems",template:new o({columnKey:"{$sapmP13nPanel>columnKey}",text:"{$sapmP13nPanel>text}",tooltip:"{$sapmP13nPanel>tooltip}"})},sortItems:{path:"$sapmP13nPanel>/controlDataReduce/sort/sortItems",template:new r({columnKey:"{$sapmP13nPanel>columnKey}",operation:"{$sapmP13nPanel>operation}"})},beforeNavigationTo:this.setModelFunction(),updateSortItem:function(){this.fireAfterPotentialModelChange({json:this.getControlDataReduce()})}.bind(this),addSortItem:function(t){if(!t.getParameter("sortItemData")){return}var e=t.getParameter("index");var o=t.getParameter("sortItemData");var r={columnKey:o.getColumnKey(),operation:o.getOperation()};var n=this.getControlDataReduce();if(e>-1){n.sort.sortItems.splice(e,0,r)}else{n.sort.sortItems.push(r)}this.setControlDataReduce2Model(n);this.fireAfterPotentialModelChange({json:n})}.bind(this),removeSortItem:function(t){var e=t.getParameter("index");if(e<0){return}var o=this.getControlDataReduce();o.sort.sortItems.splice(e,1);this.setControlDataReduce2Model(o);this.fireAfterPotentialModelChange({json:o})}.bind(this)}))}.bind(this))}.bind(this))};a.prototype.retrieveAdaptationUI=function(t){if(!r.hasSortableColumns(this.getColumnMap())){return null}return new Promise(function(t){sap.ui.require(["sap/m/p13n/SortPanel"],function(e){var o=this.getAdaptationData();var r=new e;r.setP13nData(o);this.oPanel=r;r.attachChange(function(t){var e=r.getP13nData(true);var o=this.getControlDataReduce();o.sort.sortItems=e.map(function(t){return{columnKey:t.name,operation:t.descending?"Descending":"Ascending"}});this.setControlDataReduce2Model(o);this.fireAfterPotentialModelChange({json:o})}.bind(this));t(r)}.bind(this))}.bind(this))};a.prototype._transformAdaptationData=function(e,o){var r=t.prototype._transformAdaptationData.apply(this,arguments);r.sorted=!!e;r.descending=e?e.operation==="Descending":false;return r};a.prototype._sortAdaptationData=function(t){this._getP13nBuilder().sortP13nData({visible:"sorted",position:"position"},t)};a.prototype._getPresenceAttribute=function(){return"sorted"};a.prototype.getChangeType=function(t,e){if(!e||!e.sort||!e.sort.sortItems){return o.personalization.ChangeType.Unchanged}var r=JSON.stringify(t.sort.sortItems)!==JSON.stringify(e.sort.sortItems);return r?o.personalization.ChangeType.ModelChanged:o.personalization.ChangeType.Unchanged};a.prototype.getChangeData=function(t,e){if(!t||!t.sort||!t.sort.sortItems){return{sort:{sortItems:[]}}}if(!e||!e.sort||!e.sort.sortItems){return{sort:r.copy(t.sort)}}if(JSON.stringify(t.sort.sortItems)!==JSON.stringify(e.sort.sortItems)){return{sort:r.copy(t.sort)}}return null};a.prototype.getUnionData=function(t,e){if(!e||!e.sort||!e.sort.sortItems){return{sort:r.copy(t.sort)}}return{sort:r.copy(e.sort)}};a.prototype.exit=function(){t.prototype.exit.apply(this,arguments);var e=this.getTable();if(e&&e.detachSort){e.detachSort(this._onSort,this)}};return a});