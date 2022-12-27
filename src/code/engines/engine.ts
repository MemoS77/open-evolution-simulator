import EngineState from "../enums/engine-state"

export default abstract class Engine {

    private state: EngineState = EngineState.UNSET

    getState(): EngineState {
        return this.state
    }

    /**
     * Start evolution
     */
    protected abstract doStart(): void

    /**
     * Pause evolution
     */
    protected abstract doPause(): void

    /**
     * Full evolution stop
     */
    protected abstract doStop(): void

    /**
     * Generate bots
     */
    protected abstract doInit(): void

    /**
     * Start evolution
     */
    start(): void {
        this.doStart()
        this.state = EngineState.RUNNING
    }

    /**
     * Pause evolution
     */
    pause(): void {
        this.doPause()
        this.state = EngineState.PAUSED
    }

    /**
     * Full evolution stop
     */
    stop(): void {
        this.doStop()
        this.state = EngineState.IDLE
    }

    /**
     * Generate bots
     */
    init(): void {
        this.doInit()
        this.state = EngineState.IDLE
    }

}