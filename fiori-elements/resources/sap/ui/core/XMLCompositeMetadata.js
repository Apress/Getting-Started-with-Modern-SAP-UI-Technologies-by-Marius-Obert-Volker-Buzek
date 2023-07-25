/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ElementMetadata","sap/ui/core/XMLTemplateProcessor","sap/base/Log"],function(t,e,r){"use strict";var a={};var n=function(e,a){this.InvalidationMode={Render:true,None:false};if(!a.hasOwnProperty("renderer")){a.renderer="sap.ui.core.XMLCompositeRenderer"}if(!a.hasOwnProperty("alias")){a.alias="this"}t.apply(this,arguments);var n=this._bAbstract;if(!n){if(!a.fragment&&e!=="sap.ui.core.XMLComposite"){a.fragment=e;a.fragmentUnspecified=true}if(!this._fragment&&a.fragment){try{if(!this._fragment){if(a.fragmentContent){if(typeof a.fragmentContent==="string"){var o=new DOMParser;a.fragmentContent=o.parseFromString(a.fragmentContent,"text/xml").documentElement;if(a.fragmentContent&&a.fragmentContent.getElementsByTagName("parsererror").length){var i=a.fragmentContent.getElementsByTagName("parsererror")[0].innerText;throw new Error("There was an error parsing the XML fragment for XMLComposite '"+e+"'. The following message may contain hints to find the problem: "+i)}}this._fragment=a.fragmentContent}else{this._fragment=this._loadFragment(a.fragment,"control")}}}catch(t){if(!a.fragmentUnspecified||t.message.startsWith("There was an error parsing")){throw t}else{r.warning("Implicitly inferred fragment xml "+a.fragment+" not found. "+e+" is not abstract!")}}}}this._sCompositeAggregation=a.metadata?a.metadata.compositeAggregation||null:null;this._createPrivateAggregationAccessors();this._applyAggregationSettings()};n.prototype=Object.create(t.prototype);n.prototype.constructor=n;n.uid=t.uid;n.extend=function(t){for(var e in t){n[e]=t[e]}return n};n.prototype.getCompositeAggregationName=function(){return this._sCompositeAggregation||"_content"};n.prototype.getFragment=function(){if(this._fragment){return this._fragment.cloneNode(true)}};n.prototype._applyAggregationSettings=function(){var t=this.getAllAggregations();for(var e in t){if(t[e].type==="TemplateMetadataContext"){this.getAggregation(e)._doesNotRequireFactory=true}}};n.prototype._createPrivateAggregationAccessors=function(){var t=this.getAllPrivateAggregations(),e=this.getClass().prototype,r=function(t,r){if(!e[t]){e[t]=r}};for(var a in t){t[a].generate(r)}};n.prototype._suppressInvalidate=function(t,e){if(e){return true}if(!t.appData){t.appData={};t.appData.invalidate=this.InvalidationMode.None}if(t&&t.appData&&t.appData.invalidate===this.InvalidationMode.Render){return false}return true};n.prototype.getMandatoryAggregations=function(){if(!this._mMandatoryAggregations){var t=this.getAllAggregations(),e={};for(var r in t){if(t[r].type==="TemplateMetadataContext"&&t[r].appData.mandatory){e[r]=t[r]}}this._mMandatoryAggregations=e}return this._mMandatoryAggregations};n.prototype._loadFragment=function(t,r){var n=r+"$"+t;if(!a[n]){a[n]=e.loadTemplate(t,r)}return a[n]};return n},true);