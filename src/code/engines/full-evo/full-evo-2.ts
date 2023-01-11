import EngineInfo from "../../types/engine-info"
import FullEvo from "./full-evo"
import {goodGens_2} from "./good-gens-2"
import {Cell} from "./types"
import Bot from "./bot"
import {BotKind} from "./enums"
import {minBotEnergy} from "./const"
import MainBot2 from "./main-bot-2"

const leafDamage = 1

// При высокой энергии и постоянном притоке, стволовую будет не так просто убить
// Если шип одиночный, у стволовой есть шанс его уничтожит

const stemDamage = minBotEnergy * 3
const armorDamage = stemDamage * 10


export default class FullEvo2 extends FullEvo {
    override  getInfo(): EngineInfo {
        const info = super.getInfo()
        info.version = 2
        info.description = "Изменен принцип столкновения клеток. На одной клетке временно может быть несколько ботов. " +
            "Но, стволовые сливаются сразу, делясь генами. " +
            "Шипы и оставшаяся стволовая наносят взаимный урон, который у шипов гораздо больше. У ботов 9 генов, " +
            "включающиеся в зависимости от оставшейся энергии и освещенности в клетке. Таким образом возможно очень разное поведение ботов в разных условиях. " +
            "Главная среда движка - это океан, со сменой дня и ночи и уровня освещенности в зависимости от глубины. " +
            "Органика плавно падают вниз и накапливается на дне. Посредине зона куда свет не попадает никогда"
        return info
    }

    override maxEat(bot: Bot) {
        return Math.max(bot.energy*3, minBotEnergy*10)
    }

    override getGoodGens(): string[] {
        return goodGens_2
    }


    protected getBotClass() {
        return MainBot2
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
                                const e = Math.min(this.getDamage(bot.kind), Math.floor(bot.energy/3))
                                bot2.delEnergy(this.getDamage(bot.kind))
                                this.addOrganic(bot.position, Math.ceil(e / 10))
                            }
                        }
                    })
                }
            })
        }
    }

}