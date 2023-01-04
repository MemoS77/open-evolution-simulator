import {FourDirection} from "../../../enums/four-direction"
import Point from "../../../types/point"
import {initCellDraw} from "./common"
import {innerCellSize} from "../../cell-engine"

export default function stem(ctx: CanvasRenderingContext2D, direction: FourDirection, position: Point,  commonColor: string, color: string): void {
    const {x, y} = initCellDraw(ctx, position, commonColor, color)
    ctx.fillRect(x, y, innerCellSize, innerCellSize)
    ctx.lineWidth = 1
    ctx.strokeRect(x, y, innerCellSize, innerCellSize)
    // Утолщение спереди
    switch (direction) {
    case FourDirection.Up:
        ctx.strokeRect(x, y, innerCellSize, 2)
        break
    case FourDirection.Down:
        ctx.strokeRect(x, y + innerCellSize - 2, innerCellSize, 2)
        break
    case FourDirection.Left:
        ctx.strokeRect(x, y, 2, innerCellSize)
        break
    case FourDirection.Right:
        ctx.strokeRect(x + innerCellSize - 2, y, 2, innerCellSize)
        break


    }
}

