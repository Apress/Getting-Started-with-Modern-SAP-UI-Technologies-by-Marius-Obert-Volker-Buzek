/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/library","sap/ui/core/Control","sap/ui/core/theming/Parameters","sap/ui/layout/form/Form","sap/ui/base/ManagedObjectObserver","sap/base/Log"],function(t,e,i,o,s,a){"use strict";var r;var n;var l;var u;var h;var p;var c;var f;var g=t.smartform.SmartFormValidationMode;var d=t.smartform.Importance;var m={ResponsiveGridLayout:{layout:undefined,path:"sap/ui/layout/form/ResponsiveGridLayout",name:"sap.ui.layout.form.ResponsiveGridLayout",requested:false,loaded:rt,promise:undefined},ResponsiveLayout:{layout:undefined,path:"sap/ui/layout/form/ResponsiveLayout",name:"sap.ui.layout.form.ResponsiveLayout",requested:false,loaded:nt,promise:undefined},ColumnLayout:{layout:undefined,path:"sap/ui/layout/form/ColumnLayout",name:"sap.ui.layout.form.ColumnLayout",requested:false,loaded:lt,promise:undefined}};var y={apiVersion:2,render:function(t,e){t.openStart("div",e);t.class("sapUiCompSmartForm");t.openEnd();var i=e.getAggregation("content");t.renderControl(i);t.close("div")}};var b=e.extend("sap.ui.comp.smartform.SmartForm",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartform/SmartForm.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},useHorizontalLayout:{type:"boolean",group:"Misc",defaultValue:null},horizontalLayoutGroupElementMinWidth:{type:"int",group:"Misc",defaultValue:null},checkButton:{type:"boolean",group:"Misc",defaultValue:false},entityType:{type:"string",group:"Misc",defaultValue:null},expandable:{type:"boolean",group:"Misc",defaultValue:false},expanded:{type:"boolean",group:"Misc",defaultValue:null},editTogglable:{type:"boolean",group:"Misc",defaultValue:false},editable:{type:"boolean",group:"Misc",defaultValue:false},ignoredFields:{type:"string",group:"Misc",defaultValue:null},flexEnabled:{type:"boolean",group:"Misc",defaultValue:true},validationMode:{type:"sap.ui.comp.smartform.SmartFormValidationMode",group:"Misc",defaultValue:g.Standard},importance:{type:"sap.ui.comp.smartform.Importance",group:"Misc",defaultValue:d.Low}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.ui.comp.smartform.Group",multiple:true,singularName:"group"},content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},layout:{type:"sap.ui.comp.smartform.SmartFormLayout",multiple:false},semanticObjectController:{type:"sap.ui.comp.navpopover.SemanticObjectController",multiple:false},customToolbar:{type:"sap.m.Toolbar",multiple:false},toolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{editToggled:{parameters:{editable:{type:"boolean"}}},checked:{parameters:{erroneousFields:{type:"sap.ui.comp.smartfield.SmartField[]"}}}}},renderer:y});b.prototype.init=function(){this._oForm=new o(this.getId()+"--Form");this._oForm.getToolbar=function(){var t=this.getParent();if(t&&!t.getExpandable()){return t._getToolbar()}};this.setAggregation("content",this._oForm);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");this._oObserver=new s(E.bind(this));this._oObserver.observe(this,{properties:["editTogglable","title","checkButton","useHorizontalLayout","horizontalLayoutGroupElementMinWidth","expandable","expanded"],aggregations:["layout","customData"],associations:["ariaLabelledBy"]})};b.prototype.onBeforeRendering=function(){st.call(this)};b.prototype.onAfterRendering=function(){var t=this.getSmartFields(false,false),e=this.getImportance();if(!this.isPropertyInitial("importance")){t.forEach(function(t){t._setVisibilityBasedOnImportance(e)})}};b.prototype.addGroup=function(t){var e=this,i,o,s;if(!t){return this}s=this._getSmartFieldsByGroup(t,false);s.forEach(function(t){i=t.setImportance;t.setImportance=function(){i.apply(this,arguments);o=e.getImportance();this._setVisibilityBasedOnImportance(o)}});t=this.validateAggregation("groups",t,true);V.call(this,t);this._oForm.addFormContainer(t);_.call(this,t);return this};b.prototype.getGroups=function(){return this._oForm.getFormContainers()};b.prototype.indexOfGroup=function(t){return this._oForm.indexOfFormContainer(t)};b.prototype.insertGroup=function(t,e){if(!t){return this}t=this.validateAggregation("groups",t,true);V.call(this,t);this._oForm.insertFormContainer(t,e);_.call(this,t);return this};b.prototype.removeGroup=function(t){var e=this._oForm.removeFormContainer(t);if(e){e.detachEvent("_visibleChanged",pt,this);z.call(this,e);pt.call(this)}return e};b.prototype.removeAllGroups=function(){var t=this._oForm.removeAllFormContainers();for(var e=0;e<t.length;e++){t[e].detachEvent("_visibleChanged",pt,this);z.call(this,t[e])}pt.call(this);return t};b.prototype.destroyGroups=function(){var t=this.getGroups();for(var e=0;e<t.length;e++){t[e].detachEvent("_visibleChanged",pt,this)}this._oForm.destroyFormContainers();pt.call(this);return this};function _(t){var e=this.getUseHorizontalLayout();var i=this.getHorizontalLayoutGroupElementMinWidth();t.attachEvent("_visibleChanged",pt,this);if(i!=t.getHorizontalLayoutGroupElementMinWidth){t.setHorizontalLayoutGroupElementMinWidth(i)}if(e!=t.getUseHorizontalLayout()){t.setUseHorizontalLayout(e)}if(e){t._updateGridDataSpan();t._updateLineBreaks()}else{pt.call(this)}}b.prototype._getToolbar=function(){var t=this.getCustomToolbar();return t||this.getAggregation("toolbar")};b.prototype.propagateGridDataSpan=function(){var t=this.getGroups();for(var e=0;e<t.length;e++){var i=t[e];i._updateGridDataSpan();i._updateLineBreaks()}return this};b.prototype._getGridDataSpanNumbers=function(){var t=this.getLayout();var e;if(t&&t._getGridDataSpanNumbers){e=t._getGridDataSpanNumbers()}return e};b.prototype._toggleEditMode=function(){var t=this.getEditable();this.setEditable(!t)};b.prototype.check=function(t){var e={considerOnlyVisible:true,handleSuccess:false};if(typeof t==="boolean"){e.considerOnlyVisible=t}else{e=Object.assign(e,t)}if(this.getValidationMode()===g.Standard){return this._checkClientError(e)}else{return this._checkClientErrorAsync(e)}};b.prototype._checkClientError=function(t){if(t.considerOnlyVisible===undefined){t.considerOnlyVisible=true}var e=this.getSmartFields(t.considerOnlyVisible,t.considerOnlyVisible);var i=[];var o=null;e.forEach(function(e){if(e.checkClientError({handleSuccess:t.handleSuccess})){if(t.considerOnlyVisible&&e.getVisible){if(!e.getVisible()){return}}o=e.getParent();while(o.getParent){o=o.getParent();if(o.isA("sap.ui.comp.smartform.Group")){if(!o.getExpanded()){o.setExpanded(true)}break}}i.push(e.getId())}});return i};b.prototype._checkClientErrorAsync=function(t){var e=this.getSmartFields(t.considerOnlyVisible,t.considerOnlyVisible),i,o=[],s;this.setBusy(true);if(t.considerOnlyVisible===undefined){t.considerOnlyVisible=true}i=e.map(function(e){if(t.considerOnlyVisible&&!e.getVisible()){return false}return e.checkValuesValidity({handleSuccess:t.handleSuccess}).catch(function(){s=e.getParent();while(s.getParent){s=s.getParent();if(s.isA("sap.ui.comp.smartform.Group")){if(!s.getExpanded()){s.setExpanded(true)}break}}o.push(e.getId())})});return Promise.all(i).then(function(){this.setBusy(false);return o}.bind(this))};b.prototype._displayError=function(t){var e=this._oRb.getText("FORM_CLIENT_CHECK_ERROR_TITLE");var i=this._oRb.getText("FORM_CLIENT_CHECK_ERROR");if(!c&&!this._bMessageBoxRequested){c=sap.ui.require("sap/m/MessageBox");if(!c){sap.ui.require(["sap/m/MessageBox"],v.bind(this));this._bMessageBoxRequested=true}}if(c){c.show(i,{icon:c.Icon.ERROR,title:e,styleClass:this.$()&&this.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":""})}};function v(t){c=t;this._bMessageBoxRequested=false;if(!this._bIsBeingDestroyed){L.call(this)}}function L(){var t=this.check(true);if(t&&t.length>0){this._displayError(t);return true}return false}function C(){return this.check(true).then(function(t){if(t&&t.length){this._displayError(t)}return t}.bind(this))}b.prototype.setEditable=function(t){var e=this.getEditable();t=this.validateProperty("editable",t);if(e===t){return this}if(!t&&this.hasListeners("editToggled")){if(this.getValidationMode()===g.Standard){if(L.call(this)){return this}}else{C.call(this).then(function(e){if(e.length){return this.setProperty("editable",true)}T.call(this,t)}.bind(this));return this.setProperty("editable",t)}}this.setProperty("editable",t);T.call(this,t);return this};function T(t){if(this._oForm){this._oForm.setEditable(t)}this.fireEditToggled({editable:t});if(this._oEditToggleButton){this._oEditToggleButton.setIcon(t?"sap-icon://display":"sap-icon://edit");var e=this._oRb.getText(t?"FORM_TOOLTIP_DISPLAY":"FORM_TOOLTIP_EDIT");this._oEditToggleButton.setTooltip(e)}if(this.getCheckButton()&&t){J.call(this)}else{Q.call(this)}}function E(t){if(t.object==this){if(t.name=="editTogglable"){S.call(this,t.current)}else if(t.name=="title"){B.call(this,t.current)}else if(t.name=="checkButton"){F.call(this,t.current)}else if(t.name=="useHorizontalLayout"){M.call(this,t.current)}else if(t.name=="horizontalLayoutGroupElementMinWidth"){I.call(this,t.current)}else if(t.name=="expanded"){q.call(this,t.current)}else if(t.name=="expandable"){R.call(this,t.current)}else if(t.name=="layout"){k.call(this,t.child,t.mutation)}else if(t.name=="customData"){A.call(this,t.child,t.mutation)}else if(t.name=="ariaLabelledBy"){D.call(this,t.ids,t.mutation)}}else if(t.object.isA("sap.ui.comp.smartform.SmartFormLayout")){gt.call(this,t.object,t.name,t.current,t.old)}}function S(t){if(t){Y.call(this)}else{$.call(this)}w.call(this)}function B(t){if(this._oPanel){this._oPanel.setHeaderText(t)}w.call(this)}function F(t){if(t){J.call(this)}else{Q.call(this)}w.call(this)}function M(t){if(t){this.addStyleClass("sapUiCompSmartFormHorizontalLayout")}else{this.removeStyleClass("sapUiCompSmartFormHorizontalLayout")}var e=this.getGroups();if(e){e.forEach(function(e){if(e.getUseHorizontalLayout()!=t){e.setUseHorizontalLayout(t)}})}var i=this.getLayout();if(t){ut.call(this,i)}else{st.call(this);ut.call(this,i)}}function k(t,e){if(e==="remove"){this._oObserver.unobserve(t)}else{this._oObserver.observe(t,{properties:true})}if(t.isA("sap.ui.comp.smartform.Layout")){this.propagateGridDataSpan()}st.call(this);ut.call(this,e==="insert"?t:null)}function I(t){a.error("HorizontalLayoutGroupElementMinWidth is deprecated",this);var e=this.getGroups();if(e){e.forEach(function(e){e.setHorizontalLayoutGroupElementMinWidth(t)})}}b.prototype.getVisibleProperties=function(){var t=[];var e=this.getGroups();if(e){e.forEach(function(e){var i=e.getGroupElements();if(i.length>0){i.forEach(function(e){var i=e.getElements();if(i.length>0){i.forEach(function(e){if(e.getVisible()){var i=e.getBindingPath("value");if(i){t.push(i)}}})}})}})}return t};b.prototype.setCustomToolbar=function(t){var e=this.getCustomToolbar();if(e==t){return this}W.call(this);$.call(this);Q.call(this);this.setAggregation("customToolbar",t);if(this.getTitle()){w.call(this)}if(this.getEditTogglable()){Y.call(this)}if(this.getCheckButton()){J.call(this)}return this};b.prototype.destroyCustomToolbar=function(){var t=this.getCustomToolbar();if(t){W.call(this);$.call(this);Q.call(this)}this.destroyAggregation("customToolbar");if(this.getTitle()){w.call(this)}if(this.getEditTogglable()){Y.call(this)}if(this.getCheckButton()){J.call(this)}return this};function R(t){if(t){if(!r&&!this._bPanelRequested){r=sap.ui.require("sap/m/Panel");if(!r){sap.ui.require(["sap/m/Panel"],O.bind(this));this._bPanelRequested=true}}if(r){G.call(this)}}else if(this._oPanel){this.setAggregation("content",this._oForm);this._oPanel.destroy();this._oPanel=null}w.call(this)}function G(){this._oPanel=new r(this.getId()+"--Panel",{expanded:this.getExpanded(),expandable:true,headerText:this.getTitle(),expandAnimation:false});this._oPanel.getHeaderToolbar=function(){var t=this.getParent();if(t){return t._getToolbar()}};this._oPanel.attachExpand(P,this);this.setAggregation("content",this._oPanel);this._oPanel.addContent(this._oForm)}function O(t){r=t;this._bPanelRequested=false;if(this.getExpandable()&&!this._bIsBeingDestroyed){G.call(this)}}function P(t){this.setProperty("expanded",t.getParameter("expand"),true)}function q(t){if(this._oPanel){this._oPanel.setExpanded(t)}}function A(t,e){var i=this.getGroups();for(var o=0;o<i.length;o++){if(e==="insert"){x.call(this,i[o],t)}else{z.call(this,i[o],t.getId())}}}function V(t){var e=this.getCustomData();for(var i=0;i<e.length;i++){x.call(this,t,e[i])}}function x(e,i){if(t.smartform.inheritCostomDataToFields(i)){var o=i.clone();o._bFromSmartForm=true;o._sOriginalId=i.getId();e.addCustomData(o)}}function z(t,e){var i=t.getCustomData();for(var o=0;o<i.length;o++){var s=i[o];if(s._bFromSmartForm&&(!e||e==s._sOriginalId)){t.removeCustomData(s)}}}function D(t,e){var i;if(Array.isArray(t)){i=t}else{i=[t]}for(var o=0;o<i.length;o++){var s=i[o];if(e==="insert"){this._oForm.addAriaLabelledBy(s)}else{this._oForm.removeAriaLabelledBy(s)}}}b.prototype._getSmartFieldsByGroup=function(t,e){var i=[],o=[],s=[];i=t.getGroupElements();for(var a=0;a<i.length;a++){var r=i[a];if(!e||e&&r.isVisible()){o=r.getElements();for(var n=0;n<o.length;n++){var l=o[n];if(l.isA("sap.ui.comp.smartfield.SmartField")){s.push(l)}}}}return s};b.prototype.getSmartFields=function(t,e){var i=[],o,s=[];if(t===undefined){t=true}i=this.getGroups();for(var a=0;a<i.length;a++){var r=i[a];if(!t||t&&r.isVisible()){o=this._getSmartFieldsByGroup(r,e);s=s.concat(o)}}return s};b.prototype.setFocusOnEditableControl=function(){var t=[];this.getGroups().forEach(function(e){if(e.isVisible()){e.getGroupElements().forEach(function(e){if(e.isVisible()){t=t.concat(e.getElements())}})}});t.some(function(t){if(t.getEditable&&t.getEditable()&&t.focus&&t.getVisible()){if(t.isA("sap.ui.comp.smartfield.SmartField")){t.attachEventOnce("innerControlsCreated",function(t){setTimeout(t.oSource._oControl[t.oSource._oControl.current]["focus"].bind(t.oSource._oControl[t.oSource._oControl.current]),0)})}else{t.focus()}return true}})};b.prototype.clone=function(t,i){this.setAggregation("content",null);var o=this.getAggregation("toolbar");var s=this.getCustomToolbar();var a=this.getCustomData();var r=this.getGroups();var n=0;if(s){W.call(this);$.call(this);Q.call(this)}else if(o){this.setAggregation("toolbar",null)}if(a.length>0){for(n=0;n<r.length;n++){z.call(this,r[n])}}var l=e.prototype.clone.apply(this,arguments);for(n=0;n<r.length;n++){var u=r[n].clone(t,i);l.addGroup(u)}if(this.getExpandable()&&this._oPanel){this.setAggregation("content",this._oPanel)}else{this.setAggregation("content",this._oForm)}if(s){if(this.getTitle()){w.call(this)}if(this.getEditTogglable()){Y.call(this)}if(this.getCheckButton()){J.call(this)}}else if(o){this.setAggregation("toolbar",o)}if(a.length>0){for(n=0;n<r.length;n++){V.call(this,r[n])}}return l};b.prototype.exit=function(){if(this._oForm){this._oForm.destroy()}if(this._oPanel){this._oPanel.destroy()}if(this._oTitle){this._oTitle.destroy()}if(this._oEditToggleButton){this._oEditToggleButton.destroy()}this._oForm=null;this._oPanel=null;this._oTitle=null;this._oRb=null;this._oEditToggleButton=null;this._oObserver.disconnect();this._oObserver=undefined};function H(){var t=this.getAggregation("toolbar");if(!t){t=new l(this.getId()+"-toolbar-sfmain",{height:"3rem",design:f.ToolbarDesign.Transparent});t._bCreatedBySmartForm=true;this.setAggregation("toolbar",t)}return t}function X(t){var e=this.getAggregation("toolbar");if(e){if(t){var i=e.getContent();if(i.length>0){return}}this.destroyAggregation("toolbar")}}function w(){var t=this.getTitle();if(t){if(!this.getCustomToolbar()&&!this.getCheckButton()&&!this.getEditTogglable()){if(this._oTitle){if(this._getToolbar()){W.call(this)}this._oForm.removeAriaLabelledBy(this._oTitle);this._oTitle.destroy();this._oTitle=null}if(!this._oPanel){this._oForm.setTitle(t)}}else{this._oForm.setTitle();if(!this._oTitle){if((!n||!l||!u||!h||!f)&&!this._bTitleRequested){n=sap.ui.require("sap/m/Title");l=sap.ui.require("sap/m/OverflowToolbar");u=sap.ui.require("sap/m/ToolbarSpacer");h=sap.ui.require("sap/m/ToolbarSeparator");f=sap.ui.require("sap/m/library");if(!n||!l||!u||!h||!f){sap.ui.require(["sap/m/Title","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/ToolbarSeparator","sap/m/library"],U.bind(this));this._bTitleRequested=true}}if(n&&!this._bTitleRequested){var e=i.get("sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize");this._oTitle=new n(this.getId()+"-title-sfmain",{level:e.toUpperCase()})}}if(this._oTitle){this._oTitle.setText(t);this._oForm.addAriaLabelledBy(this._oTitle);N.call(this)}}}else{if(this._oTitle){W.call(this);this._oForm.removeAriaLabelledBy(this._oTitle);this._oTitle.destroy();this._oTitle=null}else{this._oForm.setTitle()}}}function U(t,e,i,o,s){n=t;l=e;u=i;h=o;f=s;this._bTitleRequested=false;if(!this._bIsBeingDestroyed){w.call(this)}}function N(){if(!this._oTitle){return}var t=this._getToolbar();if(!t){t=H.call(this)}t.insertContent(this._oTitle,0)}function W(){if(!this._oTitle){return}var t=this._getToolbar();t.removeContent(this._oTitle);X.call(this,true)}function j(){if((!p||!l||!u||!h||!f)&&!this._bButtonRequested){p=sap.ui.require("sap/m/Button");l=sap.ui.require("sap/m/OverflowToolbar");u=sap.ui.require("sap/m/ToolbarSpacer");h=sap.ui.require("sap/m/ToolbarSeparator");f=sap.ui.require("sap/m/library");if(!p||!l||!u||!h||!f){sap.ui.require(["sap/m/Button","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/ToolbarSeparator","sap/m/library"],K.bind(this));this._bButtonRequested=true}}if(p&&!this._bButtonRequested){return true}return false}function K(t,e,i,o,s){p=t;l=e;u=i;h=o;f=s;this._bButtonRequested=false;if(!this._bIsBeingDestroyed){if(this._bEditRequested){this._bEditRequested=false;Y.call(this)}if(this._bCheckRequested){this._bCheckRequested=false;J.call(this)}}}function Y(){if(!this.getEditTogglable()){return}if(!j.call(this)){this._bEditRequested=true;return}var t=this._getToolbar();if(!t){t=H.call(this)}if(!this._oCheckButton){et.call(this,t)}if(!this._oEditToggleButton){var e=this.getEditable()?"sap-icon://display":"sap-icon://edit";var i=this._oRb.getText(this.getEditable()?"FORM_TOOLTIP_DISPLAY":"FORM_TOOLTIP_EDIT");this._oEditToggleButton=new p(t.getId()+"-button-sfmain-editToggle",{icon:e,tooltip:i});this._oEditToggleButton.attachPress(this._toggleEditMode,this)}var o=t.getContent().length;if(this._oCheckButton){o--}t.insertContent(this._oEditToggleButton,o)}function $(){if(!this._oEditToggleButton){return}var t=this._getToolbar();t.removeContent(this._oEditToggleButton);this._oEditToggleButton.destroy();this._oEditToggleButton=null;it.call(this,t);X.call(this,true)}function J(){if(!this.getCheckButton()||!this.getEditable()){return}if(!j.call(this)){this._bCheckRequested=true;return}var t=this._getToolbar();if(!t){t=H.call(this)}if(!this._oEditToggleButton){et.call(this,t)}if(!this._oCheckButton){this._oCheckButton=new p(this.getId()+"-"+t.getId()+"-button-sfmain-check",{text:this._oRb.getText("SMART_FORM_CHECK")});this._oCheckButton.attachPress(this.getValidationMode()===g.Standard?Z:tt,this)}var e=t.getContent().length;t.insertContent(this._oCheckButton,e)}function Q(){if(!this._oCheckButton){return}var t=this._getToolbar();t.removeContent(this._oCheckButton);this._oCheckButton.destroy();this._oCheckButton=null;it.call(this,t);X.call(this,true)}function Z(t){var e=[];e=this.check(true);this.fireChecked({erroneousFields:e})}function tt(t){this.check(true).then(function(t){this.fireChecked({erroneousFields:t})}.bind(this))}function et(t){var e;if(!t._bCreatedBySmartForm){var i=t.getContent();var o=false;for(var s=0;s<i.length;s++){if(i[s]instanceof u){o=true;break}}if(!o){e=new u(this.getId()+"-"+t.getId()+"-spacer");e._bCreatedBySmartForm=true;t.addContent(e)}if(!(i[i.length-1]instanceof h)){var a=new h(this.getId()+"-"+t.getId()+"-separator");a._bCreatedBySmartForm=true;t.addContent(a)}}else{e=new u(t.getId()+"-spacer");e._bCreatedBySmartForm=true;t.addContent(e)}}function it(t){var e=t.getContent();var i;if(!t._bCreatedBySmartForm){i=e[e.length-1];if(i instanceof h&&i._bCreatedBySmartForm){i.destroy()}e=t.getContent()}i=e[e.length-1];if(i instanceof u&&i._bCreatedBySmartForm){i.destroy()}}function ot(t,e){if(!t.layout&&!t.requested){t.layout=sap.ui.require(t.path);if(!t.layout){t.promise=new Promise(function(e){sap.ui.require([t.path],t.loaded.bind(this));t.resolve=e;t.requestIds=[this.getId()]}.bind(this));t.requested=true}}else if(!t.layout&&t.requested&&t.promise&&t.requestIds.indexOf(this.getId())<0){t.promise.then(function(){if(!this._bIsBeingDestroyed){st.call(this)}}.bind(this));t.requestIds.push(this.getId())}if(t.layout&&!t.requested&&!(e instanceof t.layout)){if(e){e.destroy()}e=new t.layout(this._oForm.getId()+"-layout");this._oForm.setLayout(e);return true}return false}function st(){var t=this.getLayout();var e=this._oForm.getLayout();var i=this.getUseHorizontalLayout();var o=false;if(t&&t.isA("sap.ui.comp.smartform.ColumnLayout")){if(i){throw new Error("ColumnLayout and useHorizontalLayout must not ne used at the same time on "+this)}o=ot.call(this,m.ColumnLayout,e);if(o){ft.call(this,t)}}else if(i&&(!t||!t.getGridDataSpan())){o=ot.call(this,m.ResponsiveLayout,e)}else if(!e||!m.ResponsiveGridLayout.layout||!(e instanceof m.ResponsiveGridLayout.layout)){o=ot.call(this,m.ResponsiveGridLayout,e);if(o){this._oFormLayoutNotInitial=true;ht.call(this,t)}}if(o){var s=this.getGroups();for(var a=0;a<s.length;a++){var r=s[a];r._updateLayoutData()}}}function at(t,e){t.layout=e;t.requested=false;t.resolve();delete t.resolve;delete t.requestIds;t.promise=undefined;if(!this._bIsBeingDestroyed){st.call(this)}}function rt(t){at.call(this,m.ResponsiveGridLayout,t)}function nt(t){at.call(this,m.ResponsiveLayout,t)}function lt(t){at.call(this,m.ColumnLayout,t)}function ut(t){if(!t||t.isA("sap.ui.comp.smartform.Layout")){ht.call(this,t)}else if(t.isA("sap.ui.comp.smartform.ColumnLayout")){ft.call(this,t)}}function ht(t){var e=this._oForm.getLayout();if(!e||!e.isA(m.ResponsiveGridLayout.name)){return}if(this.getUseHorizontalLayout()){if(t&&t.getGridDataSpan()){ct.call(this,e);e.setColumnsL(1);e.setColumnsM(1);if(t.getBreakpointM()>0){e.setBreakpointM(t.getBreakpointM())}if(t.getBreakpointL()>0){e.setBreakpointL(t.getBreakpointL())}if(t.getBreakpointXL()>0){e.setBreakpointXL(t.getBreakpointXL())}this._oFormLayoutNotInitial=true}}else{if(t){e.setLabelSpanXL(t.getLabelSpanXL()?t.getLabelSpanXL():-1);e.setLabelSpanL(t.getLabelSpanL()?t.getLabelSpanL():4);e.setLabelSpanM(t.getLabelSpanM()?t.getLabelSpanM():4);e.setLabelSpanS(t.getLabelSpanS()?t.getLabelSpanS():12);e.setEmptySpanXL(t.getEmptySpanXL()?t.getEmptySpanXL():-1);e.setEmptySpanL(t.getEmptySpanL()?t.getEmptySpanL():0);e.setEmptySpanM(t.getEmptySpanM()?t.getEmptySpanM():0);e.setColumnsXL(t.getColumnsXL()?t.getColumnsXL():-1);e.setColumnsL(t.getColumnsL()?t.getColumnsL():3);e.setColumnsM(t.getColumnsM()?t.getColumnsM():2);e.setSingleContainerFullSize(t.getSingleGroupFullSize());e.setBreakpointXL(t.getBreakpointXL()?t.getBreakpointXL():1440);e.setBreakpointL(t.getBreakpointL()?t.getBreakpointL():1024);e.setBreakpointM(t.getBreakpointM()?t.getBreakpointM():600);this._oFormLayoutNotInitial=true}else{ct.call(this,e)}pt.call(this,t,e)}}function pt(t,e){if(this.getUseHorizontalLayout()){return}if(!e){e=this._oForm.getLayout();t=this.getLayout()}if(!e||!e.isA(m.ResponsiveGridLayout.name)){return}var i=this.getGroups();var o=-1;var s=3;var a=true;var r=0;for(var n=0;n<i.length;n++){if(i[n].isVisible()){r++}}if(t){s=t.getColumnsL()?t.getColumnsL():3;o=t.getColumnsXL()>0?t.getColumnsXL():-1;a=t.getSingleGroupFullSize()}if(i&&r>0&&r<o&&a){e.setColumnsXL(r)}else if(e.getColumnsXL()!=o){e.setColumnsXL(o)}if(i&&r>0&&r<s&&a){e.setColumnsL(r)}else if(e.getColumnsL()!=s){e.setColumnsL(s)}}function ct(t){if(this._oFormLayoutNotInitial){t.setLabelSpanXL(-1);t.setLabelSpanL(4);t.setLabelSpanM(4);t.setLabelSpanS(12);t.setEmptySpanXL(-1);t.setEmptySpanL(0);t.setEmptySpanM(0);t.setColumnsXL(-1);t.setColumnsL(3);t.setColumnsM(2);t.setSingleContainerFullSize(true);t.setBreakpointXL(1440);t.setBreakpointL(1024);t.setBreakpointM(600);this._oFormLayoutNotInitial=false}}function ft(t){var e=this._oForm.getLayout();if(!e||!e.isA(m.ColumnLayout.name)){return}if(this.getUseHorizontalLayout()){throw new Error("ColumnLayout and useHorizontalLayout must not ne used at the same time on "+this)}else{e.setColumnsXL(t.getColumnsXL());e.setColumnsL(t.getColumnsL());e.setColumnsM(t.getColumnsM());e.setLabelCellsLarge(t.getLabelCellsLarge());e.setEmptyCellsLarge(t.getEmptyCellsLarge())}}function gt(t,e,i,o){ut.call(this,t);if(e==="gridDataSpan"){this.propagateGridDataSpan();if(i===""||o===""){st.call(this)}}}b.prototype._suggestTitleId=function(t){this._oForm._suggestTitleId(t);return this};return b});