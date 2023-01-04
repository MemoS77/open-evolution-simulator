import EngineParams from "../../types/engine-params"
import {WorldParams} from "./types"

export interface PlantsEngineParams extends EngineParams {
    conf: WorldParams
}


export const paramsList: PlantsEngineParams[] = [{
    name: "Standard map",
    size: {x: 70, y: 50},
    count: 1,
    conf: {}
}]