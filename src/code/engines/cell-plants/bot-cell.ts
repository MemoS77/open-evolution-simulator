import {BotCellKind, Direction} from "./enums"
import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"

export default class BotCell {
    private rX = 0
    private rY = 0
    private rZ = 0
    private energy = 0
    
    position: Point = {x: 0, y: 0}

    private kind: BotCellKind
    private parent: BotCell | null = null
    color: string

    constructor(kind: BotCellKind, direction: Direction, position: Point, energy: number, parent: BotCell | null) {
        this.position = position
        this.parent = parent
        this.kind = kind
        this.color = randomColor()
        this.energy = energy
    }




}