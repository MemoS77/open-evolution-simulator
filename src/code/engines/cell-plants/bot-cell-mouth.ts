import {BotCellKind} from "./enums"
import {innerCellSize} from "../cell-engine"
import BotCell from "./bot-cell"
import {FourDirection} from "../../enums/four-direction"

export default class BotCellMouth extends BotCell {
    readonly kind = BotCellKind.Mouth

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        const {x, y} = this.initCellDraw(ctx, color)
        ctx.beginPath()
        // Треугольник в зависимости от this.direction
        switch (this.direction) {
        case FourDirection.Up:
            ctx.moveTo(x, y + innerCellSize)
            ctx.lineTo(x + innerCellSize / 2, y)
            ctx.lineTo(x + innerCellSize, y + innerCellSize)
            break
        case FourDirection.Right:
            ctx.moveTo(x, y)
            ctx.lineTo(x + innerCellSize, y + innerCellSize / 2)
            ctx.lineTo(x, y + innerCellSize)
            break
        case FourDirection.Down:
            ctx.moveTo(x, y)
            ctx.lineTo(x + innerCellSize / 2, y + innerCellSize)
            ctx.lineTo(x + innerCellSize, y)
            break
        case FourDirection.Left:
            ctx.moveTo(x + innerCellSize, y)
            ctx.lineTo(x, y + innerCellSize / 2)
            ctx.lineTo(x + innerCellSize, y + innerCellSize)
            break
        }
        ctx.fill()
        ctx.stroke()
    }

    cellAction(): boolean {
        return false
    }
}