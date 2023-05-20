/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/strings/formatMessage","sap/fe/core/buildingBlocks/BuildingBlockSupport","sap/fe/core/buildingBlocks/RuntimeBuildingBlock","sap/fe/core/CommonUtils","sap/fe/core/converters/helpers/BindingHelper","sap/fe/core/converters/MetaModelConverter","sap/fe/core/helpers/BindingToolkit","sap/m/Button","sap/m/library","sap/m/ObjectMarker","sap/m/Popover","sap/m/Text","sap/m/VBox","sap/ui/core/Core","sap/fe/core/jsx-runtime/jsx","sap/fe/core/jsx-runtime/jsxs"],function(e,t,r,i,n,a,s,o,c,l,d,p,f,u,D,v){"use strict";var y,g,b,A,_,h,T,m,O,I,B,P,E,C,x;var M={};var R=c.ObjectMarkerVisibility;var U=c.ObjectMarkerType;var L=s.pathInModel;var N=s.or;var w=s.not;var F=s.isEmpty;var V=s.ifElse;var j=s.constant;var k=s.and;var S=a.convertMetaModelContext;var z=n.UI;var H=n.Entity;var G=t.defineBuildingBlock;var K=t.blockAttribute;function J(e,t,r,i){if(!r)return;Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(i):void 0})}function W(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function X(e,t){e.prototype=Object.create(t.prototype);e.prototype.constructor=e;Y(e,t)}function Y(e,t){Y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,r){t.__proto__=r;return t};return Y(e,t)}function q(e,t,r,i,n){var a={};Object.keys(i).forEach(function(e){a[e]=i[e]});a.enumerable=!!a.enumerable;a.configurable=!!a.configurable;if("value"in a||a.initializer){a.writable=true}a=r.slice().reverse().reduce(function(r,i){return i(e,t,r)||r},a);if(n&&a.initializer!==void 0){a.value=a.initializer?a.initializer.call(n):void 0;a.initializer=undefined}if(a.initializer===void 0){Object.defineProperty(e,t,a);a=null}return a}function $(e,t){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let Q=(y=G({name:"DraftIndicator",namespace:"sap.fe.macros"}),g=K({type:"string"}),b=K({type:"string"}),A=K({type:"string",validate:e=>{if(e&&![R.IconOnly,R.IconAndText].includes(e)){throw new Error(`Allowed value ${e} does not match`)}}}),_=K({type:"sap.ui.model.Context",required:true,expectedTypes:["EntitySet","NavigationProperty"]}),h=K({type:"boolean",bindable:true}),T=K({type:"string"}),y(m=(O=function(t){X(r,t);function r(){var e;for(var r=arguments.length,i=new Array(r),n=0;n<r;n++){i[n]=arguments[n]}e=t.call(this,...i)||this;J(e,"id",I,W(e));J(e,"ariaLabelledBy",B,W(e));J(e,"draftIndicatorType",P,W(e));J(e,"entitySet",E,W(e));J(e,"isDraftIndicatorVisible",C,W(e));J(e,"class",x,W(e));return e}M=r;r.formatDraftOwnerTextInPopover=function e(t,r,i,n,a){const s=u.getLibraryResourceBundle("sap.fe.macros");if(t){const e=n||r||a||i;if(!e){return s.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_UNSAVED_CHANGES_BY_UNKNOWN")}else{return r?s.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_LOCKED_BY_KNOWN",[e]):s.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_UNSAVED_CHANGES_BY_KNOWN",[e])}}else{return s.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_NO_DATA_TEXT")}};var n=r.prototype;n.getDraftAdministrativeDataProperties=function e(){const t=this.entitySet.getModel().createBindingContext("DraftAdministrativeData",this.entitySet);const r=S(t);return r.targetType.entityProperties.map(e=>e.name)};n.getPopoverTitleBindingExpression=function e(){return V(w(H.IsActive),L("M_COMMON_DRAFT_OBJECT","sap.fe.i18n"),V(H.HasDraft,V(w(F(L("DraftAdministrativeData/InProcessByUser"))),L("M_COMMON_DRAFT_LOCKED_OBJECT","sap.fe.i18n"),L("M_DRAFT_POPOVER_ADMIN_UNSAVED_OBJECT","sap.fe.i18n")),this.draftIndicatorType===R.IconAndText?" ":L("C_DRAFT_POPOVER_ADMIN_DATA_DRAFTINFO_FLAGGED_OBJECT","sap.fe.i18n")))};n.getDraftOwnerTextBindingExpression=function e(){const t=this.getDraftAdministrativeDataProperties();const i=[{path:"HasDraftEntity",targetType:"any"},{path:"DraftAdministrativeData/InProcessByUser"},{path:"DraftAdministrativeData/LastChangedByUser"}];if(t.includes("InProcessByUserDescription")){i.push({path:"DraftAdministrativeData/InProcessByUserDescription"})}if(t.includes("LastChangedByUserDescription")){i.push({path:"DraftAdministrativeData/LastChangedByUserDescription"})}return{parts:i,formatter:r.formatDraftOwnerTextInPopover}};n.createPopover=function t(r){const n=k(w(H.IsActive),F(L("DraftAdministrativeData/LastChangeDateTime")));const a=this.draftIndicatorType===R.IconAndText?L("M_DRAFT_POPOVER_ADMIN_GENERIC_LOCKED_OBJECT_POPOVER_TEXT","sap.fe.i18n"):L("C_DRAFT_POPOVER_ADMIN_DATA_DRAFTINFO_POPOVER_NO_DATA_TEXT","sap.fe.i18n");const s=k(w(H.IsActive),w(F(L("DraftAdministrativeData/LastChangeDateTime"))));const c={parts:[{path:"M_DRAFT_POPOVER_ADMIN_LAST_CHANGE_TEXT",model:"sap.fe.i18n"},{path:"DraftAdministrativeData/LastChangeDateTime"}],formatter:e};const l=k(H.IsActive,w(F(L("DraftAdministrativeData/LastChangeDateTime"))));const u={...c};const y=D(d,{title:this.getPopoverTitleBindingExpression(),showHeader:true,contentWidth:"15.625rem",verticalScrolling:false,class:"sapUiContentPadding",endButton:D(o,{icon:"sap-icon://decline",press:()=>{var e;return(e=this.draftPopover)===null||e===void 0?void 0:e.close()}}),children:v(f,{class:"sapUiContentPadding",children:[D(f,{visible:n,children:D(p,{text:a})}),D(f,{visible:s,children:D(p,{text:c})}),v(f,{visible:l,children:[D(p,{text:this.getDraftOwnerTextBindingExpression()}),D(p,{class:"sapUiSmallMarginTop",text:u})]})]})});i.getTargetView(r).addDependent(y);return y};n.onObjectMarkerPressed=function e(t){const r=t.getSource();const i=r.getBindingContext();this.draftPopover??=this.createPopover(r);this.draftPopover.setBindingContext(i);this.draftPopover.openBy(r,false)};n.getIconAndTextAdditionalInfoBindingExpression=function e(){const t=this.getDraftAdministrativeDataProperties();const r=[];if(t.includes("InProcessByUserDescription")){r.push(L("DraftAdministrativeData/InProcessByUserDescription"))}r.push(L("DraftAdministrativeData/InProcessByUser"));if(t.includes("LastChangedByUserDescription")){r.push(L("DraftAdministrativeData/LastChangedByUserDescription"))}r.push(L("DraftAdministrativeData/LastChangedByUser"));return V(H.HasDraft,N(...r),"")};n.getIconAndTextContent=function e(){const t=V(w(H.IsActive),U.Draft,V(H.HasDraft,V(L("DraftAdministrativeData/InProcessByUser"),U.LockedBy,V(L("DraftAdministrativeData/LastChangedByUser"),U.UnsavedBy,U.Unsaved)),U.Flagged));const r=V(w(H.HasDraft),R.TextOnly,R.IconAndText);return D(l,{type:t,press:this.onObjectMarkerPressed.bind(this),visibility:r,visible:this.isDraftIndicatorVisible,additionalInfo:this.getIconAndTextAdditionalInfoBindingExpression(),ariaLabelledBy:this.ariaLabelledBy?[this.ariaLabelledBy]:[],class:this.class})};n.getIconOnlyContent=function e(){const t=V(w(H.IsActive),U.Draft,V(H.HasDraft,V(L("DraftAdministrativeData/InProcessByUser"),U.Locked,U.Unsaved),U.Flagged));const r=k(w(z.IsEditable),H.HasDraft,w(L("DraftAdministrativeData/DraftIsCreatedByMe")));return D(l,{type:t,press:this.onObjectMarkerPressed.bind(this),visibility:R.IconOnly,visible:r,ariaLabelledBy:this.ariaLabelledBy?[this.ariaLabelledBy]:[],class:this.class})};n.getContent=function e(){if(this.draftIndicatorType===R.IconAndText){return this.getIconAndTextContent()}else{return this.getIconOnlyContent()}};return r}(r),I=q(O.prototype,"id",[g],{configurable:true,enumerable:true,writable:true,initializer:null}),B=q(O.prototype,"ariaLabelledBy",[b],{configurable:true,enumerable:true,writable:true,initializer:null}),P=q(O.prototype,"draftIndicatorType",[A],{configurable:true,enumerable:true,writable:true,initializer:function(){return R.IconAndText}}),E=q(O.prototype,"entitySet",[_],{configurable:true,enumerable:true,writable:true,initializer:null}),C=q(O.prototype,"isDraftIndicatorVisible",[h],{configurable:true,enumerable:true,writable:true,initializer:function(){return j(false)}}),x=q(O.prototype,"class",[T],{configurable:true,enumerable:true,writable:true,initializer:function(){return""}}),O))||m);M=Q;return M},false);