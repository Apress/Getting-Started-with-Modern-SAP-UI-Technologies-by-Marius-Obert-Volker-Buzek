/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/Icon","sap/ui/core/Popup","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ScrollEnablement","sap/ui/core/delegate/ItemNavigation","sap/ui/dom/containsOrEquals","sap/m/Title","sap/m/Button","sap/m/Menu","sap/m/MenuItem","sap/ui/core/InvisibleMessage","./SidePanelItem","./SidePanelRenderer","sap/ui/core/library","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes"],function(e,t,i,n,s,o,a,r,l,h,d,p,u,c,f,g,_,S,m,y){"use strict";var v=sap.ui.getCore().getLibraryResourceBundle("sap.f"),I=_.InvisibleMessageMode;var P=0,E=1,b=2;var w=560;var A=t.extend("sap.f.SidePanel",{metadata:{library:"sap.f",properties:{actionBarExpanded:{type:"boolean",group:"Appearance",defaultValue:false},ariaLabel:{type:"string",group:"Accessibility",defaultValue:"Side Panel"},sidePanelResizable:{type:"boolean",group:"Appearance",defaultValue:false},sidePanelWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"20rem"},sidePanelMinWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"15rem"},sidePanelMaxWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"90%"},sidePanelResizeStep:{type:"int",group:"Appearance",defaultValue:10},sidePanelResizeLargerStep:{type:"int",group:"Appearance",defaultValue:100},sideContentExpanded:{type:"boolean",group:"Appearance",defaultValue:false,visibility:"hidden"}},aggregations:{mainContent:{type:"sap.ui.core.Control",multiple:true},items:{type:"sap.f.SidePanelItem",multiple:true,singularName:"item"},_arrowButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_overflowItem:{type:"sap.f.SidePanelItem",multiple:false,visibility:"hidden"},_overflowMenu:{type:"sap.m.Menu",multiple:false,visibility:"hidden"},_contextMenu:{type:"sap.m.Menu",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.f.SidePanelItem",multiple:false}},events:{toggle:{allowPreventDefault:true,parameters:{item:{type:"sap.f.SidePanelItem"},expanded:{type:"boolean"}}}}},renderer:g});A.prototype.init=function(){this.setAggregation("_arrowButton",new d(this.getId()+"-expandCollapseButton",{type:"Transparent",press:this._toggleActionBarExpanded.bind(this)}).addStyleClass("sapFSPExpandCollapse"));this.setAggregation("_overflowItem",new f({icon:"sap-icon://overflow",text:v.getText("SIDEPANEL_MORE_ACTIONS_TEXT")}));if(!e.system.phone){var t=new p({itemSelected:function(e){var t=e.getParameter("item");if(this._mOverflowItemsMap[t.getId()]){this._toggleItemSelection(this._mOverflowItemsMap[t.getId()])}}.bind(this),closed:function(){setTimeout(function(){this._setOverflowItemSelection(false)}.bind(this),100)}.bind(this)}).addStyleClass("sapFSPOverflowMenu");this.setAggregation("_overflowMenu",t)}this._fnOnResizeRef=this._onResize.bind(this);this._fnOnMainScroll=this._handleScroll.bind(this);this._fnOnMainFocusOut=this._onMainFocusOut.bind(this);this._fnOnTouchStart=this._onTouchStart.bind(this);this._fnOnTouchEnd=this._onTouchEnd.bind(this);this._fnOnTouchMove=this._onTouchMove.bind(this);this._fnOnDblClick=this._onDblClick.bind(this);this._iLastScrollPosition=0;this._iSidePanelPosition=E;this._bShouldAttachGlobalHandlers=true;this._iVisibleItems=0;this._bOverflowMenuOpened=false;this._mOverflowItemsMap={};this._oItemNavigation=null};A.prototype.exit=function(){this._detachResizeHandlers();this._detachScrollHandler();this._detachMainFocusOutHandler();this._detachResizableHandlers()};A.prototype.setSidePanelWidth=function(e){this.setProperty("sidePanelWidth",e);if(this.getDomRef()){this._sSidePanelWidth=this._getSidePanelWidth()}return this};A.prototype.setSelectedItem=function(e){var t=this.getSelectedItem(),n,s;if(typeof e==="string"){n=e;s=i.byId(e)}else if(e&&e.isA("sap.f.SidePanelItem")){n=e.getId();s=e}if(!n){t&&this._toggleItemSelection(i.byId(t))}else if(s&&s.getEnabled()&&n!==t&&n!==this.getAggregation("_overflowItem").getId()){this._toggleItemSelection(s);this.setAssociation("selectedItem",s,true)}return this};A.prototype.onBeforeRendering=function(){var e=this.getAggregation("_arrowButton"),t=this.getActionBarExpanded(),i=t?v.getText("SIDEPANEL_COLLAPSE_BUTTON_TEXT"):v.getText("SIDEPANEL_EXPAND_BUTTON_TEXT"),n=t?"right":"left";e.setIcon("sap-icon://navigation-"+n+"-arrow");e.setTooltip(i);this._detachResizeHandlers();this._attachResizeHandlers();this._detachScrollHandler();this._detachMainFocusOutHandler();this._detachResizableHandlers();this._oInvisibleMessage=c.getInstance()};A.prototype.onAfterRendering=function(){var t=this._isSingleItem()&&this.getActionBarExpanded()?this.getAggregation("_closeButton"):this.getAggregation("_arrowButton"),i;if(!e.system.phone){i=t.getDomRef();i&&i.setAttribute("aria-expanded",this.getActionBarExpanded()?"true":"false")}!this._getSideContentExpanded()&&this._attachScrollHandler();this._attachMainFocusOutHandler();this._attachResizableHandlers();if(!e.system.phone){if(!this._isSingleItem()&&this._iVisibleItems>0){this._initItemNavigation()}if(this._getSideContentExpanded()){this.getItems().length&&this._fixSidePanelWidth()}}else{if(this.getDomRef().querySelector(".sapFSPMain").scrollTop===0){this.setActionBarExpanded(true)}}if(!this._sSidePanelWidth){this._sSidePanelWidth=this._getSidePanelWidth()}};A.prototype.oncontextmenu=function(e){var t=document.activeElement===this.getDomRef().querySelector(".sapFSPSplitterBar");if(t||e.target.closest(".sapFSPSide.sapFSPResizable")){e.preventDefault();if(t){this._bContextMenuFromSplitter=true}this._showResizeContextMenu(e)}};A.prototype.onkeydown=function(e){var t=e.target,n=this.getDomRef().querySelector(".sapFSPActionBarList"),s=this._getSideContentExpanded(),o=this.getActionBarExpanded()||s,a=e.ctrlKey||e.metaKey,r=document.activeElement===this.getDomRef().querySelector(".sapFSPSplitterBar");if(a&&e.which===y.ARROW_LEFT){e.preventDefault();if(s){this._focusSideContent()}}else if(a&&e.which===y.ARROW_RIGHT&&s){if(s){this._contentControlToFocus=i.getCurrentFocusedControlId()}this._oItemNavigation.getFocusedDomRef().focus()}else if(a&&e.shiftKey&&e.which===y.P){e.preventDefault();this._toggleActionBarExpanded();if(!o){this._oItemNavigation.getFocusedDomRef().focus()}else{s&&this.setActionBarExpanded(false);this._closeSideContent();this._focusMain()}}else if(e.which===y.ESCAPE){e.preventDefault();this.setActionBarExpanded(false);this._closeSideContent();this._focusMain()}else if(r){switch(e.which){case y.ENTER:this._setSidePanelResizePosition(E);break;case y.END:this._setSidePanelResizePosition(b);break;case y.HOME:this._setSidePanelResizePosition(P);break;case y.ARROW_LEFT:this._moveSidePanelResizePositionWith(e.shiftKey?this.getSidePanelResizeLargerStep():this.getSidePanelResizeStep());break;case y.ARROW_RIGHT:this._moveSidePanelResizePositionWith(e.shiftKey?-this.getSidePanelResizeLargerStep():-this.getSidePanelResizeStep());break;case y.F10:if(e.shiftKey){e.preventDefault();this._bContextMenuFromSplitter=true;this._showResizeContextMenu(e)}break}}if(!l(n,t)||t===n){return}switch(e.which){case y.ENTER:e.preventDefault();this._toggleItemSelection(e.srcControl);break;case y.SPACE:e.preventDefault();break}};A.prototype.onkeyup=function(e){var t=e.target,i=this.getDomRef().querySelector(".sapFSPActionBarList");if(!l(i,t)||t===i){return}if(e.which===y.SPACE){this._toggleItemSelection(e.srcControl)}};A.prototype.ontap=function(e){var t,n=e.target,s=this.getDomRef().querySelector(".sapFSPActionBarList");if(!l(s,n)||n===s){return}t=n;while(t.tagName!=="LI"){t=t.parentElement}if(!t){return}this._toggleItemSelection(i.byId(t.id))};A.prototype.onsapskipforward=function(e){e.preventDefault();this._handleGroupNavigation(e,false)};A.prototype.onsapskipback=function(e){this._handleGroupNavigation(e,true)};A.prototype._getContextMenu=function(){var e=this.getAggregation("_contextMenu");if(!e){e=new p({items:[new u({text:v.getText("SIDEPANEL_CONTEXTMENU_MAXIMUM_WIDTH"),press:function(){this._setSidePanelResizePosition(b)}.bind(this)}),new u({text:v.getText("SIDEPANEL_CONTEXTMENU_MINIMUM_WIDTH"),press:function(){this._setSidePanelResizePosition(P)}.bind(this)}),new u({text:v.getText("SIDEPANEL_CONTEXTMENU_DEFAULT_WIDTH"),press:function(){this._setSidePanelResizePosition(E)}.bind(this)})],closed:function(e){if(this._bContextMenuFromSplitter){this._bContextMenuFromSplitter=false;this.getDomRef().querySelector(".sapFSPSplitterBar").focus()}}.bind(this)});this.setAggregation("_contextMenu",e)}return e};A.prototype._getSideContentExpanded=function(){return this.getProperty("sideContentExpanded")};A.prototype._setSideContentExpanded=function(e){return this.setProperty("sideContentExpanded",e)};A.prototype._getFocusDomRef=function(e){return e.getDomRef()};A.prototype._focusMain=function(){this._oPreviousFocusedMainElement&&this._oPreviousFocusedMainElement.focus()};A.prototype._focusSideContent=function(){var e=this._contentControlToFocus?i.byId(this._contentControlToFocus):this.getAggregation("_closeButton");e&&e.focus()};A.prototype._closeSideContent=function(){var e=i.byId(this.getSelectedItem()),t=true;if(e){t=this._fireToggle({item:e,expanded:false})}if(t){this._setSideContentExpanded(false);this.setAssociation("selectedItem",null);if(this._isSingleItem()){setTimeout(function(){var e=this.getAggregation("_arrowButton");e&&e.focus()}.bind(this),0)}}};A.prototype._toggleActionBarExpanded=function(){var e;if(this._isSingleItem()){e=!this.getActionBarExpanded()?this.getItems()[0]:null;if(e){var t=this._fireToggle({item:e,expanded:!!e});if(!t){return}}this.setAssociation("selectedItem",e);this._setSideContentExpanded(!!e);setTimeout(function(){var e=this.getAggregation("_closeButton");e&&e.focus()}.bind(this),0)}else{this.setActionBarExpanded(!this.getActionBarExpanded())}};A.prototype._fireToggle=function(e){this._contentControlToFocus=undefined;return this.fireToggle(e)};A.prototype._initItemNavigation=function(){var e=this.getItems(),t=[],i=e.length>this._iVisibleItems,n=i?this._iVisibleItems-1:e.length,s=this.getAggregation("_overflowItem"),o=this.getAggregation("_overflowMenu"),a,l,h;if(!e.length||!this._iVisibleItems){return}else{l=e[0].getDomRef().parentElement;o.destroyItems();this._mOverflowItemsMap={}}e.forEach(function(e,i){if(i<n){if(e.getEnabled()){a=this._getFocusDomRef(e);a.setAttribute("tabindex","-1");t.push(a)}e.$().css("display","flex")}else{e.$().css("display","none");h=new u({text:e.getText(),icon:e.getIcon(),enabled:e.getEnabled()});o.addItem(h);this._mOverflowItemsMap[h.getId()]=e}}.bind(this));if(i){s.$().css("visibility","visible");a=this._getFocusDomRef(s);a.setAttribute("tabindex","-1");t.push(a)}else{s.$().css("visibility","hidden")}if(!this._oItemNavigation){this._oItemNavigation=(new r).setCycling(false).attachEvent(r.Events.AfterFocus,this._onItemNavigationAfterFocus,this).setDisabledModifiers({sapnext:["alt","meta","ctrl"],sapprevious:["alt","meta","ctrl"]});this.addDelegate(this._oItemNavigation);this._bAnnounceSelected=true}this._oItemNavigation.setRootDomRef(l).setItemDomRefs(t).setPageSize(n);if(this._oItemNavigation.getFocusedIndex()===-1){this._oItemNavigation.setFocusedIndex(0)}};A.prototype._onItemNavigationAfterFocus=function(e){var t=this.getSelectedItem();if(t===this._oItemNavigation.getFocusedDomRef().id&&this._bAnnounceSelected){this._oInvisibleMessage.announce(v.getText("SIDEPANEL_NAV_ITEM_SELECTED"),I.Polite)}this._bAnnounceSelected=true};A.prototype._attachResizeHandlers=function(){this._iResizeHandlerId=o.register(this,this._fnOnResizeRef)};A.prototype._detachResizeHandlers=function(){if(this._iResizeHandlerId){o.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};A.prototype._onResize=function(t){if(!this.getItems().length){return}var i=t.size.width,n=this._isSingleItem(),s=this.getDomRef(),o=window.getComputedStyle(s.querySelector(".sapFSPActionBarList")),a=parseInt(o.gap),r=parseInt(o.marginBottom),l=parseInt(o.marginTop),h=s.querySelector(".sapFSPOverflowItem"),d=h&&h.clientHeight,p;this._iPreviousWidth=i;if(e.system.phone){return}if(!n){p=s.querySelector(".sapFSPSideInner").clientHeight-r-l;this._iVisibleItems=parseInt((p+a)/(d+a));this._initItemNavigation()}if(this._getSideContentExpanded()){this._fixSidePanelWidth()}};A.prototype._fixSidePanelWidth=function(){var e=this.getDomRef(),t=e.querySelector(".sapFSPSide"),i=this._getControlWidth(),n=parseInt(window.getComputedStyle(t).width),s=i<n;t.style.width=s?i+"px":this._getSidePanelWidth();t.style.minWidth=s?i+"px":this._getSidePanelMinWidth();t.style.maxWidth=this._getSidePanelMaxWidth();this._updateSplitViewClass(t);this.getSidePanelResizable()&&this._updateAriaValues()};A.prototype._updateSplitViewClass=function(e){var t=parseInt(window.getComputedStyle(e).width);if(t>w){e.classList.add("sapFSPSplitView")}else{e.classList.contains("sapFSPSplitView")&&this.setActionBarExpanded(false);e.classList.remove("sapFSPSplitView")}};A.prototype._updateAriaValues=function(){var e=this.getDomRef(),t=e.querySelector(".sapFSPSplitterBar"),i=this._getControlWidth(),n=parseInt(window.getComputedStyle(e.querySelector(".sapFSPSide")).width);t.setAttribute("aria-valuenow",Math.round(n/i*100));t.setAttribute("aria-valuemin",Math.round(parseInt(window.getComputedStyle(e.querySelector(".sapFSPMinWidth")).width)/i*100));t.setAttribute("aria-valuemax",Math.round(parseInt(window.getComputedStyle(e.querySelector(".sapFSPMaxWidth")).width)/i*100))};A.prototype._setOverflowItemSelection=function(e){var t=this.getAggregation("_overflowItem"),i;if(!t||!t.getDomRef()){return}this._bOverflowMenuOpened=e;i=this._getOverflowItemText();t.setText(i,false);t.$().find(".sapFSPItemText").text(i)};A.prototype._getAriaLabelText=function(){var e=this.getAriaLabel();return e?e:v.getText("SIDEPANEL_DEFAULT_ARIA_LABEL")};A.prototype._getOverflowItemText=function(){return this._bOverflowMenuOpened?v.getText("SIDEPANEL_SHOW_LESS_TEXT"):v.getText("SIDEPANEL_MORE_ACTIONS_TEXT")};A.prototype._getSideContentAriaLabel=function(){return v.getText("SIDEPANEL_CONTENT_ARIA_LABEL")};A.prototype._getSplitterTitle=function(){return v.getText("SIDEPANEL_RESIZE_SPLITTER_TITLE")};A.prototype._toggleItemSelection=function(t){var n,s=this.getSelectedItem(),o=t.getDomRef(),a=t.getId()!==s,r,l=true;if(o&&o.classList.contains("sapFSPOverflowItem")){this._toggleOverflowMenu(o);return}if(!t.getEnabled()){return}if(s&&(!r||a)){l=this._fireToggle({item:a?i.byId(s):t,expanded:false})}if(!l){return}n=a?t:null;r=!!n;this.setAssociation("selectedItem",n);if(n){this._bAnnounceSelected=false;l=this._fireToggle({item:n,expanded:true});if(!l){this._setSideContentExpanded(false);return}}!e.system.phone&&this.getActionBarExpanded()&&this.setActionBarExpanded(false);this._setSideContentExpanded(r)};A.prototype._toggleOverflowMenu=function(e){var t=this.getAggregation("_overflowMenu"),i={onkeydown:this._overflowMenuOnkeydown.bind(this)};if(!e){if(this._bOverflowMenuOpened){this._bOverflowMenuOpened=false}return}if(this._bOverflowMenuOpened){this._setOverflowItemSelection(false);t.close()}else{this._setOverflowItemSelection(true);setTimeout(function(){var n=!t.getAggregation("_menu");t.openBy(e,false,s.Dock.BeginBottom,s.Dock.EndBottom,"3 0");t._getMenu().getPopup().setExtraContent([this.getAggregation("_overflowItem")]);n&&t.getAggregation("_menu").addEventDelegate(i)}.bind(this),0)}};A.prototype._overflowMenuOnkeydown=function(e){var t=this.getAggregation("_overflowItem");e.preventDefault();if(e.which===y.ARROW_RIGHT){this._closeOverflowMenu();t&&t.focus()}else if(e.which===y.ARROW_LEFT&&!(e.ctrlKey||e.metaKey)){this._closeOverflowMenu();this.setActionBarExpanded(false);this._focusMain()}};A.prototype._getSelectedItem=function(){return i.byId(this.getSelectedItem())};A.prototype._getSideContentHeaderTitle=function(){var e=this._getSelectedItem();if(!this._contentHeaderTitle){this._contentHeaderTitle=new h}e&&this._contentHeaderTitle.setText(e.getText())&&this._contentHeaderTitle.setTooltip(e.getText());return this._contentHeaderTitle};A.prototype._getSideContentHeaderIcon=function(){var e=this._getSelectedItem();if(!this._contentHeaderIcon){this._contentHeaderIcon=new n}e&&this._contentHeaderIcon.setSrc(e.getIcon());return this._contentHeaderIcon};A.prototype._getSideContentHeaderCloseBtn=function(){var t,i=this.getAggregation("_closeButton");if(!i){if(this._isSingleItem()){t=e.system.phone?"sap-icon://navigation-down-arrow":"sap-icon://navigation-right-arrow"}else{t="sap-icon://decline"}i=new d(this.getId()+"-closeButton",{type:"Transparent",tooltip:v.getText("SIDEPANEL_CLOSE_BUTTON_TEXT"),icon:t,press:function(){var e=this._getSelectedItem(),t=this.getAggregation("_overflowItem");this._bAnnounceSelected=false;if(!this._isSingleItem()){if(this.getDomRef().querySelector("#"+e.getId()).style.display==="none"){t&&t.focus()}else{e&&e.focus()}}this._closeSideContent()}.bind(this)});this.setAggregation("_closeButton",i)}return i};A.prototype._attachScrollHandler=function(){if(!e.system.phone||!this.getDomRef()){return}this.getDomRef().querySelector(".sapFSPMain").addEventListener("scroll",this._fnOnMainScroll)};A.prototype._detachScrollHandler=function(){if(!e.system.phone||!this.getDomRef()){return}this.getDomRef().querySelector(".sapFSPMain").removeEventListener("scroll",this._fnOnMainScroll)};A.prototype._closeOverflowMenu=function(){if(this._bOverflowMenuOpened){this._setOverflowItemSelection(false);this.getAggregation("_overflowMenu").close()}};A.prototype._attachMainFocusOutHandler=function(){if(!e.system.phone){var t=this.getDomRef();t&&t.querySelector(".sapFSPMain").addEventListener("focusout",this._fnOnMainFocusOut,false)}};A.prototype._detachMainFocusOutHandler=function(){if(!e.system.phone){var t=this.getDomRef();t&&t.querySelector(".sapFSPMain").removeEventListener("focusout",this._fnOnMainFocusOut,false)}};A.prototype._onMainFocusOut=function(e){this._oPreviousFocusedMainElement=e.target};A.prototype._handleScroll=function(e){var t,i,n;if(!this.bScrolling){this.bScrolling=true;t=parseInt(e.target.scrollTop);setTimeout(function(){i=t>this._iLastScrollPosition;n=t<this._iLastScrollPosition;this.setActionBarExpanded(!i||n);this._iLastScrollPosition=t;this.bScrolling=false}.bind(this),100)}};A.prototype._handleGroupNavigation=function(e,t){var i=new m.Event("keydown");this.$().trigger("focus");i.target=e.target;i.key="F6";i.shiftKey=t;S.handleF6GroupNavigation(i)};A.prototype._isSingleItem=function(){return this.getItems().length===1};A.prototype._calculatePixelWidth=function(e){if(typeof e==="string"){e=e.replace(/\s/g,"");if(e.slice(-1)==="%"){e=parseInt(this._getControlWidth()*parseFloat(e)/100)+"px"}}else{e=e.toString()+"px"}return e};A.prototype._getControlWidth=function(){return parseInt(window.getComputedStyle(this.getDomRef()).width)};A.prototype._getSidePanelWidth=function(){return this._calculatePixelWidth(this.getSidePanelWidth())};A.prototype._getSidePanelMinWidth=function(){return this._calculatePixelWidth(this.getSidePanelMinWidth())};A.prototype._getSidePanelMaxWidth=function(){return this._calculatePixelWidth(this.getSidePanelMaxWidth())};A.prototype._isResizable=function(){return this.getSidePanelResizable()&&!e.system.phone&&(this.getActionBarExpanded()||this._getSideContentExpanded())};A.prototype._attachResizableHandlers=function(){var t=this.getDomRef(),i=t&&t.querySelector(".sapFSPSplitterBar");if(!i){return}if(e.system.combi||e.system.phone||e.system.tablet){i.addEventListener("touchstart",this._fnOnTouchStart);i.addEventListener("touchend",this._fnOnTouchEnd);i.addEventListener("touchmove",this._fnOnTouchMove)}if(e.system.desktop||e.system.combi){i.addEventListener("dblclick",this._fnOnDblClick);i.addEventListener("mousedown",this._fnOnTouchStart);t.addEventListener("mouseup",this._fnOnTouchEnd);t.addEventListener("mousemove",this._fnOnTouchMove)}};A.prototype._detachResizableHandlers=function(){var t=this.getDomRef(),i=t&&t.querySelector(".sapFSPSplitterBar");if(!i){return}if(e.system.combi||e.system.phone||e.system.tablet){i.removeEventListener("touchstart",this._fnOnTouchStart);i.removeEventListener("touchend",this._fnOnTouchEnd);i.removeEventListener("touchmove",this._fnOnTouchMove)}if(e.system.desktop||e.system.combi){i.removeEventListener("dblclick",this._fnOnDblClick);i.removeEventListener("mousedown",this._fnOnTouchStart);t.removeEventListener("mouseup",this._fnOnTouchEnd);t.removeEventListener("mousemove",this._fnOnTouchMove)}};A.prototype._onTouchStart=function(e){e.preventDefault();if(e.button===0||e.type==="touchstart"){this.getDomRef().querySelector(".sapFSPSplitterBar").classList.add("sapFSPSplitterActive");this._bResizeStarted=true;this._iStartPositionX=e.touches?e.touches[0].pageX:e.pageX}};A.prototype._onTouchEnd=function(e){var t=this.getDomRef(),i=t&&t.querySelector(".sapFSPSplitterBar");this._bResizeStarted&&e.preventDefault();this._bResizeStarted=false;i&&i.classList.remove("sapFSPSplitterActive")};A.prototype._onTouchMove=function(e){if(!this._bResizeStarted){return}var t=e.touches?e.touches[0].pageX:e.pageX,i=this._iStartPositionX-t,n=this.getDomRef().querySelector(".sapFSPSide"),s=parseInt(window.getComputedStyle(n)["width"]);e.preventDefault();if(s){s+=i;this.setProperty("sidePanelWidth",s+"px",true);n.style.width=s+"px";this._iStartPositionX=t;this._updateSplitViewClass(n);this._updateAriaValues()}};A.prototype._onDblClick=function(e){e.preventDefault();this._iSidePanelPosition++;if(this._iSidePanelPosition>b){this._iSidePanelPosition=P}this._setSidePanelResizePosition(this._iSidePanelPosition)};A.prototype._setSidePanelResizePosition=function(e){var t=[this._getSidePanelMinWidth(),this._sSidePanelWidth,this._getSidePanelMaxWidth()];this.setProperty("sidePanelWidth",t[e],true);this._fixSidePanelWidth()};A.prototype._moveSidePanelResizePositionWith=function(e){var t=this.getDomRef().querySelector(".sapFSPSide"),i=parseInt(window.getComputedStyle(t)["width"]);if(e&&i){i+=e;this.setProperty("sidePanelWidth",i+"px",true);t.style.width=i+"px";this._updateAriaValues()}};A.prototype._showResizeContextMenu=function(e){var t=this._getContextMenu();this._bResizeStarted=false;this._bContextMenuFromSplitter&&t.openBy(this.getDomRef().querySelector(".sapFSPSplitterBarGrip"))||t.openAsContextMenu(e,this)};return A});