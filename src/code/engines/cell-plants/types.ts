import PlantBotCell from "./plant-bot-cell"

export type WorldParams = {
    // Extra params
}

export type Cell = {
    energy: number,
    organic: number,
    poison: boolean,
    botCell?: PlantBotCell | null
}

export type EnemyGen = {
    num: 0 | 1 | 2 | 3,
    gen: Gen
}

export type Gen = number[]

export type Genome = Array<Gen>

