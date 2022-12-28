import EngineInfo from "../types/engine-info"
import EngineParams from "../types/engine-params"

export default abstract class Engine {

    protected canvas: HTMLCanvasElement
    protected params: EngineParams | null = null


    abstract onDrag(dx: number, dy: number): void

    init(canvas: HTMLCanvasElement, params: EngineParams | null): void {
        this.canvas = canvas
        this.params = params ?? this.getDefaultParams()
        this.reset()
    }

    abstract getDefaultParams(): EngineParams

    abstract reset(): void

    getTitle(): string {
        const {name, version} = this.getInfo()
        return `${name} ${version}`
    }

    abstract getInfo(): EngineInfo

    // Next step of life cycle
    abstract nextStep(): void

    // Visualize current state of field on virtual canvas
    abstract draw(): void
    abstract clear(): void
}