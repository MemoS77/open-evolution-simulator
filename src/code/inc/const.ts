import Camera from "../types/camera"

export type GlobalVars = {
    showMode: number,
    filterMode: number,
    speed: number,
    camera: Camera
}

export const infoFont = "normal 11pt Roboto"
export const globalVars: GlobalVars = {
    showMode: 0,
    filterMode: 0,
    speed: 1,
    camera: {
        x: 0,
        y: 0,
        zoom: 1
    }
}