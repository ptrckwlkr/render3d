/**
 * Set of transformation matrices as helper utilities
 */

import Matrix from './matrix'

class MatrixScale extends Matrix {
    constructor(scale) {
        super(
            scale, 0, 0, 0,
            0, scale, 0, 0,
            0, 0, scale, 0,
            0, 0, 0, 1
        )
    }
}

class MatrixTranslate extends Matrix {
    constructor(vector3d) {
        super(
            1, 0, 0, vector3d.x,
            0, 1, 0, vector3d.y,
            0, 0, 1, vector3d.z,
            0, 0, 0, 1
        )
    }
}

class MatrixRotateX extends Matrix {
    constructor(degrees) {
        let radians = degrees * Math.PI / 180
        super(
            1, 0, 0, 0,
            0, Math.cos(radians), -Math.sin(radians), 0,
            0, Math.sin(radians), Math.cos(radians), 0,
            0, 0, 0, 1
        )
    }
}

class MatrixRotateY extends Matrix {
    constructor(degrees) {
        let radians = degrees * Math.PI / 180
        super(
            Math.cos(radians), 0, Math.sin(radians), 0,
            0, 1, 0, 0,
            -Math.sin(radians), 0, Math.cos(radians), 0,
            0, 0, 0, 1
        )
    }
}

class MatrixRotateZ extends Matrix {
    constructor(degrees) {
        let radians = degrees * Math.PI / 180
        super(
            Math.cos(radians), -Math.sin(radians), 0, 0,
            Math.sin(radians), Math.cos(radians), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
    }
}

export { MatrixScale, MatrixTranslate, MatrixRotateX, MatrixRotateY, MatrixRotateZ }
