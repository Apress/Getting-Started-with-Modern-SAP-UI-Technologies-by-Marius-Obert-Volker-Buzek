/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/AddIFrame","sap/ui/fl/changeHandler/common/getTargetAggregationIndex","sap/ui/fl/changeHandler/common/createIFrame"],function(e,t,n){"use strict";var r=Object.assign({},e);r.applyChange=function(r,a,o){var i=o.modifier;var g=r.getContent();var s=g.targetAggregation;if(s!=="sections"){return Promise.resolve().then(e.applyChange.bind(e,r,a,o))}var c=o.view;var u=o.appComponent;var l=g.selector;var d=sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_TITLE_FOR_IFRAME");var f;var p;return Promise.resolve().then(i.createControl.bind(i,"sap.uxap.ObjectPageSection",u,c,l,{title:d},false)).then(function(e){f=e;var t=Object.create(l);t.id+="-subSection";return i.createControl("sap.uxap.ObjectPageSubSection",u,c,t,{title:d},false)}).then(function(e){p=e;return i.insertAggregation(f,"subSections",p,0,c)}).then(function(){var e=Object.create(l);e.id+="-iframe";var t={sourceControlId:i.getId(p),selectorControlId:i.getId(f),propertyName:"title"};return n(r,o,e,t)}).then(function(e){return i.insertAggregation(p,"blocks",e,0,c)}).then(t.bind(null,r,a,o)).then(function(e){return i.insertAggregation(a,"sections",f,e,c)}).then(function(){r.setRevertData([i.getId(f)])})};r.getCondenserInfo=function(t){var n=Object.assign({},e.getCondenserInfo(t));var r=t.getContent();var a=r.targetAggregation;if(a==="sections"){n.updateControl=Object.assign({},n.affectedControl);n.updateControl.id=n.affectedControl.id+"-iframe"}return n};return r},true);