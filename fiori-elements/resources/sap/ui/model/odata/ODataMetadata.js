/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_ODataMetaModelUtils","sap/base/assert","sap/base/Log","sap/base/util/each","sap/base/util/extend","sap/base/util/isEmptyObject","sap/base/util/uid","sap/ui/base/EventProvider","sap/ui/core/Configuration","sap/ui/core/cache/CacheManager","sap/ui/thirdparty/datajs"],function(t,e,n,i,a,r,s,o,p,f,u){"use strict";var y="sap.ui.model.odata.ODataMetadata",h="http://www.sap.com/Protocols/SAPData";var d=o.extend("sap.ui.model.odata.ODataMetadata",{constructor:function(t,e){o.apply(this,arguments);this.bLoaded=false;this.bFailed=false;this.mEntityTypes={};this.mRequestHandles={};this.sUrl=t;this.bAsync=e.async;this.sUser=e.user;this.bWithCredentials=e.withCredentials;this.sPassword=e.password;this.mHeaders=e.headers;this.sCacheKey=e.cacheKey;this.oLoadEvent=null;this.oFailedEvent=null;this.oMetadata=null;this.bMessageScopeSupported=false;this.mNamespaces=e.namespaces||{sap:"http://www.sap.com/Protocols/SAPData",m:"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata","":"http://schemas.microsoft.com/ado/2007/06/edmx"};var i=this;this.pLoadedWithReject=new Promise(function(t,e){i.fnResolve=t;i.fnReject=e});this.pLoaded=this.pLoadedWithReject.catch(function(t){return new Promise(function(t,e){i.fnResolve=t})});function a(t){f.set(i.sCacheKey,JSON.stringify({metadata:i.oMetadata,params:t}))}function r(t){n.error("[ODataMetadata] initial loading of metadata failed");if(t&&t.message){n.error("Error: "+t.message)}}if(this.sCacheKey){f.get(this.sCacheKey).then(function(t){if(t){var e=JSON.parse(t);this.oMetadata=e.metadata;this._handleLoaded(this.oMetadata,e.params,false)}else{this._loadMetadata().then(a).catch(r)}}.bind(this)).catch(r)}else{this._loadMetadata().catch(r)}},metadata:{publicMethods:["getServiceMetadata","attachFailed","detachFailed","attachLoaded","detachLoaded","refresh"]}});d._returnsCollection=function(t){if(t&&t.returnType&&t.returnType.startsWith("Collection(")){return true}return false};d.prototype._setNamespaces=function(t){this.mNamespaces=t};d.prototype._handleLoaded=function(t,e,n){var i=[];this.oMetadata=this.oMetadata?this.merge(this.oMetadata,t,i):t;this.oRequestHandle=null;e.entitySets=i;this.fnResolve(e);if(this.bAsync&&!n){this.fireLoaded(this)}else if(!this.bAsync&&!n){this.bLoaded=true;this.bFailed=false;this.oLoadEvent=setTimeout(this.fireLoaded.bind(this,e),0)}};d.prototype._loadMetadata=function(t,e){var n=this;t=t||this.sUrl;var i=this._createRequest(t);return new Promise(function(t,a){var r;function o(a,r){if(!a||!a.dataServices){var s={message:"Invalid metadata document",request:i,response:r};p(s);return}n.sMetadataBody=r.body;n.oRequestHandle=null;var o={metadataString:n.sMetadataBody};var f=r.headers["Last-Modified"];if(f){o.lastModified=f}var u=r.headers["eTag"];if(u){o.eTag=u}n._handleLoaded(a,o,e);t(o)}function p(t){var i={message:t.message,request:t.request,response:t.response};if(t.response){i.statusCode=t.response.statusCode;i.statusText=t.response.statusText;i.responseText=t.response.body}if(r&&r.bSuppressErrorHandlerCall){return}if(n.bAsync){delete n.mRequestHandles[r.id]}a(i);n.fnReject(i);if(n.bAsync&&!e){n.fireFailed(i)}else if(!n.bAsync&&!e){n.bFailed=true;n.oFailedEvent=setTimeout(n.fireFailed.bind(n,i),0)}}r=u.request(i,o,p,u.metadataHandler);if(n.bAsync){r.id=s();n.mRequestHandles[r.id]=r}})};d.prototype.refresh=function(){return this._loadMetadata()};d.prototype.getServiceMetadata=function(){return this.oMetadata};d.prototype.isLoaded=function(){return this.bLoaded};d.prototype.loaded=function(t){return t?this.pLoadedWithReject:this.pLoaded};d.prototype.isFailed=function(){return this.bFailed};d.prototype.fireLoaded=function(t){this.bLoaded=true;this.bFailed=false;this.fireEvent("loaded",t);n.debug(this+" - loaded was fired");return this};d.prototype.attachLoaded=function(t,e,n){this.attachEvent("loaded",t,e,n);return this};d.prototype.detachLoaded=function(t,e){this.detachEvent("loaded",t,e);return this};d.prototype.fireFailed=function(t){this.bFailed=true;this.fireEvent("failed",t);return this};d.prototype.attachFailed=function(t,e,n){this.attachEvent("failed",t,e,n);return this};d.prototype.detachFailed=function(t,e){this.detachEvent("failed",t,e);return this};d.prototype._getEntityAssociationEnd=function(e,n){var i;if(!this._checkMetadataLoaded()){return null}this._mGetEntityAssociationEndCache=this._mGetEntityAssociationEndCache||{};i=e.namespace+"."+e.name+"/"+n;if(this._mGetEntityAssociationEndCache[i]===undefined){var a=e?t.findObject(e.navigationProperty,n):null,r=a?t.getObject(this.oMetadata.dataServices.schema,"association",a.relationship):null,s=r?t.findObject(r.end,a.toRole,"role"):null;this._mGetEntityAssociationEndCache[i]=s}return this._mGetEntityAssociationEndCache[i]};function c(t){var e={};for(var n=0;n<t.length;n++){var i=t[n];if(i.entityContainer){for(var a=0;a<i.entityContainer.length;a++){var r=i.entityContainer[a];if(r.entitySet){for(var s=0;s<r.entitySet.length;s++){if(r.entitySet[s].name!=null){e[r.entitySet[s].name]=r.entitySet[s]}}}}}}return e}d.prototype._findEntitySetByName=function(t){if(!this.mEntitySets){this.mEntitySets=c(this.oMetadata.dataServices.schema)}return this.mEntitySets[t]};d.prototype._getEntityTypeByPath=function(t){if(!t){e(undefined,"sPath not defined!");return null}if(this.mEntityTypes[t]){return this.mEntityTypes[t]}if(!this._checkMetadataLoaded()){return null}var n=t.replace(/^\/|\/$/g,""),i=n.split("/"),a=i.length,r,s,o,p,f=this;if(i[0].indexOf("(")!=-1){i[0]=i[0].substring(0,i[0].indexOf("("))}if(a>1){r=f._getEntityTypeByPath(i[0]);for(var u=1;u<i.length;u++){if(r){if(i[u].indexOf("(")!=-1){i[u]=i[u].substring(0,i[u].indexOf("("))}p=f._getEntityTypeByNavProperty(r,i[u]);if(p){r=p}o=r}}}else{s=this._splitName(this._getEntityTypeName(i[0]));o=this._getObjectMetadata("entityType",s.name,s.namespace);if(o){o.entityType=this._getEntityTypeName(i[0])}}if(!o){var y=i[i.length-1];var h=this._getFunctionImportMetadata(y,"GET");if(!h){h=this._getFunctionImportMetadata(y,"POST")}if(h&&h.entitySet){o=Object.assign({},this._getEntityTypeByPath(h.entitySet));if(o){o.entityType=this._getEntityTypeName(h.entitySet);o.isFunction=true}}}if(o){this.mEntityTypes[t]=o}return o};d.prototype._getEntityTypeByName=function(t){var n,a=this,r,s,o;if(!t){e(undefined,"sName not defined!");return null}o=this._splitName(t);s=o.namespace;r=o.name;if(!this._checkMetadataLoaded()){return null}if(this.mEntityTypes[t]){n=this.mEntityTypes[t]}else{i(this.oMetadata.dataServices.schema,function(e,o){if(o.entityType&&(!s||o.namespace===s)){i(o.entityType,function(e,i){if(i.name===r){n=i;a.mEntityTypes[t]=n;n.namespace=o.namespace;return false}return true})}})}return n};d.prototype._checkMetadataLoaded=function(){if(!this.oMetadata||r(this.oMetadata)){e(undefined,"No metadata loaded!");return false}return true};d.prototype._getAnnotation=function(t){var n,i,a,r,s,o,p;i=t.split("/#");r=i[1].split("/");if(!i[0]){s=this._getEntityTypeByName(r[0]);e(s,r[0]+" is not a valid EntityType");if(!s){return undefined}o=i[1].substr(i[1].indexOf("/")+1);p=this._getPropertyMetadata(s,o);e(p,o+" is not a valid property path");if(!p){return undefined}a=o.substr(o.indexOf(p.name));a=a.substr(a.indexOf("/")+1)}else{s=this._getEntityTypeByPath(i[0]);e(s,i[0]+" is not a valid path");if(!s){return undefined}t=i[0].replace(/^\/|\/$/g,"");o=t;while(!p&&o.indexOf("/")>0){o=o.substr(o.indexOf("/")+1);p=this._getPropertyMetadata(s,o)}e(p,o+" is not a valid property path");if(!p){return undefined}a=r.join("/")}n=this._getAnnotationObject(s,p,a);return n};d.prototype._getAnnotationObject=function(t,e,n){var i,a,r,s,o,p,f;if(!e){return undefined}p=e;f=n.split("/");if(f[0].indexOf(".")>-1){return this._getV4AnnotationObject(t,e,f)}else if(f.length>1){p=p[f[0]];if(!p&&e.extensions){for(o=0;o<e.extensions.length;o++){s=e.extensions[o];if(s.name==f[0]){p=s;break}}}n=f.splice(0,1);i=this._getAnnotationObject(t,p,f.join("/"))}else if(f[0].indexOf("@")>-1){a=f[0].substr(1);r=a.split(":");i=p[r[0]];if(!i&&p.extensions){for(o=0;o<p.extensions.length;o++){s=p.extensions[o];if(s.name===r[1]&&s.namespace===this.mNamespaces[r[0]]){i=s.value;break}}}}else{r=f[0].split(":");i=p[r[0]];i=p[f[0]];if(!i&&p.extensions){for(o=0;o<p.extensions.length;o++){s=p.extensions[o];if(s.name===r[1]&&s.namespace===this.mNamespaces[r[0]]){i=s;break}}}}return i};d.prototype._getV4AnnotationObject=function(t,n,a){var r,s=[];if(a.length>1){e(a.length==1,"'"+a.join("/")+"' is not a valid annotation path");return undefined}var o=t.namespace?t.namespace+".":"";o+=t.name+"/"+n.name;i(this.oMetadata.dataServices.schema,function(t,e){if(e.annotations){i(e.annotations,function(t,e){if(e.target===o&&!e.qualifier){s.push(e.annotation);return false}return true})}});if(s){i(s,function(t,e){i(e,function(t,e){if(e.term===a[0]){r=e}})})}return r};d.prototype._splitName=function(t){var e={};if(t){var n=t.lastIndexOf(".");e.name=t.substr(n+1);e.namespace=t.substr(0,n)}return e};d.prototype._getEntityTypeName=function(t){var e,n;if(t){n=this._findEntitySetByName(t);if(n){e=n.entityType}}return e};d.prototype._getObjectMetadata=function(t,e,n){var a;if(e&&n){i(this.oMetadata.dataServices.schema,function(r,s){if(s[t]&&s.namespace===n){i(s[t],function(t,n){if(n.name===e){a=n;a.namespace=s.namespace;return false}return true});return!a}return true})}return a};d.prototype.getUseBatch=function(){var t=false;i(this.oMetadata.dataServices.schema,function(e,n){if(n.entityContainer){i(n.entityContainer,function(e,n){if(n.extensions){i(n.extensions,function(e,n){if(n.name==="use-batch"&&n.namespace==="http://www.sap.com/Protocols/SAPData"){t=typeof n.value==="string"?n.value.toLowerCase()==="true":!!n.value;return false}return true})}})}});return t};d.prototype._getFunctionImportMetadataIterate=function(t,e){var n=[];i(this.oMetadata.dataServices.schema,function(a,r){if(r["entityContainer"]){i(r["entityContainer"],function(a,r){if(r["functionImport"]){i(r["functionImport"],function(i,a){if(t(a)){n.push(a);if(e){return false}}return true})}return!(e&&n.length===1)})}return!(e&&n.length===1)});return n};d.prototype._getFirstMatchingFunctionImportMetadata=function(t){var e=this._getFunctionImportMetadataIterate(t,true);return e.length===1?e[0]:null};d.prototype._getFunctionImportMetadataByName=function(t){if(t.indexOf("/")>-1){t=t.substr(t.indexOf("/")+1)}return this._getFunctionImportMetadataIterate(function(e){return e.name===t})};d.prototype._getFunctionImportMetadata=function(t,e){if(t.indexOf("/")>-1){t=t.substr(t.indexOf("/")+1)}return this._getFirstMatchingFunctionImportMetadata(function(n){return n.name===t&&n.httpMethod===e})};d.prototype._getEntityTypeByNavProperty=function(t,e){if(!t.navigationProperty){return undefined}for(var n=0;n<t.navigationProperty.length;++n){var i=t.navigationProperty[n];if(i.name===e){return this._getEntityTypeByNavPropertyObject(i)}}return undefined};d.prototype._getEntityTypeByNavPropertyObject=function(t){var e;var n=this._splitName(t.relationship);var i=this._getObjectMetadata("association",n.name,n.namespace);if(i){var a=i.end[0];if(a.role!==t.toRole){a=i.end[1]}var r=this._splitName(a.type);e=this._getObjectMetadata("entityType",r.name,r.namespace);if(e){e.entityType=a.type}}return e};d.prototype._getNavigationPropertyNames=function(t){var e=[];if(t.navigationProperty){i(t.navigationProperty,function(t,n){e.push(n.name)})}return e};d.prototype._getNavPropertyRefInfo=function(t,e){var n,a,r,s,o,p,f,u,y,h,d,c=this;i(t.navigationProperty,function(i,l){r=c._splitName(l.relationship);a=c._getObjectMetadata("association",r.name,r.namespace);if(!a||!a.referentialConstraint){return}p=a.referentialConstraint.dependent;y=a.end.find(function(t){return t.role===p.role});if(y.type!==t.namespace+"."+t.name){return}f=p.propertyRef.some(function(t){return t.name===e});if(!f){return}o=a.referentialConstraint.principal;u=o.role;s=c._getAssociationSetByAssociation(l.relationship);y=s.end.find(function(t){return t.role===u});h=y.entitySet;d=o.propertyRef.map(function(t){return t.name});n={name:l.name,entitySet:h,keys:d}});return n};d.prototype._getPropertyMetadata=function(t,e){var n,a=this;if(!t){return undefined}e=e.replace(/^\/|\/$/g,"");var r=e.split("/");i(t.property,function(t,e){if(e.name===r[0]){n=e;return false}return true});if(r.length>1){if(!n){while(t&&r.length>1){t=this._getEntityTypeByNavProperty(t,r[0]);r.shift()}if(t){n=a._getPropertyMetadata(t,r[0])}}else if(!n.type.toLowerCase().startsWith("edm.")){var s=this._splitName(n.type);n=this._getPropertyMetadata(this._getObjectMetadata("complexType",s.name,s.namespace),r[1])}}return n};d.prototype.destroy=function(){delete this.oMetadata;var t=this;i(this.mRequestHandles,function(e,n){n.bSuppressErrorHandlerCall=true;n.abort();delete t.mRequestHandles[e]});if(this.oLoadEvent){clearTimeout(this.oLoadEvent)}if(this.oFailedEvent){clearTimeout(this.oFailedEvent)}o.prototype.destroy.apply(this,arguments)};d.prototype._fillElementCaches=function(){var t=this;if(this._entitySetMap||!this._checkMetadataLoaded()){return}this._entitySetMap={};this.oMetadata.dataServices.schema.forEach(function(e){(e.entityContainer||[]).forEach(function(e){(e.entitySet||[]).forEach(function(e){var n=t._getEntityTypeByName(e.entityType);n.__navigationPropertiesMap={};(n.navigationProperty||[]).forEach(function(t){n.__navigationPropertiesMap[t.name]=t});e.__entityType=n;t._entitySetMap[e.entityType]=e})})})};d.prototype._createRequest=function(t){var e={"sap-cancel-on-close":true},n={"Accept-Language":p.getLanguageTag()};a(e,this.mHeaders,n);var i={headers:e,requestUri:t,method:"GET",user:this.sUser,password:this.sPassword,async:this.bAsync};if(this.bAsync){i.withCredentials=this.bWithCredentials}return i};d.prototype._getEntitySetByPath=function(t){var e;this._fillElementCaches();e=this._getEntityTypeByPath(t);return e&&this._entitySetMap[e.entityType]};d.prototype._addUrl=function(t){var e=[].concat(t);return Promise.all(e.map(function(t){return this._loadMetadata(t,true)},this))};d.prototype.merge=function(t,e,n){var a=this;if(this.mEntitySets){delete this.mEntitySets}i(t.dataServices.schema,function(t,r){i(e.dataServices.schema,function(t,e){if(e.namespace===r.namespace){if(e.entityType){if(!a.mEntityTypeNames){a.mEntityTypeNames={};r.entityType.map(function(t){a.mEntityTypeNames[t.name]=true})}r.entityType=!r.entityType?[]:r.entityType;for(var s=0;s<e.entityType.length;s++){if(!(e.entityType[s].name in a.mEntityTypeNames)){r.entityType.push(e.entityType[s]);a.mEntityTypeNames[e.entityType[s].name]=true}}}if(r.entityContainer&&e.entityContainer){i(r.entityContainer,function(t,r){i(e.entityContainer,function(t,e){if(e.entitySet){if(e.name===r.name){if(!a.mEntitySetNames){a.mEntitySetNames={};r.entitySet.map(function(t){a.mEntitySetNames[t.name]=true})}r.entitySet=!r.entitySet?[]:r.entitySet;for(var i=0;i<e.entitySet.length;i++){if(!(e.entitySet[i].name in a.mEntitySetNames)){r.entitySet.push(e.entitySet[i]);a.mEntitySetNames[e.entitySet[i].name]=true}}e.entitySet.forEach(function(t){n.push(t)})}}})})}if(e.annotations){r.annotations=!r.annotations?[]:r.annotations;r.annotations=r.annotations.concat(e.annotations)}}})});return t};d.prototype._getEntitySetByType=function(t){var e=t.namespace+"."+t.name;var n=this.oMetadata.dataServices.schema;for(var i=0;i<n.length;++i){var a=n[i].entityContainer;if(a){for(var r=0;r<a.length;++r){var s=a[r].entitySet;if(s){for(var o=0;o<s.length;++o){if(s[o].entityType===e){return s[o]}}}}}}return null};d.prototype._calculateCanonicalPath=function(t){var e,n,i,a;if(t){n=t.lastIndexOf(")");if(n!==-1){a=t.substr(0,n+1);var r=this._getEntitySetByPath(a);if(r){if(r.__entityType.isFunction){e=t}else{i=t.split("/");if(a==="/"+i[1]){if(!(i[2]in r.__entityType.__navigationPropertiesMap)){e=t}}else{i=a.split("/");a="/"+r.name+i[i.length-1].substr(i[i.length-1].indexOf("("))+t.substr(n+1);if(a!==t){e=a}}}}}}return e};d.prototype._getAssociationSetByAssociation=function(t){var e=this.oMetadata.dataServices.schema;for(var n=0;n<e.length;++n){var i=e[n].entityContainer;if(i){for(var a=0;a<i.length;++a){var r=i[a].associationSet;if(r){for(var s=0;s<r.length;++s){if(r[s].association===t){return r[s]}}}}}}return null};d.prototype._isMessageScopeSupported=function(){var t=this.oMetadata.dataServices.schema,e,n;if(!this.bMessageScopeSupported&&t){for(var i=0;i<t.length;++i){n=t[i].entityContainer;if(n){for(var a=0;a<n.length;++a){e=n[a];if(e.extensions&&Array.isArray(e.extensions)){for(var r=0;r<e.extensions.length;++r){if(e.extensions[r].name==="message-scope-supported"&&e.extensions[r].namespace===this.mNamespaces.sap){if(e.extensions[r].value==="true"){this.bMessageScopeSupported=true;break}}}}}}}}return this.bMessageScopeSupported};d.prototype._isCollection=function(t){var e=false;var n=t.lastIndexOf("/");if(n>0){var i=t.substring(0,n);var a=this._getEntityTypeByPath(i);if(a){var r=this._getEntityAssociationEnd(a,t.substring(n+1));if(r&&r.multiplicity==="*"){e=true}}}else{e=true}return e};d.prototype._getReducedPath=function(t){var e,n,i,a,r,s,o,p=t.split("/"),f;if(p.length<4){return t}this._fillElementCaches();for(n=1;n<p.length-2;n+=1){f=this._getEntityTypeByPath(p.slice(0,n+1).join("/"));r=f&&f.__navigationPropertiesMap[p[n+1].split("(")[0]];if(!r){continue}o=p[n+2].split("(")[0];a=this._getEntityTypeByNavPropertyObject(r);s=a&&a.__navigationPropertiesMap[o];if(!s||r.relationship!==s.relationship){continue}i=p[n+2].slice(o.length);e=this._getEntityAssociationEnd(a,o);if(e.multiplicity!=="*"||i&&p[n].endsWith(i)){p.splice(n+1,2);return this._getReducedPath(p.join("/"))}}return p.join("/")};d.prototype.getKeyPropertyNamesByPath=function(t){var e,n,i=t.lastIndexOf("/");if(i>0){n=this._getEntityTypeByPath(t.slice(0,i));if(n){e=this._getEntityAssociationEnd(n,t.slice(i+1).split("(")[0]);n=e?this._getEntityTypeByName(e.type):undefined}}else{n=this._getEntityTypeByPath(t)}return n&&n.key.propertyRef.map(function(t){return t.name})};d.prototype._getCanonicalPathOfFunctionImport=function(t,e){var i,a,r,s,o,p,f,u=t.extensions,h=t.returnType,c="",l=false;if(u){for(s=0;s<u.length;s+=1){if(u[s].name==="action-for"){i=u[s].value;break}}}if(d._returnsCollection(t)){l=true;h=h.slice(11,-1)}if(i){r=this._getEntityTypeByName(i)}else if(t.entitySet){r=this._getEntityTypeByPath(t.entitySet)}else if(h){r=this._getEntityTypeByName(h)}if(r){a=this._getEntitySetByType(r);if(a&&r.key&&r.key.propertyRef){if(l){return"/"+a.name}f=r.key.propertyRef;if(f.length===1){p=f[0].name;if(e[p]){c=encodeURIComponent(e[p])}}else{o=[];for(s=0;s<f.length;s+=1){p=f[s].name;if(e[p]){o.push(p+"="+encodeURIComponent(e[p]))}}c=o.join(",")}return"/"+a.name+"("+c+")"}else if(!a){n.error("Cannot determine path of the entity set for the function import '"+t.name+"'",this,y)}else{n.error("Cannot determine keys of the entity type '"+r.entityType+"' for the function import '"+t.name+"'",this,y)}}return""};d.prototype._splitByLastNavigationProperty=function(t){var e,n,i,a,r,s=t.split("/"),o="/"+s[1],p=s.length;this._fillElementCaches();e=this._getEntityTypeByPath(o);for(n=2;n<p;n+=1){r=s[n];i=r.indexOf("(");if(i!==-1){r=r.slice(0,i)}if(e&&e.__navigationPropertiesMap[r]){a=n;e=this._getEntityTypeByNavProperty(e,r)}else{break}}if(a===undefined){return{pathBeforeLastNavigationProperty:t,lastNavigationProperty:"",addressable:true,pathAfterLastNavigationProperty:""}}return{pathBeforeLastNavigationProperty:s.slice(0,a).join("/"),lastNavigationProperty:"/"+s[a],addressable:this._isAddressable(e),pathAfterLastNavigationProperty:a+1>=p?"":"/"+s.slice(a+1).join("/")}};d.prototype._isAddressable=function(t){var e;if(!t){return true}e=this._entitySetMap[t.entityType];if(!e||!e.extensions){return true}return!e.extensions.some(function(t){return t.name==="addressable"&&t.namespace===h&&t.value==="false"})};return d});