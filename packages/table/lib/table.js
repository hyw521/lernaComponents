import React from "react";
import { Table } from "antd";
import 'antd/dist/antd.css';
const HTable = (props) => {
    const { columns, dataSource } = props;
    return (React.createElement(Table, { columns: columns, dataSource: dataSource }));
};
export { HTable };
//# sourceMappingURL=table.js.map