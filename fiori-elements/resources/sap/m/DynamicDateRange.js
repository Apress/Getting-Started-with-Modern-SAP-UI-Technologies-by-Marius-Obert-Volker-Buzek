/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Element","sap/ui/core/Control","sap/ui/core/ListItem","sap/ui/core/library","sap/ui/core/Renderer","sap/ui/core/message/MessageMixin","sap/m/DynamicDateFormat","sap/m/DynamicDateUtil","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/LabelEnablement","sap/ui/core/format/DateFormat","sap/ui/core/format/TimezoneUtil","sap/ui/base/ManagedObjectObserver","sap/ui/Device","./Label","./GroupHeaderListItem","./StandardListItem","./StandardListItemRenderer","./Button","./List","./Input","./InputRenderer","./Toolbar","./ResponsivePopover","./Page","./NavContainer","./DynamicDateRangeRenderer","./StandardDynamicDateOption","./library","sap/ui/thirdparty/jquery","sap/ui/core/Configuration","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/CustomData"],function(t,e,i,o,n,a,s,r,u,p,l,h,g,d,f,c,_,y,T,v,O,m,A,D,S,I,E,R,b,C,N,P,V,L,F){"use strict";var M=n.ValueState,x=N.ToolbarDesign,H=N.ToolbarStyle,B=N.ListType,Y=N.ListMode,U=N.ListSeparators,w=sap.ui.getCore().getLibraryResourceBundle("sap.m");var K=i.extend("sap.m.DynamicDateRange",{metadata:{library:"sap.m",properties:{value:{type:"object"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:M.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},required:{type:"boolean",group:"Misc",defaultValue:false},enableGroupHeaders:{type:"boolean",group:"Behavior",defaultValue:true},formatter:{type:"object"},options:{type:"string[]",group:"Behavior",defaultValue:["DATE","TODAY","YESTERDAY","TOMORROW","FIRSTDAYWEEK","LASTDAYWEEK","FIRSTDAYMONTH","LASTDAYMONTH","FIRSTDAYQUARTER","LASTDAYQUARTER","FIRSTDAYYEAR","LASTDAYYEAR","DATERANGE","DATETIMERANGE","FROM","TO","FROMDATETIME","TODATETIME","YEARTODATE","DATETOYEAR","LASTMINUTES","LASTHOURS","LASTDAYS","LASTWEEKS","LASTMONTHS","LASTQUARTERS","LASTYEARS","NEXTMINUTES","NEXTHOURS","NEXTDAYS","NEXTWEEKS","NEXTMONTHS","NEXTQUARTERS","NEXTYEARS","TODAYFROMTO","THISWEEK","LASTWEEK","NEXTWEEK","SPECIFICMONTH","SPECIFICMONTHINYEAR","THISMONTH","LASTMONTH","NEXTMONTH","THISQUARTER","LASTQUARTER","NEXTQUARTER","QUARTER1","QUARTER2","QUARTER3","QUARTER4","THISYEAR","LASTYEAR","NEXTYEAR","DATETIME"]},hideInput:{type:"boolean",group:"Misc",defaultValue:false},calendarWeekNumbering:{type:"sap.ui.core.date.CalendarWeekNumbering",group:"Appearance",defaultValue:null}},aggregations:{_input:{type:"sap.m.Input",multiple:false,visibility:"hidden"},_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"object"},valid:{type:"boolean"}}}}},renderer:b});s.call(K.prototype);var X=["LASTMINUTES","LASTHOURS"];var W=["NEXTMINUTES","NEXTHOURS"];var G=X.concat(W);var k=["LASTMINUTES","LASTHOURS","LASTDAYS","LASTWEEKS","LASTMONTHS","LASTQUARTERS","LASTYEARS"];var Q=["NEXTMINUTES","NEXTHOURS","NEXTDAYS","NEXTWEEKS","NEXTMONTHS","NEXTQUARTERS","NEXTYEARS"];K.prototype.init=function(){this._oInput=new q(this.getId()+"-input",{showValueHelp:true,valueHelpIconSrc:p.getIconURI("sap-icon://check-availability"),valueHelpRequest:this._toggleOpen.bind(this),showSuggestion:true,suggest:this._handleSuggest.bind(this)});this._oListItemDelegate=undefined;this._onBeforeInputRenderingDelegate={onBeforeRendering:function(){this._oInput._getValueHelpIcon().setVisible(true)}};this._oInput._getValueHelpIcon().setDecorative(false);this._oInput.addDelegate(this._onBeforeInputRenderingDelegate,this);this.setAggregation("_input",this._oInput,false);this._oInput._setControlOrigin(this);this._oInput.attachChange(this._handleInputChange,this);this.oValueObserver=new f(function(){delete this.oBoundValueFormatter}.bind(this));this.oValueObserver.observe(this,{bindings:["value"]})};K.prototype.exit=function(){this._oInput.removeDelegate(this._onBeforeInputRenderingDelegate);this._onBeforeInputRenderingDelegate=undefined;this.oValueObserver.destroy();this._infoDatesFooter=undefined;this.aInputControls=undefined;this._removeAllListItemDelegates()};K.prototype._removeAllListItemDelegates=function(){if(this._oOptionsList){this._oOptionsList.getItems().forEach(function(t){t.removeDelegate(this._oListItemDelegate)},this)}};K.prototype.onBeforeRendering=function(){this._updateInputValue(this.getValue());this._oInput.setEditable(this.getEditable());this._oInput.setEnabled(this.getEnabled());this._oInput.setRequired(this.getRequired());this._oInput.setName(this.getName());this._oInput.setWidth(this.getWidth());this._oInput.setPlaceholder(this.getPlaceholder());this._oInput.setValueState(this.getValueState());this._oInput.setValueStateText(this.getValueStateText());this.setValue(this._substituteMissingValue(this.getValue()))};K.prototype.setValue=function(t){var e=t&&t.operator;t=this._substituteValue(t);this.setProperty("value",t);this._oSelectedOption=u.getOption(e);this._updateInputValue(t);return this};K.prototype._toggleOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){this._closePopup()}else{this.open()}};K.prototype.open=function(t){if(this.getEditable()&&this.getEnabled()){this._createPopup();this._createPopupContent();if(!this._oListItemDelegate){this._oListItemDelegate={onsapshow:this._closePopup.bind(this),onsaphide:this._closePopup.bind(this)}}this._removeAllListItemDelegates();this._oOptionsList.destroyAggregation("items");this._collectValueHelpItems(this._getOptions(),true).map(function(t){if(typeof t==="string"){return this._createHeaderListItem(t)}if(t.getKey()==="FROMDATETIME"){t._bAdditionalTimeText=!!this._findOption("FROM")}else if(t.getKey()==="TODATETIME"){t._bAdditionalTimeText=!!this._findOption("TO")}else if(t.getKey()==="DATETIMERANGE"){t._bAdditionalTimeText=!!this._findOption("DATERANGE")}return this._createListItem(t)},this).forEach(function(t){t.addDelegate(this._oListItemDelegate,this);this._oOptionsList.addItem(t)},this);this._oNavContainer.to(this._oNavContainer.getPages()[0]);this._openPopup(t)}};K.prototype._findOption=function(t){return this._getOptions().find(function(e){return e.getKey()===t})};K.prototype.addOption=function(t){var e=this.getOptions();if(e.indexOf(t)===-1){e.push(t)}this.setOptions(e)};K.prototype.getFocusDomRef=function(){return this.getAggregation("_input")&&this.getAggregation("_input").getFocusDomRef()};K.prototype._updateInputValue=function(t){var e;if(t&&t.operator!=="PARSEERROR"){e=this._enhanceInputValue(this._formatValue(t),t);this._oInput.setValue(e)}else if(t===undefined){this._oInput.setValue("")}};K.prototype._handleSuggest=function(t){this._bSuggestionMode=true;if(this._oPopup&&this._oPopup.isOpen()){this._closePopup()}var e=t.getParameter("suggestValue");this._oInput.removeAllSuggestionItems();var i=this._getOptions().filter(function(t){var i={operator:t.getKey(),values:[]},o=t.getValueHelpUITypes(this);if(o.length&&o[0].getType()){return false}var n=u.getOption(i.operator).format(i,this._getFormatter()).toLowerCase();var a=n.indexOf(e.toLowerCase());return a===0||a>0&&n[a-1]===" "},this);this._collectValueHelpItems(i,true).forEach(function(t){if(t.getKey){var e={operator:t.getKey(),values:[]};this._addSuggestionItem(e)}else{this._addSuggestionGroupItem(t)}},this);var o=e.match(/\d+/);if(!o){this._bSuggestionMode=false;return}i=this._getOptions().filter(function(t){return t.getValueHelpUITypes(this).length===1&&t.getValueHelpUITypes(this)[0].getType()==="int"},this);this._collectValueHelpItems(i,false).forEach(function(t){if(t.getKey){var e={operator:t.getKey(),values:[parseInt(o[0])]};this._addSuggestionItem(e)}else{this._addSuggestionGroupItem(t)}},this);this._bSuggestionMode=false};K.prototype._getOptions=function(){var t=this.getOptions();var e=t.map(function(t){return u.getOption(t)},this);return e.filter(function(t){return!!t})};K.prototype._getValueHelpTypeForFormatter=function(){var t=this._oSelectedOption?this._oSelectedOption.getKey():"",e=k.indexOf(t),i=Q.indexOf(t),o=this._oNavContainer?this._oNavContainer.getPages()[1].getContent()[3]||[]:[],n=o.getButtons?o.getButtons():[],a=this.getAggregation("_input").getAggregation("suggestionItems"),s=this.getValue(),r=this.getOptions(),u="",p=[],l=[],h,g,d,f,c;if(!s&&(!n[0]||!n[0].getDomRef())&&a&&a.length&&a[a.length-1].getCustomData){h=a[a.length-1].getCustomData()[0]}if(this._bSuggestionMode&&a&&a.length&&a[a.length-1].getCustomData){h=a[a.length-1].getCustomData()[0]}r.forEach(function(t){if(k.indexOf(t)>-1){p.push(t)}else if(Q.indexOf(t)>-1){l.push(t)}});if(h){c=h.getValue();e=X.indexOf(c);i=W.indexOf(c)}if(h&&c){if(G.indexOf(c)>-1){d="datetime";return d}}if(this._oNavContainer&&!n.length||this._oNavContainer&&n.length&&(e>-1||i>-1)){f=n[0]?n[0].getParent().getSelectedIndex():0;if(X.indexOf(t)>-1){u=p[f]}else if(W.indexOf(t)>-1){u=l[f]}if(G.indexOf(u)>-1){d="datetime";return d}}g=this._oSelectedOption?this._oSelectedOption.getValueHelpUITypes():[];return g&&g.length?g[0].getType():""};K.prototype._getDatesLabelFormatter=function(){var t,e=this._getValueHelpTypeForFormatter();switch(e){case"datetime":t=Object.create(this._getFormatter()._dateTimeFormatter.oFormatOptions);t.singleIntervalValue=true;t.interval=true;this._oDatesLabelFormatter=g.getDateTimeInstance(t);break;default:t=Object.create(this._getFormatter()._dateFormatter.oFormatOptions);t.singleIntervalValue=true;t.interval=true;this._oDatesLabelFormatter=g.getInstance(t)}return this._oDatesLabelFormatter};K.prototype._destroyInputControls=function(){if(!this.aInputControls){return}this.aInputControls.forEach(function(t){t.destroy()});this.aInputControls=undefined};K.prototype._addSuggestionItem=function(t){var e=K.toDates(t,this.getCalendarWeekNumbering());var i=[];for(var n=0;n<e.length;n++){i[n]=e[n]}var a=new o({text:u.getOption(t.operator).format(t,this._getFormatter()),additionalText:"",customData:[new F({key:"operator",value:t.operator})]});this._oInput.addSuggestionItem(a);a.setAdditionalText(this._getDatesLabelFormatter().format(i))};K.prototype._addSuggestionGroupItem=function(t){this._oInput.addSuggestionItemGroup({text:t})};K.prototype._handleInputChange=function(t){var e=t.getParameter("value");var i=this._parseValue(this._stripValue(e));var o=this.getValue();var n=e.trim()===""||!!i;if(this._isDateRange(i)){this._swapDates(i.values)}if(!n){this.setValue({operator:"PARSEERROR",values:[w.getText("DDR_WRONG_VALUE"),e]})}else{this.setValue(i)}this.fireChange({value:this.getValue(),prevValue:o,valid:n})};K.prototype._isDateRange=function(t){return Boolean(t&&(t.operator==="DATERANGE"||t.operator==="DATETIMERANGE"))};K.prototype._swapDates=function(t){if(t.length>1&&t[0].getTime()>t[1].getTime()){t.reverse()}};K.prototype._enhanceInputValue=function(t,e){if(u.getOption(e.operator).enhanceFormattedValue()||e.operator==="LASTDAYS"&&e.values[0]<=1||e.operator==="NEXTDAYS"&&e.values[0]<=1){return t+" ("+this._toDatesString(e)+")"}return t};K.prototype._stripValue=function(t){var e=t.indexOf("(");var i=t.lastIndexOf(")");var o=t;if(e!==-1&&i!==-1&&e<i){o=t.slice(0,e)+t.slice(i+1);o=o.trim()}return o};K.prototype._toDatesString=function(t){var e=K.toDates(t,this.getCalendarWeekNumbering());var i=[];for(var o=0;o<e.length;o++){i[o]=e[o]}return this._getDatesLabelFormatter().format(i)};K.prototype._getPickerParser=function(){if(!this._calendarParser){this._calendarParser=g.getDateTimeWithTimezoneInstance({showTimezone:false})}return this._calendarParser};K.prototype._createPopup=function(){if(!this._oPopup){this._oPopup=new I(this.getId()+"-RP",{contentHeight:"512px",contentWidth:"320px",showCloseButton:false,showArrow:false,showHeader:false,placement:N.PlacementType.VerticalPreferedBottom,ariaLabelledBy:[t.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")]});this._oPopup.addStyleClass("sapMDDRPopover");if(c.system.phone){this._oPopup.addStyleClass("sapUiNoContentPadding")}else{this._oPopup._oControl._getSingleNavContent=function(){return null}}this._oPopup.attachAfterOpen(function(){var t=this._oNavContainer.getPages()[0];this._applyNavContainerPageFocus(t);this.invalidate()},this);this._oPopup.attachAfterClose(function(){this._oPreviousSelectedOption=this._oSelectedOption;this._setFooterVisibility(false);this.invalidate()},this);this._oPopup.setBeginButton(new O({type:N.ButtonType.Emphasized,text:w.getText("DYNAMIC_DATE_RANGE_CONFIRM"),press:this._applyValue.bind(this)}));this._oPopup.setEndButton(new O({text:w.getText("DYNAMIC_DATE_RANGE_CANCEL"),press:function(){this._oSelectedOption=this._oPreviousSelectedOption;this._oDatesLabelFormatter=null;this._closePopup()}.bind(this)}));this._setFooterVisibility(false);this._oPopup._getPopup().setAutoClose(true);this.setAggregation("_popup",this._oPopup,true)}};K.prototype._collectValueHelpItems=function(t,e){var i;var o;var n=[];var a=t;var s=u.getStandardKeys();a.sort(function(t,e){var i=t.getGroup()-e.getGroup();if(i){return i}return s.indexOf(t.getKey())-s.indexOf(e.getKey())});if(e){a=a.reduce(function(t,e){if(C.LastXKeys.indexOf(e.getKey())!==-1){if(i){return t}i=true}if(C.NextXKeys.indexOf(e.getKey())!==-1){if(o){return t}o=true}t.push(e);return t},[])}if(this.getEnableGroupHeaders()){a=a.reduce(function(t,e){var i=e.getGroupHeader();if(n.indexOf(i)===-1){n.push(i);t.push(i)}t.push(e);return t},[])}return a};K.prototype._createListItem=function(t){var e=this._isFixedOption(t);return new z(this.getId()+"-option-"+t.getKey().replaceAll(" ",""),{type:e?B.Active:B.Navigation,title:t.getText(this),wrapping:true,optionKey:t.getKey(),press:this._handleOptionPress.bind(this)})};K.prototype._createHeaderListItem=function(t){var e=new y;e.setTitle(t);e._bGroupHeader=true;return e};K.prototype._handleOptionPress=function(t){var e=t.getSource().getOptionKey(),i=u.getOption(e);if(this._oPreviousSelectedOption&&this._oPreviousSelectedOption.getKey()!==e){this._oDatesLabelFormatter=null}this._oPreviousSelectedOption=this._oSelectedOption;this._oSelectedOption=i;if(this._isFixedOption(i)){this._applyValue()}else{var o=this._createInfoDatesFooter();this._destroyInputControls();this.aInputControls=i.createValueHelpUI(this,this._updateInternalControls.bind(this));var n=this._oNavContainer.getPages()[1];n.removeAllContent();this.aInputControls.forEach(function(t){n.addContent(t)});n.setFooter(o);n.setTitle(i.getText(this));this._setFooterVisibility(true);this._updateInternalControls(i);this._oNavContainer.to(n)}};K.prototype._isFixedOption=function(t){return!t.getValueHelpUITypes(this).length};K.prototype._createInfoDatesFooter=function(){this._infoDatesFooter=new S({design:x.Info,style:H.Clear,content:[new _({text:w.getText("DDR_INFO_DATES_EMPTY_HINT")})]});return this._infoDatesFooter};K.prototype._getDatesLabel=function(){return this._infoDatesFooter.getContent()[0]};K.prototype._updateDatesLabel=function(){var t=this._oSelectedOption.getValueHelpOutput(this),e=[],i,o;var n=K.toDates(t,this.getCalendarWeekNumbering());if(!t||!t.operator||!u.getOption(t.operator)){return}for(var a=0;a<n.length;a++){e[a]=L._createUTCDate(n[a],true)}if(this._isDateRange(t)){this._swapDates(e)}if(e){o=this._oSelectedOption.getKey();if(o==="FROMDATETIME"||o==="TODATETIME"||o==="FROM"||o==="TO"){e.push(null)}i=this._getDatesLabelFormatter().format(e,true);this._getDatesLabel().setText(w.getText("DDR_INFO_DATES",[i]))}};K.prototype._setApplyButtonEnabled=function(t){if(!this._oPopup){return}var e=this._oPopup.getBeginButton();if(e.getVisible()){e.setEnabled(t)}};K.prototype._updateInternalControls=function(t){var e=t.validateValueHelpUI(this);if(e){this._updateDatesLabel()}this._setApplyButtonEnabled(e)};K.prototype._setFooterVisibility=function(t){var e;if(!this._oPopup){return}e=this._oPopup.getAggregation("_popup");if(c.system.phone){this._oPopup.getBeginButton().setVisible(t)}else{e.getFooter().setVisible(t)}e.invalidate();return this};K.prototype._createPopupContent=function(){var t=new E({showHeader:false,showNavButton:false}),e=new E({showHeader:true,showNavButton:true}).addStyleClass("sapMDynamicDateRangePopover");e.attachNavButtonPress(function(){this._setFooterVisibility(false);this._oNavContainer.back()},this);if(c.system.phone){t.setShowHeader(true);t.setTitle(this._getOptionsPageTitleText())}if(!this._oOptionsList){this._oOptionsList=new m({showSeparators:U.None,mode:Y.SingleSelectMaster})}if(!this._oNavContainer){this._oNavContainer=new R({autoFocus:false});this._oNavContainer.addPage(t);this._oNavContainer.setInitialPage(t);this._oNavContainer.addPage(e);this._oNavContainer.attachAfterNavigate(this._navContainerAfterNavigate,this);this._oPopup.addContent(this._oNavContainer)}this._oNavContainer.getPages()[0].removeAllContent();this._oNavContainer.getPages()[0].addContent(this._oOptionsList);return this._oOptionsList};K.prototype._determineOptionFocus=function(t){var e=this._oOptionsList.getItems(),i=e.filter(function(e){return e.getOptionKey&&e.getOptionKey()===t.operator})[0];if(!i){if(k.indexOf(t.operator)>-1){i=e.filter(function(t){return t.getOptionKey&&t.getOptionKey()===k[0]})[0]}else if(Q.indexOf(t.operator)>-1){i=e.filter(function(t){return t.getOptionKey&&t.getOptionKey()===Q[0]})[0]}}return i};K.prototype._applyNavContainerPageFocus=function(t){var e=this.getValue(),i=this._oNavContainer.getPages()[0],o;if(t===i&&e){o=this._determineOptionFocus(e)||o}if(!t.getDomRef()){return}if(!o){o=P(t.getDomRef().querySelector("section")).firstFocusableDomRef()}if(e&&e.operator!=="PARSEERROR"&&o){o.setSelected&&o.setSelected(true)}if(o){o.focus()}this._reApplyFocusToElement(t,e)};K.prototype._reApplyFocusToElement=function(t,e){};K.prototype._getOptionsPageTitleText=function(){return h.getReferencingLabels(this).concat(this.getAriaLabelledBy()).reduce(function(t,i){var o=e.registry.get(i);return t+" "+(o.getText?o.getText():"")},"").trim()};K.prototype._navContainerAfterNavigate=function(t){var e=this._oNavContainer.getPages()[1],i=t.getParameters()["to"];if(i===e){this.aInputControls.forEach(function(t){if(t.$().firstFocusableDomRef()){t.addAriaLabelledBy&&t.addAriaLabelledBy(i.getId()+"-title");if(!this._isCalendarBasedControl(t)&&t.addAriaDescribedBy){t.addAriaDescribedBy(i.getFooter().getContent()[0])}}},this)}if(this._oPopup&&this._oPopup.isOpen()){this._applyNavContainerPageFocus(i)}else{this.focus()}};K.prototype._isCalendarBasedControl=function(t){return t.isA("sap.ui.unified.Calendar")||t.isA("sap.ui.unified.calendar.CustomMonthPicker")||t.isA("sap.ui.unified.calendar.MonthPicker")||t.isA("sap.ui.unified.calendar.YearPicker")||t.isA("sap.ui.unified.calendar.YearRangePicker")||t.isA("sap.ui.unified.calendar.Month")};K.prototype.openBy=function(t){this.open(t)};K.prototype._openPopup=function(t){if(!this._oPopup){return}this._oPopup._getPopup().setExtraContent([this._oInput.getDomRef()]);this._oPopup.openBy(t||this._oInput)};K.prototype._applyValue=function(){this._oOutput=this._oSelectedOption.getValueHelpOutput(this);var t=K.toDates(this._oOutput,this.getCalendarWeekNumbering());for(var e=0;e<t.length;e++){if(this._oOutput.values[e]instanceof Date){this._oOutput.values[e]=t[e]}}if(this._isDateRange(this._oOutput)){this._swapDates(this._oOutput.values)}var i=this.getValue();this.setValue(this._oOutput);this.fireChange({prevValue:i,value:this.getValue(),valid:true});this._closePopup()};K.prototype._closePopup=function(){this._setFooterVisibility(false);this._oNavContainer.to(this._oNavContainer.getPages()[0]);this._oPopup.close()};K.prototype._getFormatter=function(){var t=this.getFormatter(),e;if(t){return t}if(this.oBoundValueFormatter){return this.oBoundValueFormatter}e=this.getBinding("value");if(e&&e.getType()){this.oBoundValueFormatter=r.getInstance(e.getType().oFormatOptions);return this.oBoundValueFormatter}if(!this.oDefaultFormatter){this.oDefaultFormatter=r.getInstance()}return this.oDefaultFormatter};K.prototype._formatValue=function(t){return u.getOption(t.operator).format(t,this._getFormatter())};K.prototype._parseValue=function(t){var e=u.parse(t,this._getFormatter(),this.getOptions()).filter(function(t){return this.getOptions().indexOf(t.operator)!==-1},this);return e.length?e[0]:null};K.prototype._substituteValue=function(t){var e,i,o;if(!t||!t.operator||!t.values){return t}e=t.operator;i=t.values;if(e==="LASTDAYS"&&i[0]===1&&this.getOptions().includes("YESTERDAY")){o={operator:"YESTERDAY",values:[]}}else if(e==="NEXTDAYS"&&i[0]===1&&this.getOptions().includes("TOMORROW")){o={operator:"TOMORROW",values:[]}}else if((e==="LASTDAYS"||e==="NEXTDAYS")&&i[0]===0){o={operator:"TODAY",values:[]}}return o?o:t};K.prototype.getIdForLabel=function(){return this.getAggregation("_input").getIdForLabel()};K.prototype._substituteMissingValue=function(t){var e=t;if(t&&t.operator==="YESTERDAY"&&!this.getOptions().includes("YESTERDAY")&&this.getOptions().includes("LASTDAYS")){e={operator:"LASTDAYS",values:[1]}}else if(t&&t.operator==="TOMORROW"&&!this.getOptions().includes("TOMORROW")&&this.getOptions().includes("NEXTDAYS")){e={operator:"NEXTDAYS",values:[1]}}return e};K.toDates=function(t,e){return u.toDates(t,e).map(function(t){if(t instanceof Date){return t}return t.getJSDate()})};var j=a.extend(D);j.apiVersion=2;j.writeInnerAttributes=function(t,e){var i=e._getControlOrigin?e._getControlOrigin():null,o=this.getAccessibilityState(e);if(i&&i.isA("sap.m.DynamicDateRange")){t.accessibilityState(i,o)}t.attr("type","text")};j.getAccessibilityState=function(t){var e=D.getAccessibilityState(t),i=t._getControlOrigin(),o=i.getAriaLabelledBy(),a=h.getReferencingLabels(i),s=i.getAriaDescribedBy().join(" "),r;r=a.concat(o).join(" ");if(s){e.describedby=s}if(r){e.labelledby=r}e.roledescription=w.getText("ACC_CTR_TYPE_DYNAMIC_DATE_RANGE");e.role=this.getAriaRole();e.haspopup=n.aria.HasPopup.ListBox.toLowerCase();e.autocomplete="list";e.controls=i._oPopup&&i._oPopup.getDomRef()?i._oPopup.getDomRef().id:undefined;return e};var q=A.extend("sap.m.internal.DynamicDateRangeInput",{metadata:{library:"sap.m"},renderer:j});q.prototype._setControlOrigin=function(t){this._oOriginControl=t;return this._oOriginControl};q.prototype._getControlOrigin=function(){return this._oOriginControl};q.prototype.preventChangeOnFocusLeave=function(t){return this.bFocusoutDueRendering};q.prototype.shouldSuggetionsPopoverOpenOnMobile=function(t){var e=t.srcControl instanceof l;return this.isMobileDevice()&&this.getEditable()&&this.getEnabled()&&this.getShowSuggestion()&&!e&&!this._bClearButtonPressed};q.prototype.onfocusin=function(t){var e=this._getControlOrigin()._oPopup;A.prototype.onfocusin.apply(this,arguments);if(e&&e.isOpen()&&!c.system.tablet&&!c.system.mobile){this._getControlOrigin()._closePopup()}};var z=T.extend("sap.m.DynamicDateRangeListItem",{metadata:{library:"sap.m",properties:{optionKey:{type:"string",group:"Misc",defaultValue:null}}},renderer:v});z.prototype.hasActiveType=function(){return true};z.prototype.isIncludedIntoSelection=function(){return false};z.prototype.onsapspace=function(t){t.preventDefault()};z.prototype.getNavigationControl=function(){var t=T.prototype.getNavigationControl.apply(this,arguments),e=this.getOptionKey(),i=u.getOption(e).getValueTypes(),o=["SPECIFICMONTH","DATE","DATERANGE","FROM","TO"].includes(e),n=i&&i.length&&i[0]==="datetime",a;if(o||n){t.addStyleClass("sapMDDRDateOption");a=o?p.getIconURI("appointment-2"):p.getIconURI("date-time")}else{a=p.getIconURI("slim-arrow-right")}t.setSrc(a);return t};return K});