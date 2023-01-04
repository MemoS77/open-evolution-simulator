import Bot from "./bot"
import {CellActionKind} from "./enums"
import {CellAction, Gen} from "./types"
import {randomInt} from "../../funcs/buttons"
import {maxGenLength, maxGenSteps, minGenLength} from "./const"
import {FourDirection} from "../../enums/four-direction"
import {GoodGens} from "./good-gens"
import {randomColor} from "../../funcs/utils"

const maxCommand = 38

export default class MainBot extends Bot {

    gens: Gen[]
    cursor: number


    private getGen(): Gen {
        return this.gens[this.kind]
    }

    nextCommand(inc = 1): number {
        this.cursor += inc
        const g = this.getGen()
        if (this.cursor >= g.length) {
            this.cursor = this.cursor % this.gens.length
        }
        while (this.cursor < 0) {
            this.cursor += g.length
        }
        return g[this.cursor]
    }

    override getAction(): CellAction {
        let kind = null
        const host = this.getHost()
        const g = this.getGen()
        let step = 0

        let p = this.engine.pointByDirection(this.position, this.direction, this.rX%4)
        const y = this.rY%3
        if (p && y>0) {
            p = this.engine.pointByDirection(p, y===1 ? FourDirection.Left : FourDirection.Right)
        }
        const targetCell = p ? this.engine.getFieldCell(p) : null
        const targetBot = targetCell ? (targetCell.bots.length ? this.engine.getBot(targetCell.bots[0]) : null) : null


        do {
            const c = g[this.cursor]
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
                this.rX = this.rY
                break
            case 7:
                this.rY = this.rX
                break
            case 8:
                this.rY+=this.rX
                break
            case 9:
                this.rY-=this.rX
                if (this.rY < 0) this.rY = 0
                break
            case 10:
                this.rX = this.energy
                break
            case 11:
                this.rX = randomInt(0, 100)
                break
            case 12:
                this.rX = this.getParentsCount()
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
                    (this.isParent(targetBot) || targetBot.isParent(this) ? 1 : 2)
                    : 0) : 3
                break
            case 24:
                this.rY = targetBot ? targetBot.kind : 0
                break
            case 25:
                this.rY = targetCell ? targetCell.energy : 0
                break
            case 26:
                this.rY = targetCell ? targetCell.organic: 0
                break
            case 27:
                this.rY = targetBot ? targetBot.energy : 0
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
                this.nextCommand(this.rX)
                break
            case 32:
                this.nextCommand(this.rY)
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


            }
            step++
            if (step>maxGenSteps) return {
                kind: CellActionKind.Idle,
                param: 0
            }
            this.nextCommand()

        } while (kind === null)

        return {kind, param: this.rX}
    }

    generateGen(): Gen {
        const g: Gen = []
        const cnt = randomInt(minGenLength, maxGenLength)
        for (let i = 0; i < cnt; i++) {
            g.push(randomInt(0, maxCommand))
        }
        return g
    }

    override init(parentBot: Bot | null ): void {
        this.cursor = 0
        this.gens = []
        if (parentBot) {
            const p = parentBot as MainBot
            for (let i = 0; i < 3; i++) {
                this.gens.push(p.gens[i])
            }
            this.mutate()
        } else {
            if (randomInt(0, 100) < 50) {
                const mx = GoodGens.length-1
                const idx = randomInt(0, mx)
                this.gens = GoodGens[idx]
            } else {
                for (let i = 0; i < 3; i++) {
                    this.gens.push(this.generateGen())
                }
            }
        }
    }

    mutate(): void {
        const idx = randomInt(0, 2)
        const mode = randomInt(0, 200)
        if (mode<3) {
            //console.log("Old Gen", this.gens[idx])
            switch (mode) {
            // Добавить случайную команду
            case 0:
                this.gens[idx].splice(randomInt(0, this.gens[idx].length), 0, randomInt(0, maxCommand))
                break
                // Удалить случайную команду
            case 1:
                if (this.gens[idx].length > minGenLength) {
                    this.gens[idx].splice(randomInt(0, this.gens[idx].length - 1), 1)
                }
                break
                // Заменить случайную команду
            case 2:
                this.gens[idx][randomInt(0, this.gens[idx].length - 1)] = randomInt(0, maxCommand)
                break
            }

            const changeColor = randomInt(0, 100)
            if (changeColor < 10) {
                console.log("New Color!")
                this.color = randomColor()
            } else if (changeColor > 90) {
                console.log("New Border Color!")
                this.borderColor = randomColor()
            }
        }
    }

    // Половое размножение
    override mergeStem(bot: MainBot): void {
        const idx = randomInt(0, 2)
        this.gens[idx] = bot.gens[idx]

    }

}