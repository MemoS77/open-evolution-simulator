import Bot from "./bot"
import {ActionMode, CellMode, Direction} from "./enums"
import {BotAction, Cell} from "./types"
import {randomInt} from "../../funcs/buttons"

const genomeLength = 30
const maxSteps = 100


export default class FirstBot extends Bot {

    private genome: number[]

    isRelated(): boolean {
        return false
    }


    /**
     * Получить действие которое должен совершить бот
     *
     */
    gid(n: number): number {
        return n % genomeLength
    }

    getDirection(pos: number): Direction {
        return this.gid(pos+1)%5
    }

    getAction(cells: Cell[][], bots: Bot[]): BotAction {
        let step = 0
        let current = 0
        let action: BotAction | null = null
        const sizeX = cells.length
        const sizeY = cells[0].length


        do {
            step++
            if (step > maxSteps)  action = {
                direction: Direction.Stay,
                mode: ActionMode.Move
            }
            else {
                const c = this.genome[current]
                switch (c) {
                case 0:
                    current = this.gid(current+1)
                    break
                case 1:
                    action = {
                        direction: this.getDirection(current+1),
                        mode: ActionMode.Move
                    }
                    break
                case 2:
                    action = {
                        direction: this.getDirection(current+1),
                        mode: ActionMode.Use
                    }
                    break
                case 3:
                    action = {
                        direction: this.getDirection(current+1),
                        mode: ActionMode.Transfer
                    }
                    break
                case 4:
                    const direction = this.genome[this.gid(current+1)]%5
                    let x = this.position.x
                    let y = this.position.y
                    switch (direction) {
                    case Direction.Up:
                        y--
                        break
                    case Direction.Down:
                        y++
                        break
                    case Direction.Left:
                        x--
                        break
                    case Direction.Right:
                        x++
                        break
                    }
                    let next = 1
                    if (x >= 0 && x < sizeX && y >= 0 && y < sizeY) {
                        const mode = cells[x][y].mode
                        if (mode === CellMode.UnbreakableBarrier) next = 1
                        else if (mode === CellMode.BreakableBarrier) next = 4
                        else if (mode === CellMode.Empty) {
                            const bot = bots.find(b => b.position.x === x && b.position.y === y)
                            if (bot) {
                                if (bot.isChild(this)) next = 6
                                if (bot.isRelated(this)) next = 7
                                else next = 5
                            } else {
                                if ((cells[x][y].energy > 0) || (cells[x][y].organic > 0)) next = 2
                                else next = 3
                            }
                        }
                    }
                    current = this.gid(current+next)
                    break
                default:
                    current = this.gid(current+c)
                    break
                }
            }
        } while (action === null)

        return action
    }

    init(): void {
        this.genome = []
        for (let i = 0; i < genomeLength; i++) {
            this.genome.push(randomInt(0, genomeLength-1))
        }
    }
}