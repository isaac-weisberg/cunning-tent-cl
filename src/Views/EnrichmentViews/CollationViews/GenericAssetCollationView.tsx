import * as React from 'react'
import { GenericCollationView } from './GenericCollationView';
import { EnrichmentAssetView } from '../AssetViews/EnrichmentAssetView';
import { GenericAssetCollation } from 'cuntent-assembler/dist';
import LocaleKeys from '../../../Localize/Keys';

export class GenericAssetCollationView<Type extends GenericAssetCollation> extends GenericCollationView<Type> {
    drawAssets = () => {
        return <div>
            {  this.props.collation.assets.length == 0
                    ? this.localize(LocaleKeys.ENRICHMENT.ASSETS.NO_ASSETS)
                    : this.props.collation.assets.map(asset => <EnrichmentAssetView key={asset.key} asset={asset} />)
            }
        </div>
    }

    draw() {
        return super.draw().concat(this.drawAssets())
    }
}