import Point from "../../types/point"

export interface Planet {
    mass: number
    position: Point
    velocity: Point
    color: string
    radius: number
    exists: boolean
}

export type SpaceConf = {
    maxMass: number
}