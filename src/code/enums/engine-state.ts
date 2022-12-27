enum EngineState {
    // Bots not generated, running can not be started
    UNSET,
    IDLE, // Bots generated, ready to begin
    RUNNING, // Evolution in progress
    PAUSED, // Paused
}

export default EngineState