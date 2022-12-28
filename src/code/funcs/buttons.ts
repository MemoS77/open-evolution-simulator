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


