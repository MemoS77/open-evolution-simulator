import Engine2d from "./engine2d"
import {globalVars} from "../inc/const"


export const drawCellSize = 16
export const cellPadding = 1
export const innerCellSize = drawCellSize - cellPadding * 2

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

    abstract initCells(): void
    abstract initBots(): void

}