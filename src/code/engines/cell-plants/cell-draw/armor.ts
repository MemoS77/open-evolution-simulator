import {FourDirection} from "../../../enums/four-direction"
import Point from "../../../types/point"
import {innerCellSize} from "../../cell-engine"
import {initCellDraw} from "./common"

export default function armor(ctx: CanvasRenderingContext2D, direction: FourDirection, position: Point,  commonColor: string, color: string): void {
    const {x, y} = initCellDraw(ctx, position, commonColor, color)
    ctx.beginPath()
    // Прямоугольник в зависимости от this.direction
    switch (direction) {
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