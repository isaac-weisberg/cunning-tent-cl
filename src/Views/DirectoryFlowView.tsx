import * as React from 'react'
import { LockableComponent, LockableComponentState } from '../Application/LockableComponent';
import { DirectoryFlow } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';
import { RootDefinitionView } from './DefinitionViews/RootDefinitionView';
import { DefinitionPathView } from './DefinitionViews/DefinitionPathView';

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
            <DefinitionPathView path={flow.path} />
            <RootDefinitionView definition={flow.project} />
        </div>
    }
}