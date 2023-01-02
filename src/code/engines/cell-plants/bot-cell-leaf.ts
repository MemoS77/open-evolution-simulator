import {BotCellKind} from "./enums"
import {innerCellSize} from "../cell-engine"
import BotCell from "./bot-cell"
import {FourDirection} from "../../enums/four-direction"

export default class BotCellLeaf extends BotCell {
    readonly kind = BotCellKind.Leaf

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        const {x, y} = this.initCellDraw(ctx, color)
        ctx.beginPath()
        // Закругленный треугольник в зависимости от this.direction
        switch (this.direction) {
        case FourDirection.Down:
            // Полуэлипс от начала клетки и до конца
            ctx.ellipse(x+innerCellSize/2, y, innerCellSize / 2, innerCellSize, 0, 0, Math.PI)
            break
        case FourDirection.Left:
            ctx.ellipse(x+innerCellSize, y+innerCellSize/2, innerCellSize, innerCellSize/2, 0,  Math.PI/2, Math.PI*1.5)
            break
        case FourDirection.Up:
            ctx.ellipse(x+innerCellSize/2, y+innerCellSize, innerCellSize / 2, innerCellSize, 0, Math.PI, 0)
            break
        case FourDirection.Right:
            ctx.ellipse(x, y+innerCellSize/2, innerCellSize, innerCellSize/2, 0,  Math.PI*1.5, Math.PI/2)
            break
        }
        ctx.fill()
        ctx.stroke()        
    }

    cellAction(): boolean {
        return false
    }


}