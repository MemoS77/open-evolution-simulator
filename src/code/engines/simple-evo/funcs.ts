const max = 1000000

export function randID() {
    return Math.round((Math.random()-0.5)*max)
}