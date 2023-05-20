/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingToolkit","sap/fe/core/helpers/TypeGuards"],function(t,e){"use strict";var n={};var i=e.isProperty;var r=e.isPathAnnotationExpression;var o=e.isNavigationProperty;var a=e.isMultipleNavigationProperty;var l=e.isEntityType;var s=e.isEntitySet;var c=e.isComplexType;var u=t.unresolvableExpression;var g=t.getExpressionFromAnnotation;var v=t.equal;var d=t.constant;const f=function(t){return p(t===null||t===void 0?void 0:t.contextLocation,t===null||t===void 0?void 0:t.navigationProperties).map(t=>t.name)};n.getRelativePaths=f;const p=function(t){let e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];const n=t=>{let e=0;while(t.length>1&&e!=t.length-1){const n=t[e];const i=t[e+1];if(o(n)&&n.partner===i.name){t.splice(0,2)}else{e++}}return t};const i=(t,e,n)=>{const i=[];t.forEach((t,r)=>{if(e[r]!==t){i.push(n?t:e[r])}});return i};if(!t){return e}if(e.length>=t.navigationProperties.length){let r=i(t.navigationProperties,e,false);r=r.concat(e.slice(t.navigationProperties.length));return n(r)}let r=i(e,t.navigationProperties,true);r=r.concat(t.navigationProperties.slice(e.length));n(r);r=r.map(t=>o(t)?t.targetType.navigationProperties.find(e=>e.name===t.partner):t);return r};n.getPathRelativeLocation=p;const y=function(t,e){let n="";if(r(e)){n=e.path}else if(typeof e==="string"){n=e}let i;if(r(e)){i=e.$target}else if(P(t)){var o;i=(o=t.convertedTypes.resolvePath(`${j(t)}/${n}`))===null||o===void 0?void 0:o.target}else{if(n.startsWith("/")){n=n.substring(1)}i=t.targetEntityType.resolvePath(n)}const a=n.split("/");let l=t;for(const t of a){l=h(l,t)}l.targetObject=i;return l};n.enhanceDataModelPath=y;const h=function(t,e){let n;let i;const r=t.navigationProperties.concat();const o=r.length;const a=o?r[o-1].targetType:t.targetEntityType;if(!a){return t}else if(l(a)||c(a)){const o=t.targetEntitySet;const l=a.navigationProperties.find(t=>t.name===e);if(l){r.push(l);i=l.targetType;const t=b(r);if(t&&o!==null&&o!==void 0&&o.navigationPropertyBinding.hasOwnProperty(t)){n=o.navigationPropertyBinding[t]}}else{const t=(a.entityProperties||a.properties).find(t=>t.name===e);if(t!==null&&t!==void 0&&t.targetType){r.push(t)}}}return{startingEntitySet:t.startingEntitySet,navigationProperties:r,contextLocation:t.contextLocation,targetEntitySet:n??t.targetEntitySet,targetEntityType:i??t.targetEntityType,targetObject:t.targetObject,convertedTypes:t.convertedTypes}};const P=function(t){return t.navigationProperties.find(t=>c(t===null||t===void 0?void 0:t.targetType))!==undefined};const b=function(t){const e=t.length;if(e){const n=t[e-1];const i=c(n.targetType);let r="";if(e>1&&!i){for(let n=0;n<e-1;n++){const e=t[n];if(c(e.targetType)){r+=`${e.name}/`}else{r=""}}}return i?"":`${r}${n.name}`}return""};const O=function(t){const e=`/${t.startingEntitySet.name}`;let n=e;let i=t.startingEntitySet;const r=t.navigationProperties;let o;for(let t=0;t<r.length;t++){o=b(r.slice(0,t+1));if(i&&i.navigationPropertyBinding.hasOwnProperty(o)){n+=`/$NavigationPropertyBinding/${o.replace("/","%2F")}`;i=i.navigationPropertyBinding[o]}}n+="/$";return n};n.getTargetEntitySetPath=O;const j=function(t){let e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;let n="";if(!t.startingEntitySet){return"/"}if(!e){n+=`/${t.startingEntitySet.name}`}if(t.navigationProperties.length>0){n=L(n);n+=t.navigationProperties.map(t=>t.name).join("/")}return n};n.getTargetNavigationPath=j;const m=function(t){var e,n;let i=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;let r=j(t,i);if((e=t.targetObject)!==null&&e!==void 0&&e.name&&!o(t.targetObject)&&!l(t.targetObject)&&!s(t.targetObject)&&!c((n=t.targetObject)===null||n===void 0?void 0:n.targetType)&&t.targetObject!==t.startingEntitySet){r=L(r);r+=`${t.targetObject.name}`}else if(t.targetObject&&t.targetObject.hasOwnProperty("term")){r=L(r);r+=`@${t.targetObject.term}`;if(t.targetObject.hasOwnProperty("qualifier")&&!!t.targetObject.qualifier){r+=`#${t.targetObject.qualifier}`}}return r};n.getTargetObjectPath=m;const E=function(t){var e;let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;let i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(((e=t.contextLocation)===null||e===void 0?void 0:e.startingEntitySet)!==t.startingEntitySet){return m(t)}return T(t,n,i)};n.getContextRelativeTargetObjectPath=E;const T=function(t){var e;let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;let i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(!t.targetObject){return undefined}const r=p(t.contextLocation,t.navigationProperties);if(n){if(r.some(a)){return undefined}}let u=i?r.map(t=>{const e=a(t);return e?`${t.name}*`:t.name}).join("/"):r.map(t=>t.name).join("/");if((t.targetObject.name||t.targetObject.type==="PropertyPath"&&t.targetObject.value)&&!o(t.targetObject)&&!l(t.targetObject)&&!s(t.targetObject)&&!c((e=t.targetObject)===null||e===void 0?void 0:e.targetType)&&t.targetObject!==t.startingEntitySet){u=L(u);u+=t.targetObject.type==="PropertyPath"?`${t.targetObject.value}`:`${t.targetObject.name}`}else if(t.targetObject.hasOwnProperty("term")){u=L(u);u+=`@${t.targetObject.term}`;if(t.targetObject.hasOwnProperty("qualifier")&&!!t.targetObject.qualifier){u+=`#${t.targetObject.qualifier}`}}return u};const S=function(t,e){return B(t,t=>{var e;return t===null||t===void 0?void 0:(e=t.UpdateRestrictions)===null||e===void 0?void 0:e.Updatable},e)};n.isPathUpdatable=S;const $=function(t,e){return B(t,t=>{var e;return t===null||t===void 0?void 0:(e=t.SearchRestrictions)===null||e===void 0?void 0:e.Searchable},e)};n.isPathSearchable=$;const x=function(t,e){return B(t,t=>{var e;return t===null||t===void 0?void 0:(e=t.DeleteRestrictions)===null||e===void 0?void 0:e.Deletable},e)};n.isPathDeletable=x;const R=function(t,e){return B(t,t=>{var e;return t===null||t===void 0?void 0:(e=t.InsertRestrictions)===null||e===void 0?void 0:e.Insertable},e)};n.isPathInsertable=R;const w=function(t,e){return B(t,n=>{if(n&&"FilterRestrictions"in n){var i;const o=(n===null||n===void 0?void 0:(i=n.FilterRestrictions)===null||i===void 0?void 0:i.FilterExpressionRestrictions)||[];const a=o.find(e=>e.Property.$target===t.targetObject);if(a){var r;return e.indexOf(a===null||a===void 0?void 0:(r=a.AllowedExpressions)===null||r===void 0?void 0:r.toString())!==-1}else{return false}}else{return false}})};n.checkFilterExpressionRestrictions=w;const B=function(t,e,n){if(!t||!t.startingEntitySet){return d(true)}t=y(t,n===null||n===void 0?void 0:n.propertyPath);let r=t.startingEntitySet;let o=null;let a=[];const l=[];let s=r;const c=t.targetEntityType;let f=false;t.navigationProperties.forEach(t=>{if(f){a=[]}a.push(t.name);l.push(t);if(i(t)||!t.containsTarget){const t=a.join("/");if(r&&r.navigationPropertyBinding.hasOwnProperty(t)){o=r;r=r.navigationPropertyBinding[t];s=r;f=true}else{o=r;r=null;f=true}}else{o=r;s=null}});const h=a.join("/");let P,b;if(o!==null){var O,j,m;const i=o;(O=i.annotations)===null||O===void 0?void 0:(j=O.Capabilities)===null||j===void 0?void 0:(m=j.NavigationRestrictions)===null||m===void 0?void 0:m.RestrictedProperties.forEach(i=>{var r;if(((r=i.NavigationProperty)===null||r===void 0?void 0:r.type)==="NavigationPropertyPath"){const r=e(i);if(h===i.NavigationProperty.value&&r!==undefined){var o;const e=l.slice(0,-1);b=e;const i=p((o=t)===null||o===void 0?void 0:o.contextLocation,b).map(t=>t.name);const a=n!==null&&n!==void 0&&n.pathVisitor?N(n.pathVisitor,i):undefined;P=v(g(r,i,undefined,a),true)}}})}let E;if(!(n!==null&&n!==void 0&&n.ignoreTargetCollection)){var T,S;let i=e((T=s)===null||T===void 0?void 0:(S=T.annotations)===null||S===void 0?void 0:S.Capabilities);if(s===null&&i===undefined){var $;i=e(c===null||c===void 0?void 0:($=c.annotations)===null||$===void 0?void 0:$.Capabilities)}if(i!==undefined){const e=p(t.contextLocation,l).map(t=>t.name);const r=n!==null&&n!==void 0&&n.pathVisitor?N(n.pathVisitor,e):undefined;E=v(g(i,e,undefined,r),true)}}return P||E||(n!==null&&n!==void 0&&n.authorizeUnresolvable?u:d(true))};n.checkOnPath=B;const L=function(t){if(t.length&&!t.endsWith("/")){return`${t}/`}return t};const N=function(t,e){return function(n){return t(n,e)}};return n},false);