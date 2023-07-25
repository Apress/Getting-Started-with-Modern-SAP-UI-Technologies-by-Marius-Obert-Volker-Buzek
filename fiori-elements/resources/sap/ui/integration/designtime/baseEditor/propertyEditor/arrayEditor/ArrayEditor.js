/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/base/util/deepClone","sap/base/util/deepEqual","sap/base/util/ObjectPath","sap/ui/model/json/JSONModel","sap/base/util/restricted/_merge","sap/ui/integration/designtime/baseEditor/util/binding/resolveBinding","sap/ui/integration/designtime/baseEditor/util/unset","sap/base/util/restricted/_isNil","sap/base/strings/formatMessage","sap/base/util/isEmptyObject"],function(e,t,a,i,r,s,n,o,l,p,u){"use strict";var g=e.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.arrayEditor.ArrayEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.arrayEditor.ArrayEditor",metadata:{library:"sap.ui.integration",properties:{value:{type:"any"}}},renderer:e.getMetadata().getRenderer().render});g.configMetadata=Object.assign({},e.configMetadata,{allowAddAndRemove:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowSorting:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},collapsibleItems:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},showItemLabel:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},template:{defaultValue:{}},typeLabel:{defaultValue:"BASE_EDITOR.TYPES.ARRAY"}});g.prototype.init=function(){e.prototype.init.apply(this,arguments);this._itemsModel=new r;this._itemsModel.setDefaultBindingMode("OneWay");this.setModel(this._itemsModel,"itemsModel")};g.prototype.setValue=function(t){t=Array.isArray(t)?t:[];e.prototype.setValue.call(this,t);this._handleValueChange(this.getValue())};g.prototype._handleValueChange=function(e){var a=this.getConfig();var o=[];(e||[]).forEach(function(l,u){var g=t(l);var d=this.getNestedDesigntimeMetadata(u);var h={itemLabel:a.itemLabel||this.getI18nProperty("BASE_EDITOR.ARRAY.ITEM_LABEL"),index:u,total:e.length,properties:Object.keys(a.template).map(function(r){var n=a.template[r];var o=u+"/"+n.path;var l=i.get(o.split("/"),e);if(typeof l==="undefined"){i.set(n.path.split("/"),t(n.defaultValue),g)}return s({},n,{path:o,value:l,designtime:(d||{})[r]})},this)};var m=new r(g);h.properties=n(h.properties,{"":m},{"":m.getContext("/")},["template","value","itemLabel"]);h.itemLabel=n({itemLabel:h.itemLabel},{"":m},{"":m.getContext("/")}).itemLabel||p(this.getI18nProperty("BASE_EDITOR.ARRAY.NEW_ITEM_LABEL"),[a.addItemLabel||this.getI18nProperty("BASE_EDITOR.ARRAY.ITEM_LABEL")]);m.destroy();o.push(h)},this);this._itemsModel.setData(o)};g.prototype.onBeforeConfigChange=function(e){if(!e.collapsibleItems){this.setFragment("sap.ui.integration.designtime.baseEditor.propertyEditor.arrayEditor.ArrayEditorPlain")}return e};g.prototype.getExpectedWrapperCount=function(e){return e.length};g.prototype._removeItem=function(e){var t=e.getSource().data("index");var a=(this.getValue()||[]).slice();a.splice(t,1);this.setValue(a)};g.prototype._addItem=function(){var e=this.getConfig();var t=(this.getValue()||[]).slice();var a={};Object.keys(e.template).forEach(function(t){var i=e.template[t];if(i.type==="array"){a[t]=[]}});t.push(a);this.setValue(t)};g.prototype._moveUp=function(e){var t=e.getSource().data("index");if(t>0){var a=this.getValue().slice();var i=a.splice(t,1)[0];a.splice(t-1,0,i);this.setValue(a)}};g.prototype._moveDown=function(e){var t=e.getSource().data("index");var a=this.getValue().slice();if(t<a.length-1){var i=a.splice(t,1)[0];a.splice(t+1,0,i);this.setValue(a)}};g.prototype._propertyEditorsChange=function(e){e.getParameter("previousPropertyEditors").forEach(function(e){e.detachValueChange(this._onPropertyValueChange,this);e.detachDesigntimeMetadataChange(this._onDesigntimeMetadataChange,this)},this);e.getParameter("propertyEditors").forEach(function(e){e.attachValueChange(this._onPropertyValueChange,this);e.attachDesigntimeMetadataChange(this._onDesigntimeMetadataChange,this)},this)};g.prototype._onPropertyValueChange=function(e){var r=e.getSource();var s=t(this.getValue()||[]);var n=e.getParameter("path");var l=n.split("/");var p=e.getParameter("value");i.set(l,p,s);if(typeof p==="undefined"||a(p,r.getConfig().defaultValue)){o(s,l,l.length-2)}this.setValue(s)};g.prototype._onDesigntimeMetadataChange=function(e){var t={};i.set(e.getParameter("path").split("/"),e.getParameter("value"),t);this.setDesigntimeMetadata(s({},this.getDesigntimeMetadata(),t));this.setValue(this.getValue())};g.prototype._isNewItem=function(e){return(e&&e.properties||[]).every(function(e){var t=e.value;return l(t)||Array.isArray(t)&&t.length===0||u(t)})};g.prototype.formatAddItemText=function(e,t,a){return p(e,[t||a])};return g});