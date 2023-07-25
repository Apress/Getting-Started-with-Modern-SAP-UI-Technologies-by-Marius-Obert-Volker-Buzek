/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["./sapvbi"],function(){"use strict";VBI.MapManager=function(){var e={};e.vbiclass="MapManager";e.m_nRequest=0;e.m_tileWidth=256;e.m_tileHeight=256;e.m_runningRequests=0;e.m_runningXhrRequests=0;e.m_limitRequests=12;e.m_requestQueue=[];e.m_renderQueue=[];e.m_renderRequestID=0;e.m_failedSendTimer=0;e.m_renderJunksize=100;e._modifyReqCounters=function(r,t){if(r.m_Headers){e.m_runningXhrRequests+=t}else{e.m_runningRequests+=t}if(VBI.m_bTrace){VBI.Trace("Running Requests - Xhr: "+e.m_runningXhrRequests+", src: "+e.m_runningRequests)}};e.onAbort=function(r){var t=r.srcElement;if(VBI.m_bTrace){VBI.Trace("onAbort "+t.src)}e._modifyReqCounters(t,-1);e.CheckReqQueue();e.UnlinkImage(t);e.CheckTmpCanvas(t.m_Target,t.m_nRequest,t.m_nLayersAbove)};e.onFailedSend=function(r){if(VBI.m_bTrace){VBI.Trace("onFailedSend "+r.src)}e._modifyReqCounters(r,-1);e.m_bRequestError=true;if(!e.m_failedSendTimer){e.m_failedSendTimer=setInterval(function(){e.RetrySending()},750)}};e.onError=function(r){var t=r.srcElement;if(VBI.m_bTrace){VBI.Trace("onError "+t.src)}e._modifyReqCounters(t,-1);e.CheckReqQueue();var n=null;if(t.m_Next!=null){t.m_Next.m_FillStyle=t.m_FillStyle}if(t.m_Prev==null&&t.m_Next!=null&&t.m_Next.complete==true){n=t.m_Next}e.UnlinkImage(t);if(n!=null){e.m_renderQueue.push(n);if(!e.m_renderRequestID){e.m_renderRequestID=window.requestAnimationFrame(e.RenderTiles)}}else{e.CheckTmpCanvas(t.m_Target,t.m_nRequest,t.m_nLayersAbove)}};e.onLoad=function(r){var t=r.target;if(!t.complete){return}if(t.m_Headers){(window.URL||window.webkitURL).revokeObjectURL(t.src)}if(VBI.m_bTrace){VBI.Trace("VBI.MapManager: onLoad "+(t.m_Headers?"(xhr) ":" ")+(t.m_Headers?t.src2execute:t.src))}e._modifyReqCounters(t,-1);e.CheckReqQueue();var n=true;var a;for(a=t.m_Prev;a!=null;a=a.m_Prev){n&=a.complete}for(a=t.m_Next;a!=null;a=a.m_Next){n&=a.complete}if(!n){if(VBI.m_bTrace){VBI.Trace("VBI.MapManager: onLoad skip as there is a a not yet loaded tile ")}return}e.m_renderQueue.push(t);if(!e.m_renderRequestID){e.m_renderRequestID=window.requestAnimationFrame(e.RenderTiles)}};e.RetrySending=function(){clearInterval(e.m_failedSendTimer);e.m_failedSendTimer=0;e.m_bRequestError=false;e.CheckReqQueue()};e.CheckReqQueue=function(){while(e.m_requestQueue.length&&!e.m_bRequestError){var r=e.m_requestQueue.shift();var t=r.m_Target;if(r.m_nLOD!=t.m_nCurrentLOD||t.m_bInvalid){e.UnlinkImage(r);e.CheckTmpCanvas(t,r.m_nRequest,r.m_nLayersAbove)}else{try{if(r.m_Headers){e._createHttpRequest(r)}else{e.m_bRequestError=false;e._modifyReqCounters(r,1);r.src=r.src2execute}}catch(t){e.m_requestQueue.unshift(r);e.onFailedSend(r)}return}}};e.RenderTiles=function(){var r=Math.min(e.m_renderQueue.length,e.m_renderJunksize);for(var t=0;t<r;++t){e.RenderTile(e.m_renderQueue.shift())}e.m_renderRequestID=e.m_renderQueue.length>0?window.requestAnimationFrame(e.RenderTiles):0};e.RenderTile=function(r){if(!r.bRendered){var t=r.m_Target;if(t.m_CanvasRedirect!=undefined&&t.m_CanvasRedirRequest==r.m_nRequest){t=t.m_CanvasRedirect}var n=t.m_Scene;if(!n){return}var a=t.getPixelWidth();var m=t.getPixelHeight();t.m_nAppliedRequest=Math.max(t.m_nAppliedRequest,r.m_nRequest);var i=t.getContext("2d");var s=1<<i.canvas.m_nCurrentLOD;var _=((r.m_nReqX-i.canvas.m_nCurrentX)%s+s)%s;if(s<n.m_nTilesX){_=r.m_nCol+r.m_nXOrigin-i.canvas.m_nCurrentX}var o=r.m_nReqY-i.canvas.m_nCurrentY;if(r.m_bOutdated||_<0||o<0||_>=r.m_numCol||o>=r.m_numRow||(r.m_nLOD!=t.m_nCurrentLOD||t.m_bInvalid)){e.UnlinkImage(r);if(VBI.m_bTrace){VBI.Trace("VBI.MapManager: RenderTile  "+r.src+" is outdated")}e.CheckTmpCanvas(t,r.m_nRequest,r.m_nLayersAbove);return}if(VBI.m_bTrace){VBI.Trace("VBI.MapManager: RenderTile  "+r.src)}var u=n.m_nWidthCanvas;var l=n.m_nHeightCanvas;t.setPixelWidth(u);t.setPixelHeight(l);var c=u/n.m_nTilesX;var d=l/n.m_nTilesY;var f=_*c;var v=o*d;var g=r.m_nXExpansion*c;var h=r.m_nYExpansion*d;var R=r;var I;while(R.m_Prev!=null){R=R.m_Prev}while(R!=null&&R.complete==true){if(R.m_FillStyle!=null){if(VBI.m_bTrace){VBI.Trace("RenderTile fillRect "+R.src)}I=i.fillStyle;i.fillStyle=R.m_FillStyle;i.fillRect(f,v,g,h);i.fillStyle=I}if(VBI.m_bTrace){VBI.Trace("RenderTile drawImage "+R.src)}i.globalAlpha=R.m_Opacity;i.drawImage(R,f,v,g,h);R.bRendered=true;if(R.m_Next!=null){R.m_Next.m_Prev=null}R=R.m_Next}if(VBI.m_bTrace){I=i.fillStyle;i.fillStyle="#FF0000";i.font="18px Arial";i.fillText(r.m_nRequest+"."+r.m_nCount+":"+r.m_nLOD+"/"+r.m_nReqX+"/"+r.m_nReqY+"@("+f/256+","+v/256+")",f+10,v+30);i.fillStyle=I}t.setPixelWidth(a);t.setPixelHeight(m);if(t.onTileLoaded){t.onTileLoaded(r)}i.globalAlpha=1;e.CheckTmpCanvas(t,r.m_nRequest,0);if(n.m_Ctx.moThumbnail){n.Copy2Thumbnail()}}};e.CheckTmpCanvas=function(e,r,t){if(e.m_nTilesBefSwitch!=undefined&&e.m_nRequest==r&&!t){e.m_nTilesBefSwitch--;if(!e.m_nTilesBefSwitch){e.m_Scene.SwitchTmpCanvasToActive()}}};e.RequestTiles=function(r,t,n,a,m,i,s,_,o,u,l,c){e.m_bRequestError=false;if(l<0){return false}var d=r.m_Scene;if(!t||d.AnimZoomTarget&&Math.abs(d.AnimZoomTarget-l)>d.m_nMaxAnimLodDiff){r.m_nCurrentX=n;r.m_nCurrentY=a;r.m_nCurrentLOD=l;return false}var f=0;var v=1<<l;var g=d.m_Proj.m_nXYRatio;var h=v*g;var R=2/v;if(c){var I=r.getContext("2d");I.fillStyle="white";I.clearRect(0,0,I.canvas.width,I.canvas.height)}var T=t.m_MapLayerArray;r.m_nRequest=e.m_nRequest++;r.m_bInvalid=false;r.m_nCurrentX=n;r.m_nCurrentY=a;r.m_nCurrentLOD=l;var p,q,b,C=1;var x=a;if(t.m_bSingleBMP){q=1;x=Math.max(0,a);b=Math.min(i-_-u,v-x)}else{q=i-_-u;b=1}var w=T.length;p=m-s-o;for(var y=0;y<p;++y){C--;if(!C){for(var L=0;L<q;++L){f++;var B=null;var M=null;var S=(n+s+y)%h;if(S<0){S=h+S}var V=x+_+L;if(V+b<=0||V>=v){if(r.m_nTilesBefSwitch!=undefined&&r.m_nTilesBefSwitch>0){r.m_nTilesBefSwitch--}continue}C=t.m_bSingleBMP?Math.min(h-S,p-y):1;for(var O=0;O<w;++O){var P=T[O];if(t.fillStyle){M=t.fillStyle}else if(t.m_colBkgnd){M=t.m_colBkgnd}if(P.GetMinLOD()>l||P.GetMaxLOD()<l){continue}var k=new Image;k.m_nLayersAbove=w-O-1;k.m_nXOrigin=n;k.m_nYOrigin=a;k.m_nCol=y+s;k.m_nRow=L+_;k.m_numCol=m;k.m_numRow=i;k.m_Target=r;k.m_nRequest=r.m_nRequest;k.m_Opacity=P.m_fOpacity;k.m_bOutdated=false;k.m_Prev=B;if(B!=null){B.m_Next=k}if(k.m_Prev==null){k.m_FillStyle=M}k.m_nReqX=S;k.m_nReqY=V;k.m_nXExpansion=C;k.m_nYExpansion=b;k.m_nLOD=l;var H=P.GetMapProvider();var D;if(H.m_bPosRequired){var A=[S*R/g-1,V*R-1];var Q=[(S+C)*R/g-1,(V+b)*R-1];D=H.CombineUrlWPos(S,V,l,R,A,Q,C,b,e.m_requestTileWidth,e.m_requestTileHeight)}else{D=H.CombineUrl(S,V,l)}k.onload=e.onLoad;k.onerror=e.onError;k.onabort=e.onAbort;if(H.m_Headers&&D.substring(0,5).toLowerCase()!="data:"){k.m_Headers=H.m_Headers;k.src2execute=D;e._createHttpRequest(k)}else if(e.m_runningRequests<e.m_limitRequests&&!e.m_bRequestError){try{e._modifyReqCounters(k,1);k.src=D}catch(r){k.src2execute=D;e.m_requestQueue.push(k);e.onFailedSend(k)}}else{k.src2execute=D;e.m_requestQueue.push(k)}k.m_nCount=f;if(VBI.m_bTrace){VBI.Trace("RequestTiles "+D)}B=k}}}}return true};e.UnlinkImage=function(e){var r;for(r=e.m_Prev;r;r=r.m_Prev){r.m_bOutdated=true}for(r=e.m_Next;r;r=r.m_Next){r.m_bOutdated=true}var t=e.m_Prev;var n=e.m_Next;if(t!=null){e.m_Prev.m_Next=n;e.m_Prev=null}if(n!=null){e.m_Next.m_Prev=t;e.m_Next=null}};e.GetPreviewImage=function(r,t,n,a,m,i){if(!i||!a||!r||!n||!t||!m){return}var s=Math.min(Math.max(n,m.GetMinLOD()),m.GetMaxLOD());n=Math.floor(s);var _=m.m_MapManager.m_tileWidth;var o=m.m_MapManager.m_tileHeight;var u=m.m_Proj.m_nXYRatio;var l=1<<n;var c=2/l;var d=VBI.MathLib.DegToRad([parseFloat(r),parseFloat(t)]);var f=[l*_,l*o];m.m_Proj.LonLatToUCS(d,f);var v=Math.floor(f[0]/_);var g=Math.floor(f[1]/o);var h=a.m_MapLayerArray;var R={m_Callback:i,m_Images:[],m_ImagesRemain:h.length,m_MapLayerStack:a,compose:function(){this.m_ImagesRemain-=1;if(this.m_ImagesRemain<=0){var e=document.createElement("canvas");R=e.getContext("2d");var r=this.m_MapLayerStack.m_colBkgnd;R.fillStyle=r;R.fillRect(0,0,e.width,e.height);for(var t=0;t<this.m_Images.length;++t){if(this.m_Images[t]){R.globalAlpha=this.m_Images[t].m_Opacity;var n=0;var a=0;var m=this.m_Images[t].width;var s=this.m_Images[t].height;var _=0;var o=0;var u=e.width;var l=e.height;R.drawImage(this.m_Images[t],n,a,m,s,_,o,u,l)}}var c=new Image;c.src=e.toDataURL();i(c)}}};var I=function(e){if(VBI.m_bTrace){VBI.Trace("onLoad "+e.target.src)}var r=e.target;if(r.m_Headers){(window.URL||window.webkitURL).revokeObjectURL(r.src)}r.m_Context.compose()};var T=function(e){if(VBI.m_bTrace){VBI.Trace("onAbort "+e.target.src)}var r=e.target;r.m_Context.m_Images[r.m_Index]=null;r.m_Context.compose()};var p=function(e){if(VBI.m_bTrace){VBI.Trace("onError "+e.target.src)}var r=e.target;r.m_Context.m_Images[r.m_Index]=null;r.m_Context.compose()};for(var q=0;q<h.length;++q){var b=h[q];var C=b.GetMapProvider();if(b.GetMinLOD()>n||b.GetMaxLOD()<n){continue}var x;if(C.m_bPosRequired){var w=[v*c/u-1,g*c-1];var y=[(v+1)*c/u-1,(g+1)*c-1];x=C.CombineUrlWPos(v,g,n,c,w,y,1,1,_,o)}else{x=C.CombineUrl(v,g,n)}var L=new Image;L.setAttribute("crossOrigin","anonymous");R.m_Images[q]=L;L.m_Index=q;L.m_Context=R;if(b.m_fOpacity){L.m_Opacity=b.m_fOpacity}L.onload=I;L.onabort=T;L.onerror=p;try{if(C.m_Headers&&x.substring(0,5).toLowerCase()!="data:"){L.m_Headers=C.m_Headers;L.src2execute=x;e._createHttpRequest(L,true)}else{L.src=x}}catch(e){if(VBI.m_bTrace){VBI.Trace("GetPreviewImage "+e)}L.m_Context.m_Images[L.m_Index]=null;L.m_Context.compose()}}};e._createHttpRequest=function(r,t){if(t||e.m_runningXhrRequests<e.m_limitRequests){if(!t){e._modifyReqCounters(r,1)}var n=typeof window.sinon==="object"&&window.sinon.xhr&&window.sinon.xhr.XMLHttpRequest?window.sinon.xhr.XMLHttpRequest:XMLHttpRequest;var a=new n;a.m_Image=r;a.onerror=function(e){if(this.m_Image&&this.m_Image.onerror){this.m_Image.onerror({srcElement:this.m_Image,target:this.m_Image})}jQuery.sap.log.error("Download error: "+this.statusText)};if(!t){a.onprogress=function(e){if(this.m_Image&&this.m_Image.m_bOutdated){this.abort();this.m_Image.onabort({srcElement:this.m_Image});jQuery.sap.log.error("Download error: image outdated")}}}a.onload=function(r){if(this.status===200||this.status===0){var n=this.getResponseHeader("Content-Type");if(n.split("/")[0]=="image"){this.m_Image.src=(window.URL||window.webkitURL).createObjectURL(this.response)}else{this.m_Image.onerror({srcElement:this.m_Image,target:this.m_Image});jQuery.sap.log.error("Download error: image response type expected. Recieved: "+n)}}else{if(t){this.m_Image.onerror({target:this.m_Image})}else{if(this.m_Image&&!this.m_Image.m_bOutdated){e.m_requestQueue.push(this.m_Image)}e.onFailedSend(this.m_Image)}jQuery.sap.log.error("Download error: "+this.statusText)}};a.open("GET",r.src2execute,true);r.m_Headers.forEach(function(e){a.setRequestHeader(e.name,e.value)});a.responseType="blob";a.send(null)}else{e.m_requestQueue.push(r);return}};return e}()});