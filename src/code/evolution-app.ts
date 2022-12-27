import Point from "./types/point"
import {drawFPS} from "./funcs/fps"

export default class EvolutionApp {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private viewSize: Point | undefined
    private readonly cont: HTMLDivElement



    constructor() {
        console.info("OES App Started")
        this.cont = document.getElementById("oes-canvas-cont") as HTMLDivElement
        if (!this.cont) {
            this.cont = document.createElement("div")
            this.cont.id = "oes-canvas-cont"
            document.body.appendChild(this.cont)
        }
        this.canvas = document.createElement("canvas")
        this.canvas.id = "oes-canvas"
        this.ctx = this.canvas.getContext("2d")!
        this.initViewSize()
        this.cont!.appendChild(this.canvas)
        this.bindEvents()
        setTimeout(()=>this.loop())
    }

    private bindEvents() {
        window.addEventListener("resize", () =>     this.onResize())
    }

    private onResize() {
        this.initViewSize()
    }


    private initViewSize(): void {
        this.viewSize = { x: this.cont.clientWidth, y: this.cont.clientHeight }
        this.canvas.width = this.viewSize.x
        this.canvas.height = this.viewSize.y
    }


    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(222, 222, 300*Math.random(), 300)
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

    stop() {
        console.log("Stop")
    }



}