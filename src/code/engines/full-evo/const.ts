// Ген не может быть длиннее
export const maxGenLength = 64

// Максимально шагов прохода гена, если перебор, то простой
export const maxGenSteps = maxGenLength * 2

// Ген не может быть короче
export const minGenLength = 5

// Энергия нового бота
export const defMaxPhotoEnergy = 11

export const minPhotoEnergy = 1

export const maxCellOrganic = 5000

export const cellDieEnergyProp = 5

export const maxBotEnergy = 1000 // Организм не может набрать больше

export const newBotEnergy = maxBotEnergy

//export const criticalBotEnergy = 700 // Энергия после этого начинает расти не более чем на moveEnergy+1

export const idleEnergy = 1

export const moveEnergy = 5

export const turnEnergy = 2

export const dieEnergy = 3

export const mainActionEnergy = 3

// Минимальная энергия бота
export const minBotEnergy = Math.max(dieEnergy, idleEnergy, moveEnergy, turnEnergy, mainActionEnergy)

//export const maxHostCalc = 3

export const maxNotGrowSteps = 300

export const maxOrganicForPoison = maxCellOrganic
