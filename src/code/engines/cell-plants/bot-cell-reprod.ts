import {BotCellKind, Direction} from "./enums"
import {innerCellSize} from "../cell-engine"
import BotCell from "./bot-cell"

export default class BotCellReprod extends BotCell {
    readonly kind = BotCellKind.Reprod

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        const {x, y} = this.initCellDraw(ctx, color)
        ctx.beginPath()
        // Прямоугольник в зависимости от this.direction
        switch (this.direction) {
        case Direction.Up:
            ctx.moveTo(x+ innerCellSize*0.25, y + innerCellSize)
            ctx.lineTo(x + innerCellSize*0.25, y)
            ctx.lineTo(x + innerCellSize*0.75, y )
            ctx.lineTo(x + innerCellSize*0.75, y + innerCellSize)
            break
        case Direction.Right:
            ctx.moveTo(x, y + innerCellSize*0.25)
            ctx.lineTo(x + innerCellSize, y + innerCellSize*0.25)
            ctx.lineTo(x + innerCellSize, y + innerCellSize*0.75)
            ctx.lineTo(x, y + innerCellSize*0.75)
            break
        case Direction.Down:
            ctx.moveTo(x + innerCellSize*0.25, y)
            ctx.lineTo(x + innerCellSize*0.25, y + innerCellSize)
            ctx.lineTo(x + innerCellSize*0.75, y + innerCellSize)
            ctx.lineTo(x + innerCellSize*0.75, y)
            break
        case Direction.Left:
            ctx.moveTo(x + innerCellSize, y + innerCellSize*0.25)
            ctx.lineTo(x, y + innerCellSize*0.25)
            ctx.lineTo(x, y + innerCellSize*0.75)
            ctx.lineTo(x + innerCellSize, y + innerCellSize*0.75)
            break
        }
        ctx.fill()
        ctx.stroke()
    }
}