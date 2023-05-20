/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/model/odata/type/Boolean","sap/ui/model/odata/type/Byte","sap/ui/model/odata/type/DateTime","sap/ui/model/odata/type/DateTimeOffset","sap/ui/model/odata/type/Decimal","sap/ui/model/odata/type/Double","sap/ui/model/odata/type/Single","sap/ui/model/odata/type/Guid","sap/ui/model/odata/type/Int16","sap/ui/model/odata/type/Int32","sap/ui/model/odata/type/Int64","sap/ui/model/odata/type/SByte","sap/ui/model/odata/type/String","sap/ui/model/odata/type/Time","sap/ui/comp/odata/type/StringDate","sap/ui/comp/odata/type/FiscalDate","sap/ui/comp/odata/type/NumericText"],function(e,t,a,m,d,i,u,n,o,r,l,p,E,s,y,f,D){"use strict";var c={"Edm.Boolean":e,"Edm.Byte":t,"Edm.DateTime":a,"Edm.DateTimeOffset":m,"Edm.Decimal":d,"Edm.Double":i,"Edm.Float":u,"Edm.Guid":n,"Edm.Int16":o,"Edm.Int32":r,"Edm.Int64":l,"Edm.SByte":p,"Edm.Single":u,"Edm.String":E,"Edm.Time":s};var T={"Edm.Boolean":"Bool","Edm.Byte":"Int","Edm.DateTime":"Date","Edm.DateTimeOffset":"DateTimeOffset","Edm.Decimal":"Decimal","Edm.Double":"Float","Edm.Float":"Float","Edm.Guid":"Guid","Edm.Int16":"Int","Edm.Int32":"Int","Edm.Int64":"Int","Edm.SByte":"Int","Edm.Single":"Float","Edm.String":"String","Edm.Time":"TimeOfDay"};var I={"Edm.Byte":true,"Edm.Decimal":true,"Edm.Double":true,"Edm.Float":true,"Edm.Int16":true,"Edm.Int32":true,"Edm.Int64":true,"Edm.SByte":true,"Edm.Single":true};var g={"Edm.DateTime":true,"Edm.DateTimeOffset":true,"Edm.Time":true};var S={getType:function(e,t,a,m){var d=null,i;if(m){if(typeof m==="boolean"||m.isCalendarDate){return new y(t)}if(m.isFiscalDate){return new f(t,a,{anotationType:m.fiscalType})}if(a&&a.isDigitSequence){return new D(t,a)}}i=c[e];if(i){d=new i(t,a)}return d},isNumeric:function(e){return I[e]?true:false},isDateOrTime:function(e){return g[e]?true:false},getDefaultValueTypeName:function(e){return T[e]},getTypeName:function(e){if(e.indexOf("Edm.")===0){return e.substring(4)}return e}};return S},true);