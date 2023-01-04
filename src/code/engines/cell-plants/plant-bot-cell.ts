import BotCell from "./bot-cell"
import {Gen} from "./plant-genome"
import {FourDirection} from "../../enums/four-direction"
import Point from "../../types/point"
import Bot from "./bot"
import {BotCellKind} from "./enums"

export default class PlantBotCell extends BotCell {
    gen: Gen

    constructor(direction: FourDirection, position: Point, owner: Bot, kind: BotCellKind, gen: Gen) {
        super(direction, position, owner, kind)
        this.gen = {
            rX: gen.rX,
            rY: gen.rY,
            rZ: gen.rZ,
            c: 0,
            code: [...gen.code],
            color: gen.color,
        }
    }

    override getColor(): string {
        return this.gen.color
    }


}