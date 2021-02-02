import Graphics from './graphics'
import Scene from './scene'
import Vector3d from './vector3d'
import Triangle from './triangle'
import Shape from './shape'
import {MatrixTranslate, MatrixRotateY, MatrixRotateX} from './transform'
import './assets/css/style.css'

const graphics = new Graphics('canvas')

const vertices = [
    new Vector3d(-0.5, 0.5, -0.5),
    new Vector3d(0.5, 0.5, -0.5),
    new Vector3d(-0.5, 0.5, 0.5),
    new Vector3d(0.5, 0.5, 0.5),
    new Vector3d(-0.5, -0.5, -0.5),
    new Vector3d(0.5, -0.5, -0.5),
    new Vector3d(-0.5, -0.5, 0.5),
    new Vector3d(0.5, -0.5, 0.5)
]

const cube = [
    new Triangle(vertices[0], vertices[2], vertices[1]),
    new Triangle(vertices[0], vertices[4], vertices[2]),
    new Triangle(vertices[0], vertices[1], vertices[4]),
    new Triangle(vertices[3], vertices[1], vertices[2]),
    new Triangle(vertices[3], vertices[2], vertices[7]),
    new Triangle(vertices[3], vertices[7], vertices[1]),
    new Triangle(vertices[5], vertices[4], vertices[1]),
    new Triangle(vertices[5], vertices[7], vertices[4]),
    new Triangle(vertices[5], vertices[1], vertices[7]),
    new Triangle(vertices[6], vertices[2], vertices[4]),
    new Triangle(vertices[6], vertices[7], vertices[2]),
    new Triangle(vertices[6], vertices[4], vertices[7])
]

/*
const triangle = new Triangle(
    new Vector3d(0, 1, -3),
    new Vector3d(-1, -1, -2),
    new Vector3d(1, -1, -2)
)
*/

const shape = new Shape(cube)

const transform = new MatrixTranslate(new Vector3d(0, 0, -2)).times(new MatrixRotateX(45)).times(new MatrixRotateY(45))

shape.transform(transform)

const scene = new Scene()
scene.triangles = cube

graphics.draw(scene)
