import Point from "./types/point"
import {drawFPS} from "./funcs/fps"
import {getCanvasCont, setEnginesList, setParamsList} from "./funcs/dom"
import {bindPauseButton, bindResetButton, bindShowMode, bindStartButton, bindStepButton} from "./funcs/buttons"
import EngineState from "./enums/engine-state"
import Engine from "./engines/engine"
import engines from "./engines"

export default class App {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private viewSize: Point | undefined
    private readonly cont: HTMLDivElement
    private state: EngineState = EngineState.UNSET
    private engine: Engine

    constructor() {
        this.cont = getCanvasCont()
        this.initCanvas()
        this.bindEvents()
        setEnginesList(engines)
        this.onEngineSelect(0)
        this.loop()
    }


    onEngineSelect(index: string | number) {
        this.reset()
        this.engine = engines[+index]
        //const info = this.engine.getInfo()
        const params = setParamsList(this.engine)
        this.engine.init(this.canvas, params.length ? params[0] : null)
        this.engine.clear()
    }


    private initCanvas() {
        this.canvas = document.createElement("canvas")
        this.canvas.id = "oes-canvas"
        this.ctx = this.canvas.getContext("2d")!
        this.initCanvasSize()
        this.cont.appendChild(this.canvas)
    }

    private bindEvents() {
        window.addEventListener("resize", () => this.onResize())
        this.canvas.addEventListener("mousemove", (e) => {
            if (e.buttons===4) {
                this.engine.onDrag(e.movementX, e.movementY)
            }
        })
        bindStartButton(() => this.start())
        bindResetButton(() => this.reset())
        bindPauseButton(() => this.pause())
        bindStepButton(() => {
            this.engine.nextStep()
            this.engine.draw()
        })
        bindShowMode()

        const select = document.getElementById("engines-list")! as HTMLSelectElement
        select.addEventListener("change", (e) => this.onEngineSelect((e.target as HTMLOptionElement).value))

        const paramsSelect = document.getElementById("fields-list")! as HTMLSelectElement
        paramsSelect.addEventListener("change", (e) => {
            const index = +(e.target as HTMLOptionElement).value
            this.engine.onParamsListSelect(index)
        })


    }

    private onResize() {
        this.initCanvasSize()
    }


    private initCanvasSize(): void {
        this.viewSize = { x: this.cont.clientWidth, y: this.cont.clientHeight }
        this.canvas.width = this.viewSize.x
        this.canvas.height = this.viewSize.y
    }


    /**
     * Main draw loop
     */
    loop() {
        if (this.state === EngineState.RUNNING) {
            this.engine.nextStep()
            this.engine.draw()
            drawFPS(this.ctx)
        }
        requestAnimationFrame(() => this.loop())
    }


    // Start evolution
    start(): void {
        this.state = EngineState.RUNNING
    }

    // Pause evolution
    pause(): void {
        this.state = EngineState.PAUSED
    }

    // Full evolution stop

    reset(): void {
        this.state = EngineState.IDLE
        if (this.engine)    {
            this.engine.reset()
            this.engine.draw()
        }
    }


}