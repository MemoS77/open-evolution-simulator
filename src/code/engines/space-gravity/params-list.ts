import EngineParams from "../../types/engine-params"

const paramsList: EngineParams[] = [{
    name: "Big Field",
    size: {x: 1000, y: 800},
    count: 500,
    infinityX: true,
    infinityY: true,
    conf: {
        glueDistance: 4,
        maxMass: 20,
        densityConst: 0.3,
        gravityConst: 0.2
    }
},
{
    name: "Many objects, low gravity",
    size: {x: 1900, y: 1000},
    count: 1500,
    infinityX: true,
    infinityY: true,
    conf: {
        glueDistance: 4,
        maxMass: 100,
        densityConst: 0.2,
        gravityConst: 0.05
    }
},
{
    name: "Many objects, small field, very low gravity",
    size: {x: 800, y: 600},
    count: 2000,
    infinityX: true,
    infinityY: true,
    conf: {
        glueDistance: 3,
        maxMass: 20,
        densityConst: 0.2,
        gravityConst: 0.002
    }
}
]

export default paramsList
