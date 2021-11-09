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

```tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import HTable from "./src/index.tsx";
import { getDataList } from "./mock/test";
export default () => {
  const tableRef: any = useRef();
  const fetchData = async (pagination, dispatch): Promise<void> => {
    const queryObj = {
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
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
  };
  const getTableList = useCallback(() => {
    tableRef.current.handleFilter(1, 10);
  }, []);
  useEffect(() => {
    getTableList();
  }, []);
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
  return <HTable columns={columns} fetchData={fetchData} ref={tableRef} />;
};
```

<API src="./src/index.tsx"></API>
