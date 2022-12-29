import {Direction} from "./enums"
import Point from "../../types/point"


export default function applyDirection(position: Point, direction: Direction, borders?: Point, steps = 1): Point {
    const {x, y} = position
    let res: Point
    switch (direction) {
    case Direction.Up:
        res =  {x, y: y - steps}
        break
    case Direction.Down:
        res = {x, y: y + steps}
        break
    case Direction.Left:
        res = {x: x - steps, y}
        break
    case Direction.Right:
        res = {x: x + steps, y}
        break
    default:
        res = {x, y}
        break
    }
    if (borders) {
        if (res.x < 0) res.x = 0
        if (res.x >= borders.x) res.x = borders.x-1
        if (res.y < 0) res.y = 0
        if (res.y >= borders.y) res.y = borders.y-1
    }

    return res
}