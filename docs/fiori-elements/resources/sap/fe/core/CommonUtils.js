/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/base/util/array/uniqueSort","sap/base/util/merge","sap/fe/core/converters/ConverterContext","sap/fe/core/converters/MetaModelConverter","sap/fe/core/helpers/BindingToolkit","sap/fe/core/helpers/ModelHelper","sap/fe/core/helpers/SemanticDateOperators","sap/fe/core/helpers/StableIdHelper","sap/fe/core/type/TypeUtil","sap/ui/core/Component","sap/ui/core/Fragment","sap/ui/core/util/XMLPreprocessor","sap/ui/core/XMLTemplateProcessor","sap/ui/Device","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/condition/RangeOperator","sap/ui/model/Filter","./controls/AnyElement","./helpers/MetaModelFunction","./templating/FilterHelper"],function(e,t,n,o,i,r,s,a,c,l,u,p,f,d,g,m,b,O,h,v,P){"use strict";var y={};var S=P.getConditions;var E=g.system;var j=c.generate;var C=r.pathInModel;var $=r.compileExpression;function T(e){if(!e){return undefined}return e.replace(/"/g," ").replace(/\\/g,"\\\\").split(/\s+/).reduce(function(e,t){if(t!==""){e=`${e?`${e} `:""}"${t}"`}return e},undefined)}async function A(e){var t;const n=e.getModel();const o=n.getMetaModel();const r=o.getMetaPath(e.getPath());const s=i.getInvolvedDataModelObjects(o.getContext(r));await e.requestProperty((t=s.targetEntityType.keys[0])===null||t===void 0?void 0:t.name)}function x(e){let t=false;if(e){e.getCurrentContexts().forEach(function(e){if(e&&e.isTransient()){t=true}})}return t}async function F(e,t,n,o){return e.getLinks({semanticObject:n,params:o})}function N(e){const t=[];const n=Object.keys(e);let o;for(let i=0;i<n.length;i++){o={LocalProperty:{$PropertyPath:n[i]},SemanticObjectProperty:e[n[i]]};t.push(o)}return t}function M(e,t,n,o,i){for(let r=0;r<e.length;r++){const s=e[r];const a=s.intent;const c=a.split("-")[1].split("?")[0];if(i&&i.includes(c)){o.push({text:s.text,targetSemObject:a.split("#")[1].split("-")[0],targetAction:c.split("~")[0],targetParams:n})}else if(!i&&t&&t.indexOf(c)===-1){o.push({text:s.text,targetSemObject:a.split("#")[1].split("-")[0],targetAction:c.split("~")[0],targetParams:n})}}}function w(e,t,n,o){if(o&&o.length>0){const i=e.allowedActions||undefined;const r=e.unavailableActions?e.unavailableActions:[];const s=e.mapping?N(e.mapping):[];const a={navigationContexts:t,semanticObjectMapping:s};M(o,r,a,n,i)}}function R(e,t,n,o){if(o.length>0){const i=[e.action];const r=[];const s=[];const a={navigationContexts:t,semanticObjectMapping:s};M(o,r,a,n,i)}}async function D(t,n,o,i,r,s,a){const c=a.getShellServices();const l={};let u="",p="";let f;let d=[];let g=[];let m;async function b(){const e=c.parseShellHash(document.location.hash);u=e.semanticObject;p=e.action;return F(c,o,u,l)}try{if(n){if(i&&i.length>0){for(let e=0;e<i.length;e++){const t=i[e].$PropertyPath;if(!l[t]){l[t]={value:n[t]}}}}else{const e=r.getObject(`${s}/$Type/$Key`);for(const t in e){const o=e[t];if(!l[o]){l[o]={value:n[o]}}}}}const e=_(o).getViewData();const O=[];let h;if(e.additionalSemanticObjects){m=Object.keys(e.additionalSemanticObjects);for(let n=0;n<m.length;n++){h=await Promise.resolve(F(c,o,m[n],l));w(e.additionalSemanticObjects[m[n]],t,O,h)}}const v=[];const P=a.getComponentData();if(P.feEnvironment&&P.feEnvironment.getIntent()){const e=P.feEnvironment.getIntent();h=await Promise.resolve(F(c,o,e.semanticObject,l));R(e,t,v,h)}const y=o.getBindingContext("internal");const S=await b();if(S){if(S.length>0){let n=false;const o={};const i=[];const a=`${s}@`;const c=`${s}/@`;const l=r.getObject(a);f=qe.getSemanticObjectAnnotations(l,u);if(!f.bHasEntitySetSO){const e=r.getObject(c);f=qe.getSemanticObjectAnnotations(e,u)}g=f.aUnavailableActions;g.push(p);o.navigationContexts=t;o.semanticObjectMapping=f.aMappings;M(S,g,o,i);O.forEach(function(e){var t;let{targetSemObject:o}=e;if(((t=i[0])===null||t===void 0?void 0:t.targetSemObject)===o){n=true}});if(e.additionalSemanticObjects&&i[0]&&e.additionalSemanticObjects[i[0].targetSemObject]&&!!e.additionalSemanticObjects[i[0].targetSemObject].allowedActions){n=true}const m=O.concat(v);d=n?m:m.concat(i);y.setProperty("relatedApps/visibility",d.length>0);y.setProperty("relatedApps/items",d)}else{y.setProperty("relatedApps/visibility",false)}}else{y.setProperty("relatedApps/visibility",false)}}catch(t){e.error("Cannot read links",t)}return d}function k(e,t){const n={bHasEntitySetSO:false,aAllowedActions:[],aUnavailableActions:[],aMappings:[]};let o,i;let r;for(const s in e){if(s.indexOf("com.sap.vocabularies.Common.v1.SemanticObject")>-1&&e[s]===t){n.bHasEntitySetSO=true;o=`@${"com.sap.vocabularies.Common.v1.SemanticObjectMapping"}`;i=`@${"com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions"}`;if(s.indexOf("#")>-1){r=s.split("#")[1];o=`${o}#${r}`;i=`${i}#${r}`}if(e[o]){n.aMappings=n.aMappings.concat(e[o])}if(e[i]){n.aUnavailableActions=n.aUnavailableActions.concat(e[i])}break}}return n}function L(t,n){const o=t.getModel().getMetaModel();const i=t.getBindingContext();const r=i&&i.getPath()||"";const s=o.getMetaPath(r);const a=`${s}/`+`@com.sap.vocabularies.Common.v1.SemanticKey`;const c=o.getObject(a);const l=i===null||i===void 0?void 0:i.getObject();if(!l&&i){i.requestObject().then(async function(e){return qe.updateRelateAppsModel(i,e,t,c,o,s,n)}).catch(function(t){e.error("Cannot update the related app details",t)})}else{return qe.updateRelateAppsModel(i,l,t,c,o,s,n)}}function I(e){if(e&&e.isA(["sap.m.Button","sap.m.OverflowToolbarButton"])&&e.getVisible()&&e.getEnabled()){e.firePress()}}function B(e){if(e.isA("sap.fe.core.AppComponent")){return e}const t=u.getOwnerComponentFor(e);if(!t){throw new Error("There should be a sap.fe.core.AppComponent as owner of the control")}else{return B(t)}}function V(e){const t=e.getRootViewController();return t.isFclEnabled()?t.getRightmostView():qe.getTargetView(e.getRootContainer().getCurrentPage())}function _(e){if(e&&e.isA("sap.ui.core.ComponentContainer")){const t=e.getComponentInstance();e=t&&t.getRootControl()}while(e&&!e.isA("sap.ui.core.mvc.View")){e=e.getParent()}return e}function W(e,t){for(const n in t){if(t[n]!==e[n]){return false}}return true}function q(e,t,n){const o=e.getObject(`${t}/`)||{},i={};for(const e in o){if(o.hasOwnProperty(e)&&!/^\$/i.test(e)&&o[e].$kind&&W(o[e],n||{$kind:"Property"})){i[e]=o[e]}}return i}function G(e,t){let n=[];if(e&&t){n=e.getObject(`${t}@Org.OData.Capabilities.V1.FilterRestrictions/RequiredProperties`)}return n}function U(e,t){const n=e&&e.getActions();if(n){n.forEach(function(e){if(e.isA("sap.ui.mdc.actiontoolbar.ActionToolbarAction")){e=e.getAction()}if(e.isA("sap.m.MenuButton")){const n=e.getMenu();const o=n.getItems();o.forEach(e=>{if(e.data("IBNData")){t.push(e)}})}else if(e.data("IBNData")){t.push(e)}})}return t}function H(t,n){const o={};const i=qe.getAppComponent(n);const r=s.isStickySessionSupported(n.getModel().getMetaModel());const a=function(n){if(n){const e=Object.keys(n);e.forEach(function(e){if(e.indexOf("_")!==0&&e.indexOf("odata.context")===-1){o[e]={value:n[e]}}})}if(t.length){t.forEach(function(t){const n=t.data("IBNData").semanticObject;const s=t.data("IBNData").action;i.getShellServices().getLinks({semanticObject:n,action:s,params:o}).then(function(e){t.setVisible(t.getVisible()&&e&&e.length===1);if(r){t.getBindingContext("internal").setProperty(t.getId().split("--")[1],{shellNavigationNotAvailable:!(e&&e.length===1)})}return}).catch(function(t){e.error("Cannot retrieve the links from the shell service",t)})})}};if(n&&n.getBindingContext()){var c;(c=n.getBindingContext())===null||c===void 0?void 0:c.requestObject().then(function(e){return a(e)}).catch(function(t){e.error("Cannot retrieve the links from the shell service",t)})}else{a()}}function Q(e,t,n,o){const i=!n?e.getObject(e.getPath()).toString():n;let r=e.getPath().split("/@")[0];const s=e.getObject(r).$Type;const a=Y(e.getModel(),s);if(a){r=`/${a}`}if(o){return e.getObject(`${r}/${i}@Org.OData.Core.V1.OperationAvailable`)}if(t){return`${r}/${i}`}else{return{sContextPath:r,sProperty:e.getObject(`${r}/${i}@Org.OData.Core.V1.OperationAvailable/$Path`),sBindingParameter:e.getObject(`${r}/${i}/@$ui5.overload/0/$Parameter/0/$Name`)}}}function Y(e,t){const n=e.getObject("/");for(const e in n){if(typeof n[e]==="object"&&n[e].$Type===t){return e}}}function K(e,t){const n=e["@com.sap.vocabularies.Common.v1.Text"],o=n&&(e&&e["@com.sap.vocabularies.Common.v1.Text@com.sap.vocabularies.UI.v1.TextArrangement"]||t&&t["@com.sap.vocabularies.UI.v1.TextArrangement"]);if(o){if(o.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly"){return"Description"}else if(o.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextLast"){return"ValueDescription"}else if(o.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextSeparate"){return"Value"}return"DescriptionValue"}return n?"DescriptionValue":"Value"}function z(e){const t=e.getModel().getMetaModel();return t.getObject(`${t.getMetaPath(e.getPath())}/$Type`)}async function J(t,n,o){let i=n;const r=t.indexOf("(");if(r>-1){const n=t.slice(r+1,-1);let o=z(i);while(o!==n){i=i.getBinding().getContext();if(i){o=z(i)}else{e.warning("Cannot determine target type to request property value for bound action invocation");return Promise.resolve(undefined)}}}return i.requestObject(o)}async function X(e,t,n,o){const i=n&&n.indexOf("/")===0?De(n,e.getModel()):J(t,e,n);return i.then(function(n){return{vPropertyValue:n,oSelectedContext:e,sAction:t,sDynamicActionEnabledPath:o}})}async function Z(t,n){return Promise.all(n).then(function(e){if(e.length){const n=[],o=[];e.forEach(function(e){if(e){if(e.vPropertyValue){t.getModel().setProperty(e.sDynamicActionEnabledPath,true);n.push(e.oSelectedContext)}else{o.push(e.oSelectedContext)}}});ee(t,e[0].sAction,n,o)}return}).catch(function(t){e.trace("Cannot retrieve property value from path",t)})}function ee(e,t,n,o){const i=`${e.getPath()}/dynamicActions/${t}`,r=e.getModel();r.setProperty(`${i}/aApplicable`,n);r.setProperty(`${i}/aNotApplicable`,o)}function te(e){const t=l.getDataTypeClassName(e);const n=l.getBaseType(t,{},{});return m.getOperatorsForType(n)}function ne(e,t){return e.filter(function(e){return t.indexOf(e)>-1})}function oe(e){const t=qe.AllowedExpressionsPrio;e.sort(function(e,n){return t.indexOf(e)-t.indexOf(n)});return e[0]}function ie(e,t,n,o,i,r){const s=qe.getFilterRestrictionsByPath(t,n);const c=["EQ"];const l=["EQ","GE","LE","LT","GT","BT","NOTLE","NOTLT","NOTGE","NOTGT"];const u=["EQ","BT"];const p=["TODAY","TOMORROW","YESTERDAY","DATE","FIRSTDAYWEEK","LASTDAYWEEK","FIRSTDAYMONTH","LASTDAYMONTH","FIRSTDAYQUARTER","LASTDAYQUARTER","FIRSTDAYYEAR","LASTDAYYEAR"];const f=["EQ","GE","LE","LT","GT","BT","NE","NOTBT","NOTLE","NOTLT","NOTGE","NOTGT"];const d=["Contains","NotContains","StartsWith","NotStartsWith","EndsWith","NotEndsWith"];const g=a.getSupportedOperations();const m=i==="true"||i===true;let b=[];const O=r&&typeof r==="string"?JSON.parse(r).customData:r;if(n.getObject(`${t}/@com.sap.vocabularies.Common.v1.ResultContext`)===true){return c}if(O&&O.operatorConfiguration&&O.operatorConfiguration.length>0){b=a.getFilterOperations(O.operatorConfiguration,o)}else{b=a.getSemanticDateOperations(o)}let h=te(o);if(m){h=g.concat(h)}let v=[];if(s&&s.FilterAllowedExpressions&&s.FilterAllowedExpressions[e]){const t=qe.getSpecificAllowedExpression(s.FilterAllowedExpressions[e]);switch(t){case"SingleValue":const e=o==="Edm.Date"&&m?p:c;v=ne(h,e);break;case"MultiValue":v=ne(h,c);break;case"SingleRange":let t;if(m){if(o==="Edm.Date"){t=b}else if(o==="Edm.DateTimeOffset"){t=b}else{t=l}}else if(o==="Edm.DateTimeOffset"){t=u}else{t=l}const n=ne(h,t);v=n;break;case"MultiRange":v=ne(h,f);break;case"SearchExpression":v=ne(h,d);break;case"MultiRangeOrSearchExpression":v=ne(h,d.concat(f));break;default:break}}return v}y.getOperatorsForProperty=ie;function re(){const e=["EQ","NE"];return e.toString()}function se(e){const t=te(e);const n=["EQ","GE","LE","LT","GT","BT","NE","NOTBT","NOTLE","NOTLT","NOTGE","NOTGT"];return ne(t,n)}function ae(e,t){const n=t.substring(0,t.lastIndexOf("/"));const o=e.getObject(`${n}/@com.sap.vocabularies.Common.v1.ResultContext`);const i={};if(o&&n!==t){i.contextPath=n;i.parameterProperties=qe.getContextPathProperties(e,n)}return i}function ce(e,t,n,o,i){var r;const s=S(i,e);if(i!==null&&i!==void 0&&i.SemanticDates&&n&&n.indexOf(i===null||i===void 0?void 0:(r=i.SemanticDates)===null||r===void 0?void 0:r.operator)>-1){const e=qe.addSemanticDatesToConditions(i===null||i===void 0?void 0:i.SemanticDates);if(e&&Object.keys(e).length>0){o.push(e)}}else if(s){if(t.length===0||t.indexOf(s.operator)>-1){o.push(s)}}return o}function le(e){const t=[];if(e!==null&&e!==void 0&&e.high){t.push(e===null||e===void 0?void 0:e.high)}if(e!==null&&e!==void 0&&e.low){t.push(e===null||e===void 0?void 0:e.low)}return{values:t,operator:e===null||e===void 0?void 0:e.operator,isEmpty:undefined}}function ue(e,t,n,o,i,r,s,a,c,l,u,p){let f=[],d,g,m=[];if(c||v.isPropertyFilterable(a,e,r,true)){const b=s[r];d=t.getSelectOption(n);const O=fe(p,r);g=c?["EQ"]:qe.getOperatorsForProperty(r,e,a);if(u){m=c?["EQ"]:qe.getOperatorsForProperty(r,e,a,b===null||b===void 0?void 0:b.$Type,u,O)}f=c?qe.addSelectOptionToConditions(b,g,m,f,d[0]):d.reduce(qe.addSelectOptionToConditions.bind(null,b,g,m),f);if(f.length){if(i){o[i+r]=o.hasOwnProperty(i+r)?o[i+r].concat(f):f}else if(l){f.forEach(e=>{e["filtered"]=true});if(o.hasOwnProperty(r)){o[r].forEach(e=>{e["filtered"]=false});o[r]=o[r].concat(f)}else{o[r]=f}}else{o[r]=o.hasOwnProperty(r)?o[r].concat(f):f}}}}function pe(e){var t,n;return{high:(e===null||e===void 0?void 0:(t=e.values)===null||t===void 0?void 0:t[0])||null,low:(e===null||e===void 0?void 0:(n=e.values)===null||n===void 0?void 0:n[1])||null,operator:e===null||e===void 0?void 0:e.operator}}function fe(){var e,t;let n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};let o=arguments.length>1?arguments[1]:undefined;const i=n===null||n===void 0?void 0:n.controlConfiguration;const r=i&&((e=i["@com.sap.vocabularies.UI.v1.SelectionFields"])===null||e===void 0?void 0:e.filterFields);return r!==null&&r!==void 0&&r[o]?(t=r[o])===null||t===void 0?void 0:t.settings:undefined}function de(e,t,n,o,i,r,s){const a=e.getSelectOptionsPropertyNames(),c=qe.getContextPathProperties(n,o),l=Object.keys(c),u=qe.getParameterInfo(n,o),p=u.contextPath,f=u.parameterProperties;if(p!==undefined&&f&&Object.keys(f).length>0){const o=Object.keys(f);o.forEach(function(o){let c;if(a.includes(`$Parameter.${o}`)){c=`$Parameter.${o}`}else if(a.includes(o)){c=o}else if(o.startsWith("P_")&&a.includes(`$Parameter.${o.slice(2,o.length)}`)){c=`$Parameter.${o.slice(2,o.length)}`}else if(o.startsWith("P_")&&a.includes(o.slice(2,o.length))){c=o.slice(2,o.length)}else if(a.includes(`$Parameter.P_${o}`)){c=`$Parameter.P_${o}`}else if(a.includes(`P_${o}`)){c=`P_${o}`}if(c){ue(p,e,c,t,undefined,o,f,n,true,i,r,s)}})}l.forEach(function(l){let u;if(a.includes(l)){u=l}else if(l.startsWith("P_")&&a.includes(l.slice(2,l.length))){u=l.slice(2,l.length)}else if(a.includes(`P_${l}`)){u=`P_${l}`}if(u){ue(o,e,u,t,undefined,l,c,n,false,i,r,s)}});a.forEach(function(a){if(a.indexOf(".")>0&&!a.includes("$Parameter")){const c=a.replaceAll(".","/");const l=`/${c}`.startsWith(o)?`/${c}`:`${o}/${c}`;if(n.getObject(l.replace("P_",""))){ge(l,o,e,a,n,t,i,r,s)}}});return t}function ge(e,t,n,o,i,r,s,a,c){let l=o.split(".");if(`/${o.replaceAll(".","/")}`.startsWith(t)){const e=`/${o}`.replaceAll(".","/"),n=e.replace(`${t}/`,"");l=n.split("/")}let u="";const p=l[l.length-1];for(let e=0;e<l.length-1;e++){if(i.getObject(`${t}/${l[e].replace("P_","")}`).$isCollection){u=`${u+l[e]}*/`}else{u=`${u+l[e]}/`}t=`${t}/${l[e]}`}const f=e.slice(0,e.lastIndexOf("/")),d=qe.getContextPathProperties(i,f),g=n.getSelectOptionsPropertyNames();let m=p;if(d[p]){m=p}else if(p.startsWith("P_")&&d[p.replace("P_","")]){m=p.replace("P_","")}else if(d[`P_${p}`]&&g.includes(`P_${p}`)){m=`P_${p}`}if(p.startsWith("P_")&&r[u+m]){}else if(!p.startsWith("P_")&&r[u+m]){delete r[u+m];ue(f,n,o,r,u,m,d,i,false,s,a,c)}else{ue(f,n,o,r,u,m,d,i,false,s,a,c)}}function me(e,t,n){const o=qe.getAppComponent(n);const i=o.getNavigationService();return i.mixAttributesAndSelectionVariant(t,e.toJSONString())}function be(t,n,o,i){let r;const s=function(t,n,o){const i={option:"",sign:"I",low:n,high:o};switch(t){case"Contains":i.option="CP";break;case"StartsWith":i.option="CP";i.low+="*";break;case"EndsWith":i.option="CP";i.low=`*${i.low}`;break;case"BT":case"LE":case"LT":case"GT":case"NE":case"EQ":i.option=t;break;case"DATE":i.option="EQ";break;case"DATERANGE":i.option="BT";break;case"FROM":i.option="GE";break;case"TO":i.option="LE";break;case"EEQ":i.option="EQ";break;case"Empty":i.option="EQ";i.low="";break;case"NotContains":i.option="CP";i.sign="E";break;case"NOTBT":i.option="BT";i.sign="E";break;case"NotStartsWith":i.option="CP";i.low+="*";i.sign="E";break;case"NotEndsWith":i.option="CP";i.low=`*${i.low}`;i.sign="E";break;case"NotEmpty":i.option="NE";i.low="";break;case"NOTLE":i.option="LE";i.sign="E";break;case"NOTGE":i.option="GE";i.sign="E";break;case"NOTLT":i.option="LT";i.sign="E";break;case"NOTGT":i.option="GT";i.sign="E";break;default:e.warning(`${t} is not supported. ${r} could not be added to the navigation context`)}return i};const c=n.filterConditions;const l=n.filterConditionsWithoutConflict?n.filterConditionsWithoutConflict:{};const u=o.propertiesWithoutConflict?o.propertiesWithoutConflict:{};const p=function(e,t,n){const o=c[t];const r=i&&i.getPropertyHelper().getProperty(t);const l=r===null||r===void 0?void 0:r.typeConfig;const u=i&&i.getControlDelegate().getTypeUtil();for(const i in o){const r=o[i];let c="",f="I",d="",g=null,O;const h=m.getOperator(r.operator);if(h instanceof b){var p;O=qe.createSemanticDatesFromConditions(r);const e=h.getModelFilter(r,t,l===null||l===void 0?void 0:l.typeInstance,false,l===null||l===void 0?void 0:l.baseType);if(!(e!==null&&e!==void 0&&e.getFilters())&&!(e!==null&&e!==void 0&&(p=e.getFilters())!==null&&p!==void 0&&p.length)){f=h.exclude?"E":"I";d=u.externalizeValue(e.getValue1(),l.typeInstance);g=u.externalizeValue(e.getValue2(),l.typeInstance);c=e.getOperator()}}else{const e=a.getSupportedOperations();if(e.includes(r===null||r===void 0?void 0:r.operator)){O=qe.createSemanticDatesFromConditions(r)}const t=r.values[0]&&r.values[0].toString()||"";const n=r.values[1]&&r.values[1].toString()||null;const o=s(r.operator,t,n);f=h!==null&&h!==void 0&&h.exclude?"E":"I";d=o===null||o===void 0?void 0:o.low;g=o===null||o===void 0?void 0:o.high;c=o===null||o===void 0?void 0:o.option}if(c&&O){e.addSelectOption(n?n:t,f,c,d,g,undefined,O)}else if(c){e.addSelectOption(n?n:t,f,c,d,g)}}};for(r in c){if(!t.getSelectOption(r)){if(r==="$editState"){continue}p(t,r)}else{if(u&&r in u){p(t,r,u[r])}if(r in l){p(t,r,l[r])}}}return t}function Oe(e){const t=s.isStickySessionSupported(e.getModel().getMetaModel());const n=e.getModel("ui").getProperty("/isEditable");return t&&n}function he(e,t,n){if(t&&e&&e.length){for(let o=0;o<e.length;o++){const i=t.getSelectOption("DisplayCurrency"),r=n&&n.getSelectOption("DisplayCurrency");if(e[o].$PropertyPath==="DisplayCurrency"&&(!i||!i.length)&&r&&r.length){const e=r[0];const n=e["Sign"];const o=e["Option"];const i=e["Low"];const s=e["High"];t.addSelectOption("DisplayCurrency",n,o,i,s)}}}}async function ve(e,t,n,o,i,r){const s=e.getComponentData(),a=s&&s.startupParameters||{},c=e.getShellServices();const l=await c.getStartupAppState(e);const u=(l===null||l===void 0?void 0:l.getData())||{},p=u.selectionVariant&&u.selectionVariant.SelectOptions||[];t.forEach(function(e){var t;const s=o?`/${e.$Name}`:(t=e.getPath)===null||t===void 0?void 0:t.call(e).slice(e.getPath().lastIndexOf("/")+1);const c=o?s.slice(1):s;if(r&&i){if(r[c]){n.setProperty(s,r[c])}}else if(a[c]){n.setProperty(s,a[c][0])}else if(p.length>0){for(const e of p){if(e.PropertyName===c){const t=e.Ranges.length?e.Ranges[e.Ranges.length-1]:undefined;if(t&&t.Sign==="I"&&t.Option==="EQ"){n.setProperty(s,t.Low)}}}}})}function Pe(e,t){const n=t,o=n!==undefined?Object.keys(n).filter(function(e){return n[e].useForCreate}):[];let i;for(let t=0;t<o.length;t++){const n=o[t];const r=e&&e[n];if(r&&r.length===1){i=i||Object.create(null);i[n]=r[0]}}return i}function ye(e){const t=[];if(e.parameters){const n=Object.keys(e.parameters)||[];if(n.length>0){n.forEach(function(n){const o=e.parameters[n];if(o.value&&o.value.value&&o.value.format==="binding"){const e={LocalProperty:{$PropertyPath:o.value.value},SemanticObjectProperty:n};if(t.length>0){for(let n=0;n<t.length;n++){var i;if(((i=t[n].LocalProperty)===null||i===void 0?void 0:i.$PropertyPath)!==e.LocalProperty.$PropertyPath){t.push(e)}}}else{t.push(e)}}})}}return t}function Se(t,n){const o={};let i;const r=t.controlConfiguration;for(const t in r){if(t.indexOf("@com.sap.vocabularies.UI.v1.DataPoint")>-1||t.indexOf("@com.sap.vocabularies.UI.v1.Chart")>-1){var s,a;const c=(s=r[t].navigation)===null||s===void 0?void 0:(a=s.targetOutbound)===null||a===void 0?void 0:a.outbound;if(c!==undefined){const r=n[c];if(r.semanticObject&&r.action){if(t.indexOf("Chart")>-1){i=j(["fe","MicroChartLink",t])}else{i=j(["fe","HeaderDPLink",t])}const e=qe.getSemanticObjectMapping(r);o[i]={semanticObject:r.semanticObject,action:r.action,semanticObjectMapping:e}}else{e.error(`Cross navigation outbound is configured without semantic object and action for ${c}`)}}}}return o}function Ee(e,t){const n=typeof t==="string"?JSON.parse(t):t;for(let t=0;t<n.length;t++){const o=n[t]["LocalProperty"]&&n[t]["LocalProperty"]["$PropertyPath"]||n[t]["@com.sap.vocabularies.Common.v1.LocalProperty"]&&n[t]["@com.sap.vocabularies.Common.v1.LocalProperty"]["$Path"];const i=n[t]["SemanticObjectProperty"]||n[t]["@com.sap.vocabularies.Common.v1.SemanticObjectProperty"];const r=e.getSelectOption(o);if(r){e.removeSelectOption(o);e.massAddSelectOption(i,r)}}return e}async function je(e,t,n){return new Promise(function(o){let i,r;if(n===""){i=e.getObject(`${t}@${"com.sap.vocabularies.Common.v1.SemanticObject"}`);r=e.getObject(`${t}@${"com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions"}`)}else{i=e.getObject(`${t}@${"com.sap.vocabularies.Common.v1.SemanticObject"}#${n}`);r=e.getObject(`${t}@${"com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions"}#${n}`)}const s=[{semanticObject:i}];const a={semanticObject:i};o({semanticObjectPath:t,semanticObjectForGetLinks:s,semanticObject:a,unavailableActions:r})})}async function Ce(t,o,i,r){return Promise.all(t).then(function(e){let t,s,a,c=[];let l={};const u=function(e,t){for(const n in t){if(n===e){return true}else{return false}}};for(let n=0;n<e.length;n++){t=e[n];if(t&&t.length>0&&t[0]!==undefined){const e={};let i;let p;for(let l=0;l<t.length;l++){c.push([]);let f=false;let d=false;for(let e=0;e<t[l][0].length;e++){s=t[l][0][e];a=s&&s.intent.split("?")[0].split("-")[1];if(!(s&&s.intent&&s.intent.indexOf(r)===0)){f=true;if(!u(a,o[n].unavailableActions)){c[l].push(s);d=true}}}i={semanticObject:o[n].semanticObject,path:o[n].path,HasTargets:d,HasTargetsNotFiltered:f};if(e[o[n].semanticObject]===undefined){e[o[n].semanticObject]={}}p=o[n].path.replace(/\//g,"_");if(e[o[n].semanticObject][p]===undefined){e[o[n].semanticObject][p]={}}e[o[n].semanticObject][p]=Object.assign(e[o[n].semanticObject][p],i)}const f=Object.keys(e)[0];if(Object.keys(l).includes(f)){l[f]=Object.assign(l[f],e[f])}else{l=Object.assign(l,e)}c=[]}}if(Object.keys(l).length>0){i.setProperty("semanticsTargets",n(l,i.getProperty("semanticsTargets")));return l}return}).catch(function(t){e.error("fnUpdateSemanticTargetsModel: Cannot read links",t)})}async function $e(e,t,n,o,i){return qe.getSemanticObjectsFromPath(n,o,i)}function Te(e,t,n,o,i){let r,s;let a,c;for(let l=0;l<o.length;l++){s=o[l];r=Object.keys(n.getObject(s+"@"));for(let o=0;o<r.length;o++){if(r[o].indexOf(`@${"com.sap.vocabularies.Common.v1.SemanticObject"}`)===0&&r[o].indexOf(`@${"com.sap.vocabularies.Common.v1.SemanticObjectMapping"}`)===-1&&r[o].indexOf(`@${"com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions"}`)===-1){c=/#(.*)/.exec(r[o]);a=c?c[1]:"";i.push(qe.getSemanticObjectPromise(e,t,n,s,a))}}}}function Ae(t,n){const o=function(e,t,n){if(!e){return n}if(e instanceof Array){e.forEach(e=>{n=n.concat(o(e,t,[]))});return n}if(e[t]){n.push(e[t])}if(typeof e=="object"&&e!==null){const i=Object.keys(e);if(i.length>0){for(let r=0;r<i.length;r++){n=n.concat(o(e[i[r]],t,[]))}}}return n};const i=function(e,t){return o(e,t,[])};const r=function(e){return e.filter(function(t,n){return e.indexOf(t)===n})};const s=t.getView();const a=s.getBindingContext("internal");if(a){const o=[];const c=t.getOwnerComponent();const l=u.getOwnerComponentFor(c);const p=l.getMetaModel();let f=c.getModel(n).getData();if(JSON.stringify(f)==="{}"){f=c.getModel(n)._getObject("/",undefined)}let d=i(f,"semanticObjectPath");d=r(d);const g=l.getShellServices();let m=g.getHash();const b=[];const O=[];let h;if(m&&m.indexOf("?")!==-1){m=m.split("?")[0]}Te(l,s,p,d,o);if(o.length===0){return Promise.resolve()}else{Promise.all(o).then(async function(e){const t=[];let n;const o=e.filter(function(e){if(e.semanticObject!==undefined&&e.semanticObject.semanticObject&&typeof e.semanticObject.semanticObject==="object"){n=$(C(e.semanticObject.semanticObject.$Path));e.semanticObject.semanticObject=n;e.semanticObjectForGetLinks[0].semanticObject=n;return true}else if(e){return e.semanticObject!==undefined}else{return false}});for(let e=0;e<o.length;e++){h=o[e];if(h&&h.semanticObject&&!(h.semanticObject.semanticObject.indexOf("{")===0)){b.push(h.semanticObjectForGetLinks);O.push({semanticObject:h.semanticObject.semanticObject,unavailableActions:h.unavailableActions,path:o[e].semanticObjectPath});t.push(g.getLinksWithCache([h.semanticObjectForGetLinks]))}}return qe.updateSemanticTargets(t,O,a,m)}).catch(function(t){e.error("fnGetSemanticTargetsFromTable: Cannot get Semantic Objects",t)})}}else{return Promise.resolve()}}function xe(e){const t={};if(e&&e.FilterExpressionRestrictions!==undefined){e.FilterExpressionRestrictions.forEach(function(e){if(e.Property&&e.AllowedExpressions!==undefined){if(t[e.Property.$PropertyPath]!==undefined){t[e.Property.$PropertyPath].push(e.AllowedExpressions)}else{t[e.Property.$PropertyPath]=[e.AllowedExpressions]}}})}return t}function Fe(e,t){let n=[];if(e&&e[t]){n=e[t].map(function(e){return e.$PropertyPath})}return n}function Ne(e,t,n){const o=t+"/";return e.reduce((e,t)=>{if(t.startsWith(o)){const n=t.replace(o,"");if(e.indexOf(n)===-1){e.push(n)}}return e},n)}function Me(e,o){const i={RequiredProperties:[],NonFilterableProperties:[],FilterAllowedExpressions:{}};let r;const a="$NavigationPropertyBinding";const c="@Org.OData.Capabilities.V1.FilterRestrictions";const l=e.replaceAll("%2F","/").split("/").filter(s.filterOutNavPropBinding);const u=`/${l.join("/")}/`;const p=s.getEntitySetPath(e,o);const f=p.split("/").filter(s.filterOutNavPropBinding);const d=o.getObject(`${u}$ContainsTarget`);const g=!!d&&l[l.length-1];if(!d){r=o.getObject(`${p}${c}`);i.RequiredProperties=Fe(r,"RequiredProperties")||[];const e=o.getObject(`${u}@com.sap.vocabularies.Common.v1.ResultContext`);if(!e){i.NonFilterableProperties=Fe(r,"NonFilterableProperties")||[]}i.FilterAllowedExpressions=xe(r)||{}}if(l.length>1){const e=d?g:f[f.length-1];const r=d?p:`/${f.slice(0,-1).join(`/${a}/`)}`;const s={RequiredProperties:[],NonFilterableProperties:[],FilterAllowedExpressions:{}};if(!e.includes("%2F")){const t=o.getObject(`${r}${c}`);i.RequiredProperties=Ne(Fe(t,"RequiredProperties")||[],e,i.RequiredProperties||[]);i.NonFilterableProperties=Ne(Fe(t,"NonFilterableProperties")||[],e,i.NonFilterableProperties||[]);const n=xe(t)||{};s.FilterAllowedExpressions=Object.keys(n).reduce((t,o)=>{if(o.startsWith(e+"/")){const i=o.replace(e+"/","");t[i]=n[o]}return t},{})}i.FilterAllowedExpressions=n({},i.FilterAllowedExpressions||{},s.FilterAllowedExpressions||{});const u=v.getNavigationRestrictions(o,r,e.replaceAll("%2F","/"));const m=u&&u["FilterRestrictions"];const b=Fe(m,"RequiredProperties")||[];i.RequiredProperties=t(i.RequiredProperties.concat(b));const O=Fe(m,"NonFilterableProperties")||[];i.NonFilterableProperties=t(i.NonFilterableProperties.concat(O));i.FilterAllowedExpressions=n({},i.FilterAllowedExpressions||{},xe(m)||{});const h=o.getObject(`/${l.join("/")}${c}`);const P=Fe(h,"RequiredProperties")||[];i.RequiredProperties=t(i.RequiredProperties.concat(P));const y=Fe(h,"NonFilterableProperties")||[];i.NonFilterableProperties=t(i.NonFilterableProperties.concat(y));i.FilterAllowedExpressions=n({},i.FilterAllowedExpressions,xe(h)||{})}return i}async function we(e,t,n,o){n=n||{};if(o){return o.templateControlFragment(e,t,n.view).then(function(e){return o.targets==="xmlTree"&&e.length>0?e[0]:e})}else{const o=await f.process(d.loadTemplate(e,"fragment"),{name:e},t);const i=o.firstElementChild;if(!!n.isXML&&i){return i}return p.load({id:n.id,definition:o,controller:n.controller})}}function Re(e,t){const n=e.split("/").filter(Boolean),o=n.pop(),i=n.join("/"),r=i&&t.getObject(`/${i}`);if((r===null||r===void 0?void 0:r.$kind)==="Singleton"){const e=n[n.length-1];return`/${e}/${o}`}return undefined}async function De(e,t){if(!e||!t){return Promise.resolve(null)}const n=t.getMetaModel();const o=Re(e,n);if(o){const e=t.bindProperty(o);return e.requestValue()}return Promise.resolve(null)}function ke(e,t){let n;if(e.indexOf("@$ui5.overload")>-1){n=e.split("@$ui5.overload")[0]}else{const t=e.split("/0")[0].split(".");n=`/${t[t.length-1]}/`}return n+t}function Le(e,t){const n=new h({anyText:e});t.addDependent(n);const o=n.getAnyText();t.removeDependent(n);n.destroy();return o}function Ie(){return!E.desktop||g.resize.width<=320}function Be(e,t,n){const o=e.data("entityType"),i=qe.getAppComponent(e).getMetaModel(),r={},s=[],a=[];let c="";let l=i.getObject(`${o}${t}`);if(n){l=l.SelectionVariant}if(l){c=l.Text;(l.SelectOptions||[]).filter(function(e){return e&&e.PropertyName&&e.PropertyName.$PropertyPath}).forEach(function(e){const t=e.PropertyName.$PropertyPath;if(!a.includes(t)){a.push(t)}for(const i in e.Ranges){var n,o;const s=e.Ranges[i];r[t]=(r[t]||[]).concat(new O(t,(n=s.Option)===null||n===void 0?void 0:(o=n.$EnumMember)===null||o===void 0?void 0:o.split("/").pop(),s.Low,s.High))}});for(const e in r){s.push(new O({filters:r[e],and:false}))}}return{properties:a,filters:s,text:c}}function Ve(e,t,i,r){const s=t.createBindingContext(e);return o===null||o===void 0?void 0:o.createConverterContextForMacro(i,s||t,r,n,undefined)}function _e(e,t){return e.replace("_fe_"+t+"_","")}function We(e){e.forEach(e=>{if(e.sPath&&e.sPath.includes("fe_groupable")){e.sPath=qe.getInternalChartNameFromPropertyNameAndKind(e.sPath,"groupable")}});return e}const qe={fireButtonPress:I,getTargetView:_,getCurrentPageView:V,hasTransientContext:x,updateRelatedAppsDetails:L,getAppComponent:B,getMandatoryFilterFields:G,getContextPathProperties:q,getParameterInfo:ae,updateDataFieldForIBNButtonsVisibility:H,getEntitySetName:Y,getActionPath:Q,computeDisplayMode:K,isStickyEditMode:Oe,getOperatorsForProperty:ie,getOperatorsForDateProperty:se,getOperatorsForGuidProperty:re,addSelectionVariantToConditions:de,addExternalStateFiltersToSelectionVariant:be,addPageContextToSelectionVariant:me,addDefaultDisplayCurrency:he,setUserDefaults:ve,getIBNActions:U,getHeaderFacetItemConfigForExternalNavigation:Se,getSemanticObjectMapping:ye,setSemanticObjectMappings:Ee,getSemanticObjectPromise:$e,getSemanticTargetsFromPageModel:Ae,getSemanticObjectsFromPath:je,updateSemanticTargets:Ce,waitForContextRequested:A,getFilterRestrictionsByPath:Me,getSpecificAllowedExpression:oe,getAdditionalParamsForCreate:Pe,requestSingletonProperty:De,templateControlFragment:we,FilterRestrictions:{REQUIRED_PROPERTIES:"RequiredProperties",NON_FILTERABLE_PROPERTIES:"NonFilterableProperties",ALLOWED_EXPRESSIONS:"FilterAllowedExpressions"},AllowedExpressionsPrio:["SingleValue","MultiValue","SingleRange","MultiRange","SearchExpression","MultiRangeOrSearchExpression"],normalizeSearchTerm:T,setContextsBasedOnOperationAvailable:Z,setDynamicActionContexts:ee,requestProperty:X,getParameterPath:ke,getRelatedAppsMenuItems:M,getTranslatedTextFromExpBindingString:Le,addSemanticDatesToConditions:le,addSelectOptionToConditions:ce,createSemanticDatesFromConditions:pe,updateRelateAppsModel:D,getSemanticObjectAnnotations:k,getFiltersInfoForSV:Be,getInternalChartNameFromPropertyNameAndKind:_e,getChartPropertiesWithoutPrefixes:We,isSmallDevice:Ie,getConverterContextForPath:Ve};return qe},false);