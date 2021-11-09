import React, { useReducer, useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { Table } from "antd";
import 'antd/dist/antd.css';
import { initStateProps, tableProps } from "./type";

const HTable = (props: tableProps<any>,ref:any) => {
  const {
    columns,
    initState = {
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      dataSource: [],
    },
    fetchData,
    ...baseProps
  } = props
  const reducer = (state: initStateProps<any>, action: any) => {
    const { payload } = action;
    switch (action.type) {
      case "SET_PAGINATION":
        return { ...state, pagination: payload.pagination };
      case "SET_DATA_SOURCE":
        return { ...state, dataSource: payload.dataSource };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initState);
  // 翻页
  const handleTablePageChange = (page: number, pageSize?: number): void => {
    dispatch({
      type: "SET_PAGINATION",
      payload: {
        pagination: { ...state.pagination, page },
      },
    });
    fetchData({ ...state.pagination, page, pageSize }, dispatch)
  }
  // 改变页码
  const handleTablePageSizeChange = (page: number, pageSize: number): void => {
    dispatch({
      type: "SET_PAGINATION",
      payload: {
        pagination: { ...state.pagination, page, pageSize },
      },
    });
    fetchData({ ...state.pagination, page, pageSize }, dispatch)
  }
  // 分页配置
  let pagination = {
    position: 'bottom' as 'bottom',
    pageSize: state.pagination.pageSize,
    hideOnSinglePage: state.pagination.total < 1,
    current: state.pagination.page,
    total: state.pagination.total,
    showTotal: (total: number) => (
      <span>
        共<span>{total}</span>条记录 第<span>{state.pagination.page}</span>/<span>{Math.ceil(total / state.pagination.pageSize)}</span>页
      </span>
    ),
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: handleTablePageChange,
    onShowSizeChange: handleTablePageSizeChange,
  }
  if (baseProps.pagination) {
    // Object.keys(baseProps.pagination).forEach(key => {
    //   pagination[key] = baseProps.pagination[key]
    // })
  }
  // 表格选中
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const rowKey = baseProps.rowKey as any
  const onSelectChange = (selectedRowKeys:string[]|number[], rows:any[]):void => {
    setSelectedRowKeys(selectedRowKeys)
    const selectedRowsKeys = selectedRows.reduce((pre, cur) => { return pre.concat(cur[rowKey]) }, [])
    const allList = selectedRows.concat(rows.filter(item => {
      return !selectedRowsKeys.includes(item[rowKey])
    }))
    const list = allList.reduce((pre, cur) => {
      if (selectedRowKeys.includes(cur[rowKey])) {
        return pre.concat(cur)
      } else {
        return pre
      }
    }, [])
    setSelectedRows(list)
  }
  // 设置表格选中
  const setSelected = (val: any[]) => {
    setSelectedRows(val)
    const keys = val.reduce((pre, cur) => {
      return pre.concat(cur[rowKey])
    }, [])
    setSelectedRowKeys(keys)
  }
  // 表格勾选配置
  let rowSelection = baseProps.rowSelection || Object.assign({
    selectedRowKeys,
    onChange: onSelectChange,
  }, baseProps.rowSelection)


  // 供父组件调用的方法
  useImperativeHandle(ref, () => ({
    // 查询表格数据
    handleFilter: (page: number = 1, pageSize: number = 10) => {
      dispatch({
        type: "SET_PAGINATION",
        payload: {
          pagination: { ...state.pagination,page,pageSize},
        },
      });
      fetchData({ ...state.pagination, page, pageSize }, dispatch)
    },
    // 获取表格勾选中的行信息
    getSelectedRows:()=>selectedRows
  }))

  return (
    <Table
      columns={columns}
      dataSource={state.dataSource}
      pagination={pagination}
      rowSelection={rowSelection}
      {...baseProps}
    />
  );
};
export default forwardRef(HTable);

