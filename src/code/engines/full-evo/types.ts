import {CellActionKind} from "./enums"

export type WorldParams = {
    // Extra params
}

export type Cell = {
    energy: number,
    organic: number,
    bots: number[]
}


export type CellAction = {
    kind: CellActionKind,
    param: number
}



