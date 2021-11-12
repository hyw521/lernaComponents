"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

require("antd/dist/antd.css");

require("./style/index.less");

var _excluded = ["columns", "initState", "fetchData"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var HTable = function HTable(props, ref) {
  var columns = props.columns,
      _props$initState = props.initState,
      initState = _props$initState === void 0 ? {
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0
    },
    dataSource: []
  } : _props$initState,
      fetchData = props.fetchData,
      baseProps = (0, _objectWithoutProperties2["default"])(props, _excluded);

  var reducer = function reducer(state, action) {
    var payload = action.payload;

    switch (action.type) {
      case "SET_PAGINATION":
        return _objectSpread(_objectSpread({}, state), {}, {
          pagination: payload.pagination
        });

      case "SET_DATA_SOURCE":
        return _objectSpread(_objectSpread({}, state), {}, {
          dataSource: payload.dataSource
        });

      default:
        return state;
    }
  };

  var _useReducer = (0, _react.useReducer)(reducer, initState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1]; // 翻页


  var handleTablePageChange = function handleTablePageChange(page, pageSize) {
    dispatch({
      type: "SET_PAGINATION",
      payload: {
        pagination: _objectSpread(_objectSpread({}, state.pagination), {}, {
          page: page
        })
      }
    });
    fetchData(_objectSpread(_objectSpread({}, state.pagination), {}, {
      page: page,
      pageSize: pageSize
    }), dispatch);
  }; // 改变页码


  var handleTablePageSizeChange = function handleTablePageSizeChange(page, pageSize) {
    dispatch({
      type: "SET_PAGINATION",
      payload: {
        pagination: _objectSpread(_objectSpread({}, state.pagination), {}, {
          page: page,
          pageSize: pageSize
        })
      }
    });
    fetchData(_objectSpread(_objectSpread({}, state.pagination), {}, {
      page: page,
      pageSize: pageSize
    }), dispatch);
  }; // 分页配置


  var pagination = {
    position: "bottom",
    pageSize: state.pagination.pageSize,
    hideOnSinglePage: state.pagination.total < 1,
    current: state.pagination.page,
    total: state.pagination.total,
    showTotal: function showTotal(total) {
      return /*#__PURE__*/_react["default"].createElement("span", null, "\u5171", /*#__PURE__*/_react["default"].createElement("span", null, total), "\u6761\u8BB0\u5F55 \u7B2C", /*#__PURE__*/_react["default"].createElement("span", null, state.pagination.page), "/", /*#__PURE__*/_react["default"].createElement("span", null, Math.ceil(total / state.pagination.pageSize)), "\u9875");
    },
    pageSizeOptions: ["10", "20", "30", "40", "50"],
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: handleTablePageChange,
    onShowSizeChange: handleTablePageSizeChange
  };

  if (baseProps.pagination) {// Object.keys(baseProps.pagination).forEach(key => {
    //   pagination[key] = baseProps.pagination[key]
    // })
  } // 表格选中,获取翻页后的表格行信息


  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      selectedRows = _useState4[0],
      setSelectedRows = _useState4[1];

  var rowKey = baseProps.rowKey;

  var onSelectChange = function onSelectChange(selectedRowKeys, rows) {
    setSelectedRowKeys(selectedRowKeys);
    var selectedRowsKeys = selectedRows.reduce(function (pre, cur) {
      return pre.concat(cur[rowKey]);
    }, []);
    var allList = selectedRows.concat(rows.filter(function (item) {
      return !selectedRowsKeys.includes(item[rowKey]);
    }));
    var list = allList.reduce(function (pre, cur) {
      if (selectedRowKeys.includes(cur[rowKey])) {
        return pre.concat(cur);
      } else {
        return pre;
      }
    }, []);
    setSelectedRows(list);
  }; // 设置表格选中


  var handleSelectedRows = function handleSelectedRows(val) {
    setSelectedRows(val);
    var keys = val.reduce(function (pre, cur) {
      return pre.concat(cur[rowKey]);
    }, []);
    setSelectedRowKeys(keys);
  }; // 表格勾选配置


  var rowSelection = Object.assign({
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange
  }, baseProps.rowSelection || {}); // 供父组件调用的方法

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      // 查询表格数据
      handleFilter: function handleFilter() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        dispatch({
          type: "SET_PAGINATION",
          payload: {
            pagination: _objectSpread(_objectSpread({}, state.pagination), {}, {
              page: page,
              pageSize: pageSize
            })
          }
        });
        fetchData(_objectSpread(_objectSpread({}, state.pagination), {}, {
          page: page,
          pageSize: pageSize
        }), dispatch);
      },
      // 获取表格勾选中的行信息
      getSelectedRows: function getSelectedRows() {
        return selectedRows;
      },
      // 设置表格勾选
      handleSelectedRows: handleSelectedRows,
      // 获取表格内的state
      getTableState: function getTableState() {
        var obj = {
          filterState: [state, dispatch]
        };
        return obj;
      }
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_antd.Table, (0, _extends2["default"])({
    className: "hbs-table",
    columns: columns,
    dataSource: state.dataSource,
    pagination: pagination,
    rowSelection: rowSelection
  }, baseProps));
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(HTable);

exports["default"] = _default;