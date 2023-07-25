/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./ComboBox","./ComboBoxRenderer","./ListBox","./TextField","./TextFieldRenderer","./library","sap/ui/core/Control","sap/ui/core/History","sap/ui/core/Renderer","./SearchFieldRenderer","sap/ui/core/library","./Button","sap/ui/Device","sap/ui/core/SeparatorItem","sap/ui/core/ListItem","sap/ui/events/KeyCodes","sap/ui/dom/containsOrEquals","sap/ui/core/Configuration","sap/ui/dom/jquery/rect","sap/ui/dom/jquery/getSelectedText"],function(e,t,i,r,s,a,o,n,u,l,h,g,p,c,d,f,b,y,_){"use strict";var m=g.TextAlign;var v=g.ValueState;var S=n.extend("sap.ui.commons.SearchField",{metadata:{deprecated:true,interfaces:["sap.ui.commons.ToolbarItem"],library:"sap.ui.commons",properties:{enableListSuggest:{type:"boolean",group:"Behavior",defaultValue:true},showListExpander:{type:"boolean",group:"Behavior",defaultValue:true},enableClear:{type:"boolean",group:"Behavior",defaultValue:false},showExternalButton:{type:"boolean",group:"Behavior",defaultValue:false},enableCache:{type:"boolean",group:"Behavior",defaultValue:true},enableFilterMode:{type:"boolean",group:"Behavior",defaultValue:false},value:{type:"string",group:"Data",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:v.None},placeholder:{type:"string",group:"Appearance",defaultValue:""},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:m.Begin},visibleItemCount:{type:"int",group:"Behavior",defaultValue:20},startSuggestion:{type:"int",group:"Behavior",defaultValue:3},maxSuggestionItems:{type:"int",group:"Behavior",defaultValue:10},maxHistoryItems:{type:"int",group:"Behavior",defaultValue:0}},aggregations:{searchProvider:{type:"sap.ui.core.search.SearchProvider",multiple:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{search:{parameters:{query:{type:"string"}}},suggest:{parameters:{value:{type:"string"}}}}}});var E=20;S.prototype.init=function(){C(this,this.getEnableListSuggest());this._oHistory=new u(this.getId());this._clearTooltipText=x("SEARCHFIELD_CLEAR_TOOLTIP")};S.prototype.exit=function(){if(this._ctrl){this._ctrl.destroy()}if(this._lb){this._lb.destroy()}if(this._btn){this._btn.destroy()}this._ctrl=null;this._lb=null;this._btn=null;this._oHistory=null};S.prototype.onThemeChanged=function(e){if(this.getDomRef()){this.invalidate()}};S.prototype.onAfterRendering=function(){if(this.getShowExternalButton()){var e=this._btn.$().outerWidth(true);this._ctrl.$().css(_.getRTL()?"left":"right",e+"px")}P(this)};S.prototype.getFocusDomRef=function(){return this._ctrl.getFocusDomRef()};S.prototype.getIdForLabel=function(){return this._ctrl.getId()+"-input"};S.prototype.onpaste=function(e){var t=this;setTimeout(function(){t._ctrl._triggerValueHelp=true;t._ctrl.onkeyup()},0)};S.prototype.oncut=S.prototype.onpaste;S.prototype.fireSearch=function(t){var i=e(this._ctrl.getInputDomRef()).val();if(!this.getEditable()||!this.getEnabled()){return this}this.setValue(i);if(!i&&!this.getEnableFilterMode()){return this}if(!t){t={}}if(!t.noFocus){i=this.getValue();this.focus();if(i&&this.getMaxHistoryItems()>0){this._oHistory.add(i)}this.fireEvent("search",{query:i})}return this};S.prototype.hasListExpander=function(){return V()?false:this.getShowListExpander()};S.prototype.clearHistory=function(){this._oHistory.clear()};S.prototype.suggest=function(e,t){if(!this.getEnableListSuggest()||!e||!t){return}this._ctrl.updateSuggestions(e,t)};S.prototype.setEnableListSuggest=function(e){if(this.getEnableListSuggest()&&e||!this.getEnableListSuggest()&&!e){return this}C(this,e);this.setProperty("enableListSuggest",e);return this};S.prototype.getValue=function(){return I(this,"Value")};S.prototype.setValue=function(e){var t=A(this,"Value",e,!!this.getDomRef(),true);if(this.getEnableClear()&&this.getDomRef()){this.$().toggleClass("sapUiSearchFieldVal",!!e);P(this)}return t};S.prototype.setEnableCache=function(e){return this.setProperty("enableCache",e,true)};S.prototype.getEnabled=function(){return I(this,"Enabled")};S.prototype.setEnabled=function(e){if(this._btn){this._btn.setEnabled(e&&this.getEditable())}return A(this,"Enabled",e,false,true)};S.prototype.getEditable=function(){return I(this,"Editable")};S.prototype.setEditable=function(e){if(this._btn){this._btn.setEnabled(e&&this.getEnabled())}return A(this,"Editable",e,false,true)};S.prototype.getMaxLength=function(){return I(this,"MaxLength")};S.prototype.setMaxLength=function(e){return A(this,"MaxLength",e,false,true)};S.prototype.getValueState=function(){return I(this,"ValueState")};S.prototype.setValueState=function(e){return A(this,"ValueState",e,false,true)};S.prototype.getPlaceholder=function(){return I(this,"Placeholder")};S.prototype.setPlaceholder=function(e){return A(this,"Placeholder",e,false,true)};S.prototype.getTextAlign=function(){return I(this,"TextAlign")};S.prototype.setTextAlign=function(e){return A(this,"TextAlign",e,false,true)};S.prototype.getTooltip=function(){return I(this,"Tooltip")};S.prototype.setTooltip=function(e){return A(this,"Tooltip",e,true,false)};S.prototype.getVisibleItemCount=function(){return I(this,"MaxPopupItems")};S.prototype.setVisibleItemCount=function(e){return A(this,"MaxPopupItems",e,false,true)};S.prototype.setShowExternalButton=function(e){if(!this._btn){var t=this;this._btn=new p(this.getId()+"-btn",{text:x("SEARCHFIELD_BUTTONTEXT"),enabled:this.getEditable()&&this.getEnabled(),press:function(){t.fireSearch()}});this._btn.setParent(this)}this.setProperty("showExternalButton",e);return this};S.prototype.getAriaDescribedBy=function(){return this._ctrl.getAriaDescribedBy()};S.prototype.getAriaLabelledBy=function(){return this._ctrl.getAriaLabelledBy()};S.prototype.removeAllAriaDescribedBy=function(){return this._ctrl.removeAllAriaDescribedBy()};S.prototype.removeAllAriaLabelledBy=function(){return this._ctrl.removeAllAriaLabelledBy()};S.prototype.removeAriaDescribedBy=function(e){return this._ctrl.removeAriaDescribedBy(e)};S.prototype.removeAriaLabelledBy=function(e){return this._ctrl.removeAriaLabelledBy(e)};S.prototype.addAriaDescribedBy=function(e){this._ctrl.addAriaDescribedBy(e);return this};S.prototype.addAriaLabelledBy=function(e){this._ctrl.addAriaLabelledBy(e);return this};var P=function(e){var t=e.$(),i=e._ctrl.$("searchico");if(t.hasClass("sapUiSearchFieldClear")&&t.hasClass("sapUiSearchFieldVal")){i.attr("title",e._clearTooltipText)}else{i.removeAttr("title")}};var A=function(e,t,i,r,s){var a=I(e,t);e._ctrl["set"+t](i);if(!r){e.invalidate()}if(s){e.updateModelProperty(t.toLowerCase(),i,a)}return e};var I=function(e,t){return e._ctrl["get"+t]()};var C=function(t,i){if(!t._lb){t._lb=new r(t.getId()+"-lb")}var s=t._ctrl;var a=null;if(i){a=new S.CB(t.getId()+"-cb",{listBox:t._lb,maxPopupItems:E});a.addDependent(t._lb)}else{a=new S.TF(t.getId()+"-tf")}a.setParent(t);a.addEventDelegate({onAfterRendering:function(){P(t);var i=e(a.getFocusDomRef());var r=i.attr("aria-labelledby")||"";if(r){r=" "+r}i.attr("aria-labelledby",t.getId()+"-label"+r)}});if(s){a.setValue(s.getValue());a.setEnabled(s.getEnabled());a.setEditable(s.getEditable());a.setMaxLength(s.getMaxLength());a.setValueState(s.getValueState());a.setPlaceholder(s.getPlaceholder());a.setTextAlign(s.getTextAlign());a.setTooltip(s.getTooltip());a.setMaxPopupItems(s.getMaxPopupItems());var o=s.getAriaDescribedBy();for(var n=0;n<o.length;n++){a.addAriaDescribedBy(o[n])}s.removeAllAriaDescribedBy();o=s.getAriaLabelledBy();for(var n=0;n<o.length;n++){a.addAriaLabelledBy(o[n])}s.removeAllAriaLabelledBy();s.removeAllDependents();s.destroy()}t._ctrl=a};var x=function(e,t){var i=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");if(i){return i.getText(e,t)}return e};var V=function(){return c.browser.mobile&&!c.system.desktop};var B=function(e,t){e.write("<div");e.writeAttributeEscaped("id",t.getId()+"-searchico");e.writeAttribute("unselectable","on");if(_.getAccessibility()){e.writeAttribute("role","presentation")}e.addClass("sapUiSearchFieldIco");e.writeClasses();e.write("></div>")};s.extend("sap.ui.commons.SearchField.TF",{metadata:{library:"sap.ui.commons"},constructor:function(e,t){s.apply(this,arguments)},getInputDomRef:function(){return this.getDomRef("input")},onkeyup:function(e){S.CB.prototype.onkeyup.apply(this,arguments)},_triggerSuggest:function(e){this._sSuggest=null;if(e&&e.length>=this.getParent().getStartSuggestion()||!e&&this.getParent().getStartSuggestion()==0){this.getParent().fireSuggest({value:e})}},_checkChange:function(e,t){this.getParent().fireSearch({noFocus:t})},onsapfocusleave:function(e){if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onblur&&e.relatedControlId!=this.getId()){this.getRenderer().onblur(this)}this._checkChange(e,true)},onclick:function(t){if(t.target===this.getDomRef("searchico")){if(this.oPopup&&this.oPopup.isOpen()){this.oPopup.close()}if(this.getEditable()&&this.getEnabled()){this.focus()}if(!this.getParent().getEnableClear()){this._checkChange(t)}else{if(!e(this.getInputDomRef()).val()||!this.getEditable()||!this.getEnabled()){return}this.setValue("");this._triggerValueHelp=true;this.onkeyup();if(this.getParent().getEnableFilterMode()){e(this.getInputDomRef()).val("");this.getParent().fireSearch()}}}},getMaxPopupItems:function(){return this._iVisibleItemCount?this._iVisibleItemCount:E},setMaxPopupItems:function(e){this._iVisibleItemCount=e},renderer:{renderOuterContentBefore:B,renderOuterAttributes:function(e,t){e.addClass("sapUiSearchFieldTf")},renderInnerAttributes:function(e,t){if(!c.os.ios){e.writeAttribute("type","search")}if(V()){e.writeAttribute("autocapitalize","off");e.writeAttribute("autocorrect","off")}}}});S.TF.prototype.getFocusDomRef=S.TF.prototype.getInputDomRef;t.extend("sap.ui.commons.SearchField.CB",{metadata:{library:"sap.ui.commons"},constructor:function(e,i){t.apply(this,arguments);this._mSuggestions={};this._aSuggestValues=[];this.mobile=false},updateSuggestions:function(t,i){this._mSuggestions[t]=i;if(this.getInputDomRef()&&e(this.getInputDomRef()).val()===t&&this._hasSuggestValue(t)){this._doUpdateList(t)}},applyFocusInfo:function(t){e(this.getInputDomRef()).val(t.sTypedChars);return this},_getListBox:function(){return this.getParent()._lb},_hasSuggestValue:function(e){return this._aSuggestValues.length>0&&e==this._aSuggestValues[this._aSuggestValues.length-1]},_doUpdateList:function(t,i){var r=this._updateList(t);this._aSuggestValues=[t];if((!this.oPopup||!this.oPopup.isOpen())&&!i&&!r){this._open()}else if(this.oPopup&&this.oPopup.isOpen()&&r){this._close()}if(!r&&!this._lastKeyIsDel&&t===e(this.getInputDomRef()).val()){this._doTypeAhead()}},onclick:function(i){t.prototype.onclick.apply(this,arguments);if(i.target===this.getDomRef("searchico")){if(this.oPopup&&this.oPopup.isOpen()){this.oPopup.close()}if(!this.getParent().getEnableClear()){this.getParent().fireSearch()}else if(e(this.getInputDomRef()).val()&&this.getEditable()&&this.getEnabled()){this.setValue("");this._triggerValueHelp=true;this.onkeyup();this._aSuggestValues=[];if(this.getParent().getEnableFilterMode()){e(this.getInputDomRef()).val("");this.getParent().fireSearch()}}if(this.getEditable()&&this.getEnabled()){this.focus()}}else if(y(this.getDomRef("providerico"),i.target)){if(this.getEditable()&&this.getEnabled()){this.focus()}}},onkeypress:S.TF.prototype.onkeypress,onkeyup:function(i){var r=e(this.getInputDomRef());var s=r.val();this.getParent().$().toggleClass("sapUiSearchFieldVal",!!s);P(this.getParent());if(i){if(i.keyCode===b.F2){var a=e(this.getFocusDomRef());var o=a.data("sap.InNavArea");if(typeof o==="boolean"){a.data("sap.InNavArea",!o)}}if(t._isHotKey(i)||i.keyCode===b.F4&&i.which===0){return}if(s&&s==r.getSelectedText()){return}var n=i.which||i.keyCode;if(n!==b.ESCAPE||this instanceof S.TF){this._triggerValueHelp=true;this._lastKeyIsDel=n==b.DELETE||n==b.BACKSPACE}}if(this._triggerValueHelp){this._triggerValueHelp=false;if(this._sSuggest){clearTimeout(this._sSuggest);this._sSuggest=null}var u=e(this.getInputDomRef()).val();if(u&&u.length>=this.getParent().getStartSuggestion()||!u&&this.getParent().getStartSuggestion()==0){this._sSuggest=setTimeout(function(){this._triggerSuggest(u)}.bind(this),200)}else if(this._doUpdateList){this._doUpdateList(u,true)}}},_triggerSuggest:function(e){this._sSuggest=null;if(!this._mSuggestions[e]||!this.getParent().getEnableCache()){this._aSuggestValues.push(e);var t=this.getParent().getSearchProvider();if(t){var i=this.getParent();t.suggest(e,function(e,t){if(i){i.suggest(e,t)}})}else{this.getParent().fireSuggest({value:e})}}else{this._doUpdateList(e)}},_updateList:function(t){var i=false;var r=this._getListBox();r.destroyAggregation("items",true);var s=function(e,t,i,r){t=t?t:[];var s=Math.min(t.length,i);if(r&&s>0){e.addItem(new d)}for(var a=0;a<s;a++){e.addItem(new f({text:t[a]}))}return s};var a=s(r,this.getParent()._oHistory.get(t),this.getParent().getMaxHistoryItems(),false);var o=s(r,t&&t.length>=this.getParent().getStartSuggestion()?this._mSuggestions[t]:[],this.getParent().getMaxSuggestionItems(),a>0);if(a<=0&&o==0){r.addItem(new f({text:x("SEARCHFIELD_NO_ITEMS"),enabled:false}));i=true}var n=r.getItems().length;var u=this.getMaxPopupItems();r.setVisibleItems(u<n?u:n);r.setSelectedIndex(-1);r.setMinWidth(e(this.getDomRef()).rect().width+"px");r.rerender();return i},_prepareOpen:function(){},_open:function(){t.prototype._open.apply(this,[0])},_rerenderListBox:function(){return this._updateList(this._aSuggestValues.length>0?this._aSuggestValues[this._aSuggestValues.length-1]:null)&&!this._forceOpen},_checkChange:function(e,t,i){this.getParent().fireSearch({noFocus:i})},onsapfocusleave:function(e){if(e.relatedControlId===this._getListBox().getId()){this.focus();return}this._checkChange(e,true,true)},onfocusout:function(e){if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onblur){this.getRenderer().onblur(this)}this._checkChange(e,true,true)},onsapshow:function(e){if(this.getParent().hasListExpander()){t.prototype.onsapshow.apply(this,arguments)}else{e.preventDefault();e.stopImmediatePropagation()}},_handleSelect:function(e){var i=t.prototype._handleSelect.apply(this,arguments);if(i&&i.getEnabled()){this.getParent().fireSearch()}},renderer:{renderOuterContentBefore:function(e,t){if(t.getParent().hasListExpander()){i.renderOuterContentBefore.apply(this,arguments)}B.apply(this,arguments);if(t.getParent().getSearchProvider()&&t.getParent().getSearchProvider().getIcon()){e.write("<div");e.writeAttributeEscaped("id",t.getId()+"-providerico");e.writeAttribute("unselectable","on");if(_.getAccessibility()){e.writeAttribute("role","presentation")}e.addClass("sapUiSearchFieldProvIco");e.writeClasses();e.write('><img src="'+t.getParent().getSearchProvider().getIcon()+'"></div>')}},renderOuterAttributes:function(e,t){i.renderOuterAttributes.apply(this,arguments);e.addClass("sapUiSearchFieldCb");if(t.getParent().getSearchProvider()&&t.getParent().getSearchProvider().getIcon()){e.addClass("sapUiSearchFieldCbProv")}},renderInnerAttributes:function(e,t){if(!c.os.ios){e.writeAttribute("type","search")}if(V()){e.writeAttribute("autocapitalize","off");e.writeAttribute("autocorrect","off")}}}});return S});