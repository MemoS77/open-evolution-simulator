import {BotCellKind} from "./enums"
import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"
import {cellPadding, drawCellSize} from "../cell-engine"
import {globalVars} from "../../inc/const"
import Bot from "./bot"
import {FourDirection} from "../../enums/four-direction"

export default abstract class BotCell {
    position: Point
    protected readonly abstract kind: BotCellKind
    owner: Bot // Организм, которому принадлежит эта клетка
    color: string
    public direction: FourDirection
    public children: number[]
    public alive: boolean

    constructor(direction: FourDirection, position: Point, owner: Bot) {
        this.position = position
        this.color = randomColor()
        this.owner = owner
        this.direction = direction
        this.children = []
        this.alive = true
    }

    haveChildren(): boolean {
        return this.children.length > 0
    }

    // Главное действие, различается для каждого типа клетки. Возвращает true, если действие было выполнено успешно
    abstract cellAction(): boolean

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