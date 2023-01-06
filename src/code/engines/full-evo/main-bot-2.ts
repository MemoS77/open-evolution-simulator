import MainBot from "./main-bot"
import {maxBotEnergy} from "./const"
import Bot from "./bot"

export default class MainBot2 extends MainBot {

    override caseGen(): void {
        // Ген выбирается в зависимости от количества энергии (разное проведение при минимальном, среднем и максимальном)
        const min = maxBotEnergy*0.2
        const max = maxBotEnergy*0.95
        const needIndex = this.energy<min ? 0 : (this.energy>=max ? 2 : 1)
        this.switchGen(needIndex)
    }

    override init(parentBot: Bot | null ): void {
        this.genCount = 3
        super.init(parentBot)

    }

}