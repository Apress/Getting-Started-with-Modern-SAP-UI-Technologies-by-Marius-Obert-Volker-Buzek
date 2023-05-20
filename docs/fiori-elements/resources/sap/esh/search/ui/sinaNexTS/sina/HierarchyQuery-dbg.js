/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */

(function(){
function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
sap.ui.define(["./DataSourceType", "./FacetQuery"], function (___DataSourceType, ___FacetQuery) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  /*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */
  var DataSourceSubType = ___DataSourceType["DataSourceSubType"];
  var DataSourceType = ___DataSourceType["DataSourceType"];
  var FacetQuery = ___FacetQuery["FacetQuery"];
  var HierarchyQuery = /*#__PURE__*/function (_FacetQuery) {
    _inherits(HierarchyQuery, _FacetQuery);
    var _super = _createSuper(HierarchyQuery);
    function HierarchyQuery(properties) {
      var _properties$top;
      var _this;
      _classCallCheck(this, HierarchyQuery);
      _this = _super.call(this, properties);
      _this.top = (_properties$top = properties.top) !== null && _properties$top !== void 0 ? _properties$top : 30;
      _this.attributeId = properties.attributeId;
      _this.nodeId = properties.nodeId;
      return _this;
    }
    _createClass(HierarchyQuery, [{
      key: "equals",
      value: function equals(other) {
        return other instanceof HierarchyQuery && _get(_getPrototypeOf(HierarchyQuery.prototype), "equals", this).call(this, other) && this.nodeId === other.nodeId;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new HierarchyQuery({
          label: this.label,
          icon: this.icon,
          top: this.top,
          skip: this.skip,
          sortOrder: this.sortOrder,
          filter: this.filter.clone(),
          searchTerm: this.getSearchTerm(),
          sina: this.sina,
          attributeId: this.attributeId,
          nodeId: this.nodeId
        });
      }
    }, {
      key: "_execute",
      value: function _execute(query) {
        try {
          const _this2 = this;
          return _await(_this2._doExecuteHierarchyQuery(query));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "_doExecuteHierarchyQuery",
      value: function _doExecuteHierarchyQuery(query) {
        try {
          const _this3 = this;
          var transformedQuery = _this3._filteredQueryTransform(query);
          return _await(_this3.sina.provider.executeHierarchyQuery(transformedQuery), function (resultSet) {
            return _this3._filteredQueryBackTransform(query, resultSet);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "_filteredQueryTransform",
      value: function _filteredQueryTransform(query) {
        return this._genericFilteredQueryTransform(query);
      }
    }, {
      key: "_filteredQueryBackTransform",
      value: function _filteredQueryBackTransform(query, resultSet) {
        if (query.filter.dataSource.type !== DataSourceType.BusinessObject || query.filter.dataSource.subType !== DataSourceSubType.Filtered) {
          return resultSet;
        }
        resultSet.query = query;
        return resultSet;
      }
    }]);
    return HierarchyQuery;
  }(FacetQuery);
  var __exports = {
    __esModule: true
  };
  __exports.HierarchyQuery = HierarchyQuery;
  return __exports;
});
})();