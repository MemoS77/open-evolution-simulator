import Field from "../types/field-info"

const fields: Field[] = [
    {
        name: "Test field",
        size: { x: 500, y: 500 },
        compatibleEngines: [{id: "test", versions: [1]}],
        infinityX: false,
        infinityY: false,
    }]

export default fields