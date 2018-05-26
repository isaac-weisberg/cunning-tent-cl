import { AnyAction } from 'redux'

export namespace Actions {
    export interface Action extends AnyAction {
        type: ActionType
    }
    
    export enum ActionType {
        DIR_CHANGE = 'DIR_CHANGE'
    }
    
    export interface DirectoryChangeAction extends Action {
        directory: string|null
    }

    export function isDirectoryChangeAction(action: Action): action is DirectoryChangeAction {
        return action.type == ActionType.DIR_CHANGE
    }

    export function changeDirectory(path: string|null): DirectoryChangeAction {
        return {
            type: ActionType.DIR_CHANGE,
            directory: path
        }
    }
}

