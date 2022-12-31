import BotCell from "./bot-cell"
import {randomInt} from "../../funcs/buttons"
import {maxGenomeLength, minGenomeLength, newBotEnergy} from "./const"
import {Genome} from "./types"
import {BotCellKind} from "./enums"
import Point from "../../types/point"
import {randomColor} from "../../funcs/utils"


export default class PlantBot  {
    private rG = 0
    private energy: number
    cells: BotCell[] = []
    private genome: Genome = []
    private color: string


    constructor(position: Point, energy?: number,  direction?: number) {
        this.color = randomColor()
        this.energy = energy ?? newBotEnergy
        this.rG = 0
        this.generateGenome()
        this.cells.push(new BotCell(BotCellKind.Stem, direction ?? randomInt(0, 3), position, this.energy, null))
    }

    public generateGenome(): void {
        this.cells = []
        for (let g=0; g<4; g++) {
            this.genome[g] = []
            for (let i = 0; i < randomInt(minGenomeLength, maxGenomeLength); i++) {
                this.genome[g].push(Math.random())
            }
        }
    }

    public getCellEnergy(): number {
        return this.energy / this.cells.length
    }




}