/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/base/util/UriParameters","sap/fe/core/controllerextensions/messageHandler/messageHandling","sap/fe/core/helpers/ClassSupport","sap/fe/core/helpers/ResourceModelHelper","sap/fe/macros/messages/MessagePopover","sap/m/Button","sap/m/ColumnListItem","sap/m/Dialog","sap/m/FormattedText","sap/m/library","sap/ui/core/Core","sap/ui/core/library","sap/ui/core/mvc/View","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/Sorter"],function(e,t,n,i,o,s,r,a,g,l,c,u,f,d,h,p,T){"use strict";var b,_,m,I,C,P,y;var E=f.MessageType;var S=c.ButtonType;var M=o.getResourceModel;var v=i.event;var w=i.defineUI5Class;var x=i.aggregation;function A(e,t,n,i){if(!n)return;Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}function R(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function O(e,t){e.prototype=Object.create(t.prototype);e.prototype.constructor=e;B(e,t)}function B(e,t){B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,n){t.__proto__=n;return t};return B(e,t)}function L(e,t,n,i,o){var s={};Object.keys(i).forEach(function(e){s[e]=i[e]});s.enumerable=!!s.enumerable;s.configurable=!!s.configurable;if("value"in s||s.initializer){s.writable=true}s=n.slice().reverse().reduce(function(n,i){return i(e,t,n)||n},s);if(o&&s.initializer!==void 0){s.value=s.initializer?s.initializer.call(o):void 0;s.initializer=undefined}if(s.initializer===void 0){Object.defineProperty(e,t,s);s=null}return s}function G(e,t){throw new Error("Decorating class property failed. Please ensure that "+"proposal-class-properties is enabled and runs after the decorators transform.")}let N=(b=w("sap.fe.macros.messages.MessageButton"),_=x({type:"sap.fe.macros.messages.MessageFilter",multiple:true,singularName:"customFilter"}),m=v(),b(I=(C=function(i){O(o,i);function o(e,t){var n;n=i.call(this,e,t)||this;A(n,"customFilters",P,R(n));A(n,"messageChange",y,R(n));n.sGeneralGroupText="";n.sViewId="";n.sLastActionText="";return n}var c=o.prototype;c.init=function e(){r.prototype.init.apply(this);this.attachPress(this.handleMessagePopoverPress,this);this.oMessagePopover=new s;this.oItemBinding=this.oMessagePopover.getBinding("items");this.oItemBinding.attachChange(this._setMessageData,this);const t=this.getId();if(t){this.oMessagePopover.addCustomData(new sap.ui.core.CustomData({key:"messageButtonId",value:t}))}this.attachModelContextChange(this._applyFiltersAndSort.bind(this));this.oMessagePopover.attachActiveTitlePress(this._activeTitlePress.bind(this))};c.handleMessagePopoverPress=function e(t){this.oMessagePopover.toggle(t.getSource())};c._applyGroupingAsync=async function t(i){const o=[];const s=i.getBindingContext();const r=e=>{const t=[];const i=this.oItemBinding.getContexts().map(function(e){return e.getObject()});const o=e.getBindingContext();if(o){const s=e.getContent()[0];n.getVisibleSectionsFromObjectPageLayout(s).forEach(function(e){e.getSubSections().forEach(function(e){e.findElements(true).forEach(function(n){if(n.isA("sap.ui.mdc.Table")){for(let s=0;s<i.length;s++){const r=n.getRowBinding();if(r){const r=`${o.getPath()}/${n.getRowBinding().getPath()}`;if(i[s].target.indexOf(r)===0){t.push({table:n,subsection:e});break}}}}})})})}return t};const a=r.bind(this)(i);a.forEach(function(e){var t;const n=e.table,i=e.subsection;if(!n.getBindingContext()||((t=n.getBindingContext())===null||t===void 0?void 0:t.getPath())!==(s===null||s===void 0?void 0:s.getPath())){i.setBindingContext(s);if(!n.getRowBinding().isLengthFinal()){o.push(new Promise(function(e){n.getRowBinding().attachEventOnce("dataReceived",function(){e()})}))}}});const g=new Promise(e=>{setTimeout(async()=>{this._applyGrouping();e()},0)});try{await Promise.all(o);i.getModel().checkMessages();await g}catch(t){e.error("Error while grouping the messages in the messagePopOver")}};c._applyGrouping=function e(){this.oObjectPageLayout=this._getObjectPageLayout(this,this.oObjectPageLayout);if(!this.oObjectPageLayout){return}const t=this.oMessagePopover.getItems();this._checkControlIdInSections(t)};c._getTableRefErrorContext=function e(t){const n=t.getModel("internal");if(!t.getBindingContext("internal").getProperty("refError")){n.setProperty("refError",{},t.getBindingContext("internal"))}const i=t.getBindingContext("internal").getPath()+"/refError/"+t.getBindingContext().getPath().replace("/","$")+"$"+t.getRowBinding().getPath().replace("/","$");const o=n.getContext(i);if(!o.getProperty("")){n.setProperty("",{},o)}return o};c._updateInternalModel=function e(t,n,i,o,s,r){let a;if(r){a={rowIndex:"CreationRow",targetColProperty:i?i:""}}else{a={rowIndex:t?n:"",targetColProperty:i?i:""}}const g=o.getModel("internal"),l=this._getTableRefErrorContext(o);const c=sap.ui.getCore().getMessageManager().getMessageModel().getData().map(function(e){return e.id});let u;if(l.getProperty()){u=Object.keys(l.getProperty()).filter(function(e){return c.indexOf(e)===-1});u.forEach(function(e){delete l.getProperty()[e]})}g.setProperty(s.getId(),Object.assign({},l.getProperty(s.getId())?l.getProperty(s.getId()):{},a),l)};c._setGroupLabelForTransientMsg=function e(t,n){this.sLastActionText=this.sLastActionText?this.sLastActionText:u.getLibraryResourceBundle("sap.fe.core").getText("T_MESSAGE_BUTTON_SAPFE_MESSAGE_GROUP_LAST_ACTION");t.setGroupName(`${this.sLastActionText}: ${n}`)};c._computeMessageGroupAndSubTitle=function e(t,i,o,s,r,a){var g;const l=M(i);this.oItemBinding.detachChange(this._setMessageData,this);const c=(g=t.getBindingContext("message"))===null||g===void 0?void 0:g.getObject();const f=true;let d,h,p,T,b,_,m;const I=new RegExp("^/").test(c===null||c===void 0?void 0:c.getTargets()[0]);if(I){for(T=0;T<s.length;T++){d=s[T];_=d;if(d.isA("sap.m.Table")||d.isA("sap.ui.table.Table")){h=d.getParent();const e=h.getRowBinding();const i=(e,n)=>{this._setGroupLabelForTransientMsg(t,n)};if(e&&e.isLengthFinal()&&h.getBindingContext()){const o=n.getTableColumnDataAndSetSubtile(c,h,d,e,a,f,i);p=o.oTargetTableInfo;if(o.subTitle){t.setSubtitle(o.subTitle)}t.setActiveTitle(!!p.oTableRowContext);if(p.oTableRowContext){this._formatMessageDescription(t,p.oTableRowContext,p.sTableTargetColName,h)}b=p.oTableRowContext&&p.oTableRowContext.getIndex();this._updateInternalModel(p.oTableRowContext,b,p.sTableTargetColProperty,h,c)}}else{t.setActiveTitle(true);const e=n.bIsOrphanElement(_,s);if(e){t.setSubtitle("");break}}}}else{_=s[0];h=this._getMdcTable(_);if(h){p={};p.tableHeader=h.getHeader();const e=this._getTableColumnIndex(_);p.sTableTargetColProperty=e>-1?h.getColumns()[e].getDataProperty():undefined;p.sTableTargetColName=p.sTableTargetColProperty&&e>-1?h.getColumns()[e].getHeader():undefined;m=this._getTableRow(_).isA("sap.ui.table.CreationRow");if(!m){b=this._getTableRowIndex(_);p.oTableRowBindingContexts=h.getRowBinding().getCurrentContexts();p.oTableRowContext=p.oTableRowBindingContexts[b]}const i=n.getMessageSubtitle(c,p.oTableRowBindingContexts,p.oTableRowContext,p.sTableTargetColName,h,m,e===0&&_.getValueState()==="Error"?_:undefined);if(i){t.setSubtitle(i)}t.setActiveTitle(true);this._updateInternalModel(p.oTableRowContext,b,p.sTableTargetColProperty,h,c,m)}}if(f){const e=n.createSectionGroupName(i,o,r,p,l);t.setGroupName(e);const s=this._getViewId(this.getId());const a=u.byId(s);const g=c.getTargets()[0]&&c.getTargets()[0].split("/").pop();const f=a===null||a===void 0?void 0:a.getModel("internal");if(f&&f.getProperty("/messageTargetProperty")&&g&&g===f.getProperty("/messageTargetProperty")){this.oMessagePopover.fireActiveTitlePress({item:t});f.setProperty("/messageTargetProperty",false)}}this.oItemBinding.attachChange(this._setMessageData,this);return _};c._checkControlIdInSections=function e(t){let i,o,s,r,a,g;this.sGeneralGroupText=this.sGeneralGroupText?this.sGeneralGroupText:u.getLibraryResourceBundle("sap.fe.core").getText("T_MESSAGE_BUTTON_SAPFE_MESSAGE_GROUP_GENERAL");const l=n.getVisibleSectionsFromObjectPageLayout(this.oObjectPageLayout);if(l){var c;const e=this._getViewId(this.getId());const f=u.byId(e);const d=f===null||f===void 0?void 0:(c=f.getBindingContext("internal"))===null||c===void 0?void 0:c.getProperty("sActionName");if(d){(f===null||f===void 0?void 0:f.getBindingContext("internal")).setProperty("sActionName",null)}for(r=t.length-1;r>=0;--r){s=t[r];let e=true;for(a=l.length-1;a>=0;--a){i=l[a];o=i.getSubSections();for(g=o.length-1;g>=0;--g){const t=o[g];const r=s.getBindingContext("message").getObject();const l=n.getControlFromMessageRelatingToSubSection(t,r);if(l.length>0){const n=this._computeMessageGroupAndSubTitle(s,i,t,l,o.length>1,d);if(n&&!n.isA("sap.m.Table")&&!n.isA("sap.ui.table.Table")){a=g=-1}e=false}}}if(e){const e=s.getBindingContext("message").getObject();s.setActiveTitle(false);if(e.persistent&&d){this._setGroupLabelForTransientMsg(s,d)}else{s.setGroupName(this.sGeneralGroupText)}}}}};c._findTargetForMessage=function e(t){const n=t.getBindingContext("message")&&t.getBindingContext("message").getObject();if(n&&n.target){const e=this.oObjectPageLayout&&this.oObjectPageLayout.getModel()&&this.oObjectPageLayout.getModel().getMetaModel(),t=e&&e.getMetaPath(n.target),i=e&&e.getObject(t);if(i&&i.$kind==="Property"){return true}}};c._fnEnableBindings=function e(n){if(t.fromQuery(window.location.search).get("sap-fe-xx-lazyloadingtest")){return}for(let e=0;e<n.length;e++){const t=n[e];let o=false;const s=t.getSubSections();for(let e=0;e<s.length;e++){const t=s[e];const n=t.getBlocks();if(n){for(let e=0;e<t.getBlocks().length;e++){var i;if(n[e].getContent&&!((i=n[e].getContent())!==null&&i!==void 0&&i.isA("sap.fe.macros.table.TableAPI"))){o=true;break}}if(o){t.setBindingContext(undefined)}}if(t.getBindingContext()){this._findMessageGroupAfterRebinding();t.getBindingContext().getBinding().attachDataReceived(this._findMessageGroupAfterRebinding.bind(this))}}}};c._findMessageGroupAfterRebinding=function e(){const t=this.oMessagePopover.getItems();this._checkControlIdInSections(t)};c._getViewId=function e(t){let n,i=u.byId(t);while(i){if(i instanceof d){n=i.getId();break}i=i.getParent()}return n};c._setLongtextUrlDescription=function t(n,i){this.oMessagePopover.setAsyncDescriptionHandler(function(t){const o=n;const s=t.item.getLongtextUrl();if(s){jQuery.ajax({type:"GET",url:s,success:function(e){const n=i.getHtmlText()+e;t.item.setDescription(`${o}${n}`);t.promise.resolve()},error:function(){t.item.setDescription(n);const i=`A request has failed for long text data. URL: ${s}`;e.error(i);t.promise.reject(i)}})}})};c._formatMessageDescription=function e(t,i,o,s){var r;const a=M(s);const g=s.getParent().getIdentifierColumn();let c="";const u=(r=t.getBindingContext("message"))===null||r===void 0?void 0:r.getObject();const f=n.fetchColumnInfo(u,s);if(o){c=`${a.getText("T_MESSAGE_GROUP_DESCRIPTION_TABLE_COLUMN")}: ${o}`}else if(f){if(f.availability==="Hidden"){if(t.getType()==="Error"){c=g?`${a.getText("T_COLUMN_AVAILABLE_DIAGNOSIS_MSGDESC_ERROR")} ${i.getValue(g)}`+".":`${a.getText("T_COLUMN_AVAILABLE_DIAGNOSIS_MSGDESC_ERROR")}`+"."}else{c=g?`${a.getText("T_COLUMN_AVAILABLE_DIAGNOSIS_MSGDESC")} ${i.getValue(g)}`+".":`${a.getText("T_COLUMN_AVAILABLE_DIAGNOSIS_MSGDESC")}`+"."}}else{if(!this._navigationConfigured(s)){t.setActiveTitle(false)}c=`${a.getText("T_MESSAGE_GROUP_DESCRIPTION_TABLE_COLUMN")}: ${f.label} (${a.getText("T_COLUMN_INDICATOR_IN_TABLE_DEFINITION")})`}}const d=new l({htmlText:`<html><body><strong>${a.getText("T_FIELDS_AFFECTED_TITLE")}</strong></body></html><br>`});let h;if(g){h=`${d.getHtmlText()}<br>${a.getText("T_MESSAGE_GROUP_TITLE_TABLE_DENOMINATOR")}: ${s.getHeader()}<br>${a.getText("T_MESSAGE_GROUP_DESCRIPTION_TABLE_ROW")}: ${i.getValue(g)}<br>${c}<br>`}else if(c==""||!c){h=""}else{h=`${d.getHtmlText()}<br>${a.getText("T_MESSAGE_GROUP_TITLE_TABLE_DENOMINATOR")}: ${s.getHeader()}<br>${c}<br>`}const p=new l({htmlText:`<html><body><strong>${a.getText("T_DIAGNOSIS_TITLE")}</strong></body></html><br>`});const T=t.getBindingContext("message").getObject().description;t.setDescription(null);let b="";let _="";if(t.getLongtextUrl()){_=`${h}<br>`;this._setLongtextUrlDescription(_,p)}else if(T){b=`${p.getHtmlText()}<br>${T}`;_=`${h}<br>${b}`;t.setDescription(_)}else{t.setDescription(h)}};c._setMessageData=function t(){clearTimeout(this._setMessageDataTimeout);this._setMessageDataTimeout=setTimeout(async()=>{const t="",n=this.oMessagePopover.getItems(),i={Error:0,Warning:0,Success:0,Information:0},o=u.getLibraryResourceBundle("sap.fe.core"),s=n.length;let r=S.Default,a="",g="",l="";if(s>0){for(let e=0;e<s;e++){if(!n[e].getType()||n[e].getType()===""){++i["Information"]}else{++i[n[e].getType()]}}if(i[E.Error]>0){r=S.Negative}else if(i[E.Warning]>0){r=S.Critical}else if(i[E.Success]>0){r=S.Success}else if(i[E.Information]>0){r=S.Neutral}const c=i[E.Error]+i[E.Warning]+i[E.Success]+i[E.Information];this.setText(c.toString());if(i.Error===1){a="C_COMMON_SAPFE_ERROR_MESSAGES_PAGE_TITLE_ERROR"}else if(i.Error>1){a="C_COMMON_SAPFE_ERROR_MESSAGES_PAGE_MULTIPLE_ERROR_TOOLTIP"}else if(!i.Error&&i.Warning){a="C_COMMON_SAPFE_ERROR_MESSAGES_PAGE_WARNING_TOOLTIP"}else if(!i.Error&&!i.Warning&&i.Information){a="C_MESSAGE_HANDLING_SAPFE_ERROR_MESSAGES_PAGE_TITLE_INFO"}else if(!i.Error&&!i.Warning&&!i.Information&&i.Success){a="C_MESSAGE_HANDLING_SAPFE_ERROR_MESSAGES_PAGE_TITLE_SUCCESS"}if(a){l=o.getText(a);g=i.Error?`${i.Error} ${l}`:l;this.setTooltip(g)}this.setIcon(t);this.setType(r);this.setVisible(true);const f=u.byId(this.sViewId);if(f){const n=f.getController().pageReady;try{await n.waitPageReady();await this._applyGroupingAsync(f)}catch(t){e.error("fail grouping messages")}this.fireMessageChange({iMessageLength:s})}if(s>1){this.oMessagePopover.navigateBack()}}else{this.setVisible(false);this.fireMessageChange({iMessageLength:s})}},100)};c._activeTitlePress=async function t(n){const i=this.getBindingContext("pageInternal");i.setProperty("errorNavigationSectionFlag",true);const o=n.getParameter("item"),s=o.getBindingContext("message").getObject(),r=new RegExp("^/").test(s.getTarget()),a=u.byId(this.sViewId);let g,l;const c=function(e,t){const n={preventScroll:true,targetInfo:e};t.focus(n)};if(o.getGroupName().indexOf("Table:")!==-1){let n;if(r){n=s.controlIds.map(function(e){const t=u.byId(e);const n=t&&t.getParent();return n&&n.isA("sap.ui.mdc.Table")&&n.getHeader()===o.getGroupName().split(", Table: ")[1]?n:null}).reduce(function(e,t){return t?t:e});if(n){l=o.getGroupName().split(", ")[0];try{await this._navigateFromMessageToSectionTableInIconTabBarMode(n,this.oObjectPageLayout,l);const i=this._getTableRefErrorContext(n);const r=i.getProperty(o.getBindingContext("message").getObject().getId());const g=async(e,t)=>{const n=this._getMdcTableRows(e),i=this._getGridTable(e).getFirstVisibleRow();if(n.length>0&&n[0]){const o=n[t-i],r=this.getTargetCell(o,s);if(r){this.setFocusToControl(r);return undefined}else{const t=s.getTarget().split("/").pop();if(t){a.getModel("internal").setProperty("/messageTargetProperty",t)}if(this._navigationConfigured(e)){return a.getController()._routing.navigateForwardToContext(o.getBindingContext())}else{return false}}}return undefined};if(n.data("tableType")==="GridTable"&&r.rowIndex!==""){const i=this._getGridTable(n).getFirstVisibleRow();try{await n.scrollToIndex(r.rowIndex);const e=this._getMdcTableRows(n);let t,o;if(e.length>0&&e[0]){t=e[0].getParent().getFirstVisibleRow();o=i-t!==0}let a;if(o){a=new Promise(function(e){u.attachEvent("UIUpdated",e)})}else{a=Promise.resolve()}await a;setTimeout(async function(){const e=await g(n,r.rowIndex);if(e===false){c(s,n)}},0)}catch(t){e.error("Error while focusing on error")}}else if(n.data("tableType")==="ResponsiveTable"&&r){const e=await this.focusOnMessageTargetControl(a,s,n,r.rowIndex);if(e===false){c(s,n)}}else{this.focusOnMessageTargetControl(a,s)}}catch(t){e.error("Fail to navigate to Error control")}}}else{g=u.byId(s.controlIds[0]);const e=u.byId(this.oObjectPageLayout.getSelectedSection());if((e===null||e===void 0?void 0:e.findElements(true).indexOf(g))===-1){l=o.getGroupName().split(", ")[0];this._navigateFromMessageToSectionInIconTabBarMode(this.oObjectPageLayout,l)}this.setFocusToControl(g)}}else{l=o.getGroupName().split(", ")[0];this._navigateFromMessageToSectionInIconTabBarMode(this.oObjectPageLayout,l);this.focusOnMessageTargetControl(a,s)}};c.getTargetCell=function e(t,n){return n.getControlIds().length>0?n.getControlIds().map(function(e){const n=t.findElements(true,function(t){return t.getId()===e});return n.length>0?u.byId(e):null}).reduce(function(e,t){return t?t:e}):null};c.focusOnMessageTargetControl=async function e(t,n,i,o){const s=t.findElements(true);const r=n.getControlIds().filter(function(e){return s.some(function(t){return t.getId()===e&&t.getDomRef()})}).map(function(e){return u.byId(e)});const g=r.filter(function(e){return!e.isA("sap.m.Table")&&!e.isA("sap.ui.table.Table")});if(g.length>0){this.setFocusToControl(g[0]);return undefined}else if(r.length>0){const e=i?i.findElements(true,function(e){return e.isA(a.getMetadata().getName())}):[];if(e.length>0&&e[0]){const s=e[o];const r=this.getTargetCell(s,n);if(r){const e=r.isA("sap.fe.macros.field.FieldAPI")?r.getContent().getContentEdit()[0]:r.getItems()[0].getContent().getContentEdit()[0];this.setFocusToControl(e);return undefined}else{const e=n.getTarget().split("/").pop();if(e){t.getModel("internal").setProperty("/messageTargetProperty",e)}if(this._navigationConfigured(i)){return t.getController()._routing.navigateForwardToContext(s.getBindingContext())}else{return false}}}return undefined}return undefined};c._getMessageRank=function e(t,n){if(n){let e,i,o,s,r,a,g,l;for(s=n.length-1;s>=0;--s){e=n[s];i=e.getSubSections();for(r=i.length-1;r>=0;--r){o=i[r];g=o.findElements(true);a=g.filter(this._fnFilterUponId.bind(this,t.getControlId()));l=s+1;if(a.length>0){if(e.getVisible()&&o.getVisible()){if(!t.hasOwnProperty("sectionName")){t.sectionName=e.getTitle()}if(!t.hasOwnProperty("subSectionName")){t.subSectionName=o.getTitle()}return l*10+(r+1)}else{return 1}}}}if(!t.sectionName&&!t.subSectionName&&t.persistent){return 1}return 999}return 999};c._applyFiltersAndSort=function e(){let t,n,i,o,s,r,a=null;const l=[];const c=()=>{const e=e=>{let t=Infinity,n=u.byId(e[0]);const i=u.byId(e[0]);while(n){const e=n instanceof g?(i===null||i===void 0?void 0:i.getParent()).findElements(true).indexOf(i):Infinity;if(n instanceof g){if(t>e){t=e;this.setFocusToControl(i)}return false}n=n.getParent()}return true};return new h({path:"controlIds",test:e,caseSensitive:true})};function f(){const e=function(e){if(!e.length){return false}let t=u.byId(e[0]);while(t){if(t.getId()===d){return true}if(t instanceof g){return false}t=t.getParent()}return false};return new h({path:"controlIds",test:e,caseSensitive:true})}if(!this.sViewId){this.sViewId=this._getViewId(this.getId())}const d=this.sViewId;const b=this.getAggregation("customFilters");if(b){b.forEach(function(e){l.push(new h({path:e.getProperty("path"),operator:e.getProperty("operator"),value1:e.getProperty("value1"),value2:e.getProperty("value2")}))})}const _=this.getBindingContext();if(!_){this.setVisible(false);return}else{o=_.getPath();t=new h({filters:[new h({path:"validation",operator:p.EQ,value1:true}),f()],and:true});n=new h({filters:[t,new h({path:"target",operator:p.StartsWith,value1:o})],and:false});r=new h({filters:[c()]})}const m=new h({filters:[n,r],and:true});if(l.length>0){i=new h({filters:[l,m],and:false})}else{i=m}this.oItemBinding.filter(i);this.oObjectPageLayout=this._getObjectPageLayout(this,this.oObjectPageLayout);if(this.oObjectPageLayout){s=new T("",null,null,(e,t)=>{if(!a){a=this.oObjectPageLayout&&this.oObjectPageLayout.getSections()}const n=this._getMessageRank(e,a);const i=this._getMessageRank(t,a);if(n<i){return-1}if(n>i){return 1}return 0});this.oItemBinding.sort(s)}};c._fnFilterUponId=function e(t,n){return t===n.getId()};c._getSectionBySectionTitle=function e(t,n){let i;if(n){const e=t.getSections();for(let t=0;t<e.length;t++){if(e[t].getVisible()&&e[t].getTitle()===n){i=e[t];break}}}return i};c._navigateFromMessageToSectionInIconTabBarMode=function e(t,n){const i=t.getUseIconTabBar();if(i){const e=this._getSectionBySectionTitle(t,n);const i=t.getSelectedSection();if(e&&i!==e.getId()){t.setSelectedSection(e.getId())}}};c._navigateFromMessageToSectionTableInIconTabBarMode=async function e(t,n,i){const o=t.getRowBinding();const s=t.getBindingContext();const r=n.getBindingContext();const a=!(s===r);this._navigateFromMessageToSectionInIconTabBarMode(n,i);return new Promise(function(e){if(a){o.attachEventOnce("change",function(){e()})}else{e()}})};c._getMdcTable=function e(t){let n=t.getParent();while(n&&!n.isA("sap.ui.mdc.Table")){n=n.getParent()}return n&&n.isA("sap.ui.mdc.Table")?n:undefined};c._getGridTable=function e(t){return t.findElements(true,function(e){return e.isA("sap.ui.table.Table")&&e.getParent()===t})[0]};c._getTableRow=function e(t){let n=t.getParent();while(n&&!n.isA("sap.ui.table.Row")&&!n.isA("sap.ui.table.CreationRow")&&!n.isA(a.getMetadata().getName())){n=n.getParent()}return n&&(n.isA("sap.ui.table.Row")||n.isA("sap.ui.table.CreationRow")||n.isA(a.getMetadata().getName()))?n:undefined};c._getTableRowIndex=function e(t){const n=this._getTableRow(t);let i;if(n.isA("sap.ui.table.Row")){i=n.getIndex()}else{i=n.getTable().getItems().findIndex(function(e){return e.getId()===n.getId()})}return i};c._getTableColumnIndex=function e(t){const n=function(e,t){return t.getCells().findIndex(function(t){return t.getId()===e.getId()})};const i=function(e,t){let i=e.getParent(),o=n(i,t);while(i&&o<0){i=i.getParent();o=n(i,t)}return o};const o=this._getTableRow(t);let s;s=i(t,o);if(o.isA("sap.ui.table.CreationRow")){const e=o.getCells()[s].getId(),t=o.getTable().getColumns();s=t.findIndex(function(t){if(t.getCreationTemplate()){return e.search(t.getCreationTemplate().getId())>-1?true:false}else{return false}})}return s};c._getMdcTableRows=function e(t){return t.findElements(true,function(e){return e.isA("sap.ui.table.Row")&&e.getTable().getParent()===t})};c._getObjectPageLayout=function e(t,n){if(n){return n}n=t;while(n&&!n.isA("sap.uxap.ObjectPageLayout")){n=n.getParent()}return n};c._navigationConfigured=function e(t){const n=sap.ui.require("sap/ui/core/Component"),i=t&&n.getOwnerComponentFor(t)&&n.getOwnerComponentFor(t).getNavigation();let o=false,s=false;if(i&&Object.keys(i).indexOf(t.getRowBinding().sPath)!==-1){o=i[t===null||t===void 0?void 0:t.getRowBinding().sPath]&&i[t===null||t===void 0?void 0:t.getRowBinding().sPath].detail&&i[t===null||t===void 0?void 0:t.getRowBinding().sPath].detail.route?true:false}s=o&&(t===null||t===void 0?void 0:t.getRowSettings().getRowActions())&&(t===null||t===void 0?void 0:t.getRowSettings().getRowActions()[0].mProperties.type.indexOf("Navigation"))!==-1;return s};c.setFocusToControl=function t(n){const i=this.oMessagePopover;if(i&&n&&n.focus){const e=()=>{n.focus()};if(!i.isOpen()){setTimeout(e,0)}else{const t=()=>{setTimeout(e,0);i.detachEvent("afterClose",t)};i.attachEvent("afterClose",t);i.close()}}else{e.warning("FE V4 : MessageButton : element doesn't have focus method for focusing.")}};return o}(r),P=L(C.prototype,"customFilters",[_],{configurable:true,enumerable:true,writable:true,initializer:null}),y=L(C.prototype,"messageChange",[m],{configurable:true,enumerable:true,writable:true,initializer:null}),C))||I);return N},false);