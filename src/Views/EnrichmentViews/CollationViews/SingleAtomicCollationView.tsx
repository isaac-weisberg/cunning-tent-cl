import * as React from 'react'
import { GenericAtomicCollationView } from './GenericAtomicCollationView';
import { SingleAtomicCollation } from 'cuntent-assembler/dist';
import LocaleKeys from '../../../Localize/Keys';
import { SingleAtomicAssetView } from '../AssetViews/SingleAtomicAssetView';

export class SingleAtomicCollationView<Type extends SingleAtomicCollation> extends GenericAtomicCollationView<Type> {
    drawAssets = () => {
        return <div>
            { this.props.collation.assets.length == 0 
                ? this.localize(LocaleKeys.ENRICHMENT.ASSETS.NO_ASSETS)
                : this.props.collation.assets.map(asset => <SingleAtomicAssetView key={asset.key} asset={asset}/> )
            }
        </div>
    }

    draw = () => {
        return super.draw().concat( [ this.drawAssets() ] )
    }
}