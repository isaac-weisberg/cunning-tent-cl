import * as React from 'react'
import { LockableComponent, LockableComponentState } from '../Application/LockableComponent';
import { DirectoryFlow } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';

export interface DirectoryFlowViewProps {
    directoryFlow: DirectoryFlow
}

export class DirectoryFlowView extends LockableComponent<DirectoryFlowViewProps, LockableComponentState> {
    render() {
        let flow = this.props.directoryFlow

        return <div>
            { flow.error != null
                ? <CuntentErrorView error={flow.error} />
                : null 
            }
            { flow.path != null
                ? "Cuntent definition found at ".concat(flow.path)
                : "Cuntent definition not found."
            }
            { flow.project != null
                ? "Cuntent definition loaded"
                : "Cuntent definition not loaded"
            }
        </div>
    }
}