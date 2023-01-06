import {globalVars} from "../inc/const"

type Action = () => void;

export function bindStartButton(action: Action) {
    const button = document.getElementById("start-button")! as HTMLButtonElement
    button.addEventListener("click", action)
}

export function bindPauseButton(action: Action) {
    const button = document.getElementById("pause-button")! as HTMLButtonElement
    button.addEventListener("click", action)
}

export function bindResetButton(action: Action) {
    const button = document.getElementById("reset-button")! as HTMLButtonElement
    button.addEventListener("click", action)
}

export function bindStepButton(action: Action) {
    const button = document.getElementById("step-button")! as HTMLButtonElement
    button.addEventListener("click", action)
}

export function bindShowMode() {
    const select = document.getElementById("show-mode")! as HTMLSelectElement
    select.addEventListener("change", () => {
        const value = select.value
        globalVars.showMode = +value
    })
}

export function bindFilterMode() {
    const select = document.getElementById("filter-mode")! as HTMLSelectElement
    select.addEventListener("change", () => {
        const value = select.value
        globalVars.filterMode = +value
    })
}

export function bindFullScreen() {
    const button = document.getElementById("full-screen-button")! as HTMLButtonElement
    button.addEventListener("click", () => {
        const doc = document.documentElement//document.getElementById('oes-canvas')! as HTMLCanvasElement
        if (!document.fullscreenElement) {
            doc.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
            })
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    })
}

export function bindSpeed() {
    const select = document.getElementById("speed")! as HTMLSelectElement
    select.addEventListener("change", () => {
        const value = select.value
        globalVars.speed = +value
    })
}


export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}



