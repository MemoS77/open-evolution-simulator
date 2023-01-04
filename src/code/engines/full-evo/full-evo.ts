import EngineInfo from "../../types/engine-info"
import {paramsList, PlantsEngineParams} from "./params-list"
import {Cell} from "./types"
import CellEngine, {cellPadding, drawCellSize, innerCellSize} from "../cell-engine"
import Point from "../../types/point"
import {
    idleEnergy,
    mainActionEnergy,
    maxCellOrganic,
    maxPhotoEnergy,
    minBotEnergy,
    moveEnergy,
    newBotEnergy,
    turnEnergy
} from "./const"
import {globalVars} from "../../inc/const"
import Bot from "./bot"
import FixedBot from "./fixed-bot"
import {randomInt} from "../../funcs/buttons"
import {randomColor, turn4Left, turn4Right} from "../../funcs/utils"
import {BotKind, CellActionKind} from "./enums"



export default class FullEvo extends CellEngine {

    override params: PlantsEngineParams
    cells: Cell[][] = []
    bots: Map<number, Bot> = new Map()
    nextBotId = 1

    getBot(id: number): Bot | null {
        const bot = this.bots.get(id)
        if (bot) {
            if (bot.isAlive()) return bot
        }
        return null
    }

    removeBot(bot: Bot): void {
        if (bot.engineIndex >= 0)  {
            const e = Math.min(Math.floor(bot.energy/3), minBotEnergy)
            // В почве остается немного органики
            this.cells[bot.position.x][bot.position.y].organic += e
            this.bots.delete(bot.engineIndex)
        }
    }

