/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/isEmptyObject","sap/ui/core/Component","sap/ui/core/Element","sap/ui/core/Shortcut"],function(t,e,i,n,r){"use strict";var a=n.extend("sap.ui.core.CommandExecution",{metadata:{library:"sap.ui.core",properties:{command:{type:"string"},enabled:{type:"boolean",defaultValue:true},visible:{type:"boolean",defaultValue:true}},events:{execute:{}}},bSkipUpdate:false,trigger:function(){if(this.getVisible()&&this.getEnabled()){this.fireExecute({})}},setCommand:function(e){if(!this.getCommand()){this.setProperty("command",e,true)}else{t.error("The 'command' property can only be applied initially!")}return this},_getCommandInfo:function(){if(!this.oCommand){var t,e=this.getParent(),n=i.getOwnerComponentFor(this);while(!n&&e&&e.getParent()){n=i.getOwnerComponentFor(e);e=e.getParent()}if(n){t=n.getCommand(this.getCommand())}this.oCommand=t?Object.assign({},t):null}return this.oCommand},_updateContextData:function(t){var e=this.getParent();t[this.getCommand()]={};t[this.getCommand()].enabled=this.getEnabled();t[this.getCommand()].id=this.getId();t[this.getCommand()].visible=this.getVisible();this.getModel("$cmd").setProperty("/"+e.getId(),t)},_createCommandData:function(t){if(!this.bSkipUpdate){this.bSkipUpdate=true;var e=this.getParent(),i=e.getModel("$cmd"),n=i.getData(),r=n[e.getId()];if(!r){r=Object.create(t)}else if(t!==Object.getPrototypeOf(r)){r=Object.create(t)}this._updateContextData(r);if(!e.getObjectBinding("$cmd")){e.bindElement("$cmd>/"+e.getId())}this.bSkipUpdate=false}},setParent:function(t){var e=this,i,a=this.getParent(),o,s,g;function d(){var e=t.oPropagatedProperties.oBindingContexts["$cmd"];return e?e.getObject():null}function p(){if(t.getModel("$cmd")){var i=d();e.getParent().detachModelContextChange(p);e._createCommandData(i)}}n.prototype.setParent.apply(this,arguments);i=this._getCommandInfo();if(i&&this.getVisible()){if(t&&t!==a){s=i.shortcut;g=r.isRegistered(this.getParent(),s);if(!g){r.register(t,s,this.trigger.bind(this))}if(t.getModel("$cmd")){o=d();this._createCommandData(o)}else{t.attachModelContextChange(p)}if(!t._propagateProperties._sapui_fnOrig){var m=t._propagateProperties;t._propagateProperties=function(i,n,r,a,s,g){m.apply(t,arguments);var p=t.getBindingContext("$cmd");var c=arguments[1];if(p&&c.isA("sap.ui.core.CommandExecution")){var h=p.getObject();var u=Object.getPrototypeOf(h);o=d();if(u!==o){e._createCommandData.apply(c,[o])}}};t._propagateProperties._sapui_fnOrig=m}}if(a&&a!=t){s=i.shortcut;g=r.isRegistered(a,s);if(g){r.unregister(a,i.shortcut)}this._cleanupContext(a)}}return this},_cleanupContext:function(t){if(t.getBindingContext("$cmd")){var i=t.getBindingContext("$cmd").getObject();if(i){delete i[this.getCommand()];if(e(Object.assign({},i))){if(t._propagateProperties._sapui_fnOrig){t._propagateProperties=t._propagateProperties._sapui_fnOrig}if(!t._bIsBeingDestroyed){t.unbindElement("$cmd")}}}}},setVisible:function(t){var e=this.getParent(),i=this.getModel("$cmd");this.setProperty("visible",t,true);t=this.getProperty("visible");if(e){var n=this._getCommandInfo(),a=n.shortcut,o=r.isRegistered(e,a);if(t&&!o){r.register(e,a,this.trigger.bind(this))}else if(!t&&o){r.unregister(e,a)}}if(i){var s=this.getBindingContext("$cmd");i.setProperty(this.getCommand()+"/visible",t,s)}return this},setEnabled:function(t){var e=this.getModel("$cmd");this.setProperty("enabled",t,true);if(e){var i=this.getBindingContext("$cmd");e.setProperty(this.getCommand()+"/enabled",this.getProperty("enabled"),i)}return this},destroy:function(){var t=this.getParent();if(t){var e=this._getCommandInfo();r.unregister(this.getParent(),e.shortcut);this._cleanupContext(t)}n.prototype.destroy.apply(this,arguments)}});a.find=function(t,e){var i,n,r;r=t.getDependents();for(i=0;i<r.length;i++){if(r[i].isA("sap.ui.core.CommandExecution")&&r[i].getCommand()===e){n=r[i]}}if(!n&&t.getParent()){n=a.find(t.getParent(),e)}return n};return a});