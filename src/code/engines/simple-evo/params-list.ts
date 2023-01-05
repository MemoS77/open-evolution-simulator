import EngineParams from "../../types/engine-params"
import {EvoParams} from "./types"

export interface EvoEngineParams extends EngineParams {
    conf: EvoParams
}


const paramsList: EvoEngineParams[] = [{
    name: "Big map with border, average params",
    size: {x: 80, y: 50},
    count: 1000,
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
    name: "Average params",
    size: {x: 60, y: 40},
    count: 500,
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
    name: "Smaller map and fewer greens",
    size: {x: 40, y: 40},
    count: 400,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 5,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: false,
        greensProp: 0.2,
        organicProp: 0.1
    }
},
{
    name: "Few greens. No organic",
    size: {x: 60, y: 40},
    count: 400,
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
        greensProp: 0.05,
        organicProp: 0
    }
},
{
    name: "Organics only",
    size: {x: 80, y: 40},
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
},
{
    name: "No resources, green in center and top line",
    size: {x: 30, y: 30},
    count: 500,
    conf: {
        defaultEnergy: 200,
        energyForReproduction: 60,
        maxBotEnergy: 400,
        deathBotEnergy: 40,
        maxCellEnergy: 3,
        maxCellOrganic: 200,
        maxLifeTime: 700,
        centerBorder: false,
        greensProp: 0,
        organicProp: 0,
        greens: [
            // Квадрат 7x7 в центре
            {x: 12, y: 12},
            {x: 12, y: 13},
            {x: 12, y: 14},
            {x: 12, y: 15},
            {x: 12, y: 16},
            {x: 12, y: 17},
            {x: 12, y: 18},
            {x: 13, y: 12},
            {x: 13, y: 18},
            {x: 14, y: 12},
            {x: 14, y: 18},
            {x: 15, y: 12},
            {x: 15, y: 18},
            {x: 16, y: 12},
            {x: 16, y: 18},
            {x: 17, y: 12},
            {x: 17, y: 18},
            {x: 18, y: 12},
            {x: 18, y: 13},
            {x: 18, y: 14},
            {x: 18, y: 15},
            {x: 18, y: 16},
            {x: 18, y: 17},
            {x: 18, y: 18},

            // Квадрат 3x3 в центре
            {x: 14, y: 14},
            {x: 14, y: 15},
            {x: 14, y: 16},
            {x: 15, y: 14},
            {x: 15, y: 16},
            {x: 16, y: 14},
            {x: 16, y: 15},
            {x: 16, y: 16},

            // Полоса вверху
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 0},
            {x: 4, y: 0},
            {x: 5, y: 0},
            {x: 6, y: 0},
            {x: 7, y: 0},
            {x: 8, y: 0},
            {x: 9, y: 0},
            {x: 10, y: 0},
            {x: 11, y: 0},
            {x: 12, y: 0},
            {x: 13, y: 0},
            {x: 14, y: 0},
            {x: 15, y: 0},
            {x: 16, y: 0},
            {x: 17, y: 0},
            {x: 18, y: 0},
            {x: 19, y: 0},
            {x: 20, y: 0},
            {x: 21, y: 0},
            {x: 22, y: 0},
            {x: 23, y: 0},
            {x: 24, y: 0},
            {x: 25, y: 0},
            {x: 26, y: 0},
            {x: 27, y: 0},
            {x: 28, y: 0},
            {x: 29, y: 0},

            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1},
            {x: 4, y: 1},
            {x: 5, y: 1},
            {x: 6, y: 1},
            {x: 7, y: 1},
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1},
            {x: 11, y: 1},
            {x: 12, y: 1},
            {x: 13, y: 1},
            {x: 14, y: 1},
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1},
            {x: 18, y: 1},
            {x: 19, y: 1},
            {x: 20, y: 1},
            {x: 21, y: 1},
            {x: 22, y: 1},
            {x: 23, y: 1},
            {x: 24, y: 1},
            {x: 25, y: 1},
            {x: 26, y: 1},
            {x: 27, y: 1},
            {x: 28, y: 1},
            {x: 29, y: 1},
                




        ]
    }
},
]

export default paramsList