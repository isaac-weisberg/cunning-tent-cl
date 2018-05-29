import * as fs from 'fs'
import { Project } from 'cundef'
import CuntentError from '../Error/CuntentError';
import LocaleKeys from '../Localize/Keys';
import { join } from 'path'
import { JsonConvert } from 'json2typescript'
import { Enrichment } from 'cuntent-assembler/dist';

export class DirWorkerError extends CuntentError { }

export namespace DirWorker {
    const projectFileExtension = ".cundef"
    const enrichmentFileExtension = ".cuntent"
    
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
    
    function readObjectFromJson<Type extends Object>(path: string, type: any): Promise<Type> {
        return new Promise((fulfill, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(errors.readError(err))
                    return
                }
                let convert = new JsonConvert()
                let obj: Type
                try {
                    let string = data.toString()
                    let json = JSON.parse(string)
                    obj = convert.deserialize(json, type)
                } catch(error) {
                    reject(errors.parsingError(error))
                    return
                }
                fulfill(obj)
            })
        })
    }
    
    function readObjectIn<Type>(path: string|null, type: any): Promise<Type|null> {
        if (path == null) {
            return new Promise(fulfill => fulfill(null))
        }
        return readObjectFromJson<Type>(path, type)
    }
    
    export interface SearchResults<Type> {
        path: string|null
        object: Type|null
        error: DirWorkerError|null
    }
    
    function findObjectAt<Type>(path: string, type: any, fileext: string): Promise<SearchResults<Type>> {
        let foundPath: string|null = null
    
        return findFileEndingWithIn(path, projectFileExtension).then(path => {
            foundPath = path
            return readObjectIn<Type>(path, type)
        }).then(project => {
            return {
                path: foundPath,
                object: project,
                error: null
            }
        }).catch(err => {
            return {
                path: foundPath,
                object: null,
                error: err
            }
        })
    }
    
    export function findEnrichmentAt(path: string) {
        return findObjectAt<Enrichment>(path, Enrichment, enrichmentFileExtension)
    }
    
    export function findProjectAt(path: string) {
        return findObjectAt<Project>(path, Project, projectFileExtension)
    }
}
