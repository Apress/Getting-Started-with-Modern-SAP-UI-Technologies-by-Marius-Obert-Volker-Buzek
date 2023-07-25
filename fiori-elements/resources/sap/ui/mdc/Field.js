/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/FieldBase","sap/ui/mdc/field/FieldBaseRenderer","sap/ui/mdc/enum/FieldDisplay","sap/ui/mdc/enum/BaseType","sap/base/util/deepEqual","sap/base/util/merge","sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/mdc/condition/Condition"],function(t,e,i,n,a,o,s,l,r){"use strict";var p=t.extend("sap.ui.mdc.Field",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/field/Field.designtime",properties:{value:{type:"any",defaultValue:null,bindable:"bindable"},additionalValue:{type:"any",defaultValue:null,bindable:"bindable"}},events:{change:{parameters:{value:{type:"string"},valid:{type:"boolean"},promise:{type:"Promise"}}}},defaultProperty:"value"},renderer:e});p.prototype.init=function(){this._vValue=null;this._vAdditionalValue=null;t.prototype.init.apply(this,arguments);this.setMaxConditions(1);this._oObserver.observe(this,{properties:["value","additionalValue"]})};p.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._iConditionUpdateTimer){clearTimeout(this._iConditionUpdateTimer);delete this._iConditionUpdateTimer;delete this._bPendingConditionUpdate}this._oBindingContext=undefined};p.prototype.bindProperty=function(e,i){if(e==="value"&&!i.formatter){i.targetType="raw";var n=this._getContentFactory().getDataType();if(i.type&&(!n||n.getMetadata().getName()!==i.type.getMetadata().getName()||!a(n.getFormatOptions(),i.type.getFormatOptions())||!a(n.getConstraints(),i.type.getConstraints())||n._bCreatedByOperator!==i.type._bCreatedByOperator)){this._getContentFactory().setDataType(i.type);this._getContentFactory().setDateOriginalType(undefined);this._getContentFactory().setUnitOriginalType(undefined);this._getContentFactory().setIsMeasure(false);if(i.type.isA("sap.ui.model.CompositeType")&&i.parts){var o=[];for(var s=0;s<i.parts.length;s++){o.push(i.parts[s].type)}this._getContentFactory().setCompositeTypes(o)}this._getContentFactory().updateConditionType();this.invalidate()}}t.prototype.bindProperty.apply(this,arguments)};p.prototype._handleModelContextChange=function(e){t.prototype._handleModelContextChange.apply(this,arguments);var i=this.getBinding("value");if(i){var n=i.isA("sap.ui.model.CompositeBinding")?i.getBindings()[0].getContext():i.getContext();if(l.hasChanged(this._oBindingContext,n)){this._oBindingContext=n;this._getContentFactory().updateConditionType();if(this._isInvalidInput()||this.getFieldHelp()){if(this._oManagedObjectModel){this._oManagedObjectModel.checkUpdate(true,true)}this._resetInvalidInput()}}if(!this._getContentFactory().getDataType()){this._getContentFactory().setDataType(i.getType());this.invalidate()}}};p.prototype._initDataType=function(){t.prototype._initDataType.apply(this,arguments);var e=this.getBinding("value");if(e){this._getContentFactory().setDataType(e.getType())}};p.prototype.setProperty=function(e,i,n){if(e==="value"&&this._isInvalidInput()&&a(this.getValue(),this.validateProperty(e,i))){if(this._oManagedObjectModel){this._oManagedObjectModel.checkUpdate(true,true)}this._resetInvalidInput()}return t.prototype.setProperty.apply(this,arguments)};p.prototype.setMaxConditions=function(t){if(t!==1){throw new Error("Only one condition allowed for Field "+this)}return this.setProperty("maxConditions",t,true)};p.prototype._observeChanges=function(e){t.prototype._observeChanges.apply(this,arguments);if(e.name==="value"){var i=y.call(this,e.current,e.old);if(this._vAdditionalValue!==null&&C.call(this)&&!c.call(this,i,this._vValue,true)){this._vAdditionalValue=this.getAdditionalValue()}this._vValue=i;f.call(this,e.current);u.call(this)}if(e.name==="additionalValue"){this._vAdditionalValue=e.current;u.call(this)}if(e.name==="conditions"){if(this._getContent().length<=1){v.call(this,e.current)}}};function d(){return this._vValue}function h(){return this._vAdditionalValue}function u(){if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){u.call(this)}}.bind(this));return}if(this.getDisplay()===i.Value){g.call(this,d.call(this),h.call(this))}else if(!this._iConditionUpdateTimer){this._iConditionUpdateTimer=setTimeout(function(){g.call(this,d.call(this),h.call(this));this._iConditionUpdateTimer=undefined;this._bPendingConditionUpdate=false}.bind(this),0);this._bPendingConditionUpdate=true}}function g(t,e){var i=this.getConditions();if(this._checkValueInitial(t)&&!e){if(i.length>0){this.setConditions([])}}else{var n=i[0];var a=n&&n.values[0];var o=n&&n.values[1]?n.values[1]:null;if(!n||n.operator!=="EQ"||!c.call(this,a,t)||o!==e){var s=this.getControlDelegate();var l=this.getPayload();var p=s.createCondition(l,this,[t,e],n);if(!r.compareConditions(n,p)){this.setConditions(p?[p]:[])}}}}function y(t,e){var i=this._getContentFactory().getDataType()?this._getContentFactory().getDataType().getMetadata().getName():this.getDataType();if(t&&e&&(i==="sap.ui.model.odata.type.Unit"||i==="sap.ui.model.odata.type.Currency")&&!t[2]&&e[2]!==undefined){t=o([],t);t[2]=e[2];if(this._bPendingChange){var n=this.getConditions()[0];if(n){if(t[0]===e[0]&&t[0]!==n.values[0][0]){t[0]=n.values[0][0]}if(t[1]===e[1]&&t[1]!==n.values[0][1]){t[1]=n.values[0][1]}}}}return t}function c(t,e,i){var o=t===e;var s=this._getContentFactory().getDataType()?this._getContentFactory().getDataType().getMetadata().getName():this.getDataType();if(!o&&this.getTypeUtil().getBaseType(s)===n.Unit&&Array.isArray(t)&&Array.isArray(e)){var l=t[0];var r=t[1];var p=t.length>=3?t[2]:null;var d=e[0];var h=e[1];var u=e.length>=3?e[2]:null;if(l===d&&r===h&&((this._bUnitSet||i)&&(!p||!u)||a(p,u))){o=true}if((p||u)&&!i){this._bUnitSet=true}}return o}function f(t){if(!this._bTypeInitialized){if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){f.call(this,t)}}.bind(this));return}var e=this.getBinding("value");var i=e?e.getType():this._getContentFactory().getDataType();this._oTypeInitialization=this.getControlDelegate().initializeTypeFromBinding(this.getPayload(),i,t);this._bTypeInitialized=this._oTypeInitialization.bTypeInitialized;if(this._bTypeInitialized&&this._getContentFactory().getUnitOriginalType()){this.getControlDelegate().initializeInternalUnitType(this.getPayload(),this._getContentFactory().getDataType(),this._oTypeInitialization);this.getControlDelegate().initializeInternalUnitType(this.getPayload(),this._getContentFactory().getUnitType(),this._oTypeInitialization)}}}p.prototype._fireChange=function(t,e,i,n){var a;if(t){if(e){a=this._getResultForPromise(t)}else{a=i}}if(this._getContent().length>1){if(t){v.call(this,this.getConditions())}else if(n){n=n.then(function(t){v.call(this,this.getConditions());return t}.bind(this))}}this.fireChange({value:a,valid:e,promise:n})};p.prototype._getResultForPromise=function(t){var e;if(t.length===0&&this._getContentFactory().getDataType()){e=this._getContentFactory().getDataType().parseValue("","string",[])}else if(t.length===1){e=t[0].values[0]}return e};function v(t){if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){v.call(this,t)}}.bind(this));return}var e=null;var i=null;var n=this.getValue();var a=this.getAdditionalValue();if(t.length===0&&n===null&&a===null){return}e=this._getResultForPromise(t);if(t.length===0&&!a){i=a}else if(t.length===1&&t[0].values.length>1){i=t[0].values[1]}this._vValue=e;this._vAdditionalValue=i;if(!c.call(this,e,n,true)){this.setProperty("value",e,true)}if(i!==a&&!C.call(this)){this.setProperty("additionalValue",i,true)}}p.prototype._getOperators=function(){return["EQ"]};function C(){var t=this.getBinding("additionalValue");if(t&&t.getBindingMode()===s.OneWay){return true}return false}p.prototype._checkCreateInternalContent=function(){if(!this.bIsDestroyed&&this._getContentFactory().getDataType()&&!this._isPropertyInitial("editMode")&&!this._isPropertyInitial("multipleLines")){t.prototype._checkCreateInternalContent.apply(this,arguments)}};p.prototype.getOverflowToolbarConfig=function(){var e=t.prototype.getOverflowToolbarConfig.apply(this,arguments);e.propsUnrelatedToSize.push("value");e.propsUnrelatedToSize.push("additionalValue");return e};return p});