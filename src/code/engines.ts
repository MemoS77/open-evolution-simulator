import Engine from "./engines/engine"
import SpaceGravityEngine from "./engines/space-gravity/space-gravity"
import SimpleEvo from "./engines/simple-evo/simple-evo"

const engines: Engine[] = [
    new SpaceGravityEngine(),
    new SimpleEvo(),
]

export default engines