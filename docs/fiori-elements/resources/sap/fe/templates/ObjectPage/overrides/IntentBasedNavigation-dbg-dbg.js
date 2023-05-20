/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/CommonUtils", "sap/fe/navigation/SelectionVariant"], function (CommonUtils, SelectionVariant) {
  "use strict";

  const IntentBasedNavigationOverride = {
    adaptNavigationContext: function (oSelectionVariant, oTargetInfo) {
      const oView = this.getView(),
        oController = oView.getController(),
        sMergeContext = oController.intentBasedNavigation.adaptContextPreparationStrategy(oTargetInfo),
        oInternalModelContext = this.getView().getBindingContext("internal"),
        oExternalNavigationContext = oInternalModelContext.getProperty("externalNavigationContext");
      const oAppComponent = CommonUtils.getAppComponent(oView);
      const oMetaModel = oAppComponent.getModel().getMetaModel();
      if (oExternalNavigationContext.page && sMergeContext === "default") {
        const oPageContext = oView.getBindingContext(),
          sMetaPath = oMetaModel.getMetaPath(oPageContext.getPath());
        const oPageContextData = oController._intentBasedNavigation.removeSensitiveData(oPageContext.getObject(), sMetaPath),
          oPageData = oController._intentBasedNavigation.prepareContextForExternalNavigation(oPageContextData, oPageContext),
          oPagePropertiesWithoutConflict = oPageData.propertiesWithoutConflict,
          // TODO: move this also into the intent based navigation controller extension
          oPageSV = CommonUtils.addPageContextToSelectionVariant(new SelectionVariant(), oPageData.semanticAttributes, oView),
          oPropertiesWithoutConflict = oTargetInfo.propertiesWithoutConflict;
        const aSelectOptionPropertyNames = oPageSV.getSelectOptionsPropertyNames();
        aSelectOptionPropertyNames.forEach(function (sPropertyName) {
          if (!oSelectionVariant.getSelectOption(sPropertyName)) {
            oSelectionVariant.massAddSelectOption(sPropertyName, oPageSV.getSelectOption(sPropertyName));
          } else {
            // Only when there is no conflict do we need to add something
            // in all other case the conflicted paths are already added in prepareContextForExternalNavigation
            // if property was without conflict in incoming context then add path from incoming context to SV
            // TO-DO. Remove the check for oPropertiesWithoutConflict once semantic links functionality is covered
            if (oPropertiesWithoutConflict && sPropertyName in oPropertiesWithoutConflict) {
              oSelectionVariant.massAddSelectOption(oPropertiesWithoutConflict[sPropertyName], oSelectionVariant.getSelectOption(sPropertyName));
            }
            // if property was without conflict in page context then add path from page context to SV
            if (sPropertyName in oPagePropertiesWithoutConflict) {
              oSelectionVariant.massAddSelectOption(oPagePropertiesWithoutConflict[sPropertyName], oPageSV.getSelectOption(sPropertyName));
            }
          }
        });
        // remove non public properties from targetInfo
        delete oTargetInfo.propertiesWithoutConflict;
      }
      oInternalModelContext.setProperty("externalNavigationContext", {
        page: true
      });
    }
  };
  return IntentBasedNavigationOverride;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJbnRlbnRCYXNlZE5hdmlnYXRpb25PdmVycmlkZSIsImFkYXB0TmF2aWdhdGlvbkNvbnRleHQiLCJvU2VsZWN0aW9uVmFyaWFudCIsIm9UYXJnZXRJbmZvIiwib1ZpZXciLCJnZXRWaWV3Iiwib0NvbnRyb2xsZXIiLCJnZXRDb250cm9sbGVyIiwic01lcmdlQ29udGV4dCIsImludGVudEJhc2VkTmF2aWdhdGlvbiIsImFkYXB0Q29udGV4dFByZXBhcmF0aW9uU3RyYXRlZ3kiLCJvSW50ZXJuYWxNb2RlbENvbnRleHQiLCJnZXRCaW5kaW5nQ29udGV4dCIsIm9FeHRlcm5hbE5hdmlnYXRpb25Db250ZXh0IiwiZ2V0UHJvcGVydHkiLCJvQXBwQ29tcG9uZW50IiwiQ29tbW9uVXRpbHMiLCJnZXRBcHBDb21wb25lbnQiLCJvTWV0YU1vZGVsIiwiZ2V0TW9kZWwiLCJnZXRNZXRhTW9kZWwiLCJwYWdlIiwib1BhZ2VDb250ZXh0Iiwic01ldGFQYXRoIiwiZ2V0TWV0YVBhdGgiLCJnZXRQYXRoIiwib1BhZ2VDb250ZXh0RGF0YSIsIl9pbnRlbnRCYXNlZE5hdmlnYXRpb24iLCJyZW1vdmVTZW5zaXRpdmVEYXRhIiwiZ2V0T2JqZWN0Iiwib1BhZ2VEYXRhIiwicHJlcGFyZUNvbnRleHRGb3JFeHRlcm5hbE5hdmlnYXRpb24iLCJvUGFnZVByb3BlcnRpZXNXaXRob3V0Q29uZmxpY3QiLCJwcm9wZXJ0aWVzV2l0aG91dENvbmZsaWN0Iiwib1BhZ2VTViIsImFkZFBhZ2VDb250ZXh0VG9TZWxlY3Rpb25WYXJpYW50IiwiU2VsZWN0aW9uVmFyaWFudCIsInNlbWFudGljQXR0cmlidXRlcyIsIm9Qcm9wZXJ0aWVzV2l0aG91dENvbmZsaWN0IiwiYVNlbGVjdE9wdGlvblByb3BlcnR5TmFtZXMiLCJnZXRTZWxlY3RPcHRpb25zUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJzUHJvcGVydHlOYW1lIiwiZ2V0U2VsZWN0T3B0aW9uIiwibWFzc0FkZFNlbGVjdE9wdGlvbiIsInNldFByb3BlcnR5Il0sInNvdXJjZVJvb3QiOiIuIiwic291cmNlcyI6WyJJbnRlbnRCYXNlZE5hdmlnYXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vblV0aWxzIGZyb20gXCJzYXAvZmUvY29yZS9Db21tb25VdGlsc1wiO1xuaW1wb3J0IHR5cGUgSW50ZW50QmFzZWROYXZpZ2F0aW9uIGZyb20gXCJzYXAvZmUvY29yZS9jb250cm9sbGVyZXh0ZW5zaW9ucy9JbnRlbnRCYXNlZE5hdmlnYXRpb25cIjtcbmltcG9ydCB0eXBlIHsgSW50ZXJuYWxNb2RlbENvbnRleHQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9Nb2RlbEhlbHBlclwiO1xuaW1wb3J0IHR5cGUgUGFnZUNvbnRyb2xsZXIgZnJvbSBcInNhcC9mZS9jb3JlL1BhZ2VDb250cm9sbGVyXCI7XG5pbXBvcnQgU2VsZWN0aW9uVmFyaWFudCBmcm9tIFwic2FwL2ZlL25hdmlnYXRpb24vU2VsZWN0aW9uVmFyaWFudFwiO1xuaW1wb3J0IHR5cGUgQ29udGV4dCBmcm9tIFwic2FwL3VpL21vZGVsL0NvbnRleHRcIjtcbmltcG9ydCB0eXBlIE9EYXRhTWV0YU1vZGVsIGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjQvT0RhdGFNZXRhTW9kZWxcIjtcblxuY29uc3QgSW50ZW50QmFzZWROYXZpZ2F0aW9uT3ZlcnJpZGUgPSB7XG5cdGFkYXB0TmF2aWdhdGlvbkNvbnRleHQ6IGZ1bmN0aW9uICh0aGlzOiBJbnRlbnRCYXNlZE5hdmlnYXRpb24sIG9TZWxlY3Rpb25WYXJpYW50OiBhbnksIG9UYXJnZXRJbmZvOiBhbnkpIHtcblx0XHRjb25zdCBvVmlldyA9IHRoaXMuZ2V0VmlldygpLFxuXHRcdFx0b0NvbnRyb2xsZXIgPSBvVmlldy5nZXRDb250cm9sbGVyKCkgYXMgUGFnZUNvbnRyb2xsZXIsXG5cdFx0XHRzTWVyZ2VDb250ZXh0OiBTdHJpbmcgPSBvQ29udHJvbGxlci5pbnRlbnRCYXNlZE5hdmlnYXRpb24uYWRhcHRDb250ZXh0UHJlcGFyYXRpb25TdHJhdGVneShvVGFyZ2V0SW5mbyksXG5cdFx0XHRvSW50ZXJuYWxNb2RlbENvbnRleHQgPSB0aGlzLmdldFZpZXcoKS5nZXRCaW5kaW5nQ29udGV4dChcImludGVybmFsXCIpIGFzIEludGVybmFsTW9kZWxDb250ZXh0LFxuXHRcdFx0b0V4dGVybmFsTmF2aWdhdGlvbkNvbnRleHQgPSBvSW50ZXJuYWxNb2RlbENvbnRleHQuZ2V0UHJvcGVydHkoXCJleHRlcm5hbE5hdmlnYXRpb25Db250ZXh0XCIpO1xuXHRcdGNvbnN0IG9BcHBDb21wb25lbnQgPSBDb21tb25VdGlscy5nZXRBcHBDb21wb25lbnQob1ZpZXcpO1xuXHRcdGNvbnN0IG9NZXRhTW9kZWwgPSBvQXBwQ29tcG9uZW50LmdldE1vZGVsKCkuZ2V0TWV0YU1vZGVsKCkgYXMgT0RhdGFNZXRhTW9kZWw7XG5cdFx0aWYgKG9FeHRlcm5hbE5hdmlnYXRpb25Db250ZXh0LnBhZ2UgJiYgc01lcmdlQ29udGV4dCA9PT0gXCJkZWZhdWx0XCIpIHtcblx0XHRcdGNvbnN0IG9QYWdlQ29udGV4dCA9IG9WaWV3LmdldEJpbmRpbmdDb250ZXh0KCkgYXMgQ29udGV4dCxcblx0XHRcdFx0c01ldGFQYXRoID0gb01ldGFNb2RlbC5nZXRNZXRhUGF0aChvUGFnZUNvbnRleHQuZ2V0UGF0aCgpKTtcblx0XHRcdGNvbnN0IG9QYWdlQ29udGV4dERhdGEgPSBvQ29udHJvbGxlci5faW50ZW50QmFzZWROYXZpZ2F0aW9uLnJlbW92ZVNlbnNpdGl2ZURhdGEob1BhZ2VDb250ZXh0LmdldE9iamVjdCgpLCBzTWV0YVBhdGgpLFxuXHRcdFx0XHRvUGFnZURhdGEgPSBvQ29udHJvbGxlci5faW50ZW50QmFzZWROYXZpZ2F0aW9uLnByZXBhcmVDb250ZXh0Rm9yRXh0ZXJuYWxOYXZpZ2F0aW9uKG9QYWdlQ29udGV4dERhdGEsIG9QYWdlQ29udGV4dCksXG5cdFx0XHRcdG9QYWdlUHJvcGVydGllc1dpdGhvdXRDb25mbGljdCA9IG9QYWdlRGF0YS5wcm9wZXJ0aWVzV2l0aG91dENvbmZsaWN0LFxuXHRcdFx0XHQvLyBUT0RPOiBtb3ZlIHRoaXMgYWxzbyBpbnRvIHRoZSBpbnRlbnQgYmFzZWQgbmF2aWdhdGlvbiBjb250cm9sbGVyIGV4dGVuc2lvblxuXHRcdFx0XHRvUGFnZVNWOiBhbnkgPSBDb21tb25VdGlscy5hZGRQYWdlQ29udGV4dFRvU2VsZWN0aW9uVmFyaWFudChuZXcgU2VsZWN0aW9uVmFyaWFudCgpLCBvUGFnZURhdGEuc2VtYW50aWNBdHRyaWJ1dGVzLCBvVmlldyksXG5cdFx0XHRcdG9Qcm9wZXJ0aWVzV2l0aG91dENvbmZsaWN0ID0gb1RhcmdldEluZm8ucHJvcGVydGllc1dpdGhvdXRDb25mbGljdDtcblx0XHRcdGNvbnN0IGFTZWxlY3RPcHRpb25Qcm9wZXJ0eU5hbWVzID0gb1BhZ2VTVi5nZXRTZWxlY3RPcHRpb25zUHJvcGVydHlOYW1lcygpO1xuXHRcdFx0YVNlbGVjdE9wdGlvblByb3BlcnR5TmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoc1Byb3BlcnR5TmFtZTogYW55KSB7XG5cdFx0XHRcdGlmICghb1NlbGVjdGlvblZhcmlhbnQuZ2V0U2VsZWN0T3B0aW9uKHNQcm9wZXJ0eU5hbWUpKSB7XG5cdFx0XHRcdFx0b1NlbGVjdGlvblZhcmlhbnQubWFzc0FkZFNlbGVjdE9wdGlvbihzUHJvcGVydHlOYW1lLCBvUGFnZVNWLmdldFNlbGVjdE9wdGlvbihzUHJvcGVydHlOYW1lKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gT25seSB3aGVuIHRoZXJlIGlzIG5vIGNvbmZsaWN0IGRvIHdlIG5lZWQgdG8gYWRkIHNvbWV0aGluZ1xuXHRcdFx0XHRcdC8vIGluIGFsbCBvdGhlciBjYXNlIHRoZSBjb25mbGljdGVkIHBhdGhzIGFyZSBhbHJlYWR5IGFkZGVkIGluIHByZXBhcmVDb250ZXh0Rm9yRXh0ZXJuYWxOYXZpZ2F0aW9uXG5cdFx0XHRcdFx0Ly8gaWYgcHJvcGVydHkgd2FzIHdpdGhvdXQgY29uZmxpY3QgaW4gaW5jb21pbmcgY29udGV4dCB0aGVuIGFkZCBwYXRoIGZyb20gaW5jb21pbmcgY29udGV4dCB0byBTVlxuXHRcdFx0XHRcdC8vIFRPLURPLiBSZW1vdmUgdGhlIGNoZWNrIGZvciBvUHJvcGVydGllc1dpdGhvdXRDb25mbGljdCBvbmNlIHNlbWFudGljIGxpbmtzIGZ1bmN0aW9uYWxpdHkgaXMgY292ZXJlZFxuXHRcdFx0XHRcdGlmIChvUHJvcGVydGllc1dpdGhvdXRDb25mbGljdCAmJiBzUHJvcGVydHlOYW1lIGluIG9Qcm9wZXJ0aWVzV2l0aG91dENvbmZsaWN0KSB7XG5cdFx0XHRcdFx0XHRvU2VsZWN0aW9uVmFyaWFudC5tYXNzQWRkU2VsZWN0T3B0aW9uKFxuXHRcdFx0XHRcdFx0XHRvUHJvcGVydGllc1dpdGhvdXRDb25mbGljdFtzUHJvcGVydHlOYW1lXSxcblx0XHRcdFx0XHRcdFx0b1NlbGVjdGlvblZhcmlhbnQuZ2V0U2VsZWN0T3B0aW9uKHNQcm9wZXJ0eU5hbWUpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBpZiBwcm9wZXJ0eSB3YXMgd2l0aG91dCBjb25mbGljdCBpbiBwYWdlIGNvbnRleHQgdGhlbiBhZGQgcGF0aCBmcm9tIHBhZ2UgY29udGV4dCB0byBTVlxuXHRcdFx0XHRcdGlmIChzUHJvcGVydHlOYW1lIGluIG9QYWdlUHJvcGVydGllc1dpdGhvdXRDb25mbGljdCkge1xuXHRcdFx0XHRcdFx0b1NlbGVjdGlvblZhcmlhbnQubWFzc0FkZFNlbGVjdE9wdGlvbihcblx0XHRcdFx0XHRcdFx0b1BhZ2VQcm9wZXJ0aWVzV2l0aG91dENvbmZsaWN0W3NQcm9wZXJ0eU5hbWVdLFxuXHRcdFx0XHRcdFx0XHRvUGFnZVNWLmdldFNlbGVjdE9wdGlvbihzUHJvcGVydHlOYW1lKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Ly8gcmVtb3ZlIG5vbiBwdWJsaWMgcHJvcGVydGllcyBmcm9tIHRhcmdldEluZm9cblx0XHRcdGRlbGV0ZSBvVGFyZ2V0SW5mby5wcm9wZXJ0aWVzV2l0aG91dENvbmZsaWN0O1xuXHRcdH1cblx0XHRvSW50ZXJuYWxNb2RlbENvbnRleHQuc2V0UHJvcGVydHkoXCJleHRlcm5hbE5hdmlnYXRpb25Db250ZXh0XCIsIHsgcGFnZTogdHJ1ZSB9KTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW50ZW50QmFzZWROYXZpZ2F0aW9uT3ZlcnJpZGU7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQUE7Ozs7RUFRQSxNQUFNQSw2QkFBNkIsR0FBRztJQUNyQ0Msc0JBQXNCLEVBQUUsVUFBdUNDLGlCQUFzQixFQUFFQyxXQUFnQixFQUFFO01BQ3hHLE1BQU1DLEtBQUssR0FBRyxJQUFJLENBQUNDLE9BQU8sRUFBRTtRQUMzQkMsV0FBVyxHQUFHRixLQUFLLENBQUNHLGFBQWEsRUFBb0I7UUFDckRDLGFBQXFCLEdBQUdGLFdBQVcsQ0FBQ0cscUJBQXFCLENBQUNDLCtCQUErQixDQUFDUCxXQUFXLENBQUM7UUFDdEdRLHFCQUFxQixHQUFHLElBQUksQ0FBQ04sT0FBTyxFQUFFLENBQUNPLGlCQUFpQixDQUFDLFVBQVUsQ0FBeUI7UUFDNUZDLDBCQUEwQixHQUFHRixxQkFBcUIsQ0FBQ0csV0FBVyxDQUFDLDJCQUEyQixDQUFDO01BQzVGLE1BQU1DLGFBQWEsR0FBR0MsV0FBVyxDQUFDQyxlQUFlLENBQUNiLEtBQUssQ0FBQztNQUN4RCxNQUFNYyxVQUFVLEdBQUdILGFBQWEsQ0FBQ0ksUUFBUSxFQUFFLENBQUNDLFlBQVksRUFBb0I7TUFDNUUsSUFBSVAsMEJBQTBCLENBQUNRLElBQUksSUFBSWIsYUFBYSxLQUFLLFNBQVMsRUFBRTtRQUNuRSxNQUFNYyxZQUFZLEdBQUdsQixLQUFLLENBQUNRLGlCQUFpQixFQUFhO1VBQ3hEVyxTQUFTLEdBQUdMLFVBQVUsQ0FBQ00sV0FBVyxDQUFDRixZQUFZLENBQUNHLE9BQU8sRUFBRSxDQUFDO1FBQzNELE1BQU1DLGdCQUFnQixHQUFHcEIsV0FBVyxDQUFDcUIsc0JBQXNCLENBQUNDLG1CQUFtQixDQUFDTixZQUFZLENBQUNPLFNBQVMsRUFBRSxFQUFFTixTQUFTLENBQUM7VUFDbkhPLFNBQVMsR0FBR3hCLFdBQVcsQ0FBQ3FCLHNCQUFzQixDQUFDSSxtQ0FBbUMsQ0FBQ0wsZ0JBQWdCLEVBQUVKLFlBQVksQ0FBQztVQUNsSFUsOEJBQThCLEdBQUdGLFNBQVMsQ0FBQ0cseUJBQXlCO1VBQ3BFO1VBQ0FDLE9BQVksR0FBR2xCLFdBQVcsQ0FBQ21CLGdDQUFnQyxDQUFDLElBQUlDLGdCQUFnQixFQUFFLEVBQUVOLFNBQVMsQ0FBQ08sa0JBQWtCLEVBQUVqQyxLQUFLLENBQUM7VUFDeEhrQywwQkFBMEIsR0FBR25DLFdBQVcsQ0FBQzhCLHlCQUF5QjtRQUNuRSxNQUFNTSwwQkFBMEIsR0FBR0wsT0FBTyxDQUFDTSw2QkFBNkIsRUFBRTtRQUMxRUQsMEJBQTBCLENBQUNFLE9BQU8sQ0FBQyxVQUFVQyxhQUFrQixFQUFFO1VBQ2hFLElBQUksQ0FBQ3hDLGlCQUFpQixDQUFDeUMsZUFBZSxDQUFDRCxhQUFhLENBQUMsRUFBRTtZQUN0RHhDLGlCQUFpQixDQUFDMEMsbUJBQW1CLENBQUNGLGFBQWEsRUFBRVIsT0FBTyxDQUFDUyxlQUFlLENBQUNELGFBQWEsQ0FBQyxDQUFDO1VBQzdGLENBQUMsTUFBTTtZQUNOO1lBQ0E7WUFDQTtZQUNBO1lBQ0EsSUFBSUosMEJBQTBCLElBQUlJLGFBQWEsSUFBSUosMEJBQTBCLEVBQUU7Y0FDOUVwQyxpQkFBaUIsQ0FBQzBDLG1CQUFtQixDQUNwQ04sMEJBQTBCLENBQUNJLGFBQWEsQ0FBQyxFQUN6Q3hDLGlCQUFpQixDQUFDeUMsZUFBZSxDQUFDRCxhQUFhLENBQUMsQ0FDaEQ7WUFDRjtZQUNBO1lBQ0EsSUFBSUEsYUFBYSxJQUFJViw4QkFBOEIsRUFBRTtjQUNwRDlCLGlCQUFpQixDQUFDMEMsbUJBQW1CLENBQ3BDWiw4QkFBOEIsQ0FBQ1UsYUFBYSxDQUFDLEVBQzdDUixPQUFPLENBQUNTLGVBQWUsQ0FBQ0QsYUFBYSxDQUFDLENBQ3RDO1lBQ0Y7VUFDRDtRQUNELENBQUMsQ0FBQztRQUNGO1FBQ0EsT0FBT3ZDLFdBQVcsQ0FBQzhCLHlCQUF5QjtNQUM3QztNQUNBdEIscUJBQXFCLENBQUNrQyxXQUFXLENBQUMsMkJBQTJCLEVBQUU7UUFBRXhCLElBQUksRUFBRTtNQUFLLENBQUMsQ0FBQztJQUMvRTtFQUNELENBQUM7RUFBQyxPQUVhckIsNkJBQTZCO0FBQUEifQ==