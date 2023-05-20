/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/util/ObjectPath", "sap/fe/core/CommonUtils"], function (ObjectPath, CommonUtils) {
  "use strict";

  const FPMHelper = {
    actionWrapper: function (oEvent, sModule, sMethod, oParameters) {
      return new Promise(function (resolve) {
        //The source would be command execution, in case a command is defined for the action in the manifest.
        const oSource = oEvent.getSource ? oEvent.getSource() : oEvent.oSource,
          oView = CommonUtils.getTargetView(oSource),
          oBindingContext = oSource.getBindingContext();
        let oExtensionAPI;
        let aSelectedContexts;
        if (oParameters !== undefined) {
          aSelectedContexts = oParameters.contexts || [];
        } else if (oBindingContext !== undefined) {
          aSelectedContexts = [oBindingContext];
        } else {
          aSelectedContexts = [];
        }
        if (oView.getControllerName() === "sap.fe.templates.ObjectPage.ObjectPageController" || oView.getControllerName() === "sap.fe.templates.ListReport.ListReportController") {
          oExtensionAPI = oView.getController().getExtensionAPI();
        }
        if (sModule.startsWith("/extension/")) {
          const fnTarget = ObjectPath.get(sModule.replace(/\//g, ".").substr(1), oExtensionAPI);
          resolve(fnTarget[sMethod](oBindingContext, aSelectedContexts));
        } else {
          sap.ui.require([sModule], function (module) {
            // - we bind the action to the extensionAPI of the controller so it has the same scope as a custom section
            // - we provide the context as API, maybe if needed further properties
            resolve(module[sMethod].bind(oExtensionAPI)(oBindingContext, aSelectedContexts));
          });
        }
      });
    },
    validationWrapper: function (sModule, sMethod, oValidationContexts, oView, oBindingContext) {
      return new Promise(function (resolve) {
        let oExtensionAPI;
        if (oView.getControllerName() === "sap.fe.templates.ObjectPage.ObjectPageController" || oView.getControllerName() === "sap.fe.templates.ListReport.ListReportController") {
          oExtensionAPI = oView.getController().getExtensionAPI();
        }
        sap.ui.require([sModule], function (module) {
          // - we bind the action to the extensionAPI of the controller so it has the same scope as a custom section
          // - we provide the context as API, maybe if needed further properties
          resolve(module[sMethod].bind(oExtensionAPI)(oBindingContext, oValidationContexts));
        });
      });
    }
  };
  return FPMHelper;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGUE1IZWxwZXIiLCJhY3Rpb25XcmFwcGVyIiwib0V2ZW50Iiwic01vZHVsZSIsInNNZXRob2QiLCJvUGFyYW1ldGVycyIsIlByb21pc2UiLCJyZXNvbHZlIiwib1NvdXJjZSIsImdldFNvdXJjZSIsIm9WaWV3IiwiQ29tbW9uVXRpbHMiLCJnZXRUYXJnZXRWaWV3Iiwib0JpbmRpbmdDb250ZXh0IiwiZ2V0QmluZGluZ0NvbnRleHQiLCJvRXh0ZW5zaW9uQVBJIiwiYVNlbGVjdGVkQ29udGV4dHMiLCJ1bmRlZmluZWQiLCJjb250ZXh0cyIsImdldENvbnRyb2xsZXJOYW1lIiwiZ2V0Q29udHJvbGxlciIsImdldEV4dGVuc2lvbkFQSSIsInN0YXJ0c1dpdGgiLCJmblRhcmdldCIsIk9iamVjdFBhdGgiLCJnZXQiLCJyZXBsYWNlIiwic3Vic3RyIiwic2FwIiwidWkiLCJyZXF1aXJlIiwibW9kdWxlIiwiYmluZCIsInZhbGlkYXRpb25XcmFwcGVyIiwib1ZhbGlkYXRpb25Db250ZXh0cyJdLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXMiOlsiRlBNSGVscGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPYmplY3RQYXRoIGZyb20gXCJzYXAvYmFzZS91dGlsL09iamVjdFBhdGhcIjtcbmltcG9ydCBDb21tb25VdGlscyBmcm9tIFwic2FwL2ZlL2NvcmUvQ29tbW9uVXRpbHNcIjtcbmltcG9ydCB0eXBlIEV4dGVuc2lvbkFQSSBmcm9tIFwic2FwL2ZlL2NvcmUvRXh0ZW5zaW9uQVBJXCI7XG5pbXBvcnQgdHlwZSBQYWdlQ29udHJvbGxlciBmcm9tIFwic2FwL2ZlL2NvcmUvUGFnZUNvbnRyb2xsZXJcIjtcbmltcG9ydCB0eXBlIENvbnRleHQgZnJvbSBcInNhcC91aS9tb2RlbC9Db250ZXh0XCI7XG5cbmNvbnN0IEZQTUhlbHBlciA9IHtcblx0YWN0aW9uV3JhcHBlcjogZnVuY3Rpb24gKG9FdmVudDogYW55LCBzTW9kdWxlOiBhbnksIHNNZXRob2Q6IGFueSwgb1BhcmFtZXRlcnM6IGFueSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZTogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcblx0XHRcdC8vVGhlIHNvdXJjZSB3b3VsZCBiZSBjb21tYW5kIGV4ZWN1dGlvbiwgaW4gY2FzZSBhIGNvbW1hbmQgaXMgZGVmaW5lZCBmb3IgdGhlIGFjdGlvbiBpbiB0aGUgbWFuaWZlc3QuXG5cdFx0XHRjb25zdCBvU291cmNlID0gb0V2ZW50LmdldFNvdXJjZSA/IG9FdmVudC5nZXRTb3VyY2UoKSA6IG9FdmVudC5vU291cmNlLFxuXHRcdFx0XHRvVmlldyA9IENvbW1vblV0aWxzLmdldFRhcmdldFZpZXcob1NvdXJjZSksXG5cdFx0XHRcdG9CaW5kaW5nQ29udGV4dCA9IG9Tb3VyY2UuZ2V0QmluZGluZ0NvbnRleHQoKTtcblx0XHRcdGxldCBvRXh0ZW5zaW9uQVBJOiBFeHRlbnNpb25BUEkgfCB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgYVNlbGVjdGVkQ29udGV4dHM6IENvbnRleHRbXTtcblxuXHRcdFx0aWYgKG9QYXJhbWV0ZXJzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YVNlbGVjdGVkQ29udGV4dHMgPSBvUGFyYW1ldGVycy5jb250ZXh0cyB8fCBbXTtcblx0XHRcdH0gZWxzZSBpZiAob0JpbmRpbmdDb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YVNlbGVjdGVkQ29udGV4dHMgPSBbb0JpbmRpbmdDb250ZXh0XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFTZWxlY3RlZENvbnRleHRzID0gW107XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcblx0XHRcdFx0b1ZpZXcuZ2V0Q29udHJvbGxlck5hbWUoKSA9PT0gXCJzYXAuZmUudGVtcGxhdGVzLk9iamVjdFBhZ2UuT2JqZWN0UGFnZUNvbnRyb2xsZXJcIiB8fFxuXHRcdFx0XHRvVmlldy5nZXRDb250cm9sbGVyTmFtZSgpID09PSBcInNhcC5mZS50ZW1wbGF0ZXMuTGlzdFJlcG9ydC5MaXN0UmVwb3J0Q29udHJvbGxlclwiXG5cdFx0XHQpIHtcblx0XHRcdFx0b0V4dGVuc2lvbkFQSSA9IChvVmlldy5nZXRDb250cm9sbGVyKCkgYXMgUGFnZUNvbnRyb2xsZXIpLmdldEV4dGVuc2lvbkFQSSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc01vZHVsZS5zdGFydHNXaXRoKFwiL2V4dGVuc2lvbi9cIikpIHtcblx0XHRcdFx0Y29uc3QgZm5UYXJnZXQgPSBPYmplY3RQYXRoLmdldChzTW9kdWxlLnJlcGxhY2UoL1xcLy9nLCBcIi5cIikuc3Vic3RyKDEpLCBvRXh0ZW5zaW9uQVBJKTtcblx0XHRcdFx0cmVzb2x2ZShmblRhcmdldFtzTWV0aG9kXShvQmluZGluZ0NvbnRleHQsIGFTZWxlY3RlZENvbnRleHRzKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzYXAudWkucmVxdWlyZShbc01vZHVsZV0sIGZ1bmN0aW9uIChtb2R1bGU6IGFueSkge1xuXHRcdFx0XHRcdC8vIC0gd2UgYmluZCB0aGUgYWN0aW9uIHRvIHRoZSBleHRlbnNpb25BUEkgb2YgdGhlIGNvbnRyb2xsZXIgc28gaXQgaGFzIHRoZSBzYW1lIHNjb3BlIGFzIGEgY3VzdG9tIHNlY3Rpb25cblx0XHRcdFx0XHQvLyAtIHdlIHByb3ZpZGUgdGhlIGNvbnRleHQgYXMgQVBJLCBtYXliZSBpZiBuZWVkZWQgZnVydGhlciBwcm9wZXJ0aWVzXG5cdFx0XHRcdFx0cmVzb2x2ZShtb2R1bGVbc01ldGhvZF0uYmluZChvRXh0ZW5zaW9uQVBJKShvQmluZGluZ0NvbnRleHQsIGFTZWxlY3RlZENvbnRleHRzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHR2YWxpZGF0aW9uV3JhcHBlcjogZnVuY3Rpb24gKHNNb2R1bGU6IGFueSwgc01ldGhvZDogYW55LCBvVmFsaWRhdGlvbkNvbnRleHRzOiBhbnksIG9WaWV3OiBhbnksIG9CaW5kaW5nQ29udGV4dDogYW55KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuXHRcdFx0bGV0IG9FeHRlbnNpb25BUEk6IEV4dGVuc2lvbkFQSTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRvVmlldy5nZXRDb250cm9sbGVyTmFtZSgpID09PSBcInNhcC5mZS50ZW1wbGF0ZXMuT2JqZWN0UGFnZS5PYmplY3RQYWdlQ29udHJvbGxlclwiIHx8XG5cdFx0XHRcdG9WaWV3LmdldENvbnRyb2xsZXJOYW1lKCkgPT09IFwic2FwLmZlLnRlbXBsYXRlcy5MaXN0UmVwb3J0Lkxpc3RSZXBvcnRDb250cm9sbGVyXCJcblx0XHRcdCkge1xuXHRcdFx0XHRvRXh0ZW5zaW9uQVBJID0gb1ZpZXcuZ2V0Q29udHJvbGxlcigpLmdldEV4dGVuc2lvbkFQSSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRzYXAudWkucmVxdWlyZShbc01vZHVsZV0sIGZ1bmN0aW9uIChtb2R1bGU6IGFueSkge1xuXHRcdFx0XHQvLyAtIHdlIGJpbmQgdGhlIGFjdGlvbiB0byB0aGUgZXh0ZW5zaW9uQVBJIG9mIHRoZSBjb250cm9sbGVyIHNvIGl0IGhhcyB0aGUgc2FtZSBzY29wZSBhcyBhIGN1c3RvbSBzZWN0aW9uXG5cdFx0XHRcdC8vIC0gd2UgcHJvdmlkZSB0aGUgY29udGV4dCBhcyBBUEksIG1heWJlIGlmIG5lZWRlZCBmdXJ0aGVyIHByb3BlcnRpZXNcblx0XHRcdFx0cmVzb2x2ZShtb2R1bGVbc01ldGhvZF0uYmluZChvRXh0ZW5zaW9uQVBJKShvQmluZGluZ0NvbnRleHQsIG9WYWxpZGF0aW9uQ29udGV4dHMpKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGUE1IZWxwZXI7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQUE7Ozs7RUFNQSxNQUFNQSxTQUFTLEdBQUc7SUFDakJDLGFBQWEsRUFBRSxVQUFVQyxNQUFXLEVBQUVDLE9BQVksRUFBRUMs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