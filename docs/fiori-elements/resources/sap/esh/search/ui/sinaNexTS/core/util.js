/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../sina/AttributeSemanticsType","../sina/SearchResultSetItemAttribute","./errors"],function(e,t,r){function a(e,t){var r=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=n(e))||t&&e&&typeof e.length==="number"){if(r)e=r;var a=0;var i=function(){};return{s:i,n:function(){if(a>=e.length)return{done:true};return{done:false,value:e[a++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o=true,u=false,l;return{s:function(){r=r.call(e)},n:function(){var e=r.next();o=e.done;return e},e:function(e){u=true;l=e},f:function(){try{if(!o&&r.return!=null)r.return()}finally{if(u)throw l}}}}function n(e,t){if(!e)return;if(typeof e==="string")return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(e,t)}function i(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function o(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function u(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||false;a.configurable=true;if("value"in a)a.writable=true;Object.defineProperty(e,a.key,a)}}function l(e,t,r){if(t)u(e.prototype,t);if(r)u(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var s=e["AttributeSemanticsType"];var f=t["SearchResultSetItemAttribute"];var c=r["NoJSONDateError"];var v=r["TimeOutError"];function d(e,t){return Object.prototype.hasOwnProperty.apply(e,t)}function g(e,t){var r=function r(){var a=this;var n=arguments;return new Promise(function(r,i){var o=false;var u=setTimeout(function(){o=true;i(new v)},t);return e.apply(a,n).then(function(e){if(o){return}clearTimeout(u);r(e)},function(e){if(o){return}clearTimeout(u);i(e)})})};return r}function p(e){var t=0;var r=function r(){var a=++t;return e.apply(this,arguments).then(function(e){return new Promise(function(r){if(a!==t){return}r(e)})},function(e){return new Promise(function(r,n){if(a!==t){return}n(e)})})};r.abort=function(){++t};return r}function h(e,t){if(typeof window==="undefined"){return null}if(!t){t=window.location.href}e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),a=r.exec(t);if(!a){return null}if(!a[2]){return""}return decodeURIComponent(a[2].replace(/\+/g," "))}function m(e,t){for(var r=0;r<t.length;++r){var a=t[r];var n=0;while(n>=0){n=e.indexOf(a);if(n>=0){e=e.slice(0,n)+e.slice(n+a.length)}}}return e}function b(){var e=function e(t,r){var a="000000000"+t;return a.substr(a.length-r)};var t=new Date;return""+t.getUTCFullYear()+e(t.getUTCMonth()+1,2)+e(t.getUTCDate(),2)+e(t.getUTCHours(),2)+e(t.getUTCMinutes(),2)+e(t.getUTCSeconds(),2)+e(t.getUTCMilliseconds(),3)}var y=function(){function e(t){o(this,e);t=t||{};this.timeDelay=t.timeDelay||1e3;this.consumer=t.consumer||function(){};this.consumerContext=t.consumerContext||null;this.objects=[]}l(e,[{key:"add",value:function e(t){this.objects.push(t);if(this.objects.length===1){setTimeout(this.consume.bind(this),this.timeDelay)}}},{key:"consume",value:function e(){this.consumer.apply(this.consumerContext,[this.objects]);this.objects=[]}}]);return e}();function T(e){return{type:"Timestamp",value:e.toJSON()}}function w(e){if(e.type!=="Timestamp"){throw new c("Not a timestampe "+e)}return new Date(e.value)}function O(e){if(e.items){var t=e.items;for(var r=0;r<t.length;r++){var a=t[r];a=this.addGeoDataIfAvailable(a);var n=a.detailAttributes;for(var i=0;i<n.length;i++){var o=n[i];if(o instanceof f){var u=o.sina;var l=o.value;var c=o.metadata;if(typeof l==="string"&&o.metadata.type!=="ImageUrl"){var v=l.match(/^[^\0-\x20,:;<>@\[\\\]^_`]+@[^\0-,.-@\[\\\]^_`\{\|\}~]+\.[^\0-,.-@\[\\\]^_`\{\|\}~]+$/g);var d=l.match(/^https?:\/\/(?=[^\/])\S+$/gi);if(c.semantics==s.EmailAddress){o.defaultNavigationTarget=u._createNavigationTarget({label:l,targetUrl:"mailto:"+l})}else if(c.semantics==s.PhoneNr){o.defaultNavigationTarget=u._createNavigationTarget({label:l,targetUrl:"tel:"+l})}else if(c.semantics==s.HTTPURL){o.defaultNavigationTarget=u._createNavigationTarget({label:l,targetUrl:l,target:"_blank"})}else if(v!==null&&v.length===1){o.defaultNavigationTarget=u._createNavigationTarget({label:v[0],targetUrl:"mailto:"+v[0]})}else if(d!==null&&d[0].match(/\w\w\w/)!==null){o.defaultNavigationTarget=u._createNavigationTarget({label:d[0],targetUrl:d[0],target:"_blank"})}}}}}}return e}function C(e){var t=e.sina.getDataSource(e.query.filter.dataSource.id);for(var r=0;r<e.facets.length;r++){var a=e.facets[r].query.dimension;var n=t.attributeMetadataMap[a];if(n&&n.usage.AdvancedSearch&&n.usage.Facet===undefined){e.facets.splice(r,1);r=r-1}}return e}function N(e,t,r){var a=false;var n,i,o,u,l,s;var f=e.id;var c=e.value;if(f.match(/latitude/i)!==null){if(!isNaN(c)){l=f;n=c;o=r}a=true}else if(f.match(/longitude/i)!==null){if(!isNaN(c)){s=f;i=c;u=r}a=true}else if(f.match(/LOC_4326/)){u=r;o=r;var v=JSON.parse(c);var d=v.coordinates;if(d&&d.length>1){i=d[0];n=d[1]}a=true}if(t===undefined||t===true){return a}return{lat:n,lon:i,latAttribName:l,lonAttribName:s,latIndex:o,lonIndex:u}}function x(e){var t,r,a,n,i,o;var u=e.detailAttributes;for(var l=0;l<u.length;l++){t=this.isMapsAttribute(u[l],false,l);r=t.lat?t.lat:r;a=t.lon?t.lon:a;i=t.latIndex?t.latIndex:i;o=t.lonIndex?t.lonIndex:o;if(r&&a){break}}if(r&&a){if(i===o){u.splice(i,1)}else if(i>o){u.splice(i,1);u.splice(o,1)}else{u.splice(o,1);u.splice(i,1)}var s={sina:e.sina,type:"GeoJson",id:"LOC_4326",label:"LOC_4326",isCurrency:false,IsBoolean:false,IsKey:false,IsSortable:true,isUnitOfMeasure:false,semanticObjectType:[],usage:{Map:"coordinates"}};var f='{ "type": "Point", "coordinates": ['+a+", "+r+", 0] }";var c={id:"LOC_4326",label:"LOC_4326",isHighlighted:false,value:f,valueFormatted:f,valueHighlighted:e.sina,metadata:s,sina:e.sina};u.push(c);n=e.sina.getDataSource(e.dataSource.id);if(!n.attributeMetadataMap.LOC_4326){n.attributesMetadata.push(s);n.attributeMetadataMap.LOC_4326=s}else{n.attributeMetadataMap.LOC_4326.type="GeoJson";n.attributeMetadataMap.LOC_4326.usage={Map:"coordinates"}}}return e}function S(e){var t={};return function(r){if(Object.prototype.hasOwnProperty.call(t,r)){return t[r]}var a=e.apply(this,[r]);t[r]=a;return a}}function A(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function M(e,t){var r=new RegExp("{{([^{}]*)}}");var a=function e(t){var a=r.exec(t);if(!a){return null}return a[1]};var n=function e(t,r,a){var n=new RegExp("{{"+A(r)+"}}","g");t=t.replace(n,a);return t};var i=function e(r){var i=a(r);if(!i){return r}r=n(r,i,t[i]);return e(r)};return i(e)}var _=new RegExp("<b>(.*?)<\\/b>","g");function I(e){var t;var r=[];do{t=_.exec(e);if(t){r.push(t[1])}}while(t);return r}function U(e,t){for(var r=0;r<t.length;++r){var a=t[r];if(e.indexOf(a)<0){e.push(a)}}}var D=["\\","-","(",")","~","^","?",'"',":","'","[","]"];var j=["AND","OR","NOT"];var P=["\\",'"',"*","?","'"];function R(e,t,r){return e.split(t).join(r)}function E(e){var t=e.trim();var r=a(D),n;try{for(r.s();!(n=r.n()).done;){var i=n.value;if(i==="'"){t=R(t,i,"''")}else{t=R(t,i,"\\"+i)}}}catch(e){r.e(e)}finally{r.f()}var o=a(j),u;try{for(o.s();!(u=o.n()).done;){var l=u.value;if(t===l){t='"'+l+'"'}if(t.startsWith(l+" ")){t='"'+l+'" '+t.substring(l.length+1)}if(t.endsWith(" "+l)){t=t.substring(0,t.length-(l.length+1))+' "'+l+'"'}t=R(t," "+l+" ",' "'+l+'" ')}}catch(e){o.e(e)}finally{o.f()}if(t===""){t="*"}return t}function L(e){var t=e.trim();var r=a(P),n;try{for(r.s();!(n=r.n()).done;){var i=n.value;if(i==="'"){t=R(t,i,"''")}else{t=R(t,i,"\\"+i)}}}catch(e){r.e(e)}finally{r.f()}if(t===""){t="*"}return t}var J={__esModule:true};J.hasOwnProperty=d;J.timeoutDecorator=g;J.refuseOutdatedResponsesDecorator=p;J.getUrlParameter=h;J.filterString=m;J.generateTimestamp=b;J.DelayedConsumer=y;J.dateToJson=T;J.dateFromJson=w;J.addPotentialNavTargetsToAttribute=O;J.removePureAdvancedSearchFacets=C;J.isMapsAttribute=N;J.addGeoDataIfAvailable=x;J.cacheDecorator=S;J.escapeRegExp=A;J.evaluateTemplate=M;J.extractRegExp=_;J.extractHighlightedTerms=I;J.appendRemovingDuplicates=U;J.escapeQuery=E;J.escapeFilterCondition=L;return J})})();