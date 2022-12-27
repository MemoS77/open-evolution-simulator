import Field from "../types/field-info"
import fields from "../mock/fields"

export default function getFieldsStatic(engineName: string, engineVersion: number): Field[] {
    return fields.filter(f => f.compatibleEngines?.find(e => e.id === engineName && e.versions?.find(v => v === engineVersion)))
}