/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/ui/core/library","sap/ui/dom/includeScript","sap/ui/integration/cards/BaseContent","sap/ui/integration/cards/adaptivecards/elements/hostConfig","sap/m/VBox","sap/ui/core/HTML","sap/ui/core/Core","sap/ui/model/json/JSONModel","sap/base/Log"],function(t,e,n,i,a,r,o,s,d,p){"use strict";var u,l,c,g,h,f,C,m,y,v;var _=e.MessageType;var b=i.extend("sap.ui.integration.cards.AdaptiveContent",{metadata:{library:"sap.ui.integration"},renderer:{apiVersion:2,render:function(t,e){var n=i.getMetadata().getRenderer();return n.render.apply(this,arguments)}}});b.prototype.init=function(){i.prototype.init.apply(this,arguments);this.awaitEvent("_adaptiveCardElementsReady");this.fireEvent("_actionContentReady");this.setComponentsReady(false);this._setupCardContent()};b.prototype.onAfterRendering=function(){this._renderMSCardContent(this._oCardTemplate||this.getConfiguration())};b.prototype.loadDependencies=function(t){var e=[this._loadWebcomponents()];e.push(new Promise(function(t,e){sap.ui.require(["sap/ui/integration/thirdparty/adaptivecards","sap/ui/integration/thirdparty/adaptivecards-templating","sap/ui/integration/cards/adaptivecards/elements/UI5InputText","sap/ui/integration/cards/adaptivecards/elements/UI5InputNumber","sap/ui/integration/cards/adaptivecards/elements/UI5InputChoiceSet","sap/ui/integration/cards/adaptivecards/elements/UI5InputTime","sap/ui/integration/cards/adaptivecards/elements/UI5InputDate","sap/ui/integration/cards/adaptivecards/elements/UI5InputToggle","sap/ui/integration/cards/adaptivecards/overwrites/ActionRender"],function(e,n,i,a,r,o,s,d,p){u=e;l=n;g=i;h=a;f=r;C=o;m=s;y=d;v=p;this._setupAdaptiveCardDependency();t()}.bind(this),e)}.bind(this)));if(t.get("/sap.card/configuration/enableMarkdown")){e.push(new Promise(function(t,e){sap.ui.require(["sap/ui/integration/thirdparty/markdown-it"],function(e){c=e;t()},e)}))}return Promise.all(e)};b.prototype._setupCardContent=function(){var t=new o(this.getId()+"content",{preferDOM:false,content:"<div>&nbsp;</div>"});this.setAggregation("_content",new r({items:[t]}))};b.prototype.applyConfiguration=function(){var t=this.getConfiguration();if(t&&t.request&&t.request.url){this._loadManifestFromUrl(t.request.url);return}this._handleMarkDown();this._setupMSCardContent()};b.prototype.onThemeChanged=function(){if(this.getDomRef()&&u){this._adjustHostConfig();this.invalidate()}};b.prototype._handleMarkDown=function(){var t=this;u.AdaptiveCard.onProcessMarkdown=function(e,n){var i=t.getParent(),a=i&&i.getManifestEntry("/sap.card/configuration/enableMarkdown");if(a){n.outputHtml=(new c).render(e);n.didProcess=true;return n}}};b.prototype._loadManifestFromUrl=function(t){var e=new d,n=this;e.loadData(t).then(function(){n.setConfiguration(Object.assign(n.getConfiguration(),e.getData()))}).then(function(){n._handleMarkDown();n._setupMSCardContent()}).then(function(){e.destroy();e=null}).catch(function(){this.fireEvent("_dataReady");this.fireEvent("_adaptiveCardElementsReady");p.error("No JSON file found on this URL. Please provide a correct path to the JSON-serialized card object model file.")}.bind(this))};b.prototype._setupAdaptiveCardDependency=function(){this.adaptiveCardInstance=new u.AdaptiveCard;this._doMSCardsOverwrites();this._adjustHostConfig();this._handleActions();this._replaceElements();this._isRtl()};b.prototype._doMSCardsOverwrites=function(){u.Action.prototype.render=v};b.prototype._adjustHostConfig=function(){this.adaptiveCardInstance.hostConfig=new u.HostConfig(a())};b.prototype._isRtl=function(){this.adaptiveCardInstance.isRtl=function(){return s.getConfiguration().getRTL()}};b.prototype._handleActions=function(){this.adaptiveCardInstance.onExecuteAction=function(e){var n,i,a;if(e instanceof u.OpenUrlAction){i={url:e.url};n=t.CardActionType.Navigation}else if(e instanceof u.SubmitAction){this.getModel("form").setProperty("/",e.data);n=t.CardActionType.Submit}else{return}a=this.getActions();if(a){a.fireAction(this,n,i)}}.bind(this)};b.prototype.onActionSubmitStart=function(t){this.getParent().setBusy(true)};b.prototype.onActionSubmitEnd=function(t,e){var n=s.getLibraryResourceBundle("sap.ui.integration"),i=e?n.getText("CARDS_ADAPTIVE_ACTION_SUBMIT_ERROR"):n.getText("CARDS_ADAPTIVE_ACTION_SUBMIT_SUCCESS"),a=e?_.Error:_.Success;this.showMessage(i,a);this.getParent().setBusy(false)};b.prototype._replaceElements=function(){u.GlobalRegistry.elements.unregister("Input.Text");u.GlobalRegistry.elements.register("Input.Text",g);u.GlobalRegistry.elements.unregister("Input.Number");u.GlobalRegistry.elements.register("Input.Number",h);u.GlobalRegistry.elements.unregister("Input.ChoiceSet");u.GlobalRegistry.elements.register("Input.ChoiceSet",f);u.GlobalRegistry.elements.unregister("Input.Time");u.GlobalRegistry.elements.register("Input.Time",C);u.GlobalRegistry.elements.unregister("Input.Date");u.GlobalRegistry.elements.register("Input.Date",m);u.GlobalRegistry.elements.unregister("Input.Toggle");u.GlobalRegistry.elements.register("Input.Toggle",y)};b.prototype.setCardDataProvider=function(t){this._oCardDataProvider=t};b.prototype._setupMSCardContent=function(){var t=this.getConfiguration(),e,n=this._oCardDataProvider;if(!this.adaptiveCardInstance||!t){return}e=t.$data||t.data;if(!e&&!n){this._oCardTemplate=null;this._renderMSCardContent(t);this.fireEvent("_dataReady");return}if(t.$data){e={json:e}}this.setDataConfiguration(e)};b.prototype.onDataChanged=function(){var t=this.getBindingContext().getPath(),e=this.getModel().getProperty(t);this._oCardTemplate=this._setTemplating(this.getConfiguration(),e);this.invalidate()};b.prototype._renderMSCardContent=function(t){var e=this.getAggregation("_content").getItems()[0].$(),n=!!this.isLoading();this.setBusy(n);this.getAggregation("_content").toggleStyleClass("sapFCardContentHidden",n);if(this.adaptiveCardInstance&&t&&e.length){this.adaptiveCardInstance.parse(t);e.html(this.adaptiveCardInstance.render());this.fireEvent("_adaptiveCardElementsReady");if(this.adaptiveCardInstance.renderedElement){this.adaptiveCardInstance.renderedElement.tabIndex=-1}}};b.prototype._setTemplating=function(t,e){var n=new l.Template(t);return n.expand({$root:e})};b.prototype._loadWebcomponents=function(){if(this.getComponentsReady()){p.debug("WebComponents were already loaded");return Promise.resolve()}return new Promise(function(t,e){setTimeout(function(){if(window.customElements.get("ui5-button")){t();return}n({id:"webcomponents-bundle",attributes:{type:"module"},url:sap.ui.require.toUrl("sap/ui/integration/thirdparty/webcomponents/bundle.esm.js")}).then(t)})}).then(function(){this.setComponentsReady(true)}.bind(this))};b.prototype.setComponentsReady=function(t){this._bComponentsReady=t;return this};b.prototype.getComponentsReady=function(){return!!this._bComponentsReady};return b});