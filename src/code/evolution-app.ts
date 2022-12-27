import Point from "./types/point"
import {drawFPS} from "./funcs/fps"
import {getCanvasCont, setFieldsList} from "./funcs/dom"
import {bindPauseButton, bindResetButton, bindStartButton} from "./funcs/buttons"
import EngineState from "./enums/engine-state"
import Engine from "./engines/engine"
import TestEngine from "./engines/basic/test-engine"
import getFields from "./funcs/get-fields"

export default class EvolutionApp {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private viewSize: Point | undefined
    private readonly cont: HTMLDivElement
    private state: EngineState = EngineState.UNSET
    private currentEngine: Engine
    private engines = [new TestEngine()]
    private cameraPos: Point = { x: 0, y: 0 }
    // private cameraZoom = 1


    constructor() {
        this.cont = getCanvasCont()
        this.initCanvas()
        this.bindEvents()
        this.onEngineSelect(0)
        this.loop()
    }


    onEngineSelect(index: number) {
        this.currentEngine = this.engines[index]
        const info = this.currentEngine.getInfo()
        this.currentEngine.setField(getFields(info.id, info.version)[0])
        setFieldsList(info)
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
        this.canvas.addEventListener("mousemove", (e) => {
            if (e.buttons>0) {
                this.cameraPos.x += e.movementX
                this.cameraPos.y += e.movementY
            }
        })
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
        const size = this.currentEngine.getFieldSize()
        this.cameraPos = {
            x: Math.round((this.canvas.width-size.x)/2),
            y: Math.round((this.canvas.height-size.y)/2)
        }
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
        if (this.currentEngine) {
            this.currentEngine.nextStep()
            this.currentEngine.draw()
            this.ctx.drawImage(this.currentEngine.getImage(), this.cameraPos.x, this.cameraPos.y)
        }
    }
}