/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/CommonUtils","sap/fe/macros/table/delegates/TableDelegate"],function(e,a){"use strict";const r=Object.assign({},a,{_internalUpdateBindingInfo:function(e,r){var i;a._internalUpdateBindingInfo.apply(this,[e,r]);const n=e.getPayload();r.parameters.$$aggregation={...r.parameters.$$aggregation,...{hierarchyQualifier:n===null||n===void 0?void 0:n.hierarchyQualifier},...{expandTo:(i=r.parameters.$$aggregation)!==null&&i!==void 0&&i.search?100:n===null||n===void 0?void 0:n.initialExpansionLevel}}},updateBindingInfoWithSearchQuery:function(a,r,i){a.filters=i;if(r.search){a.parameters.$$aggregation={...a.parameters.$$aggregation,...{search:e.normalizeSearchTerm(r.search)}}}else{var n,t;(n=a.parameters)===null||n===void 0?true:(t=n.$$aggregation)===null||t===void 0?true:delete t.search}}});return r},false);