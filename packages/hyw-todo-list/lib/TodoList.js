import React, { useEffect, useState } from 'react';
const TodoList = () => {
    const [source, setSource] = useState([]);
    const init = () => {
        setSource([{ name: 'hyw', age: 24 }]);
    };
    useEffect(() => {
        init();
    }, []);
    return (React.createElement("ul", null, source.map((s, index) => React.createElement("li", { key: index }, s.name))));
};
//# sourceMappingURL=TodoList.js.map