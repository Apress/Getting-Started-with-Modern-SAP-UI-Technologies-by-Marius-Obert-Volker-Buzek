/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["./library","sap/suite/ui/commons/util/HtmlElement","sap/ui/core/format/DateFormat","sap/ui/core/Icon","sap/base/security/encodeXML","sap/base/security/encodeCSS","sap/ui/core/InvisibleText"],function(e,i,t,a,d,s,l){"use strict";var n=e.TimelineAlignment;var o={};o.apiVersion=2;var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons"),m=24*60*60*1e3;o.render=function(e,i){this._getTimelineItemElement(i).getRenderer().render(e)};o._getTimelineItemElement=function(e){if(e._orientation==="V"){return this._getVerticalTimelineItemElement(e)}else{return this._getHorizontalTimelineItemElement(e)}};o._getFormatedDateTime=function(e,i){i=i||{};var a=i.resBundle||r,d=i.dateFormat||t.getDateInstance({style:"short"}),s=i.timeFormat||t.getTimeInstance({style:"short"}),l=e.getDateTimeWithoutStringParse(),n,o,C,p;if(!(l instanceof Date)||isNaN(l.getTime())){return l}n=Date.UTC(l.getFullYear(),l.getMonth(),l.getDate());o=new Date;o=Date.UTC(o.getFullYear(),o.getMonth(),o.getDate());C=Math.floor((o-n)/m);switch(C){case 0:p=a.getText("TIMELINE_TODAY");break;case 1:p=a.getText("TIMELINE_YESTERDAY");break;default:p=d.format(l)}return p+" "+a.getText("TIMELINE_AT")+" "+s.format(l)};o._getHorizontalTimelineItemElement=function(e){var t=e._placementLine==="top",a=t?"sapSuiteUiCommonsTimelineItemHTop":"sapSuiteUiCommonsTimelineItemHBottom",l=e.getText()==="GroupHeader",n=e._groupID,o,r;if(l){return this._getGroupHeaderElement(e)}var m=new i("li"),C=new i("div"),p=new i("div"),u=new i("div"),I=new i("div"),T=new i("div"),S=new i("div"),g=this._getTimelineItemShell(e);if(n){m.setAttribute("groupid",e._groupID)}if(e._isFirstGroupEvenItem){m.setAttribute("firstgroupevenitem",e._isFirstGroupEvenItem)}m.addControlData(e);m.addClass("sapSuiteUiCommonsTimelineItemLiWrapperV");m.addClass(d(a));C.addClass("sapSuiteUiCommonsTimelineItemWrapperH");C.addClass("sapSuiteUiCommonsTimelineItemBaseLength");m.addChild(C);p.addClass("sapSuiteUiCommonsTimelineItemBubbleSpacer");C.addChild(p);u.addClass("sapSuiteUiCommonsTimelineItemBubble");p.addChild(u);I.addClass("sapSuiteUiCommonsTimelineItemOutline");I.setId(e.getId()+"-outline");I.setAttribute("tabindex","0");this._addAccessibilityTags(I,e);T.addClass("sapSuiteUiCommonsTimelineItemBox");I.addChild(T);S.addClass("sapSuiteUiCommonsTimelineItemArrow");if(t){u.addChild(I);u.addChild(S)}else{u.addChild(S);u.addChild(I)}if(!e._callParentFn("_isGrouped")&&e._callParentFn("getEnableDoubleSided")&&e._index===1){r=e.getParent();o="margin-left";if(r&&r._bRtlMode){o="margin-right"}m.addStyle(s(o),"100px")}T.addChild(g);if(e._isGroupCollapsed()){m.addStyle("display","none")}return m};o._getGroupHeaderElement=function(e){var t=new i("li"),s=new i("div"),l=new i("div"),o=new i("div"),r=new i("div"),m=new i("div"),C=new i("span"),p=new i("div"),u=new i("div"),I=new i("div"),T=e._orientation==="V"?l:o,S=new i("div"),g=new i("div"),h=new i("div");var c=e._isGroupCollapsed(),_=e._callParentFn("getShowIcons"),U;if(e._groupID){t.setAttribute("groupid",e._groupID)}if(e._isLastGroup){t.addClass("sapSuiteUiCommonsTimelineLastItem")}t.addControlData(e);t.addClass("sapSuiteUiCommonsTimelineGroupHeader");t.addChild(s);s.addChild(l);s.addClass("sapSuiteUiCommonsTimelineGroupHeaderDirectChild");l.addClass("sapSuiteUiCommonsTimelineGroupHeaderMainWrapper");l.setId(e.getId()+"-outline");l.setAttribute("tabindex","0");this._addAccessibilityTags(l,e,true);l.setAttribute("data-sap-ui-fastnavgroup",true);l.addChild(o);t.addChild(I);t.setAttribute("nodetype","GroupHeader");r.addClass("sapSuiteUiCommonsTimelineGroupHeaderSpanWrapper");if(e._orientation==="V"){t.addClass(e._position===n.Left?"sapSuiteUiCommonsTimelineItemWrapperVLeft":"sapSuiteUiCommonsTimelineItemWrapperVRight");t.setAttribute("role","treeitem");t.setAttribute("aria-expanded",c?false:true);t.setAttribute("aria-level",1)}else{t.setAttribute("role","presentation")}o.addClass("sapSuiteUiCommonsTimelineGroupHeaderWrapper");o.addClass("sapSuiteUiCommonsTimelineGroupHeaderPointer");T.addChild(m);o.addChild(u);o.addChild(r);t.addClass(c?"sapSuiteUiCommonsTimelineGroupCollapsed":"sapSuiteUiCommonsTimelineGroupExpanded");u.addClass("sapSuiteUiCommonsTimelineGroupHeaderIconWrapper");U=e._getCorrectGroupIcon();e._objects.register("groupCollapseIcon",function(){var i=new a(e.getId()+"-groupCollapseIcon",{src:U,decorative:true});i.addStyleClass("sapSuiteUiCommonsTimelineGroupHeaderPointer");i.setParent(e);return i});u.addChild(e._objects.getGroupCollapseIcon());m.addClass("sapSuiteUiCommonsTimelineItemArrow");I.addClass("sapSuiteUiCommonsTimelineGroupHeaderLineWrapper");p.addClass("sapSuiteUiCommonsTimelineGroupHeaderLine");I.addChild(p);r.addChild(C);C.addClass("sapSuiteUiCommonsTimelineGroupHeaderSpan");C.addChildEscaped(" "+e.getTitle());if(e._orientation==="V"){t.addChild(S);g.addChild(e._getLineIcon());S.addChild(g);g.addClass("sapSuiteUiCommonsTimelineItemBarIconWrapperV");S.addClass("sapSuiteUiCommonsTimelineGroupHeaderBarWrapper");if(!e._isGroupCollapsed()){S.addStyle("display","none")}h.addClass("sapSuiteUiCommonsTimelineItemBarV");if(!_){h.addClass("sapSuiteUiCommonsTimelineItemBarNoIcon")}S.addChild(h);if(e._additionalBarClass){h.addClass(d(e._additionalBarClass))}}return t};o._getVerticalTimelineItemElement=function(e){var t=new i("li"),a=new i("div"),s=new i("div"),l=new i("div"),o=new i("div"),r=new i("div"),m=new i("div"),C=new i("div"),p=new i("div"),u=new i("div"),I=new i("div"),T,S=new i("ul");var g=e._callParentFn("getShowIcons"),h=e._groupID,c=e.getText()==="GroupHeader",_=e._getStatusColorClass();if(c){return this._getGroupHeaderElement(e)}if(h){t.setAttribute("groupid",h);t.setAttribute("aria-level",2)}else{t.setAttribute("role","presentation")}t.addClass("sapSuiteUiCommonsTimelineItem");t.setAttribute("aria-labelledby",e.getAriaLabelledBy().join(" "),true);if(e._isLast){t.addClass("sapSuiteUiCommonsTimelineLastItem")}a.addClass(c?"sapSuiteUiCommonsTimelineItemWrapperGrp":"sapSuiteUiCommonsTimelineItemWrapperV");t.addChild(a);a.addClass(e._position===n.Left?"sapSuiteUiCommonsTimelineItemWrapperVLeft":"sapSuiteUiCommonsTimelineItemWrapperVRight");a.addChild(o);a.addChild(s);s.addClass("sapSuiteUiCommonsTimelineItemBarWrapperV");l.addClass("sapSuiteUiCommonsTimelineItemBarIconWrapperV");if(_){l.addClass(d(_))}else{l.addClass("sapSuiteUiCommonsTimelineNoStatus")}if(g){s.addChild(l);l.addChild(e._getLineIcon("",h))}else{I.addChild(u);I.addClass("sapSuiteUiCommonsTimelineItemNoIconWrapper");u.addClass("sapSuiteUiCommonsTimelineItemNoIcon");s.addChild(I);if(_){u.addClass(d(_))}r.addClass("sapSuiteUiCommonsTimelineItemBarNoIcon")}r.addClass("sapSuiteUiCommonsTimelineItemBarV");s.addChild(r);if(e._additionalBarClass){r.addClass(d(e._additionalBarClass))}o.addClass("sapSuiteUiCommonsTimelineItemBubble");p.addClass("sapSuiteUiCommonsTimelineItemArrow");o.addChild(p);o.addChild(C);C.addClass("sapSuiteUiCommonsTimelineItemOutline");C.setId(e.getId()+"-outline");C.setAttribute("tabindex","0");this._addAccessibilityTags(C,e);m.addClass("sapSuiteUiCommonsTimelineItemBox");C.addChild(m);T=this._getTimelineItemShell(e);m.addChild(T);if(e._isGroupCollapsed()){S.addStyle("display","none")}if(h){S.addControlData(e);S.addClass("sapSuiteUiCommonsTimelineItemUlWrapper");S.addChild(t);return S}else{t.addControlData(e)}return t};o._getTimelineItemShell=function(e){var t=new i("div"),a=new i("div"),d=new i("div"),s=new i("span"),l,n,o=new i("span"),r=new i("div"),m=new i("div"),C=new i("div"),p=new i("span"),u=new i("div"),I=new i("span"),T=new i("div"),S;var g=e.getEmbeddedControl();t.setId(e.getId()+"-shell");t.addClass("sapSuiteUiCommonsTimelineItemShell");t.addChild(e._objects.getInfoBar());t.addChild(a);a.addClass("sapSuiteUiCommonsTimelineItemHeaderWrapper");l=e._getUserPictureControl();if(l){l.addStyleClass("sapSuiteUiCommonsTimelineItemUserPicture");a.addChild(l)}d.setId(e.getId()+"-header");d.addClass("sapSuiteUiCommonsTimelineItemHeader");d.addClass("sapSuiteUiCommonsTimelineItemTextLineClamp");s.setId(e.getId()+"-username");s.addClass("sapSuiteUiCommonsTimelineItemShellUser");d.addChild(s);n=e._getUserNameLinkControl();if(n){s.addChild(n)}else{s.addChildEscaped(e.getUserName());s.addClass("sapUiSelectable")}a.addChild(d);o.addClass("sapSuiteUiCommonsTimelineItemShellHdr");o.addClass("sapUiSelectable");o.addChildEscaped(" "+e.getTitle());d.addChild(o);r.addClass("sapSuiteUiCommonsTimelineItemShellDateTime");r.addClass("sapUiSelectable");r.addChildEscaped(this._getFormatedDateTime(e));d.addChild(r);m.addClass("sapSuiteUiCommonsTimelineItemShellBody");t.addChild(m);if(g!==null){m.addChild(g)}else if(e.getText()){C.addChild(p);C.addClass("sapSuiteUiCommonsTimelineItemTextWrapper");p.setId(e.getId()+"-realtext");p.addClass("sapUiSelectable");m.addChild(C);S=e._checkTextIsExpandable();if(S){I.setId(e.getId()+"-threeDots");I.addClass("sapMFeedListItemTextString");I.addChildEscaped(" ");C.addChild(I);p.addChildEscaped(e._getCollapsedText(),true);I.addChildEscaped("... ");C.setAttribute("expandable",true)}else{p.addChildEscaped(e.getText(),true);u.addStyle("display","none")}m.addChild(u);u.addClass("sapSuiteUiCommonsTimelineItemShowMore");u.addChild(e._getButtonExpandCollapse())}if(e.getParent()&&e.getParent()._aFilterList&&(e._callParentFn("getEnableSocial")||e.getCustomAction().length>0)){T.addClass("sapSuiteUiCommonsTimelineItemShellBottom");T.addChild(e._objects.getSocialBar());t.addChild(T)}return t};o._addAccessibilityTags=function(e,i,t){var a;e.setAttribute("role","option");if(i.getStatus()){var d=new l;d.setText("status "+i.getStatus());d.toStatic();e.setAttribute("aria-describedby",d.getId(),true)}if(typeof i._index==="number"){e.setAttribute("aria-posinset",i._index+1);e.setAttribute("aria-setsize",i._callParentFn("_getItemsCount"))}e.setAttribute("aria-live","polite");if(t){e.setAttribute("aria-expanded",!i._isGroupCollapsed());if(!i._isGroupCollapsed()){a=r.getText("TIMELINE_ACCESSIBILITY_GROUP_HEADER")+": "+i.getTitle()+" "+r.getText("TIMELINE_ACCESSIBILITY_GROUP_EXPAND")}else{a=r.getText("TIMELINE_ACCESSIBILITY_GROUP_HEADER")+": "+i.getTitle()+" "+r.getText("TIMELINE_ACCESSIBILITY_GROUP_COLLAPSE")}e.setAttribute("aria-label",a,false)}};return o},true);