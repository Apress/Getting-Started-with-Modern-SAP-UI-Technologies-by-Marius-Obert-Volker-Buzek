/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/MetaModelConverter", "sap/fe/core/templating/DataModelPathHelper", "./PropertyHelper", "./UIFormatters"], function (MetaModelConverter, DataModelPathHelper, PropertyHelper, UIFormatters) {
  "use strict";

  var _exports = {};
  var getConverterContext = UIFormatters.getConverterContext;
  var getTargetObjectPath = DataModelPathHelper.getTargetObjectPath;
  var enhanceDataModelPath = DataModelPathHelper.enhanceDataModelPath;
  var getInvolvedDataModelObjects = MetaModelConverter.getInvolvedDataModelObjects;
  const getProperty = function (oContext, oInterface) {
    const sPath = oInterface.context.getPath();
    if (!oContext) {
      throw new Error(`Unresolved context path ${sPath}`);
    }
    let isPath = false;
    if (typeof oContext === "object" && oContext.hasOwnProperty("$Path")) {
      isPath = true;
    } else if (typeof oContext === "object" && oContext.hasOwnProperty("$kind") && oContext.$kind !== "Property") {
      throw new Error(`Context does not resolve to a Property object but to a ${oContext.$kind}`);
    }
    let oConverterContext = getConverterContext(oContext, oInterface);
    if (isPath) {
      oConverterContext = oConverterContext.$target;
    }
    return oConverterContext;
  };
  _exports.getProperty = getProperty;
  const getPropertyObjectPath = function (oContext, oInterface) {
    const sPath = oInterface.context.getPath();
    if (!oContext) {
      throw new Error(`Unresolved context path ${sPath}`);
    }
    if (typeof oContext === "object" && oContext.hasOwnProperty("$kind") && oContext.$kind !== "Property") {
      throw new Error(`Context does not resolve to a Property object but to a ${oContext.$kind}`);
    }
    let involvedDataModelObjects = getInvolvedDataModelObjects(oInterface.context);
    if (involvedDataModelObjects.targetObject && involvedDataModelObjects.targetObject.type === "Path") {
      involvedDataModelObjects = enhanceDataModelPath(involvedDataModelObjects, involvedDataModelObjects.targetObject.path);
    }
    return involvedDataModelObjects;
  };
  _exports.getPropertyObjectPath = getPropertyObjectPath;
  const isKey = function (oContext, oInterface) {
    const oProperty = getProperty(oContext, oInterface);
    return PropertyHelper.isKey(oProperty);
  };
  _exports.isKey = isKey;
  const hasValueHelp = function (oContext, oInterface) {
    const oProperty = getProperty(oContext, oInterface);
    return PropertyHelper.hasValueHelp(oProperty);
  };
  _exports.hasValueHelp = hasValueHelp;
  const hasDateType = function (oContext, oInterface) {
    const oProperty = getProperty(oContext, oInterface);
    return PropertyHelper.hasDateType(oProperty);
  };
  _exports.hasDateType = hasDateType;
  const hasValueHelpWithFixedValues = function (oContext, oInterface) {
    const oProperty = getProperty(oContext, oInterface);
    return PropertyHelper.hasValueHelpWithFixedValues(oProperty);
  };
  _exports.hasValueHelpWithFixedValues = hasValueHelpWithFixedValues;
  const getName = function (oContext, oInterface) {
    const oProperty = getProperty(oContext, oInterface);
    return oProperty.name;
  };
  _exports.getName = getName;
  const getLabel = function (oContext, oInterface) {
    const oProperty = getProperty(oContext, oInterface);
    return PropertyHelper.getLabel(oProperty);
  };
  _exports.getLabel = getLabel;
  const getPropertyPath = function (oContext, oInterface) {
    const propertyPath = getPropertyObjectPath(oContext, oInterface);
    return getTargetObjectPath(propertyPath);
  };
  _exports.getPropertyPath = getPropertyPath;
  const getRelativePropertyPath = function (oContext, oInterface) {
    const propertyPath = getPropertyObjectPath(oContext, oInterface);
    return getTargetObjectPath(propertyPath, true);
  };
  _exports.getRelativePropertyPath = getRelativePropertyPath;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRQcm9wZXJ0eSIsIm9Db250ZXh0Iiwib0ludGVyZmFjZSIsInNQYXRoIiwiY29udGV4dCIsImdldFBhdGgiLCJFcnJvciIsImlzUGF0aCIsImhhc093blByb3BlcnR5IiwiJGtpbmQiLCJvQ29udmVydGVyQ29udGV4dCIsImdldENvbnZlcnRlckNvbnRleHQiLCIkdGFyZ2V0IiwiZ2V0UHJvcGVydHlPYmplY3RQYXRoIiwiaW52b2x2ZWREYXRhTW9kZWxPYmplY3RzIiwiZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzIiwidGFyZ2V0T2JqZWN0IiwidHlwZSIsImVuaGFuY2VEYXRhTW9kZWxQYXRoIiwicGF0aCIsImlzS2V5Iiwib1Byb3BlcnR5IiwiUHJvcGVydHlIZWxwZXIiLCJoYXNWYWx1ZUhlbHAiLCJoYXNEYXRlVHlwZSIsImhhc1ZhbHVlSGVscFdpdGhGaXhlZFZhbHVlcyIsImdldE5hbWUiLCJuYW1lIiwiZ2V0TGFiZWwiLCJnZXRQcm9wZXJ0eVBhdGgiLCJwcm9wZXJ0eVBhdGgiLCJnZXRUYXJnZXRPYmplY3RQYXRoIiwiZ2V0UmVsYXRpdmVQcm9wZXJ0eVBhdGgiXSwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzIjpbIlByb3BlcnR5Rm9ybWF0dGVycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFByb3BlcnR5IH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdHMgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9NZXRhTW9kZWxDb252ZXJ0ZXJcIjtcbmltcG9ydCB0eXBlIHsgRGF0YU1vZGVsT2JqZWN0UGF0aCB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0RhdGFNb2RlbFBhdGhIZWxwZXJcIjtcbmltcG9ydCB7IGVuaGFuY2VEYXRhTW9kZWxQYXRoLCBnZXRUYXJnZXRPYmplY3RQYXRoIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRGF0YU1vZGVsUGF0aEhlbHBlclwiO1xuaW1wb3J0ICogYXMgUHJvcGVydHlIZWxwZXIgZnJvbSBcIi4vUHJvcGVydHlIZWxwZXJcIjtcbmltcG9ydCB0eXBlIHsgQ29tcHV0ZWRBbm5vdGF0aW9uSW50ZXJmYWNlLCBNZXRhTW9kZWxDb250ZXh0IH0gZnJvbSBcIi4vVUlGb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBnZXRDb252ZXJ0ZXJDb250ZXh0IH0gZnJvbSBcIi4vVUlGb3JtYXR0ZXJzXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvQ29udGV4dDogTWV0YU1vZGVsQ29udGV4dCwgb0ludGVyZmFjZTogQ29tcHV0ZWRBbm5vdGF0aW9uSW50ZXJmYWNlKTogUHJvcGVydHkge1xuXHRjb25zdCBzUGF0aCA9IG9JbnRlcmZhY2UuY29udGV4dC5nZXRQYXRoKCk7XG5cdGlmICghb0NvbnRleHQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFVucmVzb2x2ZWQgY29udGV4dCBwYXRoICR7c1BhdGh9YCk7XG5cdH1cblx0bGV0IGlzUGF0aCA9IGZhbHNlO1xuXHRpZiAodHlwZW9mIG9Db250ZXh0ID09PSBcIm9iamVjdFwiICYmIG9Db250ZXh0Lmhhc093blByb3BlcnR5KFwiJFBhdGhcIikpIHtcblx0XHRpc1BhdGggPSB0cnVlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvQ29udGV4dCA9PT0gXCJvYmplY3RcIiAmJiBvQ29udGV4dC5oYXNPd25Qcm9wZXJ0eShcIiRraW5kXCIpICYmIG9Db250ZXh0LiRraW5kICE9PSBcIlByb3BlcnR5XCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYENvbnRleHQgZG9lcyBub3QgcmVzb2x2ZSB0byBhIFByb3BlcnR5IG9iamVjdCBidXQgdG8gYSAke29Db250ZXh0LiRraW5kfWApO1xuXHR9XG5cdGxldCBvQ29udmVydGVyQ29udGV4dCA9IGdldENvbnZlcnRlckNvbnRleHQob0NvbnRleHQsIG9JbnRlcmZhY2UpIGFzIFByb3BlcnR5O1xuXHRpZiAoaXNQYXRoKSB7XG5cdFx0b0NvbnZlcnRlckNvbnRleHQgPSAob0NvbnZlcnRlckNvbnRleHQgYXMgYW55KS4kdGFyZ2V0O1xuXHR9XG5cdHJldHVybiBvQ29udmVydGVyQ29udGV4dDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9wZXJ0eU9iamVjdFBhdGggPSBmdW5jdGlvbiAoXG5cdG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0IHwgc3RyaW5nLFxuXHRvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2Vcbik6IERhdGFNb2RlbE9iamVjdFBhdGgge1xuXHRjb25zdCBzUGF0aCA9IG9JbnRlcmZhY2UuY29udGV4dC5nZXRQYXRoKCk7XG5cdGlmICghb0NvbnRleHQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFVucmVzb2x2ZWQgY29udGV4dCBwYXRoICR7c1BhdGh9YCk7XG5cdH1cblx0aWYgKHR5cGVvZiBvQ29udGV4dCA9PT0gXCJvYmplY3RcIiAmJiBvQ29udGV4dC5oYXNPd25Qcm9wZXJ0eShcIiRraW5kXCIpICYmIG9Db250ZXh0LiRraW5kICE9PSBcIlByb3BlcnR5XCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYENvbnRleHQgZG9lcyBub3QgcmVzb2x2ZSB0byBhIFByb3BlcnR5IG9iamVjdCBidXQgdG8gYSAke29Db250ZXh0LiRraW5kfWApO1xuXHR9XG5cdGxldCBpbnZvbHZlZERhdGFNb2RlbE9iamVjdHMgPSBnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdHMob0ludGVyZmFjZS5jb250ZXh0KTtcblx0aWYgKGludm9sdmVkRGF0YU1vZGVsT2JqZWN0cy50YXJnZXRPYmplY3QgJiYgaW52b2x2ZWREYXRhTW9kZWxPYmplY3RzLnRhcmdldE9iamVjdC50eXBlID09PSBcIlBhdGhcIikge1xuXHRcdGludm9sdmVkRGF0YU1vZGVsT2JqZWN0cyA9IGVuaGFuY2VEYXRhTW9kZWxQYXRoKGludm9sdmVkRGF0YU1vZGVsT2JqZWN0cywgaW52b2x2ZWREYXRhTW9kZWxPYmplY3RzLnRhcmdldE9iamVjdC5wYXRoKTtcblx0fVxuXHRyZXR1cm4gaW52b2x2ZWREYXRhTW9kZWxPYmplY3RzO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzS2V5ID0gZnVuY3Rpb24gKG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0LCBvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UpOiBib29sZWFuIHtcblx0Y29uc3Qgb1Byb3BlcnR5OiBQcm9wZXJ0eSA9IGdldFByb3BlcnR5KG9Db250ZXh0LCBvSW50ZXJmYWNlKTtcblx0cmV0dXJuIFByb3BlcnR5SGVscGVyLmlzS2V5KG9Qcm9wZXJ0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGFzVmFsdWVIZWxwID0gZnVuY3Rpb24gKG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0LCBvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UpOiBib29sZWFuIHtcblx0Y29uc3Qgb1Byb3BlcnR5OiBQcm9wZXJ0eSA9IGdldFByb3BlcnR5KG9Db250ZXh0LCBvSW50ZXJmYWNlKTtcblx0cmV0dXJuIFByb3BlcnR5SGVscGVyLmhhc1ZhbHVlSGVscChvUHJvcGVydHkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGhhc0RhdGVUeXBlID0gZnVuY3Rpb24gKG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0LCBvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UpOiBib29sZWFuIHtcblx0Y29uc3Qgb1Byb3BlcnR5OiBQcm9wZXJ0eSA9IGdldFByb3BlcnR5KG9Db250ZXh0LCBvSW50ZXJmYWNlKTtcblx0cmV0dXJuIFByb3BlcnR5SGVscGVyLmhhc0RhdGVUeXBlKG9Qcm9wZXJ0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGFzVmFsdWVIZWxwV2l0aEZpeGVkVmFsdWVzID0gZnVuY3Rpb24gKG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0LCBvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UpOiBib29sZWFuIHtcblx0Y29uc3Qgb1Byb3BlcnR5OiBQcm9wZXJ0eSA9IGdldFByb3BlcnR5KG9Db250ZXh0LCBvSW50ZXJmYWNlKTtcblx0cmV0dXJuIFByb3BlcnR5SGVscGVyLmhhc1ZhbHVlSGVscFdpdGhGaXhlZFZhbHVlcyhvUHJvcGVydHkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE5hbWUgPSBmdW5jdGlvbiAob0NvbnRleHQ6IE1ldGFNb2RlbENvbnRleHQsIG9JbnRlcmZhY2U6IENvbXB1dGVkQW5ub3RhdGlvbkludGVyZmFjZSk6IHN0cmluZyB7XG5cdGNvbnN0IG9Qcm9wZXJ0eTogUHJvcGVydHkgPSBnZXRQcm9wZXJ0eShvQ29udGV4dCwgb0ludGVyZmFjZSk7XG5cdHJldHVybiBvUHJvcGVydHkubmFtZTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRMYWJlbCA9IGZ1bmN0aW9uIChvQ29udGV4dDogTWV0YU1vZGVsQ29udGV4dCwgb0ludGVyZmFjZTogQ29tcHV0ZWRBbm5vdGF0aW9uSW50ZXJmYWNlKTogc3RyaW5nIHtcblx0Y29uc3Qgb1Byb3BlcnR5OiBQcm9wZXJ0eSA9IGdldFByb3BlcnR5KG9Db250ZXh0LCBvSW50ZXJmYWNlKTtcblx0cmV0dXJuIFByb3BlcnR5SGVscGVyLmdldExhYmVsKG9Qcm9wZXJ0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0UHJvcGVydHlQYXRoID0gZnVuY3Rpb24gKG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0LCBvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UpOiBzdHJpbmcge1xuXHRjb25zdCBwcm9wZXJ0eVBhdGggPSBnZXRQcm9wZXJ0eU9iamVjdFBhdGgob0NvbnRleHQsIG9JbnRlcmZhY2UpO1xuXHRyZXR1cm4gZ2V0VGFyZ2V0T2JqZWN0UGF0aChwcm9wZXJ0eVBhdGgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFJlbGF0aXZlUHJvcGVydHlQYXRoID0gZnVuY3Rpb24gKG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0LCBvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UpOiBzdHJpbmcge1xuXHRjb25zdCBwcm9wZXJ0eVBhdGggPSBnZXRQcm9wZXJ0eU9iamVjdFBhdGgob0NvbnRleHQsIG9JbnRlcmZhY2UpO1xuXHRyZXR1cm4gZ2V0VGFyZ2V0T2JqZWN0UGF0aChwcm9wZXJ0eVBhdGgsIHRydWUpO1xufTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7O0VBUU8sTUFBTUEsV0FBVyxHQUFHLFVBQVVDLFFBQTBCLEVBQUVDLFVBQXVDLEVBQVk7SUFDbkgsTUFBTUMsS0FBSyxHQUFHRCxVQUFVLENBQUNFLE9BQU8sQ0FBQ0MsT0FBTyxFQUFFO0lBQzFDLElBQUksQ0FBQ0osUUFBUSxFQUFFO01BQ2QsTUFBTSxJQUFJSyxLQUFLLENBQUUsMkJBQTBCSCxLQUFNLEVBQUMsQ0FBQztJQUNwRDtJQUNBLElBQUlJLE1BQU0sR0FBRyxLQUFLO0lBQ2xCLElBQUksT0FBT04sUUFBUSxLQUFLLFFBQVEsSUFBSUEsUUFBUSxDQUFDTyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7TUFDckVELE1BQU0sR0FBRyxJQUFJO0lBQ2QsQ0FBQyxNQUFNLElBQUksT0FBT04sUUFBUSxLQUFLLFFBQVEsSUFBSUEsUUFBUSxDQUFDTyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUlQLFFBQVEsQ0FBQ1EsS0FBSyxLQUFLLFVBQVUsRUFBRTtNQUM3RyxNQUFNLElBQUlILEtBQUssQ0FBRSwwREFBeURMLFFBQVEsQ0FBQ1EsS0FBTSxFQUFDLENBQUM7SUFDNUY7SUFDQSxJQUFJQyxpQkFBaUIsR0FBR0MsbUJBQW1CLENBQUNWLFFBQVEsRUFBRUMsVUFBVSxDQUFhO0lBQzdFLElBQUlLLE1BQU0sRUFBRTtNQUNYRyxpQkFBaUIsR0FBSUEsaUJBQWlCLENBQVNFLE9BQU87SUFDdkQ7SUFDQSxPQUFPRixpQkFBaUI7RUFDekIs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