import TestEngine from "./engines/basic/test-engine"
import Engine from "./engines/engine"
import SpaceGravityEngine from "./engines/space-gravity/space-gravity"

const engines: Engine[] = [
    new TestEngine(),
    new SpaceGravityEngine()
]

export default engines