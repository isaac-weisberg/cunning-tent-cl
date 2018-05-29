import * as React from 'react'
import CuntentComponent from '../../Application/CuntentComponent';
import { GenericSearchView } from '../Generic/GenericSearchView';
import { DirWorker } from '../../Shack/DirWorker';
import { ProjectContainer } from '../ProjectViews/ProjectContainer';
import { EnrichmentContainer } from '../EnrichmentViews/EnrichmentContainer';

export class DirectoryContainer extends CuntentComponent<{ path: string }, {}> {
    render() {
        return <div>
            <GenericSearchView path={this.props.path} searcher={DirWorker.findProjectAt} view={ProjectContainer} />
            <GenericSearchView path={this.props.path} searcher={DirWorker.findEnrichmentAt} view={EnrichmentContainer} />
        </div>
    }
}