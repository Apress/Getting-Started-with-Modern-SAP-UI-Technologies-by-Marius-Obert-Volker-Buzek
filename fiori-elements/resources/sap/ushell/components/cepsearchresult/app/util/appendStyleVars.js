// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/theming/Parameters","sap/ui/core/Core"],function(e,r){"use strict";var t=[];function n(r,n){var o=e.get({name:r});if(typeof o==="string"){var i=o;o={};o[r[0]]=i}if(n){t=[]}for(var a in o){if(t.indexOf(a)===-1){t.push(a);document.body.style.setProperty("--"+a,o[a])}}}r.attachThemeChanged(function(){for(var e=0;e<t.length;e++){document.body.style.removeProperty("--"+t[e])}n(t,true)});return n});