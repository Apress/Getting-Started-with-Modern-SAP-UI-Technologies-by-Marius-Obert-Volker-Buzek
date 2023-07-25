/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/FieldInfoBase","sap/ui/thirdparty/jquery","sap/ui/model/BindingMode","sap/ui/model/json/JSONModel","sap/ui/mdc/link/Log","sap/base/Log","sap/ui/mdc/link/Panel","sap/ui/mdc/link/PanelItem","sap/ui/layout/form/SimpleForm","sap/ui/core/Title","sap/ui/layout/library"],function(e,t,i,n,o,r,a,s,l,d,u){"use strict";var p=u.form.SimpleFormLayout.ResponsiveGridLayout;var h=e.extend("sap.ui.mdc.Link",{metadata:{library:"sap.ui.mdc",properties:{enablePersonalization:{type:"boolean",defaultValue:true},delegate:{type:"object",defaultValue:{name:"sap/ui/mdc/LinkDelegate",payload:{}}}},associations:{sourceControl:{type:"sap.ui.core.Control",multiple:false}}}});h.prototype.applySettings=function(){e.prototype.applySettings.apply(this,arguments);this.initControlDelegate()};h.prototype.init=function(){var t=new n({contentTitle:undefined,linkItems:[]});t.setDefaultBindingMode(i.TwoWay);t.setSizeLimit(1e3);this.setModel(t,"$sapuimdcLink");this.attachEvent("modelContextChange",this.fireDataUpdate,this);this._oLinkType=null;this._bLinkItemsFetched=false;this._aLinkItems=[];e.prototype.init.apply(this,arguments)};h.prototype.exit=function(){this._aLinkItems=undefined;this._bLinkItemsFetched=undefined;this._oLinkType=undefined;this._oUseDelegateItemsPromise=undefined;this._aAdditionalContent=undefined;this._oUseDelegateAdditionalContentPromise=undefined;e.prototype.exit.apply(this,arguments)};h.prototype.isTriggerable=function(){return this.retrieveLinkType().then(function(e){if(!e){return false}var t=e.runtimeType;var i=e.initialType?e.initialType:e;if(t&&t instanceof Promise){t.then(function(e){if(!this._oLinkType||e.linkType!==this._oLinkType.linkType){this._oLinkType=e;this.fireDataUpdate()}}.bind(this))}return this._oLinkType?this._oLinkType.type>0:i.type>0}.bind(this))};h.prototype.getTriggerHref=function(){return this.getDirectLinkHrefAndTarget().then(function(e){return e?e.href:null})};h.prototype.getDirectLinkHrefAndTarget=function(){return this._retrieveDirectLinkItem().then(function(e){if(this.isDestroyed()){return null}this.addDependent(e);return e?{target:e.getTarget(),href:e.getHref()}:null}.bind(this))};h.prototype._retrieveDirectLinkItem=function(){return this.retrieveLinkType().then(function(e){if(!e){return null}if(this._linkTypeHasDirectLink(this._oLinkType)){return this._oLinkType.directLink}var t=e.initialType?e.initialType:e;if(this._linkTypeHasDirectLink(t)){return t.directLink}return null}.bind(this))};h.prototype._linkTypeHasDirectLink=function(e){return e&&e.type===1&&e.directLink};h.prototype.getContent=function(e){var i=this.retrieveLinkItems();var o=this.retrieveAdditionalContent();return Promise.all([i,o]).then(function(i){var o=i[0];var r=i[1];return new Promise(function(i){sap.ui.require(["sap/ui/fl/Utils","sap/ui/fl/apply/api/FlexRuntimeInfoAPI"],function(l,d){this._setConvertedLinkItems(o);var u=this._getInternalModel().getProperty("/linkItems");var p=this._getInternalModel().getProperty("/baselineLinkItems");var h=!r.length&&!u.length?this._getNoContent():r;var g=this._createPanelId(l,d);var f=sap.ui.getCore().byId(g);if(f){if(f.getParent()&&f.getParent().close){f.getParent().close()}f.destroy()}var c=new a(g,{enablePersonalization:this.getEnablePersonalization(),items:p.map(function(e){return new s(e.key,{text:e.text,description:e.description,href:e.href,internalHref:e.internalHref,target:e.target,icon:e.icon,visible:true})}),additionalContent:h,beforeSelectionDialogOpen:function(){if(e&&e()){e().setModal(true)}},afterSelectionDialogClose:function(){if(e&&e()){e().setModal(false)}},beforeNavigationCallback:this._beforeNavigationCallback.bind(this),metadataHelperPath:"sap/ui/mdc/Link"});c.setModel(new n({metadata:t.extend(true,[],this._getInternalModel().getProperty("/linkItems")),baseline:t.extend(true,[],this._getInternalModel().getProperty("/baselineLinkItems"))}),"$sapuimdcLink");this._setAdditionalContent(undefined);return i(c)}.bind(this))}.bind(this))}.bind(this))};h.prototype.checkDirectNavigation=function(){var e=this.retrieveLinkItems();var t=this.retrieveAdditionalContent();return Promise.all([e,t]).then(function(e){var t=e[0];var i=e[1];this._setConvertedLinkItems(t);var n=this._getInternalModel().getProperty("/linkItems");if(n.length===1&&!i.length){a.navigate(n[0].href);return Promise.resolve(true)}return Promise.resolve(false)}.bind(this))};h.prototype._setConvertedLinkItems=function(e){var t=this._getInternalModel();var i=e.map(function(e){if(!e.getKey()){r.error("sap.ui.mdc.Link: undefined 'key' property of the LinkItem "+e.getId()+". The mandatory 'key' property should be defined due to personalization reasons.")}return{key:e.getKey(),text:e.getText(),description:e.getDescription(),href:e.getHref(),internalHref:e.getInternalHref(),target:e.getTarget(),icon:e.getIcon(),initiallyVisible:e.getInitiallyVisible(),visible:false}});t.setProperty("/linkItems/",i);var n=i.filter(function(e){return e.initiallyVisible});t.setProperty("/baselineLinkItems/",n)};h.prototype._getNoContent=function(){var e=new l({layout:p,content:[new d({text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("info.POPOVER_MSG_NO_CONTENT")})]});e.addStyleClass("mdcbaseinfoPanelDefaultAdditionalContent");return e};h.prototype._createPanelId=function(e,t){var i;if(this.getParent()){i=this.getParent()}var n=this._getSourceControl();if(!n){this.setSourceControl(i);n=i}if(!t.isFlexSupported({element:this})||!t.isFlexSupported({element:n})){r.error("Invalid component. The mandatory 'sourceControl' association should be assigned to the app component due to personalization reasons.");return this.getId()+"-idInfoPanel"}var o=e.getAppComponentForControl(n)||e.getAppComponentForControl(i);return o.createId("idInfoPanel")};h.retrieveAllMetadata=function(e){if(!e.getModel||!e.getModel("$sapuimdcLink")){return[]}var t=e.getModel("$sapuimdcLink");return t.getProperty("/metadata").map(function(e){return{id:e.key,text:e.text,description:e.description,href:e.href,internalHref:e.internalHref,target:e.target,visible:e.visible}})};h.retrieveBaseline=function(e){if(!e.getModel||!e.getModel("$sapuimdcLink")){return[]}var t=e.getModel("$sapuimdcLink");return t.getProperty("/baseline").map(function(e){return{id:e.key,visible:true}})};h.prototype._getInfoLog=function(){if(this.getPayload()&&this.getPayload().semanticObjects){if(this._oInfoLog){return this._oInfoLog}if(r.getLevel()>=r.Level.INFO){this._oInfoLog=new o;this._oInfoLog.initialize(this.getPayload().semanticObjects,this._getContextObject(this._getControlBindingContext()));return this._oInfoLog}}return undefined};h.prototype._getContextObject=function(e){return e?e.getObject(e.getPath()):undefined};h.prototype.retrieveAdditionalContent=function(){if(this._aAdditionalContent){return Promise.resolve(this._aAdditionalContent)}else{this._oUseDelegateAdditionalContentPromise=this._useDelegateAdditionalContent();return this._oUseDelegateAdditionalContentPromise.then(function(){return Promise.resolve(this._aAdditionalContent)}.bind(this))}};h.prototype._useDelegateAdditionalContent=function(){if(this.awaitControlDelegate()){return this.awaitControlDelegate().then(function(){var e=Object.assign({},this.getPayload());return new Promise(function(t){this.getControlDelegate().fetchAdditionalContent(e,this).then(function(e){this._setAdditionalContent(e===null?[]:e);t()}.bind(this))}.bind(this))}.bind(this))}r.error("mdc.Link retrieveAdditionalContent: control delegate is not set - could not load AdditionalContent from delegate.");return Promise.resolve([])};h.prototype._setAdditionalContent=function(e){this._aAdditionalContent=e};h.prototype.retrieveLinkType=function(){if(this.awaitControlDelegate()){return this.awaitControlDelegate().then(function(){var e=Object.assign({},this.getPayload());return this._bIsBeingDestroyed?Promise.resolve():this.getControlDelegate().fetchLinkType(e,this)}.bind(this))}r.error("mdc.Link retrieveLinkType: control delegate is not set - could not load LinkType from delegate.");return Promise.resolve(null)};h.prototype.retrieveLinkItems=function(){var e=Object.assign({},this.getPayload());var t=this._getControlBindingContext();return this._retrieveUnmodifiedLinkItems().then(function(i){return this.getControlDelegate().modifyLinkItems(e,t,i).then(function(e){return e})}.bind(this))};h.prototype._retrieveUnmodifiedLinkItems=function(){if(this._bLinkItemsFetched){return Promise.resolve(this._aLinkItems)}else{this._oUseDelegateItemsPromise=this._useDelegateItems();return this._oUseDelegateItemsPromise.then(function(){return Promise.resolve(this._aLinkItems)}.bind(this))}};h.prototype._useDelegateItems=function(){if(this.awaitControlDelegate()){return this.awaitControlDelegate().then(function(){var e=Object.assign({},this.getPayload());var t=this._getControlBindingContext();var i=this._getInfoLog();return new Promise(function(n){this.getControlDelegate().fetchLinkItems(e,t,i).then(function(e){this._setLinkItems(e===null?[]:e);this._bLinkItemsFetched=e!==null;n()}.bind(this))}.bind(this))}.bind(this))}r.error("mdc.Link _useDelegateItems: control delegate is not set - could not load LinkItems from delegate.");return Promise.resolve()};h.prototype._setLinkItems=function(e){var t=e.filter(function(e){return e.getParent()===null});t.forEach(function(e){this.addDependent(e)}.bind(this));this._aLinkItems=e};h.prototype._beforeNavigationCallback=function(e){if(this.awaitControlDelegate()){var t=Object.assign({},this.getPayload());return this.getControlDelegate().beforeNavigationCallback(t,e)}r.error("mdc.Link _beforeNavigationCallback: control delegate is not set - could not load beforeNavigationCallback from delegate.");return Promise.resolve()};h.prototype._getControlBindingContext=function(){var e=this._getSourceControl();return e&&e.getBindingContext()||this.getBindingContext()};h.prototype._getInternalModel=function(){return this.getModel("$sapuimdcLink")};h.prototype._getSourceControl=function(){return typeof this.getSourceControl()==="string"?sap.ui.getCore().byId(this.getSourceControl()):this.getSourceControl()};return h});