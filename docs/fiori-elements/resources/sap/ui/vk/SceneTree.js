/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/table/TreeTable","sap/ui/table/Column","sap/ui/model/json/JSONModel","sap/ui/core/Core","sap/ui/core/ResizeHandler","sap/m/Title","sap/m/SearchField","sap/m/Toolbar","sap/m/ToolbarLayoutData","sap/m/ToolbarSpacer","sap/m/Text","sap/ui/core/Icon","./Core","./ViewStateManager","./SceneTreeRenderer","./getResourceBundle"],function(e,t,i,n,a,s,r,o,h,l,d,c,u,g,p,_,f,S){"use strict";var y=t.extend("sap.ui.vk.SceneTree",{metadata:{library:"sap.ui.vk",properties:{title:{type:"string",defaultValue:S().getText("SCENETREE_TITLE")},showTitle:{type:"boolean",defaultValue:true},showSearchField:{type:"boolean",defaultValue:true},legacyVisibilityMode:{type:"boolean",defaultValue:false}},aggregations:{treeTable:{type:"sap.ui.table.TreeTable",multiple:false}},associations:{contentConnector:{type:"sap.ui.vk.ContentConnector",multiple:false},viewStateManager:{type:"sap.ui.vk.ViewStateManagerBase",multiple:false}},events:{contentChanged:{enableEventBubbling:true}}},constructor:function(e,i){t.apply(this,arguments);p.observeAssociations(this)}});var b="sap-icon://show",C="sap-icon://hide";var v=S().getText("SCENETREE_VISIBILITYSTATEVISIBLE"),w=S().getText("SCENETREE_VISIBILITYSTATEHIDDEN");y.prototype._createNodeForSceneTree=function(e,t,i){var n=i.getVisibilityState(t);return{name:e,id:t,visible:n}};y.prototype.setScene=function(e,t){this.setViewStateManager(t);this._setScene(e)};y.prototype._setScene=function(e){this._scene=e;this.refresh()};y.prototype.init=function(){if(t.prototype.init){t.prototype.init.apply(this)}var e=this;this._title=new o({width:"100%",textAlign:sap.ui.core.TextAlign.Center,text:this.getTitle()});this._searchField=new h({layoutData:new d({shrinkable:true,maxWidth:"400px"}),search:function(t){var i=t.getParameter("query"),n=e._scene.getDefaultNodeHierarchy(),a=e._viewStateManager;if(n&&a){var s=!i?[]:n.findNodesByName({value:i,predicate:"contains"});var r=new Set(s);var o=[];a.enumerateSelection(function(e){if(!r.has(e)){o.push(e)}});a.setSelectionState(o,false,false);a.setSelectionState(s,true,false)}}});this._toolbar=new l({content:[this._title,new c,this._searchField]});var s=new g({src:b,tooltip:v,width:"2em",height:"1.3em",size:"1.2em",press:function(t){var i=this.getSrc()!==b;this.setSrc(i?b:C);this.setTooltip(i?S().getText("SCENETREE_VISIBILITYSTATEVISIBLEALL"):S().getText("SCENETREE_VISIBILITYSTATEHIDDENALL"));e._toggleVisibilityForAllChildren(e._model.getData(),i)}});this._tree=new i({title:this._toolbar,columnHeaderHeight:32,columns:[new n({label:S().getText("SCENETREE_NAME"),tooltip:S().getText("SCENETREE_NAME"),template:new u({text:"{name}",maxLines:1,tooltip:"{name}"}),resizable:false}),new n(this.getId()+"-visibilityColumn",{label:s,template:new g({src:{path:"",formatter:function(e){if(!e){return null}return e.visible?b:C}},tooltip:{path:"",formatter:function(e){if(!e){return null}return e.visible?v:w}},height:"1.3em",size:"1.2em",press:function(t){var i=e._tree.getContextByIndex(this.getParent().getIndex());var n=i?i.getObject():null;if(n){e._viewStateManager.setVisibilityState(n.id,!n.visible,e.getLegacyVisibilityMode(),e.getLegacyVisibilityMode())}}}),width:"2.5em",resizable:false,hAlign:"Center"})],enableSelectAll:false,selectionMode:"MultiToggle",selectionBehavior:"RowSelector",visibleRowCountMode:"Fixed",expandFirstLevel:false,collapseRecursive:false,rowHeight:32});this.setAggregation("treeTable",this._tree);this.attachContentChanged(function(e){s.setSrc(b);s.setTooltip(v)});this._scene=null;this._syncing=false;this._updateSelectionTimer=0;this._updateVisibilityTimer=0;this._model=new a;this._tree.setModel(this._model);this._tree.bindRows({path:"/"});this._tree.attachRowSelectionChange(this._handleRowSelectionChange.bind(this));this._tree.attachFirstVisibleRowChanged(this._updateSelection.bind(this));this._tree.getBinding("rows").attachChange(this._dataChange.bind(this))};y.prototype.setTitle=function(e){this.setProperty("title",e,true);this._title.setText(e);return this};y.prototype.setShowTitle=function(e){this.setProperty("showTitle",e,true);this._title.setVisible(e);this._updateTitleBar();return this};y.prototype.setShowSearchField=function(e){this.setProperty("showSearchField",e,true);this._searchField.setVisible(e);this._updateTitleBar();return this};y.prototype._updateTitleBar=function(){this._tree.setTitle(this.getShowTitle()||this.getShowSearchField()?this._toolbar:null);this._handleResize()};y.prototype.onBeforeRendering=function(){this._tree.setVisible(true);if(!this._resizeListenerId){this._resizeListenerId=r.register(this,this._handleResize.bind(this))}};y.prototype._handleRowSelectionChange=function(e){if(this._syncing||this._tree.getBinding("rows")._aSelectedContexts!=undefined){return}var t=[];var i=[];var n=e.getParameter("rowIndices");for(var a in n){var s=n[a];var r=this._tree.getContextByIndex(s);var o=r?r.getObject().id:null;if(o){(this._tree.isIndexSelected(s)?t:i).push(o)}}if(t.length>0){this._viewStateManager.setSelectionState(t,true)}if(i.length>0){this._viewStateManager.setSelectionState(i,false)}};y.prototype._onSelectionChanged=function(e){if(this._syncing){return}function t(e,t){var i=e.getBinding("rows");if(i){for(var n=e.getFirstVisibleRow(),a=Math.min(n+e.getVisibleRowCount(),i.getLength());n<a;n++){var s=i.getContextByIndex(n);if(s&&s.getObject().id===t){return true}}}return false}var i=e.getParameter("selected");if(i.length===1&&!t(this._tree,i[0])){if(this._updateSelectionTimer>0){clearTimeout(this._updateSelectionTimer);this._updateSelectionTimer=0}this._expandToNode(i[0],this._updateSelection.bind(this))}else if(this._updateSelectionTimer===0){this._updateSelectionTimer=setTimeout(this._updateSelection.bind(this),0)}};y.prototype._updateSelection=function(){this._updateSelectionTimer=0;if(this._syncing){return}this._syncing=true;var e=this._viewStateManager,t=this._tree,i=t.getBinding("rows");if(e&&i){for(var n=t.getFirstVisibleRow(),a=Math.min(n+t.getVisibleRowCount(),i.getLength());n<a;n++){var s=i.getContextByIndex(n);if(s){var r=s.getObject().id;if(r){var o=e.getSelectionState(r);if(o!=t.isIndexSelected(n)){t[o?"addSelectionInterval":"removeSelectionInterval"](n,n)}}}}}this._syncing=false};y.prototype._expandToNode=function(e,t){var i={tree:this._tree,rows:this._tree.getBinding("rows"),index:0,nodeRef:e,ancestors:new Set(this._scene.getDefaultNodeHierarchy().getAncestors(e)),callback:t};function n(e,t,i){var n=e.getFirstVisibleRow(),a=e.getVisibleRowCount();if(t<n||t>=n+a){n=Math.min(Math.max(t-(a>>1),0),i-a);setTimeout(function(){e.setFirstVisibleRow(n)},0)}}function a(e,t){if(t&&t.getParameter("reason")!=="expand"){return}var i=e.rows.getLength();while(e.index<i){var a=e.rows.getContextByIndex(e.index);if(!a){break}var s=a.getObject().id;if(s===e.nodeRef){n(e.tree,e.index,i);break}if(e.ancestors.has(s)&&!e.tree.isExpanded(e.index)){e.tree.expand(e.index++);return}e.index++}e.rows.detachChange(e.expandHandlerProxy);e.callback()}i.expandHandlerProxy=a.bind(this,i);i.rows.attachChange(i.expandHandlerProxy);a(i)};y.prototype._dataChange=function(e){var t=e.getParameter("reason");if((t==="expand"||t==="collapse")&&this._updateSelectionTimer===0){this._updateSelectionTimer=setTimeout(this._updateSelection.bind(this),0)}};y.prototype._toggleVisibilityForAllChildren=function(e,t){var i=e.hasOwnProperty("children")?e.children:e;for(var n=0;i[n]!=null;n++){this._viewStateManager.setVisibilityState(i[n].id,t,true)}};y.prototype._onVisibilityChanged=function(e){if(this._updateVisibilityTimer===0){this._updateVisibilityTimer=setTimeout(this._updateVisibility.bind(this),0)}};y.prototype._updateVisibility=function(){this._updateVisibilityTimer=0;this._getNodeVisibilityRecursive(this._model.getData());this._tree.getModel().refresh(true)};y.prototype._getNodeVisibilityRecursive=function(e){if(e.id!=null){e.visible=this._viewStateManager.getVisibilityState(e.id)}var t=e.hasOwnProperty("children")?e.children:e;for(var i=0;t[i]!=null;i++){this._getNodeVisibilityRecursive(t[i])}};y.prototype._handleResize=function(e){var t=e?e.size.height:this.getDomRef().clientHeight;var i=this._tree.getTitle()?2.1:1.1;this._tree.setVisibleRowCount(Math.max(Math.floor(t/(this._tree.getRowHeight()+1)-i),0));this._updateSelection()};y.prototype.refresh=function(){if(!this._scene||!this._viewStateManager||!this._viewStateManager.getNodeHierarchy()){this._model.setData([]);return}var e=this._scene.getDefaultNodeHierarchy();var t=[];var i=function(t,n){n.forEach(function(n){if(n.userData&&n.userData.skipIt){i(t,e.getChildren(n))}else{var a=e.createNodeProxy(n);var s=this._createNodeForSceneTree(a.getName(),a.getNodeRef(),this._viewStateManager);t.push(s);e.destroyNodeProxy(a);s.children=[];i(s.children,e.getChildren(n))}}.bind(this))}.bind(this);i(t,e.getChildren());this._model.setData(t);this._tree.setModel(this._model);this._tree.bindRows({path:"/",parameters:{arrayNames:["children"]}});this._tree.getBinding("rows").attachChange(this._dataChange.bind(this));this.fireContentChanged()};y.prototype.onSetViewStateManager=function(e){this._viewStateManager=e;e.attachNodeHierarchyReplaced(this._onNodeHierarchyReplaced,this);e.attachSelectionChanged(this._onSelectionChanged,this);e.attachVisibilityChanged(this._onVisibilityChanged,this);this.refresh()};y.prototype.onUnsetViewStateManager=function(e){this._viewStateManager=null;e.detachVisibilityChanged(this._onVisibilityChanged,this);e.detachSelectionChanged(this._onSelectionChanged,this);e.detachNodeHierarchyReplaced(this._onNodeHierarchyReplaced,this);this.refresh()};y.prototype._onNodeHierarchyReplaced=function(e){this.refresh()};y.prototype._setContent=function(e){if(e&&!this.getViewStateManager()){var t=s.byId(this.getContentConnector());if(t){var i=t.getDefaultViewStateManager();if(i){this.setViewStateManager(i)}}}this._setScene(e);return this};y.prototype.onSetContentConnector=function(e){e.attachContentReplaced(this._onContentReplaced,this);e.attachContentChangesFinished(this._onContentChangesFinished,this);this._setContent(e.getContent())};y.prototype.onUnsetContentConnector=function(e){this._setContent(null);e.detachContentChangesFinished(this._onContentChangesFinished,this);e.detachContentReplaced(this._onContentReplaced,this)};y.prototype._onContentReplaced=function(e){this._setContent(e.getParameter("newContent"))};y.prototype._onContentChangesFinished=function(e){this.refresh()};return y});