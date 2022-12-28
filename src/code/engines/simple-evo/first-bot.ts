import Bot from "./bot"
import {ActionMode, Direction} from "./enums"
import {BotAction} from "./types"


export default class FirstBot extends Bot {
    isRelated(): boolean {
        return false
    }


    getAction(): BotAction {
        return {
            direction: Direction.Right,
            strength: 3,
            mode: ActionMode.Transfer
        }
    }
}