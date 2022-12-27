import Engine from "./engine"
import FieldInfo from "./field-info"

export default abstract class Field {
    protected readonly engine: Engine
    protected readonly info: FieldInfo
    protected canvas: HTMLCanvasElement
    protected ctx: CanvasRenderingContext2D

    protected constructor(engine: Engine, info: FieldInfo) {
        this.engine = engine
        this.info = info
        this.canvas = document.createElement("canvas")
        this.canvas.width = this.info.size.x
        this.canvas.height = this.info.size.y
        this.ctx = this.canvas.getContext("2d")!
    }

    // Get virtual canvas for visualization in UI
    getImage(): HTMLCanvasElement {
        return this.canvas
    }

    // Full name of field with engine name
    getTitle(): string {
        return `${this.engine.getTitle()} (${this.info.name})`
    }

    // Next step of life cycle
    abstract nextStep(): void

    // Visualize current state of field on virtual canvas
    abstract draw(): void


}