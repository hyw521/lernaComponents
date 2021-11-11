import { TableProps } from 'antd/lib/table';
export interface initStateProps<T> {
    pagination: {
        page: number;
        pageSize: number;
        total: number;
    };
    dataSource: T[];
}
export interface tableProps<T> extends TableProps<T> {
    initState: initStateProps<T>;
    fetchData: (state: any, dispatch: Function) => Promise<void>;
    ref: any;
}
//# sourceMappingURL=type.d.ts.map