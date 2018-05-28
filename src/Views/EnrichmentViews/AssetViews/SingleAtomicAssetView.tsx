import * as React from 'react'
import { SingleAtomicAsset } from 'cuntent-assembler/dist';
import { EnrichmentAssetView } from './EnrichmentAssetView';
import LocaleKeys from '../../../Localize/Keys';

export class SingleAtomicAssetView<Type extends SingleAtomicAsset> extends EnrichmentAssetView<Type> {
    drawAssets = () => {
        return <div>
            { this.localizePair(LocaleKeys.ENRICHMENT.ASSETS.PATH, this.props.asset.path) }
        </div>
    }

    draw = () => {
        return super.draw().concat(this.drawAssets())
    }
}