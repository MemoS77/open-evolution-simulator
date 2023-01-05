import {FourDirection} from "../../../enums/four-direction"
import Point from "../../../types/point"
import {initCellDraw} from "./common"
import {dPadding, innerCellSize} from "../../cell-engine"

export default function stem(ctx: CanvasRenderingContext2D, direction: FourDirection, position: Point,  borderColor: string, color: string): void {
    const {x, y} = initCellDraw(ctx, position, borderColor, color)

    // Два прямоугольника крест на крест
    const d = dPadding
    ctx.beginPath()
    ctx.rect(x, y+d, innerCellSize, innerCellSize-d*2)
    ctx.rect(x+d, y, innerCellSize-d*2, innerCellSize)
    ctx.fill()
    ctx.stroke()
}

