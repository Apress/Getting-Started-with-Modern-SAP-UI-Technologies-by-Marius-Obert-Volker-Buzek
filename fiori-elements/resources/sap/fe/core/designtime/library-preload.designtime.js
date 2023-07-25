//@ui5-bundle sap/fe/core/designtime/library-preload.designtime.js
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.predefine("sap/fe/core/designtime/AppComponent.designtime",[],function(){"use strict";var t,e,a;const n={parseParameters:function(){return{}}};const r=(t=sap.ushell)!==null&&t!==void 0&&t.Container?sap.ushell.Container.getService("URLParsing"):n;const o=r.parseParameters(window.location.search);const s=((e=o["fiori-tools-rta-mode"])===null||e===void 0?void 0:(a=e[0])===null||a===void 0?void 0:a.toLowerCase())==="true";const i=function(t){if(t.getMetadata().getName()==="sap.f.DynamicPage"){return true}else{const e=t.getParent();return e?i(e):false}};const u=function(t){let e={};const a=t.getMetadata().getName();if(s){if(i(t)){e={"sap.ui.fl.variants.VariantManagement":true,"sap.fe.core.controls.FilterBar":true,"sap.ui.mdc.Table":true}}}else{var n,r;e={"sap.fe.templates.ObjectPage.controls.StashableVBox":true,"sap.fe.templates.ObjectPage.controls.StashableHBox":true,"sap.uxap.ObjectPageLayout":true,"sap.uxap.AnchorBar":true,"sap.uxap.ObjectPageSection":true,"sap.uxap.ObjectPageSubSection":true,"sap.ui.fl.util.IFrame":true,"sap.ui.layout.form.Form":true,"sap.ui.layout.form.FormContainer":true,"sap.ui.layout.form.FormElement":true,"sap.ui.fl.variants.VariantManagement":true,"sap.fe.core.controls.FilterBar":true,"sap.ui.mdc.Table":true,"sap.m.IconTabBar":true};if(a==="sap.m.MenuButton"&&((n=t.getParent())===null||n===void 0?void 0:n.getMetadata().getName())==="sap.uxap.AnchorBar"){e["sap.m.MenuButton"]=true}if(a==="sap.m.Button"&&((r=t.getParent())===null||r===void 0?void 0:r.getMetadata().getName())==="sap.uxap.AnchorBar"){e["sap.m.Button"]=true}if(a==="sap.m.FlexBox"&&t.getId().indexOf("--fe::HeaderContentContainer")>=0){e["sap.m.FlexBox"]=true}}return e};const p={actions:"not-adaptable",aggregations:{rootControl:{actions:"not-adaptable",propagateMetadata:function(t){const e=u(t);if(e[t.getMetadata().getName()]){return{}}else{return{actions:"not-adaptable"}}}}},tool:{start:function(t){t.getEnvironmentCapabilities().setCapability("AppState",false)},stop:function(t){t.getEnvironmentCapabilities().setCapability("AppState",true)}}};return p},false);