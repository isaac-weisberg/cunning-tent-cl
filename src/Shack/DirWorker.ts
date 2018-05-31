import * as fs from 'fs'
import { Project } from 'cundef'
import CuntentError from '../Error/CuntentError';
import LocaleKeys from '../Localize/Keys';
import { join } from 'path'
import { JsonConvert } from 'json2typescript'
import { Enrichment } from 'cuntent-assembler/dist';
import { EditingSession, ObjectView, PathView } from './EditingSession';
import { EditingSessionObjectView, EditingSessionPathView } from '../Views/EditingSessionView/EditingSessionView';

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

    export function createEditingSessionForObjectAt<Type>(path: string, type: new () => Type, fileext: string, objectRenderer?: ObjectView<Type>, pathRenderer?: PathView): Promise<EditingSession<Type>> {
        return findFileEndingWithIn(path, fileext).then(fPath => {
            return EditingSession.load<Type>(fPath, type, objectRenderer, pathRenderer)
        })
    }
    
    export function findEnrichmentAt(path: string) {
        return createEditingSessionForObjectAt<Enrichment>(path, Enrichment, enrichmentFileExtension)
    }
    
    export function findProjectAt(path: string) {
        return createEditingSessionForObjectAt<Project>(path, Project, projectFileExtension)
    }
}
