// Ген не может быть длиннее
export const maxGenLength = 100

// Максимально шагов прохода гена, если перебор, то простой
export const maxGenSteps = 100

// Ген не может быть короче
export const minGenLength = 10

// Энергия нового бота
export const newBotEnergy = 400

export const defMaxPhotoEnergy = 11

export const minPhotoEnergy = 1

export const maxCellOrganic = 1000

export const maxBotEnergy = 500 // Организм не может набрать больше

//export const criticalBotEnergy = 700 // Энергия после этого начинает расти не более чем на moveEnergy+1

export const idleEnergy = 1

export const moveEnergy = 4

export const turnEnergy = 2

export const mainActionEnergy = 4


// Минимальная энергия бота
export const minBotEnergy = Math.max(idleEnergy, moveEnergy, turnEnergy, mainActionEnergy)

//export const maxHostCalc = 3

export const maxNotGrowSteps = 150

export const maxOrganicForPoison = maxCellOrganic //900
