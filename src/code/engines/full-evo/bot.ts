import Point from "../../types/point"
import {invert4Direction} from "../../funcs/utils"
import FullEvo from "./full-evo"
import {FourDirection} from "../../enums/four-direction"
import {BotKind} from "./enums"
import stem from "./cell-draw/stem"
import leaf from "./cell-draw/leaf"
import armor from "./cell-draw/armor"
import {CellAction} from "./types"
import {criticalBotEnergy, maxBotEnergy, minBotEnergy} from "./const"

// Общий класс для всех возможных ботов
export default abstract class Bot {
    energy: number
    color: string
    position: Point
    borderColor: string
    direction: FourDirection
    rX = 0
    rY = 0
    rZ = 0
    readonly engine: FullEvo
    kind: BotKind
    engineIndex: number
    lastAction: CellAction | null



    constructor(engine: FullEvo,
        index: number,
        kind: BotKind,
        position: Point,
        energy: number,
        parentBot: Bot | null,
        direction?: FourDirection,
        color?: string,
        borderColor?: string,
    ) {
        this.kind = kind
        this.energy = energy
        this.engine = engine
        this.position = position
        this.color = color ? color : parentBot!.color
        this.borderColor = borderColor ? borderColor : parentBot!.borderColor
        this.direction = (direction!==undefined) ? direction : parentBot!.direction
        this.rX = 0
        this.rY = 0
        this.rZ = 0
        this.engineIndex = index
        this.lastAction = null
        this.init(parentBot)
    }

    addEnergy(energy: number): void {
        if (this.energy > criticalBotEnergy) {
            this.energy += Math.min(minBotEnergy*2, energy)
        } else if (this.energy+energy > criticalBotEnergy) this.energy = criticalBotEnergy
        else  this.energy += energy
        this.sendEnergy()
        if (this.energy >= maxBotEnergy) this.die()
    }

    // Почитать рекурсивно сколько предков у бота
    getParentsCount(cnt = 0): number {
        const parent = this.getHost()
        if (parent) {
            cnt++
            if (cnt>50) return cnt // защита от зацикливания
            return parent.getParentsCount(cnt)
        }
        return cnt
    }

    isParent(bot: Bot, cnt = 0): boolean {
        cnt++
        if (cnt>50) return true
        const host = this.getHost()
        if (host === bot) return true
        if (host) return host.isParent(bot, cnt)
        return false
    }



    // Избыток энергии отправляется боту в противоположном направлении
    sendEnergy(): void {
        const host = this.getHost()
        if (host && (host.energy+1<this.energy)) {
            const energy = Math.floor((this.energy - host.energy)/2)
            this.delEnergy(energy)
            host.addEnergy(energy)
            //console.log("send energy", energy, "from", this.engineIndex, "to", host.engineIndex)
        }
    }


    delEnergy(energy: number): void {
        this.energy -= energy
        if (this.energy < minBotEnergy) this.die()
    }


    // Получить хозяина, если есть
    public getHost(): Bot | null {
        const d = invert4Direction(this.direction)
        const p = this.engine.pointByDirection(this.position, d)
        if (p) {
            const cell = this.engine.getFieldCell(p)

            if (cell && cell.bots.length > 0) {
                const bot = this.engine.getBot(cell.bots[0])
                if (bot && bot.kind === BotKind.Stem)  return bot
            }
        }
        return null
    }


    isAlive(): boolean {
        return this.energy > 0
    }

    die(): void {
        this.engine.removeBot(this)
    }


    draw(ctx: CanvasRenderingContext2D): void {
        const commonColor = this.borderColor
        const color = this.color
        switch (this.kind) {
        case BotKind.Stem:
            stem(ctx, this.direction, this.position, commonColor, color)
            break
        case BotKind.Leaf:
            leaf(ctx, this.direction, this.position, commonColor, color)
            break
        case BotKind.Armor:
            armor(ctx, this.direction, this.position, commonColor, color)
            break
        }
    }


    // Создание начальной клетки. Возможна мутация и прочее
    abstract init(parentBot: Bot | null): void

    // Действие если клетка выжила при столкновении (выживает одна).
    // Например, получить информацию о другой для полового размножения
    abstract mergeStem(bot: Bot): void
    abstract getAction(): CellAction

}


