/*
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/model/odata/type/Unit","sap/ui/comp/smartfield/type/Decimal","sap/ui/comp/smartfield/type/Int16","sap/ui/comp/smartfield/type/Int32","sap/ui/comp/smartfield/type/Int64","sap/ui/comp/smartfield/type/Byte","sap/ui/comp/smartfield/type/SByte","sap/ui/comp/smartfield/type/Double","sap/ui/model/ValidateException","sap/ui/comp/smartfield/UoMValidateException"],function(t,i,e,s,n,a,o,r,p,u,m){"use strict";var l=/^([-]?)(\d+)(?:\.(\d+))?$/;var c=i.extend("sap.ui.comp.smartfield.type.Unit",{constructor:function(t,e){t.decimals=e.scale;i.apply(this,[t,{skipDecimalsValidation:e.skipDecimalsValidation}]);this.oConstraints=e;this.sName="Unit"}});c.prototype.parseValue=function(t,e,s){var n=i.prototype.parseValue.apply(this,arguments),a,o,r=Array.isArray(n)&&n[0]&&h(n[0]);if(Array.isArray(r)){a=r[1]+r[2];o=r[3];if(Number.parseInt(o)===0){n[0]=a}}if(n[1]===undefined&&s){n[1]=s[1]}if(n[1]&&this.shouldConvertUnitToUpperCase(n[1])){n[1]=n[1].toUpperCase()}return n};c.prototype.validateValue=function(t){var e,s=t[0],n=t[1],a=s===null,o=this.oFormatOptions&&this.oFormatOptions.customUnits;if(o&&n&&Object.keys(o).indexOf(n)===-1){throw new m(f("UNIT_VALIDATION_FAILS",[n]))}i.prototype.validateValue.apply(this,arguments);if(this.oConstraints.nullable&&(a||s===this.oFormatOptions.emptyString)){return}e=h(s);if(e===null){throw new u(d("EnterNumber"))}if(this.oConstraints&&!this.oConstraints.scale&&this.oConstraints.skipDecimalsValidation){return}y.call(this,this.oConstraints.type,s);var r=parseInt(e[2]),p,l=this.oConstraints&&this.oConstraints.scale,c=l,C=r===0?0:e[2].length,b=(e[3]||"").length,w=this.oConstraints&&this.oConstraints.precision,U=typeof w==="number"?w:Infinity,I=this.mCustomUnits&&this.mCustomUnits[n]&&this.mCustomUnits[n].decimals;if((I||I===0)&&!this.oConstraints.skipDecimalsValidation){c=I}if(this.oConstraints&&this.oConstraints.variableScale){p=Math.min(U,c);l=p}else{p=Math.min(l||0,c)}if(p>U){p=U}if(b>p){if(p===0){throw new u(d("EnterInt"))}if(C+p>U){throw new u(d("EnterNumberIntegerFraction",[U-p,p]))}throw new u(d("EnterNumberFraction",[p]))}if(C>U-l){throw new u(d("EnterNumberInteger",[U-l]))}};function h(t){return l.exec(t)}function d(i,e){return t.getLibraryResourceBundle().getText(i,e)}function f(i,e){return t.getLibraryResourceBundle("sap.ui.comp").getText(i,e)}function y(t,i){if(t){var u;switch(t){case"Edm.Double":u=new p({},this.oConstraints);break;case"Edm.Decimal":u=new e({},this.oConstraints);break;case"Edm.Int16":u=new s({},this.oConstraints);break;case"Edm.Int32":u=new n({},this.oConstraints);break;case"Edm.Int64":u=new a({},this.oConstraints);break;case"Edm.Byte":u=new o({},this.oConstraints);break;case"Edm.SByte":u=new r({},this.oConstraints);break}u.validateValue(i)}}c.prototype.shouldConvertUnitToUpperCase=function(t){return this.mCustomUnits&&!this.mCustomUnits[t]&&this.mCustomUnits[t.toUpperCase()]};c.prototype.getName=function(){return"sap.ui.comp.smartfield.type.Unit"};return c});