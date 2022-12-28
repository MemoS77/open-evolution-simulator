export default class Color {
    r: number
    g: number
    b: number

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
    }

    getRGB(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    glue(color: Color, prop: number): string {
        if (prop < 0) prop = 0
        if (prop > 1) prop = 1
        this.r = this.r * prop + color.r * (1 - prop)
        this.g = this.g * prop + color.g * (1 - prop)
        this.b = this.b * prop + color.b * (1 - prop)
        return this.getRGB()
    }
}