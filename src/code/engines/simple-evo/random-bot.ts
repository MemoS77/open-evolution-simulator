import Bot from "./bot"
import {BotAction} from "./types"
import {ActionMode, Direction} from "./enums"
import {randomInt} from "../../funcs/buttons"

export class RandomBot extends Bot  {

    getAction(): BotAction {
        return {
            direction: randomInt(0, Object.keys(Direction).length-1),
            mode: randomInt(0, Object.keys(ActionMode).length-1)
        }
    }

    init(): void {
        //
    }

    mutate(): boolean {
        return false
    }
}