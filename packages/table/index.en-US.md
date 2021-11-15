---
nav:
  title: components
  path: /components
group:
  title: Table
  path: /table
  order: 3
---

# `Table`

> TODO: description
## useage

```tsx
import React, { useReducer, useEffect, useState, useRef } from "react";
import "antd/dist/antd.css";
import HTable from "./src/index.tsx";
import {getDataList} from './mock/test'
export default () => {
  const tableRef:any = useRef();
  const fetchData = async (state, dispatch): Promise<void> => {
    const queryObj = {
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
    };
    const res = await getDataList(queryObj);
    if (res.code === 200) {
      const { list, allCount } = res;
      dispatch({
        type: "SET_PAGINATION",
        payload: {
          pagination: { ...state.pagination, total: allCount },
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
