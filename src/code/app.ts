import Point from "./types/point"
import {drawFPS} from "./funcs/fps"
import {getCanvasCont, setEnginesList, setFieldsList} from "./funcs/dom"
import {bindPauseButton, bindResetButton, bindStartButton} from "./funcs/buttons"
import EngineState from "./enums/engine-state"
import Engine from "./engines/engine"
import getFields from "./funcs/get-fields"
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


    onEngineSelect(index: number) {
        this.engine = engines[index]
        const info = this.engine.getInfo()
        this.engine.init(getFields(info.id, info.version)[0], this.canvas)
        setFieldsList(info)
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
    }


}