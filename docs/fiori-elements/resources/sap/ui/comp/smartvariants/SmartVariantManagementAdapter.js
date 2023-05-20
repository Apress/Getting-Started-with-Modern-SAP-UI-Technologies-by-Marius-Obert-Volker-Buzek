/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/state/UIState","sap/ui/core/Element"],function(t,e){"use strict";var n=e.extend("sap.ui.comp.smartvariants.SmartVariantManagementAdapter",{metadata:{library:"sap.ui.comp",properties:{selectionPresentationVariants:{type:"object",group:"Misc",defaultValue:false}}}});n.prototype.getUiState=function(e){var n,a=null,i=e.substring(1);this.getSelectionPresentationVariants().some(function(t){if(t.qualifier===i){a=t}return a!==null});if(a){if(a.uiStateContent){n=a.uiStateContent}else{n=t.createFromSelectionAndPresentationVariantAnnotation(a.text,a.selectionVariant?a.selectionVariant.annotation:null,a.presentationVariant?a.presentationVariant.annotation:null);a.uiStateContent=n}}return n};n.prototype.getODataVariants=function(){var t="#",e=[];var n=this.getSelectionPresentationVariants();if(n){n.forEach(function(n){if(n.qualifier){var a=t+n.qualifier;e.push({id:a,favorite:true,name:n.text})}})}return e};n.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments)};return n});