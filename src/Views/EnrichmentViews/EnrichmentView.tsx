import * as React from 'react'
import { Enrichment } from 'cuntent-assembler/dist';
import CuntentComponent from '../../Application/CuntentComponent';
import LocaleKeys from '../../Localize/Keys';
import { GenericAssetCollationView } from './CollationViews/GenericAssetCollationView';
import { SingleAtomicCollationView } from './CollationViews/SingleAtomicCollationView';

export class EnrichmentView extends CuntentComponent<{ enrichment: Enrichment }, {}> {
    drawGenerics = () => {
        return this.props.enrichment.generics.length == 0 
        ? this.localize(LocaleKeys.ASSET_COLLATION.NO_COLLATIONS)
        : this.props.enrichment.generics.map(collation => <GenericAssetCollationView key={collation.codepath} collation={collation} />)
    }

    drawSingleAtoms = () => {
        this.props.enrichment.unsin.length == 0 
        ? this.localize(LocaleKeys.ASSET_COLLATION.NO_COLLATIONS)
        : this.props.enrichment.unsin.map(collation => <SingleAtomicCollationView key={collation.codepath} collation={collation} />)
    }

    render() {
        return <div>
            { this.drawGenerics() }
            { this.drawSingleAtoms() }
        </div>
    }
}