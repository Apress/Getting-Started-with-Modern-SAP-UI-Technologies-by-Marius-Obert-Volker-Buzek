/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/layout/form/SimpleForm","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","sap/m/Avatar","sap/m/Page","sap/m/Button","sap/m/Bar","sap/m/Title","sap/m/Link","sap/m/Text","sap/m/Label","sap/m/HBox","sap/ui/core/Icon","sap/ui/core/Title","sap/ui/core/CustomData","sap/ui/core/library","sap/ui/layout/library","sap/ui/Device","sap/ui/layout/form/ResponsiveGridLayout","./QuickViewPageRenderer","sap/base/Log","sap/base/security/encodeURL","sap/ui/dom/jquery/Focusable"],function(e,t,a,i,o,r,n,s,p,g,l,u,c,d,h,f,v,y,C,m,_,P,b,w,k,A){"use strict";var V=e.URLHelper;var N=_.form.SimpleFormLayout;var x=m.TitleLevel;var I=e.QuickViewGroupElementType;var T=e.ButtonType;var S=e.AvatarShape;var L=e.EmptyIndicatorMode;var H=t.getLibraryResourceBundle("sap.m");var M=a.extend("sap.m.QuickViewPage",{metadata:{library:"sap.m",properties:{pageId:{type:"string",group:"Misc",defaultValue:""},header:{type:"string",group:"Misc",defaultValue:""},title:{type:"string",group:"Misc",defaultValue:""},titleUrl:{type:"string",group:"Misc",defaultValue:""},crossAppNavCallback:{type:"object",group:"Misc",deprecated:true},description:{type:"string",group:"Misc",defaultValue:""},icon:{type:"string",group:"Misc",defaultValue:"",deprecated:true},fallbackIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null,deprecated:true}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.m.QuickViewGroup",multiple:true,singularName:"group",bindable:"bindable"},avatar:{type:"sap.m.Avatar",multiple:false,bindable:"bindable"}}},renderer:w});M.prototype.init=function(){if(this._initCrossAppNavigationService){this._initCrossAppNavigationService()}};M.prototype._initCrossAppNavigationService=function(){var e=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService;if(e){this.oCrossAppNavigator=e("CrossApplicationNavigation")}};M.prototype.exit=function(){if(this._oPage){this._oPage.destroy();this._oPage=null}else{this._destroyPageContent()}this._mNavContext=null};M.prototype.onBeforeRendering=function(){this._destroyPageContent();this._createPageContent()};M.prototype.getPageContent=function(){return this._mPageContent};M.prototype.setNavContext=function(e){this._mNavContext=e};M.prototype.getNavContext=function(){return this._mNavContext};M.prototype.setPageTitleControl=function(e){this._oPageTitle=e};M.prototype.getPageTitleControl=function(){return this._oPageTitle};M.prototype._createPage=function(){var e=this._createPageContent();var t=this.getNavContext();var a;if(this._oPage){a=this._oPage;a.destroyContent();a.setCustomHeader(new l)}else{a=this._oPage=new p(t.quickViewId+"-"+this.getPageId(),{customHeader:new l});a.addEventDelegate({onAfterRendering:this.onAfterRenderingPage},this)}if(this.getHeader()===""&&t.quickView.getPages().length===1&&!P.system.phone){a.setShowHeader(false);a.addStyleClass("sapMQuickViewPageWithoutHeader")}if(e.header){a.addContent(e.header)}a.addContent(e.form);var o=a.getCustomHeader();o.addContentMiddle(new u({text:this.getHeader()}).addStyleClass("sapMQuickViewTitle"));if(t.hasBackButton){o.addContentLeft(new g({type:T.Back,tooltip:H.getText("PAGE_NAVBUTTON_TEXT"),press:function(){if(t.navContainer){t.quickView._setNavOrigin(null);t.navContainer.back()}}}))}if(t.popover&&P.system.phone){o.addContentRight(new g({icon:i.getIconURI("decline"),press:function(){t.popover.close()}}))}a.addStyleClass("sapMQuickViewPage");return a};M.prototype.onAfterRenderingPage=function(){var e=this.getParent(),t=e instanceof a&&e.isA("sap.m.QuickView");if(t&&!this._oPage.$().firstFocusableDomRef()){this._oPage.$("cont").attr("tabindex",0)}if(this._bItemsChanged){var i=this.getNavContext();if(i){i.quickView._restoreFocus()}this._bItemsChanged=false}};M.prototype._createPageContent=function(){var e=this._createForm();var t=this._getPageHeaderContent();var a=this.getPageTitleControl();if(t&&a){e.addAriaLabelledBy(a)}this._mPageContent={form:e,header:t};return this._mPageContent};M.prototype._createForm=function(){var e=this.getAggregation("groups"),t=new o({maxContainerCols:1,editable:false,layout:N.ResponsiveGridLayout});if(e){for(var a=0;a<e.length;a++){if(e[a].getVisible()){this._renderGroup(e[a],t)}}}return t};M.prototype._getPageHeaderContent=function(){var e=this._getAvatar(),t=new r,a=new n,i=this.getIcon&&this.getIcon(),o=this.getTitle(),s=this.getDescription(),p=this.getTitleUrl();if(!e&&!i&&!o&&!s){return null}if(e){a.addContent(e)}var g;if(p){g=new c({text:o,href:p,target:"_blank"})}else if(this.getCrossAppNavCallback&&this.getCrossAppNavCallback()){g=new c({text:o});g.attachPress(this._crossApplicationNavigation.bind(this))}else{g=new u({text:o,level:x.H3})}this.setPageTitleControl(g);var l=new d({text:s});t.addContent(g);t.addContent(l);a.addContent(t);return a};M.prototype._renderGroup=function(e,t){var a=e.getAggregation("elements");var o,r,n;if(e.getHeading()){t.addContent(new y({text:e.getHeading(),level:x.H4}))}if(!a){return}var s=this.getNavContext();for(var p=0;p<a.length;p++){o=a[p];if(!o.getVisible()){continue}n=new h({text:o.getLabel()});var g;if(s){g=s.quickViewId}r=o._getGroupElementValue(g);t.addContent(n);if(!r){t.addContent(new d({text:"",emptyIndicatorMode:L.On}));continue}n.setLabelFor(r.getId());if(o.getType()==I.pageLink){r.attachPress(this._attachPressLink(this))}if(o.getType()==I.mobile&&!P.system.desktop){var l=new v({src:i.getIconURI("post"),tooltip:H.getText("QUICKVIEW_SEND_SMS"),decorative:false,customData:[new C({key:"phoneNumber",value:o.getValue()})],press:this._mobilePress});var u=new f({items:[r,l]});t.addContent(u)}else{t.addContent(r)}}};M.prototype._crossApplicationNavigation=function(){if(this.getCrossAppNavCallback&&this.getCrossAppNavCallback()&&this.oCrossAppNavigator){var e=this.getCrossAppNavCallback();if(typeof e=="function"){var t=e();var a=this.oCrossAppNavigator.hrefForExternal({target:{semanticObject:t.target.semanticObject,action:t.target.action},params:t.params});V.redirect(a)}}else if(this.getTitleUrl()){V.redirect(this.getTitleUrl(),true)}};M.prototype._destroyPageContent=function(){if(!this._mPageContent){return}if(this._mPageContent.form){this._mPageContent.form.destroy()}if(this._mPageContent.header){this._mPageContent.header.destroy()}this._mPageContent=null};M.prototype._attachPressLink=function(e){var t=e.getNavContext();return function(e){e.preventDefault();var a=this.getCustomData()[0].getValue();if(t.navContainer&&a){t.quickView._setNavOrigin(this);t.navContainer.to(a)}}};M.prototype._mobilePress=function(){var e="sms://"+A(this.getCustomData()[0].getValue());window.location.replace(e)};M.prototype._updatePage=function(){var e=this.getNavContext();if(e&&e.quickView._bRendered){this._bItemsChanged=true;e.popover.focus();if(e.quickView.indexOfPage(this)==0){e.quickView._clearContainerHeight()}this._createPage();e.popover.$().css("display","block");e.quickView._adjustContainerHeight();e.quickView._restoreFocus()}};["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(e){M.prototype[e]=function(){var t=a.prototype[e].apply(this,arguments);this._updatePage();if(["removeAggregation","removeAllAggregation"].indexOf(e)!==-1){return t}return this}});M.prototype.setProperty=function(){a.prototype.setProperty.apply(this,arguments);this._updatePage();return this};M.prototype.getQuickViewBase=function(){var e=this.getParent();if(e&&e.isA("sap.m.QuickViewBase")){return e}return null};M.prototype._getAvatar=function(){var e=null,t=this.getIcon&&this.getIcon();if(this.getAvatar()){e=this.getAvatar().clone(null,null,{cloneBindings:false,cloneChildren:true});this._checkAvatarProperties(e)}else if(t&&this.getFallbackIcon){e=new s({displayShape:S.Square,fallbackIcon:this.getFallbackIcon(),src:t})}if(e){if(this.getTitleUrl()&&!e.hasListeners("press")){e.attachPress(this._crossApplicationNavigation.bind(this))}e.addStyleClass("sapMQuickViewThumbnail")}return e};M.prototype._checkAvatarProperties=function(e){var t=e.getMetadata().getPropertyDefaults();if(e.getDisplaySize()!==t["displaySize"]){k.warning("'displaySize' property of avatar shouldn't be used in sap.m.QuickViewPage")}if(e.getCustomDisplaySize()!==t["customDisplaySize"]){k.warning("'customDisplaySize' property of avatar shouldn't be used in sap.m.QuickViewPage")}if(e.getCustomFontSize()!==t["customFontSize"]){k.warning("'customFontSize' property of avatar shouldn't be used in sap.m.QuickViewPage")}if(e.getDetailBox()){k.warning("'detailBox' aggregation of avatar shouldn't be used in sap.m.QuickViewPage")}};return M});