import Matrix from './matrix'
import Vector3d from './vector3d'

export default class Camera {
    constructor(options = {}) {
        this._position = options.position || new Vector3d(0, 0, 0)
        this._to = options.to || this._position.plus(new Vector3d(0, 0, -1))

        this._forward = this._position.minus(this._to).normal
        this._right = new Vector3d(0, 1, 0).cross(this._forward).normal
        this._up = this._forward.cross(this._right)

        this._angleOfView = options.angleOfView || 60
        this._height = options.height || 300
        this._width = options.width || 400
    }

    get cameraToWorld() {
        return new Matrix(
            this._right.x, this._up.x, this._forward.x, this._position.x,
            this._right.y, this._up.y, this._forward.y, this._position.y,
            this._right.z, this._up.z, this._forward.z, this._position.z,
            0, 0, 0, 1
        )
    }
}