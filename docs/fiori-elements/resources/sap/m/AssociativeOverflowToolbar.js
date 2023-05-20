/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","./OverflowToolbar","./OverflowToolbarRenderer","sap/ui/Device"],function(t,e,o,n){"use strict";var r=e.extend("sap.m.AssociativeOverflowToolbar",{metadata:{associations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}},renderer:o});r.prototype.getContent=function(){var t=this.getAssociation("content")||[];var e=[];t.forEach(function(t){var o=sap.ui.getCore().byId(t);if(o){e.push(o)}});return e};r.prototype.insertContent=function(e,o){var n=e.getId(),r=this.getAssociation("content").filter(function(t){return t!==n});var i;if(o<0){i=0}else if(o>r.length){i=r.length}else{i=o}if(i!==o){t.warning("AssociativeOverflowToolbar.insertContent: index '"+o+"' out of range [0,"+r.length+"], forced to "+i)}r.splice(i,0,n);this.removeAllAssociation("content");r.forEach(function(t){this.addAssociation("content",t)},this);return this};r.prototype.exit=function(){e.prototype.exit.apply(this,arguments);return this._callToolbarMethod("destroyContent",[true])};r.prototype.indexOfContent=function(t){var e=this.getAssociation("content")||[];return e.indexOf(t.getId())};r.prototype._handleResize=function(){if(n.system.phone){this._resetAndInvalidateToolbar()}else{this._bControlsInfoCached=false;e.prototype._handleResize.apply(this,arguments)}};r.prototype._callToolbarMethod=function(t,o){switch(t){case"addContent":return this.addAssociation("content",o[0]);case"getContent":return this.getContent();case"insertContent":return this.insertContent(o[0],o[1]);case"removeContent":return sap.ui.getCore().byId(this.removeAssociation("content",o[0],o[1],o[2]))||null;case"destroyContent":this.removeAllAssociation("content",o[0]);return this;case"removeAllContent":return this.removeAllAssociation("content",o[0]).map(function(t){return sap.ui.getCore().byId(t)});default:return e.prototype._callToolbarMethod.call(this,t,o)}};return r});