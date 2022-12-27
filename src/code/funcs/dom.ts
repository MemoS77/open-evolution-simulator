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