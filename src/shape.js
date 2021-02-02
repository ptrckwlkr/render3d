export default class Shape {
    constructor(triangles) {
        this._triangles = triangles
    }

    transform(matrix) {
        this._triangles.forEach(triangle => {
            triangle[0] = matrix.times(triangle[0])
            triangle[1] = matrix.times(triangle[1])
            triangle[2] = matrix.times(triangle[2])
        })
    }
}
