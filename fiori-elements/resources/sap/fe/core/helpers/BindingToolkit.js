/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["./AnnotationEnum"],function(e){"use strict";var n={};var t=e.resolveEnumValue;const r={"Edm.Boolean":{type:"sap.ui.model.odata.type.Boolean"},"Edm.Byte":{type:"sap.ui.model.odata.type.Byte"},"Edm.Date":{type:"sap.ui.model.odata.type.Date"},"Edm.DateTimeOffset":{constraints:{$Precision:"precision",$V4:"V4"},type:"sap.ui.model.odata.type.DateTimeOffset"},"Edm.Decimal":{constraints:{"@Org.OData.Validation.V1.Minimum/$Decimal":"minimum","@Org.OData.Validation.V1.Minimum@Org.OData.Validation.V1.Exclusive":"minimumExclusive","@Org.OData.Validation.V1.Maximum/$Decimal":"maximum","@Org.OData.Validation.V1.Maximum@Org.OData.Validation.V1.Exclusive":"maximumExclusive",$Precision:"precision",$Scale:"scale"},type:"sap.ui.model.odata.type.Decimal"},"Edm.Double":{type:"sap.ui.model.odata.type.Double"},"Edm.Guid":{type:"sap.ui.model.odata.type.Guid"},"Edm.Int16":{type:"sap.ui.model.odata.type.Int16"},"Edm.Int32":{type:"sap.ui.model.odata.type.Int32"},"Edm.Int64":{type:"sap.ui.model.odata.type.Int64"},"Edm.SByte":{type:"sap.ui.model.odata.type.SByte"},"Edm.Single":{type:"sap.ui.model.odata.type.Single"},"Edm.Stream":{type:"sap.ui.model.odata.type.Stream"},"Edm.Binary":{type:"sap.ui.model.odata.type.Stream"},"Edm.String":{constraints:{"@com.sap.vocabularies.Common.v1.IsDigitSequence":"isDigitSequence",$MaxLength:"maxLength",$Nullable:"nullable"},type:"sap.ui.model.odata.type.String"},"Edm.TimeOfDay":{constraints:{$Precision:"precision"},type:"sap.ui.model.odata.type.TimeOfDay"}};n.EDM_TYPE_MAPPING=r;const a={_type:"Unresolvable"};n.unresolvableExpression=a;function o(e){return e.replace(/'/g,"\\'")}function i(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++){n[t]=arguments[t]}return n.find(e=>e._type==="Unresolvable")!==undefined}n.hasUnresolvableExpression=i;function s(e,n){if(e._type!==n._type){return false}switch(e._type){case"Unresolvable":return false;case"Constant":case"EmbeddedBinding":case"EmbeddedExpressionBinding":return e.value===n.value;case"Not":return s(e.operand,n.operand);case"Truthy":return s(e.operand,n.operand);case"Set":return e.operator===n.operator&&e.operands.length===n.operands.length&&e.operands.every(e=>n.operands.some(n=>s(e,n)));case"IfElse":return s(e.condition,n.condition)&&s(e.onTrue,n.onTrue)&&s(e.onFalse,n.onFalse);case"Comparison":return e.operator===n.operator&&s(e.operand1,n.operand1)&&s(e.operand2,n.operand2);case"Concat":const t=e.expressions;const r=n.expressions;if(t.length!==r.length){return false}return t.every((e,n)=>s(e,r[n]));case"Length":return s(e.pathInModel,n.pathInModel);case"PathInModel":return e.modelName===n.modelName&&e.path===n.path&&e.targetEntitySet===n.targetEntitySet;case"Formatter":return e.fn===n.fn&&e.parameters.length===n.parameters.length&&e.parameters.every((e,t)=>s(n.parameters[t],e));case"ComplexType":return e.type===n.type&&e.bindingParameters.length===n.bindingParameters.length&&e.bindingParameters.every((e,t)=>s(n.bindingParameters[t],e));case"Function":const a=n;if(e.obj===undefined||a.obj===undefined){return e.obj===a}return e.fn===a.fn&&s(e.obj,a.obj)&&e.parameters.length===a.parameters.length&&e.parameters.every((e,n)=>s(a.parameters[n],e));case"Ref":return e.ref===n.ref}return false}n._checkExpressionsAreEqual=s;function u(e){return e.operands.reduce((n,t)=>{const r=t._type==="Set"&&t.operator===e.operator?t.operands:[t];r.forEach(e=>{if(n.operands.every(n=>!s(n,e))){n.operands.push(e)}});return n},{_type:"Set",operator:e.operator,operands:[]})}function l(e){const n=e.map(f);return e.some((e,t)=>{for(let r=t+1;r<n.length;r++){if(s(e,n[r])){return true}}return false})}function p(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++){n[t]=arguments[t]}const r=u({_type:"Set",operator:"&&",operands:n.map($)}).operands;if(i(...r)){return a}let o=false;const s=r.filter(e=>{if(I(e)){o=true}return!E(e)});if(o){return v(false)}else if(s.length===0){const e=r.reduce((e,n)=>e&&O(n),true);return v(e)}else if(s.length===1){return s[0]}else if(l(s)){return v(false)}else{return{_type:"Set",operator:"&&",operands:s}}}n.and=p;function d(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++){n[t]=arguments[t]}const r=u({_type:"Set",operator:"||",operands:n.map($)}).operands;if(i(...r)){return a}let o=false;const s=r.filter(e=>{if(O(e)){o=true}return!E(e)||e.value});if(o){return v(true)}else if(s.length===0){const e=r.reduce((e,n)=>e&&O(n),true);return v(e)}else if(s.length===1){return s[0]}else if(l(s)){return v(true)}else{return{_type:"Set",operator:"||",operands:s}}}n.or=d;function f(e){e=$(e);if(i(e)){return a}else if(E(e)){return v(!e.value)}else if(typeof e==="object"&&e._type==="Set"&&e.operator==="||"&&e.operands.every(e=>E(e)||P(e))){return p(...e.operands.map(e=>f(e)))}else if(typeof e==="object"&&e._type==="Set"&&e.operator==="&&"&&e.operands.every(e=>E(e)||P(e))){return d(...e.operands.map(e=>f(e)))}else if(P(e)){switch(e.operator){case"!==":return{...e,operator:"==="};case"<":return{...e,operator:">="};case"<=":return{...e,operator:">"};case"===":return{...e,operator:"!=="};case">":return{...e,operator:"<="};case">=":return{...e,operator:"<"}}}else if(e._type==="Not"){return e.operand}return{_type:"Not",operand:e}}n.not=f;function c(e){if(E(e)){return v(!!e.value)}else{return{_type:"Truthy",operand:e}}}n.isTruthy=c;function m(e,n){let t=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];let r=arguments.length>3?arguments[3]:undefined;return y(e,n,t,r)}n.bindingExpression=m;function y(e,n){let t=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];let r=arguments.length>3?arguments[3]:undefined;if(e===undefined){return a}let o;if(r){o=r(e);if(o===undefined){return a}}else{const n=t.concat();n.push(e);o=n.join("/")}return{_type:"PathInModel",modelName:n,path:o}}n.pathInModel=y;function v(e){let n;if(typeof e==="object"&&e!==null&&e!==undefined){if(Array.isArray(e)){n=e.map($)}else if(F(e)){n=e.valueOf()}else{n=Object.entries(e).reduce((e,n)=>{let[t,r]=n;const a=$(r);if(a._type!=="Constant"||a.value!==undefined){e[t]=a}return e},{})}}else{n=e}return{_type:"Constant",value:n}}n.constant=v;function h(e,n){if(e!==undefined&&typeof e==="string"&&e.startsWith("{")){const n=/^{(.*)>(.+)}$/;const t=n.exec(e);if(e.startsWith("{=")){return{_type:"EmbeddedExpressionBinding",value:e}}else if(t){return y(t[2]||"",t[1]||undefined)}else{return{_type:"EmbeddedBinding",value:e}}}else if(n==="boolean"&&typeof e==="string"&&(e==="true"||e==="false")){return v(e==="true")}else if(n==="number"&&typeof e==="string"&&(!isNaN(Number(e))||e==="NaN")){return v(Number(e))}else{return v(e)}}n.resolveBindingString=h;function g(e){return{_type:"Ref",ref:e}}n.ref=g;function $(e){if(b(e)){return e}return v(e)}function b(e){return(e===null||e===void 0?void 0:e._type)!==undefined}n.isBindingToolkitExpression=b;function E(e){return typeof e!=="object"||e._type==="Constant"}n.isConstant=E;function O(e){return E(e)&&e.value===true}function I(e){return E(e)&&e.value===false}function _(e){return(e===null||e===void 0?void 0:e._type)==="PathInModel"}n.isPathInModelExpression=_;function x(e){return(e===null||e===void 0?void 0:e._type)==="ComplexType"}n.isComplexTypeExpression=x;function C(e){return(e===null||e===void 0?void 0:e._type)==="Concat"}function P(e){return e._type==="Comparison"}function S(e){const n=e;return(n===null||n===void 0?void 0:n._type)==="Constant"&&(n===null||n===void 0?void 0:n.value)===undefined}n.isUndefinedExpression=S;function F(e){switch(e.constructor.name){case"String":case"Number":case"Boolean":return true;default:return false}}function T(e){return typeof e==="object"&&!F(e)}function N(e){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];let t=arguments.length>2?arguments[2]:undefined;let r=arguments.length>3?arguments[3]:undefined;return M(e,n,t,r)}n.annotationExpression=N;function M(e){var n;let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];let r=arguments.length>2?arguments[2]:undefined;let o=arguments.length>3?arguments[3]:undefined;if(e===undefined){return $(r)}e=(n=e)===null||n===void 0?void 0:n.valueOf();if(!T(e)){return v(e)}switch(e.type){case"Path":return y(e.path,undefined,t,o);case"If":return D(e.If,t,o);case"Not":return f(w(e.Not,t,o));case"Eq":return L(w(e.Eq[0],t,o),w(e.Eq[1],t,o));case"Ne":return k(w(e.Ne[0],t,o),w(e.Ne[1],t,o));case"Gt":return q(w(e.Gt[0],t,o),w(e.Gt[1],t,o));case"Ge":return B(w(e.Ge[0],t,o),w(e.Ge[1],t,o));case"Lt":return U(w(e.Lt[0],t,o),w(e.Lt[1],t,o));case"Le":return G(w(e.Le[0],t,o),w(e.Le[1],t,o));case"Or":return d(...e.Or.map(function(e){return w(e,t,o)}));case"And":return p(...e.And.map(function(e){return w(e,t,o)}));case"Apply":return A(e,t,o)}return a}n.getExpressionFromAnnotation=M;function w(e){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];let r=arguments.length>2?arguments[2]:undefined;if(e===null||typeof e!=="object"){return v(e)}else if(e.hasOwnProperty("$Or")){return d(...e.$Or.map(function(e){return w(e,n,r)}))}else if(e.hasOwnProperty("$And")){return p(...e.$And.map(function(e){return w(e,n,r)}))}else if(e.hasOwnProperty("$Not")){return f(w(e.$Not,n,r))}else if(e.hasOwnProperty("$Eq")){return L(w(e.$Eq[0],n,r),w(e.$Eq[1],n,r))}else if(e.hasOwnProperty("$Ne")){return k(w(e.$Ne[0],n,r),w(e.$Ne[1],n,r))}else if(e.hasOwnProperty("$Gt")){return q(w(e.$Gt[0],n,r),w(e.$Gt[1],n,r))}else if(e.hasOwnProperty("$Ge")){return B(w(e.$Ge[0],n,r),w(e.$Ge[1],n,r))}else if(e.hasOwnProperty("$Lt")){return U(w(e.$Lt[0],n,r),w(e.$Lt[1],n,r))}else if(e.hasOwnProperty("$Le")){return G(w(e.$Le[0],n,r),w(e.$Le[1],n,r))}else if(e.hasOwnProperty("$Path")){return y(e.$Path,undefined,n,r)}else if(e.hasOwnProperty("$Apply")){return M({type:"Apply",Function:e.$Function,Apply:e.$Apply},n,undefined,r)}else if(e.hasOwnProperty("$If")){return M({type:"If",If:e.$If},n,undefined,r)}else if(e.hasOwnProperty("$EnumMember")){return v(t(e.$EnumMember))}return v(false)}function D(e){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];let t=arguments.length>2?arguments[2]:undefined;return Y(w(e[0],n,t),w(e[1],n,t),w(e[2],n,t))}n.annotationIfExpression=D;function A(e){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];let t=arguments.length>2?arguments[2]:undefined;switch(e.Function){case"odata.concat":return ee(...e.Apply.map(e=>{let r=e;if(e.hasOwnProperty("$Path")){r={type:"Path",path:e.$Path}}else if(e.hasOwnProperty("$If")){r={type:"If",If:e.$If}}else if(e.hasOwnProperty("$Apply")){r={type:"Apply",Function:e.$Function,Apply:e.$Apply}}return M(r,n,undefined,t)}))}return a}n.annotationApplyExpression=A;function j(e,n,t){const r=$(n);const o=$(t);if(i(r,o)){return a}if(E(r)&&E(o)){switch(e){case"!==":return v(r.value!==o.value);case"===":return v(r.value===o.value);case"<":return v(r.value<o.value);case"<=":return v(r.value<=o.value);case">":return v(r.value>o.value);case">=":return v(r.value>=o.value)}}else{return{_type:"Comparison",operator:e,operand1:r,operand2:o}}}function V(e){if(e._type==="Unresolvable"){return e}return{_type:"Length",pathInModel:e}}n.length=V;function L(e,n){const t=$(e);const r=$(n);if(i(t,r)){return a}if(s(t,r)){return v(true)}function o(e,n){if(e._type==="Comparison"&&O(n)){return e}else if(e._type==="Comparison"&&I(n)){return f(e)}else if(e._type==="IfElse"&&s(e.onTrue,n)){return d(e.condition,L(e.onFalse,n))}else if(e._type==="IfElse"&&s(e.onFalse,n)){return d(f(e.condition),L(e.onTrue,n))}else if(e._type==="IfElse"&&E(e.onTrue)&&E(e.onFalse)&&E(n)&&!s(e.onTrue,n)&&!s(e.onFalse,n)){return v(false)}return undefined}const u=o(t,r)??o(r,t);return u??j("===",t,r)}n.equal=L;function k(e,n){return f(L(e,n))}n.notEqual=k;function B(e,n){return j(">=",e,n)}n.greaterOrEqual=B;function q(e,n){return j(">",e,n)}n.greaterThan=q;function G(e,n){return j("<=",e,n)}n.lessOrEqual=G;function U(e,n){return j("<",e,n)}n.lessThan=U;function Y(e,n,t){let r=$(e);let o=$(n);let u=$(t);if(i(r,o,u)){return a}if(r._type==="Not"){[o,u]=[u,o];r=f(r)}if(o._type==="IfElse"&&s(r,o.condition)){o=o.onTrue}if(u._type==="IfElse"&&s(r,u.condition)){u=u.onFalse}if(E(r)){return r.value?o:u}if(s(o,u)){return o}if(I(u)){return p(r,o)}if(O(u)){return d(f(r),o)}if(I(o)){return p(f(r),u)}if(O(o)){return d(r,u)}if(x(e)||x(n)||x(t)){let r=0;const a=R([e,n,t],"sap.fe.core.formatters.StandardFormatter#ifElse");const o=[];ne(a,"PathInModel",e=>{o.push(e);return y(`$${r++}`,"$")},true);o.unshift(v(JSON.stringify(a)));return R(o,"sap.fe.core.formatters.StandardFormatter#evaluateComplexExpression",undefined,true)}return{_type:"IfElse",condition:r,onTrue:o,onFalse:u}}n.ifElse=Y;function W(e){switch(e._type){case"Constant":case"Formatter":case"ComplexType":return false;case"Set":return e.operands.some(W);case"PathInModel":return e.modelName===undefined;case"Comparison":return W(e.operand1)||W(e.operand2);case"IfElse":return W(e.condition)||W(e.onTrue)||W(e.onFalse);case"Not":case"Truthy":return W(e.operand);default:return false}}function R(e,n,t){let r=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;const o=e.map($);if(i(...o)){return a}if(t){if(!o.some(W)){t.keys.forEach(e=>o.push(y(e.name,"")))}}let s="";if(typeof n==="string"){s=n}else{s=n.__functionName}const[u,l]=s.split("#");if(!r&&(o.some(x)||o.some(C))){let e=0;const n=R(o,s,undefined,true);const t=[];ne(n,"PathInModel",n=>{t.push(n);return y(`$${e++}`,"$")});t.unshift(v(JSON.stringify(n)));return R(t,"sap.fe.core.formatters.StandardFormatter#evaluateComplexExpression",undefined,true)}else if(!!l&&l.length>0){o.unshift(v(l))}return{_type:"Formatter",fn:u,parameters:o}}n.formatResult=R;function Q(e,n){var t,r,a,o,i,s,u,l,p,d,f,c,m;const y={};if(e!==null&&e!==void 0&&(t=e.constraints)!==null&&t!==void 0&&t.$Scale&&n.scale!==undefined){y.scale=n.scale}if(e!==null&&e!==void 0&&(r=e.constraints)!==null&&r!==void 0&&r.$Precision&&n.precision!==undefined){y.precision=n.precision}if(e!==null&&e!==void 0&&(a=e.constraints)!==null&&a!==void 0&&a.$MaxLength&&n.maxLength!==undefined){y.maxLength=n.maxLength}if(n.nullable===false){y.nullable=false}if(e!==null&&e!==void 0&&(o=e.constraints)!==null&&o!==void 0&&o["@Org.OData.Validation.V1.Minimum/$Decimal"]&&!isNaN((i=n.annotations)===null||i===void 0?void 0:(s=i.Validation)===null||s===void 0?void 0:s.Minimum)){var v,h;y.minimum=`${(v=n.annotations)===null||v===void 0?void 0:(h=v.Validation)===null||h===void 0?void 0:h.Minimum}`}if(e!==null&&e!==void 0&&(u=e.constraints)!==null&&u!==void 0&&u["@Org.OData.Validation.V1.Maximum/$Decimal"]&&!isNaN((l=n.annotations)===null||l===void 0?void 0:(p=l.Validation)===null||p===void 0?void 0:p.Maximum)){var g,$;y.maximum=`${(g=n.annotations)===null||g===void 0?void 0:($=g.Validation)===null||$===void 0?void 0:$.Maximum}`}if((d=n.annotations)!==null&&d!==void 0&&(f=d.Common)!==null&&f!==void 0&&f.IsDigitSequence&&e.type==="sap.ui.model.odata.type.String"&&e!==null&&e!==void 0&&(c=e.constraints)!==null&&c!==void 0&&c["@com.sap.vocabularies.Common.v1.IsDigitSequence"]){y.isDigitSequence=true}if(e!==null&&e!==void 0&&(m=e.constraints)!==null&&m!==void 0&&m.$V4){y.V4=true}return y}n.setUpConstraints=Q;function J(e,n){var t;let a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;const o=n;if(e._type!=="Property"){return o}const i=r[e.type];if(!i){return o}if(!o.formatOptions){o.formatOptions={}}o.constraints={};o.type=i.type;if(!a){o.constraints=Q(i,e)}if((o===null||o===void 0?void 0:(t=o.type)===null||t===void 0?void 0:t.indexOf("sap.ui.model.odata.type.Int"))===0&&(o===null||o===void 0?void 0:o.type)!=="sap.ui.model.odata.type.Int64"||(o===null||o===void 0?void 0:o.type)==="sap.ui.model.odata.type.Double"){o.formatOptions=Object.assign(o.formatOptions,{parseAsString:false})}if(o.type==="sap.ui.model.odata.type.String"){o.formatOptions.parseKeepsEmptyString=true;const n=K(e);if(n){o.formatOptions.fiscalType=n;o.type="sap.fe.core.type.FiscalDate"}}if(o.type==="sap.ui.model.odata.type.Decimal"||(o===null||o===void 0?void 0:o.type)==="sap.ui.model.odata.type.Int64"){o.formatOptions=Object.assign(o.formatOptions,{emptyString:""})}return o}n.formatWithTypeInformation=J;const K=function(e){var n,t,r,a,o,i,s,u,l,p,d,f,c,m,y,v;if((n=e.annotations)!==null&&n!==void 0&&(t=n.Common)!==null&&t!==void 0&&t.IsFiscalYear){return"com.sap.vocabularies.Common.v1.IsFiscalYear"}if((r=e.annotations)!==null&&r!==void 0&&(a=r.Common)!==null&&a!==void 0&&a.IsFiscalPeriod){return"com.sap.vocabularies.Common.v1.IsFiscalPeriod"}if((o=e.annotations)!==null&&o!==void 0&&(i=o.Common)!==null&&i!==void 0&&i.IsFiscalYearPeriod){return"com.sap.vocabularies.Common.v1.IsFiscalYearPeriod"}if((s=e.annotations)!==null&&s!==void 0&&(u=s.Common)!==null&&u!==void 0&&u.IsFiscalQuarter){return"com.sap.vocabularies.Common.v1.IsFiscalQuarter"}if((l=e.annotations)!==null&&l!==void 0&&(p=l.Common)!==null&&p!==void 0&&p.IsFiscalYearQuarter){return"com.sap.vocabularies.Common.v1.IsFiscalYearQuarter"}if((d=e.annotations)!==null&&d!==void 0&&(f=d.Common)!==null&&f!==void 0&&f.IsFiscalWeek){return"com.sap.vocabularies.Common.v1.IsFiscalWeek"}if((c=e.annotations)!==null&&c!==void 0&&(m=c.Common)!==null&&m!==void 0&&m.IsFiscalYearWeek){return"com.sap.vocabularies.Common.v1.IsFiscalYearWeek"}if((y=e.annotations)!==null&&y!==void 0&&(v=y.Common)!==null&&v!==void 0&&v.IsDayOfFiscalYear){return"com.sap.vocabularies.Common.v1.IsDayOfFiscalYear"}};n.getFiscalType=K;function z(e,n,t,r){const o=e.map($);if(i(...o)){return a}if(o.length===1&&E(o[0])&&!t){return o[0]}else if(t){if(!o.some(W)){t.keys.forEach(e=>o.push(y(e.name,"")))}}r=H(e[0],r);if(n==="sap.ui.model.odata.type.Unit"){const e=y("/##@@requestUnitsOfMeasure");e.targetType="any";e.mode="OneTime";o.push(e)}else if(n==="sap.ui.model.odata.type.Currency"){const e=y("/##@@requestCurrencyCodes");e.targetType="any";e.mode="OneTime";o.push(e)}return{_type:"ComplexType",type:n,formatOptions:r||{},parameters:{},bindingParameters:o}}n.addTypeInformation=z;function H(e,n){var t,r;if(!(n&&n.showNumber===false)&&((e===null||e===void 0?void 0:(t=e.type)===null||t===void 0?void 0:t.indexOf("sap.ui.model.odata.type.Int"))===0||(e===null||e===void 0?void 0:e.type)==="sap.ui.model.odata.type.Decimal"||(e===null||e===void 0?void 0:e.type)==="sap.ui.model.odata.type.Double")){if((e===null||e===void 0?void 0:e.type)==="sap.ui.model.odata.type.Int64"||(e===null||e===void 0?void 0:e.type)==="sap.ui.model.odata.type.Decimal"){var a;n=((a=n)===null||a===void 0?void 0:a.showMeasure)===false?{emptyString:"",showMeasure:false}:{emptyString:""}}else{var o;n=((o=n)===null||o===void 0?void 0:o.showMeasure)===false?{parseAsString:false,showMeasure:false}:{parseAsString:false}}}if((e===null||e===void 0?void 0:(r=e.constraints)===null||r===void 0?void 0:r.nullable)!==false){var i;(i=n)===null||i===void 0?true:delete i.emptyString}return n}function X(e,n,t){const r=typeof e==="string"?e:e.__functionName;return{_type:"Function",obj:t!==undefined?$(t):undefined,fn:r,parameters:n.map($)}}n.fn=X;function Z(e){const n=[];ne(e,"PathInModel",e=>{n.push(d(L(e,""),L(e,undefined),L(e,null)));return e});return p(...n)}n.isEmpty=Z;function ee(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++){n[t]=arguments[t]}const r=n.map($);if(i(...r)){return a}if(r.every(E)){return v(r.reduce((e,n)=>{if(n.value!==undefined){return e+n.value.toString()}return e},""))}else if(r.some(x)){let e=0;const n=R(r,"sap.fe.core.formatters.StandardFormatter#concat",undefined,true);const t=[];ne(n,"PathInModel",n=>{t.push(n);return y(`$${e++}`,"$")});t.unshift(v(JSON.stringify(n)));return R(t,"sap.fe.core.formatters.StandardFormatter#evaluateComplexExpression",undefined,true)}return{_type:"Concat",expressions:r}}n.concat=ee;function ne(e,n,t){let r=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;let a=e;switch(a._type){case"Function":case"Formatter":a.parameters=a.parameters.map(e=>ne(e,n,t,r));break;case"Concat":a.expressions=a.expressions.map(e=>ne(e,n,t,r));a=ee(...a.expressions);break;case"ComplexType":a.bindingParameters=a.bindingParameters.map(e=>ne(e,n,t,r));break;case"IfElse":const e=ne(a.onTrue,n,t,r);const o=ne(a.onFalse,n,t,r);let i=a.condition;if(r){i=ne(a.condition,n,t,r)}a=Y(i,e,o);break;case"Not":if(r){const e=ne(a.operand,n,t,r);a=f(e)}break;case"Truthy":break;case"Set":if(r){const e=a.operands.map(e=>ne(e,n,t,r));a=a.operator==="||"?d(...e):p(...e)}break;case"Comparison":if(r){const e=ne(a.operand1,n,t,r);const o=ne(a.operand2,n,t,r);a=j(a.operator,e,o)}break;case"Ref":case"Length":case"PathInModel":case"Constant":case"EmbeddedBinding":case"EmbeddedExpressionBinding":case"Unresolvable":break}if(n===a._type){a=t(e)}return a}n.transformRecursively=ne;const te=function(e){return!E(e)&&!_(e)&&b(e)&&e._type!=="IfElse"&&e._type!=="Function"};function re(e){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(n&&Object.keys(e.value).length===0){return""}const t=e.value;const r=[];Object.keys(t).forEach(e=>{const a=t[e];const o=ue(a,true,false,n);if(o&&o.length>0){r.push(`${e}: ${o}`)}});return`{${r.join(", ")}}`}function ae(e,n){let t=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;let r=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;if(e.value===null){return r?null:"null"}if(e.value===undefined){return r?undefined:"undefined"}if(typeof e.value==="object"){if(Array.isArray(e.value)){const n=e.value.map(e=>ue(e,true));return`[${n.join(", ")}]`}else{return re(e,t)}}if(n){switch(typeof e.value){case"number":case"bigint":case"boolean":return e.value.toString();case"string":return`'${o(e.value.toString())}'`;default:return""}}else{return r?e.value:e.value.toString()}}n.compileConstant=ae;function oe(e,n,t){if(e.type||e.parameters||e.targetType||e.formatOptions||e.constraints){const r={path:ce(e),type:e.type,targetType:e.targetType,parameters:e.parameters,formatOptions:e.formatOptions,constraints:e.constraints};const a=ue(r,false,false,true);if(n){return`${t}${a}`}return a}else if(n){return`${t}{${ce(e)}}`}else{return`{${ce(e)}}`}}function ie(e){if(e.bindingParameters.length===1){return`{${de(e.bindingParameters[0],true)}, type: '${e.type}'}`}let n=`], type: '${e.type}'`;if(fe(e.formatOptions)){n+=`, formatOptions: ${ue(e.formatOptions)}`}if(fe(e.parameters)){n+=`, parameters: ${ue(e.parameters)}`}n+="}";return`{mode:'TwoWay', parts:[${e.bindingParameters.map(e=>de(e)).join(",")}${n}`}function se(e,n){let t=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(n){if(t){return`(${e})`}else{return e}}else{return`{= ${e}}`}}n.wrapBindingExpression=se;function ue(e){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;let t=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;let r=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;const a=$(e);const o=t?"$":"%";switch(a._type){case"Unresolvable":return undefined;case"Constant":return ae(a,n,r);case"Ref":return a.ref||"null";case"Function":const e=`${a.parameters.map(e=>ue(e,true)).join(", ")}`;return a.obj===undefined?`${a.fn}(${e})`:`${ue(a.obj,true)}.${a.fn}(${e})`;case"EmbeddedExpressionBinding":return n?`(${a.value.substring(2,a.value.length-1)})`:`${a.value}`;case"EmbeddedBinding":return n?`${o}${a.value}`:`${a.value}`;case"PathInModel":return oe(a,n,o);case"Comparison":const t=le(a);return se(t,n);case"IfElse":const i=`${ue(a.condition,true)} ? ${ue(a.onTrue,true)} : ${ue(a.onFalse,true)}`;return se(i,n,true);case"Set":const s=a.operands.map(e=>ue(e,true)).join(` ${a.operator} `);return se(s,n,true);case"Concat":const u=a.expressions.map(e=>ue(e,true,true)).join(" + ");return se(u,n);case"Length":const l=`${ue(a.pathInModel,true)}.length`;return se(l,n);case"Not":const p=`!${ue(a.operand,true)}`;return se(p,n);case"Truthy":const d=`!!${ue(a.operand,true)}`;return se(d,n);case"Formatter":const f=pe(a);return n?`$${f}`:f;case"ComplexType":const c=ie(a);return n?`$${c}`:c;default:return""}}n.compileExpression=ue;function le(e){function n(e){const n=ue(e,true)??"undefined";return se(n,true,te(e))}return`${n(e.operand1)} ${e.operator} ${n(e.operand2)}`}function pe(e){if(e.parameters.length===1){return`{${de(e.parameters[0],true)}, formatter: '${e.fn}'}`}else{const n=e.parameters.map(e=>{if(e._type==="ComplexType"){return ie(e)}else{return de(e)}});return`{parts: [${n.join(", ")}], formatter: '${e.fn}'}`}}function de(e){let n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;let t="";if(e._type==="Constant"){if(e.value===undefined){t=`value: 'undefined'`}else{t=`value: ${ae(e,true)}`}}else if(e._type==="PathInModel"){t=`path: '${ce(e)}'`;t+=e.type?`, type: '${e.type}'`:`, targetType: 'any'`;if(fe(e.mode)){t+=`, mode: '${ue(e.mode)}'`}if(fe(e.constraints)){t+=`, constraints: ${ue(e.constraints)}`}if(fe(e.formatOptions)){t+=`, formatOptions: ${ue(e.formatOptions)}`}if(fe(e.parameters)){t+=`, parameters: ${ue(e.parameters)}`}}else{return""}return n?t:`{${t}}`}function fe(e){return e&&Object.keys(e).length>0}function ce(e){return`${e.modelName?`${e.modelName}>`:""}${e.path}`}return n},false);