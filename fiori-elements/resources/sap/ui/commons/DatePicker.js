/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","./TextField","sap/ui/model/type/Date","sap/ui/core/date/UniversalDate","./library","./DatePickerRenderer","sap/ui/core/format/DateFormat","sap/ui/core/library","sap/ui/Device","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/core/Popup","sap/ui/dom/containsOrEquals","sap/ui/core/Configuration","sap/ui/dom/jquery/cursorPos"],function(e,t,a,i,o,r,s,n,p,u,l,h,f,d,_){"use strict";var y=f.Dock;var g=p.CalendarType;var m=a.extend("sap.ui.commons.DatePicker",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{locale:{type:"string",group:"Misc",defaultValue:null},yyyymmdd:{type:"string",group:"Misc",defaultValue:null}}}});m.prototype.init=function(){a.prototype.init.apply(this,arguments);this._oFormatYyyymmdd=n.getInstance({pattern:"yyyyMMdd",strictParsing:true,calendarType:g.Gregorian});if(!u.system.desktop){this._bMobile=true;this._oFormatMobile=n.getInstance({pattern:"yyyy-MM-dd",strictParsing:true,calendarType:g.Gregorian})}this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=new Date(9999,11,31,23,59,59,99)};m.prototype.exit=function(){this._oDate=undefined;this._oLocale=undefined;if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close()}delete this._oPopup}if(this._oCalendar){this._oCalendar.destroy();delete this._oCalendar}};m.prototype.onAfterRendering=function(){a.prototype.onAfterRendering.apply(this,arguments);if(this._bMobile){if(this._oDate){var t=e(this.getInputDomRef());var i=this._oFormatMobile.format(this._oDate);t.val(i)}}};m.prototype.invalidate=function(e){if(!e||e!=this._oCalendar){a.prototype.invalidate.apply(this,arguments)}};m.prototype.onsapshow=function(e){var t=this;b(t);e.preventDefault()};m.prototype.onsaphide=m.prototype.onsapshow;m.prototype.onsappageup=function(e){var t=this;F(t,1,"day");e.preventDefault()};m.prototype.onsappageupmodifiers=function(e){var t=this;if(!e.ctrlKey&&e.shiftKey){F(t,1,"month")}else{F(t,1,"year")}e.preventDefault()};m.prototype.onsappagedown=function(e){var t=this;F(t,-1,"day");e.preventDefault()};m.prototype.onsappagedownmodifiers=function(e){var t=this;if(!e.ctrlKey&&e.shiftKey){F(t,-1,"month")}else{F(t,-1,"year")}e.preventDefault()};m.prototype.onkeypress=function(e){if(e.charCode){var t=this;var a=c(t);var i=String.fromCharCode(e.charCode);if(i&&a.sAllowedCharacters&&a.sAllowedCharacters.indexOf(i)<0){e.preventDefault()}}};m.prototype.onclick=function(t){if(e(t.target).hasClass("sapUiTfDateIcon")&&!this._bMobile){var a=this;b(a)}};m.prototype.onsapfocusleave=function(e){if(this._oCalendar&&e.relatedControlId&&(d(this._oCalendar.getDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())||this.getId()==e.relatedControlId)){return}a.prototype.onsapfocusleave.apply(this,arguments)};m.prototype.setValue=function(a){var i=this.getValue();if(a==i){return this}var o=this;v(o);this.setProperty("value",a,true);this._bValueSet=true;if(a){this._oDate=this._parseValue(a);if(!this._oDate||this._oDate.getTime()<this._oMinDate.getTime()||this._oDate.getTime()>this._oMaxDate.getTime()){this._oDate=undefined;t.warning("Value can not be converted to a valid date",this)}}else{this._oDate=undefined}var r="";if(this._oDate){r=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",r,true);if(this.getDomRef()){var s="";var n=e(this.getInputDomRef());if(this._bMobile&&this._oDate){s=this._oFormatMobile.format(this._oDate)}else{s=a}n.val(s)}return this};m.prototype.setYyyymmdd=function(a){var i=this.getYyyymmdd();if(a==i){return this}this.setProperty("yyyymmdd",a,true);this._bValueSet=false;var o="";if(a){this._oDate=this._oFormatYyyymmdd.parse(a);if(!this._oDate||this._oDate.getTime()<this._oMinDate.getTime()||this._oDate.getTime()>this._oMaxDate.getTime()){this._oDate=undefined;t.warning("Value can not be converted to a valid date",this)}}else{this._oDate=undefined}if(this._oDate){o=this._formatValue(this._oDate)}this.setProperty("value",o,true);if(this.getDomRef()){var r="";var s=e(this.getInputDomRef());if(this._bMobile&&this._oDate){r=this._oFormatMobile.format(this._oDate)}else{r=o}s.val(r)}return this};m.prototype.setLocale=function(a){var i=this.getLocale();if(a==i){return this}this.setProperty("locale",a,true);var o=this;v(o);this._oLocale=new l(a);this._sUsedPattern=undefined;var r="";if(this._bValueSet){r=this.getValue();if(r){this._oDate=this._parseValue(r);if(!this._oDate||this._oDate.getTime()<this._oMinDate.getTime()||this._oDate.getTime()>this._oMaxDate.getTime()){this._oDate=undefined;t.warning("Value can not be converted to a valid date",this)}}else{this._oDate=undefined}var s="";if(this._oDate){s=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",s,true)}else{if(this._oDate){r=this._formatValue(this._oDate)}this.setProperty("value",r,true)}if(this.getDomRef()){var n="";var p=e(this.getInputDomRef());if(this._bMobile&&this._oDate){n=this._oFormatMobile.format(this._oDate)}else{n=r}p.val(n)}return this};m.prototype.oninput=function(e){if(this._bMobile){var t=this.getInputDomRef();var i=t&&t.value;if(i){var o=this._oFormatMobile.parse(i)}if(!i||o){this._checkChange(e)}}else{a.prototype.oninput.apply(this,arguments)}};m.prototype._checkChange=function(e){var t=this.getInputDomRef();var a=t&&t.value;if(this._bMobile&&a!=""){this._oDate=this._oFormatMobile.parse(a);a=this._formatValue(this._oDate)}if(this.getEditable()&&this.getEnabled()&&a!=this.getValue()){var i=false;if(a!=""){if(!this._bMobile){this._oDate=this._parseValue(a);if(!this._oDate||this._oDate.getTime()<this._oMinDate.getTime()||this._oDate.getTime()>this._oMaxDate.getTime()){this._oDate=undefined;i=true}else{a=this._formatValue(this._oDate);t.value=a;if(this._oPopup&&this._oPopup.isOpen()){this._oCalendar.focusDate(this._oDate);if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=this._oDate.getTime()){this._oDateRange.setStartDate(new Date(this._oDate.getTime()))}}}}}else{this._oDate=undefined}this.setProperty("value",a,true);this._bValueSet=false;if(!i){var o="";if(this._oDate){o=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",o,true)}this.fireChange(i)}else if(this.getEditable()&&this.getEnabled()&&a==this.getYyyymmdd()){t.value=this.getValue()}};m.prototype.fireChange=function(e,t){if(!(typeof e==="object")){t=e}this.fireEvent("change",{newValue:this.getValue(),newYyyymmdd:this.getYyyymmdd(),invalidValue:t});return this};m.prototype._parseValue=function(e){var t=this;var a=c(t);var i=a.parse(e);return i};m.prototype._formatValue=function(e){var t=this;var a=c(t);var i=a.format(e);return i};m.prototype.getAccessibilityInfo=function(){var e=a.prototype.getAccessibilityInfo.apply(this,arguments);e.type=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_TYPE_DATEINPUT");return e};function c(e){var t="";var a=false;var o=e.getBinding("value");var r;var s;if(o&&o.oType&&o.oType instanceof i){t=o.oType.getOutputPattern();a=!!o.oType.oOutputFormat.oFormatOptions.relative;s=o.oType.oOutputFormat.oFormatOptions.calendarType}if(!t){r=D(e);var p=h.getInstance(r);t=p.getDatePattern("medium");s=_.getCalendarType()}if(t!=e._sUsedPattern||s!=e._sUsedCalendarType){e._sUsedPattern=t;e._sUsedCalendarType=s;if(t=="short"||t=="medium"||t=="long"){e._oFormat=n.getInstance({style:t,strictParsing:true,relative:a,calendarType:s},r)}else{e._oFormat=n.getInstance({pattern:t,strictParsing:true,relative:a,calendarType:s},r)}}return e._oFormat}function D(e){var t=e.getLocale();var a;if(t){a=e._oLocale}else{a=_.getFormatSettings().getFormatLocale()}return a}function v(e){var a=e.getBinding("value");var o=e.getLocale();if(a&&a.oType&&a.oType instanceof i&&o){t.warning("DatePicker "+e.getId()+": Using a locale and Databinding at the same time is not supported");e._bIgnoreLocale=true}}function T(e){if(!e._oPopup){e._oPopup=new f;e._oPopup.setAutoClose(true);e._oPopup.setDurations(0,0);e._oPopup.attachClosed(M,e)}if(!e._oCalendar){sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.require("sap/ui/unified/library");e._oCalendar=new sap.ui.unified.Calendar(e.getId()+"-cal");e._oDateRange=new sap.ui.unified.DateRange;e._oCalendar.addSelectedDate(e._oDateRange);e._oCalendar.attachSelect(C,e);e._oCalendar.attachCancel(P,e);e._oPopup.setContent(e._oCalendar);e._oCalendar.addStyleClass("sapUiSizeCompact");e._oCalendar.setParent(e,undefined,true)}var t="";if(e._oDate){t=e._formatValue(e._oDate)}if(t!=e.$("input").val()){e._checkChange()}var a;var o=e.getBinding("value");if(o&&o.oType&&o.oType instanceof i){a=o.oType.oOutputFormat.oFormatOptions.calendarType}if(a){e._oCalendar.setPrimaryCalendarType(a)}var r=e._oDate;if(r){e._oCalendar.focusDate(r);if(!e._oDateRange.getStartDate()||e._oDateRange.getStartDate().getTime()!=r.getTime()){e._oDateRange.setStartDate(new Date(r.getTime()))}}else{e._oCalendar.focusDate(new Date);if(e._oDateRange.getStartDate()){e._oDateRange.setStartDate(undefined)}}if(!e._bIgnoreLocale){e._oCalendar.setLocale(e.getLocale())}e._oPopup.setAutoCloseAreas([e.getDomRef()]);e._oPopup.open(0,y.BeginTop,y.BeginBottom,e,null,null,true)}function b(e){if(e.getEditable()&&e.getEnabled()){if(!e._oPopup||!e._oPopup.isOpen()){T(e)}else{e._oPopup.close();e.focus()}}}function C(e){var t=this._oCalendar.getSelectedDates();var a="";if(t.length>0){this._oDate=t[0].getStartDate();a=this._formatValue(this._oDate)}this._oPopup.close();this.focus();var i=this._formatValue(this._oDate);this.setProperty("value",i,true);this._bValueSet=false;var o=this._oFormatYyyymmdd.format(this._oDate);this.setProperty("yyyymmdd",o,true);var r=this.$("input");if(r.val()!==a){r.val(a);this._curpos=a.length;r.cursorPos(this._curpos)}this.fireChange()}function P(e){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();this.focus()}}function M(e){if(!d(this.getDomRef(),document.activeElement)&&this.getRenderer().onblur){this.getRenderer().onblur(this)}}function F(t,a,r){var s=t._oDate;if(s&&t.getEditable()&&t.getEnabled()){var n=t.getBinding("value");var p;if(n&&n.oType&&n.oType instanceof i){p=n.oType.oOutputFormat.oFormatOptions.calendarType}else{p=_.getCalendarType()}var u=o.getInstance(new Date(s.getTime()),p);s=o.getInstance(new Date(s.getTime()),p);var l=e(t.getInputDomRef());var h=l.cursorPos();switch(r){case"day":u.setDate(u.getDate()+a);break;case"month":u.setMonth(u.getMonth()+a);var f=(s.getMonth()+a)%12;if(f<0){f=12+f}while(u.getMonth()!=f){u.setDate(u.getDate()-1)}break;case"year":u.setFullYear(u.getFullYear()+a);while(u.getMonth()!=s.getMonth()){u.setDate(u.getDate()-1)}break;default:break}if(u.getTime()<t._oMinDate.getTime()){u=new o(t._oMinDate.getTime())}else if(u.getTime()>t._oMaxDate.getTime()){u=new o(t._oMaxDate.getTime())}t._oDate=new Date(u.getTime());var d=t._formatValue(t._oDate);l.val(d);l.cursorPos(h)}}return m});