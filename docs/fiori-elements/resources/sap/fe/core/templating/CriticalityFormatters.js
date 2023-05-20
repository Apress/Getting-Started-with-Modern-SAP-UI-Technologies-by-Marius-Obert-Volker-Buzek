/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingToolkit","sap/fe/core/templating/DataModelPathHelper"],function(i,t){"use strict";var e={};var r=t.getRelativePaths;var o=i.or;var a=i.ifElse;var n=i.getExpressionFromAnnotation;var c=i.equal;var l=i.constant;var s=i.compileExpression;const y=(i,t)=>{const e=i.targetObject?i.targetObject:i;const y=e===null||e===void 0?void 0:e.Criticality;const p=t?r(t):undefined;const u=n(y,p);let v;if(y){v=a(o(c(u,l("UI.CriticalityType/Negative")),c(u,l(1)),c(u,l("1"))),l("Error"),a(o(c(u,l("UI.CriticalityType/Critical")),c(u,l(2)),c(u,l("2"))),l("Warning"),a(o(c(u,l("UI.CriticalityType/Positive")),c(u,l(3)),c(u,l("3"))),l("Success"),a(o(c(u,l("UI.CriticalityType/Information")),c(u,l(5)),c(u,l("5"))),l("Information"),l("None")))))}else{v=l("None")}return s(v)};e.buildExpressionForCriticalityColor=y;const p=(i,t)=>{const e=i!==null&&i!==void 0&&i.targetObject?i.targetObject:i;const y=e===null||e===void 0?void 0:e.Criticality;const p=t?r(t):undefined;const u=n(y,p);const v=(e===null||e===void 0?void 0:e.CriticalityRepresentation)&&(e===null||e===void 0?void 0:e.CriticalityRepresentation)==="UI.CriticalityRepresentationType/WithoutIcon";let C;if(!v){if(y){C=a(o(c(u,l("UI.CriticalityType/Negative")),c(u,l(1)),c(u,l("1"))),l("sap-icon://message-error"),a(o(c(u,l("UI.CriticalityType/Critical")),c(u,l(2)),c(u,l("2"))),l("sap-icon://message-warning"),a(o(c(u,l("UI.CriticalityType/Positive")),c(u,l(3)),c(u,l("3"))),l("sap-icon://message-success"),a(o(c(u,l("UI.CriticalityType/Information")),c(u,l(5)),c(u,l("5"))),l("sap-icon://message-information"),l("")))))}else{C=l("")}}else{C=l("")}return s(C)};e.buildExpressionForCriticalityIcon=p;const u=i=>{const t=i!==null&&i!==void 0&&i.targetObject?i.targetObject:i;const e=t===null||t===void 0?void 0:t.Criticality;const r=n(e);let y;if(e){y=a(o(c(r,l("UI.CriticalityType/Negative")),c(r,l(1)),c(r,l("1"))),l("Reject"),a(o(c(r,l("UI.CriticalityType/Positive")),c(r,l(3)),c(r,l("3"))),l("Accept"),l("Default")))}else{y=l("Default")}return s(y)};e.buildExpressionForCriticalityButtonType=u;const v=i=>{const t=i!==null&&i!==void 0&&i.targetObject?i.targetObject:i;const e=t===null||t===void 0?void 0:t.Criticality;const r=n(e);let y;if(e){y=a(o(c(r,l("UI.CriticalityType/Negative")),c(r,l(1)),c(r,l("1"))),l("Error"),a(o(c(r,l("UI.CriticalityType/Critical")),c(r,l(2)),c(r,l("2"))),l("Critical"),a(o(c(r,l("UI.CriticalityType/Positive")),c(r,l(3)),c(r,l("3"))),l("Good"),l("Neutral"))))}else{y=l("Neutral")}return s(y)};e.buildExpressionForCriticalityColorMicroChart=v;return e},false);