import Engine from "./engines/engine"
import SpaceGravityEngine from "./engines/space-gravity/space-gravity"
import SimpleEvo from "./engines/simple-evo/simple-evo"
import CellPlants from "./engines/cell-plants/cell-plants"

const engines: Engine[] = [
    new SpaceGravityEngine(),
    new SimpleEvo(),
    new CellPlants()
]

export default engines