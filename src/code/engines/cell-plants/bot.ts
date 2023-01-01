import {Direction} from "./enums"
import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"
import BotCell from "./bot-cell"
import {CellAction} from "./types"

// Общий класс для всех возможных ботов
export default abstract class Bot  {
    energy: number
    protected color: string
    protected abstract cells: BotCell[]

    // Вид бота. В первую очередь для определения возможности скрещивания
    abstract getBotKind(): string

    getCell(index: number): BotCell {
        return this.cells[index]
    }

    constructor(position: Point, color: string, energy: number, direction: Direction) {
        this.color = randomColor()
        this.energy = energy
        this.init(position, direction)
    }

    // Создание начальной клетки
    abstract init(position: Point, direction: Direction): void


    public getCellsCount(): number {
        return this.cells.length
    }


    public getCellEnergy(): number {
        return this.cells.length ? Math.floor(this.energy / this.getCellsCount()) : 0
    }

    // Итоговое действи клетки бота
    abstract getCellAction(cellIndex: number): CellAction


    //Нарисовать организм на поле
    public draw(ctx: CanvasRenderingContext2D): void {
        this.cells.forEach(cell => {
            cell.draw(ctx, this.color)
        })
    }


}