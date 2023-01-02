import {CellActionKind} from "./enums"
import Bot from "./bot"

export type WorldParams = {
    // Extra params
}

export type Cell = {
    energy: number,
    organic: number,
    poison: boolean,
    botCellIndex: number
    bot?: Bot | null
}


export type CellAction = {
    kind: CellActionKind,
    param: number
}

export type EnemyGen = {
    num: 0 | 1 | 2 | 3,
    gen: Gen
}

export type Gen = number[]

export type Genome = Array<Gen>

