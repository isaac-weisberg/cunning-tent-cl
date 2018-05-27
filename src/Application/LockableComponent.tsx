import * as React from 'react'
import CuntentComponent from "./CuntentComponent";

export interface LockableComponentState {
    locked: boolean
}

export class LockableComponent<P, S extends LockableComponentState> extends CuntentComponent<P, S> {
    ifNotLocked = (actions: () => JSX.Element|null) => {
        if (!this.state.locked) {
            return actions()
        }
        return <div> Wait a second, I am busy ;)</div>
    }
}