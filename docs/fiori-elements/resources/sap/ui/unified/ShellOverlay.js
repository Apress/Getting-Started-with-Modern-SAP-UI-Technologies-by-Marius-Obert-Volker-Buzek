/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Control","sap/ui/core/Popup","./library","sap/ui/core/theming/Parameters","./ShellOverlayRenderer","sap/ui/thirdparty/jquery","sap/ui/core/Configuration","sap/ui/dom/jquery/rect","sap/ui/dom/jquery/Selectors"],function(e,t,i,n,r,o,s,a){"use strict";var u=t.extend("sap.ui.unified.ShellOverlay",{metadata:{library:"sap.ui.unified",deprecated:true,defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},search:{type:"sap.ui.core.Control",multiple:false}},associations:{shell:{type:"sap.ui.unified.ShellLayout",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{closed:{}}},renderer:o});u.prototype.open=function(){if(this._getPopup().isOpen()){return}this._opening=true;this._forceShellHeaderVisible();this._getPopup().setModal(true,i.blStack.length==0&&this._getAnimActive()?"sapUiUfdShellOvrlyBly sapUiUfdShellOvrlyBlyTp":"");this._getPopup().open(0,i.Dock.BeginTop,i.Dock.BeginTop,window,"0 0","none");var e=this.getSearch();if(e){e.focus()}this._opening=false;if(this._getAnimActive()){setTimeout(function(){s(document.getElementById("sap-ui-blocklayer-popup")).toggleClass("sapUiUfdShellOvrlyBlyTp",false)},50)}setTimeout(function(){this.$().toggleClass("sapUiUfdShellOvrlyOpening",false)}.bind(this),this._getAnimDuration(true))};u.prototype.close=function(){if(!this._getPopup().isOpen()){return}this.$().toggleClass("sapUiUfdShellOvrlyCntntHidden",true).toggleClass("sapUiUfdShellOvrlyClosing",true);this._setSearchWidth();setTimeout(function(){var e=s(document.getElementById("sap-ui-blocklayer-popup"));if(i.blStack.length==1&&this._getAnimActive()&&e.hasClass("sapUiUfdShellOvrlyBly")){e.toggleClass("sapUiUfdShellOvrlyBlyTp",true)}}.bind(this),Math.max(this._getAnimDuration(false)-this._getBLAnimDuration(),0));setTimeout(function(){this._getPopup().close(0);this.$().remove();this._forceShellHeaderVisible();this.fireClosed()}.bind(this),this._getAnimDuration(false))};u.prototype.setShell=function(e){return this.setAssociation("shell",e,true)};u.prototype.setSearch=function(e){this.setAggregation("search",e,true);if(this.getDomRef()){this._headRenderer.render()}return this};u.prototype.insertContent=function(e,t){var i=this.insertAggregation("content",e,t,true);if(this.getDomRef()){this._contentRenderer.render()}return i};u.prototype.addContent=function(e){var t=this.addAggregation("content",e,true);if(this.getDomRef()){this._contentRenderer.render()}return t};u.prototype.removeContent=function(e){var t=this.removeAggregation("content",e,true);if(this.getDomRef()){this._contentRenderer.render()}return t};u.prototype.removeAllContent=function(){var e=this.removeAllAggregation("content",true);if(this.getDomRef()){this._contentRenderer.render()}return e};u.prototype.destroyContent=function(){var e=this.destroyAggregation("content",true);if(this.getDomRef()){this._contentRenderer.render()}return e};u.prototype.init=function(){this._animOpenDuration=-1;this._animCloseDuration=-1;this._animBlockLayerDuration=-1;this._animation=a.getAnimation();this._opening=false;var e=this;this._headRenderer=new n._ContentRenderer(this,this.getId()+"-hdr-center",function(t){o.renderSearch(t,e)});this._contentRenderer=new n._ContentRenderer(this,this.getId()+"-cntnt",function(t){o.renderContent(t,e)})};u.prototype.exit=function(){if(this._popup){this._popup.close(0);this._popup.destroy();this._popup=null}this._getPopup=function(){return null};this._headRenderer.destroy();delete this._headRenderer;this._contentRenderer.destroy();delete this._contentRenderer};u.prototype.onAfterRendering=function(){if(this._opening){this._setSearchWidth()}setTimeout(function(){this.$().toggleClass("sapUiUfdShellOvrlyCntntHidden",false);this.$("search").css("width","")}.bind(this),10)};u.prototype.onclick=function(e){if(s(e.target).attr("id")===this.getId()+"-close"){this.close();e.preventDefault()}};u.prototype.onsapspace=u.prototype.onclick;u.prototype.onThemeChanged=function(){this._animOpenDuration=-1;this._animCloseDuration=-1;this._animBlockLayerDuration=-1};u.prototype.onfocusin=function(e){var t,i;if(e.target.id==this.getId()+"-focfirst"){t=s(":sapTabbable",this.$("inner"));i=t.get(t.length-1)}else if(e.target.id==this.getId()+"-foclast"){t=s(":sapTabbable",this.$("inner"));i=t.get(0)}if(i){i.focus()}};u.prototype._getAnimDurationThemeParam=function(e,t){var i=parseInt(r.get(e));if(!this._getAnimActive()&&t){i=0}return i};u.prototype._getAnimDuration=function(e){if(e&&this._animOpenDuration==-1||!e&&this._animCloseDuration==-1){var t=e?"Open":"Close";this["_anim"+t+"Duration"]=this._getAnimDurationThemeParam("_sap_ui_unified_ShellOverlay_"+t+"AnimOverAll",true)}return e?this._animOpenDuration:this._animCloseDuration};u.prototype._getBLAnimDuration=function(){if(this._animBlockLayerDuration==-1){this._animBlockLayerDuration=this._getAnimDurationThemeParam("_sap_ui_unified_ShellOverlay_BlockLayerAnimDuration",true)}return this._animBlockLayerDuration};u.prototype._getAnimActive=function(){if(!this._animation){return false}return true};u.prototype._getPopup=function(){if(!this._popup){this._popup=new i(this,true,false,false);this._popup._applyPosition=function(e){this._$().css("left","0").css("top","0");this._oLastPosition=e;this._oLastOfRect=s(window).rect()};this._popup.attachOpened(function(){n._iNumberOfOpenedShellOverlays++});this._popup.attachClosed(function(){n._iNumberOfOpenedShellOverlays--})}return this._popup};u.prototype._getShell=function(){var e=this.getShell();if(!e){return}var t=sap.ui.getCore().byId(e);if(!t||!(t instanceof sap.ui.unified.ShellLayout)){return}return t};u.prototype._forceShellHeaderVisible=function(){var e=this._getShell();if(e){e._doShowHeader(true)}};u.prototype._getSearchWidth=function(){var e=this._getShell();return e?e._getSearchWidth():-1};u.prototype._setSearchWidth=function(){var t=this._getSearchWidth();if(t<=0){return}var i=t+"px";if(e.browser.safari){var n=this.$("hdr-center").width();if(n>t){i=Math.round(t*100/n)+"%"}else{i="100%"}}this.$("search").css("width",i)};return u});