import Point from "../../../types/point"
import {cellPadding, drawCellSize} from "../../cell-engine"
import {globalVars} from "../../../inc/const"

export function initCellDraw(ctx: CanvasRenderingContext2D, position: Point, commonColor: string, color: string): Point {
    const cx = position.x * drawCellSize + globalVars.camera.x + cellPadding
    const cy = position.y * drawCellSize + globalVars.camera.y + cellPadding
    ctx.fillStyle = commonColor
    ctx.strokeStyle = color
    ctx.setLineDash([])
    return {x: cx, y: cy}
}

