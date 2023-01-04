import Point from "../../types/point"
import {invert4Direction} from "../../funcs/utils"
import FullEvo from "./full-evo"
import {FourDirection} from "../../enums/four-direction"
import {BotKind} from "./enums"
import stem from "./cell-draw/stem"
import leaf from "./cell-draw/leaf"
import armor from "./cell-draw/armor"
import {CellAction} from "./types"

// Общий класс для всех возможных ботов
export default abstract class Bot {
    energy: number
    color: string
    position: Point
    borderColor: string
    direction: FourDirection
    rX: number
    rY: number
    rZ: number
    readonly engine: FullEvo
    kind: BotKind
    engineIndex: number



    constructor(engine: FullEvo,
        kind: BotKind,
        position: Point,
        color: string,
        borderColor: string,
        energy: number,
        direction: FourDirection,
        parentBot?: Bot) {
        this.kind = kind
        this.color = color
        this.borderColor = borderColor
        this.energy = energy
        this.engine = engine
        this.direction = direction
        this.position = position
        this.rX = 0
        this.rY = 0
        this.rZ = 0
        this.engineIndex = -1
        this.init(parentBot)
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
    abstract init(parentBot?: Bot): void

    // Действие если клетка выжила при столкновении (выживает одна).
    // Например, получить информацию о другой для полового размножения
    protected abstract onCollisionAlive(bot: Bot[]): void
    protected abstract getAction(): CellAction

}


