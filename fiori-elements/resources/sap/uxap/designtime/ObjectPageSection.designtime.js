/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/uxap/library"],function(e){"use strict";return{name:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME")},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME_PLURAL")}},select:function(e){var t=e.getParent();t.setSelectedSection(e)},palette:{group:"CONTAINER",icons:{svg:"sap/uxap/designtime/ObjectPageSection.icon.svg"}},actions:{remove:{changeType:"stashControl"},reveal:{changeType:"unstashControl",getLabel:function(e){var t=e.getTitle();var n=e.getSubSections();if(n.length===1&&n[0].getTitle().trim()!==""){t=n[0].getTitle()}return t||e.getId()}},rename:function(){return{changeType:"rename",domRef:".sapUxAPObjectPageSectionTitle",isEnabled:function(e){return e.getShowTitle()},validators:["noEmptyText"]}}},aggregations:{subSections:{domRef:":sap-domref .sapUxAPObjectPageSectionContainer",actions:{move:{changeType:"moveControls"}}}}}});