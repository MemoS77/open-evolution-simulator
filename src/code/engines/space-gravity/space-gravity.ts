import Engine2d from "../engine2d"
import EngineInfo from "../../types/engine-info"
import {Planet} from "./types"

export default class SpaceGravityEngine extends Engine2d {

    planets: Planet[] = []




    getInfo(): EngineInfo {
        return {
            id: "gravity",
            name: "Space Gravity Simulator",
            version: 1,
            description: "Show, how gravity works in 2d space"
        }
    }

    draw(): void {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    nextStep(): void {
        //
    }

    reset(): void {
        //
    }



}