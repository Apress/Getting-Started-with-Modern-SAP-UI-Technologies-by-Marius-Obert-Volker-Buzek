/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var r=e.Categories,i=e.Severity,a=e.Audiences;var s={id:"breadcrumbsInOverflowToolbar",audiences:[a.Control],categories:[r.Usability],enabled:true,minversion:"1.34",title:"Breadcrumbs in OverflowToolbar",description:"The Breadcrumbs should not be placed inside an OverflowToolbar",resolution:"Place breadcrumbs in another container.",resolutionurls:[{text:"SAP Fiori Design Guidelines: Breadcrumbs",href:"https://experience.sap.com/fiori-design-web/breadcrumb/#guidelines"}],check:function(e,r,a){a.getElementsByClassName("sap.m.Breadcrumbs").forEach(function(r){var a=r.getId(),s=r.getMetadata().getElementName();if(r.getParent()&&r.getParent().isA("sap.m.OverflowToolbar")){e.addIssue({severity:i.Medium,details:"Breadcrumbs '"+s+"' ("+a+") is placed inside an OverflowToolbar.",context:{id:a}})}})}};return[s]},true);