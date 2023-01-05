import EngineInfo from "../../types/engine-info"
import {paramsList, PlantsEngineParams} from "./params-list"
import {Cell} from "./types"
import CellEngine, {cellPadding, drawCellSize, innerCellSize} from "../cell-engine"
import Point from "../../types/point"
import {
    idleEnergy,
    mainActionEnergy,
    maxCellOrganic, maxNotGrowSteps, maxOrganicForPoison,
    maxPhotoEnergy,
    minBotEnergy, minPhotoEnergy,
    moveEnergy,
    newBotEnergy,
    turnEnergy
} from "./const"
import {globalVars, infoFont} from "../../inc/const"
import Bot from "./bot"
import {randomInt} from "../../funcs/buttons"
import {randomColor, turn4Left, turn4Right} from "../../funcs/utils"
import {BotKind, CellActionKind} from "./enums"
import {FourDirection} from "../../enums/four-direction"
import MainBot from "./main-bot"

type BInf = {
    energy: number,
    gen: string,
    color: string,
    borderColor: string,
    cnt: number,
}

type BotInfo = Map<string, BInf>

let uBotsCount = 0
let lastStems = 0
let stemsNotGrowSteps = 0



export default class FullEvo extends CellEngine {

    override params: PlantsEngineParams
    cells: Cell[][] = []
    bots: Map<number, Bot> = new Map()
    nextBotId = 1

    getBot(id: number): Bot | null {
        const bot = this.bots.get(id)
        if (bot && bot.isAlive()) return bot
        return null
    }

    removeBot(bot: Bot): void {
        if (bot.engineIndex >= 0)  {
            const e = Math.max(Math.floor(bot.energy/5), minBotEnergy)
            bot.energy = 0
            // В почве остается немного органики
            this.addOrganic(bot.position, e)
            this.bots.delete(bot.engineIndex)
        }
    }

