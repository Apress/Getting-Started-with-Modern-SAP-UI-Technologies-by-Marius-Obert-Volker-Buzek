/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/chart/coloring/ColoringUtils","sap/chart/ChartLog","sap/chart/data/TimeDimension","sap/chart/coloring/CriticalityType","sap/ui/thirdparty/jquery"],function(e,i,r,a,t){"use strict";var n={};var s=function(r,a,n,s){var l=t.extend({},s);l.bHasOtherSeriesDim=e.hasOtherSeriesDim(a[0],n);l.type="Criticality";l.subType="DimensionValues";e.checkColoringDimension(a,n,r,l);var o=r[a[0]],u=Object.keys(o),c=e.find(a[0],n.aDim),y=c.getRole()==="series"?true:false;u.forEach(function(e){var r=o[e].Values,a=o[e].Legend;r=Array.isArray(r)?r:[r];if(r.length>1&&!a){throw new i("error","Colorings.Criticality.DimensionValues","Legend is mandatory when one criticality type has multiple values.")}if((y||s.bIsPie)&&r.length>1){throw new i("error","Colorings.Criticality.DimensionValues","Criticality on Series Dimension, only single value could be assigned to each CriticalityType.")}})};n.qualify=function(e,i,r,a){s(e,i,r,a);var t=i[0],n;if(t){n={dim:t,setting:e}}return n};n.parse=function(e,i,r,n,s){var l={},o={},u=e.dim,c=[],y=e.setting[u],g=[];t.each(y,function(e,i){var r=!Array.isArray(i)?[i]:i;if(e!==a.Neutral){l[e]=r.map(function(e){return Array.isArray(e.Values)?e.Values:[e.Values]});c=Array.prototype.concat.apply(c,l[e])}o[e]=r.map(function(e){var i=Array.isArray(e.Values)?e.Values[0]:e.Values;var r=e.Legend!=null?e.Legend:i;return r})});if(y.Neutral){g=Array.isArray(y.Neutral.Values)?y.Neutral.Values:[y.Neutral.Values]}var f=function(e){return c.indexOf(e[u])===-1};function p(e){return function(i){return e.indexOf(i[u])!==-1}}var d={Negative:(l.Negative||[]).map(p),Critical:(l.Critical||[]).map(p),Positive:(l.Positive||[]).map(p),Neutral:[f]};return{callbacks:d,legend:o,aCriticalityValues:c.concat(g),status:r}};n.getContextHandler=function(e,r,a){var t=e.dim,n=e.parsed.aCriticalityValues;return function(s){var l=s.getProperty(t),o=this.getDimensionByName(t);if(n.indexOf(l)===-1){if(o._getFixedRole()==="series"||a.bIsPie){var u=new i("error","Colorings.Criticality.DimensionValues","Criticality on Series Dimension, all series must be applied coloring.");e.chartLog=u}else{e.parsed.legend.Neutral=r.getText("COLORING_TYPE_OTHER")}}}};return n});