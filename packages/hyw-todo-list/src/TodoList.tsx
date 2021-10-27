import React, { useEffect, useState } from 'react';

type item = {
    name:string,
    age:number
}

const TodoList = () => {
    const [source, setSource] = useState<item[]>([]);
  
    const init = () => {
        setSource([{name:'hyw',age:24},{name:'xl',age:23}])
    };
    useEffect(() => {
      init();
    }, []);
  
    return (
      <ul>
        {
          source.map((s, index: number) => <li key={index}>{s.name}</li>)
        }
      </ul>
    )
}
export { TodoList }
  