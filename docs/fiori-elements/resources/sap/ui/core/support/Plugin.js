/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/thirdparty/jquery","sap/base/util/uid"],function(t,e,i){"use strict";var n=t.extend("sap.ui.core.support.Plugin",{constructor:function(e,n,r){t.apply(this);this._id=e?e:i();this._title=n?n:"";this._bActive=false;this._aEventIds=[];this._bIsToolPlugin=r.isToolStub()}});n.prototype.init=function(t){for(var e=0;e<this._aEventIds.length;e++){var i=this["on"+this._aEventIds[e]];if(typeof i==="function"){t.attachEvent(this._aEventIds[e],i,this)}}this._bActive=true};n.prototype.exit=function(t){for(var e=0;e<this._aEventIds.length;e++){var i=this["on"+this._aEventIds[e]];if(typeof i==="function"){t.detachEvent(this._aEventIds[e],i,this)}}this._bActive=false};n.prototype.getId=function(){return this._id};n.prototype.getTitle=function(){return this._title};n.prototype.isToolPlugin=function(){return true};n.prototype.isAppPlugin=function(){return true};n.prototype.runsAsToolPlugin=function(){return this._bIsToolPlugin};n.prototype.$=function(t){if(this.isToolPlugin()){var i=e(document.getElementById(t?this.getId()+"-"+t:this.getId()));if(i.length==0&&!t){i=e("<div></div>",{id:this.getId()});i.appendTo(e(".sapUiSupportCntnt"))}return i}return new e};n.prototype.dom=function(t){if(this.isToolPlugin()){var e=document.getElementById(this.getId());if(t==null){return e}if(/^[\w-]+$/.test(t)){return document.getElementById(this.getId()+"-"+t)}return e&&e.querySelector(t)}return null};n.prototype.addStylesheet=function(t){if(!t){return}var e=sap.ui.require.toUrl(t+".css"),i=document.createElement("link");i.setAttribute("rel","stylesheet");i.setAttribute("type","text/css");i.setAttribute("href",e);var n=document.getElementsByTagName("head")[0];n.appendChild(i)};n.prototype.isActive=function(){return this._bActive};return n});