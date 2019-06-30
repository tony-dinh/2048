/**
 * A square matrix, i.e. a 2D array with equal height and width.
 * @typedef {Array} Matrix
 */
class Matrix extends Array {
    /**
     * @param {number|Matrix} n
     */
    constructor(n) {
        // if it's an Array, we'll clone it
        if (Array.isArray(n)) {
            super(n.length)

            this.fill(null)
            this.forEach((_, i) => { this[i] = Array.isArray(n[i]) ? [...n[i]] : n[i] })
        } else {
            super(n)

            // Create an NxN matrix
            this.fill(null)
            this.forEach((_, i) => { this[i] = new Array(n).fill(null) })
        }
    }

    get emptyCoords() {
        return this.reduce((empty, row, n) => {
            row.forEach((v, m) => { !v && empty.push({n, m}) })
            return empty
        }, [])
    }

    get max() {
        return Math.max.apply(this, this.flatten())
    }

    /**
     * Creates a deep copy of the current instance
     * @returns {Matrix}
     */
    clone = () => new Matrix(this)


    /**
     * Transforms each row using the callback function.
     * @param {function} callback
     * @returns {Matrix}
     */
    transformRows = (callback = (x) => x) => {
        this.forEach((row, i) => { this[i] = callback(row, i) })
        return this
    }

    /**
     * Rotates a given n x n matrix 90deg counter clockwise in-place
     * @param {Matrix}
     * @returns {Matrix}
     */
    rotateLeft = () => {
        // Iterate through the matrix cycles.
        const size = this.length
        const cycles = Math.floor(size / 2)

        for (let c = 0; c < cycles; c++) {
            const i = (size - 1) - (c * 2)

            for (let j = c; j < i + c; j++) {
                // top = this[c][j]
                // left = this[(size - 1) - j][c]
                // bottom = this[(size - 1) - c][(size - 1) - j]
                // right = this[j][(size - 1) - c]

                const tmp = this[j][(size - 1) - c] // right

                this[j][(size - 1) - c] = this[(size - 1) - c][(size - 1) - j] // right = bottom
                this[(size - 1) - c][(size - 1) - j] = this[(size - 1) - j][c] // bottom = left
                this[(size - 1) - j][c] = this[c][j] // left = top
                this[c][j] = tmp // top = right
            }
        }

        return this
    }

    /**
     * Rotates a given n x n matrix 90deg clockwise in-place
     * @param {Matrix}
     * @returns {Matrix}
     */
    rotateRight = () => {
        // Iterate through the matrix cycles.
        const size = this.length
        const cycles = Math.floor(size / 2)

        for (let c = 0; c < cycles; c++) {
            const i = (size - 1) - (c * 2)

            for (let j = c; j < i + c; j++) {
                // top = this[c][j]
                // left = this[(size - 1) - j][c]
                // bottom = this[(size - 1) - c][(size - 1) - j]
                // right = this[j][(size - 1) - c]

                const tmp = this[j][(size - 1) - c] // right

                this[j][(size - 1) - c] = this[c][j] // right = top
                this[c][j] = this[(size - 1) - j][c] // top = left
                this[(size - 1) - j][c] = this[(size - 1) - c][(size - 1) - j] // left = bottom
                this[(size - 1) - c][(size - 1) - j] = tmp // bottom = right
            }
        }

        return this
    }

    /**
     * Returns a 1-dimension array with all the values of the matrix
     * @returns {Array}
     */
    flatten = () => [].concat(...this)
}

export default Matrix
