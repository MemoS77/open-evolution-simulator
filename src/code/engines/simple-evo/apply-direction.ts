import {Direction} from "./enums"
import Point from "../../types/point"


export default function applyDirection(position: Point, direction: Direction, borders?: Point, steps = 1): Point {
    const {x, y} = position
    switch (direction) {
    case Direction.Up:
        return {x, y: y - steps}
    case Direction.Down:
        return {x, y: y + steps}
    case Direction.Left:
        return {x: x - steps, y}
    case Direction.Right:
        return {x: x + steps, y}
    default:
        return position
    }
}