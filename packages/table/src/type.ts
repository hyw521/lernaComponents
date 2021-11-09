/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { TableProps } from 'antd/lib/table';
export interface initStateProps<T>{
    pagination: {
        page: number,
        pageSize: number,
        total: number,
    },
    dataSource: T[],
}
export interface tableProps<T> extends TableProps<T> {
    initState: initStateProps<T>,
    fetchData: (state: any, dispatch: Function) => Promise<void>,
    ref:any,
}