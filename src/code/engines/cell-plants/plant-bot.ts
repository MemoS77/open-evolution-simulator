import {randomInt} from "../../funcs/buttons"
import {maxGenLength, minGenLength} from "./const"
import {CellAction, Genome} from "./types"
import {Direction} from "./enums"
import Point from "../../types/point"
import BotCellStem from "./bot-cell-stem"
import Bot from "./bot"
import BotCell from "./bot-cell"


export default class PlantBot extends Bot {
    // Общий регистр для всех клеток
    private rG = 0
    protected cells: BotCell[]
    private genome: Genome

    override getCellAction(): CellAction {
        return {
            kind: 0,
            param: 0
        }
    }

    override init(position: Point, direction: Direction) {
        this.rG = 0
        this.generateGenome()
        this.cells.push(new BotCellStem(
            direction,
            position,
            this
        ))
    }

    public generateGenome(): void {
        this.cells = []
        this.genome = []
        for (let g=0; g<5; g++) {
            this.genome[g] = []
            for (let i = 0; i < randomInt(minGenLength, maxGenLength); i++) {
                this.genome[g].push(Math.random())
            }
        }
    }

    getBotKind(): string {
        return "Plant Bot"
    }

}