import EngineInfo from "../../types/engine-info"
import {paramsList, PlantsEngineParams} from "./params-list"
import {Cell} from "./types"
import CellEngine, {cellPadding, drawCellSize, innerCellSize} from "../cell-engine"
import Point from "../../types/point"
import {newBotEnergy, poisonEnergy} from "./const"
import {globalVars} from "../../inc/const"
import Bot from "./bot"
import PlantBot from "./plant-bot"
import {randomColor} from "../../funcs/utils"
import {randomInt} from "../../funcs/buttons"
import {CellActionKind} from "./enums"





export default class CellPlants extends CellEngine {

    override params: PlantsEngineParams
    cells: Cell[][] = []
    bots: Bot[] = []

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawCells()
        this.drawBots()
    }

    drawCells(): void {
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                this.ctx.fillStyle = cell.poison ? "red" : "black"
                const cx = i * drawCellSize + globalVars.camera.x + cellPadding
                const cy = j * drawCellSize + globalVars.camera.y + cellPadding
                this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
            })
        })
    }

    drawBots(): void {
        this.bots.forEach(bot => {
            bot.draw(this.ctx)
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
        for (let i = 0; i < this.bots.length; i++) {
            const bot = this.bots[i]
            for (let j = 0; j < this.bots[i].getCellsCount(); j++) {
                const action = bot.getCellAction(j)
                switch (action.kind) {
                case CellActionKind.MainAction:
                    bot.energy -= 1
                    break
                case CellActionKind.Move:
                    bot.energy -= 1
                    break
                case CellActionKind.Idle:
                    bot.energy -= 2
                    break
                case CellActionKind.SelfDestruct:
                    break

                }

            }
        }
        this.draw()

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
        const newBot = new PlantBot(position, randomColor(), newBotEnergy, randomInt(0, 3))
        this.bots.push(newBot)
        this.cells[position.x][position.y].botCell = newBot.getCell(0)
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