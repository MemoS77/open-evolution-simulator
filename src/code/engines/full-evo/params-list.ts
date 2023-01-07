import EngineParams from "../../types/engine-params"
import {WorldParams} from "./types"

export interface PlantsEngineParams extends EngineParams {
    conf: WorldParams
}


export const paramsList: PlantsEngineParams[] = [
    {
        name: "Deep Ocean",
        size: {x: 160, y: 90},
        count: 1500,
        conf: {
            centerNotEnergy: true,
            oceanMode: true,
        }
    },
    {
        name: "Ocean mini with prepared bots",
        size: {x: 80, y: 45},
        count: 500,
        conf: {
            centerNotEnergy: true,
            oceanMode: true,
            goodBotsProbability: 20
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