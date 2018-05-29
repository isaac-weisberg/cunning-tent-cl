import * as React from 'react'
import { Enrichment } from 'cuntent-assembler/dist';
import CuntentComponent from '../../Application/CuntentComponent';
import LocaleKeys from '../../Localize/Keys';
import { GenericAssetCollationView } from './CollationViews/GenericAssetCollationView';
import { SingleAtomicCollationView } from './CollationViews/SingleAtomicCollationView';

export class EnrichmentView extends CuntentComponent<{ result: Enrichment }, {}> {
    drawGenerics = () => {
        return this.props.result.generics.length == 0 
        ? this.localize(LocaleKeys.ASSET_COLLATION.NO_COLLATIONS)
        : this.props.result.generics.map(collation => <GenericAssetCollationView key={collation.codepath} collation={collation} />)
    }

    drawSingleAtoms = () => {
        this.props.result.unsin.length == 0 
        ? this.localize(LocaleKeys.ASSET_COLLATION.NO_COLLATIONS)
        : this.props.result.unsin.map(collation => <SingleAtomicCollationView key={collation.codepath} collation={collation} />)
    }

    render() {
        return <div>
            { this.drawGenerics() }
            { this.drawSingleAtoms() }
        </div>
    }
}