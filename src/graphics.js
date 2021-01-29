import Camera from './camera'
import Canvas from './canvas'
import Vector3d from './vector3d'

export default class Graphics {

    constructor(id) {
        this._canvas = new Canvas(id)
        this._camera = new Camera()
    }

    get worldToCamera() {
        return '_worldToCamera' in this ? this._worldToCamera : (this._worldToCamera = this.cameraToWorld.inverse)
    }

    get cameraToWorld() {
        return '_cameraToWorld' in this ? this._cameraToWorld : (this._cameraToWorld = this._camera.cameraToWorld)
    }

    draw(scene) {
        scene.triangles.forEach(triangle => {
            this._drawTriangle(triangle)
        })
        this._canvas.repaint()
    }

    _edge(vertex1, vertex2, point) {
        return (point.x - vertex1.x) * (vertex2.y - vertex1.y) - (point.y - vertex1.y) * (vertex2.x - vertex1.x)
    }

    _drawTriangle(triangle) {
        // Project vetices of the triangle onto raster space
        let vertex1 = this._project(triangle[0])
        let vertex2 = this._project(triangle[1])
        let vertex3 = this._project(triangle[2])

        // Compute the 2D bounds of the triangle
        let minX = Math.max(0, Math.min(vertex1.x, vertex2.x, vertex3.x));
        let minY = Math.max(0, Math.min(vertex1.y, vertex2.y, vertex3.y));
        let maxX = Math.min(Math.max(vertex1.x, vertex2.x, vertex3.x), this._canvas.width);
        let maxY = Math.min(Math.max(vertex1.y, vertex2.y, vertex3.y), this._canvas.height);

        // Rasterization of the triangle
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                let point = new Vector3d(x, y, 0) // TODO replace with Vector2d?

                // Calculate weights from the edge function, short-circuiting if the point is outside triangle
                let weight1 = this._edge(vertex1, vertex2, point)
                if (weight1 < 0) continue
                let weight2 = this._edge(vertex2, vertex3, point)
                if (weight2 < 0) continue
                let weight3 = this._edge(vertex3, vertex1, point)
                if (weight3 < 0) continue

                // Calculate the barycentric coordinates
                let area = this._edge(vertex1, vertex2, vertex3)
                let barycentric1 = weight1 / area
                let barycentric2 = weight2 / area
                let barycentric3 = weight3 / area
                
                // Shade the point according to the barycentric coordinate
                let pixel = this._canvas[x][y]
                pixel.R = Math.floor(255 * barycentric1)
                pixel.G = Math.floor(255 * barycentric2)
                pixel.B = Math.floor(255 * barycentric3)
            }
        }
    }

    _project(vector3d) {
        // Project onto screen space
        let vector = this.worldToCamera.times(vector3d)
        let x = vector.x / -vector.z
        let y = vector.y / -vector.z

        // NDC space defined on [-1, 1]
        let normalX = (x + 1) / 2
        let normalY = (y + 1) / 2

        // Convert to raster space, maintaining z-coordinate to solve visibility problem
        let rasterX = Math.floor(normalX * this._canvas.width)
        let rasterY = Math.floor((1 - normalY) * this._canvas.height)
        return new Vector3d(rasterX, rasterY, -vector3d.z)
    }
}