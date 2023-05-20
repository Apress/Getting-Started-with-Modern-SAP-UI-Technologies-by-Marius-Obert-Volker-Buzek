/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/base/DataType","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/core/library","sap/f/library","sap/m/library","sap/ui/layout/library"],function(e,a,t,i){"use strict";var n=sap.ui.getCore().initLibrary({name:"sap.uxap",dependencies:["sap.ui.core","sap.f","sap.m","sap.ui.layout"],designtime:"sap/uxap/designtime/library.designtime",types:["sap.uxap.BlockBaseColumnLayout","sap.uxap.BlockBaseFormAdjustment","sap.uxap.Importance","sap.uxap.ObjectPageConfigurationMode","sap.uxap.ObjectPageHeaderDesign","sap.uxap.ObjectPageHeaderPictureShape","sap.uxap.ObjectPageSubSectionLayout","sap.uxap.ObjectPageSubSectionMode"],interfaces:["sap.uxap.IHeaderTitle","sap.uxap.IHeaderContent"],controls:["sap.uxap.AnchorBar","sap.uxap.BlockBase","sap.uxap.BreadCrumbs","sap.uxap.HierarchicalSelect","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageDynamicHeaderTitle","sap.uxap.ObjectPageDynamicHeaderContent","sap.uxap.ObjectPageHeaderActionButton","sap.uxap.ObjectPageHeaderContent","sap.uxap.ObjectPageLayout","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageSectionBase","sap.uxap.ObjectPageSubSection"],elements:["sap.uxap.ModelMapping","sap.uxap.ObjectPageAccessibleLandmarkInfo","sap.uxap.ObjectPageHeaderLayoutData","sap.uxap.ObjectPageLazyLoader"],version:"1.113.0",extensions:{flChangeHandlers:{"sap.uxap.ObjectPageHeader":"sap/uxap/flexibility/ObjectPageHeader","sap.uxap.ObjectPageLayout":"sap/uxap/flexibility/ObjectPageLayout","sap.uxap.ObjectPageSection":"sap/uxap/flexibility/ObjectPageSection","sap.uxap.ObjectPageSubSection":"sap/uxap/flexibility/ObjectPageSubSection","sap.uxap.ObjectPageDynamicHeaderTitle":"sap/uxap/flexibility/ObjectPageDynamicHeaderTitle","sap.uxap.ObjectPageHeaderActionButton":"sap/uxap/flexibility/ObjectPageHeaderActionButton","sap.ui.core._StashedControl":{unstashControl:{changeHandler:"default",layers:{USER:true}},stashControl:{changeHandler:"default",layers:{USER:true}}}},"sap.ui.support":{publicRules:true}}});n.BlockBaseColumnLayout=a.createType("sap.uxap.BlockBaseColumnLayout",{isValid:function(e){return/^(auto|[1-4]{1})$/.test(e)}},a.getType("string"));n.BlockBaseFormAdjustment={BlockColumns:"BlockColumns",OneColumn:"OneColumn",None:"None"};n.ObjectPageConfigurationMode={JsonURL:"JsonURL",JsonModel:"JsonModel"};n.ObjectPageHeaderDesign={Light:"Light",Dark:"Dark"};n.ObjectPageHeaderPictureShape={Circle:"Circle",Square:"Square"};n.ObjectPageSubSectionLayout={TitleOnTop:"TitleOnTop",TitleOnLeft:"TitleOnLeft"};n.ObjectPageSubSectionMode={Collapsed:"Collapsed",Expanded:"Expanded"};n.Importance={Low:"Low",Medium:"Medium",High:"High"};n.Utilities={getClosestOPL:function(e){while(e&&!(e instanceof sap.uxap.ObjectPageLayout)){e=e.getParent()}return e},isPhoneScenario:function(e){if(t.system.phone){return true}return n.Utilities._isCurrentMediaSize("Phone",e)},isTabletScenario:function(e){return n.Utilities._isCurrentMediaSize("Tablet",e)},_isCurrentMediaSize:function(e,a){return a&&a.name===e},getChildPosition:function(e,a){var t=e instanceof i?e:i(e),n=a instanceof i?a:i(a),s=i(document.documentElement),p=t.position(),u=t.offsetParent(),o;while(!u.is(n)&&!u.is(s)){o=u.position();p.top+=o.top;p.left+=o.left;u=u.offsetParent()}return p}};return n});