import EngineParams from "../../types/engine-params"

const defParams: EngineParams = {
    name: "Default Params",
    size: {x: 800, y: 800},
    count: 100,
    infinityX: true,
    infinityY: true,
    conf: {
        glueDistance: 3,
        maxMass: 10,
        densityConst: 0.5,
        gravityConst: 1

    }
}

export default defParams