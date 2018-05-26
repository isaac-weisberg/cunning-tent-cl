import { combineReducers } from "redux";
import { Actions } from "./Action";

export const initial: CuntentStore = {
    currentPath: null
}

export default interface CuntentStore {
    currentPath: string|null
}

function path(state: string|null = null, action: Actions.Action) {
    if (Actions.isDirectoryChangeAction(action)) {
        return action.directory
    } else {
        return state
    }
}

export const reducers = combineReducers<CuntentStore, Actions.Action>({
    currentPath: path
})