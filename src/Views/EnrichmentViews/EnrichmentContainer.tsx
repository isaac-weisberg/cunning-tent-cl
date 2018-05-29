import * as React from 'react'
import { Enrichment } from 'cuntent-assembler/dist';
import { GenericSearchResultsContainer } from '../Generic/GenericSearchView';
import { LockableComponentState } from '../../Application/LockableComponent';

export class EnrichmentContainer extends GenericSearchResultsContainer<Enrichment, LockableComponentState> {
    render() {
        return <div>
            { JSON.stringify(this.props.result) }
        </div>
    }
}