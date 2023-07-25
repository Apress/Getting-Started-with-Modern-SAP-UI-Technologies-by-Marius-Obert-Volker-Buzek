/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log", "sap/fe/core/CommonUtils", "sap/fe/core/helpers/StableIdHelper", "sap/fe/core/templating/PropertyFormatters", "sap/fe/macros/field/FieldHelper", "sap/fe/macros/internal/valuehelp/ValueHelpTemplating"], function (Log, CommonUtils, StableIdHelper, PropertyFormatters, FieldHelper, ValueHelpTemplating) {
  "use strict";

  var generateID = ValueHelpTemplating.generateID;
  var getRelativePropertyPath = PropertyFormatters.getRelativePropertyPath;
  var generate = StableIdHelper.generate;
  const NS_MACRODATA = "http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";
  function _retrieveModel() {
    this.control.detachModelContextChange(_retrieveModel, this);
    const sModelName = this.modelName,
      oModel = this.control.getModel(sModelName);
    if (oModel) {
      this.resolve(oModel);
    } else {
      this.control.attachModelContextChange(_retrieveModel, this);
    }
  }
  async function getCustomDataWithModifier(oControl, sProperty, oModifier) {
    const aCustomData = [];
    const aRetrievedCustomData = await Promise.resolve().then(oModifier.getAggregation.bind(oModifier, oControl, "customData"));
    const oPromise = aRetrievedCustomData.reduce((oPreviousPromise, oCustomData) => {
      return oPreviousPromise.then(oModifier.getProperty.bind(oModifier, oCustomData, "key")).then(function (sKey) {
        if (sKey === sProperty) {
          aCustomData.push(oCustomData);
        }
      });
    }, Promise.resolve());
    await oPromise;
    if (aCustomData.length === 1) {
      return oModifier.getProperty(aCustomData[0], "value");
    } else {
      return undefined;
    }
  }
  const FETCHED_PROPERTIES_DATA_KEY = "sap_fe_ControlDelegate_propertyInfoMap";
  const DelegateUtil = {
    setCachedProperties(control, fetchedProperties) {
      // do not cache during templating, else it becomes part of the cached view
      if (control instanceof window.Element) {
        return;
      }
      const key = FETCHED_PROPERTIES_DATA_KEY;
      DelegateUtil.setCustomData(control, key, fetchedProperties);
    },
    getCachedProperties(control) {
      // properties are not cached during templating
      if (control instanceof window.Element) {
        return null;
      }
      const key = FETCHED_PROPERTIES_DATA_KEY;
      return DelegateUtil.getCustomData(control, key);
    },
    getCustomData(oControl, sProperty, oModifier) {
      // If Modifier is given, the method must execute asynchronously and return a Promise
      if (oModifier) {
        return getCustomDataWithModifier(oControl, sProperty, oModifier);
      } else {
        // Delegate invoked from a non-flex change - FilterBarDelegate._addP13nItem for OP table filtering, FilterBarDelegate.fetchProperties etc.
        if (oControl && sProperty) {
          if (oControl instanceof window.Element) {
            return oControl.getAttributeNS(NS_MACRODATA, sProperty);
          }
          if (oControl.data instanceof Function) {
            return oControl.data(sProperty);
          }
        }
        return undefined;
      }
    },
    setCustomData(oControl, sProperty, vValue) {
      if (oControl && sProperty) {
        if (oControl instanceof window.Element) {
          return oControl.setAttributeNS(NS_MACRODATA, `customData:${sProperty}`, vValue);
        }
        if (oControl.data instanceof Function) {
          return oControl.data(sProperty, vValue);
        }
      }
    },
    fetchPropertiesForEntity(sEntitySet, oMetaModel) {
      return oMetaModel.requestObject(`${sEntitySet}/`);
    },
    fetchAnnotationsForEntity(sEntitySet, oMetaModel) {
      return oMetaModel.requestObject(`${sEntitySet}@`);
    },
    fetchModel(oControl) {
      return new Promise(resolve => {
        const sModelName = oControl.getDelegate().payload && oControl.getDelegate().payload.modelName,
          oContext = {
            modelName: sModelName,
            control: oControl,
            resolve: resolve
          };
        _retrieveModel.call(oContext);
      });
    },
    templateControlFragment(sFragmentName, oPreprocessorSettings, oOptions, oModifier) {
      return CommonUtils.templateControlFragment(sFragmentName, oPreprocessorSettings, oOptions, oModifier);
    },
    doesValueHelpExist(mParameters) {
      const sPropertyName = mParameters.sPropertyName || "";
      const sValueHelpType = mParameters.sValueHelpType || "";
      const oMetaModel = mParameters.oMetaModel;
      const oModifier = mParameters.oModifier;
      const sOriginalProperty = `${mParameters.sBindingPath}/${sPropertyName}`;
      const oPropertyContext = oMetaModel.createBindingContext(sOriginalProperty);
      let sValueHelpProperty = FieldHelper.valueHelpProperty(oPropertyContext);
      const bIsAbsolute = mParameters.sBindingPath && mParameters.sBindingPath.indexOf("/") === 0;

      // unit/currency
      if (sValueHelpProperty.indexOf("$Path") > -1) {
        sValueHelpProperty = oMetaModel.getObject(sValueHelpProperty);
      }
      if (bIsAbsolute && sValueHelpProperty.indexOf("/") !== 0) {
        sValueHelpProperty = `${mParameters.sBindingPath}/${sValueHelpProperty}`;
      }
      const sGeneratedId = generateID(mParameters.flexId, generate([oModifier ? oModifier.getId(mParameters.oControl) : mParameters.oControl.getId(), sValueHelpType]), getRelativePropertyPath(oPropertyContext.getProperty(sOriginalProperty), {
        context: {
          getModel: () => {
            return mParameters.oMetaModel;
          },
          getPath: () => {
            return sOriginalProperty;
          }
        }
      }), getRelativePropertyPath(oPropertyContext.getProperty(sValueHelpProperty), {
        context: {
          getModel: () => {
            return mParameters.oMetaModel;
          },
          getPath: () => {
            return sValueHelpProperty;
          }
        }
      }));
      return Promise.resolve().then(function () {
        if (oModifier) {
          return oModifier.getAggregation(mParameters.oControl, "dependents");
        }
        return mParameters.oControl.getAggregation("dependents");
      }).then(function (aDependents) {
        return Promise.resolve(aDependents && aDependents.some(function (oDependent) {
          return oModifier ? oModifier.getId(oDependent) === sGeneratedId : oDependent.getId() === sGeneratedId;
        }));
      });
    },
    isValueHelpRequired(mParameters, bInFilterField) {
      const sPropertyName = mParameters.sPropertyName || "",
        oMetaModel = mParameters.oMetaModel,
        sProperty = `${mParameters.sBindingPath}/${sPropertyName}`,
        oPropertyContext = oMetaModel.createBindingContext(sProperty),
        sValueHelpProperty = FieldHelper.valueHelpProperty(oPropertyContext, bInFilterField);
      return this.getCustomData(mParameters.oControl, "displayModePropertyBinding", mParameters.oModifier).then(function (bReadOnly) {
        // Check whether the control is read-only. If yes, no need of a value help.
        bReadOnly = typeof bReadOnly === "boolean" ? bReadOnly : bReadOnly === "true";
        if (bReadOnly) {
          return false;
        }
        // Else, check whether Value Help relevant annotation exists for the property.
        // TODO use PropertyFormatter.hasValueHelp () => if doing so, QUnit tests fail due to mocked model implementation
        return Promise.all([oMetaModel.requestObject(`${sValueHelpProperty}@com.sap.vocabularies.Common.v1.ValueListWithFixedValues`), oMetaModel.requestObject(`${sValueHelpProperty}@com.sap.vocabularies.Common.v1.ValueListReferences`), oMetaModel.requestObject(`${sValueHelpProperty}@com.sap.vocabularies.Common.v1.ValueListMapping`), oMetaModel.requestObject(`${sValueHelpProperty}@com.sap.vocabularies.Common.v1.ValueList`)]);
      }).then(function (aResults) {
        return !!aResults[0] || !!aResults[1] || !!aResults[2] || !!aResults[3];
      }).catch(function (oError) {
        Log.warning("Error while retrieving custom data / value list annotation values", oError);
      });
    },
    isMultiValue(oProperty) {
      let bIsMultiValue = true;
      //SingleValue | MultiValue | SingleRange | MultiRange | SearchExpression | MultiRangeOrSearchExpression
      switch (oProperty.filterExpression) {
        case "SearchExpression":
        case "SingleRange":
        case "SingleValue":
          bIsMultiValue = false;
          break;
        default:
          break;
      }
      if (oProperty.type && oProperty.type.indexOf("Boolean") > 0) {
        bIsMultiValue = false;
      }
      return bIsMultiValue;
    }
  };
  return DelegateUtil;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOU19NQUNST0RBVEEiLCJfcmV0cmlldmVNb2RlbCIsImNvbnRyb2wiLCJkZXRhY2hNb2RlbENvbnRleHRDaGFuZ2UiLCJzTW9kZWxOYW1lIiwibW9kZWxOYW1lIiwib01vZGVsIiwiZ2V0TW9kZWwiLCJyZXNvbHZlIiwiYXR0YWNoTW9kZWxDb250ZXh0Q2hhbmdlIiwiZ2V0Q3VzdG9tRGF0YVdpdGhNb2RpZmllciIsIm9Db250cm9sIiwic1Byb3BlcnR5Iiwib01vZGlmaWVyIiwiYUN1c3RvbURhdGEiLCJhUmV0cmlldmVkQ3VzdG9tRGF0YSIsIlByb21pc2UiLCJ0aGVuIiwiZ2V0QWdncmVnYXRpb24iLCJiaW5kIiwib1Byb21pc2UiLCJyZWR1Y2UiLCJvUHJldmlvdXNQcm9taXNlIiwib0N1c3RvbURhdGEiLCJnZXRQcm9wZXJ0eSIsInNLZXkiLCJwdXNoIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiRkVUQ0hFRF9QUk9QRVJUSUVTX0RBVEFfS0VZIiwiRGVsZWdhdGVVdGlsIiwic2V0Q2FjaGVkUHJvcGVydGllcyIsImZldGNoZWRQcm9wZXJ0aWVzIiwid2luZG93IiwiRWxlbWVudCIsImtleSIsInNldEN1c3RvbURhdGEiLCJnZXRDYWNoZWRQcm9wZXJ0aWVzIiwiZ2V0Q3VzdG9tRGF0YSIsImdldEF0dHJpYnV0ZU5TIiwiZGF0YSIsIkZ1bmN0aW9uIiwidlZhbHVlIiwic2V0QXR0cmlidXRlTlMiLCJmZXRjaFByb3BlcnRpZXNGb3JFbnRpdHkiLCJzRW50aXR5U2V0Iiwib01ldGFNb2RlbCIsInJlcXVlc3RPYmplY3QiLCJmZXRjaEFubm90YXRpb25zRm9yRW50aXR5IiwiZmV0Y2hNb2RlbCIsImdldERlbGVnYXRlIiwicGF5bG9hZCIsIm9Db250ZXh0IiwiY2FsbCIsInRlbXBsYXRlQ29udHJvbEZyYWdtZW50Iiwic0ZyYWdtZW50TmFtZSIsIm9QcmVwcm9jZXNzb3JTZXR0aW5ncyIsIm9PcHRpb25zIiwiQ29tbW9uVXRpbHMiLCJkb2VzVmFsdWVIZWxwRXhpc3QiLCJtUGFyYW1ldGVycyIsInNQcm9wZXJ0eU5hbWUiLCJzVmFsdWVIZWxwVHlwZSIsInNPcmlnaW5hbFByb3BlcnR5Iiwic0JpbmRpbmdQYXRoIiwib1Byb3BlcnR5Q29udGV4dCIsImNyZWF0ZUJpbmRpbmdDb250ZXh0Iiwic1ZhbHVlSGVscFByb3BlcnR5IiwiRmllbGRIZWxwZXIiLCJ2YWx1ZUhlbHBQcm9wZXJ0eSIsImJJc0Fic29sdXRlIiwiaW5kZXhPZiIsImdldE9iamVjdCIsInNHZW5lcmF0ZWRJZCIsImdlbmVyYXRlSUQiLCJmbGV4SWQiLCJnZW5lcmF0ZSIsImdldElkIiwiZ2V0UmVsYXRpdmVQcm9wZXJ0eVBhdGgiLCJjb250ZXh0IiwiZ2V0UGF0aCIsImFEZXBlbmRlbnRzIiwic29tZSIsIm9EZXBlbmRlbnQiLCJpc1ZhbHVlSGVscFJlcXVpcmVkIiwiYkluRmlsdGVyRmllbGQiLCJiUmVhZE9ubHkiLCJhbGwiLCJhUmVzdWx0cyIsImNhdGNoIiwib0Vycm9yIiwiTG9nIiwid2FybmluZyIsImlzTXVsdGlWYWx1ZSIsIm9Qcm9wZXJ0eSIsImJJc011bHRpVmFsdWUiLCJmaWx0ZXJFeHByZXNzaW9uIiwidHlwZSJdLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXMiOlsiRGVsZWdhdGVVdGlsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2cgZnJvbSBcInNhcC9iYXNlL0xvZ1wiO1xuaW1wb3J0IENvbW1vblV0aWxzIGZyb20gXCJzYXAvZmUvY29yZS9Db21tb25VdGlsc1wiO1xuaW1wb3J0IHtcblx0Y29sdW1uRXhwb3J0U2V0dGluZ3MsXG5cdEN1c3RvbUJhc2VkVGFibGVDb2x1bW4sXG5cdEV4dGVuc2lvbkZvckFuYWx5dGljcyxcblx0UHJvcGVydHlUeXBlQ29uZmlnLFxuXHRWaXN1YWxTZXR0aW5nc1xufSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vVGFibGVcIjtcbmltcG9ydCB7IEN1c3RvbUVsZW1lbnQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0NvbmZpZ3VyYWJsZU9iamVjdFwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9TdGFibGVJZEhlbHBlclwiO1xuaW1wb3J0IHsgRGlzcGxheU1vZGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EaXNwbGF5TW9kZUZvcm1hdHRlclwiO1xuaW1wb3J0IHsgZ2V0UmVsYXRpdmVQcm9wZXJ0eVBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9Qcm9wZXJ0eUZvcm1hdHRlcnNcIjtcbmltcG9ydCBGaWVsZEhlbHBlciBmcm9tIFwic2FwL2ZlL21hY3Jvcy9maWVsZC9GaWVsZEhlbHBlclwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVJRCB9IGZyb20gXCJzYXAvZmUvbWFjcm9zL2ludGVybmFsL3ZhbHVlaGVscC9WYWx1ZUhlbHBUZW1wbGF0aW5nXCI7XG5pbXBvcnQgTW9kZWwgZnJvbSBcInNhcC91aS9tb2RlbC9Nb2RlbFwiO1xuXG5jb25zdCBOU19NQUNST0RBVEEgPSBcImh0dHA6Ly9zY2hlbWFzLnNhcC5jb20vc2FwdWk1L2V4dGVuc2lvbi9zYXAudWkuY29yZS5DdXN0b21EYXRhLzFcIjtcblxuZXhwb3J0IHR5cGUgdGFibGVEZWxlZ2F0ZU1vZGVsID0ge1xuXHRlbmFibGVBdXRvQ29sdW1uV2lkdGg6IGJvb2xlYW47XG5cdGlzT3B0aW1pemVkRm9yU21hbGxEZXZpY2U6IGJvb2xlYW47XG5cdHJlYWRPbmx5OiBib29sZWFuO1xuXHRjb2x1bW5FZGl0TW9kZTogc3RyaW5nO1xuXHR0YWJsZVR5cGU6IHN0cmluZztcblx0b25DaGFuZ2U6IEZ1bmN0aW9uO1xuXHRpZDogc3RyaW5nO1xuXHRuYXZpZ2F0aW9uUHJvcGVydHlQYXRoOiBzdHJpbmc7XG5cdGNvbHVtbkluZm86IEN1c3RvbUVsZW1lbnQ8Q3VzdG9tQmFzZWRUYWJsZUNvbHVtbj47XG5cdGNvbGxlY3Rpb246IHtcblx0XHRzUGF0aDogc3RyaW5nO1xuXHRcdG9Nb2RlbDogc3RyaW5nO1xuXHR9O1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcGVydHlJbmZvID0ge1xuXHRhZGRpdGlvbmFsTGFiZWxzPzogc3RyaW5nW107XG5cdGNhc2VTZW5zaXRpdmU/OiBib29sZWFuO1xuXHRkZXNjcmlwdGlvbj86IHN0cmluZztcblx0ZGVzY3JpcHRpb25Qcm9wZXJ0eT86IHN0cmluZztcblx0ZXhwb3J0U2V0dGluZ3M/OiBjb2x1bW5FeHBvcnRTZXR0aW5ncyB8IG51bGw7XG5cdGZpbHRlcmFibGU/OiBib29sZWFuO1xuXHRncm91cD86IHN0cmluZztcblx0Z3JvdXBhYmxlPzogYm9vbGVhbjtcblx0Z3JvdXBMYWJlbD86IHN0cmluZztcblx0a2V5PzogYm9vbGVhbjtcblx0bGFiZWw/OiBzdHJpbmc7XG5cdG1heENvbmRpdGlvbnM/OiBudW1iZXI7XG5cdG1ldGFkYXRhUGF0aDogc3RyaW5nO1xuXHRtb2RlPzogRGlzcGxheU1vZGU7XG5cdG5hbWU6IHN0cmluZztcblx0cGF0aD86IHN0cmluZztcblx0cHJvcGVydHlJbmZvcz86IHN0cmluZ1tdO1xuXHRyZWxhdGl2ZVBhdGg/OiBzdHJpbmc7XG5cdHNvcnRhYmxlPzogYm9vbGVhbjtcblx0c29ydERpcmVjdGlvbj86IHN0cmluZztcblx0dGV4dD86IHN0cmluZztcblx0dG9vbHRpcD86IHN0cmluZztcblx0dHlwZUNvbmZpZzogUHJvcGVydHlUeXBlQ29uZmlnO1xuXHR1bml0Pzogc3RyaW5nO1xuXHR2YWx1ZVByb3BlcnR5Pzogc3RyaW5nO1xuXHR2aXNpYmxlOiBib29sZWFuO1xuXHR2aXN1YWxTZXR0aW5ncz86IFZpc3VhbFNldHRpbmdzO1xuXHRleHBvcnREYXRhUG9pbnRUYXJnZXRWYWx1ZT86IHN0cmluZztcblx0aXNQYXJhbWV0ZXI/OiBib29sZWFuO1xuXHRhZ2dyZWdhdGFibGU/OiBib29sZWFuO1xuXHRleHRlbnNpb24/OiBFeHRlbnNpb25Gb3JBbmFseXRpY3M7XG59O1xuXG5mdW5jdGlvbiBfcmV0cmlldmVNb2RlbCh0aGlzOiB7IG1vZGVsTmFtZTogc3RyaW5nOyBjb250cm9sOiBhbnk7IHJlc29sdmU6IEZ1bmN0aW9uIH0pIHtcblx0dGhpcy5jb250cm9sLmRldGFjaE1vZGVsQ29udGV4dENoYW5nZShfcmV0cmlldmVNb2RlbCwgdGhpcyk7XG5cdGNvbnN0IHNNb2RlbE5hbWUgPSB0aGlzLm1vZGVsTmFtZSxcblx0XHRvTW9kZWwgPSB0aGlzLmNvbnRyb2wuZ2V0TW9kZWwoc01vZGVsTmFtZSk7XG5cblx0aWYgKG9Nb2RlbCkge1xuXHRcdHRoaXMucmVzb2x2ZShvTW9kZWwpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuY29udHJvbC5hdHRhY2hNb2RlbENvbnRleHRDaGFuZ2UoX3JldHJpZXZlTW9kZWwsIHRoaXMpO1xuXHR9XG59XG5hc3luYyBmdW5jdGlvbiBnZXRDdXN0b21EYXRhV2l0aE1vZGlmaWVyKG9Db250cm9sOiBhbnksIHNQcm9wZXJ0eTogYW55LCBvTW9kaWZpZXI6IGFueSkge1xuXHRjb25zdCBhQ3VzdG9tRGF0YTogYW55W10gPSBbXTtcblxuXHRjb25zdCBhUmV0cmlldmVkQ3VzdG9tRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oXG5cdFx0b01vZGlmaWVyLmdldEFnZ3JlZ2F0aW9uLmJpbmQob01vZGlmaWVyLCBvQ29udHJvbCwgXCJjdXN0b21EYXRhXCIpIGFzICgpID0+IGFueVtdXG5cdCk7XG5cblx0Y29uc3Qgb1Byb21pc2UgPSBhUmV0cmlldmVkQ3VzdG9tRGF0YS5yZWR1Y2UoKG9QcmV2aW91c1Byb21pc2U6IFByb21pc2U8dm9pZD4sIG9DdXN0b21EYXRhKSA9PiB7XG5cdFx0cmV0dXJuIG9QcmV2aW91c1Byb21pc2UudGhlbihvTW9kaWZpZXIuZ2V0UHJvcGVydHkuYmluZChvTW9kaWZpZXIsIG9DdXN0b21EYXRhLCBcImtleVwiKSkudGhlbihmdW5jdGlvbiAoc0tleTogYW55KSB7XG5cdFx0XHRpZiAoc0tleSA9PT0gc1Byb3BlcnR5KSB7XG5cdFx0XHRcdGFDdXN0b21EYXRhLnB1c2gob0N1c3RvbURhdGEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LCBQcm9taXNlLnJlc29sdmUoKSk7XG5cdGF3YWl0IG9Qcm9taXNlO1xuXG5cdGlmIChhQ3VzdG9tRGF0YS5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gb01vZGlmaWVyLmdldFByb3BlcnR5KGFDdXN0b21EYXRhWzBdLCBcInZhbHVlXCIpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cbn1cbmNvbnN0IEZFVENIRURfUFJPUEVSVElFU19EQVRBX0tFWSA9IFwic2FwX2ZlX0NvbnRyb2xEZWxlZ2F0ZV9wcm9wZXJ0eUluZm9NYXBcIjtcblxuY29uc3QgRGVsZWdhdGVVdGlsID0ge1xuXHRzZXRDYWNoZWRQcm9wZXJ0aWVzKGNvbnRyb2w6IGFueSwgZmV0Y2hlZFByb3BlcnRpZXM6IFByb3BlcnR5SW5mb1tdKSB7XG5cdFx0Ly8gZG8gbm90IGNhY2hlIGR1cmluZyB0ZW1wbGF0aW5nLCBlbHNlIGl0IGJlY29tZXMgcGFydCBvZiB0aGUgY2FjaGVkIHZpZXdcblx0XHRpZiAoY29udHJvbCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGtleSA9IEZFVENIRURfUFJPUEVSVElFU19EQVRBX0tFWTtcblx0XHREZWxlZ2F0ZVV0aWwuc2V0Q3VzdG9tRGF0YShjb250cm9sLCBrZXksIGZldGNoZWRQcm9wZXJ0aWVzKTtcblx0fSxcblx0Z2V0Q2FjaGVkUHJvcGVydGllcyhjb250cm9sOiBhbnkpOiBQcm9wZXJ0eUluZm9bXSB8IG51bGwge1xuXHRcdC8vIHByb3BlcnRpZXMgYXJlIG5vdCBjYWNoZWQgZHVyaW5nIHRlbXBsYXRpbmdcblx0XHRpZiAoY29udHJvbCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3Qga2V5ID0gRkVUQ0hFRF9QUk9QRVJUSUVTX0RBVEFfS0VZO1xuXHRcdHJldHVybiBEZWxlZ2F0ZVV0aWwuZ2V0Q3VzdG9tRGF0YShjb250cm9sLCBrZXkpO1xuXHR9LFxuXG5cdGdldEN1c3RvbURhdGEob0NvbnRyb2w6IGFueSwgc1Byb3BlcnR5OiBhbnksIG9Nb2RpZmllcj86IGFueSkge1xuXHRcdC8vIElmIE1vZGlmaWVyIGlzIGdpdmVuLCB0aGUgbWV0aG9kIG11c3QgZXhlY3V0ZSBhc3luY2hyb25vdXNseSBhbmQgcmV0dXJuIGEgUHJvbWlzZVxuXHRcdGlmIChvTW9kaWZpZXIpIHtcblx0XHRcdHJldHVybiBnZXRDdXN0b21EYXRhV2l0aE1vZGlmaWVyKG9Db250cm9sLCBzUHJvcGVydHksIG9Nb2RpZmllcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIERlbGVnYXRlIGludm9rZWQgZnJvbSBhIG5vbi1mbGV4IGNoYW5nZSAtIEZpbHRlckJhckRlbGVnYXRlLl9hZGRQMTNuSXRlbSBmb3IgT1AgdGFibGUgZmlsdGVyaW5nLCBGaWx0ZXJCYXJEZWxlZ2F0ZS5mZXRjaFByb3BlcnRpZXMgZXRjLlxuXHRcdFx0aWYgKG9Db250cm9sICYmIHNQcm9wZXJ0eSkge1xuXHRcdFx0XHRpZiAob0NvbnRyb2wgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkge1xuXHRcdFx0XHRcdHJldHVybiBvQ29udHJvbC5nZXRBdHRyaWJ1dGVOUyhOU19NQUNST0RBVEEsIHNQcm9wZXJ0eSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG9Db250cm9sLmRhdGEgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuXHRcdFx0XHRcdHJldHVybiBvQ29udHJvbC5kYXRhKHNQcm9wZXJ0eSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9LFxuXHRzZXRDdXN0b21EYXRhKG9Db250cm9sOiBhbnksIHNQcm9wZXJ0eTogYW55LCB2VmFsdWU6IGFueSkge1xuXHRcdGlmIChvQ29udHJvbCAmJiBzUHJvcGVydHkpIHtcblx0XHRcdGlmIChvQ29udHJvbCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybiBvQ29udHJvbC5zZXRBdHRyaWJ1dGVOUyhOU19NQUNST0RBVEEsIGBjdXN0b21EYXRhOiR7c1Byb3BlcnR5fWAsIHZWYWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAob0NvbnRyb2wuZGF0YSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG5cdFx0XHRcdHJldHVybiBvQ29udHJvbC5kYXRhKHNQcm9wZXJ0eSwgdlZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGZldGNoUHJvcGVydGllc0ZvckVudGl0eShzRW50aXR5U2V0OiBhbnksIG9NZXRhTW9kZWw6IGFueSkge1xuXHRcdHJldHVybiBvTWV0YU1vZGVsLnJlcXVlc3RPYmplY3QoYCR7c0VudGl0eVNldH0vYCk7XG5cdH0sXG5cdGZldGNoQW5ub3RhdGlvbnNGb3JFbnRpdHkoc0VudGl0eVNldDogYW55LCBvTWV0YU1vZGVsOiBhbnkpIHtcblx0XHRyZXR1cm4gb01ldGFNb2RlbC5yZXF1ZXN0T2JqZWN0KGAke3NFbnRpdHlTZXR9QGApO1xuXHR9LFxuXHRmZXRjaE1vZGVsKG9Db250cm9sOiBhbnkpOiBQcm9taXNlPE1vZGVsPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRjb25zdCBzTW9kZWxOYW1lID0gb0NvbnRyb2wuZ2V0RGVsZWdhdGUoKS5wYXlsb2FkICYmIG9Db250cm9sLmdldERlbGVnYXRlKCkucGF5bG9hZC5tb2RlbE5hbWUsXG5cdFx0XHRcdG9Db250ZXh0ID0geyBtb2RlbE5hbWU6IHNNb2RlbE5hbWUsIGNvbnRyb2w6IG9Db250cm9sLCByZXNvbHZlOiByZXNvbHZlIH07XG5cdFx0XHRfcmV0cmlldmVNb2RlbC5jYWxsKG9Db250ZXh0KTtcblx0XHR9KTtcblx0fSxcblx0dGVtcGxhdGVDb250cm9sRnJhZ21lbnQoc0ZyYWdtZW50TmFtZTogYW55LCBvUHJlcHJvY2Vzc29yU2V0dGluZ3M6IGFueSwgb09wdGlvbnM6IGFueSwgb01vZGlmaWVyPzogYW55KSB7XG5cdFx0cmV0dXJuIENvbW1vblV0aWxzLnRlbXBsYXRlQ29udHJvbEZyYWdtZW50KHNGcmFnbWVudE5hbWUsIG9QcmVwcm9jZXNzb3JTZXR0aW5ncywgb09wdGlvbnMsIG9Nb2RpZmllcik7XG5cdH0sXG5cdGRvZXNWYWx1ZUhlbHBFeGlzdChtUGFyYW1ldGVyczogYW55KSB7XG5cdFx0Y29uc3Qgc1Byb3BlcnR5TmFtZSA9IG1QYXJhbWV0ZXJzLnNQcm9wZXJ0eU5hbWUgfHwgXCJcIjtcblx0XHRjb25zdCBzVmFsdWVIZWxwVHlwZSA9IG1QYXJhbWV0ZXJzLnNWYWx1ZUhlbHBUeXBlIHx8IFwiXCI7XG5cdFx0Y29uc3Qgb01ldGFNb2RlbCA9IG1QYXJhbWV0ZXJzLm9NZXRhTW9kZWw7XG5cdFx0Y29uc3Qgb01vZGlmaWVyID0gbVBhcmFtZXRlcnMub01vZGlmaWVyO1xuXHRcdGNvbnN0IHNPcmlnaW5hbFByb3BlcnR5ID0gYCR7bVBhcmFtZXRlcnMuc0JpbmRpbmdQYXRofS8ke3NQcm9wZXJ0eU5hbWV9YDtcblx0XHRjb25zdCBvUHJvcGVydHlDb250ZXh0ID0gb01ldGFNb2RlbC5jcmVhdGVCaW5kaW5nQ29udGV4dChzT3JpZ2luYWxQcm9wZXJ0eSk7XG5cdFx0bGV0IHNWYWx1ZUhlbHBQcm9wZXJ0eSA9IEZpZWxkSGVscGVyLnZhbHVlSGVscFByb3BlcnR5KG9Qcm9wZXJ0eUNvbnRleHQpO1xuXHRcdGNvbnN0IGJJc0Fic29sdXRlID0gbVBhcmFtZXRlcnMuc0JpbmRpbmdQYXRoICYmIG1QYXJhbWV0ZXJzLnNCaW5kaW5nUGF0aC5pbmRleE9mKFwiL1wiKSA9PT0gMDtcblxuXHRcdC8vIHVuaXQvY3VycmVuY3lcblx0XHRpZiAoc1ZhbHVlSGVscFByb3BlcnR5LmluZGV4T2YoXCIkUGF0aFwiKSA+IC0xKSB7XG5cdFx0XHRzVmFsdWVIZWxwUHJvcGVydHkgPSBvTWV0YU1vZGVsLmdldE9iamVjdChzVmFsdWVIZWxwUHJvcGVydHkpO1xuXHRcdH1cblx0XHRpZiAoYklzQWJzb2x1dGUgJiYgc1ZhbHVlSGVscFByb3BlcnR5LmluZGV4T2YoXCIvXCIpICE9PSAwKSB7XG5cdFx0XHRzVmFsdWVIZWxwUHJvcGVydHkgPSBgJHttUGFyYW1ldGVycy5zQmluZGluZ1BhdGh9LyR7c1ZhbHVlSGVscFByb3BlcnR5fWA7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc0dlbmVyYXRlZElkID0gZ2VuZXJhdGVJRChcblx0XHRcdG1QYXJhbWV0ZXJzLmZsZXhJZCxcblx0XHRcdGdlbmVyYXRlKFtvTW9kaWZpZXIgPyBvTW9kaWZpZXIuZ2V0SWQobVBhcmFtZXRlcnMub0NvbnRyb2wpIDogbVBhcmFtZXRlcnMub0NvbnRyb2wuZ2V0SWQoKSwgc1ZhbHVlSGVscFR5cGVdKSxcblx0XHRcdGdldFJlbGF0aXZlUHJvcGVydHlQYXRoKG9Qcm9wZXJ0eUNvbnRleHQuZ2V0UHJvcGVydHkoc09yaWdpbmFsUHJvcGVydHkpLCB7XG5cdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRnZXRNb2RlbDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG1QYXJhbWV0ZXJzLm9NZXRhTW9kZWw7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRQYXRoOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc09yaWdpbmFsUHJvcGVydHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGFzIGFueVxuXHRcdFx0fSksXG5cdFx0XHRnZXRSZWxhdGl2ZVByb3BlcnR5UGF0aChvUHJvcGVydHlDb250ZXh0LmdldFByb3BlcnR5KHNWYWx1ZUhlbHBQcm9wZXJ0eSksIHtcblx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdGdldE1vZGVsOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbVBhcmFtZXRlcnMub01ldGFNb2RlbDtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldFBhdGg6ICgpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBzVmFsdWVIZWxwUHJvcGVydHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGFzIGFueVxuXHRcdFx0fSlcblx0XHQpO1xuXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChvTW9kaWZpZXIpIHtcblx0XHRcdFx0XHRyZXR1cm4gb01vZGlmaWVyLmdldEFnZ3JlZ2F0aW9uKG1QYXJhbWV0ZXJzLm9Db250cm9sLCBcImRlcGVuZGVudHNcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG1QYXJhbWV0ZXJzLm9Db250cm9sLmdldEFnZ3JlZ2F0aW9uKFwiZGVwZW5kZW50c1wiKTtcblx0XHRcdH0pXG5cdFx0XHQudGhlbihmdW5jdGlvbiAoYURlcGVuZGVudHM6IGFueSkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuXHRcdFx0XHRcdGFEZXBlbmRlbnRzICYmXG5cdFx0XHRcdFx0XHRhRGVwZW5kZW50cy5zb21lKGZ1bmN0aW9uIChvRGVwZW5kZW50OiBhbnkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9Nb2RpZmllciA/IG9Nb2RpZmllci5nZXRJZChvRGVwZW5kZW50KSA9PT0gc0dlbmVyYXRlZElkIDogb0RlcGVuZGVudC5nZXRJZCgpID09PSBzR2VuZXJhdGVkSWQ7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdH0sXG5cdGlzVmFsdWVIZWxwUmVxdWlyZWQobVBhcmFtZXRlcnM6IGFueSwgYkluRmlsdGVyRmllbGQ/OiBib29sZWFuKSB7XG5cdFx0Y29uc3Qgc1Byb3BlcnR5TmFtZSA9IG1QYXJhbWV0ZXJzLnNQcm9wZXJ0eU5hbWUgfHwgXCJcIixcblx0XHRcdG9NZXRhTW9kZWwgPSBtUGFyYW1ldGVycy5vTWV0YU1vZGVsLFxuXHRcdFx0c1Byb3BlcnR5ID0gYCR7bVBhcmFtZXRlcnMuc0JpbmRpbmdQYXRofS8ke3NQcm9wZXJ0eU5hbWV9YCxcblx0XHRcdG9Qcm9wZXJ0eUNvbnRleHQgPSBvTWV0YU1vZGVsLmNyZWF0ZUJpbmRpbmdDb250ZXh0KHNQcm9wZXJ0eSksXG5cdFx0XHRzVmFsdWVIZWxwUHJvcGVydHkgPSBGaWVsZEhlbHBlci52YWx1ZUhlbHBQcm9wZXJ0eShvUHJvcGVydHlDb250ZXh0LCBiSW5GaWx0ZXJGaWVsZCk7XG5cblx0XHRyZXR1cm4gdGhpcy5nZXRDdXN0b21EYXRhKG1QYXJhbWV0ZXJzLm9Db250cm9sLCBcImRpc3BsYXlNb2RlUHJvcGVydHlCaW5kaW5nXCIsIG1QYXJhbWV0ZXJzLm9Nb2RpZmllcilcblx0XHRcdC50aGVuKGZ1bmN0aW9uIChiUmVhZE9ubHk6IGFueSkge1xuXHRcdFx0XHQvLyBDaGVjayB3aGV0aGVyIHRoZSBjb250cm9sIGlzIHJlYWQtb25seS4gSWYgeWVzLCBubyBuZWVkIG9mIGEgdmFsdWUgaGVscC5cblx0XHRcdFx0YlJlYWRPbmx5ID0gdHlwZW9mIGJSZWFkT25seSA9PT0gXCJib29sZWFuXCIgPyBiUmVhZE9ubHkgOiBiUmVhZE9ubHkgPT09IFwidHJ1ZVwiO1xuXHRcdFx0XHRpZiAoYlJlYWRPbmx5KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIEVsc2UsIGNoZWNrIHdoZXRoZXIgVmFsdWUgSGVscCByZWxldmFudCBhbm5vdGF0aW9uIGV4aXN0cyBmb3IgdGhlIHByb3BlcnR5LlxuXHRcdFx0XHQvLyBUT0RPIHVzZSBQcm9wZXJ0eUZvcm1hdHRlci5oYXNWYWx1ZUhlbHAgKCkgPT4gaWYgZG9pbmcgc28sIFFVbml0IHRlc3RzIGZhaWwgZHVlIHRvIG1vY2tlZCBtb2RlbCBpbXBsZW1lbnRhdGlvblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW1xuXHRcdFx0XHRcdG9NZXRhTW9kZWwucmVxdWVzdE9iamVjdChgJHtzVmFsdWVIZWxwUHJvcGVydHl9QGNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5WYWx1ZUxpc3RXaXRoRml4ZWRWYWx1ZXNgKSxcblx0XHRcdFx0XHRvTWV0YU1vZGVsLnJlcXVlc3RPYmplY3QoYCR7c1ZhbHVlSGVscFByb3BlcnR5fUBjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0UmVmZXJlbmNlc2ApLFxuXHRcdFx0XHRcdG9NZXRhTW9kZWwucmVxdWVzdE9iamVjdChgJHtzVmFsdWVIZWxwUHJvcGVydHl9QGNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5WYWx1ZUxpc3RNYXBwaW5nYCksXG5cdFx0XHRcdFx0b01ldGFNb2RlbC5yZXF1ZXN0T2JqZWN0KGAke3NWYWx1ZUhlbHBQcm9wZXJ0eX1AY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlZhbHVlTGlzdGApXG5cdFx0XHRcdF0pO1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uIChhUmVzdWx0czogYW55W10pIHtcblx0XHRcdFx0cmV0dXJuICEhYVJlc3VsdHNbMF0gfHwgISFhUmVzdWx0c1sxXSB8fCAhIWFSZXN1bHRzWzJdIHx8ICEhYVJlc3VsdHNbM107XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChvRXJyb3I6IGFueSkge1xuXHRcdFx0XHRMb2cud2FybmluZyhcIkVycm9yIHdoaWxlIHJldHJpZXZpbmcgY3VzdG9tIGRhdGEgLyB2YWx1ZSBsaXN0IGFubm90YXRpb24gdmFsdWVzXCIsIG9FcnJvcik7XG5cdFx0XHR9KTtcblx0fSxcblx0aXNNdWx0aVZhbHVlKG9Qcm9wZXJ0eTogYW55KSB7XG5cdFx0bGV0IGJJc011bHRpVmFsdWUgPSB0cnVlO1xuXHRcdC8vU2luZ2xlVmFsdWUgfCBNdWx0aVZhbHVlIHwgU2luZ2xlUmFuZ2UgfCBNdWx0aVJhbmdlIHwgU2VhcmNoRXhwcmVzc2lvbiB8IE11bHRpUmFuZ2VPclNlYXJjaEV4cHJlc3Npb25cblx0XHRzd2l0Y2ggKG9Qcm9wZXJ0eS5maWx0ZXJFeHByZXNzaW9uKSB7XG5cdFx0XHRjYXNlIFwiU2VhcmNoRXhwcmVzc2lvblwiOlxuXHRcdFx0Y2FzZSBcIlNpbmdsZVJhbmdlXCI6XG5cdFx0XHRjYXNlIFwiU2luZ2xlVmFsdWVcIjpcblx0XHRcdFx0YklzTXVsdGlWYWx1ZSA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRpZiAob1Byb3BlcnR5LnR5cGUgJiYgb1Byb3BlcnR5LnR5cGUuaW5kZXhPZihcIkJvb2xlYW5cIikgPiAwKSB7XG5cdFx0XHRiSXNNdWx0aVZhbHVlID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBiSXNNdWx0aVZhbHVlO1xuXHR9XG59O1xuZXhwb3J0IGRlZmF1bHQgRGVsZWdhdGVVdGlsO1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFBQTtBQUFBOzs7Ozs7O0VBaUJBLE1BQU1BLFlBQVksR0FBRyxrRUFBa0U7RUFvRHZGLFNBQVNDLGNBQWMsR0FBK0Q7SUFDckYsSUFBSSxDQUFDQyxPQUFPLENBQUNDLHdCQUF3QixDQUFDRixjQUFjLEVBQUUsSUFBSSxDQUFDO0lBQzNELE1BQU1HLFVBQVUsR0FBRyxJQUFJLENBQUNDLFNBQVM7TUFDaENDLE1BQU0sR0FBRyxJQUFJLENBQUNKLE9BQU8sQ0FBQ0ssUUFBUSxDQUFDSCxVQUFVLENBQUM7SUFFM0MsSUFBSUUsTUFBTSxFQUFFO01BQ1gsSUFBSSxDQUFDRSxPQUFPLENBQUNGLE1BQU0sQ0FBQztJQUNyQixDQUFDLE1BQU07TUFDTixJQUFJLENBQUNKLE9BQU8sQ0FBQ08sd0JBQXdCLENBQUNSLGNBQWMsRUFBRSxJQUFJLENBQUM7SUFDNUQ7RUFDRDtFQUNBLGVBQWVTLHlCQUF5QixDQUFDQyxRQUFhLEVBQUVDLFNBQWMsRUFBRUMsU0FBYyxFQUFFO0lBQ3ZGLE1BQU1DLFdBQWtCLEdBQUcsRUFBRTtJQUU3QixNQUFNQyxvQkFBb0IsR0FBRyxNQUFNQyxPQUFPLENBQUNSLE9BQU8sRUFBRSxDQUFDUyxJQUFJLENBQ3hESixTQUFT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