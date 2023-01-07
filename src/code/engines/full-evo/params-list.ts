import EngineParams from "../../types/engine-params"
import {WorldParams} from "./types"

export interface PlantsEngineParams extends EngineParams {
    conf: WorldParams
}


export const paramsList: PlantsEngineParams[] = [
    {
        name: "Deep Ocean",
        size: {x: 192, y: 128},
        count: 1500,
        conf: {
            centerNotEnergy: true,
            oceanMode: true,
        }
    },
    {
        name: "Standard map. New bots",
        size: {x: 145, y: 85},
        count: 500,
        conf: {
            centerNotEnergy: true,
            verticalNoEnergy: true,
        }
    },
    {
        name: "Standard map. With prepared bots",
        size: {x: 145, y: 85},
        count: 500,
        conf: {
            centerNotEnergy: true,
            verticalNoEnergy: true,
            goodBotsProbability: 20
        }
    },

    {
        name: "Small with line. New bots",
        size: {x: 104, y: 58},
        count: 400,
        conf: {
            centerNotEnergy: true
        }
    },
    {
        name: "Small with line. With prepared bots",
        size: {x: 104, y: 58},
        count: 400,
        conf: {
            centerNotEnergy: true,
            goodBotsProbability: 20

        }
    },


    {
        name: "One area. New bots",
        size: {x: 80, y: 50},
        count: 200,
        conf: {

        }
    },

    {
        name: "One area. With prepared bots",
        size: {x: 80, y: 50},
        count: 200,
        conf: {
            goodBotsProbability: 20
        }
    },

]