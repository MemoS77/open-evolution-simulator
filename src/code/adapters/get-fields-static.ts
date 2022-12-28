import EngineParams from "../types/engine-params"
import fields from "../mock/fields"

export default function getFieldsStatic(engineName: string, engineVersion: number): EngineParams[] {
    return fields.filter(f => f.compatibleEngines?.find(e => e.id === engineName && e.versions?.find(v => v === engineVersion)))
}