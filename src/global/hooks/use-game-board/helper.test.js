import Matrix from 'global/utils/matrix'
import directions from 'global/constants/directions'
import {shift, shiftRowRight, shiftRowLeft, hasRemainingMoves} from './helper'

test(`shiftRowRight`, () => {
    [
        {input: [null], expected: [null]},
        {input: [null, null], expected: [null, null]},
        {input: [null, 2, null], expected: [null, null, 2]},
        {input: [null, 2, 2], expected: [null, null, 4]},
        {input: [null, 2, 2, 4], expected: [null, null, 4, 4]},
        {input: [2, null, 2, 2, 4], expected: [null, null, 2, 4, 4]},
        {input: [2, null, 2, 2, 4, 4], expected: [null, null, null, 2, 4, 8]},
    ].forEach(({input, expected}) => {
        expect(JSON.stringify(shiftRowRight(input))).toEqual(JSON.stringify(expected))
    })
})

test(`shiftRowLeft`, () => {
    [
        {input: [null], expected: [null]},
        {input: [null, null], expected: [null, null]},
        {input: [null, 2, null], expected: [2, null, null]},
        {input: [null, 2, 2], expected: [4, null, null]},
        {input: [null, 2, 2, 4], expected: [4, 4, null, null]},
        {input: [2, null, 2, 2, 4], expected: [4, 2, 4, null, null]},
        {input: [2, null, 2, 2, 4, 4], expected: [4, 2, 8, null, null, null]},
    ].forEach(({input, expected}) => {
        expect(JSON.stringify(shiftRowLeft(input))).toEqual(JSON.stringify(expected))
    })
})

test(`shift(directions.UP)`, () => {
    const matrix = new Matrix([
        [2, 8, null, null],
        [null, null, null, null],
        [null, null, 2, null],
        [null, null, null, null],
    ])

    const actual = JSON.stringify(shift(matrix, directions.UP))
    const expected = JSON.stringify([
        [2, 8, 2, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ])

    expect(actual).toEqual(expected)
})

test(`hasRemainingMoves`, () => {
    const matrix = new Matrix([
        [8, 2, 8, 2],
        [4, 16, 2, 8],
        [32, 8, 4, 2],
        [4, 2, 4, 4]
    ])

    const actual = hasRemainingMoves(matrix)
    const expected = true

    expect(actual).toEqual(expected)
})
