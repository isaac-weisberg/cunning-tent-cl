import * as React from 'react'
import { SearchResults } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';
import { ProjectContainer } from './ProjectViews/ProjectContainer';
import CuntentComponent from '../Application/CuntentComponent';
import { Project } from 'cundef/dist';

export interface SearchResultsViewProps {
    results: SearchResults<Project>|null
}

export class SearchResultsView extends CuntentComponent<SearchResultsViewProps, {}> {
    render() {
        let flow = this.props.results
        if (flow == null) {
            return null
        }

        return <div>
            <ProjectContainer path={flow.path} project={flow.object} />
            <CuntentErrorView error={flow.error} />
        </div>
    }
}