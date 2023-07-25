/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/buildingBlocks/BuildingBlockSupport","sap/fe/core/buildingBlocks/RuntimeBuildingBlock","sap/fe/core/CommonUtils","sap/fe/core/converters/helpers/BindingHelper","sap/fe/core/helpers/BindingToolkit","sap/fe/core/helpers/ClassSupport","sap/fe/templates/ObjectPage/ObjectPageTemplating","sap/m/Button","sap/m/ResponsivePopover","sap/m/SelectList","sap/ui/core/InvisibleText","sap/ui/core/Item","sap/fe/core/jsx-runtime/jsx","sap/fe/core/jsx-runtime/jsxs","sap/fe/core/jsx-runtime/Fragment"],function(e,t,i,r,n,o,a,c,l,s,p,f,u,d,v){"use strict";var _,T,h,b,g,A,O,w,S,m,C;var E={};var y=a.getSwitchDraftAndActiveVisibility;var I=o.defineReference;var D=n.pathInModel;var P=n.not;var B=n.ifElse;var R=n.and;var j=r.UI;var x=r.Entity;var H=e.defineBuildingBlock;var V=e.blockAttribute;function z(e,t,i,r){if(!i)return;Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}function K(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function M(e,t){e.prototype=Object.create(t.prototype);e.prototype.constructor=e;k(e,t)}function k(e,t){k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,i){t.__proto__=i;return t};return k(e,t)}function F(e,t,i,r,n){var o={};Object.keys(r).forEach(function(e){o[e]=r[e]});o.enumerable=!!o.enumerable;o.configurable=!!o.configurable;if("value"in o||o.initializer){o.writable=true}o=i.slice().reverse().reduce(function(i,r){return r(e,t,i)||i},o);if(n&&o.initializer!==void 0){o.value=o.initializer?o.initializer.call(n):void 0;o.initializer=undefined}if(o.initializer===void 0){Object.defineProperty(e,t,o);o=null}return o}function N(e,t){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let W=(_=H({name:"DraftHandlerButton",namespace:"sap.fe.templates.ObjectPage.components"}),T=V({type:"string"}),h=V({type:"sap.ui.model.Context"}),b=I(),g=I(),_(A=(O=function(e){M(t,e);function t(t){var r;r=e.call(this,t)||this;r.SWITCH_TO_DRAFT_KEY="switchToDraft";r.SWITCH_TO_ACTIVE_KEY="switchToActive";z(r,"id",w,K(r));z(r,"contextPath",S,K(r));z(r,"switchToActiveRef",m,K(r));z(r,"switchToDraftRef",C,K(r));r.initialSelectedKey=r.SWITCH_TO_ACTIVE_KEY;r.handleSelectedItemChange=e=>{const t=e.getParameter("item").getProperty("key");if(t!==r.initialSelectedKey){r._containingView.getController().editFlow.toggleDraftActive(r._containingView.getBindingContext())}if(r.popover){r.popover.close();r.popover.destroy();delete r.popover}};r.openSwitchActivePopover=e=>{const t=e.getSource();const n=i.getTargetView(t);const o=n.getBindingContext();const a=o.getObject().IsActiveEntity;r.initialSelectedKey=a?r.SWITCH_TO_ACTIVE_KEY:r.SWITCH_TO_DRAFT_KEY;r.popover=r.createPopover();r._containingView=n;n.addDependent(r.popover);r.popover.openBy(t);r.popover.attachEventOnce("afterOpen",()=>{if(a){var e;(e=r.switchToDraftRef.current)===null||e===void 0?void 0:e.focus()}else{var t;(t=r.switchToActiveRef.current)===null||t===void 0?void 0:t.focus()}});return r.popover};return r}E=t;var r=t.prototype;r.createPopover=function e(){return u(l,{showHeader:false,contentWidth:"15.625rem",verticalScrolling:false,class:"sapUiNoContentPadding",placement:"Bottom",children:d(s,{selectedKey:this.initialSelectedKey,itemPress:this.handleSelectedItemChange,children:[u(f,{text:"{sap.fe.i18n>C_COMMON_OBJECT_PAGE_DISPLAY_DRAFT_MIT}",ref:this.switchToDraftRef},this.SWITCH_TO_DRAFT_KEY),u(f,{text:"{sap.fe.i18n>C_COMMON_OBJECT_PAGE_DISPLAY_SAVED_VERSION_MIT}",ref:this.switchToActiveRef},this.SWITCH_TO_ACTIVE_KEY)]})})};r.getContent=function e(){const t=B(R(P(j.IsEditable),P(j.IsCreateMode),x.HasDraft),D("C_COMMON_OBJECT_PAGE_SAVED_VERSION_BUT","sap.fe.i18n"),D("C_COMMON_OBJECT_PAGE_DRAFT_BUT","sap.fe.i18n"));const i=y(this.contextPath.getObject("@"));return d(v,{children:[u(c,{id:"fe::StandardAction::SwitchDraftAndActiveObject",text:t,visible:i,icon:"sap-icon://navigation-down-arrow",iconFirst:false,type:"Transparent",press:this.openSwitchActivePopover,ariaDescribedBy:["fe::StandardAction::SwitchDraftAndActiveObject::AriaTextDraftSwitcher"]}),u(p,{text:"{sap.fe.i18n>T_HEADER_DATAPOINT_TITLE_DRAFT_SWITCHER_ARIA_BUTTON}",id:"fe::StandardAction::SwitchDraftAndActiveObject::AriaTextDraftSwitcher"})]})};return t}(t),w=F(O.prototype,"id",[T],{configurable:true,enumerable:true,writable:true,initializer:null}),S=F(O.prototype,"contextPath",[h],{configurable:true,enumerable:true,writable:true,initializer:null}),m=F(O.prototype,"switchToActiveRef",[b],{configurable:true,enumerable:true,writable:true,initializer:null}),C=F(O.prototype,"switchToDraftRef",[g],{configurable:true,enumerable:true,writable:true,initializer:null}),O))||A);E=W;return E},false);