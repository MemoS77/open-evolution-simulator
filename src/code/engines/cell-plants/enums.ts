export enum Direction {
    Up,
    Down,
    Left,
    Right
}



export enum CellActionKind {
    Idle,
    MainAction,
    Move,
    SelfDestruct,
}



export enum BotCellKind {
    // Стволовая клетка
    Stem,

    // Листовая клетка
    Leaf,

    // Рот
    Mouth,

    // Репродуктивная клетка
    Reprod,

    // Боевая клетка
    Armor,

}