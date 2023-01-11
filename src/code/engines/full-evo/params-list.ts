import EngineParams from "../../types/engine-params"
import {WorldParams} from "./types"

export interface PlantsEngineParams extends EngineParams {
    conf: WorldParams
}


export const paramsList: PlantsEngineParams[] = [
    {
        name: "Ocean. Low energy",
        size: {x: 128, y: 72},
        count: 2500,
        conf: {
            centerNotEnergy: true,
            oceanMode: true,
            // Энергия от солнца не более на одну свободную клетку
            maxPhotoEnergy: 6,
        }
    },
    {
        name: "Deep Ocean. Normal energy",
        size: {x: 160, y: 90},
        count: 2500,
        conf: {
            centerNotEnergy: true,
            oceanMode: true,
            // Энергия от солнца не более на одну свободную клетку
            maxPhotoEnergy: 7,
        }
    },
    {
        name: "Deep Ocean. Many energy",
        size: {x: 160, y: 90},
        count: 2500,
        conf: {
            centerNotEnergy: true,
            oceanMode: true,
        }
    },
    {
        name: "Ocean mini",
        size: {x: 80, y: 45},
        count: 1500,
        conf: {
            centerNotEnergy: true,
            oceanMode: true,
        }
    },
    {
        name: "Standard map",
        size: {x: 145, y: 85},
        count: 1500,
        conf: {
            centerNotEnergy: true,
            verticalNoEnergy: true,
        }
    },
    {
        name: "Standard map. With prepared bots",
        size: {x: 145, y: 85},
        count: 1500,
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