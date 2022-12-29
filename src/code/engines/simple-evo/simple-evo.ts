import Engine2d from "../engine2d"
import EngineInfo from "../../types/engine-info"
import EngineParams from "../../types/engine-params"
import paramsList, {EvoEngineParams} from "./params-list"
import Bot from "./bot"
import {ActionMode, CellMode, Direction} from "./enums"
import Point from "../../types/point"
import {BotAction, Cell, CellBots} from "./types"
import FirstBot from "./first-bot"

const drawCellSize = 16
const padding = 1
const innerCellSize = drawCellSize - padding * 2

export default class SimpleEvo extends Engine2d {
    bots: Bot[] = []
    cells: Cell[][] = []
    params: EvoEngineParams


    override centerCamera() {
        const x =  this.params.size.x * drawCellSize
        const y =  this.params.size.y * drawCellSize

        this.camera = {
            x: Math.round((this.canvas.width-x)/2),
            y: Math.round((this.canvas.height-y)/2),
            zoom: 1
        }
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i=0; i<this.params.size.x; i++) {
            for (let j=0; j<this.params.size.y; j++) {
                const c = this.cells[i][j]

                if (c.mode !== CellMode.Empty) {
                    this.ctx.fillStyle = c.mode === CellMode.UnbreakableBarrier ? "#ffffff" : "#777"
                } else {
                    const green = Math.floor((c.energy)/(this.params!.conf.maxCellEnergy)*255)
                    const blue = Math.floor((c.organic)/(this.params!.conf.maxCellOrganic)*255)
                    this.ctx.fillStyle = `rgb(20,${green},${blue})`
                }

                const cx = i * drawCellSize + this.camera.x + padding
                const cy = j * drawCellSize+this.camera.y + padding

                this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
                const bot = this.findBot(i, j)
                if (bot) {
                    const def = 200
                    const red = Math.floor((bot.energy+def)/(def+this.params!.conf.maxBotEnergy)*255)
                    this.ctx.fillStyle = `rgba(${red},0,0,0.8)`
                    this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
                }

            }
        }
    }

    getInfo(): EngineInfo {
        return {
            id: "sevo",
            name: "Simple Evolution",
            version: 1,
            description: "Simplest evolution engine",
        }
    }

    getParamsList(): EngineParams[] {
        return paramsList
    }


    doBotAction(bot: Bot, action: BotAction): void {
        let x = bot.position.x
        let y = bot.position.y
        switch (action.direction) {
        case Direction.Up:
            y--
            break
        case Direction.Down:
            y++
            break
        case Direction.Left:
            x--
            break
        case Direction.Right:
            x++
            break
        }
        if (x >= 0 && x < this.params!.size.x && y >= 0 && y < this.params!.size.y) {
            const targetBot = this.findBot(x, y)
            const cell = this.cells[x][y]

            if (cell.mode !== CellMode.UnbreakableBarrier) {

                const energy = Math.floor(bot.energy/2)
                switch (action.mode) {
                case ActionMode.Transfer:
                    if (action.direction === Direction.Stay) bot.energy -= energy; else {
                        if (targetBot) {
                            // Передача энергии
                            targetBot.energy += energy
                            bot.energy -= energy
                        } else {
                            // Размножение
                            if (cell.mode === CellMode.Empty && bot.energy >= this.params!.conf.energyForReproduction) {
                                this.addBot( bot.reproduction({x, y}))
                            }
                        }
                    }
                    break
                case ActionMode.Use:
                    if ((action.direction !== Direction.Stay) && targetBot) {
                        // Атака
                        targetBot.energy -= energy
                    } else if (cell.mode === CellMode.BreakableBarrier) {
                        // Разрушение барьера
                        this.cells[x][y].mode = CellMode.Empty
                    } else if (cell.mode === CellMode.Empty) {
                        if (cell.organic>0) {
                            // Съедание органики
                            const e = Math.min(cell.organic, energy)
                            //console.log("eat", e)
                            bot.energy += e
                            cell.organic -= e
                        } else {
                            bot.energy += cell.energy
                        }
                    }
                    break
                default:
                    if (cell.mode === CellMode.Empty && !targetBot) {
                        bot.position.x = x
                        bot.position.y = y
                    }
                    break
                }
            }
        }
    }

    private findBot(x: number, y: number): Bot | undefined {
        return this.bots.find(b => b.position.x === x && b.position.y === y)
    }

    nextStep(): void {
        // Для оптимизации, получаем список ботов в ячейках, чтобы не искать каждый проход
        const bots = this.getCellBots()
        this.bots.forEach(b => {
            b.energy--
            this.doBotAction(b, b.getAction(this.cells, bots))
        })
        this.bots.forEach(b => {
            if (b.energy <= 0) {
                this.cells[b.position.x][b.position.y].organic += this.params!.conf.deathBotEnergy
                if (this.cells[b.position.x][b.position.y].organic> this.params!.conf.maxCellOrganic) {
                    this.cells[b.position.x][b.position.y].organic = this.params!.conf.maxCellOrganic
                }
            } else if (b.energy>this.params!.conf.maxBotEnergy) {
                b.energy = this.params!.conf.maxBotEnergy
            }
        })
        this.bots = this.bots.filter(b => b.energy > 0)
    }

    reset(): void {
        this.initCells()
        this.initBots()
    }

    private addBot(bot: Bot): void {
        this.bots.push(bot)
    }

    private initBots() {
        this.bots = []
        for (let i=0; i<this.params!.count!; i++) {
            let p: Point
            do {
                p = {
                    x: Math.floor(Math.random() * this.params!.size.x),
                    y: Math.floor(Math.random() * this.params!.size.y),
                }
            }  while (this.cells[p.x][p.y].mode !== CellMode.Empty || this.findBot(p.x, p.y))
            this.addBot(new FirstBot(p, this.params!.conf))
        }
    }


    private getCellBots(): CellBots {
        const cells: CellBots = []
        for (let i=0; i<this.params!.size.x; i++) {
            cells[i] = []
            for (let j = 0; j < this.params!.size.y; j++) {
                cells[i][j] = {
                    id: false,
                    energy: 0,
                }
            }
        }

        this.bots.forEach(b => {
            cells[b.position.x][b.position.y] = {
                id: b.id,
                energy: b.energy,
            }
        })

        return cells
    }


    private initCells() {
        this.cells = []

        const halfX1 = Math.floor(this.params!.size.x/2)-1
        const halfX2 = halfX1+3
        const halfY = Math.floor(this.params!.size.y/2)
        for (let i=0; i<this.params!.size.x; i++) {
            this.cells[i] = []
            for (let j=0; j<this.params!.size.y; j++) {
                this.cells[i][j] = {
                    mode: CellMode.Empty,
                    energy: 0,
                    organic: 0
                }
                this.cells[i][j].mode = (i>=halfX1 && i<=halfX2)
                    ? j<halfY ? CellMode.UnbreakableBarrier : CellMode.BreakableBarrier
                    : CellMode.Empty
                if ((this.cells[i][j].mode === CellMode.Empty)&&(Math.random()<0.2)) {
                    if (j<halfY) {
                        this.cells[i][j].energy = Math.ceil(Math.random() * this.params!.conf.maxCellEnergy)
                    }   else {
                        this.cells[i][j].organic = Math.ceil(Math.random() * this.params!.conf.maxCellOrganic)
                    }
                }
            }
        }
    }

}
