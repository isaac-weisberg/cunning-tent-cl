import * as fs from 'fs'
import { JsonConvert } from 'json2typescript'
import { Enrichment } from "cuntent-assembler/dist";
import CuntentError from '../Error/CuntentError';
import LocaleKeys from '../Localize/Keys';

function serialize<Type>(instance: Type): string {
    let convert = new JsonConvert()
    let data: any
    try {
        let object = convert.serialize(instance)
        data = JSON.stringify(object)
    } catch(error) {
        throw errors.serializationError(error)
    }
    return data
}

function parse<Type>(buffer: Buffer, type: any): Type {
    let convert = new JsonConvert()
    let obj: Type
    try {
        let string = buffer.toString()
        let json = JSON.parse(string)
        obj = convert.deserialize(json, type)
    } catch(error) {
        throw errors.parsingError(error)
    }
    return obj
}

const errors = {
    readError: err => new CuntentError(LocaleKeys.SESSION.READ_ERROR, err),
    writeError: err => new CuntentError(LocaleKeys.SESSION.WRITE_ERROR, err),
    parsingError: err => new CuntentError(LocaleKeys.SESSION.PARSING_ERROR, err),
    serializationError: err => new CuntentError(LocaleKeys.SESSION.PARSING_ERROR, err)
}

export class EditingSession<Type> {
    static load<Type>(path: string, type: any): Promise<EditingSession<Type>> {
        return new Promise((fulfill, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(errors.readError(err))
                    return
                }
                let obj: Type
                try {
                    obj = parse(data, type)
                } catch(error) {
                    reject(error)
                    return
                }
                let session = new EditingSession(obj, path, type)
                fulfill(session)
            })
        })
    }

    constructor(enrichment: Type, path: string, type: any) {
        this.enrichment = enrichment
        this.path = path
        this.type = type
    }

    save = () => {
        return new Promise<void>((fulfill, reject) => {
            let data: string
            try {
                data = serialize(this.enrichment)
            } catch(error) {
                reject(error)
                return
            }
            fs.writeFile(this.path, data, err => {
                if (err) {
                    reject(errors.writeError(err))
                    return
                }
            })
        })
    }

    private type: any
    path: string
    enrichment: Type
}