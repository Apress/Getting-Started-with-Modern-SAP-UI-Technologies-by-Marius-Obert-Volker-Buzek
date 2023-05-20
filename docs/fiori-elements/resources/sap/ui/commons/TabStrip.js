/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/core/Icon","sap/ui/core/delegate/ScrollEnablement","sap/ui/Device","./TabStripRenderer","sap/ui/core/ResizeHandler","sap/ui/core/Title","./Tab","sap/ui/events/KeyCodes","sap/ui/core/Configuration","sap/ui/dom/jquery/parentByAttribute","sap/ui/dom/jquery/zIndex","sap/ui/thirdparty/jqueryui/jquery-ui-position"],function(e,t,i,s,r,a,o,n,l,h,f,p,d,g){"use strict";var c=s.extend("sap.ui.commons.TabStrip",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},selectedIndex:{type:"int",group:"Misc",defaultValue:0},enableTabReordering:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"tabs",aggregations:{tabs:{type:"sap.ui.commons.Tab",multiple:true,singularName:"tab"},_leftArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_rightArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{select:{parameters:{index:{type:"int"}}},close:{parameters:{index:{type:"int"}}}}}});c.SCROLL_SIZE=320;c.ANIMATION_DURATION=g.getAnimation()?200:0;c.SCROLL_ANIMATION_DURATION=g.getAnimation()?500:0;c.prototype.init=function(){this._bInitialized=true;this._bRtl=g.getRTL();this._iCurrentScrollLeft=0;this._iMaxOffsetLeft=null;this._scrollable=null;this._oScroller=new o(this,this.getId()+"-tablist",{horizontal:!this.getEnableTabReordering(),vertical:false,nonTouchScrolling:true});this.data("sap-ui-fastnavgroup","true",true)};c.prototype.setEnableTabReordering=function(e){this.setProperty("enableTabReordering",e,true);if(this._oScroller){this._oScroller.setHorizontal(!e)}return this};c.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){h.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};c.prototype.onAfterRendering=function(){if(this._oScroller){this._oScroller.setIconTabBar(this,e.proxy(this._updateScrollingAppearance,this),null)}this._initItemNavigation();this._updateScrollingAppearance();this._sResizeListenerId=h.register(this.getDomRef(),e.proxy(this._updateScrollingAppearance,this));var t=this.getTabs();var i=this.getSelectedIndex();var s=t[i];if(this._oScroller&&s&&s.$().length>0){if(!this._oScroller._$Container){this._oScroller.onAfterRendering()}this._scrollIntoView(s.$(),c.SCROLL_ANIMATION_DURATION)}for(var r=0;r<t.length;r++){t[r].onAfterRendering()}};c.prototype.createTab=function(e,t){var i=new f({text:e}),s=new p;s.setTitle(i);s.addContent(t);this.addTab(s);return s};c.prototype.selectTabByDomRef=function(e){var t=this.getItemIndex(e);if(t>-1){if(t!=this.getSelectedIndex()&&this.getTabs()[t].getEnabled()){var i=this.getSelectedIndex();this.setProperty("selectedIndex",t,true);this.rerenderPanel(i,true);this.oItemNavigation.setSelectedIndex(this.oItemNavigation.getFocusedIndex())}}};c.prototype.onsapspace=function(e){var t=e.target;this.selectTabByDomRef(t)};c.prototype.onsapspacemodifiers=c.prototype.onsapspace;c.prototype.onsapenter=c.prototype.onsapspace;c.prototype.onsapentermodifiers=c.prototype.onsapspace;c.prototype.onsapdelete=function(e){var t=e.target;var i=this.getItemIndex(t);if(i>-1&&this.getTabs()[i].getClosable()){this.fireClose({index:i})}};c.prototype.getFocusDomRef=function(){return this.getDomRef().firstChild};c.prototype.exit=function(){this._bInitialized=false;this._iCurrentScrollLeft=null;this._iMaxOffsetLeft=null;this._scrollable=null;if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._sResizeListenerId){h.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation}};c.prototype.getItemIndex=function(t){var i;if(!t.id||t.id.search("-close")!=-1){var s=e(t).parentByAttribute("id");i=s.id}else{i=t.id}for(var r=0,a=this.getTabs();r<a.length;r++){if(i==a[r].getId()){return r}}return-1};c.prototype.removeTab=function(e){var t=e;if(typeof e=="string"){e=sap.ui.getCore().byId(e)}if(typeof e=="object"){t=this.indexOfTab(e)}var i=this.getTabs()[t];if(i.getVisible()){i.setProperty("visible",false,true);this.hideTab(t);i.setProperty("visible",true,true)}if(this.getSelectedIndex()>t){this.setProperty("selectedIndex",this.getSelectedIndex()-1,true)}return this.removeAggregation("tabs",t,true)};c.prototype.setSelectedIndex=function(e){var t=this.getSelectedIndex();if(e==t){return this}var i=this.getTabs();var s=i[e];if(this._oScroller&&s&&s.$().length>0){this._scrollIntoView(s.$(),c.SCROLL_ANIMATION_DURATION)}if(!s&&!this.getDomRef()){this.setProperty("selectedIndex",e,false)}else if(s&&s.getEnabled()&&s.getVisible()){this.setProperty("selectedIndex",e,true);if(this.getDomRef()&&!this.invalidated){this.rerenderPanel(t);if(this.oItemNavigation){var r=0;var a=-1;for(var o=0;o<i.length;o++){s=i[o];if(s.getVisible()===false){continue}if(o==e){a=r;break}r++}this.oItemNavigation.setSelectedIndex(a)}}}else{this._warningInvalidSelectedIndex(e,s)}return this};c.prototype.closeTab=function(e){var t=this.getTabs()[e];if(!t||!t.getClosable()||!t.getVisible()){return}t.setProperty("visible",false,true);this.hideTab(e)};c.prototype.hideTab=function(e){var t=this.getTabs()[e];if(!this.getDomRef()){return}var i=this.oItemNavigation.getFocusedIndex();var s=parseInt(t.$().attr("aria-posinset"))-1;var r=sap.ui.getCore().getCurrentFocusedControlId();t.$().remove();if(this.iVisibleTabs==1){this.setProperty("selectedIndex",-1,true);t.$("panel").remove()}else if(e==this.getSelectedIndex()){var a=e+1;while(a<this.getTabs().length&&(!this.getTabs()[a].getEnabled()||!this.getTabs()[a].getVisible())){a++}if(a==this.getTabs().length){a=e-1;while(a>=0&&(!this.getTabs()[a].getEnabled()||!this.getTabs()[a].getVisible())){a--}}this.setProperty("selectedIndex",a,true);this.rerenderPanel(e)}else{this.toggleTabClasses(this.getSelectedIndex(),this.getSelectedIndex())}this.iVisibleTabs--;var s=0;var o=[];var n=-1;var l=false;for(var h=0;h<this.getTabs().length;h++){var t=this.getTabs()[h];if(r==t.getId()){l=true}if(t.getVisible()===false){continue}if(h==this.getSelectedIndex()){n=s}s++;t.$().attr("aria-posinset",s).attr("aria-setsize",this.iVisibleTabs);o.push(t.getDomRef())}if(s<=i){i--}this.oItemNavigation.setItemDomRefs(o);this.oItemNavigation.setSelectedIndex(n);this.oItemNavigation.setFocusedIndex(i);if(l){this.oItemNavigation.focusItem(i)}this._updateScrollingAppearance()};c.prototype.rerenderPanel=function(e,t){var i=this.getTabs();var s=this.getSelectedIndex();var r=i[s];var a=i[e];setTimeout(function(){if(!this._bInitialized){return}var e=this.$().find(".sapUiTabPanel");if(r){if(e.length>0){var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderTabContents(i,r);i.flush(e[0]);i.destroy()}var o=r.getId();e.attr("id",o+"-panel").attr("aria-labelledby",o)}else{e.empty()}a.setProperty("scrollTop",e.scrollTop(),true);a.setProperty("scrollLeft",e.scrollLeft(),true);if(r){r.onAfterRendering()}if(t){this.fireSelect({index:s})}}.bind(this),0);if(r){this.toggleTabClasses(e,s)}};c.prototype.toggleTabClasses=function(e,t){var i=this.getTabs();var s=i[e];if(s){s.$().toggleClass("sapUiTabSel sapUiTab").attr("aria-selected",false)}var r=e-1;while(r>=0&&!i[r].getVisible()){r--}if(r>=0){i[r].$().removeClass("sapUiTabBeforeSel")}var a=e+1;while(a<i.length&&!i[a].getVisible()){a++}if(a<i.length){i[a].$().removeClass("sapUiTabAfterSel")}s=i[t];if(s){s.$().toggleClass("sapUiTabSel sapUiTab").attr("aria-selected",true)}r=t-1;while(r>=0&&!i[r].getVisible()){r--}if(r>=0){i[r].$().addClass("sapUiTabBeforeSel")}a=t+1;while(a<i.length&&!i[a].getVisible()){a++}if(a<i.length){i[a].$().addClass("sapUiTabAfterSel")}};c.prototype.invalidate=function(){this.invalidated=true;s.prototype.invalidate.apply(this,arguments)};c.prototype._warningInvalidSelectedIndex=function(e,i){var s="";if(!i){s="Tab not exists"}else if(!i.getEnabled()){s="Tab disabled"}else if(!i.getVisible()){s="Tab not visible"}t.warning("SelectedIndex "+e+" can not be set",s,"sap.ui.commons.TabStrip")};c.prototype.onkeydown=function(e){if(e.which===d.ESCAPE){this._stopMoving()}};c.prototype.onclick=function(t){var i=t.target;var s=e(i);if(i.className=="sapUiTabClose"){var r=this.getItemIndex(s.parentByAttribute("id"));if(r>-1){this.fireClose({index:r})}}};c.prototype.onmousedown=function(t){var i=!t.button;var s=this._isTouchMode(t);if(!s&&!i){return}var r=t.target;var a=e(r);if(r.className=="sapUiTabClose"){t.preventDefault();t.stopPropagation();t.target=null;return}this.selectTabByDomRef(r);if(!this.getEnableTabReordering()){return}var o=a.closest(".sapUiTab, .sapUiTabSel, .sapUiTabDsbl");if(o.length===1){this._onTabMoveStart(o,t,s)}};c.prototype._onTabMoveStart=function(t,i,s){this._disableTextSelection();i.preventDefault();t.zIndex(this.$().zIndex()+10);var r=this.getItemIndex(i.target);var a=this.getTabs()[r];var o=this.$().find(".sapUiTabBarCnt").children();var n=e.inArray(t[0],o);var l=t.outerWidth();this._dragContext={index:n,tabIndex:r,isTouchMode:s,startX:s?i.originalEvent.targetTouches[0].pageX:i.pageX,tab:a,tabWidth:l,tabCenter:t.position().left+l/2};this._aMovedTabIndexes=[];var h=e(document);if(s){h.on("touchmove",e.proxy(this._onTabMove,this));h.on("touchend",e.proxy(this._onTabMoved,this))}else{h.on("mousemove",e.proxy(this._onTabMove,this));h.on("mouseup",e.proxy(this._onTabMoved,this))}};c.prototype._onTabMove=function(t){var i=this._dragContext;if(!i){return}var s=this._isTouchMode(t);if(s){t.preventDefault()}var r=s?t.targetTouches[0].pageX:t.pageX;var a=r-i.startX;i.tab.$().css({left:a});var o,n,l,h,f=this.$().find(".sapUiTabBarCnt").children(),p=this._aMovedTabIndexes,d=g.getRTL();for(var c=0;c<f.length;c++){if(c==i.index){continue}o=e(f[c]);n=o.position().left;l=parseFloat(o.css("left"));if(!isNaN(l)){n-=l}if(c<i.index!=d){h=n+o.outerWidth()>i.tabCenter+a;this._onAnimateTab(o,i.tabWidth,h,p,c)}else{h=n<i.tabCenter+a;this._onAnimateTab(o,-i.tabWidth,h,p,c)}}};c.prototype._onAnimateTab=function(t,i,s,r,a){var o=e.inArray(a,r);var n=o!=-1;if(s&&!n){t.stop(true,true);t.animate({left:i},c.ANIMATION_DURATION);r.push(a)}else if(!s&&n){t.stop(true,true);t.animate({left:0},c.ANIMATION_DURATION);r.splice(o,1)}};c.prototype._onTabMoved=function(t){var i=this._dragContext;if(!i){return}this._stopMoving();var s=this._aMovedTabIndexes;if(s.length==0){return}var r=i.tab.$(),a,o=this.$().find(".sapUiTabBarCnt").children();var n=s[s.length-1],l=n,h=this.getItemIndex(o[n]);this.removeAggregation("tabs",i.tab,true);this.insertAggregation("tabs",i.tab,h,true);if(n>i.index){r.insertAfter(e(o[n]))}else{r.insertBefore(e(o[n]))}o=this.$().find(".sapUiTabBarCnt").children();if(!i.tab.getEnabled()){for(var f=0;f<o.length;f++){a=e(o[f]);if(a.hasClass("sapUiTabSel")){l=f;h=this.getItemIndex(a[0]);break}}}this.setProperty("selectedIndex",h,true);o.removeClass("sapUiTabAfterSel");o.removeClass("sapUiTabBeforeSel");for(var f=0;f<o.length;f++){a=e(o[f]);a.attr("aria-posinset",f+1);if(f==l-1){a.addClass("sapUiTabBeforeSel")}else if(f==l+1){a.addClass("sapUiTabAfterSel")}}r.trigger("focus");this._initItemNavigation()};c.prototype._stopMoving=function(){var t=this._dragContext;if(!t){return}var i=t.tab.$();i.css("z-index","");var s=this.$().find(".sapUiTabBarCnt").children();s.stop(true,true);s.css("left","");this._dragContext=null;var r=e(document);if(t.isTouchMode){r.off("touchmove",this._onTabMove);r.off("touchend",this._onTabMoved)}else{r.off("mousemove",this._onTabMove);r.off("mouseup",this._onTabMoved)}this._enableTextSelection()};c.prototype._isTouchMode=function(e){return!!e.originalEvent["touches"]};c.prototype._initItemNavigation=function(){var t=this.getDomRef("tablist"),i=t.childNodes,s=[],a=-1;for(var o=0;o<i.length;o++){s.push(i[o]);if(e(i[o]).hasClass("sapUiTabSel")){a=o}}if(!this.oItemNavigation){this.oItemNavigation=new r;this.oItemNavigation.attachEvent(r.Events.AfterFocus,this._onItemNavigationAfterFocus,this);this.oItemNavigation.setCycling(false);this.addDelegate(this.oItemNavigation)}this.oItemNavigation.setRootDomRef(t);this.oItemNavigation.setItemDomRefs(s);this.oItemNavigation.setSelectedIndex(a)};c.prototype._disableTextSelection=function(t){e(t||document.body).attr("unselectable","on").addClass("sapUiTabStripNoSelection").bind("selectstart",function(e){e.preventDefault();return false})};c.prototype._enableTextSelection=function(t){e(t||document.body).attr("unselectable","off").removeClass("sapUiTabStripNoSelection").unbind("selectstart")};c.prototype._getActualSelectedIndex=function(){var e=Math.max(0,this.getSelectedIndex());var t=this.getTabs();var i=t[e];if(i&&i.getVisible()&&i.getEnabled()){return e}for(var s=0;s<t.length;s++){var r=t[s];if(r.getVisible()&&r.getEnabled()){return s}}return 0};c.prototype._getLeftArrowControl=function(){var e=this.getAggregation("_leftArrowControl");var t=this;if(!e){e=new a({src:"sap-icon://navigation-left-arrow",noTabStop:true,useIconTooltip:false,tooltip:"",press:function(e){t._scroll(-c.SCROLL_SIZE,c.SCROLL_ANIMATION_DURATION)}}).addStyleClass("sapUiTabStripScrollIcon sapUiTabStripLeftScrollIcon");this.setAggregation("_leftArrowControl",e,true)}return e};c.prototype._getRightArrowControl=function(){var e=this.getAggregation("_rightArrowControl");var t=this;if(!e){e=new a({src:"sap-icon://navigation-right-arrow",noTabStop:true,useIconTooltip:false,tooltip:"",press:function(e){t._scroll(c.SCROLL_SIZE,c.SCROLL_ANIMATION_DURATION)}}).addStyleClass("sapUiTabStripScrollIcon sapUiTabStripRightScrollIcon");this.setAggregation("_rightArrowControl",e,true)}return e};c.prototype._scroll=function(e,t){var i=this.getDomRef("scrollCont").scrollLeft,s;if(this._bRtl&&n.browser.firefox){s=i-e;if(s<-this._iMaxOffsetLeft){s=-this._iMaxOffsetLeft}if(s>0){s=0}}else{s=i+e;if(s<0){s=0}if(s>this._iMaxOffsetLeft){s=this._iMaxOffsetLeft}}if(this._oScroller){this._oScroller.scrollTo(s,0,t)}this._iCurrentScrollLeft=s};c.prototype._scrollIntoView=function(e,t){var i=this.$("tablist"),s=i.innerWidth()-i.width(),r=e.outerWidth(true),a=e.position().left-s/2,o=this.getDomRef("scrollCont"),l=o.scrollLeft,h=this.$("scrollCont").width(),f=l;if(a<0||a>h-r){if(this._bRtl&&n.browser.firefox){if(a<0){f+=a+r-h}else{f+=a}}else{if(a<0){f+=a}else{f+=a+r-h}}this._iCurrentScrollLeft=f;if(this._oScroller){this._oScroller.scrollTo(f,0,t)}}};c.prototype._hasScrolling=function(){var e=this.getDomRef("tablist"),t=this.getDomRef("scrollCont"),i=e&&e.scrollWidth>t.clientWidth;this.$().toggleClass("sapUiTabStripScrollable",i);return i};c.prototype._updateScrollingAppearance=function(){var t=this.getDomRef("tablist"),i=this.getDomRef("scrollCont"),s,r,a,o=false,l=false;if(this._hasScrolling()&&t&&i){if(this._bRtl&&n.browser.firefox){s=-i.scrollLeft}else{s=i.scrollLeft}r=t.scrollWidth;a=i.clientWidth;if(Math.abs(r-a)===1){r=a}if(s>0){o=true}if(r>a&&s+a<r){l=true}}this.$().toggleClass("sapUiTabStripScrollBack",o).toggleClass("sapUiTabStripScrollForward",l);this._iMaxOffsetLeft=Math.abs(e(i).width()-e(t).width())};c.prototype._onItemNavigationAfterFocus=function(t){var i=t.getParameter("index"),s=t.getParameter("event");if(!s){return}var r=e(s.target);if(!r||s.keyCode===undefined){return}if(i!==null&&i!==undefined){var a=e(r.parent().children()[i]);if(a&&a.length){this._scrollIntoView(a,0)}}};return c});