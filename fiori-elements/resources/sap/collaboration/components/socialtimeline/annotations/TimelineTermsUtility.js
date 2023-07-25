/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/base/Log","./MetadataException","sap/ui/base/Object"],function(t,i,e){"use strict";var n=e.extend("sap.collaboration.components.socialtimeline.annotations.TimelineTermsUtility",{constructor:function(e,n){this._oLogger=t.getLogger("sap.collaboration.components.socialtimeline.annotations.TimelineTermsUtility");this._oServiceMetadata=e;this._oServiceAnnotations=n;this._oEntityMappings={};this.sSchemaNamespace="com.sap.vocabularies.Timeline.v1";var a=this._getIncludedSchema(this.sSchemaNamespace);if(!(a&&a.schemaNamespace===this.sSchemaNamespace)){var s="Schema with namespace "+this.sSchemaNamespace+" wasn't in an Include in the service's metadata document.";this._oLogger.error(s);throw new i(s)}},getTimelineEntryNavigationPath:function(t){if(!t){var i=new Error("Parameter sEntityCollection is undefined");this._oLogger.error(i.message);throw i}var e=this._oEntityMappings[t];if(!e){e=this._buildMapping(t)}return e.timelineEntryNavigationPath},getTimelineEntryFields:function(t){if(!t){var i=new Error("Parameter sEntityCollection is undefined");this._oLogger.error(i.message);throw i}var e=this._oEntityMappings[t];if(!e){e=this._buildMapping(t)}var n=this._oEntityMappings[t].timelineEntryFields;if(!n){var a=this._oServiceAnnotations[e.timelineEntryEntityTypeFull][this.sSchemaNamespace+".TimelineEntry"];if(!a){a=this._oServiceAnnotations[e.timelineEntryEntityTypeFull][this._getCollaborationAlias()+".TimelineEntry"]}n=this._mapEntityFields(a);this._oEntityMappings[t].timelineEntryFields=n}return n},getTimelineEntryDetailFields:function(t){if(!t){var i=new Error("Parameter sEntityCollection is undefined");this._oLogger.error(i.message);throw i}var e=this._oEntityMappings[t];if(!e){e=this._buildMapping(t)}var n=this._oEntityMappings[t].timelineEntryDetailFields;if(!n){var a=this._oServiceAnnotations[e.timelineEntryDetailEntityTypeFull][this.sSchemaNamespace+".TimelineDetailPropertyValueChange"];if(!a){a=this._oServiceAnnotations[e.timelineEntryDetailEntityTypeFull][this._getCollaborationAlias()+".TimelineDetailPropertyValueChange"]}n=this._mapEntityFields(a);this._oEntityMappings[t].timelineEntryDetailFields=n}return n},_buildMapping:function(t){this._oEntityMappings[t]={};this._oEntityMappings[t].entityCollection=t;this._oEntityMappings[t].entityTypeFull=this._getEntityTypeFull(t);this._oEntityMappings[t].namespace=this._oEntityMappings[t].entityTypeFull.split(".")[0];this._oEntityMappings[t].entityType=this._oEntityMappings[t].entityTypeFull.split(".")[1];var i=this._oServiceAnnotations[this._oEntityMappings[t].entityTypeFull][this.sSchemaNamespace+".TimelineNavigationPath"];if(!i){i=this._oServiceAnnotations[this._oEntityMappings[t].entityTypeFull][this._getCollaborationAlias()+".TimelineNavigationPath"]}this._oEntityMappings[t].timelineEntryNavigationPath=i.NavigationPropertyPath;this._oEntityMappings[t].timelineEntryEntityTypeFull=this._getChildEntityTypeFull(this._oEntityMappings[t].entityType,this._oEntityMappings[t].timelineEntryNavigationPath);this._oEntityMappings[t].timelineEntryEntityType=this._oEntityMappings[t].timelineEntryEntityTypeFull.split(".")[1];this._oEntityMappings[t].timelineEntryFields=undefined;var e=this._oServiceAnnotations[this._oEntityMappings[t].timelineEntryEntityTypeFull][this.sSchemaNamespace+".TimelineEntry"];if(!e){e=this._oServiceAnnotations[this._oEntityMappings[t].timelineEntryEntityTypeFull][this._getCollaborationAlias()+".TimelineEntry"]}this._oEntityMappings[t].timelineEntryDetailNavigationPath=e.TimelineDetailNavigationPath.NavigationPropertyPath;this._oEntityMappings[t].timelineEntryDetailEntityTypeFull=this._getChildEntityTypeFull(this._oEntityMappings[t].timelineEntryEntityType,this._oEntityMappings[t].timelineEntryDetailNavigationPath);this._oEntityMappings[t].timelineEntryDetailFields=undefined;return this._oEntityMappings[t]},_getEntityTypeFull:function(t){for(var i=this._oServiceMetadata.dataServices.schema.length-1;i>=0;i--){var e=this._oServiceMetadata.dataServices.schema[i];if(e.entityContainer){var n=e.entityContainer[0].entitySet;for(var a=n.length-1;a>=0;a--){if(n[a].name===t){return n[a].entityType}}}}throw new Error("Entity collection '"+t+"' could not be found in service")},_getChildEntityTypeFull:function(t,i){var e=this._getEntityTypeObject(t);var n=this._getNavigationProperty(e,i);var a=this._getAssociationEnd(n.toRole);return a.type},_getEntityTypeObject:function(t){for(var i=this._oServiceMetadata.dataServices.schema.length-1;i>=0;i--){var e=this._oServiceMetadata.dataServices.schema[i];if(e.entityType){var n=e.entityType;for(var a=n.length-1;a>=0;a--){if(n[a].name===t){return n[a]}}}}throw new Error("Entity Type '"+t+"' could not be found in service")},_getNavigationProperty:function(t,i){if(t.navigationProperty){for(var e=t.navigationProperty.length-1;e>=0;e--){if(t.navigationProperty[e].name===i){return t.navigationProperty[e]}}}throw new Error("Navigation property '"+i+"' could not be found for entity '"+t.name+"'.")},_getAssociationEnd:function(t){for(var i=this._oServiceMetadata.dataServices.schema.length-1;i>=0;i--){var e=this._oServiceMetadata.dataServices.schema[i];if(e.association){for(var n=e.association.length-1;n>=0;n--){for(var a=e.association[n].end.length-1;a>=0;a--){if(e.association[n].end[a].role===t){return e.association[n].end[a]}}}}}throw new Error("Association with role '"+t+"' could not be found in service.")},_mapEntityFields:function(t){var i={};for(var e in t){if(t.hasOwnProperty(e)){if(t[e].Path){i[e]=t[e].Path}else if(t[e].PropertyPath){i[e]=t[e].PropertyPath}else if(t[e].EnumMember){i[e]=t[e].EnumMember}else if(t[e].NavigationPropertyPath){i[e]=t[e].NavigationPropertyPath}}}return i},_getCollaborationAlias:function(){var t=this._oServiceAnnotations.aliasDefinitions;for(var i in t){if(t[i].indexOf("com.sap.vocabularies.Timeline.v1")>-1){return i}}},_getIncludedSchema:function(t){var i=0;var e=0;var n=0;var a;var s;var o;var r={schemaNamespace:undefined,schemaAlias:undefined};if(this._oServiceMetadata&&this._oServiceMetadata.extensions){for(i=0;i<this._oServiceMetadata.extensions.length;++i){a=this._oServiceMetadata.extensions[i];for(e=0;e<a.children.length;++e){s=a.children[e];if(s.name=="Include"){for(n=0;n<s.attributes.length;++n){o=s.attributes[n];if(o.name=="Namespace"){r.schemaNamespace=o.value}if(o.name=="Alias"){r.schemaAlias=o.value}}if(r.schemaNamespace==t){return r}}}}return undefined}return undefined}});return n});