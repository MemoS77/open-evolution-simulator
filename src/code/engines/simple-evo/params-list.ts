import EngineParams from "../../types/engine-params"
import {EvoParams} from "./types"

export interface EvoEngineParams extends EngineParams {
    conf: EvoParams
}


const paramsList: EvoEngineParams[] = [{
    name: "Big with border, average params",
    size: {x: 100, y: 50},
    count: 500,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 5,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: true,
        greensProp: 0.3,
        organicProp: 0.1
    }
},
{
    name: "Average res",
    size: {x: 60, y: 40},
    count: 200,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 5,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: false,
        greensProp: 0.3,
        organicProp: 0.1
    }
},
{
    name: "Few greens. No organic",
    size: {x: 60, y: 40},
    count: 300,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 5,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: false,
        greensProp: 0.1,
        organicProp: 0
    }
},
{
    name: "Extremely low greens. No organic",
    size: {x: 80, y: 40},
    count: 400,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 3,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: false,
        greensProp: 0.04,
        organicProp: 0
    }
},
{
    name: "Organics only",
    size: {x: 70, y: 40},
    count: 300,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 4,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: false,
        greensProp: 0,
        organicProp: 0.5
    }
},
{
    name: "Max resources",
    size: {x: 40, y: 40},
    count: 300,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 5,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: false,
        greensProp: 1,
        organicProp: 1
    }
}
]

export default paramsList