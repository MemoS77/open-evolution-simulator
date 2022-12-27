import Point from "./types/point"
import {drawFPS} from "./funcs/fps"
import {getCanvasCont} from "./funcs/dom"
import {bindPauseButton, bindResetButton, bindStartButton} from "./funcs/buttons"

export default class EvolutionApp {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private viewSize: Point | undefined
    private readonly cont: HTMLDivElement

    constructor() {
        console.info("OES App Started")
        this.cont = getCanvasCont()
        this.initCanvas()
        this.bindEvents()
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        drawFPS(this.ctx)
        requestAnimationFrame(() => this.loop())
    }

    start() {
        console.log("Start")
        //this.engine?.start()
    }

    pause() {
        console.log("Pause")
    }

    reset() {
        console.log("Reset")
    }



}