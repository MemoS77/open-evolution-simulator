export enum CellActionKind {
    Idle,
    MainAction,
    Move,
    TurnLeft,
    TurnRight,
    Die, // Умереть и передать свою энергию предку
}



export enum BotKind {
    // Стволовая клетка
    Stem,

    // Листовая клетка
    Leaf,

    // Броня/рот/шип
    Armor,


}