/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/esh/search/ui/eventlogging/EventConsumer","sap/esh/search/ui/suggestions/SuggestionType","../sinaNexTS/providers/abap_odata/UserEventLogger"],function(e,t,r){function n(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function o(e,t,r){if(t)a(e.prototype,t);if(r)a(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function c(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)i(e,t)}function i(e,t){i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,r){t.__proto__=r;return t};return i(e,t)}function s(e){var t=f();return function r(){var n=h(e),a;if(t){var o=h(this).constructor;a=Reflect.construct(n,arguments,o)}else{a=n.apply(this,arguments)}return u(this,a)}}function u(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return l(e)}function l(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function f(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function h(e){h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function e(t){return t.__proto__||Object.getPrototypeOf(t)};return h(e)}function g(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}var p=t["SuggestionType"];var y=r["UserEventType"];var S=function(e){c(r,e);var t=s(r);function r(){var e;n(this,r);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++){o[c]=arguments[c]}e=t.call.apply(t,[this].concat(o));g(l(e),"actionPrefix","Search: ");return e}o(r,[{key:"init",value:function e(t){}},{key:"logEvent",value:function e(t){if(!this.analytics){return}switch(t.type){case y.RESULT_LIST_ITEM_NAVIGATE:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Launch Object",[t.targetUrl]);break;case y.SUGGESTION_SELECT:switch(t.suggestionType){case p.App:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Suggestion Select App",[t.suggestionTitle,t.targetUrl,t.searchTerm]);this.analytics.logCustomEvent("".concat(this.actionPrefix,"Application Launch point"),"Search Suggestions",[t.suggestionTitle,t.targetUrl,t.searchTerm]);break;case p.DataSource:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Suggestion Select Datasource",[t.dataSourceKey,t.searchTerm]);break;case p.Object:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Suggestion Select Object Data",[t.suggestionTerm,t.dataSourceKey,t.searchTerm]);break;case p.Recent:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Suggestion Select Object Data",[t.suggestionTerm,t.dataSourceKey,t.searchTerm]);break}break;case y.SEARCH_REQUEST:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Search",[t.searchTerm,t.dataSourceKey]);break;case y.RESULT_LIST_ITEM_NAVIGATE_CONTEXT:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Launch Related Object",[t.targetUrl]);break;case y.SUGGESTION_REQUEST:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Suggestion",[t.suggestionTerm,t.dataSourceKey]);break;case y.TILE_NAVIGATE:this.analytics.logCustomEvent("".concat(this.actionPrefix,"Search"),"Launch App",[t.tileTitle,t.targetUrl]);this.analytics.logCustomEvent("".concat(this.actionPrefix,"Application Launch point"),"Search Results",[t.titleTitle,t.targetUrl]);break}}}]);return r}(e);return S})})();