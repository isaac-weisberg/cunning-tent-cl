import * as React from 'react'
import { EnrichmentAsset } from 'cuntent-assembler/dist';
import CuntentComponent from '../../../Application/CuntentComponent';
import LocaleKeys from '../../../Localize/Keys';
import { CustomStringFieldArrayView } from '../CustomStringField/CustomStringFieldArrayView';

export class EnrichmentAssetView<Type extends EnrichmentAsset> extends CuntentComponent<{ asset: Type }, {}> {
    drawKey = () => {
        return this.localizePair(LocaleKeys.ENRICHMENT.ASSETS.KEY, this.props.asset.key)
    }

    drawFields = () => {
        return <CustomStringFieldArrayView fields={this.props.asset.customStringFields} />
    }

    draw = () => {
        return [ <div>
            { this.drawKey() }
            { this.drawFields() }
        </div>]
    }

    render() {
        return this.draw()
    }
}