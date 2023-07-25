/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/test/matchers/Matcher"],function(e,t){"use strict";var r=e.getLogger("sap.ui.test.matchers.Sibling");var i=new t;return function(e,t){return function(a){if(!e){r.debug("No sibling was defined so no controls will be filtered.");return true}var s=false;var o;if(typeof e==="string"){var l=i._getApplicationWindow();o=l.sap.ui.getCore().byId(e)}else{o=e}if(t&&t.useDom){var g=-1;var u=-1;var f=o.getDomRef().parentNode;for(var d=0;d<f.children.length;d+=1){var b=f.children[d].getAttribute("data-sap-ui");if(b===o.getId()){g=d}if(b===a.getId()){u=d}}if(u>-1){if(t.prev){if(u<g){s=true}else{r.debug("Control '"+a+"' has sibling '"+o+"' but it isn't ordered before the sibling")}}else if(t.next){if(u>g){s=true}else{r.debug("Control '"+a+"' has sibling '"+o+"' but it isn't ordered after the sibling")}}else{r.debug("Sibling order should be defined")}}}else{var v=o.getParent();var c=0;var h=t&&t.level>=0&&t.level||Number.MAX_SAFE_INTEGER;while(c<h&&v&&!s){var p=n(v.mAggregations);p.forEach(function(e){if(e!==o){if(e===a){s=true}else{if(n(e.mAggregations).includes(a)){s=true}}}});c+=1;v=v.getParent()}}r.debug("Control '"+a+"' "+(s?"has":"does not have")+" sibling '"+o);return s}};function n(e){var t=[];for(var r in e){var i=e[r];if(Array.isArray(i)){t=t.concat(i.slice(0,20))}else if(i){t.push(i)}}t=t.filter(function(e){return e.getMetadata&&e.getMetadata().getName()&&e.$().length});return t}},true);