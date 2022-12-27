import Point from "../types/point"

export default interface FieldInfo {
    name: string
    // If bot move to the right border, it will be moved to the left border
    infinityX: boolean
    // If bot move to the bottom border, it will be moved to the top border
    infinityY: boolean
    size: Point
}