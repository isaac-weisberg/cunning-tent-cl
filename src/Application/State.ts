import { combineReducers } from "redux";
import { Actions } from "./Action";

export const initial: CuntentStore = {
    currentPath: undefined
}

export default interface CuntentStore {
    currentPath: string|undefined
}

function path(state: string|undefined = undefined, action: Actions.Action) {
    if (Actions.isDirectoryChangeAction(action)) {
        return action.directory
    } else {
        return state
    }
}

export const reducers = combineReducers<CuntentStore, Actions.Action>({
    currentPath: path
})