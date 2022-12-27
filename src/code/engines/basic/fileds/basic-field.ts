import Field from "../../field"
import BasicEngine from "../basic-engine"

export default class BasicField extends Field {

    testX = 1
    testY = 1
    dx = 1
    dy = 1


    constructor() {
        super(new BasicEngine(), {
            name: "Basic field",
            infinityY: false,
            infinityX: true,
            size: { x: 800, y: 600 }
        })
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.testX, this.testY, 17, 17)
    }

    nextStep(): void {
        this.testX += (1+Math.round(Math.random()))*this.dx
        this.testY += (1+Math.round(Math.random()))*this.dy
        if (this.testX>this.info.size.x) {
            this.testX = this.info.size.x
            this.dx = -this.dx
        }
        if (this.testX<0) {
            this.testX = 0
            this.dx = -this.dx
        }
        if (this.testY>this.info.size.y) {
            this.testY = this.info.size.y
            this.dy = -this.dy
        }
        if (this.testY<0) {
            this.testY = 0
            this.dy = -this.dy
        }
    }

}