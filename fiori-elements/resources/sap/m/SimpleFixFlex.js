/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/base/Log","./SimpleFixFlexRenderer"],function(e,t,i,n){"use strict";var s=e.extend("sap.m.SimpleFixFlex",{metadata:{library:"sap.m",aggregations:{fixContent:{type:"sap.ui.core.Control",multiple:false},flexContent:{type:"sap.ui.core.Control",multiple:true}},properties:{fitParent:{type:"boolean",group:"Appearance",defaultValue:true}}},renderer:n});s.FIX_AREA_CHARACTER_COUNT_RECOMMENDATION=200;s.FIX_AREA_CHARACTERS_ABOVE_RECOMMENDED_WARNING="It is recommended to use less than "+s.FIX_AREA_CHARACTER_COUNT_RECOMMENDATION+" characters as a value state text.";s.prototype.onBeforeRendering=function(){this._deregisterFixContentResizeHandler();var e=this.getFixContent();if(e&&e.isA("sap.m.Text")&&e.getText().length>s.FIX_AREA_CHARACTER_COUNT_RECOMMENDATION){i.warning(s.FIX_AREA_CHARACTERS_ABOVE_RECOMMENDED_WARNING,"",this.getId())}};s.prototype.onAfterRendering=function(){if(this.getFitParent()){this._registerFixContentResizeHandler()}};s.prototype._registerFixContentResizeHandler=function(){var e=this.getFixContent();if(!this._sResizeListenerId&&e&&e.getDomRef()){this._sResizeListenerId=t.register(e.getDomRef(),this._onFixContentResize.bind(this));this._onFixContentResize()}};s.prototype._deregisterFixContentResizeHandler=function(){if(this._sResizeListenerId){t.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};s.prototype._onFixContentResize=function(){var e=this.$(),t=this.getFixContent().$(),i=t.get(0);if(!i||!i.clientHeight){return null}e.css("padding-top",i.clientHeight)};s.prototype.exit=function(){this._deregisterFixContentResizeHandler()};return s});