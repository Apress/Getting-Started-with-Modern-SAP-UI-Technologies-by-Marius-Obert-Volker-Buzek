/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/m/Dialog","sap/ui/core/HTML"],function(e,l,o){"use strict";var a={toggleFullScreen:function(a,n,i,r,t,g){var c;if(n){c=a.$();c.css("height","100%");if(c){if(!a._oHTML){a._oHTML=new o({preferDOM:false,afterRendering:function(){if(a&&a._oHTML){var e=a._oHTML.$(),l;if(e){l=e.children();l.remove();e.css("height","100%");e.append(a.getDomRef())}}}})}if(!a._oFullScreenDialog){a._oFullScreenDialog=new l({showHeader:false,stretch:true,horizontalScrolling:!g,verticalScrolling:!g,beforeClose:function(){if(a&&a._$placeHolder&&r){r.call(a,false)}},content:[a._oHTML]});if(t){a._oFullScreenDialog.addStyleClass(t)}if(i){a._oFullScreenDialog.attachAfterOpen(function(){i.focus();if(a._oGrowingDelegate&&a._oGrowingDelegate.onAfterRendering){a._oOldParent=a.oParent;a.oParent=a._oFullScreenDialog;a._oGrowingDelegate.onAfterRendering();a.oParent=a._oOldParent;delete a._oOldParent}});a._oFullScreenDialog.attachAfterClose(function(){i.focus()})}a._oFullScreenDialog.addStyleClass(c.closest(".sapUiSizeCompact").length?"sapUiSizeCompact":"");a._oFullScreenDialog.addStyleClass("sapUiCompSmartFullScreenDialog")}a._$placeHolder=e(document.createElement("div"));c.before(a._$placeHolder);a._oHTML.setContent("<div></div>")}if(!a._oGrowingDelegate){a._oGrowingDelegate=a._oTable||a._oList;if(a._oGrowingDelegate&&a._oGrowingDelegate.getGrowingScrollToLoad&&a._oGrowingDelegate.getGrowingScrollToLoad()){a._oGrowingDelegate=a._oGrowingDelegate._oGrowingDelegate}else{a._oGrowingDelegate=null}}if(a._oTable&&a._oTable.isA("sap.ui.table.Table")){a._oFullScreenDialog.attachEventOnce("afterOpen",function(){a._oTable.invalidate()})}a._oFullScreenDialog.open()}else if(a._$placeHolder&&a._oHTML){var _=a.getHeight&&a.getHeight();var u=a.$();if(_&&_!==u.css("height")){u.css("height",_)}c=a._oHTML.$();a._$placeHolder.replaceWith(c.children());a._$placeHolder=null;c=null;if(a._oFullScreenDialog){a._oFullScreenDialog.close()}}},cleanUpFullScreen:function(e){if(e._oFullScreenDialog){e._oFullScreenDialog.destroy();e._oFullScreenDialog=null}e._$placeHolder=null;e._oHTML=null;e._oGrowingDelegate=null}};return a},true);