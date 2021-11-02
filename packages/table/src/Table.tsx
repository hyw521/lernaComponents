import React, { useEffect, useState } from "react";
import { Table } from "antd";
import 'antd/dist/antd.css';
import { tableProps } from "./type";


const HTable = (props:tableProps) => {
  const {columns,dataSource} = props

  return (
    <Table 
    columns={columns}
    dataSource={dataSource}
     />
  );
};
export { HTable };

