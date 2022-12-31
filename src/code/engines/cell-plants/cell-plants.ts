import EngineInfo from "../../types/engine-info"
import {paramsList, PlantsEngineParams} from "./params-list"
import {Cell} from "./types"
import CellEngine, {cellPadding, drawCellSize, innerCellSize} from "../cell-engine"
import Point from "../../types/point"
import PlantBot from "./plant-bot"
import {poisonEnergy} from "./const"





export default class CellPlants extends CellEngine {

    override params: PlantsEngineParams
    cells: Cell[][] = []
    bots: PlantBot[] = []

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawCells()
    }

    drawCells(): void {
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                this.ctx.fillStyle = cell.poison ? "red" : "black"
                const cx = i * drawCellSize + this.camera.x + cellPadding
                const cy = j * drawCellSize+this.camera.y + cellPadding
                this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
                this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)

                if (cell.botCell) {
                    this.ctx.fillStyle = "#FFF"//cell.botCell.color
                    this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
                }
            })
        })
    }



    getInfo(): EngineInfo {
        return {
            name: "Cell Plants",
            description: "Cell Plants",
            version: 1,
            id: "cell-plants"
        }
    }

    override getParamsList(): PlantsEngineParams[] {
        return paramsList
    }

    nextStep(): void {
        //
    }

    initCells(): void {
        const maxLight = 50
        this.cells = []
        for (let i = 0; i < this.params.size.x; i++) {
            this.cells[i] = []
            for (let j = 0; j < this.params.size.y; j++) {
                this.cells[i][j] = {
                    energy: (this.params.size.y-j)*maxLight,
                    organic: 0,
                    poison: false,
                    botCell: null
                }
            }
        }
    }

    addBot(position: Point): void {
        const newBot = new PlantBot(position)
        this.bots.push(newBot)
        this.cells[position.x][position.y].botCell = newBot.cells[0]
    }


    initBots() {
        this.bots = []
        for (let i=0; i<this.params!.count!; i++) {
            let p: Point
            do {
                p = {
                    x: Math.floor(Math.random() * this.params!.size.x),
                    y: Math.floor(Math.random() * this.params!.size.y),
                }
            }  while (this.cells[p.x][p.y].organic>=poisonEnergy || this.cells[p.x][p.y].botCell)
            this.addBot(p)
        }
    }


}