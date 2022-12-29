import {ActionMode, CellMode, Direction} from "./enums"

// Условия мира
export type EvoParams = {
    // Энергия бота по умолчанию при создании поля
    defaultEnergy: number,
    // Энергия, необходимая для размножения
    energyForReproduction: number,
    // Максимальная энергия бота. Больше набрать нельзя
    maxBotEnergy: number,
    // Количество энергии оставляемой ботом после смерти
    deathBotEnergy: number,
    // Максимальная энергия в ячейке
    maxCellEnergy: number,
    // Максимально органики в клетке
    maxCellOrganic: number
    // Максимальное время жизни бота
    maxLifeTime: number
}


export type Cell = {
    mode: CellMode,
    // Количество бесконечной энергии
    energy: number,
    // Количество органики (конечная энергия)
    organic: number,
}



// Действие которое доложен совершить бот после работы его геномы
export type BotAction = {
    direction: Direction,
    mode: ActionMode
}

export type CellBot = {
    id: string | false,
    energy: number,
}

export type CellBots = Array<Array<CellBot>>

