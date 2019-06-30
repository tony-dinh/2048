import Matrix from './index'

test(`Matrix.rotateLeft`, () => {
    [
        {input: [1], expected: [1]},
        {input: [[1, 2], [3, 4]], expected: [[2, 4], [1, 3]]},
        {input: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ], expected: [
            [3, 6, 9],
            [2, 5, 8],
            [1, 4, 7]
        ]},
    ].forEach(({input, expected}) => {
        expect(JSON.stringify((new Matrix(input)).rotateLeft())).toEqual(JSON.stringify(expected))
    })
})
test(`Matrix.rotateRight`, () => {
    [
        {input: [1], expected: [1]},
        {input: [[1, 2], [3, 4]], expected: [[3, 1], [4, 2]]},
        {input: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ], expected: [
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3]
        ]},
    ].forEach(({input, expected}) => {
        expect(JSON.stringify((new Matrix(input)).rotateRight())).toEqual(JSON.stringify(expected))
    })
})

test(`Matrix.transformRows`, () => {
    [
        {input: [0], expected: [0]},
        {input: [[1, 2], [3, 4]], expected: [[2, 4], [6, 8]]},
        {input: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ], expected: [
            [2, 4, 6],
            [8, 10, 12],
            [14, 16, 18]
        ]},
    ].forEach(({input, expected}) => {
        const transformRow = (row) => {
            if (!Array.isArray(row)) {
                return row
            }

            return row.map((val) => val * 2)
        }
        expect(
            JSON.stringify((new Matrix(input)).transformRows(transformRow))
        ).toEqual(
            JSON.stringify(expected)
        )
    })
})
