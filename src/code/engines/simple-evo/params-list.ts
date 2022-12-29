import EngineParams from "../../types/engine-params"
import {EvoParams} from "./types"

export interface EvoEngineParams extends EngineParams {
    conf: EvoParams
}


const paramsList: EvoEngineParams[] = [{
    name: "Basic Field",
    size: {x: 80, y: 50},
    count: 200,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 5,
        maxCellOrganic: 200,
        maxLifeTime: 700,
    }
}]

export default paramsList