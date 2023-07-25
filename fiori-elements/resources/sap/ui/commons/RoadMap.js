/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","./RoadMapRenderer","sap/ui/core/ResizeHandler","sap/ui/Device"],function(e,t,i,s,r,n){"use strict";var o=i.extend("sap.ui.commons.RoadMap",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{numberOfVisibleSteps:{type:"int",group:"Misc",defaultValue:null},firstVisibleStep:{type:"string",group:"Misc",defaultValue:null},selectedStep:{type:"string",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}},defaultAggregation:"steps",aggregations:{steps:{type:"sap.ui.commons.RoadMapStep",multiple:true,singularName:"step"}},events:{stepSelected:{parameters:{stepId:{type:"string"}}},stepExpanded:{parameters:{stepId:{type:"string"}}}}}});(function(){o.prototype.init=function(){this.iStepWidth=-1;this.sCurrentFocusedStepRefId=null};o.prototype.exit=function(){if(this.sResizeListenerId){r.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};o.prototype.setNumberOfVisibleSteps=function(e){var t=this.getDomRef()?true:false;this.setProperty("numberOfVisibleSteps",e,t);if(t){s.updateScrollArea(this,true)}return this};o.prototype.setFirstVisibleStep=function(e){var t=this.getDomRef()?true:false;if(t){if(e){var i=sap.ui.getCore().byId(e);if(i&&i.getParent()&&(i.getParent()===this||i.getParent().getParent()===this)&&i.getVisible()){this.setProperty("firstVisibleStep",e,true);s.updateScrollArea(this)}}else{this.setProperty("firstVisibleStep","",true);s.updateScrollArea(this)}}else{this.setProperty("firstVisibleStep",e)}return this};o.prototype.setWidth=function(e){var t=this.getDomRef()?true:false;this.setProperty("width",e,t);if(t){s.setRoadMapWidth(this,e);s.updateScrollArea(this,true)}return this};o.prototype.setSelectedStep=function(e){var t=this.getDomRef()?true:false;if(t){if(e){var i=sap.ui.getCore().byId(e);if(i&&i.getParent()&&(i.getParent()===this||i.getParent().getParent()===this)&&i.getEnabled()&&i.getVisible()){s.selectStepWithId(this,e);this.setProperty("selectedStep",e,true)}}else{s.selectStepWithId(this,"");this.setProperty("selectedStep","",true)}}else{this.setProperty("selectedStep",e)}return this};o.prototype.onThemeChanged=function(e){this.iStepWidth=-1;if(this.getDomRef()){this.invalidate()}};o.prototype.doBeforeRendering=function(){var e=false;var t=false;var i=this.getSteps();for(var s=0;s<i.length;s++){var n=i[s];if(n.getSubSteps().length==0||!n.getEnabled()){n.setProperty("expanded",false,true)}if(!n.getEnabled()&&!n.getVisible()&&this.getSelectedStep()==n.getId()){this.setProperty("selectedStep","",true)}else if(n.getEnabled()&&n.getVisible()&&this.getSelectedStep()==n.getId()){e=true}if(n.getVisible()&&this.getFirstVisibleStep()==n.getId()){t=true}var o=n.getSubSteps();for(var p=0;p<o.length;p++){var a=o[p];a.setProperty("expanded",false,true);if(!a.getEnabled()&&!a.getVisible()&&this.getSelectedStep()==a.getId()){this.setProperty("selectedStep","",true)}else if(a.getEnabled()&&a.getVisible()&&this.getSelectedStep()==a.getId()){e=true}if(a.getVisible()&&this.getFirstVisibleStep()==a.getId()){t=true}}}if(!e){this.setProperty("selectedStep","",true)}if(!t){this.setProperty("firstVisibleStep","",true)}if(this.sResizeListenerId){r.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};o.prototype.onAfterRendering=function(){var t=this.getSteps();if(this.iStepWidth==-1&&t.length>0){var i=t[0].$();this.iStepWidth=i.outerWidth()}for(var n=0;n<t.length;n++){var o=t[n];s.addEllipses(o);var p=o.getSubSteps();for(var a=0;a<p.length;a++){s.addEllipses(p[a])}}s.updateScrollArea(this);this.sResizeListenerId=r.register(this.getDomRef(),e.proxy(this.onresize,this))};o.prototype.onresize=function(e){var t=function(){if(this.getDomRef()){s.updateScrollArea(this,true);a(this,"prev");this.sResizeInProgress=null}}.bind(this);if(n.browser.firefox){t()}else{if(!this.sResizeInProgress){this.sResizeInProgress=setTimeout(t,300)}}};o.prototype.onclick=function(e){t(this,e)};o.prototype.onsapselect=function(e){t(this,e)};o.prototype.onfocusin=function(t){var i=e(t.target);var r=i.attr("id");if(r&&r.endsWith("-box")){this.sCurrentFocusedStepRefId=r.slice(0,-4)}else if(r&&(r.endsWith("-Start")||r.endsWith("-End"))){}else{this.sCurrentFocusedStepRefId=s.getFirstVisibleRef(this).attr("id");a(this)}this.$().attr("tabindex","-1")};o.prototype.onfocusout=function(e){this.$().attr("tabindex","0")};o.prototype.onsapprevious=function(e){p(e,this,"prev")};o.prototype.onsapnext=function(e){p(e,this,"next")};o.prototype.onsaphome=function(e){p(e,this,"first")};o.prototype.onsapend=function(e){p(e,this,"last")};var t=function(t,s){s.stopPropagation();s.preventDefault();var r=e(s.target);var n=r.attr("id");if(!n){return}var o=n.lastIndexOf("-expandend");if(o!=-1){var p=sap.ui.getCore().byId(n.substring(0,o));if(p&&t.indexOfStep(p)>=0){p.handleSelect(s,true);return}}if(n==t.getId()+"-Start"){if(r.hasClass("sapUiRoadMapStartScroll")){i(t,"prev",true)}else{a(t)}}else if(n==t.getId()+"-End"){if(r.hasClass("sapUiRoadMapEndScroll")){i(t,"next",true)}else{a(t)}}};var i=function(e,t,i){s.scrollToNextStep(e,t,function(s){var r=s.lastIndexOf("-expandend");if(r!=-1){s=s.substring(0,r)}e.setProperty("firstVisibleStep",s,true);if(i){a(e,t)}})};var p=function(t,r,n){if(t){t.stopPropagation();t.preventDefault()}if(!r.sCurrentFocusedStepRefId){return}var o=n+"All";var p=false;if(n=="first"){o="prevAll";p=true}else if(n=="last"){o="nextAll";p=true}var a=e(document.getElementById(r.sCurrentFocusedStepRefId));var l=a[o](":visible");var u=e(l.get(p?l.length-1:0)).attr("id");if(u){if(!s.isVisibleRef(r,u)){i(r,n)}document.getElementById(u+"-box").focus()}};var a=function(e,t){if(!e.sCurrentFocusedStepRefId){return}if(t&&!s.isVisibleRef(e,e.sCurrentFocusedStepRefId)){p(null,e,t)}else{document.getElementById(e.sCurrentFocusedStepRefId+"-box").focus()}}})();return o});