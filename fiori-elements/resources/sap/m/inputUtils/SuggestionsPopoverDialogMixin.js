/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Core","sap/ui/core/IconPool","sap/ui/core/library","sap/m/Dialog","sap/m/Button","sap/m/Bar","sap/m/Title","sap/m/Toolbar","sap/m/ToggleButton","sap/m/ValueStateHeader"],function(t,e,n,r,o,i,u,s,a,g,l){"use strict";var c=t.TitleAlignment;var h=r.TitleLevel;return function(){this.getPickerTitle=function(){return this.getPopover().getCustomHeader().getContentMiddle()[0]};this.getOkButton=function(){var t=this.getPopover(),e=t&&t.getBeginButton();return e||null};this.getCancelButton=function(){var t=this.getPopover(),e=t&&t.getCustomHeader()&&t.getCustomHeader().getContentRight&&t.getCustomHeader().getContentRight()[0];return e||null};this.getFilterSelectedButton=function(){var t=this.getPopover(),e=t&&t.getSubHeader()&&t.getSubHeader().getContent()[1];return e||null};this.getShowMoreButton=function(){return this.getPopover().getEndButton()};this.setShowMoreButton=function(t){this.getPopover().setEndButton(t);return this};this.removeShowMoreButton=function(){this.getPopover().destroyAggregation("endButton");return this};this.setOkPressHandler=function(t){var e=this.getOkButton();e&&e.attachPress(t);return e};this.setCancelPressHandler=function(t){var e=this.getCancelButton();e&&e.attachPress(t);return e};this.setShowSelectedPressHandler=function(t){var e=this.getFilterSelectedButton();e&&e.attachPress(t);return e};this.createPopover=function(a,g,l){var p=e.getLibraryResourceBundle("sap.m"),d=this,f=l&&new l(a.getId()+"-popup-input",{width:"100%",showValueStateMessage:false});return new o(a.getId()+"-popup",{beginButton:new i(a.getId()+"-popup-closeButton",{text:p.getText("SUGGESTIONSPOPOVER_CLOSE_BUTTON")}),stretch:true,titleAlignment:c.Auto,customHeader:new u(a.getId()+"-popup-header",{titleAlignment:c.Auto,contentMiddle:new s({level:h.H1}),contentRight:new i({icon:n.getIconURI("decline")})}),subHeader:r(g,f),horizontalScrolling:false,initialFocus:f,beforeOpen:function(){d._updatePickerHeaderTitle()},afterClose:function(){a.focus();t.closeKeyboard()}})};this.getInput=function(){var t=this.getPopover(),e=t&&t.getSubHeader(),n=e&&e.getContent();return n&&n.filter(function(t){return t.isA("sap.m.InputBase")})[0]};this._updatePickerHeaderTitle=function(){var t=e.getLibraryResourceBundle("sap.m"),n=this.getPickerTitle(),r,o;if(!n){return}o=this._getInputLabels();if(o.length){r=o[0];if(r&&typeof r.getText==="function"){n.setText(r.getText())}}else{n.setText(t.getText("COMBOBOX_PICKER_TITLE"))}return n};this._getInputLabels=function(){return this._fnInputLabels()};function r(t,e){var n=[e];if(t.showSelectedButton){n.push(p())}return new a({content:n})}function p(){var t=n.getIconURI("multiselect-all");var r=e.getLibraryResourceBundle("sap.m").getText("SHOW_SELECTED_BUTTON");return new g({icon:t,tooltip:r})}this._getValueStateHeader=function(){var t=this.getPopover();if(!t.getContent().length||t.getContent().length&&!t.getContent()[0].isA("sap.m.ValueStateHeader")){this._createValueStateHeader()}return t.getContent()[0]};this._createValueStateHeader=function(){var t=new l;var e=this.getPopover();e.insertContent(t,0);t.setPopup(e)}}});