import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["columns", "initState", "fetchData"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, useImperativeHandle, forwardRef, useState } from "react";
import { Table } from "antd";

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
      baseProps = _objectWithoutProperties(props, _excluded);

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

  var _useReducer = useReducer(reducer, initState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
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
      return /*#__PURE__*/React.createElement("span", null, "\u5171", /*#__PURE__*/React.createElement("span", null, total), "\u6761\u8BB0\u5F55 \u7B2C", /*#__PURE__*/React.createElement("span", null, state.pagination.page), "/", /*#__PURE__*/React.createElement("span", null, Math.ceil(total / state.pagination.pageSize)), "\u9875");
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


  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
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

  useImperativeHandle(ref, function () {
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
  return /*#__PURE__*/React.createElement(Table, _extends({
    className: "hbs-table",
    columns: columns,
    dataSource: state.dataSource,
    pagination: pagination,
    rowSelection: rowSelection
  }, baseProps));
};

export default /*#__PURE__*/forwardRef(HTable);