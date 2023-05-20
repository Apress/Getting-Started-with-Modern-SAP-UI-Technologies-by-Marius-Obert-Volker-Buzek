/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["./ResultSet"],function(e){function t(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function n(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);Object.defineProperty(e,"prototype",{writable:false});return e}function o(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)u(e,t)}function u(e,t){u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,r){t.__proto__=r;return t};return u(e,t)}function i(e){var t=a();return function r(){var n=l(e),o;if(t){var u=l(this).constructor;o=Reflect.construct(n,arguments,u)}else{o=n.apply(this,arguments)}return c(this,o)}}function c(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return f(e)}function f(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function a(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function l(e){l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function e(t){return t.__proto__||Object.getPrototypeOf(t)};return l(e)}function s(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var p=e["ResultSet"];var y=function(e){o(u,e);var r=i(u);function u(e){var n,o,i,c;var a;t(this,u);a=r.call(this,e);s(f(a),"facets",[]);s(f(a),"nlqSuccess",false);s(f(a),"hierarchyNodePaths",[]);a.facets=(n=e.facets)!==null&&n!==void 0?n:a.facets;a.totalCount=(o=e.totalCount)!==null&&o!==void 0?o:a.totalCount;a.nlqSuccess=(i=e.nlqSuccess)!==null&&i!==void 0?i:a.nlqSuccess;a.hierarchyNodePaths=(c=e.hierarchyNodePaths)!==null&&c!==void 0?c:a.hierarchyNodePaths;return a}n(u,[{key:"toString",value:function e(){var t=[];for(var r=arguments.length,n=new Array(r),o=0;o<r;o++){n[o]=arguments[o]}t.push(p.prototype.toString.apply(this,n));for(var u=0;u<this.facets.length;++u){var i=this.facets[u];t.push(i.toString())}return t.join("\n")}}]);return u}(p);var h={__esModule:true};h.SearchResultSet=y;return h})})();