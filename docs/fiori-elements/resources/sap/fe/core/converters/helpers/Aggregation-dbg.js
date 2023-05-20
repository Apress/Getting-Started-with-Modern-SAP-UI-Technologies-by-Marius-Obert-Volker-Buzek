/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/TypeGuards"],function(t){"use strict";var e={};var n=t.isNavigationProperty;var o=t.isEntityType;var r=t.isEntitySet;let i=function(){function t(t,e){var i;this._entityType=t;this._converterContext=e;this._oAggregationAnnotationTarget=this._determineAggregationAnnotationTarget();if(n(this._oAggregationAnnotationTarget)||o(this._oAggregationAnnotationTarget)||r(this._oAggregationAnnotationTarget)){this.oTargetAggregationAnnotations=this._oAggregationAnnotationTarget.annotations.Aggregation}this._bApplySupported=(i=this.oTargetAggregationAnnotations)!==null&&i!==void 0&&i.ApplySupported?true:false;if(this._bApplySupported){var g,a,s,l;this._aGroupableProperties=(g=this.oTargetAggregationAnnotations)===null||g===void 0?void 0:(a=g.ApplySupported)===null||a===void 0?void 0:a.GroupableProperties;this._aAggregatableProperties=(s=this.oTargetAggregationAnnotations)===null||s===void 0?void 0:(l=s.ApplySupported)===null||l===void 0?void 0:l.AggregatableProperties;this.oContainerAggregationAnnotation=e.getEntityContainer().annotations.Aggregation}}e.AggregationHelper=t;var i=t.prototype;i._determineAggregationAnnotationTarget=function t(){var e,n,o,i,g;const a=(e=this._converterContext.getDataModelObjectPath())!==null&&e!==void 0&&(n=e.targetEntitySet)!==null&&n!==void 0&&(o=n.entityType)!==null&&o!==void 0&&(i=o.annotations)!==null&&i!==void 0&&(g=i.Common)!==null&&g!==void 0&&g.ResultContext?true:false;let s;if(a){var l,p,u,A;const t=this._converterContext.getDataModelObjectPath();const e=t===null||t===void 0?void 0:t.targetObject;const n=t===null||t===void 0?void 0:t.targetEntityType;if(e!==null&&e!==void 0&&(l=e.annotations)!==null&&l!==void 0&&(p=l.Aggregation)!==null&&p!==void 0&&p.ApplySupported){s=e}else if(n!==null&&n!==void 0&&(u=n.annotations)!==null&&u!==void 0&&(A=u.Aggregation)!==null&&A!==void 0&&A.ApplySupported){s=n}}else{var d;const t=this._converterContext.getEntitySet();if(r(t)&&(d=t.annotations.Aggregation)!==null&&d!==void 0&&d.ApplySupported){s=t}else{s=this._converterContext.getEntityType()}}return s};i.isAnalyticsSupported=function t(){return this._bApplySupported};i.isPropertyGroupable=function t(e){if(!this._bApplySupported){return undefined}else if(!this._aGroupableProperties||this._aGroupableProperties.length===0){return true}else{return this._aGroupableProperties.findIndex(t=>t.$target.fullyQualifiedName===e.fullyQualifiedName)>=0}};i.isPropertyAggregatable=function t(e){if(!this._bApplySupported){return undefined}else{const t=this._converterContext.getAnnotationsByTerm("Aggregation","Org.OData.Aggregation.V1.CustomAggregate",[this._oAggregationAnnotationTarget]);return t.some(t=>e.name===t.qualifier)}};i.getGroupableProperties=function t(){return this._aGroupableProperties};i.getAggregatableProperties=function t(){return this._aAggregatableProperties};i.getEntityType=function t(){return this._entityType};i.getAggregatedProperties=function t(e){if(e==="AggregatedProperties"){return this._converterContext.getAnnotationsByTerm("Analytics","com.sap.vocabularies.Analytics.v1.AggregatedProperties",[this._converterContext.getEntityContainer(),this._converterContext.getEntityType()])}return this._converterContext.getAnnotationsByTerm("Analytics","com.sap.vocabularies.Analytics.v1.AggregatedProperty",[this._converterContext.getEntityContainer(),this._converterContext.getEntityType()])};i.getTransAggregations=function t(){var e;let n=this.getAggregatedProperties("AggregatedProperty");if(!n||n.length===0){n=this.getAggregatedProperties("AggregatedProperties")[0]}return(e=n)===null||e===void 0?void 0:e.filter(t=>{if(this._getAggregatableAggregates(t.AggregatableProperty)){return t}})};i._getAggregatableAggregates=function t(e){const n=this.getAggregatableProperties()||[];return n.find(function(t){return t.Property.value===(e.qualifier?e.qualifier:e.$target.name)})};i.getCustomAggregateDefinitions=function t(){const e=this._converterContext.getAnnotationsByTerm("Aggregation","Org.OData.Aggregation.V1.CustomAggregate",[this._oAggregationAnnotationTarget]);return e};i.getAllowedTransformations=function t(){var e,n,o,r;return((e=this.oTargetAggregationAnnotations)===null||e===void 0?void 0:(n=e.ApplySupported)===null||n===void 0?void 0:n.Transformations)||((o=this.oContainerAggregationAnnotation)===null||o===void 0?void 0:(r=o.ApplySupportedDefaults)===null||r===void 0?void 0:r.Transformations)};return t}();e.AggregationHelper=i;return e},false);