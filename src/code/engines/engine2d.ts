import Engine from "./engine"
import EngineParams from "../types/engine-params"
import Camera from "../types/camera"

export default abstract class Engine2d extends Engine {
    protected ctx: CanvasRenderingContext2D

    camera: Camera = { x: 0, y: 0, zoom: 1 }


    override init(canvas: HTMLCanvasElement, params: EngineParams) {
        super.init(canvas, params)
        this.ctx = canvas.getContext("2d")!
        this.centerCamera()
    }

    centerCamera() {
        const x =  (this.params && this.params.size) ? this.params.size.x : 0
        const y =  (this.params && this.params.size) ? this.params.size.y : 0

        this.camera = {
            x: Math.round((this.canvas.width-x)/2),
            y: Math.round((this.canvas.height-y)/2),
            zoom: 1
        }
    }

    onDrag(dx: number, dy: number) {
        this.camera.x += dx
        this.camera.y += dy
    }

    protected clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

}