/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TileRenderer","sap/ui/core/ValueStateSupport","sap/ui/core/Renderer","sap/m/library","sap/ui/core/library"],function(e,t,i,a,s){"use strict";var n=s.ValueState;var o=a.StandardTileType;var d=i.extend(e);d.apiVersion=2;d._renderContent=function(e,i){var a=i.getInfoState();e.openStart("div");e.class("sapMStdTileTopRow");e.openEnd();if(i.getIcon()){e.openStart("div");e.class("sapMStdTileIconDiv");switch(i.getType()){case o.Monitor:e.class("sapMStdIconMonitor");break;case o.Create:e.class("sapMStdIconCreate");break}e.openEnd();e.renderControl(i._getImage());e.close("div")}if(i.getNumber()){e.openStart("div");e.class("sapMStdTileNumDiv");e.openEnd();e.openStart("div",i.getId()+"-number");var s=i.getNumber().length;if(s<5){e.class("sapMStdTileNum")}else if(s<8){e.class("sapMStdTileNumM")}else{e.class("sapMStdTileNumS")}e.openEnd();e.text(i.getNumber());e.close("div");if(i.getNumberUnit()){e.openStart("div",i.getId()+"-numberUnit");e.class("sapMStdTileNumUnit");e.openEnd();e.text(i.getNumberUnit());e.close("div")}e.close("div")}e.close("div");e.openStart("div");e.class("sapMStdTileBottomRow");if(i.getType()===o.Monitor){e.class("sapMStdTileMonitorType")}e.openEnd();e.openStart("div",i.getId()+"-title");e.class("sapMStdTileTitle");e.openEnd();if(i.getTitle()){e.text(i.getTitle())}e.close("div");if(i.getInfo()){e.openStart("div",i.getId()+"-info");e.class("sapMStdTileInfo");e.class("sapMStdTileInfo"+a);if(a!=n.None){e.accessibilityState(i,{ariaDescribedBy:{value:i.getId()+"-sapSRH",append:true}})}e.openEnd();if(i.getInfo()){e.text(i.getInfo())}e.close("div")}if(a!=n.None){e.openStart("span",i.getId()+"-sapSRH");e.class("sapUiInvisibleText");e.accessibilityState({hidden:false});e.openEnd();e.text(t.getAdditionalText(a));e.close("span")}e.close("div")};return d},true);