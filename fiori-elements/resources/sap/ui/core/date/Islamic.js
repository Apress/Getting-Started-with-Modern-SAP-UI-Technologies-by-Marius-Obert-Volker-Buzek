/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./UniversalDate","../CalendarType","sap/base/Log","./_Calendars","sap/ui/core/Configuration"],function(t,e,a,r,o){"use strict";var n=t.extend("sap.ui.core.date.Islamic",{constructor:function(){var t=arguments;if(t.length>1){t=p(t)}this.oDate=this.createDate(Date,t);this.sCalendarType=e.Islamic}});n.UTC=function(){var t=p(arguments);return Date.UTC.apply(Date,t)};n.now=function(){return Date.now()};var i=1400,s=1721425.5,f=1948439.5,h=-425215872e5,u=864e5;var l=null;var c=["A","B"];function y(t){var e=t.year,a=t.month,r=t.day,o,n,i,h,u,l,c;l=0;if(a+1>2){l=v(e)?-1:-2}c=s-1+365*(e-1)+Math.floor((e-1)/4)+-Math.floor((e-1)/100)+Math.floor((e-1)/400)+Math.floor((367*(a+1)-362)/12+l+r);c=Math.floor(c)+.5;u=c-f;h=Math.floor(u/29.530588853);if(h<0){o=Math.floor(h/12)+1;n=h%12;if(n<0){n+=12}i=u-I(o,n)+1}else{h++;while(M(h)>u){h--}o=Math.floor(h/12)+1;n=h%12;i=u-M(12*(o-1)+n)+1}return{day:i,month:n,year:o}}function m(t){var e=t.year,a=t.month,r=t.day,o=e<1?I(e,a):M(12*(e-1)+a),n=r+o+f-1,i=Math.floor(n-.5)+.5,h=i-s,u=Math.floor(h/146097),l=C(h,146097),c=Math.floor(l/36524),y=C(l,36524),m=Math.floor(y/1461),p=C(y,1461),g=Math.floor(p/365),d=u*400+c*100+m*4+g,T,D,_,U,F,Y,w,b;if(!(c==4||g==4)){d++}_=s+365*(d-1)+Math.floor((d-1)/4)-Math.floor((d-1)/100)+Math.floor((d-1)/400);U=i-_;F=s-1+365*(d-1)+Math.floor((d-1)/4)-Math.floor((d-1)/100)+Math.floor((d-1)/400)+Math.floor(739/12+(v(d)?-1:-2)+1);w=0;if(i<F){w=0}else{w=v(d)?1:2}T=Math.floor(((U+w)*12+373)/367);Y=s-1+365*(d-1)+Math.floor((d-1)/4)-Math.floor((d-1)/100)+Math.floor((d-1)/400);b=0;if(T>2){b=v(d)?-1:-2}Y+=Math.floor((367*T-362)/12+b+1);D=i-Y+1;return{day:D,month:T-1,year:d}}function p(t){var e=Array.prototype.slice.call(t),a,r;a={year:t[0],month:t[1],day:t[2]!==undefined?t[2]:1};r=m(a);e[0]=r.year;e[1]=r.month;e[2]=r.day;return e}function g(){var t,e;l={};t=o.getFormatSettings().getLegacyDateFormat();t=T(t)?t:"A";e=o.getFormatSettings().getLegacyDateCalendarCustomizing();e=e||[];if(!e.length){a.warning("No calendar customizations.");return}e.forEach(function(e){if(e.dateFormat===t){var a=d(e.gregDate);var r=new Date(Date.UTC(a.year,a.month-1,a.day));var o=r.getTime();var n=(o-h)/u;a=d(e.islamicMonthStart);var i=(a.year-1)*12+a.month-1;l[i]=n}});a.info("Working with date format: ["+t+"] and customization: "+JSON.stringify(e))}function d(t){return{year:parseInt(t.substr(0,4)),month:parseInt(t.substr(4,2)),day:parseInt(t.substr(6,2))}}function M(t){if(!l){g()}var e=l[t];if(!e){var a=Math.floor(t/12)+1;var r=t%12;e=I(a,r)}return e}function I(t,e){return Math.ceil(29.5*e)+(t-1)*354+Math.floor((3+11*t)/30)}function C(t,e){return t-e*Math.floor(t/e)}function v(t){return!(t%400)||!(t%4)&&!!(t%100)}function T(t){return c.indexOf(t)!==-1}n.prototype._getIslamic=function(){return y({day:this.oDate.getDate(),month:this.oDate.getMonth(),year:this.oDate.getFullYear()})};n.prototype._setIslamic=function(t){var e=m(t);return this.oDate.setFullYear(e.year,e.month,e.day)};n.prototype._getUTCIslamic=function(){return y({day:this.oDate.getUTCDate(),month:this.oDate.getUTCMonth(),year:this.oDate.getUTCFullYear()})};n.prototype._setUTCIslamic=function(t){var e=m(t);return this.oDate.setUTCFullYear(e.year,e.month,e.day)};n.prototype.getDate=function(t){return this._getIslamic().day};n.prototype.getMonth=function(){return this._getIslamic().month};n.prototype.getYear=function(){return this._getIslamic().year-i};n.prototype.getFullYear=function(){return this._getIslamic().year};n.prototype.setDate=function(t){var e=this._getIslamic();e.day=t;return this._setIslamic(e)};n.prototype.setMonth=function(t,e){var a=this._getIslamic();a.month=t;if(e!==undefined){a.day=e}return this._setIslamic(a)};n.prototype.setYear=function(t){var e=this._getIslamic();e.year=t+i;return this._setIslamic(e)};n.prototype.setFullYear=function(t,e,a){var r=this._getIslamic();r.year=t;if(e!==undefined){r.month=e}if(a!==undefined){r.day=a}return this._setIslamic(r)};n.prototype.getUTCDate=function(t){return this._getUTCIslamic().day};n.prototype.getUTCMonth=function(){return this._getUTCIslamic().month};n.prototype.getUTCFullYear=function(){return this._getUTCIslamic().year};n.prototype.setUTCDate=function(t){var e=this._getUTCIslamic();e.day=t;return this._setUTCIslamic(e)};n.prototype.setUTCMonth=function(t,e){var a=this._getUTCIslamic();a.month=t;if(e!==undefined){a.day=e}return this._setUTCIslamic(a)};n.prototype.setUTCFullYear=function(t,e,a){var r=this._getUTCIslamic();r.year=t;if(e!==undefined){r.month=e}if(a!==undefined){r.day=a}return this._setUTCIslamic(r)};r.set(e.Islamic,n);return n});