/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/condenser/Classification"],function(e){"use strict";var t={};var n="actions";t.applyChange=function(e,t,r){var o=r.modifier;var a=r.view;var g=r.appComponent;var i=e.getContent().movedElements[0];var s=i.targetIndex;var d;var v;return Promise.resolve().then(o.bySelector.bind(o,i.selector,g,a)).then(function(e){d=e;return o.getAggregation(t,n)}).then(function(r){var i;r.some(function(e,r){if(o.getId(e)===o.getId(d)){v=r;i=Promise.resolve().then(o.removeAggregation.bind(o,t,n,e)).then(o.insertAggregation.bind(o,t,"dependents",e,undefined,a));return true}return false});return i.then(function(){e.setRevertData({index:v,sourceParent:o.getSelector(t,g),aggregation:n});return o.insertAggregation(t,n,d,s,a)})})};t.revertChange=function(e,t,r){var o=r.modifier;var a=r.view;var g=r.appComponent;var i=e.getContent().movedElements[0];var s=e.getRevertData();var d;var v;var c;d=o.bySelector(i.selector,g,a);v=s?s.index:i.targetIndex;c=i.sourceIndex;return Promise.resolve().then(o.removeAggregation.bind(o,t,n,d,v,a)).then(o.insertAggregation.bind(o,t,n,d,c,a))};t.completeChangeContent=function(e,t,n){var r=n.modifier,o=n.appComponent;var a={movedElements:[],targetAggregation:t.target.aggregation,targetContainer:t.selector};t.movedElements.forEach(function(e){var t=e.element||r.bySelector(e.id,o);a.movedElements.push({selector:r.getSelector(t,o),sourceIndex:e.sourceIndex,targetIndex:e.targetIndex})});e.setContent(a)};t.getCondenserInfo=function(t){var n=t.getContent();var r=t.getRevertData();return{affectedControl:n.movedElements[0].selector,classification:e.Move,sourceContainer:r.sourceParent,targetContainer:n.targetContainer,sourceIndex:r.index,sourceAggregation:r.aggregation,targetAggregation:n.targetAggregation,setTargetIndex:function(e,t){e.getContent().movedElements[0].targetIndex=t},getTargetIndex:function(e){return e.getContent().movedElements[0].targetIndex}}};return t},true);