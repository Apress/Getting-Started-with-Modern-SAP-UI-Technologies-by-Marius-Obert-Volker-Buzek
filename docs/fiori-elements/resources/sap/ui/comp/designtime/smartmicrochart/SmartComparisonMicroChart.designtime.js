/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define([],function(){"use strict";return{annotations:{chart:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",target:["EntityType"],defaultValue:null,since:"1.58.0"},chartDefinitionType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"ChartDefinitionType",target:["EntityType"],includeList:{properties:["Title","Description","Measures","MeasureAttributes","Dimensions"]},defaultValue:null,since:"1.58.0"},dataPoint:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",target:["EntityType"],defaultValue:null,since:"1.58.0"},dataPointType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPointType",target:["EntityType"],includeList:{properties:["Value","Title","Criticality"]},defaultValue:null,since:"1.58.0"},currency:{namespace:"Org.OData.Measures.V1",annotation:"ISOCurrency",target:["Property"],defaultValue:null,since:"1.58.0"},unit:{namespace:"Org.OData.Measures.V1",annotation:"Unit",target:["Property"],defaultValue:null,since:"1.58.0"},text:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Text",target:["Property"],defaultValue:null,since:"1.58.0"}},customData:{chartQualifier:{type:"string",defaultValue:null,group:["Appearance"],since:"1.42.0"}}}});