/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/ui/core/Control","sap/m/library","sap/ui/core/Icon","sap/m/Label","sap/m/Breadcrumbs","sap/ui/core/CustomData","sap/esh/search/ui/controls/SearchLink","../sinaNexTS/sina/LogicalOperator","../sinaNexTS/sina/ComparisonOperator","../sinaNexTS/sina/ComplexCondition","../sinaNexTS/sina/SimpleCondition","../sinaNexTS/sina/Filter","sap/base/strings/formatMessage"],function(e,a,r,t,n,i,s,o,l,c,u,d,h){var p=a["LabelDesign"];var g=o["LogicalOperator"];var b=l["ComparisonOperator"];var m=c["ComplexCondition"];var f=u["SimpleCondition"];var v=d["Filter"];var S=e.extend("sap.esh.search.ui.controls.SearchCountBreadcrumbs",{renderer:{apiVersion:2,render:function e(a,r){a.openStart("div",r);a["class"]("sapUshellSearchTotalCountBreadcrumbs");a.openEnd();a.renderControl(r.getAggregation("icon"));a.renderControl(r.getAggregation("label"));var t=r.getModel();if(t.config.FF_hierarchyBreadcrumbs===true){a.renderControl(r.getAggregation("breadcrumbs"))}a.close("div")}},metadata:{aggregations:{icon:{type:"sap.ui.core.Icon",multiple:false},label:{type:"sap.m.Label",multiple:false},breadcrumbs:{type:"sap.m.Breadcrumbs",multiple:false}}},constructor:function a(r,t){e.prototype.constructor.call(this,r,t);this.initIcon();this.initLabel();this.initBreadCrumbs()},initIcon:function e(){var a=new r(this.getId()+"-Icon",{visible:{parts:[{path:"/count"},{path:"/breadcrumbsHierarchyNodePaths"}],formatter:function e(a,r){if(r&&Array.isArray(r)&&r.length>0){return false}return true}},src:{path:"/searchInIcon"}});a.addStyleClass("sapUiTinyMarginEnd");a.addStyleClass("sapUshellSearchTotalCountBreadcrumbsIcon");this.setAggregation("icon",a)},initLabel:function e(){var a=new t(this.getId()+"-Label",{visible:{parts:[{path:"/count"},{path:"/breadcrumbsHierarchyNodePaths"}],formatter:function e(a,r){if(r&&Array.isArray(r)&&r.length>0){return false}return true}},design:p.Bold,text:{path:"/countText"}});a.addStyleClass("sapUshellSearchTotalCountSelenium");this.setAggregation("label",a)},initBreadCrumbs:function e(){var a=new r(this.getId()+"-SearchLinkIcon",{src:{path:"icon"}});a.addStyleClass("sapElisaSearchLinkIcon");var t={path:"/breadcrumbsHierarchyNodePaths",template:new s(this.getId()+"-SearchLink",{text:{path:"label"},icon:a,visible:true,emphasized:{path:"isLast",formatter:function e(a){if(a===true){return true}return false}},customData:[new i("",{key:"containerId",value:{path:"id"}}),new i("",{key:"containerName",value:{path:"label"}})],press:this.handleBreadcrumbLinkPress.bind(this)}).addStyleClass("sapUshellSearchTotalCountBreadcrumbsLinks"),templateShareable:false};var o={visible:{parts:[{path:"/breadcrumbsHierarchyNodePaths"}],formatter:function e(a){if(a&&Array.isArray(a)&&a.length>0){return true}return false}},currentLocationText:{parts:[{path:"i18n>countnumber"},{path:"/count"}],formatter:h},separatorStyle:sap.m.BreadcrumbsSeparatorStyle.GreaterThan,links:t};var l=new n(this.getId()+"-Breadcrumbs",o).addStyleClass("sapUshellSearchTotalCountBreadcrumbs sapUiNoMarginBottom");this.setAggregation("breadcrumbs",l)},handleBreadcrumbLinkPress:function e(a){var r=a.getSource();var t=r.data().containerId;var n=r.data().containerName;var i=r.getModel();var s=i.sinaNext;var o=i.getDataSource();var l=i.getProperty("/breadcrumbsHierarchyAttribute");var c=b.DescendantOf;var u=new f({attribute:l,operator:c,value:t,valueLabel:n});var d=new m({operator:g.And,conditions:[u]});var h=new m({operator:g.And,conditions:t==="$$ROOT$$"?[]:[d]});var p=new v({dataSource:o,searchTerm:"*",rootCondition:h,sina:s});var S;if(s.configuration.updateUrl===true){var C=s.configuration.pageSize||10;var y={top:C,filter:encodeURIComponent(JSON.stringify(p.toJson()))};var A=s.configuration.renderSearchUrl(y);S=s._createNavigationTarget({targetUrl:A,label:"Children Folders",target:"_self"})}else{S=s._createNavigationTarget({targetFunction:s.filterBasedSearch,label:"Children Folders"||"",filter:p})}S.performNavigation()},setModel:function e(a){this.getAggregation("icon").setModel(a);this.getAggregation("label").setModel(a);this.getAggregation("breadcrumbs").setModel(a);return this}});return S})})();