import Engine2d from "./engine2d"
import {globalVars} from "../inc/const"
import Point from "../types/point"
import {FourDirection} from "../enums/four-direction"


export const drawCellSize = 11
export const cellPadding = 0
export const innerCellSize = drawCellSize - cellPadding * 2
export const dPadding = innerCellSize* 0.2

export default abstract class CellEngine extends Engine2d {

    override centerCamera() {
        const x =  this.params!.size.x * drawCellSize
        const y =  this.params!.size.y * drawCellSize

        globalVars.camera = {
            x: Math.round((this.canvas.width-x)/2),
            y: Math.round((this.canvas.height-y)/2),
            zoom: 1
        }
    }

    reset(): void {
        this.initCells()
        this.initBots()
    }

    isCellExists(pos: Point): boolean {
        return pos.x >= 0 && pos.x < this.params!.size.x && pos.y >= 0 && pos.y < this.params!.size.y
    }

    /*
    getBorders(): Point {
        return {
            x: this.params!.size.x,
            y: this.params!.size.y
        }
    }*/

    pointByDirection(position: Point, direction: FourDirection, steps = 1): Point | null {
        const {x, y} = position
        let res: Point
        switch (direction) {
        case FourDirection.Up:
            res =  {x, y: y - steps}
            break
        case FourDirection.Down:
            res = {x, y: y + steps}
            break
        case FourDirection.Left:
            res = {x: x - steps, y}
            break
        case FourDirection.Right:
            res = {x: x + steps, y}
            break
        }

        if (this.isCellExists(res)) return res
        return null
    }





    abstract initCells(): void
    abstract initBots(): void

}