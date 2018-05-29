import * as React from 'react'
import { Enrichment } from 'cuntent-assembler/dist';
import { LockableComponentState } from '../../Application/LockableComponent';
import { GenericContainer } from '../Generic/GenericContainer';
import { EnrichmentView } from './EnrichmentView';
import { Localize } from '../../Localize/Localize';
import LocaleKeys from '../../Localize/Keys';
import { DirWorker } from '../../Shack/DirWorker';

export const EnrichmentContainer = (props: { result: DirWorker.SearchResults<Enrichment> }) => {
    return <GenericContainer view={EnrichmentView}  result={props.result} pathStrings={{ ifNull: Localize.shared.get(LocaleKeys.ENRICHMENT.NONE_FOUND), prepend: Localize.shared.get(LocaleKeys.ENRICHMENT.FOUND_AT)}} ifNoResult={Localize.shared.get(LocaleKeys.ENRICHMENT.NONE_LOADED)}  />
}