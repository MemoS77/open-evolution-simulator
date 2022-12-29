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

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


