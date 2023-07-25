/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","./AccessibilityRender","../utils/TableUtils","../library","sap/ui/thirdparty/jquery","sap/ui/core/Configuration"],function(e,t,a,r,i,o){"use strict";var l=r.SelectionMode;var n=a.CELLTYPE;var s={getAccInfoOfControl:function(e){var t=null;if(e&&typeof e.getAccessibilityInfo==="function"){if(typeof e.getVisible==="function"&&!e.getVisible()){t=s._normalize({})}else{var r=e.getAccessibilityInfo();if(r){var i={};s._flatten(r,i);t=i}}if(t&&!t.description){t.description=a.getResourceText("TBL_CTRL_STATE_EMPTY")}}return t},_normalize:function(e){if(!e){return null}if(e._normalized){return e}e.role=e.role||"";e.type=e.type||"";e.description=e.description||"";e.enabled=e.enabled===true||e.enabled===false?e.enabled:null;e.editable=e.editable===true||e.editable===false?e.editable:null;e.children=e.children||[];e._normalized=true;return e},_flatten:function(e,t,a){a=a?a:0;s._normalize(e);if(a==0){s._normalize(t);t._descriptions=[]}t._descriptions.push(s._getFullDescription(e));e.children.forEach(function(e){if(!e.getAccessibilityInfo||e.getVisible&&!e.getVisible()){return}var r=e.getAccessibilityInfo();if(r){s._flatten(r,t,a+1)}});if(a==0){t.description=t._descriptions.join(" ").trim();t._descriptions=undefined}},_getFullDescription:function(e){var t=e.type+" "+e.description;if(e.enabled===false){t=t+" "+a.getResourceText("TBL_CTRL_STATE_DISABLED")}else if(e.editable===false){t=t+" "+a.getResourceText("TBL_CTRL_STATE_READONLY")}else if(e.required===true){t=t+" "+a.getResourceText("TBL_CTRL_STATE_REQUIRED")}return t.trim()}};var u={getColumnIndexOfFocusedCell:function(e){var t=e.getTable();var r=a.getFocusedItemInfo(t);return r.cellInRow-(a.hasRowHeader(t)?1:0)},getInfoOfFocusedCell:function(e){var t=e.getTable();var r=t._getItemNavigation();var i=t.getDomRef();if(!e.getAccMode()||!i||!r){return null}var o=r.getFocusedDomRef();if(!o||o!==document.activeElement){return null}return a.getCellInfo(o)},getRelevantColumnHeaders:function(e,t){var r=[];if(!e||!t||!e.getColumnHeaderVisible()){return r}var i=a.getHeaderRowCount(e);if(i>0){var o=t.getId();r.push(o);for(var l=1;l<i;l++){r.push(o+"_"+l)}var n=a.Column.getParentSpannedColumns(e,o);if(n&&n.length){for(var s=0;s<n.length;s++){var u=n[s].level;var c=n[s].column.getId();r[u]=u===0?c:c+"_"+u}}}return r},isHiddenCell:function(e,t){var r=a.Grouping.isInGroupHeaderRow(e);var i=a.Grouping.isInSummaryRow(e);var o=!!t&&!!t.hasStyleClass;var l=e.parent().hasClass("sapUiTableRowHidden");var n=e.hasClass("sapUiTableCellHidden");var s=r&&o&&t.hasStyleClass("sapUiAnalyticalTableGroupCellHidden");var u=i&&o&&t.hasStyleClass("sapUiAnalyticalTableSumCellHidden");return l||n||s||u},isTreeColumnCell:function(e,t){return a.Grouping.isInTreeMode(e.getTable())&&t.hasClass("sapUiTableCellFirst")},getColumnTooltip:function(e){if(!e){return null}var t=e.getLabel();function r(e){if(!e){return false}var a=t&&t.getText?t.getText():"";return e==a}var i=e.getTooltip_AsString();if(!r(i)){return i}if(a.isA(t,"sap.ui.core.Control")){i=t.getTooltip_AsString()}if(!r(i)){return i}return null},getGridSize:function(e){var t=a.hasRowHeader(e);var r=a.hasRowActions(e);var i=a.getVisibleColumnCount(e)+(t?1:0)+(r?1:0);var o=a.isNoDataVisible(e)?0:Math.max(e._getTotalRowCount(),e._getRowCounts()._fullsize);return{columnCount:i,rowCount:a.getHeaderRowCount(e)+o}},getRowIndex:function(e){return e.getIndex()+1+a.getHeaderRowCount(e.getTable())},updateRowColCount:function(e){var t=e.getTable(),r=t._getItemNavigation(),i=false,o=false,l=false,n=a.hasRowHeader(t);if(r){var s=u.getColumnIndexOfFocusedCell(e)+1+(n?1:0);var c=t.getRows()[a.getRowIndexOfFocusedCell(t)];var d=c?u.getRowIndex(c):0;var f=u.getGridSize(t);i=e._iLastRowNumber!=d||e._iLastRowNumber==d&&e._iLastColumnNumber==s;o=e._iLastColumnNumber!=s;l=e._iLastRowNumber==null&&e._iLastColumnNumber==null;t.$("rownumberofrows").text(i&&d>0?a.getResourceText("TBL_ROW_ROWCOUNT",[d,f.rowCount]):" ");t.$("colnumberofcols").text(o?a.getResourceText("TBL_COL_COLCOUNT",[s,f.columnCount]):" ");t.$("ariacount").text(l?a.getResourceText("TBL_DATA_ROWS_COLS",[f.rowCount,f.columnCount]):" ");e._iLastRowNumber=d;e._iLastColumnNumber=s}return{rowChange:i,colChange:o,initial:l}},cleanupCellModifications:function(e){if(e._cleanupInfo){e._cleanupInfo.cell.attr(e._cleanupInfo.attr);e._cleanupInfo=null}},storeDefaultsBeforeCellModifications:function(e,t,a,r){e._cleanupInfo={cell:t,attr:{"aria-labelledby":a&&a.length?a.join(" "):null,"aria-describedby":r&&r.length?r.join(" "):null}}},performCellModifications:function(e,t,r,i,o,n,s,c){u.storeDefaultsBeforeCellModifications(e,t,r,i);var d=u.updateRowColCount(e);var f=e.getTable();f.$("cellacc").text(s||" ");if(c){c(o,n,d.rowChange,d.colChange,d.initial)}var E="";if(d.initial){E=f.getId()+"-ariacount";if(f.getSelectionMode()!==l.None){E=E+" "+f.getId()+"-ariaselection"}}if(o&&o.length){E=E+" "+o.join(" ")}if(d.initial||d.rowChange){if(a.hasRowNavigationIndicators(f)){var g=a.getCellInfo(t);if(g.type!==a.CELLTYPE.COLUMNHEADER&&g.type!==a.CELLTYPE.COLUMNROWHEADER){var T=f.getRows()[g.rowIndex].getAggregation("_settings");if(T.getNavigated()){E=E+" "+f.getId()+"-rownavigatedtext"}}}}t.attr({"aria-labelledby":E?E:null,"aria-describedby":n&&n.length?n.join(" "):null})},modifyAccOfDATACELL:function(e){var t=this.getTable();var r=t.getId();var i=t._getItemNavigation();var o=e.cell;if(!i){return}var l=a.getRowIndexOfFocusedCell(t),n=u.getColumnIndexOfFocusedCell(this),d=a.getRowColCell(t,l,n,false),f=null,E=d.row,g=E.getId(),T=u.isHiddenCell(o,d.cell),p=u.isTreeColumnCell(this,o),b=u.getAriaAttributesFor(this,c.ELEMENTTYPES.DATACELL,{index:n,column:d.column,fixed:a.isFixedColumn(t,n)})["aria-labelledby"]||[],R=[],C=[r+"-rownumberofrows",r+"-colnumberofcols"],h=E.isGroupHeader(),A=E.isSummary();if(h){C.push(r+"-ariarowgrouplabel")}else if(E.isTotalSummary()){C.push(r+"-ariagrandtotallabel")}else if(E.isGroupSummary()){C.push(r+"-ariagrouptotallabel")}if(a.hasRowHighlights(t)&&!h&&!A){C.push(g+"-highlighttext")}C=C.concat(b);if(!T){f=s.getAccInfoOfControl(d.cell);C.push(f?r+"-cellacc":d.cell.getId());if(a.getInteractiveElements(o)!==null){C.push(r+"-toggleedit")}}var v=f?f.description:" ";if(p&&!T){var L=u.getAriaAttributesFor(this,c.ELEMENTTYPES.TREEICON,{row:d.row});if(L&&L["aria-label"]){v=L["aria-label"]+" "+v}}u.performCellModifications(this,o,b,null,C,R,v,function(e,r,i,l){if(h&&i){e.splice(3,0,g+"-groupHeader")}var n=o.find(".sapUiTableTreeIcon").not(".sapUiTableTreeIconLeaf").length==1;if((n||h)&&(i||l)){r.push(t.getId()+(!E.isExpanded()?"-rowexpandtext":"-rowcollapsetext"))}else if(!T&&!h&&!A&&a.isRowSelectionAllowed(t)&&i){e.push(g+"-rowselecttext")}})},modifyAccOfROWHEADER:function(e){var t=this.getTable();var r=t.getId();var i=e.cell;var o=t.getRows()[e.rowIndex];var l=o.getId();var n=u.getAriaAttributesFor(this,c.ELEMENTTYPES.ROWHEADER)["aria-labelledby"]||[];var s=n.concat([r+"-rownumberofrows",r+"-colnumberofcols"]);if(!o.isSummary()&&!o.isGroupHeader()&&!o.isContentHidden()){s.push(l+"-rowselecttext");if(a.hasRowHighlights(t)){s.push(l+"-highlighttext")}}if(o.isGroupHeader()){s.push(r+"-ariarowgrouplabel");s.push(l+"-groupHeader");s.push(r+(o.isExpanded()?"-rowcollapsetext":"-rowexpandtext"))}if(o.isTotalSummary()){s.push(r+"-ariagrandtotallabel")}else if(o.isGroupSummary()){s.push(r+"-ariagrouptotallabel")}u.performCellModifications(this,i,n,null,s,null,null)},modifyAccOfCOLUMNHEADER:function(e){var t=this.getTable();var r=e.cell;var i=sap.ui.getCore().byId(r.attr("data-sap-ui-colid"));var o=a.Column.getHeaderLabel(i);var l=u.getAriaAttributesFor(this,c.ELEMENTTYPES.COLUMNHEADER,{headerId:r.attr("id"),column:i,index:r.attr("data-sap-ui-colindex")});var n=u.getColumnTooltip(i);var s=[t.getId()+"-colnumberofcols"].concat(l["aria-labelledby"]);var d=e.columnSpan;if(a.isA(o,"sap.m.Label")&&o.getRequired()){s.push(t.getId()+"-ariarequired")}if(d>1){s.push(t.getId()+"-ariacolspan");t.$("ariacolspan").text(a.getResourceText("TBL_COL_DESC_SPAN",[""+d]))}if(n){s.push(t.getId()+"-cellacc")}if(d<=1&&i&&i.getFiltered()){s.push(t.getId()+"-ariacolfiltered")}u.performCellModifications(this,r,l["aria-labelledby"],l["aria-describedby"],s,l["aria-describedby"],n)},modifyAccOfCOLUMNROWHEADER:function(e){var t=this.getTable();var a=e.cell;var r=a.hasClass("sapUiTableSelAllVisible");var i=u.getAriaAttributesFor(this,c.ELEMENTTYPES.COLUMNROWHEADER,{enabled:r,checked:r&&!t.$().hasClass("sapUiTableSelAll")});var o=[t.getId()+"-colnumberofcols"].concat(i["aria-labelledby"]);u.performCellModifications(this,a,i["aria-labelledby"],i["aria-describedby"],o,i["aria-describedby"],null)},modifyAccOfROWACTION:function(e){var t=this.getTable();var r=t.getId();var i=e.cell;var o=t.getRows()[e.rowIndex];var l=o.getId();var n=u.isHiddenCell(i);var s=u.getAriaAttributesFor(this,c.ELEMENTTYPES.ROWACTION)["aria-labelledby"]||[];var d=[r+"-rownumberofrows",r+"-colnumberofcols"].concat(s);var f=[];var E=o.isGroupHeader();if(E){d.push(r+"-ariarowgrouplabel");d.push(r+(o.isExpanded()?"-rowcollapsetext":"-rowexpandtext"))}if(o.isTotalSummary()){d.push(r+"-ariagrandtotallabel")}else if(o.isGroupSummary()){d.push(r+"-ariagrouptotallabel")}if(a.hasRowHighlights(t)&&!o.isGroupHeader()&&!o.isSummary()){d.push(l+"-highlighttext")}var g="";if(!n){var T=o.getRowAction();if(T){var p=T.getAccessibilityInfo();if(p){d.push(r+"-cellacc");g=p.description;if(a.getInteractiveElements(i)!==null){f.push(r+"-toggleedit")}}}}u.performCellModifications(this,i,s,[],d,f,g,function(e,t,a){if(E&&a){var i=e.indexOf(r+"-ariarowgrouplabel")+1;e.splice(i,0,l+"-groupHeader")}})},getAriaAttributesFor:function(e,t,r){var i={},o=e.getTable(),n=o.getId();function s(e,t,r,o){var l="";if(r&&o){l="overlay,nodata"}else if(r&&!o){l="overlay"}else if(!r&&o){l="nodata"}var n=false;if(r&&e.getShowOverlay()||o&&a.isNoDataVisible(e)){n=true}if(n){i["aria-hidden"]="true"}if(l){i["data-sap-ui-table-acc-covered"]=l}}switch(t){case c.ELEMENTTYPES.COLUMNROWHEADER:var d=o._getSelectionPlugin().getRenderConfig();if(d.headerSelector.visible){if(d.headerSelector.type==="toggle"){i["role"]=["checkbox"];if(r&&r.enabled){i["aria-checked"]=r.checked?"true":"false"}}else if(d.headerSelector.type==="clear"){i["role"]=["button"];if(!r||!r.enabled){i["aria-disabled"]="true"}}}break;case c.ELEMENTTYPES.ROWHEADER:i["role"]="gridcell";i["aria-colindex"]=1;if(a.hasRowHeader(o)&&o._getSelectionPlugin()._getSelectionMode()===l.None){i["aria-labelledby"]=[n+"-rowselecthdr"]}break;case c.ELEMENTTYPES.ROWACTION:i["role"]="gridcell";i["aria-colindex"]=a.getVisibleColumnCount(o)+1+(a.hasRowHeader(o)?1:0);i["aria-labelledby"]=[n+"-rowacthdr"];break;case c.ELEMENTTYPES.COLUMNHEADER:var f=r&&r.column;var E=r&&r.colspan;i["role"]="columnheader";i["aria-colindex"]=r.index+1+(a.hasRowHeader(o)?1:0);var g=[];if(r&&r.headerId){var T=u.getRelevantColumnHeaders(o,f);var p=T.indexOf(r.headerId);g=p>0?T.slice(0,p+1):[r.headerId]}for(var b=0;b<g.length;b++){g[b]=g[b]+"-inner"}i["aria-labelledby"]=g;if(r&&r.index<o.getComputedFixedColumnCount()){i["aria-labelledby"].push(n+"-ariafixedcolumn")}if(!E&&f&&f.getSorted()){i["aria-sort"]=f.getSortOrder()==="Ascending"?"ascending":"descending"}if(!E&&f){var R=f.getHeaderMenuInstance();if(R){i["aria-haspopup"]=R.getAriaHasPopupType().toLowerCase()}else if(f._menuHasItems()){i["aria-haspopup"]="menu"}}break;case c.ELEMENTTYPES.DATACELL:i["role"]="gridcell";i["aria-colindex"]=r.index+1+(a.hasRowHeader(o)?1:0);if(r.column){var g=u.getRelevantColumnHeaders(o,r.column);for(var b=0;b<g.length;b++){g[b]=g[b]+"-inner"}if(r&&r.fixed){g.push(n+"-ariafixedcolumn")}i["aria-labelledby"]=g}break;case c.ELEMENTTYPES.ROOT:break;case c.ELEMENTTYPES.TABLE:i["role"]="presentation";s(o,i,true,true);break;case c.ELEMENTTYPES.CONTAINER:break;case c.ELEMENTTYPES.CONTENT:i["role"]=a.Grouping.isInGroupMode(o)||a.Grouping.isInTreeMode(o)?"treegrid":"grid";i["aria-labelledby"]=[].concat(o.getAriaLabelledBy());if(o.getTitle()){i["aria-labelledby"].push(o.getTitle().getId())}if(o.getSelectionMode()===l.MultiToggle){i["aria-multiselectable"]="true"}var C=o._getRowCounts();var h=a.hasFixedColumns(o);var A=C.fixedTop>0;var v=C.fixedBottom>0;var L=a.hasRowHeader(o);var w=a.hasRowActions(o);var m=u.getGridSize(o);i["aria-owns"]=[n+"-table"];if(h){i["aria-owns"].push(n+"-table-fixed")}if(A){i["aria-owns"].push(n+"-table-fixrow");if(h){i["aria-owns"].push(n+"-table-fixed-fixrow")}}if(v){i["aria-owns"].push(n+"-table-fixrow-bottom");if(h){i["aria-owns"].push(n+"-table-fixed-fixrow-bottom")}}if(L){i["aria-owns"].push(n+"-sapUiTableRowHdrScr")}if(w){i["aria-owns"].push(n+"-sapUiTableRowActionScr")}i["aria-rowcount"]=m.rowCount;i["aria-colcount"]=m.columnCount;if(o.isA("sap.ui.table.AnalyticalTable")){i["aria-roledescription"]=a.getResourceText("TBL_ANALYTICAL_TABLE_ROLE_DESCRIPTION")}break;case c.ELEMENTTYPES.TABLEHEADER:i["role"]="heading";i["aria-level"]="2";s(o,i,true,false);break;case c.ELEMENTTYPES.COLUMNHEADER_TBL:i["role"]="presentation";break;case c.ELEMENTTYPES.COLUMNHEADER_ROW:i["role"]="row";s(o,i,true,false);break;case c.ELEMENTTYPES.CREATIONROW_TBL:i["role"]="presentation";break;case c.ELEMENTTYPES.CREATIONROW:i["role"]="form";i["aria-labelledby"]=r.creationRow.getId()+"-label";s(o,i,true,false);break;case c.ELEMENTTYPES.ROWHEADER_COL:s(o,i,true,true);break;case c.ELEMENTTYPES.TH:i["role"]="presentation";i["scope"]="col";i["aria-hidden"]="true";break;case c.ELEMENTTYPES.TR:i["role"]="row";if(r.rowNavigated){i["aria-current"]=true}break;case c.ELEMENTTYPES.TREEICON:if(a.Grouping.isInTreeMode(o)){i={"aria-label":"",title:"",role:""};if(o.getBinding()){if(r&&r.row){if(r.row.isExpandable()){var O=a.getResourceText("TBL_COLLAPSE_EXPAND");i["title"]=O;i["aria-expanded"]=""+!!r.row.isExpanded();i["aria-hidden"]="false";i["role"]="button"}else{i["aria-label"]=a.getResourceText("TBL_LEAF");i["aria-hidden"]="true"}}}}break;case c.ELEMENTTYPES.NODATA:var _=a.getNoContentMessage(o);var g=[];i["role"]="gridcell";if(a.isA(_,"sap.ui.core.Control")){if(_.getAccessibilityReferences instanceof Function){var S=_.getAccessibilityReferences();g.push(S.title);g.push(S.description)}else{g.push(_.getId())}}else{g.push(n+"-noDataMsg")}i["aria-labelledby"]=g;s(o,i,true,false);break;case c.ELEMENTTYPES.OVERLAY:i["role"]="region";i["aria-labelledby"]=[].concat(o.getAriaLabelledBy());if(o.getTitle()){i["aria-labelledby"].push(o.getTitle().getId())}i["aria-labelledby"].push(n+"-ariainvalid");break;case c.ELEMENTTYPES.TABLEFOOTER:case c.ELEMENTTYPES.TABLESUBHEADER:s(o,i,true,false);break;case c.ELEMENTTYPES.ROWACTIONHEADER:i["aria-hidden"]="true";break;case"PRESENTATION":i["role"]="presentation";break}return i}};var c=e.extend("sap.ui.table.extensions.Accessibility",{_init:function(r,i,l){this._accMode=o.getAccessibility();this._busyCells=[];a.addDelegate(r,this);e.enrich(r,t);return"AccExtension"},_attachEvents:function(){a.Hook.register(this.getTable(),a.Hook.Keys.Table.TotalRowCountChanged,this._updateAriaRowCount,this)},_detachEvents:function(){a.Hook.deregister(this.getTable(),a.Hook.Keys.Table.TotalRowCountChanged,this._updateAriaRowCount,this)},_debug:function(){this._ExtensionHelper=u;this._ACCInfoHelper=s},destroy:function(){this.getTable().removeEventDelegate(this);this._busyCells=[];e.prototype.destroy.apply(this,arguments)},getAriaAttributesFor:function(e,t){return u.getAriaAttributesFor(this,e,t)},onfocusin:function(e){var t=this.getTable();if(!t||a.getCellInfo(e.target).cell==null){return}if(t._mTimeouts._cleanupACCExtension){clearTimeout(t._mTimeouts._cleanupACCExtension);t._mTimeouts._cleanupACCExtension=null}this.updateAccForCurrentCell("Focus")},onfocusout:function(e){var t=this.getTable();if(!t){return}t._mTimeouts._cleanupACCExtension=setTimeout(function(){var e=this.getTable();if(!e){return}this._iLastRowNumber=null;this._iLastColumnNumber=null;u.cleanupCellModifications(this);e._mTimeouts._cleanupACCExtension=null}.bind(this),100)}});c.ELEMENTTYPES={DATACELL:"DATACELL",COLUMNHEADER:"COLUMNHEADER",ROWHEADER:"ROWHEADER",ROWACTION:"ROWACTION",COLUMNROWHEADER:"COLUMNROWHEADER",ROOT:"ROOT",CONTAINER:"CONTAINER",CONTENT:"CONTENT",TABLE:"TABLE",TABLEHEADER:"TABLEHEADER",TABLEFOOTER:"TABLEFOOTER",TABLESUBHEADER:"TABLESUBHEADER",COLUMNHEADER_TBL:"COLUMNHEADER_TABLE",COLUMNHEADER_ROW:"COLUMNHEADER_ROW",CREATIONROW_TBL:"CREATIONROW_TABLE",CREATIONROW:"CREATIONROW",ROWHEADER_COL:"ROWHEADER_COL",TH:"TH",TR:"TR",TREEICON:"TREEICON",ROWACTIONHEADER:"ROWACTIONHEADER",NODATA:"NODATA",OVERLAY:"OVERLAY"};c.prototype.getAccMode=function(){return this._accMode};c.prototype._updateAriaRowIndices=function(){if(!this._accMode){return}var e=this.getTable();var t=e.getRows();var a,r;for(r=0;r<t.length;r++){a=t[r];a.getDomRefs(true).row.attr("aria-rowindex",u.getRowIndex(a))}};c.prototype._updateAriaRowCount=function(){var e=this.getTable();var t=e.$("sapUiTableGridCnt");if(t){t.attr("aria-rowcount",u.getGridSize(e).rowCount)}};c.prototype.updateAccForCurrentCell=function(e){if(!this._accMode||!this.getTable()._getItemNavigation()){return}if(e==="Focus"||e===a.RowsUpdateReason.Expand||e===a.RowsUpdateReason.Collapse){u.cleanupCellModifications(this)}var t=u.getInfoOfFocusedCell(this);var r;if(!t||!t.isOfType(n.ANY)){return}if(t.isOfType(n.DATACELL)){r=c.ELEMENTTYPES.DATACELL}else if(t.isOfType(n.COLUMNHEADER)){r=c.ELEMENTTYPES.COLUMNHEADER}else if(t.isOfType(n.ROWHEADER)){r=c.ELEMENTTYPES.ROWHEADER}else if(t.isOfType(n.ROWACTION)){r=c.ELEMENTTYPES.ROWACTION}else if(t.isOfType(n.COLUMNROWHEADER)){r=c.ELEMENTTYPES.COLUMNROWHEADER}if(!u["modifyAccOf"+r]){return}if(e!=="Focus"&&e!==a.RowsUpdateReason.Expand&&e!==a.RowsUpdateReason.Collapse){if(t.isOfType(n.ANYCONTENTCELL)){t.cell.attr("role","status");t.cell.attr("role","gridcell")}else{return}}u["modifyAccOf"+r].apply(this,[t])};c.prototype.updateAriaStateOfColumn=function(e){if(!this._accMode){return}var t=u.getAriaAttributesFor(this,c.ELEMENTTYPES.COLUMNHEADER,{headerId:e.getId(),column:e,index:this.getTable().indexOfColumn(e)});var a=u.getRelevantColumnHeaders(this.getTable(),e);for(var r=0;r<a.length;r++){var o=i(document.getElementById(a[r]));if(!o.attr("colspan")){o.attr({"aria-sort":t["aria-sort"]||null})}}};c.prototype.updateRowTooltips=function(e,t,r){if(!this._accMode){return}var i=this.getTable();var o=!e.isEmpty()&&!e.isGroupHeader()&&!e.isSummary()&&!i._getHideStandardTooltips();if(t.row){if(o&&a.isRowSelectionAllowed(i)&&!t.row.hasClass("sapUiTableRowHidden")){t.row.attr("title",r)}else{t.row.removeAttr("title")}}if(t.rowSelector){if(o&&a.isRowSelectorSelectionAllowed(i)){t.rowSelector.attr("title",r)}else{t.rowSelector.removeAttr("title")}}if(t.rowScrollPart){var l=t.rowScrollPart.add(t.rowFixedPart).add(t.rowActionPart);if(o&&a.isRowSelectionAllowed(i)){l.attr("title",r)}else{l.removeAttr("title")}}};c.prototype.updateSelectionStateOfRow=function(e){if(!this._accMode){return}var t=e.getDomRefs(true);var a="";var r="";if(!e.isEmpty()&&!e.isGroupHeader()&&!e.isSummary()){var i=this.getAriaTextsForSelectionMode(true);var o=this.getTable();var l=o._getSelectionPlugin().isIndexSelected(e.getIndex());if(t.row){t.row.add(t.row.children(".sapUiTableCell")).attr("aria-selected",l?"true":"false")}if(!l){a=i.keyboard["rowSelect"];r=i.mouse["rowSelect"]}else{a=i.keyboard["rowDeselect"];r=i.mouse["rowDeselect"]}}if(t.rowSelectorText){t.rowSelectorText.text(a)}this.updateRowTooltips(e,t,r)};c.prototype.updateAriaExpandAndLevelState=function(e){if(!this._accMode){return}var t=e.getDomRefs(true);var a=t.row.find(".sapUiTableTreeIcon");if(t.rowHeaderPart){t.rowHeaderPart.attr({"aria-haspopup":e.isGroupHeader()?"menu":null})}t.row.attr({"aria-expanded":e.isExpandable()?e.isExpanded()+"":null,"aria-level":e.getLevel()});if(a){a.attr(u.getAriaAttributesFor(this,c.ELEMENTTYPES.TREEICON,{row:e}))}};c.prototype.updateAriaStateOfRowHighlight=function(e){if(!this._accMode||!e){return}var t=e._getRow();var a=t?t.getDomRef("highlighttext"):null;if(a){a.innerText=e._getHighlightText()}};c.prototype._updateAriaStateOfNavigatedRow=function(e){if(!this._accMode||!e){return}var t=e._getRow();var a=e.getNavigated();t.getDomRefs(true).row.attr("aria-current",a?true:null)};c.prototype.updateAriaStateForOverlayAndNoData=function(){var e=this.getTable();if(!e||!e.getDomRef()||!this._accMode){return}if(e.getShowOverlay()){e.$().find("[data-sap-ui-table-acc-covered*='overlay']").attr("aria-hidden","true")}else{e.$().find("[data-sap-ui-table-acc-covered*='overlay']").removeAttr("aria-hidden");if(a.isNoDataVisible(e)){e.$().find("[data-sap-ui-table-acc-covered*='nodata']").attr("aria-hidden","true")}else{e.$().find("[data-sap-ui-table-acc-covered*='nodata']").removeAttr("aria-hidden")}}};c.prototype.getAriaTextsForSelectionMode=function(e,t){var r=this.getTable();if(!t){t=r.getSelectionMode()}var i=!r._getHideStandardTooltips();var o={mouse:{rowSelect:"",rowDeselect:""},keyboard:{rowSelect:"",rowDeselect:""}};var n=r._getSelectionPlugin().getSelectedCount();if(t===l.Single){o.mouse.rowSelect=i?a.getResourceText("TBL_ROW_SELECT"):"";o.mouse.rowDeselect=i?a.getResourceText("TBL_ROW_DESELECT"):"";o.keyboard.rowSelect=a.getResourceText("TBL_ROW_SELECT_KEY");o.keyboard.rowDeselect=a.getResourceText("TBL_ROW_DESELECT_KEY")}else if(t===l.MultiToggle){o.mouse.rowSelect=i?a.getResourceText("TBL_ROW_SELECT_MULTI_TOGGLE"):"";o.mouse.rowDeselect=i?a.getResourceText("TBL_ROW_DESELECT"):"";o.keyboard.rowSelect=a.getResourceText("TBL_ROW_SELECT_KEY");o.keyboard.rowDeselect=a.getResourceText("TBL_ROW_DESELECT_KEY");if(e===true&&n===0){o.mouse.rowSelect=i?a.getResourceText("TBL_ROW_SELECT"):""}}return o};c.prototype.setSelectAllState=function(e){var t=this.getTable();if(this._accMode&&t){t.$("selall").attr("aria-checked",e?"true":"false")}};c.prototype.addColumnHeaderLabel=function(e,t){var a=this.getTable();if(!this._accMode||!t.getAriaLabelledBy||!a){return}var r=a.getColumnHeaderVisible()?e.getId():null;if(!r){var i=e.getAggregation("label");if(i){r=i.getId()}}var o=t.getAriaLabelledBy();if(r&&o.indexOf(r)<0){t.addAriaLabelledBy(r)}};return c});