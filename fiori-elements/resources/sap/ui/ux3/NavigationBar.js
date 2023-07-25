/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","./library","./NavigationBarRenderer","sap/ui/commons/Menu","sap/ui/commons/MenuItem","sap/ui/core/Popup","sap/ui/events/jquery/EventSimulation","sap/ui/dom/denormalizeScrollLeftRTL","sap/ui/util/ActivityDetection","sap/ui/Device","sap/base/assert","sap/ui/core/Configuration","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/scrollLeftRTL"],function(t,e,i,r,o,a,s,n,l,u,c,f,h,v){"use strict";var d=n.Dock;var p=e.extend("sap.ui.ux3.NavigationBar",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{toplevelVariant:{type:"boolean",group:"Misc",defaultValue:false},overflowItemsToUpperCase:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.ux3.NavigationItem",multiple:true,singularName:"item"},overflowMenu:{type:"sap.ui.commons.Menu",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.ux3.NavigationItem",multiple:false},associatedItems:{type:"sap.ui.ux3.NavigationItem",multiple:true,singularName:"associatedItem"}},events:{select:{allowPreventDefault:true,parameters:{itemId:{type:"string"},item:{type:"sap.ui.ux3.NavigationItem"}}}}}});p.SCROLL_STEP=250;p.prototype.init=function(){this._bPreviousScrollForward=false;this._bPreviousScrollBack=false;this._iLastArrowPos=-100;this._bRtl=v.getRTL();this.allowTextSelection(false);this.startScrollX=0;this.startTouchX=0;var t=this;this._oItemNavigation=(new i).setCycling(false);this.addDelegate(this._oItemNavigation);this.data("sap-ui-fastnavgroup","true",true);if(l.touchEventMode==="ON"){var e=function(e){e.preventDefault();if(t._iInertiaIntervalId){window.clearInterval(t._iInertiaIntervalId)}t.startScrollX=t.getDomRef("list").scrollLeft;t.startTouchX=e.touches[0].pageX;t._bTouchNotMoved=true;t._lastMoveTime=(new Date).getTime()};var r=function(e){var i=e.touches[0].pageX-t.startTouchX;var r=t.getDomRef("list");var o=r.scrollLeft;var a=t.startScrollX-i;r.scrollLeft=a;t._bTouchNotMoved=false;var s=(new Date).getTime()-t._lastMoveTime;t._lastMoveTime=(new Date).getTime();if(s>0){t._velocity=(a-o)/s}e.preventDefault()};var o=function(e){if(t._bTouchNotMoved===false){e.preventDefault();var i=t.getDomRef("list");var r=50;var o=Math.abs(t._velocity/10);t._iInertiaIntervalId=setInterval(function(){t._velocity=t._velocity*.8;var e=t._velocity*r;i.scrollLeft=i.scrollLeft+e;if(Math.abs(t._velocity)<o){window.clearInterval(t._iInertiaIntervalId);t._iInertiaIntervalId=undefined}},r)}else if(t._bTouchNotMoved===true){t.onclick(e);e.preventDefault()}t._bTouchNotMoved=undefined;t._lastMoveTime=undefined};this.ontouchstart=e;this.ontouchend=o;this.ontouchmove=r}};p.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._checkOverflowIntervalId){clearInterval(this._checkOverflowIntervalId);this._checkOverflowIntervalId=null}};p.prototype.onBeforeRendering=function(){if(this._checkOverflowIntervalId){clearInterval(this._checkOverflowIntervalId);this._checkOverflowIntervalId=null}this._iSoredScrollPosition=this.$("list").scrollLeft();if(f.browser.firefox){this.$().off("DOMMouseScroll",this._handleScroll)}else{this.$().off("mousewheel",this._handleScroll)}var t=this.getDomRef("arrow");this._iLastArrowPos=t?parseInt(this._bRtl?t.style.right:t.style.left):-100};p.prototype.invalidate=function(t){if(t instanceof sap.ui.ux3.NavigationItem){this._menuInvalid=true}e.prototype.invalidate.apply(this,arguments)};p.prototype._calculatePositions=function(){var t=this.getDomRef();this._bPreviousScrollForward=false;this._bPreviousScrollBack=false;this._checkOverflow(t.firstChild,this.getDomRef("ofb"),this.getDomRef("off"))};p.prototype.onThemeChanged=function(){if(this.getDomRef()){this._calculatePositions()}};p.prototype.onAfterRendering=function(){var e=this.getDomRef();var i=e.firstChild;var r=this.getDomRef("ofb");var o=this.getDomRef("off");this._checkOverflowIntervalId=setInterval(this._checkOverflow.bind(this,i,r,o),350);if(f.browser.firefox){t(e).on("DOMMouseScroll",t.proxy(this._handleScroll,this))}else{t(e).on("mousewheel",t.proxy(this._handleScroll,this))}this._calculatePositions();this._updateItemNavigation();var a=this.$();a.on("scroll",function(){a.children().scrollTop(0);a.scrollTop(0)});if(this._iSoredScrollPosition){this.$("list").scrollLeft(this._iSoredScrollPosition)}};p.prototype._updateItemNavigation=function(){var e=this.getDomRef();if(e){var i=-1;var r=this.getSelectedItem();var o=t(e).children().children("li").children().not(".sapUiUx3NavBarDummyItem");o.each(function(t,e){if(e.id==r){i=t}});this._oItemNavigation.setRootDomRef(e);this._oItemNavigation.setItemDomRefs(o.toArray());this._oItemNavigation.setSelectedIndex(i)}};p.prototype.onsapspace=function(t){this._handleActivation(t)};p.prototype.onclick=function(t){this._handleActivation(t)};p.prototype.setOverflowItemsToUpperCase=function(t){this._getOverflowMenu().toggleStyleClass("sapUiUx3NavBarUpperCaseText",t);return this.setProperty("overflowItemsToUpperCase",t)};p.prototype._handleActivation=function(t){var e=t.target.id;if(e){var i=this.getId();t.preventDefault();if(e==i+"-ofb"){this._scroll(-p.SCROLL_STEP,500)}else if(e==i+"-off"){this._scroll(p.SCROLL_STEP,500)}else if(e==i+"-oflt"||e==i+"-ofl"){this._showOverflowMenu()}else{var r=sap.ui.getCore().byId(e);if(r&&e!=this.getSelectedItem()&&sap.ui.getCore().byId(e)instanceof sap.ui.ux3.NavigationItem){if(this.fireSelect({item:r,itemId:e})){this.setAssociation("selectedItem",r,true);this._updateSelection(e)}}}}};p.prototype._getOverflowMenu=function(){var t=this.getAggregation("overflowMenu");if(!t||this._menuInvalid){if(t){t.destroyAggregation("items",true)}else{t=new a}var e=this._getCurrentItems();var i=this;var r=this.getSelectedItem();for(var o=0;o<e.length;++o){var n=e[o];var l=new s(n.getId()+"-overflowItem",{text:n.getText(),visible:n.getVisible(),icon:r==n.getId()?"sap-icon://accept":null,select:function(t){return function(e){i._handleActivation({target:{id:t.getId()},preventDefault:function(){}})}}(n)});t.addAggregation("items",l,true)}this.setAggregation("overflowMenu",t,true);this._menuInvalid=false}return t};p.prototype._getCurrentItems=function(){var t=this.getItems();if(t.length<1){t=this.getAssociatedItems();var e=sap.ui.getCore();for(var i=0;i<t.length;++i){t[i]=e.byId(t[i])}}return t};p.prototype._showOverflowMenu=function(){var t=this._getOverflowMenu();var e=this.$("ofl").get(0);t.open(true,e,d.EndTop,d.CenterCenter,e)};p.prototype._updateSelection=function(e){this._menuInvalid=true;var i=t(document.getElementById(e));i.attr("tabindex","0").attr("aria-checked","true");i.parent().addClass("sapUiUx3NavBarItemSel");i.parent().parent().children().each(function(){var i=this.firstChild;if(i&&i.id!=e&&i.className.indexOf("Dummy")==-1){t(i).attr("tabindex","-1");t(i).parent().removeClass("sapUiUx3NavBarItemSel");t(i).attr("aria-checked","false")}});var r=i.parent().index();if(r>0){r--}this._oItemNavigation.setSelectedIndex(r);var o=this.$("arrow");var a=o.outerWidth();var s=p._getArrowTargetPos(e,a,this._bRtl);o.stop();var n=this._bRtl?{right:s+"px"}:{left:s+"px"};o.animate(n,500,"linear");var l=this;window.setTimeout(function(){s=p._getArrowTargetPos(e,a,l._bRtl);o.stop();var t=l._bRtl?{right:s+"px"}:{left:s+"px"};o.animate(t,200,"linear",function(){var t=e?window.document.getElementById(e):null;l._scrollItemIntoView(t)})},300)};p.prototype._scrollItemIntoView=function(e){if(!e){return}var i=t(e.parentNode);var r=i.parent();var o;var a=v.getRTL();var s=i.index()-1;if(s==0){o=a?r[0].scrollWidth-r.innerWidth()+20:0}else if(s==i.siblings().length-2){o=a?0:r[0].scrollWidth-r.innerWidth()+20}else{var n=i.position().left;var l=a?r.scrollLeftRTL():r.scrollLeft();if(n<0){o=l+n}else{var c=r.innerWidth()-(n+i.outerWidth(true));if(c<0){o=l-c;o=Math.min(o,l+n)}}}if(o!==undefined){if(a){o=u(o,r.get(0))}r.stop(true,true).animate({scrollLeft:o})}};p._getArrowTargetPos=function(e,i,r){var o=t(document.getElementById(e));if(o.length>0){var a=o.outerWidth();var s=Math.round(o[0].offsetLeft+a/2-i/2);if(!r){return s}else{return o.parent().parent().innerWidth()-s-i}}else{return-100}};p.prototype._handleScroll=function(t){if(t.type=="DOMMouseScroll"){var e=t.originalEvent.detail*40;this._scroll(e,50)}else{var e=-t.originalEvent.wheelDelta;this._scroll(e,50)}t.preventDefault()};p.prototype._scroll=function(e,i){var r=this.$()[0].firstChild;var o=r.scrollLeft;if(!f.browser.msie&&this._bRtl){e=-e}var a=o+e;t(r).stop(true,true).animate({scrollLeft:a},i)};p.prototype._checkOverflow=function(e,i,r){function o(){return f.os.macintosh&&f.browser.chrome}if(e&&this.getDomRef()&&c.isActive()){var a=e.scrollLeft;var s=false;var n=false;var l=e.scrollWidth;var u=e.clientWidth;var h=o()?5:0;if(Math.abs(l-u)==1){l=u}if(!this._bRtl){if(a>h){s=true}if(l>u&&l-(a+u)>h){n=true}}else{var v=t(e);if(v.scrollLeftRTL()>h){n=true}if(v.scrollRightRTL()>h){s=true}}if(n!=this._bPreviousScrollForward||s!=this._bPreviousScrollBack){this._bPreviousScrollForward=n;this._bPreviousScrollBack=s;this.$().toggleClass("sapUiUx3NavBarScrollBack",s).toggleClass("sapUiUx3NavBarScrollForward",n);if(!p._bMenuLoaded&&(s||n)){p._bMenuLoaded=true}}var d=sap.ui.getCore().byId(this.getSelectedItem());if(d){var m=this.$("arrow");var g=m.outerWidth();var I=p._getArrowTargetPos(d.getId(),g,this._bRtl)+"px";if(!this._bRtl){if(m[0].style.left!=I){m[0].style.left=I}}else{if(m[0].style.right!=I){m[0].style.right=I}}}}};p.prototype.setSelectedItem=function(t){this.setAssociation("selectedItem",t,true);if(this.getDomRef()){var e=!t||typeof t=="string"?t:t.getId();this._updateSelection(e)}return this};p.prototype.addItem=function(t){this._menuInvalid=true;return this.addAggregation("items",t)};p.prototype.destroyItems=function(){this._menuInvalid=true;return this.destroyAggregation("items")};p.prototype.insertItem=function(t,e){this._menuInvalid=true;return this.insertAggregation("items",t,e)};p.prototype.removeItem=function(t){this._menuInvalid=true;return this.removeAggregation("items",t)};p.prototype.removeAllItems=function(){this._menuInvalid=true;return this.removeAllAggregation("items")};p.prototype.addAssociatedItem=function(t){this._menuInvalid=true;return this.addAssociation("associatedItems",t)};p.prototype.removeAssociatedItem=function(t){this._menuInvalid=true;return this.removeAssociation("associatedItems",t)};p.prototype.removeAllAssociatedItems=function(){this._menuInvalid=true;return this.removeAllAssociation("associatedItems")};p.prototype.setAssociatedItems=function(e){h(Array.isArray(e),"aItems must be an array");var i=this.getDomRef("list");this.removeAllAssociation("associatedItems",true);for(var r=0;r<e.length;r++){this.addAssociation("associatedItems",e[r],true)}if(i){var a=t(i).find(":focus");var s=a.length>0?a.attr("id"):null;if(arguments.length>1&&typeof arguments[1]==="boolean"){this._iLastArrowPos=-100}else{var n=this.getDomRef("arrow");this._iLastArrowPos=parseInt(this._bRtl?n.style.right:n.style.left)}i.innerHTML="";var l=sap.ui.getCore().createRenderManager();o.renderItems(l,this);l.flush(i,true);l.destroy();var u=s?document.getElementById(s):null;if(u){u.focus()}this._updateSelection(this.getSelectedItem());this._updateItemNavigation()}return this};p.prototype.isSelectedItemValid=function(){var t=this.getSelectedItem();if(!t){return false}var e=this.getItems();if(!e||e.length==0){e=this.getAssociatedItems();for(var i=0;i<e.length;i++){if(e[i]==t){return true}}}else{for(var i=0;i<e.length;i++){if(e[i].getId()==t){return true}}}return false};return p});