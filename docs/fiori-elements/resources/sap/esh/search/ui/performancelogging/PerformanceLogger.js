/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define([],function(){function e(e,r){var n=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=t(e))||r&&e&&typeof e.length==="number"){if(n)e=n;var a=0;var o=function(){};return{s:o,n:function(){if(a>=e.length)return{done:true};return{done:false,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i=true,u=false,f;return{s:function(){n=n.call(e)},n:function(){var e=n.next();i=e.done;return e},e:function(e){u=true;f=e},f:function(){try{if(!i&&n.return!=null)n.return()}finally{if(u)throw f}}}}function t(e,t){if(!e)return;if(typeof e==="string")return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor)n=e.constructor.name;if(n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}function r(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function n(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function o(e,t,r){if(t)a(e.prototype,t);if(r)a(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}var i=function(){function t(){n(this,t);this.performanceLog=[];this.performanceLogStartDate=new Date}o(t,[{key:"getUniqueId",value:function e(){return(new Date).getTime()}},{key:"enterMethod",value:function e(t,r){this.performanceLog.push({step:t.name,parameterBag:r,startDate:new Date,endDate:null,time:null})}},{key:"leaveMethod",value:function t(r){var n=e(this.performanceLog),a;try{for(n.s();!(a=n.n()).done;){var o=a.value;if(o.step===r.name){o.endDate=new Date;o.time=o.endDate.getTime()-o.startDate.getTime()}}}catch(e){n.e(e)}finally{n.f()}}},{key:"printLogToBrowserConsole",value:function e(){console.table(this.getLogSummary())}},{key:"getLogSummary",value:function e(){var t=this;return this.performanceLog.map(function(e){return{step:e.step,secFromStart:Math.round((e.startDate.getTime()-t.performanceLogStartDate.getTime())/100)/10,msecTotal:e.time,comments:e.parameterBag&&e.parameterBag.comments?e.parameterBag.comments:"-"}})}},{key:"clearPerformanceLog",value:function e(){this.performanceLogStartDate=new Date;this.performanceLog=[]}}]);return t}();return i})})();