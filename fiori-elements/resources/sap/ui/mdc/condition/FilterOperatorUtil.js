/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/model/FilterOperator","sap/ui/model/Filter","sap/ui/model/ValidateException","sap/base/Log","sap/ui/mdc/enum/FieldDisplay","./Operator","./RangeOperator","sap/ui/mdc/enum/BaseType","sap/ui/mdc/enum/ConditionValidated","sap/ui/mdc/util/loadModules","sap/ui/core/date/UniversalDate","sap/ui/core/date/UniversalDateUtils","sap/ui/core/format/DateFormat","sap/ui/model/json/JSONModel","sap/ui/model/type/Integer"],function(e,t,a,r,n,s,o,l,i,u,p,m,f,c,y){"use strict";var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");sap.ui.getCore().attachLocalizationChanged(function(){T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc")});var O={_mOperators:{equal:new s({name:"EQ",alias:{Date:"DATE",DateTime:"DATETIME"},filterOperator:e.EQ,tokenParse:"^=([^=].*)$",tokenFormat:"{1} ({0})",valueTypes:[s.ValueType.Self,null],displayFormats:{DescriptionValue:"{1} ({0})",ValueDescription:"{0} ({1})",Description:"{1}",Value:"{0}"},format:function(e,t,a,r,s){a=a||n.DescriptionValue;var o=this.valueTypes.length;var l=e.values;var u=e&&e.validated===i.Validated||l.length===2||r?"":"=";var p=u+this.displayFormats[a];if(!l[1]){p=u+this.displayFormats["Value"];o=1}for(var m=0;m<o;m++){var f,c=l[m];if(c===null||c===undefined){c=""}if(m==0){f=this._formatValue(c,t,s)}else{f=c}if(f===null){p=null;break}if(typeof f==="string"){f=f.replace(/\$/g,"$$$")}p=p.replace(new RegExp("\\$"+m+"|"+m+"\\$"+"|"+"\\{"+m+"\\}","g"),f)}return p},parse:function(e,t,a,r,o){a=a||n.DescriptionValue;var l=s.prototype.parse.apply(this,[e,t,a,r,o]);if(r&&(!l||l[0]===null||l[0]===undefined)&&a!==n.Value){a=n.Value;l=s.prototype.parse.apply(this,[e,t,a,r,o])}if(l&&(l[1]===null||l[1]===undefined)&&a===n.Value){l=[l[0]]}return l},getValues:function(e,t,a){var r=e.match(this.tokenParseRegExp);var n;if(r||a&&e){var s;var o=this.displayFormats[t];var l=o.indexOf("{0}");var i=o.indexOf("{1}");var u;var p;if(r){s=r[1]}else if(a){s=e}if(l>=0&&i>=0){if(s.lastIndexOf("(")>0&&(s.lastIndexOf(")")===s.length-1||s.lastIndexOf(")")===-1)){var m=s.length;if(s[m-1]===")"){m--}var f=s.substring(0,s.lastIndexOf("("));if(f[f.length-1]===" "){f=f.substring(0,f.length-1)}var c=s.substring(s.lastIndexOf("(")+1,m);if(l<i){u=f;p=c}else{u=c;p=f}}else if(l<i){u=s}else{p=s}}else if(l>=0){u=s}else{p=s}n=[u];if(i>=0){n.push(p)}}return n},isEmpty:function(e,t){var a=false;var r=e.values[0];if((r===null||r===undefined||r==="")&&!e.values[1]){a=true}return a},getCheckValue:function(e){return{value:e.values[0]}},checkValidated:function(e){if(e.values.length===2&&e.values[0]!==undefined&&e.values[1]!==null&&e.values[1]!==undefined){e.validated=i.Validated}else{e.validated=i.NotValidated}},validateInput:true}),between:new s({name:"BT",alias:{Date:"DATERANGE",DateTime:"DATETIMERANGE"},filterOperator:e.BT,tokenParse:"^([^!].*)\\.\\.\\.(.+)$",tokenFormat:"{0}...{1}",valueTypes:[s.ValueType.Self,s.ValueType.Self],validate:function(e,t){if(e.length===2){if(d(e[0])&&d(e[1])){return}else if(d(e[0])||d(e[1])){throw new a(T.getText("operator.between.validate.missingValue"))}else if(e[0]===e[1]){throw new a(T.getText("operator.between.validate.sameValues"))}}s.prototype.validate.apply(this,[e,t])}}),notBetween:new s({name:"NOTBT",filterOperator:e.NB,tokenParse:"^!(.+)\\.\\.\\.(.+)$",tokenFormat:"!({0}...{1})",valueTypes:[s.ValueType.Self,s.ValueType.Self],exclude:true,validate:function(e,t){O._mOperators.between.validate(e,t)}}),lessThan:new s({name:"LT",filterOperator:e.LT,tokenParse:"^<([^=].*)$",tokenFormat:"<{0}",valueTypes:[s.ValueType.Self]}),notLessThan:new s({name:"NOTLT",filterOperator:e.GE,tokenParse:"^!<([^=].*)$",tokenFormat:"!(<{0})",valueTypes:[s.ValueType.Self],exclude:true}),greaterThan:new s({name:"GT",filterOperator:e.GT,tokenParse:"^>([^=].*)$",tokenFormat:">{0}",valueTypes:[s.ValueType.Self]}),notGreaterThan:new s({name:"NOTGT",filterOperator:e.LE,tokenParse:"^!>([^=].*)$",tokenFormat:"!(>{0})",valueTypes:[s.ValueType.Self],exclude:true}),lessEqual:new s({name:"LE",alias:{Date:"TO",DateTime:"TODATETIME"},filterOperator:e.LE,tokenParse:"^<=(.+)$",tokenFormat:"<={0}",valueTypes:[s.ValueType.Self]}),notLessEqual:new s({name:"NOTLE",filterOperator:e.GT,tokenParse:"^!<=(.+)$",tokenFormat:"!(<={0})",valueTypes:[s.ValueType.Self],exclude:true}),greaterEqual:new s({name:"GE",alias:{Date:"FROM",DateTime:"FROMDATETIME"},filterOperator:e.GE,tokenParse:"^>=(.+)$",tokenFormat:">={0}",valueTypes:[s.ValueType.Self]}),notGreaterEqual:new s({name:"NOTGE",filterOperator:e.LT,tokenParse:"^!>=(.+)$",tokenFormat:"!(>={0})",valueTypes:[s.ValueType.Self],exclude:true}),startsWith:new s({name:"StartsWith",filterOperator:e.StartsWith,tokenParse:"^([^!\\*]+.*)\\*$",tokenFormat:"{0}*",valueTypes:[s.ValueType.SelfNoParse]}),notStartsWith:new s({name:"NotStartsWith",filterOperator:e.NotStartsWith,tokenParse:"^!([^\\*].*)\\*$",tokenFormat:"!({0}*)",valueTypes:[s.ValueType.SelfNoParse],exclude:true}),endsWith:new s({name:"EndsWith",filterOperator:e.EndsWith,tokenParse:"^\\*(.*[^\\*])$",tokenFormat:"*{0}",valueTypes:[s.ValueType.SelfNoParse]}),notEndsWith:new s({name:"NotEndsWith",filterOperator:e.NotEndsWith,tokenParse:"^!\\*(.*[^\\*])$",tokenFormat:"!(*{0})",valueTypes:[s.ValueType.SelfNoParse],exclude:true}),contains:new s({name:"Contains",filterOperator:e.Contains,tokenParse:"^\\*(.*)\\*$",tokenFormat:"*{0}*",valueTypes:[s.ValueType.SelfNoParse]}),notContains:new s({name:"NotContains",filterOperator:e.NotContains,tokenParse:"^!\\*(.*)\\*$",tokenFormat:"!(*{0}*)",valueTypes:[s.ValueType.SelfNoParse],exclude:true}),notEqual:new s({name:"NE",filterOperator:e.NE,tokenParse:"^!=(.+)$",tokenFormat:"!(={0})",valueTypes:[s.ValueType.Self],exclude:true}),empty:new s({name:"Empty",filterOperator:e.EQ,tokenParse:"^<#tokenText#>$",tokenFormat:"<#tokenText#>",valueTypes:[],getModelFilter:function(a,r,n,s,o){var l=false;if(n){var i=n.parseValue("","string");try{n.validateValue(i);l=i===null}catch(e){l=false}}if(l){return new t({filters:[new t({path:r,operator:e.EQ,value1:""}),new t({path:r,operator:e.EQ,value1:null})],and:false})}else{return new t({path:r,operator:this.filterOperator,value1:""})}}}),notEmpty:new s({name:"NotEmpty",filterOperator:e.NE,tokenParse:"^!<#tokenText#>$",tokenFormat:"!(<#tokenText#>)",valueTypes:[],exclude:true,getModelFilter:function(a,r,n,s,o){var l=false;if(n){var i=n.parseValue("","string");try{n.validateValue(i);l=i===null}catch(e){l=false}}if(l){return new t({filters:[new t({path:r,operator:e.NE,value1:""}),new t({path:r,operator:e.NE,value1:null})],and:true})}else{return new t({path:r,operator:this.filterOperator,value1:""})}}}),yesterday:new o({name:"YESTERDAY",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.yesterday()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),today:new o({name:"TODAY",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.today()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),tomorrow:new o({name:"TOMORROW",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.tomorrow()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),lastDays:new o({name:"LASTDAYS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.lastDays(e)}}),firstDayWeek:new o({name:"FIRSTDAYWEEK",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.firstDayOfWeek()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),lastDayWeek:new o({name:"LASTDAYWEEK",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastDayOfWeek()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),firstDayMonth:new o({name:"FIRSTDAYMONTH",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.firstDayOfMonth()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),lastDayMonth:new o({name:"LASTDAYMONTH",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastDayOfMonth()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),firstDayQuarter:new o({name:"FIRSTDAYQUARTER",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.firstDayOfQuarter()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),lastDayQuarter:new o({name:"LASTDAYQUARTER",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastDayOfQuarter()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),firstDayYear:new o({name:"FIRSTDAYYEAR",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.firstDayOfYear()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),lastDayYear:new o({name:"LASTDAYYEAR",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastDayOfYear()},formatRange:function(e,t){return t.formatValue(e[0],"string")}}),todayFromTo:new o({name:"TODAYFROMTO",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}},{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["([-+]?\\d+)","([-+]?\\d+)"],additionalInfo:"",calcRange:function(e,t){var a=e>=0?m.ranges.lastDays(e)[0]:m.ranges.nextDays(-e)[1];var r=t>=0?m.ranges.nextDays(t)[1]:m.ranges.lastDays(-t)[0];if(a.oDate.getTime()>r.oDate.getTime()){r=[a,a=r][0]}return[m.resetStartTime(a),m.resetEndTime(r)]}}),nextDays:new o({name:"NEXTDAYS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.nextDays(e)}}),lastWeek:new o({name:"LASTWEEK",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastWeek()}}),thisWeek:new o({name:"THISWEEK",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.currentWeek()}}),nextWeek:new o({name:"NEXTWEEK",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.nextWeek()}}),lastWeeks:new o({name:"LASTWEEKS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.lastWeeks(e)}}),nextWeeks:new o({name:"NEXTWEEKS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.nextWeeks(e)}}),lastMonth:new o({name:"LASTMONTH",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastMonth()}}),thisMonth:new o({name:"THISMONTH",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.currentMonth()}}),nextMonth:new o({name:"NEXTMONTH",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.nextMonth()}}),lastMonths:new o({name:"LASTMONTHS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.lastMonths(e)}}),nextMonths:new o({name:"NEXTMONTHS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.nextMonths(e)}}),lastQuarter:new o({name:"LASTQUARTER",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastQuarter()}}),thisQuarter:new o({name:"THISQUARTER",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.currentQuarter()}}),nextQuarter:new o({name:"NEXTQUARTER",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.nextQuarter()}}),lastQuarters:new o({name:"LASTQUARTERS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.lastQuarters(e)}}),nextQuarters:new o({name:"NEXTQUARTERS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.nextQuarters(e)}}),quarter1:new o({name:"QUARTER1",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.quarter(1)}}),quarter2:new o({name:"QUARTER2",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.quarter(2)}}),quarter3:new o({name:"QUARTER3",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.quarter(3)}}),quarter4:new o({name:"QUARTER4",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.quarter(4)}}),lastYear:new o({name:"LASTYEAR",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.lastYear()}}),thisYear:new o({name:"THISYEAR",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.currentYear()}}),nextYear:new o({name:"NEXTYEAR",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.nextYear()}}),lastYears:new o({name:"LASTYEARS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.lastYears(e)}}),nextYears:new o({name:"NEXTYEARS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.nextYears(e)}}),specificMonth:new o({name:"SPECIFICMONTH",valueTypes:[{name:"sap.ui.model.type.Integer",constraints:{minimum:0,maximum:11}}],paramTypes:["(.+)"],additionalInfo:"",label:[T.getText("operators.SPECIFICMONTH_MONTH.label")],defaultValues:function(){var e=new p;return[e.getMonth()]},calcRange:function(e){var t=new p;t.setMonth(e);t=m.getMonthStartDate(t);return m.getRange(0,"MONTH",t)},format:function(e,t,a,r,n){var s=e.values[0];var o=this.tokenFormat;var l=h.apply(this)[s];if(r){return l}else{return l==null?null:o.replace(new RegExp("\\$"+0+"|"+0+"\\$"+"|"+"\\{"+0+"\\}","g"),l)}},getValues:function(e,t,a){var r=e.match(this.tokenParseRegExp);var n;if(r||a&&e){n=[];for(var s=0;s<this.valueTypes.length;s++){var o;if(r){o=r[s+1]}else if(a&&e){o=e}n.push(o)}return[v.call(this,n[0])]}return null},createControl:function(e,t,a,n){var s=sap.ui.require("sap/ui/mdc/Field");var o=E.call(this);if(s&&o){var l=new s(n,{value:{path:t,type:e,mode:"TwoWay",targetType:"raw"},display:"Description",width:"100%",fieldHelp:o});return l}else{r.warning("Operator.createControl","not able to create the control for the operator "+this.name);return null}}}),specificMonthInYear:new o({name:"SPECIFICMONTHINYEAR",valueTypes:[{name:"sap.ui.model.type.Integer",constraints:{minimum:0,maximum:11}},{name:"sap.ui.model.type.Integer",constraints:{minimum:1,maximum:9999}}],paramTypes:["(.+)","(.+)"],additionalInfo:"",label:[T.getText("operators.SPECIFICMONTHINYEAR_MONTH.label"),T.getText("operators.SPECIFICMONTHINYEAR_YEAR.label")],defaultValues:function(){var e=new p;return[e.getMonth(),e.getFullYear()]},calcRange:function(e,t){var a=new p;a.setMonth(e);a.setYear(t);a=m.getMonthStartDate(a);return m.getRange(0,"MONTH",a)},format:function(e,t,a,r,n){var s=e.values[0];var o=e.values[1];var l=this.tokenFormat;var i=h.apply(this)[s];if(r){return i+","+o}else{var u=new RegExp("\\$"+0+"|"+0+"\\$"+"|"+"\\{"+0+"\\}","g");var p=new RegExp("\\$"+1+"|"+1+"\\$"+"|"+"\\{"+1+"\\}","g");l=i==null?null:l.replace(u,i);return l.replace(p,o)}},getValues:function(e,t,a){var r=e.match(this.tokenParseRegExp);var n;if(r||a&&e){n=[];for(var s=0;s<this.valueTypes.length;s++){var o;if(r){o=r[s+1]}else if(a&&e){o=e}n.push(o)}return[v.call(this,n[0]),n[1]]}return null},createControl:function(e,t,a,n){var s;var o=sap.ui.require("sap/ui/mdc/Field");if(!o){r.warning("Operator.createControl","not able to create the control for the operator "+this.name);return null}if(a==0){var l=E.call(this);if(l){s=new o(n,{value:{path:t,type:e,mode:"TwoWay",targetType:"raw"},display:"Description",width:"100%",fieldHelp:l})}else{r.warning("Operator.createControl","not able to create the control for the operator "+this.name)}}if(a==1){s=new o(n,{value:{path:"$this>",type:e,mode:"TwoWay",targetType:"raw"},width:"100%"})}return s}}),yearToDate:new o({name:"YEARTODATE",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.yearToDate()}}),dateToYear:new o({name:"DATETOYEAR",valueTypes:[s.ValueType.Static],calcRange:function(){return m.ranges.dateToYear()}}),lastMinutes:new o({name:"LASTMINUTES",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.lastMinutes(e)}}),nextMinutes:new o({name:"NEXTMINUTES",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.nextMinutes(e)}}),lastHours:new o({name:"LASTHOURS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.lastHours(e)}}),nextHours:new o({name:"NEXTHOURS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null},constraints:{minimum:0}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(e){return m.ranges.nextHours(e)}})},_mDefaultOpsForType:{},addOperator:function(e){O._mOperators[e.name]=e},addOperators:function(e){if(!Array.isArray(e)){e=[e]}e.forEach(function(e){O.addOperator(e)})},removeOperators:function(e){if(!Array.isArray(e)){e=[e]}e.forEach(function(e){O.removeOperator(e)})},removeOperator:function(e){if(typeof e==="string"){delete O._mOperators[e]}else{delete O._mOperators[e.name]}},setOperatorsForType:function(e,t,a){if(!Array.isArray(t)){t=[t]}if(!O._mDefaultOpsForType[e]){O._mDefaultOpsForType[e]={}}O._mDefaultOpsForType[e].operators=[];t.forEach(function(t){O.addOperatorForType(e,t)});if(a){O.setDefaultOperatorForType(e,a)}},setDefaultOperatorForType:function(e,t){if(!O._mDefaultOpsForType[e]){O._mDefaultOpsForType[e]={}}if(typeof t==="string"){t=O.getOperator(t)}O._mDefaultOpsForType[e].defaultOperator=t},addOperatorForType:function(e,t){O.insertOperatorForType(e,t)},insertOperatorForType:function(e,t,a){if(!O._mDefaultOpsForType[e]){O._mDefaultOpsForType[e]={operators:[]}}a=a===undefined?O._mDefaultOpsForType[e].operators.length:a;if(typeof t==="string"){t=O.getOperator(t)}O._mDefaultOpsForType[e].operators.splice(a,0,t)},removeOperatorForType:function(e,t){var a;if(typeof t==="string"){a=t}else{a=t.name}for(var r=0;r<O._mDefaultOpsForType[e].operators.length;r++){if(O._mDefaultOpsForType[e].operators[r].name===a){O._mDefaultOpsForType[e].operators.splice(r,1);return}}},getOperatorsForType:function(e){var t=[];for(var a=0;a<O._mDefaultOpsForType[e].operators.length;a++){t.push(O._mDefaultOpsForType[e].operators[a].name)}return t},getDefaultOperator:function(e){return O._mDefaultOpsForType[e].defaultOperator||O._mOperators.equal},getMatchingOperators:function(e,t){var a=[];for(var r=0;r<e.length;r++){var n=this.getOperator(e[r]);if(n){a.push(n)}}return g.call(this,a,t)},getOperator:function(e){for(var t in O._mOperators){var a=O._mOperators[t];if(a.name===e){return a}}return undefined},getEQOperator:function(e){if(e){for(var t=0;t<e.length;t++){var a=this.getOperator(e[t]);if(a&&a.validateInput&&!a.exclude&&a.valueTypes[0]&&a.valueTypes[0]!==s.ValueType.Static){return a}}}return O._mOperators.equal},onlyEQ:function(e){if(e.length===1&&e[0]==="EQ"){return true}else{return false}},checkConditionsEmpty:function(e){if(!Array.isArray(e)){e=[e]}e.forEach(function(e){var t=this.getOperator(e.operator);if(t){e.isEmpty=t.isEmpty(e)}}.bind(this))},updateConditionsValues:function(e){if(!Array.isArray(e)){e=[e]}for(var t=0;t<e.length;t++){this.updateConditionValues(e[t])}},updateConditionValues:function(e){var t=this.getOperator(e.operator);if(t&&e.validated!==i.Validated){var a=t.valueTypes.length;if(t.valueTypes.length===2&&t.valueTypes[1]===null&&(e.values.length<2||e.values[1]===null||e.values[1]===undefined)){a=a-1}if(t.valueTypes[0]==="static"){e.values=[]}else{while(e.values.length!=a){if(e.values.length<a){e.values.push(null)}if(e.values.length>a){e.values=e.values.slice(0,e.values.length-1)}}}}},indexOfCondition:function(e,t){var a=-1;for(var r=0;r<t.length;r++){if(this.compareConditions(e,t[r])){a=r;break}}return a},compareConditions:function(e,t){var a=false;if(e.operator===t.operator){var r=this.getOperator(e.operator);if(r){a=r.compareConditions(e,t)}}return a},compareConditionsArray:function(e,t){var a=false;if(e.length===t.length){a=true;for(var r=0;r<e.length;r++){if(!this.compareConditions(e[r],t[r])){a=false;break}}}return a},checkConditionValidated:function(e){var t=this.getOperator(e.operator);if(!e.validated&&t&&t.checkValidated){t.checkValidated(e)}},getOperatorForDynamicDateOption:function(e,t){var a;if(t&&e.startsWith(t)){a=this.getOperator(e.slice(t.length+1))}else{a=this.getOperator(e)}if(!a&&t){for(var r in O._mOperators){var n=O._mOperators[r];if(n.alias&&n.alias[t]===e){a=n;break}}}return a},getDynamicDateOptionForOperator:function(e,t,a){var r;if(e){if(t[e.name]){r=e.name}else if(e.alias&&t[e.alias[a]]){r=e.alias[a]}}return r},getCustomDynamicDateOptionForOperator:function(e,t){return t+"-"+e.name}};O.setOperatorsForType(l.String,[O._mOperators.contains,O._mOperators.equal,O._mOperators.between,O._mOperators.startsWith,O._mOperators.endsWith,O._mOperators.lessThan,O._mOperators.lessEqual,O._mOperators.greaterThan,O._mOperators.greaterEqual,O._mOperators.empty,O._mOperators.notContains,O._mOperators.notEqual,O._mOperators.notBetween,O._mOperators.notStartsWith,O._mOperators.notEndsWith,O._mOperators.notLessThan,O._mOperators.notLessEqual,O._mOperators.notGreaterThan,O._mOperators.notGreaterEqual,O._mOperators.notEmpty],O._mOperators.equal);O.setOperatorsForType(l.Date,[O._mOperators.equal,O._mOperators.between,O._mOperators.lessThan,O._mOperators.lessEqual,O._mOperators.greaterThan,O._mOperators.greaterEqual,O._mOperators.notEqual,O._mOperators.notBetween,O._mOperators.notLessThan,O._mOperators.notLessEqual,O._mOperators.notGreaterThan,O._mOperators.notGreaterEqual,O._mOperators.today,O._mOperators.yesterday,O._mOperators.tomorrow,O._mOperators.firstDayWeek,O._mOperators.lastDayWeek,O._mOperators.firstDayMonth,O._mOperators.lastDayMonth,O._mOperators.firstDayQuarter,O._mOperators.lastDayQuarter,O._mOperators.firstDayYear,O._mOperators.lastDayYear,O._mOperators.todayFromTo,O._mOperators.lastDays,O._mOperators.nextDays,O._mOperators.thisWeek,O._mOperators.lastWeek,O._mOperators.lastWeeks,O._mOperators.nextWeek,O._mOperators.nextWeeks,O._mOperators.specificMonth,O._mOperators.specificMonthInYear,O._mOperators.thisMonth,O._mOperators.lastMonth,O._mOperators.lastMonths,O._mOperators.nextMonth,O._mOperators.nextMonths,O._mOperators.thisQuarter,O._mOperators.lastQuarter,O._mOperators.lastQuarters,O._mOperators.nextQuarter,O._mOperators.nextQuarters,O._mOperators.quarter1,O._mOperators.quarter2,O._mOperators.quarter3,O._mOperators.quarter4,O._mOperators.thisYear,O._mOperators.lastYear,O._mOperators.lastYears,O._mOperators.nextYear,O._mOperators.nextYears,O._mOperators.yearToDate,O._mOperators.dateToYear]);O.setOperatorsForType(l.DateTime,[O._mOperators.equal,O._mOperators.between,O._mOperators.lessThan,O._mOperators.lessEqual,O._mOperators.greaterThan,O._mOperators.greaterEqual,O._mOperators.notEqual,O._mOperators.notBetween,O._mOperators.notLessThan,O._mOperators.notLessEqual,O._mOperators.notGreaterThan,O._mOperators.notGreaterEqual,O._mOperators.lastMinutes,O._mOperators.nextMinutes,O._mOperators.lastHours,O._mOperators.nextHours,O._mOperators.today,O._mOperators.yesterday,O._mOperators.tomorrow,O._mOperators.firstDayWeek,O._mOperators.lastDayWeek,O._mOperators.firstDayMonth,O._mOperators.lastDayMonth,O._mOperators.firstDayQuarter,O._mOperators.lastDayQuarter,O._mOperators.firstDayYear,O._mOperators.lastDayYear,O._mOperators.todayFromTo,O._mOperators.lastDays,O._mOperators.nextDays,O._mOperators.thisWeek,O._mOperators.lastWeek,O._mOperators.lastWeeks,O._mOperators.nextWeek,O._mOperators.nextWeeks,O._mOperators.specificMonth,O._mOperators.specificMonthInYear,O._mOperators.thisMonth,O._mOperators.lastMonth,O._mOperators.lastMonths,O._mOperators.nextMonth,O._mOperators.nextMonths,O._mOperators.thisQuarter,O._mOperators.lastQuarter,O._mOperators.lastQuarters,O._mOperators.nextQuarter,O._mOperators.nextQuarters,O._mOperators.quarter1,O._mOperators.quarter2,O._mOperators.quarter3,O._mOperators.quarter4,O._mOperators.thisYear,O._mOperators.lastYear,O._mOperators.lastYears,O._mOperators.nextYear,O._mOperators.nextYears,O._mOperators.yearToDate,O._mOperators.dateToYear]);O.setOperatorsForType(l.Numeric,[O._mOperators.equal,O._mOperators.between,O._mOperators.lessThan,O._mOperators.lessEqual,O._mOperators.greaterThan,O._mOperators.greaterEqual,O._mOperators.notEqual,O._mOperators.notBetween,O._mOperators.notLessThan,O._mOperators.notLessEqual,O._mOperators.notGreaterThan,O._mOperators.notGreaterEqual]);O.setOperatorsForType(l.Time,[O._mOperators.equal,O._mOperators.between,O._mOperators.lessThan,O._mOperators.lessEqual,O._mOperators.greaterThan,O._mOperators.greaterEqual,O._mOperators.notEqual,O._mOperators.notBetween,O._mOperators.notLessThan,O._mOperators.notLessEqual,O._mOperators.notGreaterThan,O._mOperators.notGreaterEqual]);O.setOperatorsForType(l.Boolean,[O._mOperators.equal,O._mOperators.notEqual]);function g(e,t){var a=[];for(var r=0;r<e.length;r++){var n=e[r];if(n&&n.test&&n.test(t)){a.push(n)}}return a}function d(e){return e===null||e===undefined||e===""}function h(){if(!this._aMonths){var e=new p,t=f.getDateInstance({pattern:"LLLL"});e.setDate(15);e.setMonth(0);var a=[];for(var r=0;r<12;r++){a.push(t.format(e));e.setMonth(e.getMonth()+1)}this._aMonths=a}return this._aMonths}function v(e){var t=e.toLowerCase();var a=h.apply(this);var r=-1;a.some(function(e,a){if(e.toLowerCase()==t){r=a;return true}});return r}var _=false;function E(){var e="LFHForSpecificMonth";if(!_){_=true;u(["sap/ui/mdc/valuehelp/content/FixedList","sap/ui/mdc/field/ListFieldHelpItem","sap/ui/mdc/ValueHelp","sap/ui/mdc/valuehelp/Popover","sap/ui/core/Control"]).then(function(t){var a=t[0];var n=t[1];var s=t[2];var o=t[3];var l=t[4];var i=function(){if(!this._aMonthsItems){var e=h.apply(this);this._aMonthsItems=[];for(var t=0;t<12;t++){this._aMonthsItems.push({text:e[t],key:t})}}return this._aMonthsItems}.bind(this);var u=new s({id:e,typeahead:new o({content:[new a({filterList:false,useFirstMatch:true,items:{path:"$items>/",template:new n({text:"{$items>text}",key:"{$items>key}"}),templateShareable:false}})]})}).setModel(new c(i()),"$items");try{var p=sap.ui.getCore().getStaticAreaRef();var m=sap.ui.getCore().getUIArea(p);var f=new l(e+"-parent",{dependents:[u]});m.addContent(f,true)}catch(e){r.error(e);throw new Error("MonthFieldHelp cannot be assigned because static UIArea cannot be determined.")}}.bind(this))}return e}return O},true);