import Engine2d from "../engine2d"
import EngineInfo from "../../types/engine-info"
import EngineParams from "../../types/engine-params"
import paramsList, {EvoEngineParams} from "./params-list"
import Bot from "./bot"
import {ActionMode, CellMode, Direction} from "./enums"
import Point from "../../types/point"
import {BotAction, Cell, CellBots} from "./types"
import FirstBot from "./first-bot"
import {globalVars, infoFont} from "../../inc/const"



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


    getViewTitles(): string[] {
        return ["Color by genome", "Energy", "Life time", "Energy and life time"]
    }


    getFilterTitles(): string[] {
        return ["With energy & organic", "No energy & organic"]
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i=0; i<this.params.size.x; i++) {
            for (let j=0; j<this.params.size.y; j++) {
                const c = this.cells[i][j]

                if (c.mode !== CellMode.Empty) {
                    this.ctx.fillStyle = c.mode === CellMode.UnbreakableBarrier ? "#ffffff" : "#777"
                } else {
                    if (globalVars.filterMode === 0) {
                        const green = Math.floor((c.energy) / (this.params!.conf.maxCellEnergy) * 255)
                        const blue = Math.floor((c.organic) / (this.params!.conf.maxCellOrganic) * 255)
                        this.ctx.fillStyle = `rgb(20,${green},${blue})`
                    } else
                    {
                        this.ctx.fillStyle = "rgb(0,0,0)"
                    }
                }
                const cx = i * drawCellSize + this.camera.x + padding
                const cy = j * drawCellSize+this.camera.y + padding
                this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
                const bot = this.findBot(i, j)
                if (bot) {
                    if (globalVars.showMode === 1) {
                        const def = 200
                        const red = Math.floor((bot.energy + def) / (def + this.params!.conf.maxBotEnergy) * 255)
                        this.ctx.fillStyle = `rgba(${red},0,0,0.8)`
                    } else if (globalVars.showMode === 0) {
                        this.ctx.fillStyle = "hsl(" + bot.id + " 100% 50%)"
                    } else if (globalVars.showMode === 2) {
                        let r = 0
                        let g = 0
                        let b = 0
                        const cf = bot.lifeTime / this.params!.conf.maxLifeTime

                        if (cf < 0.02)  g =255
                        else if (cf < 0.15) g = 150
                        else if (cf < 0.5)  b = 170
                        else if (cf < 0.9)  r = 170
                        else  r=255

                        this.ctx.fillStyle = `rgb(${r},${g},${b})`
                    }
                    else {
                        // Чем моложе и больше энергии, тем ярче
                        const g = 250-Math.floor(bot.lifeTime / this.params!.conf.maxLifeTime * 250)
                        const r = Math.floor(bot.energy / this.params!.conf.maxBotEnergy * 250)
                        this.ctx.fillStyle = `rgb(${r},${g},100)`
                    }
                    this.ctx.fillRect(cx, cy, innerCellSize, innerCellSize)
                }

            }
        }



        this.drawStats()
    }

    drawStats(): void {
        let maxGeneration = 0
        let maxMutations = 0

        // Посчитать количество ботов группируя по id
        const botsCount: {[key: number]: number} = {}
        for (const bot of this.bots) {
            if (!botsCount[bot.id]) {
                botsCount[bot.id] = 0
            }
            botsCount[bot.id]++
            if (bot.generation > maxGeneration) {
                maxGeneration = bot.generation
            }
            if (bot.mutations > maxMutations) {
                maxMutations = bot.mutations
            }
        }

        // Вывести геном самых популярных ботов
        if (this.cycle % 1900 === 0) {
            const sortedBots = Object.entries(botsCount).sort((a, b) => b[1] - a[1])
            for (let i = 0; i < 5; i++) {
                const botId = sortedBots[i][0]
                const bot = this.bots.find(b => b.id === Number(botId))
                if (bot) {
                    console.log(`%c${bot.id} x ${botsCount[bot.id]}`,  "background-color: hsl(" + bot.id + " 100% 50%); color: black;font-size:10pt;")
                    console.log(`${JSON.stringify(bot.genome)}`)
                }

            }
        }


        this.ctx.fillStyle = "Gray"
        this.ctx.font      = infoFont

        this.ctx.fillText("Max generation: " + maxGeneration, 10, 76)
        this.ctx.fillText("Max mutations: " + maxMutations, 10, 96)
        // Total bots
        this.ctx.fillText("Total bots: " + this.bots.length, 10, 116)
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

                const energy = Math.floor(bot.energy/3)
                switch (action.mode) {
                case ActionMode.Transfer:
                    if (action.direction !== Direction.Stay) {
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
                        //if (targetBot.energy) console.log(targetBot.id,'kileed by',bot.id)
                    } else if (cell.mode === CellMode.BreakableBarrier) {
                        // Разрушение барьера
                        this.cells[x][y].mode = CellMode.Empty
                    } else if (cell.mode === CellMode.Empty) {
                        if (cell.organic>0) {
                            // Съедание органики
                            const e = Math.min(cell.organic, energy)
                            bot.energy += e
                            cell.organic -= e
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
            b.lifeTime++
            const cell = this.cells[b.position.x][b.position.y]
            if (cell.energy>0) b.energy+=cell.energy
            this.doBotAction(b, b.getAction(this.cells, bots))
        })
        this.bots.forEach(b => {
            if (b.lifeTime >= this.params!.conf.maxLifeTime) b.energy = 0
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
        if (Math.random()<0.2) this.changeCells()
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
                    lifeTime: 0,

                }
            }
        }

        this.bots.forEach(b => {
            cells[b.position.x][b.position.y] = {
                id: b.id,
                energy: b.energy,
                lifeTime: b.lifeTime,
                genome: (b as FirstBot).genome,
            }
        })

        return cells
    }

    /**
     * Меняем условия мира
     */
    private changeCells() {
        const conf = this.params!.conf
        // Добавляем на нижнем ярусе органики

        if (conf.organicProp) {
            for (let i = 0; i < this.params!.size.x; i++) {
                for (let j = Math.round(this.params!.size.y * (1-conf.organicProp)); j < this.params!.size.y; j++) {
                    const c = this.cells[i][j]
                    if (c.mode === CellMode.Empty) {
                        if (c.organic < conf.maxCellOrganic) {
                            if (Math.random() <= 0.2) c.organic += 5
                        }
                    }
                }
            }
        }
    }

    private initCells() {
        this.cells = []
        const conf = this.params!.conf
        const halfY = Math.floor(this.params!.size.y/2)
        const maxY=this.params!.size.y
        for (let i=0; i<this.params!.size.x; i++) {
            this.cells[i] = []
            for (let j=0; j<maxY; j++) {
                this.cells[i][j] = {
                    mode: CellMode.Empty,
                    energy: 0,
                    organic: 0
                }
                this.cells[i][j].mode = conf.centerBorder && (i === Math.round(this.params!.size.x / 2))
                    ? ((j<halfY/0.8) && (j>halfY) ? CellMode.BreakableBarrier : CellMode.UnbreakableBarrier)
                    : CellMode.Empty
                if ((this.cells[i][j].mode === CellMode.Empty)&&(Math.random()<=conf.greensProp)) {
                    this.cells[i][j].energy = Math.round((maxY-j)/maxY * conf.maxCellEnergy)
                }
            }
        }

        conf.greens?.forEach(g => {
            const x = g.x
            const y = g.y
            this.cells[x][y].mode = CellMode.Empty
            this.cells[x][y].energy = this.params!.conf.maxCellEnergy
        })
    }

}
