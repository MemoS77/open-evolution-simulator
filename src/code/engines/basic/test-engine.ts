import EngineInfo from "../../types/engine-info"
import Engine2d from "../engine2d"

export default class TestEngine extends Engine2d {
    getInfo(): EngineInfo {
        return {
            id: "test",
            name: "First Test Engine",
            version: 1,
            description: "Experimental engine"
        }
    }

    private testX = 0
    private testY = 0
    private dx = 1
    private dy = 1


    draw(): void {
        this.clear()
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(this.camera.x, this.camera.y, this.field.size.x, this.field.size.y)
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.testX+this.camera.x, this.testY+this.camera.y, 17, 17)
    }

    nextStep(): void {
        this.testX += (1+Math.round(Math.random()))*this.dx
        this.testY += (1+Math.round(Math.random()))*this.dy
        if (this.testX>this.field.size.x) {
            this.testX = this.field.size.x
            this.dx = -this.dx
        }
        if (this.testX<0) {
            this.testX = 0
            this.dx = -this.dx
        }
        if (this.testY>this.field.size.y) {
            this.testY = this.field.size.y
            this.dy = -this.dy
        }
        if (this.testY<0) {
            this.testY = 0
            this.dy = -this.dy
        }
    }
}