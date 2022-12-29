import EngineParams from "../../types/engine-params"
import {EvoParams} from "./types"

export interface EvoEngineParams extends EngineParams {
    conf: EvoParams
}


const paramsList: EvoEngineParams[] = [{
    name: "Basic Field",
    size: {x: 60, y: 40},
    count: 100,
    conf: {
        defaultEnergy: 90,
        energyForReproduction: 100,
        maxBotEnergy: 400,
        deathBotEnergy: 30,
        maxCellEnergy: 5,
        maxCellOrganic: 70,
    }
}]

export default paramsList