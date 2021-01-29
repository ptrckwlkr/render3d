import Graphics from './graphics'
import Scene from './scene'
import Vector3d from './vector3d'
import Triangle from './triangle'
import './assets/css/style.css'

const graphics = new Graphics('canvas')

const triangle = new Triangle(
    new Vector3d(0, 1, -3),
    new Vector3d(-1, -1, -3),
    new Vector3d(1, -1, -3)
)
const scene = new Scene()
scene.triangles = [triangle]

graphics.draw(scene)
