/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/Device","sap/m/table/columnmenu/Item"],function(t,e,n){"use strict";var i=n.extend("sap.ui.mdc.table.menu.Item",{metadata:{library:"sap.ui.mdc",properties:{key:{type:"string"}}}});i.prototype.initializeContent=function(){var n=this.getTable();var i=t.byId(this.getParent().getAssociation("column"));var r=n.getEngine();var o=this.getKey();var a=r.getController(n,o);if(o==="Filter"){var s=n.getPropertyHelper().getProperty(i.getDataProperty()).getFilterableProperties();var g=s.map(function(t){return t.name});n.getInbuiltFilter().setVisibleFields(g)}return n.getEngine().uimanager.create(n,[o]).then(function(t){if(!e.system.phone){t[0].setProperty("_useFixedWidth",true)}this.setContent(t[0]);this.setLabel(a.getUISettings().title);a.update(n.getPropertyHelper());r.validateP13n(n,o,this.getContent());this.changeButtonSettings({reset:{visible:true}})}.bind(this))};i.prototype.onPress=function(){var t=this.getTable();t.getEngine().getController(t,this.getKey()).update(t.getPropertyHelper())};i.prototype.onConfirm=function(){var t=this.getTable();t.getEngine().handleP13n(t,[this.getKey()])};i.prototype.onReset=function(){var t=this.getTable();var e=this.getKey();t.getEngine().reset(t,[e]).then(function(){t._oQuickActionContainer.updateQuickActions([e])})};i.prototype.destroyContent=function(){if(this.getKey()==="Filter"){return this}return this.destroyAggregation("content")};i.prototype.getTable=function(){return this.getParent().getTable()};return i});