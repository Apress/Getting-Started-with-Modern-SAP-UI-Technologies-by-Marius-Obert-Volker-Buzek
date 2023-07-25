/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/support/Plugin","sap/ui/core/support/controls/InteractionSlider","sap/ui/core/support/controls/InteractionTree","sap/ui/core/support/controls/TimelineOverview","sap/m/MessageToast","sap/ui/thirdparty/jszip","sap/ui/core/util/File","sap/ui/performance/trace/Interaction","sap/ui/performance/Measurement"],function(t,e,r,i,n,s,o,a,p,c){"use strict";var d=e.extend("sap.ui.core.support.plugins.Interaction",{constructor:function(t){e.apply(this,["sapUiSupportInteraction","Interaction",t]);this._oStub=t;if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetMeasurements",this.getId()+"SetActive",this.getId()+"Export",this.getId()+"Import",this.getId()+"SetQueryString"];var s=function(t,e){return("000"+String(t)).slice(-e)};this._fnFormatTime=function(t){var e=new Date(t),r=Math.floor((t-Math.floor(t))*1e3);return s(e.getHours(),2)+":"+s(e.getMinutes(),2)+":"+s(e.getSeconds(),2)+"."+s(e.getMilliseconds(),3)+s(r,3)};this._oInteractionSlider=new r;this._oInteractionTree=new i({});this._oTimelineOverview=new n}else{this._aEventIds=[this.getId()+"Refresh",this.getId()+"Clear",this.getId()+"Start",this.getId()+"Stop",this.getId()+"Activate",this.getId()+"Export",this.getId()+"Import",this.getId()+"SetQueryString"]}}});d.prototype.init=function(t){e.prototype.init.apply(this,arguments);if(this.runsAsToolPlugin()){u.call(this,t)}else{h.call(this,t)}};d.prototype.exit=function(t){e.prototype.exit.apply(this,arguments)};function u(e){var r=sap.ui.getCore().createRenderManager();r.openStart("div").class("sapUiSupportToolbar").openEnd();r.openStart("button",this.getId()+"-record").class("sapUiSupportIntToggleRecordingBtn").openEnd().close("button");r.openStart("label").class("sapUiSupportIntODataLbl").openEnd();r.voidStart("input",this.getId()+"-odata").attr("type","checkbox").voidEnd();r.text("Enable OData Statistics");r.close("label");r.openStart("div").class("sapUiSupportIntFupInputMask").openEnd();r.voidStart("input",this.getId()+"-fileImport").attr("tabindex","-1").attr("size","1").attr("accept","application/zip").attr("type","file").voidEnd();r.close("div");r.openStart("button",this.getId()+"-import").class("sapUiSupportIntImportExportBtn").class("sapUiSupportIntImportBtn").class("sapUiSupportRoundedButton").openEnd().text("Import").close("button");r.openStart("button",this.getId()+"-export").class("sapUiSupportIntImportExportBtn").class("sapUiSupportIntExportBtn").class("sapUiSupportRoundedButton").class("sapUiSupportIntHidden").openEnd().text("Export").close("button");r.openStart("span",this.getId()+"-info").class("sapUiSupportIntRecordingInfo").openEnd().close("span");r.close("div");r.openStart("div").class("sapUiSupportInteractionCntnt").openEnd();r.close("div");r.openStart("div").class("sapUiPerformanceStatsDiv").class("sapUiSupportIntHidden").openEnd();r.openStart("div").class("sapUiPerformanceTimeline").openEnd().close("div");r.openStart("div").class("sapUiPerformanceTop").openEnd();r.close("div");r.openStart("div").class("sapUiPerformanceBottom").openEnd();r.close("div");r.close("div");r.flush(this.dom());r.destroy();r=sap.ui.getCore().createRenderManager();this._oTimelineOverview.render(r);r.flush(this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTimeline"));r.destroy();r=sap.ui.getCore().createRenderManager();this._oInteractionSlider.render(r);r.flush(this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTop"));r.destroy();this._oInteractionSlider._registerEventListeners();this.$().find(".sapUiPerformanceTop").on("InteractionSliderChange",{},function(t,e,r){this._oInteractionTree.setRange(e,r)}.bind(this));this.dom("export").addEventListener("click",function(t){this.onsapUiSupportInteractionExport()}.bind(this));this.dom("fileImport").addEventListener("change",function(t){this.onsapUiSupportInteractionImport()}.bind(this));this.dom("odata").checked=this._bODATA_Stats_On;this.dom("odata").addEventListener("click",function(e){t.sap.statistics(!t.sap.statistics())});this.dom("record").dataset.state=!this._bFesrActive?"Start recording":"Stop recording";this.dom("record").addEventListener("click",function(t){var e=this.dom("record");if(e.dataset.state==="Stop recording"){this._oStub.sendEvent(this.getId()+"Refresh");this._oStub.sendEvent(this.getId()+"Activate",{active:false});e.dataset.state="Start recording";this._showPerfData()}else if(this.dom("record").dataset.state==="Start recording"){this._hidePerfData();this._oStub.sendEvent(this.getId()+"Clear");this._oStub.sendEvent(this.getId()+"Activate",{active:true});e.dataset.state="Stop recording"}}.bind(this))}function h(e){var r=/sap-ui-xx-fesr=(true|x|X)/.test(window.location.search);var i=t.sap.statistics()||/sap-statistics=(true|x|X)/.test(window.location.search);this._oStub.sendEvent(this.getId()+"SetQueryString",{queryString:{bFesrActive:r,bODATA_Stats_On:i}});l.call(this)}function l(t,e){var r=p.getActive()||this._bFesrActive;var i=[];if(r||e){i=e||p.getAll(true);var n=window.performance.timing.fetchStart;for(var s=0;s<i.length;s++){var o=i[s];for(var a=0;a<o.requests.length;a++){var c=o.requests[a];o.requests[a]={connectEnd:c.connectEnd,connectStart:c.connectStart,domainLookupEnd:c.domainLookupEnd,domainLookupStart:c.domainLookupStart,duration:c.duration,entryType:c.entryType,fetchStart:c.fetchStart,initiatorType:c.initiatorType,name:c.name,redirectEnd:c.redirectEnd,redirectStart:c.redirectStart,requestStart:c.requestStart,responseEnd:c.responseEnd,responseStart:c.responseStart,secureConnectionStart:c.secureConnectionStart,startTime:c.startTime,workerStart:c.workerStart,fetchStartOffset:n}}}}this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:i});this._oStub.sendEvent(this.getId()+"SetActive",{active:r})}d.prototype.onsapUiSupportInteractionSetQueryString=function(t){var e=t.getParameter("queryString");this._bFesrActive=e.bFesrActive;this._bODATA_Stats_On=e.bODATA_Stats_On;this.dom("odata").checked=this._bODATA_Stats_On;this.dom("record").dataset.state=!this._bFesrActive?"Start recording":"Stop recording"};d.prototype.onsapUiSupportInteractionSetMeasurements=function(t){this._setMeasurementsData(t.getParameter("measurements"))};d.prototype.onsapUiSupportInteractionSetActive=function(t){};d.prototype.onsapUiSupportInteractionRefresh=function(t){l.call(this)};d.prototype.onsapUiSupportInteractionClear=function(t){p.clear();this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:[]})};d.prototype.onsapUiSupportInteractionStart=function(t){c.start(this.getId()+"-perf","Measurement by support tool")};d.prototype.onsapUiSupportInteractionEnd=function(t){d.end(true)};d.prototype.onsapUiSupportInteractionActivate=function(t){var e=t.getParameter("active");if(p.getActive()!=e){p.setActive(e)}};d.prototype.onsapUiSupportInteractionExport=function(t){var e=this.measurements||[];if(e.length>0){var r=new o;r.file("InteractionsSteps.json",JSON.stringify(e).replace(/,"isExpanded":true/g,""));var i=r.generate({type:"blob"});this._openGeneratedFile(i)}};d.prototype.onsapUiSupportInteractionImport=function(t){var e=this.dom("fileImport").files;if(e.length===0){s.show("Select a file for import first!",{autoClose:true,duration:3e3});return}if(!window.FileReader){s.show("Use a modern browser which supports FileReader!",{autoClose:true,duration:3e3});return}var r=new window.FileReader,i=e[0],n=this;r.onload=function(t){return function(t){var e=new o(t.target.result);var r=e.files["InteractionsSteps.json"]&&e.files["InteractionsSteps.json"].asText();if(r){n._setMeasurementsData(JSON.parse(r.replace(/,"isExpanded":true/g,"")))}else{s.show("Imported data does not contain interaction measures",{autoClose:true,duration:3e3})}}}(i);r.readAsArrayBuffer(i)};d.prototype._openGeneratedFile=function(t){a.save(t,"InteractionSteps","zip","application/zip")};d.prototype._setMeasurementsData=function(t){var e=0,r=100,i=function(t){var e=function(t,e){var r=0;if(t.length===0){return r}for(var i=t.length-1;i>=0;i--){if(t[i].startTime<e.startTime){r=i+1;break}}return r},i=function(t,e){return t.filter(function(t){return t.timing.startTime===e})},n=function(t,e){var r=0;if(t.length===0){return r}for(var i=t.length-1;i>=0;i--){if(t[i].start<e.fetchStartOffset+e.startTime){r=i;break}}return r},s=0;t.forEach(function(t,o,a){var p=t.requests;for(var c=p.length-1;c>=0;c--){var d=p[c];if(o>0&&t.start-r>d.fetchStartOffset+d.startTime){var u=n(a,d);var h=a[u].requests;s=e(h,d);h.splice(s,0,d);p.splice(c,1);var l=i(t.sapStatistics,d.startTime);if(l.length>0){a[u].sapStatistics=a[u].sapStatistics.concat(l)}}}})};i(t);this.measurements=t;for(var n=0;n<t.length;n++){e+=t[n].requests.length}if(t.length>0){this._showPerfData();this.dom("info").textContent="Total "+e+" Requests in "+t.length+" Interactions"}else{this._hidePerfData();this.dom("info").textContent=""}var s=this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTimeline");var o=sap.ui.getCore().createRenderManager();this._oTimelineOverview.setInteractions(t);this._oTimelineOverview.render(o);o.flush(s);o.destroy();this._oInteractionSlider._initSlider();this._oInteractionSlider.setDuration(t);var a=this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceBottom");this._oInteractionTree.setInteractions(t);this._oInteractionTree.renderAt(a)};d.prototype._showPerfData=function(){this.dom(".sapUiPerformanceStatsDiv").classList.remove("sapUiSupportIntHidden");this.dom("export").classList.remove("sapUiSupportIntHidden")};d.prototype._hidePerfData=function(){this.dom(".sapUiPerformanceStatsDiv").classList.add("sapUiSupportIntHidden");this.dom("export").classList.add("sapUiSupportIntHidden")};return d});