// Ген не может быть длиннее
export const maxGenLength = 256

// Максимально шагов прохода гена, если перебор, то простой
export const maxGenSteps = 150

// Ген не может быть короче
export const minGenLength = 10

// Энергия нового бота
export const newBotEnergy = 300

// Энергия от солнца не более на одну свободную клетку
export const maxPhotoEnergy = 15

export const maxCellOrganic = 700

export const maxBotEnergy = 1000 // При переполнении энергии организм погибает

//export const criticalBotEnergy = 700 // Энергия после этого начинает расти не более чем на moveEnergy+1

export const idleEnergy = 1

export const moveEnergy = 4

export const turnEnergy = 2

export const mainActionEnergy = 3

// Минимальная энергия бота
export const minBotEnergy = Math.max(idleEnergy, moveEnergy, turnEnergy, mainActionEnergy)

export const maxHostCalc = 3

export const maxNotGrowSteps = 200

export const maxOrganicForPoison = 600
