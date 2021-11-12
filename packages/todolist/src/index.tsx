import React, { useEffect, useState } from 'react';
import { item } from './type'


const TodoList = () => {
    const [source, setSource] = useState<item[]>([]);

    const init = () => {
        setSource([{ name: 'hh', age: 24 },{ name: 'yy', age: 24 }, { name: 'xx', age: 23 },{ name: 'll', age: 23 }])
    };
    useEffect(() => {
        init();
    }, []);

    return (
        <ul>
            {
                source.map((s: item, index: number) => <li key={index}>{s.name}</li>)
            }
        </ul>
    )
}
export default TodoList 