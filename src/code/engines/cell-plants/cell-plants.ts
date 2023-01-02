import EngineInfo from "../../types/engine-info"
import {paramsList, PlantsEngineParams} from "./params-list"
import {Cell, CellAction} from "./types"
import CellEngine, {cellPadding, drawCellSize, innerCellSize} from "../cell-engine"
import Point from "../../types/point"
import {maxPhotoEnergy, newBotEnergy, poisonEnergy} from "./const"
import {globalVars} from "../../inc/const"
import Bot from "./bot"
import PlantBot from "./plant-bot"
import {randomColor} from "../../funcs/utils"
import {randomInt} from "../../funcs/buttons"
import {BotCellKind, CellActionKind} from "./enums"
import {FourDirection} from "../../enums/four-direction"


export default class CellPlants extends CellEngine {

    override params: PlantsEngineParams
    cells: Cell[][] = []
    bots: Bot[] = []

    override draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawCells()
        this.drawBots()
    }

    addEnergy(pos: Point, energy: number): void {
        if (this.isCellExists(pos)) {
            this.cells[pos.x][pos.y].energy += energy
        }
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

    getFieldCell(pos: Point): Cell | null {
        if (this.isCellExists(pos)) {
            return this.cells[pos.x][pos.y]
        }
        return null
    }

    /*
    getCellByDirection(position: Point, direction: FourDirection, steps = 1): Cell | null {
        const point = this.pointByDirection(position, direction, steps)
        if (point!=null) return this.getFieldCell(point)
        return null
    }*/


    override  getInfo(): EngineInfo {
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


    /**
     * Индексируем ячейки, записывая есть ли в ней ячейки ботов
     * Это упростит и ускорит работу в nextStep
     */
    private indexBots(): void {
        for (let i = 0; i < this.bots.length; i++) {
            const bot = this.bots[i]
            bot.cells.forEach((cell, index) => {
                this.cells[cell.position.x][cell.position.y].bot = bot
                this.cells[cell.position.x][cell.position.y].botCellIndex = index
            })
        }
    }



    override nextStep(): void {

        this.indexBots()

        for (let i = 0; i < this.bots.length; i++) {
            const bot = this.bots[i]
            /** Составляем список действий всех клеток и проверяем
             * движутся ли клетки в одну сторону
             */
            let moveDirection: FourDirection | null = null
            // Передвигается ли весь организм целиком. В противном случае клетка отделается.
            let needMove = true
            const actions: CellAction[] = []
            for (let j = 0; j < this.bots[i].getCellsCount(); j++) {
                const action = bot.getCellAction(j)
                actions.push(action)
                if (needMove) {
                    if (action.kind === CellActionKind.Move) {
                        const direction = bot.getCell(j).direction
                        if (moveDirection == null) {
                            moveDirection = bot.getCell(j).direction
                        } else if (moveDirection !== direction) {
                            needMove = false
                        }
                    } else needMove = false
                }
            }


            for (let j = 0; j < this.bots[i].getCellsCount(); j++) {
                const action = actions[j]
                const cell = bot.getCell(j)
                const kind = cell.getKind()

                switch (action.kind) {
                case CellActionKind.MainAction:
                    bot.energy -= 3
                    break
                case CellActionKind.Move:
                    const d = this.pointByDirection(cell.position, cell.direction)
                    if (d!==null) {
                        const fieldCell = this.getFieldCell(d)
                        if (fieldCell!==null) {
                            cell.position = d
                            // Если есть бот
                            if (fieldCell.bot) {
                                const targetBot = fieldCell.bot
                                const targetCell = fieldCell.bot.getCell(fieldCell.botCellIndex)
                                const targetKind = targetCell.getKind()
                                if (targetKind!==BotCellKind.Armor || kind===BotCellKind.Armor) {
                                    // Уничтожаются обе клетки
                                    targetBot.kill(fieldCell.botCellIndex)
                                    bot.kill(j)
                                }
                            } else
                            // Если нет бота и бот не двигался целиком, то клетка отделяется
                            if (!needMove) {
                                // Создаем нового бота для стволовой клетки
                                if (kind === BotCellKind.Stem)  {
                                    // Отделится можно только если нет потомков
                                    if (!cell.haveChildren()) {
                                        this.addBot(d, cell.getEnergy(), cell.direction)
                                        // У родителя убираем эту клетку, так как она в новом боте
                                        bot.kill(j)
                                    }
                                } else {
                                    // Иначе клетка погибает
                                    bot.kill(j)
                                }
                            }

                        }
                    }
                    bot.energy -= 3
                    break
                case CellActionKind.Idle:
                    bot.energy -= 1
                    break
                }
            }
        }
        this.draw()
    }



    override initCells(): void {
        this.cells = []
        for (let i = 0; i < this.params.size.x; i++) {
            this.cells[i] = []
            for (let j = 0; j < this.params.size.y; j++) {
                this.cells[i][j] = {
                    energy: this.params.size.y-j*maxPhotoEnergy,
                    organic: 0,
                    poison: false,
                    botCellIndex: 0,
                    bot: null
                }
            }
        }
    }

    addBot(position: Point, energy?: number, direction?: FourDirection): void {
        const newBot = new PlantBot(this, position, randomColor(), energy ?? newBotEnergy, direction ?? randomInt(0, 3))
        this.bots.push(newBot)
        this.cells[position.x][position.y].bot = newBot
        this.cells[position.x][position.y].botCellIndex = 0
    }


    override initBots() {
        this.bots = []
        for (let i=0; i<this.params!.count!; i++) {
            let p: Point
            do {
                p = {
                    x: Math.floor(Math.random() * this.params!.size.x),
                    y: Math.floor(Math.random() * this.params!.size.y),
                }
            }  while (this.cells[p.x][p.y].organic>=poisonEnergy || this.cells[p.x][p.y].bot)
            this.addBot(p)
        }
    }


}