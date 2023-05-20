/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define([],function(){"use strict";return{annotations:{dataType:{namespace:"Edm",types:["String","Boolean","Byte","DateTimeOffset","Date","Time","Decimal","Double","Single","Int16","Int32","Int64","Guid"]},fieldControl:{namespace:"com.sap.vocabularies.Common.v1",annotation:"FieldControl",target:["Property","Record"],defaultValue:3,appliesTo:["fieldItem/#"],group:["Appearance","Behavior"],since:"1.28.1"},fieldVisible:{namespace:"com.sap.vocabularies.Common.v1",annotation:"FieldControlType",target:["Property","Record"],allowList:{values:["Hidden"]},defaultValue:false,appliesTo:["fieldItem/#/visible"],group:["Appearance","Behavior"],since:"1.28.1"},fieldReadOnly:{namespace:"com.sap.vocabularies.Common.v1",annotation:"FieldControlType",target:["Property","Record"],allowList:{values:["ReadOnly"]},defaultValue:false,appliesTo:["fieldItem/#/editable"],group:["Appearance","Behavior"],since:"1.28.1"},fieldMandatory:{namespace:"com.sap.vocabularies.Common.v1",annotation:"FieldControlType",target:["Property","Record"],allowList:{values:["Mandatory"]},defaultValue:false,appliesTo:["fieldItem/#/editable"],group:["Behavior"],since:"1.28.1"},fieldMasked:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Masked",target:["Property"],defaultValue:false,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.28.1"},fieldLabel:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Label",target:["Property","PropertyPath"],defaultValue:null,appliesTo:["fieldItem/#/label"],group:["Behavior"],since:"1.28.1"},fieldText:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Text",target:["Property"],defaultValue:null,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.28.1"},fieldTextArrangement:{namespace:"com.sap.vocabularies.UI.v1",annotation:"TextArrangement",target:["EntityType","Annotation"],defaultValue:null,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.32.1"},fieldCurrencyCode:{namespace:"Org.OData.Measures.V1",annotation:"ISOCurrency",target:["Property"],defaultValue:null,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.28.1"},fieldUnitOfMeasure:{namespace:"Org.OData.Measures.V1",annotation:"Unit",target:["Property"],defaultValue:null,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.28.1"},fieldScale:{namespace:"Org.OData.Measures.V1",annotation:"Scale",target:["Property"],defaultValue:null,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.28.1"},fieldQuickInfo:{namespace:"com.sap.vocabularies.Common.v1",annotation:"QuickInfo",target:["Property"],defaultValue:null,appliesTo:["fieldItem/#/tooltip"],group:["Behavior"],since:"1.28.1"},fieldMultiLineText:{namespace:"com.sap.vocabularies.UI.v1",annotation:"MultiLineText",target:["Property","PropertyPath"],defaultValue:true,appliesTo:["fieldItem/#/control"],group:["Appearance","Behavior"],since:"1.28.1"},fieldUpperCase:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsUpperCase",target:["Property","Parameter"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.28.1"},fieldDigitSequence:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsDigitSequence",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.46"},fieldRecommendationState:{namespace:"com.sap.vocabularies.UI.v1",annotation:"RecommendationState",target:["Property"],defaultValue:0,group:["Appearance"],since:"1.61"},fieldCalendarDate:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsCalendarDate",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.54"},fieldEmailAddress:{namespace:"com.sap.vocabularies.Communication.v1",annotation:"IsEmailAddress",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.46"},fieldPhoneNumber:{namespace:"com.sap.vocabularies.Communication.v1",annotation:"IsPhoneNumber",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.46"},fieldUrl:{namespace:"Org.OData.Core.V1",annotation:"IsURL",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.46"},fieldCreatable:{namespace:"Org.OData.Capabilities.V1",annotation:"InsertRestrictions/Insertable",target:["EntitySet"],defaultValue:false,appliesTo:["fieldItem/#/editable"],group:["Behavior"],since:"1.28.1"},fieldComputed:{namespace:"Org.OData.Core.V1",annotation:"Computed",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/editable"],group:["Behavior"],since:"1.28.1"},fieldUpdatableEntitySet:{namespace:"Org.OData.Capabilities.V1",annotation:"UpdateRestrictions/Updatable",target:["EntitySet"],defaultValue:false,appliesTo:["fieldItem/#editable"],group:["Behavior"],since:"1.28.1"},fieldImmutable:{namespace:"Org.OData.Core.V1",annotation:"Immutable",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/editable"],group:["Behavior"],since:"1.28.1"},fieldSideEffects:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SideEffects",target:["EntitySet","EntityType","ComplexType"],defaultValue:null,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.32.1"},valueList:{namespace:"com.sap.vocabularies.Common.v1",annotation:"ValueList",target:["Property","Parameter"],allowList:{properties:["Label","CollectionPath","Parameters","SearchSupported"]},defaultValue:null,appliesTo:["field/#/fieldHelp"],group:["Behavior"],since:"1.28.1"},valueListRelevantQualifiers:{namespace:"com.sap.vocabularies.Common.v1",annotation:"ValueListRelevantQualifiers",target:["Property","Parameter"],defaultValue:false,appliesTo:["field/#/fieldHelp"],group:["Behavior"],since:"1.96"},valueListWithFixedValues:{namespace:"com.sap.vocabularies.Common.v1",annotation:"ValueListWithFixedValues",target:["Property","Parameter"],defaultValue:null,appliesTo:["field/#/fieldHelp"],group:["Behavior"],since:"1.48.1"},isConfigurationDeprecationCode:{namespace:"com.sap.vocabularies.CodeList.v1",annotation:"IsConfigurationDeprecationCode",target:["Property"],defaultValue:true,appliesTo:["field"],group:["Behavior"],since:"1.77"},presentationVariant:{namespace:"com.sap.vocabularies.UI.v1",annotation:"PresentationVariant",target:["EntityType"],defaultValue:null,appliesTo:["field"],group:["Behavior"],since:"1.98"},fiscalYear:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsFiscalYear",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},fiscalPeriod:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsFiscalPeriod",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},fiscalYearPeriod:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsFiscalYearPeriod",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},fiscalQuarter:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsFiscalQuarter",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},fiscalYearQuarter:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsFiscalYearQuarter",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},fiscalWeek:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsFiscalWeek",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},fiscalYearWeek:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsFiscalYearWeek",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},dayOfFiscalYear:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsDayOfFiscalYear",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Appearance","Behavior"],since:"1.74"},fieldHighImportance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",target:["Annotation","Record"],allowList:{values:["High"]},defaultValue:false,appliesTo:["field"],group:["Appearance","Behavior"],since:"1.87.0"},hidden:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Hidden",target:["Property"],appliesTo:["field"],group:["Appearance","Behavior"],since:"1.90"},fieldMediumImportance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",target:["Annotation","Record"],allowList:{values:["Medium"]},defaultValue:false,appliesTo:["field"],group:["Appearance","Behavior"],since:"1.87.0"},fieldLowImportance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",target:["Annotation","Record"],allowList:{values:["Low"]},defaultValue:false,appliesTo:["field"],group:["Appearance","Behavior"],since:"1.87.0"},timezone:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Timezone",target:["Property"],defaultValue:null,appliesTo:["field"],group:["Behavior"],since:"1.100"},IsTimezone:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsTimezone",target:["Property"],defaultValue:true,appliesTo:["field"],group:["Behavior"],since:"1.113"}},properties:{value:{ignore:true},enabled:{ignore:true},entitySet:{ignore:true},editable:{ignore:true},contextEditable:{ignore:true},width:{ignore:true},textAlign:{ignore:true},textDirection:{ignore:true},placeholder:{ignore:true},name:{ignore:true},valueState:{ignore:true},valueStateText:{ignore:true},showValueStateMessage:{ignore:true},jsontype:{ignore:true},mandatory:{ignore:true},maxLength:{ignore:true},showSuggestion:{ignore:true},showValueHelp:{ignore:false},showLabel:{ignore:true},textLabel:{ignore:true},tooltipLabel:{ignore:true},uomVisible:{ignore:true},uomEditable:{ignore:true},uomEnabled:{ignore:true},url:{ignore:true},uomEditState:{ignore:true},controlContext:{ignore:true},proposedControl:{ignore:true},wrapping:{ignore:true},clientSideMandatoryCheck:{ignore:true},fetchValueListReadOnly:{ignore:true},expandNavigationProperties:{ignore:true},textInEditModeSource:{ignore:false},historyEnabled:{ignore:true},importance:{ignore:true},fixedValueListValidationEnabled:{ignore:true}},aggregations:{_content:{ignore:function(e){var a=e.getContent();if(a){return a.getMetadata().getName()!=="sap.ui.comp.navpopover.SmartLink"}else{return true}}}},customData:{dateFormatSettings:{type:"string",defaultValue:"{'UTC':'true'}",group:["Appearance"],since:"1.28.1"},displayBehaviour:{type:"sap.ui.comp.smartfield.DisplayBehaviour",defaultValue:"auto",since:"1.28.1"},suppressUnit:{type:"boolean",defaultValue:false,group:["Appearance"],since:"1.28.1"},suppressCommonText:{type:"boolean",defaultValue:false,group:["Appearance"]},multiLineSettings:{type:"object",defaultValue:"{cols: 20, rows: 2}",group:["Appearance"],since:"1.28.1"},ignoreInsertRestrictions:{type:"boolean",defaultValue:false,since:"1.102.0"},preserveDecimals:{type:"boolean",defaultValue:true,since:"1.102.0"}},tool:{start:function(e){e.readODataLabel().catch(function(){})},stop:function(){}}}});