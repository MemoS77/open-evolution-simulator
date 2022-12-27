import Engine from "./engine"
import Field from "../types/field-info"
import Camera from "../types/camera"

export default abstract class Engine2d extends Engine {
    protected ctx: CanvasRenderingContext2D

    camera: Camera = { x: 0, y: 0, zoom: 1 }


    override init(field: Field, canvas: HTMLCanvasElement) {
        super.init(field, canvas)
        this.ctx = canvas.getContext("2d")!
        this.camera = {
            x: Math.round((this.canvas.width-this.field.size.x)/2),
            y: Math.round((this.canvas.height-this.field.size.y)/2),
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