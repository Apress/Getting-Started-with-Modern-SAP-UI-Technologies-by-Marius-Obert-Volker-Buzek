/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/message/Message"], function (Message) {
  "use strict";

  var _exports = {};
  /**
   * Adds error messages for an action parameter field to the message manager.
   *
   * @param messageManager The active MessageManager instance
   * @param messageParameters Information identifying an action parameter and messages refering to this parameter
   * @returns True if the action parameters contain valid data and the mandatory parameters are provided
   */
  // in case of missing mandaotory parameter, message currently differs per parameter, as it superfluously contains the label as parameter. Possiblky this could be removed in future, in that case, interface could be simplified to ActionParameterInfo[], string
  async function _addMessageForActionParameter(messageManager, messageParameters) {
    messageManager.addMessages(messageParameters.map(messageParameter => {
      const binding = messageParameter.actionParameterInfo.field.getBinding(messageParameter.actionParameterInfo.isMultiValue ? "items" : "value");
      return new Message({
        message: messageParameter.message,
        type: "Error",
        processor: binding === null || binding === void 0 ? void 0 : binding.getModel(),
        persistent: true,
        target: binding === null || binding === void 0 ? void 0 : binding.getResolvedPath()
      });
    }));
  }

  /**
   * Checks if all required action parameters contain data and checks for all action parameters if the
   * contained data is valid.
   *
   *
   * @param messageManager The active MessageManager instance
   * @param actionParameterInfos Information identifying an action parameter
   * @param resourceModel The model to load text resources
   */
  _exports._addMessageForActionParameter = _addMessageForActionParameter;
  async function _validateProperties(messageManager, actionParameterInfos, resourceModel) {
    await Promise.allSettled(actionParameterInfos.map(actionParameterInfo => actionParameterInfo.validationPromise));
    const requiredParameterInfos = actionParameterInfos.filter(actionParameterInfo => actionParameterInfo.field.getRequired());

    /* Hint: The boolean false is a valid value */
    const emptyRequiredFields = requiredParameterInfos.filter(requiredParameterInfo => {
      if (requiredParameterInfo.isMultiValue) {
        return requiredParameterInfo.value === undefined || !requiredParameterInfo.value.length;
      } else {
        const fieldValue = requiredParameterInfo.field.getValue();
        return fieldValue === undefined || fieldValue === null || fieldValue === "";
      }
    });

    // message contains label per field for historical reason (originally, it was shown in additional popup, now it's directly added to the field)
    // if this was not the case (and hopefully, in future this might be subject to change), interface of _addMessageForActionParameter could be simplified to just pass emptyRequiredFields and a constant message here
    _addMessageForActionParameter(messageManager, emptyRequiredFields.map(actionParameterInfo => {
      var _actionParameterInfo$;
      return {
        actionParameterInfo: actionParameterInfo,
        message: resourceModel.getText("C_OPERATIONS_ACTION_PARAMETER_DIALOG_MISSING_MANDATORY_MSG", [((_actionParameterInfo$ = actionParameterInfo.field.getParent()) === null || _actionParameterInfo$ === void 0 ? void 0 : _actionParameterInfo$.getAggregation("label")).getText()])
      };
    }));

    /* Check value state of all parameter */
    const firstInvalidActionParameter = actionParameterInfos.find(
    // unfortunately, _addMessageForActionParameter sets valueState only asynchroneously, thus checking emptyRequiredFields and hasError additionally:
    // - checking hasError: user has changed field to invalid value, validation promise has been rejected, therefore we are adding message to message model
    // which in turn sets value state to 'Error' but this last step might not have happened yet due to asynchronity in model.
    // - also checking value state: also out parameter of another action parameter could change field and it's value state without sending change event.

    actionParameterInfo => actionParameterInfo.hasError || actionParameterInfo.field.getValueState() === "Error" || emptyRequiredFields.includes(actionParameterInfo));
    if (firstInvalidActionParameter) {
      firstInvalidActionParameter.field.focus();
      return false;
    } else {
      return true;
    }
  }
  _exports._validateProperties = _validateProperties;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYWRkTWVzc2FnZUZvckFjdGlvblBhcmFtZXRlciIsIm1lc3NhZ2VNYW5hZ2VyIiwibWVzc2FnZVBhcmFtZXRlcnMiLCJhZGRNZXNzYWdlcyIsIm1hcCIsIm1lc3NhZ2VQYXJhbWV0ZXIiLCJiaW5kaW5nIiwiYWN0aW9uUGFyYW1ldGVySW5mbyIsImZpZWxkIiwiZ2V0QmluZGluZyIsImlzTXVsdGlWYWx1ZSIsIk1lc3NhZ2UiLCJtZXNzYWdlIiwidHlwZSIsInByb2Nlc3NvciIsImdldE1vZGVsIiwicGVyc2lzdGVudCIsInRhcmdldCIsImdldFJlc29sdmVkUGF0aCIsIl92YWxpZGF0ZVByb3BlcnRpZXMiLCJhY3Rpb25QYXJhbWV0ZXJJbmZvcyIsInJlc291cmNlTW9kZWwiLCJQcm9taXNlIiwiYWxsU2V0dGxlZCIsInZhbGlkYXRpb25Qcm9taXNlIiwicmVxdWlyZWRQYXJhbWV0ZXJJbmZvcyIsImZpbHRlciIsImdldFJlcXVpcmVkIiwiZW1wdHlSZXF1aXJlZEZpZWxkcyIsInJlcXVpcmVkUGFyYW1ldGVySW5mbyIsInZhbHVlIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwiZmllbGRWYWx1ZSIsImdldFZhbHVlIiwiZ2V0VGV4dCIsImdldFBhcmVudCIsImdldEFnZ3JlZ2F0aW9uIiwiZmlyc3RJbnZhbGlkQWN0aW9uUGFyYW1ldGVyIiwiZmluZCIsImhhc0Vycm9yIiwiZ2V0VmFsdWVTdGF0ZSIsImluY2x1ZGVzIiwiZm9jdXMiXSwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzIjpbIl9pbnRlcm5hbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzb3VyY2VNb2RlbCBmcm9tIFwic2FwL2ZlL2NvcmUvUmVzb3VyY2VNb2RlbFwiO1xuaW1wb3J0IExhYmVsIGZyb20gXCJzYXAvbS9MYWJlbFwiO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcInNhcC91aS9jb3JlL21lc3NhZ2UvTWVzc2FnZVwiO1xuaW1wb3J0IE1lc3NhZ2VNYW5hZ2VyIGZyb20gXCJzYXAvdWkvY29yZS9tZXNzYWdlL01lc3NhZ2VNYW5hZ2VyXCI7XG5pbXBvcnQgRmllbGQgZnJvbSBcInNhcC91aS9tZGMvRmllbGRcIjtcbmltcG9ydCBNdWx0aVZhbHVlRmllbGRJdGVtIGZyb20gXCJzYXAvdWkvbWRjL2ZpZWxkL011bHRpVmFsdWVGaWVsZEl0ZW1cIjtcbmltcG9ydCBNdWx0aVZhbHVlRmllbGQgZnJvbSBcInNhcC91aS9tZGMvTXVsdGlWYWx1ZUZpZWxkXCI7XG5cbi8qKlxuICogTk9OIG9mIHRoZXNlIGV4cG9ydCBtdXN0IGJlIGltcG9ydGVkIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIC4vb3BlcmF0aW9ucyBtb2R1bGUuXG4gKiBUaGV5IGFyZSBvbmx5IGV4cG9zZWQgdG8gc2ltcGxpZnkgdGVzdGluZyB1bnRpbCB0aGUgb3BlcmF0aW9ucy50cyBmaWxlIGhhcyBiZWVuIHJlZmFjdG9yZWRcbiAqL1xuXG4vLyB0aGlzIHR5cGUgaXMgbWVhbnQgdG8gZGVzY3JpYmUgdGhlIG1ldGEgaW5mb3JtYXRpb24gZm9yIG9uZSBBY3Rpb25QYXJhbWV0ZXIgKGkuZS4gaXRzIG9iamVjdCBpbiBtZXRhTW9kZWwpXG5leHBvcnQgdHlwZSBBY3Rpb25QYXJhbWV0ZXIgPSB7XG5cdCROYW1lOiBzdHJpbmc7XG5cdCRpc0NvbGxlY3Rpb246IGJvb2xlYW47XG5cdC8vIGN1cnJlbnRseSBydW50aW1lIGluZm9ybWF0aW9uIGlzIHdyaXR0ZW4gaW50byB0aGUgbWV0YW1vZGVsOlxuXHQvLyAtIGluIHRoZSBwcmVzcyBoYW5kbGVyIG9mIHRoZSBhY3Rpb24gYnV0dG9uIG9uIHRoZSBwYXJhbWV0ZXIgZGlhbG9nLCB0aGUgdmFsdWUgb2YgZWFjaCBwYXJhbWV0ZXIgaXMgYWRkZWRcblx0Ly8gLSBpbiBzZXRBY3Rpb25QYXJhbWV0ZXJEZWZhdWx0VmFsdWUsIHRoaXMgaW5mb3JtYXRpb24gaXMgdXNlZCBhbmQgdHJhbnNmZXJyZWQgdG8gdGhlIGNvbnRleHQgKGluIE9EYXRhTW9kZWwpIGNyZWF0ZWQgZm9yIHRoZSBhY3Rpb24gZXhlY3V0aW9uXG5cdC8vIHRoaXMgaXMgcXVpdGUgb2RkLCBhbmQgaXQgd291bGQgbWFrZSBtdWNoIG1vcmUgc2Vuc2UgdG8gdGFrZSB0aGUgdmFsdWUgZnJvbSBhY3Rpb25QYXJhbWV0ZXJJbmZvc1xuXHQvLyAtIGhvd2V2ZXIsIHNldEFjdGlvblBhcmFtZXRlckRlZmF1bHRWYWx1ZSAob3IgcmF0aGVyIHRoZSBzdXJyb3VuZGluZyBfZXhlY3V0ZUFjdGlvbikgaXMgYWxzbyBjYWxsZWQgZnJvbSBvdGhlciBwbGFjZXNcblx0Ly8gPT4gZm9yIHRoZSB0aW1lIGJlaW5nLCBhZGRpbmcgdmFsdWUgaGVyZSB0byBhdm9pZCB0cyBlcnJvcnMsIHN1YmplY3QgdG8gcmVmYWN0b3Jpbmdcblx0Ly8gaW4gY2FzZSBvZiBGaWVsZCwgdGhlIHZhbHVlIGlzIHN0cmluZywgaW4gY2FzZSBvZiBNdWx0aVZhbHVlRmllbGQsIGl0J3MgTXVsdGlWYWx1ZUZpZWxkSXRlbVtdXG5cdHZhbHVlOiBzdHJpbmcgfCBNdWx0aVZhbHVlRmllbGRJdGVtW107XG59O1xuXG5leHBvcnQgdHlwZSBBY3Rpb25QYXJhbWV0ZXJJbmZvID0ge1xuXHRwYXJhbWV0ZXI6IEFjdGlvblBhcmFtZXRlcjtcblx0ZmllbGQ6IEZpZWxkIHwgTXVsdGlWYWx1ZUZpZWxkO1xuXHRpc011bHRpVmFsdWU6IGJvb2xlYW47XG5cdHZhbHVlPzogc3RyaW5nIHwgTXVsdGlWYWx1ZUZpZWxkSXRlbVtdO1xuXHR2YWxpZGF0aW9uUHJvbWlzZT86IFByb21pc2U8c3RyaW5nIHwgTXVsdGlWYWx1ZUZpZWxkSXRlbVtdPjtcblx0aGFzRXJyb3I/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBBZGRzIGVycm9yIG1lc3NhZ2VzIGZvciBhbiBhY3Rpb24gcGFyYW1ldGVyIGZpZWxkIHRvIHRoZSBtZXNzYWdlIG1hbmFnZXIuXG4gKlxuICogQHBhcmFtIG1lc3NhZ2VNYW5hZ2VyIFRoZSBhY3RpdmUgTWVzc2FnZU1hbmFnZXIgaW5zdGFuY2VcbiAqIEBwYXJhbSBtZXNzYWdlUGFyYW1ldGVycyBJbmZvcm1hdGlvbiBpZGVudGlmeWluZyBhbiBhY3Rpb24gcGFyYW1ldGVyIGFuZCBtZXNzYWdlcyByZWZlcmluZyB0byB0aGlzIHBhcmFtZXRlclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgYWN0aW9uIHBhcmFtZXRlcnMgY29udGFpbiB2YWxpZCBkYXRhIGFuZCB0aGUgbWFuZGF0b3J5IHBhcmFtZXRlcnMgYXJlIHByb3ZpZGVkXG4gKi9cbi8vIGluIGNhc2Ugb2YgbWlzc2luZyBtYW5kYW90b3J5IHBhcmFtZXRlciwgbWVzc2FnZSBjdXJyZW50bHkgZGlmZmVycyBwZXIgcGFyYW1ldGVyLCBhcyBpdCBzdXBlcmZsdW91c2x5IGNvbnRhaW5zIHRoZSBsYWJlbCBhcyBwYXJhbWV0ZXIuIFBvc3NpYmxreSB0aGlzIGNvdWxkIGJlIHJlbW92ZWQgaW4gZnV0dXJlLCBpbiB0aGF0IGNhc2UsIGludGVyZmFjZSBjb3VsZCBiZSBzaW1wbGlmaWVkIHRvIEFjdGlvblBhcmFtZXRlckluZm9bXSwgc3RyaW5nXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gX2FkZE1lc3NhZ2VGb3JBY3Rpb25QYXJhbWV0ZXIoXG5cdG1lc3NhZ2VNYW5hZ2VyOiBNZXNzYWdlTWFuYWdlcixcblx0bWVzc2FnZVBhcmFtZXRlcnM6IHsgYWN0aW9uUGFyYW1ldGVySW5mbzogQWN0aW9uUGFyYW1ldGVySW5mbzsgbWVzc2FnZTogc3RyaW5nIH1bXVxuKSB7XG5cdG1lc3NhZ2VNYW5hZ2VyLmFkZE1lc3NhZ2VzKFxuXHRcdG1lc3NhZ2VQYXJhbWV0ZXJzLm1hcCgobWVzc2FnZVBhcmFtZXRlcikgPT4ge1xuXHRcdFx0Y29uc3QgYmluZGluZyA9IG1lc3NhZ2VQYXJhbWV0ZXIuYWN0aW9uUGFyYW1ldGVySW5mby5maWVsZC5nZXRCaW5kaW5nKFxuXHRcdFx0XHRtZXNzYWdlUGFyYW1ldGVyLmFjdGlvblBhcmFtZXRlckluZm8uaXNNdWx0aVZhbHVlID8gXCJpdGVtc1wiIDogXCJ2YWx1ZVwiXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG5ldyBNZXNzYWdlKHtcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZVBhcmFtZXRlci5tZXNzYWdlLFxuXHRcdFx0XHR0eXBlOiBcIkVycm9yXCIsXG5cdFx0XHRcdHByb2Nlc3NvcjogYmluZGluZz8uZ2V0TW9kZWwoKSxcblx0XHRcdFx0cGVyc2lzdGVudDogdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0OiBiaW5kaW5nPy5nZXRSZXNvbHZlZFBhdGgoKVxuXHRcdFx0fSk7XG5cdFx0fSlcblx0KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYWxsIHJlcXVpcmVkIGFjdGlvbiBwYXJhbWV0ZXJzIGNvbnRhaW4gZGF0YSBhbmQgY2hlY2tzIGZvciBhbGwgYWN0aW9uIHBhcmFtZXRlcnMgaWYgdGhlXG4gKiBjb250YWluZWQgZGF0YSBpcyB2YWxpZC5cbiAqXG4gKlxuICogQHBhcmFtIG1lc3NhZ2VNYW5hZ2VyIFRoZSBhY3RpdmUgTWVzc2FnZU1hbmFnZXIgaW5zdGFuY2VcbiAqIEBwYXJhbSBhY3Rpb25QYXJhbWV0ZXJJbmZvcyBJbmZvcm1hdGlvbiBpZGVudGlmeWluZyBhbiBhY3Rpb24gcGFyYW1ldGVyXG4gKiBAcGFyYW0gcmVzb3VyY2VNb2RlbCBUaGUgbW9kZWwgdG8gbG9hZCB0ZXh0IHJlc291cmNlc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gX3ZhbGlkYXRlUHJvcGVydGllcyhcblx0bWVzc2FnZU1hbmFnZXI6IE1lc3NhZ2VNYW5hZ2VyLFxuXHRhY3Rpb25QYXJhbWV0ZXJJbmZvczogQWN0aW9uUGFyYW1ldGVySW5mb1tdLFxuXHRyZXNvdXJjZU1vZGVsOiBSZXNvdXJjZU1vZGVsXG4pIHtcblx0YXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGFjdGlvblBhcmFtZXRlckluZm9zLm1hcCgoYWN0aW9uUGFyYW1ldGVySW5mbykgPT4gYWN0aW9uUGFyYW1ldGVySW5mby52YWxpZGF0aW9uUHJvbWlzZSkpO1xuXHRjb25zdCByZXF1aXJlZFBhcmFtZXRlckluZm9zID0gYWN0aW9uUGFyYW1ldGVySW5mb3MuZmlsdGVyKChhY3Rpb25QYXJhbWV0ZXJJbmZvKSA9PiBhY3Rpb25QYXJhbWV0ZXJJbmZvLmZpZWxkLmdldFJlcXVpcmVkKCkpO1xuXG5cdC8qIEhpbnQ6IFRoZSBib29sZWFuIGZhbHNlIGlzIGEgdmFsaWQgdmFsdWUgKi9cblx0Y29uc3QgZW1wdHlSZXF1aXJlZEZpZWxkcyA9IHJlcXVpcmVkUGFyYW1ldGVySW5mb3MuZmlsdGVyKChyZXF1aXJlZFBhcmFtZXRlckluZm8pID0+IHtcblx0XHRpZiAocmVxdWlyZWRQYXJhbWV0ZXJJbmZvLmlzTXVsdGlWYWx1ZSkge1xuXHRcdFx0cmV0dXJuIHJlcXVpcmVkUGFyYW1ldGVySW5mby52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFyZXF1aXJlZFBhcmFtZXRlckluZm8udmFsdWUubGVuZ3RoO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBmaWVsZFZhbHVlID0gKHJlcXVpcmVkUGFyYW1ldGVySW5mby5maWVsZCBhcyBGaWVsZCkuZ2V0VmFsdWUoKTtcblx0XHRcdHJldHVybiBmaWVsZFZhbHVlID09PSB1bmRlZmluZWQgfHwgZmllbGRWYWx1ZSA9PT0gbnVsbCB8fCBmaWVsZFZhbHVlID09PSBcIlwiO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gbWVzc2FnZSBjb250YWlucyBsYWJlbCBwZXIgZmllbGQgZm9yIGhpc3RvcmljYWwgcmVhc29uIChvcmlnaW5hbGx5LCBpdCB3YXMgc2hvd24gaW4gYWRkaXRpb25hbCBwb3B1cCwgbm93IGl0J3MgZGlyZWN0bHkgYWRkZWQgdG8gdGhlIGZpZWxkKVxuXHQvLyBpZiB0aGlzIHdhcyBub3QgdGhlIGNhc2UgKGFuZCBob3BlZnVsbHksIGluIGZ1dHVyZSB0aGlzIG1pZ2h0IGJlIHN1YmplY3QgdG8gY2hhbmdlKSwgaW50ZXJmYWNlIG9mIF9hZGRNZXNzYWdlRm9yQWN0aW9uUGFyYW1ldGVyIGNvdWxkIGJlIHNpbXBsaWZpZWQgdG8ganVzdCBwYXNzIGVtcHR5UmVxdWlyZWRGaWVsZHMgYW5kIGEgY29uc3RhbnQgbWVzc2FnZSBoZXJlXG5cdF9hZGRNZXNzYWdlRm9yQWN0aW9uUGFyYW1ldGVyKFxuXHRcdG1lc3NhZ2VNYW5hZ2VyLFxuXHRcdGVtcHR5UmVxdWlyZWRGaWVsZHMubWFwKChhY3Rpb25QYXJhbWV0ZXJJbmZvKSA9PiAoe1xuXHRcdFx0YWN0aW9uUGFyYW1ldGVySW5mbzogYWN0aW9uUGFyYW1ldGVySW5mbyxcblx0XHRcdG1lc3NhZ2U6IHJlc291cmNlTW9kZWwuZ2V0VGV4dChcIkNfT1BFUkFUSU9OU19BQ1RJT05fUEFSQU1FVEVSX0RJQUxPR19NSVNTSU5HX01BTkRBVE9SWV9NU0dcIiwgW1xuXHRcdFx0XHQoYWN0aW9uUGFyYW1ldGVySW5mby5maWVsZC5nZXRQYXJlbnQoKT8uZ2V0QWdncmVnYXRpb24oXCJsYWJlbFwiKSBhcyBMYWJlbCkuZ2V0VGV4dCgpXG5cdFx0XHRdKVxuXHRcdH0pKVxuXHQpO1xuXG5cdC8qIENoZWNrIHZhbHVlIHN0YXRlIG9mIGFsbCBwYXJhbWV0ZXIgKi9cblx0Y29uc3QgZmlyc3RJbnZhbGlkQWN0aW9uUGFyYW1ldGVyID0gYWN0aW9uUGFyYW1ldGVySW5mb3MuZmluZChcblx0XHQvLyB1bmZvcnR1bmF0ZWx5LCBfYWRkTWVzc2FnZUZvckFjdGlvblBhcmFtZXRlciBzZXRzIHZhbHVlU3RhdGUgb25seSBhc3luY2hyb25lb3VzbHksIHRodXMgY2hlY2tpbmcgZW1wdHlSZXF1aXJlZEZpZWxkcyBhbmQgaGFzRXJyb3IgYWRkaXRpb25hbGx5OlxuXHRcdC8vIC0gY2hlY2tpbmcgaGFzRXJyb3I6IHVzZXIgaGFzIGNoYW5nZWQgZmllbGQgdG8gaW52YWxpZCB2YWx1ZSwgdmFsaWRhdGlvbiBwcm9taXNlIGhhcyBiZWVuIHJlamVjdGVkLCB0aGVyZWZvcmUgd2UgYXJlIGFkZGluZyBtZXNzYWdlIHRvIG1lc3NhZ2UgbW9kZWxcblx0XHQvLyB3aGljaCBpbiB0dXJuIHNldHMgdmFsdWUgc3RhdGUgdG8gJ0Vycm9yJyBidXQgdGhpcyBsYXN0IHN0ZXAgbWlnaHQgbm90IGhhdmUgaGFwcGVuZWQgeWV0IGR1ZSB0byBhc3luY2hyb25pdHkgaW4gbW9kZWwuXG5cdFx0Ly8gLSBhbHNvIGNoZWNraW5nIHZhbHVlIHN0YXRlOiBhbHNvIG91dCBwYXJhbWV0ZXIgb2YgYW5vdGhlciBhY3Rpb24gcGFyYW1ldGVyIGNvdWxkIGNoYW5nZSBmaWVsZCBhbmQgaXQncyB2YWx1ZSBzdGF0ZSB3aXRob3V0IHNlbmRpbmcgY2hhbmdlIGV2ZW50LlxuXG5cdFx0KGFjdGlvblBhcmFtZXRlckluZm8pID0+XG5cdFx0XHRhY3Rpb25QYXJhbWV0ZXJJbmZvLmhhc0Vycm9yIHx8XG5cdFx0XHRhY3Rpb25QYXJhbWV0ZXJJbmZvLmZpZWxkLmdldFZhbHVlU3RhdGUoKSA9PT0gXCJFcnJvclwiIHx8XG5cdFx0XHRlbXB0eVJlcXVpcmVkRmllbGRzLmluY2x1ZGVzKGFjdGlvblBhcmFtZXRlckluZm8pXG5cdCk7XG5cblx0aWYgKGZpcnN0SW52YWxpZEFjdGlvblBhcmFtZXRlcikge1xuXHRcdGZpcnN0SW52YWxpZEFjdGlvblBhcmFtZXRlci5maWVsZC5mb2N1cygpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFBQTtBQUFBOzs7OztFQW9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNBO0VBQ08sZUFBZUEsNkJBQTZCLENBQ2xEQyxjQUE4QixFQUM5QkMsaUJBQWtGLEVBQ2pGO0lBQ0RELGNBQWMsQ0FBQ0UsV0FBVyxDQUN6QkQsaUJBQWlCLENBQUNFLEdBQUcsQ0FBRUMsZ0JBQWdCLElBQUs7TUFDM0MsTUFBTUMsT0FBTyxHQUFHRCxnQkFBZ0IsQ0FBQ0UsbUJBQW1CLENBQUNDLEtBQUssQ0FBQ0MsVUFBVSxDQUNwRUosZ0JBQWdCLENBQUNFLG1CQUFtQixDQUFDRyxZQUFZLEdBQUcsT0FBTyxHQUFHLE9B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