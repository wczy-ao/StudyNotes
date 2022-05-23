```js
let arr = [{
                id: 1,
                name: '部门1',
                pid: 0
            },
            {
                id: 2,
                name: '部门2',
                pid: 1
            },
            {
                id: 3,
                name: '部门3',
                pid: 1
            },
            {
                id: 4,
                name: '部门4',
                pid: 3
            },
            {
                id: 5,
                name: '部门5',
                pid: 4
            },
        ]

        function getTree(params) {
            const result = [],
                mapItem = {};
            for (let item of params) {
                mapItem[item.id] = {
                    ...item,
                    children: []
                }
            }
            for (let item of params) {
                const {
                    id,
                    pid
                } = item
                let treeItem = mapItem[id]

                if (pid === 0) {
                    result.push(treeItem)
                } else {
                    mapItem[pid].children.push(treeItem)
                }
            }
            return result

        }

        let res = getTree(arr)
```

