import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import useGameBoard from 'global/hooks/use-game-board'

const Game = () => {
    const {board, canShift, lastMove} = useGameBoard()
    useEffect(() => { !canShift && console.log('GAME OVER') }, [canShift])

    return (
        <div>
            {board.max}
            {lastMove}
        </div>
    )
}

Game.propTypes = {
    /* Defines the dimension n of the n x n grid */
    size: PropTypes.number
}

export default Game
