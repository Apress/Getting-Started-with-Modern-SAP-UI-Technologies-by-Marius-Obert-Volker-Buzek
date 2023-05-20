/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/core/LocaleData","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/format/TimezoneUtil","sap/ui/core/Core","sap/ui/core/date/UniversalDate","./library","sap/ui/core/InvisibleText","sap/ui/core/format/DateFormat","sap/ui/core/ResizeHandler","sap/ui/core/Locale","./CalendarRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/unified/CalendarAppointment","sap/ui/core/InvisibleMessage","sap/ui/core/library","sap/ui/core/Configuration","sap/ui/core/date/UI5Date"],function(e,t,i,a,n,s,r,o,p,l,u,g,h,d,c,f,m,v,T,C){"use strict";var A=o.CalendarDayType;var _=o.CalendarAppointmentVisualization;var U=o.GroupAppointmentsMode;var y=o.CalendarIntervalType;var D=o.CalendarAppointmentHeight;var b=o.CalendarAppointmentRoundWidth;var S=v.InvisibleMessageMode;var M=e.extend("sap.ui.unified.CalendarRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},intervals:{type:"int",group:"Appearance",defaultValue:12},intervalSize:{type:"int",group:"Appearance",defaultValue:1},intervalType:{type:"sap.ui.unified.CalendarIntervalType",group:"Appearance",defaultValue:y.Hour},showSubIntervals:{type:"boolean",group:"Appearance",defaultValue:false},showIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},showEmptyIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},checkResize:{type:"boolean",group:"Behavior",defaultValue:true},updateCurrentTime:{type:"boolean",group:"Behavior",defaultValue:true},groupAppointmentsMode:{type:"sap.ui.unified.GroupAppointmentsMode",group:"Appearance",defaultValue:U.Collapsed},appointmentsReducedHeight:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},appointmentsVisualization:{type:"sap.ui.unified.CalendarAppointmentVisualization",group:"Appearance",defaultValue:_.Standard},appointmentHeight:{type:"sap.ui.unified.CalendarAppointmentHeight",group:"Appearance",defaultValue:D.Regular},appointmentRoundWidth:{type:"sap.ui.unified.CalendarAppointmentRoundWidth",group:"Appearance",defaultValue:b.None},multipleAppointmentsSelection:{type:"boolean",group:"Data",defaultValue:false}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},groupAppointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"groupAppointment",visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"},multiSelect:{type:"boolean"},domRefId:{type:"string"}}},startDateChange:{},leaveRow:{parameters:{type:{type:"string"}}},intervalSelect:{parameters:{startDate:{type:"object"},endDate:{type:"object"},subInterval:{type:"boolean"}}}}},renderer:h});M.prototype.init=function(){this._bRTL=T.getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this._oFormatAria=l.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' "+H.call(this).getTimePattern("medium")});this._aVisibleAppointments=[];this._aVisibleIntervalHeaders=[];this.setStartDate(C.getInstance());this._resizeProxy=c.proxy(this.handleResize,this);this.aSelectedAppointments=[];this._fnCustomSortedAppointments=undefined};M.prototype.exit=function(){if(this._sResizeListener){u.deregister(this._sResizeListener);this._sResizeListener=undefined}if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}this._fnCustomSortedAppointments=undefined};M.prototype.onBeforeRendering=function(){this._aVisibleAppointments=[];k.call(this);V.call(this);P.call(this);if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}if(!this.getAppointments().length){this.aSelectedAppointments=[]}else{this.getAppointments().forEach(function(e){this._updateSelectedAppointmentsArray(e)}.bind(this))}this._oInvisibleMessage=m.getInstance()};M.prototype.onAfterRendering=function(){O.call(this);this.updateCurrentTimeVisualization();if(this.getCheckResize()&&!this._sResizeListener){this._sResizeListener=u.register(this,this._resizeProxy)}};M.prototype.onThemeChanged=function(e){if(this.getDomRef()){for(var t=0;t<this._aVisibleAppointments.length;t++){var i=this._aVisibleAppointments[t];i.level=-1}this.handleResize(e)}};M.prototype.invalidate=function(t){if(t&&t instanceof f){var i=false;for(var a=0;a<this._aVisibleAppointments.length;a++){if(this._aVisibleAppointments[a].appointment==t){i=true;break}}if(i){this._aVisibleAppointments=[]}this._updateSelectedAppointmentsArray(t)}e.prototype.invalidate.apply(this,arguments)};M.prototype.setStartDate=function(e){if(!e){e=C.getInstance()}a._checkJSDateObject(e);var t=e.getFullYear();a._checkYearInValidRange(t);this._oUTCStartDate=a._createUniversalUTCDate(e,undefined,true);this.setProperty("startDate",e);return this};M.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=a._createUniversalUTCDate(this.getStartDate(),undefined,true)}return this._oUTCStartDate};M.prototype.setIntervalType=function(e){this.setProperty("intervalType",e);this._aVisibleAppointments=[];return this};M.prototype._getAppointmentReducedHeight=function(e){var i=!t.system.phone&&this.getAppointmentsReducedHeight()&&e.size===D.Regular;return i};M.prototype.onfocusin=function(e){if(c(e.target).hasClass("sapUiCalendarApp")){x.call(this,e.target.id)}else{var t=this._getVisibleAppointments();var i=false;var a;for(var n=0;n<t.length;n++){a=t[n].appointment;if(d(a.getDomRef(),e.target)){i=true;a.focus();break}}if(!i){a=this.getFocusedAppointment();if(a){a.focus()}}}};M.prototype.applyFocusInfo=function(e){if(this._sFocusedAppointmentId){this.getFocusedAppointment().focus()}return this};M.prototype.onsapleft=function(e){if(c(e.target).hasClass("sapUiCalendarApp")){B.call(this,this._bRTL,1)}e.preventDefault();e.stopPropagation()};M.prototype.onsapright=function(e){if(c(e.target).hasClass("sapUiCalendarApp")){B.call(this,!this._bRTL,1)}e.preventDefault();e.stopPropagation()};M.prototype.onsapup=function(e){this.fireLeaveRow({type:e.type})};M.prototype.onsapdown=function(e){this.fireLeaveRow({type:e.type})};M.prototype.onsaphome=function(e){j.call(this,e);e.preventDefault();e.stopPropagation()};M.prototype.onsapend=function(e){j.call(this,e);e.preventDefault();e.stopPropagation()};M.prototype.onsapselect=function(e){var t=this._getVisibleAppointments(),i,a;for(var n=0;n<t.length;n++){i=t[n].appointment;if(d(i.getDomRef(),e.target)){var s=!(this.getMultipleAppointmentsSelection()||e.ctrlKey||e.metaKey);W.call(this,i,s);break}}a=i.getSelected()?"APPOINTMENT_SELECTED":"APPOINTMENT_UNSELECTED";this._oInvisibleMessage.announce(this._oRb.getText(a),S.Polite);e.stopPropagation();e.preventDefault()};M.prototype.ontap=function(e){var t=this.$("Apps").children(".sapUiCalendarRowAppsInt");var i=0;var a=false;for(i=0;i<t.length;i++){var n=t[i];if(!this._isOneMonthsRowOnSmallSizes()&&d(n,e.target)){a=true;break}}if(a){G.call(this,i,e.target)}else{this.onsapselect(e)}};M.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};M.prototype.handleResize=function(e){if(e&&e.size&&e.size.width<=0){return this}var t=this.$("DummyApp");t.css("display","");O.call(this);return this};M.prototype.updateCurrentTimeVisualization=function(){var e=this.$("Now");var t=a._createUniversalUTCDate(C.getInstance(),undefined,true);var i=this.getIntervals();var n=this.getIntervalType();var s=this._getStartDate();var r=s.getTime();var o=this._oUTCEndDate;var p=o.getTime();this._sUpdateCurrentTime=undefined;if(t.getTime()<=p&&t.getTime()>=r){var l=z.call(this,n,i,s,o,r,t);var u=0;if(this._bRTL){e.css("right",l+"%")}else{e.css("left",l+"%")}e.css("display","");if(this.getUpdateCurrentTime()){switch(n){case y.Hour:u=6e4;break;case y.Day:case y.Week:case y.OneMonth:case"OneMonth":u=18e5;break;default:u=-1;break}if(u>0){this._sUpdateCurrentTime=setTimeout(this.updateCurrentTimeVisualization.bind(this),u)}}}else{e.css("display","none")}return this};M.prototype.getFocusedAppointment=function(){var e=this._getAppointmentsSorted();var t=this.getAggregation("groupAppointments",[]);var i;var a=0;for(a=0;a<t.length;a++){if(t[a].getId()==this._sFocusedAppointmentId){i=t[a];break}}if(!i){for(a=0;a<e.length;a++){if(e[a].getId()==this._sFocusedAppointmentId){i=e[a];break}}}return i};M.prototype.focusAppointment=function(e){if(!e||!(e instanceof f)){throw new Error("Appointment must be a CalendarAppointment; "+this)}var t=e.getId();if(this._sFocusedAppointmentId!=t){x.call(this,t)}else{e.focus()}return this};M.prototype.focusNearestAppointment=function(e){a._checkJSDateObject(e);var t=this._getAppointmentsSorted();var i;var n;var s;for(var r=0;r<t.length;r++){i=t[r];if(i.getStartDate()>e){if(r>0){n=t[r-1]}else{n=i}break}}if(i){if(n&&Math.abs(i.getStartDate()-e)>=Math.abs(n.getStartDate()-e)){s=n}else{s=i}this.focusAppointment(s)}return this};M.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};M.prototype._getVisibleIntervalHeaders=function(){return this._aVisibleIntervalHeaders};M.prototype._getNonWorkingDays=function(){if(this.getIntervalSize()!==1){return[]}var e=this.getNonWorkingDays();if(!e){var t=H.call(this);var i=t.getWeekendStart();var a=t.getWeekendEnd();e=[];for(var n=0;n<=6;n++){if(i<=a&&n>=i&&n<=a||i>a&&(n>=i||n<=a)){e.push(n)}}}else if(!Array.isArray(e)){e=[]}return e};M.prototype._isOneMonthsRowOnSmallSizes=function(){return(this.getIntervalType()===y.OneMonth||this.getIntervalType()==="OneMonth")&&this.getIntervals()===1};M.prototype._getAppointmentsSorted=function(){var e=this.getAppointments(),t=K;e.sort(this._fnCustomSortedAppointments?this._fnCustomSortedAppointments:t);return e};M.prototype._setCustomAppointmentsSorterCallback=function(e){this._fnCustomSortedAppointments=e;this.invalidate()};M.prototype._calculateAppoitnmentVisualCue=function(e){if(I(this,e)){return{appTimeUnitsDifRowStart:0,appTimeUnitsDifRowEnd:0}}var t=e.getStartDate(),i=e.getEndDate(),a=new r(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),n=new r(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes()),s=this.getIntervalType(),o=this.getStartDate(),p=s==="Hour"?new r(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()):new r(o.getFullYear(),o.getMonth(),o.getDate()),l=this.getIntervals(),u;switch(s){case"Hour":u=new r(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()+l);break;case"Day":case"Week":case"One Month":u=new r(o.getFullYear(),o.getMonth(),o.getDate()+l);break;case"Month":u=new r(o.getFullYear(),o.getMonth()+l,o.getDate());break;default:break}return{appTimeUnitsDifRowStart:p.getTime()-a.getTime(),appTimeUnitsDifRowEnd:n.getTime()-u.getTime()}};M.prototype._updateSelectedAppointmentsArray=function(e){if(e.getSelected()){if(this.aSelectedAppointments.indexOf(e.getId())===-1){this.aSelectedAppointments.push(e.getId())}}else{this.aSelectedAppointments=this.aSelectedAppointments.filter(function(t){return t!==e.getId()})}};function I(e,t){var i=e.getAggregation("groupAppointments",[]);var a;for(a=0;a<i.length;++a){if(t===i[a]){return true}}return false}function w(){if(!this._sLocale){this._sLocale=T.getFormatSettings().getFormatLocale().toString()}return this._sLocale}function H(){if(!this._oLocaleData){var e=w.call(this);var t=new g(e);this._oLocaleData=i.getInstance(t)}return this._oLocaleData}function k(){var e=this.getStartDate();var t;var i=this.getIntervals();var a=this.getIntervalType();this._oUTCStartDate=R.call(this,e);switch(a){case y.Hour:t=new r(this._oUTCStartDate.getTime());t.setUTCHours(t.getUTCHours()+i);break;case y.Day:case y.Week:case y.OneMonth:case"OneMonth":t=new r(this._oUTCStartDate.getTime());t.setUTCDate(t.getUTCDate()+i*this.getIntervalSize());break;case y.Month:t=new r(this._oUTCStartDate.getTime());t.setUTCMonth(t.getUTCMonth()+i);break;default:throw new Error("Unknown IntervalType: "+a+"; "+this)}t.setUTCMilliseconds(-1);this._iRowSize=t.getTime()-this._oUTCStartDate.getTime();this._iIntervalSize=Math.floor(this._iRowSize/i);this._oUTCEndDate=t}function R(e){var t=this.getIntervalType();var i=a._createUniversalUTCDate(e,undefined,true);switch(t){case y.Hour:i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case y.Day:case y.Week:case y.OneMonth:case"OneMonth":i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case y.Month:i.setUTCDate(1);i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;default:throw new Error("Unknown IntervalType: "+t+"; "+this)}return i}function E(){return t.system.phone||this.getGroupAppointmentsMode()===U.Collapsed}function V(){var e=this._getAppointmentsSorted();var t;var i;var n;var s=this.getIntervals();var o=this.getIntervalType();var p=this._getStartDate();var l=p.getTime();var u=this._oUTCEndDate;var g=u.getTime();var h=[];var d=false;var c=0;var f=0;var m=E.call(this);var v=this._needAppointmentHorizontalFit();this.destroyAggregation("groupAppointments",true);for(c=0;c<e.length;c++){t=e[c];var T=a._createUniversalUTCDate(t.getStartDate(),undefined,true);var A=T.getTime();T.setUTCSeconds(0);T.setUTCMilliseconds(0);var _=t.getEndDate()?a._createUniversalUTCDate(t.getEndDate(),undefined,true):a._createUniversalUTCDate(C.getInstance(864e12),undefined,true);var U=_.getTime();_.setUTCSeconds(0);_.setUTCMilliseconds(0);var D=false;if(T.getTime()<l&&_.getTime()>=l){T=new r(l);D=true}if(_.getTime()>g&&T.getTime()<=g){_=new r(g);D=true}var b=(_.getTime()-T.getTime())/6e4;if(D&&b==0){continue}var S=0;var M=0;var I=-1;i=undefined;n=undefined;if(T&&T.getTime()<=g&&_&&_.getTime()>=l&&A<=U){if(m&&o==y.Month&&_.getTime()-T.getTime()<6048e5){i=L.call(this,T,t,o,s,p,u,l,h);var w=a._createUniversalUTCDate(i.getEndDate(),undefined,true);if(_.getTime()>w.getTime()){n=L.call(this,_,t,o,s,p,u,l,h)}}if(v){this._setHorizontalRoundingWidth(t,T,_)}S=z.call(this,o,s,p,u,l,T);M=F.call(this,o,s,p,u,l,_);if(i){i._iBegin=S;i._iEnd=M;i._iLevel=I;if(n){n._iBegin=S;n._iEnd=M;n._iLevel=I}continue}h.push({appointment:t,begin:S,end:M,calculatedEnd:M,level:I,size:this.getProperty("appointmentHeight")});if(this._sFocusedAppointmentId&&this._sFocusedAppointmentId==t.getId()){d=true}}}var H=this.getAggregation("groupAppointments",[]);if(H.length>0){for(c=0;c<h.length;c++){t=h[c];if(t.appointment._aAppointments&&t.appointment._aAppointments.length<=1){i=t.appointment;var k=false;if(i._aAppointments.length==0){k=true}else{for(f=0;f<h.length;f++){if(h[f].appointment==i._aAppointments[0]){k=true;break}}}if(!k){for(f=0;f<H.length;f++){n=H[f];if(i!=n){for(var R=0;R<n._aAppointments.length;R++){if(i._aAppointments[0]==n._aAppointments[R]){n._aAppointments.splice(R,1);if(n._aAppointments.length==1){this.removeAggregation("groupAppointments",n);n.destroy();H=this.getAggregation("groupAppointments",[])}else{n.setProperty("title",n._aAppointments.length,true)}break}}}}t.begin=i._iBegin;t.end=i._iEnd;t.calculatedEnd=i._iEnd;t.level=i._iLevel;t.appointment=i._aAppointments[0]}else{h.splice(c,1);c--}this.removeAggregation("groupAppointments",i);i.destroy();H=this.getAggregation("groupAppointments",[])}}}if(!d){if(h.length>0){this._sFocusedAppointmentId=h[0].appointment.getId()}else{this._sFocusedAppointmentId=undefined}}this._aVisibleAppointments=h;return this._aVisibleAppointments}function L(e,t,i,n,s,o,p,l){var u=this.getAggregation("groupAppointments",[]);var g;var h=H.call(this);var d=h.getFirstDayOfWeek();var c=e.getUTCDay();var m=new r(e.getTime());m.setUTCHours(0);m.setUTCMinutes(0);m.setUTCSeconds(0);m.setUTCMilliseconds(0);if(d<=c){m.setDate(m.getDate()-(c-d))}else{m.setDate(m.getDate()-(7-c-d))}for(var v=0;v<u.length;v++){g=u[v];var T=a._createUniversalUTCDate(g.getStartDate(),undefined,true);if(T.getTime()==m.getTime()){break}g=undefined}if(!g){var _=new r(m.getTime());_.setDate(_.getDate()+7);_.setMilliseconds(-1);g=new f(this.getId()+"-Group"+u.length,{type:t.getType(),startDate:a._createLocalDate(C.getInstance(m.getTime()),true),endDate:a._createLocalDate(C.getInstance(_.getTime()),true)});g._aAppointments=[];this.addAggregation("groupAppointments",g,true);var U=z.call(this,i,n,s,o,p,m);var y=F.call(this,i,n,s,o,p,_);l.push({appointment:g,begin:U,end:y,calculatedEnd:y,level:-1,size:this.getProperty("appointmentHeight")})}g._aAppointments.push(t);if(g.getType()!=A.None&&g.getType()!=t.getType()){g.setType(A.None)}g.setProperty("title",g._aAppointments.length,true);return g}function z(e,t,i,a,n,s){var o=0;if(e!=y.Month){o=100*(s.getTime()-n)/this._iRowSize}else{var p=new r(s.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new r(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100*g/t+100*(s.getTime()-p.getTime())/u/t}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function F(e,t,i,a,n,s){var o=0;if(e!=y.Month){o=100-100*(s.getTime()-n)/this._iRowSize}else{var p=new r(s.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new r(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100-(100*g/t+100*(s.getTime()-p.getTime())/u/t)}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function P(){var e=[];if(this.getShowIntervalHeaders()){var t=this.getIntervalHeaders();var i;var n=this.getIntervals();var s=this.getIntervalType();var o=this._getStartDate();var p=o.getTime();var l=this._oUTCEndDate;var u=l.getTime();var g=0;var h=0;for(g=0;g<t.length;g++){i=t[g];var d=a._createUniversalUTCDate(i.getStartDate(),undefined,true);d.setUTCSeconds(0);d.setUTCMilliseconds(0);var c=i.getEndDate()?a._createUniversalUTCDate(i.getEndDate(),undefined,true):a._createUniversalUTCDate(C.getInstance(864e12),undefined,true);c.setUTCSeconds(0);c.setUTCMilliseconds(0);if(d&&d.getTime()<=u&&c&&c.getTime()>=p){var f=new r(o.getTime());var m=new r(o.getTime());m.setUTCMinutes(m.getUTCMinutes()-1);var v=-1;var T=-1;for(h=0;h<n;h++){switch(s){case y.Hour:m.setUTCHours(m.getUTCHours()+1);if(h>0){f.setUTCHours(f.getUTCHours()+1)}break;case y.Day:case y.Week:case y.OneMonth:case"OneMonth":m.setUTCDate(m.getUTCDate()+1);if(h>0){f.setUTCDate(f.getUTCDate()+1)}break;case y.Month:m.setUTCDate(1);m.setUTCMonth(m.getUTCMonth()+2);m.setUTCDate(0);if(h>0){f.setUTCMonth(f.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+s+"; "+this)}if(d&&d.getTime()<=f.getTime()&&c&&c.getTime()>=m.getTime()){if(v<0){v=h}T=h}}if(v>=0){e.push({interval:v,appointment:i,last:T})}}}}this._aVisibleIntervalHeaders=e;return this._aVisibleIntervalHeaders}function O(){if(this._isOneMonthsRowOnSmallSizes()){return}var e=this.$("Apps");var t=e.innerWidth();if(t<=0){return}var i=this.$("DummyApp");var a=i.outerHeight(true);if(a<=0){return}var n=4;var s=i.outerWidth();var r=s/t*100;var o=Math.ceil(1e3*r)/1e3;var p;var l;var u=0;var g=0;var h=0;var d=false;var f;var m=this._needAppointmentHorizontalFit();if(this.getShowIntervalHeaders()&&(this.getShowEmptyIntervalHeaders()||this._getVisibleIntervalHeaders().length>0)){u=c(this.$("AppsInt0").children(".sapUiCalendarRowAppsIntHead")[0]).outerHeight(true);d=true}for(h=0;h<this._aVisibleAppointments.length;h++){p=this._aVisibleAppointments[h];l=p.appointment.$();var v=Math.floor(1e3*(100-p.calculatedEnd-p.begin))/1e3;var T=false;if(v<o){p.end=100-p.begin-r;if(p.end<0){p.end=0}T=true;l.addClass("sapUiCalendarAppSmall")}else if(l.hasClass("sapUiCalendarAppSmall")){p.end=p.calculatedEnd;T=true;l.removeClass("sapUiCalendarAppSmall")}if(T){p.level=-1}if(T&&!m){if(this._bRTL){l.css("left",p.end+"%")}else{l.css("right",p.end+"%")}}if(m){p.end=p.calculatedEnd}}for(h=0;h<this._aVisibleAppointments.length;h++){p=this._aVisibleAppointments[h];l=p.appointment.$();var C={};if(p.level<0){for(var A=0;A<this._aVisibleAppointments.length;A++){var _=this._aVisibleAppointments[A];if(p!=_&&p.begin<Math.floor(1e3*(100-_.end))/1e3&&Math.floor(1e3*(100-p.end))/1e3>_.begin&&_.level>=0){this._setBlockedLevelsForAppointment(_,C)}}p.level=this._getAppointmetLevel(C,p);l.attr("data-sap-level",p.level)}f=a*p.level+u;if(!d){f+=n}l.css("top",f+"px");var U=p.level;U+=this._getAppointmentRowCount(p)-1;if(g<U){g=U}}g++;a=a*g+u;if(!d){a+=n}if(!this.getHeight()){e.outerHeight(a)}else{var y=this.$("Apps").children(".sapUiCalendarRowAppsInt");for(h=0;h<y.length;h++){var D=c(y[h]);D.outerHeight(a)}}i.css("display","none")}function W(e,t){var i=0;var a;var n;var s;var r;var o=p.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");var l=p.getStaticId("sap.ui.unified","APPOINTMENT_UNSELECTED");var u=!e.getSelected();if(t){var g=this.getAppointments();var h=this.getAggregation("groupAppointments",[]);c.merge(g,h);for(i=0;i<g.length;i++){a=g[i];if(a.getId()!==e.getId()&&a.getSelected()){a.setProperty("selected",false,true);a.$().removeClass("sapUiCalendarAppSel");for(var i=0;i<this.aSelectedAppointments.length;i++){if(this.aSelectedAppointments[i]!==a.getId()){this.aSelectedAppointments.splice(i)}}n=a.$().attr("aria-labelledby");s=n?n.replace(o,l):"";a.$().attr("aria-labelledby",s)}}}r=e.$().attr("aria-labelledby").replace(l,o).trim();s=e.$().attr("aria-labelledby").replace(o,l).trim();if(e.getSelected()){e.setProperty("selected",false,true);e.$().removeClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",s);$(this,t)}else{e.setProperty("selected",true,true);e.$().addClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",r);$(this,t)}this._updateSelectedAppointmentsArray(e);if(e._aAppointments){for(i=0;i<e._aAppointments.length;i++){a=e._aAppointments[i];a.setProperty("selected",u,true)}this.fireSelect({appointments:e._aAppointments,multiSelect:!t,domRefId:e.getId()})}else{this.fireSelect({appointment:e,multiSelect:!t,domRefId:e.getId()})}}function N(e){var t=this._getPlanningCalendar();if(t){t["_onRow"+e]()}}M.prototype._needAppointmentHorizontalFit=function(){var e=this._getPlanningCalendar(),t,i,a;if(!e||this.getAppointmentRoundWidth()===b.None){return false}t=e.getViewKey();i=e._getView(t);a=e._getIntervals(i);return a>=20};M.prototype._setHorizontalRoundingWidth=function(e,t,i){var a;switch(this.getAppointmentRoundWidth()){case b.HalfColumn:a=12;break}this._roundAppointment(e,t,i,a)};M.prototype._roundAppointment=function(e,t,i,a){var n,s;n=e.getStartDate().getHours()-e.getStartDate().getHours()%a;t.setUTCHours(n);t.setUTCMinutes(0);t.setUTCSeconds(0);t.setUTCMilliseconds(0);s=e.getEndDate().getHours()-e.getEndDate().getHours()%a+a;i.setUTCHours(s);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0)};M.prototype._setBlockedLevelsForAppointment=function(e,t){var i=this._getAppointmentRowCount(e);for(var a=0;a<i;a++){t[e.level+a]=true}return t};M.prototype._getAppointmentRowCount=function(e){var t,i=this._getAppointmentReducedHeight(e);switch(e.size){case D.HalfSize:t=1;break;case D.Regular:t=2;if(i&&!e.appointment.getText()&&!e.appointment.getDescription()){t=1}break;case D.Large:t=3;break;case D.Automatic:t=1;if(e.appointment.getText()){t+=1}if(e.appointment.getDescription()){t+=1}break}return t};M.prototype._getAppointmetLevel=function(e,t){var i=0;var a=this._getAppointmentRowCount(t);var n=true;while(n){n=this._isPosibleToPositionAppointment(i,e,a);if(!n){n=true;i+=1}else{n=false}}return i};M.prototype._isPosibleToPositionAppointment=function(e,t,i){for(var a=e;a<i+e;a++){if(t[a]){return false}}return true};M.prototype._getPlanningCalendar=function(){var e=this;while(e.getParent()!==null){if(e.isA("sap.m.PlanningCalendar")){return e}e=e.getParent()}};function $(e,t){if(t){N.call(e,"DeselectAppointment")}}function Y(e){var t=this.getAggregation("groupAppointments",[]);var i;var a=false;for(var n=0;n<t.length;n++){var s=t[n]._aAppointments;for(var r=0;r<s.length;r++){if(s[r].getId()==e){i=t[n];a=true;break}}if(a){break}}return i}function x(e){if(this._sFocusedAppointmentId!=e){var t=this._getAppointmentsSorted();var i=this._aVisibleAppointments;var n;var s=0;n=Y.call(this,e);if(n){e=n.getId();n=undefined}for(s=0;s<i.length;s++){if(i[s].appointment.getId()==e){n=i[s].appointment;break}}if(n){var r=this.getFocusedAppointment().$();var o=n.$();this._sFocusedAppointmentId=n.getId();r.attr("tabindex","-1");o.attr("tabindex","0");o.trigger("focus")}else{for(s=0;s<t.length;s++){if(t[s].getId()==e){n=t[s];break}}if(n){this._sFocusedAppointmentId=n.getId();var p=R.call(this,n.getStartDate());this.setStartDate(a._createLocalDate(p,true));if(!d(this.getDomRef(),document.activeElement)){setTimeout(function(){this.getFocusedAppointment().focus()}.bind(this),0)}this.fireStartDateChange()}}}}function B(e,t){var i=this._sFocusedAppointmentId;var a=this._getAppointmentsSorted();var n=this.getAggregation("groupAppointments",[]);var s;var r=0;var o=0;for(o=0;o<n.length;o++){if(n[o].getId()==i){var p=n[o]._aAppointments;if(e){i=p[p.length-1].getId()}else{i=p[0].getId()}break}}for(o=0;o<a.length;o++){if(a[o].getId()==i){r=o;break}}if(e){r=r+t}else{r=r-t}if(r<0){r=0}else if(r>=a.length){r=a.length-1}s=a[r];x.call(this,s.getId())}function j(e){var t=this._getAppointmentsSorted();var i;var n=new r(this._getStartDate());var s=new r(this._oUTCEndDate);var o=this.getIntervalType();var p;var l;n.setUTCHours(0);s.setUTCHours(0);s.setUTCMinutes(0);s.setUTCSeconds(0);switch(o){case y.Hour:s.setUTCDate(s.getUTCDate()+1);s.setUTCMilliseconds(-1);break;case y.Day:case y.Week:case y.OneMonth:case"OneMonth":n.setUTCDate(1);s.setUTCMonth(s.getUTCMonth()+1);s.setUTCDate(1);s.setUTCMilliseconds(-1);break;case y.Month:n.setUTCMonth(0);n.setUTCDate(1);s.setUTCFullYear(s.getUTCFullYear()+1);s.setUTCMonth(1);s.setUTCDate(1);s.setUTCMilliseconds(-1);break;default:throw new Error("Unknown IntervalType: "+o+"; "+this)}var u=a._createLocalDate(n,true);var g=a._createLocalDate(s,true);for(var h=0;h<t.length;h++){if(t[h].getStartDate()>=u&&t[h].getStartDate()<=g){i=t[h];p=i.getId();if(e.type=="saphome"){break}}else if(t[h].getStartDate()>g){break}}l=Y.call(this,p);if(l){i=l;p=i.getId()}if(p&&p!=this._sFocusedAppointmentId){x.call(this,p)}else if(e._bPlanningCalendar&&i){i.focus()}else{this.fireLeaveRow({type:e.type})}}function G(e,t){var i=this.getIntervalType();var n=this._getStartDate();var s=new r(n.getTime());var o;var p=false;var l=0;var u=0;if(c(t).hasClass("sapUiCalendarRowAppsSubInt")){p=true;var g=c(c(t).parent()).children(".sapUiCalendarRowAppsSubInt");u=g.length;for(l=0;l<u;l++){var h=g[l];if(h==t){break}}}switch(i){case y.Hour:s.setUTCHours(s.getUTCHours()+e);if(p){s.setUTCMinutes(s.getUTCMinutes()+l*60/u);o=new r(s.getTime());o.setUTCMinutes(o.getUTCMinutes()+60/u)}else{o=new r(s.getTime());o.setUTCHours(o.getUTCHours()+1)}break;case y.Day:case y.Week:case y.OneMonth:case"OneMonth":s.setUTCDate(s.getUTCDate()+e);if(p){s.setUTCHours(s.getUTCHours()+l*24/u);o=new r(s.getTime());o.setUTCHours(o.getUTCHours()+24/u)}else{o=new r(s.getTime());o.setUTCDate(o.getUTCDate()+1)}break;case y.Month:s.setUTCMonth(s.getUTCMonth()+e);if(p){s.setUTCDate(s.getUTCDate()+l);o=new r(s.getTime());o.setUTCDate(o.getUTCDate()+1)}else{o=new r(s.getTime());o.setUTCMonth(o.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+i+"; "+this)}o.setUTCMilliseconds(o.getUTCMilliseconds()-1);s=a._createLocalDate(s,true);o=a._createLocalDate(o,true);this.fireIntervalSelect({startDate:s,endDate:o,subInterval:p})}function K(e,t){var i=e.getStartDate()-t.getStartDate();if(i==0){i=t.getEndDate()-e.getEndDate()}return i}return M});