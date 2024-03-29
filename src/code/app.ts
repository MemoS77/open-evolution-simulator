import Point from "./types/point"
import {drawFPS} from "./funcs/fps"
import {
    getCanvasCont,
    setEnginesList,
    setFilterList,
    setParamsList,
    setViewList,
    showEngineDescription
} from "./funcs/dom"
import {
    bindFilterMode, bindFullScreen,
    bindPauseButton,
    bindResetButton,
    bindShowMode,
    bindSpeed,
    bindStartButton,
    bindStepButton
} from "./funcs/buttons"
import EngineState from "./enums/engine-state"
import Engine from "./engines/engine"
import engines from "./engines"
import {globalVars} from "./inc/const"

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
        this.oneStep()
    }


    onEngineSelect(index: string | number) {
        this.reset()
        this.engine = engines[+index]
        const info = this.engine.getInfo()
        const params = setParamsList(this.engine)
        setViewList(this.engine.getViewTitles())
        setFilterList(this.engine.getFilterTitles())
        showEngineDescription(info.description)
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

    private zoomIn(d: number): void {
        globalVars.camera.zoom *= d<0 ? 1.02 : 0.98
        this.canvas.width = this.canvas.width + 1 - 1
        this.ctx.scale(globalVars.camera.zoom, globalVars.camera.zoom)
        //globalVars.camera.zoom = 1
        this.clearCanvas()
        this.engine.draw()
    }

    private clearCanvas(): void {
        this.ctx.clearRect(-this.canvas.width*50, -this.canvas.height*50, this.canvas.width*100, this.canvas.height*100)
    }

    private bindEvents() {
        // zoomIn на пркрутку колеса мыши
        this.canvas.addEventListener("wheel", (e) => {
            this.zoomIn(e.deltaY)
        })


        window.addEventListener("resize", () => this.onResize())
        this.canvas.addEventListener("mousemove", (e) => {
            if (e.buttons===4) {
                this.clearCanvas()
                this.engine.onDrag(e.movementX, e.movementY)
                this.engine.draw()
            }
        })
        bindStartButton(() => this.start())
        bindResetButton(() => {
            if (confirm("Sure reset?")) this.reset()
        })
        bindPauseButton(() => this.pause())
        bindStepButton(() => {
            this.oneStep()
        })
        bindShowMode()
        bindFilterMode()
        bindSpeed()
        bindFullScreen()


        const select = document.getElementById("engines-list")! as HTMLSelectElement
        select.addEventListener("change", (e) => {
            this.onEngineSelect((e.target as HTMLOptionElement).value)
            this.oneStep()
        })

        const paramsSelect = document.getElementById("fields-list")! as HTMLSelectElement
        paramsSelect.addEventListener("change", (e) => {
            const index = +(e.target as HTMLOptionElement).value
            this.engine.onParamsListSelect(index)
            this.oneStep()
        })


    }

    private onResize() {
        this.initCanvasSize()
    }


    private initCanvasSize(): void {
        this.canvas.width = 1
        this.canvas.height = 1
        this.viewSize = { x: this.cont.clientWidth, y: this.cont.clientHeight }
        this.canvas.width = this.viewSize.x
        this.canvas.height = this.viewSize.y
    }


    /**
     * Main draw loop
     */
    loop() {
        if (this.state === EngineState.RUNNING) {
            this.oneStep()
        }
        requestAnimationFrame(() => this.loop())
    }

    private oneStep(): void {
        for (let i = 0; i < globalVars.speed; i++) {
            this.engine.cycle++
            this.engine.nextStep()
        }
        this.engine.draw()
        drawFPS(this.ctx)
        this.ctx.fillText(this.engine.cycle+ " cycle", 10, 56)
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
            this.engine.cycle = 0
            this.engine.draw()
        }
    }


}