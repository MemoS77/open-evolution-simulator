import {BotAction, EvoParams} from "./types"
import Point from "../../types/point"

export default abstract class Bot {
    energy: number
    position: Point // Текущее положение

    constructor(position: Point,  params: EvoParams) {
        this.position = position
        this.energy = params.defaultEnergy
    }

    abstract isRelative(): boolean // Является ли бот родителем или потомком или даже частью одного организма
    abstract isSimilar(): boolean // Похожий организм
    abstract getAction(): BotAction // Получить действие которое должен совершить бот



}