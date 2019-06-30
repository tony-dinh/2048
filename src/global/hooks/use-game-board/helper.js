import directions from 'global/constants/directions'
import {randomInt} from 'global/utils/random'

export const randomInitialValue = () => randomInt(0, 1) ? 2 : 4

export const randomlyInsertValue = (board, value) => {
    const b = board.clone()
    const availableCoords = b.emptyCoords

    if (!availableCoords.length) {
        throw new Error('[randomlyInsertValue]: Could not insert value because board is full.')
    }

    // Determine the random indices to insert the value
    const {n, m} = availableCoords[randomInt(0, availableCoords.length - 1)]
    b[n] = [...b[n]]
    b[n][m] = value

    return b
}

export const shiftRowRight = (row) => {
    let lastSeen = null
    const values = row.reduceRight((values, v, i) => {
        if (lastSeen !== null && values[lastSeen] === v) {
            values[lastSeen] *= 2
            values[i] = null
            lastSeen = null

        } else if (v) {
            values[i] = v
            lastSeen = i

        } else {
            values[i] = v
        }

        return values
    }, [])
    .filter(v => v)

    values.unshift.apply(values, new Array(row.length - values.length).fill(null))

    return values
}

export const shiftRowLeft = (row) => {
    let lastSeen = null
    const values = row.reduce((values, v, i) => {
        if (lastSeen !== null && values[lastSeen] === v) {
            values[lastSeen] *= 2
            values[i] = null
            lastSeen = null

        } else if (v) {
            values[i] = v
            lastSeen = i

        } else {
            values[i] = v
        }

        return values
    }, [])
    .filter(v => v)

    values.push.apply(values, new Array(row.length - values.length).fill(null))

    return values
}

export const shift = (board, direction) => {
    switch (direction) {
        case directions.UP:
        case directions.DOWN: {
            let matrix = board.clone()
            matrix.rotateLeft()
            const shiftDirection = direction === directions.DOWN ? shiftRowRight : shiftRowLeft
            matrix.transformRows(shiftDirection)

            return matrix.rotateRight()
        }

        case directions.LEFT:
        case directions.RIGHT: {
            let matrix = board.clone()
            const shiftDirection = direction === directions.LEFT ? shiftRowLeft : shiftRowRight

            return matrix.transformRows(shiftDirection)
        }

        default:
            return board
    }
}

export const hasRemainingMoves = (board) => {
    const size = board.length
    let canShift = false

    for (let i = 0; i < size; i++) {
        if (canShift) {
            break
        }

        for (let j = 0; j < size; j++) {
            const value = board[i][j]
            canShift = !value ? true : canShift

            if (canShift) {
                break
            }

            const moves = []

            if (i !== 0) {
                moves.push(board[i - 1][j]) // up
            }

            if (i !== (size - 1)) {
                moves.push(board[i + 1][j]) // down
            }

            if (j !== 0) {
                moves.push(board[i][j - 1]) // left
            }

            if (j !== (size - 1)) {
                moves.push(board[i][j + 1]) // right
            }

            canShift = moves.some((neighbor) => neighbor === value)
        }
    }

    return canShift
}

/**
 * @param {Matrix} board
 */
export const setupGameBoard = (board) => {
    // We insert values into two random indices on the game board
    let b = board
    b = randomlyInsertValue(b, randomInitialValue())
    b = randomlyInsertValue(b, randomInitialValue())

    return b
}
