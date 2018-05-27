import * as React from 'react'
import { LockableComponentState, LockableComponent } from '../Application/LockableComponent';
import { DirectoryFlow, directoryFlowAt, DirWorkerError } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';
import { DirectoryFlowView } from './DirectoryFlowView';

export interface DirectoryViewProps {
    path: string
}

export interface DirectoryViewState extends LockableComponentState {
    results: DirectoryFlow|null
    error: DirWorkerError|null
}

export class DirectoryView extends LockableComponent<DirectoryViewProps, DirectoryViewState> {
    constructor(props) {
        super(props)
        this.state = {
            locked: true,
            results: null,
            error: null
        }
        this.reload(props.path)
    }

    reload = path => {
        this.setState(prev => {
            return {
                locked: true,
                results: prev.results,
                error: prev.error
            }
        })
        directoryFlowAt(path).then(flow => {
            this.setState(prev => {
                return {
                    locked: false,
                    results: flow,
                    error: null
                }
            })
        }).catch(error => {
            this.setState(prev => {
                return {
                    locked: false,
                    results: null,
                    error: error
                }
            })
        })
    }

    render() {
        return this.ifNotLocked(() => {
            return <div>
                <DirectoryFlowView directoryFlow={this.state.results} />
                <CuntentErrorView error={this.state.error}/>
                { this.state.error == null && this.state.results == null
                    ? "Nothing happened yet."
                    : null
                }
            </div>
        })
    }
}
