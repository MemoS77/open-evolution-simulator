import EngineInfo from "./engine-info"

export default abstract class Engine {

    protected abstract info: EngineInfo

    getTitle(): string {
        return this.info.name + " " + this.info.version
    }

    /**
     * Work one life cycle of evolution
     */
    abstract nextStep(): void

    /**
     * Generate bots
     */
    protected abstract init(): void


}