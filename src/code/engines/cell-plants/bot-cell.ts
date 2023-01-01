import {BotCellKind,  Direction} from "./enums"
import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"
import {cellPadding, drawCellSize} from "../cell-engine"
import {globalVars} from "../../inc/const"
import Bot from "./bot"

export default abstract class BotCell {
    position: Point
    protected readonly abstract kind: BotCellKind
    private owner: Bot // Организм, которому принадлежит эта клетка
    color: string
    protected direction: Direction

    constructor(direction: Direction, position: Point, owner: Bot) {
        this.position = position
        this.color = randomColor()
        this.owner = owner
        this.direction = direction
    }

    getKind(): BotCellKind {
        return this.kind
    }

    getEnergy(): number {
        return this.owner.getCellEnergy()
    }


    protected initCellDraw(ctx: CanvasRenderingContext2D, commonColor: string): Point {
        const cx = this.position.x * drawCellSize + globalVars.camera.x + cellPadding
        const cy = this.position.y * drawCellSize + globalVars.camera.y + cellPadding
        ctx.fillStyle = commonColor
        ctx.strokeStyle = this.color
        ctx.setLineDash([])
        return {x: cx, y: cy}
    }

    abstract draw(ctx: CanvasRenderingContext2D, commonColor: string): void
}