// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/CustomData","sap/ui/core/Configuration"],function(e,t){"use strict";var a=e.extend("sap.ushell.ui.launchpad.AccessibilityCustomData",{metadata:{library:"sap.ushell"}});a.prototype._checkWriteToDom=function(){var a=t.getAccessibility();if(!a){return null}var i=this.getKey();var r=e.prototype._checkWriteToDom.apply(this,arguments);if(r&&(i.indexOf("aria-")===0||i==="role"||i==="tabindex")){r.key=r.key.replace(/^data-/,"")}return r};return a});