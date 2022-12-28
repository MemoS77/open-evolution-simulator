import {BotAction, Cell, EvoParams} from "./types"
import Point from "../../types/point"
import uiid from "../../funcs/uiid"

export default abstract class Bot {
    energy: number
    position: Point // Текущее положение
    id: string
    private readonly params: EvoParams

    constructor(position: Point,  params: EvoParams) {
        this.position = position
        this.energy = params.defaultEnergy
        this.params = params
        this.id = uiid()
        this.init()
    }




    abstract init(): void

    isChild(bot: Bot): boolean { // Является ли бот родителем или потомком или даже частью одного организма
        return this.id === bot.id
    }
    abstract isRelated(bot: Bot): boolean // Похожий организм с незначительными отличиями

    abstract getAction(cells?: Cell[][], bots?: Bot[]): BotAction // Получить действие которое должен совершить бот

    reproduction(position: Point): Bot {
        this.energy = Math.floor(this.energy / 2)
        const newBot =  new (this.constructor as any)(position, this.params)
        console.log("reproduction", newBot)
        newBot.id = this.id
        newBot.energy = this.energy
        return newBot
    }
}