import {BotCellKind} from "./enums"
import {innerCellSize} from "../cell-engine"
import BotCell from "./bot-cell"
import {FourDirection} from "../../enums/four-direction"

export default class BotCellArmor extends BotCell {
    readonly kind = BotCellKind.Armor

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        const {x, y} = this.initCellDraw(ctx, color)
        ctx.beginPath()
        // Прямоугольник в зависимости от this.direction
        switch (this.direction) {
        case FourDirection.Up:
            ctx.moveTo(x+ innerCellSize*0.25, y + innerCellSize)
            ctx.lineTo(x + innerCellSize*0.25, y)
            ctx.lineTo(x + innerCellSize*0.75, y )
            ctx.lineTo(x + innerCellSize*0.75, y + innerCellSize)
            break
        case FourDirection.Right:
            ctx.moveTo(x, y + innerCellSize*0.25)
            ctx.lineTo(x + innerCellSize, y + innerCellSize*0.25)
            ctx.lineTo(x + innerCellSize, y + innerCellSize*0.75)
            ctx.lineTo(x, y + innerCellSize*0.75)
            break
        case FourDirection.Down:
            ctx.moveTo(x + innerCellSize*0.25, y)
            ctx.lineTo(x + innerCellSize*0.25, y + innerCellSize)
            ctx.lineTo(x + innerCellSize*0.75, y + innerCellSize)
            ctx.lineTo(x + innerCellSize*0.75, y)
            break
        case FourDirection.Left:
            ctx.moveTo(x + innerCellSize, y + innerCellSize*0.25)
            ctx.lineTo(x, y + innerCellSize*0.25)
            ctx.lineTo(x, y + innerCellSize*0.75)
            ctx.lineTo(x + innerCellSize, y + innerCellSize*0.75)
            break
        }
        ctx.fill()
        ctx.stroke()
    }

    cellAction(): boolean {
        return false
    }
}