    override draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawCells()
        this.drawBots()
        this.drawBotsStat()
    }

    drawBotsStat(): void {
        // Вывести ID 5 самых массовых ботов

        this.ctx.fillStyle = "Gray"
        this.ctx.font      = infoFont
        const tBotsCount = this.bots.size
        const stems = Array.from(this.bots.values()).reduce((acc, b) => acc + (b.kind === BotKind.Stem ? 1 : 0), 0)


        this.ctx.fillText("Unique bots: " + uBotsCount, 10, 136)
        this.ctx.fillText("Total bots: " + tBotsCount, 10, 116)
        this.ctx.fillText("Stems: " + stems, 10, 156)

        // Защита от окончания размножения
        if (stems<=lastStems) stemsNotGrowSteps++; else {
            stemsNotGrowSteps = 0
        }

        lastStems = stems

        this.ctx.fillText("Stems not grow steps: " + stemsNotGrowSteps, 10, 176)
        if (stemsNotGrowSteps>maxNotGrowSteps) {
            stemsNotGrowSteps = 0
            this.reset()
        }




        if (this.cycle % 1000 === 0) {
            //const bots = Array.from(this.bots.values())

            const all: BotInfo = new Map()
            this.bots.forEach(bot  => {
                const b =  bot as MainBot
                const id = b.getID()
                const v = all.get(id)
                if (v) {
                    v.energy += b.energy
                    v.cnt++
                    all.set(id, v)
                } else {
                    const v: BInf = {
                        gen: JSON.stringify(b.gens),
                        color: b.color,
                        borderColor: b.borderColor,
                        energy: b.energy,
                        cnt: 1
                    }
                    all.set(id, v)
                }
            })

            uBotsCount = all.size

            const bots = Array.from(all.values())

            bots.sort((a, b) => b.cnt - a.cnt)

            for (let i = 0; i < Math.min(3, bots.length-1); i++) {
                const b = bots[i]
                console.log(b.cnt + " " + b.energy + " %c" + b.gen, "background-color: " + b.color + "; color: " + b.borderColor + ";font-size:10pt;")
            }




            /*
            const bots = Array.from(this.bots.values())
            bots.sort((a, b) => b.energy - a.energy)
            bots.forEach((bot, i) => {
                if (i < 5) {
                    console.log("%c"+JSON.stringify((bot as MainBot).gens), "background-color: " + bot.color + "; color: " + bot.borderColor + ";font-size:10pt;")
                }
            })*/
        }
    }


    drawCells(): void {
        const filter = globalVars.filterMode
        this.cells.forEach((row, i) => {
            row.forEach((c, j) => {
                this.ctx.fillStyle = "black"


                if (filter !==1) {
                    const blue = (filter === 0 || filter === 2) ? Math.floor((c.energy / maxPhotoEnergy) * 150) : 0
                    const red = (filter === 0 || filter === 3)
                        ?
                        ((this.isPoisoned({x:i, y:j})) ? 255 :Math.floor((c.organic / maxCellOrganic)* 150))
                        : 0
                    const green = Math.floor(blue * 0.8)
                    this.ctx.fillStyle = `rgb(${red},${green},${blue})`
                } else {
                    const red = 0//(this.isPoisoned({x:i, y:j})) ? 255 : 0
                    this.ctx.fillStyle = `rgb(${red},0,0)`
                }

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


    /*
    clearDeadBots(): void {
        this.bots.forEach(bot => {
            if (bot.energy<minBotEnergy) bot.die()
        })
    }

 */

    workCollision(cell: Cell): void {
        // Боты на одной ячейке
        const kinds = [0, 0, 0]
        let sm = 0
        cell.bots.forEach(botId => {
            const bot = this.getBot(botId)
            if (bot) {
                kinds[bot.kind]++
                sm++
            }
        })
        if (sm>1) {
            let stem: Bot | null = null
            cell.bots.forEach(botId => {
                const bot = this.getBot(botId)
                if (bot) {
                    /** Если два шипа, все погибает вообще все.
                     * Если один, один шип выживет
                     * Листья дохнут всегда
                     * все стволовые сливаются в одну
                     * */
                    if (kinds[BotKind.Armor]>1
                        || (kinds[BotKind.Armor]===1 && bot.kind!==BotKind.Armor)
                        || bot.kind === BotKind.Leaf) {
                        bot.die()
                        //console.log("Collision", bot.kind, bot.engineIndex)
                    } else {
                        if (bot.kind === BotKind.Stem) {
                            if (stem===null)  stem = bot
                            else {
                                stem.mergeStem(bot)
                                stem.addEnergy(Math.floor(bot.energy))
                                bot.die()
                            }

                        }
                    }
                }
            })
        }

    }

    // Обработать ботов на одной ячейке
    workCollisions(): void {
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.bots.length > 1) {
                    this.workCollision(cell)
                }
            })
        })
    }

    override nextStep(): void {
        this.setCurrentCellEnergy()
        this.indexBots()

        // Сначала сделаем все действия ботов, так они действуют одновременно
        this.bots.forEach(bot => {
            if (bot.kind === BotKind.Stem) bot.lastAction = bot.getAction()
            else bot.lastAction = {
                kind: CellActionKind.MainAction,
                param: 0
            }
        })

        // Если хозяин движется или выращивает клетку в направлении листа или брони,
        // то они тоже сдвигаются
        this.bots.forEach(bot => {
            if (bot.kind !== BotKind.Stem) {
                const owner = bot.getHost()
                if (owner) {
                    const k = owner.lastAction!.kind
                    if ((k === CellActionKind.Move) || ((k === CellActionKind.MainAction) && (owner.direction === bot.direction))) {
                        //if (k === CellActionKind.MainAction) console.log("MainAction", bot.position, bot.direction, bot.energy)
                        bot.lastAction!.kind = CellActionKind.Move
                        bot.lastAction!.param = owner.direction
                    }
                }
            }
        })


        // Теперь обработаем все действия ботов
        this.bots.forEach(bot => {
            if (bot.lastAction) {
                switch (bot.lastAction.kind) {
                case CellActionKind.Idle:
                    bot.delEnergy(idleEnergy)
                    break
                case CellActionKind.Move:
                    bot.delEnergy(moveEnergy)
                    const d = this.pointByDirection(bot.position, bot.lastAction.param)
                    if (d !== null) bot.position = d
                    break
                case CellActionKind.TurnLeft:
                    if (bot.kind === BotKind.Stem) {
                        bot.direction = turn4Left(bot.direction)
                        bot.delEnergy(turnEnergy)
                    }
                    break
                case CellActionKind.TurnRight:
                    if (bot.kind === BotKind.Stem) {
                        bot.direction = turn4Right(bot.direction)
                        bot.delEnergy(turnEnergy)
                    }
                    break
                case CellActionKind.MainAction:
                    this.botMainAction(bot, bot.lastAction.param)
                    bot.delEnergy(mainActionEnergy)
                    break
                }
            }
            //console.log("Bot", bot.engineIndex, bot.energy, bot.kind, bot.lastAction)
            bot.lastAction = null
        })


        this.bots.forEach(bot => {
            // Умирают все боты кроме шипов на отравленных клетках
            if (bot.kind !== BotKind.Armor) {
                if (this.isPoisoned(bot.position)) {
                    //console.log("Die Poison", bot.kind, bot.energy)
                    bot.die()
                }
            }
        })

        this.indexBots()
        this.workCollisions()

        // Клетки без хоста, умирают
        this.bots.forEach(bot => {
            if (bot.kind !== BotKind.Stem) {
                const owner = bot.getHost()
                if (!owner) bot.die()
            }
        })

        //this.clearDeadBots()
        //this.draw()
    }



    isDirectionFree(pos: Point, direction: FourDirection): boolean {
        const d = this.pointByDirection(pos, direction)
        if (!d) return false
        if ((this.cells[d.x][d.y].bots.length === 0)&&(!this.isPoisoned(d))) return true
        return false
    }

    isPoisoned(p: Point) {
        const cell = this.cells[p.x][p.y]
        return this.isPoisonedCell(cell)
    }


    isPoisonedCell(cell: Cell) {
        return cell.organic>=maxOrganicForPoison
    }



    private maxEat(bot: Bot) {
        return Math.max(bot.energy*3, minBotEnergy*3)
    }


    private botMainAction(bot: Bot, param: number): void {
        const cell = this.getFieldCell(bot.position)
        switch (bot.kind) {
        case BotKind.Leaf:
            // Получаем энергию из фотосинтеза по числу свободных клеток вокруг
            if (cell && cell.energy>0) {
                let c = 0
                if (this.isDirectionFree(bot.position, FourDirection.Up)) c++
                if (this.isDirectionFree(bot.position, FourDirection.Down)) c++
                if (this.isDirectionFree(bot.position, FourDirection.Left)) c++
                if (this.isDirectionFree(bot.position, FourDirection.Right)) c++
                bot.addEnergy(c * cell.energy)
            }
            break
        case BotKind.Armor:

            if (cell && cell.energy > 0) {
                // Съедаем органику, соразмерно энергии бота
                const e = Math.min(this.maxEat(bot), cell.organic)
                cell.organic -= e
                bot.addEnergy(e)
            }
            break
        case BotKind.Stem:
            const d = this.pointByDirection(bot.position, bot.direction)
            if (d !== null) {
                const cell = this.getFieldCell(d)
                if (cell && bot.energy>minBotEnergy*2) {
                    const e = Math.floor(bot.energy / 2)
                    const newBot = new MainBot(this, this.nextBotId, param%3, d!, e, bot)
                    bot.delEnergy(e)
                    this.addBot(newBot)
                }
            }
            break
        }
    }

    addOrganic(pos: Point, amount: number): void {
        const cell = this.getFieldCell(pos)
        if (cell) {
            cell.organic += amount
            if (cell.organic > maxCellOrganic) cell.organic = maxCellOrganic
            //console.log("Add organic", pos, amount, cell.organic)
        }
    }



    override initCells(): void {
        this.cells = []
        for (let i = 0; i < this.params.size.x; i++) {
            this.cells[i] = []
            for (let j = 0; j < this.params.size.y; j++) {
                this.cells[i][j] = {
                    energy: maxPhotoEnergy,
                    organic: randomInt(0, Math.round(maxCellOrganic/10)),
                    bots: []
                }

            }
        }

        this.setCurrentCellEnergy()
    }


    getSunEnergyByRow(x: number): number {
        // Освещение зависит от цикла солнца
        return Math.round((maxPhotoEnergy-minPhotoEnergy)*(Math.sin(
            (this.cycle/200 + x * 2 * Math.PI / this.params.size.x)
        )+1))+minPhotoEnergy
    }


    setCurrentCellEnergy(): void {
        let minZoneX = -1
        let maxZoneX = -1
        let minZoneY = -1
        let maxZoneY = -1

        const cf = 0.53
        const cf2 = 1-cf
        if (this.params.conf.centerNotEnergy) {
            minZoneX = this.params.size.x*cf2
            maxZoneX = this.params.size.x*cf
            minZoneY = this.params.size.y*cf2
            maxZoneY = this.params.size.y*cf
        }



        for (let i = 0; i < this.params.size.x; i++) {
            for (let j = 0; j < this.params.size.y; j++) {
                this.cells[i][j].energy = ((i>=minZoneX && i<=maxZoneX) || (j>=minZoneY && j<=maxZoneY)) ? 0 : this.getSunEnergyByRow(i)
            }
        }

    }




    getFilterTitles(): string[] {
        return ["With energy & organic", "Only bots", "Energy", "Organic"]
    }

    addRandomBot(position: Point): void {
        const bot = new MainBot(this,
            this.nextBotId,
            BotKind.Stem,
            position,
            newBotEnergy,
            null,
            randomInt(0, 3),
            randomColor(),
            randomColor()
        )
        this.addBot(bot)
    }

    addBot(bot: Bot): void {
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