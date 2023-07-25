/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../i18n","sap/esh/search/ui/controls/SearchResultListItem","sap/esh/search/ui/controls/SearchText","sap/esh/search/ui/SearchHelper","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/core/format/DateFormat"],function(e,t,r,a,n,i,s){function o(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}var l=o(e);var u=t.extend("sap.esh.search.ui.controls.SearchResultListItemDocument",{renderer:{apiVersion:2},_renderContentContainer:function e(t){var r=this.getModel();t.openStart("div",this.getId()+"-content");t["class"]("sapUshellSearchResultListItem-Content");if(!r.config.optimizeForValueHelp){t["class"]("sapUshellSearchResultListItem-ContentValueHelp")}t.openEnd();this._renderTitleContainer(t);this._renderAttributesContainer(t);t.close("div")},_renderTitleContainer:function e(t){var r=this.getModel();if(!r.config.optimizeForValueHelp){t.openStart("div",this.getId()+"-title-and-image-container");t["class"]("sapUshellSearchResultListItem-TitleAndImageContainer");t.openEnd()}t.openStart("div",this.getId()+"-title-container");t["class"]("sapUshellSearchResultListItem-TitleContainer");if(r.config.optimizeForValueHelp){t["class"]("sapUshellSearchResultListItem-TitleContainerValueHelp")}t.openEnd();this._renderCheckbox(t);var a=this.getProperty("additionalParameters").titleUrl;var n=this.getAggregation("_titleLink");n.setHref(a);n.setText(this.getProperty("title"));if(a.length===0){n.setEnabled(false)}t.renderControl(n);var i=this.getAggregation("_typeText");i.setText(this.getProperty("type"));t.renderControl(i);t.close("div");if(!r.config.optimizeForValueHelp){this._renderImageForPhone(t);t.close("div")}},_renderAttributesContainer:function e(t){t.openStart("div",this.getId()+"-attributes-expand-container");t["class"]("sapUshellSearchResultListItemDoc-AttributesExpandContainer");var r=this.getProperty("expanded");if(r){t["class"]("sapUshellSearchResultListItem-AttributesExpanded")}t.openEnd();t.openStart("div",this.getId()+"-attributes-and-actions");t["class"]("sapUshellSearchResultListItem-AttributesAndActions");t.openEnd();t.openStart("ul",this.getId()+"-attributes");t["class"]("sapUshellSearchResultListItem-Attributes");t.openEnd();this._renderThumbnailSnippetContainer(t);this._renderDocAttributesContainer(t);t.openStart("div",this.getId()+"-expand-spacer-attribute");t["class"]("sapUshellSearchResultListItem-ExpandSpacerAttribute");t.attr("aria-hidden","true");t.openEnd();t.close("div");t.close("ul");this._renderRelatedObjectsToolbar(t);t.close("div");t.close("div")},_renderThumbnailContainer:function e(t){if(!this.getProperty("imageUrl")){return}if(this.getProperty("containsThumbnail")===true){t.openStart("div",this.getId()+"-thumbnail-container");t["class"]("sapUshellSearchResultListItemDoc-ThumbnailContainer");t.openEnd();t.openStart("div",this.getId()+"-thumbnail-container-inner");t["class"]("sapUshellSearchResultListItemDoc-ThumbnailContainerInner");t.openEnd();var r=new n({src:i.getIconURI("search"),useIconTooltip:false});if(this.getProperty("containsSuvFile")===true){var a=function e(){window.open(this.getSuvlink(),"_blank","noopener,noreferrer")};r.attachPress(a)}r.addStyleClass("sapUshellSearchResultListItemDoc-ThumbnailZoomIcon");t.renderControl(r);if(this.getProperty("containsSuvFile")===true){t.openStart("a",this.getId()+"-suv-link-1");t.attr("target","_blank");t.attr("href",this.getProperty("suvlink"));t.attr("rel","noopener noreferrer");t.openEnd()}else{t.openStart("a",this.getId()+"-suv-link-2");t.attr("target","_blank");t.attr("rel","noopener noreferrer");t.openEnd()}t.openStart("img",this.getId()+"-thumbnail");t["class"]("sapUshellSearchResultListItemDoc-Thumbnail");t.attr("src",this.getProperty("imageUrl"));t.openEnd();t.close("img");t.close("a");t.close("div");t.close("div")}else{t.openStart("div",this.getId()+"-thumbnail-container-hidden");t["class"]("sapUshellSearchResultListItemDoc-ThumbnailContainer-hidden");t.openEnd();t.close("div")}},_renderImageForPhone:function e(t){if(this.getProperty("imageUrl")&&this.getProperty("containsThumbnail")===true){t.openStart("div",this.getId()+"-title-image");t["class"]("sapUshellSearchResultListItem-TitleImage");t.openEnd();t.openStart("div",this.getId()+"-image-container-alignment-helper");t["class"]("sapUshellSearchResultListItem-ImageContainerAlignmentHelper");t.openEnd();t.close("div");t.openStart("img",this.getId()+"-image");t["class"]("sapUshellSearchResultListItem-Image");t.attr("src",this.getProperty("imageUrl"));t.openEnd();t.close("img");t.close("div")}},_renderDocAttributesContainer:function e(t){t.openStart("div",this.getId()+"-attributes-container");t["class"]("sapUshellSearchResultListItemDoc-AttributesContainer");t.openEnd();var r=this.getProperty("attributes");this._renderAllAttributes(t,r);t.close("div")},_renderThumbnailSnippetContainer:function e(t){t.openStart("div",this.getId()+"-thumbnail-snippet-container");t["class"]("sapUshellSearchResultListItemDoc-ThumbnailSnippetContainer");t.openEnd();this._renderThumbnailContainer(t);this._renderSnippetContainer(t);t.close("div")},_renderSnippetContainer:function e(t){var a=this.getProperty("attributes");for(var n=0;n<a.length;n++){var i=a[n];if(i.longtext){var s=new r;s.setText(i.value);s.addStyleClass("sapUshellSearchResultListItemDoc-Snippet");t.renderControl(s)}}},_renderAllAttributes:function e(n,i){var o;var l;var u;var d;var h;var c=8;if(this.getProperty("imageUrl")){c--}var p=function e(t){var r;for(var a=0;a<t.length;a++){r=t[a];if(r.key==="FILE_PROPERTY"&&r.value){return true}}return false};var g=p(i);this.destroyAggregation("_attributeValues");var m,f,v;for(;f<c&&m<i.length;m++){o=i[m];if(o.isTitle||o.longtext){continue}if(g===true&&o.key!=="FILE_PROPERTY"){continue}if(!o.value){continue}if(g===true){var I=JSON.parse(o.value);for(;v<I.length&&v<10;v++){h=I[v];switch(h.type){case"date-time":{var S=new Date(h.value);var b=s.getDateTimeInstance({style:"medium"},sap.ui.getCore().getConfiguration().getLocale());u=b.format(S);break}case"byte":u=a.formatFileSize(Number(h.value));break;case"integer":u=a.formatInteger(Number(h.value));break;default:u=h.value}l=h.category+": "+h.name;if(u===undefined){continue}if(!u||u===""){u=t.noValue}d=new r;d.setText(u);d.addStyleClass("sapUshellSearchResultListItemDoc-AttributeValue");d.addStyleClass("sapUshellSearchResultListItem-MightOverflow");n.renderControl(d);this.addAggregation("_attributeValues",d,true)}}else{l=o.name;u=o.value;if(l===undefined||u===undefined){continue}if(!u||u===""){u=t.noValue}d=new r;d.setText(u);d.addStyleClass("sapUshellSearchResultListItemDoc-AttributeValue");d.addStyleClass("sapUshellSearchResultListItem-MightOverflow");n.renderControl(d);this.addAggregation("_attributeValues",d,true)}f++}},_getExpandAreaObjectInfo:function e(){var t=$(this.getDomRef());var r=t.find(".sapUshellSearchResultListItemDoc-AttributesExpandContainer");var a=t.find(".sapUshellSearchResultListItem-RelatedObjectsToolbar");var n=false;if(a.css("display")==="none"){a.css("display","block");n=true}var i=r.height();var s=t.find(".sapUshellSearchResultListItem-AttributesAndActions").height();if(n){a.css("display","")}var o=[];t.find(".sapUshellSearchResultListItem-GenericAttribute").each(function(){var e=$(this);if(Number(e.css("order"))>2){o.push(this)}});var l=200;var u=l/10;var d={resultListItem:t,attributesExpandContainer:r,currentHeight:i,expandedHeight:s,elementsToFadeInOrOut:o,expandAnimationDuration:l,fadeInOrOutAnimationDuration:u,relatedObjectsToolbar:a};return d},hideDetails:function e(){var t=$(this.getDomRef());if(!this.isShowingDetails()){return}var r=this._getExpandAreaObjectInfo();var a=t.find(".sapUshellSearchResultListItem-Attributes").outerHeight(true);var n=false;var s=r.attributesExpandContainer.animate({height:a},{duration:r.expandAnimationDuration,progress:function e(t,a,o){if(!n&&o<=r.fadeInOrOutAnimationDuration){n=true;var u=$(r.elementsToFadeInOrOut).animate({opacity:0},r.fadeInOrOutAnimationDuration).promise();jQuery.when(s,u).done(function(){this.setProperty("expanded",false,true);r.attributesExpandContainer.removeClass("sapUshellSearchResultListItem-AttributesExpanded");$(r.elementsToFadeInOrOut).css("opacity","");var e=i.getIconURI("slim-arrow-down");var t=this.getAggregation("_expandButton");t.setTooltip(l.getText("showDetailBtn_tooltip"));t.setIcon(e);t.rerender()})}}}).promise()}});return u})})();