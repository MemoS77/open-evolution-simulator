import Point from "./point"

export type CompatibleEngines = {
    id: string
    versions: number[]
}

// Config for engine
export default interface EngineParams {
    name: string
    size: Point
    compatibleEngines?: CompatibleEngines[]
    // If bot move to the right border, it will be moved to the left border
    infinityX?: boolean
    // If bot move to the bottom border, it will be moved to the top border
    infinityY?: boolean
    // Count of objects on the field
    count?: number
    // Other params
    conf?: object
}