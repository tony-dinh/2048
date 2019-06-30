import {useEffect, useState} from 'react'
import useKeyPress from 'hook-book/use-keypress'
import useDebounce from 'hook-book/use-debounce'
import directions from 'global/constants/directions'
import Matrix from 'global/utils/matrix'
import {
    hasRemainingMoves,
    randomInitialValue,
    randomlyInsertValue,
    setupGameBoard,
    shift
} from './helper'

const useGameBoard = (size = 4) => {
    const {ArrowUp, ArrowDown, ArrowLeft, ArrowRight} = useKeyPress()
    const [gridState, setGrid] = useState(new Matrix(size))
    const grid = useDebounce(gridState, 500)
    const [canShift, setCanShift] = useState(hasRemainingMoves(grid))
    const [lastMove, setLastMove] = useState(null)

    // Initialize the gameboard when the board is mounted
    useEffect(() => { setGrid(grid => setupGameBoard(grid)) }, [])

    // Logger to track changes of the grid
    useEffect(() => {
        console.clear()
        console.table(grid)

        if (!hasRemainingMoves(grid)) {
            setCanShift(false)
        }
    }, [grid])

    // Handle key interactions
    useEffect(() => {
        const direction = {
            [ArrowUp]: directions.UP,
            [ArrowDown]: directions.DOWN,
            [ArrowLeft]: directions.LEFT,
            [ArrowRight]: directions.RIGHT
        }.true

        if (!direction || !canShift) {
            return
        }

        setLastMove(direction)

        setGrid(grid => {
            let board = grid
            board = shift(board, direction)

            try {
                board = randomlyInsertValue(board, randomInitialValue())
            } catch (e) {
                // board is full
            }

            return board
        })
    }, [ArrowUp, ArrowDown, ArrowLeft, ArrowRight, canShift])

    return {board: grid, canShift, lastMove}
}

export default useGameBoard
