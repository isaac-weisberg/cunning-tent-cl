import * as React from 'react'
import { Enrichment } from 'cuntent-assembler/dist';
import { GenericSearchResultsContainer } from '../Generic/GenericSearchView';
import { LockableComponentState } from '../../Application/LockableComponent';
import { GenericContainer } from '../Generic/GenericContainer';
import { EnrichmentView } from './EnrichmentView';
import { Localize } from '../../Localize/Localize';
import LocaleKeys from '../../Localize/Keys';

export const EnrichmentContainer = (props: { path: string, result: Enrichment }) => {
    return <GenericContainer view={EnrichmentView} path={props.path} result={props.result} pathStrings={{ ifNull: Localize.shared.get(LocaleKeys.ENRICHMENT.NONE_FOUND), prepend: Localize.shared.get(LocaleKeys.ENRICHMENT.FOUND_AT)}} ifNoResult={Localize.shared.get(LocaleKeys.ENRICHMENT.NONE_LOADED)}  />
}