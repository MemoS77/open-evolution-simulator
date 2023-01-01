import {CellActionKind} from "./enums"
import BotCell from "./bot-cell"

export type WorldParams = {
    // Extra params
}

export type Cell = {
    energy: number,
    organic: number,
    poison: boolean,
    botCell?: BotCell | null
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

