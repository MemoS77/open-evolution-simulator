import {randomInt} from "../../funcs/buttons"
import {maxGenLength, minGenLength} from "./const"
import {CellAction, Genome} from "./types"
import Point from "../../types/point"
import BotCellStem from "./bot-cell-stem"
import Bot from "./bot"
import BotCell from "./bot-cell"
import {FourDirection} from "../../enums/four-direction"


export default class PlantBot extends Bot {
    // Общий регистр для всех клеток
    private rG = 0
    override cells: BotCell[]
    private genome: Genome

    override getCellAction(): CellAction {
        return {
            kind: 2,
            param: 0
        }
    }

    override init(position: Point, direction: FourDirection) {
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