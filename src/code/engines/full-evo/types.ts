import {CellActionKind} from "./enums"

export type WorldParams = {
    // Extra params
    centerNotEnergy?: boolean
}

export type Cell = {
    energy: number,
    organic: number,
    bots: number[]
}

export type Gen = number[]

export type Genome = Gen[]

export type CellAction = {
    kind: CellActionKind,
    param: number
}



