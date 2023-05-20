/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/IconPool","sap/m/library","sap/m/OverflowToolbarLayoutData"],function(e,t,n,i){"use strict";var r=n.OverflowToolbarPriority;var o=n.ButtonType;var a=e.extend("sap.f.semantic.SemanticConfiguration",{getInterface:function(){return this}});a._Placement={titleText:"titleText",titleIcon:"titleIcon",footerLeft:"footerLeft",footerRight:"footerRight",shareMenu:"shareMenu"};a.isKnownSemanticType=function(e){return a.getConfiguration(e)!==null};a.getConfiguration=function(e){return a._oTypeConfigs[e]||null};a.getSettings=function(e){if(a.isKnownSemanticType(e)){return a._oTypeConfigs[e].getSettings()}return null};a.getConstraints=function(e){if(a.isKnownSemanticType(e)){return a._oTypeConfigs[e].constraints||null}return null};a.getPlacement=function(e){if(a.isKnownSemanticType(e)){return a._oTypeConfigs[e].placement}return null};a.getOrder=function(e){if(a.isKnownSemanticType(e)){return a._oTypeConfigs[e].order}return null};a.shouldBePreprocessed=function(e){if(a.isKnownSemanticType(e)){return a._oTypeConfigs[e].needPreprocesing||false}return false};a.isMainAction=function(e){if(a.isKnownSemanticType(e)){return a._oTypeConfigs[e].mainAction||false}return false};a.isNavigationAction=function(e){if(a.isKnownSemanticType(e)){return a._oTypeConfigs[e].navigation||false}return false};a._oTypeConfigs=function(){var e={},n=sap.ui.getCore().getLibraryResourceBundle("sap.f");e["sap.f.semantic.TitleMainAction"]={placement:a._Placement.titleText,order:0,mainAction:true,getSettings:function(){return{type:o.Emphasized,layoutData:new i({priority:r.NeverOverflow})}}};e["sap.f.semantic.EditAction"]={placement:a._Placement.titleText,order:1,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_EDIT"),tooltip:n.getText("SEMANTIC_CONTROL_EDIT"),type:o.Transparent}}};e["sap.f.semantic.DeleteAction"]={placement:a._Placement.titleText,order:2,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_DELETE"),type:o.Transparent}}};e["sap.f.semantic.CopyAction"]={placement:a._Placement.titleText,order:3,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_COPY"),type:o.Transparent}}};e["sap.f.semantic.AddAction"]={placement:a._Placement.titleText,order:4,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_ADD"),tooltip:n.getText("SEMANTIC_CONTROL_ADD"),type:o.Transparent}}};e["sap.f.semantic.FavoriteAction"]={placement:a._Placement.titleIcon,order:0,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("favorite"),text:n.getText("SEMANTIC_CONTROL_FAVORITE"),type:o.Transparent}}};e["sap.f.semantic.FlagAction"]={placement:a._Placement.titleIcon,order:1,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("flag"),text:n.getText("SEMANTIC_CONTROL_FLAG"),type:o.Transparent}}};e["sap.f.semantic.FullScreenAction"]={placement:a._Placement.titleIcon,order:0,constraints:"IconOnly",navigation:true,getSettings:function(){return{icon:t.getIconURI("full-screen"),tooltip:n.getText("SEMANTIC_CONTROL_FULL_SCREEN"),layoutData:new i({priority:r.NeverOverflow}),type:o.Transparent}}};e["sap.f.semantic.ExitFullScreenAction"]={placement:a._Placement.titleIcon,order:1,constraints:"IconOnly",navigation:true,getSettings:function(){return{icon:t.getIconURI("exit-full-screen"),tooltip:n.getText("SEMANTIC_CONTROL_EXIT_FULL_SCREEN"),layoutData:new i({priority:r.NeverOverflow}),type:o.Transparent}}};e["sap.f.semantic.CloseAction"]={placement:a._Placement.titleIcon,order:2,constraints:"IconOnly",navigation:true,getSettings:function(){return{icon:t.getIconURI("decline"),tooltip:n.getText("SEMANTIC_CONTROL_CLOSE"),layoutData:new i({priority:r.NeverOverflow}),type:o.Transparent}}};e["sap.f.semantic.MessagesIndicator"]={placement:a._Placement.footerLeft,order:0,mainAction:false,getSettings:function(){return{icon:t.getIconURI("message-popup"),text:{path:"message>/",formatter:function(e){return e.length||0}},tooltip:n.getText("SEMANTIC_CONTROL_MESSAGES_INDICATOR"),type:o.Emphasized,visible:{path:"message>/",formatter:function(e){return e&&e.length>0}},models:{message:sap.ui.getCore().getMessageManager().getMessageModel()},layoutData:new i({priority:r.NeverOverflow})}}};e["sap.m.DraftIndicator"]={placement:a._Placement.footerRight,order:0,needPreprocesing:true,mainAction:false,getSettings:function(){return{layoutData:new i({shrinkable:false})}}};e["sap.f.semantic.FooterMainAction"]={placement:a._Placement.footerRight,order:1,mainAction:true,getSettings:function(){return{type:o.Emphasized,text:n.getText("SEMANTIC_CONTROL_SAVE"),layoutData:new i({priority:r.NeverOverflow})}}};e["sap.f.semantic.PositiveAction"]={placement:a._Placement.footerRight,order:2,mainAction:false,getSettings:function(){return{type:o.Accept,text:n.getText("SEMANTIC_CONTROL_ACCEPT"),layoutData:new i({priority:r.NeverOverflow})}}};e["sap.f.semantic.NegativeAction"]={placement:a._Placement.footerRight,order:3,mainAction:false,getSettings:function(){return{type:o.Reject,text:n.getText("SEMANTIC_CONTROL_REJECT"),layoutData:new i({priority:r.NeverOverflow})}}};e["sap.f.semantic.SendEmailAction"]={placement:a._Placement.shareMenu,order:0,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("email"),text:n.getText("SEMANTIC_CONTROL_SEND_EMAIL"),type:o.Transparent}}};e["sap.f.semantic.DiscussInJamAction"]={placement:a._Placement.shareMenu,order:1,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("discussion-2"),text:n.getText("SEMANTIC_CONTROL_DISCUSS_IN_JAM"),type:o.Transparent}}};e["sap.f.semantic.ShareInJamAction"]={placement:a._Placement.shareMenu,order:2,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("share-2"),text:n.getText("SEMANTIC_CONTROL_SHARE_IN_JAM"),type:o.Transparent}}};e["sap.f.semantic.SendMessageAction"]={placement:a._Placement.shareMenu,order:3,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("discussion"),text:n.getText("SEMANTIC_CONTROL_SEND_MESSAGE"),type:o.Transparent}}};e["saveAsTileAction"]={placement:a._Placement.shareMenu,order:4,constraints:"IconOnly"};e["sap.f.semantic.PrintAction"]={placement:a._Placement.shareMenu,order:5,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("print"),text:n.getText("SEMANTIC_CONTROL_PRINT"),type:o.Transparent}}};return e}();return a});