import Engine from "./engines/engine"
import SpaceGravityEngine from "./engines/space-gravity/space-gravity"
import SimpleEvo from "./engines/simple-evo/simple-evo"
import FullEvo from "./engines/full-evo/full-evo"
import FullEvo2 from "./engines/full-evo/full-evo-2"

const engines: Engine[] = [
    new FullEvo(),
    new FullEvo2(),
    new SpaceGravityEngine(),
    new SimpleEvo(),

]

export default engines