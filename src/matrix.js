import Vector3d from './vector3d'

export default class Matrix {

    constructor(a0, a1, a2, a3, b0, b1, b2, b3, c0, c1, c2, c3, d0, d1, d2, d3) {
        this[0] = [a0, a1, a2, a3]
        this[1] = [b0, b1, b2, b3]
        this[2] = [c0, c1, c2, c3]
        this[3] = [d0, d1, d2, d3]
    }
    
    get transpose() {
        return '_transpose' in this ? this._transpose : (this._transpose =
            new Matrix(
                this[0][0], this[1][0], this[2][0], this[3][0],
                this[0][1], this[1][1], this[2][1], this[3][1],
                this[0][2], this[1][2], this[2][2], this[3][2],
                this[0][3], this[1][3], this[2][3], this[3][3]
            )
        )
    }

    get determinant() {
        return '_determinant' in this ? this._determinant : (this._determinant =
            this[0][3] * this[1][2] * this[2][1] * this[3][0] -
            this[0][2] * this[1][3] * this[2][1] * this[3][0] -
            this[0][3] * this[1][1] * this[2][2] * this[3][0] +
            this[0][1] * this[1][3] * this[2][2] * this[3][0] +
            this[0][2] * this[1][1] * this[2][3] * this[3][0] -
            this[0][1] * this[1][2] * this[2][3] * this[3][0] -
            this[0][3] * this[1][2] * this[2][0] * this[3][1] +
            this[0][2] * this[1][3] * this[2][0] * this[3][1] +
            this[0][3] * this[1][0] * this[2][2] * this[3][1] -
            this[0][0] * this[1][3] * this[2][2] * this[3][1] -
            this[0][2] * this[1][0] * this[2][3] * this[3][1] +
            this[0][0] * this[1][2] * this[2][3] * this[3][1] +
            this[0][3] * this[1][1] * this[2][0] * this[3][2] -
            this[0][1] * this[1][3] * this[2][0] * this[3][2] -
            this[0][3] * this[1][0] * this[2][1] * this[3][2] +
            this[0][0] * this[1][3] * this[2][1] * this[3][2] +
            this[0][1] * this[1][0] * this[2][3] * this[3][2] -
            this[0][0] * this[1][1] * this[2][3] * this[3][2] -
            this[0][2] * this[1][1] * this[2][0] * this[3][3] +
            this[0][1] * this[1][2] * this[2][0] * this[3][3] +
            this[0][2] * this[1][0] * this[2][1] * this[3][3] -
            this[0][0] * this[1][2] * this[2][1] * this[3][3] -
            this[0][1] * this[1][0] * this[2][2] * this[3][3] +
            this[0][0] * this[1][1] * this[2][2] * this[3][3]
        )
    }

