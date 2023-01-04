// Ген не может быть длиннее
export const maxGenLength = 256

// Максимально шагов прохода гена, если перебор, то простой
export const maxGenSteps = 300

// Ген не может быть короче
export const minGenLength = 10

// Энергия нового бота
export const newBotEnergy = 300

// Энергия от солнца не более на одну свободную клетку
export const maxPhotoEnergy = 12

export const maxCellOrganic = 100

export const idleEnergy = 1

export const moveEnergy = 3

export const turnEnergy = 2

export const mainActionEnergy = 3

// - минимальная энергия бота
export const minBotEnergy = Math.min(idleEnergy, moveEnergy, turnEnergy, mainActionEnergy)

