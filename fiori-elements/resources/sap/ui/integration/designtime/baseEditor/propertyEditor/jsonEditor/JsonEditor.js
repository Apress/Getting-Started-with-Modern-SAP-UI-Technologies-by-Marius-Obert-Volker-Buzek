/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/core/Fragment"],function(t,e){"use strict";var o=t.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.jsonEditor.JsonEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.jsonEditor.JsonEditor",metadata:{library:"sap.ui.integration"},_onLiveChange:function(){var t=this.getContent();var e=this._parseJson(t.getValue());if(e instanceof Error){this.setHasOwnError(true);t.setValueState("Error");t.setValueStateText("Error: "+e)}else{t.setValueState("None");this.setValue(e)}},_parseJson:function(t){try{var e=JSON.parse(t);return e}catch(t){return t}},_openJsonEditor:function(){if(!this._oDialog){return e.load({name:"sap.ui.integration.designtime.baseEditor.propertyEditor.jsonEditor.JsonEditorDialog",controller:this}).then(function(t){this._oDialog=t;this._oErrorMsg=this._oDialog.getContent()[0];this._oEditor=this._oDialog.getContent()[1];this._oEditor.getInternalEditorInstance().getSession().on("changeAnnotation",this.onShowError.bind(this));this._oDialog.attachAfterOpen(function(){this._oEditor.getInternalEditorInstance().focus();this._oEditor.getInternalEditorInstance().navigateFileEnd()},this);this._oDialog.attachAfterClose(function(){this._oDialog.close();this._oDialog.destroy();this._oDialog=null},this);this.addDependent(this._oDialog);this._openDialog();return this._oDialog}.bind(this))}else{this._openDialog();return Promise.resolve(this._oDialog)}},_openDialog:function(){var t=this.getContent().getValue();try{var e=JSON.stringify(JSON.parse(t),0,"\t");this._oEditor.setValue(e)}catch(e){this._oEditor.setValue(t)}this._oDialog.open()},onClose:function(){this._oCode=null;this._oDialog.close()},onBeautify:function(){try{var t=JSON.stringify(JSON.parse(this._oEditor.getValue()),0,"\t");this._oEditor.setValue(t)}catch(t){}},onLiveChange:function(t){try{this._oCode=JSON.parse(t.getParameter("value"));this._oDialog.getBeginButton().setEnabled(true)}catch(t){this._oDialog.getBeginButton().setEnabled(false)}},onShowError:function(){var t=(this._oEditor.getInternalEditorInstance().getSession().getAnnotations()||[]).map(function(t){return"Line "+String(t.row)+": "+t.text}).join("\n");this._oErrorMsg.setText(t);this._oErrorMsg.setVisible(!!t)},onSave:function(){var t=this.getContent();if(this._oCode){this.setValue(this._oCode);t.setValueState("None");t.setValue(JSON.stringify(this._oCode))}this._oDialog.close()},renderer:t.getMetadata().getRenderer().render});o.configMetadata=Object.assign({},t.configMetadata,{typeLabel:{defaultValue:"BASE_EDITOR.TYPES.JSON"}});return o});