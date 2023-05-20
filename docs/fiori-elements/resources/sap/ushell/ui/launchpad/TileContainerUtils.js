// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/uid"],function(e){"use strict";var n={};n.showHideTilesAndHeaders=function(e,n){var t,r,i,a=0,s=0;for(t in e.onScreenPathIndexMap){if(e.onScreenPathIndexMap.hasOwnProperty(t)){i=e.onScreenPathIndexMap[t];r=n[i.aItemsRefrenceIndex];if(r.getVisible()&&!i.isVisible){s++}r.setVisible(i.isVisible);if(i.isVisible){a++}}}return{nCountVisibElelemnts:a,nCountFilteredElement:s}};n.applyFilterOnItem=function(e,n,t,r){var i;for(i in n){if(n.hasOwnProperty(i)){n[i](e)}}if(t){t(e,r)}};n.createNewItem=function(n,t){var r=this.mBindingInfos[t],i=r.factory,a=function(n){var t=this.getId()+"-"+e(),a=i(t,n);a.setBindingContext(n,r.model);return a}.bind(this);return a(n)};n.addNewItem=function(e,n){var t=this.getMetadata().getJSONKeys()[n];this[t._sMutator](e);return true};n.createMissingElementsInOnScreenElements=function(e,t,r,i,a,s,l){var f,o,u=t.length;for(o=r;o<u;o++){f=t[o].getPath();if(!e.onScreenPathIndexMap[f]){if(i(t[o],l)==false){return false}n.applyFilterOnItem(t[o],s)}else{throw true}}return true};n.createMissingElementsInOnScreenElementsSearchCatalog=function(e,t,r,i,a,s,l,f){var o,u,h=t.length;for(u=0;u<h;u++){o=t[u].getPath();if(!e.onScreenPathIndexMap[o]){if(i(t[u],l)==false){return false}}n.applyFilterOnItem(t[u],s,f,l)}return true};n.applyFilterOnAllItems=function(e,t,r){var i;var a=e.binding,s;if(!a){return}s=a.getContexts();for(i=0;i<s.length;i++){n.applyFilterOnItem(s[i],t,r)}};n.validateOrder=function(e,n,t){var r,i,a,s,l,f,o,u;if(e[t]&&n.length>0){r=n[n.length-1].getBindingContext().getPath();i=e[t].getPath();s=r.split("/");l=i.split("/");for(f=0;f<s.length&&f<l.length;f++){o=s[f];u=l[f];if(!!parseInt(o,10)&&!!parseInt(u,10)){if(parseInt(o,10)>parseInt(u,10)){return false}else if(parseInt(o,10)<parseInt(u,10)){return true}}else{for(a=0;a<u.length&&a<o.length;a++){if(o[a].charCodeAt()>u[a].charCodeAt()){return false}else if(o[a].charCodeAt()<u[a].charCodeAt()){return true}}}}}return true};n.markVisibleOnScreenElements=function(e,n,t){var r=0,i,a=e.length;for(r=0;r<a;r++){i=e[r].getPath();if(n.onScreenPathIndexMap[i]){if(t){n.onScreenPathIndexMap[i].isVisible=true}}else{return r}}return r};n.markVisibleOnScreenElementsSearchCatalog=function(e,n,t){var r=0,i,a=e.length;for(r=0;r<a;r++){i=e[r].getPath();if(n.onScreenPathIndexMap[i]){if(t){n.onScreenPathIndexMap[i].isVisible=true}}}return r};n.indexOnScreenElements=function(e,n){var t,r,i={onScreenPathIndexMap:{}},a=e.length,s,l=true;if(n===false){l=false}for(r=0;r<a;r++){s=e[r];if(s.getBindingContext()){t=s.getBindingContext().getPath();if(!i.onScreenPathIndexMap[t]){i.onScreenPathIndexMap[t]={aItemsRefrenceIndex:r,isVisible:l}}}}return i};return n},true);