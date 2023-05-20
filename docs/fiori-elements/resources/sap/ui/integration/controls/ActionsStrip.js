/*!
* OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["../library","sap/m/library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/integration/cards/actions/CardActions","sap/ui/integration/util/BindingHelper","sap/m/Button","sap/ui/integration/controls/LinkWithIcon","sap/m/OverflowToolbarButton","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/m/ToolbarSpacer"],function(t,e,o,a,i,n,r,s,l,p,u,c){"use strict";var b=e.ToolbarStyle;var d=t.CardActionArea;var f=a.extend("sap.ui.integration.controls.ActionsStrip",{metadata:{library:"sap.ui.integration",properties:{disableItemsInitially:{type:"boolean",defaultValue:false}},aggregations:{_toolbar:{type:"sap.m.OverflowToolbar",multiple:false}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:{apiVersion:2,render:function(t,e){t.openStart("div",e).class("sapUiIntActionsStrip").openEnd();t.renderControl(e._getToolbar());t.close("div")}}});f.prototype._getToolbar=function(){var t=this.getAggregation("_toolbar");if(!t){t=new p({style:b.Clear});this.setAggregation("_toolbar",t)}return t};f.prototype._initButtons=function(t){if(!t||!t.length){return null}var e=this._getToolbar(),a=o.byId(this.getCard()),r=new i({card:a}),s=false,l;this._oActions=r;t=n.createBindingInfos(t,a.getBindingNamespaces());t.forEach(function(t){if(t.type==="ToolbarSpacer"){s=true;e.addContent(new c);return}var o=t.actions,a=new u({group:t.overflowGroup,priority:t.overflowPriority}),i;switch(t.type){case"Link":i=this._createLink(t);break;case"Button":default:i=this._createButton(t);break}i.setLayoutData(a);l={area:d.ActionsStrip,control:i,actions:o,enabledPropertyName:"enabled"};if(this.getDisableItemsInitially()){l.enabledPropertyValue=false;i._mActionsConfig=l;i._bIsDisabled=true}r.attach(l);e.addContent(i)}.bind(this));if(!s){e.insertContent(new c,0)}};f.prototype.disableItems=function(){var t=this._getToolbar().getContent();t.forEach(function(t){if(t.setEnabled&&!t._bIsDisabled){t.setEnabled(false);t._bIsDisabled=true}})};f.prototype.enableItems=function(){var t=this._getToolbar().getContent(),e=this._oActions,o;t.forEach(function(t){if(t.setEnabled&&t._bIsDisabled){o=t._mActionsConfig;if(o.action){o.enabledPropertyValue=true;e._setControlEnabledState(o)}else{t.setEnabled(true)}delete t._bIsDisabled}})};f.prototype._createLink=function(t){var e=new s({icon:t.icon,text:t.text,tooltip:t.tooltip,ariaHasPopup:t.ariaHasPopup,emphasized:t.emphasized,visible:t.visible});return e};f.prototype._createButton=function(t){var e;if(t.icon){e=new l({icon:t.icon,text:t.text||t.tooltip,tooltip:t.tooltip||t.text,type:t.buttonType,ariaHasPopup:t.ariaHasPopup,visible:t.visible});return e}e=new r({text:t.text,tooltip:t.tooltip,type:t.buttonType,ariaHasPopup:t.ariaHasPopup,visible:t.visible});return e};f.create=function(t,e,o){if(!e){return null}var a=new f({card:t,disableItemsInitially:o});a._initButtons(e);return a};return f});