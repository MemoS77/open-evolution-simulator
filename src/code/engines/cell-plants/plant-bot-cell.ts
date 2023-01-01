import {BotCellKind, Direction} from "./enums"
import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"
import {cellPadding, drawCellSize, innerCellSize} from "../cell-engine"
import {globalVars} from "../../inc/const"

export default class PlantBotCell {
    private rX = 0
    private rY = 0
    private rZ = 0
    private energy = 0
    
    position: Point = {x: 0, y: 0}

    private kind: BotCellKind
    private parent: PlantBotCell | null = null
    private child: PlantBotCell | null = null
    color: string
    private direction: Direction

    constructor(kind: BotCellKind, direction: Direction, position: Point, energy: number, parent: PlantBotCell | null) {
        this.position = position
        this.kind = kind
        this.color = randomColor()
        this.energy = energy
        this.child = null
        this.parent = parent
        this.direction = direction
    }

    public draw(ctx: CanvasRenderingContext2D, commonColor: string): void {
        // draw square cell
        const cx = this.position.x * drawCellSize + globalVars.camera.x + cellPadding
        const cy = this.position.y * drawCellSize + globalVars.camera.y + cellPadding
        ctx.fillStyle = commonColor
        ctx.strokeStyle = this.color
        ctx.setLineDash([])


        switch (this.kind) {

        case BotCellKind.Stem:

            ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
            ctx.lineWidth = cellPadding
            ctx.lineWidth = 1
            ctx.strokeRect(cx, cy, innerCellSize, innerCellSize)
            break



        case BotCellKind.Reprod:
            ctx.beginPath()
            // Прямоугольник в зависимости от this.direction
            switch (this.direction) {
            case Direction.Up:
                ctx.moveTo(cx+ innerCellSize*0.25, cy + innerCellSize)
                ctx.lineTo(cx + innerCellSize*0.25, cy)
                ctx.lineTo(cx + innerCellSize*0.75, cy )
                ctx.lineTo(cx + innerCellSize*0.75, cy + innerCellSize)
                break
            case Direction.Right:
                ctx.moveTo(cx, cy + innerCellSize*0.25)
                ctx.lineTo(cx + innerCellSize, cy + innerCellSize*0.25)
                ctx.lineTo(cx + innerCellSize, cy + innerCellSize*0.75)
                ctx.lineTo(cx, cy + innerCellSize*0.75)
                break
            case Direction.Down:
                ctx.moveTo(cx + innerCellSize*0.25, cy)
                ctx.lineTo(cx + innerCellSize*0.25, cy + innerCellSize)
                ctx.lineTo(cx + innerCellSize*0.75, cy + innerCellSize)
                ctx.lineTo(cx + innerCellSize*0.75, cy)
                break
            case Direction.Left:
                ctx.moveTo(cx + innerCellSize, cy + innerCellSize*0.25)
                ctx.lineTo(cx, cy + innerCellSize*0.25)
                ctx.lineTo(cx, cy + innerCellSize*0.75)
                ctx.lineTo(cx + innerCellSize, cy + innerCellSize*0.75)
                break
            }
            ctx.fill()
            ctx.stroke()
            break

        case BotCellKind.Leaf:
            ctx.beginPath()
            // Закругленный треугольник в зависимости от this.direction
            switch (this.direction) {
            case Direction.Down:
                // Полуэлипс от начала клетки и до конца
                ctx.ellipse(cx+innerCellSize/2, cy, innerCellSize / 2, innerCellSize, 0, 0, Math.PI)
                break
            case Direction.Left:
                ctx.ellipse(cx+innerCellSize, cy+innerCellSize/2, innerCellSize, innerCellSize/2, 0,  Math.PI/2, Math.PI*1.5)
                break
            case Direction.Up:
                ctx.ellipse(cx+innerCellSize/2, cy+innerCellSize, innerCellSize / 2, innerCellSize, 0, Math.PI, 0)
                break
            case Direction.Right:
                ctx.ellipse(cx, cy+innerCellSize/2, innerCellSize, innerCellSize/2, 0,  Math.PI*1.5, Math.PI/2)
                break
            }
            ctx.fill()
            ctx.stroke()
            break
        case BotCellKind.Mouth:
            ctx.beginPath()
            // Треугольник в зависимости от this.direction
            switch (this.direction) {
            case Direction.Up:
                ctx.moveTo(cx, cy + innerCellSize)
                ctx.lineTo(cx + innerCellSize / 2, cy)
                ctx.lineTo(cx + innerCellSize, cy + innerCellSize)
                break
            case Direction.Right:
                ctx.moveTo(cx, cy)
                ctx.lineTo(cx + innerCellSize, cy + innerCellSize / 2)
                ctx.lineTo(cx, cy + innerCellSize)
                break
            case Direction.Down:
                ctx.moveTo(cx, cy)
                ctx.lineTo(cx + innerCellSize / 2, cy + innerCellSize)
                ctx.lineTo(cx + innerCellSize, cy)
                break
            case Direction.Left:
                ctx.moveTo(cx + innerCellSize, cy)
                ctx.lineTo(cx, cy + innerCellSize / 2)
                ctx.lineTo(cx + innerCellSize, cy + innerCellSize)
                break
            }
            ctx.fill()
            ctx.stroke()
            break

        }


    }




}