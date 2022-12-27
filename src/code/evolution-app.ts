import Point from "./types/point"
import {drawFPS} from "./funcs/fps"
import {getCanvasCont} from "./funcs/dom"
import {bindPauseButton, bindResetButton, bindStartButton} from "./funcs/buttons"
import EngineState from "./enums/engine-state"
import Field from "./engines/field"
import BasicField from "./engines/basic/fileds/basic-field"

export default class EvolutionApp {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private viewSize: Point | undefined
    private readonly cont: HTMLDivElement
    private state: EngineState = EngineState.UNSET
    private currentField: Field | null = null

    constructor() {
        this.cont = getCanvasCont()
        this.initCanvas()
        this.bindEvents()
        this.currentField = new BasicField()
        this.loop()
    }

    private initCanvas() {
        this.canvas = document.createElement("canvas")
        this.canvas.id = "oes-canvas"
        this.ctx = this.canvas.getContext("2d")!
        this.initViewSize()
        this.cont.appendChild(this.canvas)
    }

    private bindEvents() {
        window.addEventListener("resize", () => this.onResize())
        bindStartButton(() => this.start())
        bindResetButton(() => this.reset())
        bindPauseButton(() => this.pause())
    }

    private onResize() {
        this.initViewSize()
    }


    private initViewSize(): void {
        this.viewSize = { x: this.cont.clientWidth, y: this.cont.clientHeight }
        this.canvas.width = this.viewSize.x
        this.canvas.height = this.viewSize.y
    }


    /**
     * Main draw loop
     */
    loop() {
        if (this.state === EngineState.RUNNING) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawNextStep()
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

    // Next evolution step
    private drawNextStep() {
        if (this.currentField) {
            this.currentField.nextStep()
            this.currentField.draw()
            this.ctx.drawImage(this.currentField.getImage(), 0, 0)
        }
    }
}