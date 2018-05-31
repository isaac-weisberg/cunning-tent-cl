import * as React from 'react'
import { GenericCollationView } from './GenericCollationView';
import { EnrichmentAssetView } from '../AssetViews/EnrichmentAssetView';
import { GenericAssetCollation } from 'cuntent-assembler/dist';
import LocaleKeys from '../../../Localize/Keys';

const styles: React.CSSProperties = {
    margin: 10
}

export class GenericAssetCollationView<Type extends GenericAssetCollation> extends GenericCollationView<Type> {
    drawAssets = () => {
        return <div>
            {  this.props.collation.assets.length == 0
                    ? this.localize(LocaleKeys.ENRICHMENT.ASSETS.NO_ASSETS)
                    : this.props.collation.assets.map(asset => <EnrichmentAssetView key={asset.key} asset={asset} />)
            }
        </div>
    }

    drawCodepath() {
        return <div style={{ fontSize: "120%", fontWeight: "bold" }}>
            { super.drawCodepath() }
        </div>
    }

    drawStringKeys() {
        return <div style={{ fontSize: "110%", fontWeight: "bold" }}>
            { super.drawStringKeys() }
        </div>
    }

    render() {
        return <div style={styles}>
            <hr/>
            { this.drawCodepath() }
            { this.drawStringKeys() }
            <hr/>
            { this.drawAssets() }
            <hr/>
        </div>
    }
}