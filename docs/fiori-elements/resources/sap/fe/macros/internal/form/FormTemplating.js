/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingToolkit","sap/fe/core/templating/DataModelPathHelper","sap/fe/macros/field/FieldTemplating"],function(e,t,a){"use strict";var n={};var r=a.getTextBindingExpression;var i=t.enhanceDataModelPath;var c=e.constant;var l=e.concat;var o=e.compileExpression;const s=/(?:({[^}]+})[^{]*)/g;const u=/{([^}]+)}(.*)/;const f=function(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;const a=e.targetObject;const n=a.Template.toString().match(s);if(n){const s=n.reduce((t,n)=>{const l=n.match(u);if(l&&l.length>1){const n=l[1];if(a.Data[n]){const o=i(e,a.Data[n].fullyQualifiedName.replace(e.targetEntityType.fullyQualifiedName,""));o.targetObject=o.targetObject.Value;t.push(r(o,{}));if(l.length>2){t.push(c(l[2]))}}}return t},[]);return t?o(l(...s)):l(...s)}return""};n.getLabelForConnectedFields=f;return n},false);