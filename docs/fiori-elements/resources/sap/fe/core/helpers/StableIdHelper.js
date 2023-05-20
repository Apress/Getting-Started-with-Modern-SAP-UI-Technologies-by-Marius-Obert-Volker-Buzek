/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define([],function(){"use strict";var e={};const a=e=>{var a;const t=[e.SemanticObject.valueOf(),(a=e.Action)===null||a===void 0?void 0:a.valueOf()];if(e.RequiresContext){t.push("RequiresContext")}return t.filter(e=>e).join("::")};const t=e=>{const a=e.Value;if(a.path){return a.path}else if(a.Apply&&a.Function==="odata.concat"){return a.Apply.map(e=>e.$Path).join("::")}return l(a.replace(/ /g,"_"))};const i=e=>/^([A-Za-z_][-A-Za-z0-9_.:]*)$/.test(e);const r=e=>{e=e.replace("com.sap.vocabularies.UI.v1.","");e=e.replace("com.sap.vocabularies.Communication.v1.","");return e};const n=function(e){var a;let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;let i;switch(e.$Type){case"com.sap.vocabularies.UI.v1.ReferenceFacet":i=e.ID??e.Target.value;break;case"com.sap.vocabularies.UI.v1.CollectionFacet":i=e.ID??"undefined";break;case"com.sap.vocabularies.UI.v1.FieldGroupType":i=e.Label;break;default:i=c(e);break}i=(a=i)===null||a===void 0?void 0:a.toString();return i&&t?s(i):i};e.createIdForAnnotation=n;const o=e=>{const a=e.map(e=>{if(typeof e==="string"||!e){return e}return n(e.targetObject||e,false)});const t=a.filter(e=>e).join("::");return s(t)};e.generate=o;const c=function(e){let i=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;let r="";switch(e.$Type){case"com.sap.vocabularies.UI.v1.DataFieldForAction":r=`DataFieldForAction::${e.Action}`;break;case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":r=`DataFieldForIntentBasedNavigation::${a(e)}`;break;case"com.sap.vocabularies.UI.v1.DataFieldForAnnotation":r=`DataFieldForAnnotation::${e.Target.value}`;break;case"com.sap.vocabularies.UI.v1.DataFieldWithAction":r=`DataFieldWithAction::${t(e)}::${e.Action}`;break;case"com.sap.vocabularies.UI.v1.DataField":r=`DataField::${t(e)}`;break;case"com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation":r=`DataFieldWithIntentBasedNavigation::${t(e)}::${a(e)}`;break;case"com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":r=`DataFieldWithNavigationPath::${t(e)}`;if(e.Target.type==="NavigationPropertyPath"&&!i){r=`${r}::${e.Target.value}`}break;case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":r=`DataFieldWithUrl::${t(e)}`;break;default:break}return r?s(r):undefined};e.getStableIdPartFromDataField=c;const l=e=>{if(e.indexOf(" ")>=0){throw Error(`${e} - Spaces are not allowed in ID parts.`)}e=e.replace(/^\/|^@|^#|^\*/,"").replace(/\/$|@$|#$|\*$/,"").replace(/\/|@|\(|\)|#|\*/g,"::");while(e.indexOf("::::")>-1){e=e.replace("::::","::")}if(e.slice(-2)=="::"){e=e.slice(0,-2)}return e};e.replaceSpecialChars=l;const s=function(e){e=l(r(e));if(i(e)){return e}else{throw Error(`${e} - Stable Id could not be generated due to insufficient information.`)}};e.prepareId=s;return e},false);