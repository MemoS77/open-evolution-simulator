import EngineParams from "../types/engine-params"

const fields: EngineParams[] = [
    {
        name: "Test field",
        size: { x: 800, y: 500 },
        compatibleEngines: [{id: "test", versions: [1]}],
        infinityX: false,
        infinityY: false,
    }]

export default fields