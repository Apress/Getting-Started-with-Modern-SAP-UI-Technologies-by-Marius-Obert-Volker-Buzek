/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./PositionContainer","sap/ui/commons/library","sap/ui/core/Control","./AbsoluteLayoutRenderer","sap/ui/core/library"],function(t,e,o,i,n,r){"use strict";var s=r.Scrolling;var a=i.extend("sap.ui.commons.layout.AbsoluteLayout",{metadata:{deprecated:true,library:"sap.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},verticalScrolling:{type:"sap.ui.core.Scrolling",group:"Behavior",defaultValue:s.Hidden},horizontalScrolling:{type:"sap.ui.core.Scrolling",group:"Behavior",defaultValue:s.Hidden}},defaultAggregation:"positions",aggregations:{positions:{type:"sap.ui.commons.layout.PositionContainer",multiple:true,singularName:"position"}}}});a.prototype.setWidth=function(t){return f(this,"width",t,"LYT_SIZE")};a.prototype.setHeight=function(t){return f(this,"height",t,"LYT_SIZE")};a.prototype.setVerticalScrolling=function(t){return f(this,"verticalScrolling",t,"LYT_SCROLL")};a.prototype.setHorizontalScrolling=function(t){return f(this,"horizontalScrolling",t,"LYT_SCROLL")};a.prototype.insertPosition=function(t,e){var o=!!this.getDomRef();this.insertAggregation("positions",t,e,o);if(o&&t&&t.getControl()){this.contentChanged(t,"CTRL_ADD")}return this};a.prototype.addPosition=function(t){var e=!!this.getDomRef();this.addAggregation("positions",t,e);if(e&&t&&t.getControl()){this.contentChanged(t,"CTRL_ADD")}return this};a.prototype.removePosition=function(t){var e=!!this.getDomRef();var o=this.removeAggregation("positions",t,e);if(o){l([o]);this.contentChanged(o,"CTRL_REMOVE")}return o};a.prototype.removeAllPositions=function(){l(this.getPositions());var t=!!this.getDomRef();var e=this.removeAllAggregation("positions",t);if(t){this.contentChanged(e,"CTRL_REMOVE_ALL")}return e};a.prototype.destroyPositions=function(){l(this.getPositions());var t=!!this.getDomRef();this.destroyAggregation("positions",t);if(t){this.contentChanged(null,"CTRL_REMOVE_ALL")}return this};a.prototype.getContent=function(){var t=[];var e=this.getPositions();for(var o=0;o<e.length;o++){t.push(e[o].getControl())}return t};a.prototype.addContent=function(t,o){var i=e.createPosition(t,o);this.addPosition(i);return this};a.prototype.insertContent=function(t,o,i){var n=e.createPosition(t,i);this.insertPosition(n,o);return this};a.prototype.removeContent=function(t){var e=t;if(typeof t=="string"){t=sap.ui.getCore().byId(t)}if(typeof t=="object"){e=this.indexOfContent(t)}if(e>=0&&e<this.getContent().length){this.removePosition(e);return t}return null};a.prototype.removeAllContent=function(){var t=this.getContent();this.removeAllPositions();return t};a.prototype.indexOfContent=function(t){var e=this.getContent();for(var o=0;o<e.length;o++){if(t===e[o]){return o}}return-1};a.prototype.destroyContent=function(){this.destroyPositions();return this};a.prototype.setPositionOfChild=function(t,e){var o=this.indexOfContent(t);if(o>=0){var i=this.getPositions()[o];i.updatePosition(e);return true}return false};a.prototype.getPositionOfChild=function(t){var e=this.indexOfContent(t);if(e>=0){var o=this.getPositions()[e];return o.getComputedPosition()}return{}};a.prototype.exit=function(){l(this.getPositions())};a.prototype.doBeforeRendering=function(){var t=this.getPositions();if(!t||t.length==0){return}for(var e=0;e<t.length;e++){var o=t[e];o.reinitializeEventHandlers(true);g(o,true)}};a.prototype.onAfterRendering=function(){var t=this.getPositions();if(!t||t.length==0){return}for(var e=0;e<t.length;e++){t[e].reinitializeEventHandlers()}};a.cleanUpControl=function(t){if(t&&t[u]){t.removeDelegate(t[u]);t[u]=undefined}};a.prototype.contentChanged=function(t,e){switch(e){case"CTRL_POS":n.updatePositionStyles(t);g(t);t.reinitializeEventHandlers();break;case"CTRL_CHANGE":g(t,true);n.updatePositionedControl(t);t.reinitializeEventHandlers();break;case"CTRL_REMOVE":n.removePosition(t);t.reinitializeEventHandlers(true);break;case"CTRL_REMOVE_ALL":n.removeAllPositions(this);var o=t;if(o){for(var i=0;i<o.length;i++){o[i].reinitializeEventHandlers(true)}}break;case"CTRL_ADD":g(t,true);n.insertPosition(this,t);t.reinitializeEventHandlers();break;case"LYT_SCROLL":n.updateLayoutScolling(this);break;case"LYT_SIZE":n.updateLayoutSize(this);break}};var u="__absolutelayout__delegator";var l=function(t){for(var e=0;e<t.length;e++){var o=t[e];var i=o.getControl();if(i){a.cleanUpControl(i)}}};var g=function(t,e){var o=t.getControl();if(o){a.cleanUpControl(o);if(!e){p(o)}var i=function(t){return{onAfterRendering:function(){p(t)}}}(o);o[u]=i;o.addDelegate(i,true)}};var p=function(e){var o=false;if(e.getParent()&&e.getParent().getComputedPosition){var i=e.getParent().getComputedPosition();if(i.top&&i.bottom||i.height){t(e.getDomRef()).css("height","100%");o=true}if(i.left&&i.right||i.width){t(e.getDomRef()).css("width","100%");o=true}if(o){n.updatePositionStyles(e.getParent())}}return o};var f=function(t,e,o,i){var n=!!t.getDomRef();t.setProperty(e,o,n);if(n){t.contentChanged(null,i)}return t};e.cleanUpControl=a.cleanUpControl;return a});