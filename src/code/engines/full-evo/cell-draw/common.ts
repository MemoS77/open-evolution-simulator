import Point from "../../../types/point"
import {cellPadding, drawCellSize} from "../../cell-engine"
import {globalVars} from "../../../inc/const"

export function initCellDraw(ctx: CanvasRenderingContext2D, position: Point, borderColor: string, color: string): Point {
    const cx = position.x * drawCellSize + globalVars.camera.x + cellPadding
    const cy = position.y * drawCellSize + globalVars.camera.y + cellPadding
    ctx.strokeStyle = borderColor
    ctx.fillStyle = color
    ctx.setLineDash([])
    ctx.lineWidth = 1.5
    return {x: cx, y: cy}
}

