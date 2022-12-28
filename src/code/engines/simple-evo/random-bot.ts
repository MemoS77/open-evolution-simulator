import Bot from "./bot"
import {BotAction} from "./types"
import {ActionMode, Direction} from "./enums"
import {randomInt} from "../../funcs/buttons"

export class RandomBot extends Bot  {

    isRelated(): boolean {
        return false
    }

    getAction(): BotAction {
        return {
            direction: randomInt(0, Object.keys(Direction).length-1),
            strength: 5,
            mode: randomInt(0, Object.keys(ActionMode).length-1)
        }
    }
}