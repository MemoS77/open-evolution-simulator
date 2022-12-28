import EngineParams from "../../types/engine-params"
import {EvoParams} from "./types"

export interface EvoEngineParams extends EngineParams {
    conf: EvoParams
}


const paramsList: EvoEngineParams[] = [{
    name: "Basic Field",
    size: {x: 80, y: 60},
    count: 100,
    conf: {
        defaultEnergy: 70,
        energyForReproduction: 150,
        maxBotEnergy: 250,
        deathBotEnergy: 20,
        maxCellEnergy: 10,
        maxCellOrganic: 50,
    }
}]

export default paramsList