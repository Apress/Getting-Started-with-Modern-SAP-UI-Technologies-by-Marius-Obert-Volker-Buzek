/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./UniversalDate","../CalendarType","./_Calendars"],function(t,e,r){"use strict";var n=t.extend("sap.ui.core.date.Persian",{constructor:function(){var t=arguments;if(t.length>1){t=s(t)}this.oDate=this.createDate(Date,t);this.sCalendarType=e.Persian}});n.UTC=function(){var t=s(arguments);return Date.UTC.apply(Date,t)};n.now=function(){return Date.now()};var a=1300;function i(t){var e=f(t.year,t.month+1,t.day);return h(e)}function o(t){var e=y(t.year,t.month+1,t.day);return p(e)}function s(t){var e=Array.prototype.slice.call(t),r,n;if(typeof t[0]!=="number"||typeof t[1]!=="number"||t[2]!==undefined&&typeof t[2]!="number"){e[0]=NaN;e[1]=NaN;e[2]=NaN;return e}r={year:t[0],month:t[1],day:t[2]!==undefined?t[2]:1};n=o(r);e[0]=n.year;e[1]=n.month;e[2]=n.day;return e}function u(t){var e=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178],r=e.length,n=t+621,a=-14,i=e[0],o,s,u,y,h,f,p;for(p=1;p<r;p+=1){o=e[p];s=o-i;if(t<o){break}a=a+c(s,33)*8+c(d(s,33),4);i=o}f=t-i;a=a+c(f,33)*8+c(d(f,33)+3,4);if(d(s,33)===4&&s-f===4){a+=1}y=c(n,4)-c((c(n,100)+1)*3,4)-150;h=20+a-y;if(s-f<6){f=f-s+c(s+4,33)*33}u=d(d(f+1,33)-1,4);if(u===-1){u=4}return{leap:u,gy:n,march:h}}function y(t,e,r){while(e<1){e+=12;t--}while(e>12){e-=12;t++}var n=u(t);return f(n.gy,3,n.march)+(e-1)*31-c(e,7)*(e-7)+r-1}function h(t){var e=p(t).year,r=e-621,n=u(r),a=f(e,3,n.march),i,o,s;s=t-a;if(s>=0){if(s<=185){o=1+c(s,31);i=d(s,31)+1;return{year:r,month:o-1,day:i}}else{s-=186}}else{r-=1;s+=179;if(n.leap===1){s+=1}}o=7+c(s,30);i=d(s,30)+1;return{year:r,month:o-1,day:i}}function f(t,e,r){var n=c((t+c(e-8,6)+100100)*1461,4)+c(153*d(e+9,12)+2,5)+r-34840408;n=n-c(c(t+100100+c(e-8,6),100)*3,4)+752;return n}function p(t){var e,r,n,a,i;e=4*t+139361631;e=e+c(c(4*t+183187720,146097)*3,4)*4-3908;r=c(d(e,1461),4)*5+308;n=c(d(r,153),5)+1;a=d(c(r,153),12)+1;i=c(e,1461)-100100+c(8-a,6);return{year:i,month:a-1,day:n}}function c(t,e){return~~(t/e)}function d(t,e){return t-~~(t/e)*e}n.prototype._getPersian=function(){return i({day:this.oDate.getDate(),month:this.oDate.getMonth(),year:this.oDate.getFullYear()})};n.prototype._setPersian=function(t){var e=o(t);return this.oDate.setFullYear(e.year,e.month,e.day)};n.prototype._getUTCPersian=function(){return i({day:this.oDate.getUTCDate(),month:this.oDate.getUTCMonth(),year:this.oDate.getUTCFullYear()})};n.prototype._setUTCPersian=function(t){var e=o(t);return this.oDate.setUTCFullYear(e.year,e.month,e.day)};n.prototype.getDate=function(t){return this._getPersian().day};n.prototype.getMonth=function(){return this._getPersian().month};n.prototype.getYear=function(){return this._getPersian().year-a};n.prototype.getFullYear=function(){return this._getPersian().year};n.prototype.setDate=function(t){var e=this._getPersian();e.day=t;return this._setPersian(e)};n.prototype.setMonth=function(t,e){var r=this._getPersian();r.month=t;if(e!==undefined){r.day=e}return this._setPersian(r)};n.prototype.setYear=function(t){var e=this._getPersian();e.year=t+a;return this._setPersian(e)};n.prototype.setFullYear=function(t,e,r){var n=this._getPersian();n.year=t;if(e!==undefined){n.month=e}if(r!==undefined){n.day=r}return this._setPersian(n)};n.prototype.getUTCDate=function(t){return this._getUTCPersian().day};n.prototype.getUTCMonth=function(){return this._getUTCPersian().month};n.prototype.getUTCFullYear=function(){return this._getUTCPersian().year};n.prototype.setUTCDate=function(t){var e=this._getUTCPersian();e.day=t;return this._setUTCPersian(e)};n.prototype.setUTCMonth=function(t,e){var r=this._getUTCPersian();r.month=t;if(e!==undefined){r.day=e}return this._setUTCPersian(r)};n.prototype.setUTCFullYear=function(t,e,r){var n=this._getUTCPersian();n.year=t;if(e!==undefined){n.month=e}if(r!==undefined){n.day=r}return this._setUTCPersian(n)};r.set(e.Persian,n);return n});