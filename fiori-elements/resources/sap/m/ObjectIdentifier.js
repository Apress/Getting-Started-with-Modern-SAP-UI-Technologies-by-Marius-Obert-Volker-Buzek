/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./Link","./Text","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/core/library","sap/ui/Device","sap/ui/base/ManagedObject","./ObjectIdentifierRenderer","sap/ui/events/KeyCodes","sap/ui/core/Configuration"],function(t,e,i,o,r,n,s,a,p,l,c,g){"use strict";var u=s.TextDirection;var d=t.EmptyIndicatorMode;var h=o.extend("sap.m.ObjectIdentifier",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ObjectIdentifier.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null},badgeNotes:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},badgePeople:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},badgeAttachments:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},visible:{type:"boolean",group:"Appearance",defaultValue:true},titleActive:{type:"boolean",group:"Misc",defaultValue:false},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:u.Inherit},emptyIndicatorMode:{type:"sap.m.EmptyIndicatorMode",group:"Appearance",defaultValue:d.Off}},aggregations:{_titleControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_textControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{titlePress:{parameters:{domRef:{type:"object"}}}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},dnd:{draggable:true,droppable:false}},renderer:l});h.prototype.init=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(g.getAccessibility()){h.OI_ARIA_ROLE=t.getText("OI_ARIA_ROLE")}};h.prototype.exit=function(){if(this._attachmentsIcon){this._attachmentsIcon.destroy();this._attachmentsIcon=null}if(this._peopleIcon){this._peopleIcon.destroy();this._peopleIcon=null}if(this._notesIcon){this._notesIcon.destroy();this._notesIcon=null}};h.prototype._getAttachmentsIcon=function(){if(!this._attachmentsIcon){this._attachmentsIcon=this._getIcon(r.getIconURI("attachment"),this.getId()+"-attachments")}return this._attachmentsIcon};h.prototype._getPeopleIcon=function(){if(!this._peopleIcon){this._peopleIcon=this._getIcon(r.getIconURI("group"),this.getId()+"-people")}return this._peopleIcon};h.prototype._getNotesIcon=function(){if(!this._notesIcon){this._notesIcon=this._getIcon(r.getIconURI("notes"),this.getId()+"-notes")}return this._notesIcon};h.prototype._getIcon=function(t,e){var i=a.system.phone?"1em":"1em";var o;o=this._icon||r.createControlByURI({src:t,id:e+"-icon",size:i,useIconTooltip:false},sap.m.Image);o.setSrc(t);return o};h.prototype._getTitleControl=function(){var t=this.getAggregation("_titleControl"),o=this.getId(),r=p.escapeSettingsValue(this.getProperty("title")),s;if(!t){if(this.getProperty("titleActive")){s=this.getAriaLabelledBy().slice();s.push(n.getStaticId("sap.m","OI_ARIA_ROLE"));t=new e({id:o+"-link",text:r,ariaLabelledBy:s});t.addAriaLabelledBy(o+"-text")}else{t=new i({id:o+"-txt",text:r})}this.setAggregation("_titleControl",t,true)}return t};h.prototype._getTextControl=function(){var t=this.getAggregation("_textControl");if(!t){t=new i({text:p.escapeSettingsValue(this.getProperty("text"))});this.setAggregation("_textControl",t,true)}t.setTextDirection(this.getTextDirection());return t};h.prototype.setTitle=function(t){if(t){this._getTitleControl().setProperty("text",t)}return this.setProperty("title",t)};h.prototype.setText=function(t){if(t){this._getTextControl().setProperty("text",t)}return this.setProperty("text",t)};h.prototype.setTitleActive=function(t){var e=this.getTitleActive();this.setProperty("titleActive",t);if(e!=t){this.destroyAggregation("_titleControl");this._getTitleControl()}return this};h.prototype._handlePress=function(t){var e=t.target;if(this.getTitleActive()&&this.$("title")[0].firstChild==e){this.fireTitlePress({domRef:e});t.setMarked()}};h.prototype.onsapenter=function(t){h.prototype._handlePress.apply(this,arguments)};h.prototype.onkeyup=function(t){if(t&&t.which===c.SPACE){h.prototype._handlePress.apply(this,arguments)}};h.prototype.ontap=function(t){h.prototype._handlePress.apply(this,arguments)};h.prototype.addAssociation=function(t,i,r){var n=this.getAggregation("_titleControl");if(t==="ariaLabelledBy"){if(this.getTitleActive()&&n instanceof e){n.addAriaLabelledBy(i)}}return o.prototype.addAssociation.apply(this,arguments)};h.prototype.removeAssociation=function(t,i,r){var n=this.getAggregation("_titleControl");if(t==="ariaLabelledBy"){if(this.getTitleActive()&&n instanceof e){n.removeAssociation("ariaLabelledBy",i,true)}}return o.prototype.removeAssociation.apply(this,arguments)};h.prototype.getAccessibilityInfo=function(){var t=this.getAggregation("_titleControl")?this.getAggregation("_titleControl").getAccessibilityInfo():{type:"",description:""},e=(h.OI_ARIA_ROLE+" "+(t.type||"")).trim();if(this.getTitle()||this.getText()){t.type=e}t.description=t.description+" "+this.getText();return t};h.prototype._hasTopRow=function(){return this.getTitle()||this.getBadgeNotes()||this.getBadgePeople()||this.getBadgeAttachments()};return h});