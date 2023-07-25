/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./ToggleButtonRenderer"],function(e,t){"use strict";var s=e.extend("sap.ui.commons.ToggleButton",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}}}});s.prototype.onclick=function(e){if(this.getEnabled()){this.setPressed(!this.getPressed());if(this.$().is(":visible")){this.firePress({pressed:this.getPressed()})}}e.preventDefault();e.stopPropagation()};s.prototype.setPressed=function(e){var t;if(e!==this.getProperty("pressed")){t=this.getRenderer();this.setProperty("pressed",e,true);if(!this.getPressed()){t.ondeactivePressed(this)}else{t.onactivePressed(this)}t.updateImage(this)}return this};s.prototype.onAfterRendering=function(){var e=this.getRenderer();if(!this.getPressed()){e.ondeactivePressed(this)}else{e.onactivePressed(this)}};s.prototype.getAccessibilityInfo=function(){var t=e.prototype.getAccessibilityInfo.apply(this,arguments);if(this.getPressed()){t.description=((t.description||"")+" "+sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_STATE_PRESSED")).trim()}return t};return s});