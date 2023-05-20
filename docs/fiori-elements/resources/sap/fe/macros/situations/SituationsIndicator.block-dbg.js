/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/fe/core/buildingBlocks/BuildingBlockBase","sap/fe/core/buildingBlocks/BuildingBlockSupport","sap/fe/core/buildingBlocks/BuildingBlockTemplateProcessor","sap/fe/core/converters/MetaModelConverter","sap/fe/core/helpers/BindingToolkit","sap/fe/macros/situations/SituationsPopover"],function(e,t,i,r,n,a,o){"use strict";var s,l,u,c,p,f,d;var v={};var y=o.showPopover;var g=a.ref;var b=a.pathInModel;var m=a.ifElse;var h=a.greaterThan;var P=a.fn;var T=a.equal;var S=a.and;var B=n.convertMetaModelContext;var k=r.xml;var w=i.defineBuildingBlock;var O=i.blockAttribute;function $(e,t,i,r){if(!i)return;Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}function z(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function j(e,t){e.prototype=Object.create(t.prototype);e.prototype.constructor=e;M(e,t)}function M(e,t){M=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,i){t.__proto__=i;return t};return M(e,t)}function N(e,t,i,r,n){var a={};Object.keys(r).forEach(function(e){a[e]=r[e]});a.enumerable=!!a.enumerable;a.configurable=!!a.configurable;if("value"in a||a.initializer){a.writable=true}a=i.slice().reverse().reduce(function(i,r){return r(e,t,i)||i},a);if(n&&a.initializer!==void 0){a.value=a.initializer?a.initializer.call(n):void 0;a.initializer=undefined}if(a.initializer===void 0){Object.defineProperty(e,t,a);a=null}return a}function A(e,t){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let E=(s=w({name:"SituationsIndicator",namespace:"sap.fe.macros.internal.situations"}),l=O({type:"sap.ui.model.Context",required:true}),u=O({type:"string",required:false}),s(c=(p=function(t){j(i,t);function i(){var e;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++){r[n]=arguments[n]}e=t.call(this,...r)||this;$(e,"entitySet",f,z(e));$(e,"propertyPath",d,z(e));return e}v=i;i.getSituationsNavigationProperty=function t(i){let r;switch(i._type){case"NavigationProperty":r=i.targetType.navigationProperties;break;case"EntityType":r=i.navigationProperties;break;default:r=i.entityType.navigationProperties}const n=r.filter(e=>{var t,i;return!e.isCollection&&((t=e.targetType.annotations.Common)===null||t===void 0?void 0:(i=t.SAPObjectNodeType)===null||i===void 0?void 0:i.Name)==="BusinessSituation"});const a=n.length>=1?n[0]:undefined;if(n.length>1){const t=n.map(e=>`'${e.name}'`).join(", ");let r;switch(i._type){case"NavigationProperty":r=i.targetType.name;break;case"EntityType":r=i.name;break;default:r=i.entityType.name}e.error(`Entity type '${r}' has multiple paths to SAP Situations (${t}). Using '${a===null||a===void 0?void 0:a.name}'.\nHint: Make sure there is at most one navigation property whose target entity type is annotated with\n<Annotation Term="com.sap.vocabularies.Common.v1.SAPObjectNodeType">\n  <Record>\n    <PropertyValue Property="Name" String="BusinessSituation" />\n  </Record>\n</Annotation>.`)}return a};var r=i.prototype;r.getTemplate=function e(){const t=B(this.entitySet);const r=i.getSituationsNavigationProperty(t);if(!r){return undefined}const n=b(`${r.name}/SitnNumberOfInstances`);let a;if(!this.propertyPath){a=h(n,0)}else{a=S(h(n,0),T(b("semanticKeyHasDraftIndicator","internal"),this.propertyPath))}const o=m(h(n,1),n,"");const s=m(T(n,1),this.getTranslatedText("situationsTooltipSingular"),P("formatMessage",[this.getTranslatedText("situationsTooltipPlural"),n]));const l=P(y,[g("$controller"),g("$event"),r.name]);return k`
			<m:Button core:require="{rt: 'sap/fe/macros/situations/SituationsPopover', formatMessage: 'sap/base/strings/formatMessage'}"
				type="Attention"
				icon="sap-icon://alert"
				text="${o}"
				tooltip="${s}"
				visible="${a}"
				press="${l}"
			/>`};return i}(t),f=N(p.prototype,"entitySet",[l],{configurable:true,enumerable:true,writable:true,initializer:null}),d=N(p.prototype,"propertyPath",[u],{configurable:true,enumerable:true,writable:true,initializer:null}),p))||c);v=E;return v},false);