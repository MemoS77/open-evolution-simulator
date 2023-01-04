import {CellAction} from "./types"
import Point from "../../types/point"
import Bot from "./bot"
import {FourDirection} from "../../enums/four-direction"
import PlantGenome from "./plant-genome"
import {BotCellKind} from "./enums"
import PlantBotCell from "./plant-bot-cell"



export default class PlantBot extends Bot {
    override cells: PlantBotCell[]
    private genome: PlantGenome




    override doCellMainAction(cellIndex: number, param: number): boolean {
        const cell = this.cells[cellIndex]

        switch (cell.getKind()) {
        case BotCellKind.Stem:
            const p = this.engine.pointByDirection(cell.position, cell.direction)
            if (p) {
                const fc = this.engine.getFieldCell(p)
                if (fc && !fc.bot) {
                    // Произвести новую клетку если свободно
                    cell.children.push(this.addCell( param%4, p, cell.direction))
                }
            }
            break
        }
        return false
    }

    override getCellAction(cellIndex: number): CellAction {
        const cell = this.cells[cellIndex]
        return this.genome.getAction(cell.gen)
    }


    addCell(kind: BotCellKind, position: Point, direction: FourDirection): number {
        const newBot = new PlantBotCell(
            direction,
            position,
            this,
            kind,
            this.genome.gens[kind]
        )
        this.engine.cells[position.x][position.y].bot = this
        const index = this.cells.length
        this.engine.cells[position.x][position.y].botCellIndex = this.cells.length
        this.cells.push(newBot)
        return index
    }

    override init(position: Point, direction: FourDirection, parentBot1?: PlantBot): void {
        this.genome = new PlantGenome(parentBot1?.genome)
        this.cells = []
        this.addCell(BotCellKind.Stem, position, direction)
    }


    getBotKind(): string {
        return "Plant Bot"
    }

    getColor(): string {
        return this.genome.color
    }

}