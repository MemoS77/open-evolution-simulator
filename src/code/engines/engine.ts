import EngineInfo from "../types/engine-info"
import FieldInfo from "../types/field-info"
import Point from "../types/point"

export default abstract class Engine {

    protected canvas: HTMLCanvasElement
    protected ctx: CanvasRenderingContext2D
    protected field: FieldInfo
    protected info: EngineInfo

    constructor() {
        this.info = this.getInfo()
    }

    setField(field: FieldInfo) {
        this.field = field
        this.info = this.getInfo()
        this.canvas = document.createElement("canvas")
        this.canvas.width = this.field.size.x
        this.canvas.height = this.field.size.y
        this.ctx = this.canvas.getContext("2d")!
    }

    getTitle(): string {
        return this.info.name + " " + this.info.version
    }

    getFieldSize(): Point {
        return this.field.size
    }

    getInfo(): EngineInfo {
        return this.info
    }

    // Get image of current state
    getImage(): HTMLCanvasElement {
        return this.canvas
    }


    // Next step of life cycle
    abstract nextStep(): void

    // Visualize current state of field on virtual canvas
    abstract draw(): void

}