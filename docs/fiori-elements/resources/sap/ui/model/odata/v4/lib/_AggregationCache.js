/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper","./_Cache","./_ConcatHelper","./_GroupLock","./_Helper","./_MinMaxHelper","sap/base/Log","sap/ui/base/SyncPromise"],function(e,t,n,r,i,o,a,s){"use strict";function l(r,o,a,l,u){var d=function(){},c=null,h,f=this;t.call(this,r,o,l,true);this.oAggregation=a;this.sDownloadUrl=t.prototype.getDownloadUrl.call(this,"");this.aElements=[];this.aElements.$byPredicate={};this.aElements.$count=undefined;this.aElements.$created=0;this.oCountPromise=undefined;if(l.$count){if(a.hierarchyQualifier){this.oCountPromise=new s(function(e){h=e});this.oCountPromise.$resolve=h}else if(a.groupLevels.length){l.$$leaves=true;this.oCountPromise=new s(function(e){c=function(t){e(parseInt(t.UI5__leaves))}})}}this.oFirstLevel=this.createGroupLevelCache(null,u||!!c);this.addKeptElement=this.oFirstLevel.addKeptElement;this.requestSideEffects=this.oFirstLevel.requestSideEffects;this.oGrandTotalPromise=undefined;if(u){this.oGrandTotalPromise=new s(function(t){n.enhanceCache(f.oFirstLevel,a,[c,function(n){var r;if(a["grandTotal like 1.84"]){e.removeUI5grand__(n)}e.setAnnotations(n,true,true,0,e.getAllProperties(a));if(a.grandTotalAtBottomOnly===false){r=Object.assign({},n,{"@$ui5.node.isExpanded":undefined});i.setPrivateAnnotation(n,"copy",r);i.setPrivateAnnotation(r,"predicate","($isTotal=true)")}i.setPrivateAnnotation(n,"predicate","()");t(n)},d])})}else if(c){n.enhanceCache(f.oFirstLevel,a,[c,d])}}l.prototype=Object.create(t.prototype);l.prototype.addElements=function(t,n,r,o){var a=this.aElements,l=this.oAggregation.hierarchyQualifier,u=this.oAggregation.$NodeProperty,d=this;function c(t,c){var h=a[n+c],f,p=i.getPrivateAnnotation(t,"predicate");if(h){if(h===t){return}e.beforeOverwritePlaceholder(h,t,r,o+c,u)}else if(n+c>=a.length){throw new Error("Array index out of bounds: "+(n+c))}f=a.$byPredicate[p];if(f&&f!==t&&!(f instanceof s)){if(!l){throw new Error("Duplicate predicate: "+p)}if(!f["@odata.etag"]||t["@odata.etag"]===f["@odata.etag"]){i.updateNonExisting(t,f)}else if(d.hasPendingChangesForPath(p)){throw new Error("Modified on client and on server: "+d.sResourcePath+p)}}a.$byPredicate[p]=a[n+c]=t;if(r){i.setPrivateAnnotation(t,"index",o+c);i.setPrivateAnnotation(t,"parent",r)}}if(n<0){throw new Error("Illegal offset: "+n)}if(Array.isArray(t)){t.forEach(c)}else{c(t,0)}};l.prototype.beforeRequestSideEffects=function(e){if(!this.oAggregation.hierarchyQualifier){throw new Error("Missing recursive hierarchy")}delete e.$apply;if(!e.$select.includes(this.oAggregation.$NodeProperty)){e.$select.push(this.oAggregation.$NodeProperty)}};l.prototype.beforeUpdateSelected=function(t,n){e.checkNodeProperty(this.aElements.$byPredicate[t],n,this.oAggregation.$NodeProperty,true)};l.prototype.collapse=function(t){var n,o=0,a,s=this.aElements,l=this.fetchValue(r.$cached,t).getResult(),u=l["@$ui5.node.level"],d=s.indexOf(l),c=d+1;function h(e){delete s.$byPredicate[i.getPrivateAnnotation(s[e],"predicate")];o+=1}n=e.getCollapsedObject(l);i.updateAll(this.mChangeListeners,t,l,n);a=i.getPrivateAnnotation(l,"descendants");if(a){u=this.oAggregation.expandTo}while(c<s.length){if(s[c]["@$ui5.node.level"]<=u){if(!a){break}a-=1;if(s[c]["@$ui5.node.isExpanded"]===false){a-=i.getPrivateAnnotation(s[c],"descendants")||0}}h(c);c+=1}if(this.oAggregation.subtotalsAtBottomOnly!==undefined&&Object.keys(n).length>1){h(c)}i.setPrivateAnnotation(l,"spliced",s.splice(d+1,o));s.$count-=o;return o};l.prototype.createGroupLevelCache=function(n,r){var o=this.oAggregation,a=n?n["@$ui5.node.level"]+1:1,s,u,d,c,h,f;if(o.hierarchyQualifier){h=Object.assign({},this.mQueryOptions)}else{s=e.getAllProperties(o);c=a>o.groupLevels.length;d=c?o.groupLevels.concat(Object.keys(o.group).sort()):o.groupLevels.slice(0,a);h=e.filterOrderby(this.mQueryOptions,o,a);f=!c&&Object.keys(o.aggregate).some(function(e){return o.aggregate[e].subtotals})}if(n){h.$$filterBeforeAggregate=i.getPrivateAnnotation(n,"filter")+(h.$$filterBeforeAggregate?" and ("+h.$$filterBeforeAggregate+")":"")}if(!r){delete h.$count;h=e.buildApply(o,h,a)}h.$count=true;u=t.create(this.oRequestor,this.sResourcePath,h,true);u.calculateKeyPredicate=o.hierarchyQualifier?l.calculateKeyPredicateRH.bind(null,n,o):l.calculateKeyPredicate.bind(null,n,d,s,c,f);return u};l.prototype.expand=function(t,n){var o,a,l=this.aElements,u=typeof n==="string"?this.fetchValue(r.$cached,n).getResult():n,d,c=i.getPrivateAnnotation(u,"spliced"),h,f=this;if(n!==u){i.updateAll(this.mChangeListeners,n,u,e.getOrCreateExpandedObject(this.oAggregation,u))}if(c){i.deletePrivateAnnotation(u,"spliced");h=c.$stale;d=l.indexOf(u)+1;this.aElements=l.concat(c,l.splice(d));this.aElements.$byPredicate=l.$byPredicate;a=c.length;this.aElements.$count=l.$count+a;c.forEach(function(e){var t=i.getPrivateAnnotation(e,"predicate");if(!i.hasPrivateAnnotation(e,"placeholder")){if(h){f.turnIntoPlaceholder(e,t)}else{f.aElements.$byPredicate[t]=e;if(i.hasPrivateAnnotation(e,"expanding")){i.deletePrivateAnnotation(e,"expanding");a+=f.expand(r.$cached,e).getResult()}}}});return s.resolve(a)}o=i.getPrivateAnnotation(u,"cache");if(!o){o=this.createGroupLevelCache(u);i.setPrivateAnnotation(u,"cache",o)}return o.read(0,this.iReadLength,0,t).then(function(t){var r=f.aElements.indexOf(u)+1,s=u["@$ui5.node.level"],l=e.getCollapsedObject(u),d=f.oAggregation.subtotalsAtBottomOnly!==undefined&&Object.keys(l).length>1,c;if(!u["@$ui5.node.isExpanded"]){i.deletePrivateAnnotation(u,"spliced");return 0}if(!r){i.setPrivateAnnotation(u,"expanding",true);return 0}a=t.value.$count;if(i.hasPrivateAnnotation(u,"groupLevelCount")&&i.getPrivateAnnotation(u,"groupLevelCount")!==a){throw new Error("Unexpected structural change: groupLevelCount")}i.setPrivateAnnotation(u,"groupLevelCount",a);i.updateAll(f.mChangeListeners,n,u,{"@$ui5.node.groupLevelCount":a});if(d){a+=1}if(r===f.aElements.length){f.aElements.length+=a}else{for(c=f.aElements.length-1;c>=r;c-=1){f.aElements[c+a]=f.aElements[c];delete f.aElements[c]}}f.addElements(t.value,r,o,0);for(c=r+t.value.length;c<r+t.value.$count;c+=1){f.aElements[c]=e.createPlaceholder(s+1,c-r,o)}if(d){l=Object.assign({},l);e.setAnnotations(l,undefined,true,s,e.getAllProperties(f.oAggregation));i.setPrivateAnnotation(l,"predicate",i.getPrivateAnnotation(u,"predicate").slice(0,-1)+",$isTotal=true)");f.addElements(l,r+a-1)}f.aElements.$count+=a;return a},function(t){i.updateAll(f.mChangeListeners,n,u,e.getCollapsedObject(u));throw t})};l.prototype.fetchValue=function(e,t,n,r){var i=this;if(t==="$count"){if(this.oCountPromise){return this.oCountPromise}if(this.oAggregation.hierarchyQualifier||this.oAggregation.groupLevels.length){a.error("Failed to drill-down into $count, invalid segment: $count",this.toString(),"sap.ui.model.odata.v4.lib._Cache");return s.resolve()}return this.oFirstLevel.fetchValue(e,t,n,r)}return s.resolve(this.aElements.$byPredicate[t.split("/")[0]]).then(function(){i.registerChangeListener(t,r);return i.drillDown(i.aElements,t,e)})};l.prototype.getAllElements=function(e){var t;if(e){throw new Error("Unsupported path: "+e)}t=this.aElements.map(function(e){return i.hasPrivateAnnotation(e,"placeholder")?undefined:e});t.$count=this.aElements.$count;return t};l.prototype.getCreatedElements=function(e){return[]};l.prototype.getDownloadQueryOptions=function(t){if(this.oAggregation.hierarchyQualifier){if("$count"in t){t=Object.assign({},t);delete t.$count}}else{t=e.filterOrderby(t,this.oAggregation)}return e.buildApply(this.oAggregation,t,0,true)};l.prototype.getDownloadUrl=function(e,t){return this.sDownloadUrl};l.prototype.getValue=function(e){var t;t=this.fetchValue(r.$cached,e);if(t.isFulfilled()){return t.getResult()}t.caught()};l.prototype.isDeletingInOtherGroup=function(e){return false};l.prototype.keepOnlyGivenElements=function(t){var n={},r=this;t.forEach(function(e){n[e]=true});return this.aElements.filter(function(t){var o=i.getPrivateAnnotation(t,"predicate");if(n[o]){e.markSplicedStale(t);return true}r.turnIntoPlaceholder(t,o)})};l.prototype.read=function(e,t,n,r,o){var a,l,u=e,d=t,c,h,f=this.oGrandTotalPromise&&this.oAggregation.grandTotalAtBottomOnly!==true,p=[],g,v,m=this;function y(e,t){p.push(m.readGap(c,e,t,r.getUnlockedCopy(),o))}if(f&&!e&&t===1){if(n!==0){throw new Error("Unsupported prefetch length: "+n)}r.unlock();return this.oGrandTotalPromise.then(function(e){return{value:[e]}})}if(this.aElements.$count===undefined){this.iReadLength=t+n;if(f){if(u){u-=1}else{d-=1}}p.push(this.readCount(r),this.readFirst(u,d,n,r,o))}else{for(g=e,v=Math.min(e+t,this.aElements.length);g<v;g+=1){l=this.aElements[g];a=i.hasPrivateAnnotation(l,"placeholder")?i.getPrivateAnnotation(l,"parent"):undefined;if(a!==c){if(h!==undefined){y(h,g);c=h=undefined}if(a){h=g;c=a}}else if(h!==undefined&&i.getPrivateAnnotation(l,"index")!==i.getPrivateAnnotation(this.aElements[g-1],"index")+1){y(h,g);h=g}}if(h!==undefined){y(h,g)}r.unlock()}return s.all(p).then(function(){var n=m.aElements.slice(e,e+t);n.$count=m.aElements.$count;return{value:n}})};l.prototype.readCount=function(e){var t,n=this.oCountPromise&&this.oCountPromise.$resolve,r;if(n){delete this.oCountPromise.$resolve;t=Object.assign({},this.mQueryOptions);delete t.$apply;delete t.$count;delete t.$expand;delete t.$orderby;if(this.oAggregation.search){t.$search=this.oAggregation.search}delete t.$select;r=this.sResourcePath+"/$count"+this.oRequestor.buildQueryString(null,t);return this.oRequestor.request("GET",r,e.getUnlockedCopy()).then(n)}};l.prototype.readFirst=function(t,n,r,o,a){var s=this;return this.oFirstLevel.read(t,n,r,o,a).then(function(n){var r,o,a=0,l;s.aElements.length=s.aElements.$count=n.value.$count;if(s.oGrandTotalPromise){s.aElements.$count+=1;s.aElements.length+=1;r=s.oGrandTotalPromise.getResult();switch(s.oAggregation.grandTotalAtBottomOnly){case false:a=1;s.aElements.$count+=1;s.aElements.length+=1;s.addElements(r,0);o=i.getPrivateAnnotation(r,"copy");s.addElements(o,s.aElements.length-1);break;case true:s.addElements(r,s.aElements.length-1);break;default:a=1;s.addElements(r,0)}}s.addElements(n.value,t+a,s.oFirstLevel,t);for(l=0;l<s.aElements.$count;l+=1){if(!s.aElements[l]){s.aElements[l]=e.createPlaceholder(s.oAggregation.expandTo>1?0:1,l-a,s.oFirstLevel)}}})};l.prototype.readGap=function(e,t,n,r,o){var a,s,l=e.getQueryOptions(),u=i.getPrivateAnnotation(this.aElements[t],"index"),d=this.aElements[t],c,h=this;if(l.$count){delete l.$count;e.setQueryOptions(l,true)}s=e.read(u,n-t,0,r,o).then(function(n){var r=false,i;if(d!==h.aElements[t]&&n.value[0]!==h.aElements[t]){r=true;t=h.aElements.indexOf(d);if(t<0){t=h.aElements.indexOf(n.value[0]);if(t<0){i=new Error("Collapse before read has finished");i.canceled=true;throw i}}}h.addElements(n.value,t,e,u);if(r){i=new Error("Collapse or expand before read has finished");i.canceled=true;throw i}});if(s.isPending()){for(c=t;c<n;c+=1){a=i.getPrivateAnnotation(this.aElements[c],"predicate");if(a){this.aElements.$byPredicate[a]=s}}}return s};l.prototype.refreshKeptElements=function(e,t){return this.oFirstLevel.refreshKeptElements.call(this,e,t,true)};l.prototype.reset=function(e,n,r,o,a){var l,u=this;if(a){throw new Error("Unsupported grouping via sorter")}e.forEach(function(e){var t=u.aElements.$byPredicate[e];if(i.hasPrivateAnnotation(t,"placeholder")){throw new Error("Unexpected placeholder")}delete t["@$ui5.node.isExpanded"];delete t["@$ui5.node.level"];delete t["@$ui5._"];i.setPrivateAnnotation(t,"predicate",e)});this.oAggregation=o;this.sDownloadUrl=t.prototype.getDownloadUrl.call(this,"");this.oFirstLevel.reset.call(this,e,n,r);if(n){this.oBackup.oCountPromise=this.oCountPromise;this.oBackup.oFirstLevel=this.oFirstLevel}this.oCountPromise=undefined;if(r.$count){this.oCountPromise=new s(function(e){l=e});this.oCountPromise.$resolve=l}this.oFirstLevel=this.createGroupLevelCache()};l.prototype.restore=function(e){if(e){this.oCountPromise=this.oBackup.oCountPromise;this.oFirstLevel=this.oBackup.oFirstLevel}this.oFirstLevel.restore.call(this,e)};l.prototype.toString=function(){return this.sDownloadUrl};l.prototype.turnIntoPlaceholder=function(t,n){if(i.hasPrivateAnnotation(t,"placeholder")){return}i.setPrivateAnnotation(t,"placeholder",1);e.markSplicedStale(t);delete this.aElements.$byPredicate[n];i.getPrivateAnnotation(t,"parent").drop(i.getPrivateAnnotation(t,"index"),n)};l.calculateKeyPredicate=function(t,n,r,o,a,s,l,u){var d;if(!(u in l)){return undefined}if(t){r.forEach(function(e){if(Array.isArray(e)){i.inheritPathValue(e,t,s)}else if(!(e in s)){s[e]=t[e]}})}d=o&&i.getKeyPredicate(s,u,l)||i.getKeyPredicate(s,u,l,n,true);i.setPrivateAnnotation(s,"predicate",d);if(!o){i.setPrivateAnnotation(s,"filter",i.getKeyFilter(s,u,l,n))}e.setAnnotations(s,o?undefined:false,a,t?t["@$ui5.node.level"]+1:1,t?null:r);return d};l.calculateKeyPredicateRH=function(t,n,r,o,a){var s,l,u=1,d,c;if(!(a in o)){return undefined}c=i.getKeyPredicate(r,a,o);i.setPrivateAnnotation(r,"predicate",c);if(a!==n.$metaPath){return c}switch(i.drillDown(r,n.$DrillStateProperty)){case"expanded":l=true;break;case"collapsed":l=false;i.setPrivateAnnotation(r,"filter",i.getKeyFilter(r,a,o));break;default:}i.deleteProperty(r,n.$DrillStateProperty);if(t){u=t["@$ui5.node.level"]+1}else{s=i.drillDown(r,n.$DistanceFromRootProperty);if(s){i.deleteProperty(r,n.$DistanceFromRootProperty);u=parseInt(s)+1}}e.setAnnotations(r,l,undefined,u);if(n.$LimitedDescendantCountProperty){d=i.drillDown(r,n.$LimitedDescendantCountProperty);if(d){i.deleteProperty(r,n.$LimitedDescendantCountProperty);if(d!=="0"){i.setPrivateAnnotation(r,"descendants",parseInt(d))}}}return c};l.create=function(n,r,i,a,s,u,d,c){var h,f;function p(){if("$expand"in a){throw new Error("Unsupported system query option: $expand")}if("$select"in a){throw new Error("Unsupported system query option: $select")}}if(s){h=e.hasGrandTotal(s.aggregate);f=s.groupLevels&&!!s.groupLevels.length;if(e.hasMinOrMax(s.aggregate)){if(h){throw new Error("Unsupported grand totals together with min/max")}if(f){throw new Error("Unsupported group levels together with min/max")}if(s.hierarchyQualifier){throw new Error("Unsupported recursive hierarchy together with min/max")}if(d){throw new Error("Unsupported $$sharedRequest together with min/max")}p();return o.createCache(n,r,s,a)}if(a.$filter&&(h&&!s["grandTotal like 1.84"]||f)){throw new Error("Unsupported system query option: $filter")}if(h||f||s.hierarchyQualifier){if(a.$search){throw new Error("Unsupported system query option: $search")}if(!s.hierarchyQualifier){p()}if(c){throw new Error("Unsupported grouping via sorter")}if(d){throw new Error("Unsupported $$sharedRequest")}return new l(n,r,s,a,h)}}if(a.$$filterBeforeAggregate){a.$apply="filter("+a.$$filterBeforeAggregate+")/"+a.$apply;delete a.$$filterBeforeAggregate}return t.create(n,r,a,u,i,d)};return l},false);