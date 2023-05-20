/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./LabelEnablement","sap/ui/base/Object","sap/ui/performance/trace/Interaction","sap/base/util/uid","sap/ui/util/ActivityDetection","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/security/encodeCSS","sap/base/assert","sap/ui/performance/Measurement","sap/base/Log","sap/base/util/extend","./InvisibleRenderer","./Patcher","./FocusHandler","sap/ui/core/Configuration"],function(e,t,n,r,i,s,a,o,l,u,f,c,d,p,h,g){"use strict";var m=["renderControl","cleanupControlWithoutRendering","accessibilityState","icon"];var y=["write","writeEscaped","writeAcceleratorKey","writeControlData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","translate","getConfiguration","getHTML"];var v=["openStart","voidStart","attr","class","style","openEnd","voidEnd","text","unsafeHtml","close"];var b=["render","flush","destroy"];var C=document.createElement("template");var S="data-sap-ui-stylekey";var E="data-sap-ui-render";function A(){var e=this,r,o,c,g,w="",I=false,D,T="",N={},_={},O=[],x=new p,j,B;function L(){l(!(j=B=""));r=e.aBuffer=[];o=e.aRenderedControls=[];c=e.aStyleStack=[{}];D=undefined;I=false;w=""}function F(e,t){r.push(" ",e,'="',t,'"')}function V(e){var t=c[c.length-1];var n;if(e){n=e.aCustomStyleClasses}else if(e===false){n=[]}else{n=t.aCustomStyleClasses}if(t.aClasses||n){var r=[].concat(t.aClasses||[],n||[]);if(r.length){F("class",r.join(" "))}}if(!e){t.aCustomStyleClasses=null}t.aClasses=null}function U(){var e=c[c.length-1];if(e.aStyle&&e.aStyle.length){F(S,O.push(e.aStyle.join(" "))-1)}e.aStyle=null}function q(e,t){l(e&&typeof e=="string"&&/^[a-z_][a-zA-Z0-9_\-]*$/.test(e),"The "+t+" name provided '"+e+"' is not valid; it must contain alphanumeric characters, hyphens or underscores")}function W(e){l(w,"There is no open tag; '"+e+"' must not be called without an open tag")}function G(e){var t=e===undefined?!w:e;l(t,"There is an open tag; '"+w+"' tag has not yet ended with '"+(I?"voidEnd":"openEnd")+"'")}function X(e){q(e,"attr");l((e!="class"||B!="class"&&(B="attr"))&&(e!="style"||j!="style"&&(j="attr")),"Attributes 'class' and 'style' must not be written when the methods with the same name"+" have been called for the same element already")}function $(e){l(B!="attr"&&(B="class"),"Method class() must not be called after the 'class' attribute has been written for the same element");l(typeof e=="string"&&!/\s/.test(e)&&arguments.length===1,"Method 'class' must be called with exactly one class name")}function z(e){l(j!="attr"&&(j="style"),"Method style() must not be called after the 'style' attribute has been written for the same element");l(e&&typeof e=="string"&&!/\s/.test(e),"Method 'style' must be called with a non-empty string name")}this.write=function(e){l(typeof e==="string"||typeof e==="number","sText must be a string or number");r.push.apply(r,arguments);return this};this.writeEscaped=function(e,t){if(e!=null){e=a(String(e));if(t){e=e.replace(/&#xa;/g,"<br>")}r.push(e)}return this};this.writeAttribute=function(e,t){l(typeof e==="string","sName must be a string");l(typeof t==="string"||typeof t==="number"||typeof t==="boolean","value must be a string, number or boolean");r.push(" ",e,'="',t,'"');return this};this.writeAttributeEscaped=function(e,t){l(typeof e==="string","sName must be a string");r.push(" ",e,'="',a(String(t)),'"');return this};this.addStyle=function(e,t){l(typeof e==="string","sName must be a string");if(t!=null&&t!=""){l(typeof t==="string"||typeof t==="number","value must be a string or number");var n=c[c.length-1];if(!n.aStyle){n.aStyle=[]}n.aStyle.push(e+": "+t+";")}return this};this.writeStyles=function(){U();return this};this.addClass=function(e){if(e){l(typeof e==="string","sName must be a string");var t=c[c.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(e)}return this};this.writeClasses=function(e){l(!e||typeof e==="boolean"||t.isA(e,"sap.ui.core.Element"),"oElement must be empty, a boolean, or an sap.ui.core.Element");V(e);return this};this.openStart=function(e,n){q(e,"tag");G();l(!(j=B=""));w=e;r.push("<"+e);if(n){if(typeof n=="string"){this.attr("id",n)}else{l(n&&t.isA(n,"sap.ui.core.Element"),"vControlOrId must be an sap.ui.core.Element");this.attr("id",n.getId());M(this,n)}}return this};this.openEnd=function(e){W("openEnd");G(!I);l(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");w="";V(e===true?false:undefined);U();r.push(">");return this};this.close=function(e){q(e,"tag");G();r.push("</"+e+">");return this};this.voidStart=function(e,t){this.openStart(e,t);I=true;return this};this.voidEnd=function(e){W("voidEnd");G(I||!w);I=false;w="";V(e?false:undefined);U();r.push(">");return this};this.unsafeHtml=function(e){G();r.push(e);return this};this.text=function(e){G();if(e!=null){e=a(String(e));r.push(e)}return this};this.attr=function(e,t){X(e);if(e=="style"){c[c.length-1].aStyle=[t]}else{r.push(" ",e,'="',a(String(t)),'"')}return this};this.class=function(e){if(e){$.apply(this,arguments);var t=c[c.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(a(e))}return this};this.style=function(e,t){z(e);if(t!=null&&t!=""){l(typeof t==="string"||typeof t==="number","value must be a string or number");var n=c[c.length-1];if(!n.aStyle){n.aStyle=[]}n.aStyle.push(e+": "+t+";")}return this};_.openStart=function(e,t){q(e,"tag");G();l(!(j=B=""));w=e;if(!t){x.openStart(e)}else if(typeof t=="string"){x.openStart(e,t)}else{x.openStart(e,t.getId());M(this,t)}return this};_.voidStart=function(e,t){this.openStart(e,t);I=true;return this};_.attr=function(e,t){X(e);W("attr");x.attr(e,t);return this};_.class=function(e){if(e){$.apply(this,arguments);W("class");x.class(e)}return this};_.style=function(e,t){z(e);W("style");x.style(e,t);return this};_.openEnd=function(e){if(e!==true){var t=c[c.length-1];var n=t.aCustomStyleClasses;if(n){n.forEach(x.class,x);t.aCustomStyleClasses=null}}W("openEnd");G(!I);l(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");w="";x.openEnd();return this};_.voidEnd=function(e){if(!e){var t=c[c.length-1];var n=t.aCustomStyleClasses;if(n){n.forEach(x.class,x);t.aCustomStyleClasses=null}}W("voidEnd");G(I||!w);I=false;w="";x.voidEnd();return this};_.text=function(e){G();if(e!=null){x.text(e)}return this};_.unsafeHtml=function(e){G();x.unsafeHtml(e);return this};_.close=function(e){q(e,"tag");G();x.close(e);return this};function J(e){g=true;try{var t=new s.Event("BeforeRendering");t.srcControl=e;e._bOnBeforeRenderingPhase=true;e._handleEvent(t)}finally{e._bOnBeforeRenderingPhase=false;g=false}}this.cleanupControlWithoutRendering=function(e){l(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return}var n=e.getDomRef();if(n){J(e);A.preserveContent(n,false,false);if(!n.hasAttribute(P)){e._bNeedsRendering=false;e.bOutput=false}}};function K(e,t){if(t){J(e)}if(e.bOutput==true){var n=e.aBindParameters;if(n&&n.length>0){var i=e.$();n.forEach(function(e){i.off(e.sEventType,e.fnProxy)})}}var s=H(e);if(s==d){d.render(D?_:N,e);e.bOutput="invisible"}else if(s&&typeof s.render==="function"){var a={};if(e.aCustomStyleClasses&&e.aCustomStyleClasses.length>0){a.aCustomStyleClasses=e.aCustomStyleClasses}c.push(a);e._bRenderingPhase=true;if(D){var l=x.getCurrentNode();s.render(_,e);if(x.getCurrentNode()==l){x.unsafeHtml("",e.getId());e.bOutput=false}else{e.bOutput=true}}else{var u=r.length;s.render(N,e);e.bOutput=r.length!=u}e._bRenderingPhase=false;c.pop()}else{f.error("The renderer for class "+e.getMetadata().getName()+" is not defined or does not define a render function! Rendering of "+e.getId()+" will be skipped!")}o.push(e);e._bNeedsRendering=false;var p=e.getUIArea();if(p){p._onControlRendered(e)}}this.renderControl=function(e){l(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return this}var n,i;var s=true;if(r.length){D=false}else if(D===undefined){J(e);s=false;i=H(e);if(A.getApiVersion(i)!=1){n=e.getDomRef()||d.getDomRef(e);if(A.isPreservedContent(n)){D=false}else{n&&h.storePatchingControlFocusInfo(n);x.setRootNode(n);D=true}}else{D=false}}else if(!T&&D){i=H(e);if(A.getApiVersion(i)==1){T=e.getId();D=false}}if(D){if(e._bNeedsRendering||!e.getParent()||x.isCreating()||!A.canSkipRendering(e)||!(n=n||e.getDomRef()||d.getDomRef(e))||n.hasAttribute(E)||n.querySelector("["+E+"]")){K(e,s)}else{x.alignWithDom(n)}}else{K(e,s);if(T&&T===e.getId()){x.unsafeHtml(r.join(""),T,ee);T="";D=true;r=[]}}return this};this.getHTML=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");var n=r;var i=r=this.aBuffer=[];this.renderControl(e);r=this.aBuffer=n;return i.join("")};function Z(e){var t,n=o.length;for(t=0;t<n;t++){o[t]._sapui_bInAfterRenderingPhase=true}g=true;try{for(t=0;t<n;t++){var r=o[t];if(r.bOutput&&r.bOutput!=="invisible"){var i=new s.Event("AfterRendering");i.srcControl=r;u.start(r.getId()+"---AfterRendering","AfterRendering of "+r.getMetadata().getName(),["rendering","after"]);r._handleEvent(i);u.end(r.getId()+"---AfterRendering")}}}finally{for(t=0;t<n;t++){delete o[t]._sapui_bInAfterRenderingPhase}g=false}try{h.restoreFocus(e)}catch(e){f.warning("Problems while restoring the focus after rendering: "+e,null)}for(t=0;t<n;t++){var r=o[t],a=r.aBindParameters,l;if(a&&a.length>0&&(l=r.getDomRef())){var c=s(l);for(var d=0;d<a.length;d++){var p=a[d];c.on(p.sEventType,p.fnProxy)}}}}function Q(e,t,n){var s;if(!D){s=h.getControlFocusInfo();var a=r.join("");if(a&&O.length){if(n instanceof SVGElement&&n.localName!="foreignObject"){C.innerHTML="<svg>"+a+"</svg>";C.replaceWith.apply(C.content.firstChild,C.content.firstChild.childNodes)}else{C.innerHTML=a}ee(C.content.childNodes);e(C.content)}else{e(a)}}else{var o=x.getRootNode();if(o.nodeType==11){s=h.getControlFocusInfo();e(o.lastChild?o:"")}else{s=h.getPatchingControlFocusInfo()}x.reset()}Z(s);L();i.refresh();if(t){t()}}function Y(e,t){var n=e.getAttribute(S);if(n!=t){return 0}e.style=O[t];e.removeAttribute(S);return 1}function ee(e){if(!O.length){return}var t=0;e.forEach(function(e){if(e.nodeType==1){t+=Y(e,t);e.querySelectorAll("["+S+"]").forEach(function(e){t+=Y(e,t)})}});O=[]}this.flush=function(e,t,r){l(typeof e==="object"&&e.ownerDocument==document,"oTargetDomNode must be a DOM element");var i=n.notifyAsyncStep();if(!t&&typeof r!=="number"&&!r){A.preserveContent(e)}Q(function(t){for(var n=0;n<o.length;n++){var i=o[n].getDomRef();if(i&&!A.isPreservedContent(i)){if(A.isInlineTemplate(i)){s(i).empty()}else{s(i).remove()}}}if(typeof r==="number"){if(r<=0){k(e,"prepend",t)}else{var a=e.children[r-1];if(a){k(a,"after",t)}else{k(e,"append",t)}}}else if(!r){s(e).html(t)}else{k(e,"append",t)}},i,e)};this.render=function(e,r){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be a control");l(typeof r==="object"&&r.ownerDocument==document,"oTargetDomNode must be a DOM element");if(g){f.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return}var i=n.notifyAsyncStep();L();this.renderControl(e);Q(function(t){if(e&&r){var n=e.getDomRef();if(!n||A.isPreservedContent(n)){n=d.getDomRef(e)||document.getElementById(R.Dummy+e.getId())}var i=n&&n.parentNode!=r;if(i){if(!A.isPreservedContent(n)){if(A.isInlineTemplate(n)){s(n).empty()}else{s(n).remove()}}if(t){k(r,"append",t)}}else{if(t){if(n){if(A.isInlineTemplate(n)){s(n).html(t)}else{k(n,"after",t);s(n).remove()}}else{k(r,"append",t)}}else{if(A.isInlineTemplate(n)){s(n).empty()}else{if(!e.getParent()||!e.getParent()._onChildRerenderedEmpty||!e.getParent()._onChildRerenderedEmpty(e,n)){s(n).remove()}}}}}},i,r)};this.destroy=function(){L()};var te={};m.forEach(function(e){N[e]=_[e]=te[e]=this[e]},this);v.forEach(function(e){N[e]=te[e]=this[e]},this);y.forEach(function(e){N[e]=te[e]=this[e]},this);b.forEach(function(e){te[e]=this[e]},this);this.getRendererInterface=function(){return N};this.getInterface=function(){return te};L()}A.prototype.getConfiguration=function(){return g};A.prototype.translate=function(e){};A.prototype.writeAcceleratorKey=function(){return this};A.prototype.writeControlData=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");this.writeElementData(e);return this};A.prototype.writeElementData=function(e){l(e&&t.isA(e,"sap.ui.core.Element"),"oElement must be an sap.ui.core.Element");this.attr("id",e.getId());M(this,e);return this};A.prototype.accessibilityState=function(n,r){if(!g.getAccessibility()){return this}if(arguments.length==1&&!t.isA(n,"sap.ui.core.Element")){r=n;n=null}var i={};if(n!=null){var s=n.getMetadata();var a=function(e,t,r){var a=s.getProperty(e);if(a&&n[a._sGetter]()===r){i[t]="true"}};var o=function(t,r){var a=s.getAssociation(t);if(a&&a.multiple){var o=n[a._sGetter]();if(t=="ariaLabelledBy"){var l=e.getReferencingLabels(n);var u=l.length;if(u){var f=[];for(var c=0;c<u;c++){if(o.indexOf(l[c])<0){f.push(l[c])}}o=f.concat(o)}}if(o.length>0){i[r]=o.join(" ")}}};a("editable","readonly",false);a("enabled","disabled",false);a("visible","hidden",false);if(e.isRequired(n)){i["required"]="true"}a("selected","selected",true);a("checked","checked",true);o("ariaDescribedBy","describedby");o("ariaLabelledBy","labelledby")}if(r){var l=function(e){var t=typeof e;return e===null||t==="number"||t==="string"||t==="boolean"};var u={};var f,c,d;for(f in r){c=r[f];if(l(c)){u[f]=c}else if(typeof c==="object"&&l(c.value)){d="";if(c.append&&(f==="describedby"||f==="labelledby")){d=i[f]?i[f]+" ":""}u[f]=d+c.value}}Object.assign(i,u)}if(t.isA(n,"sap.ui.core.Element")){var p=n.getParent();if(p&&p.enhanceAccessibilityState){var h=Object.assign({},i);p.enhanceAccessibilityState(n,i);if(i.canSkipRendering==false||i.canSkipRendering==undefined&&t.isA(n,"sap.ui.core.Control")&&A.canSkipRendering(n)&&JSON.stringify(h)!=JSON.stringify(i)){this.attr(E,"")}delete i.canSkipRendering}}for(var m in i){if(i[m]!=null&&i[m]!==""){this.attr(m==="role"?m:"aria-"+m,i[m])}}return this};A.prototype.writeAccessibilityState=A.prototype.accessibilityState;A.prototype.icon=function(e,t,n){var i=sap.ui.require("sap/ui/core/IconPool");if(!i){f.warning("Synchronous loading of IconPool due to sap.ui.core.RenderManager#icon call. "+"Ensure that 'sap/ui/core/IconPool is loaded before this function is called","SyncXHR",null,function(){return{type:"SyncXHR",name:"rendermanager-icon"}});i=sap.ui.requireSync("sap/ui/core/IconPool")}var s=i.isIconURI(e),a=false,l,u,d,p,h;if(typeof t==="string"){t=[t]}if(s){u=i.getIconInfo(e);if(!u){f.error("An unregistered icon: "+e+" is used in sap.ui.core.RenderManager's writeIcon method.");return this}if(!t){t=[]}t.push("sapUiIcon");if(!u.suppressMirroring){t.push("sapUiIconMirrorInRTL")}}if(s){this.openStart("span")}else{this.voidStart("img")}if(Array.isArray(t)){t.forEach(function(e){this.class(e)},this)}if(s){d={"data-sap-ui-icon-content":u.content,role:"presentation",title:u.text||null};this.style("font-family","'"+o(u.fontFamily)+"'")}else{d={role:"presentation",alt:"",src:e}}n=c(d,n);if(!n.id){n.id=r()}if(s){p=n.alt||n.title||u.text||u.name;h=n.id+"-label";if(n["aria-labelledby"]){a=true;n["aria-labelledby"]+=" "+h}else if(!n.hasOwnProperty("aria-label")){n["aria-label"]=p}}if(typeof n==="object"){for(l in n){if(n.hasOwnProperty(l)&&n[l]!==null){this.attr(l,n[l])}}}if(s){this.openEnd();if(a){this.openStart("span");this.style("display","none");this.attr("id",h);this.openEnd();this.text(p);this.close("span")}this.close("span")}else{this.voidEnd()}return this};A.prototype.writeIcon=A.prototype.icon;A.prototype.getRenderer=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return A.getRenderer(e)};var R=A.RenderPrefixes={Invisible:d.PlaceholderPrefix,Dummy:"sap-ui-dummy-",Temporary:"sap-ui-tmp-"};A.getRenderer=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return e.getMetadata().getRenderer()};A.forceRepaint=function(e){var t=e?window.document.getElementById(e):null;var n=typeof e=="string"?t:e;if(n){f.debug("forcing a repaint for "+(n.id||String(n)));var r=n.style.display;var i=document.activeElement;n.style.display="none";n.offsetHeight;n.style.display=r;if(document.activeElement!==i&&i){i.focus()}}};A.createInvisiblePlaceholderId=function(e){return d.createInvisiblePlaceholderId(e)};var w="sap-ui-preserve",I="sap-ui-static",P="data-sap-ui-preserve",D="data-sap-ui-area";function T(){var e=s(document.getElementById(w));if(e.length===0){e=s("<div></div>",{"aria-hidden":"true",id:w}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body)}return e}function N(e){var t=s("<div></div>",{id:R.Dummy+e.id}).addClass("sapUiHidden");if(e.hasAttribute(E)){t.attr(E,"")}t.insertBefore(e)}var _=[];A.attachPreserveContent=function(e,t){A.detachPreserveContent(e);_.push({fn:e,context:t})};A.detachPreserveContent=function(e){_=_.filter(function(t){return t.fn!==e})};A.preserveContent=function(e,t,n,r){l(typeof e==="object"&&e.ownerDocument==document,"oRootNode must be a DOM element");_.forEach(function(t){t.fn.call(t.context||A,{domNode:e})});var i=T();function a(t){while(t&&t!=e&&t.parentNode){t=t.parentNode;if(t.hasAttribute(P)){return true}if(t.hasAttribute("data-sap-ui")){break}}}function o(e,t,n){if(e===t){return true}for(var r=t.getParent();r;r=r.isA("sap.ui.core.UIComponent")?r.oContainer:r.getParent()){if(r.isA("sap.ui.core.Control")){if(!r.getVisible()){return false}var i=r.getDomRef();if(i&&!i.contains(n)){return false}}if(r===e){return true}}}function f(t){if(t.id===w||t.id===I){return}var l=t.getAttribute(P);if(l){if(r){var u=sap.ui.getCore().byId(l);if(u&&o(r,u,t)){return}}if(t===e||a(t)){N(t)}else if(u&&t.hasAttribute(E)){N(t)}h.trackFocusForPreservedElement(t);i.append(t)}else if(n&&t.id){h.trackFocusForPreservedElement(t);A.markPreservableContent(s(t),t.id);i.append(t);return}if(!t.hasAttribute(D)){var c=t.firstChild;while(c){t=c;c=c.nextSibling;if(t.nodeType===1){f(t)}}}}u.start(e.id+"---preserveContent","preserveContent for "+e.id,["rendering","preserve"]);if(t){f(e)}else{s(e).children().each(function(e,t){f(t)})}u.end(e.id+"---preserveContent")};A.findPreservedContent=function(e){l(typeof e==="string","sId must be a string");var t=T(),n=t.children("["+P+"='"+e.replace(/(:|\.)/g,"\\$1")+"']");return n};A.markPreservableContent=function(e,t){e.attr(P,t)};A.isPreservedContent=function(e){return e&&e.getAttribute(P)&&e.parentNode&&e.parentNode.id==w};A.getPreserveAreaRef=function(){return T()[0]};var O="data-sap-ui-template";A.markInlineTemplate=function(e){e.attr(O,"")};A.isInlineTemplate=function(e){return e&&e.hasAttribute(O)};A.getApiVersion=function(e){return e&&e.hasOwnProperty("apiVersion")?e.apiVersion:1};A.canSkipRendering=function(e,t){var n=this.getRenderer(e);var r=this.getApiVersion(n)==4;if(!r&&t!=2){return false}var i=r&&!e.hasRenderingDelegate();if(t){var s=e.getDomRef();if(s){s.toggleAttribute(E,!i)}}return i};function M(e,n){var r=n.getId();e.attr("data-sap-ui",r);if(t.isA(n,"sap.ui.core.Control")&&!A.canSkipRendering(n)){e.attr(E,"")}if(n.__slot){e.attr("slot",n.__slot)}n.getCustomData().forEach(function(t){var r=t._checkWriteToDom(n);if(r){e.attr(r.key.toLowerCase(),r.value)}});var i=n.getDragDropConfig().some(function(e){return e.isDraggable(n)});if(!i){var s=n.getParent();if(s&&s.getDragDropConfig){i=s.getDragDropConfig().some(function(e){return e.isDraggable(n)})}}if(i){e.attr("draggable","true");e.attr("data-sap-ui-draggable","true")}return this}var x={before:"beforebegin",prepend:"afterbegin",append:"beforeend",after:"afterend"};function k(e,t,n){if(typeof n=="string"){e.insertAdjacentHTML(x[t],n)}else{e[t](n)}}function H(e){var t=e.getMetadata();var n=!e.getVisible()&&t.getProperty("visible")._oParent.getName()=="sap.ui.core.Control";return n?d:t.getRenderer()}return A},true);