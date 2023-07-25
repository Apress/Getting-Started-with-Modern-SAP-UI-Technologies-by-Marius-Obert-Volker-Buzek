// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/m/Button","sap/m/library","sap/m/Popover","sap/m/Text","sap/ui/core/Core","sap/ushell/components/HomepageManager","sap/ushell/resources","sap/ushell/utils/WindowUtils"],function(e,t,i,o,n,s,a,r,l){"use strict";var c=i.PlacementType;var d=function(){this.oEventBus=s.getEventBus();this.init=function(e){this.oModel=e}};d.prototype._activate=function(){this.oModel.setProperty("/tileActionModeActive",true);this.aOrigHiddenGroupsIds=this.getHomepageManager().getCurrentHiddenGroupIds(this.oModel);var e=s.byId("dashboardGroups");e.addLinksToUnselectedGroups();var t=s.byId("ActionModeBtn");if(t){t.setText(r.i18n.getText("exitEditMode"));if(t.setSelected){t.setSelected(true)}}this.oEventBus.publish("launchpad","actionModeActive")};d.prototype._deactivate=function(){this.oModel.setProperty("/tileActionModeActive",false);this.oEventBus.publish("launchpad","actionModeInactive",this.aOrigHiddenGroupsIds);var e=s.byId("TileActions");if(e!==undefined){e.destroy()}var t=s.byId("ActionModeBtn");if(t){t.setText(r.i18n.getText("activateEditMode"));if(t.setSelected){t.setSelected(false)}}};d.prototype.toggleActionMode=function(e,t,i){i=i||[];var o=i.filter(function(e){return e.getVisible()});var n={group:o[e.getProperty("/topGroupInViewPortIndex")],restoreLastFocusedTile:true};if(e.getProperty("/tileActionModeActive")){this._deactivate();var s=document.querySelector(".sapUshellTileContainerHeader[tabindex='0']");if(s){var a=s.closest("sapUshellTileContainer");if(a){n.restoreLastFocusedTileContainerById=a.getAttribute("id")}}}else{this._activate()}this.oEventBus.publish("launchpad","scrollToGroup",n)};d.prototype.activateGroupEditMode=function(e){var t=e.getDomRef().getElementsByClassName("sapUshellTileContainerContent");for(var i=0;i<t.length;i++){t[i].classList.add("sapUshellTileContainerEditMode")}};d.prototype.getHomepageManager=function(){if(!this.oHomepageManager){this.oHomepageManager=a.prototype.getInstance()}return this.oHomepageManager};d.prototype._filterActions=function(e,t){var i=t.getModel();var o=t.getParent().getBindingContext().getPath();if(i.getProperty(o+"/isGroupLocked")){["tileSettingsBtn","linkSettingsBtn","ConvertToTile","ConvertToLink","moveTile_action"].forEach(function(t){e=e.filter(function(e){return e.id!==t})})}if(this.getHomepageManager().getPersonalizableGroups().length<2){e=e.filter(function(e){return e.id!=="moveTile_action"})}return e};d.prototype._openActionsMenu=function(i){var o=i.getSource();var n=o.getBindingContext().getObject().object;var a=this.getHomepageManager().getTileActions(n);a=this._filterActions(a,o);var r=document.getElementsByClassName("sapUshellTileActionLayerDivSelected");for(var l=0;l<r.length;l++){r[l].classList.remove("sapUshellTileActionLayerDivSelected")}var d=o.getDomRef().getElementsByClassName("sapUshellTileActionLayerDiv");for(var p=0;p<d.length;p++){d[p].classList.add("sapUshellTileActionLayerDivSelected")}var u=[];a.forEach(function(i){if(!i.press&&!i.targetURL){e.warning("Invalid Tile action discarded: "+JSON.stringify(i));return}u.push(new t({text:i.text,icon:i.icon,press:this._handleActionPress.bind(this,i,o)}))}.bind(this));if(u.length===0){this._openNoActionsPopover(i);return}var g=o.getActionSheetIcon?o.getActionSheetIcon():undefined;if(!g){var h=s.byId(o.getId()+"-action-more");g=h||o}var f=s.byId("TileActions");if(!f){sap.ui.require(["sap/m/ActionSheet"],function(e){f=new e("TileActions",{placement:c.VerticalPreferedBottom,afterClose:function(){var e=document.getElementsByClassName("sapUshellTileActionLayerDivSelected");for(var t=0;t<e.length;t++){e[t].classList.remove("sapUshellTileActionLayerDivSelected")}var i=s.getEventBus();i.publish("dashboard","actionSheetClose",o)}});this._openActionSheet(f,u,g)}.bind(this))}else{this._openActionSheet(f,u,g)}};d.prototype._openActionSheet=function(e,t,i){t=t||[];e.destroyButtons();t.forEach(function(t){e.addButton(t)});e.openBy(i)};d.prototype._openNoActionsPopover=function(e){var t=e.getSource();new o({placement:c.Bottom,showHeader:false,content:new n({text:r.i18n.getText("tileHasNoActions")})}).addStyleClass("sapUiContentPadding").openBy(t)};d.prototype._handleActionPress=function(e,t){if(e.press){e.press(t)}else if(e.targetURL){if(e.targetURL.indexOf("#")===0){hasher.setHash(e.targetURL)}else{l.openURL(e.targetURL,"_blank")}}};return new d},true);