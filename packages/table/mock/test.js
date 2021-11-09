const dataSource = [
    {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
            "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
        key: 3,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
    },
    {
        key: 4,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
            "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
        key: 5,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
        key: 6,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
            "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
        key: 7,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
    },
    {
        key: 8,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
            "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
        key: 9,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
        key: 10,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
            "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
        key: 11,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
    },
    {
        key: 12,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
            "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
        key: 13,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
        key: 14,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
            "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
        key: 15,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
    },
    {
        key: 16,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
            "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
        key: 17,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
        key: 18,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
            "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
        key: 19,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
    },
    {
        key: 20,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
            "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    }]

export const getDataList = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (query.page && query.pageSize) {
                const page = query.page
                const pageSize = query.pageSize
                const result = {
                    code: 200,
                    list: dataSource.slice((page - 1) * pageSize, page * pageSize),
                    allCount: dataSource.length
                }
                resolve(result)
            } else {
                reject({
                    code: 9999,
                    msg: 'error'
                })
            }

        }, 1000)
    })

}