/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/util/merge", "sap/fe/core/converters/helpers/IssueManager", "./ConverterContext", "./ManifestSettings", "./MetaModelConverter", "./templates/ListReportConverter", "./templates/ObjectPageConverter"], function (merge, IssueManager, ConverterContext, ManifestSettings, MetaModelConverter, ListReportConverter, ObjectPageConverter) {
  "use strict";

  var _exports = {};
  var getInvolvedDataModelObjects = MetaModelConverter.getInvolvedDataModelObjects;
  var convertTypes = MetaModelConverter.convertTypes;
  var TemplateType = ManifestSettings.TemplateType;
  var IssueSeverity = IssueManager.IssueSeverity;
  var IssueCategoryType = IssueManager.IssueCategoryType;
  var IssueCategory = IssueManager.IssueCategory;
  function handleErrorForCollectionFacets(oFacets, oDiagnostics, sEntitySetName, level) {
    oFacets.forEach(oFacet => {
      let Message = `For entity set ${sEntitySetName}`;
      if ((oFacet === null || oFacet === void 0 ? void 0 : oFacet.$Type) === "com.sap.vocabularies.UI.v1.CollectionFacet" && !(oFacet !== null && oFacet !== void 0 && oFacet.ID)) {
        var _IssueCategoryType$Fa;
        Message = `${Message}, ` + `level ${level}, the collection facet does not have an ID.`;
        oDiagnostics.addIssue(IssueCategory.Facets, IssueSeverity.High, Message, IssueCategoryType, IssueCategoryType === null || IssueCategoryType === void 0 ? void 0 : (_IssueCategoryType$Fa = IssueCategoryType.Facets) === null || _IssueCategoryType$Fa === void 0 ? void 0 : _IssueCategoryType$Fa.MissingID);
      }
      if ((oFacet === null || oFacet === void 0 ? void 0 : oFacet.$Type) === "com.sap.vocabularies.UI.v1.CollectionFacet" && level >= 3) {
        var _IssueCategoryType$Fa2;
        Message = `${Message}, collection facet ${oFacet.Label} is not supported at ` + `level ${level}`;
        oDiagnostics.addIssue(IssueCategory.Facets, IssueSeverity.Medium, Message, IssueCategoryType, IssueCategoryType === null || IssueCategoryType === void 0 ? void 0 : (_IssueCategoryType$Fa2 = IssueCategoryType.Facets) === null || _IssueCategoryType$Fa2 === void 0 ? void 0 : _IssueCategoryType$Fa2.UnSupportedLevel);
      }
      if (oFacet !== null && oFacet !== void 0 && oFacet.Facets) {
        handleErrorForCollectionFacets(oFacet === null || oFacet === void 0 ? void 0 : oFacet.Facets, oDiagnostics, sEntitySetName, ++level);
        level = level - 1;
      }
    });
  }

  /**
   * Based on a template type, convert the metamodel and manifest definition into a json structure for the page.
   *
   * @param sTemplateType The template type
   * @param oMetaModel The odata model metaModel
   * @param oManifestSettings The current manifest settings
   * @param oDiagnostics The diagnostics wrapper
   * @param sFullContextPath The context path to reach this page
   * @param oCapabilities
   * @param component The template component
   * @returns The target page definition
   */
  function convertPage(sTemplateType, oMetaModel, oManifestSettings, oDiagnostics, sFullContextPath, oCapabilities, component) {
    var _oConvertedMetadata$e;
    const oConvertedMetadata = convertTypes(oMetaModel, oCapabilities);
    // TODO: This will have incomplete information because the conversion happens lazily
    oConvertedMetadata.diagnostics.forEach(annotationErrorDetail => {
      const checkIfIssueExists = oDiagnostics.checkIfIssueExists(IssueCategory.Annotation, IssueSeverity.High, annotationErrorDetail.message);
      if (!checkIfIssueExists) {
        oDiagnostics.addIssue(IssueCategory.Annotation, IssueSeverity.High, annotationErrorDetail.message);
      }
    });
    oConvertedMetadata === null || oConvertedMetadata === void 0 ? void 0 : (_oConvertedMetadata$e = oConvertedMetadata.entityTypes) === null || _oConvertedMetadata$e === void 0 ? void 0 : _oConvertedMetadata$e.forEach(oEntitySet => {
      var _oEntitySet$annotatio, _oEntitySet$annotatio2;
      if (oEntitySet !== null && oEntitySet !== void 0 && (_oEntitySet$annotatio = oEntitySet.annotations) !== null && _oEntitySet$annotatio !== void 0 && (_oEntitySet$annotatio2 = _oEntitySet$annotatio.UI) !== null && _oEntitySet$annotatio2 !== void 0 && _oEntitySet$annotatio2.Facets) {
        var _oEntitySet$annotatio3, _oEntitySet$annotatio4;
        handleErrorForCollectionFacets(oEntitySet === null || oEntitySet === void 0 ? void 0 : (_oEntitySet$annotatio3 = oEntitySet.annotations) === null || _oEntitySet$annotatio3 === void 0 ? void 0 : (_oEntitySet$annotatio4 = _oEntitySet$annotatio3.UI) === null || _oEntitySet$annotatio4 === void 0 ? void 0 : _oEntitySet$annotatio4.Facets, oDiagnostics, oEntitySet === null || oEntitySet === void 0 ? void 0 : oEntitySet.name, 1);
      }
    });
    const sTargetEntitySetName = oManifestSettings.entitySet;
    const sContextPath = (oManifestSettings === null || oManifestSettings === void 0 ? void 0 : oManifestSettings.contextPath) || (sFullContextPath === "/" ? sFullContextPath + sTargetEntitySetName : sFullContextPath);
    const oContext = oMetaModel.createBindingContext(sContextPath);
    const oFullContext = getInvolvedDataModelObjects(oContext);
    if (oFullContext) {
      let oConvertedPage = {};
      const converterContext = new ConverterContext(oConvertedMetadata, oManifestSettings, oDiagnostics, merge, oFullContext);
      switch (sTemplateType) {
        case TemplateType.ListReport:
        case TemplateType.AnalyticalListPage:
          oConvertedPage = ListReportConverter.convertPage(converterContext);
          break;
        case TemplateType.ObjectPage:
          oConvertedPage = ObjectPageConverter.convertPage(converterContext);
          break;
      }
      if (component !== null && component !== void 0 && component.extendPageDefinition) {
        oConvertedPage = component.extendPageDefinition(oConvertedPage, converterContext);
      }
      return oConvertedPage;
    }
    return undefined;
  }
  _exports.convertPage = convertPage;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJoYW5kbGVFcnJvckZvckNvbGxlY3Rpb25GYWNldHMiLCJvRmFjZXRzIiwib0RpYWdub3N0aWNzIiwic0VudGl0eVNldE5hbWUiLCJsZXZlbCIsImZvckVhY2giLCJvRmFjZXQiLCJNZXNzYWdlIiwiJFR5cGUiLCJJRCIsImFkZElzc3VlIiwiSXNzdWVDYXRlZ29yeSIsIkZhY2V0cyIsIklzc3VlU2V2ZXJpdHkiLCJIaWdoIiwiSXNzdWVDYXRlZ29yeVR5cGUiLCJNaXNzaW5nSUQiLCJMYWJlbCIsIk1lZGl1bSIsIlVuU3VwcG9ydGVkTGV2ZWwiLCJjb252ZXJ0UGFnZSIsInNUZW1wbGF0ZVR5cGUiLCJvTWV0YU1vZGVsIiwib01hbmlmZXN0U2V0dGluZ3MiLCJzRnVsbENvbnRleHRQYXRoIiwib0NhcGFiaWxpdGllcyIsImNvbXBvbmVudCIsIm9Db252ZXJ0ZWRNZXRhZGF0YSIsImNvbnZlcnRUeXBlcyIsImRpYWdub3N0aWNzIiwiYW5ub3RhdGlvbkVycm9yRGV0YWlsIiwiY2hlY2tJZklzc3VlRXhpc3RzIiwiQW5ub3RhdGlvbiIsIm1lc3NhZ2UiLCJlbnRpdHlUeXBlcyIsIm9FbnRpdHlTZXQiLCJhbm5vdGF0aW9ucyIsIlVJIiwibmFtZSIsInNUYXJnZXRFbnRpdHlTZXROYW1lIiwiZW50aXR5U2V0Iiwic0NvbnRleHRQYXRoIiwiY29udGV4dFBhdGgiLCJvQ29udGV4dCIsImNyZWF0ZUJpbmRpbmdDb250ZXh0Iiwib0Z1bGxDb250ZXh0IiwiZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzIiwib0NvbnZlcnRlZFBhZ2UiLCJjb252ZXJ0ZXJDb250ZXh0IiwiQ29udmVydGVyQ29udGV4dCIsIm1lcmdlIiwiVGVtcGxhdGVUeXBlIiwiTGlzdFJlcG9ydCIsIkFuYWx5dGljYWxMaXN0UGFnZSIsIkxpc3RSZXBvcnRDb252ZXJ0ZXIiLCJPYmplY3RQYWdlIiwiT2JqZWN0UGFnZUNvbnZlcnRlciIsImV4dGVuZFBhZ2VEZWZpbml0aW9uIiwidW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIuIiwic291cmNlcyI6WyJUZW1wbGF0ZUNvbnZlcnRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEZhY2V0VHlwZXMgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvdm9jYWJ1bGFyaWVzL1VJXCI7XG5pbXBvcnQgeyBVSUFubm90YXRpb25UeXBlcyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy92b2NhYnVsYXJpZXMvVUlcIjtcbmltcG9ydCBtZXJnZSBmcm9tIFwic2FwL2Jhc2UvdXRpbC9tZXJnZVwiO1xuaW1wb3J0IHsgSXNzdWVDYXRlZ29yeSwgSXNzdWVDYXRlZ29yeVR5cGUsIElzc3VlU2V2ZXJpdHkgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0lzc3VlTWFuYWdlclwiO1xuaW1wb3J0IHR5cGUgVGVtcGxhdGVDb21wb25lbnQgZnJvbSBcInNhcC9mZS9jb3JlL1RlbXBsYXRlQ29tcG9uZW50XCI7XG5pbXBvcnQgdHlwZSBDb250ZXh0IGZyb20gXCJzYXAvdWkvbW9kZWwvQ29udGV4dFwiO1xuaW1wb3J0IHR5cGUgT0RhdGFNZXRhTW9kZWwgZnJvbSBcInNhcC91aS9tb2RlbC9vZGF0YS92NC9PRGF0YU1ldGFNb2RlbFwiO1xuaW1wb3J0IENvbnZlcnRlckNvbnRleHQgZnJvbSBcIi4vQ29udmVydGVyQ29udGV4dFwiO1xuaW1wb3J0IHR5cGUgeyBCYXNlTWFuaWZlc3RTZXR0aW5ncyB9IGZyb20gXCIuL01hbmlmZXN0U2V0dGluZ3NcIjtcbmltcG9ydCB7IFRlbXBsYXRlVHlwZSB9IGZyb20gXCIuL01hbmlmZXN0U2V0dGluZ3NcIjtcbmltcG9ydCB0eXBlIHsgRW52aXJvbm1lbnRDYXBhYmlsaXRpZXMgfSBmcm9tIFwiLi9NZXRhTW9kZWxDb252ZXJ0ZXJcIjtcbmltcG9ydCB7IGNvbnZlcnRUeXBlcywgZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzIH0gZnJvbSBcIi4vTWV0YU1vZGVsQ29udmVydGVyXCI7XG5pbXBvcnQgKiBhcyBMaXN0UmVwb3J0Q29udmVydGVyIGZyb20gXCIuL3RlbXBsYXRlcy9MaXN0UmVwb3J0Q29udmVydGVyXCI7XG5pbXBvcnQgKiBhcyBPYmplY3RQYWdlQ29udmVydGVyIGZyb20gXCIuL3RlbXBsYXRlcy9PYmplY3RQYWdlQ29udmVydGVyXCI7XG5cbi8qKlxuICogQHR5cGVkZWYgUGFnZURlZmluaXRpb25cbiAqL1xuZXhwb3J0IHR5cGUgUGFnZURlZmluaXRpb24gPSB7XG5cdHRlbXBsYXRlOiBzdHJpbmc7XG59O1xuXG4vKiogQHR5cGVkZWYgSURpYWdub3N0aWNzICovXG5leHBvcnQgaW50ZXJmYWNlIElEaWFnbm9zdGljcyB7XG5cdGFkZElzc3VlKFxuXHRcdGlzc3VlQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnkgfCBzdHJpbmcsXG5cdFx0aXNzdWVTZXZlcml0eTogSXNzdWVTZXZlcml0eSxcblx0XHRkZXRhaWxzOiBzdHJpbmcsXG5cdFx0aXNzdWVDYXRlZ29yeVR5cGU/OiBhbnksXG5cdFx0aXNzdWVTdWJDYXRlZ29yeT86IHN0cmluZ1xuXHQpOiB2b2lkO1xuXHRnZXRJc3N1ZXMoKTogYW55W107XG5cdGNoZWNrSWZJc3N1ZUV4aXN0cyhcblx0XHRpc3N1ZUNhdGVnb3J5OiBJc3N1ZUNhdGVnb3J5LFxuXHRcdGlzc3VlU2V2ZXJpdHk6IElzc3VlU2V2ZXJpdHksXG5cdFx0ZGV0YWlsczogc3RyaW5nLFxuXHRcdGlzc3VlQ2F0ZWdvcnlUeXBlPzogYW55LFxuXHRcdGlzc3VlU3ViQ2F0ZWdvcnk/OiBzdHJpbmdcblx0KTogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRXJyb3JGb3JDb2xsZWN0aW9uRmFjZXRzKG9GYWNldHM6IEZhY2V0VHlwZXNbXSwgb0RpYWdub3N0aWNzOiBJRGlhZ25vc3RpY3MsIHNFbnRpdHlTZXROYW1lOiBzdHJpbmcsIGxldmVsOiBudW1iZXIpIHtcblx0b0ZhY2V0cy5mb3JFYWNoKChvRmFjZXQ6IGFueSkgPT4ge1xuXHRcdGxldCBNZXNzYWdlID0gYEZvciBlbnRpdHkgc2V0ICR7c0VudGl0eVNldE5hbWV9YDtcblx0XHRpZiAob0ZhY2V0Py4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuQ29sbGVjdGlvbkZhY2V0ICYmICFvRmFjZXQ/LklEKSB7XG5cdFx0XHRNZXNzYWdlID0gYCR7TWVzc2FnZX0sIGAgKyBgbGV2ZWwgJHtsZXZlbH0sIHRoZSBjb2xsZWN0aW9uIGZhY2V0IGRvZXMgbm90IGhhdmUgYW4gSUQuYDtcblx0XHRcdG9EaWFnbm9zdGljcy5hZGRJc3N1ZShcblx0XHRcdFx0SXNzdWVDYXRlZ29yeS5GYWNldHMsXG5cdFx0XHRcdElzc3VlU2V2ZXJpdHkuSGlnaCxcblx0XHRcdFx0TWVzc2FnZSxcblx0XHRcdFx0SXNzdWVDYXRlZ29yeVR5cGUsXG5cdFx0XHRcdElzc3VlQ2F0ZWdvcnlUeXBlPy5GYWNldHM/Lk1pc3NpbmdJRFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKG9GYWNldD8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldCAmJiBsZXZlbCA+PSAzKSB7XG5cdFx0XHRNZXNzYWdlID0gYCR7TWVzc2FnZX0sIGNvbGxlY3Rpb24gZmFjZXQgJHtvRmFjZXQuTGFiZWx9IGlzIG5vdCBzdXBwb3J0ZWQgYXQgYCArIGBsZXZlbCAke2xldmVsfWA7XG5cdFx0XHRvRGlhZ25vc3RpY3MuYWRkSXNzdWUoXG5cdFx0XHRcdElzc3VlQ2F0ZWdvcnkuRmFjZXRzLFxuXHRcdFx0XHRJc3N1ZVNldmVyaXR5Lk1lZGl1bSxcblx0XHRcdFx0TWVzc2FnZSxcblx0XHRcdFx0SXNzdWVDYXRlZ29yeVR5cGUsXG5cdFx0XHRcdElzc3VlQ2F0ZWdvcnlUeXBlPy5GYWNldHM/LlVuU3VwcG9ydGVkTGV2ZWxcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmIChvRmFjZXQ/LkZhY2V0cykge1xuXHRcdFx0aGFuZGxlRXJyb3JGb3JDb2xsZWN0aW9uRmFjZXRzKG9GYWNldD8uRmFjZXRzLCBvRGlhZ25vc3RpY3MsIHNFbnRpdHlTZXROYW1lLCArK2xldmVsKTtcblx0XHRcdGxldmVsID0gbGV2ZWwgLSAxO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQmFzZWQgb24gYSB0ZW1wbGF0ZSB0eXBlLCBjb252ZXJ0IHRoZSBtZXRhbW9kZWwgYW5kIG1hbmlmZXN0IGRlZmluaXRpb24gaW50byBhIGpzb24gc3RydWN0dXJlIGZvciB0aGUgcGFnZS5cbiAqXG4gKiBAcGFyYW0gc1RlbXBsYXRlVHlwZSBUaGUgdGVtcGxhdGUgdHlwZVxuICogQHBhcmFtIG9NZXRhTW9kZWwgVGhlIG9kYXRhIG1vZGVsIG1ldGFNb2RlbFxuICogQHBhcmFtIG9NYW5pZmVzdFNldHRpbmdzIFRoZSBjdXJyZW50IG1hbmlmZXN0IHNldHRpbmdzXG4gKiBAcGFyYW0gb0RpYWdub3N0aWNzIFRoZSBkaWFnbm9zdGljcyB3cmFwcGVyXG4gKiBAcGFyYW0gc0Z1bGxDb250ZXh0UGF0aCBUaGUgY29udGV4dCBwYXRoIHRvIHJlYWNoIHRoaXMgcGFnZVxuICogQHBhcmFtIG9DYXBhYmlsaXRpZXNcbiAqIEBwYXJhbSBjb21wb25lbnQgVGhlIHRlbXBsYXRlIGNvbXBvbmVudFxuICogQHJldHVybnMgVGhlIHRhcmdldCBwYWdlIGRlZmluaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRQYWdlKFxuXHRzVGVtcGxhdGVUeXBlOiBUZW1wbGF0ZVR5cGUsXG5cdG9NZXRhTW9kZWw6IE9EYXRhTWV0YU1vZGVsLFxuXHRvTWFuaWZlc3RTZXR0aW5nczogQmFzZU1hbmlmZXN0U2V0dGluZ3MsXG5cdG9EaWFnbm9zdGljczogSURpYWdub3N0aWNzLFxuXHRzRnVsbENvbnRleHRQYXRoOiBzdHJpbmcsXG5cdG9DYXBhYmlsaXRpZXM/OiBFbnZpcm9ubWVudENhcGFiaWxpdGllcyxcblx0Y29tcG9uZW50PzogVGVtcGxhdGVDb21wb25lbnRcbikge1xuXHRjb25zdCBvQ29udmVydGVkTWV0YWRhdGEgPSBjb252ZXJ0VHlwZXMob01ldGFNb2RlbCwgb0NhcGFiaWxpdGllcyk7XG5cdC8vIFRPRE86IFRoaXMgd2lsbCBoYXZlIGluY29tcGxldGUgaW5mb3JtYXRpb24gYmVjYXVzZSB0aGUgY29udmVyc2lvbiBoYXBwZW5zIGxhemlseVxuXHRvQ29udmVydGVkTWV0YWRhdGEuZGlhZ25vc3RpY3MuZm9yRWFjaCgoYW5ub3RhdGlvbkVycm9yRGV0YWlsKSA9PiB7XG5cdFx0Y29uc3QgY2hlY2tJZklzc3VlRXhpc3RzID0gb0RpYWdub3N0aWNzLmNoZWNrSWZJc3N1ZUV4aXN0cyhcblx0XHRcdElzc3VlQ2F0ZWdvcnkuQW5ub3RhdGlvbixcblx0XHRcdElzc3VlU2V2ZXJpdHkuSGlnaCxcblx0XHRcdGFubm90YXRpb25FcnJvckRldGFpbC5tZXNzYWdlXG5cdFx0KTtcblx0XHRpZiAoIWNoZWNrSWZJc3N1ZUV4aXN0cykge1xuXHRcdFx0b0RpYWdub3N0aWNzLmFkZElzc3VlKElzc3VlQ2F0ZWdvcnkuQW5ub3RhdGlvbiwgSXNzdWVTZXZlcml0eS5IaWdoLCBhbm5vdGF0aW9uRXJyb3JEZXRhaWwubWVzc2FnZSk7XG5cdFx0fVxuXHR9KTtcblx0b0NvbnZlcnRlZE1ldGFkYXRhPy5lbnRpdHlUeXBlcz8uZm9yRWFjaCgob0VudGl0eVNldDogYW55KSA9PiB7XG5cdFx0aWYgKG9FbnRpdHlTZXQ/LmFubm90YXRpb25zPy5VST8uRmFjZXRzKSB7XG5cdFx0XHRoYW5kbGVFcnJvckZvckNvbGxlY3Rpb25GYWNldHMob0VudGl0eVNldD8uYW5ub3RhdGlvbnM/LlVJPy5GYWNldHMsIG9EaWFnbm9zdGljcywgb0VudGl0eVNldD8ubmFtZSwgMSk7XG5cdFx0fVxuXHR9KTtcblx0Y29uc3Qgc1RhcmdldEVudGl0eVNldE5hbWUgPSBvTWFuaWZlc3RTZXR0aW5ncy5lbnRpdHlTZXQ7XG5cdGNvbnN0IHNDb250ZXh0UGF0aCA9XG5cdFx0b01hbmlmZXN0U2V0dGluZ3M/LmNvbnRleHRQYXRoIHx8IChzRnVsbENvbnRleHRQYXRoID09PSBcIi9cIiA/IHNGdWxsQ29udGV4dFBhdGggKyBzVGFyZ2V0RW50aXR5U2V0TmFtZSA6IHNGdWxsQ29udGV4dFBhdGgpO1xuXHRjb25zdCBvQ29udGV4dCA9IG9NZXRhTW9kZWwuY3JlYXRlQmluZGluZ0NvbnRleHQoc0NvbnRleHRQYXRoKSBhcyBDb250ZXh0O1xuXHRjb25zdCBvRnVsbENvbnRleHQgPSBnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdHMob0NvbnRleHQpO1xuXG5cdGlmIChvRnVsbENvbnRleHQpIHtcblx0XHRsZXQgb0NvbnZlcnRlZFBhZ2UgPSB7fTtcblx0XHRjb25zdCBjb252ZXJ0ZXJDb250ZXh0ID0gbmV3IENvbnZlcnRlckNvbnRleHQob0NvbnZlcnRlZE1ldGFkYXRhLCBvTWFuaWZlc3RTZXR0aW5ncywgb0RpYWdub3N0aWNzLCBtZXJnZSwgb0Z1bGxDb250ZXh0KTtcblx0XHRzd2l0Y2ggKHNUZW1wbGF0ZVR5cGUpIHtcblx0XHRcdGNhc2UgVGVtcGxhdGVUeXBlLkxpc3RSZXBvcnQ6XG5cdFx0XHRjYXNlIFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2U6XG5cdFx0XHRcdG9Db252ZXJ0ZWRQYWdlID0gTGlzdFJlcG9ydENvbnZlcnRlci5jb252ZXJ0UGFnZShjb252ZXJ0ZXJDb250ZXh0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFRlbXBsYXRlVHlwZS5PYmplY3RQYWdlOlxuXHRcdFx0XHRvQ29udmVydGVkUGFnZSA9IE9iamVjdFBhZ2VDb252ZXJ0ZXIuY29udmVydFBhZ2UoY29udmVydGVyQ29udGV4dCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRpZiAoY29tcG9uZW50Py5leHRlbmRQYWdlRGVmaW5pdGlvbikge1xuXHRcdFx0b0NvbnZlcnRlZFBhZ2UgPSBjb21wb25lbnQuZXh0ZW5kUGFnZURlZmluaXRpb24ob0NvbnZlcnRlZFBhZ2UsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRcdH1cblx0XHRyZXR1cm4g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