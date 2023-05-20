/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/core/ComponentContainer","sap/ui/core/library","sap/base/Log","sap/base/util/ObjectPath","sap/base/strings/camelize"],function(e,t,n,r,a,o){"use strict";var i=n.ComponentLifecycle;var u=t.getMetadata();var p=function(){};p.run=function(){var e=p._find();for(var n=0,a=e.length;n<a;n++){var o=e[n];r.debug("Parsing element "+o.outerHTML,"","sap/ui/core/ComponentSupport");var i=p._parse(o);p._applyDefaultSettings(i);r.debug("Creating ComponentContainer with the following settings",JSON.stringify(i,0,2),"sap/ui/core/ComponentSupport");new t(i).placeAt(o);o.removeAttribute("data-sap-ui-component")}};p._find=function(){return document.querySelectorAll("[data-sap-ui-component]")};p._parse=function(t){var n={};for(var i=0,p=t.attributes.length;i<p;i++){var s=t.attributes[i];var f=/^data-((?!sap-ui-component).+)/g.exec(s.name);if(f){var c=o(f[1]);var l=s.value;if(c!=="id"){var m=u.getProperty(c);var d=!m&&u.getEvent(c);if(!m&&!d){r.warning('Property or event "'+c+'" will be ignored as it does not exist in sap.ui.core.ComponentContainer');continue}if(m){var g=e.getType(m.type);if(!g){throw new Error('Property "'+m.name+'" has no known type')}l=g.parseValue(l)}else if(d){var v=a.get(l);if(typeof v!=="function"){throw new Error('Callback handler for event "'+d.name+'" not found')}l=v}}n[c]=l}}return n};p._applyDefaultSettings=function(e){e.async=true;if(e.manifest===undefined||e.manifest==="true"){e.manifest=true}else if(e.manifest==="false"){r.error('Ignoring "manifest=false" for ComponentContainer of component "'+e.name+'" as it is not supported by ComponentSupport. '+'Forcing "manifest=true"',"","sap/ui/core/ComponentSupport");e.manifest=true}e.lifecycle=e.lifecycle===undefined?i.Container:e.lifecycle;e.autoPrefixId=e.autoPrefixId===undefined?true:e.autoPrefixId};p.run();return p});