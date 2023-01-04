import {FourDirection} from "../enums/four-direction"

export function randomColor(): string {
    return "#"+Math.floor(Math.random() * 16777215).toString(16)
}

export function turn4Left(direction: FourDirection): FourDirection {
    switch (direction) {
    case FourDirection.Up:
        return FourDirection.Left
    case FourDirection.Down:
        return FourDirection.Right
    case FourDirection.Left:
        return FourDirection.Down
    case FourDirection.Right:
        return FourDirection.Up
    }
}

export function turn4Right(direction: FourDirection): FourDirection {
    switch (direction) {
    case FourDirection.Up:
        return FourDirection.Right
    case FourDirection.Down:
        return FourDirection.Left
    case FourDirection.Left:
        return FourDirection.Up
    case FourDirection.Right:
        return FourDirection.Down
    }
}

export function invert4Direction(direction: FourDirection): FourDirection {
    switch (direction) {
    case FourDirection.Up:
        return FourDirection.Down
    case FourDirection.Down:
        return FourDirection.Up
    case FourDirection.Left:
        return FourDirection.Right
    case FourDirection.Right:
        return FourDirection.Left
    }
}