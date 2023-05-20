/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/ExtensionAPI","sap/fe/core/helpers/ClassSupport","sap/fe/macros/chart/ChartUtils","sap/fe/macros/filter/FilterUtils","sap/fe/templates/ListReport/LRMessageStrip","sap/ui/core/InvisibleMessage","sap/ui/core/library"],function(t,e,r,o,s,n,i){"use strict";var l,a;var c=i.InvisibleMessageMode;var u=s.LRMessageStrip;var p=e.defineUI5Class;function f(t,e){t.prototype=Object.create(e.prototype);t.prototype.constructor=t;g(t,e)}function g(t,e){g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function t(e,r){e.__proto__=r;return e};return g(t,e)}let h=(l=p("sap.fe.templates.ListReport.ExtensionAPI"),l(a=function(t){f(e,t);function e(){return t.apply(this,arguments)||this}var s=e.prototype;s.refresh=function t(){const e=this._controller._getFilterBarControl();if(e){return e.waitForInitialization().then(function(){e.triggerSearch()})}else{return Promise.resolve()}};s.getSelectedContexts=function t(){var e,o;const s=this._controller._isMultiMode()&&((e=this._controller._getMultiModeControl())===null||e===void 0?void 0:(o=e.getSelectedInnerControl())===null||o===void 0?void 0:o.content)||this._controller._getTable();if(s.isA("sap.ui.mdc.Chart")){const t=[];if(s&&s.get_chart()){const e=r.getChartSelectedData(s.get_chart());for(let r=0;r<e.length;r++){t.push(e[r].context)}}return t}else{return s&&s.getSelectedContexts()||[]}};s.setFilterValues=function t(e,r,s){const n=this._controller._getAdaptationFilterBarControl()||this._controller._getFilterBarControl();if(arguments.length===2){s=r;return o.setFilterValues(n,e,s)}return o.setFilterValues(n,e,r,s)};s.createFiltersFromFilterConditions=function t(e){const r=this._controller._getFilterBarControl();return o.getFilterInfo(r,undefined,e)};s.getFilters=function t(){const e=this._controller._getFilterBarControl();return o.getFilters(e)};s.setCustomMessage=function t(e,r,o){if(!this.ListReportMessageStrip){this.ListReportMessageStrip=new u}this.ListReportMessageStrip.showCustomMessage(e,this._controller,r,o);if(e!==null&&e!==void 0&&e.message){n.getInstance().announce(e.message,c.Assertive)}};return e}(t))||a);return h},false);