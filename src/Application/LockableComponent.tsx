import CuntentComponent from "./CuntentComponent";

export interface LockableComponentState {
    locked: boolean
}

export class LockableComponent<P, S extends LockableComponentState> extends CuntentComponent<P, S> {
    render() {
        if (this.state.locked) {
            return "Wait a second, I am busy ;)"
        }
        return null
    }
}