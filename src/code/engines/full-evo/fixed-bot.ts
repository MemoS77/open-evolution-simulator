import Bot from "./bot"
import {CellAction, drawColors} from "./types"
import {randomInt} from "../../funcs/buttons"

/**
 * Пробный бот без генетических алгоритмов для проверки работы движка
 */
export default class FixedBot extends Bot {

    override getAction(): CellAction {
        return {kind: randomInt(0, 4), param: randomInt(0, 2)}
    }

    override init(): void {
        // Nothing
    }

    override  mergeStem(): void {
        // Nothing
    }

    override getID(): string {
        return "1"
    }

    override isSimilar(): boolean {
        return true
    }

    override getColors(): drawColors {
        return {
            color: "red",
            borderColor: "black"
        }
    }

}