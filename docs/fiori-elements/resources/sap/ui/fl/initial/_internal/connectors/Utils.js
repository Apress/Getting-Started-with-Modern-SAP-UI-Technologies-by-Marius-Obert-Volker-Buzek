/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/security/encodeURLParameters","sap/ui/core/Configuration"],function(e,t){"use strict";var s=2e4;var n=function(e,t){var s=new Error(e.statusText);s.status=e.status;s.userMessage=t;return s};var r=function(e){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl").getText(e)};return{addLanguageInfo:function(e){if(!e){throw new Error("No parameters map were passed")}e["sap-language"]=t.getLanguage()},addSAPLogonLanguageInfo:function(e){if(!e){throw new Error("No parameters map were passed")}e["sap-language"]=t.getSAPLogonLanguage()},getUrl:function(t,s,n){if(!t||!s.url){throw new Error("Not all necessary parameters were passed")}var r=s.url+t;if(s.cacheKey){r+="~"+s.cacheKey+"~/"}if(s.reference){r+=s.reference}else if(s.fileName){r+=s.fileName}if(n){Object.keys(n).forEach(function(e){if(n[e]===undefined){delete n[e]}});var a=e(n);if(a.length>0){r+="?"+a}}return r},sendRequest:function(e,t,a){t=t||"GET";t=t.toUpperCase();return new Promise(function(o,i){var p=new XMLHttpRequest;p.open(t,e);p.timeout=s;if((t==="GET"||t==="HEAD")&&(!a||!a.initialConnector||!a.initialConnector.xsrfToken)){p.setRequestHeader("X-CSRF-Token","fetch")}if((t==="POST"||t==="PUT"||t==="DELETE")&&a&&a.initialConnector&&a.initialConnector.xsrfToken){p.setRequestHeader("X-CSRF-Token",a.initialConnector.xsrfToken)}if(a&&a.contentType){p.setRequestHeader("Content-Type",a.contentType)}if(a&&a.siteId){p.setRequestHeader("X-LRep-Site-Id",a.siteId)}if(a&&a.sAppDescriptorId){p.setRequestHeader("X-LRep-AppDescriptor-Id",a.sAppDescriptorId)}if(a&&a.dataType){p.responseType=a.dataType}p.onload=function(){if(p.status>=200&&p.status<400){try{var t={};if(p.status!==204&&p.status!==205){if(!p.response&&p.responseText){p.response=p.responseText}t.response=p.response;if(t.response&&typeof t.response==="string"&&p.getResponseHeader("content-type")&&p.getResponseHeader("content-type").indexOf("json")>0){t.response=JSON.parse(t.response)}}t.status=p.status;if(p.getResponseHeader("X-CSRF-Token")){if(!e.match(/\/~.*~/g)){t.xsrfToken=p.getResponseHeader("X-CSRF-Token");if(a&&a.initialConnector){a.initialConnector.xsrfToken=t.xsrfToken}}}if(p.getResponseHeader("Etag")){t.etag=p.getResponseHeader("Etag")}o(t)}catch(e){e.userMessage=r("MSG_LOADING_SERVER_RESPONSE_ERROR");i(e)}}else{var s="";try{var f=typeof p.response==="string"?JSON.parse(p.response):p.response;if(Array.isArray(f.messages)&&f.messages.length){s=f.messages.reduce(function(e,t){return e.concat(t.severity==="Error"?t.text+"\n":"")},s)}}catch(e){}i(n(p,s))}};p.ontimeout=function(){i(n(p,r("MSG_CONNECTION_TIMEOUT_ERROR")))};p.onerror=function(){i(n(p,r("MSG_NETWORK_ERROR")))};if(a&&a.payload){p.send(a.payload)}else{p.send()}})}}});