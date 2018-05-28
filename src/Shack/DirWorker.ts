import * as fs from 'fs'
import { Project } from 'cundef'
import CuntentError from '../Error/CuntentError';
import LocaleKeys from '../Localize/Keys';
import { join } from 'path'
import { JsonConvert } from 'json2typescript'

export class DirWorkerError extends CuntentError { }

const errors = {
    searchError: err => new DirWorkerError(LocaleKeys.DIR_WORKER.SEARCH_ERROR, err),
    readError: err => new DirWorkerError(LocaleKeys.DIR_WORKER.READ_ERROR, err),
    parsingError: err => new DirWorkerError(LocaleKeys.DIR_WORKER.PARSING_ERROR, err),
}

function findFileEndingWithIn(path: string, ending: string): Promise<string|null> {
    return new Promise((fulfill, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(errors.searchError(err))
                return
            }
            let cundefs = files.find(value => {
                return value.endsWith(ending)
            })
            if (cundefs == undefined) {
                fulfill(null)
                return
            }
            fulfill(join(path, cundefs))
        })
    })
}

export function readCundefIn(path: string|null): Promise<Project|null> {
    if (path == null) {
        return new Promise(fulfill => fulfill(null))
    }
    return new Promise((fulfill, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(errors.readError(err))
                return
            }
            let convert = new JsonConvert()
            let obj: Project
            try {
                let string = data.toString()
                let json = JSON.parse(string)
                obj = convert.deserialize(json, Project)
            } catch(error) {
                reject(errors.parsingError(error))
                return
            }
            fulfill(obj)
        })
    })
}

export interface DirectoryFlow {
    path: string|null
    project: Project|null
    error: DirWorkerError|null
}

export function directoryFlowAt(path: string): Promise<DirectoryFlow> {
    let foundPath: string|null = null

    return findFileEndingWithIn(path, ".cundef").then(path => {
        foundPath = path
        return readCundefIn(path)
    }).then(project => {
        return {
            path: foundPath,
            project: project,
            error: null
        }
    }).catch(err => {
        return {
            path: foundPath,
            project: null,
            error: err
        }
    })
}