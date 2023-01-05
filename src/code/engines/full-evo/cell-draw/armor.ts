import {FourDirection} from "../../../enums/four-direction"
import Point from "../../../types/point"
import {dPadding, innerCellSize} from "../../cell-engine"
import {initCellDraw} from "./common"

export default function armor(ctx: CanvasRenderingContext2D, direction: FourDirection, position: Point,  commonColor: string, color: string): void {
    const {x, y} = initCellDraw(ctx, position, commonColor, color)
    ctx.beginPath()
    // Треугольник в зависимости от this.direction
    switch (direction) {
    case FourDirection.Up:
        ctx.moveTo(x+ dPadding, y + innerCellSize)
        ctx.lineTo(x + innerCellSize / 2, y)
        ctx.lineTo(x + innerCellSize - dPadding, y + innerCellSize)
        break
    case FourDirection.Right:
        ctx.moveTo(x, y+ dPadding)
        ctx.lineTo(x + innerCellSize, y + innerCellSize / 2)
        ctx.lineTo(x, y + innerCellSize - dPadding)
        break
    case FourDirection.Down:
        ctx.moveTo(x+ dPadding, y)
        ctx.lineTo(x + innerCellSize / 2, y + innerCellSize)
        ctx.lineTo(x + innerCellSize - dPadding, y)
        break
    case FourDirection.Left:
        ctx.moveTo(x + innerCellSize, y+ dPadding)
        ctx.lineTo(x, y + innerCellSize / 2)
        ctx.lineTo(x + innerCellSize, y + innerCellSize- dPadding)
        break
    }
    ctx.fill()
    ctx.stroke()
}