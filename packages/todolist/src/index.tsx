import React, { useEffect, useState } from 'react';
import { item } from './type'


const TodoList = () => {
    const [source, setSource] = useState<item[]>([]);

    const init = () => {
        setSource([{ name: 'hyw', age: 24 }, { name: 'xl', age: 23 }])
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