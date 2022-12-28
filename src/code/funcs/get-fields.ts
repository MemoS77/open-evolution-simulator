import EngineParams from "../types/engine-params"
import getFieldsStatic from "../adapters/get-fields-static"

// TODO: In future fields can be stored in database
export default function getFields(engineName: string, engineVersion: number): EngineParams[] {
    return getFieldsStatic(engineName, engineVersion)
}