import * as fs from 'fs'
import { Project } from 'cundef'
import CuntentError from '../Error/CuntentError';
import LocaleKeys from '../Localize/Keys';
import { join } from 'path'
import { JsonConvert } from 'json2typescript'
import { Enrichment } from 'cuntent-assembler/dist';
import { EditingSession } from './EditingSession';

export namespace DirWorker {
    const projectFileExtension = ".cundef"
    const enrichmentFileExtension = ".cuntent"
    
    const errors = {
        notFoundError: () => new CuntentError(LocaleKeys.DIR_WORKER.NOT_FOUND),
        searchError: err => new CuntentError(LocaleKeys.DIR_WORKER.SEARCH_ERROR, err),
    }
    
    function findFileEndingWithIn(path: string, ending: string): Promise<string> {
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
                    reject(errors.notFoundError())
                    return
                }
                fulfill(join(path, cundefs))
            })
        })
    }

    function findObjectAt<Type>(path: string, type: any, fileext: string): Promise<EditingSession<Type>> {
        return findFileEndingWithIn(path, fileext).then(fPath => {
            return EditingSession.load<Type>(fPath, type)
        })
    }
    
    export function findEnrichmentAt(path: string) {
        return findObjectAt<Enrichment>(path, Enrichment, enrichmentFileExtension)
    }
    
    export function findProjectAt(path: string) {
        return findObjectAt<Project>(path, Project, projectFileExtension)
    }
}
