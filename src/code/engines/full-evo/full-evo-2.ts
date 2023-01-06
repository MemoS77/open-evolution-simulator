import EngineInfo from "../../types/engine-info"
import FullEvo from "./full-evo"
import {goodGens_2} from "./good-gens-2"
import {Cell} from "./types"
import Bot from "./bot"
import {BotKind} from "./enums"
import {minBotEnergy} from "./const"

const leafDamage = 1
const stemDamage = minBotEnergy * 3
const armorDamage = stemDamage * 5


export default class FullEvo2 extends FullEvo {
    override  getInfo(): EngineInfo {
        const info = super.getInfo()
        info.version = 2
        info.description = "Изменен принцип столкновения клеток. На одной клетке может быть несколько ботов. Но, стволовые сливаются сразу, " +
            "а шипы и оставшаяся стволовая наносят взаимный урон. У шипов гораздо больше."
        return info
    }

    override getGoodGens(): string[] {
        return goodGens_2
    }

    private getDamage(kind: BotKind): number {
        switch (kind) {
        case BotKind.Leaf:
            return leafDamage
        case BotKind.Stem:
            return stemDamage
        case BotKind.Armor:
            return armorDamage
        }
    }

    override workCollision(cell: Cell): void {
        let stem: Bot | null = null
        // Сначала сливаем стволовые клетки
        let noStemCells = false

        cell.bots.forEach(botId => {
            const bot = this.getBot(botId)
            if (bot) {
                if (bot.kind === BotKind.Stem) {
                    if (stem===null)  stem = bot
                    else {
                        stem.mergeStem(bot)
                        stem.addEnergy(Math.floor(bot.energy))
                        bot.die()
                    }
                } else {
                    noStemCells = true
                    if (bot.kind === BotKind.Leaf) {
                        bot.die()
                    }
                }
            }
        })

        if (noStemCells) {
            //do {

            cell.bots.forEach(botId => {
                const bot = this.getBot(botId)
                if (bot) {
                    cell.bots.forEach(botId2 => {
                        if (botId !== botId2) {
                            const bot2 = this.getBot(botId)
                            if (bot2) {
                                const e = this.getDamage(bot.kind)
                                bot2.delEnergy(this.getDamage(bot.kind))
                                this.addOrganic(bot.position, Math.round(e / 10))
                            }
                        }
                    })
                }
            })
        }
    }

}