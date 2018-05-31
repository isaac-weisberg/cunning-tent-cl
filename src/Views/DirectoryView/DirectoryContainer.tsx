import * as React from 'react'
import CuntentError from '../../Error/CuntentError';
import { Enrichment } from 'cuntent-assembler/dist';
import { EditingSession } from '../../Shack/EditingSession';
import { LockableComponentState, LockableComponent } from '../../Application/LockableComponent';
import { Components } from '../../Shack/Components';
import { CuntentErrorView } from '../CuntentErrorView';
import { EditingSessionView } from '../EditingSessionView/EditingSessionView';

export interface DirectoryContainerState extends LockableComponentState {
    error: CuntentError|null
    session: EditingSession<Enrichment>|null
}

export class DirectoryContainer extends LockableComponent<{ path: string }, DirectoryContainerState> {
    state: DirectoryContainerState = { locked: true, error: null, session: null }

    componentDidMount() {
        this.reload()
    }

    reload = () => {
        Components.createEnrichmentEditingSessionIn(this.props.path).then(session => {
            this.setState(prev => { return {locked: false, session: session } })
        }).catch(error => {
            this.setState(prev => { return { locked: false, error: error }})
        })
    }

    render() {
        return this.ifNotLocked(() => {
            return <div>
                { this.state.session != null
                    ? <EditingSessionView session={this.state.session} />
                    : null
                }
                < CuntentErrorView error={this.state.error} />
            </div>
        })
    }
}