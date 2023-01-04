import {FourDirection} from "../../../enums/four-direction"
import Point from "../../../types/point"
import {initCellDraw} from "./common"
import {innerCellSize} from "../../cell-engine"

export default function mouth(ctx: CanvasRenderingContext2D, direction: FourDirection, position: Point,  commonColor: string, color: string): void {
    const {x, y} = initCellDraw(ctx, position, commonColor, color)
    ctx.beginPath()
    // Треугольник в зависимости от this.direction
    switch (direction) {
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

