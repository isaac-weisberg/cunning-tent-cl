import * as React from 'react'
import { DirectoryFlow } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';
import { ProjectContainer } from './ProjectViews/ProjectContainer';
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
            <ProjectContainer path={flow.path} project={flow.project} />
            <CuntentErrorView error={flow.error} />
        </div>
    }
}