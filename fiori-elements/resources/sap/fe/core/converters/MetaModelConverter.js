/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/common/AnnotationConverter","sap/fe/core/helpers/TypeGuards","../helpers/StableIdHelper"],function(e,t,n){"use strict";var i={};var o=n.prepareId;var a=t.isSingleton;var r=t.isServiceObject;var l=t.isNavigationProperty;var s=t.isEntityType;var p=t.isEntitySet;var y=t.isEntityContainer;const c={"Org.OData.Capabilities.V1":"Capabilities","Org.OData.Core.V1":"Core","Org.OData.Measures.V1":"Measures","com.sap.vocabularies.Common.v1":"Common","com.sap.vocabularies.UI.v1":"UI","com.sap.vocabularies.Session.v1":"Session","com.sap.vocabularies.Analytics.v1":"Analytics","com.sap.vocabularies.PersonalData.v1":"PersonalData","com.sap.vocabularies.Communication.v1":"Communication"};const f={Chart:true,MicroChart:true,UShell:true,IntentBasedNavigation:true,AppState:true};i.DefaultEnvironmentCapabilities=f;function u(e,t,n,i,o){let a;const r=`${n}/${t}`;const l=typeof e;if(e===null){a={type:"Null",Null:null}}else if(l==="string"){a={type:"String",String:e}}else if(l==="boolean"){a={type:"Bool",Bool:e}}else if(l==="number"){a={type:"Int",Int:e}}else if(Array.isArray(e)){a={type:"Collection",Collection:e.map((e,t)=>d(e,`${r}/${t}`,i,o))};if(e.length>0){if(e[0].hasOwnProperty("$PropertyPath")){a.Collection.type="PropertyPath"}else if(e[0].hasOwnProperty("$Path")){a.Collection.type="Path"}else if(e[0].hasOwnProperty("$NavigationPropertyPath")){a.Collection.type="NavigationPropertyPath"}else if(e[0].hasOwnProperty("$AnnotationPath")){a.Collection.type="AnnotationPath"}else if(e[0].hasOwnProperty("$Type")){a.Collection.type="Record"}else if(e[0].hasOwnProperty("$If")){a.Collection.type="If"}else if(e[0].hasOwnProperty("$Or")){a.Collection.type="Or"}else if(e[0].hasOwnProperty("$And")){a.Collection.type="And"}else if(e[0].hasOwnProperty("$Eq")){a.Collection.type="Eq"}else if(e[0].hasOwnProperty("$Ne")){a.Collection.type="Ne"}else if(e[0].hasOwnProperty("$Not")){a.Collection.type="Not"}else if(e[0].hasOwnProperty("$Gt")){a.Collection.type="Gt"}else if(e[0].hasOwnProperty("$Ge")){a.Collection.type="Ge"}else if(e[0].hasOwnProperty("$Lt")){a.Collection.type="Lt"}else if(e[0].hasOwnProperty("$Le")){a.Collection.type="Le"}else if(e[0].hasOwnProperty("$Apply")){a.Collection.type="Apply"}else if(typeof e[0]==="object"){a.Collection.type="Record"}else{a.Collection.type="String"}}}else if(e.$Path!==undefined){a={type:"Path",Path:e.$Path}}else if(e.$Decimal!==undefined){a={type:"Decimal",Decimal:parseFloat(e.$Decimal)}}else if(e.$PropertyPath!==undefined){a={type:"PropertyPath",PropertyPath:e.$PropertyPath}}else if(e.$NavigationPropertyPath!==undefined){a={type:"NavigationPropertyPath",NavigationPropertyPath:e.$NavigationPropertyPath}}else if(e.$If!==undefined){a={type:"If",If:e.$If}}else if(e.$And!==undefined){a={type:"And",And:e.$And}}else if(e.$Or!==undefined){a={type:"Or",Or:e.$Or}}else if(e.$Not!==undefined){a={type:"Not",Not:e.$Not}}else if(e.$Eq!==undefined){a={type:"Eq",Eq:e.$Eq}}else if(e.$Ne!==undefined){a={type:"Ne",Ne:e.$Ne}}else if(e.$Gt!==undefined){a={type:"Gt",Gt:e.$Gt}}else if(e.$Ge!==undefined){a={type:"Ge",Ge:e.$Ge}}else if(e.$Lt!==undefined){a={type:"Lt",Lt:e.$Lt}}else if(e.$Le!==undefined){a={type:"Le",Le:e.$Le}}else if(e.$Apply!==undefined){a={type:"Apply",Apply:e.$Apply,Function:e.$Function}}else if(e.$AnnotationPath!==undefined){a={type:"AnnotationPath",AnnotationPath:e.$AnnotationPath}}else if(e.$EnumMember!==undefined){a={type:"EnumMember",EnumMember:`${$(e.$EnumMember.split("/")[0])}/${e.$EnumMember.split("/")[1]}`}}else{a={type:"Record",Record:d(e,n,i,o)}}return{name:t,value:a}}function $(e){let[t,n]=e.split("@");if(!n){n=t;t=""}else{t+="@"}const i=n.lastIndexOf(".");return`${t+c[n.substr(0,i)]}.${n.substr(i+1)}`}function d(e,t,n,i){let o={};const a=typeof e;if(e===null){o={type:"Null",Null:null}}else if(a==="string"){o={type:"String",String:e}}else if(a==="boolean"){o={type:"Bool",Bool:e}}else if(a==="number"){o={type:"Int",Int:e}}else if(e.$AnnotationPath!==undefined){o={type:"AnnotationPath",AnnotationPath:e.$AnnotationPath}}else if(e.$Path!==undefined){o={type:"Path",Path:e.$Path}}else if(e.$Decimal!==undefined){o={type:"Decimal",Decimal:parseFloat(e.$Decimal)}}else if(e.$PropertyPath!==undefined){o={type:"PropertyPath",PropertyPath:e.$PropertyPath}}else if(e.$If!==undefined){o={type:"If",If:e.$If}}else if(e.$And!==undefined){o={type:"And",And:e.$And}}else if(e.$Or!==undefined){o={type:"Or",Or:e.$Or}}else if(e.$Not!==undefined){o={type:"Not",Not:e.$Not}}else if(e.$Eq!==undefined){o={type:"Eq",Eq:e.$Eq}}else if(e.$Ne!==undefined){o={type:"Ne",Ne:e.$Ne}}else if(e.$Gt!==undefined){o={type:"Gt",Gt:e.$Gt}}else if(e.$Ge!==undefined){o={type:"Ge",Ge:e.$Ge}}else if(e.$Lt!==undefined){o={type:"Lt",Lt:e.$Lt}}else if(e.$Le!==undefined){o={type:"Le",Le:e.$Le}}else if(e.$Apply!==undefined){o={type:"Apply",Apply:e.$Apply,Function:e.$Function}}else if(e.$NavigationPropertyPath!==undefined){o={type:"NavigationPropertyPath",NavigationPropertyPath:e.$NavigationPropertyPath}}else if(e.$EnumMember!==undefined){o={type:"EnumMember",EnumMember:`${$(e.$EnumMember.split("/")[0])}/${e.$EnumMember.split("/")[1]}`}}else if(Array.isArray(e)){const a=o;a.collection=e.map((e,o)=>d(e,`${t}/${o}`,n,i));if(e.length>0){if(e[0].hasOwnProperty("$PropertyPath")){a.collection.type="PropertyPath"}else if(e[0].hasOwnProperty("$Path")){a.collection.type="Path"}else if(e[0].hasOwnProperty("$NavigationPropertyPath")){a.collection.type="NavigationPropertyPath"}else if(e[0].hasOwnProperty("$AnnotationPath")){a.collection.type="AnnotationPath"}else if(e[0].hasOwnProperty("$Type")){a.collection.type="Record"}else if(e[0].hasOwnProperty("$If")){a.collection.type="If"}else if(e[0].hasOwnProperty("$And")){a.collection.type="And"}else if(e[0].hasOwnProperty("$Or")){a.collection.type="Or"}else if(e[0].hasOwnProperty("$Eq")){a.collection.type="Eq"}else if(e[0].hasOwnProperty("$Ne")){a.collection.type="Ne"}else if(e[0].hasOwnProperty("$Not")){a.collection.type="Not"}else if(e[0].hasOwnProperty("$Gt")){a.collection.type="Gt"}else if(e[0].hasOwnProperty("$Ge")){a.collection.type="Ge"}else if(e[0].hasOwnProperty("$Lt")){a.collection.type="Lt"}else if(e[0].hasOwnProperty("$Le")){a.collection.type="Le"}else if(e[0].hasOwnProperty("$Apply")){a.collection.type="Apply"}else if(typeof e[0]==="object"){a.collection.type="Record"}else{a.collection.type="String"}}}else{if(e.$Type){const t=e.$Type;o.type=t}const a=[];Object.keys(e).forEach(o=>{if(o!=="$Type"&&o!=="$If"&&o!=="$Apply"&&o!=="$And"&&o!=="$Or"&&o!=="$Ne"&&o!=="$Gt"&&o!=="$Ge"&&o!=="$Lt"&&o!=="$Le"&&o!=="$Not"&&o!=="$Eq"&&!o.startsWith("@")){a.push(u(e[o],o,t,n,i))}else if(o.startsWith("@")){N({[o]:e[o]},t,n,i)}});o.propertyValues=a}return o}function h(e,t){if(!t.hasOwnProperty(e)){t[e]={target:e,annotations:[]}}return t[e]}function P(e){const t=e.ID??e.Target.$AnnotationPath;return t?o(t):t}function m(e){return e.filter(e=>{if(e.Target&&e.Target.$AnnotationPath){return e.Target.$AnnotationPath.indexOf(`@${"com.sap.vocabularies.UI.v1.Chart"}`)===-1}else{return true}})}function v(e){return e.filter(e=>e.$Type!=="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation")}function g(e){return e.filter(e=>e.$AnnotationPath!==`@${"com.sap.vocabularies.UI.v1.Chart"}`)}function N(e,t,n,i){if(Object.keys(e).length===0){return}const o=h(t,n);if(!i.MicroChart){delete e[`@${"com.sap.vocabularies.UI.v1.Chart"}`]}for(let a in e){let r=e[a];switch(a){case`@${"com.sap.vocabularies.UI.v1.HeaderFacets"}`:if(!i.MicroChart){r=m(r);e[a]=r}break;case`@${"com.sap.vocabularies.UI.v1.Identification"}`:if(!i.IntentBasedNavigation){r=v(r);e[a]=r}break;case`@${"com.sap.vocabularies.UI.v1.LineItem"}`:if(!i.IntentBasedNavigation){r=v(r);e[a]=r}if(!i.MicroChart){r=m(r);e[a]=r}break;case`@${"com.sap.vocabularies.UI.v1.FieldGroup"}`:if(!i.IntentBasedNavigation){r.Data=v(r.Data);e[a]=r}if(!i.MicroChart){r.Data=m(r.Data);e[a]=r}break;case`@${"com.sap.vocabularies.UI.v1.PresentationVariant"}`:if(!i.Chart&&r.Visualizations){r.Visualizations=g(r.Visualizations);e[a]=r}break;default:break}let l=o;const s=a.split("@");if(s.length>2){l=h(`${t}@${s[1]}`,n);a=s[2]}else{a=s[1]}const p=a.split("#");const y=p[1];a=p[0];const c={term:a,qualifier:y};let f=`${t}@${c.term}`;if(y){f+=`#${y}`}let P=false;const O=typeof r;if(r===null){c.value={type:"Null"}}else if(O==="string"){c.value={type:"String",String:r}}else if(O==="boolean"){c.value={type:"Bool",Bool:r}}else if(O==="number"){c.value={type:"Int",Int:r}}else if(r.$If!==undefined){c.value={type:"If",If:r.$If}}else if(r.$And!==undefined){c.value={type:"And",And:r.$And}}else if(r.$Or!==undefined){c.value={type:"Or",Or:r.$Or}}else if(r.$Not!==undefined){c.value={type:"Not",Not:r.$Not}}else if(r.$Eq!==undefined){c.value={type:"Eq",Eq:r.$Eq}}else if(r.$Ne!==undefined){c.value={type:"Ne",Ne:r.$Ne}}else if(r.$Gt!==undefined){c.value={type:"Gt",Gt:r.$Gt}}else if(r.$Ge!==undefined){c.value={type:"Ge",Ge:r.$Ge}}else if(r.$Lt!==undefined){c.value={type:"Lt",Lt:r.$Lt}}else if(r.$Le!==undefined){c.value={type:"Le",Le:r.$Le}}else if(r.$Apply!==undefined){c.value={type:"Apply",Apply:r.$Apply,Function:r.$Function}}else if(r.$Path!==undefined){c.value={type:"Path",Path:r.$Path}}else if(r.$AnnotationPath!==undefined){c.value={type:"AnnotationPath",AnnotationPath:r.$AnnotationPath}}else if(r.$Decimal!==undefined){c.value={type:"Decimal",Decimal:parseFloat(r.$Decimal)}}else if(r.$EnumMember!==undefined){c.value={type:"EnumMember",EnumMember:`${$(r.$EnumMember.split("/")[0])}/${r.$EnumMember.split("/")[1]}`}}else if(Array.isArray(r)){P=true;c.collection=r.map((e,t)=>d(e,`${f}/${t}`,n,i));if(r.length>0){if(r[0].hasOwnProperty("$PropertyPath")){c.collection.type="PropertyPath"}else if(r[0].hasOwnProperty("$Path")){c.collection.type="Path"}else if(r[0].hasOwnProperty("$NavigationPropertyPath")){c.collection.type="NavigationPropertyPath"}else if(r[0].hasOwnProperty("$AnnotationPath")){c.collection.type="AnnotationPath"}else if(r[0].hasOwnProperty("$Type")){c.collection.type="Record"}else if(r[0].hasOwnProperty("$If")){c.collection.type="If"}else if(r[0].hasOwnProperty("$Or")){c.collection.type="Or"}else if(r[0].hasOwnProperty("$Eq")){c.collection.type="Eq"}else if(r[0].hasOwnProperty("$Ne")){c.collection.type="Ne"}else if(r[0].hasOwnProperty("$Not")){c.collection.type="Not"}else if(r[0].hasOwnProperty("$Gt")){c.collection.type="Gt"}else if(r[0].hasOwnProperty("$Ge")){c.collection.type="Ge"}else if(r[0].hasOwnProperty("$Lt")){c.collection.type="Lt"}else if(r[0].hasOwnProperty("$Le")){c.collection.type="Le"}else if(r[0].hasOwnProperty("$And")){c.collection.type="And"}else if(r[0].hasOwnProperty("$Apply")){c.collection.type="Apply"}else if(typeof r[0]==="object"){c.collection.type="Record"}else{c.collection.type="String"}}}else{const e={propertyValues:[]};if(r.$Type){const t=r.$Type;e.type=`${t}`}const t=[];for(const e in r){if(e!=="$Type"&&!e.startsWith("@")){t.push(u(r[e],e,f,n,i))}else if(e.startsWith("@")){N({[e]:r[e]},f,n,i)}}e.propertyValues=t;c.record=e}c.isCollection=P;l.annotations.push(c)}}function O(e,t,n){return{_type:"Property",name:n,fullyQualifiedName:`${t.fullyQualifiedName}/${n}`,type:e.$Type,maxLength:e.$MaxLength,precision:e.$Precision,scale:e.$Scale,nullable:e.$Nullable}}function b(e,t,n){let i=[];if(e.$ReferentialConstraint){i=Object.keys(e.$ReferentialConstraint).map(n=>({sourceTypeName:t.name,sourceProperty:n,targetTypeName:e.$Type,targetProperty:e.$ReferentialConstraint[n]}))}const o={_type:"NavigationProperty",name:n,fullyQualifiedName:`${t.fullyQualifiedName}/${n}`,partner:e.$Partner,isCollection:e.$isCollection?e.$isCollection:false,containsTarget:e.$ContainsTarget,targetTypeName:e.$Type,referentialConstraint:i};return o}function A(e,t,n){const i={_type:"EntitySet",name:t,navigationPropertyBinding:{},entityTypeName:e.$Type,fullyQualifiedName:`${n}/${t}`};return i}function T(e,t,n){return{_type:"Singleton",name:t,navigationPropertyBinding:{},entityTypeName:e.$Type,fullyQualifiedName:`${n}/${t}`,nullable:true}}function C(e,t,n){return{_type:"ActionImport",name:t,fullyQualifiedName:`${n}/${t}`,actionName:e.$Action}}function w(e,t,n){const i={_type:"TypeDefinition",name:t.substring(n.length),fullyQualifiedName:t,underlyingType:e.$UnderlyingType};return i}function I(e,t,n){const i={_type:"ComplexType",name:t.substring(n.length),fullyQualifiedName:t,properties:[],navigationProperties:[]};const o=Object.keys(e).filter(t=>{if(t!="$Key"&&t!="$kind"){return e[t].$kind==="Property"}}).sort((e,t)=>e>t?1:-1).map(t=>O(e[t],i,t));i.properties=o;const a=Object.keys(e).filter(t=>{if(t!="$Key"&&t!="$kind"){return e[t].$kind==="NavigationProperty"}}).sort((e,t)=>e>t?1:-1).map(t=>b(e[t],i,t));i.navigationProperties=a;return i}function E(e,t){if(!e.$Key&&e.$BaseType){return E(t[e.$BaseType],t)}return e.$Key??[]}function L(e,t,n,i){var o,a;const r={_type:"EntityType",name:t.substring(n.length),fullyQualifiedName:t,keys:[],entityProperties:[],navigationProperties:[],actions:{}};for(const t in e){const n=e[t];switch(n.$kind){case"Property":const e=O(n,r,t);r.entityProperties.push(e);break;case"NavigationProperty":const i=b(n,r,t);r.navigationProperties.push(i);break}}r.keys=E(e,i).map(e=>r.entityProperties.find(t=>t.name===e)).filter(e=>e!==undefined);(o=i.$Annotations[r.fullyQualifiedName])===null||o===void 0?void 0:(a=o[`@${"com.sap.vocabularies.UI.v1.FilterFacets"}`])===null||a===void 0?void 0:a.forEach(e=>{e.ID=P(e)});for(const e of r.entityProperties){if(!i.$Annotations[e.fullyQualifiedName]){i.$Annotations[e.fullyQualifiedName]={}}if(!i.$Annotations[e.fullyQualifiedName][`@${"com.sap.vocabularies.UI.v1.DataFieldDefault"}`]){i.$Annotations[e.fullyQualifiedName][`@${"com.sap.vocabularies.UI.v1.DataFieldDefault"}`]={$Type:"com.sap.vocabularies.UI.v1.DataField",Value:{$Path:e.name}}}}return r}function G(e,t,n){var i;let o="";let a=e;if(t.$IsBound){const n=t.$Parameter[0];o=n.$Type;if(n.$isCollection===true){a=`${e}(Collection(${o}))`}else{a=`${e}(${o})`}}const r=t.$Parameter??[];return{_type:"Action",name:e.substring(n.length),fullyQualifiedName:a,isBound:t.$IsBound??false,isFunction:t.$kind==="Function",sourceType:o,returnType:((i=t.$ReturnType)===null||i===void 0?void 0:i.$Type)??"",parameters:r.map(e=>({_type:"ActionParameter",fullyQualifiedName:`${a}/${e.$Name}`,isCollection:e.$isCollection??false,name:e.$Name,type:e.$Type}))}}function D(e,t,n,i){i.entityContainer={_type:"EntityContainer",name:t.substring(e.length),fullyQualifiedName:t};for(const e in n){const o=n[e];switch(o.$kind){case"EntitySet":i.entitySets.push(A(o,e,t));break;case"Singleton":i.singletons.push(T(o,e,t));break;case"ActionImport":i.actionImports.push(C(o,e,t));break}}for(const e of i.entitySets){const t=n[e.name].$NavigationPropertyBinding;if(t){for(const n of Object.keys(t)){const o=i.entitySets.find(e=>e.name===t[n]);if(o){e.navigationPropertyBinding[n]=o}}}}}function M(e,t){const n={};for(const i in e){N(e[i],i,n,t)}return Object.values(n)}function k(e){const t=Object.keys(e).find(t=>e[t].$kind==="Schema")??"";const n={namespace:t.slice(0,-1),entityContainer:{_type:"EntityContainer",name:"",fullyQualifiedName:""},entitySets:[],entityTypes:[],complexTypes:[],typeDefinitions:[],singletons:[],associations:[],associationSets:[],actions:[],actionImports:[],annotations:{}};const i=(i,o)=>{switch(o.$kind){case"EntityContainer":D(t,i,o,n);break;case"Action":case"Function":n.actions.push(G(i,o,t));break;case"EntityType":n.entityTypes.push(L(o,i,t,e));break;case"ComplexType":n.complexTypes.push(I(o,i,t));break;case"TypeDefinition":n.typeDefinitions.push(w(o,i,t));break}};for(const t in e){const n=e[t];if(Array.isArray(n)){for(const e of n){i(t,e)}}else{i(t,n)}}return n}function S(t){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:f;const i={identification:"metamodelResult",version:"4.0",references:[]};e.lazy(i,"schema",()=>{const i=t.getObject("/$");const o=k(i);e.lazy(o.annotations,"metamodelResult",()=>M(i.$Annotations,n));return o});return i}i.parseMetaModel=S;const j={};function B(t,n){const i=t.id;if(!j.hasOwnProperty(i)){const o=S(t,n);try{j[i]=e.convert(o)}catch(e){throw new Error(e)}}return j[i]}i.convertTypes=B;function F(e){const t=e.getModel();if(!t.isA("sap.ui.model.odata.v4.ODataMetaModel")){throw new Error("This should only be called on a ODataMetaModel")}return B(t)}i.getConvertedTypes=F;function Q(e){delete j[e.id]}i.deleteModelCacheData=Q;function q(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;const n=B(e.getModel());const i=e.getPath();const o=i.split("/");let a=o[1];let r=2;if(n.entityContainer.fullyQualifiedName===a){a=o[2];r++}let l=n.entitySets.find(e=>e.name===a);if(!l){l=n.singletons.find(e=>e.name===a)}let s=o.slice(r).join("/");const p=[l];while(s&&s.length>0&&s.startsWith("$NavigationPropertyBinding")){var y;let e=s.split("/");let t=0;let n,i;e=e.slice(1);while(!n&&e.length>t){if(e[t]!=="$NavigationPropertyBinding"){i=e.slice(0,t+1).join("/").replace("/$NavigationPropertyBinding","");n=l&&l.navigationPropertyBinding[i]}t++}if(!n){i=e[0]}const o=((y=i)===null||y===void 0?void 0:y.split("/"))||[];let a=l&&l.entityType;for(const e of o){const t=a&&a.navigationProperties.find(t=>t.name===e);if(t){p.push(t);a=t.targetType}else{break}}l=l&&n||l&&l.navigationPropertyBinding[e[0]];if(l){p.push(l)}e=e.slice(o.length||1);if(e.length&&e[0]==="$"){e.shift()}s=e.join("/")}if(s.startsWith("$Type")){if(s.startsWith("$Type@")){s=s.replace("$Type","")}else{s=o.slice(3).join("/")}}if(l&&s.length){const e=l.entityType.resolvePath(s,t);if(e){if(t){e.visitedObjects=p.concat(e.visitedObjects)}}else if(l.entityType&&l.entityType.actions){const e=l.entityType&&l.entityType.actions;const t=s.split("/");if(e[t[0]]){const n=e[t[0]];if(t[1]&&n.parameters){const e=t[1];return n.parameters.find(t=>t.fullyQualifiedName.endsWith(`/${e}`))}else if(s.length===1){return n}}}return e}else{if(t){return{target:l,visitedObjects:p}}return l}}i.convertMetaModelContext=q;function U(e,t){const n=B(e.getModel());const i=q(e,true);let o;if(t&&t.getPath()!=="/"){o=U(t)}return R(i,n,o)}i.getInvolvedDataModelObjects=U;function R(e,t,n){let i=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;const o=e.visitedObjects.filter(e=>r(e)&&!s(e)&&!y(e));if(r(e.target)&&!s(e.target)&&o[o.length-1]!==e.target&&!i){o.push(e.target)}const c=[];const f=o[0];let u=f;let $=f.entityType;let d;let h=[];for(let e=1;e<o.length;e++){d=o[e];if(l(d)){var P;h.push(d.name);c.push(d);$=d.targetType;const e=(P=u)===null||P===void 0?void 0:P.navigationPropertyBinding[h.join("/")];if(e!==undefined){u=e;h=[]}}if(p(d)||a(d)){u=d;$=u.entityType}}if(h.length>0){u=undefined}if(n&&n.startingEntitySet!==f){const e=o.indexOf(n.startingEntitySet);if(e!==-1){const t=o.slice(0,e);n.startingEntitySet=f;n.navigationProperties=t.filter(l).concat(n.navigationProperties)}}const m={startingEntitySet:f,targetEntitySet:u,targetEntityType:$,targetObject:e.target,navigationProperties:c,contextLocation:n,convertedTypes:t};if(!r(m.targetObject)&&i){m.targetObject=r(d)?d:undefined}if(!m.contextLocation){m.contextLocation=m}return m}i.getInvolvedDataModelObjectFromPath=R;return i},false);