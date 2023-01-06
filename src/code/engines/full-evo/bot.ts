import Point from "../../types/point"
import {invert4Direction} from "../../funcs/utils"
import FullEvo from "./full-evo"
import {FourDirection} from "../../enums/four-direction"
import {BotKind} from "./enums"
import stem from "./cell-draw/stem"
import leaf from "./cell-draw/leaf"
import armor from "./cell-draw/armor"
import {CellAction, drawColors} from "./types"
import {maxBotEnergy, minBotEnergy} from "./const"
import {globalVars} from "../../inc/const"

// Общий класс для всех возможных ботов
export default abstract class Bot {
    energy: number
    position: Point
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
    ) {
        this.kind = kind
        this.energy = energy
        this.engine = engine
        this.position = position
        this.direction = (direction!==undefined) ? direction : (parentBot ? parentBot.direction : FourDirection.Up)
        this.rX = 0
        this.rY = 0
        this.rZ = 0
        this.engineIndex = index
        this.lastAction = null
        this.init(parentBot)
    }

    addEnergy(energy: number): void {
        /*if (this.energy > criticalBotEnergy) {
            this.energy += Math.min(minBotEnergy*2, energy)
        } else if (this.energy+energy > criticalBotEnergy) this.energy = criticalBotEnergy
        else */
        this.energy += energy
        this.sendEnergy()
        if (this.energy >= maxBotEnergy)  this.energy = maxBotEnergy // this.die()
    }



    abstract isSimilar(bot: Bot): boolean



    // Избыток энергии отправляется боту в противоположном направлении
    sendEnergy(): void {
        const host = this.getHost()
        if (host && (host.energy+minBotEnergy<this.energy)) {
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
        let r = this.hostByPoint(this.engine.pointByDirection(this.position, d))

        // У стволовых также учитываем боковые
        if (r ===null && this.kind === BotKind.Stem) {
            r = this.hostByPoint(this.engine.pointByDirection(this.position, FourDirection.Left))
            if (r ===null) {
                r = this.hostByPoint(this.engine.pointByDirection(this.position, FourDirection.Right))

            }
        }




        return r
    }


    private hostByPoint(p: Point | null): Bot | null {
        if (p) {
            const cell = this.engine.getFieldCell(p)
            if (cell && cell.bots.length > 0) {
                for (let i = 0; i < cell.bots.length; i++) {
                    const bot = this.engine.getBot(cell.bots[i])
                    if (bot && bot.kind === BotKind.Stem && this.isSimilar(bot)) return bot
                }
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


    abstract getColors(): drawColors

    draw(ctx: CanvasRenderingContext2D): void {
        let colors
        if (globalVars.showMode === 1) {
            const def = 50
            const green = Math.floor((this.energy + def) / (def + maxBotEnergy) * 255)
            const color = `rgb(0,${green},0)`
            colors = {
                borderColor: color,
                color: `rgb(0,${green},0)`,
            }
        } else
            colors = this.getColors()


        switch (this.kind) {
        case BotKind.Stem:
            stem(ctx, this.direction, this.position, colors.borderColor, colors.color)
            break
        case BotKind.Leaf:
            leaf(ctx, this.direction, this.position, colors.borderColor, colors.color)
            break
        case BotKind.Armor:
            armor(ctx, this.direction, this.position, colors.borderColor, colors.color)
            break
        }
    }


    // Создание начальной клетки. Возможна мутация и прочее
    abstract init(parentBot: Bot | null): void

    // Действие если клетка выжила при столкновении (выживает одна).
    // Например, получить информацию о другой для полового размножения
    abstract mergeStem(bot: Bot): void
    abstract getAction(): CellAction

    // Уникальный идентификатор бота на основе генома
    abstract getID(): string

}


