---
nav:
  title: 组件
  path: /components
group:
  title: Table
  path: /table
  order: 3
---

# `Table`

> 描述

## 用法

```tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { message, Button } from "antd";
import "antd/dist/antd.css";
import HTable from "./esm";
import { getDataList } from "./mock/test";
import classnames from "classnames";
import "./style/md.less";
export default () => {
  const tableRef: any = useRef();
  const [loading, setLoading] = useState(true);
  const initState = {
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
    dataSource: [],
  };
  const fetchData = async (pagination, dispatch): Promise<void> => {
    setLoading(true);
    const queryObj = {
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
    try {
      const res = await getDataList(queryObj);
      if (res.code === 200) {
        const { list, allCount } = res;
        dispatch({
          type: "SET_PAGINATION",
          payload: {
            pagination: { ...pagination, total: allCount },
          },
        });
        dispatch({
          type: "SET_DATA_SOURCE",
          payload: {
            dataSource: list,
          },
        });
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  const getTableList = useCallback(() => {
    tableRef.current.handleFilter(1, 10);
  }, []);
  useEffect(() => {
    getTableList();
  }, []);
  // 获取表格行信息
  const handleGetRows = () => {
    const rows = tableRef.current.getSelectedRows();
    console.log(rows);
  };
  // 清空表格勾选
  const handleClearRows = () => {
    tableRef.current.handleSelectedRows([]);
  };
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
    },
  ];

  return (
    <>
      <div className={"btn-div"}>
        <Button
          type={"primary"}
          onClick={handleClearRows}
          style={{ marginRight: "10px" }}
        >
          清空勾选
        </Button>
        <Button type={"primary"} onClick={handleGetRows}>
          获取行信息
        </Button>
      </div>
      <HTable
        rowKey={"key"}
        columns={columns}
        fetchData={fetchData}
        ref={tableRef}
        loading={loading}
        initState={initState}
      />
    </>
  );
};
```

<API src="./src/index.tsx"></API>
