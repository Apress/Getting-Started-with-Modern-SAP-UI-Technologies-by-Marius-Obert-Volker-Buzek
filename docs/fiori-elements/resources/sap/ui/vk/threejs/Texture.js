/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../Texture","../thirdparty/three"],function(t,e){"use strict";var i=t.extend("sap.ui.vk.threejs.Texture",{metadata:{library:"sap.ui.vk"},constructor:function(t){if(t){var i=new e.TextureLoader;this._nativeTexture=i.load(t);if(!this._nativeTexture.userData){this._nativeTexture.userData={}}}}});var r=i.getMetadata().getParent().getClass().prototype;i.prototype.init=function(){if(r.init){r.init.call(this)}};i.prototype.load=function(t){var i=new e.TextureLoader;this._nativeTexture=i.load(t);if(!this._nativeTexture.userData){this._nativeTexture.userData={}}return this};i.prototype.getTextureRef=function(){return this._nativeTexture};i.prototype.setTextureRef=function(t){this._nativeTexture=t;if(!this._nativeTexture.userData){this._nativeTexture.userData={}}return this};i.prototype.getId=function(){if(this._nativeTexture&&this._nativeTexture.userData&&this._nativeTexture.userData.id){return this._nativeTexture.userData.id}};i.prototype.setId=function(t){if(this._nativeTexture){if(!this._nativeTexture.userData){this._nativeTexture.userData={}}this._nativeTexture.userData.id=t}return this};i.prototype.getFilterMode=function(){if(this._nativeTexture){return this._nativeTexture.magFilter===e.NearestFilter?1:0}};i.prototype.setFilterMode=function(t){if(this._nativeTexture){this._nativeTexture.magFilter=t===1?e.NearestFilter:e.LinearFilter}};i.prototype.getUvRotationAngle=function(){if(this._nativeTexture){return this._nativeTexture.rotation}};i.prototype.setUvRotationAngle=function(t){if(this._nativeTexture){this._nativeTexture.rotation=t}};i.prototype.getUvHorizontalOffset=function(){if(this._nativeTexture){return this._nativeTexture.offset.x}};i.prototype.setUvHorizontalOffset=function(t){if(this._nativeTexture){this._nativeTexture.offset.x=t}};i.prototype.getUvVerticalOffset=function(){if(this._nativeTexture){return this._nativeTexture.offset.y}};i.prototype.setUvVerticalOffset=function(t){if(this._nativeTexture){this._nativeTexture.offset.y=t}};i.prototype.getUvHorizontalScale=function(){if(this._nativeTexture){return this._nativeTexture.repeat.x}};i.prototype.setUvHorizontalScale=function(t){if(this._nativeTexture){this._nativeTexture.repeat.x=t}};i.prototype.getUvVerticalScale=function(){if(this._nativeTexture){return this._nativeTexture.repeat.y}};i.prototype.setUvVerticalScale=function(t){if(this._nativeTexture){this._nativeTexture.repeat.y=t}};i.prototype.getUvHorizontalTilingEnabled=function(){if(this._nativeTexture){return this._nativeTexture.wrapS===e.RepeatWrapping}};i.prototype.setUvHorizontalTilingEnabled=function(t){if(this._nativeTexture){this._nativeTexture.wrapS=t?e.RepeatWrapping:e.ClampToEdgeWrapping}};i.prototype.getUvVerticalTilingEnabled=function(){if(this._nativeTexture){return this._nativeTexture.wrapT===e.RepeatWrapping}};i.prototype.setUvVerticalTilingEnabled=function(t){if(this._nativeTexture){this._nativeTexture.wrapT=t?e.RepeatWrapping:e.ClampToEdgeWrapping}};return i});