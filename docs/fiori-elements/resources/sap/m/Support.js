/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Device","sap/base/security/encodeXML","sap/base/util/isPlainObject"],function(e,t,o,n){"use strict";var a,r,i,s,u,l,c,p;var d=function(f,b){var h,g,m,v,L=0,S=3e3,U=2,T=3,y=1,E={},w={btnStart:"startE2ETrace",selLevel:"logLevelE2ETrace",taContent:"outputE2ETrace",infoText:"Ent-to-End trace is running in the background."+" Navigate to the URL that you would like to trace."+" The result of the trace will be shown in dialog after the trace is terminated.",infoDuration:5e3},M={dvLoadedLibs:"LoadedLibs",dvLoadedModules:"LoadedModules"};function I(e,t,n,a,r){e.push("<tr class='sapUiSelectable'><td class='sapUiSupportTechInfoBorder sapUiSelectable'><label class='sapUiSupportLabel sapUiSelectable'>",o(a),"</label><br>");var i=r;if(typeof r==="function"){i=r(e)||""}e.push(o(i));e.push("</td></tr>")}function x(t,o,a,r,i){I(t,o,a,r,function(t){t.push("<table class='sapMSupportTable' border='0' cellspacing='5' cellpadding='5' width='100%'><tbody>");e.each(i,function(e,o){var a="";if(o!==undefined&&o!==null){if(typeof o=="string"||typeof o=="boolean"||Array.isArray(o)&&o.length==1){a=o}else if(Array.isArray(o)||n(o)){a=JSON.stringify(o)}}I(t,false,false,e,""+a)});t.push("</tbody></table>")})}function A(t){E={version:t.commonInformation.version,build:t.commonInformation.buildTime,change:t.commonInformation.lastChange,useragent:t.commonInformation.userAgent,docmode:t.commonInformation.documentMode,debug:t.commonInformation.debugMode,bootconfig:t.configurationBootstrap,config:t.configurationComputed,loadedlibs:t.loadedLibraries,modules:t.loadedModules,uriparams:t.URLParameters,appurl:t.commonInformation.applicationHREF};var o=["<table class='sapUiSelectable' border='0' cellspacing='5' cellpadding='5' width='100%'><tbody class='sapUiSelectable'>"];I(o,true,true,"SAPUI5 Version",function(e){e.push(E.version," (built at ",E.build,", last change ",E.change,")")});I(o,true,true,"User Agent",function(e){e.push(E.useragent,E.docmode?", Document Mode '"+E.docmode+"'":"")});I(o,true,true,"Debug Sources",function(e){e.push(E.debug?"ON":"OFF")});I(o,true,true,"Application",E.appurl);x(o,true,true,"Configuration (bootstrap)",E.bootconfig);x(o,true,true,"Configuration (computed)",E.config);x(o,true,true,"URI Parameters",E.uriparams);I(o,true,true,"End-to-End Trace",function(e){e.push("<label class='sapUiSupportLabel'>Trace Level:</label>","<select id='"+C(w.selLevel)+"' class='sapUiSupportTxtFld' >","<option value='low'>LOW</option>","<option value='medium' selected>MEDIUM</option>","<option value='high'>HIGH</option>","</select>");e.push("<button id='"+C(w.btnStart)+"' class='sapUiSupportBtn'>Start</button>");e.push("<div class='sapUiSupportDiv'>");e.push("<label class='sapUiSupportLabel'>XML Output:</label>");e.push("<textarea id='"+C(w.taContent)+"' class='sapUiSupportTxtArea sapUiSelectable' readonly ></textarea>");e.push("</div>")});I(o,true,true,"Loaded Libraries",function(t){t.push("<ul class='sapUiSelectable'>");e.each(E.loadedlibs,function(e,o){if(o&&(typeof o==="string"||typeof o==="boolean")){t.push("<li class='sapUiSelectable'>",e+" "+o,"</li>")}});t.push("</ul>")});I(o,true,true,"Loaded Modules",function(e){e.push("<div class='sapUiSupportDiv sapUiSelectable' id='"+C(M.dvLoadedModules)+"'></div>")});o.push("</tbody></table>");return new c({content:o.join("").replace(/\{/g,"&#123;").replace(/\}/g,"&#125;")})}function C(e){return h.getId()+"-"+e}function D(t,o){var n="Modules";var a=0,r=[];a=o.length;e.each(o.sort(),function(e,t){r.push(new i({text:" - "+t}).addStyleClass("sapUiSupportPnlLbl"))});var l=new s({expandable:true,expanded:false,headerToolbar:new u({design:p.ToolbarDesign.Transparent,content:[new i({text:n+" ("+a+")",design:p.LabelDesign.Bold})]}),content:r});l.placeAt(C(t),"only")}function O(e){if(h.traceXml){h.$(w.taContent).text(h.traceXml)}if(h.e2eLogLevel){h.$(w.selLevel).val(h.e2eLogLevel)}D(M.dvLoadedModules,E.modules);h.$(w.btnStart).one("tap",function(){h.e2eLogLevel=h.$(w.selLevel).val();h.$(w.btnStart).addClass("sapUiSupportRunningTrace").text("Running...");h.traceXml="";h.$(w.taContent).text("");e.start(h.e2eLogLevel,function(e){h.traceXml=e});l.show(w.infoText,{duration:w.infoDuration});h.close()})}function P(){if(h){return h}h=new r({title:"Technical Information",horizontalScrolling:true,verticalScrolling:true,stretch:t.system.phone,buttons:[new a({text:"Close",press:function(){h.close()}})],afterOpen:function(){d.off()},afterClose:function(){d.on()}}).addStyleClass("sapMSupport");return h}function R(e){if(e.touches){var t=e.touches.length;if(t>T){b.removeEventListener("touchend",X);return}switch(t){case U:g=Date.now();b.addEventListener("touchend",X);break;case T:if(g){L=Date.now()-g;v=e.touches[t-1].identifier}break}}}function X(e){b.removeEventListener("touchend",X);if(L>S&&e.touches.length===U&&e.changedTouches.length===y&&e.changedTouches[0].identifier===v){L=0;g=0;$()}}function $(){sap.ui.require(["sap/ui/core/support/ToolsAPI","sap/ui/core/support/trace/E2eTraceLib","sap/ui/core/HTML","sap/m/library","sap/m/Button","sap/m/Dialog","sap/m/Label","sap/m/Panel","sap/m/Toolbar","sap/m/MessageToast"],function(e,t,o,n,d,f,b,g,m,v){c=o;p=n;a=d;r=f;i=b;s=g;u=m;l=v;var L=P();L.removeAllAggregation("content");L.addAggregation("content",A(e.getFrameworkInformation()));h.open();O(t)})}return{on:function(){if(!m&&"ontouchstart"in b){m=true;b.addEventListener("touchstart",R)}return this},off:function(){if(m){m=false;b.removeEventListener("touchstart",R)}return this},open:function(){$()},isEventRegistered:function(){return m}}.on()}(e,document);return d},true);