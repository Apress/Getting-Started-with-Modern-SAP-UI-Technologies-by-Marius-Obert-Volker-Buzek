/*

The Unlicense / PUBLIC DOMAIN

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to http://unlicense.org/

*/
(function(){"use strict";function e(){var e=this;this.versionnumber="1.2.6",this.imageToSVG=function(t,n,s){s=e.checkoptions(s);e.loadImage(t,function(t){n(e.imagedataToSVG(e.getImgdata(t),s))},s)},this.imagedataToSVG=function(t,n){n=e.checkoptions(n);var s=e.imagedataToTracedata(t,n);return e.getsvgstring(s,n)},this.imageToTracedata=function(t,n,s){s=e.checkoptions(s);e.loadImage(t,function(t){n(e.imagedataToTracedata(e.getImgdata(t),s))},s)},this.imagedataToTracedata=function(t,n){n=e.checkoptions(n);var s=e.colorquantization(t,n);if(n.layering===0){var r={layers:[],palette:s.palette,width:s.array[0].length-2,height:s.array.length-2};for(var a=0;a<s.palette.length;a++){var o=e.batchtracepaths(e.internodes(e.pathscan(e.layeringstep(s,a),n.pathomit),n),n.ltres,n.qtres);r.layers.push(o)}}else{var i=e.layering(s);if(n.layercontainerid){e.drawLayers(i,e.specpalette,n.scale,n.layercontainerid)}var l=e.batchpathscan(i,n.pathomit);var c=e.batchinternodes(l,n);var r={layers:e.batchtracelayers(c,n.ltres,n.qtres),palette:s.palette,width:t.width,height:t.height}}return r},this.optionpresets={default:{corsenabled:false,ltres:1,qtres:1,pathomit:8,rightangleenhance:true,colorsampling:2,numberofcolors:16,mincolorratio:0,colorquantcycles:3,layering:0,strokewidth:1,linefilter:false,scale:1,roundcoords:1,viewbox:false,desc:false,lcpr:0,qcpr:0,blurradius:0,blurdelta:20},posterized1:{colorsampling:0,numberofcolors:2},posterized2:{numberofcolors:4,blurradius:5},curvy:{ltres:.01,linefilter:true,rightangleenhance:false},sharp:{qtres:.01,linefilter:false},detailed:{pathomit:0,roundcoords:2,ltres:.5,qtres:.5,numberofcolors:64},smoothed:{blurradius:5,blurdelta:64},grayscale:{colorsampling:0,colorquantcycles:1,numberofcolors:7},fixedpalette:{colorsampling:0,colorquantcycles:1,numberofcolors:27},randomsampling1:{colorsampling:1,numberofcolors:8},randomsampling2:{colorsampling:1,numberofcolors:64},artistic1:{colorsampling:0,colorquantcycles:1,pathomit:0,blurradius:5,blurdelta:64,ltres:.01,linefilter:true,numberofcolors:16,strokewidth:2},artistic2:{qtres:.01,colorsampling:0,colorquantcycles:1,numberofcolors:4,strokewidth:0},artistic3:{qtres:10,ltres:10,numberofcolors:8},artistic4:{qtres:10,ltres:10,numberofcolors:64,blurradius:5,blurdelta:256,strokewidth:2},posterized3:{ltres:1,qtres:1,pathomit:20,rightangleenhance:true,colorsampling:0,numberofcolors:3,mincolorratio:0,colorquantcycles:3,blurradius:3,blurdelta:20,strokewidth:0,linefilter:false,roundcoords:1,pal:[{r:0,g:0,b:100,a:255},{r:255,g:255,b:255,a:255}]}},this.checkoptions=function(t){t=t||{};if(typeof t==="string"){t=t.toLowerCase();if(e.optionpresets[t]){t=e.optionpresets[t]}else{t={}}}var n=Object.keys(e.optionpresets["default"]);for(var s=0;s<n.length;s++){if(!t.hasOwnProperty(n[s])){t[n[s]]=e.optionpresets["default"][n[s]]}}return t},this.colorquantization=function(t,n){var s=[],r=0,a,o,i,l=[],c=t.width*t.height,h,g,d,p,f;if(t.data.length<c*4){var u=new Uint8ClampedArray(c*4);for(var m=0;m<c;m++){u[m*4]=t.data[m*3];u[m*4+1]=t.data[m*3+1];u[m*4+2]=t.data[m*3+2];u[m*4+3]=255}t.data=u}for(g=0;g<t.height+2;g++){s[g]=[];for(h=0;h<t.width+2;h++){s[g][h]=-1}}if(n.pal){f=n.pal}else if(n.colorsampling===0){f=e.generatepalette(n.numberofcolors)}else if(n.colorsampling===1){f=e.samplepalette(n.numberofcolors,t)}else{f=e.samplepalette2(n.numberofcolors,t)}if(n.blurradius>0){t=e.blur(t,n.blurradius,n.blurdelta)}for(p=0;p<n.colorquantcycles;p++){if(p>0){for(d=0;d<f.length;d++){if(l[d].n>0){f[d]={r:Math.floor(l[d].r/l[d].n),g:Math.floor(l[d].g/l[d].n),b:Math.floor(l[d].b/l[d].n),a:Math.floor(l[d].a/l[d].n)}}if(l[d].n/c<n.mincolorratio&&p<n.colorquantcycles-1){f[d]={r:Math.floor(Math.random()*255),g:Math.floor(Math.random()*255),b:Math.floor(Math.random()*255),a:Math.floor(Math.random()*255)}}}}for(h=0;h<f.length;h++){l[h]={r:0,g:0,b:0,a:0,n:0}}for(g=0;g<t.height;g++){for(h=0;h<t.width;h++){r=(g*t.width+h)*4;i=0;o=1024;for(d=0;d<f.length;d++){a=Math.abs(f[d].r-t.data[r])+Math.abs(f[d].g-t.data[r+1])+Math.abs(f[d].b-t.data[r+2])+Math.abs(f[d].a-t.data[r+3]);if(a<o){o=a;i=d}}l[i].r+=t.data[r];l[i].g+=t.data[r+1];l[i].b+=t.data[r+2];l[i].a+=t.data[r+3];l[i].n++;s[g+1][h+1]=i}}}return{array:s,palette:f}},this.samplepalette=function(e,t){var n,s=[];for(var r=0;r<e;r++){n=Math.floor(Math.random()*t.data.length/4)*4;s.push({r:t.data[n],g:t.data[n+1],b:t.data[n+2],a:t.data[n+3]})}return s},this.samplepalette2=function(e,t){var n,s=[],r=Math.ceil(Math.sqrt(e)),a=Math.ceil(e/r),o=t.width/(r+1),i=t.height/(a+1);for(var l=0;l<a;l++){for(var c=0;c<r;c++){if(s.length===e){break}else{n=Math.floor((l+1)*i*t.width+(c+1)*o)*4;s.push({r:t.data[n],g:t.data[n+1],b:t.data[n+2],a:t.data[n+3]})}}}return s},this.generatepalette=function(e){var t=[],n,s,r;if(e<8){var a=Math.floor(255/(e-1));for(var o=0;o<e;o++){t.push({r:o*a,g:o*a,b:o*a,a:255})}}else{var i=Math.floor(Math.pow(e,1/3)),l=Math.floor(255/(i-1)),c=e-i*i*i;for(n=0;n<i;n++){for(s=0;s<i;s++){for(r=0;r<i;r++){t.push({r:n*l,g:s*l,b:r*l,a:255})}}}for(n=0;n<c;n++){t.push({r:Math.floor(Math.random()*255),g:Math.floor(Math.random()*255),b:Math.floor(Math.random()*255),a:Math.floor(Math.random()*255)})}}return t},this.layering=function(e){var t=[],n=0,s=e.array.length,r=e.array[0].length,a,o,i,l,c,h,g,d,p,f,u;for(u=0;u<e.palette.length;u++){t[u]=[];for(f=0;f<s;f++){t[u][f]=[];for(p=0;p<r;p++){t[u][f][p]=0}}}for(f=1;f<s-1;f++){for(p=1;p<r-1;p++){n=e.array[f][p];a=e.array[f-1][p-1]===n?1:0;o=e.array[f-1][p]===n?1:0;i=e.array[f-1][p+1]===n?1:0;l=e.array[f][p-1]===n?1:0;c=e.array[f][p+1]===n?1:0;h=e.array[f+1][p-1]===n?1:0;g=e.array[f+1][p]===n?1:0;d=e.array[f+1][p+1]===n?1:0;t[n][f+1][p+1]=1+c*2+d*4+g*8;if(!l){t[n][f+1][p]=0+2+g*4+h*8}if(!o){t[n][f][p+1]=0+i*2+c*4+8}if(!a){t[n][f][p]=0+o*2+4+l*8}}}return t},this.layeringstep=function(e,t){var n=[],s=0,r=e.array.length,a=e.array[0].length,o,i,l,c,h,g,d,p,f,u,m;for(u=0;u<r;u++){n[u]=[];for(f=0;f<a;f++){n[u][f]=0}}for(u=1;u<r;u++){for(f=1;f<a;f++){n[u][f]=(e.array[u-1][f-1]===t?1:0)+(e.array[u-1][f]===t?2:0)+(e.array[u][f-1]===t?8:0)+(e.array[u][f]===t?4:0)}}return n},this.pointinpoly=function(e,t){var n=false;for(var s=0,r=t.length-1;s<t.length;r=s++){n=t[s].y>e.y!==t[r].y>e.y&&e.x<(t[r].x-t[s].x)*(e.y-t[s].y)/(t[r].y-t[s].y)+t[s].x?!n:n}return n},this.pathscan_combined_lookup=[[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[13,3,0,1],[13,2,-1,0],[7,1,0,-1],[7,0,1,0]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[11,1,0,-1],[14,0,1,0],[14,3,0,1],[11,2,-1,0]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]]],this.pathscan=function(t,n){var s=[],r=0,a=0,o=0,i=0,l=t[0].length,c=t.length,h=0,g=true,d=false,p;for(var f=0;f<c;f++){for(var u=0;u<l;u++){if(t[f][u]==4||t[f][u]==11){o=u;i=f;s[r]={};s[r].points=[];s[r].boundingbox=[o,i,o,i];s[r].holechildren=[];g=false;a=0;d=t[f][u]==11;h=1;while(!g){s[r].points[a]={};s[r].points[a].x=o-1;s[r].points[a].y=i-1;s[r].points[a].t=t[i][o];if(o-1<s[r].boundingbox[0]){s[r].boundingbox[0]=o-1}if(o-1>s[r].boundingbox[2]){s[r].boundingbox[2]=o-1}if(i-1<s[r].boundingbox[1]){s[r].boundingbox[1]=i-1}if(i-1>s[r].boundingbox[3]){s[r].boundingbox[3]=i-1}p=e.pathscan_combined_lookup[t[i][o]][h];t[i][o]=p[0];h=p[1];o+=p[2];i+=p[3];if(o-1===s[r].points[0].x&&i-1===s[r].points[0].y){g=true;if(s[r].points.length<n){s.pop()}else{s[r].isholepath=d?true:false;if(d){var m=0,y=[-1,-1,l+1,c+1];for(var b=0;b<r;b++){if(!s[b].isholepath&&e.boundingboxincludes(s[b].boundingbox,s[r].boundingbox)&&e.boundingboxincludes(y,s[b].boundingbox)&&e.pointinpoly(s[r].points[0],s[b].points)){m=b;y=s[b].boundingbox}}s[m].holechildren.push(r)}r++}}a++}}}}return s},this.boundingboxincludes=function(e,t){return e[0]<t[0]&&e[1]<t[1]&&e[2]>t[2]&&e[3]>t[3]},this.batchpathscan=function(t,n){var s=[];for(var r in t){if(!t.hasOwnProperty(r)){continue}s[r]=e.pathscan(t[r],n)}return s},this.internodes=function(t,n){var s=[],r=0,a=0,o=0,i=0,l=0,c,h;for(c=0;c<t.length;c++){s[c]={};s[c].points=[];s[c].boundingbox=t[c].boundingbox;s[c].holechildren=t[c].holechildren;s[c].isholepath=t[c].isholepath;r=t[c].points.length;for(h=0;h<r;h++){a=(h+1)%r;o=(h+2)%r;i=(h-1+r)%r;l=(h-2+r)%r;if(n.rightangleenhance&&e.testrightangle(t[c],l,i,h,a,o)){if(s[c].points.length>0){s[c].points[s[c].points.length-1].linesegment=e.getdirection(s[c].points[s[c].points.length-1].x,s[c].points[s[c].points.length-1].y,t[c].points[h].x,t[c].points[h].y)}s[c].points.push({x:t[c].points[h].x,y:t[c].points[h].y,linesegment:e.getdirection(t[c].points[h].x,t[c].points[h].y,(t[c].points[h].x+t[c].points[a].x)/2,(t[c].points[h].y+t[c].points[a].y)/2)})}s[c].points.push({x:(t[c].points[h].x+t[c].points[a].x)/2,y:(t[c].points[h].y+t[c].points[a].y)/2,linesegment:e.getdirection((t[c].points[h].x+t[c].points[a].x)/2,(t[c].points[h].y+t[c].points[a].y)/2,(t[c].points[a].x+t[c].points[o].x)/2,(t[c].points[a].y+t[c].points[o].y)/2)})}}return s},this.testrightangle=function(e,t,n,s,r,a){return e.points[s].x===e.points[t].x&&e.points[s].x===e.points[n].x&&e.points[s].y===e.points[r].y&&e.points[s].y===e.points[a].y||e.points[s].y===e.points[t].y&&e.points[s].y===e.points[n].y&&e.points[s].x===e.points[r].x&&e.points[s].x===e.points[a].x},this.getdirection=function(e,t,n,s){var r=8;if(e<n){if(t<s){r=1}else if(t>s){r=7}else{r=0}}else if(e>n){if(t<s){r=3}else if(t>s){r=5}else{r=4}}else{if(t<s){r=2}else if(t>s){r=6}else{r=8}}return r},this.batchinternodes=function(t,n){var s=[];for(var r in t){if(!t.hasOwnProperty(r)){continue}s[r]=e.internodes(t[r],n)}return s},this.tracepath=function(t,n,s){var r=0,a,o,i,l={};l.segments=[];l.boundingbox=t.boundingbox;l.holechildren=t.holechildren;l.isholepath=t.isholepath;while(r<t.points.length){a=t.points[r].linesegment;o=-1;i=r+1;while((t.points[i].linesegment===a||t.points[i].linesegment===o||o===-1)&&i<t.points.length-1){if(t.points[i].linesegment!==a&&o===-1){o=t.points[i].linesegment}i++}if(i===t.points.length-1){i=0}l.segments=l.segments.concat(e.fitseq(t,n,s,r,i));if(i>0){r=i}else{r=t.points.length}}return l},this.fitseq=function(t,n,s,r,a){if(a>t.points.length||a<0){return[]}var o=r,i=0,l=true,c,h,g;var d=a-r;if(d<0){d+=t.points.length}var p=(t.points[a].x-t.points[r].x)/d,f=(t.points[a].y-t.points[r].y)/d;var u=(r+1)%t.points.length,m;while(u!=a){m=u-r;if(m<0){m+=t.points.length}c=t.points[r].x+p*m;h=t.points[r].y+f*m;g=(t.points[u].x-c)*(t.points[u].x-c)+(t.points[u].y-h)*(t.points[u].y-h);if(g>n){l=false}if(g>i){o=u;i=g}u=(u+1)%t.points.length}if(l){return[{type:"L",x1:t.points[r].x,y1:t.points[r].y,x2:t.points[a].x,y2:t.points[a].y}]}var y=o;l=true;i=0;var b=(y-r)/d,x=(1-b)*(1-b),v=2*(1-b)*b,w=b*b;var M=(x*t.points[r].x+w*t.points[a].x-t.points[y].x)/-v,k=(x*t.points[r].y+w*t.points[a].y-t.points[y].y)/-v;u=r+1;while(u!=a){b=(u-r)/d;x=(1-b)*(1-b);v=2*(1-b)*b;w=b*b;c=x*t.points[r].x+v*M+w*t.points[a].x;h=x*t.points[r].y+v*k+w*t.points[a].y;g=(t.points[u].x-c)*(t.points[u].x-c)+(t.points[u].y-h)*(t.points[u].y-h);if(g>s){l=false}if(g>i){o=u;i=g}u=(u+1)%t.points.length}if(l){return[{type:"Q",x1:t.points[r].x,y1:t.points[r].y,x2:M,y2:k,x3:t.points[a].x,y3:t.points[a].y}]}var q=y;return e.fitseq(t,n,s,r,q).concat(e.fitseq(t,n,s,q,a))},this.batchtracepaths=function(t,n,s){var r=[];for(var a in t){if(!t.hasOwnProperty(a)){continue}r.push(e.tracepath(t[a],n,s))}return r},this.batchtracelayers=function(t,n,s){var r=[];for(var a in t){if(!t.hasOwnProperty(a)){continue}r[a]=e.batchtracepaths(t[a],n,s)}return r},this.roundtodec=function(e,t){return+e.toFixed(t)},this.svgpathstring=function(t,n,s,r){var a=t.layers[n],o=a[s],i="",l;if(r.linefilter&&o.segments.length<3){return i}i="<path "+(r.desc?'desc="l '+n+" p "+s+'" ':"")+e.tosvgcolorstr(t.palette[n],r)+'d="';if(r.roundcoords===-1){i+="M "+o.segments[0].x1*r.scale+" "+o.segments[0].y1*r.scale+" ";for(l=0;l<o.segments.length;l++){i+=o.segments[l].type+" "+o.segments[l].x2*r.scale+" "+o.segments[l].y2*r.scale+" ";if(o.segments[l].hasOwnProperty("x3")){i+=o.segments[l].x3*r.scale+" "+o.segments[l].y3*r.scale+" "}}i+="Z "}else{i+="M "+e.roundtodec(o.segments[0].x1*r.scale,r.roundcoords)+" "+e.roundtodec(o.segments[0].y1*r.scale,r.roundcoords)+" ";for(l=0;l<o.segments.length;l++){i+=o.segments[l].type+" "+e.roundtodec(o.segments[l].x2*r.scale,r.roundcoords)+" "+e.roundtodec(o.segments[l].y2*r.scale,r.roundcoords)+" ";if(o.segments[l].hasOwnProperty("x3")){i+=e.roundtodec(o.segments[l].x3*r.scale,r.roundcoords)+" "+e.roundtodec(o.segments[l].y3*r.scale,r.roundcoords)+" "}}i+="Z "}for(var c=0;c<o.holechildren.length;c++){var h=a[o.holechildren[c]];if(r.roundcoords===-1){if(h.segments[h.segments.length-1].hasOwnProperty("x3")){i+="M "+h.segments[h.segments.length-1].x3*r.scale+" "+h.segments[h.segments.length-1].y3*r.scale+" "}else{i+="M "+h.segments[h.segments.length-1].x2*r.scale+" "+h.segments[h.segments.length-1].y2*r.scale+" "}for(l=h.segments.length-1;l>=0;l--){i+=h.segments[l].type+" ";if(h.segments[l].hasOwnProperty("x3")){i+=h.segments[l].x2*r.scale+" "+h.segments[l].y2*r.scale+" "}i+=h.segments[l].x1*r.scale+" "+h.segments[l].y1*r.scale+" "}}else{if(h.segments[h.segments.length-1].hasOwnProperty("x3")){i+="M "+e.roundtodec(h.segments[h.segments.length-1].x3*r.scale)+" "+e.roundtodec(h.segments[h.segments.length-1].y3*r.scale)+" "}else{i+="M "+e.roundtodec(h.segments[h.segments.length-1].x2*r.scale)+" "+e.roundtodec(h.segments[h.segments.length-1].y2*r.scale)+" "}for(l=h.segments.length-1;l>=0;l--){i+=h.segments[l].type+" ";if(h.segments[l].hasOwnProperty("x3")){i+=e.roundtodec(h.segments[l].x2*r.scale)+" "+e.roundtodec(h.segments[l].y2*r.scale)+" "}i+=e.roundtodec(h.segments[l].x1*r.scale)+" "+e.roundtodec(h.segments[l].y1*r.scale)+" "}}i+="Z "}i+='" />';if(r.lcpr||r.qcpr){for(l=0;l<o.segments.length;l++){if(o.segments[l].hasOwnProperty("x3")&&r.qcpr){i+='<circle cx="'+o.segments[l].x2*r.scale+'" cy="'+o.segments[l].y2*r.scale+'" r="'+r.qcpr+'" fill="cyan" stroke-width="'+r.qcpr*.2+'" stroke="black" />';i+='<circle cx="'+o.segments[l].x3*r.scale+'" cy="'+o.segments[l].y3*r.scale+'" r="'+r.qcpr+'" fill="white" stroke-width="'+r.qcpr*.2+'" stroke="black" />';i+='<line x1="'+o.segments[l].x1*r.scale+'" y1="'+o.segments[l].y1*r.scale+'" x2="'+o.segments[l].x2*r.scale+'" y2="'+o.segments[l].y2*r.scale+'" stroke-width="'+r.qcpr*.2+'" stroke="cyan" />';i+='<line x1="'+o.segments[l].x2*r.scale+'" y1="'+o.segments[l].y2*r.scale+'" x2="'+o.segments[l].x3*r.scale+'" y2="'+o.segments[l].y3*r.scale+'" stroke-width="'+r.qcpr*.2+'" stroke="cyan" />'}if(!o.segments[l].hasOwnProperty("x3")&&r.lcpr){i+='<circle cx="'+o.segments[l].x2*r.scale+'" cy="'+o.segments[l].y2*r.scale+'" r="'+r.lcpr+'" fill="white" stroke-width="'+r.lcpr*.2+'" stroke="black" />'}}for(var c=0;c<o.holechildren.length;c++){var h=a[o.holechildren[c]];for(l=0;l<h.segments.length;l++){if(h.segments[l].hasOwnProperty("x3")&&r.qcpr){i+='<circle cx="'+h.segments[l].x2*r.scale+'" cy="'+h.segments[l].y2*r.scale+'" r="'+r.qcpr+'" fill="cyan" stroke-width="'+r.qcpr*.2+'" stroke="black" />';i+='<circle cx="'+h.segments[l].x3*r.scale+'" cy="'+h.segments[l].y3*r.scale+'" r="'+r.qcpr+'" fill="white" stroke-width="'+r.qcpr*.2+'" stroke="black" />';i+='<line x1="'+h.segments[l].x1*r.scale+'" y1="'+h.segments[l].y1*r.scale+'" x2="'+h.segments[l].x2*r.scale+'" y2="'+h.segments[l].y2*r.scale+'" stroke-width="'+r.qcpr*.2+'" stroke="cyan" />';i+='<line x1="'+h.segments[l].x2*r.scale+'" y1="'+h.segments[l].y2*r.scale+'" x2="'+h.segments[l].x3*r.scale+'" y2="'+h.segments[l].y3*r.scale+'" stroke-width="'+r.qcpr*.2+'" stroke="cyan" />'}if(!h.segments[l].hasOwnProperty("x3")&&r.lcpr){i+='<circle cx="'+h.segments[l].x2*r.scale+'" cy="'+h.segments[l].y2*r.scale+'" r="'+r.lcpr+'" fill="white" stroke-width="'+r.lcpr*.2+'" stroke="black" />'}}}}return i},this.getsvgstring=function(t,n){n=e.checkoptions(n);var s=t.width*n.scale,r=t.height*n.scale;var a="<svg "+(n.viewbox?'viewBox="0 0 '+s+" "+r+'" ':'width="'+s+'" height="'+r+'" ')+'version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with imagetracer.js version '+e.versionnumber+'" >';for(var o=0;o<t.layers.length;o++){for(var i=0;i<t.layers[o].length;i++){if(!t.layers[o][i].isholepath){a+=e.svgpathstring(t,o,i,n)}}}a+="</svg>";return a},this.compareNumbers=function(e,t){return e-t},this.torgbastr=function(e){return"rgba("+e.r+","+e.g+","+e.b+","+e.a+")"},this.tosvgcolorstr=function(e,t){return'fill="rgb('+e.r+","+e.g+","+e.b+')" stroke="rgb('+e.r+","+e.g+","+e.b+')" stroke-width="'+t.strokewidth+'" opacity="'+e.a/255+'" '},this.appendSVGString=function(e,t){var n;if(t){n=document.getElementById(t);if(!n){n=document.createElement("div");n.id=t;document.body.appendChild(n)}}else{n=document.createElement("div");document.body.appendChild(n)}n.innerHTML+=e},this.gks=[[.27901,.44198,.27901],[.135336,.228569,.272192,.228569,.135336],[.086776,.136394,.178908,.195843,.178908,.136394,.086776],[.063327,.093095,.122589,.144599,.152781,.144599,.122589,.093095,.063327],[.049692,.069304,.089767,.107988,.120651,.125194,.120651,.107988,.089767,.069304,.049692]],this.blur=function(t,n,s){var r,a,o,i,l,c,h,g,d,p;var f={width:t.width,height:t.height,data:[]};n=Math.floor(n);if(n<1){return t}if(n>5){n=5}s=Math.abs(s);if(s>1024){s=1024}var u=e.gks[n-1];for(a=0;a<t.height;a++){for(r=0;r<t.width;r++){c=0;h=0;g=0;d=0;p=0;for(o=-n;o<n+1;o++){if(r+o>0&&r+o<t.width){l=(a*t.width+r+o)*4;c+=t.data[l]*u[o+n];h+=t.data[l+1]*u[o+n];g+=t.data[l+2]*u[o+n];d+=t.data[l+3]*u[o+n];p+=u[o+n]}}l=(a*t.width+r)*4;f.data[l]=Math.floor(c/p);f.data[l+1]=Math.floor(h/p);f.data[l+2]=Math.floor(g/p);f.data[l+3]=Math.floor(d/p)}}var m=new Uint8ClampedArray(f.data);for(a=0;a<t.height;a++){for(r=0;r<t.width;r++){c=0;h=0;g=0;d=0;p=0;for(o=-n;o<n+1;o++){if(a+o>0&&a+o<t.height){l=((a+o)*t.width+r)*4;c+=m[l]*u[o+n];h+=m[l+1]*u[o+n];g+=m[l+2]*u[o+n];d+=m[l+3]*u[o+n];p+=u[o+n]}}l=(a*t.width+r)*4;f.data[l]=Math.floor(c/p);f.data[l+1]=Math.floor(h/p);f.data[l+2]=Math.floor(g/p);f.data[l+3]=Math.floor(d/p)}}for(a=0;a<t.height;a++){for(r=0;r<t.width;r++){l=(a*t.width+r)*4;i=Math.abs(f.data[l]-t.data[l])+Math.abs(f.data[l+1]-t.data[l+1])+Math.abs(f.data[l+2]-t.data[l+2])+Math.abs(f.data[l+3]-t.data[l+3]);if(i>s){f.data[l]=t.data[l];f.data[l+1]=t.data[l+1];f.data[l+2]=t.data[l+2];f.data[l+3]=t.data[l+3]}}}return f},this.loadImage=function(e,t,n){var s=new Image;if(n&&n.corsenabled){s.crossOrigin="Anonymous"}s.onload=function(){var e=document.createElement("canvas");e.width=s.width;e.height=s.height;var n=e.getContext("2d");n.drawImage(s,0,0);t(e)};s.src=e},this.getImgdata=function(e){var t=e.getContext("2d");return t.getImageData(0,0,e.width,e.height)},this.specpalette=[{r:0,g:0,b:0,a:255},{r:128,g:128,b:128,a:255},{r:0,g:0,b:128,a:255},{r:64,g:64,b:128,a:255},{r:192,g:192,b:192,a:255},{r:255,g:255,b:255,a:255},{r:128,g:128,b:192,a:255},{r:0,g:0,b:192,a:255},{r:128,g:0,b:0,a:255},{r:128,g:64,b:64,a:255},{r:128,g:0,b:128,a:255},{r:168,g:168,b:168,a:255},{r:192,g:128,b:128,a:255},{r:192,g:0,b:0,a:255},{r:255,g:255,b:255,a:255},{r:0,g:128,b:0,a:255}],this.drawLayers=function(t,n,s,r){s=s||1;var a,o,i,l,c;var h;if(r){h=document.getElementById(r);if(!h){h=document.createElement("div");h.id=r;document.body.appendChild(h)}}else{h=document.createElement("div");document.body.appendChild(h)}for(c in t){if(!t.hasOwnProperty(c)){continue}a=t[c][0].length;o=t[c].length;var g=document.createElement("canvas");g.width=a*s;g.height=o*s;var d=g.getContext("2d");for(l=0;l<o;l++){for(i=0;i<a;i++){d.fillStyle=e.torgbastr(n[t[c][l][i]%n.length]);d.fillRect(i*s,l*s,s,s)}}h.appendChild(g)}}}if(typeof define==="function"&&define.amd){define(function(){return new e})}else if(typeof module!=="undefined"){module.exports=new e}else if(typeof self!=="undefined"){self.ImageTracer=new e}else window.ImageTracer=new e})();