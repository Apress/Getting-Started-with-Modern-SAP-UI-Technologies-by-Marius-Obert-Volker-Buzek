/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Dialog","./Popover","./SelectList","./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/LabelEnablement","sap/ui/core/Icon","sap/ui/core/IconPool","./Button","./Bar","./Title","./delegate/ValueStateMessage","sap/ui/core/message/MessageMixin","sap/ui/core/library","sap/ui/core/Item","sap/ui/Device","sap/ui/core/InvisibleText","./SelectRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","./Text","sap/m/SimpleFixFlex","sap/base/Log","sap/ui/core/ValueStateSupport","sap/ui/core/InvisibleMessage"],function(e,t,i,s,n,o,r,a,l,u,c,p,h,g,d,f,y,S,m,I,v,_,b,C,T,x,A){"use strict";var V=s.SelectListKeyboardNavigationMode;var P=s.PlacementType;var L=f.ValueState;var k=f.TextDirection;var R=f.TextAlign;var O=f.OpenState;var E=s.SelectType;var F=f.InvisibleMessageMode;var D=f.TitleLevel;var M=o.extend("sap.m.Select",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent","sap.m.IToolbarInteractiveControl","sap.f.IShellBar","sap.ui.core.ISemanticFormContent"],library:"sap.m",properties:{name:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},type:{type:"sap.m.SelectType",group:"Appearance",defaultValue:E.Default},autoAdjustWidth:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:R.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:k.Inherit},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:L.None},valueStateText:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},resetOnMissingKey:{type:"boolean",group:"Behavior",defaultValue:false},forceSelection:{type:"boolean",group:"Behavior",defaultValue:true},wrapItemsText:{type:"boolean",group:"Behavior",defaultValue:false},columnRatio:{type:"sap.m.SelectColumnRatio",group:"Appearance",defaultValue:"3:2"},required:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable",forwarding:{getter:"getList",aggregation:"items"}},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"},_valueIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_pickerHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"},_pickerValueStateContent:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"},previousSelectedItem:{type:"sap.ui.core.Item"}}},liveChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},designtime:"sap/m/designtime/Select.designtime"},renderer:I});u.insertFontFaceStyle();r.apply(M.prototype,[true]);d.call(M.prototype);function B(e){if(this._isIconOnly()&&!this.isOpen()){return}if(e){if(this.getSelectedItemId()!==e.getId()){this.fireEvent("liveChange",{selectedItem:e})}this.setSelection(e);this.setValue(e.getText());this.scrollToItem(e)}}M.prototype._attachHiddenSelectHandlers=function(){var e=this._getHiddenSelect(),t=this._getHiddenInput();e.on("focus",this._addFocusClass.bind(this));e.on("blur",this._removeFocusClass.bind(this));t.on("focus",this.focus.bind(this))};M.prototype.focus=function(){this._getHiddenSelect().trigger("focus");o.prototype.focus.call(this,arguments)};M.prototype._addFocusClass=function(){this.$().addClass("sapMSltFocused")};M.prototype._removeFocusClass=function(){this.$().removeClass("sapMSltFocused")};M.prototype._detachHiddenSelectHandlers=function(){var e=this._getHiddenSelect(),t=this._getHiddenInput();if(e){e.off("focus");e.off("blur")}if(t){t.off("focus")}};M.prototype._getHiddenSelect=function(){return this.$("hiddenSelect")};M.prototype._getHiddenInput=function(){return this.$("hiddenInput")};M.prototype._announceValueStateText=function(){var e=this._getValueStateText();if(this._oInvisibleMessage){this._oInvisibleMessage.announce(e,F.Polite)}};M.prototype._getValueStateText=function(){var e=this.getValueState(),t,i;if(e===L.None){return""}t=n.getLibraryResourceBundle("sap.m").getText("INPUTBASE_VALUE_STATE_"+e.toUpperCase());i=t+" "+(this.getValueStateText()||x.getAdditionalText(this));return i};M.prototype._isFocused=function(){return this.getFocusDomRef()===document.activeElement};M.prototype._isIconOnly=function(){return this.getType()===E.IconOnly};M.prototype._handleFocusout=function(e){this._bFocusoutDueRendering=this.bRenderingPhase;if(this._bFocusoutDueRendering){this._bProcessChange=false;return}if(this._bProcessChange){if(!this.isOpen()||e.target===this.getAggregation("picker")){this._checkSelectionChange()}else{this._revertSelection()}this._bProcessChange=false}else{this._bProcessChange=true}};M.prototype._checkSelectionChange=function(){var e=this.getSelectedItem();if(this._oSelectionOnFocus!==e){this.fireChange({selectedItem:e,previousSelectedItem:this._oSelectionOnFocus})}};M.prototype._revertSelection=function(){var e=this.getSelectedItem();if(this._oSelectionOnFocus!==e){this.fireEvent("liveChange",{selectedItem:this._oSelectionOnFocus});this.setSelection(this._oSelectionOnFocus);this.setValue(this._getSelectedItemText())}};M.prototype._getSelectedItemText=function(e){e=e||this.getSelectedItem();if(!e){e=this.getDefaultSelectedItem()}if(e){return e.getText()}return""};M.prototype.getOverflowToolbarConfig=function(){var e=["enabled","selectedKey"];if(!this.getAutoAdjustWidth()||this._bIsInOverflow){e.push("selectedItemId")}var t={canOverflow:true,autoCloseEvents:["change"],invalidationEvents:["_itemTextChange"],propsUnrelatedToSize:e};t.onBeforeEnterOverflow=function(e){var t=e.getParent();if(!t.isA("sap.m.OverflowToolbar")){return}e._prevSelectType=e.getType();e._bIsInOverflow=true;if(e.getType()!==E.Default){e.setProperty("type",E.Default,true)}};t.onAfterExitOverflow=function(e){var t=e.getParent();if(!t.isA("sap.m.OverflowToolbar")){return}e._bIsInOverflow=false;if(e.getType()!==e._prevSelectType){e.setProperty("type",e._prevSelectType,true)}};return t};M.prototype.getList=function(){if(this._bIsBeingDestroyed){return null}return this._oList};M.prototype.findFirstEnabledItem=function(e){var t=this.getList();return t?t.findFirstEnabledItem(e):null};M.prototype.findLastEnabledItem=function(e){var t=this.getList();return t?t.findLastEnabledItem(e):null};M.prototype.setSelectedIndex=function(e,t){var i;t=t||this.getItems();e=e>t.length-1?t.length-1:Math.max(0,e);i=t[e];if(i){this.setSelection(i)}};M.prototype.scrollToItem=function(e){var t=this.getPicker().getDomRef(),i=e&&e.getDomRef();if(!t||!i){return}var s=t.querySelector(".sapUiSimpleFixFlexFlexContent"),n=t.querySelector(".sapMSltPickerValueState"),o=n?n.clientHeight:0,r=s.scrollTop,a=i.offsetTop-o,l=s.clientHeight,u=i.offsetHeight;if(r>a){s.scrollTop=a}else if(a+u>r+l){s.scrollTop=Math.ceil(a+u-l)}};M.prototype.setValue=function(e){var t=this.getDomRef(),i=t&&t.querySelector(".sapMSelectListItemText"),s=!this.isOpen()&&this._isFocused()&&this._oInvisibleMessage;if(i){i.textContent=e}this._setHiddenSelectValue();this._getValueIcon();if(s){this._oInvisibleMessage.announce(e,F.Assertive)}};M.prototype._setHiddenSelectValue=function(){var e=this._getHiddenSelect(),t=this._getHiddenInput(),i=this.getSelectedKey(),s=this._getSelectedItemText();t.attr("value",i||"");if(!this._isIconOnly()){e.text(s)}};M.prototype._getValueIcon=function(){if(this._bIsBeingDestroyed){return null}var e=this.getAggregation("_valueIcon"),t=this.getSelectedItem(),i=!!(t&&t.getIcon&&t.getIcon()),s=i?t.getIcon():"sap-icon://pull-down";if(!e){e=new l(this.getId()+"-labelIcon",{src:s,visible:false});this.setAggregation("_valueIcon",e,true)}if(e.getVisible()!==i){e.setVisible(i);e.toggleStyleClass("sapMSelectListItemIcon",i)}if(i&&t.getIcon()!==e.getSrc()){e.setSrc(s)}return e};M.prototype._isShadowListRequired=function(){if(this.getAutoAdjustWidth()){return false}else if(this.getWidth()==="auto"){return true}return false};M.prototype._handleAriaActiveDescendant=function(e){var t=this.getFocusDomRef(),i=e&&e.getDomRef(),s="aria-activedescendant";if(!t){return}if(i&&this.isOpen()){t.setAttribute(s,e.getId())}else{t.removeAttribute(s)}};M.prototype.updateItems=function(e){i.prototype.updateItems.apply(this,arguments);this._oSelectionOnFocus=this.getSelectedItem()};M.prototype.refreshItems=function(){i.prototype.refreshItems.apply(this,arguments)};M.prototype.onBeforeOpen=function(e){var t=this["_onBeforeOpen"+this.getPickerType()],i=this.getRenderer().CSS_CLASS;this.addStyleClass(i+"Pressed");this.addStyleClass(i+"Expanded");this.closeValueStateMessage();this.addContent();this.addContentToFlex();t&&t.call(this)};M.prototype.onAfterOpen=function(e){var t=this.getFocusDomRef(),i=null;if(!t){return}i=this.getSelectedItem();t.setAttribute("aria-expanded","true");t.setAttribute("aria-controls",this.getList().getId());if(i){t.setAttribute("aria-activedescendant",i.getId());this.scrollToItem(i)}};M.prototype.onBeforeClose=function(e){var t=this.getFocusDomRef(),i=this.getRenderer().CSS_CLASS;if(t){t.removeAttribute("aria-controls");t.removeAttribute("aria-activedescendant");if(this.shouldValueStateMessageBeOpened()&&document.activeElement===t){this.openValueStateMessage()}}this.removeStyleClass(i+"Expanded")};M.prototype.onAfterClose=function(e){var t=this.getFocusDomRef(),i=this.getRenderer().CSS_CLASS,s=i+"Pressed";if(t){t.setAttribute("aria-expanded","false");t.removeAttribute("aria-activedescendant")}this.removeStyleClass(s)};M.prototype.getPicker=function(){if(this._bIsBeingDestroyed){return null}return this.createPicker(this.getPickerType())};M.prototype.getValueStateTextInvisibleText=function(){if(this._bIsBeingDestroyed){return null}if(!this._oValueStateTextInvisibleText){this._oValueStateTextInvisibleText=new m({id:this.getId()+"-valueStateText-InvisibleText"});this._oValueStateTextInvisibleText.toStatic()}return this._oValueStateTextInvisibleText};M.prototype.getSimpleFixFlex=function(){if(this._bIsBeingDestroyed){return null}else if(this.oSimpleFixFlex){return this.oSimpleFixFlex}this.oSimpleFixFlex=new C({id:this.getPickerValueStateContentId(),fixContent:this._getPickerValueStateContent().addStyleClass(this.getRenderer().CSS_CLASS+"PickerValueState"),flexContent:this.createList()});return this.oSimpleFixFlex};M.prototype.setPickerType=function(e){this._sPickerType=e};M.prototype.getPickerType=function(){return this._sPickerType};M.prototype._getPickerValueStateContent=function(){if(!this.getAggregation("_pickerValueStateContent")){this.setAggregation("_pickerValueStateContent",new b({wrapping:true,text:this._getTextForPickerValueStateContent()}))}return this.getAggregation("_pickerValueStateContent")};M.prototype._updatePickerValueStateContentText=function(){var e=this.getPicker(),t=e&&e.getContent()[0].getFixContent(),i;if(t){i=this._getTextForPickerValueStateContent();t.setText(i)}};M.prototype._getTextForPickerValueStateContent=function(){var e=this.getValueStateText(),t;if(e){t=e}else{t=this._getDefaultTextForPickerValueStateContent()}return t};M.prototype._getDefaultTextForPickerValueStateContent=function(){var e=this.getValueState(),t,i;if(e===L.None){i=""}else{t=n.getLibraryResourceBundle("sap.ui.core");i=t.getText("VALUE_STATE_"+e.toUpperCase())}return i};M.prototype._updatePickerValueStateContentStyles=function(){var e=this.getValueState(),t=L,i=this.getRenderer().CSS_CLASS,s=i+"Picker",n=s+e+"State",o=s+"WithSubHeader",r=this.getPicker(),a=r&&r.getContent()[0].getFixContent();if(a){this._removeValueStateClassesForPickerValueStateContent(r);a.addStyleClass(n);if(e!==t.None){r.addStyleClass(o)}else{r.removeStyleClass(o)}}};M.prototype._removeValueStateClassesForPickerValueStateContent=function(e){var t=L,i=this.getRenderer().CSS_CLASS,s=i+"Picker",n=e.getContent()[0].getFixContent();Object.keys(t).forEach(function(e){var t=s+e+"State";n.removeStyleClass(t)})};M.prototype._createPopover=function(){var e=this;var i=new t({showArrow:false,showHeader:false,placement:P.VerticalPreferredBottom,offsetX:0,offsetY:0,initialFocus:this,ariaLabelledBy:this._getPickerHiddenLabelId()});i.addEventDelegate({ontouchstart:function(t){var i=this.getDomRef("cont");if(t.target===i||t.srcControl instanceof y){e._bProcessChange=false}}},i);this._decoratePopover(i);return i};M.prototype._decoratePopover=function(e){var t=this;e.open=function(){return this.openBy(t)}};M.prototype._onBeforeRenderingPopover=function(){var e=this.getPicker(),t=this.$().outerWidth()+"px";if(e){e.setContentMinWidth(t)}};M.prototype._createDialog=function(){var t=this,i=this._getPickerHeader(),s=new e({stretch:true,ariaLabelledBy:this._getPickerHiddenLabelId(),customHeader:i,beforeOpen:function(){t.updatePickerHeaderTitle()}});return s};M.prototype._getPickerTitle=function(){var e=this.getPicker(),t=e&&e.getCustomHeader();if(t){return t.getContentMiddle()[0]}return null};M.prototype._getPickerHeader=function(){var e=u.getIconURI("decline"),t;if(!this.getAggregation("_pickerHeader")){t=n.getLibraryResourceBundle("sap.m");this.setAggregation("_pickerHeader",new p({titleAlignment:s.TitleAlignment.Auto,contentMiddle:new h({text:t.getText("SELECT_PICKER_TITLE_TEXT"),level:D.H1}),contentRight:new c({icon:e,press:this.close.bind(this)})}))}return this.getAggregation("_pickerHeader")};M.prototype._getPickerHiddenLabelId=function(){return m.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")};M.prototype.getPickerValueStateContentId=function(){return this.getId()+"-valueStateText"};M.prototype.updatePickerHeaderTitle=function(){var e=this.getPicker();if(!e){return}var t=this.getLabels();if(t.length){var i=t[0],s=this._getPickerTitle();if(i&&typeof i.getText==="function"){s&&s.setText(i.getText())}}};M.prototype._onBeforeOpenDialog=function(){};M.prototype.init=function(){this.setPickerType(S.system.phone?"Dialog":"Popover");this.createPicker(this.getPickerType());this._oSelectionOnFocus=null;this.bRenderingPhase=false;this._bFocusoutDueRendering=false;this._bProcessChange=false;this.sTypedChars="";this.iTypingTimeoutID=-1;this._oValueStateMessage=new g(this);this._bValueStateMessageOpened=false;this._sAriaRoleDescription=n.getLibraryResourceBundle("sap.m").getText("SELECT_ROLE_DESCRIPTION");this._oInvisibleMessage=null;this._referencingLabelsHandlers=[]};M.prototype.onBeforeRendering=function(){if(!this._oInvisibleMessage){this._oInvisibleMessage=A.getInstance()}this.bRenderingPhase=true;this.synchronizeSelection({forceSelection:this.getForceSelection()});this._updatePickerValueStateContentText();this._updatePickerValueStateContentStyles();this._detachHiddenSelectHandlers();if(this._isIconOnly()){this.setAutoAdjustWidth(true)}};M.prototype.onAfterRendering=function(){this.bRenderingPhase=false;this._setHiddenSelectValue();this._attachHiddenSelectHandlers();this._clearReferencingLabelsHandlers();this._handleReferencingLabels()};M.prototype.exit=function(){var e=this.getValueStateMessage(),t=this._getValueIcon();this._oSelectionOnFocus=null;if(this._oValueStateTextInvisibleText){this._oValueStateTextInvisibleText.destroy();this._oValueStateTextInvisibleText=null}if(e){this.closeValueStateMessage();e.destroy()}if(t){t.destroy()}this._oValueStateMessage=null;this._bValueStateMessageOpened=false};M.prototype.ontouchstart=function(e){e.setMarked();if(this.getEnabled()&&this.getEditable()){this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed");this.focus()}};M.prototype.ontouchend=function(e){e.setMarked();if(this.getEnabled()&&this.getEditable()&&!this.isOpen()&&this.isOpenArea(e.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed")}};M.prototype.ontap=function(e){var t=this.getRenderer().CSS_CLASS;e.setMarked();if(!this.getEnabled()||!this.getEditable()){return}if(this.isOpenArea(e.target)){if(this.isOpen()){this.close();this.removeStyleClass(t+"Pressed");return}if(S.system.phone){this.focus()}this.open()}if(this.isOpen()){this.addStyleClass(t+"Pressed")}};M.prototype.onSelectionChange=function(e){var t=e.getParameter("selectedItem"),i=this.getSelectedItem();this.close();this.setSelection(t);this.fireChange({selectedItem:t,previousSelectedItem:i});this.setValue(this._getSelectedItemText())};M.prototype.onkeypress=function(e){if(!this.getEditable()){return}e.setMarked();var t=String.fromCharCode(e.which),i;this.sTypedChars+=t;i=/^(.)\1+$/i.test(this.sTypedChars)?t:this.sTypedChars;clearTimeout(this.iTypingTimeoutID);this.iTypingTimeoutID=setTimeout(function(){this.sTypedChars="";this.iTypingTimeoutID=-1}.bind(this),1e3);B.call(this,this.searchNextItemByText(i))};M.prototype.onsapshow=function(e){if(!this.getEditable()){return}e.setMarked();if(e.which===_.F4){e.preventDefault()}this.toggleOpenState()};M.prototype.onsaphide=M.prototype.onsapshow;M.prototype.onmousedown=function(e){e.preventDefault();this._getHiddenSelect().trigger("focus")};M.prototype.onsapescape=function(e){if(!this.getEditable()||this._bSpaceDown){return}if(this.isOpen()){e.setMarked();this.close();this._revertSelection()}};M.prototype.onsapenter=function(e){e.preventDefault();if(!this.getEditable()){return}if(this.isOpen()){e.setMarked()}this.close();this._checkSelectionChange()};M.prototype.onkeydown=function(e){if(e.which===_.SPACE){this._bSpaceDown=true}if([_.ARROW_DOWN,_.ARROW_UP,_.SPACE].indexOf(e.which)>-1){e.preventDefault()}if(e.which===_.SHIFT||e.which===_.ESCAPE){this._bSupressNextAction=this._bSpaceDown}};M.prototype.onkeyup=function(e){if(!this.getEditable()){return}if(e.which===_.SPACE){if(!e.shiftKey&&!this._bSupressNextAction){e.setMarked();if(this.isOpen()){this._checkSelectionChange()}this.toggleOpenState()}this._bSpaceDown=false;this._bSupressNextAction=false}};M.prototype.onsapdown=function(e){if(!this.getEditable()){return}e.setMarked();e.preventDefault();var t,i=this.getSelectableItems();t=i[i.indexOf(this.getSelectedItem())+1];B.call(this,t)};M.prototype.onsapup=function(e){if(!this.getEditable()){return}e.setMarked();e.preventDefault();var t,i=this.getSelectableItems();t=i[i.indexOf(this.getSelectedItem())-1];B.call(this,t)};M.prototype.onsaphome=function(e){if(!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.getSelectableItems()[0];B.call(this,t)};M.prototype.onsapend=function(e){if(!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.findLastEnabledItem(this.getSelectableItems());B.call(this,t)};M.prototype.onsappagedown=function(e){if(!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.getSelectableItems(),i=this.getSelectedItem();this.setSelectedIndex(t.indexOf(i)+10,t);i=this.getSelectedItem();if(i){this.setValue(i.getText())}this.scrollToItem(i)};M.prototype.onsappageup=function(e){if(!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.getSelectableItems(),i=this.getSelectedItem();this.setSelectedIndex(t.indexOf(i)-10,t);i=this.getSelectedItem();if(i){this.setValue(i.getText())}this.scrollToItem(i)};M.prototype.onsaptabnext=function(e){if(this.isOpen()){this.close();this._checkSelectionChange()}};M.prototype.onsaptabprevious=M.prototype.onsaptabnext;M.prototype.onfocusin=function(e){if(!this._bFocusoutDueRendering&&!this._bProcessChange){this._oSelectionOnFocus=this.getSelectedItem()}this._bProcessChange=true;setTimeout(function(){if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()&&document.activeElement===this.getFocusDomRef()){this.openValueStateMessage()}}.bind(this),100)};M.prototype.onfocusout=function(e){this._handleFocusout(e);if(this.bRenderingPhase){return}this.closeValueStateMessage()};M.prototype.onsapfocusleave=function(e){var t=this.getAggregation("picker");if(!e.relatedControlId||!t){return}var i=n.byId(e.relatedControlId),s=i&&i.getFocusDomRef();if(S.system.desktop&&v(t.getFocusDomRef(),s)){this.focus()}};M.prototype.getFocusDomRef=function(){return this._getHiddenSelect()[0]};M.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};M.prototype.setSelection=function(e){var t=this.getList(),i;if(t){t.setSelection(e)}this.setAssociation("selectedItem",e,true);this.setProperty("selectedItemId",e instanceof y?e.getId():e,true);if(typeof e==="string"){e=n.byId(e)}i=e?e.getKey():"";this.setProperty("selectedKey",i,true);this._handleAriaActiveDescendant(e)};M.prototype.setColumnRatio=function(e){var t=this.getList();this.setProperty("columnRatio",e,true);if(t&&this.getShowSecondaryValues()){t.setProperty("_columnRatio",this.getColumnRatio())}return this};M.prototype.isSelectionSynchronized=function(){return i.prototype.isSelectionSynchronized.apply(this,arguments)};M.prototype.synchronizeSelection=function(){i.prototype.synchronizeSelection.apply(this,arguments)};M.prototype.addContent=function(e){};M.prototype.addContentToFlex=function(){};M.prototype.createPicker=function(e){var t=this.getAggregation("picker"),i=this.getRenderer().CSS_CLASS;if(t){return t}t=this["_create"+e]();this.setAggregation("picker",t,true);t.setHorizontalScrolling(false).setVerticalScrolling(false).addStyleClass(i+"Picker").addStyleClass(i+"Picker-CTX").addStyleClass("sapUiNoContentPadding").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.getSimpleFixFlex());return t};M.prototype.searchNextItemByText=function(e){var t=this.getSelectedItem(),i,s,n,o;if(!(typeof e==="string"&&e!=="")){return null}if(e.length>1&&t.getText().toLowerCase().startsWith(e.toLowerCase())){return t}i=this.getItems();s=this.getSelectedIndex();n=i.splice(s+1,i.length-s);o=i.splice(0,i.length-1);i=n.concat(o);for(var r=0,a;r<i.length;r++){a=i[r];if(a.getEnabled()&&!a.isA("sap.ui.core.SeparatorItem")&&a.getText().toLowerCase().startsWith(e.toLowerCase())){return a}}return null};M.prototype.createList=function(){var e=V,t=S.system.phone?e.Delimited:e.None;this._oList=new i({width:"100%",keyboardNavigationMode:t,hideDisabledItems:true}).addStyleClass(this.getRenderer().CSS_CLASS+"List-CTX").addEventDelegate({ontap:function(e){var t=e.srcControl;if(t.getEnabled()){this._checkSelectionChange();this.close()}}},this).addEventDelegate({onAfterRendering:this.onAfterRenderingList},this).attachSelectionChange(this.onSelectionChange,this);this._oList.setProperty("_tabIndex","-1");this._oList.toggleStyleClass("sapMSelectListWrappedItems",this.getWrapItemsText());return this._oList};M.prototype.setWrapItemsText=function(e){var t=this.getPicker();if(this._oList){this._oList.toggleStyleClass("sapMSelectListWrappedItems",e)}if(t&&this.getPickerType()==="Popover"){t.toggleStyleClass("sapMPickerWrappedItems",e)}return this.setProperty("wrapItemsText",e,true)};M.prototype.hasContent=function(){return this.getItems().length>0};M.prototype.onBeforeRenderingPicker=function(){var e=this["_onBeforeRendering"+this.getPickerType()];e&&e.call(this)};M.prototype.onAfterRenderingPicker=function(){var e=this["_onAfterRendering"+this.getPickerType()];e&&e.call(this)};M.prototype.onAfterRenderingList=function(){};M.prototype.open=function(){var e=this.getPicker();this.focus();if(e){e.open()}return this};M.prototype.toggleOpenState=function(){if(this.isOpen()){this.close()}else{this.open()}return this};M.prototype.getVisibleItems=function(){var e=this.getList();return e?e.getVisibleItems():[]};M.prototype.isItemSelected=function(e){return e&&e.getId()===this.getAssociation("selectedItem")};M.prototype.getSelectedIndex=function(){var e=this.getSelectedItem();return e?this.indexOfItem(this.getSelectedItem()):-1};M.prototype.getDefaultSelectedItem=function(e){return this.getForceSelection()?this.findFirstEnabledItem():null};M.prototype.getSelectableItems=function(){var e=this.getList();if(!e){return[]}return e.getSelectableItems()};M.prototype.getOpenArea=function(){return this.getDomRef()};M.prototype.isOpenArea=function(e){var t=this.getOpenArea();return t&&t.contains(e)};M.prototype.getFormFormattedValue=function(){var e=this.getSelectedItem();return e?e.getText():""};M.prototype.getFormValueProperty=function(){return"selectedKey"};M.prototype.findItem=function(e,t){var i=this.getList();return i?i.findItem(e,t):null};M.prototype.clearSelection=function(){this.setSelection(null)};M.prototype.onItemChange=function(e){var t=this.getAssociation("selectedItem"),i=e.getParameter("id"),s=e.getParameter("name"),n=e.getParameter("newValue"),o,r,a,l;if(s==="key"&&!this.isBound("selectedKey")){r=this.getSelectedKey();a=this.getItemByKey(n);if(n===r&&t!==i&&a&&i===a.getId()){this.setSelection(a);return}o=e.getParameter("oldValue");if(t===i&&r===o&&!this.getItemByKey(o)){this.setSelectedKey(n);return}l=this.getItemByKey(r);if(t===i&&n!==r&&l){this.setSelection(l);return}}if(s==="text"&&t===i){this.fireEvent("_itemTextChange");this.setValue(n)}};M.prototype.fireChange=function(e){this._oSelectionOnFocus=e.selectedItem;return this.fireEvent("change",e)};M.prototype.addAggregation=function(e,t,i){if(e==="items"&&!i&&!this.isInvalidateSuppressed()){this.invalidate(t)}return o.prototype.addAggregation.apply(this,arguments)};M.prototype.destroyAggregation=function(e,t){if(e==="items"&&!t&&!this.isInvalidateSuppressed()){this.invalidate()}return o.prototype.destroyAggregation.apply(this,arguments)};M.prototype.setAssociation=function(e,t,s){var n=this.getList();if(n&&e==="selectedItem"){i.prototype.setAssociation.apply(n,arguments)}return o.prototype.setAssociation.apply(this,arguments)};M.prototype.setProperty=function(e,t,s){var n=this.getList();if(e==="selectedKey"||e==="selectedItemId"){n&&i.prototype.setProperty.apply(n,arguments)}try{o.prototype.setProperty.apply(this,arguments)}catch(e){T.warning("Update failed due to exception. Loggable in support mode log",null,null,function(){return{exception:e}})}return this};M.prototype.removeAllAssociation=function(e,t){var s=this.getList();if(s&&e==="selectedItem"){i.prototype.removeAllAssociation.apply(s,arguments)}return o.prototype.removeAllAssociation.apply(this,arguments)};M.prototype.clone=function(){var e=o.prototype.clone.apply(this,arguments),t=this.getSelectedItem(),i=this.getSelectedKey();if(!this.isBound("selectedKey")&&!e.isSelectionSynchronized()){if(t&&i===""){e.setSelectedIndex(this.indexOfItem(t))}else{e.setSelectedKey(i)}}return e};M.prototype._updatePickerAriaLabelledBy=function(e){var t=this.getPicker(),i;if(!t){return}i=this.getValueStateTextInvisibleText().getId();if(e===L.None){t.removeAriaLabelledBy(i)}else{t.addAriaLabelledBy(i)}};M.prototype._handleReferencingLabels=function(){var e=this.getLabels(),t,i=this;e.forEach(function(e){if(!e){return}t={ontap:function(){i.focus()}};i._referencingLabelsHandlers.push({oDelegate:t,sLabelId:e.getId()});e.addEventDelegate(t)})};M.prototype._clearReferencingLabelsHandlers=function(){var e;this._referencingLabelsHandlers.forEach(function(t){e=n.byId(t.sLabelId);if(e){e.removeEventDelegate(t.oDelegate)}});this._referencingLabelsHandlers=[]};M.prototype.getLabels=function(){var e=this.getAriaLabelledBy().concat(a.getReferencingLabels(this));e=e.filter(function(t,i){return e.indexOf(t)===i}).map(function(e){return n.byId(e)}).filter(Boolean);return e};M.prototype.getDomRefForValueStateMessage=function(){return this.getFocusDomRef()};M.prototype.getValueStateMessageId=function(){return this.getId()+"-message"};M.prototype.getValueStateMessage=function(){return this._oValueStateMessage};M.prototype.openValueStateMessage=function(){var e=this.getValueStateMessage();if(e&&!this._bValueStateMessageOpened){this._bValueStateMessageOpened=true;e.open()}};M.prototype.closeValueStateMessage=function(){var e=this.getValueStateMessage();if(e&&this._bValueStateMessageOpened){this._bValueStateMessageOpened=false;e.close()}};M.prototype.shouldValueStateMessageBeOpened=function(){return!this._isIconOnly()&&this.getValueState()!==L.None&&this.getEnabled()&&this.getEditable()&&!this._bValueStateMessageOpened};M.prototype.setShowSecondaryValues=function(e){var t=!this._isShadowListRequired();this.setProperty("showSecondaryValues",e,t);var i=this.getList(),s=e?this.getColumnRatio():null;if(i){i.setShowSecondaryValues(e);i.setProperty("_columnRatio",s)}return this};M.prototype.addItem=function(e){this.addAggregation("items",e);if(e){e.attachEvent("_change",this.onItemChange,this)}return this};M.prototype.insertItem=function(e,t){this.insertAggregation("items",e,t);if(e){e.attachEvent("_change",this.onItemChange,this)}return this};M.prototype.findAggregatedObjects=function(){var e=this.getList();if(e){return i.prototype.findAggregatedObjects.apply(e,arguments)}return[]};M.prototype.getItems=function(){var e=this.getList();return e?e.getItems():[]};M.prototype.setSelectedItem=function(e){if(typeof e==="string"){this.setAssociation("selectedItem",e,true);e=n.byId(e)}if(!(e instanceof y)&&e!==null){return this}if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);this.setValue(this._getSelectedItemText(e));this._oSelectionOnFocus=e;return this};M.prototype.setSelectedItemId=function(e){e=this.validateProperty("selectedItemId",e);if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);this.setValue(this._getSelectedItemText());this._oSelectionOnFocus=this.getSelectedItem();return this};M.prototype._isKeyAvailable=function(e){var t=this._oList.getItems().map(function(e){return e.getKey()});return t.indexOf(e)>-1};M.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var t=e==="";if(!t&&!this._isKeyAvailable(e)&&this.getResetOnMissingKey()){t=true}if(!this.getForceSelection()&&t){this.setSelection(null);this.setValue("");return this.setProperty("selectedKey",e)}var i=this.getItemByKey(e);if(i||t){if(!i&&t){i=this.getDefaultSelectedItem()}this.setSelection(i);this.setValue(this._getSelectedItemText(i));this._oSelectionOnFocus=i;return this}return this.setProperty("selectedKey",e)};M.prototype.setValueState=function(e){var t=this.getValueState(),i,s;if(e===t){return this}s=this.getPicker();if(s&&s.isA("sap.m.Popover")&&s.isOpen()&&s.oPopup.getOpenState()===O.CLOSING){s.attachEventOnce("afterClose",function(t){this._updatePickerAriaLabelledBy(e)},this)}else{this._updatePickerAriaLabelledBy(e)}this.setProperty("valueState",e);if(this._isFocused()){this._announceValueStateText()}i=this.getDomRefForValueState();if(!i){return this}if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()&&document.activeElement===i){this.openValueStateMessage()}else{this.closeValueStateMessage()}this._updatePickerValueStateContentText();this._updatePickerValueStateContentStyles();return this};M.prototype.setValueStateText=function(e){var t=this.getValueStateTextInvisibleText();this.setProperty("valueStateText",e);if(t){t.setText(e)}if(this.getDomRefForValueState()){this._updatePickerValueStateContentText();this._updatePickerValueStateContentStyles()}if(this._isFocused()){this._announceValueStateText()}return this};M.prototype.getItemAt=function(e){return this.getItems()[+e]||null};M.prototype.getSelectedItem=function(){var e=this.getAssociation("selectedItem");return e===null?null:n.byId(e)||null};M.prototype.getFirstItem=function(){return this.getItems()[0]||null};M.prototype.getLastItem=function(){var e=this.getItems();return e[e.length-1]||null};M.prototype.getEnabledItems=function(e){var t=this.getList();return t?t.getEnabledItems(e):[]};M.prototype.getItemByKey=function(e){var t=this.getList();return t?t.getItemByKey(e):null};M.prototype.removeItem=function(e){var t;e=this.removeAggregation("items",e);if(this.getItems().length===0){this.clearSelection()}else if(this.isItemSelected(e)){t=this.findFirstEnabledItem();if(t){this.setSelection(t)}}this.setValue(this._getSelectedItemText());if(e){e.detachEvent("_change",this.onItemChange,this)}return e};M.prototype.removeAllItems=function(){var e=this.removeAllAggregation("items");this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove()}for(var t=0;t<e.length;t++){e[t].detachEvent("_change",this.onItemChange,this)}return e};M.prototype.destroyItems=function(){this.destroyAggregation("items");this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove()}return this};M.prototype.isOpen=function(){var e=this.getAggregation("picker");return!!(e&&e.isOpen())};M.prototype.close=function(){var e=this.getAggregation("picker");if(e){e.close()}return this};M.prototype.getDomRefForValueState=function(){return this.getFocusDomRef()};M.prototype._isRequired=function(){return this.getRequired()||a.isRequired(this)};M.prototype.getAccessibilityInfo=function(){var e=[],t="",i=n.getLibraryResourceBundle("sap.m"),s=this._isIconOnly(),o={role:this.getRenderer().getAriaRole(this),focusable:this.getEnabled(),enabled:this.getEnabled(),readonly:s?undefined:this.getEnabled()&&!this.getEditable()};if(s){var r=this.getTooltip_AsString();if(!r){var a=u.getIconInfo(this.getIcon());r=a&&a.text?a.text:""}o.type=i.getText("ACC_CTR_TYPE_BUTTON");e.push(r)}else if(this.getType()==="Default"){o.type=i.getText("SELECT_ROLE_DESCRIPTION");e.push(this._getSelectedItemText())}if(this._isRequired()){e.push(i.getText("SELECT_REQUIRED"))}t=e.join(" ").trim();if(t){o.description=t}return o};M.prototype._getToolbarInteractive=function(){return true};M.prototype.getIdForLabel=function(){return this.getId()+"-hiddenSelect"};return M});