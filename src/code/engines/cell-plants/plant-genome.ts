import {randomInt} from "../../funcs/buttons"
import {maxGenLength, minGenLength} from "./const"
import {CellAction} from "./types"
import {randomColor} from "../../funcs/utils"

export type GenCode = number[]

export interface Gen {
    code: GenCode
    rX: number
    rY: number
    rZ: number
    c: number
    color: string
}

export default class PlantGenome {
    rG: number
    color: string
    gens: Gen[]

    constructor(genome?: PlantGenome) {
        this.rG = 0
        const cnt = 5
        this.gens = Array(cnt)

        this.color = genome ? genome.color : randomColor()

        // Гены для новых клеток
        for (let i = 0; i < cnt; i++) {
            this.gens[i] = {
                code: genome ? [...genome.gens[i].code] : this.generateGen(),
                rX: 0,
                rY: 0,
                rZ: 0,
                c: 0,
                color: genome ? genome.gens[i].color : randomColor()
            }
        }
    }


    // Для клетки выдаем следующее действие по ее личной копии гена
    public getAction(gen: Gen): CellAction {
        const res = randomInt(1, 2) //gen.code[gen.c]%5
        gen.c++
        if (gen.c >= gen.code.length) {
            gen.c = 0
        }
        return {
            kind: res,
            param: gen.rX
        }
    }




    public generateGen(): GenCode {
        const gen: GenCode = []
        for (let i = 0; i < randomInt(minGenLength, maxGenLength); i++) {
            gen.push(randomInt(0, 32))
        }
        return gen
    }

}