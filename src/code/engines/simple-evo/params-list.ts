import EngineParams from "../../types/engine-params"
import {EvoParams} from "./types"

export interface EvoEngineParams extends EngineParams {
    conf: EvoParams
}


const paramsList: EvoEngineParams[] = [{
    name: "Basic Field",
    size: {x: 70, y: 50},
    count: 200,
    conf: {
        defaultEnergy: 90,
        energyForReproduction: 100,
        maxBotEnergy: 300,
        deathBotEnergy: 50,
        maxCellEnergy: 4,
        maxCellOrganic: 150,
        maxLifeTime: 1000,
    }
}]

export default paramsList