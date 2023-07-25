/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["./DataSource"],function(t){function e(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||false;a.configurable=true;if("value"in a)a.writable=true;Object.defineProperty(t,a.key,a)}}function r(t,r,a){if(r)e(t.prototype,r);if(a)e(t,a);Object.defineProperty(t,"prototype",{writable:false});return t}function a(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function o(t,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function")}t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:true,configurable:true}});Object.defineProperty(t,"prototype",{writable:false});if(e)n(t,e)}function n(t,e){n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function t(e,r){e.__proto__=r;return e};return n(t,e)}function i(t){var e=l();return function r(){var a=f(t),o;if(e){var n=f(this).constructor;o=Reflect.construct(a,arguments,n)}else{o=a.apply(this,arguments)}return u(this,o)}}function u(t,e){if(e&&(typeof e==="object"||typeof e==="function")){return e}else if(e!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return c(t)}function c(t){if(t===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t}function l(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(t){return false}}function f(t){f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function t(e){return e.__proto__||Object.getPrototypeOf(e)};return f(t)}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var d=t["DataSource"];var p=function(t){o(n,t);var e=i(n);function n(t){var r,o,i,u,c,l,f,d,p,s,y;var h;a(this,n);t.annotations=(r=t.annotations)!==null&&r!==void 0?r:t.dataSource.annotations;t.hidden=(o=t.hidden)!==null&&o!==void 0?o:t.dataSource.hidden;t.attributesMetadata=(i=t.attributesMetadata)!==null&&i!==void 0?i:t.dataSource.attributesMetadata;t.attributeMetadataMap=(u=t.attributeMetadataMap)!==null&&u!==void 0?u:t.dataSource.attributeMetadataMap;t.attributeGroupsMetadata=(c=t.attributeGroupsMetadata)!==null&&c!==void 0?c:t.dataSource.attributeGroupsMetadata;t.attributeGroupMetadataMap=(l=t.attributeGroupMetadataMap)!==null&&l!==void 0?l:t.dataSource.attributeGroupMetadataMap;t.isHierarchyDefinition=(f=t.isHierarchyDefinition)!==null&&f!==void 0?f:t.dataSource.isHierarchyDefinition;t.hierarchyName=(d=t.hierarchyName)!==null&&d!==void 0?d:t.dataSource.hierarchyName;t.hierarchyDisplayType=(p=t.hierarchyDisplayType)!==null&&p!==void 0?p:t.dataSource.hierarchyDisplayType;t.hierarchyAttribute=(s=t.hierarchyAttribute)!==null&&s!==void 0?s:t.dataSource.hierarchyAttribute;t.hierarchyHelperDatasource=(y=t.hierarchyHelperDatasource)!==null&&y!==void 0?y:t.dataSource.hierarchyHelperDatasource;h=e.call(this,t);h.dataSource=t.dataSource;h.filterCondition=t.filterCondition;return h}return r(n)}(d);var s={__esModule:true};s.FilteredDataSource=p;return s})})();