// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/TileContainer","sap/ui/Device","sap/ushell/components/factsheet/controls/PictureTile","sap/ushell/library","./PictureViewerRenderer"],function(e,t,i){"use strict";var s=e.extend("sap.ushell.components.factsheet.controls.PictureViewer",{metadata:{deprecated:true,library:"sap.ushell",properties:{tileScaling:{type:"float",group:"Misc",defaultValue:.95},removable:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ushell.components.factsheet.controls.PictureViewerItem",multiple:true,singularName:"item"}},events:{pictureDeleted:{}}}});s.prototype.init=function(){e.prototype.init.apply(this);this.setEditable(false);if(sap.ui.getCore().isMobile()){jQuery(window).bind("tap",this._reset.bind(this));var t=sap.ui.getCore().getStaticAreaRef();this.$blocker=jQuery("<div class='sapCaPVBly sapUiBLy'></div>").css("visibility","hidden");jQuery(t).append(this.$blocker)}if(!sap.ui.getCore().isMobile()){jQuery(window).bind("resize",this._resize.bind(this))}this.addStyleClass("sapCaPW");this.addStyleClass("sapCaPWRendering")};s.prototype._resize=function(){if(this._oDragSession){return}setTimeout(function(){this._applyDimension();this._update(false);delete this._iInitialResizeTimeout}.bind(this),this._iInitialResizeTimeout);this._iInitialResizeTimeout=0};s.prototype.exit=function(){this.$blocker.remove();if(!sap.ui.getCore().isMobile()){jQuery(window).unbind("resize",this._resize.bind(this))}e.prototype.exit.apply(this);if(!t.system.desktop){jQuery(window).unbind("tap",this._reset.bind(this))}};s.prototype.setTileScaling=function(e){if(e<0||e>1){e=.75;jQuery.sap.log.error("Tile Scaling should be a float value between 0 and 1 and not "+e+". Setting it to 0.75 by default.")}this.setProperty("tileScaling",e)};s.prototype.addItem=function(e){this.insertItem(e,this.getItems().length)};s.prototype.insertItem=function(e,t){var s=new i({tileContent:e});s.attachPictureDelete(this._deletePictureRequestHandler.bind(this));this.insertTile(s,t);this.insertAggregation("items",e,t);return this};s.prototype.insertTile=function(t){t.attachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler,this));e.prototype.insertTile.apply(this,arguments)};s.prototype.deleteTile=function(t){e.prototype.deleteTile.apply(this,arguments);t.destroy()};s.prototype.deletePicture=function(e){var t,i,s;s=this.getTiles().length;if(typeof e!=="number"||e<0||e>=s){t=this.getPageFirstTileIndex()}else{t=e}if(t>-1){i=this.getTiles()[t];i.detachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler,this));this.deleteTile(i);this.removeAggregation("items",t,true)}else{jQuery.sap.log.warning("Cannot find and delete a picture at index : "+e)}return this};s.prototype.selectPicture=function(e){var t=this.getTiles().length;if(typeof e!=="number"){e=0}else if(e<0){e=0}else if(e>=t){e=t-1}if(this._bRendered){this.addStyleClass("sapCaPWRendering")}this._selectedIndex=e;return this};s.prototype.setSelectedIndex=function(e){this.selectPicture(e)};s.prototype.getCurrentPictureIndex=function(){return this.getPageFirstTileIndex()};s.prototype._deletePictureRequestHandler=function(e){var t=this.indexOfTile(e.getSource());this.deleteTile(e.getSource());this.firePictureDeleted({index:t})};s.prototype._reset=function(e){var t=this.getCurrentPictureIndex();var i=this.getTiles();if(t>-1&&i&&i.length>t){var s=i[t];if(s){var r=jQuery(e.target);var n=this.$();if(n.length>0&&r.length>0){var o=r.closest(this.$());if(o.length===0){s.switchVisibility(false)}}}}};s.prototype.setRemovable=function(e){this.setProperty("removable",e,true);this.toggleStyleClass("sapCaPWEditable",e)};s.prototype.setEditable=function(){e.prototype.setEditable.call(this,false)};s.prototype._getTileDimension=function(){if(!this._bRendered){return}var e=jQuery.sap.byId(this.getId()+"-scrl");var t={width:e.width(),height:e.height()};return t};s.prototype.onBeforeRendering=function(){this.addStyleClass("sapCaPWRendering")};s.prototype.onAfterRendering=function(){var e=this;this._bRendered=true;this._applyDimension();this.$().toggleClass("sapCaPWEditable",this.getRemovable()===true);this._sInitialResizeTimeoutId=setTimeout(function(){e.addStyleClass("sapCaPWRendering");e._applyPageStartIndex(e._selectedIndex);e._update(false)},this._iInitialResizeTimeout);if(t.system.desktop){var i=this.getTiles()[0],s=this._iInitialResizeTimeout;if(i){setTimeout(function(){this._findTile(i.$()).focus()}.bind(this),s)}}};s.prototype._update=function(){e.prototype._update.apply(this,arguments);this.removeStyleClass("sapCaPWRendering");if(sap.ui.getCore().isMobile()){var t=this;var i=this.$blocker;setTimeout(function(){i.fadeOut(200,function(){t.css("visibility","hidden").css("z-index",0)})},250)}};s.prototype._applyDimension=function(){var e=this._getContainerDimension(),i=this.getId(),s=this.$(),r,n=10,o=60,a=jQuery.sap.byId(i+"-cnt"),l,p,u=jQuery.sap.byId(i+"-pager").outerHeight();jQuery.sap.byId(i+"-scrl").css({width:e.outerwidth+"px",height:e.outerheight-u+"px"});a.css({height:e.outerheight-u+"px",visibility:"visible"});s.css("visibility","visible");r=s.position();l=a.position();p=a.outerHeight();if(jQuery.device.is.phone){n=2}else if(t.system.desktop){n=0}jQuery.sap.byId(i+"-blind").css({top:l.top+n+"px",left:l.left+n+"px",width:a.outerWidth()-n+"px",height:p-n+"px"});jQuery.sap.byId(i+"-rightedge").css({top:r.top+n+o+"px",right:n+"px",height:p-n-o+"px"});jQuery.sap.byId(i+"-leftedge").css({top:r.top+n+o+"px",left:r.left+n+"px",height:p-n-o+"px"})};s.prototype.showBlockerLayer=function(e){if(sap.ui.getCore().isMobile()){var t=20;jQuery(sap.ui.getCore().getStaticAreaRef()).children().each(function(e,i){var s=parseInt(jQuery(i).css("z-index"),10);if(!isNaN(s)){t=Math.max(t,s)}});jQuery.sap.log.debug("blocker layer z-index calculated : "+t+1);this.$blocker.css("z-index",t+1).css("visibility","visible").fadeIn(200,function(){if(e){e.call()}})}else if(e){e.call()}};return s});