    get inverse() {
        if (this.determinant == 0) {
            throw 'The matrix is not invertible'
        }
        return '_inverse' in this ? this._inverse : (this._inverse =
            new Matrix(
                this[1][2] * this[2][3] * this[3][1] - this[1][3] * this[2][2] * this[3][1] + this[1][3] * this[2][1] * this[3][2] - this[1][1] * this[2][3] * this[3][2] - this[1][2] * this[2][1] * this[3][3] + this[1][1] * this[2][2] * this[3][3],
                this[0][3] * this[2][2] * this[3][1] - this[0][2] * this[2][3] * this[3][1] - this[0][3] * this[2][1] * this[3][2] + this[0][1] * this[2][3] * this[3][2] + this[0][2] * this[2][1] * this[3][3] - this[0][1] * this[2][2] * this[3][3],
                this[0][2] * this[1][3] * this[3][1] - this[0][3] * this[1][2] * this[3][1] + this[0][3] * this[1][1] * this[3][2] - this[0][1] * this[1][3] * this[3][2] - this[0][2] * this[1][1] * this[3][3] + this[0][1] * this[1][2] * this[3][3],
                this[0][3] * this[1][2] * this[2][1] - this[0][2] * this[1][3] * this[2][1] - this[0][3] * this[1][1] * this[2][2] + this[0][1] * this[1][3] * this[2][2] + this[0][2] * this[1][1] * this[2][3] - this[0][1] * this[1][2] * this[2][3],
                this[1][3] * this[2][2] * this[3][0] - this[1][2] * this[2][3] * this[3][0] - this[1][3] * this[2][0] * this[3][2] + this[1][0] * this[2][3] * this[3][2] + this[1][2] * this[2][0] * this[3][3] - this[1][0] * this[2][2] * this[3][3],
                this[0][2] * this[2][3] * this[3][0] - this[0][3] * this[2][2] * this[3][0] + this[0][3] * this[2][0] * this[3][2] - this[0][0] * this[2][3] * this[3][2] - this[0][2] * this[2][0] * this[3][3] + this[0][0] * this[2][2] * this[3][3],
                this[0][3] * this[1][2] * this[3][0] - this[0][2] * this[1][3] * this[3][0] - this[0][3] * this[1][0] * this[3][2] + this[0][0] * this[1][3] * this[3][2] + this[0][2] * this[1][0] * this[3][3] - this[0][0] * this[1][2] * this[3][3],
                this[0][2] * this[1][3] * this[2][0] - this[0][3] * this[1][2] * this[2][0] + this[0][3] * this[1][0] * this[2][2] - this[0][0] * this[1][3] * this[2][2] - this[0][2] * this[1][0] * this[2][3] + this[0][0] * this[1][2] * this[2][3],
                this[1][1] * this[2][3] * this[3][0] - this[1][3] * this[2][1] * this[3][0] + this[1][3] * this[2][0] * this[3][1] - this[1][0] * this[2][3] * this[3][1] - this[1][1] * this[2][0] * this[3][3] + this[1][0] * this[2][1] * this[3][3],
                this[0][3] * this[2][1] * this[3][0] - this[0][1] * this[2][3] * this[3][0] - this[0][3] * this[2][0] * this[3][1] + this[0][0] * this[2][3] * this[3][1] + this[0][1] * this[2][0] * this[3][3] - this[0][0] * this[2][1] * this[3][3],
                this[0][1] * this[1][3] * this[3][0] - this[0][3] * this[1][1] * this[3][0] + this[0][3] * this[1][0] * this[3][1] - this[0][0] * this[1][3] * this[3][1] - this[0][1] * this[1][0] * this[3][3] + this[0][0] * this[1][1] * this[3][3],
                this[0][3] * this[1][1] * this[2][0] - this[0][1] * this[1][3] * this[2][0] - this[0][3] * this[1][0] * this[2][1] + this[0][0] * this[1][3] * this[2][1] + this[0][1] * this[1][0] * this[2][3] - this[0][0] * this[1][1] * this[2][3],
                this[1][2] * this[2][1] * this[3][0] - this[1][1] * this[2][2] * this[3][0] - this[1][2] * this[2][0] * this[3][1] + this[1][0] * this[2][2] * this[3][1] + this[1][1] * this[2][0] * this[3][2] - this[1][0] * this[2][1] * this[3][2],
                this[0][1] * this[2][2] * this[3][0] - this[0][2] * this[2][1] * this[3][0] + this[0][2] * this[2][0] * this[3][1] - this[0][0] * this[2][2] * this[3][1] - this[0][1] * this[2][0] * this[3][2] + this[0][0] * this[2][1] * this[3][2],
                this[0][2] * this[1][1] * this[3][0] - this[0][1] * this[1][2] * this[3][0] - this[0][2] * this[1][0] * this[3][1] + this[0][0] * this[1][2] * this[3][1] + this[0][1] * this[1][0] * this[3][2] - this[0][0] * this[1][1] * this[3][2],
                this[0][1] * this[1][2] * this[2][0] - this[0][2] * this[1][1] * this[2][0] + this[0][2] * this[1][0] * this[2][1] - this[0][0] * this[1][2] * this[2][1] - this[0][1] * this[1][0] * this[2][2] + this[0][0] * this[1][1] * this[2][2]
            ).times(1 / this.determinant)
        )
    }

    plus(matrix) {
        return new matrix(
            this[0][0] + matrix[0][0], this[0][1] + matrix[0][1], this[0][2] + matrix[0][2], this[0][3] + matrix[0][3],
            this[1][0] + matrix[1][0], this[1][1] + matrix[1][1], this[1][2] + matrix[1][2], this[1][3] + matrix[1][3],
            this[2][0] + matrix[2][0], this[2][1] + matrix[2][1], this[2][2] + matrix[2][2], this[2][3] + matrix[2][3],
            this[3][0] + matrix[3][0], this[3][1] + matrix[3][1], this[3][2] + matrix[3][2], this[3][3] + matrix[3][3],
        )
    }

