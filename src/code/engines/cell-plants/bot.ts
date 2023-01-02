import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"
import BotCell from "./bot-cell"
import {Cell, CellAction} from "./types"
import CellPlants from "./cell-plants"
import {FourDirection} from "../../enums/four-direction"

// Общий класс для всех возможных ботов
export default abstract class Bot  {
    energy: number
    protected color: string
    abstract cells: BotCell[]
    private engine: CellPlants

    // Вид бота. В первую очередь для определения возможности скрещивания
    abstract getBotKind(): string

    getCell(index: number): BotCell {
        return this.cells[index]
    }



    constructor(engine: CellPlants, position: Point, color: string, energy: number, direction: FourDirection) {
        this.color = randomColor()
        this.energy = energy
        this.engine = engine
        this.init(position, direction)
    }




    // Информация о ячейке окружающей среды
    getFieldCell(pos: Point): Cell | null {
        return this.engine.getFieldCell(pos)
    }




    // Создание начальной клетки
    abstract init(position: Point, direction: FourDirection): void


    public getCellsCount(): number {
        return this.cells.length
    }


    public getCellEnergy(): number {
        return this.cells.length ? Math.floor(this.energy / this.getCellsCount()) : 0
    }

    // Получить команду действия клетки бота
    abstract getCellAction(cellIndex: number): CellAction


    kill(cellIndex: number): void {
        const e = this.getCellEnergy()
        // Убиваем рекурсивно сначала потомков
        if (this.cells[cellIndex].children.length) {
            this.cells[cellIndex].children.forEach(child => {
                this.kill(child)
            })
        }
        this.energy -= e
        // Треть энергии остается в почве
        this.engine.addEnergy(this.cells[cellIndex].position, Math.floor(e/3))
    }


    //Нарисовать организм на поле
    public draw(ctx: CanvasRenderingContext2D): void {
        this.cells.forEach(cell => {
            cell.draw(ctx, this.color)
        })
    }


}