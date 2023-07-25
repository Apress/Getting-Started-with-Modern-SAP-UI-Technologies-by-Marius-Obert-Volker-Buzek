/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/comp/library","sap/m/library","sap/ui/comp/providers/ChartProvider","sap/ui/core/format/NumberFormat","sap/ui/core/format/DateFormat","sap/ui/model/BindingMode","sap/ui/model/type/Date","sap/base/Log","sap/ui/core/Control","./SmartMicroChartRenderer"],function(t,e,i,a,r,o,n,s,l,h,p){"use strict";var u=i.ValueColor;var c=i.Size;var y=h.extend("sap.ui.comp.smartmicrochart.SmartMicroChartBase",{metadata:{abstract:true,library:"sap.ui.comp",properties:{entitySet:{type:"string",group:"Misc",defaultValue:null},chartType:{type:"string",group:"Misc"},chartBindingPath:{type:"string",group:"Misc",defaultValue:null},showLabel:{type:"boolean",group:"Appearance",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Misc"},height:{type:"sap.ui.core.CSSSize",group:"Misc"},size:{type:"sap.m.Size",group:"Misc",defaultValue:"Auto"},isResponsive:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"_chart",aggregations:{_chart:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{chartTitle:{type:"sap.m.Label",group:"Misc",multiple:false},chartDescription:{type:"sap.m.Label",group:"Misc",multiple:false},unitOfMeasure:{type:"sap.m.Label",group:"Misc",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{initialize:{}}},renderer:p});y._MINIMIZE="com.sap.vocabularies.UI.v1.ImprovementDirectionType/Minimize";y._MAXIMIZE="com.sap.vocabularies.UI.v1.ImprovementDirectionType/Maximize";y._TARGET="com.sap.vocabularies.UI.v1.ImprovementDirectionType/Target";y._DELTABULLET="com.sap.vocabularies.UI.v1.VisualizationType/DeltaBulletChart";y._BULLET="com.sap.vocabularies.UI.v1.VisualizationType/BulletChart";y._CALENDAR_TERMS_PATTERNS={"com.sap.vocabularies.Common.v1.IsCalendarYear":"yyyy","com.sap.vocabularies.Common.v1.IsCalendarQuarter":"Q","com.sap.vocabularies.Common.v1.IsCalendarMonth":"MM","com.sap.vocabularies.Common.v1.IsCalendarWeek":"ww","com.sap.vocabularies.Common.v1.IsCalendarDate":"yyyyMMdd","com.sap.vocabularies.Common.v1.IsCalendarYearMonth":"yyyyMM"};y._ASSOCIATIONS=["chartTitle","chartDescription","unitOfMeasure","freeText"];y._ASSOCIATIONS_ANNOTATIONS_MAP={chartDescription:"Description",chartTitle:"Title",unitOfMeasure:{propertyAnnotationPath:"Value",propertyAnnotationProperties:["ISOCurrency","Unit"]},freeText:{propertyAnnotationPath:"Value",propertyAnnotationProperties:["Label"]}};y._isBulletVizualizationType=function(t){return t===y._BULLET||t===y._DELTABULLET};y.prototype._initializeMetadata=function(){if(!this._bIsInitialized){var t=this.getModel();if(t&&(t.getMetadata().getName()==="sap.ui.model.odata.v2.ODataModel"||t.getMetadata().getName()==="sap.ui.model.odata.ODataModel")){if(!this._bMetaModelLoadAttached){t.getMetaModel().loaded().then(this._onMetadataInitialized.bind(this));this._bMetaModelLoadAttached=true}}else if(t){this._onMetadataInitialized.call(this)}}};y.prototype._onMetadataInitialized=function(){this._bMetaModelLoadAttached=false;if(this._bIsInitialized){return}this._createChartProvider.call(this);this._oChartViewMetadata=this._oChartProvider.getChartViewMetadata();this._oDataPointMetadata=this._oChartProvider.getChartDataPointMetadata();this._bIsInitialized=true;this.fireInitialize();if(this.getEnableAutoBinding&&this.getEnableAutoBinding()){if(this.getChartBindingPath()){this.bindElement(this.getChartBindingPath())}else{l.error("The property chartBindingPath needs to be set in order for property enableAutoBinding to be applied.")}}if(this._checkChartMetadata.call(this)){this._aDataPointAnnotations=this._getDataPointAnnotations.call(this);this._oDataPointAnnotations=this._aDataPointAnnotations[0];if(this._aDataPointAnnotations.every(this._checkDataPointAnnotation.bind(this))){this._createAndBindInnerChart()}}else{l.error("Created annotations not valid. Please review the annotations and metadata.")}};y.prototype._getDataPointAnnotations=function(){var t=[],e;if(this._oChartViewMetadata&&this._oChartViewMetadata.measureFields){for(var i=0;i<this._oChartViewMetadata.measureFields.length;i++){e=this._getDataPointAnnotation.call(this,this._oChartViewMetadata.measureFields[i]);t.push(e)}}else{e=this._getDataPointAnnotation.call(this);t.push(e)}return t};y.prototype._cleanup=function(){if(this._oDateType){this._oDateType.destroy();this._oDateType=null}};y.prototype._createChartProvider=function(){var t,e;e=this.getEntitySet();t=this.getModel();if(t&&e){this._oChartProvider=new a({entitySet:e,model:t,chartQualifier:this.data("chartQualifier")})}else{l.error("Property entitySet is not set or no model has been attached to the control.")}};y.prototype._checkChartMetadata=function(){if(t.isEmptyObject(this._oChartViewMetadata)){if(t.isEmptyObject(this._oDataPointMetadata)){l.error("DataPoint annotation must be provided if chart annotation is missing.");return false}return true}else{if(!this._oChartViewMetadata.fields||this._oChartViewMetadata.fields.length===0){l.error("No fields exist in the metadata.");return false}if(this._hasMember(this,"_oChartViewMetadata.annotation.ChartType")){return this._checkChartType.call(this)}else if(this.getChartType()==="Comparison"||this.getChartType()==="Delta"){return true}else{l.error("The Chart annotation is invalid.");return false}}};y.prototype._checkChartType=function(){var t=this._getSupportedChartTypes();for(var e=0;e<t.length;e++){if(this._oChartViewMetadata.annotation.ChartType.EnumMember==="com.sap.vocabularies.UI.v1.ChartType/"+t[e]){return true}}l.error('The ChartType property in the Chart annotation is not part of the list of valid types: "'+t.toString()+'".');return false};y.prototype._getDataPointQualifier=function(t){var e;if(!this._oChartViewMetadata&&this._oDataPointMetadata){return this.data("chartQualifier")}if(!this._hasMember(this,"_oChartViewMetadata.annotation.MeasureAttributes.length")||!this._oChartViewMetadata.annotation.MeasureAttributes.length){return""}if(t&&this._oChartViewMetadata.measureAttributes&&this._oChartViewMetadata.measureAttributes[t]){return(this._oChartViewMetadata.measureAttributes[t].dataPoint.match(/\#([^\#]*)$/)||[])[1]||""}e=this._oChartViewMetadata.annotation.MeasureAttributes[0];if(this._hasMember(e,"DataPoint.AnnotationPath")){return(e.DataPoint.AnnotationPath.match(/\#([^\#]*)$/)||[])[1]||""}};y.prototype._getDataPointAnnotation=function(t){var e=this._getDataPointQualifier.call(this,t),i;if(e){i=this._oDataPointMetadata.additionalAnnotations[e]}else{i=this._oDataPointMetadata.primaryAnnotation}return i};y.prototype._checkDataPointAnnotation=function(e){var i=null;if(t.isEmptyObject(e)){l.error("The DataPoint annotation is empty. Please check it!");return false}if(this._hasMember(e,"Visualization.EnumMember")){i=e.Visualization.EnumMember;if(!y._isBulletVizualizationType(i)){l.error("The only support visualization types for micro charts are BulletChart and DeltaBulletChart.");return false}}if(t.isEmptyObject(this._oChartViewMetadata)&&i===null){l.error("If only DataPoint annotation is provided the VisualizationType is expected to be set.");return false}if(this._hasMember(e,"Value.Path")){if(t.isEmptyObject(e.Criticality)){this._checkCriticalityMetadata(e.CriticalityCalculation)}return true}else{l.error("The Value property does not exist in the DataPoint annotation. This property is essential for creating the smart chart.");return false}};y.prototype._checkCriticalityMetadata=function(e){if(t.isEmptyObject(e)){l.warning("The CriticalityCalculation property in DataPoint annotation is not provided.");return false}if(this._hasMember(e,"ImprovementDirection.EnumMember")){var i=e.ImprovementDirection.EnumMember;switch(i){case y._MINIMIZE:return this._checkCriticalityMetadataForMinimize(e);case y._MAXIMIZE:return this._checkCriticalityMetadataForMaximize(e);case y._TARGET:return this._checkCriticalityMetadataForTarget(e);default:l.warning("The improvement direction in DataPoint annotation must be either Minimize, Maximize or Target.")}}else{l.warning("The ImprovementDirection property in DataPoint annotation is not provided.")}return false};y.prototype._checkCriticalityMetadataForMinimize=function(t){if(!this._hasMember(t,"ToleranceRangeHighValue.Path")){l.warning("The ToleranceRangeHighValue property in DataPoint annotation is missing for Minimize improvement direction.");return false}if(!this._hasMember(t,"DeviationRangeHighValue.Path")){l.warning("The DeviationRangeHighValue property in DataPoint annotation is missing for Minimize improvement direction.");return false}return true};y.prototype._checkCriticalityMetadataForMaximize=function(t){if(!this._hasMember(t,"ToleranceRangeLowValue.Path")){l.warning("The ToleranceRangeLowValue property in DataPoint annotation is missing for Minimize improvement direction.");return false}if(!this._hasMember(t,"DeviationRangeLowValue.Path")){l.warning("The DeviationRangeLowValue property in DataPoint annotation is missing for Minimize improvement direction.");return false}return true};y.prototype._checkCriticalityMetadataForTarget=function(t){if(!this._hasMember(t,"ToleranceRangeLowValue.Path")){l.warning("The DeviationRangeLowValue property in DataPoint annotation is missing for Target improvement direction.");return false}if(!this._hasMember(t,"ToleranceRangeHighValue.Path")){l.warning("The ToleranceRangeHighValue property in DataPoint annotation is missing for Target improvement direction.");return false}if(!this._hasMember(t,"DeviationRangeLowValue.Path")){l.warning("The ToleranceRangeLowValue property in DataPoint annotation is missing for Target improvement direction.");return false}if(!this._hasMember(t,"DeviationRangeHighValue.Path")){l.warning("The DeviationRangeHighValue property in DataPoint annotation is missing for Target improvement direction.");return false}return true};y.prototype._mapCriticalityTypeWithColor=function(t){var e;if(!t){return u.Neutral}else{e=t.toString()}e=(e.match(/(?:CriticalityType\/)?([^\/]*)$/)||[])[1]||"";switch(e){case"Negative":case"1":return u.Error;case"Critical":case"2":return u.Critical;case"Positive":case"3":return u.Good;default:return u.Neutral}};y.prototype._getThresholdValues=function(t){var e={},i=this.getBindingContext();for(var a in t){if(t.hasOwnProperty(a)&&a!=="ImprovementDirection"){e[a]=t[a].Path&&i&&i.getProperty(t[a].Path)||t[a].Decimal||0}}return e};y.prototype._getValueColorForMinimize=function(t,e,i){if(t<=e){return this._mapCriticalityTypeWithColor("Positive")}else if(t>e&&t<=i){return this._mapCriticalityTypeWithColor("Critical")}else if(t>i){return this._mapCriticalityTypeWithColor("Negative")}};y.prototype._getValueColorForMaximize=function(t,e,i){if(t>=e){return this._mapCriticalityTypeWithColor("Positive")}else if(t<e&&t>=i){return this._mapCriticalityTypeWithColor("Critical")}else if(t<i){return this._mapCriticalityTypeWithColor("Negative")}};y.prototype._getValueColorForTarget=function(t,e,i,a,r){if(t>=e&&t<=a){return this._mapCriticalityTypeWithColor("Positive")}else if(t>=i&&t<e||t>a&&t<=r){return this._mapCriticalityTypeWithColor("Critical")}else if(t<i||t>r){return this._mapCriticalityTypeWithColor("Negative")}};y.prototype._getValueColor=function(t,e){var i=this._oDataPointAnnotations.CriticalityCalculation,a,r;t=parseFloat(t)||0;if(typeof e==="string"){r=this._mapCriticalityTypeWithColor(e)}else if(i&&typeof t!=="undefined"&&t!==null){a=this._getThresholdValues.call(this,i);r=this._criticalityCalculation(t,i.ImprovementDirection.EnumMember,a)}return r||this._mapCriticalityTypeWithColor()};y.prototype._getTopLabelColor=function(t,e,i){var a=this._aDataPointAnnotations[i].CriticalityCalculation,r=parseFloat(t)||0,o={},n;for(var s in a){if(a.hasOwnProperty(s)&&s!=="ImprovementDirection"){o[s]=e[a[s].Path]}}if(a&&typeof r!=="undefined"&&r!==null){n=this._criticalityCalculation(r,a.ImprovementDirection.EnumMember,o)}return n};y.prototype._criticalityCalculation=function(t,e,i){var a;switch(e){case y._MINIMIZE:a=this._getValueColorForMinimize(t,i.ToleranceRangeHighValue,i.DeviationRangeHighValue);break;case y._MAXIMIZE:a=this._getValueColorForMaximize(t,i.ToleranceRangeLowValue,i.DeviationRangeLowValue);break;case y._TARGET:a=this._getValueColorForTarget(t,i.ToleranceRangeLowValue,i.DeviationRangeLowValue,i.ToleranceRangeHighValue,i.DeviationRangeHighValue);break;default:l.warning("The improvement direction in DataPoint annotation must be either Minimize, Maximize or Target.")}return a};y.prototype._getAnnotation=function(e){var i=y._ASSOCIATIONS_ANNOTATIONS_MAP[e];if(!i){l.warning('No annotation connected to association "'+e+'".');return{}}if(!t.isEmptyObject(this._oChartViewMetadata)&&typeof i==="string"){return this._oChartViewMetadata.annotation[i]}if(!t.isEmptyObject(this._oDataPointAnnotations)&&this._hasMember(i,"propertyAnnotationPath")&&this._hasMember(i,"propertyAnnotationProperties")){var a;if(this._hasMember(this._oDataPointAnnotations,i.propertyAnnotationPath+".Path")){a=this._getPropertyAnnotation.call(this,this._oDataPointAnnotations[i.propertyAnnotationPath].Path)}if(a){return this._getValueFromPropertyAnnotation(a,i.propertyAnnotationProperties)}}return{}};y.prototype._getValueFromPropertyAnnotation=function(t,e){for(var i in t){for(var a=0;a<e.length;a++){if(i.indexOf(e[a])>-1){return t[i]}}}return{}};y.prototype._updateAssociation=function(t,e){var i,a;if(this.getMetadata().hasAssociation(t)){i=sap.ui.getCore().byId(this.getAssociation(t));if(i&&i.getMetadata().hasProperty("text")){a=this._getAnnotation.call(this,t);this._setAssociationText(i,a,e)}}};y.prototype._updateAssociations=function(t){var e=t&&t.getContexts(0,1)[0],i=e&&e.getObject();var a=y._ASSOCIATIONS.length;for(var r=0;r<a;r++){this._updateAssociation.call(this,y._ASSOCIATIONS[r],i)}};y.prototype.updateChartLabels=function(t){var e={value:Infinity},i={value:-Infinity},a={value:Infinity},r={value:-Infinity},o,n,s,l,h;h=t.getContexts();h.forEach(function(t){for(var h=0;h<this._oChartViewMetadata.dimensionFields.length;h++){s=this._oChartViewMetadata.dimensionFields[h];o=t.getProperty(s);l=this._oChartViewMetadata.measureFields[h];n=t.getProperty(l);e=o<e.value?{context:t,value:o,index:h}:e;i=o>i.value?{context:t,value:o,index:h}:i;a=n<a.value?{context:t,value:n,index:h}:a;r=n>r.value?{context:t,value:n,index:h}:r}},this);if(a.context&&e.context&&r.context&&i.context){this._updateTopLabel.call(this,this._getLabelsMap()["leftTop"],a.context.getObject(),a.index);this._updateBottomLabel.call(this,this._getLabelsMap()["leftBottom"],e.context.getObject(),e.index);this._updateTopLabel.call(this,this._getLabelsMap()["rightTop"],r.context.getObject(),r.index);this._updateBottomLabel.call(this,this._getLabelsMap()["rightBottom"],i.context.getObject(),i.index)}};y.prototype._updateTopLabel=function(t,e,i){var a=e[this._aDataPointAnnotations[i].Value.Path],r=this._getTopLabelColor.call(this,a,e,i),o=this._getLabelNumberFormatter.call(this,this._aDataPointAnnotations[i].Value.Path),n;n=o.format(a);this._updateLabel(t,{text:n,color:r})};y.prototype._updateBottomLabel=function(t,e,i){var a,r,o,n;a=this._oChartViewMetadata.dimensionFields[i];if(a){o=e[a];r=this._getPropertyAnnotation.call(this,this._oChartViewMetadata.dimensionFields[i]);if(r.hasOwnProperty("sap:text")||r.hasOwnProperty("com.sap.vocabularies.Common.v1.Text")){var s=r["sap:text"]||r["com.sap.vocabularies.Common.v1.Text"].Path;n=e[s]}else{n=this._formatBottomLabel.call(this,o,r)}if(n){this._updateLabel(t,{text:n})}}};y.prototype._formatBottomLabel=function(t,e){var i=this._getSemanticsPattern.call(this,e);if(i){return this._formatSemanticsValue.call(this,t,i)}i=this._getCalendarPattern.call(this,e);if(i){return this._formatSemanticsValue.call(this,t,i)}return this._formatDateAndNumberValue.call(this,t)};y.prototype._formatSemanticsValue=function(t,e){if(e){if(!this._oDateType){this._oDateType=new s({style:"short",source:{pattern:e}})}return this._oDateType.formatValue(t,"string")}return null};y.prototype._formatDateAndNumberValue=function(t){if(t instanceof Date){return this._getLabelDateFormatter.call(this).format(t)}else if(!isNaN(t)){return this._getLabelNumberFormatter.call(this,this._oChartViewMetadata.dimensionFields[0]).format(t)}else{return null}};y.prototype._getSemanticsPattern=function(t){if(t.hasOwnProperty("sap:semantics")){switch(t["sap:semantics"]){case"yearmonthday":return"yyyyMMdd";case"yearmonth":return"yyyyMM";case"year":return"yyyy";default:return null}}return null};y.prototype._getCalendarPattern=function(t){for(var e in y._CALENDAR_TERMS_PATTERNS){if(t.hasOwnProperty(e)){return y._CALENDAR_TERMS_PATTERNS[e]}}return null};y.prototype._getLabelNumberFormatter=function(t){var e=this._getPropertyAnnotation.call(this,t).precision||null;return r.getFloatInstance({style:"short",showScale:true,precision:e})};y.prototype._getLabelDateFormatter=function(){return o.getInstance({style:"short"})};y.prototype._setAssociationText=function(t,e,i){if(!e){return}if(e.Path&&i){t.setProperty("text",i[e.Path],false)}else if(e.Path){t.bindProperty("text",{path:e.Path,mode:n.OneWay});t.invalidate()}else if(e.String){if(e.String.indexOf("{")===0){var a=e.String.split(">");t.bindProperty("text",{path:a[1].substr(0,a[1].length-1),model:a[0].substr(1),mode:n.OneWay});t.invalidate()}else{t.setProperty("text",e.String,false)}}};y.prototype._getPropertyAnnotation=function(t){var e,i,a,r;e=this.getModel().getMetaModel();i=this._oChartProvider._oMetadataAnalyser.getEntityTypeNameFromEntitySetName(this.getEntitySet());a=e.getODataEntityType(i);r=e.getODataProperty(a,t);return r};y.prototype._hasMember=function(t,e){var i=".",a=e.split(i),r=a.shift();return!!t&&(a.length>0?this._hasMember(t[r],a.join(i)):t.hasOwnProperty(r))};y.prototype.getAccessibilityInfo=function(){var t={};var e=this.getAggregation("_chart");if(e&&e.getAccessibilityInfo){t=e.getAccessibilityInfo()}return t};y.prototype._formatDimension=function(t){if(typeof t==="string"){var e=this._getPropertyAnnotation.call(this,this._oChartViewMetadata.dimensionFields[0]),i=this._getSemanticsPattern.call(this,e);if(i){t=o.getInstance({pattern:i}).parse(t)}}if(t instanceof Date){return parseFloat(t.getTime())}else if(!isNaN(t)){return parseFloat(t)}else{this.getAggregation("_chart").enableXIndexing(true);return 0}};y.prototype.exit=function(){this._cleanup.call(this)};y.prototype.setEntitySet=function(t){if(this.getProperty("entitySet")!==t){this.setProperty("entitySet",t,true);this._initializeMetadata.call(this)}return this};y.prototype.addAriaLabelledBy=function(t){this.addAssociation("ariaLabelledBy",t,true);this.getAggregation("_chart").addAriaLabelledBy(t);return this};y.prototype.removeAriaLabelledBy=function(t){this.removeAssociation("ariaLabelledBy",t,true);this.getAggregation("_chart").removeAriaLabelledBy(t);return this};y.prototype.removeAllAriaLabelledBy=function(){this.removeAllAssociation("ariaLabelledBy",true);this.getAggregation("_chart").removeAllAriaLabelledBy();return this};y.prototype.setChartType=function(){return this};y.prototype.propagateProperties=function(){if(h.prototype.propagateProperties){h.prototype.propagateProperties.apply(this,arguments)}this._initializeMetadata.call(this)};y.prototype._getBindingPath=function(){if(this.getChartBindingPath()){return this.getChartBindingPath()}else if(this.getEntitySet()){return"/"+this.getEntitySet()}else{return""}};y.prototype._getSupportedChartTypes=function(){return this._CHART_TYPE};y.prototype.setSize=function(t){if(this.getSize()!==t){if(t===c.Responsive){this.setProperty("isResponsive",true)}else{this.setProperty("isResponsive",false)}this.setProperty("size",t)}return this};y.prototype.setIsResponsive=function(t){var e,i=this.getSize();this.setProperty("isResponsive",t);if(t){e=c.Responsive}else{e=i===c.Responsive?c.Auto:i}this.setProperty("size",e);return this};y.prototype.setAssociation=function(t,e,i){if(h.prototype.setAssociation){h.prototype.setAssociation.apply(this,arguments)}this._updateAssociation.call(this,t);return this};return y});