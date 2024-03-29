import {BotAction, Cell, CellBots, EvoParams} from "./types"
import Point from "../../types/point"
import {randID} from "./funcs"

export default abstract class Bot {
    energy: number
    position: Point // Текущее положение
    id: number
    lifeTime = 0
    generation = 0
    mutations = 0
    genome: number[]

    protected readonly params: EvoParams

    constructor(position: Point,  params: EvoParams) {
        this.position = position
        this.energy = params.defaultEnergy
        this.params = params
        this.id = randID()
        this.init()
    }

    abstract init(): void

    abstract getAction(cells?: Cell[][], bots?: CellBots): BotAction // Получить действие которое должен совершить бот

    reproduction(position: Point): Bot {
        this.energy = Math.floor(this.energy / 2)
        const newBot =  new (this.constructor as any)(position, this.params)
        newBot.id = this.id
        newBot.energy = this.energy
        newBot.generation = this.generation + 1
        newBot.mutations = this.mutations
        newBot.mutations+=newBot.copyGenome(this)
        return newBot
    }

    abstract copyGenome(parentBot: Bot): number // Копировать геном. Вернуть количество мутаций
}