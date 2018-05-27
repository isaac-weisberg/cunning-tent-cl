import * as React from 'react'
import { DirectoryFlow } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';
import { RootDefinitionView } from './DefinitionViews/RootDefinitionView';
import { DefinitionPathView } from './DefinitionViews/DefinitionPathView';
import CuntentComponent from '../Application/CuntentComponent';

export interface DirectoryFlowViewProps {
    directoryFlow: DirectoryFlow|null
}

export class DirectoryFlowView extends CuntentComponent<DirectoryFlowViewProps, {}> {
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