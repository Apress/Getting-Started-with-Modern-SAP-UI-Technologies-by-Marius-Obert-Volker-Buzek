/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/fe/core/buildingBlocks/BuildingBlockTemplateProcessor","sap/fe/core/helpers/ClassSupport","sap/fe/core/jsx-runtime/ViewLoader","sap/fe/macros/macroLibrary","sap/m/FormattedText","sap/m/HBox","sap/m/Panel","sap/m/Title","sap/ui/codeeditor/CodeEditor","sap/ui/core/Fragment","sap/ui/core/library","sap/ui/core/util/XMLPreprocessor","sap/fe/core/jsx-runtime/jsx"],function(e,r,t,n,i,a,o,s,l,c,d,u,p,h){"use strict";var m=u.TitleLevel;var f=t.createReference;var g=r.parseXMLString;function v(e){const r=Array.isArray(e.children)?e.children.map(e=>{let r;if(typeof e==="string"){r=e}else{switch(e.getMetadata().getName()){case"sap.m.Link":r=`<a href="${e.getHref()}">${e.getText()}</a>`;break;case"sap.ui.codeeditor.CodeEditor":r=`<code>${e.getValue()}</code>`;break}}return r}).join(""):e.children;return h(a,{htmlText:r,class:"sapUiTinyMarginBottom"})}function x(e){return h(l,{text:e.children,level:m.H1,class:"sapUiTinyMarginBottom"})}function y(e){return`<a href={strValue.href}>${e.children}</a>`}function T(e){const r=`<ul>${Array.isArray(e.children)?e.children.join(""):e.children}</ul>`;return h(a,{htmlText:r})}function b(e){return`<li>${Array.isArray(e.children)?e.children.join(""):e.children}</li>`}function B(e){return h(l,{text:e.children,level:m.H2,class:"sapUiSmallMarginTop sapUiTinyMarginBottom"})}function M(e){return e.children}function L(r){const t=f();const a=r.binding?{path:r.binding}:undefined;const l=h(s,{headerText:r.headerText||"",class:"sapUiSmallMarginTop",children:h(o,{ref:t})});if(a){l.bindElement(a)}i.register();const c=p.process(g(`<root>${r.children}</root>`,true)[0],{name:"myBuildingBlockFragment"},n.preprocessorData);Promise.resolve(c).then(e=>d.load({definition:e.firstElementChild,controller:n.controller})).then(e=>{t.current.removeAllItems();t.current.addItem(e)}).catch(r=>{e.error(r)});return l}function k(e){var r,t,n;const i=((r=e.children)===null||r===void 0?void 0:r.trim())||"";const a=e.lineCount||Math.max((t=i.split("\n"))===null||t===void 0?void 0:t.length,3);const o=e.type||(e===null||e===void 0?void 0:(n=e.className)===null||n===void 0?void 0:n.split("-")[1])||"js";const s=h(c,{class:"sapUiTinyMargin",lineNumbers:e.lineNumbers||false,type:o,editable:e.editable||false,maxLines:a,height:"auto",width:"98%"});s.setValue(i);if(e.source){fetch(e.source).then(e=>e.text()).then(e=>{var r;const t=Math.max((r=e.split("\n"))===null||r===void 0?void 0:r.length,3);s.setMaxLines(t);s.setValue(e)}).catch(e=>{s.setValue(e.message)})}return s}const j=function(){return{p:v,a:y,h1:x,h2:B,ul:T,li:b,pre:M,code:k,CodeBlock:k,BuildingBlockPlayground:L}};return j},false);