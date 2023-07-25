/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/util/merge","sap/fe/core/CommonUtils","sap/fe/core/helpers/BindingToolkit","sap/fe/core/helpers/ModelHelper","sap/fe/core/helpers/TypeGuards","./controls/AnyElement","./converters/ConverterContext","./converters/objectPage/HeaderAndFooterAction"],function(t,e,n,o,i,l,s,a){"use strict";var d=a.getHiddenExpression;var r=a.getEditButtonEnabled;var c=i.isEntitySet;var u=n.transformRecursively;var p=n.equal;var g=n.constant;var f=n.compileExpression;const v={setActionEnablement:async function(t,n,o,i){const l=[];for(const s in n){let a=[];t.setProperty(s,false);const d=n[s];for(let e=0;e<o.length;e++){const n=o[e];if(n){const e=n.getObject();if(i==="chart"){if(d===null&&!!e[`#${s}`]||n.getObject(d)){t.setProperty(s,true);break}}else if(i==="table"){a=this._setActionEnablementForTable(n,t,s,d,a)}}}if(i==="table"){if(!o.length){t.setProperty(`dynamicActions/${s}`,{bEnabled:false,aApplicable:[],aNotApplicable:[]});l.push(e.setContextsBasedOnOperationAvailable(t,[]))}else if(o.length&&typeof d==="string"){l.push(e.setContextsBasedOnOperationAvailable(t,a))}}}return Promise.all(l)},setActionEnablementAfterPatch:function(t,e,n){const o=n===null||n===void 0?void 0:n.getObject();const i=(o===null||o===void 0?void 0:o.controls)||{};for(const n in i){if(i[n]&&i[n].controlId){const o=t.byId(n);if(o&&o.isA("sap.ui.mdc.Table")){const t=o.getRowBinding();if(t==e){v.setActionEnablement(o.getBindingContext("internal"),JSON.parse(o.data("operationAvailableMap").customData),o.getSelectedContexts(),"table")}}}}},updateEditButtonVisibilityAndEnablement(n){var i;const l=(i=n.getViewData())===null||i===void 0?void 0:i.viewLevel;if(l>1){var a,u,g,v;const i=n.getBindingContext();const l=e.getAppComponent(n);const b=o.getMetaPathForContext(i);const y=o.getRootEntitySetPath(b);const h=i===null||i===void 0?void 0:(a=i.getModel())===null||a===void 0?void 0:(u=a.getMetaModel())===null||u===void 0?void 0:u.getContext(i===null||i===void 0?void 0:i.getPath());const x=s===null||s===void 0?void 0:s.createConverterContextForMacro(y,h,l.getDiagnostics(),t,undefined);const E=x.getEntitySet();const C=x.getEntityType();let A;const m=c(E)&&((g=E.annotations.UI)===null||g===void 0?void 0:(v=g.UpdateHidden)===null||v===void 0?void 0:v.valueOf());if(m!==true){A=o.isUpdateHidden(E,C)}const P=r(x,undefined);const B=o.getDraftRootPath(i);const M=o.getStickyRootPath(i);const O=B||M;const T=n.getBindingContext("internal");if(O){const t=n.getModel().bindContext(O).getBoundContext();if(A!==undefined){const e=f(p(d(x,A),false));this.updateEditModelContext(e,n,t,"rootEditVisible",T)}if(P){this.updateEditModelContext(P,n,t,"rootEditEnabled",T)}}}},updateEditModelContext:function(t,e,n,o,i){if(t){var s,a,d;const r=new l({anyText:t});r.setBindingContext(null);e.addDependent(r);r.getBinding("anyText");const c=(s=r.getModel())===null||s===void 0?void 0:(a=s.bindContext(n.getPath(),n,{$$groupId:"$auto.Heroes"}))===null||a===void 0?void 0:a.getBoundContext();r.setBindingContext(c);r===null||r===void 0?void 0:(d=r.getBinding("anyText"))===null||d===void 0?void 0:d.attachChange(t=>{const e=t.getSource().getExternalValue();i.setProperty(o,e)})}},_setActionEnablementForTable:function(t,n,o,i,l){n.setProperty(`dynamicActions/${o}`,{bEnabled:false,aApplicable:[],aNotApplicable:[]});const s=[],a=[],d=`${n.getPath()}/dynamicActions/${o}/bEnabled`;if(typeof i==="object"&&i!==null&&i!==undefined){if(t){const e=t.getObject();const o=u(i,"PathInModel",function(t){return e?g(e[t.path]):g(false)},true);const l=f(o);if(l==="true"){n.getModel().setProperty(d,true);s.push(t)}else{a.push(t)}}e.setDynamicActionContexts(n,o,s,a)}else{const s=t===null||t===void 0?void 0:t.getObject();if(i===null&&!!s[`#${o}`]){n.getModel().setProperty(d,true)}else if(t!==undefined){l.push(e.requestProperty(t,o,i,d))}}return l}};return v},false);