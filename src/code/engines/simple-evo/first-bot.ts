import Bot from "./bot"
import {ActionMode, CellMode, Direction} from "./enums"
import {BotAction, Cell, CellBot, CellBots} from "./types"
import {randomInt} from "../../funcs/buttons"
import applyDirection from "./apply-direction"
import Point from "../../types/point"
import {bestGenomes} from "./best-first-genomes"


const genomeLength = 160
const maxCommand = 36
const maxSteps = 100
const maxDiff = 2




export default class FirstBot extends Bot {

    genome: number[]
    private current = 0

    /**
     * Получить действие которое должен совершить бот
     *
     */
    gid(n: number): number {
        while (n < 0) n += this.genome.length
        return n % this.genome.length
    }

    getDirection(pos: number): Direction {
        return this.gid(pos+1)%5
    }

    getG() {
        return this.genome[this.current]
    }

    private incCurrent(count = 1): void {
        this.current = this.gid(this.current + count)
    }

    isRelative(bot: CellBot): boolean {

        let d = 0

        for (let i = 0; i < this.genome.length; i++) {
            if (this.genome[i]!==bot.genome![i]) d++
        }

        return d <= maxDiff
    }



    getAction(cells: Cell[][], bots: CellBots): BotAction {
        let step = 0
        let action: BotAction | null = null
        const borders: Point = {
            x: cells.length,
            y: cells[0].length
        }


        let currentCell = {...this.position}
        let d: Direction = Direction.Stay
        let rx = 0
        let ry = 0

        //console.log(this.energy)

        do {
            step++
            if (step > maxSteps)  action = {
                direction: Direction.Stay,
                mode: ActionMode.Move
            }
            else {
                const c = this.getG()
                const cell = cells[currentCell.x][currentCell.y]
                const bot = bots[currentCell.x][currentCell.y]


                //console.log(this.current, c, `rx=${rx} ry=${ry}`)

                switch (c) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    d = c
                    currentCell = applyDirection(this.position, d, borders)
                    break
                case 5:
                    action = {
                        direction: d,
                        mode: ActionMode.Move
                    }
                    break
                case 6:
                    action = {
                        direction: d,
                        mode: ActionMode.Use
                    }
                    break
                case 7:
                    action = {
                        direction: d,
                        mode: ActionMode.Transfer
                    }
                    break
                case 8:
                    rx = 0
                    break
                case 9:
                    this.incCurrent()
                    rx = this.getG()
                    break
                case 10:
                    rx++
                    break
                case 11:
                    rx--
                    if (rx<0) rx = 0
                    break
                case 12:
                    this.incCurrent()
                    rx+=this.getG()
                    break
                case 13:
                    if (bot.id || cell.mode !== CellMode.Empty)  rx = 0
                    else {
                        //console.log("organic", cell.organic)
                        if (cell.organic>0 || cell.energy>0) rx = 2
                        else rx = 1
                    }
                    break
                case 14:
                    if (bot.id) {
                        if (this.isRelative(bot)) rx = 2
                        else rx = 1
                    } else rx = 0
                    break
                case 15:
                    rx = cell.mode
                    break
                case 16:
                    if (cell.mode !== CellMode.Empty) rx = 0
                    else {
                        if (cell.organic>30) rx = 2  // TODO: Вынести константу, что считается много
                        else rx = 1
                    }
                    break
                case 17:
                    if (cell.mode !== CellMode.Empty) rx = 0
                    else {
                        if (cell.energy>1) rx = 2  // TODO: Вынести константу, что считается много
                        else rx = 1
                    }
                    break
                case 18:
                    ry = rx
                    break
                case 19:
                    ry+=rx
                    break
                case 20:
                    ry-=rx
                    if (ry<0) ry = 0
                    break
                case 21:
                    if (!(rx===0)) this.incCurrent(2)
                    break
                case 22:
                    if (!(rx>0)) this.incCurrent(2)
                    break
                case 23:
                    if (!(rx>1)) this.incCurrent(2)
                    break
                case 24:
                    if (!(rx===ry)) this.incCurrent(2)
                    break
                case 25:
                    if (!(rx>ry)) this.incCurrent(2)
                    break
                case 26:
                    if (!(rx<ry)) this.incCurrent(2)
                    break
                case 27:
                    currentCell = applyDirection(this.position, d, borders, 2)
                    break
                case 28:
                    currentCell = applyDirection(this.position, d, borders, rx)
                    break
                case 29:
                    d = rx%5
                    currentCell = applyDirection(this.position, d, borders)
                    break
                case 30:
                    rx = randomInt(0, 4)
                    break
                case 31:
                    rx = this.params.energyForReproduction
                    break
                case 32:
                    rx = bot.id ? bot.energy : 0
                    break
                case 33:
                    this.incCurrent()
                    this.current = this.gid(this.current + this.getG())
                    break
                case 34:
                    this.incCurrent()
                    //console.log('back',this.getG(),this.current,this.current - this.getG()-1)
                    this.current = this.gid(this.current - this.getG()-1)
                    //console.log('to',this.current)
                    break
                case 35:
                    rx = this.params.maxLifeTime
                    break
                case 36:
                    rx = bot.id ? bot.lifeTime : 0
                    break
                }
            }
            this.incCurrent()
        } while (action === null)

        return action
    }



    init(): void {
        this.genome = []

        if (Math.random() < 0.2) {
            for (let i = this.genome.length; i < genomeLength; i++) {
                this.genome.push(randomInt(0, maxCommand))
            }
        } else {
            const i = randomInt(0, bestGenomes.length - 1)
            this.genome = [...bestGenomes[i]]
            this.calcID()
        }
    }

    calcID() {
        let n = 0
        let d = 0
        const ln = this.genome.length -1
        for (let i = 0; i <= ln; i++) {
            const g = this.genome[i]
            if ((g>=5)&&(g<=7)) d++
            n += g * this.genome[ln-i]
        }
        this.id = Math.round(n/ln)+d*360
    }

    copyGenome(parentBot: FirstBot): number {
        this.genome = [...parentBot.genome]
        let mutations = 0

        // Для возожности сохранить геном для последующих экспериментов. Показываем только часто-встречающиеся геномы
        //if (lastGenomeCopy === this.id) console.log(this.id,JSON.stringify(this.genome))
        //lastGenomeCopy = this.id

        for (let i =  0; i < this.genome.length; i++) {
            if (Math.random()<0.005) {
                this.genome[i] = randomInt(0, maxCommand)
                mutations++
                this.calcID()
            }
        }
        return mutations
    }
}