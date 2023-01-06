import {CellActionKind} from "./enums"

export type WorldParams = {
    // Extra params
    centerNotEnergy?: boolean
    verticalNoEnergy?: boolean,
    goodBotsProbability?: number
}

export type Cell = {
    energy: number,
    organic: number,
    bots: number[]
}

export type drawColors = {
    color: string,
    borderColor: string
}

export type Gen = {
    code: number[],
    color: string,
    mutations: number
}

export type Genome = Gen[]

export type CellAction = {
    kind: CellActionKind,
    param: number
}



