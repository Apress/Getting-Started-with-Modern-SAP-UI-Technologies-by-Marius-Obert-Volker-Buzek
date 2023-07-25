/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["./sapvbi"],function(){"use strict";VBI.GeoLocation=function(){var o={};o.vbiclass="GeoLocation";o.m_coords={};o.m_bValid=false;o.m_coords.latiude=0;o.m_coords.longitude=0;o.m_coords.altitude=0;o.m_coords.accuracy=0;o.m_coords.altiudeAccuracy=0;o.m_coords.heading=0;o.m_coords.speed=0;o.m_timestamp=0;o.m_watch=null;o.OnError=function(o){jQuery.sap.log.debug("GeoLocation.OnError: "+(typeof o=="string"?o:"unknown"))};o.OnPosition=function(t){o.m_coords.latiude=t.coords.latitude*Math.PI/180;o.m_coords.longitude=t.coords.longitude*Math.PI/180;o.m_coords.altitude=t.coords.altitude;o.m_coords.accuracy=t.coords.accuracy;o.m_coords.altiudeAccuracy=t.coords.altiudeAccuracy;o.m_coords.heading=t.coords.heading;o.m_coords.speed=t.coords.speed;o.m_timestamp=t.timestamp;o.m_bValid=true;o.OnPositionChanged(o)};o.StartWatch=function(){if(o.watch){return}if(!navigator){return}o.m_watch=navigator.geolocation.watchPosition(o.OnPosition,o.OnError);return};o.StopWatch=function(){if(o.watch){navigator.geolocation.clearWatch(o.watch)}o.watch=null};o.GetWifiScan=function(o,t){var c=VBI.Utilities.CreateWifiObject();if(c){return c.ScanWifi("Scan "+t+","+o,0)}return null};o.OnPositionChanged=null;return o}});