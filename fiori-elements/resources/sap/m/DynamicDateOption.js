/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UI5Date","sap/ui/core/Element","./Label","./StepInput","./DateTimePicker","sap/ui/unified/Calendar","sap/ui/unified/DateRange","sap/ui/unified/calendar/MonthPicker","sap/ui/unified/calendar/CustomMonthPicker","sap/ui/core/format/TimezoneUtil"],function(e,t,a,r,n,o,i,s,c,u){"use strict";var l=t.extend("sap.m.DynamicDateOption",{metadata:{library:"sap.m",properties:{key:{type:"string"},valueTypes:{type:"string[]"}}}});l.prototype.getText=function(e){return this.getKey()};l.prototype.getValueHelpUITypes=function(e){throw new Error("Need implementation for method getValueHelpUITypes. Option: "+this.getKey())};l.prototype.createValueHelpUI=function(e,t){var r=e.getValue()&&Object.assign({},e.getValue()),n=this.getValueHelpUITypes(e),o=n.length,i=[],s;if(!e.aControlsByParameters){e.aControlsByParameters={}}e.aControlsByParameters[this.getKey()]=[];if(r&&r.values){r.values=r.values.map(function(e){return e})}for(var c=0;c<n.length;c++){if(n[c].getText()){i.push(new a({text:n[c].getText(),width:"100%"}))}s=this._createControl(c,n[c].getType(),r,t,o);i.push(s);e.aControlsByParameters[this.getKey()].push(s)}return i};l.prototype.validateValueHelpUI=function(e){var t=this.getValueHelpUITypes();for(var a=0;a<t.length;a++){var r=e.aControlsByParameters[this.getKey()][a];switch(t[a].getType()){case"int":if(r._isLessThanMin(r.getValue())||r._isMoreThanMax(r.getValue())){return false}break;case"month":case"custommonth":case"date":case"daterange":if(!r.getSelectedDates()||r.getSelectedDates().length==0){return false}break;case"datetime":if(!r.getDateValue()){return false}break}}return true};l.prototype.getValueHelpOutput=function(e){var t=this.getValueHelpUITypes(),a={},r;a.operator=this.getKey();a.values=[];for(var n=0;n<t.length;n++){var o=e.aControlsByParameters[this.getKey()][n];switch(t[n].getType()){case"int":r=o.getValue();break;case"month":case"date":if(!o.getSelectedDates().length){return null}r=o.getSelectedDates()[0].getStartDate();break;case"custommonth":if(!o.getSelectedDates()||!o.getSelectedDates().length){return null}r=[o.getSelectedDates()[0].getStartDate().getMonth(),o.getSelectedDates()[0].getStartDate().getFullYear()];break;case"datetime":if(!o.getDateValue()){return null}r=o.getDateValue();break;case"daterange":if(!o.getSelectedDates().length){return null}var i=o.getSelectedDates()[0].getEndDate()||o.getSelectedDates()[0].getStartDate();r=[o.getSelectedDates()[0].getStartDate(),i];break;default:break}if(Array.isArray(r)){a.values=Array.prototype.concat.apply(a.values,r)}else{r&&a.values.push(r)}}return a};l.prototype.getGroup=function(){return 0};l.prototype.getGroupHeader=function(){var e=this.getGroup()>-1&&this.getGroup()<7?this.getGroup():0;return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("DDR_OPTIONS_GROUP_"+e)};l.prototype.format=function(e){throw new Error("Need implementation for method format. Option: "+this.getKey())};l.prototype.parse=function(e){throw new Error("Need implementation for method parse. Option: "+this.getKey())};l.prototype.toDates=function(e){throw new Error("Need implementation for method toDates. Option: "+this.getKey())};l.prototype.enhanceFormattedValue=function(){return false};l.prototype._createControl=function(e,t,a,r,n){var o;switch(t){case"int":o=this._createIntegerControl(a,e,r);break;case"date":o=this._createDateControl(a,e,r);break;case"datetime":if(n===1){o=this._createDateTimeInnerControl(a,e,r)}else if(n===2){o=this._createDateTimeControl(a,e,r)}break;case"daterange":o=this._createDateRangeControl(a,e,r);break;case"month":o=this._createMonthControl(a,e,r);break;case"custommonth":o=this._createCustomMonthControl(a,e,r);break;default:break}return o};l.prototype._createIntegerControl=function(e,t,a){var n=new r({width:"120px"});if(e&&this.getKey()===e.operator){n.setValue(e.values[t])}if(a instanceof Function){n.attachChange(function(){a(this)},this)}return n};l.prototype._createDateTimeControl=function(e,t,a,r,o){var i=new n({timezone:u.getLocalTimezone(),calendarWeekNumbering:o});if(e&&this.getKey()===e.operator){i.setDateValue(e.values[t])}if(a instanceof Function){i.attachChange(function(){a(this)},this)}return i};l.prototype._createDateControl=function(t,a,r,n){var s=new o({width:"100%",calendarWeekNumbering:n});var c;if(t&&this.getKey()===t.operator){c=e.getInstance(t.values[a].getTime());s.addSelectedDate(new i({startDate:c}))}if(r instanceof Function){s.attachSelect(function(){r(this)},this)}return s};l.prototype._createDateTimeInnerControl=function(t,a,r,o){var s=new n({width:"100%",calendarWeekNumbering:o}),c;s._createPopup();s._createPopupContent();c=s._oPopupContent;c.setForcePhoneView(true);c.getCalendar().removeAllSelectedDates();if(t&&this.getKey()===t.operator){var u=e.getInstance(t.values[a]);c.getCalendar().addSelectedDate(new i({startDate:u}));c.getClocks()._setTimeValues(u)}if(r instanceof Function){c.getClocks().getAggregation("_clocks").forEach(function(e){e.attachChange(function(e){r(this)}.bind(this))}.bind(this));if(c.getClocks().getAggregation("_buttonAmPm")){c.getClocks().getAggregation("_buttonAmPm").attachSelectionChange(function(e){r(this)}.bind(this))}c.getCalendar().attachSelect(function(){r(this)},this)}return c};l.prototype._createDateRangeControl=function(t,a,r,n){var s=new o({intervalSelection:true,width:"100%",calendarWeekNumbering:n});if(t&&this.getKey()===t.operator){var c=e.getInstance(t.values[a].getTime());var u=e.getInstance(t.values[a+1].getTime());s.addSelectedDate(new i({startDate:c,endDate:u}))}if(r instanceof Function){s.attachSelect(function(){r(this)},this)}return s};l.prototype._createMonthControl=function(t,a,r){var n=new s,o=e.getInstance(),c=t&&this.getKey()===t.operator?t.values[a]:o.getMonth();n.setMonth(c);n.addSelectedDate(new i({startDate:o}));if(r instanceof Function){n.attachSelect(function(){r(this)},this)}return n};l.prototype._createCustomMonthControl=function(t,a,r){var n=new c,o=e.getInstance(),s=t&&a>=0&&this.getKey()===t.operator?t.values[a]:o.getMonth(),u=t&&a>=0&&this.getKey()===t.operator?t.values[a+1]:o.getFullYear();o.setDate(1);o.setMonth(s);o.setYear(u);n.addSelectedDate(new i({startDate:o}));if(r instanceof Function){n.attachSelect(function(){r(this)},this)}return n};return l});