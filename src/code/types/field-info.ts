import Point from "./point"

export type CompatibleEngines = {
    id: string
    versions: number[]
}

export default interface Field {
    name: string
    compatibleEngines?: CompatibleEngines[]
    // If bot move to the right border, it will be moved to the left border
    infinityX: boolean
    // If bot move to the bottom border, it will be moved to the top border
    infinityY: boolean
    size: Point
}