    override draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawCells()
        this.drawBots()
    }


    drawCells(): void {
        this.cells.forEach((row, i) => {
            row.forEach((c, j) => {
                this.ctx.fillStyle = "black"

                if (globalVars.filterMode === 0) {
                    const green = Math.floor((c.energy / maxPhotoEnergy) * 100)
                    const blue = Math.floor((c.organic / maxCellOrganic) * 250)
                    this.ctx.fillStyle = `rgb(0,${green},${blue})`
                } else this.ctx.fillStyle = "rgb(0,0,0)"

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



    override  getInfo(): EngineInfo {
        return {
            name: "Full Evo Engine",
            description: "Cell Plants",
            version: 1,
            id: "full-evo"
        }
    }

    override getParamsList(): PlantsEngineParams[] {
        return paramsList
    }


    /**
     * Индексируем ячейки, записывая есть ли в ней ячейки ботов
     * Это упростит и ускорит работу в nextStep
     */

    private clearBotsIndex(): void {
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.bots = []
            })
        })
    }

    private indexBots(): void {
        this.clearBotsIndex()
        this.bots.forEach(bot => {
            const cell = this.getFieldCell(bot.position)
            if (cell) {
                cell.bots.push(bot.engineIndex)
            }
        })
    }




    clearDeadBots(): void {
        this.bots.forEach(bot => {
            if (!bot.isAlive()) {
                this.removeBot(bot)
            }
        })
    }

    override nextStep(): void {
        this.indexBots()

        // Сначала сделаем все действия ботов, так они действуют одновременно
        this.bots.forEach(bot => {
            bot.lastAction = bot.getAction()
        })

        // Теперь обработаем все действия ботов
        this.bots.forEach(bot => {
            switch (bot.lastAction.kind) {
            case CellActionKind.Idle:
                bot.energy -= idleEnergy
                break
            case CellActionKind.Move:
                bot.energy -= moveEnergy
                const d = this.pointByDirection(bot.position, bot.direction)
                if (d !== null) bot.position = d
                break
            case CellActionKind.TurnLeft:
                //cell.direction = cell.direction.turnLeft()
                bot.direction = turn4Left(bot.direction)
                bot.energy -= turnEnergy
                break
            case CellActionKind.TurnRight:
                bot.direction = turn4Right(bot.direction)
                bot.energy -= turnEnergy
                break
            case CellActionKind.MainAction:
                bot.energy -= mainActionEnergy
                break
            }
            console.log("Bot", bot.engineIndex, bot.energy, "action", bot.lastAction.kind)
        })

        this.clearDeadBots()
        this.draw()
    }


    /*
            for (let i = 0; i < totalBots; i++) {
                const bot = this.bots[i]

                let moveDirection: FourDirection | null = null
                // Передвигается ли весь организм целиком. В противном случае клетка отделается.
                let needMove = true
                const actions: CellAction[] = []
                const cnt = bot.getCellsCount()

                for (let j = 0; j < cnt; j++) {
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

                console.log("bot", i, cnt, needMove, bot.energy, bot.getCellEnergy())


                for (let j = 0; j < cnt; j++) {
                    const action = actions[j]
                    const cell = bot.getCell(j)
                    const kind = cell.getKind()

                    console.log("Cell: "+j, action, "Childrens: "+cell.children.length)

                    switch (action.kind) {
                    case CellActionKind.TurnLeft:
                        //cell.direction = cell.direction.turnLeft()
                        cell.direction = turn4Left(cell.direction)
                        bot.energy -= 2
                        break
                    case CellActionKind.TurnRight:
                        cell.direction = turn4Right(cell.direction)
                        bot.energy -= 2
                        break
                    case CellActionKind.MainAction:
                        // Если не удалось сделать основное действие, то считаем за простой
                        bot.energy -= (bot.doCellMainAction(j, action.param) ? 3 : 1)
                        break
                    case CellActionKind.Move:
                        const d = this.pointByDirection(cell.position, cell.direction)
                        if (d!==null) {
                            const fieldCell = this.getFieldCell(d)
                            if (fieldCell!==null) {
                                const targetBot = fieldCell.bot
                                // Если есть бот
                                if (targetBot && targetBot.isCellAlive(fieldCell.botCellIndex)) {
                                    // Если клетка своего организма, ничего не делаем
                                    if (targetBot !== bot) {
                                        const targetCell = targetBot.getCell(fieldCell.botCellIndex)
                                        const targetKind = targetCell.getKind()
                                        if (targetKind !== BotKind.Armor || kind === BotKind.Armor) {
                                            // Уничтожаются обе клетки
                                            console.log("Move with Collision")
                                            targetBot.kill(fieldCell.botCellIndex)
                                            bot.kill(j)
                                        } else {
                                            // Уничтожается только атакующая клетка если нарвались обчной клеткой на броню
                                            console.log("Collision...")
                                            bot.kill(j)
                                        }
                                    } else {
                                        if (needMove) cell.position = d
                                        else   console.log("Self cell, cant move")
                                    }
                                } else
                                // Если нет бота и бот не двигался целиком, то клетка отделяется
                                if (!needMove) {
                                    // Создаем нового бота для стволовой клетки
                                    if (kind === BotKind.Stem)  {
                                        // Отделится можно только если нет потомков
                                        if (!cell.haveChildren()) {
                                            const e = cell.getEnergy()
                                            if (e>=minCellEnergyForReproduction) {
                                                console.log("Create new bot", e)
                                                this.addBot(d, e, cell.direction, bot)
                                                // У родителя убираем эту клетку, так как она в новом боте
                                                bot.kill(j)
                                            }
                                        } else {
                                            console.log("Have children, cant create new by separate")
                                        }
                                    } else {
                                        // Иначе клетка погибает
                                        bot.kill(j)
                                    }
                                } else {
                                    cell.position = d
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

            for (let i = 0; i < this.bots.length; i++) {
                const bot = this.bots[i]

                if (bot.getCellEnergy()<minCellEnergy) {
                    console.log("Die", i, bot.getCellEnergy(), bot.energy)
                    bot.kill(0)
                }
            }

            this.bots = this.bots.filter(bot => (bot.energy>0 && bot.getCellsCount()>0))

             */



    override initCells(): void {
        this.cells = []
        for (let i = 0; i < this.params.size.x; i++) {
            this.cells[i] = []
            for (let j = 0; j < this.params.size.y; j++) {
                this.cells[i][j] = {
                    energy: Math.round((this.params.size.y-j)/this.params.size.y*maxPhotoEnergy),
                    organic: randomInt(0, Math.round(maxCellOrganic/5)),
                    bots: []
                }
                console.log(    this.cells[i][j])
            }
        }
    }


    getFilterTitles(): string[] {
        return ["With energy & organic", "No energy & organic"]
    }

    addRandomBot(position: Point): void {
        const bot = new FixedBot(this,
            this.nextBotId,
            BotKind.Stem,
            position,
            randomColor(),
            randomColor(),
            newBotEnergy,
            randomInt(0, 3)
        )
        this.addBot(bot)
    }

    addBot(bot: Bot): void {
        console.log("Add bot", bot)
        this.bots.set(this.nextBotId, bot)
        this.nextBotId++
    }


    override initBots() {
        this.bots = new Map()
        for (let i=0; i<this.params!.count!; i++) {
            let p: Point
            do {
                p = {
                    x: Math.floor(Math.random() * this.params!.size.x),
                    y: Math.floor(Math.random() * this.params!.size.y),
                }
            }  while (this.cells[p.x][p.y].bots.length>0)
            this.addRandomBot(p)
        }
    }


}