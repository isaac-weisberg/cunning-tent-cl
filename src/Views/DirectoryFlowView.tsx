import * as React from 'react'
import { LockableComponent, LockableComponentState } from '../Application/LockableComponent';
import { DirectoryFlow } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';
import { RootDefinitionView } from './DefinitionViews/RootDefinitionView';

export interface DirectoryFlowViewProps {
    directoryFlow: DirectoryFlow|null
}

export class DirectoryFlowView extends LockableComponent<DirectoryFlowViewProps, LockableComponentState> {
    render() {
        let flow = this.props.directoryFlow
        if (flow == null) {
            return null
        }

        return <div>
            <CuntentErrorView error={flow.error} />
            { flow.path != null
                ? "Cuntent definition found at ".concat(flow.path)
                : "Cuntent definition not found."
            }
            <RootDefinitionView definition={flow.project} />
        </div>
    }
}