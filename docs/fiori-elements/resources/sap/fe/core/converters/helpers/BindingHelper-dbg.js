/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingToolkit"],function(t){"use strict";var e={};var i=t.pathInModel;var n=t.or;var s=t.not;var a=t.equal;var r=t.and;const o={IsCreateMode:i("createMode","ui"),IsEditable:i("/isEditable","ui"),IsTransientBinding:a(i("@$ui5.context.isTransient"),true),IsTotal:a(i("@$ui5.node.isTotal"),true),IsExpanded:a(i("@$ui5.node.isExpanded"),true),NodeLevel:i("@$ui5.node.level"),IsInactive:i("@$ui5.context.isInactive")};e.UI=o;const u={HasDraft:i("HasDraftEntity"),HasActive:i("HasActiveEntity"),IsActive:i("IsActiveEntity")};e.Entity=u;const c={IsNewObject:r(s(u.HasActive),s(u.IsActive)),HasNoDraftForCurrentUser:n(s(u.HasDraft),r(u.HasDraft,s(i("DraftAdministrativeData/DraftIsCreatedByMe"))))};e.Draft=c;function d(t,e){return t.singletons.find(t=>t.fullyQualifiedName===e)}const f=function(t,e,i){if(t.indexOf("/")===0){const i=t.split("/").filter(Boolean),n=i.pop(),s=i.join("/"),a=d(e,s);if(a){t=`/${a.name}/${n}`}}else{const e=i.concat();e.push(t);t=e.join("/")}return t};e.singletonPathVisitor=f;function l(t,e,i){if(i){const e=`${i===null||i===void 0?void 0:i.substring(i.lastIndexOf("/")+1)}/`;if(t.startsWith(e)){return t.substring(e.length)}}return f(t,e.getConvertedTypes(),[])}e.bindingContextPathVisitor=l;return e},false);