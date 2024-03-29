import Engine from "../engines/engine"
import EngineParams from "../types/engine-params"

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

export function setParamsList(engine: Engine): EngineParams[] {
    const fields = engine.getParamsList()
    const list = document.getElementById("fields-list") as HTMLSelectElement
    list.innerHTML = ""
    fields.forEach((field, index) => {
        const option = document.createElement("option")
        option.value = index.toString()
        option.innerText = <string>field.name
        list.appendChild(option)
    })
    return fields
}

export function setViewList(list: string[]) {
    const select = document.getElementById("show-mode") as HTMLSelectElement
    select.innerHTML = ""
    list.forEach((item, index) => {
        const option = document.createElement("option")
        option.value = index.toString()
        option.innerText = item
        select.appendChild(option)
    })
}

export function showEngineDescription(info: string) {
    const desc = document.getElementById("engine-description") as HTMLDivElement
    desc.innerHTML = info
}


export function setFilterList(list: string[]) {
    const select = document.getElementById("filter-mode") as HTMLSelectElement
    select.innerHTML = ""
    list.forEach((item, index) => {
        const option = document.createElement("option")
        option.value = index.toString()
        option.innerText = item
        select.appendChild(option)
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