import EngineInfo from "../types/engine-info"
import FieldInfo from "../types/field-info"

export default abstract class Engine {

    protected canvas: HTMLCanvasElement
    protected field: FieldInfo


    abstract onDrag(dx: number, dy: number): void

    init(field: FieldInfo, canvas: HTMLCanvasElement): void {
        this.field = field
        this.canvas = canvas
    }

    getTitle(): string {
        const {name, version} = this.getInfo()
        return `${name} ${version}`
    }

    abstract getInfo(): EngineInfo

    // Next step of life cycle
    abstract nextStep(): void

    // Visualize current state of field on virtual canvas
    abstract draw(): void

}