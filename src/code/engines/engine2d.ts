import Engine from "./engine"
import EngineParams from "../types/engine-params"
import {globalVars} from "../inc/const"

export default abstract class Engine2d extends Engine {
    protected ctx: CanvasRenderingContext2D


    override init(canvas: HTMLCanvasElement, params: EngineParams) {
        super.init(canvas, params)
        this.ctx = canvas.getContext("2d")!
        this.centerCamera()
    }

    centerCamera() {
        const x =  this.params ? this.params.size!.x : 0
        const y =  this.params ? this.params.size!.y : 0

        globalVars.camera = {
            x: Math.round((this.canvas.width-x)/2),
            y: Math.round((this.canvas.height-y)/2),
            zoom: 1
        }
    }

    override onParamsListSelect(index: number) {
        super.onParamsListSelect(index)
        this.centerCamera()
    }

    onDrag(dx: number, dy: number) {
        globalVars.camera.x += dx
        globalVars.camera.y += dy
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }


}