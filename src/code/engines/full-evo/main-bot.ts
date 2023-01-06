import Bot from "./bot"
import {BotKind, CellActionKind} from "./enums"
import {CellAction, drawColors, Gen} from "./types"
import {randomInt} from "../../funcs/buttons"
import {maxGenLength, maxGenSteps, minGenLength} from "./const"
import {FourDirection} from "../../enums/four-direction"
import {randomColor} from "../../funcs/utils"

const maxCommand = 42
const genCount = 2
const maxMutations = 30

export default class MainBot extends Bot {
    private currentGenIndex = 0

    isSimilar(bot: Bot): boolean {
        return bot.getID() === this.getID()
    }

    gens: Gen[]
    cursor: number


    private getGen(): Gen {
        return this.gens[this.currentGenIndex]
    }



    nextCommand(inc = 1): number {
        this.cursor += inc
        const g = this.getGen()

        // Были зацикливания. Очень сильно возрастает счетчик.
        if (Math.abs(this.cursor)>maxCommand*3) this.cursor = 0
        else {
            while (this.cursor >= g.code.length) {
                this.cursor -= g.code.length
            }
            while (this.cursor < 0) {
                this.cursor += g.code.length
            }
        }
        return g.code[this.cursor]
    }

    override getAction(): CellAction {

        // Можно и не добавлять, это контролирует движок
        if (this.kind!==BotKind.Stem) return   {
            kind: CellActionKind.MainAction,
            param: 0
        }


        let kind = null
        const host = this.getHost()

        if (host && this.currentGenIndex===0) {
            this.currentGenIndex = 1
            this.cursor = 0
        } else if (host === null && this.currentGenIndex===1) {
            this.currentGenIndex = 0
            this.cursor = 0
        }

        const g = this.getGen()
        let step = 0

        let p = this.engine.pointByDirection(this.position, this.direction, this.rX%4)
        const y = this.rY%3
        if (p && y>0) {
            p = this.engine.pointByDirection(p, y===1 ? FourDirection.Left : FourDirection.Right)
        }

        const targetCell = p ? this.engine.getFieldCell(p) : null
        const targetBot = targetCell ? (targetCell.bots.length ? this.engine.getBot(targetCell.bots[0]) : null) : null
        const isSimilar = targetBot!==null && this.isSimilar(targetBot)



        do {
            const c = g.code[this.cursor]
            switch (c) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                kind = c
                break
            case 5:
                this.rX--
                if (this.rX < 0) this.rX = 0
                break
            case 6:
                this.rX = this.rY ?? 0
                break
            case 7:
                this.rY = this.rX ?? 0
                break
            case 8:
                this.rY+=this.rX ?? 0
                break
            case 9:
                this.rY-=this.rX ?? 0
                if (this.rY < 0) this.rY = 0
                break
            case 10:
                this.rX = this.energy
                break
            case 11:
                this.rX = randomInt(0, 100)
                //console.log("Random X", this.rX)
                break
            case 12:
                this.rX = 2
                break
            case 13:
                this.rX = this.nextCommand()
                break
            case 14:
                this.rZ = this.rY
                break
            case 15:
                this.rX = 0
                break
            case 16:
                this.rY = 0
                break
            case 17:
                this.rY = this.rZ
                break
            case 18:
                this.rX ++
                break
            case 19:
                this.rX = host ? host.rX : 0
                break
            case 20:
                this.rY = host ? host.rY : 0
                break
            case 21:
                this.rZ = host ? host.rZ : 0
                break
            case 22:
                this.rX = this.rX + this.rY
                break
            case 23:
                this.rY = targetCell ? (targetBot
                    ?
                    (isSimilar ? 1 : 2)
                    : 0) : 3
                break
            case 24:
                this.rY = targetBot ? (targetBot.kind+1) : 0
                break
            case 25:
                this.rY = targetCell ? targetCell.energy : 0
                break
            case 26:
                this.rY = targetCell ? targetCell.organic: 0
                break
            case 27:
                this.rY = targetBot ? targetBot.energy+1 : 0
                break
            case 28:
                if (this.rX>this.rY) this.nextCommand(2)
                break
            case 29:
                if (this.rX<this.rY) this.nextCommand(2)
                break
            case 30:
                if (this.rX===this.rY) this.nextCommand(2)
                break
            case 31:
                this.nextCommand(this.rX+1)
                break
            case 32:
                this.nextCommand(this.rY+1)
                break
            case 33:
                kind = this.rX%5
                break
            case 34:
                kind = this.rY%5
                break
            case 35:
                kind = this.rZ%5
                break
            case 36:
                this.nextCommand(-this.rX-2)
                break
            case 37:
                this.rX = randomInt(0, 1)
                break
            case 38:
                this.rX = this.direction
                break
            case 39:
                this.nextCommand(-5)
                break
            case 40:
                this.rY = targetCell ? (this.engine.isPoisonedCell(targetCell) ? 1: 0) : 1
                break
            }
            step++
            this.nextCommand()
            if (step>maxGenSteps) {
                //console.log("Max steps reached")
                return {
                    kind: CellActionKind.Idle,
                    param: 0
                }
            }
        } while (kind === null)

