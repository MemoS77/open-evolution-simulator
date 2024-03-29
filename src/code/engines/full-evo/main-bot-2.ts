import MainBot from "./main-bot"
import {maxBotEnergy, maxOrganicForPoison} from "./const"
import Bot from "./bot"

export default class MainBot2 extends MainBot {

    override caseGen(): void {
        // Ген выбирается в зависимости от количества энергии (разное проведение при минимальном, среднем и максимальном)
        const min = maxBotEnergy*0.2
        const max = maxBotEnergy*0.9
        let needIndex = this.energy<min ? 0 : (this.energy>=max ? 2 : 1)


        const fCell = this.engine.getFieldCell(this.position)
        if (fCell) {
            if (fCell.organic>=maxOrganicForPoison*0.2)  needIndex += 9
            else {
                if (fCell.energy <= 1) {
                    //console.log("Low gen!", fCell.energy, this.engine.isPoisonedCell(fCell))
                    needIndex += 3
                } else if (this.energy >= 5) needIndex += 6
            }
        }
        this.switchGen(needIndex)
    }

    override init(parentBot: Bot | null ): void {
        this.genCount = 12
        super.init(parentBot)

    }

}