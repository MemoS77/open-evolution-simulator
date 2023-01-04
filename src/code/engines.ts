import Engine from "./engines/engine"
import SpaceGravityEngine from "./engines/space-gravity/space-gravity"
import SimpleEvo from "./engines/simple-evo/simple-evo"
import FullEvo from "./engines/full-evo/full-evo"

const engines: Engine[] = [
    new SpaceGravityEngine(),
    new SimpleEvo(),
    new FullEvo()
]

export default engines