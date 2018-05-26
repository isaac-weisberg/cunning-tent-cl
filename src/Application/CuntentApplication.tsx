import * as React from 'react'
import { Store, createStore } from 'redux'
import CuntentComponent from './CuntentComponent';
import CuntentStore, { reducers } from './CuntentStore'
import { Actions } from './Action';
import { Provider } from 'react-redux';
import RootView from '../Views/RootView';

export class CuntentApplication extends CuntentComponent<{}, {}> {
    store: Store<CuntentStore, Actions.Action>

    constructor(props: any) {
        super(props)

        this.store = createStore(reducers)
    }

    render() {
        return <Provider store={this.store}>
            <RootView />
        </Provider>
    }
}