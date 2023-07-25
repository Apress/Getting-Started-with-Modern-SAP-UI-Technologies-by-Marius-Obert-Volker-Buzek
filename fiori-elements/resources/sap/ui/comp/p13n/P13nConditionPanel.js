/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/m/P13nConditionPanel","sap/m/library","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/InvisibleMessage","sap/ui/core/ResizeHandler","sap/ui/core/Item","sap/ui/core/ListItem","sap/ui/model/odata/type/Boolean","sap/ui/model/type/String","sap/ui/model/odata/type/String","sap/ui/model/type/Date","sap/ui/model/type/Time","sap/ui/model/odata/type/DateTime","sap/ui/model/type/Float","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/m/Button","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/m/ToolbarSpacer","sap/m/Text","sap/m/SearchField","sap/m/CheckBox","sap/m/ComboBox","sap/m/Select","sap/m/Label","sap/m/Input","sap/m/DatePicker","sap/m/TimePicker","sap/m/DateTimePicker","sap/base/Log","sap/ui/comp/odata/type/StringDate","sap/ui/comp/p13n/P13nOperationsHelper","sap/m/P13nConditionPanelRenderer","sap/ui/model/json/JSONModel","sap/ui/model/Sorter"],function(e,t,i,a,n,o,s,r,l,d,p,u,g,c,h,y,f,m,_,S,v,C,I,T,F,b,x,L,O,V,D,k,E,P,M,K,w,N,A,B){"use strict";var G=t.ButtonType,R=t.P13nConditionOperation,H=t.P13nConditionOperationType,U=i.ValueState,z=[R.BT,R.EQ,R.LE,R.LT,R.GE,R.GT,R.NotBT,R.NotEQ,R.NotLE,R.NotLT,R.NotGE,R.NotGT],j=i.InvisibleMessageMode;var X=e.extend("sap.ui.comp.p13n.P13nConditionPanel",{metadata:{library:"sap.ui.comp.p13n",properties:{defaultOperation:{type:"string",group:"Misc",defaultValue:null}}},renderer:N.renderer});X.prototype.init=function(){this._oRbComp=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");e.prototype.init.apply(this);this._oOperationsHelper=new w};X.prototype.onBeforeRendering=function(){if(!this._oInvisibleMessage){this._oInvisibleMessage=r.getInstance()}};X.prototype.setOperations=function(e,t,i){var a=i?H.Exclude:H.Include;t=t||"default";if(this._oTypeOperations[t]===undefined){this._oTypeOperations[t]={}}this._oTypeOperations[t][a]=e;this._updateAllOperations()};X._createKeyFieldTypeInstance=function(e){var t;if(!e.typeInstance){switch(e.type){case"boolean":e.typeInstance=new u;break;case"numc":if(!(e.formatSettings&&e.formatSettings.isDigitSequence)){M.error("sap.m.P13nConditionPanel","NUMC type support requires isDigitSequence==true!");e.formatSettings=Object.assign({},e.formatSettings,{isDigitSequence:true})}t=e.formatSettings;if(e.maxLength){t=Object.assign({},t,{maxLength:e.maxLength})}if(!t.maxLength){M.error("sap.m.P13nConditionPanel","NUMC type suppport requires maxLength!")}e.typeInstance=new c({},t);break;case"date":e.typeInstance=new h(Object.assign({},e.formatSettings,{strictParsing:true}),{});break;case"time":e.typeInstance=new y(Object.assign({},e.formatSettings,{strictParsing:true}),{});break;case"datetime":e.typeInstance=new f(Object.assign({},e.formatSettings,{strictParsing:true}),{displayFormat:"Date"});var i=e.typeInstance;if(!i.oFormat){i.formatValue(new Date,"string")}if(i.oFormat){i.oFormat.oFormatOptions.UTC=false}break;case"stringdate":e.typeInstance=new K(Object.assign({},e.formatSettings,{strictParsing:true}));break;case"numeric":if(e.precision||e.scale){t={};if(e.precision){t["maxIntegerDigits"]=parseInt(e.precision)}if(e.scale){t["maxFractionDigits"]=parseInt(e.scale)}}e.typeInstance=new m(t);break;default:var a=e.formatSettings;if(e.maxLength){a=Object.assign({},a,{maxLength:e.maxLength})}e.typeInstance=new g({},a);break}}};X.prototype.setKeyFields=function(e){this._aKeyFields=e;this._aKeyFields.forEach(function(e){X._createKeyFieldTypeInstance(e)},this);this._updateKeyFieldItems(this._oConditionsGrid,true);this._updateAllConditionsEnableStates();this._createAndUpdateAllKeyFields();this._updateAllOperations();this._updateConditionFields()};X.prototype.setValues=function(e,t){t=t||"default";this._oTypeValues[t]=e};X.prototype.addOperation=function(e,t,i){var a=i?H.Exclude:H.Include;t=t||"default";if(this._oTypeOperations[t]===undefined){this._oTypeOperations[t]={}}if(this._oTypeOperations[t][a]===undefined){this._oTypeOperations[t][a]=[]}this._oTypeOperations[t][a].push(e);this._updateAllOperations()};X.prototype.getOperations=function(e,t){var i,a,n,o;e=e||"default";if(t!==undefined){i=t?H.Exclude:H.Include;o=this._oTypeOperations[e]&&this._oTypeOperations[e][i]||[]}else{a=this._oTypeOperations[e]&&this._oTypeOperations[e][H.Include]||[];n=this._oTypeOperations[e]&&this._oTypeOperations[e][H.Exclude]||[];o=a.concat(n)}return o};X.prototype._updatePaginatorToolbar=function(){if(this._sConditionType!=="Filter"||this.getMaxConditions()!=="-1"){return}var e=this._aConditionKeys.length;var t=1+Math.floor(Math.max(0,e-1)/this._iConditionPageSize);var i=1+Math.floor(this._iFirstConditionIndex/this._iConditionPageSize);var a=this.getParent();if(!this._oPaginatorToolbar){if(e>this._iConditionPageSize){this._createPaginatorToolbar();this.insertAggregation("content",this._oPaginatorToolbar,0);this._onGridResize()}else{if(a&&a.getMetadata().getName()==="sap.m.Panel"){if(this._sOrgHeaderText==undefined){this._sOrgHeaderText=a.getHeaderText()}}return}}this._oPrevButton.setEnabled(this._iFirstConditionIndex>0);this._oNextButton.setEnabled(this._iFirstConditionIndex+this._iConditionPageSize<e);if(a&&a.setHeaderToolbar){if(!a.getHeaderToolbar()){this.removeAggregation("content",this._oPaginatorToolbar);a.setHeaderToolbar(this._oPaginatorToolbar);a.attachExpand(function(e){this._setToolbarElementVisibility(e.getSource().getExpanded()&&this._bPaginatorButtonsVisible)}.bind(this))}}if(a&&a.getMetadata().getName()==="sap.m.Panel"){if(this._sOrgHeaderText==undefined){this._sOrgHeaderText=a.getHeaderText()}var n=this._sOrgHeaderText+(e>0?" ("+e+")":"");this._oHeaderText.setText(n)}else{this._oHeaderText.setText(e+" Conditions")}this._oPageText.setText(i+"/"+t);this._bPaginatorButtonsVisible=this._bPaginatorButtonsVisible||t>1;this._setToolbarElementVisibility(this._bPaginatorButtonsVisible);if(i>t){this._iFirstConditionIndex-=Math.max(0,this._iConditionPageSize);this._clearConditions();this._fillConditions()}var o=0;this._oConditionsGrid.getContent().forEach(function(e){if(e.select.getSelected()){o++}},this);if(t==i&&e-this._iFirstConditionIndex>o){this._clearConditions();this._fillConditions()}};X.prototype._setToolbarElementVisibility=function(e){this._oPrevButton.setVisible(e);this._oNextButton.setVisible(e);this._oPageText.setVisible(e);this._oFilterField.setVisible(false);this._setLayoutVisible(this._oAddButton,e);this._setLayoutVisible(this._oRemoveAllButton,e)};X.prototype._unregisterResizeHandler=function(){if(this._sContainerResizeListener){l.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null}};X.prototype._registerResizeHandler=function(){if(this.getContainerQuery()){this._sContainerResizeListener=l.register(this._oConditionsGrid,this._onGridResize.bind(this));this._onGridResize()}};X.prototype._handleRemoveCondition=function(e,t){var i=e.getContent().indexOf(t);this._removeCondition(e,t);if(this.getAutoReduceKeyFieldItems()){this._updateKeyFieldItems(e,false)}if(i>=0){i=Math.min(i,e.getContent().length-1);var t=e.getContent()[i];setTimeout(function(){t.remove.focus()})}this._updatePaginatorToolbar();this._oInvisibleMessage.announce(this._oRbComp.getText("VALUEHELPDLG_CONDITIONPANEL_CONDITION_REMOVED"),j.Polite)};X.prototype._getCurrentKeyFieldItem=function(e){if(e.getSelectedKey&&e.getSelectedKey()){var t=e.getSelectedKey();var i=this._aKeyFields;for(var a in i){var n=i[a];if(n.key===t){return n}}}return null};X.prototype._createConditionRow=function(e,t,i,a,n){var o,s=this,r=new A;if(a===undefined){a=e.getContent().length}var l=new _({width:"100%",defaultSpan:"L12 M12 S12",hSpacing:1,vSpacing:0,containerQuery:this.getContainerQuery()}).data("_key",i);for(var d in this._aConditionsFields){var p;var u=this._aConditionsFields[d];switch(u["Control"]){case"CheckBox":p=new x({enabled:false,layoutData:new S({span:u["Span"+this._sConditionType]})});this._setLayoutVisible(p,false);if(u["ID"]==="showIfGrouped"){p.setEnabled(true);p.setText(u["Label"]);p.attachSelect(function(){s._changeField(l)});p.setSelected(t?t.showIfGrouped:true)}else{if(t){p.setSelected(true);p.setEnabled(true)}}break;case"ComboBox":if(u["ID"]==="keyField"){p=new L({width:"100%",ariaLabelledBy:this._oInvisibleTextField});var g=p.setSelectedKey.bind(p);p.setSelectedKey=function(e){g(e);var t=s.getValidationExecutor();if(t){t()}};var c=p.setSelectedItem.bind(p);p.setSelectedItem=function(e){c(e);var t=s.getValidationExecutor();if(t){t()}};p.setLayoutData(new S({span:u["Span"+this._sConditionType]}));this._fillKeyFieldListItems(p,this._aKeyFields);if(p.attachSelectionChange){p.attachSelectionChange(function(t){var i=s.getValidationExecutor();if(i){i()}s._handleSelectionChangeOnKeyField(e,l)})}if(p.attachChange){p.attachChange(function(t){l.keyField.close();s._handleChangeOnKeyField(e,l)})}if(p.setSelectedItem){if(t){p.setSelectedKey(t.keyField);this._aKeyFields.forEach(function(e,i){var a=e.key;if(a===undefined){a=e}if(t.keyField===a){p.setSelectedItem(p.getItems()[i])}},this)}else{if(this.getUsePrevConditionSetting()&&!this.getAutoReduceKeyFieldItems()){if(a>0&&!i&&n){o=e.getContent()[a-1];if(o.keyField.getSelectedKey()){p.setSelectedKey(o.keyField.getSelectedKey())}else{if(!p.getSelectedItem()&&p.getItems().length>0){p.setSelectedItem(p.getItems()[0])}}}else{this._aKeyFields.some(function(e,t){if(e.isDefault){p.setSelectedItem(p.getItems()[t]);return true}if(!p.getSelectedItem()&&e.type!=="boolean"){p.setSelectedItem(p.getItems()[t])}},this);if(!p.getSelectedItem()&&p.getItems().length>0){p.setSelectedItem(p.getItems()[0])}}}else{this._aKeyFields.forEach(function(e,t){if(e.isDefault){p.setSelectedItem(p.getItems()[t])}},this)}}}}if(u["ID"]==="operation"){p=new L({width:"100%",ariaLabelledBy:this._oInvisibleTextOperator,layoutData:new S({span:u["Span"+this._sConditionType]})});p.addEventDelegate({onmouseup:function(){if(!this.isOpen()){this.showItems()}}},p);p.setFilterFunction(function(){return true});p.setModel(r);p.attachChange(function(t){s._validateOperationValue(t);s._handleChangeOnOperationField(e,l)});l[u["ID"]]=p;this._updateOperationItems(e,l);var h=this._getCurrentKeyFieldItem(l.keyField),y=this._getRelevantOperations(h);if(t){var f=this.getCurrentOparation(t);y.some(function(e){if(f===e){p.setSelectedKey(e);return true}},this)}else{if(this.getUsePrevConditionSetting()){if(a>0&&i===null){var o=e.getContent()[a-1],m=o.operation.getSelectedKey()||y[0];p.setSelectedKey(m)}else{if(this.getDefaultOperation()){p.setSelectedKey(this.getDefaultOperation())}else{p.setSelectedKey(y[0])}}}}}if(p.getSelectedItem&&p.getSelectedItem()&&p.getMetadata()._sUIDToken!=="box"){p.setTooltip(p.getSelectedItem().getTooltip())}break;case"TextField":var v=this._getCurrentKeyFieldItem(l.keyField);p=this._createValueField(v,u,l);p.oTargetGrid=e;if(p.addAriaDescribedBy){p.addAriaDescribedBy(this._oInvisibleTextOperatorInputValue)}if(t&&t[u["ID"]]!==undefined){var C=t[u["ID"]];if(p instanceof O){if(typeof C==="boolean"){p.setSelectedIndex(C?2:1)}}else if(C!==null&&l.oType){if(typeof C==="string"&&l.oType.getName()==="sap.ui.comp.odata.type.StringDate"){p.setValue(C)}else{var I=l&&l.operation&&z.indexOf(l.operation.getSelectedKey())!==-1;if(typeof C==="string"&&["String","sap.ui.model.odata.type.String","sap.ui.model.odata.type.Decimal"].indexOf(l.oType.getName())==-1){try{C=l.oType.parseValue(C,"string",I);p.setValue(l.oType.formatValue(C,"string",I))}catch(e){M.error("sap.m.P13nConditionPanel","Value '"+C+"' does not have the expected type format for "+l.oType.getName()+".parseValue()")}}else{p.setValue(l.oType.formatValue(C,"string",I));if(p.isA("sap.m.ComboBox")){if(C===""){p.getModel().attachEventOnce("batchRequestCompleted",function(e){e.setSelectedItem(e.getItems()[0])}.bind(null,p))}else{p.setSelectedKey(C)}}}}}else{p.setValue(C)}}break;case"Label":p=new V({text:u["Text"]+":",visible:this.getShowLabel(),layoutData:new S({span:u["Span"+this._sConditionType]})}).addStyleClass("conditionLabel");p.oTargetGrid=e;break}l[u["ID"]]=p;l.addContent(p)}this._addButtons(l,e);e.insertContent(l,a);this._updateOperationItems(e,l);this._changeOperationValueFields(e,l);this._updateAllConditionsEnableStates();this._updateConditionButtons(e);if(this.getAutoReduceKeyFieldItems()){this._updateKeyFieldItems(e,false)}if(this._sLayoutMode){this._updateLayout({name:this._sLayoutMode})}if(t){var T=this._getFormatedConditionText(t.operation,t.value1,t.value2,t.exclude,t.keyField,t.showIfGrouped);t._oGrid=l;t.value=T;this._oConditionsMap[i]=t}var F=l.operation.getSelectedKey();if(F==="BT"&&l.value1.setMinDate&&l.value2.setMaxDate){var b=l.value1.getDateValue();var D=l.value2.getDateValue();this._updateMinMaxDate(l,b,D)}else{this._updateMinMaxDate(l,null,null)}return l};X.prototype._fillOperationListItems=function(e,t,i){var a={items:[]};if(i==="_STRING_"||i==="_TEXT_"){i=""}if(i==="_TIME_"||i==="_DATETIME_"){i="_DATE_"}if(i==="_BOOLEAN_"||i==="_NUMC_"){i=""}e.destroyItems();if(t&&t.length>0){t.forEach(function(e){var t=this._oRb.getText("CONDITIONPANEL_OPTION"+i+e,null,true);if(t===undefined||t.startsWith("CONDITIONPANEL_OPTION")){t=this._oRb.getText("CONDITIONPANEL_OPTION"+e)}a.items.push({key:e,text:t,sorter:this._oOperationsHelper.isExcludeType(e)?this._oRbComp.getText("VALUEHELPDLG_EXCLUDE"):this._oRbComp.getText("VALUEHELPDLG_INCLUDE"),tooltip:t})}.bind(this));e.getModel().setData(a);e.bindAggregation("items",{path:"/items",sorter:new B("sorter",true,true),template:new p({key:"{key}",text:"{text}"})})}};X.prototype._validateOperationValue=function(e){var t=e.getSource(),i=t.getSelectedKey(),a=t.getValue();if(!i&&a){t.setValueState(U.Error);t.setValueStateText(this._oRbComp.getText("VALUEHELPDLG_VALUE_NOT_EXIST",a))}else{t.setValueState(U.None)}};X.prototype._fillKeyFieldListItems=function(e,t){e.destroyItems();for(var i in t){var a=t[i];e.addItem(new p({key:a.key,text:a.text,tooltip:a.tooltip}))}this._setLayoutVisible(e,e.getItems().length>1)};X.prototype._updateOperationItems=function(e,t){var i=this._getCurrentKeyFieldItem(t.keyField);var a=i&&i.type||"";var n=t.operation;var o=n.getSelectedItem();var s=this._getRelevantOperations(i);this._fillOperationListItems(n,s,a?"_"+a.toUpperCase()+"_":"");if(o&&n.getItemByKey(o.getKey())){n.setSelectedKey(o.getKey())}else{n.setSelectedItem(n.getItems()[1])}this._sConditionType="Filter";if(s[0]===R.Ascending||s[0]===R.Descending){this._sConditionType="Sort"}if(s[0]===R.GroupAscending||s[0]===R.GroupDescending){this._sConditionType="Group"}this._adjustValue1Span(t)};X.prototype._updateKeyFieldItems=function(e,t,i,a){var n=e.getContent().length;var o;var s={};if(!t){for(o=0;o<n;o++){var r=e.getContent()[o].keyField;var l=r.getSelectedKey();if(l!=null&&l!==""){s[l]=true}}}for(o=0;o<n;o++){var r=e.getContent()[o].keyField;var d=e.getContent()[o].select;var u=r.getSelectedKey();var g=0;var c=this._aKeyFields;if(r!==a){if(i){g=c.length-1}else{r.destroyItems()}for(g;g<c.length;g++){var h=c[g];if(h.key==null||h.key===""||!s[h.key]||h.key===u){r.addItem(new p({key:h.key,text:h.text,tooltip:h.tooltip}))}}this._setLayoutVisible(r,r.getItems().length>1)}if(u){r.setSelectedKey(u)}else if(r.getItems().length>0){r.setSelectedItem(r.getItems()[0])}if(!d.getSelected()){this._aKeyFields.some(function(e,t){if(e.isDefault){r.setSelectedItem(r.getItems()[t]);return true}if(!r.getSelectedItem()){if(e.type!=="boolean"){r.setSelectedItem(r.getItems()[t])}}},this)}if(r.getSelectedItem()){r.setTooltip(r.getSelectedItem().getTooltip())}}};X.prototype._adjustValue1Span=function(e){if(this._sConditionType==="Filter"&&e.value1&&e.operation){var t=e.operation;var i=this._aConditionsFields[5]["Span"+this._sConditionType];var a=t.getSelectedKey();if(a!==R.BT&&a!==R.NotBT){i=this._aKeyFields.length>1?"L5 M11 S10":"XL8 L8 M8 S10"}var n=e.value1.getLayoutData();if(n.getSpan()!==i){n.setSpan(i)}}};X.prototype._changeField=function(e,t){var i=e.keyField.getSelectedKey();if(e.keyField.getSelectedItem()){e.keyField.setTooltip(e.keyField.getSelectedItem().getTooltip())}else{e.keyField.setTooltip(null)}var a=e.operation.getSelectedKey();var n=this._oOperationsHelper.isExcludeType(a);a=n?this._oOperationsHelper.getCorrespondingIncludeOperation(a):a;if(e.operation.getSelectedItem()){e.operation.setTooltip(e.operation.getSelectedItem().getTooltip())}else{e.operation.setTooltip(null)}var o=function(e,t,i){var a,n,o=e.getParent();if(e.getDateValue&&!e.isA("sap.m.TimePicker")&&t.getName()!=="sap.ui.comp.odata.type.StringDate"){n=e.getDateValue();if(t&&n){if(i&&i.getParameter("valid")||e.isValidValue()){a=t.formatValue(n,"string")}else{a=""}}}else{a=this._getValueTextFromField(e);n=a;if(t&&t.getName()==="sap.ui.comp.odata.type.StringDate"){a=t.formatValue(n,"string")}else if(t&&a){try{var s=o&&o.operation&&z.indexOf(o.operation.getSelectedKey())!==-1;n=t.parseValue(a,"string",s);var r=this._getCurrentKeyFieldItem(o.keyField);if(r&&r.type==="numc"&&!s&&n===null){a=t.formatValue(n,"string",s);e.setValue(a)}t.validateValue(n);if(e.isA("sap.m.ComboBox")&&!e.getSelectedKey()||i&&e.getId()==i.getSource().getId()&&o.operation.getSelectedKey()===R.BT&&(this._isInvalidFiscalRange(o)||this._isFieldNumeric(o)&&this._isInvalidRange(o))){a=""}}catch(e){M.error("sap.m.P13nConditionPanel","not able to parse value "+a+" with type "+t.getName());a=""}}}return[n,a]}.bind(this);var s=o(e.value1,e.oType,t);var r=s[0],l=s[1];s=o(e.value2,e.oType,t);var d=s[0],p=s[1];if(this._hasSecondValue(a)){this._updateMinMaxDate(e,r,d)}else{this._updateMinMaxDate(e,null,null)}var u=this._getCurrentKeyFieldItem(e.keyField);if(u&&u.type==="numc"){if([R.Contains,R.EndsWith].indexOf(a)!=-1){r=e.oType.formatValue(r,"string")}}var g=e.showIfGrouped.getSelected();var c=e.select;var h="";var y;if(i===""||i==null){i=null;y=this._getKeyFromConditionGrid(e);this._removeConditionFromMap(y);this._enableCondition(e,false);var f=this._getIndexOfCondition(e);if(c.getSelected()){c.setSelected(false);c.setEnabled(false);this._bIgnoreSetConditions=true;this.fireDataChange({key:y,index:f,operation:"remove",newData:null});this._bIgnoreSetConditions=false}return}this._enableCondition(e,true);h=this._getFormatedConditionText(a,l,p,n,i,g);var m={value:h,exclude:n,operation:a,keyField:i,value1:r,value2:this._hasSecondValue(a)?d:null,showIfGrouped:g};y=this._getKeyFromConditionGrid(e);if(h!==""||e.value1.isA("sap.m.ComboBox")){c.setSelected(true);c.setEnabled(true);var _="update";if(!this._oConditionsMap[y]){_="add"}this._oConditionsMap[y]=m;if(_==="add"){this._aConditionKeys.splice(this._getIndexOfCondition(e),0,y)}e.data("_key",y);this.fireDataChange({key:y,index:this._getIndexOfCondition(e),operation:_,newData:m})}else if(this._oConditionsMap[y]!==undefined){this._removeConditionFromMap(y);e.data("_key",null);var f=this._getIndexOfCondition(e);if(c.getSelected()){c.setSelected(false);c.setEnabled(false);this._bIgnoreSetConditions=true;this.fireDataChange({key:y,index:f,operation:"remove",newData:null});this._bIgnoreSetConditions=false}}this._updatePaginatorToolbar()};X.prototype._getConditions=function(e){return{index:this._iConditions,key:this._createConditionKey(),exclude:this._oOperationsHelper.isExcludeType(e.oOperation),operation:e.oOperation,keyField:e.oKeyField,value1:e.oPastedValue,value2:null}};X.prototype._isFieldNumeric=function(e){var t=this._getCurrentKeyFieldItem(e.keyField),i=t.type;return!!(i==="numc"||i==="numeric")};X.prototype._isFiscalField=function(e){var t=this._getCurrentKeyFieldItem(e.keyField);return t.typeInstance&&t.typeInstance.isA("sap.ui.comp.odata.type.FiscalDate")};X.prototype._isInvalidRange=function(e){var t=e.value1.getValue(),i=e.value2.getValue();return!!(t&&i&&Number(e.oType.parseValue(t,"string"))>Number(e.oType.parseValue(i,"string")))};X.prototype._isInvalidFiscalRange=function(e){var t,i,a,n,o=e.value1.getValue(),s=e.value2.getValue(),r=this._getCurrentKeyFieldItem(e.keyField),l=r.typeInstance&&r.typeInstance.sAnotationType;if(!this._isFiscalField(e)||!o||!s){return false}if(l==="com.sap.vocabularies.Common.v1.IsFiscalYearPeriod"||l==="com.sap.vocabularies.Common.v1.IsFiscalYearQuarter"||l==="com.sap.vocabularies.Common.v1.IsFiscalYearWeek"){if(o.indexOf("/")!==-1&&s.indexOf("/")!==-1){t=o.split("/")[0];a=s.split("/")[0];i=o.split("/")[1];n=s.split("/")[1];return i===n?t>a:i>n}}else{return parseFloat(o)>parseFloat(s)}};X.prototype._validateAndFormatFieldValue=function(e){var t=e.oSource;var i=t.getParent();var a;var n=this._oRbComp.getText("VALUEHELPVALDLG_FIELD_RANGE_MESSAGE"),o=i&&i.operation&&z.indexOf(i.operation.getSelectedKey())!==-1;if(t.getDateValue&&e){a=e.getParameter("value");var s=e.getParameter("valid");this._makeFieldValid(t,s);return}else{a=t.getValue&&t.getValue()}if(!i){return}if(this.getDisplayFormat()==="UpperCase"&&a){a=a.toUpperCase();t.setValue(a)}if(i.oType&&a){try{var r=i.oType.parseValue(a,"string",o);i.oType.validateValue(r);this._makeFieldValid(t,true);a=i.oType.formatValue(r,"string",o);t.setValue(a);if(i.operation.getSelectedKey()===R.BT){if(this._isFieldNumeric(i)&&this._isInvalidRange(i,e)||this._isInvalidFiscalRange(i,e)){this._makeFieldValid(t,false,n)}else{this._makeFieldValid(i.value1,true);this._makeFieldValid(i.value2,true)}}}catch(e){var l=e.message;this._makeFieldValid(t,false,l)}}else{this._makeFieldValid(t,true)}};X.prototype._changeOperationValueFields=function(t,i){e.prototype._changeOperationValueFields.apply(this,arguments);var a=i.getContent().length,n=i.remove,o=i.indexOfContent(n),s=a-1;if(o!==s){i.insertContent(n,s)}};X.prototype._updateLayout=function(e){};X.prototype._updateConditionFields=function(){this._aConditionsFields=this._createConditionsFields()};X.prototype._addButtons=function(e,t){var i=this;var a=new v({type:G.Transparent,icon:n.getIconURI("decline"),tooltip:this._oRb.getText("CONDITIONPANEL_REMOVE"+(this._sAddRemoveIconTooltipKey?"_"+this._sAddRemoveIconTooltipKey:"")+"_TOOLTIP"),press:function(){i._handleRemoveCondition(this.oTargetGrid,e)},layoutData:new S({span:"XL1 L1 M1 S1"})});a.oTargetGrid=t;e.addContent(a);e["remove"]=a;var o=new v({text:this._oRbComp.getText("VALUEHELPDLG_CONDITIONPANEL_ADD"),press:function(){i._handleAddCondition(this.oTargetGrid,e,true)},layoutData:new S({span:"XL2 L3 M3 S3",indent:"XL9 L8 M8 S7",linebreak:true}),ariaDescribedBy:i._oInvisibleTextOperatorAddButton});o.oTargetGrid=t;o.addStyleClass("conditionAddBtnFloatRight");o.addStyleClass("conditionAddBtnMarginTop");e.addContent(o);e["add"]=o};X.prototype.getCurrentOparation=function(e){return e.exclude?this._oOperationsHelper.getCorrespondingExcludeOperation(e.operation):e.operation};X.prototype._hasSecondValue=function(t){return e.prototype._hasSecondValue.apply(this,arguments)||t===R.NotBT};X.prototype._hasNoValues=function(t){return e.prototype._hasNoValues.apply(this,arguments)||t===R.NotEmpty};X.prototype._createConditionsFields=function(){return[{ID:"select",Label:"",SpanFilter:"L1 M1 S1",SpanSort:"L1 M1 S1",SpanGroup:"L1 M1 S1",Control:"CheckBox",Value:""},{ID:"keyFieldLabel",Text:"Sort By",SpanFilter:"L1 M1 S1",SpanSort:"L1 M1 S1",SpanGroup:"L1 M1 S1",Control:"Label"},{ID:"keyField",Label:"",SpanFilter:"L3 M5 S10",SpanSort:"L5 M5 S12",SpanGroup:"L4 M4 S12",Control:"ComboBox"},{ID:"operationLabel",Text:"Sort Order",SpanFilter:"L1 M1 S1",SpanSort:"L1 M1 S1",SpanGroup:"L1 M1 S1",Control:"Label"},{ID:"operation",Label:"",SpanFilter:this._aKeyFields.length>1?"L3 M6 S10":"XL3 L3 M3 S10",SpanSort:o.system.phone?"L5 M5 S8":"L5 M5 S9",SpanGroup:"L2 M5 S10",Control:"ComboBox"},{ID:"value1",Label:this._sFromLabelText,SpanFilter:this._aKeyFields.length>1?"L3 M10 S10":"XL4 L4 M4 S10",SpanSort:"L3 M10 S10",SpanGroup:"L3 M10 S10",Control:"TextField",Value:""},{ID:"value2",Label:this._sToLabelText,SpanFilter:this._aKeyFields.length>1?"L2 M10 S10":"XL4 L4 M4 S10",SpanSort:"L2 M10 S10",SpanGroup:"L2 M10 S10",Control:"TextField",Value:""},{ID:"showIfGrouped",Label:this._sShowIfGroupedLabelText,SpanFilter:"L1 M10 S10",SpanSort:"L1 M10 S10",SpanGroup:"L3 M4 S9",Control:"CheckBox",Value:"false"}]};X.prototype._getConditionsGridAtPosition=function(e){var t=this._oConditionsGrid.getContent();if(e>=t.length){return null}return t[e]};X.prototype._getConditionsCount=function(){var e=this._oConditionsGrid.getContent();return e.length};X.prototype.fireDataChange=function(e){var t,i=e.newData;if(i){t=i.operation;i.operation=this._oOperationsHelper.isExcludeType(t)?this._oOperationsHelper.getCorrespondingIncludeOperation(t):t}return a.prototype.fireEvent.call(this,"dataChange",e)};X.prototype._makeFieldValid=function(e,t,i,a){if(a){var n=e.getSelectedItem();if(!n){e.setValueState(U.Error)}else{e.setValueState(U.None)}}else if(t){e.setValueState(U.None);e.setValueStateText("")}else{e.setValueState(U.Warning);e.setValueStateText(i?i:this._sValidationDialogFieldMessage)}};X.prototype._getRelevantOperations=function(e){var t,i=e&&e.typeInstance,a=i&&e.typeInstance.oConstraints&&e.typeInstance.oConstraints.isDigitSequence,n=i&&(e.typeInstance.sAnotationType==="com.sap.vocabularies.Common.v1.IsFiscalPeriod"||e.typeInstance.sAnotationType==="com.sap.vocabularies.Common.v1.IsFiscalYearPeriod"),o=a&&n?"numcFiscal":e&&e.type,s=e&&e.type&&this.getOperations(o);if(e&&e.operations){t=e.operations}else if(Array.isArray(s)&&s.length>0){t=s}else{t=this.getOperations("default")}return t};X.prototype._handleComboBoxChangeEvent=function(e,t){var i=t.getSource();this._makeFieldValid(i,true,undefined,true);if(i.getValueState()===U.None){this._changeField(e)}};X.prototype._createValueField=function(e,t,i){var a,n,o=this,s={value:t["Value"],width:"100%",placeholder:t["Label"],change:function(e){o._validateAndFormatFieldValue(e);o._changeField(i,e)},layoutData:new S({span:t["Span"+this._sConditionType]})};if(e&&e.typeInstance){var r=e.typeInstance;n=this._findConfig(r,"ctrl");if(n==="DateTimePicker"&&r.getMetadata().getName()==="sap.ui.model.odata.type.DateTime"){if(!(r.oConstraints&&r.oConstraints.isDateOnly)){M.error("sap.m.P13nConditionPanel","sap.ui.model.odata.type.DateTime without displayFormat = Date is not supported!");r.oConstraints=Object.assign({},r.oConstraints,{isDateOnly:true})}n="DatePicker"}i.oType=r;if(n=="select"){var l=[];var p=e.values||this._oTypeValues[n]||["",r.formatValue(false,"string"),r.formatValue(true,"string")];p.forEach(function(e,t){l.push(new d({key:t.toString(),text:e.toString()}))});s={width:"100%",items:l,change:function(){o._changeField(i);o._makeFieldValid(a,true)},layoutData:new S({span:t["Span"+this._sConditionType]})};a=new O(s)}else if(n=="TimePicker"){if(r.oFormatOptions&&r.oFormatOptions.style){s.displayFormat=r.oFormatOptions.style}a=new E(s)}else if(n=="DateTimePicker"){if(r.oFormatOptions&&r.oFormatOptions.style){s.displayFormat=r.oFormatOptions.style}a=new P(s)}else if(n==="DatePicker"){if(r.oFormatOptions){s.displayFormat=r.oFormatOptions.style||r.oFormatOptions.pattern;if(r.isA("sap.ui.comp.odata.type.StringDate")){s.valueFormat="yyyyMMdd"}}a=new k(s)}else{var u=this.data("dropdownFields");a=new D(s);if(u){for(var g=0;g<u.length;g++){if(u[g].name===e.key){s={width:"100%",items:[],change:this._handleComboBoxChangeEvent.bind(this,i),layoutData:new S({span:t["Span"+this._sConditionType]})};a=new L(s);break}}}if(this._fSuggestCallback){e=this._getCurrentKeyFieldItem(i.keyField);if(e&&e.key){var c=this._fSuggestCallback(a,e.key);if(c){a._oSuggestProvider=c}}}}}else{i.oType=null;a=new D(s)}if(n!=="boolean"&&n!=="enum"&&a){a.onpaste=function(e){var t;if(window.clipboardData){t=window.clipboardData.getData("Text")}else{t=e.originalEvent.clipboardData.getData("text/plain")}var i=e.srcControl.getParent();var a=t.split(/\r\n|\r|\n/g);if(a&&a[a.length-1].trim()===""){a.pop()}var n=i.operation;var s=n.getSelectedKey();if(a&&a.length>1&&s!=="BT"){setTimeout(function(){var e=a?a.length:0;var t=o._getCurrentKeyFieldItem(i.keyField);var n=i.operation;for(var s=0;s<e;s++){if(o._aConditionKeys.length>=o._getMaxConditionsAsNumber()){break}var r=a[s].trim();if(r){var l;if(t.typeInstance){try{l=t.typeInstance.parseValue(r,"string");t.typeInstance.validateValue(l)}catch(e){M.error("sap.m.P13nConditionPanel.onPaste","not able to parse value "+r+" with type "+t.typeInstance.getName());r="";l=null}if(!l){continue}}var d={index:o._iConditions,key:o._createConditionKey(),exclude:o.getExclude()||o._oOperationsHelper.isExcludeType(n.getSelectedKey()),operation:n.getSelectedKey(),keyField:t.key,value1:l,value2:null};o._addCondition2Map(d);o.fireDataChange({key:d.key,index:d.index,operation:"add",newData:d})}}o._clearConditions();o._fillConditions()},0)}}}if(e&&e.maxLength&&a.setMaxLength){var h=-1;if(typeof e.maxLength==="string"){h=parseInt(e.maxLength)}if(typeof e.maxLength==="number"){h=e.maxLength}if(h>0&&(!a.getShowSuggestion||!a.getShowSuggestion())){a.setMaxLength(h)}}return a};X.prototype._enableCondition=function(e,t){var i=this._getCurrentKeyFieldItem(e.keyField);i&&i.type==="boolean"?e.operation.setEnabled(false):e.operation.setEnabled(t);e.value1.setEnabled(t);e.value2.setEnabled(t);e.showIfGrouped.setEnabled(t)};X.prototype._getValueTextFromField=function(e){if(e instanceof O){return e.getSelectedItem()?e.getSelectedItem().getText():""}if(e.isA("sap.m.ComboBox")){return e.getSelectedItem()?e.getSelectedItem().getKey():""}return e.getValue()};return X});