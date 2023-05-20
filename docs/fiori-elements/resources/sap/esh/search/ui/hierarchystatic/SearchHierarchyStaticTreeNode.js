/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){function e(e,t,r){if(r){return t?t(e):e}if(!e||!e.then){e=Promise.resolve(e)}return t?e.then(t):e}function t(){}function r(e,r){if(!r){return e&&e.then?e.then(t):Promise.resolve()}}sap.ui.define(["../tree/TreeNode"],function(t){function n(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function a(e,t,r){if(t)o(e.prototype,t);if(r)o(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function u(){if(typeof Reflect!=="undefined"&&Reflect.get){u=Reflect.get.bind()}else{u=function e(t,r,n){var i=c(t,r);if(!i)return;var o=Object.getOwnPropertyDescriptor(i,r);if(o.get){return o.get.call(arguments.length<3?t:n)}return o.value}}return u.apply(this,arguments)}function c(e,t){while(!Object.prototype.hasOwnProperty.call(e,t)){e=h(e);if(e===null)break}return e}function f(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)l(e,t)}function l(e,t){l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function e(t,r){t.__proto__=r;return t};return l(e,t)}function s(e){var t=v();return function r(){var n=h(e),i;if(t){var o=h(this).constructor;i=Reflect.construct(n,arguments,o)}else{i=n.apply(this,arguments)}return d(this,i)}}function d(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return p(e)}function p(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function v(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function h(e){h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function e(t){return t.__proto__||Object.getPrototypeOf(t)};return h(e)}var y=n(t);var b=function(t){f(o,t);var n=s(o);function o(e){var t;i(this,o);t=n.call(this,e);t.icon=e.icon;t.getData().facet=e.facet;return t}a(o,[{key:"setExpanded",value:function t(r,n){try{const t=this;return e(u(h(o.prototype),"setExpanded",t).call(t,r,false),function(){t.getData().facet.mixinFilterNodes();if(n){t.getTreeNodeFactory().updateUI()}})}catch(e){return Promise.reject(e)}}},{key:"toggleFilter",value:function t(){try{const t=this;var n=t;var i=t.getData().facet;if(!t.hasFilter){t.setFilter(true);i.rootTreeNode.visitChildNodesRecursively(function(e){if(e===n||!e.hasFilter){return}e.setFilter(false)})}else{t.setFilter(false)}return e(r(i.activateFilters()))}catch(e){return Promise.reject(e)}}},{key:"setFilter",value:function e(t){var r=this.getData().facet;var n=r.sina.createSimpleCondition({operator:r.sina.ComparisonOperator.DescendantOf,attribute:r.attributeId,attributeLabel:r.title,value:this.id,valueLabel:this.label});var i=r.model.getProperty("/uiFilter");if(t){if(r.model.config.searchInAreaOverwriteMode){r.model.config.resetQuickSelectDataSourceAll(r.model)}r.model.setSearchBoxTerm("",false);r.model.resetFilterByFilterConditions(false);i.autoInsertCondition(n)}else{i.autoRemoveCondition(n)}}},{key:"fetchChildTreeNodes",value:function t(){try{const t=this;var r;var n=function e(t){for(var n=0;n<t.attributes.length;++n){var i=t.attributes[n];if(i.id===r.attributeId){return i.value}}};var i=function e(t){var r=[];for(var n=0;n<t.titleAttributes.length;++n){var i=t.titleAttributes[n];if(!i.value.startsWith("sap-icon://")){r.push(i.valueFormatted)}}return r.join(" ")};var o=function e(t){for(var r=0;r<t.attributes.length;++r){var n=t.attributes[r];if(typeof n.value==="string"&&n.value.startsWith("sap-icon://")){return n.value}}return"sap-icon://none"};r=t.getData().facet;var a=r.sina.createFilter({dataSource:r.dataSource});a.autoInsertCondition(r.sina.createSimpleCondition({attribute:r.attributeId,value:t.id,operator:r.sina.ComparisonOperator.ChildOf}));var u=r.sina.createSearchQuery({filter:a,top:100});return e(u.getResultSetAsync(),function(e){var t=[];for(var a=0;a<e.items.length;++a){var u=e.items[a];var c=r.treeNodeFactory.createTreeNode({facet:r,id:n(u),label:i(u),icon:o(u),expandable:!u.attributesMap.HASHIERARCHYNODECHILD||u.attributesMap.HASHIERARCHYNODECHILD.value==="true"});t.push(c)}return t})}catch(e){return Promise.reject(e)}}},{key:"updateNodePath",value:function e(t,r){if(t[r].id!==this.id){throw new Error("program error")}if(r+1>=t.length){return}var n=t[r+1];var i=this.getChildTreeNodeById(n.id);if(!i){var o=this.getData().facet;i=o.treeNodeFactory.createTreeNode({facet:o,id:n.id,label:n.label});this.addChildTreeNode(i)}i.updateNodePath(t,r+1)}}]);return o}(y);return b})})();