        const res = {kind, param: this.rX}
        if (res.kind === CellActionKind.Move)  res.param = this.direction
        return res
    }

    generateGen(): Gen {
        const g: Gen = {
            code: [],
            color: randomColor(),
            mutations: 0
        }
        const cnt = randomInt(minGenLength, maxGenLength)
        for (let i = 0; i < cnt; i++) {
            g.code.push(randomInt(0, maxCommand))
        }
        return g
    }

    copyGen(g: Gen): Gen {
        return {
            code: [...g.code],
            color: g.color,
            mutations: g.mutations
        }
    }

    override init(parentBot: Bot | null ): void {
        this.cursor = 0
        this.gens = []
        this.currentGenIndex = 0

        if (parentBot) {
            const p = parentBot as MainBot
            for (let i = 0; i < genCount; i++) {
                this.gens.push(this.copyGen(p.gens[i]))
            }
            if (this.kind === BotKind.Stem) this.mutate()
        } else {

            const goodGens = this.engine.getGoodGens()

            const goodProc = this.engine.params!.conf!.goodBotsProbability! || 0
            const mxGood = goodGens.length-1
            console.log(goodProc)


            if ((mxGood>=0) && (randomInt(0, 100) < goodProc)) {

                const idx = randomInt(0, mxGood)
                this.gens = JSON.parse(goodGens[idx])

            }
            else
            {
                for (let i = 0; i < genCount; i++) {
                    this.gens.push(this.generateGen())
                }
            }
        }
    }

    mutate(): void {
        const idx = randomInt(0, genCount-1)
        const mode = randomInt(0, 50)
        if (mode<3) {
            switch (mode) {
            // Добавить случайную команду
            case 0:
                this.gens[idx].code.splice(randomInt(0, this.gens[idx].code.length), 0, randomInt(0, maxCommand))
                break
                // Удалить случайную команду
            case 1:
                if (this.gens[idx].code.length > minGenLength) {
                    this.gens[idx].code.splice(randomInt(0, this.gens[idx].code.length - 1), 1)
                }
                break
                // Заменить случайную команду
            case 2:
                this.gens[idx].code[randomInt(0, this.gens[idx].code.length - 1)] = randomInt(0, maxCommand)
                break
            }

            this.gens[idx].mutations++

            if (this.gens[idx].mutations > maxMutations) {
                this.gens[idx].color = randomColor()
                this.gens[idx].mutations = 0
                //console.log("New Color! ", idx, this.gens[idx].color)
            }
        }
    }

    // Половое размножение
    override mergeStem(bot: MainBot): void {
        const idx = randomInt(0, genCount-1)
        //console.log("Merge Stem",idx)
        this.gens[idx] = this.copyGen(bot.gens[idx])
    }



    getID(): string {
        return this.gens.map(g => g.color).join("")
    }

    getColors(): drawColors {
        return {
            color: this.gens[0].color,
            borderColor: this.gens[1].color,
        }
    }

}