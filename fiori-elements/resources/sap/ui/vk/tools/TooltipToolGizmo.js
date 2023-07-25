/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Gizmo","./TooltipToolGizmoRenderer"],function(t,o){"use strict";var e=t.extend("sap.ui.vk.tools.TooltipToolGizmo",{metadata:{library:"sap.ui.vk"}});e.prototype.init=function(){if(t.prototype.init){t.prototype.init.apply(this)}this._viewport=null;this._tool=null;this._previousNodeRef=null};e.prototype.show=function(t,o){this._viewport=t;this._tool=o;var e=this.getDomRef();if(e){e.style.display="none"}};e.prototype.hide=function(){this._tool=null;var t=this.getDomRef();if(t){t.style.display="none"}};e.prototype.setTitle=function(t){var o=this.getDomRef();if(o){o.style.display=t?"block":"none";o.innerText=t}};e.prototype.update=function(t,o,e,i,n){if(!this._tool.getFollowCursor()){if(n===this._previousNodeRef){return}else{this._previousNodeRef=n}}if(this._tool.fireEvent("hover",{x:t,y:o,nodeRef:n},true)){var r=this.getDomRef();if(r){var s=r.offsetParent;while(s){e-=s.offsetLeft||0;i-=s.offsetTop||0;s=s.offsetParent}e+=this._tool.getOffsetX();i+=this._tool.getOffsetY();r.style.left=Math.round(e)+"px";r.style.top=Math.round(i)+"px";var f=this._viewport.getDomRef().getBoundingClientRect();var l=r.getBoundingClientRect();if(l.right>f.right){r.style.left=Math.round(e+f.right-l.right)+"px"}if(l.bottom>f.bottom){r.style.top=Math.round(i+f.bottom-l.bottom)+"px"}}}};e.prototype.onBeforeRendering=function(){};e.prototype.onAfterRendering=function(){};return e});