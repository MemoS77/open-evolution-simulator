import {FourDirection} from "../../../enums/four-direction"
import Point from "../../../types/point"
import {initCellDraw} from "./common"
import {dPadding, innerCellSize} from "../../cell-engine"

export default function leaf(ctx: CanvasRenderingContext2D, direction: FourDirection, position: Point,  commonColor: string, color: string): void {
    const {x, y} = initCellDraw(ctx, position, commonColor, color)
    ctx.beginPath()
    // Закругленный треугольник в зависимости от this.direction
    switch (direction) {
    case FourDirection.Down:
        // Полуэлипс от начала клетки и до конца
        ctx.ellipse(x+innerCellSize/2, y, innerCellSize / 2 - dPadding, innerCellSize - dPadding, 0, 0, Math.PI)
        break
    case FourDirection.Left:
        ctx.ellipse(x+innerCellSize, y+innerCellSize/2, innerCellSize - dPadding, innerCellSize/2- dPadding, 0,  Math.PI/2, Math.PI*1.5)
        break
    case FourDirection.Up:
        ctx.ellipse(x+innerCellSize/2, y+innerCellSize, innerCellSize / 2- dPadding, innerCellSize - dPadding, 0, Math.PI, 0)
        break
    case FourDirection.Right:
        ctx.ellipse(x, y+innerCellSize/2, innerCellSize- dPadding, innerCellSize/2 - dPadding, 0,  Math.PI*1.5, Math.PI/2)
        break
    }
    ctx.fill()
    ctx.stroke()
}


