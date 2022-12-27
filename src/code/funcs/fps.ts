let lastPerfomance = performance.now()

export function getFPS() {
    const now = performance.now()
    const d= (now - lastPerfomance)
    if (d) {
        const fps = Math.round(1000 / (now - lastPerfomance))
        lastPerfomance = now
        return fps
    }
    return 60
}


export function drawFPS(ctx: CanvasRenderingContext2D) {
    ctx.fillText(getFPS() + " fps", 10, 26)
}