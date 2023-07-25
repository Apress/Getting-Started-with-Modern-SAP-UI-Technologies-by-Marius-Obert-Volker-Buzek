/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/m/Link","./LinkData","sap/ui/core/Control","./SemanticObjectController","./NavigationPopoverHandler","sap/ui/model/json/JSONModel","sap/ui/comp/personalization/Util","./Util","sap/base/Log","./SmartLinkRenderer"],function(t,e,i,n,o,a,r,s,l,p,c){"use strict";var g=e.extend("sap.ui.comp.navpopover.SmartLink",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/navpopover/SmartLink.designtime",properties:{semanticObject:{type:"string",defaultValue:null},additionalSemanticObjects:{type:"string[]",defaultValue:[]},semanticObjectController:{type:"any",defaultValue:null},fieldName:{type:"string",defaultValue:null},semanticObjectLabel:{type:"string",defaultValue:null},createControlCallback:{type:"object",defaultValue:null},mapFieldToSemanticObject:{type:"boolean",defaultValue:true},contactAnnotationPath:{type:"string",defaultValue:undefined},ignoreLinkRendering:{type:"boolean",defaultValue:false},enableAvailableActionsPersonalization:{type:"boolean",defaultValue:true},forceLinkRendering:{type:"boolean",defaultValue:false},uom:{type:"string",defaultValue:undefined},beforeNavigationCallback:{type:"function"}},aggregations:{innerControl:{type:"sap.ui.core.Control",multiple:false}},events:{beforePopoverOpens:{parameters:{semanticObject:{type:"string"},semanticAttributes:{type:"object"},semanticAttributesOfSemanticObjects:{type:"object"},setSemanticAttributes:{type:"function"},setAppStateKey:{type:"function"},originalId:{type:"string"},open:{type:"function"}}},navigationTargetsObtained:{parameters:{mainNavigation:{type:"sap.ui.comp.navpopover.LinkData"},actions:{type:"sap.ui.comp.navpopover.LinkData[]"},ownNavigation:{type:"sap.ui.comp.navpopover.LinkData"},popoverForms:{type:"sap.ui.layout.form.SimpleForm[]"},semanticObject:{type:"string"},semanticAttributes:{type:"object"},originalId:{type:"string"},show:{type:"function"}}},innerNavigate:{parameters:{text:{type:"string"},href:{type:"string"},semanticObject:{type:"string"},semanticAttributes:{type:"object"},originalId:{type:"string"}}}}}});g.prototype.getInnerControlValue=function(){if(this._isRenderingInnerControl()){var t=this._getInnerControl();if(t){if(t.getText){return t.getText()}if(t.getValue){return t.getValue()}}}return this.getText()};g.prototype.getNavigationPopoverHandler=function(){return this._createNavigationPopoverHandler()};g.prototype.init=function(){o.prefetchDistinctSemanticObjects();this._oNavigationPopoverHandler=null;this.attachPress(this._onLinkPressed);this.addStyleClass("sapUiCompSmartLink");this.setText(this.getText())};g.prototype.applySettings=function(e){t.prototype.applySettings.apply(this,arguments);this._updateEnabled()};g.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);this.getDomRef().setAttribute("aria-hidden",!this.getText())};g.prototype.updateBindingContext=function(){n.prototype.updateBindingContext.apply(this,arguments);this.setHref(null);this.setTarget(null);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setBindingContext(this.getBindingContext())}};g.prototype._getTextOfDom=function(){if(!this.getDomRef()){return""}if(this.$().find("span").length===2){return this.$().find("span")[0].textContent+this.$().find("span")[1].textContent}else{return this.$()[0].textContent}};g.prototype.setText=function(t){if(this._isRenderingInnerControl()){this.setProperty("text",t,true)}else{e.prototype.setText.call(this,t)}return this};g.prototype.setMapFieldToSemanticObject=function(t){this.setProperty("mapFieldToSemanticObject",t);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setMapFieldToSemanticObject(t)}return this};g.prototype.setSemanticObject=function(t){this.setProperty("semanticObject",t);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setSemanticObject(t)}this._updateEnabled();return this};g.prototype.setAdditionalSemanticObjects=function(t){this.setProperty("additionalSemanticObjects",t);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setAdditionalSemanticObjects(t)}this._updateEnabled();return this};g.prototype.setBeforeNavigationCallback=function(t){this.setProperty("beforeNavigationCallback",t);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setBeforeNavigationCallback(t)}return this};g.prototype.setContactAnnotationPath=function(t){this.setProperty("contactAnnotationPath",t);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setContactAnnotationPath(t)}this._updateEnabled();return this};g.prototype.setEnableAvailableActionsPersonalization=function(t){this.setProperty("enableAvailableActionsPersonalization",t);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setEnableAvailableActionsPersonalization(t)}return this};g.prototype.setIgnoreLinkRendering=function(t){this.setProperty("ignoreLinkRendering",t);this._updateEnabled();return this};g.prototype.setFieldName=function(t){this.setProperty("fieldName",t);if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setFieldName(t)}this._updateEnabled();return this};g.prototype.setSemanticObjectController=function(t){if(t&&!t.isA("sap.ui.comp.navpopover.SemanticObjectController")){p.warning("Warning: setSemanticObjectController() has to be an object of sap.ui.comp.navpopover.SemanticObjectController instances",this);return this}var e=this.getProperty("semanticObjectController");if(e===t){return this}if(e){e.unregisterControl(this)}this.setProperty("semanticObjectController",t,true);if(t){if(this.hasListeners("navigationTargetsObtained")&&t.getReplaceSmartLinkNavigationTargetsObtained()&&t.hasListeners("navigationTargetsObtained")){this.mEventRegistry.navigationTargetsObtained.forEach(function(t){this.detachNavigationTargetsObtained(t.fFunction)}.bind(this))}t.registerControl(this);if(!this.getBeforeNavigationCallback()){this.setBeforeNavigationCallback(t.getBeforeNavigationCallback())}}if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.setSemanticObjectController(t)}this._updateEnabled();return this};g.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.apply(this,arguments);if(!this.getSemanticObjectController()){var t=this._getSemanticObjectControllerOfParent();if(t){this.setSemanticObjectController(t)}}};g.prototype.exit=function(){if(this.getSemanticObjectController()){this.getSemanticObjectController().unregisterControl(this)}if(this._oNavigationPopoverHandler){this._oNavigationPopoverHandler.destroy();this._oNavigationPopoverHandler=null}};g.prototype._onLinkPressed=function(t){this._createNavigationPopoverHandler().openPopover()};g.prototype._createNavigationPopoverHandler=function(){if(!this._oNavigationPopoverHandler){if(!this.getFieldName()){var t=this.getBinding("text");var e;if(t){if(t.getBindings){e=t.getBindings()[0].getPath()}else{e=t.getPath()}}this.setFieldName(e)}this._oNavigationPopoverHandler=new a({semanticObject:this.getSemanticObject(),semanticObjectLabel:this.getSemanticObjectLabel(),additionalSemanticObjects:this.getAdditionalSemanticObjects(),semanticObjectController:this.getSemanticObjectController(),fieldName:this.getFieldName(),mapFieldToSemanticObject:this.getMapFieldToSemanticObject(),contactAnnotationPath:this.getContactAnnotationPath(),enableAvailableActionsPersonalization:this.getEnableAvailableActionsPersonalization(),control:this,beforePopoverOpens:this._onBeforePopoverOpens.bind(this),navigationTargetsObtained:this._onNavigationTargetsObtained.bind(this),innerNavigate:this._onInnerNavigate.bind(this),beforeNavigationCallback:this.getBeforeNavigationCallback()});this._oNavigationPopoverHandler.setModel(this.getModel());this._oNavigationPopoverHandler.isPopupAdaptationAllowed=function(){return false}}return this._oNavigationPopoverHandler};g.prototype._onNavigationTargetsObtained=function(t){var e=t.getParameters();if(!this.hasListeners("navigationTargetsObtained")){e.show();return}this.fireNavigationTargetsObtained({mainNavigation:e.mainNavigation,actions:e.actions,ownNavigation:e.ownNavigation,popoverForms:e.popoverForms,semanticObject:e.semanticObject,semanticAttributes:e.semanticAttributes,originalId:e.originalId,show:e.show})};g.prototype._onBeforePopoverOpens=function(t){var e=t.getParameters();if(!this.hasListeners("beforePopoverOpens")){e.open();return}this.fireBeforePopoverOpens({originalId:e.originalId,semanticObject:e.semanticObject,semanticAttributes:e.semanticAttributes,semanticAttributesOfSemanticObjects:e.semanticAttributesOfSemanticObjects,setSemanticAttributes:e.setSemanticAttributes,setAppStateKey:e.setAppStateKey,open:e.open})};g.prototype._onInnerNavigate=function(t){var e=t.getParameters();if(!this.hasListeners("innerNavigate")){return}this.fireInnerNavigate({text:e.text,href:e.href,internalHref:e.internalHref,originalId:e.originalId,semanticObject:e.semanticObject,semanticAttributes:e.semanticAttributes})};g.prototype._isRenderingInnerControl=function(){return this.getIgnoreLinkRendering()&&this._getInnerControl()!==null};g.prototype._getInnerControl=function(){var t=this.getAggregation("innerControl");if(t){return t}var e=this.getCreateControlCallback();if(e){t=e();this.setAggregation("innerControl",t,true);return t}return null};g.prototype._getSemanticObjectControllerOfParent=function(){var t;var e=this.getParent();while(e){if(e.getSemanticObjectController){t=e.getSemanticObjectController();if(t){this.setSemanticObjectController(t);break}}e=e.getParent()}return t};g.prototype._updateEnabled=function(){var t=this;return o.getDistinctSemanticObjects().then(function(e){if(t.getSemanticObjectController()&&s.createArrayFromString(t.getSemanticObjectController().getIgnoredFields()).indexOf(t.getFieldName())>-1){t.setEnabled(false);return}if(t.getIgnoreLinkRendering()===true){t.setEnabled(false);return}if(l.getForceLinkRendering(t,t.getSemanticObjectController())){t.setEnabled(true);return}if(!o.hasDistinctSemanticObject(t.getAdditionalSemanticObjects().concat(t.getSemanticObject()),e)&&l.getContactAnnotationPath(t,t.getSemanticObjectController())===undefined){t.setEnabled(false);return}t.setEnabled(true)})};g.prototype.getAccessibilityInfo=function(){var t=this.getEnabled()?e.prototype.getAccessibilityInfo.apply(this,arguments):{description:this.getText()||this.getHref()||""};if(this.getUom()&&t.description&&t.description!==""&&!t.description.includes(this.getUom())){t.description+=this.getUom()}return t};return g});