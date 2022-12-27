import Field from "../types/field-info"
import getFieldsStatic from "../adapters/get-fields-static"

// TODO: In future fields can be stored in database
export default function getFields(engineName: string, engineVersion: number): Field[] {
    return getFieldsStatic(engineName, engineVersion)
}