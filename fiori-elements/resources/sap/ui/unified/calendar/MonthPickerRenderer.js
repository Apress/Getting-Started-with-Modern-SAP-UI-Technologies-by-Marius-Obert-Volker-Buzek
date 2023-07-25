/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/core/format/DateFormat","sap/ui/core/InvisibleText"],function(e,t,a){"use strict";var n={apiVersion:2};n.render=function(n,r){var i=r.getProperty("_firstMonth")!==undefined?r.getProperty("_firstMonth"):r.getMonth(),l=r.getMonths(),o=0,s=r.getColumns(),d=r.getTooltip_AsString(),c=r._getLocaleData(),p=r.getId(),g="",f=[],u=[],y=r.getPrimaryCalendarType(),S=r._getSecondaryCalendarType(),h=t.getDateInstance({format:"y",calendarType:r.getPrimaryCalendarType()}),C=r._iYear?r._iYear:(new Date).getFullYear(),b=h.format(new Date(Date.UTC(C,0,1)),true),_,m,M;if(r._bLongMonth||!r._bNamesLengthChecked){f=c.getMonthsStandAlone("wide",y)}else{f=c.getMonthsStandAlone("abbreviated",y);u=c.getMonthsStandAlone("wide",y)}n.openStart("div",r);n.class("sapUiCalMonthPicker");if(S){n.class("sapUiCalMonthSecType")}if(d){n.attr("tooltip",d)}n.accessibilityState(r,{role:"grid",readonly:"true",multiselectable:r.getIntervalSelection(),roledescription:sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("MONTH_PICKER"),describedby:r._bCalendar?a.getStaticId("sap.ui.unified","CALENDAR_YEAR_PICKER_OPEN_HINT"):""});n.openEnd();var v;if(l>12){l=12}else if(l<12){o=i}if(s>0){g=100/s+"%"}else{g=100/l+"%"}for(_=0;_<l;_++){var T=_+o,D=e.fromLocalJSDate(new Date,r.getPrimaryCalendarType());D.setMonth(T,1);r._iYear&&D.setYear(r._iYear);v={role:"gridcell"};if(!r._bLongMonth&&r._bNamesLengthChecked){v["label"]=u[T]}if(s>0&&_%s===0){n.openStart("div");n.accessibilityState(null,{role:"row"});n.openEnd()}n.openStart("div",p+"-m"+T);n.class("sapUiCalItem");m=r._fnShouldApplySelection(D);M=r._fnShouldApplySelectionBetween(D);if(m){n.class("sapUiCalItemSel");v["selected"]=true}if(M){n.class("sapUiCalItemSelBetween");v["selected"]=true}if(!m&&!M){v["selected"]=false}if(T<r._iMinMonth||T>r._iMaxMonth){n.class("sapUiCalItemDsbl");v["disabled"]=true}v["label"]=f[T]+" "+b;if(S){var I=r.getSecondaryCalendarType(),U=c.getMonthsStandAlone("abbreviated",I),A=t.getDateInstance({format:"y",calendarType:I}),P=r._getDisplayedSecondaryDates(T),w,E,L;if(P.start.getMonth()===P.end.getMonth()){w=U[P.start.getMonth()];E=A.format(P.start.toUTCJSDate(),true)}else{L=c.getIntervalPattern();w=L.replace(/\{0\}/,U[P.start.getMonth()]).replace(/\{1\}/,U[P.end.getMonth()]);E=L.replace(/\{0\}/,A.format(P.start.toUTCJSDate(),true)).replace(/\{1\}/,A.format(P.end.toUTCJSDate(),true))}v["label"]=v["label"]+" "+w+" "+E}n.attr("tabindex","-1");n.style("width",g);n.accessibilityState(null,v);n.openEnd();n.text(f[T]);if(S){n.openStart("div",p+"-m"+T+"-secondary");n.class("sapUiCalItemSecText");n.openEnd();n.text(w);n.close("div")}n.close("div");if(s>0&&(_+1)%s===0){n.close("div")}}n.close("div")};return n},true);