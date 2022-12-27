import EngineInfo from "../types/engine-info"
import getFields from "./get-fields"
import Engine from "../engines/engine"

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
        option.innerText = <string>field.name
        list.appendChild(option)
    })
}

export function setEnginesList(engines: Engine[]) {
    const list = document.getElementById("engines-list") as HTMLSelectElement
    list.innerHTML = ""
    engines.forEach((engine, index) => {
        const option = document.createElement("option")
        option.value = index.toString()
        option.innerText = engine.getTitle()
        list.appendChild(option)
    })
}