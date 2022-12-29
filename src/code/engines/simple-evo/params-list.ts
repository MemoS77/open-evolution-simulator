import EngineParams from "../../types/engine-params"
import {EvoParams} from "./types"

export interface EvoEngineParams extends EngineParams {
    conf: EvoParams
}


const paramsList: EvoEngineParams[] = [{
    name: "Basic Field",
    size: {x: 90, y: 50},
    count: 200,
    conf: {
        defaultEnergy: 100,
        energyForReproduction: 80,
        maxBotEnergy: 500,
        deathBotEnergy: 100,
        maxCellEnergy: 4,
        maxCellOrganic: 200,
        maxLifeTime: 1500,
    }
}]

export default paramsList