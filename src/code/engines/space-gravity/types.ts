import Point from "../../types/point"
import Color from "./color"

export interface Planet {
    mass: number
    position: Point
    velocity: Point
    color: Color
    radius: number
    exists: boolean
}

export type SpaceConf = {
    maxMass: number
    glueDistance: number
    densityConst: number // 0-1. Чем меньше, тем плотнее. 1 - радиус равен массе
    gravityConst: number
}

