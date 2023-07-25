/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingToolkit"], function (BindingToolkit) {
  "use strict";

  var _exports = {};
  var getExpressionFromAnnotation = BindingToolkit.getExpressionFromAnnotation;
  var compileExpression = BindingToolkit.compileExpression;
  var AvatarShape;
  (function (AvatarShape) {
    AvatarShape["Circle"] = "Circle";
    AvatarShape["Square"] = "Square";
  })(AvatarShape || (AvatarShape = {}));
  const isNaturalPerson = converterContext => {
    var _converterContext$get, _converterContext$get2;
    return ((_converterContext$get = converterContext.getEntityType().annotations.Common) === null || _converterContext$get === void 0 ? void 0 : (_converterContext$get2 = _converterContext$get.IsNaturalPerson) === null || _converterContext$get2 === void 0 ? void 0 : _converterContext$get2.valueOf()) === true;
  };
  const getFallBackIcon = converterContext => {
    var _converterContext$get3, _converterContext$get4;
    const headerInfo = (_converterContext$get3 = converterContext.getEntityType().annotations) === null || _converterContext$get3 === void 0 ? void 0 : (_converterContext$get4 = _converterContext$get3.UI) === null || _converterContext$get4 === void 0 ? void 0 : _converterContext$get4.HeaderInfo;
    if (!headerInfo || headerInfo && !headerInfo.ImageUrl && !headerInfo.TypeImageUrl) {
      return undefined;
    }
    if (headerInfo.ImageUrl && headerInfo.TypeImageUrl) {
      return compileExpression(getExpressionFromAnnotation(headerInfo.TypeImageUrl));
    }
    return compileExpression(isNaturalPerson(converterContext) ? "sap-icon://person-placeholder" : "sap-icon://product");
  };
  const getSource = converterContext => {
    var _converterContext$get5, _converterContext$get6;
    const headerInfo = (_converterContext$get5 = converterContext.getEntityType().annotations) === null || _converterContext$get5 === void 0 ? void 0 : (_converterContext$get6 = _converterContext$get5.UI) === null || _converterContext$get6 === void 0 ? void 0 : _converterContext$get6.HeaderInfo;
    if (!headerInfo || !(headerInfo.ImageUrl || headerInfo.TypeImageUrl)) {
      return undefined;
    }
    return compileExpression(getExpressionFromAnnotation(headerInfo.ImageUrl || headerInfo.TypeImageUrl));
  };
  const getAvatar = converterContext => {
    var _converterContext$get7, _converterContext$get8;
    const headerInfo = (_converterContext$get7 = converterContext.getEntityType().annotations) === null || _converterContext$get7 === void 0 ? void 0 : (_converterContext$get8 = _converterContext$get7.UI) === null || _converterContext$get8 === void 0 ? void 0 : _converterContext$get8.HeaderInfo;
    const oSource = headerInfo && (headerInfo.ImageUrl || headerInfo.TypeImageUrl || headerInfo.Initials);
    if (!oSource) {
      return undefined;
    }
    return {
      src: getSource(converterContext),
      initials: compileExpression(getExpressionFromAnnotation((headerInfo === null || headerInfo === void 0 ? void 0 : headerInfo.Initials) || "")),
      fallbackIcon: getFallBackIcon(converterContext),
      displayShape: compileExpression(isNaturalPerson(converterContext) ? AvatarShape.Circle : AvatarShape.Square)
    };
  };
  _exports.getAvatar = getAvatar;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBdmF0YXJTaGFwZSIsImlzTmF0dXJhbFBlcnNvbiIsImNvbnZlcnRlckNvbnRleHQiLCJnZXRFbnRpdHlUeXBlIiwiYW5ub3RhdGlvbnMiLCJDb21tb24iLCJJc05hdHVyYWxQZXJzb24iLCJ2YWx1ZU9mIiwiZ2V0RmFsbEJhY2tJY29uIiwiaGVhZGVySW5mbyIsIlVJIiwiSGVhZGVySW5mbyIsIkltYWdlVXJsIiwiVHlwZUltYWdlVXJsIiwidW5kZWZpbmVkIiwiY29tcGlsZUV4cHJlc3Npb24iLCJnZXRFeHByZXNzaW9uRnJvbUFubm90YXRpb24iLCJnZXRTb3VyY2UiLCJnZXRBdmF0YXIiLCJvU291cmNlIiwiSW5pdGlhbHMiLCJzcmMiLCJpbml0aWFscyIsImZhbGxiYWNrSWNvbiIsImRpc3BsYXlTaGFwZSIsIkNpcmNsZSIsIlNxdWFyZSJdLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXMiOlsiQXZhdGFyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ29tcGlsZWRCaW5kaW5nVG9vbGtpdEV4cHJlc3Npb24gfSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nVG9vbGtpdFwiO1xuaW1wb3J0IHsgY29tcGlsZUV4cHJlc3Npb24sIGdldEV4cHJlc3Npb25Gcm9tQW5ub3RhdGlvbiB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdUb29sa2l0XCI7XG5pbXBvcnQgdHlwZSBDb252ZXJ0ZXJDb250ZXh0IGZyb20gXCIuLi8uLi9Db252ZXJ0ZXJDb250ZXh0XCI7XG5lbnVtIEF2YXRhclNoYXBlIHtcblx0Q2lyY2xlID0gXCJDaXJjbGVcIixcblx0U3F1YXJlID0gXCJTcXVhcmVcIlxufVxuXG5leHBvcnQgdHlwZSBBdmF0YXIgPSB7XG5cdHNyYz86IENvbXBpbGVkQmluZGluZ1Rvb2xraXRFeHByZXNzaW9uO1xuXHRpbml0aWFsczogQ29tcGlsZWRCaW5kaW5nVG9vbGtpdEV4cHJlc3Npb247XG5cdGZhbGxiYWNrSWNvbj86IENvbXBpbGVkQmluZGluZ1Rvb2xraXRFeHByZXNzaW9uO1xuXHRkaXNwbGF5U2hhcGU6IENvbXBpbGVkQmluZGluZ1Rvb2xraXRFeHByZXNzaW9uO1xufTtcblxuY29uc3QgaXNOYXR1cmFsUGVyc29uID0gKGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBCb29sZWFuID0+IHtcblx0cmV0dXJuIGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpLmFubm90YXRpb25zLkNvbW1vbj8uSXNOYXR1cmFsUGVyc29uPy52YWx1ZU9mKCkgPT09IHRydWU7XG59O1xuXG5jb25zdCBnZXRGYWxsQmFja0ljb24gPSAoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IENvbXBpbGVkQmluZGluZ1Rvb2xraXRFeHByZXNzaW9uIHwgdW5kZWZpbmVkID0+IHtcblx0Y29uc3QgaGVhZGVySW5mbyA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpLmFubm90YXRpb25zPy5VST8uSGVhZGVySW5mbztcblx0aWYgKCFoZWFkZXJJbmZvIHx8IChoZWFkZXJJbmZvICYmICFoZWFkZXJJbmZvLkltYWdlVXJsICYmICFoZWFkZXJJbmZvLlR5cGVJbWFnZVVybCkpIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cdGlmIChoZWFkZXJJbmZvLkltYWdlVXJsICYmIGhlYWRlckluZm8uVHlwZUltYWdlVXJsKSB7XG5cdFx0cmV0dXJuIGNvbXBpbGVFeHByZXNzaW9uKGdldEV4cHJlc3Npb25Gcm9tQW5ub3RhdGlvbihoZWFkZXJJbmZvLlR5cGVJbWFnZVVybCkpO1xuXHR9XG5cdHJldHVybiBjb21waWxlRXhwcmVzc2lvbihpc05hdHVyYWxQZXJzb24oY29udmVydGVyQ29udGV4dCkgPyBcInNhcC1pY29uOi8vcGVyc29uLXBsYWNlaG9sZGVyXCIgOiBcInNhcC1pY29uOi8vcHJvZHVjdFwiKTtcbn07XG5cbmNvbnN0IGdldFNvdXJjZSA9IChjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogQ29tcGlsZWRCaW5kaW5nVG9vbGtpdEV4cHJlc3Npb24gfCB1bmRlZmluZWQgPT4ge1xuXHRjb25zdCBoZWFkZXJJbmZvID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCkuYW5ub3RhdGlvbnM/LlVJPy5IZWFkZXJJbmZvO1xuXHRpZiAoIWhlYWRlckluZm8gfHwgIShoZWFkZXJJbmZvLkltYWdlVXJsIHx8IGhlYWRlckluZm8uVHlwZUltYWdlVXJsKSkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblx0cmV0dXJuIGNvbXBpbGVFeHByZXNzaW9uKGdldEV4cHJlc3Npb25Gcm9tQW5ub3RhdGlvbihoZWFkZXJJbmZvLkltYWdlVXJsIHx8IGhlYWRlckluZm8uVHlwZUltYWdlVXJsKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QXZhdGFyID0gKGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBBdmF0YXIgfCB1bmRlZmluZWQgPT4ge1xuXHRjb25zdCBoZWFkZXJJbmZvID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCkuYW5ub3RhdGlvbnM/LlVJPy5IZWFkZXJJbmZvO1xuXHRjb25zdCBvU291cmNlID0gaGVhZGVySW5mbyAmJiAoaGVhZGVySW5mby5JbWFnZVVybCB8fCBoZWFkZXJJbmZvLlR5cGVJbWFnZVVybCB8fCBoZWFkZXJJbmZvLkluaXRpYWxzKTtcblx0aWYgKCFvU291cmNlKSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHNyYzogZ2V0U291cmNlKGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdGluaXRpYWxzOiBjb21waWxlRXhwcmVzc2lvbihnZXRFeHByZXNzaW9uRnJvbUFubm90YXRpb24oaGVhZGVySW5mbz8uSW5pdGlhbHMgfHwgXCJcIikpLFxuXHRcdGZhbGxiYWNrSWNvbjogZ2V0RmFsbEJhY2tJY29uKGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdGRpc3BsYXlTaGFwZTogY29tcGlsZUV4cHJlc3Npb24oaXNOYXR1cmFsUGVyc29uKGNvbnZlcnRlckNvbnRleHQpID8gQXZhdGFyU2hhcGUuQ2lyY2xlIDogQXZhdGFyU2hhcGUuU3F1YXJlKVxuXHR9O1xufTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUE7QUFBQTs7Ozs7OztNQUdLQSxXQUFXO0VBQUEsV0FBWEEsV0FBVztJQUFYQSxXQUFXO0lBQVhBLFdBQVc7RUFBQSxHQUFYQSxXQUFXLEtBQVhBLFdBQVc7RUFZaEIsTUFBTUMsZUFBZSxHQUFJQyxnQkFBa0MsSUFBYztJQUFBO0lBQ3hFLE9BQU8sMEJBQUFBLGdCQUFnQixDQUFDQyxhQUFhLEVBQUUsQ0FBQ0MsV0FBVyxDQUFDQyxNQUFNLG9GQUFuRCxzQkFBcURDLGVBQWUsMkRBQXBFLHVCQUFzRUMsT0FBTyxFQUFFLE1BQUssSUFBSTtFQUNoRyxDQUFDO0VBRUQsTUFBTUMsZUFBZSxHQUFJTixnQkFBa0MsSUFBbUQ7SUFBQTtJQUM3RyxNQUFNTyxVQUFVLDZCQUFHUCxnQkFBZ0IsQ0FBQ0MsYUFBYSxFQUFFLENBQUNDLFdBQVcscUZBQTVDLHVCQUE4Q00sRUFBRSwyREFBaEQsdUJBQWtEQyxVQUFVO0lBQy9FLElBQUksQ0FBQ0YsVUFBVSxJQUFLQSxVQUFVLElBQUksQ0FBQ0EsVUFBVSxDQUFDRyxRQUFRLElBQUksQ0FBQ0gsVUFBVSxDQUFDSSxZQUFhLEVBQUU7TUFDcEYsT0FBT0MsU0FBUztJQUNqQjtJQUNBLElBQUlMLFVBQVUsQ0FBQ0csUUFBUSxJQUFJSCxVQUFVLENBQUNJLFlBQVksRUFBRTtNQUNuRCxPQUFPRSxpQkFBaUIsQ0FBQ0MsMkJBQTJCLENBQUNQLFVBQVUsQ0FBQ0ksWUFBWSxDQUFDLENBQUM7SUFDL0U7SUFDQSxPQUFPRSxpQkFBaUIsQ0FBQ2QsZUFBZSxDQUFDQyxnQkFBZ0IsQ0FBQyxHQUFHLCtCQUErQixHQUFHLG9CQUFvQixDQUFDO0VBQ3JILENBQUM7RUFFRCxNQUFNZSxTQUFTLEdBQUlmLGdCQUFrQyxJQUFtRDtJQUFBO0lBQ3ZHLE1BQU1PLFVBQVUsNkJBQUdQLGdCQUFnQixDQUFDQyxhQUFhLEVBQUUsQ0FBQ0MsV0FBVyxxRkFBNUMsdUJBQThDTSxFQUFFLDJEQUFoRCx1QkFBa0RDLFVBQVU7SUFDL0UsSUFBSSxDQUFDRixVQUFVLElBQUksRUFBRUEsVUFBVSxDQUFDRyxRQUFRLElBQUlILFVBQVUsQ0FBQ0ksWUFBWSxDQUFDLEVBQUU7TUFDckUsT0FBT0MsU0FBUztJQUNqQjtJQUNBLE9BQU9DLGlCQUFpQixDQUFDQywyQkFBMkIsQ0FBQ1AsVUFBVSxDQUFDRyxRQUFRLElBQUlILFVBQVUsQ0FBQ0ksWUFBWSxDQUFDLENBQUM7RUFDdEcsQ0FBQztFQUVNLE1BQU1LLFNBQVMsR0FBSWhCLGdCQUFrQyxJQUF5QjtJQUFBO0lBQ3BGLE1BQU1PLFVBQVUsNkJBQUdQLGdCQUFnQixDQUFDQyxhQUFhLEVBQUUsQ0FBQ0MsV0FBVyxxRkFBNUMsdUJBQThDTSxFQUFFLDJEQUFoRCx1QkFBa0RDLFVBQVU7SUFDL0UsTUFBTVEsT0FBTyxHQUFHVixVQUFVLEtBQUtBLFVBQVUsQ0FBQ0csUUFBUSxJQUFJSCxVQUFVLENBQUNJLFlBQVksSUFBSUosVUFBVSxDQUFDVyxRQUFRLENBQUM7SUFDckcsSUFBSSxDQUFDRCxPQUFPLEVBQUU7TUFDYixPQUFPTCxTQUFTO0lBQ2pCO0lBQ0EsT0FBTztNQUNOTyxHQUFHLEVBQUVKLFNBQVMsQ0FBQ2YsZ0JBQWdCLENBQUM7TUFDaENvQixRQUFRLEVBQUVQLGlCQUFpQixDQUFDQywyQkFBMkIsQ0FBQyxDQUFBUCxVQUFVLGFBQVZBLFVBQVUsdUJBQVZBLFVBQVUsQ0FBRVcsUUFBUSxLQUFJLEVBQUUsQ0FBQyxDQUFDO01BQ3BGRyxZQUFZLEVBQUVmLGVBQWUsQ0FBQ04sZ0JBQWdCLENBQUM7TUFDL0NzQixZQUFZLEVBQUVULGlCQUFpQixDQUFDZCxlQUFlLENBQUNDLGdCQUFnQixDQUFDLEdBQUdGLFdBQVcsQ0FBQ3lCLE1BQU0sR0FBR3pCLFdBQVcsQ0FBQzBCLE1BQU07SUFDNUcsQ0FBQztFQUNGLENBQUM7RUFBQztFQUFBO0FBQUEifQ==