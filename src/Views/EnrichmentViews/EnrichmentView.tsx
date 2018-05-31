import * as React from 'react'
import { Enrichment } from 'cuntent-assembler/dist';
import LocaleKeys from '../../Localize/Keys';
import { GenericAssetCollationView } from './CollationViews/GenericAssetCollationView';
import { SingleAtomicCollationView } from './CollationViews/SingleAtomicCollationView';
import { EditingSessionObjectView } from '../EditingSessionView/EditingSessionView';

export class EnrichmentView extends EditingSessionObjectView<Enrichment> {
    drawGenerics = () => {
        return this.props.object.generics.length == 0 
        ? this.localize(LocaleKeys.ASSET_COLLATION.NO_COLLATIONS)
        : this.props.object.generics.map(collation => <GenericAssetCollationView key={collation.codepath} collation={collation} />)
    }

    drawSingleAtoms = () => {
        this.props.object.unsin.length == 0 
        ? this.localize(LocaleKeys.ASSET_COLLATION.NO_COLLATIONS)
        : this.props.object.unsin.map(collation => <SingleAtomicCollationView key={collation.codepath} collation={collation} />)
    }

    render() {
        return <div>
            { this.drawGenerics() }
            { this.drawSingleAtoms() }
        </div>
    }
}