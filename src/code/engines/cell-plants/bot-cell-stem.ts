import {BotCellKind} from "./enums"
import {innerCellSize} from "../cell-engine"
import BotCell from "./bot-cell"

export default class BotCellStem extends BotCell {
    readonly kind = BotCellKind.Stem

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        const {x, y} = this.initCellDraw(ctx, color)
        ctx.fillRect(x, y, innerCellSize, innerCellSize)
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, innerCellSize, innerCellSize)
    }

    cellAction(): boolean {
        return false
    }


}