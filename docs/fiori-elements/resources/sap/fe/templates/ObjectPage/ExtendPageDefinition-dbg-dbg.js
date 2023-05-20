/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/templates/ObjectPage/ObjectPageTemplating"], function (ObjectPageTemplating) {
  "use strict";

  var _exports = {};
  var getPressExpressionForPrimaryAction = ObjectPageTemplating.getPressExpressionForPrimaryAction;
  var getEditCommandExecutionVisible = ObjectPageTemplating.getEditCommandExecutionVisible;
  var getEditCommandExecutionEnabled = ObjectPageTemplating.getEditCommandExecutionEnabled;
  const extendObjectPageDefinition = function (pageDefinition, converterContext) {
    const convertedPageDefinition = pageDefinition;
    convertedPageDefinition.primaryAction = getPrimaryAction(converterContext, pageDefinition.header.actions, pageDefinition.footerActions);
    return convertedPageDefinition;
  };

  /**
   * Method to get the expression for the execute event of the forward action.
   * Generates primaryActionExpression to be executed on the keyboard shortcut Ctrl+Enter with the
   * forward flow (priority is the semantic positive action OR if that's not there, then the primary action).
   *
   * @param converterContext The converter context
   * @param headerActions An array containing all the actions for this ObjectPage header
   * @param footerActions An array containing all the actions for this ObjectPage footer
   * @returns  Binding expression or function string
   */
  _exports.extendObjectPageDefinition = extendObjectPageDefinition;
  const getPrimaryAction = function (converterContext, headerActions, footerActions) {
    let primaryActionExpression = "";
    const aActions = [...headerActions, ...footerActions];
    const getBindingExp = function (sExpression) {
      if (sExpression && sExpression.indexOf("{=") > -1) {
        return sExpression.replace("{=", "(").slice(0, -1) + ")";
      }
      return sExpression;
    };
    const aSemanticPositiveActions = aActions.filter(oAction => {
      if (oAction !== null && oAction !== void 0 && oAction.annotationPath) {
        const targetObject = converterContext.getConverterContextFor(oAction === null || oAction === void 0 ? void 0 : oAction.annotationPath).getDataModelObjectPath().targetObject;
        if (targetObject !== null && targetObject !== void 0 && targetObject.Criticality && (targetObject === null || targetObject === void 0 ? void 0 : targetObject.Criticality) === "UI.CriticalityType/Positive") {
          return true;
        }
      }
    });
    const oEntitySet = converterContext.getEntitySet();
    if (aSemanticPositiveActions.length > 0) {
      primaryActionExpression = getPressExpressionForPrimaryAction(aSemanticPositiveActions[0].annotationPath && converterContext.getConverterContextFor(aSemanticPositiveActions[0].annotationPath).getDataModelObjectPath().targetObject, oEntitySet === null || oEntitySet === void 0 ? void 0 : oEntitySet.name, aSemanticPositiveActions[0], getBindingExp(aSemanticPositiveActions[0].visible ?? "true"), getBindingExp(aSemanticPositiveActions[0].enabled ?? "true"), getBindingExp(getEditCommandExecutionVisible(headerActions)), getBindingExp(getEditCommandExecutionEnabled(headerActions)));
    } else {
      primaryActionExpression = getPressExpressionForPrimaryAction(null, oEntitySet === null || oEntitySet === void 0 ? void 0 : oEntitySet.name, null, "false", "false", getBindingExp(getEditCommandExecutionVisible(headerActions)), getBindingExp(getEditCommandExecutionEnabled(headerActions)));
    }
    return primaryActionExpression;
  };
  _exports.getPrimaryAction = getPrimaryAction;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJleHRlbmRPYmplY3RQYWdlRGVmaW5pdGlvbiIsInBhZ2VEZWZpbml0aW9uIiwiY29udmVydGVyQ29udGV4dCIsImNvbnZlcnRlZFBhZ2VEZWZpbml0aW9uIiwicHJpbWFyeUFjdGlvbiIsImdldFByaW1hcnlBY3Rpb24iLCJoZWFkZXIiLCJhY3Rpb25zIiwiZm9vdGVyQWN0aW9ucyIsImhlYWRlckFjdGlvbnMiLCJwcmltYXJ5QWN0aW9uRXhwcmVzc2lvbiIsImFBY3Rpb25zIiwiZ2V0QmluZGluZ0V4cCIsInNFeHByZXNzaW9uIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJzbGljZSIsImFTZW1hbnRpY1Bvc2l0aXZlQWN0aW9ucyIsImZpbHRlciIsIm9BY3Rpb24iLCJhbm5vdGF0aW9uUGF0aCIsInRhcmdldE9iamVjdCIsImdldENvbnZlcnRlckNvbnRleHRGb3IiLCJnZXREYXRhTW9kZWxPYmplY3RQYXRoIiwiQ3JpdGljYWxpdHkiLCJvRW50aXR5U2V0IiwiZ2V0RW50aXR5U2V0IiwibGVuZ3RoIiwiZ2V0UHJlc3NFeHByZXNzaW9uRm9yUHJpbWFyeUFjdGlvbiIsIm5hbWUiLCJ2aXNpYmxlIiwiZW5hYmxlZCIsImdldEVkaXRDb21tYW5kRXhlY3V0aW9uVmlzaWJsZSIsImdldEVkaXRDb21tYW5kRXhlY3V0aW9uRW5hYmxlZCJdLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXMiOlsiRXh0ZW5kUGFnZURlZmluaXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBCYXNlQWN0aW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvQ29tbW9uL0FjdGlvblwiO1xuaW1wb3J0IENvbnZlcnRlckNvbnRleHQgZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvQ29udmVydGVyQ29udGV4dFwiO1xuaW1wb3J0IHsgT2JqZWN0UGFnZURlZmluaXRpb24gfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy90ZW1wbGF0ZXMvT2JqZWN0UGFnZUNvbnZlcnRlclwiO1xuaW1wb3J0IHR5cGUgeyBDb21waWxlZEJpbmRpbmdUb29sa2l0RXhwcmVzc2lvbiB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdUb29sa2l0XCI7XG5pbXBvcnQge1xuXHRnZXRFZGl0Q29tbWFuZEV4ZWN1dGlvbkVuYWJsZWQsXG5cdGdldEVkaXRDb21tYW5kRXhlY3V0aW9uVmlzaWJsZSxcblx0Z2V0UHJlc3NFeHByZXNzaW9uRm9yUHJpbWFyeUFjdGlvblxufSBmcm9tIFwic2FwL2ZlL3RlbXBsYXRlcy9PYmplY3RQYWdlL09iamVjdFBhZ2VUZW1wbGF0aW5nXCI7XG5cbmV4cG9ydCB0eXBlIEZpbmFsUGFnZURlZmluaXRpb24gPSBPYmplY3RQYWdlRGVmaW5pdGlvbiAmIHtcblx0cHJpbWFyeUFjdGlvbjogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZE9iamVjdFBhZ2VEZWZpbml0aW9uID0gZnVuY3Rpb24gKFxuXHRwYWdlRGVmaW5pdGlvbjogT2JqZWN0UGFnZURlZmluaXRpb24sXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IEZpbmFsUGFnZURlZmluaXRpb24ge1xuXHRjb25zdCBjb252ZXJ0ZWRQYWdlRGVmaW5pdGlvbiA9IHBhZ2VEZWZpbml0aW9uIGFzIEZpbmFsUGFnZURlZmluaXRpb247XG5cdGNvbnZlcnRlZFBhZ2VEZWZpbml0aW9uLnByaW1hcnlBY3Rpb24gPSBnZXRQcmltYXJ5QWN0aW9uKGNvbnZlcnRlckNvbnRleHQsIHBhZ2VEZWZpbml0aW9uLmhlYWRlci5hY3Rpb25zLCBwYWdlRGVmaW5pdGlvbi5mb290ZXJBY3Rpb25zKTtcblx0cmV0dXJuIGNvbnZlcnRlZFBhZ2VEZWZpbml0aW9uO1xufTtcblxuLyoqXG4gKiBNZXRob2QgdG8gZ2V0IHRoZSBleHByZXNzaW9uIGZvciB0aGUgZXhlY3V0ZSBldmVudCBvZiB0aGUgZm9yd2FyZCBhY3Rpb24uXG4gKiBHZW5lcmF0ZXMgcHJpbWFyeUFjdGlvbkV4cHJlc3Npb24gdG8gYmUgZXhlY3V0ZWQgb24gdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwrRW50ZXIgd2l0aCB0aGVcbiAqIGZvcndhcmQgZmxvdyAocHJpb3JpdHkgaXMgdGhlIHNlbWFudGljIHBvc2l0aXZlIGFjdGlvbiBPUiBpZiB0aGF0J3Mgbm90IHRoZXJlLCB0aGVuIHRoZSBwcmltYXJ5IGFjdGlvbikuXG4gKlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcGFyYW0gaGVhZGVyQWN0aW9ucyBBbiBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgYWN0aW9ucyBmb3IgdGhpcyBPYmplY3RQYWdlIGhlYWRlclxuICogQHBhcmFtIGZvb3RlckFjdGlvbnMgQW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGFjdGlvbnMgZm9yIHRoaXMgT2JqZWN0UGFnZSBmb290ZXJcbiAqIEByZXR1cm5zICBCaW5kaW5nIGV4cHJlc3Npb24gb3IgZnVuY3Rpb24gc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5QWN0aW9uID0gZnVuY3Rpb24gKFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRoZWFkZXJBY3Rpb25zOiBCYXNlQWN0aW9uW10sXG5cdGZvb3RlckFjdGlvbnM6IEJhc2VBY3Rpb25bXVxuKTogc3RyaW5nIHtcblx0bGV0IHByaW1hcnlBY3Rpb25FeHByZXNzaW9uID0gXCJcIjtcblx0Y29uc3QgYUFjdGlvbnMgPSBbLi4uaGVhZGVyQWN0aW9ucywgLi4uZm9vdGVyQWN0aW9uc107XG5cblx0Y29uc3QgZ2V0QmluZGluZ0V4cCA9IGZ1bmN0aW9uIChzRXhwcmVzc2lvbjogQ29tcGlsZWRCaW5kaW5nVG9vbGtpdEV4cHJlc3Npb24gfCBzdHJpbmcpIHtcblx0XHRpZiAoc0V4cHJlc3Npb24gJiYgc0V4cHJlc3Npb24uaW5kZXhPZihcIns9XCIpID4gLTEpIHtcblx0XHRcdHJldHVybiBzRXhwcmVzc2lvbi5yZXBsYWNlKFwiez1cIiwgXCIoXCIpLnNsaWNlKDAsIC0xKSArIFwiKVwiO1xuXHRcdH1cblx0XHRyZXR1cm4gc0V4cHJlc3Npb247XG5cdH07XG5cdGNvbnN0IGFTZW1hbnRpY1Bvc2l0aXZlQWN0aW9ucyA9IGFBY3Rpb25zLmZpbHRlcigob0FjdGlvbikgPT4ge1xuXHRcdGlmIChvQWN0aW9uPy5hbm5vdGF0aW9uUGF0aCkge1xuXHRcdFx0Y29uc3QgdGFyZ2V0T2JqZWN0ID0gY29udmVydGVyQ29udGV4dC5nZXRDb252ZXJ0ZXJDb250ZXh0Rm9yKG9BY3Rpb24/LmFubm90YXRpb25QYXRoKS5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkudGFyZ2V0T2JqZWN0O1xuXHRcdFx0aWYgKHRhcmdldE9iamVjdD8uQ3JpdGljYWxpdHkgJiYgdGFyZ2V0T2JqZWN0Py5Dcml0aWNhbGl0eSA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvUG9zaXRpdmVcIikge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHRjb25zdCBvRW50aXR5U2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKTtcblx0aWYgKGFTZW1hbnRpY1Bvc2l0aXZlQWN0aW9ucy5sZW5ndGggPiAwKSB7XG5cdFx0cHJpbWFyeUFjdGlvbkV4cHJlc3Npb24gPSBnZXRQcmVzc0V4cHJlc3Npb25Gb3JQcmltYXJ5QWN0aW9uKFxuXHRcdFx0YVNlbWFudGljUG9zaXRpdmVBY3Rpb25zWzBdLmFubm90YXRpb25QYXRoICYmXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0Q29udmVydGVyQ29udGV4dEZvcihhU2VtYW50aWNQb3NpdGl2ZUFjdGlvbnNbMF0uYW5ub3RhdGlvblBhdGgpLmdldERhdGFNb2RlbE9iamVjdFBhdGgoKS50YXJnZXRPYmplY3QsXG5cdFx0XHRvRW50aXR5U2V0Py5uYW1lLFxuXHRcdFx0YVNlbWFudGljUG9zaXRpdmVBY3Rpb25zWzBdLFxuXHRcdFx0Z2V0QmluZGluZ0V4cChhU2VtYW50aWNQb3NpdGl2ZUFjdGlvbnNbMF0udmlzaWJsZSA/PyBcInRydWVcIiksXG5cdFx0XHRnZXRCaW5kaW5nRXhwKGFTZW1hbnRpY1Bvc2l0aXZlQWN0aW9uc1swXS5lbmFibGVkID8/IFwidHJ1ZVwiKSxcblx0XHRcdGdldEJpbmRpbmdFeHAoZ2V0RWRpdENvbW1hbmRFeGVjdXRpb25WaXNpYmxlKGhlYWRlckFjdGlvbnMpKSxcblx0XHRcdGdldEJpbmRpbmdFeHAoZ2V0RWRpdENvbW1hbmRFeGVjdXRpb25FbmFibGVkKGhlYWRlckFjdGlvbnMpKVxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0cHJpbWFyeUFjdGlvbkV4cHJlc3Npb24gPSBnZXRQcmVzc0V4cHJlc3Npb25Gb3JQcmltYXJ5QWN0aW9uKFxuXHRcdFx0bnVsbCxcblx0XHRcdG9FbnRpdHlTZXQ/Lm5hbWUsXG5cdFx0XHRudWxsLFxuXHRcdFx0XCJmYWxzZVwiLFxuXHRcdFx0XCJmYWxzZVwiLFxuXHRcdFx0Z2V0QmluZGluZ0V4cChnZXRFZGl0Q29tbWFuZEV4ZWN1dGlvblZpc2libGUoaGVhZGVyQWN0aW9ucykpLFxuXHRcdFx0Z2V0QmluZGluZ0V4cChnZXRFZGl0Q29tbWFuZEV4ZWN1dGlvbkVuYWJsZWQoaGVhZGVyQWN0aW9ucykpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gcHJpbWFyeUFjdGlvbkV4cHJlc3Npb247XG59O1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztFQWNPLE1BQU1BLDBCQUEwQixHQUFHLFVBQ3pDQyxjQUFvQyxFQUNwQ0MsZ0JBQWtDLEVBQ1o7SUFDdEIsTUFBTUMsdUJBQXVCLEdBQUdGLGNBQXFDO0lBQ3JFRSx1QkFBdUIsQ0FBQ0MsYUFBYSxHQUFHQyxnQkFBZ0IsQ0FBQ0gsZ0JBQWdCLEVBQUVELGNBQWMsQ0FBQ0ssTUFBTSxDQUFDQyxPQUFPLEVBQUVOLGNBQWMsQ0FBQ08sYUFBYSxDQUFDO0lBQ3ZJLE9BQU9M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