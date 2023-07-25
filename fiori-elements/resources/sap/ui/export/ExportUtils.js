/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["./library","sap/base/Log","sap/ui/core/Core","sap/ui/core/Fragment","sap/ui/core/library","sap/ui/core/syncStyleClass","sap/ui/export/util/Filter","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel","sap/ui/util/openWindow","sap/ui/VersionInfo","sap/ui/core/format/DateFormat"],function(e,t,r,a,n,i,o,l,u,s,f,p){"use strict";var c=n.ValueState;var d=n.CalendarType;var g=e.FileType;var y=e.EdmType;var m=e.Destination;var v=null;var h=null;var b;var S=r.getLibraryResourceBundle("sap.ui.export",true);var T="sap.ui.export.ExportUtils";var w=/[\\\/\?\*:\[\]]/g;f.load().then(function(e){var t=/^[0-9]+\.[0-9]+/.exec(e.version);v=t?t[0]:null});r.attachLocalizationChanged(function(){h=null});function E(e,t,r,a){var n=Object.keys(r);var i={fileName:"Standard",fileTypeCollection:[],fileType:"XLSX",destinationCollection:[{key:m.LOCAL,text:t.getText("DESTINATION_LOCAL")}],destination:m.LOCAL,paperSize:"DIN_A4",orientation:"LANDSCAPE",splitCells:false,includeFilterSettings:false,addDateTime:false,doEnableAccessibility:false,pdfArchive:false,capabilities:r,fitToPage:false,paperSizeCollection:[{key:"DIN_A4",text:t.getText("PAPER_SIZE_A4")},{key:"US_LETTER",text:t.getText("PAPER_SIZE_US_LETTER")}],orientationCollection:[{key:"LANDSCAPE",text:t.getText("ORIENTATION_LAND")},{key:"PORTRAIT",text:t.getText("ORIENTATION_PORT")}],fontSize:10,signature:false,signatureReason:"",showPageNumber:true};n.forEach(function(e){var r,a;r=e.toUpperCase();a=r+"_FILETYPE";i.fileTypeCollection.push({key:r,text:t.getText(a)})});if(a){i.destinationCollection.push({key:"REMOTE",text:t.getText("DESTINATION_REMOTE")})}var o=Object.assign({},i,e||{});if(!o.fileTypeCollection.some(function(e){return e.key===o.fileType})){o.fileType=o.fileTypeCollection[0].key}return o}function P(e){var t={};["fileName","fileType","paperSize","orientation","splitCells","includeFilterSettings","addDateTime","doEnableAccessibility","fitToPage","fontSize","signature","signatureReason","pdfArchive","destination","showPageNumber"].forEach(function(r){t[r]=e[r]});return t}var A={_INTERCEPTSERVICE:"sap/ushell/cloudServices/interceptor/InterceptService",interceptUrl:function(e){var t=sap.ui.require(A._INTERCEPTSERVICE);if(t){var r=t.getInstance();if(r&&r.interceptUrl){e=r.interceptUrl(e)}}return e},fetchDataSource:function(){var e;if(A._oDataSource){return Promise.resolve(A._oDataSource)}e=r.getConfiguration().getFileShareSupport();if(!e){return Promise.resolve()}return new Promise(function(t){sap.ui.require([e],function(e){e.getDataSource().then(function(e){A._oDataSource=e;t(e)}).catch(function(){t()})})})},normalizeUrl:function(e){return e?new URL(e,document.baseURI).toString():e},getExportSettingsViaDialog:function(e,t,n,o,s){return new Promise(function(f,p){var d;if(typeof n==="object"){s=o;o=n;n=undefined}else if(typeof n==="function"){s=n;n=undefined}else if(typeof o==="function"){s=o;o=null}S.then(function(y){var v=new l;v.setData(E(e,y,t,n));a.load({name:"sap.ui.export.fragments.SettingsDialog",type:"XML",controller:{isPDF:function(e){return e===g.PDF},isSpreadsheet:function(e){return e===g.XLSX||e===g.GSHEET},isDestinationEnabled:function(e){return e===g.XLSX},hasDestinations:function(e){return e.length>1},formatExportButton:function(e){return e===m.LOCAL?y.getText("EXPORT_BUTTON"):y.getText("DIALOG_BUTTON_CLOUD_DESTINATION")},onCancel:function(){d._bSuccess=false;d.close()},onExport:function(){d._bSuccess=true;d.close()},onFileNameChange:function(e){var t=e.getSource();var a=e.getParameter("value");var n=/[\\/:|?"*<>]/;var i=r.byId("exportSettingsDialog-exportButton");var o=n.test(a);if(o){t.setValueState(c.Error);t.setValueStateText(y.getText("FILENAME_ERROR"))}else if(a.length>100){t.setValueState(c.Warning);t.setValueStateText(y.getText("FILENAME_WARNING"))}else{t.setValueState(c.None);t.setValueStateText(null)}i.setEnabled(!o)},onFileTypeChange:function(e){var t=e.getParameter("selectedItem");if(!t){return}switch(t.getKey()){case g.PDF:v.setProperty("/includeFilterSettings",false);v.setProperty("/destination",m.LOCAL);break;case g.GSHEET:v.setProperty("/destination",m.REMOTE);break;default:r.byId("exportSettingsDialog-signatureReason").setVisible(false);r.byId("exportSettingsDialog-signatureReasonLabel").setVisible(false)}},onFontSizeChange:function(e){var t=e.getSource();var a=e.getParameter("value");var n=/[^\d]/g;var i=r.byId("exportSettingsDialog-exportButton");var o=n.test(a);if(o){t.setValueState(c.Error);t.setValueStateText(y.getText("NUMBER_ERROR"))}else{t.setValueState(c.None);t.setValueStateText(null)}i.setEnabled(!o)},onAfterClose:function(){if(d._bSuccess){f(P(v.getData()))}else{p(null)}d.destroy();d=null}}}).then(function(e){d=e;if(t.PDF&&!t.PDF["HeaderFooter"]){v.oData.showPageNumber=false}d.setModel(v);d.setModel(new u({bundle:y}),"i18n");if(o){i("sapUiSizeCompact",o,d)}d.open();if(s){s(d)}})})})},_getReadableFilterValue:function(e){switch(e.op||e.name){case"==":case">":case"<":case"!=":case"<=":case">=":return{operator:e.op||e.name,value:e.right.value};case"between":return{operator:e.op||e.name,value:[e.args[1].value,e.args[2].value]};case"contains":case"endswith":case"startswith":return{operator:e.op||e.name,value:e.args[1].value};default:throw Error("getReadableFilter")}},_parseFilter:function(e){switch(e.type){case"Logical":return A._parseLogical(e);case"Binary":return A._parseBinary(e);case"Unary":return A._parseUnary(e);case"Call":return A._parseCall(e);default:throw Error("Filter type "+e.type+" not supported")}},_parseLogical:function(e){var t,r;if(e.op=="&&"&&e.left.type==="Binary"&&e.right.type==="Binary"&&e.left.op===">="&&e.right.op==="<="&&e.left.left.path===e.right.left.path){return A._parseCall({args:[{path:e.left.left.path,type:"Reference"},{type:"Literal",value:e.left.right.value},{type:"Literal",value:e.right.right.value}],name:"between",type:"Call"})}t=A._parseFilter(e.left).concat(A._parseFilter(e.right));if(e.op==="||"&&t.length){r=t[0].key;if(t.every(function(e){return e.key===r})){t=[{key:r,value:t.reduce(function(e,t){if(Array.isArray(t.value)){return e.concat(t.value)}e.push(t.value);return e},[])}]}}return t},_parseBinary:function(e){if(!e.left||e.left.type!="Reference"||!e.right||e.right.type!="Literal"){return[]}return[{key:e.left.path,value:A._getReadableFilterValue(e)}]},_parseUnary:function(e){var t;if(!e.arg){return[]}t=A._parseFilter(e.arg);if(e.op==="!"&&t[0].value){t[0].value.exclude=true}return t},_parseCall:function(e){if(!e.args||e.args.length<2){return[]}return[{key:e.args[0].path,value:A._getReadableFilterValue(e)}]},parseFilterConfiguration:function(){t.error("Function is deprecated and must not be used anymore");return S.then(function(e){return{name:e.getText("FILTER_HEADER"),items:[]}})},getFilters:function(e){var r,a;r=[];if(!e||!e.isA(["sap.ui.model.ListBinding","sap.ui.model.TreeBinding"])){t.error("A ListBinding or TreeBinding is required for parsing the filter settings");return r}a=e.getFilterInfo();if(a){A._parseFilter(a).forEach(function(e){r.push(new o(e.key,e.value))})}return r},parseTechnicalConfiguration:function(){var e,t,r;e={};r=sap.ushell&&sap.ushell.Container;return A.getResourceBundle().then(function(r){t=r;e.name=t.getText("TECHNICAL_INFORMATION");e.items=[{key:t.getText("CREATED_TIME"),value:p.getDateTimeWithTimezoneInstance().format(new Date)}]}).then(function(){return r&&typeof r.getServiceAsync==="function"?r.getServiceAsync("UserInfo"):undefined}).then(function(r){if(r&&r.getFullName()){e.items.unshift({key:t.getText("USER_NAME"),value:r.getFullName()})}return e})},saveAsFile:function(e,t){var r,a,n;if(!(e instanceof Blob)){return}r=document.createElementNS("http://www.w3.org/1999/xhtml","a");a="download"in r;if(a){n=function(e,t){r.download=t;r.href=URL.createObjectURL(e);r.dispatchEvent(new MouseEvent("click"))}}if(typeof n==="undefined"){n=function(e){var t=new FileReader;t.onloadend=function(){var e,r;r=t.result.replace(/^data:[^;]*;/,"data:attachment/file;");e=s(r,"_blank");if(!e){window.location.href=r}};t.readAsDataURL(e)}}n(e,t)},validateSettings:function(e){A._validateDataSource(e.dataSource);A.validateFileSettings(e);if(typeof e.showProgress!=="boolean"){e.showProgress=true}A._validateWorkbook(e.workbook);if(typeof e.worker!=="boolean"){e.worker=true}A._validateScaleCustomizing(e.customizing,"currency");A._validateScaleCustomizing(e.customizing,"unit")},validateFileSettings:function(e){e.fileType=g[e.fileType]?e.fileType:g.XLSX;e.fileName=A.validateFileName(e.fileName,e.fileType)},validateFileName:function(e,r){var a;e=e||"export";a="."+r.toLowerCase();if(!e.endsWith(a)&&r!==g.GSHEET){e+=a;t.info(T+": fileName was missing the proper file extension - extension has been added")}return e},_validateDataSource:function(e){var r;if(!e||typeof e!=="object"){throw new Error(T+": dataSource has not been specified")}e.type=typeof e.type==="string"&&e.type.toLowerCase()||"odata";if(e.type==="array"&&!Array.isArray(e.data)){t.warning(T+": Defined type does not match the provided data")}if(Array.isArray(e.data)){e.count=e.data.length}if(e.type==="odata"){if(typeof e.dataUrl!=="string"||e.dataUrl.length===0){throw new Error(T+": Unable to export data. No dataUrl provided.")}if(e.dataUrl){e.dataUrl=A.normalizeUrl(e.dataUrl)}if(e.serviceUrl){e.serviceUrl=A.normalizeUrl(e.serviceUrl)}}if(typeof e.count!=="number"||e.count<0||isNaN(e.count)||e.count%1!==0){t.info(T+": Invalid value for dataSource.count - value will be ignored");e.count=null}if(typeof e.useBatch!=="boolean"){e.useBatch=false;t.info(T+': Parameter useBatch not provided. Applying default value "false"')}else if(e.useBatch===true){if(typeof e.serviceUrl!=="string"||e.serviceUrl.length===0){e.useBatch=false;t.warning(T+": serviceUrl is required for OData batch requests")}if(typeof e.headers!=="object"){e.useBatch=false;t.warning(T+": headers are required for OData batch requests.")}}r=e.sizeLimit;if(!r||isNaN(r)||r%1!==0){var a=5e3,n=200;r=e.count?Math.round(e.count/(n*5))*n:n;r=Math.min(a,Math.max(r,n));e.sizeLimit=r;t.info(T+": No valid sizeLimit provided. sizeLimit is set to "+r)}},_validateWorkbook:function(e){if(!(e instanceof Object)||!Array.isArray(e.columns)){throw new Error(T+"column configuration is not provided. Export is not possible")}e.columns=e.columns.filter(function(e,a){var n;if(!(e instanceof Object)){t.error(T+": Column "+a+" skipped due to invalid configuration");return false}if(Array.isArray(e.property)&&e.type!==y.String&&e.type!=null){t.warning(T+": Type "+e.type+" does not support an array of properties");e.property=e.property[0]}if(typeof e.property!=="string"&&!Array.isArray(e.property)){t.error(T+": Column "+a+" skipped due to missing mandatory property");return false}e.label=e.label||(e.property instanceof Array?e.property[0]:e.property);n=e.width;if(typeof n==="string"){var i;i=n.toLowerCase();n=parseFloat(i);if(i.indexOf("em")>0){n=n*2}else if(i.indexOf("px")>0){n=n/8}}if(isNaN(n)||n<1){n=10}e.width=Math.round(n);A._validateType(e,a);A._validateString(e,"textAlign");if(e.textAlign){var o=(e.textAlign+"").toLowerCase();if(["begin","end"].indexOf(o)>-1){var l=["left","right"];o=(r.getConfiguration().getRTL()?l.reverse():l)[["begin","end"].indexOf(o)]}if(o!==""&&["left","right","center"].indexOf(o)==-1){t.warning(T+": Incorrect column alignment value "+o+' on column "'+(e.label||e.property)+'". Default alignment is used.');o=""}e.textAlign=o}["autoScale","delimiter","displayTimezone","displayUnit","utc","wrap"].forEach(function(t){A._validateProperty(e,t,"boolean")});["inputFormat","unit","unitProperty","template","trueValue","falseValue","timezone","timezoneProperty"].forEach(function(t){A._validateString(e,t)});if(e.template&&!Array.isArray(e.property)&&typeof e.inputFormat!=="string"){t.warning(T+': Template is not applicable on a single property without inputFormat - value will be discarded on column "'+(e.label||e.property)+'".');delete e.template}if(typeof e.calendar==="string"&&[d.Gregorian,d.Islamic,d.Japanese].indexOf(e.calendar)<0){t.warning(T+': Unsupported calendar "'+e.calendar+'" on column "'+(e.label||e.property)+'". Value will be discarded.');delete e.calendar}if(e.type===y.Boolean&&(e.trueValue===null||e.falseValue===null)){t.warning(T+': The properties trueValue and falseValue have to be assigned correctly on column "'+(e.label||e.property)+'". Values will be discarded.');delete e.trueValue;delete e.falseValue}if(e.autoScale===true&&(e.type!==y.Number||!e.unit&&!e.unitProperty)){t.warning(T+": autoScale cannot be taken into account due to invalid configuration.");delete e.autoScale}if(e.type===y.DateTime){if(!e.timezone){e.timezone=e.utc===false?r.getConfiguration().getTimezone():"UTC"}if(e.property===e.timezoneProperty||typeof e.timezoneProperty==="string"&&e.timezoneProperty.split(",").length>1){t.warning(T+": Property timezoneProperty is invalid.");delete e.timezoneProperty}}else if(typeof e.utc==="boolean"){t.warning(T+": Property utc is only supported for type DateTime.");delete e.utc}var u=e.scale;if(e.type===y.Number&&isNaN(u)&&u!=="variable"){t.warning(T+": scale parameter for numerical column configuration is missing.")}if(typeof u==="string"){u=parseInt(u)}if(isNaN(u)){u=null}e.scale=u;if(e.valueMap&&typeof e.valueMap!=="object"){t.warning(T+': Invalid value for property "valueMap" on column "'+(e.label||e.property)+'". Value will be discarded.');delete e.valueMap}return true});A._validateWorkbookContext(e.context);A._validateString(e,"hierarchyLevel");A._validateString(e,"drillState")},_validateType:function(e){var r,a;if(typeof e.type!=="string"){e.type=y.String;return}if(!y[e.type]){a=y.String;for(r in y){if(r.toLowerCase()==e.type.toLowerCase()){a=r}}t.warning(T+": Unsupported column type "+e.type+' on column "'+(e.label||e.property)+'". EdmType.'+a+" is applied.");e.type=a}switch(e.type){case y.Date:if(!e.format&&!e.calendar){A._validateString(e,"format",A.getFormatSettings().datePattern);A._validateString(e,"calendar",A.getFormatSettings().calendar)}break;case y.DateTime:if(!e.format&&!e.calendar){A._validateString(e,"format",A.getFormatSettings().dateTimePattern);A._validateString(e,"calendar",A.getFormatSettings().calendar)}break;case y.Time:A._validateString(e,"format",A.getFormatSettings().timePattern);break;case y.Number:break;case y.Currency:if(!e.unitProperty){t.warning(T+': Missing unitProperty for type Currency on column "'+(e.label||e.property)+'". Type is reverted to "String".');e.type=y.String}break;case y.Enumeration:if(!e.valueMap||typeof e.valueMap!=="object"){t.warning(T+': Invalid valueMap for type Enumeration on column "'+(e.label||e.property)+'". Type is reverted to "String".');e.type=y.String}break;default:}},_validateWorkbookContext:function(e){if(!(e instanceof Object)){return}A._validateString(e,"application","SAP UI5");A._validateString(e,"version",v);A._validateString(e,"title");A._validateString(e,"modifiedBy");A._validateString(e,"sheetName","SAPUI5 Spreadsheet Export",31,w);A._validateString(e,"metaSheetName","Metadata",31,w);if(e.metainfo){if(!Array.isArray(e.metainfo)){t.warning(T+': Invalid value for property "metainfo". Value will be discarded.');e.metainfo=null}else{e.metainfo.filter(function(e,r){if(typeof e.name!=="string"||e.name.length===0){t.warning(T+": Invalid name for metainfo group at index "+r+". Entry will be discarded.");return false}return true})}}},_validateString:function(e,r,a,n,i){var o;A._validateProperty(e,r,"string",a);o=e[r];if(typeof o==="string"&&(typeof i==="string"||i instanceof RegExp)){o=o.replace(i,"")}if(typeof o==="string"&&n&&o.length>n){t.warning(T+": The value of "+r+" exceeds the max length of "+n+" and will be truncated.");o=o.slice(0,n)}e[r]=o},_validateProperty:function(e,r,a,n){var i=e[r];if(i!=null&&typeof i!==a){t.warning(T+': Invalid value for property "'+r+". Value will be discarded.");i=null}if(i==null&&typeof n!=="undefined"){i=n}if(i==null){delete e[r]}else{e[r]=i}},_validateScaleCustomizing:function(e,r){var a,n;if(!e){return}n=e[r];if(!(n instanceof Object)||Array.isArray(n)){t.warning(T+": Invalid scale customizing for "+r+".");e[r]={}}else{for(a in n){if(!(n[a]instanceof Object)){t.warning(T+": Key "+a+" has been removed from customizing.");delete n[a]}else if(typeof n[a].scale!=="number"||n[a].scale<0){t.warning(T+": Key "+a+" has been removed from customizing due to invalid scale.");delete n[a]}}}},getExportInstance:function(e,t){var r,a;t=t?t:{};a=typeof e.fileType==="string"?e.fileType.toUpperCase():e.fileType;switch(a){case g.PDF:r="sap/ui/export/PortableDocument";break;default:r="sap/ui/export/Spreadsheet"}return new Promise(function(n){sap.ui.require([r],function(r){n(new r(e,t[a]))})})},getCountFromBinding:function(e){var t;if(typeof e.getCount==="function"){t=e.getCount()}else if(!e.isA("sap.ui.model.TreeBinding")&&typeof e.isLengthFinal==="function"&&e.isLengthFinal()){t=e.getLength()}if(typeof t!=="number"||t<0||isNaN(t)){t=null}return t},getHierarchyLevelProperty:function(e){if(!e||typeof e.isA!=="function"){return undefined}if(e.isA("sap.ui.model.odata.v2.ODataTreeBinding")&&typeof e.getTreeAnnotation==="function"){return e.getTreeAnnotation("hierarchy-level-for")}if(e.isA("sap.ui.model.odata.v4.ODataListBinding")){var t=e.getAggregation(true);return t&&t.$DistanceFromRootProperty}return undefined},getHierarchyDrillStateProperty:function(e){if(!e||typeof e.isA!=="function"){return undefined}if(e.isA("sap.ui.model.odata.v2.ODataTreeBinding")&&typeof e.getTreeAnnotation==="function"){return e.getTreeAnnotation("hierarchy-drill-state-for")}if(e.isA("sap.ui.model.odata.v4.ODataListBinding")){var t=e.getAggregation(true);return t&&t.$DrillStateProperty}return undefined},splitColumns:function(e,t){var r=[];if(typeof t!=="function"){t=function(){}}e.forEach(function(e){var a,n,i,o;if(Array.isArray(e.property)&&e.property.length>1){n=Object.assign({},e);n.property=e.property[0];n.label=t(n.property)||e.label;delete n.template;a=[n];e.property.slice(1).forEach(function(r,n){o=t(r);i={property:r,label:o||e.label+" ("+(n+1)+")"};a.push(i)})}if(e.unitProperty&&e.displayUnit!==false){n=Object.assign({},e);o=t(e.unitProperty);a=[n,{property:e.unitProperty,label:o||e.label+" (1)"}];if(n.type===y.Currency){n.displayUnit=false}if(n.type===y.Number){delete n.unitProperty}}if(e.timezoneProperty&&e.displayTimezone!==false){n=Object.assign({},e);o=t(e.timezoneProperty);a=[n,{property:e.timezoneProperty,label:o||e.label+" (1)"}];n.displayTimezone=false}r.push(a||e)});return r.flat()},getResourceBundle:function(){if(!b){return r.getLibraryResourceBundle("sap.ui.export",true).then(function(e){b=e;return b})}return Promise.resolve(b)},getFormatSettings:function(){if(!h){var e,t;t={};e=r.getConfiguration().getFormatSettings();t.calendar=r.getConfiguration().getCalendarType();t.datePattern=e.getDatePattern("medium");t.timePattern=e.getTimePattern("medium");t.delimiter=!!e.getNumberSymbol("group");if(typeof t.datePattern==="string"){t.datePattern=t.datePattern.toLowerCase()}if(typeof t.timePattern==="string"){t.timePattern=t.timePattern.toLowerCase().replace(/ a+/," AM/PM")}if(t.datePattern&&t.timePattern){t.dateTimePattern=t.datePattern+" "+t.timePattern}h=t}return h}};return A},true);