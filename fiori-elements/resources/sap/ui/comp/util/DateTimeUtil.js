/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/date/UI5Date","sap/ui/core/format/TimezoneUtil","sap/ui/core/Configuration"],function(e,t,n){"use strict";var i=/^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/,o=n.getTimezone();var r={localToUtc:function(t){var n,i="0",o=t.getFullYear().toString().padStart(4,i)+"-"+(t.getMonth()+1).toString().padStart(2,i)+"-"+t.getDate().toString().padStart(2,i)+"T00:00:00.000Z";n=e.getInstance(o);n.setUTCHours(t.getHours());n.setUTCMinutes(t.getMinutes());n.setUTCSeconds(t.getSeconds());n.setUTCMilliseconds(t.getMilliseconds());return n},utcToLocal:function(t){var n,i="0",o=t.getUTCFullYear().toString().padStart(4,i)+"-"+(t.getUTCMonth()+1).toString().padStart(2,i)+"-"+t.getUTCDate().toString().padStart(2,i)+"T00:00:00.000";n=e.getInstance(o);n.setHours(t.getUTCHours());n.setMinutes(t.getUTCMinutes());n.setSeconds(t.getUTCSeconds());n.setMilliseconds(t.getUTCMilliseconds());return n},dateToEdmTime:function(e){return{__edmType:"Edm.Time",ms:e.valueOf()}},edmTimeToDate:function(t){return e.getInstance(t.ms)},adaptPrecision:function(t,n){var i=t.getMilliseconds(),o;if(isNaN(n)||n>=3||i===0){return t}if(n===0){i=0}else if(n===1){i=Math.floor(i/100)*100}else if(n===2){i=Math.floor(i/10)*10}o=e.getInstance(t);o.setMilliseconds(i);return o},isDate:function(e,t){if(t){return e.getUTCHours()===0&&e.getUTCMinutes()===0&&e.getUTCSeconds()===0&&e.getUTCMilliseconds()===0}else{return e.getHours()===0&&e.getMinutes()===0&&e.getSeconds()===0&&e.getMilliseconds()===0}},normalizeDate:function(t,n){var i;if(this.isDate(t,n)){return t}i=e.getInstance(t);if(n){i.setUTCHours(0,0,0,0)}else{i.setHours(0,0,0,0)}return i},toTimezone:function(n,i){if(!(n instanceof Date)){n=e.getInstance(n)}if(t.isValidTimezone(i)){return t.convertToTimezone(n,i)}return n},localToUiTimezone:function(t){var n=e.getInstance(t.toLocaleString("en-US",{timeZone:o}));var i=t.getTime()-n.getTime();return e.getInstance(t.getTime()-i)},uiTimezoneToLocal:function(t){if(!(t instanceof Date)){t=e.getInstance(t)}var n=e.getInstance(t.toLocaleString("en-US",{timeZone:o}));var i=n.getTime()-t.getTime();return e.getInstance(t.getTime()-i)},uiTimezoneToUtc:function(t){var n=e.getInstance(t.toLocaleString("en-US",{timeZone:"UTC"}));var i=e.getInstance(t.toLocaleString("en-US",{timeZone:o}));var r=i.getTime()-n.getTime();return e.getInstance(t.getTime()-r)},localToTimezone:function(n,i){if(!t.isValidTimezone(i)){return n}var r=e.getInstance(n.toLocaleString("en-US",{timeZone:i}));var a=e.getInstance(n.toLocaleString("en-US",{timeZone:o}));var s=a.getTime()-r.getTime();return e.getInstance(n.getTime()-s)},_parseJsonDateString:function(t){var n=t&&i.exec(t);if(n){var o=e.getInstance(parseInt(n[1]));if(n[2]){var r=parseInt(n[3]);if(n[2]==="-"){r=-r}var a=o.getUTCMinutes();o.setUTCMinutes(a-r);o.__edmType="Edm.DateTimeOffset"}if(!isNaN(o.valueOf())){return o}}},_hasJsonDateString:function(e){return i.test(e)}};return r});