/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};var t="";var r;var n={_oCache:new Map,_iCacheLimit:10,get:function(e){var t=this._oCache.get(e);if(t){return t}var r={hourCycle:"h23",hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3,day:"2-digit",month:"2-digit",year:"numeric",timeZone:e,timeZoneName:"short",era:"narrow",weekday:"short"};var n=new Intl.DateTimeFormat("en-US",r);if(this._oCache.size===this._iCacheLimit){this._oCache=new Map}this._oCache.set(e,n);return n}};e.isValidTimezone=function(e){if(!e){return false}if(Intl.supportedValuesOf){try{r=r||Intl.supportedValuesOf("timeZone");if(r.includes(e)){return true}}catch(e){r=[]}}try{n.get(e);return true}catch(e){return false}};e.convertToTimezone=function(t,r){var n=this._getParts(t,r);return e._getDateFromParts(n)};e._getParts=function(e,t){var r,i,a=Object.create(null),o=n.get(t),s=o.formatToParts(new Date(e.getTime()));for(r in s){i=s[r];if(i.type!=="literal"){a[i.type]=i.value}}return a};e._getDateFromParts=function(e){var t=new Date(0),r=parseInt(e.year);if(e.era==="B"){r=r*-1+1}t.setUTCFullYear(r,parseInt(e.month)-1,parseInt(e.day));t.setUTCHours(parseInt(e.hour),parseInt(e.minute),parseInt(e.second),parseInt(e.fractionalSecond||0));return t};e.calculateOffset=function(e,t){var r=this.convertToTimezone(e,t),n=e.getTime()-r.getTime(),i=new Date(e.getTime()+n),a=this.convertToTimezone(i,t);return(i.getTime()-a.getTime())/1e3};e.getLocalTimezone=function(){if(t){return t}t=(new Intl.DateTimeFormat).resolvedOptions().timeZone;return t};return e});