    minus(matrix) {
        return new matrix(
            this[0][0] - matrix[0][0], this[0][1] - matrix[0][1], this[0][2] - matrix[0][2], this[0][3] - matrix[0][3],
            this[1][0] - matrix[1][0], this[1][1] - matrix[1][1], this[1][2] - matrix[1][2], this[1][3] - matrix[1][3],
            this[2][0] - matrix[2][0], this[2][1] - matrix[2][1], this[2][2] - matrix[2][2], this[2][3] - matrix[2][3],
            this[3][0] - matrix[3][0], this[3][1] - matrix[3][1], this[3][2] - matrix[3][2], this[3][3] - matrix[3][3],
        )
    }

    times(object) {
        if (object instanceof Matrix) {
            return new Matrix(
                this[0][0] * object[0][0] + this[0][1] * object[1][0] + this[0][2] * object[2][0] + this[0][3] * object[3][0],
                this[0][0] * object[0][1] + this[0][1] * object[1][1] + this[0][2] * object[2][1] + this[0][3] * object[3][1],
                this[0][0] * object[0][2] + this[0][1] * object[1][2] + this[0][2] * object[2][2] + this[0][3] * object[3][2],
                this[0][0] * object[0][3] + this[0][1] * object[1][3] + this[0][2] * object[2][3] + this[0][3] * object[3][3],
                this[1][0] * object[0][0] + this[1][1] * object[1][0] + this[1][2] * object[2][0] + this[1][3] * object[3][0],
                this[1][0] * object[0][1] + this[1][1] * object[1][1] + this[1][2] * object[2][1] + this[1][3] * object[3][1],
                this[1][0] * object[0][2] + this[1][1] * object[1][2] + this[1][2] * object[2][2] + this[1][3] * object[3][2],
                this[1][0] * object[0][3] + this[1][1] * object[1][3] + this[1][2] * object[2][3] + this[1][3] * object[3][3],
                this[2][0] * object[0][0] + this[2][1] * object[1][0] + this[2][2] * object[2][0] + this[2][3] * object[3][0],
                this[2][0] * object[0][1] + this[2][1] * object[1][1] + this[2][2] * object[2][1] + this[2][3] * object[3][1],
                this[2][0] * object[0][2] + this[2][1] * object[1][2] + this[2][2] * object[2][2] + this[2][3] * object[3][2],
                this[2][0] * object[0][3] + this[2][1] * object[1][3] + this[2][2] * object[2][3] + this[2][3] * object[3][3],
                this[3][0] * object[0][0] + this[3][1] * object[1][0] + this[3][2] * object[2][0] + this[3][3] * object[3][0],
                this[3][0] * object[0][1] + this[3][1] * object[1][1] + this[3][2] * object[2][1] + this[3][3] * object[3][1],
                this[3][0] * object[0][2] + this[3][1] * object[1][2] + this[3][2] * object[2][2] + this[3][3] * object[3][2],
                this[3][0] * object[0][3] + this[3][1] * object[1][3] + this[3][2] * object[2][3] + this[3][3] * object[3][3]
            )
        }
        else if (object instanceof Vector3d) {
            return new Vector3d(
                object.x * this[0][0] + object.y * this[0][1] + object.z * this[0][2] + this[0][3],
                object.x * this[1][0] + object.y * this[1][1] + object.z * this[1][2] + this[1][3],
                object.x * this[2][0] + object.y * this[2][1] + object.z * this[2][2] + this[2][3],
                object.x * this[3][0] + object.y * this[3][1] + object.z * this[3][2] + this[3][3]
            )
        }
        else if (!(isNaN(object))) {
            return new Matrix(
                object * this[0][0], object * this[0][1], object * this[0][2], object * this[0][3],
                object * this[1][0], object * this[1][1], object * this[1][2], object * this[1][3],
                object * this[2][0], object * this[2][1], object * this[2][2], object * this[2][3],
                object * this[3][0], object * this[3][1], object * this[3][2], object * this[3][3]
            )
        }
        else {
            throw 'Parameter is not a matrix, vector, or scalar'
        }
    }

    toString() {
        let width = 0
        let str = ''
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                width = Math.max(width, this[i][j].toFixed(1).toString().length)
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                str += this[i][j].toFixed(1).toString().padStart(width + 2, ' ')
            }
            str += '\n'
        }
        return str
    }
}