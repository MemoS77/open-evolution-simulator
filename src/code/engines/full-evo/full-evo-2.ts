import EngineInfo from "../../types/engine-info"
import FullEvo from "./full-evo"
import {goodGens_2} from "./good-gens-2"
import {Cell} from "./types"
import Bot from "./bot"
import {BotKind} from "./enums"
import {cellDieEnergyProp, minBotEnergy} from "./const"
import MainBot2 from "./main-bot-2"

const leafDamage = 1

// При высокой энергии и постоянном притоке, стволовую будет не так просто убить
// Если шип одиночный, у стволовой есть шанс его уничтожит

const stemDamage = minBotEnergy * 2
const armorDamage = stemDamage * 10


export default class FullEvo2 extends FullEvo {
    override  getInfo(): EngineInfo {
        const info = super.getInfo()
        info.version = 2
        info.description = "Изменен принцип столкновения клеток. На одной клетке временно может быть несколько ботов. " +
            "Но, стволовые сливаются сразу, делясь генами. " +
            "Шипы и оставшаяся стволовая наносят взаимный урон, который у шипов гораздо больше. У ботов 12 генов, " +
            "включающиеся в зависимости от оставшейся энергии, освещенности и органики в клетке. " +
            "Таким образом возможно очень разное поведение ботов в разных условиях. " +
            "Главная среда движка - это океан, со сменой дня и ночи и уровня освещенности в зависимости от глубины. " +
            "Органика плавно падают вниз и накапливается на дне. Посредине зона куда свет не попадает никогда"

        return info
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
            //this.indexBots() Медленно, лучше проверка энергии
            //do {

            cell.bots.forEach(botId => {
                const bot = this.getBot(botId)
                if (bot && bot.energy) {
                    cell.bots.forEach(botId2 => {
                        if (botId !== botId2) {
                            const bot2 = this.getBot(botId)
                            if (bot2 && bot2.energy) {
                                const e = Math.min(this.getDamage(bot.kind), bot.energy, bot2.energy)
                                bot2.delEnergy(e)
                                this.addOrganic(bot.position, Math.floor(e / cellDieEnergyProp))
                            }
                        }
                    })
                }
            })
        }
    }

}