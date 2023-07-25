/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./YearPicker","./YearRangePickerRenderer","./CalendarDate","./CalendarUtils","sap/ui/thirdparty/jquery"],function(e,t,a,r,i){"use strict";var s=e.extend("sap.ui.unified.calendar.YearRangePicker",{metadata:{library:"sap.ui.unified",properties:{years:{type:"int",group:"Appearance",defaultValue:9},columns:{type:"int",group:"Appearance",defaultValue:3},rangeSize:{type:"int",group:"Appearance",defaultValue:20}}},renderer:t});s.prototype.setDate=function(e){var t,i,s,n,o;e&&r._checkJSDateObject(e);i=e.getFullYear();r._checkYearInValidRange(i);t=a.fromLocalJSDate(e,this._getPrimaryCalendarType());t.setMonth(0,1);this.setProperty("date",e);this.setProperty("year",t.getYear());this._oDate=t;s=this.getYears();o=Math.floor(s/2);n=new a(this._oDate,this._getPrimaryCalendarType());n=this._checkFirstDate(n);this._iSelectedIndex=o;this.setProperty("_middleDate",n);return this};s.prototype._checkFirstDate=function(e){var t=this.getYears();var i=new a(this._oMaxDate,this._getPrimaryCalendarType());if(!i.isSame(r._maxDate(this._getPrimaryCalendarType()))){return e}i.setYear(i.getYear()-Math.floor(t/2)*this.getRangeSize()+1-Math.floor(this.getRangeSize()/2));if(e.isAfter(i)&&e.getYear()!=i.getYear()){e=new a(i,this._getPrimaryCalendarType());e.setMonth(0,1)}else if(e.isBefore(this._oMinDate)&&e.getYear()!=this._oMinDate.getYear()){e=new a(this._oMinDate,this._getPrimaryCalendarType());e.setMonth(0,1)}return e};s.prototype._updatePage=function(e,t,r){var s=this._oItemNavigation.getItemDomRefs(),n=a.fromLocalJSDate(this._oFormatYyyymmdd.parse(i(s[0]).attr("data-sap-year-start")),this._getPrimaryCalendarType()),o=this.getYears(),h=this.getRangeSize();if(e){var p=new a(this._oMaxDate,this._getPrimaryCalendarType());p.setYear(p.getYear()-o*h+1);if(n.isBefore(p)){n.setYear(n.getYear()+o*h+Math.floor(h/2)+Math.floor(o/2)*h);n=this._checkFirstDate(n)}else{return}}else{if(n.isAfter(this._oMinDate)){n.setYear(n.getYear()-o*h);if(n.isBefore(this._oMinDate)){n=new a(this._oMinDate,this._getPrimaryCalendarType())}n.setYear(n.getYear()+Math.floor(o/2)*h+Math.floor(h/2));n=this._checkFirstDate(n)}else{return}}this._iSelectedIndex=t;this.setProperty("_middleDate",n);if(r){this.firePageChange()}};s.prototype._checkDateEnabled=function(e,t){if(r._isBetween(this._oMinDate,e,t,true)||r._isBetween(this._oMaxDate,e,t,true)||this._oMinDate.isBefore(e)&&this._oMaxDate.isAfter(t)){return true}return false};s.prototype._selectYear=function(e){var t=this._oItemNavigation.getItemDomRefs(),r=i(t[e]),s=r.attr("data-sap-year-start"),n=a.fromLocalJSDate(this._oFormatYyyymmdd.parse(s),this._getPrimaryCalendarType());if(r.hasClass("sapUiCalItemDsbl")){return false}this.setProperty("date",n.toLocalJSDate());this.setProperty("year",n.getYear());return true};s.prototype._getDisplayedSecondaryDates=function(e){var t=this.getSecondaryCalendarType(),r=new a(e,e.getCalendarType()),i=new a(e,e.getCalendarType());r.setMonth(0,1);r=new a(r,t);i.setYear(i.getYear()+this.getRangeSize());i.setMonth(0,1);i.setDate(i.getDate()-1);i=new a(i,t);return{start:r,end:i}};s.prototype.setSecondaryCalendarType=function(e){this.setProperty("secondaryCalendarType",e);if(this._getSecondaryCalendarType()){this.setColumns(2);this.setYears(8);this.setRangeSize(8)}return this};return s});