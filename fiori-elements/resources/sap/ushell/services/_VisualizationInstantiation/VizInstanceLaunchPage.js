// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_VisualizationInstantiation/VizInstance","sap/ushell/library","sap/ushell/services/_VisualizationInstantiation/VizInstanceRenderer"],function(e,t,i){"use strict";var a=t.DisplayFormat;var n=e.extend("sap.ushell.ui.launchpad.VizInstanceLaunchPage",{metadata:{library:"sap.ushell"},renderer:i});n.prototype.load=function(){var e=this.getInstantiationData().launchPageTile;return sap.ushell.Container.getServiceAsync("LaunchPage").then(function(t){return new Promise(function(i,a){t.getCatalogTileViewControl(e).done(i).fail(function(){t.getTileView(e).done(i).fail(a)})}).then(function(i){this._setDisplayFormatFromTileSize(e,t);this.setContent(i)}.bind(this))}.bind(this))};n.prototype._setDisplayFormatFromTileSize=function(e,t){var i=t.getTileSize(e);if(i==="1x2"){this.setDisplayFormat(a.StandardWide)}else{this.setDisplayFormat(a.Standard)}};return n});