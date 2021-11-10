var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, useImperativeHandle, forwardRef, useState, } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./index.less";
const HTable = (props, ref) => {
    const { columns, initState = {
        pagination: {
            page: 1,
            pageSize: 10,
            total: 0,
        },
        dataSource: [],
    }, fetchData } = props, baseProps = __rest(props, ["columns", "initState", "fetchData"]);
    const reducer = (state, action) => {
        const { payload } = action;
        switch (action.type) {
            case "SET_PAGINATION":
                return Object.assign(Object.assign({}, state), { pagination: payload.pagination });
            case "SET_DATA_SOURCE":
                return Object.assign(Object.assign({}, state), { dataSource: payload.dataSource });
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initState);
    // 翻页
    const handleTablePageChange = (page, pageSize) => {
        dispatch({
            type: "SET_PAGINATION",
            payload: {
                pagination: Object.assign(Object.assign({}, state.pagination), { page }),
            },
        });
        fetchData(Object.assign(Object.assign({}, state.pagination), { page, pageSize }), dispatch);
    };
    // 改变页码
    const handleTablePageSizeChange = (page, pageSize) => {
        dispatch({
            type: "SET_PAGINATION",
            payload: {
                pagination: Object.assign(Object.assign({}, state.pagination), { page, pageSize }),
            },
        });
        fetchData(Object.assign(Object.assign({}, state.pagination), { page, pageSize }), dispatch);
    };
    // 分页配置
    let pagination = {
        position: "bottom",
        pageSize: state.pagination.pageSize,
        hideOnSinglePage: state.pagination.total < 1,
        current: state.pagination.page,
        total: state.pagination.total,
        showTotal: (total) => (React.createElement("span", null,
            "\u5171",
            React.createElement("span", null, total),
            "\u6761\u8BB0\u5F55 \u7B2C",
            React.createElement("span", null, state.pagination.page),
            "/",
            React.createElement("span", null, Math.ceil(total / state.pagination.pageSize)),
            "\u9875")),
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: handleTablePageChange,
        onShowSizeChange: handleTablePageSizeChange,
    };
    if (baseProps.pagination) {
        // Object.keys(baseProps.pagination).forEach(key => {
        //   pagination[key] = baseProps.pagination[key]
        // })
    }
    // 表格选中,获取翻页后的表格行信息
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const rowKey = baseProps.rowKey;
    const onSelectChange = (selectedRowKeys, rows) => {
        setSelectedRowKeys(selectedRowKeys);
        const selectedRowsKeys = selectedRows.reduce((pre, cur) => {
            return pre.concat(cur[rowKey]);
        }, []);
        const allList = selectedRows.concat(rows.filter((item) => {
            return !selectedRowsKeys.includes(item[rowKey]);
        }));
        const list = allList.reduce((pre, cur) => {
            if (selectedRowKeys.includes(cur[rowKey])) {
                return pre.concat(cur);
            }
            else {
                return pre;
            }
        }, []);
        setSelectedRows(list);
    };
    // 设置表格选中
    const handleSelectedRows = (val) => {
        setSelectedRows(val);
        const keys = val.reduce((pre, cur) => {
            return pre.concat(cur[rowKey]);
        }, []);
        setSelectedRowKeys(keys);
    };
    // 表格勾选配置
    const rowSelection = Object.assign({
        selectedRowKeys,
        onChange: onSelectChange,
    }, baseProps.rowSelection || {});
    // 供父组件调用的方法
    useImperativeHandle(ref, () => ({
        // 查询表格数据
        handleFilter: (page = 1, pageSize = 10) => {
            dispatch({
                type: "SET_PAGINATION",
                payload: {
                    pagination: Object.assign(Object.assign({}, state.pagination), { page, pageSize }),
                },
            });
            fetchData(Object.assign(Object.assign({}, state.pagination), { page, pageSize }), dispatch);
        },
        // 获取表格勾选中的行信息
        getSelectedRows: () => selectedRows,
        // 设置表格勾选
        handleSelectedRows,
        // 获取表格内的state
        getTableState: () => {
            const obj = {
                filterState: [state, dispatch],
            };
            return obj;
        },
    }));
    return (React.createElement(Table, Object.assign({ className: "hbs-table", columns: columns, dataSource: state.dataSource, pagination: pagination, rowSelection: rowSelection }, baseProps)));
};
export default forwardRef(HTable);
//# sourceMappingURL=index.js.map