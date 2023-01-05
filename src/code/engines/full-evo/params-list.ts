import EngineParams from "../../types/engine-params"
import {WorldParams} from "./types"

export interface PlantsEngineParams extends EngineParams {
    conf: WorldParams
}


export const paramsList: PlantsEngineParams[] = [{
    name: "Standard map",
    size: {x: 90, y: 70},
    count: 500,
    conf: {}
}]