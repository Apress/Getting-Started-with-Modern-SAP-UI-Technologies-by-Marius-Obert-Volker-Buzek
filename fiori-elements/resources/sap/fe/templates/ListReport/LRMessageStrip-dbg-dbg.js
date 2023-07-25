/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/Core", "sap/ui/core/message/Message"], function (Core, Message) {
  "use strict";

  var _exports = {};
  let LRMessageStrip = /*#__PURE__*/function () {
    function LRMessageStrip() {
      const messageManager = Core.getMessageManager();
      this.customMessageInfo = {
        messageManagerDataBinding: messageManager.getMessageModel().bindList("/"),
        multiModeControlMessagesMap: {}
      };
    }
    _exports.LRMessageStrip = LRMessageStrip;
    var _proto = LRMessageStrip.prototype;
    _proto.getCustomMessageInfo = function getCustomMessageInfo() {
      return this.customMessageInfo;
    };
    _proto.destroy = function destroy() {
      this.customMessageInfo.messageManagerDataBinding.detachChange(this._eventHandlerCustomMessage, this);
    };
    _proto._getMessagesWithSameTargetThanCustomMessage = function _getMessagesWithSameTargetThanCustomMessage() {
      const messageManager = Core.getMessageManager();
      return messageManager.getMessageModel().getData().filter(msg => {
        var _this$customMessageIn;
        return msg.getTargets()[0] === ((_this$customMessageIn = this.customMessageInfo.currentMessage) === null || _this$customMessageIn === void 0 ? void 0 : _this$customMessageIn.getTargets()[0]) && msg !== this.customMessageInfo.currentMessage;
      });
    }

    /**
     * MessageManager Event Handler responsible to add or remove the current customMessage.
     *
     * @alias sap.fe.core.helpers.LRMessageStrip#_eventHandlerCustomMessage
     * @private
     */;
    _proto._eventHandlerCustomMessage = function _eventHandlerCustomMessage() {
      const messageManager = Core.getMessageManager();
      if (this.customMessageInfo.currentMessage) {
        const aMessageWithSameTargetThanCustomMessage = this._getMessagesWithSameTargetThanCustomMessage();
        const isCustomMessageInMessageManager = !!messageManager.getMessageModel().getData().find(msg => msg === this.customMessageInfo.currentMessage);
        if (aMessageWithSameTargetThanCustomMessage.length > 0 && isCustomMessageInMessageManager) {
          var _this$customMessageIn2;
          //if there are other messages with the same message on the MessageManager and the customMessage
          //then we need to remove the customeMessage from the MessageManager
          messageManager.removeMessages([(_this$customMessageIn2 = this.customMessageInfo) === null || _this$customMessageIn2 === void 0 ? void 0 : _this$customMessageIn2.currentMessage]);
        } else if (aMessageWithSameTargetThanCustomMessage.length === 0 && !isCustomMessageInMessageManager) {
          messageManager.addMessages([this.customMessageInfo.currentMessage]);
        }
      }
    }

    /**
     * This function manages the lifecycle of the custom message (populates the customMessageInfo object, attaches an event to the message manager and inserts a message).
     *
     * @param event Event object (optional).
     * @param oData Parameters
     * @param oData.message The LRCustomMessage to be used to generate the message object
     * @param oData.table The table targeted by the message
     * @param oData.skipMessageManagerUpdate Should skip to insert the message in the MessageManager
     * @alias sap.fe.core.helpers.LRMessageStrip#createCustomMessage
     * @private
     */;
    _proto.createCustomMessage = function createCustomMessage(event, oData) {
      var _table$getRowBinding, _customMessageMap$tab;
      const message = oData.message;
      const table = oData.table;
      const skipMessageManagerUpdate = oData.skipMessageManagerUpdate;
      const rowBindingPath = (_table$getRowBinding = table.getRowBinding()) === null || _table$getRowBinding === void 0 ? void 0 : _table$getRowBinding.getPath();
      const messageManager = Core.getMessageManager();
      const customMessageMap = this.customMessageInfo.multiModeControlMessagesMap;
      customMessageMap[table.getId()] = message;
      if (!rowBindingPath) {
        table.attachEventOnce("bindingUpdated", oData, this.createCustomMessage, this);
        return;
      }
      if ((_customMessageMap$tab = customMessageMap[table.getId()]) !== null && _customMessageMap$tab !== void 0 && _customMessageMap$tab.onClose) {
        var _customMessageMap$tab2;
        table.getDataStateIndicator().detachEvent("close", (_customMessageMap$tab2 = customMessageMap[table.getId()]) === null || _customMessageMap$tab2 === void 0 ? void 0 : _customMessageMap$tab2.onClose, this);
      }
      const processor = table.getModel();
      const oMessage = message ? new Message({
        message: message.message,
        type: message.type,
        target: [rowBindingPath],
        persistent: true,
        processor
      }) : null;
      this.customMessageInfo.messageManagerDataBinding.detachChange(this._eventHandlerCustomMessage, this);
      if (!skipMessageManagerUpdate) {
        if (this.customMessageInfo.currentMessage) {
          messageManager.removeMessages([this.customMessageInfo.currentMessage]);
        }
        if (oMessage) {
          this.customMessageInfo.currentMessage = oMessage;
        } else {
          delete this.customMessageInfo.currentMessage;
        }
        if (oMessage && this._getMessagesWithSameTargetThanCustomMessage().length === 0) {
          messageManager.addMessages([oMessage]);
        }
      }
      this.customMessageInfo.messageManagerDataBinding.attachChange(this._eventHandlerCustomMessage, this);
      this.attachDataStateIndicatorCloseEvent(table, customMessageMap, message === null || message === void 0 ? void 0 : message.onClose);
    }

    /**
     * This function attaches the onClose event function to the dataStateIndicator.
     *
     * @param table The table associated with the dataStateIndicator
     * @param customMessageMap The CustomMessageMap object
     * @param fnOnClose A function to be attached to the "close" event
     * @alias sap.fe.core.helpers.LRMessageStrip#attachDataStateIndicatorCloseEvent
     * @private
     */;
    _proto.attachDataStateIndicatorCloseEvent = function attachDataStateIndicatorCloseEvent(table, customMessageMap, fnOnClose) {
      if (fnOnClose) {
        table.getDataStateIndicator().attachEventOnce("close", fnOnClose, this);
      }
      //When closing the the messageStrip, the associated message is removed
      table.getDataStateIndicator().attachEventOnce("close", () => {
        delete customMessageMap[table.getId()];
      });
    }

    /**
     * MultipleModeControl Event handler responsible for displaying the correct custom message when a specific tab is selected.
     *
     * @alias sap.fe.core.helpers.LRMessageStrip#onSelectMultipleModeControl
     * @private
     */;
    _proto.onSelectMultipleModeControl = function onSelectMultipleModeControl(event, controller) {
      const table = controller._getTable();
      const message = this.customMessageInfo.multiModeControlMessagesMap[table.getId()];
      this.createCustomMessage(null, {
        message,
        table
      });
    }

    /**
     * Provide an option for showing a custom message in the message bar above the list report table.
     *
     * @param {object} [message] Custom message along with the message type to be set on the table.
     * @param {string} [message.message] Message string to be displayed.
     * @param {sap.ui.core.MessageType} [message.type] Indicates the type of message.
     * @param {ListReportController} [controller] Controller of the current view.
     * @param {string[]|string} [tabKey] The entitySet identifying the table in which to display the custom message.
     * @param {Function} [onClose] A function that is called when the user closes the message bar.
     * @private
     */;
    _proto.showCustomMessage = function showCustomMessage(message, controller, tabKey, onClose) {
      const _tabKey = Array.isArray(tabKey) ? tabKey : [tabKey];
      const isMultiMode = controller._isMultiMode();
      let table;
      if (message) {
        message.onClose = onClose;
      }
      if (isMultiMode) {
        const multipleModeControl = controller._getMultiModeControl();
        //we fisrt need to detach the select event to prevent multiple attachments.
        multipleModeControl.detachEvent("select", this.onSelectMultipleModeControl, this);
        multipleModeControl.attachEvent("select", controller, this.onSelectMultipleModeControl, this);
        multipleModeControl.getAllInnerControls(true).forEach((innerControl, index) => {
          if (innerControl.isA("sap.fe.macros.table.TableAPI")) {
            if (!tabKey || _tabKey.indexOf(index.toString()) !== -1) {
              table = innerControl.getContent();
              this.createCustomMessage(null, {
                message,
                table,
                skipMessageManagerUpdate: multipleModeControl.getSelectedInnerControl() !== innerControl
              });
            }
          }
        });
        return;
      }
      table = controller._getTable();
      this.createCustomMessage(null, {
        message,
        table
      });
    };
    return LRMessageStrip;
  }();
  _exports.LRMessageStrip = LRMessageStrip;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMUk1lc3NhZ2VTdHJpcCIsIm1lc3NhZ2VNYW5hZ2VyIiwiQ29yZSIsImdldE1lc3NhZ2VNYW5hZ2VyIiwiY3VzdG9tTWVzc2FnZUluZm8iLCJtZXNzYWdlTWFuYWdlckRhdGFCaW5kaW5nIiwiZ2V0TWVzc2FnZU1vZGVsIiwiYmluZExpc3QiLCJtdWx0aU1vZGVDb250cm9sTWVzc2FnZXNNYXAiLCJnZXRDdXN0b21NZXNzYWdlSW5mbyIsImRlc3Ryb3kiLCJkZXRhY2hDaGFuZ2UiLCJfZXZlbnRIYW5kbGVyQ3VzdG9tTWVzc2FnZSIsIl9nZXRNZXNzYWdlc1dpdGhTYW1lVGFyZ2V0VGhhbkN1c3RvbU1lc3NhZ2UiLCJnZXREYXRhIiwiZmlsdGVyIiwibXNnIiwiZ2V0VGFyZ2V0cyIsImN1cnJlbnRNZXNzYWdlIiwiYU1lc3NhZ2VXaXRoU2FtZVRhcmdldFRoYW5DdXN0b21NZXNzYWdlIiwiaXNDdXN0b21NZXNzYWdlSW5NZXNzYWdlTWFuYWdlciIsImZpbmQiLCJsZW5ndGgiLCJyZW1vdmVNZXNzYWdlcyIsImFkZE1lc3NhZ2VzIiwiY3JlYXRlQ3VzdG9tTWVzc2FnZSIsImV2ZW50Iiwib0RhdGEiLCJtZXNzYWdlIiwidGFibGUiLCJza2lwTWVzc2FnZU1hbmFnZXJVcGRhdGUiLCJyb3dCaW5kaW5nUGF0aCIsImdldFJvd0JpbmRpbmciLCJnZXRQYXRoIiwiY3VzdG9tTWVzc2FnZU1hcCIsImdldElkIiwiYXR0YWNoRXZlbnRPbmNlIiwib25DbG9zZSIsImdldERhdGFTdGF0ZUluZGljYXRvciIsImRldGFjaEV2ZW50IiwicHJvY2Vzc29yIiwiZ2V0TW9kZWwiLCJvTWVzc2FnZSIsIk1lc3NhZ2UiLCJ0eXBlIiwidGFyZ2V0IiwicGVyc2lzdGVudCIsImF0dGFjaENoYW5nZSIsImF0dGFjaERhdGFTdGF0ZUluZGljYXRvckNsb3NlRXZlbnQiLCJmbk9uQ2xvc2UiLCJvblNlbGVjdE11bHRpcGxlTW9kZUNvbnRyb2wiLCJjb250cm9sbGVyIiwiX2dldFRhYmxlIiwic2hvd0N1c3RvbU1lc3NhZ2UiLCJ0YWJLZXkiLCJfdGFiS2V5IiwiQXJyYXkiLCJpc0FycmF5IiwiaXNNdWx0aU1vZGUiLCJfaXNNdWx0aU1vZGUiLCJtdWx0aXBsZU1vZGVDb250cm9sIiwiX2dldE11bHRpTW9kZUNvbnRyb2wiLCJhdHRhY2hFdmVudCIsImdldEFsbElubmVyQ29udHJvbHMiLCJmb3JFYWNoIiwiaW5uZXJDb250cm9sIiwiaW5kZXgiLCJpc0EiLCJpbmRleE9mIiwidG9TdHJpbmciLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0ZWRJbm5lckNvbnRyb2wiXSwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzIjpbIkxSTWVzc2FnZVN0cmlwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgSW5uZXJDb250cm9sVHlwZSB9IGZyb20gXCJzYXAvZmUvdGVtcGxhdGVzL0xpc3RSZXBvcnQvY29udHJvbHMvTXVsdGlwbGVNb2RlQ29udHJvbFwiO1xuaW1wb3J0IHR5cGUgTGlzdFJlcG9ydENvbnRyb2xsZXIgZnJvbSBcInNhcC9mZS90ZW1wbGF0ZXMvTGlzdFJlcG9ydC9MaXN0UmVwb3J0Q29udHJvbGxlci5jb250cm9sbGVyXCI7XG5pbXBvcnQgdHlwZSBFdmVudCBmcm9tIFwic2FwL3VpL2Jhc2UvRXZlbnRcIjtcbmltcG9ydCBDb3JlIGZyb20gXCJzYXAvdWkvY29yZS9Db3JlXCI7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcInNhcC91aS9jb3JlL2xpYnJhcnlcIjtcbmltcG9ydCBNZXNzYWdlIGZyb20gXCJzYXAvdWkvY29yZS9tZXNzYWdlL01lc3NhZ2VcIjtcbmltcG9ydCBNRENUYWJsZSBmcm9tIFwic2FwL3VpL21kYy9UYWJsZVwiO1xuaW1wb3J0IHR5cGUgTGlzdEJpbmRpbmcgZnJvbSBcInNhcC91aS9tb2RlbC9MaXN0QmluZGluZ1wiO1xuXG5leHBvcnQgdHlwZSBMUkN1c3RvbU1lc3NhZ2UgPSB7XG5cdG1lc3NhZ2U6IHN0cmluZztcblx0dHlwZT86IE1lc3NhZ2VUeXBlO1xuXHRvbkNsb3NlPzogRnVuY3Rpb247XG59O1xuXG5leHBvcnQgY2xhc3MgTFJNZXNzYWdlU3RyaXAge1xuXHRjdXN0b21NZXNzYWdlSW5mbyE6IHtcblx0XHRtZXNzYWdlTWFuYWdlckRhdGFCaW5kaW5nOiBMaXN0QmluZGluZztcblx0XHRjdXJyZW50TWVzc2FnZT86IE1lc3NhZ2U7XG5cdFx0bXVsdGlNb2RlQ29udHJvbE1lc3NhZ2VzTWFwOiB7IFtrZXk6IHN0cmluZ106IExSQ3VzdG9tTWVzc2FnZSB8IHVuZGVmaW5lZCB9O1xuXHR9O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGNvbnN0IG1lc3NhZ2VNYW5hZ2VyID0gQ29yZS5nZXRNZXNzYWdlTWFuYWdlcigpO1xuXHRcdHRoaXMuY3VzdG9tTWVzc2FnZUluZm8gPSB7XG5cdFx0XHRtZXNzYWdlTWFuYWdlckRhdGFCaW5kaW5nOiBtZXNzYWdlTWFuYWdlci5nZXRNZXNzYWdlTW9kZWwoKS5iaW5kTGlzdChcIi9cIiksXG5cdFx0XHRtdWx0aU1vZGVDb250cm9sTWVzc2FnZXNNYXA6IHt9XG5cdFx0fTtcblx0fVxuXG5cdGdldEN1c3RvbU1lc3NhZ2VJbmZvKCkge1xuXHRcdHJldHVybiB0aGlzLmN1c3RvbU1lc3NhZ2VJbmZvO1xuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmN1c3RvbU1lc3NhZ2VJbmZvLm1lc3NhZ2VNYW5hZ2VyRGF0YUJpbmRpbmcuZGV0YWNoQ2hhbmdlKHRoaXMuX2V2ZW50SGFuZGxlckN1c3RvbU1lc3NhZ2UsIHRoaXMpO1xuXHR9XG5cblx0X2dldE1lc3NhZ2VzV2l0aFNhbWVUYXJnZXRUaGFuQ3VzdG9tTWVzc2FnZSgpIHtcblx0XHRjb25zdCBtZXNzYWdlTWFuYWdlciA9IENvcmUuZ2V0TWVzc2FnZU1hbmFnZXIoKTtcblx0XHRyZXR1cm4gbWVzc2FnZU1hbmFnZXJcblx0XHRcdC5nZXRNZXNzYWdlTW9kZWwoKVxuXHRcdFx0LmdldERhdGEoKVxuXHRcdFx0LmZpbHRlcihcblx0XHRcdFx0KG1zZzogTWVzc2FnZSkgPT5cblx0XHRcdFx0XHRtc2cuZ2V0VGFyZ2V0cygpWzBdID09PSB0aGlzLmN1c3RvbU1lc3NhZ2VJbmZvLmN1cnJlbnRNZXNzYWdlPy5nZXRUYXJnZXRzKClbMF0gJiZcblx0XHRcdFx0XHRtc2cgIT09IHRoaXMuY3VzdG9tTWVzc2FnZUluZm8uY3VycmVudE1lc3NhZ2Vcblx0XHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogTWVzc2FnZU1hbmFnZXIgRXZlbnQgSGFuZGxlciByZXNwb25zaWJsZSB0byBhZGQgb3IgcmVtb3ZlIHRoZSBjdXJyZW50IGN1c3RvbU1lc3NhZ2UuXG5cdCAqXG5cdCAqIEBhbGlhcyBzYXAuZmUuY29yZS5oZWxwZXJzLkxSTWVzc2FnZVN0cmlwI19ldmVudEhhbmRsZXJDdXN0b21NZXNzYWdlXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfZXZlbnRIYW5kbGVyQ3VzdG9tTWVzc2FnZSgpIHtcblx0XHRjb25zdCBtZXNzYWdlTWFuYWdlciA9IENvcmUuZ2V0TWVzc2FnZU1hbmFnZXIoKTtcblx0XHRpZiAodGhpcy5jdXN0b21NZXNzYWdlSW5mby5jdXJyZW50TWVzc2FnZSkge1xuXHRcdFx0Y29uc3QgYU1lc3NhZ2VXaXRoU2FtZVRhcmdldFRoYW5DdXN0b21NZXNzYWdlID0gdGhpcy5fZ2V0TWVzc2FnZXNXaXRoU2FtZVRhcmdldFRoYW5DdXN0b21NZXNzYWdlKCk7XG5cdFx0XHRjb25zdCBpc0N1c3RvbU1lc3NhZ2VJbk1lc3NhZ2VNYW5hZ2VyID0gISFtZXNzYWdlTWFuYWdlclxuXHRcdFx0XHQuZ2V0TWVzc2FnZU1vZGVsKClcblx0XHRcdFx0LmdldERhdGEoKVxuXHRcdFx0XHQuZmluZCgobXNnOiBNZXNzYWdlKSA9PiBtc2cgPT09IHRoaXMuY3VzdG9tTWVzc2FnZUluZm8uY3VycmVudE1lc3NhZ2UpO1xuXG5cdFx0XHRpZiAoYU1lc3NhZ2VXaXRoU2FtZVRhcmdldFRoYW5DdXN0b21NZXNzYWdlLmxlbmd0aCA+IDAgJiYgaXNDdXN0b21NZXNzYWdlSW5NZXNzYWdlTWFuYWdlcikge1xuXHRcdFx0XHQvL2lmIHRoZXJlIGFyZSBvdGhlciBtZXNzYWdlcyB3aXRoIHRoZSBzYW1lIG1lc3NhZ2Ugb24gdGhlIE1lc3NhZ2VNYW5hZ2VyIGFuZCB0aGUgY3VzdG9tTWVzc2FnZVxuXHRcdFx0XHQvL3RoZW4gd2UgbmVlZCB0byByZW1vdmUgdGhlIGN1c3RvbWVNZXNzYWdlIGZyb20gdGhlIE1lc3NhZ2VNYW5hZ2VyXG5cdFx0XHRcdG1lc3NhZ2VNYW5hZ2VyLnJlbW92ZU1lc3NhZ2VzKFt0aGlzLmN1c3RvbU1lc3NhZ2VJbmZvPy5jdXJyZW50TWVzc2FnZV0pO1xuXHRcdFx0fSBlbHNlIGlmIChhTWVzc2FnZVdpdGhTYW1lVGFyZ2V0VGhhbkN1c3RvbU1lc3NhZ2UubGVuZ3RoID09PSAwICYmICFpc0N1c3RvbU1lc3NhZ2VJbk1lc3NhZ2VNYW5hZ2VyKSB7XG5cdFx0XHRcdG1lc3NhZ2VNYW5hZ2VyLmFkZE1lc3NhZ2VzKFt0aGlzLmN1c3RvbU1lc3NhZ2VJbmZvLmN1cnJlbnRNZXNzYWdlXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgZnVuY3Rpb24gbWFuYWdlcyB0aGUgbGlmZWN5Y2xlIG9mIHRoZSBjdXN0b20gbWVzc2FnZSAocG9wdWxhdGVzIHRoZSBjdXN0b21NZXNzYWdlSW5mbyBvYmplY3QsIGF0dGFjaGVzIGFuIGV2ZW50IHRvIHRoZSBtZXNzYWdlIG1hbmFnZXIgYW5kIGluc2VydHMgYSBtZXNzYWdlKS5cblx0ICpcblx0ICogQHBhcmFtIGV2ZW50IEV2ZW50IG9iamVjdCAob3B0aW9uYWwpLlxuXHQgKiBAcGFyYW0gb0RhdGEgUGFyYW1ldGVyc1xuXHQgKiBAcGFyYW0gb0RhdGEubWVzc2FnZSBUaGUgTFJDdXN0b21NZXNzYWdlIHRvIGJlIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIG1lc3NhZ2Ugb2JqZWN0XG5cdCAqIEBwYXJhbSBvRGF0YS50YWJsZSBUaGUgdGFibGUgdGFyZ2V0ZWQgYnkgdGhlIG1lc3NhZ2Vcblx0ICogQHBhcmFtIG9EYXRhLnNraXBNZXNzYWdlTWFuYWdlclVwZGF0ZSBTaG91bGQgc2tpcCB0byBpbnNlcnQgdGhlIG1lc3NhZ2UgaW4gdGhlIE1lc3NhZ2VNYW5hZ2VyXG5cdCAqIEBhbGlhcyBzYXAuZmUuY29yZS5oZWxwZXJzLkxSTWVzc2FnZVN0cmlwI2NyZWF0ZUN1c3RvbU1lc3NhZ2Vcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNyZWF0ZUN1c3RvbU1lc3NhZ2UoXG5cdFx0ZXZlbnQ6IEV2ZW50IHwgbnVsbCxcblx0XHRvRGF0YTogeyBtZXNzYWdlOiBMUkN1c3RvbU1lc3NhZ2UgfCB1bmRlZmluZWQ7IHRhYmxlOiBNRENUYWJsZTsgc2tpcE1lc3NhZ2VNYW5hZ2VyVXBkYXRlPzogYm9vbGVhbiB9XG5cdCkge1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSBvRGF0YS5tZXNzYWdlO1xuXHRcdGNvbnN0IHRhYmxlID0gb0RhdGEudGFibGU7XG5cdFx0Y29uc3Qgc2tpcE1lc3NhZ2VNYW5hZ2VyVXBkYXRlID0gb0RhdGEuc2tpcE1lc3NhZ2VNYW5hZ2VyVXBkYXRlO1xuXHRcdGNvbnN0IHJvd0JpbmRpbmdQYXRoID0gdGFibGUuZ2V0Um93QmluZGluZygpPy5nZXRQYXRoKCk7XG5cdFx0Y29uc3QgbWVzc2FnZU1hbmFnZXIgPSBDb3JlLmdldE1lc3NhZ2VNYW5hZ2VyKCk7XG5cdFx0Y29uc3QgY3VzdG9tTWVzc2FnZU1hcCA9IHRoaXMuY3VzdG9tTWVzc2FnZUluZm8ubXVsdGlNb2RlQ29udHJvbE1lc3NhZ2VzTWFwO1xuXHRcdGN1c3RvbU1lc3NhZ2VNYXBbdGFibGUuZ2V0SWQoKV0gPSBtZXNzYWdlO1xuXHRcdGlmICghcm93QmluZGluZ1BhdGgpIHtcblx0XHRcdHRhYmxlLmF0dGFjaEV2ZW50T25jZShcImJpbmRpbmdVcGRhdGVkXCIsIG9EYXRhLCB0aGlzLmNyZWF0ZUN1c3RvbU1lc3NhZ2UsIHRoaXMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChjdXN0b21NZXNzYWdlTWFwW3RhYmxlLmdldElkKCldPy5vbkNsb3NlKSB7XG5cdFx0XHR0YWJsZS5nZXREYXRhU3RhdGVJbmRpY2F0b3IoKS5kZXRhY2hFdmVudChcImNsb3NlXCIsIGN1c3RvbU1lc3NhZ2VNYXBbdGFibGUuZ2V0SWQoKV0/Lm9uQ2xvc2UgYXMgRnVuY3Rpb24sIHRoaXMpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHByb2Nlc3NvciA9IHRhYmxlLmdldE1vZGVsKCk7XG5cdFx0Y29uc3Qgb01lc3NhZ2UgPSBtZXNzYWdlXG5cdFx0XHQ/IG5ldyBNZXNzYWdlKHtcblx0XHRcdFx0XHRtZXNzYWdlOiBtZXNzYWdlLm1lc3NhZ2UsXG5cdFx0XHRcdFx0dHlwZTogbWVzc2FnZS50eXBlLFxuXHRcdFx0XHRcdHRhcmdldDogW3Jvd0JpbmRpbmdQYXRoXSxcblx0XHRcdFx0XHRwZXJzaXN0ZW50OiB0cnVlLFxuXHRcdFx0XHRcdHByb2Nlc3NvclxuXHRcdFx0ICB9KVxuXHRcdFx0OiBudWxsO1xuXG5cdFx0dGhpcy5jdXN0b21NZXNzYWdlSW5mby5tZXNzYWdlTWFuYWdlckRhdGFCaW5kaW5nLmRldGFjaENoYW5nZSh0aGlzLl9ldmVudEhhbmRsZXJDdXN0b21NZXNzYWdlLCB0aGlzKTtcblx0XHRpZiAoIXNraXBNZXNzYWdlTWFuYWdlclVwZGF0ZSkge1xuXHRcdFx0aWYgKHRoaXMuY3VzdG9tTWVzc2FnZUluZm8uY3VycmVudE1lc3NhZ2UpIHtcblx0XHRcdFx0bWVzc2FnZU1hbmFnZXIucmVtb3ZlTWVzc2FnZXMoW3RoaXMuY3VzdG9tTWVzc2FnZUluZm8uY3VycmVudE1lc3NhZ2VdKTtcblx0XHRcdH1cblx0XHRcdGlmIChvTWVzc2FnZSkge1xuXHRcdFx0XHR0aGlzLmN1c3RvbU1lc3NhZ2VJbmZvLmN1cnJlbnRNZXNzYWdlID0gb01lc3NhZ2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgdGhpcy5jdXN0b21NZXNzYWdlSW5mby5jdXJyZW50TWVzc2FnZTtcblx0XHRcdH1cblx0XHRcdGlmIChvTWVzc2FnZSAmJiB0aGlzLl9nZXRNZXNzYWdlc1dpdGhTYW1lVGFyZ2V0VGhhbkN1c3RvbU1lc3NhZ2UoKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0bWVzc2FnZU1hbmFnZXIuYWRkTWVzc2FnZXMoW29NZXNzYWdlXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuY3VzdG9tTWVzc2FnZUluZm8ubWVzc2FnZU1hbmFnZXJEYXRhQmluZGluZy5hdHRhY2hDaGFuZ2UodGhpcy5fZXZlbnRIYW5kbGVyQ3VzdG9tTWVzc2FnZSwgdGhpcyk7XG5cblx0XHR0aGlzLmF0dGFjaERhdGFTdGF0ZUluZGljYXRvckNsb3NlRXZlbnQodGFibGUsIGN1c3RvbU1lc3NhZ2VNYXAsIG1lc3NhZ2U/Lm9uQ2xvc2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgZnVuY3Rpb24gYXR0YWNoZXMgdGhlIG9uQ2xvc2UgZXZlbnQgZnVuY3Rpb24gdG8gdGhlIGRhdGFTdGF0ZUluZGljYXRvci5cblx0ICpcblx0ICogQHBhcmFtIHRhYmxlIFRoZSB0YWJsZSBhc3NvY2lhdGVkIHdpdGggdGhlIGRhdGFTdGF0ZUluZGljYXRvclxuXHQgKiBAcGFyYW0gY3VzdG9tTWVzc2FnZU1hcCBUaGUgQ3VzdG9tTWVzc2FnZU1hcCBvYmplY3Rcblx0ICogQHBhcmFtIGZuT25DbG9zZSBBIGZ1bmN0aW9uIHRvIGJlIGF0dGFjaGVkIHRvIHRoZSBcImNsb3NlXCIgZXZlbnRcblx0ICogQGFsaWFzIHNhcC5mZS5jb3JlLmhlbHBlcnMuTFJNZXNzYWdlU3RyaXAjYXR0YWNoRGF0YVN0YXRlSW5kaWNhdG9yQ2xvc2VFdmVudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0YXR0YWNoRGF0YVN0YXRlSW5kaWNhdG9yQ2xvc2VFdmVudChcblx0XHR0YWJsZTogTURDVGFibGUsXG5cdFx0Y3VzdG9tTWVzc2FnZU1hcDogeyBba2V5OiBzdHJpbmddOiBMUkN1c3RvbU1lc3NhZ2UgfCB1bmRlZmluZWQgfSxcblx0XHRmbk9uQ2xvc2U/OiBGdW5jdGlvblxuXHQpIHtcblx0XHRpZiAoZm5PbkNsb3NlKSB7XG5cdFx0XHR0YWJsZS5nZXREYXRhU3RhdGVJbmRpY2F0b3IoKS5hdHRhY2hFdmVudE9uY2UoXCJjbG9zZVwiLCBmbk9uQ2xvc2UsIHRoaXMpO1xuXHRcdH1cblx0XHQvL1doZW4gY2xvc2luZyB0aGUgdGhlIG1lc3NhZ2VTdHJpcCwgdGhlIGFzc29jaWF0ZWQgbWVzc2FnZSBpcyByZW1vdmVkXG5cdFx0dGFibGUuZ2V0RGF0YVN0YXRlSW5kaWNhdG9yKCkuYXR0YWNoRXZlbnRPbmNlKFwiY2xvc2VcIiwgKCkgPT4ge1xuXHRcdFx0ZGVsZXRlIGN1c3RvbU1lc3NhZ2VNYXBbdGFibGUuZ2V0SWQoKV07XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogTXVsdGlwbGVNb2RlQ29udHJvbCBFdmVudCBoYW5kbGVyIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIHRoZSBjb3JyZWN0IGN1c3RvbSBtZXNzYWdlIHdoZW4gYSBzcGVjaWZpYyB0YWIgaXMgc2VsZWN0ZWQuXG5cdCAqXG5cdCAqIEBhbGlhcyBzYXAuZmUuY29yZS5oZWxwZXJzLkxSTWVzc2FnZVN0cmlwI29uU2VsZWN0TXVsdGlwbGVNb2RlQ29udHJvbFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHRvblNlbGVjdE11bHRpcGxlTW9kZUNvbnRyb2woZXZlbnQ6IEV2ZW50LCBjb250cm9sbGVyOiBMaXN0UmVwb3J0Q29udHJvbGxlcikge1xuXHRcdGNvbnN0IHRhYmxlID0gY29udHJvbGxlci5fZ2V0VGFibGUoKSBhcyBNRENUYWJsZTtcblx0XHRjb25zdCBtZXNzYWdlID0gdGhpcy5jdXN0b21NZXNzYWdlSW5mby5tdWx0aU1vZGVDb250cm9sTWVzc2FnZXNNYXBbdGFibGUuZ2V0SWQoKV07XG5cdFx0dGhpcy5jcmVhdGVDdXN0b21NZXNzYWdlKG51bGwsIHsgbWVzc2FnZSwgdGFibGUgfSk7XG5cdH1cblxuXHQvKipcblx0ICogUHJvdmlkZSBhbiBvcHRpb24gZm9yIHNob3dpbmcgYSBjdXN0b20gbWVzc2FnZSBpbiB0aGUgbWVzc2FnZSBiYXIgYWJvdmUgdGhlIGxpc3QgcmVwb3J0IHRhYmxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge29iamVjdH0gW21lc3NhZ2VdIEN1c3RvbSBtZXNzYWdlIGFsb25nIHdpdGggdGhlIG1lc3NhZ2UgdHlwZSB0byBiZSBzZXQgb24gdGhlIHRhYmxlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW21lc3NhZ2UubWVzc2FnZV0gTWVzc2FnZSBzdHJpbmcgdG8gYmUgZGlzcGxheWVkLlxuXHQgKiBAcGFyYW0ge3NhcC51aS5jb3JlLk1lc3NhZ2VUeXBlfSBbbWVzc2FnZS50eXBlXSBJbmRpY2F0ZXMgdGhlIHR5cGUgb2YgbWVzc2FnZS5cblx0ICogQHBhcmFtIHtMaXN0UmVwb3J0Q29udHJvbGxlcn0gW2NvbnRyb2xsZXJdIENvbnRyb2xsZXIgb2YgdGhlIGN1cnJlbnQgdmlldy5cblx0ICogQHBhcmFtIHtzdHJpbmdbXXxzdHJpbmd9IFt0YWJLZXldIFRoZSBlbnRpdHlTZXQgaWRlbnRpZnlpbmcgdGhlIHRhYmxlIGluIHdoaWNoIHRvIGRpc3BsYXkgdGhlIGN1c3RvbSBtZXNzYWdlLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25DbG9zZV0gQSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgbWVzc2FnZSBiYXIuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRzaG93Q3VzdG9tTWVzc2FnZShcblx0XHRtZXNzYWdlOiBMUkN1c3RvbU1lc3NhZ2UgfCB1bmRlZmluZWQsXG5cdFx0Y29udHJvbGxlcjogTGlzdFJlcG9ydENvbnRyb2xsZXIsXG5cdFx0dGFiS2V5Pzogc3RyaW5nW10gfCBzdHJpbmcgfCBudWxsLFxuXHRcdG9uQ2xvc2U/OiBGdW5jdGlvblxuXHQpIHtcblx0XHRjb25zdCBfdGFiS2V5ID0gQXJyYXkuaXNBcnJheSh0YWJLZXkpID8gdGFiS2V5IDogW3RhYktleV07XG5cdFx0Y29uc3QgaXNNdWx0aU1vZGUgPSBjb250cm9sbGVyLl9pc011bHRpTW9kZSgpO1xuXHRcdGxldCB0YWJsZTogTURDVGFibGU7XG5cdFx0aWYgKG1lc3NhZ2UpIHtcblx0XHRcdG1lc3NhZ2Uub25DbG9zZSA9IG9uQ2xvc2U7XG5cdFx0fVxuXHRcdGlmIChpc011bHRpTW9kZSkge1xuXHRcdFx0Y29uc3QgbXVsdGlwbGVNb2RlQ29udHJvbCA9IGNvbnRyb2xsZXIuX2dldE11bHRpTW9kZUNvbnRyb2woKTtcblx0XHRcdC8vd2UgZmlzcnQgbmVlZCB0byBkZXRhY2ggdGhlIHNlbGVjdCBldmVudCB0byBwcmV2ZW50IG11bHRpcGxlIGF0dGFjaG1lbnRzLlxuXHRcdFx0bXVsdGlwbGVNb2RlQ29udHJvbC5kZXRhY2hFdmVudChcInNlbGVjdFwiLCB0aGlzLm9uU2VsZWN0TXVsdGlwbGVNb2RlQ29udHJvbCwgdGhpcyk7XG5cdFx0XHRtdWx0aXBsZU1vZGVDb250cm9sLmF0dGFjaEV2ZW50KFwic2VsZWN0XCIsIGNvbnRyb2xsZXIsIHRoaXMub25TZWxlY3RNdWx0aXBsZU1vZGVDb250cm9sLCB0aGlzKTtcblxuXHRcdFx0bXVsdGlwbGVNb2RlQ29udHJvbC5nZXRBbGxJbm5lckNvbnRyb2xzKHRydWUpLmZvckVhY2goKGlubmVyQ29udHJvbDogSW5uZXJDb250cm9sVHlwZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0XHRpZiAoaW5uZXJDb250cm9sLmlzQShcInNhcC5mZS5tYWNyb3MudGFibGUuVGFibGVBUElcIikpIHtcblx0XHRcdFx0XHRpZiAoIXRhYktleSB8fCBfdGFiS2V5LmluZGV4T2YoaW5kZXgudG9TdHJpbmcoKSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHR0YWJsZSA9IChpbm5lckNvbnRyb2wgYXMgYW55KS5nZXRDb250ZW50KCk7XG5cdFx0XHRcdFx0XHR0aGlzLmNyZWF0ZUN1c3RvbU1lc3NhZ2UobnVsbCwge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlLFxuXHRcdFx0XHRcdFx0XHR0YWJsZSxcblx0XHRcdFx0XHRcdFx0c2tpcE1lc3NhZ2VNYW5hZ2VyVXBkYXRlOiBtdWx0aXBsZU1vZGVDb250cm9sLmdldFNlbGVjdGVkSW5uZXJDb250cm9sKCkgIT09IGlubmVyQ29udHJvbFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0YWJsZSA9IGNvbnRyb2xsZXIuX2dldFRhYmxlKCkgYXMgTURDVGFibGU7XG5cdFx0dGhpcy5jcmVhdGVDdXN0b21NZXNzYWdlKG51bGwsIHsgbWVzc2FnZSwgdGFibGUgfSk7XG5cdH1cbn1cbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUE7QUFBQTs7Ozs7TUFlYUEsY0FBYztJQU8xQiwwQkFBYztNQUNiLE1BQU1DLGNBQWMsR0FBR0MsSUFBSSxDQUFDQyxpQkFBaUIsRUFBRTtNQUMvQyxJQUFJLENBQUNDLGlCQUFpQixHQUFHO1FBQ3hCQyx5QkFBeUIsRUFBRUosY0FBYyxDQUFDSyxlQUFlLEVBQUUsQ0FBQ0MsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUN6RUMsMkJBQTJCLEVBQUUsQ0FBQztNQUMvQixDQUFDO0lBQ0Y7SUFBQztJQUFBO0lBQUEsT0FFREMsb0JBQW9CLEdBQXBCLGdDQUF1QjtNQUN0QixPQUFPLElBQUksQ0FBQ0wsaUJBQWlCO0lBQzlCLENBQUM7SUFBQSxPQUVETSxPQUFPLEdBQVAsbUJBQVU7TUFDVCxJQUFJLENBQUNOLGlCQUFpQixDQUFDQyx5QkFBeUIsQ0FBQ00sWUFBWSxDQUFDLElBQUksQ0FBQ0MsMEJBQTBCLEVBQUUsSUFBSSxDQUFDO0lBQ3JHLENBQUM7SUFBQSxPQUVEQywyQ0FBMkMsR0FBM0MsdURBQThDO01BQzdDLE1BQU1aLGNBQWMsR0FBR0MsSUFBSSxDQUFDQyxpQkFBaUIsRUFBRTtNQUMvQyxPQUFPRixjQUFjLENBQ25CSyxlQUFlLEVBQUUsQ0FDakJRLE9BQU8sRUFBRSxDQUNUQyxNQUFN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