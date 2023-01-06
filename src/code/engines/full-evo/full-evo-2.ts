import EngineInfo from "../../types/engine-info"
import FullEvo from "./full-evo"
import {goodGens_2} from "./good-gens-2"

export default class FullEvo2 extends FullEvo {
    override  getInfo(): EngineInfo {
        const info = super.getInfo()
        info.version = 2
        info.description = "Изменен принцип столкновения клеток и некоторые другие вещи"
        return info
    }

    override getGoodGens(): string[] {
        return goodGens_2
    }

}