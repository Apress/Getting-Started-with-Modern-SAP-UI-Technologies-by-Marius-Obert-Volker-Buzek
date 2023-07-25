// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/JSView","sap/ushell/components/tiles/indicatorTileUtils/oData4Analytics","sap/ushell/components/tiles/indicatorTileUtils/smartBusinessUtil","sap/suite/ui/microchart/AreaMicroChartItem","sap/suite/ui/microchart/AreaMicroChartPoint","sap/suite/ui/microchart/AreaMicroChartLabel","sap/m/library","sap/suite/ui/microchart/AreaMicroChart","sap/m/GenericTile","sap/ui/model/json/JSONModel"],function(e,t,i,a,r,s,l,o,n,h){"use strict";var u=l.LoadState;sap.ui.getCore().loadLibrary("sap.suite.ui.microchart");sap.ui.jsview("sap.ushell.components.tiles.indicatorArea.AreaChartTile",{getControllerName:function(){return"sap.ushell.components.tiles.indicatorArea.AreaChartTile"},createContent:function(){this.setHeight("100%");this.setWidth("100%");var e="Lorem ipsum";var t="Lorem ipsum";var i=l.Size;var c=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.getViewData().chip);if(c.title&&c.subTitle){e=c.title;t=c.subTitle}var m=function(e){return new a({color:"Good",points:{path:"/"+e+"/data",template:new r({x:"{day}",y:"{balance}"})}})};var p=function(e){return new s({label:"{/"+e+"/label}",color:"{/"+e+"/color}"})};var d={subheader:t,header:e,footerNum:"",footerComp:"",scale:"",unit:"",value:8888,size:"Auto",frameType:"OneByOne",state:u.Loading};this.oNVConfContS=new o({width:"{/width}",height:"{/height}",size:i.Responsive,target:m("target"),innerMinThreshold:m("innerMinThreshold"),innerMaxThreshold:m("innerMaxThreshold"),minThreshold:m("minThreshold"),maxThreshold:m("maxThreshold"),chart:m("chart"),minXValue:"{/minXValue}",maxXValue:"{/maxXValue}",minYValue:"{/minYValue}",maxYValue:"{/maxYValue}",firstXLabel:p("firstXLabel"),lastXLabel:p("lastXLabel"),firstYLabel:p("firstYLabel"),lastYLabel:p("lastYLabel"),minLabel:p("minLabel"),maxLabel:p("maxLabel")});this.oNVConfS=new sap.ushell.components.tiles.sbtilecontent({unit:"{/unit}",size:"{/size}",footer:"{/footerNum}",content:this.oNVConfContS});this.oGenericTile=new n({subheader:"{/subheader}",frameType:"{/frameType}",size:"{/size}",header:"{/header}",tileContent:[this.oNVConfS]});var b=new h;b.setData(d);this.oGenericTile.setModel(b);return this.oGenericTile}})},true);