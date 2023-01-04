import {BotCellKind} from "./enums"
import Point from "../../types/point"
import Bot from "./bot"
import {FourDirection} from "../../enums/four-direction"
import stem from "./cell-draw/stem"
import leaf from "./cell-draw/leaf"
import mouth from "./cell-draw/mouth"
import armor from "./cell-draw/armor"

export default abstract class BotCell {
    position: Point
    protected kind: BotCellKind
    owner: Bot // Организм, которому принадлежит эта клетка
    public direction: FourDirection
    public children: number[]
    public alive: boolean

    protected constructor(direction: FourDirection, position: Point, owner: Bot, kind: BotCellKind) {
        this.position = position
        this.owner = owner
        this.direction = direction
        this.children = []
        this.alive = true
        this.kind = kind
    }



    haveChildren(): boolean {
        return this.children.length > 0
    }


    getKind(): BotCellKind {
        return this.kind
    }

    getEnergy(): number {
        return this.owner.getCellEnergy()
    }


    abstract getColor(): string


    draw(ctx: CanvasRenderingContext2D): void {
        const commonColor = this.owner.getColor()
        const color = this.getColor()
        switch (this.kind) {
        case BotCellKind.Stem:
            stem(ctx, this.direction, this.position, commonColor, color)
            break
        case BotCellKind.Leaf:
            leaf(ctx, this.direction, this.position, commonColor, color)
            break
        case BotCellKind.Mouth:
            mouth(ctx, this.direction, this.position, commonColor, color)
            break
        case BotCellKind.Armor:
            armor(ctx, this.direction, this.position, commonColor, color)
            break
        }
    }
}