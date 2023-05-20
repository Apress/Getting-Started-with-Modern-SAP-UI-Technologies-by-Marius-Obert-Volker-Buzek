/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,a=e.Severity,r=e.Audiences;var i={id:"nonMultipartFileUploadRequiresXHR",audiences:[r.Control],categories:[t.Usability],enabled:true,minversion:"1.28",title:"FileUploader: To disable multipart upload you should enable XHR",description:"The FileUploader 'useMultipart' property is disabled, but the required 'sendXHR' property is not enabled",resolution:"Either enable the 'sendXHR' property of the FileUploader or set the 'useMultipart' property to true",resolutionurls:[{text:"API Reference: FileUploader",href:"https://sdk.openui5.org/api/sap.ui.unified.FileUploader"}],check:function(e,t,r){r.getElementsByClassName("sap.ui.unified.FileUploader").forEach(function(t){if(!t.getUseMultipart()&&!t.getSendXHR()){var r=t.getId(),i=t.getMetadata().getElementName();e.addIssue({severity:a.High,details:"FileUploader '"+i+"' ("+r+") multipart upload cannot be disabled",context:{id:r}})}})}};var l={id:"fileUploaderParametersRequireXHRDisabled",audiences:[r.Control],categories:[t.Usability],enabled:true,minversion:"1.28",title:"FileUploader: XHR enabled but non-XHR parameter aggregation specified",description:"The FileUploader XHR is enabled but parameters are specified into the non-XHR (i.e. form-based) upload 'parameters' aggregation",resolution:"Either disable the 'sendXHR' property of the FileUploader, or use the 'headerParameters' aggregation to specify parameters for XHR upload",resolutionurls:[{text:"API Reference: FileUploader",href:"https://sdk.openui5.org/api/sap.ui.unified.FileUploader"}],check:function(e,t,r){r.getElementsByClassName("sap.ui.unified.FileUploader").forEach(function(t){if(t.getParameters().length&&!t.getHeaderParameters().length&&t.getSendXHR()){var r=t.getId(),i=t.getMetadata().getElementName();e.addIssue({severity:a.High,details:"FileUploader '"+i+"' ("+r+") has enabled XHR but specified non-XHR parameter aggregation",context:{id:r}})}})}};var o={id:"fileUploaderHeaderParametersRequireXHREnabled",audiences:[r.Control],categories:[t.Usability],enabled:true,minversion:"1.28",title:"FileUploader: XHR disabled but XHR parameter aggregation specified",description:"The FileUploader has specified headerParameters, but the required XHR is disabled",resolution:"Either enable the 'sendXHR' property of the FileUploader, or use the 'parameters' aggregation to specify parameters for form-based upload",resolutionurls:[{text:"API Reference: FileUploader",href:"https://sdk.openui5.org/api/sap.ui.unified.FileUploader"}],check:function(e,t,r){r.getElementsByClassName("sap.ui.unified.FileUploader").forEach(function(t){if(t.getHeaderParameters().length&&!t.getParameters().length&&!t.getSendXHR()){var r=t.getId(),i=t.getMetadata().getElementName();e.addIssue({severity:a.High,details:"FileUploader '"+i+"' ("+r+") headerParameters require XHR",context:{id:r}})}})}};return[i,l,o]},true);