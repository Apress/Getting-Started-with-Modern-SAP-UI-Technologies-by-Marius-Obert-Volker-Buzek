/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/library","./Factory","./LinkData","sap/base/Log"],function(e,t,n,i){"use strict";var r={getContactAnnotationPath:function(e,t){var n=e?e.getContactAnnotationPath():undefined;if(n===undefined&&t&&t.getContactAnnotationPaths()&&t.getContactAnnotationPaths()[e.getFieldName()]!==undefined){n=t.getContactAnnotationPaths()[e.getFieldName()]}return n},getForceLinkRendering:function(e,t){if(!e){return undefined}return e.getForceLinkRendering()||!!(t&&t.getForceLinkRendering()&&t.getForceLinkRendering()[e.getFieldName()])},getStorableAvailableActions:function(e){return e?e.filter(function(e){return e&&e.key!==undefined}):[]},sortArrayAlphabetical:function(e){var t;try{t=sap.ui.getCore().getConfiguration().getLocale().toString();if(typeof window.Intl!=="undefined"){var n=window.Intl.Collator(t,{numeric:true});e.sort(function(e,t){return n.compare(e,t)})}else{e.sort(function(e,n){return e.localeCompare(n,t,{numeric:true})})}}catch(e){}},retrieveNavigationTargets:function(e,r,a,o,c,s,u,l,v,f){var m={mainNavigation:undefined,ownNavigation:undefined,availableActions:[]};var p=t.getService("CrossApplicationNavigation");var g=t.getService("URLParsing");if(!p||!g){i.error("Service 'CrossApplicationNavigation' or 'URLParsing' could not be obtained");return Promise.resolve(m)}var b=[e].concat(r);var d=b.map(function(e){return[{semanticObject:e,params:c?c[e]:undefined,appStateKey:a,ui5Component:o,sortResultsBy:"text"}]});var h;return new Promise(function(e){p.getLinks(d).then(function(t){return e(t)})}).then(function(e){h=e;return h&&h.length?this.retrieveSemanticObjectUnavailableActions(u,l,v):Promise.resolve({})}.bind(this)).then(function(e){if(!h||!h.length){return Promise.resolve(m)}var t=p.hrefForExternal();if(t&&t.indexOf("?")!==-1){t=t.split("?")[0]}if(t){t+="?"}var i=function(t,n){return!!e&&!!e[t]&&e[t].indexOf(n)>-1};h[0][0].forEach(function(e){var r=g.parseShellHash(e.intent);var a=r.semanticObject&&r.action?r.semanticObject+"-"+r.action:undefined;var o=e.tags&&e.tags.indexOf("superiorAction")>-1;if(e.intent.indexOf(t)===0){var c=new n({key:a,href:e.intent,visible:true,isSuperiorAction:o});c.setText(e.text);m.ownNavigation=c;return}if(r.action&&r.action==="displayFactSheet"&&!i(r.semanticObject,r.action)){m.mainNavigation=new n({key:a,href:e.intent,text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("POPOVER_FACTSHEET"),visible:true,isSuperiorAction:o});if(f){f.addSemanticObjectIntent(r.semanticObject,{text:e.text,intent:e.intent})}return}if(!i(r.semanticObject,r.action)){var s=new n({key:a,href:e.intent,visible:true,isSuperiorAction:o});s.setText(e.text);m.availableActions.push(s);if(f){f.addSemanticObjectIntent(r.semanticObject,{text:e.text,intent:e.intent})}}});if(!m.mainNavigation&&typeof s==="string"){var r=new n({visible:true});r.setText(s);m.mainNavigation=r}var a=[];for(var o=1;o<b.length;o++){a=a.concat(h[o][0])}a.forEach(function(e){var t=g.parseShellHash(e.intent);if(i(t.semanticObject,t.action)){return}var r=e.tags&&e.tags.indexOf("superiorAction")>-1;var a=new n({key:t.semanticObject&&t.action?t.semanticObject+"-"+t.action:undefined,href:e.intent,visible:true,isSuperiorAction:r});a.setText(e.text);m.availableActions.push(a);if(f){f.addSemanticObjectIntent(t.semanticObject,{text:e.text,intent:e.intent})}});return Promise.resolve(m)})},retrieveSemanticObjectMapping:function(e,t,n){return this._getEntityTypeAnnotationOfProperty(e,t,n).then(function(e){if(!e){return Promise.resolve(null)}if(!e[0]["com.sap.vocabularies.Common.v1.SemanticObjectMapping"]){return Promise.resolve(null)}var i=this._getSemanticObjectMappingsOfProperty(e[0],this._getSemanticObjectsOfProperty(e[0],t,n));var r={};for(var a in i){r[i[a].name]=i[a].mapping}return Promise.resolve(r)}.bind(this))},retrieveSemanticObjectUnavailableActions:function(e,t,n){return this._getEntityTypeAnnotationOfProperty(e,t,n).then(function(e){if(!e){return Promise.resolve(null)}if(!e[0]["com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions"]){return Promise.resolve(null)}var i=this._getSemanticObjectUnavailableActionsOfProperty(e[0],this._getSemanticObjectsOfProperty(e[0],t,n));var r={};for(var a in i){r[i[a].name]=i[a].unavailableActions}return Promise.resolve(r)}.bind(this))},oNavigationPromise:undefined,navigate:function(e){if(e.indexOf("#")===0&&sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getServiceAsync){var t=this;if(!t.oNavigationPromise){t.oNavigationPromise=sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(n){n.toExternal({target:{shellHash:e.substring(1)}});t.oNavigationPromise=undefined})}}else{window.location.href=e}},_getEntityTypeAnnotationOfProperty:function(e,t,n){if(!e){return Promise.resolve(null)}if(!t||!t.getMetaModel()){return Promise.resolve(null)}var r=t.getMetaModel();return r.loaded().then(function(){var t;try{t=r.getMetaContext(n)}catch(e){i.error("sap.ui.comp.navpopover.Util._getEntityTypeAnnotationOfProperty: binding path '"+n+"' is not valid. Error has been caught: "+e);return Promise.resolve(null)}if(!t){return Promise.resolve(null)}var a=t.getProperty(t.getPath());if(!a.property){return Promise.resolve(null)}var o=a.property.filter(function(t){return t.name===e});if(o.length!==1){return Promise.resolve(null)}return Promise.resolve(o)})},_getSemanticObjectsOfProperty:function(e,t,n){var i={};for(var r in e){var a=r.split("#")[0];var o=r.split("#")[1]||"";if(a.startsWith("com.sap.vocabularies.Common.v1.SemanticObject")&&a.endsWith("com.sap.vocabularies.Common.v1.SemanticObject")){i[o]={name:e[r]["Path"]?t.getProperty(n+"/"+e[r]["Path"]):e[r]["String"],mapping:undefined}}}return i},_getSemanticObjectMappingsOfProperty:function(e,t){var n=function(e){var t={};if(Array.isArray(e)){e.forEach(function(e){t[e.LocalProperty.PropertyPath]=e.SemanticObjectProperty.String})}return t};for(var i in e){var r=i.split("#")[0];var a=i.split("#")[1]||"";if(r.startsWith("com.sap.vocabularies.Common.v1.SemanticObjectMapping")&&r.endsWith("com.sap.vocabularies.Common.v1.SemanticObjectMapping")){if(t[a]){t[a].mapping=n(e[i])}}}return t},_getSemanticObjectUnavailableActionsOfProperty:function(e,t){var n=function(e){var t=[];if(Array.isArray(e)){e.forEach(function(e){t.push(e.String)})}return t};for(var i in e){var r=i.split("#")[0];var a=i.split("#")[1]||"";if(r.startsWith("com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions")&&r.endsWith("com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions")){if(t[a]){t[a].unavailableActions=n(e[i])}}}return t}};return r},true);