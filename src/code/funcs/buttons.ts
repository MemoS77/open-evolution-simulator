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



