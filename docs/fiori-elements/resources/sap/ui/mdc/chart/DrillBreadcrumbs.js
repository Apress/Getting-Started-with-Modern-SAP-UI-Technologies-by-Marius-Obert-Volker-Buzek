/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Breadcrumbs","sap/m/Link"],function(e,t){"use strict";var i=e.extend("sap.ui.mdc.chart.DrillBreadcrumbs",{renderer:{apiVersion:2}});i.prototype.init=function(){e.prototype.init.apply(this,arguments);this.addStyleClass("sapUiMDCChartBreadcrumbs")};i.prototype.updateDrillBreadcrumbs=function(e,t){var i=[];if(t){t.reverse();if(t.length>0){t.forEach(function(t,r,s){this.setVisible(true);var n=t.getLabel();var a=t.getName();if(r==0){this.setCurrentLocationText(n)}else{var o={dimensionKey:a,dimensionText:n};var l=this._createCrumb(e,o);i.push(l)}},this)}else{this.setVisible(false)}}var r=this.getLinks();i.reverse();var s=false;if(r.length!==i.length){s=true}else{for(var n=0;n<i.length;n++){if(i[n].getText()!=r[n].getText()){s=true;break}}}if(s){if(this.getLinks()){this.destroyLinks()}for(var n=0;n<i.length;n++){this.addLink(i[n])}}return this};i.prototype._createCrumb=function(e,i){var r=new t({text:i.dimensionText,press:function t(i){var r=this.indexOfLink(i.getSource());var s=e.getControlDelegate().getDrillableItems(e),n=s.slice(r+1);var a=n.map(function(e){return{name:e.getName(),visible:false}});e.getEngine().createChanges({control:e,key:"Item",state:a})}.bind(this)});r.data("key",i.dimensionKey);return r};return i});