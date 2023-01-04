import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"
import BotCell from "./bot-cell"
import {Cell, CellAction} from "./types"
import CellPlants from "./cell-plants"
import {FourDirection} from "../../enums/four-direction"
import {minCellEnergy} from "./const"

// Общий класс для всех возможных ботов
export default abstract class Bot  {
    energy: number
    color: string
    abstract cells: BotCell[]
    engine: CellPlants

    // Вид бота. В первую очередь для определения возможности скрещивания
    abstract getBotKind(): string

    getCell(index: number): BotCell {
        return this.cells[index]
    }

    isCellAlive(index: number): boolean {
        return this.cells[index] && this.cells[index].alive
    }



    constructor(engine: CellPlants,
        position: Point,
        color: string,
        energy: number,
        direction: FourDirection,
        parentBot1?: Bot,
        parentBot2?: Bot) {
        this.color = randomColor()
        this.energy = energy
        this.engine = engine
        this.init(position, direction, parentBot1, parentBot2)
    }

    // Информация о ячейке окружающей среды
    getFieldCell(pos: Point): Cell | null {
        return this.engine.getFieldCell(pos)
    }

    // Создание начальной клетки
    abstract init(position: Point, direction: FourDirection, parentBot1?: Bot, parentBot2?: Bot): void


    public getCellsCount(): number {
        return this.cells.filter(cell => cell.alive).length
    }


    public getCellEnergy(): number {
        const cnt = this.getCellsCount()
        return cnt ? Math.floor(this.energy / cnt) : 0
    }

    // Получить команду действия клетки бота
    abstract getCellAction(cellIndex: number): CellAction

    // Реализуем команду действия клетки. Если она выполнима, то возвращаем true
    abstract doCellMainAction(cellIndex: number, param: number): boolean

    abstract getColor(): string


    kill(cellIndex: number): void {
        const e = this.getCellEnergy()
        // Убиваем рекурсивно сначала потомков
        if (this.cells[cellIndex].haveChildren()) {
            this.cells[cellIndex].children.forEach(child => {
                this.kill(child)
            })
        }
        this.energy -= e
        this.cells[cellIndex].alive = false
        // Треть энергии остается в почве, но не менее minCellEnergy
        this.engine.addEnergy(this.cells[cellIndex].position, Math.max(minCellEnergy, Math.floor(e / 3)))
    }




    //Нарисовать организм на поле
    public draw(ctx: CanvasRenderingContext2D): void {
        this.cells.forEach(cell => {
            cell.draw(ctx)
        })
    }


}