/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["./labelCalculation","../../sina/SinaObject","../../sina/MatchingStrategy","../../sina/AttributeType","../../sina/AttributeFormatType","../../core/errors","../../sina/System"],function(t,e,a,r,n,i,o){function s(t){return f(t)||l(t)||c(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(!t)return;if(typeof t==="string")return p(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);if(a==="Object"&&t.constructor)a=t.constructor.name;if(a==="Map"||a==="Set")return Array.from(t);if(a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(t,e)}function l(t){if(typeof Symbol!=="undefined"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function f(t){if(Array.isArray(t))return p(t)}function p(t,e){if(e==null||e>t.length)e=t.length;for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}function y(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function d(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}function v(t,e,a){if(e)d(t.prototype,e);if(a)d(t,a);Object.defineProperty(t,"prototype",{writable:false});return t}function h(t,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function")}t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:true,configurable:true}});Object.defineProperty(t,"prototype",{writable:false});if(e)m(t,e)}function m(t,e){m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function t(e,a){e.__proto__=a;return e};return m(t,e)}function b(t){var e=g();return function a(){var r=_(t),n;if(e){var i=_(this).constructor;n=Reflect.construct(r,arguments,i)}else{n=r.apply(this,arguments)}return S(this,n)}}function S(t,e){if(e&&(typeof e==="object"||typeof e==="function")){return e}else if(e!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return A(t)}function A(t){if(t===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t}function g(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(t){return false}}function _(t){_=Object.setPrototypeOf?Object.getPrototypeOf.bind():function t(e){return e.__proto__||Object.getPrototypeOf(e)};return _(t)}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var E=t["createLabelCalculator"];var T=e["SinaObject"];var I=a["MatchingStrategy"];var D=r["AttributeType"];var O=n["AttributeFormatType"];var M=i["UnknownDataTypeError"];var U=i["UnknownPresentationUsageError"];var N=o["System"];var w=function(t){h(a,t);var e=b(a);function a(t){var r;y(this,a);r=e.call(this);r._provider=t;r._sina=t.sina;r._labelCalculator=E();r._appSearchDataSource=undefined;return r}v(a,[{key:"getAppSearchDataSource",value:function t(){return this._appSearchDataSource}},{key:"parseDataSourceData",value:function t(e,a){for(var r=0;r<e.length;++r){var n=e[r];var i=n.Name;if(!i){i=n.Id}var o=n.NamePlural;if(!o){o=i}var s=this._sina._createDataSource({id:n.Id,label:i,labelPlural:o,type:this._sina.DataSourceType.BusinessObject,usage:n.Id.endsWith("TRANSACTIONS~")?{appSearch:{}}:{},attributesMetadata:[{id:"dummy"}]});s.system=new N({id:n.SourceSystem+"."+n.SourceClient,label:n.SourceSystem+" "+n.SourceClient});s._private.semanticObjectType=n.SemanticObjectTypeId;s._private.annotations=n.Annotations&&n.Annotations.results||[];this._labelCalculator.calculateLabel(s);this._fillMetadataBufferForDataSource(s,n.Attributes.results);a.registerObjectType({type:s.id,label:s.label,properties:s.attributesMetadata});if(s.id.endsWith("TRANSACTIONS~")&&this._appSearchDataSource===undefined){this._appSearchDataSource=s}}}},{key:"_fillMetadataBufferForDataSource",value:function t(e,a){if(e.attributesMetadata[0].id!=="dummy"){return}e.attributesMetadata=[];e.attributeMetadataMap={};var r;var n=[];var i=[];var o=[];var s=[];var u;var c={dataSourceAnnotations:{},attributeAnnotations:{}};c.dataSourceAnnotations=this._parseAnnotationsIntoJsonStructure(e._private.annotations);for(r=0;r<a.length;r++){u=a[r];var l=this._fillMetadataBufferForAttribute(e,u);var f=u.Annotations&&u.Annotations.results||[];var p=this._parseAnnotationsIntoJsonStructure(f);c.attributeAnnotations[l.id.toUpperCase()]=p;this._parseSemanticsAnnotation(u,p);if(l._private.temporaryUsage.Title!==undefined){n.push(l)}if(l._private.temporaryUsage.Detail!==undefined){if(u.isSummary){i.push(l)}else{o.push(l)}}}var y=this._sina._createCDSAnnotationsParser({dataSource:e,cdsAnnotations:c});var d=y.parseCDSAnnotationsForDataSource();if(!d.dataSourceIsCdsBased){this._sortAttributesOfNonCDSBasedDataSource(e,n,s,i,o)}for(r=0;r<e.attributesMetadata.length;r++){u=e.attributesMetadata[r];if(u._private.temporaryUsage){for(var v in u._private.temporaryUsage){if(v!="Title"&&v!="Detail"){u.usage[v]=u._private.temporaryUsage[v]}}}}}},{key:"_fillMetadataBufferForAttribute",value:function t(e,a){var r=a.Displayed&&a.DisplayOrder?a.DisplayOrder:-1;var n=this._parseAttributeTypeAndFormat(a);var i=this._sina._createAttributeMetadata({id:a.Id,label:a.Name!==""?a.Name:a.Id,isKey:a.Key,isSortable:a.Sortable,usage:{},type:n.type,format:n.format,matchingStrategy:this._parseMatchingStrategy(a)});i._private.semanticObjectType=a.SemanticObjectTypeId;i._private.temporaryUsage=a.UIAreas?this._parseUsage(a,r):{};e.attributesMetadata.push(i);e.attributeMetadataMap[i.id]=i;return i}},{key:"_parseSemanticsAnnotation",value:function t(e,a){var r=false;var n="SEMANTICS";for(var i in a){if(i.substr(0,n.length)==n){r=true;break}}if(e.Semantics&&!r){var o;switch(e.Semantics){case"EMAIL.ADDRESS":case"TELEPHONE.TYPE":case"CURRENCYCODE":case"UNITOFMEASURE":o="TRUE";break;case"QUANTITY.UNITOFMEASURE":case"AMOUNT.CURRENCYCODE":o=e.UnitAttribute;break}if(o){a[n+e.Semantics]=o}}}},{key:"_sortAttributesOfNonCDSBasedDataSource",value:function t(e,a,r,n,i){var o,u;a.sort(this._createSortFunction("Title"));for(o=0;o<a.length;++o){var c=a[o].id;u=e.getAttributeMetadata(c);u.usage.Title=u._private.temporaryUsage.Title;u.usage.Title.displayOrder=o}var l=this._createSortFunction("Detail");n.sort(l);i.sort(l);r.push.apply(r,s(n));r.push.apply(r,s(i));for(o=0;o<r.length;++o){r[o].usage.Detail=r[o]._private.temporaryUsage.Detail;r[o].usage.Detail.displayOrder=o}}},{key:"_arrayIncludesEntry",value:function t(e,a,r){var n;if(r){for(n=0;n<e.length;n++){if(r(e[n],a)){return true}}}else{for(n=0;n<e.length;n++){if(e[n]==a){return true}}}return false}},{key:"_parseAnnotationsIntoJsonStructure",value:function t(e){if(e.length==0){return{}}var a,r;var n={};var i,o;var s,u;var c;var l=[];var f;var p=function t(e,a){return e.annotationPointer==a.annotationPointer&&e.annotationName==a.annotationName};try{for(r=0;r<e.length;r++){i=/\[\d+\]$/g;u=n;c=e[r].Name.split(".");for(a=0;a<c.length;a++){s=c[a].toUpperCase();o=i.exec(s);if(o!==null){s=s.substring(0,o.index)}u[s]=u[s]||{};if(o!==null&&o[0].length>0){f={annotationPointer:u,annotationName:s};if(!this._arrayIncludesEntry(l,f,p)){l.push(f)}if(a<c.length-1){u[s][o[0]]=u[s][o[0]]||{};u=u[s][o[0]]}else{u[s][o[0]]=e[r].Value}}else if(a<c.length-1){u=u[s]}else{u[s]=e[r].Value}}}var y;var d;var v,h,m;var b=/\[\d+\]/g;for(r=0;r<l.length;r++){y=l[r].annotationPointer;s=l[r].annotationName;d=y[s];v=[];m={};for(h in d){if(h.match(b)){v.push(d[h])}else{m[h]=d[h]}}if(Object.keys(m).length>0){v.push(m)}y[s]=v}}catch(t){return{}}return n}},{key:"_createSortFunction",value:function t(e){return function(t,a){if(t._private.temporaryUsage[e].displayOrder<a._private.temporaryUsage[e].displayOrder){return-1}else if(t._private.temporaryUsage[e].displayOrder>a._private.temporaryUsage[e].displayOrder){return 1}return 0}}},{key:"_parseMatchingStrategy",value:function t(e){if(e.TextIndexed){return I.Text}return I.Exact}},{key:"_parseAttributeTypeAndFormat",value:function t(e){for(var a=0;a<e.UIAreas.results.length;a++){var r=e.UIAreas.results[a];var n=r.Id;switch(n){case"SUMMARY":continue;case"DETAILS":continue;case"TITLE":continue;case"#HIDDEN":case"HIDDEN":continue;case"FACTSHEET":continue;case"DETAILIMAGE":case"PREVIEWIMAGE":return{type:D.ImageUrl};case"LONGTEXT":return{type:D.String,format:O.LongText};default:throw new U("Unknown presentation usage "+r)}}switch(e.EDMType){case"Edm.String":case"Edm.Binary":case"Edm.Boolean":case"Edm.Byte":case"Edm.Guid":return{type:D.String};case"Edm.Double":case"Edm.Decimal":case"Edm.Float":return{type:D.Double};case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":return{type:D.Integer};case"Edm.Time":return{type:D.Time};case"Edm.DateTime":if(e.TypeLength>8){return{type:D.Timestamp}}return{type:D.Date};case"GeoJson":return{type:D.GeoJson};default:throw new M("Unknown data type "+e.EDMType)}}},{key:"_parseUsage",value:function t(e,a){var r=e.UIAreas.results;var n=e.AdvancedSearchRelevant;var i=e.Facet;var o={};r.forEach(function(t){var r=t.Id;if(r==="TITLE"){o.Title={displayOrder:a}}if(r==="SUMMARY"||r==="DETAILIMAGE"||r==="PREVIEWIMAGE"){e.isSummary=true;o.Detail={displayOrder:a}}if(r==="DETAILS"||r==="LONGTEXT"){o.Detail={displayOrder:a}}});if(n){o.AdvancedSearch={}}if(i){o.Facet={}}return o}},{key:"parseDynamicMetadata",value:function t(e){var a;try{a=e.ResultList.SearchResults.results}catch(t){return}for(var r=0;r<a.length;++r){var n=a[r];if(!n.HitAttributes||!n.HitAttributes.results){continue}var i=this._sina.getDataSource(n.DataSourceId);var o=n.HitAttributes.results;for(var s=0;s<o.length;++s){var u=o[s];this.parseDynamicAtributeMetadata(i,u)}}}},{key:"parseDynamicAtributeMetadata",value:function t(e,a){var r;var n=e.getAttributeMetadata(a.Id);if(n){if(!n._private.dynamic){return}a.UIAreas=a.UIAreas||{results:[]};r=this._parseAttributeTypeAndFormat(a);n.label=a.Name;n.type=r.type;n.format=r.format}else{a.UIAreas=a.UIAreas||{results:[]};r=this._parseAttributeTypeAndFormat(a);n=this._sina._createAttributeMetadata({id:a.Id,label:a.Name,isKey:false,isSortable:false,usage:{},type:r.type,format:r.format,matchingStrategy:I.Exact,_private:{dynamic:true}});e.attributesMetadata.push(n);e.attributeMetadataMap[n.id]=n}}}]);return a}(T);var C={__esModule:true};C.MetadataParser=w;return C})})();