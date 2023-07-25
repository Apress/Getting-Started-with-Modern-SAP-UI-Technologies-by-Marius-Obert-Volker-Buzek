/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/BaseDelegate","sap/ui/mdc/odata/TypeUtil","sap/ui/model/FormatException","sap/ui/mdc/condition/Condition","sap/ui/mdc/enum/ConditionValidated"],function(e,t,n,i,a){"use strict";var u=Object.assign({},e);u.createConditionPayload=function(e,t,n){return undefined};u.createCondition=function(e,t,n,u){var r=i.createItemCondition(n[0],n[1],undefined,undefined,this.createConditionPayload(e,t,n));r.validated=a.Validated;return r};u.initializeTypeFromBinding=function(e,t,n){return{}};u.initializeInternalUnitType=function(e,t,n){};u.enhanceValueForUnit=function(e,t,n){return t};u.isInputValidationEnabled=function(e,t){if(t&&t.isValidationSupported()){return true}else{return false}};u.isInvalidInputAllowed=function(e,t){if(t){return!t.getValidateInput()}else{return true}};u.getItemForValue=function(e,t,n){if(t){return t.getItemForValue(n)}};u.getDescription=function(e,t,i,a,u,r,o,d,l,c,s){var p={value:i,parsedValue:i,dataType:s,context:{inParameters:a,outParameters:u,payload:l},bindingContext:r,checkKey:true,checkDescription:false,caseSensitive:true,exception:n,control:c};return t&&t.getItemForValue(p)};u.getDefaultValueHelpDelegate=function(e){return{name:"sap/ui/mdc/ValueHelpDelegate",payload:{}}};u.getTypeUtil=function(e){return t};return u});