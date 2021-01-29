export default class Vector3d {

    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    get length() {
        return '_length' in this ? this._length : (this._length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z))
    }

    get normal() {
        return '_normal' in this ? this._normal : (this.length > 0 ? (this._normal = new Vector3d(this.x / this.length, this.y / this.length, this.z / this.length)) : (this._normal = new Vector3d(0, 0, 0)))
    }

    plus(vector3d) {
        return new Vector3d(
            this.x + vector3d.x,
            this.y + vector3d.y,
            this.z + vector3d.z
        )
    }

    minus(vector3d) {
        return new Vector3d(
            this.x - vector3d.x,
            this.y - vector3d.y,
            this.z - vector3d.z
        )
    }

    times(scalar) {
        return new Vector3d(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        )
    }

    cross(vector3d) {
        return new Vector3d(
            this.y * vector3d.z - this.z * vector3d.y,
            this.z * vector3d.x - this.x * vector3d.z,
            this.x * vector3d.y - this.y * vector3d.x
        )
    }
}