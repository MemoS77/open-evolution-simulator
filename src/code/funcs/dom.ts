import EngineInfo from "../types/engine-info"
import getFields from "./get-fields"

export function getCanvasCont(): HTMLDivElement {
    let cont = document.getElementById("oes-canvas-cont") as HTMLDivElement
    if (!cont) {
        cont = document.createElement("div")
        cont.id = "oes-canvas-cont"
        cont.style.width = "100vw"
        cont.style.height = "100vh"
        document.body.appendChild(cont)
    }
    return cont
}

export function setFieldsList(engine: EngineInfo) {
    const fields = getFields(engine.id, engine.version)
    const list = document.getElementById("fields-list") as HTMLSelectElement
    list.innerHTML = ""
    fields.forEach((field, index) => {
        const option = document.createElement("option")
        option.value = index.toString()
        option.innerText = field.name
        list.appendChild(option)
    })
}