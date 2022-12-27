import EngineInfo from "../engine-info"
import Engine from "../engine"

export default class BasicEngine extends Engine {
    info: EngineInfo = {
        name: "Basic",
        version: "0.1",
        description: "Experimental engine"
    }

    protected init(): void {
        console.log("Init")
    }

    nextStep(): void {
        console.log("Step")
    }
}