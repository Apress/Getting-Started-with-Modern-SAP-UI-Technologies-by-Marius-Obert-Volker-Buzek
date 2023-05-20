/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log", "sap/fe/core/controllerextensions/collaboration/ActivitySync", "sap/fe/core/controls/DataLossOrDraftDiscard/DataLossOrDraftDiscardHandler", "sap/fe/core/helpers/EditState"], function (Log, ActivitySync, DataLossOrDraftDiscardHandler, EditState) {
  "use strict";

  /* Enum for navigation types */
  var NavigationType;
  /**
   * The method checks whether an optional parameter in the manifest is set to silently keep the draft in case a forward navigation is triggered.
   *
   * @param pageController The reference to the current PageController instance
   * @returns Boolean value with true or false to silently keep the draft
   */
  (function (NavigationType) {
    NavigationType["BackNavigation"] = "BackNavigation";
    NavigationType["ForwardNavigation"] = "ForwardNavigation";
  })(NavigationType || (NavigationType = {}));
  function silentlyKeepDraftOnForwardNavigation(pageController) {
    var _oManifest$sapFe, _oManifest$sapFe$app;
    let rbSilentlyKeep = false;
    const oManifest = pageController.getAppComponent().getManifest();
    rbSilentlyKeep = (oManifest === null || oManifest === void 0 ? void 0 : (_oManifest$sapFe = oManifest["sap.fe"]) === null || _oManifest$sapFe === void 0 ? void 0 : (_oManifest$sapFe$app = _oManifest$sapFe.app) === null || _oManifest$sapFe$app === void 0 ? void 0 : _oManifest$sapFe$app.silentlyKeepDraftOnForwardNavigation) || false;
    return rbSilentlyKeep;
  }

  /**
   * Logic to process the fcl mode.
   *
   * @param draftAdminData Admin data
   * @param fnCancelFunction The cancel function
   * @param oController The current controller referenced
   * @param processFunctionForDrafts The functon to process the handler
   * @param bSkipBindingToView The optional parameter to skip the binding to the view
   */
  async function processFclMode(draftAdminData, fnCancelFunction, oController, processFunctionForDrafts, bSkipBindingToView) {
    // The application is running in FCL mode so in this case we fall back to
    // the old logic since the dirty state handling is not properly working
    // for FCL.
    if (draftAdminData.CreationDateTime !== draftAdminData.LastChangeDateTime) {
      DataLossOrDraftDiscardHandler.performAfterDiscardorKeepDraft(processFunctionForDrafts, fnCancelFunction, oController, bSkipBindingToView);
    } else {
      processFunctionForDrafts();
    }
  }

  /**
   * Logic to process the mode with no active entity.
   *
   * @param draftAdminData Admin data
   * @param fnCancelFunction The cancel function
   * @param oController The current controller referenced
   * @param processFunctionForDrafts The functon to process the handler
   * @param navigationType The navigation type for which the function should be called
   * @param bSilentlyKeepDraftOnForwardNavigation The parameter to determine whether to skip the popup appearance in forward case
   * @param bSkipBindingToView The optional parameter to skip the binding to the view
   */
  async function processNoActiveEntityMode(draftAdminData, fnCancelFunction, oController, processFunctionForDrafts, navigationType, bSilentlyKeepDraftOnForwardNavigation, bSkipBindingToView) {
    // There is no active entity so we are editing either newly created data or
    // a draft which has never been saved to active version
    // Since we want to react differently in the two situations, we have to check the
    // dirty state
    if (EditState.isEditStateDirty()) {
      if (draftAdminData.CreationDateTime === draftAdminData.LastChangeDateTime && navigationType === NavigationType.BackNavigation) {
        // in case we have untouched changes for the draft and a "back"
        // navigation we can silently discard the draft again
        // eslint-disable-next-line promise/no-nesting
        try {
          await DataLossOrDraftDiscardHandler.discardDraft(oController, bSkipBindingToView);
          processFunctionForDrafts();
        } catch (error) {
          Log.error("Error while canceling the document", error);
        }
      } else if (navigationType === NavigationType.ForwardNavigation && bSilentlyKeepDraftOnForwardNavigation) {
        // In case we have a "forward navigation" and an additional parameter set in the manifest
        // we "silently" keep the draft
        processFunctionForDrafts();
      } else {
        // In this case data is being changed or a forward navigation is triggered
        // and we always want to show the dataloss dialog on navigation
        DataLossOrDraftDiscardHandler.performAfterDiscardorKeepDraft(processFunctionForDrafts, fnCancelFunction, oController, bSkipBindingToView);
      }
    } else {
      // We are editing a draft which has been created earlier but never saved to active
      // version and since the edit state is not dirty, there have been no user changes
      // so in this case we want to silently navigate and do nothing
      processFunctionForDrafts();
    }
  }
  /**
   * Logic to process the draft editing for existing entity.
   *
   * @param oController The current controller referenced.
   * @param oContext The context of the current call
   * @param processFunctionForDrafts The functon to process the handler
   * @param navigationType The navigation type for which the function should be called
   */
  async function processEditingDraftForExistingEntity(oController, oContext, processFunctionForDrafts, navigationType) {
    // We are editing a draft for an existing active entity
    // The CreationDateTime and LastChangeDateTime are equal, so this draft was
    // never saved before, hence we're currently editing a newly created draft for
    // an existing active entity for the first time.
    // Also there have so far been no changes made to the draft and in this
    // case we want to silently navigate and delete the draftin case of a back
    // navigation but in case of a forward navigation we want to silently keep it!
    if (navigationType === NavigationType.BackNavigation) {
      const mParameters = {
        skipDiscardPopover: true
      };
      try {
        await oController.editFlow.cancelDocument(oContext, mParameters);
        processFunctionForDrafts();
      } catch (error) {
        Log.error("Error while canceling the document", error);
      }
    } else {
      // In case of a forward navigation we silently keep the draft and only
      // execute the followup function.
      processFunctionForDrafts();
    }
  }

  /**
   * Logic to process the edit state dirty.
   *
   * @param oController The current controller referenced.
   * @param fnCancelFunction The cancel function
   * @param processFunctionForDrafts The functon to process the handler
   * @param navigationType The navigation type for which the function should be called
   * @param bSilentlyKeepDraftOnForwardNavigation The parameter to determine whether to skip the popup appearance in forward case
   * @param bSkipBindingToView The optional parameter to skip the binding to the view.
   */
  async function processEditStateDirty(oController, fnCancelFunction, processFunctionForDrafts, navigationType, bSilentlyKeepDraftOnForwardNavigation, bSkipBindingToView) {
    if (navigationType === NavigationType.ForwardNavigation && bSilentlyKeepDraftOnForwardNavigation) {
      // In case we have a "forward navigation" and an additional parameter set in the manifest
      // we "silently" keep the draft
      processFunctionForDrafts();
    } else {
      // The CreationDateTime and LastChangeDateTime are NOT equal, so we are currently editing
      // an existing draft and need to distinguish depending on if any changes
      // have been made in the current editing session or not
      // Changes have been made in the current editing session so we want
      // to show the dataloss dialog and let the user decide
      DataLossOrDraftDiscardHandler.performAfterDiscardorKeepDraft(processFunctionForDrafts, fnCancelFunction, oController, bSkipBindingToView);
    }
  }

  /**
   * Logic to process the admin data.
   *
   * @param draftAdminData Admin data
   * @param fnProcessFunction The functon to process the handler
   * @param fnCancelFunction The cancel function
   * @param oContext The context of the current call
   * @param oController The current controller referenced
   * @param bSkipBindingToView The optional parameter to skip the binding to the view
   * @param navigationType The navigation type for which the function should be called
   */
  async function processDraftAdminData(draftAdminData, fnProcessFunction, fnCancelFunction, oContext, oController, bSkipBindingToView) {
    let navigationType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : NavigationType.BackNavigation;
    const collaborationConnected = ActivitySync.isConnected(oController.getView());
    const processFunctionForDrafts = !collaborationConnected ? fnProcessFunction : function () {
      ActivitySync.disconnect(oController.getView());
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      fnProcessFunction.apply(null, ...args);
    };
    const bSilentlyKeepDraftOnForwardNavigation = silentlyKeepDraftOnForwardNavigation(oController);
    if (draftAdminData) {
      if (oController.getAppComponent().getRootViewController().isFclEnabled()) {
        await processFclMode(draftAdminData, fnCancelFunction, oController, processFunctionForDrafts, bSkipBindingToView);
      } else if (!oContext.getObject().HasActiveEntity) {
        processNoActiveEntityMode(draftAdminData, fnCancelFunction, oController, processFunctionForDrafts, navigationType, bSilentlyKeepDraftOnForwardNavigation, bSkipBindingToView);
      } else if (draftAdminData.CreationDateTime === draftAdminData.LastChangeDateTime) {
        processEditingDraftForExistingEntity(oController, oContext, processFunctionForDrafts, navigationType);
      } else if (EditState.isEditStateDirty()) {
        processEditStateDirty(oController, fnCancelFunction, processFunctionForDrafts, navigationType, bSilentlyKeepDraftOnForwardNavigation, bSkipBindingToView);
      } else {
        // The user started editing the existing draft but did not make any changes
        // in the current editing session, so in this case we do not want
        // to show the dataloss dialog but just keep the draft
        processFunctionForDrafts();
      }
    } else {
      fnProcessFunction();
    }
  }

  /**
   * The general handler in which the individual steps are called.
   *
   * @param fnProcessFunction
   * @param fnCancelFunction
   * @param oContext
   * @param oController
   * @param bSkipBindingToView
   * @param navigationType
   */
  async function processDataLossOrDraftDiscardConfirmation(fnProcessFunction, fnCancelFunction, oContext, oController, bSkipBindingToView) {
    let navigationType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : NavigationType.BackNavigation;
    const oView = oController.getView();
    const oModel = oContext.getModel();
    const oMetaModel = oModel.getMetaModel();
    const sEntitySet = oView.getViewData().entitySet ?? "";
    const oDraftRoot = sEntitySet && oMetaModel.getObject("/" + sEntitySet + "@com.sap.vocabularies.Common.v1.DraftRoot");
    const oUIModel = oView.getModel("ui");
    const bIsEditable = oUIModel.getProperty("/isEditable");
    const draftDataContext = oModel.bindContext(`${oContext.getPath()}/DraftAdministrativeData`).getBoundContext();

    // Shouldn't display data loss popover on shell back navigation from sub-object pages
    // and when object page is in display mode
    if (oContext && oContext.getObject() && (!oDraftRoot && navigationType === NavigationType.BackNavigation || !bIsEditable)) {
      fnProcessFunction();
    } else {
      try {
        const draftAdminData = await draftDataContext.requestObject();
        await processDraftAdminData(draftAdminData, fnProcessFunction, fnCancelFunction, oContext, oController, bSkipBindingToView, navigationType);
      } catch (oError) {
        Log.error("Cannot retrieve draftDataContext information", oError);
      }
    }
  }
  const draftDataLossPopup = {
    processDataLossOrDraftDiscardConfirmation: processDataLossOrDraftDiscardConfirmation,
    silentlyKeepDraftOnForwardNavigation: silentlyKeepDraftOnForwardNavigation,
    NavigationType: NavigationType,
    processFclMode: processFclMode,
    processNoActiveEntityMode: processNoActiveEntityMode,
    processEditingDraftForExistingEntity: processEditingDraftForExistingEntity,
    processEditStateDirty: processEditStateDirty
  };
  return draftDataLossPopup;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOYXZpZ2F0aW9uVHlwZSIsInNpbGVudGx5S2VlcERyYWZ0T25Gb3J3YXJkTmF2aWdhdGlvbiIsInBhZ2VDb250cm9sbGVyIiwicmJTaWxlbnRseUtlZXAiLCJvTWFuaWZlc3QiLCJnZXRBcHBDb21wb25lbnQiLCJnZXRNYW5pZmVzdCIsImFwcCIsInByb2Nlc3NGY2xNb2RlIiwiZHJhZnRBZG1pbkRhdGEiLCJmbkNhbmNlbEZ1bmN0aW9uIiwib0NvbnRyb2xsZXIiLCJwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMiLCJiU2tpcEJpbmRpbmdUb1ZpZXciLCJDcmVhdGlvbkRhdGVUaW1lIiwiTGFzdENoYW5nZURhdGVUaW1lIiwiRGF0YUxvc3NPckRyYWZ0RGlzY2FyZEhhbmRsZXIiLCJwZXJmb3JtQWZ0ZXJEaXNjYXJkb3JLZWVwRHJhZnQiLCJwcm9jZXNzTm9BY3RpdmVFbnRpdHlNb2RlIiwibmF2aWdhdGlvblR5cGUiLCJiU2lsZW50bHlLZWVwRHJhZnRPbkZvcndhcmROYXZpZ2F0aW9uIiwiRWRpdFN0YXRlIiwiaXNFZGl0U3RhdGVEaXJ0eSIsIkJhY2tOYXZpZ2F0aW9uIiwiZGlzY2FyZERyYWZ0IiwiZXJyb3IiLCJMb2ciLCJGb3J3YXJkTmF2aWdhdGlvbiIsInByb2Nlc3NFZGl0aW5nRHJhZnRGb3JFeGlzdGluZ0VudGl0eSIsIm9Db250ZXh0IiwibVBhcmFtZXRlcnMiLCJza2lwRGlzY2FyZFBvcG92ZXIiLCJlZGl0RmxvdyIsImNhbmNlbERvY3VtZW50IiwicHJvY2Vzc0VkaXRTdGF0ZURpcnR5IiwicHJvY2Vzc0RyYWZ0QWRtaW5EYXRhIiwiZm5Qcm9jZXNzRnVuY3Rpb24iLCJjb2xsYWJvcmF0aW9uQ29ubmVjdGVkIiwiQWN0aXZpdHlTeW5jIiwiaXNDb25uZWN0ZWQiLCJnZXRWaWV3IiwiZGlzY29ubmVjdCIsImFyZ3MiLCJhcHBseSIsImdldFJvb3RWaWV3Q29udHJvbGxlciIsImlzRmNsRW5hYmxlZCIsImdldE9iamVjdCIsIkhhc0FjdGl2ZUVudGl0eSIsInByb2Nlc3NEYXRhTG9zc09yRHJhZnREaXNjYXJkQ29uZmlybWF0aW9uIiwib1ZpZXciLCJvTW9kZWwiLCJnZXRNb2RlbCIsIm9NZXRhTW9kZWwiLCJnZXRNZXRhTW9kZWwiLCJzRW50aXR5U2V0IiwiZ2V0Vmlld0RhdGEiLCJlbnRpdHlTZXQiLCJvRHJhZnRSb290Iiwib1VJTW9kZWwiLCJiSXNFZGl0YWJsZSIsImdldFByb3BlcnR5IiwiZHJhZnREYXRhQ29udGV4dCIsImJpbmRDb250ZXh0IiwiZ2V0UGF0aCIsImdldEJvdW5kQ29udGV4dCIsInJlcXVlc3RPYmplY3QiLCJvRXJyb3IiLCJkcmFmdERhdGFMb3NzUG9wdXAiXSwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzIjpbImRyYWZ0RGF0YUxvc3NQb3B1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nIGZyb20gXCJzYXAvYmFzZS9Mb2dcIjtcbmltcG9ydCBBY3Rpdml0eVN5bmMgZnJvbSBcInNhcC9mZS9jb3JlL2NvbnRyb2xsZXJleHRlbnNpb25zL2NvbGxhYm9yYXRpb24vQWN0aXZpdHlTeW5jXCI7XG5pbXBvcnQgRGF0YUxvc3NPckRyYWZ0RGlzY2FyZEhhbmRsZXIgZnJvbSBcInNhcC9mZS9jb3JlL2NvbnRyb2xzL0RhdGFMb3NzT3JEcmFmdERpc2NhcmQvRGF0YUxvc3NPckRyYWZ0RGlzY2FyZEhhbmRsZXJcIjtcbmltcG9ydCBFZGl0U3RhdGUgZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvRWRpdFN0YXRlXCI7XG5pbXBvcnQgdHlwZSBQYWdlQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vUGFnZUNvbnRyb2xsZXJcIjtcblxuLyogRW51bSBmb3IgbmF2aWdhdGlvbiB0eXBlcyAqL1xuZW51bSBOYXZpZ2F0aW9uVHlwZSB7XG5cdEJhY2tOYXZpZ2F0aW9uID0gXCJCYWNrTmF2aWdhdGlvblwiLFxuXHRGb3J3YXJkTmF2aWdhdGlvbiA9IFwiRm9yd2FyZE5hdmlnYXRpb25cIlxufVxuXG4vKipcbiAqIFRoZSBtZXRob2QgY2hlY2tzIHdoZXRoZXIgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIGluIHRoZSBtYW5pZmVzdCBpcyBzZXQgdG8gc2lsZW50bHkga2VlcCB0aGUgZHJhZnQgaW4gY2FzZSBhIGZvcndhcmQgbmF2aWdhdGlvbiBpcyB0cmlnZ2VyZWQuXG4gKlxuICogQHBhcmFtIHBhZ2VDb250cm9sbGVyIFRoZSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgUGFnZUNvbnRyb2xsZXIgaW5zdGFuY2VcbiAqIEByZXR1cm5zIEJvb2xlYW4gdmFsdWUgd2l0aCB0cnVlIG9yIGZhbHNlIHRvIHNpbGVudGx5IGtlZXAgdGhlIGRyYWZ0XG4gKi9cbmZ1bmN0aW9uIHNpbGVudGx5S2VlcERyYWZ0T25Gb3J3YXJkTmF2aWdhdGlvbihwYWdlQ29udHJvbGxlcjogUGFnZUNvbnRyb2xsZXIpIHtcblx0bGV0IHJiU2lsZW50bHlLZWVwID0gZmFsc2U7XG5cdGNvbnN0IG9NYW5pZmVzdCA9IHBhZ2VDb250cm9sbGVyLmdldEFwcENvbXBvbmVudCgpLmdldE1hbmlmZXN0KCkgYXMgYW55O1xuXHRyYlNpbGVudGx5S2VlcCA9IG9NYW5pZmVzdD8uW1wic2FwLmZlXCJdPy5hcHA/LnNpbGVudGx5S2VlcERyYWZ0T25Gb3J3YXJkTmF2aWdhdGlvbiB8fCBmYWxzZTtcblx0cmV0dXJuIHJiU2lsZW50bHlLZWVwO1xufVxuXG4vKipcbiAqIExvZ2ljIHRvIHByb2Nlc3MgdGhlIGZjbCBtb2RlLlxuICpcbiAqIEBwYXJhbSBkcmFmdEFkbWluRGF0YSBBZG1pbiBkYXRhXG4gKiBAcGFyYW0gZm5DYW5jZWxGdW5jdGlvbiBUaGUgY2FuY2VsIGZ1bmN0aW9uXG4gKiBAcGFyYW0gb0NvbnRyb2xsZXIgVGhlIGN1cnJlbnQgY29udHJvbGxlciByZWZlcmVuY2VkXG4gKiBAcGFyYW0gcHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzIFRoZSBmdW5jdG9uIHRvIHByb2Nlc3MgdGhlIGhhbmRsZXJcbiAqIEBwYXJhbSBiU2tpcEJpbmRpbmdUb1ZpZXcgVGhlIG9wdGlvbmFsIHBhcmFtZXRlciB0byBza2lwIHRoZSBiaW5kaW5nIHRvIHRoZSB2aWV3XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NGY2xNb2RlKFxuXHRkcmFmdEFkbWluRGF0YTogYW55LFxuXHRmbkNhbmNlbEZ1bmN0aW9uOiBhbnksXG5cdG9Db250cm9sbGVyOiBhbnksXG5cdHByb2Nlc3NGdW5jdGlvbkZvckRyYWZ0czogYW55LFxuXHRiU2tpcEJpbmRpbmdUb1ZpZXc/OiBib29sZWFuXG4pIHtcblx0Ly8gVGhlIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgaW4gRkNMIG1vZGUgc28gaW4gdGhpcyBjYXNlIHdlIGZhbGwgYmFjayB0b1xuXHQvLyB0aGUgb2xkIGxvZ2ljIHNpbmNlIHRoZSBkaXJ0eSBzdGF0ZSBoYW5kbGluZyBpcyBub3QgcHJvcGVybHkgd29ya2luZ1xuXHQvLyBmb3IgRkNMLlxuXHRpZiAoZHJhZnRBZG1pbkRhdGEuQ3JlYXRpb25EYXRlVGltZSAhPT0gZHJhZnRBZG1pbkRhdGEuTGFzdENoYW5nZURhdGVUaW1lKSB7XG5cdFx0RGF0YUxvc3NPckRyYWZ0RGlzY2FyZEhhbmRsZXIucGVyZm9ybUFmdGVyRGlzY2FyZG9yS2VlcERyYWZ0KFxuXHRcdFx0cHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzLFxuXHRcdFx0Zm5DYW5jZWxGdW5jdGlvbixcblx0XHRcdG9Db250cm9sbGVyLFxuXHRcdFx0YlNraXBCaW5kaW5nVG9WaWV3XG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMoKTtcblx0fVxufVxuXG4vKipcbiAqIExvZ2ljIHRvIHByb2Nlc3MgdGhlIG1vZGUgd2l0aCBubyBhY3RpdmUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSBkcmFmdEFkbWluRGF0YSBBZG1pbiBkYXRhXG4gKiBAcGFyYW0gZm5DYW5jZWxGdW5jdGlvbiBUaGUgY2FuY2VsIGZ1bmN0aW9uXG4gKiBAcGFyYW0gb0NvbnRyb2xsZXIgVGhlIGN1cnJlbnQgY29udHJvbGxlciByZWZlcmVuY2VkXG4gKiBAcGFyYW0gcHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzIFRoZSBmdW5jdG9uIHRvIHByb2Nlc3MgdGhlIGhhbmRsZXJcbiAqIEBwYXJhbSBuYXZpZ2F0aW9uVHlwZSBUaGUgbmF2aWdhdGlvbiB0eXBlIGZvciB3aGljaCB0aGUgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZFxuICogQHBhcmFtIGJTaWxlbnRseUtlZXBEcmFmdE9uRm9yd2FyZE5hdmlnYXRpb24gVGhlIHBhcmFtZXRlciB0byBkZXRlcm1pbmUgd2hldGhlciB0byBza2lwIHRoZSBwb3B1cCBhcHBlYXJhbmNlIGluIGZvcndhcmQgY2FzZVxuICogQHBhcmFtIGJTa2lwQmluZGluZ1RvVmlldyBUaGUgb3B0aW9uYWwgcGFyYW1ldGVyIHRvIHNraXAgdGhlIGJpbmRpbmcgdG8gdGhlIHZpZXdcbiAqL1xuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc05vQWN0aXZlRW50aXR5TW9kZShcblx0ZHJhZnRBZG1pbkRhdGE6IGFueSxcblx0Zm5DYW5jZWxGdW5jdGlvbjogYW55LFxuXHRvQ29udHJvbGxlcjogYW55LFxuXHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHM6IGFueSxcblx0bmF2aWdhdGlvblR5cGU6IE5hdmlnYXRpb25UeXBlLFxuXHRiU2lsZW50bHlLZWVwRHJhZnRPbkZvcndhcmROYXZpZ2F0aW9uOiBib29sZWFuLFxuXHRiU2tpcEJpbmRpbmdUb1ZpZXc/OiBib29sZWFuXG4pIHtcblx0Ly8gVGhlcmUgaXMgbm8gYWN0aXZlIGVudGl0eSBzbyB3ZSBhcmUgZWRpdGluZyBlaXRoZXIgbmV3bHkgY3JlYXRlZCBkYXRhIG9yXG5cdC8vIGEgZHJhZnQgd2hpY2ggaGFzIG5ldmVyIGJlZW4gc2F2ZWQgdG8gYWN0aXZlIHZlcnNpb25cblx0Ly8gU2luY2Ugd2Ugd2FudCB0byByZWFjdCBkaWZmZXJlbnRseSBpbiB0aGUgdHdvIHNpdHVhdGlvbnMsIHdlIGhhdmUgdG8gY2hlY2sgdGhlXG5cdC8vIGRpcnR5IHN0YXRlXG5cdGlmIChFZGl0U3RhdGUuaXNFZGl0U3RhdGVEaXJ0eSgpKSB7XG5cdFx0aWYgKGRyYWZ0QWRtaW5EYXRhLkNyZWF0aW9uRGF0ZVRpbWUgPT09IGRyYWZ0QWRtaW5EYXRhLkxhc3RDaGFuZ2VEYXRlVGltZSAmJiBuYXZpZ2F0aW9uVHlwZSA9PT0gTmF2aWdhdGlvblR5cGUuQmFja05hdmlnYXRpb24pIHtcblx0XHRcdC8vIGluIGNhc2Ugd2UgaGF2ZSB1bnRvdWNoZWQgY2hhbmdlcyBmb3IgdGhlIGRyYWZ0IGFuZCBhIFwiYmFja1wiXG5cdFx0XHQvLyBuYXZpZ2F0aW9uIHdlIGNhbiBzaWxlbnRseSBkaXNjYXJkIHRoZSBkcmFmdCBhZ2FpblxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByb21pc2Uvbm8tbmVzdGluZ1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YXdhaXQgRGF0YUxvc3NPckRyYWZ0RGlzY2FyZEhhbmRsZXIuZGlzY2FyZERyYWZ0KG9Db250cm9sbGVyLCBiU2tpcEJpbmRpbmdUb1ZpZXcpO1xuXHRcdFx0XHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMoKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcblx0XHRcdFx0TG9nLmVycm9yKFwiRXJyb3Igd2hpbGUgY2FuY2VsaW5nIHRoZSBkb2N1bWVudFwiLCBlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChuYXZpZ2F0aW9uVHlwZSA9PT0gTmF2aWdhdGlvblR5cGUuRm9yd2FyZE5hdmlnYXRpb24gJiYgYlNpbGVudGx5S2VlcERyYWZ0T25Gb3J3YXJkTmF2aWdhdGlvbikge1xuXHRcdFx0Ly8gSW4gY2FzZSB3ZSBoYXZlIGEgXCJmb3J3YXJkIG5hdmlnYXRpb25cIiBhbmQgYW4gYWRkaXRpb25hbCBwYXJhbWV0ZXIgc2V0IGluIHRoZSBtYW5pZmVzdFxuXHRcdFx0Ly8gd2UgXCJzaWxlbnRseVwiIGtlZXAgdGhlIGRyYWZ0XG5cdFx0XHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSW4gdGhpcyBjYXNlIGRhdGEgaXMgYmVpbmcgY2hhbmdlZCBvciBhIGZvcndhcmQgbmF2aWdhdGlvbiBpcyB0cmlnZ2VyZWRcblx0XHRcdC8vIGFuZCB3ZSBhbHdheXMgd2FudCB0byBzaG93IHRoZSBkYXRhbG9zcyBkaWFsb2cgb24gbmF2aWdhdGlvblxuXHRcdFx0RGF0YUxvc3NPckRyYWZ0RGlzY2FyZEhhbmRsZXIucGVyZm9ybUFmdGVyRGlzY2FyZG9yS2VlcERyYWZ0KFxuXHRcdFx0XHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMsXG5cdFx0XHRcdGZuQ2FuY2VsRnVuY3Rpb24sXG5cdFx0XHRcdG9Db250cm9sbGVyLFxuXHRcdFx0XHRiU2tpcEJpbmRpbmdUb1ZpZXdcblx0XHRcdCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIFdlIGFyZSBlZGl0aW5nIGEgZHJhZnQgd2hpY2ggaGFzIGJlZW4gY3JlYXRlZCBlYXJsaWVyIGJ1dCBuZXZlciBzYXZlZCB0byBhY3RpdmVcblx0XHQvLyB2ZXJzaW9uIGFuZCBzaW5jZSB0aGUgZWRpdCBzdGF0ZSBpcyBub3QgZGlydHksIHRoZXJlIGhhdmUgYmVlbiBubyB1c2VyIGNoYW5nZXNcblx0XHQvLyBzbyBpbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBzaWxlbnRseSBuYXZpZ2F0ZSBhbmQgZG8gbm90aGluZ1xuXHRcdHByb2Nlc3NGdW5jdGlvbkZvckRyYWZ0cygpO1xuXHR9XG59XG4vKipcbiAqIExvZ2ljIHRvIHByb2Nlc3MgdGhlIGRyYWZ0IGVkaXRpbmcgZm9yIGV4aXN0aW5nIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0gb0NvbnRyb2xsZXIgVGhlIGN1cnJlbnQgY29udHJvbGxlciByZWZlcmVuY2VkLlxuICogQHBhcmFtIG9Db250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBjdXJyZW50IGNhbGxcbiAqIEBwYXJhbSBwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMgVGhlIGZ1bmN0b24gdG8gcHJvY2VzcyB0aGUgaGFuZGxlclxuICogQHBhcmFtIG5hdmlnYXRpb25UeXBlIFRoZSBuYXZpZ2F0aW9uIHR5cGUgZm9yIHdoaWNoIHRoZSBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NFZGl0aW5nRHJhZnRGb3JFeGlzdGluZ0VudGl0eShcblx0b0NvbnRyb2xsZXI6IGFueSxcblx0b0NvbnRleHQ6IGFueSxcblx0cHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzOiBhbnksXG5cdG5hdmlnYXRpb25UeXBlOiBOYXZpZ2F0aW9uVHlwZVxuKSB7XG5cdC8vIFdlIGFyZSBlZGl0aW5nIGEgZHJhZnQgZm9yIGFuIGV4aXN0aW5nIGFjdGl2ZSBlbnRpdHlcblx0Ly8gVGhlIENyZWF0aW9uRGF0ZVRpbWUgYW5kIExhc3RDaGFuZ2VEYXRlVGltZSBhcmUgZXF1YWwsIHNvIHRoaXMgZHJhZnQgd2FzXG5cdC8vIG5ldmVyIHNhdmVkIGJlZm9yZSwgaGVuY2Ugd2UncmUgY3VycmVudGx5IGVkaXRpbmcgYSBuZXdseSBjcmVhdGVkIGRyYWZ0IGZvclxuXHQvLyBhbiBleGlzdGluZyBhY3RpdmUgZW50aXR5IGZvciB0aGUgZmlyc3QgdGltZS5cblx0Ly8gQWxzbyB0aGVyZSBoYXZlIHNvIGZhciBiZWVuIG5vIGNoYW5nZXMgbWFkZSB0byB0aGUgZHJhZnQgYW5kIGluIHRoaXNcblx0Ly8gY2FzZSB3ZSB3YW50IHRvIHNpbGVudGx5IG5hdmlnYXRlIGFuZCBkZWxldGUgdGhlIGRyYWZ0aW4gY2FzZSBvZiBhIGJhY2tcblx0Ly8gbmF2aWdhdGlvbiBidXQgaW4gY2FzZSBvZiBhIGZvcndhcmQgbmF2aWdhdGlvbiB3ZSB3YW50IHRvIHNpbGVudGx5IGtlZXAgaXQhXG5cdGlmIChuYXZpZ2F0aW9uVHlwZSA9PT0gTmF2aWdhdGlvblR5cGUuQmFja05hdmlnYXRpb24pIHtcblx0XHRjb25zdCBtUGFyYW1ldGVycyA9IHtcblx0XHRcdHNraXBEaXNjYXJkUG9wb3ZlcjogdHJ1ZVxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgb0NvbnRyb2xsZXIuZWRpdEZsb3cuY2FuY2VsRG9jdW1lbnQob0NvbnRleHQsIG1QYXJhbWV0ZXJzKTtcblx0XHRcdHByb2Nlc3NGdW5jdGlvbkZvckRyYWZ0cygpO1xuXHRcdH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcblx0XHRcdExvZy5lcnJvcihcIkVycm9yIHdoaWxlIGNhbmNlbGluZyB0aGUgZG9jdW1lbnRcIiwgZXJyb3IpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBJbiBjYXNlIG9mIGEgZm9yd2FyZCBuYXZpZ2F0aW9uIHdlIHNpbGVudGx5IGtlZXAgdGhlIGRyYWZ0IGFuZCBvbmx5XG5cdFx0Ly8gZXhlY3V0ZSB0aGUgZm9sbG93dXAgZnVuY3Rpb24uXG5cdFx0cHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2dpYyB0byBwcm9jZXNzIHRoZSBlZGl0IHN0YXRlIGRpcnR5LlxuICpcbiAqIEBwYXJhbSBvQ29udHJvbGxlciBUaGUgY3VycmVudCBjb250cm9sbGVyIHJlZmVyZW5jZWQuXG4gKiBAcGFyYW0gZm5DYW5jZWxGdW5jdGlvbiBUaGUgY2FuY2VsIGZ1bmN0aW9uXG4gKiBAcGFyYW0gcHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzIFRoZSBmdW5jdG9uIHRvIHByb2Nlc3MgdGhlIGhhbmRsZXJcbiAqIEBwYXJhbSBuYXZpZ2F0aW9uVHlwZSBUaGUgbmF2aWdhdGlvbiB0eXBlIGZvciB3aGljaCB0aGUgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZFxuICogQHBhcmFtIGJTaWxlbnRseUtlZXBEcmFmdE9uRm9yd2FyZE5hdmlnYXRpb24gVGhlIHBhcmFtZXRlciB0byBkZXRlcm1pbmUgd2hldGhlciB0byBza2lwIHRoZSBwb3B1cCBhcHBlYXJhbmNlIGluIGZvcndhcmQgY2FzZVxuICogQHBhcmFtIGJTa2lwQmluZGluZ1RvVmlldyBUaGUgb3B0aW9uYWwgcGFyYW1ldGVyIHRvIHNraXAgdGhlIGJpbmRpbmcgdG8gdGhlIHZpZXcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NFZGl0U3RhdGVEaXJ0eShcblx0b0NvbnRyb2xsZXI6IGFueSxcblx0Zm5DYW5jZWxGdW5jdGlvbjogYW55LFxuXHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHM6IGFueSxcblx0bmF2aWdhdGlvblR5cGU6IE5hdmlnYXRpb25UeXBlLFxuXHRiU2lsZW50bHlLZWVwRHJhZnRPbkZvcndhcmROYXZpZ2F0aW9uOiBib29sZWFuLFxuXHRiU2tpcEJpbmRpbmdUb1ZpZXc/OiBib29sZWFuXG4pIHtcblx0aWYgKG5hdmlnYXRpb25UeXBlID09PSBOYXZpZ2F0aW9uVHlwZS5Gb3J3YXJkTmF2aWdhdGlvbiAmJiBiU2lsZW50bHlLZWVwRHJhZnRPbkZvcndhcmROYXZpZ2F0aW9uKSB7XG5cdFx0Ly8gSW4gY2FzZSB3ZSBoYXZlIGEgXCJmb3J3YXJkIG5hdmlnYXRpb25cIiBhbmQgYW4gYWRkaXRpb25hbCBwYXJhbWV0ZXIgc2V0IGluIHRoZSBtYW5pZmVzdFxuXHRcdC8vIHdlIFwic2lsZW50bHlcIiBrZWVwIHRoZSBkcmFmdFxuXHRcdHByb2Nlc3NGdW5jdGlvbkZvckRyYWZ0cygpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFRoZSBDcmVhdGlvbkRhdGVUaW1lIGFuZCBMYXN0Q2hhbmdlRGF0ZVRpbWUgYXJlIE5PVCBlcXVhbCwgc28gd2UgYXJlIGN1cnJlbnRseSBlZGl0aW5nXG5cdFx0Ly8gYW4gZXhpc3RpbmcgZHJhZnQgYW5kIG5lZWQgdG8gZGlzdGluZ3Vpc2ggZGVwZW5kaW5nIG9uIGlmIGFueSBjaGFuZ2VzXG5cdFx0Ly8gaGF2ZSBiZWVuIG1hZGUgaW4gdGhlIGN1cnJlbnQgZWRpdGluZyBzZXNzaW9uIG9yIG5vdFxuXHRcdC8vIENoYW5nZXMgaGF2ZSBiZWVuIG1hZGUgaW4gdGhlIGN1cnJlbnQgZWRpdGluZyBzZXNzaW9uIHNvIHdlIHdhbnRcblx0XHQvLyB0byBzaG93IHRoZSBkYXRhbG9zcyBkaWFsb2cgYW5kIGxldCB0aGUgdXNlciBkZWNpZGVcblx0XHREYXRhTG9zc09yRHJhZnREaXNjYXJkSGFuZGxlci5wZXJmb3JtQWZ0ZXJEaXNjYXJkb3JLZWVwRHJhZnQoXG5cdFx0XHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMsXG5cdFx0XHRmbkNhbmNlbEZ1bmN0aW9uLFxuXHRcdFx0b0NvbnRyb2xsZXIsXG5cdFx0XHRiU2tpcEJpbmRpbmdUb1ZpZXdcblx0XHQpO1xuXHR9XG59XG5cbi8qKlxuICogTG9naWMgdG8gcHJvY2VzcyB0aGUgYWRtaW4gZGF0YS5cbiAqXG4gKiBAcGFyYW0gZHJhZnRBZG1pbkRhdGEgQWRtaW4gZGF0YVxuICogQHBhcmFtIGZuUHJvY2Vzc0Z1bmN0aW9uIFRoZSBmdW5jdG9uIHRvIHByb2Nlc3MgdGhlIGhhbmRsZXJcbiAqIEBwYXJhbSBmbkNhbmNlbEZ1bmN0aW9uIFRoZSBjYW5jZWwgZnVuY3Rpb25cbiAqIEBwYXJhbSBvQ29udGV4dCBUaGUgY29udGV4dCBvZiB0aGUgY3VycmVudCBjYWxsXG4gKiBAcGFyYW0gb0NvbnRyb2xsZXIgVGhlIGN1cnJlbnQgY29udHJvbGxlciByZWZlcmVuY2VkXG4gKiBAcGFyYW0gYlNraXBCaW5kaW5nVG9WaWV3IFRoZSBvcHRpb25hbCBwYXJhbWV0ZXIgdG8gc2tpcCB0aGUgYmluZGluZyB0byB0aGUgdmlld1xuICogQHBhcmFtIG5hdmlnYXRpb25UeXBlIFRoZSBuYXZpZ2F0aW9uIHR5cGUgZm9yIHdoaWNoIHRoZSBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NEcmFmdEFkbWluRGF0YShcblx0ZHJhZnRBZG1pbkRhdGE6IGFueSxcblx0Zm5Qcm9jZXNzRnVuY3Rpb246IGFueSxcblx0Zm5DYW5jZWxGdW5jdGlvbjogYW55LFxuXHRvQ29udGV4dDogYW55LFxuXHRvQ29udHJvbGxlcjogYW55LFxuXHRiU2tpcEJpbmRpbmdUb1ZpZXc/OiBib29sZWFuLFxuXHRuYXZpZ2F0aW9uVHlwZTogTmF2aWdhdGlvblR5cGUgPSBOYXZpZ2F0aW9uVHlwZS5CYWNrTmF2aWdhdGlvblxuKSB7XG5cdGNvbnN0IGNvbGxhYm9yYXRpb25Db25uZWN0ZWQgPSBBY3Rpdml0eVN5bmMuaXNDb25uZWN0ZWQob0NvbnRyb2xsZXIuZ2V0VmlldygpKTtcblx0Y29uc3QgcHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzID0gIWNvbGxhYm9yYXRpb25Db25uZWN0ZWRcblx0XHQ/IGZuUHJvY2Vzc0Z1bmN0aW9uXG5cdFx0OiBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcblx0XHRcdFx0QWN0aXZpdHlTeW5jLmRpc2Nvbm5lY3Qob0NvbnRyb2xsZXIuZ2V0VmlldygpKTtcblx0XHRcdFx0Zm5Qcm9jZXNzRnVuY3Rpb24uYXBwbHkobnVsbCwgLi4uYXJncyk7XG5cdFx0ICB9O1xuXG5cdGNvbnN0IGJTaWxlbnRseUtlZXBEcmFmdE9uRm9yd2FyZE5hdmlnYXRpb24gPSBzaWxlbnRseUtlZXBEcmFmdE9uRm9yd2FyZE5hdmlnYXRpb24ob0NvbnRyb2xsZXIpO1xuXG5cdGlmIChkcmFmdEFkbWluRGF0YSkge1xuXHRcdGlmIChvQ29udHJvbGxlci5nZXRBcHBDb21wb25lbnQoKS5nZXRSb290Vmlld0NvbnRyb2xsZXIoKS5pc0ZjbEVuYWJsZWQoKSkge1xuXHRcdFx0YXdhaXQgcHJvY2Vzc0ZjbE1vZGUoZHJhZnRBZG1pbkRhdGEsIGZuQ2FuY2VsRnVuY3Rpb24sIG9Db250cm9sbGVyLCBwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMsIGJTa2lwQmluZGluZ1RvVmlldyk7XG5cdFx0fSBlbHNlIGlmICghb0NvbnRleHQuZ2V0T2JqZWN0KCkuSGFzQWN0aXZlRW50aXR5KSB7XG5cdFx0XHRwcm9jZXNzTm9BY3RpdmVFbnRpdHlNb2RlKFxuXHRcdFx0XHRkcmFmdEFkbWluRGF0YSxcblx0XHRcdFx0Zm5DYW5jZWxGdW5jdGlvbixcblx0XHRcdFx0b0NvbnRyb2xsZXIsXG5cdFx0XHRcdHByb2Nlc3NGdW5jdGlvbkZvckRyYWZ0cyxcblx0XHRcdFx0bmF2aWdhdGlvblR5cGUsXG5cdFx0XHRcdGJTaWxlbnRseUtlZXBEcmFmdE9uRm9yd2FyZE5hdmlnYXRpb24sXG5cdFx0XHRcdGJTa2lwQmluZGluZ1RvVmlld1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKGRyYWZ0QWRtaW5EYXRhLkNyZWF0aW9uRGF0ZVRpbWUgPT09IGRyYWZ0QWRtaW5EYXRhLkxhc3RDaGFuZ2VEYXRlVGltZSkge1xuXHRcdFx0cHJvY2Vzc0VkaXRpbmdEcmFmdEZvckV4aXN0aW5nRW50aXR5KG9Db250cm9sbGVyLCBvQ29udGV4dCwgcHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzLCBuYXZpZ2F0aW9uVHlwZSk7XG5cdFx0fSBlbHNlIGlmIChFZGl0U3RhdGUuaXNFZGl0U3RhdGVEaXJ0eSgpKSB7XG5cdFx0XHRwcm9jZXNzRWRpdFN0YXRlRGlydHkoXG5cdFx0XHRcdG9Db250cm9sbGVyLFxuXHRcdFx0XHRmbkNhbmNlbEZ1bmN0aW9uLFxuXHRcdFx0XHRwcm9jZXNzRnVuY3Rpb25Gb3JEcmFmdHMsXG5cdFx0XHRcdG5hdmlnYXRpb25UeXBlLFxuXHRcdFx0XHRiU2lsZW50bHlLZWVwRHJhZnRPbkZvcndhcmROYXZpZ2F0aW9uLFxuXHRcdFx0XHRiU2tpcEJpbmRpbmdUb1ZpZXdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRoZSB1c2VyIHN0YXJ0ZWQgZWRpdGluZyB0aGUgZXhpc3RpbmcgZHJhZnQgYnV0IGRpZCBub3QgbWFrZSBhbnkgY2hhbmdlc1xuXHRcdFx0Ly8gaW4gdGhlIGN1cnJlbnQgZWRpdGluZyBzZXNzaW9uLCBzbyBpbiB0aGlzIGNhc2Ugd2UgZG8gbm90IHdhbnRcblx0XHRcdC8vIHRvIHNob3cgdGhlIGRhdGFsb3NzIGRpYWxvZyBidXQganVzdCBrZWVwIHRoZSBkcmFmdFxuXHRcdFx0cHJvY2Vzc0Z1bmN0aW9uRm9yRHJhZnRzKCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZuUHJvY2Vzc0Z1bmN0aW9uKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgZ2VuZXJhbCBoYW5kbGVyIGluIHdoaWNoIHRoZSBpbmRpdmlkdWFsIHN0ZXBzIGFyZSBjYWxsZWQuXG4gKlxuICogQHBhcmFtIGZuUHJvY2Vzc0Z1bmN0aW9uXG4gKiBAcGFyYW0gZm5DYW5jZWxGdW5jdGlvblxuICogQHBhcmFtIG9Db250ZXh0XG4gKiBAcGFyYW0gb0NvbnRyb2xsZXJcbiAqIEBwYXJhbSBiU2tpcEJpbmRpbmdUb1ZpZXdcbiAqIEBwYXJhbSBuYXZpZ2F0aW9uVHlwZVxuICovXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRGF0YUxvc3NPckRyYWZ0RGlzY2FyZENvbmZpcm1hdGlvbihcblx0Zm5Qcm9jZXNzRnVuY3Rpb246IGFueSxcblx0Zm5DYW5jZWxGdW5jdGlvbjogYW55LFxuXHRvQ29udGV4dDogYW55LFxuXHRvQ29udHJvbGxlcjogYW55LFxuXHRiU2tpcEJpbmRpbmdUb1ZpZXc/OiBib29sZWFuLFxuXHRuYXZpZ2F0aW9uVHlwZTogTmF2aWdhdGlvblR5cGUgPSBOYXZpZ2F0aW9uVHlwZS5CYWNrTmF2aWdhdGlvblxuKSB7XG5cdGNvbnN0IG9WaWV3ID0gb0NvbnRyb2xsZXIuZ2V0VmlldygpO1xuXHRjb25zdCBvTW9kZWwgPSBvQ29udGV4dC5nZXRNb2RlbCgpO1xuXHRjb25zdCBvTWV0YU1vZGVsID0gb01vZGVsLmdldE1ldGFNb2RlbCgpO1xuXHRjb25zdCBzRW50aXR5U2V0ID0gb1ZpZXcuZ2V0Vmlld0RhdGEoKS5lbnRpdHlTZXQgPz8gXCJcIjtcblx0Y29uc3Qgb0RyYWZ0Um9vdCA9IHNFbnRpdHlTZXQgJiYgb01ldGFNb2RlbC5nZXRPYmplY3QoXCIvXCIgKyBzRW50aXR5U2V0ICsgXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkRyYWZ0Um9vdFwiKTtcblx0Y29uc3Qgb1VJTW9kZWwgPSBvVmlldy5nZXRNb2RlbChcInVpXCIpO1xuXHRjb25zdCBiSXNFZGl0YWJsZSA9IG9VSU1vZGVsLmdldFByb3BlcnR5KFwiL2lzRWRpdGFibGVcIik7XG5cdGNvbnN0IGRyYWZ0RGF0YUNvbnRleHQgPSBvTW9kZWwuYmluZENvbnRleHQoYCR7b0NvbnRleHQuZ2V0UGF0aCgpfS9EcmFmdEFkbWluaXN0cmF0aXZlRGF0YWApLmdldEJvdW5kQ29udGV4dCgpO1xuXG5cdC8vIFNob3VsZG4ndCBkaXNwbGF5IGRhdGEgbG9zcyBwb3BvdmVyIG9uIHNoZWxsIGJhY2sgbmF2aWdhdGlvbiBmcm9tIHN1Yi1vYmplY3QgcGFnZXNcblx0Ly8gYW5kIHdoZW4gb2JqZWN0IHBhZ2UgaXMgaW4gZGlzcGxheSBtb2RlXG5cdGlmIChvQ29udGV4dCAmJiBvQ29udGV4dC5nZXRPYmplY3QoKSAmJiAoKCFvRHJhZnRSb290ICYmIG5hdmlnYXRpb25UeXBlID09PSBOYXZpZ2F0aW9uVHlwZS5CYWNrTmF2aWdhdGlvbikgfHwgIWJJc0VkaXRhYmxlKSkge1xuXHRcdGZuUHJvY2Vzc0Z1bmN0aW9uKCk7XG5cdH0gZWxzZSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGRyYWZ0QWRtaW5EYXRhID0gYXdhaXQgZHJhZnREYXRhQ29udGV4dC5yZXF1ZXN0T2JqZWN0KCk7XG5cdFx0XHRhd2FpdCBwcm9jZXNzRHJhZnRBZG1pbkRhdGEoXG5cdFx0XHRcdGRyYWZ0QWRtaW5EYXRhLFxuXHRcdFx0XHRmblByb2Nlc3NGdW5jdGlvbixcblx0XHRcdFx0Zm5DYW5jZWxGdW5jdGlvbixcblx0XHRcdFx0b0NvbnRleHQsXG5cdFx0XHRcdG9Db250cm9sbGVyLFxuXHRcdFx0XHRiU2tpcEJpbmRpbmdUb1ZpZXcsXG5cdFx0XHRcdG5hdmlnYXRpb25UeXBlXG5cdFx0XHQpO1xuXHRcdH0gY2F0Y2ggKG9FcnJvcjogYW55KSB7XG5cdFx0XHRMb2cuZXJyb3IoXCJDYW5ub3QgcmV0cmlldmUgZHJhZnREYXRhQ29udGV4dCBpbmZvcm1hdGlvblwiLCBvRXJyb3IpO1xuXHRcdH1cblx0fVxufVxuXG5jb25zdCBkcmFmdERhdGFMb3NzUG9wdXAgPSB7XG5cdHByb2Nlc3NEYXRhTG9zc09yRHJhZnREaXNjYXJkQ29uZmlybWF0aW9uOiBwcm9jZXNzRGF0YUxvc3NPckRyYWZ0RGlzY2FyZENvbmZpcm1hdGlvbixcblx0c2lsZW50bHlLZWVwRHJhZnRPbkZvcndhcmROYXZpZ2F0aW9uOiBzaWxlbnRseUtlZXBEcmFmdE9uRm9yd2FyZE5hdmlnYXRpb24sXG5cdE5hdmlnYXRpb25UeXBlOiBOYXZpZ2F0aW9uVHlwZSxcblx0cHJvY2Vzc0ZjbE1vZGU6IHByb2Nlc3NGY2xNb2RlLFxuXHRwcm9jZXNzTm9BY3RpdmVFbnRpdHlNb2RlOiBwcm9jZXNzTm9BY3RpdmVFbnRpdHlNb2RlLFxuXHRwcm9jZXNzRWRpdGluZ0RyYWZ0Rm9yRXhpc3RpbmdFbnRpdHk6IHByb2Nlc3NFZGl0aW5nRHJhZnRGb3JFeGlzdGluZ0VudGl0eSxcblx0cHJvY2Vzc0VkaXRTdGF0ZURpcnR5OiBwcm9jZXNzRWRpdFN0YXRlRGlydHlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRyYWZ0RGF0YUxvc3NQb3B1cDtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUE7QUFBQTs7OztFQU1BO0VBQUEsSUFDS0EsY0FBYztFQUtuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMQSxXQUxLQSxjQUFjO0lBQWRBLGNBQWM7SUFBZEEsY0FBYztFQUFBLEdBQWRBLGNBQWMsS0FBZEEsY0FBYztFQVduQixTQUFTQyxvQ0FBb0MsQ0FBQ0MsY0FBOEIsRUFBRTtJQUFBO0lBQzdFLElBQUlDLGNBQWMsR0FBRyxLQUFLO0lBQzFCLE1BQU1DLFNBQVMsR0FBR0YsY0FBYyxDQUFDRyxlQUFlLEVBQUUsQ0FBQ0MsV0FBVyxFQUFTO0lBQ3ZFSCxjQUFjLEdBQUcsQ0FBQUMsU0FBUyxhQUFUQSxTQUFTLDJDQUFUQSxTQUFTLENBQUcsUUFBUSxDQUFDLDZFQUFyQixpQkFBdUJHLEdBQUcseURBQTFCLHFCQUE0Qk4sb0NBQW9DLEtBQUksS0FBSztJQUMxRixPQUFPRSxjQUFjO0VBQ3RCOztFQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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