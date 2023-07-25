// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/base/util/ObjectPath","sap/ui/core/Configuration","sap/ui/thirdparty/jquery","sap/ushell/System","sap/ushell/User","sap/ushell/utils"],function(e,t,s,r,a,i,o){"use strict";var n=function(n,l,u){var f;var c=t.create("config",u);var p={id:"DEFAULT_USER",firstName:"Default",lastName:"User",fullName:"Default User",accessibility:false,isJamActive:false,language:s.getLanguage()||"en",bootTheme:{theme:"sap_fiori_3",root:""},themeRoot:"/sap/public/bc/themes/",setAccessibilityPermitted:true,setThemePermitted:true,isLanguagePersonalized:false,setContentDensityPermitted:true,trackUsageAnalytics:null};for(var m in c){if(c.hasOwnProperty(m)){p[m]=c[m]}}n=new a({alias:n.getAlias(),platform:n.getPlatform(),productName:t.get("systemProperties.productName",c),productVersion:t.get("systemProperties.productVersion",c),systemName:t.get("systemProperties.systemName",c),systemRole:t.get("systemProperties.systemRole",c),tenantRole:t.get("systemProperties.tenantRole",c)});this.getSystem=function(){return n};this.getUser=function(){return f};this.sessionKeepAlive=function(){console.warn("Demo container adapter sessionKeepAlive called")};this.load=function(){var e=new r.Deferred;if(c&&typeof c.setUserCallback==="string"){var s=new r.Deferred;var a=c.setUserCallback.split(".");var n=a.pop();var l;if(a.length===0){l=window}else{l=t.get(a.join("."))}if(l&&typeof l[n]==="function"){l[n](s)}else{throw new o.Error("ContainerAdapter local platform: Cannot execute setUserCallback - "+c.setUserCallback)}s.done(function(t){["id","firstName","lastName","fullName"].forEach(function(e){if(t[e]&&typeof c.setUserCallback!=="function"){p[e]=t[e]}});f=new i(p);e.resolve()})}else{f=new i(p);e.resolve()}return e.promise()};this.logout=function(t){e.info("Demo system logged out: "+n.getAlias(),null,"sap.ushell.adapters.local.ContainerAdapter");o.reload();return(new r.Deferred).resolve().promise()}};return n},false);