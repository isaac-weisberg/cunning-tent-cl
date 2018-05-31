import * as React from 'react'
import CuntentComponent from '../../../Application/CuntentComponent';
import LocaleKeys from '../../../Localize/Keys'
import { GenericCollation } from 'cuntent-assembler/dist';

export class GenericCollationView<Type extends GenericCollation> extends CuntentComponent<{ collation: Type }, {}> {
    drawCodepath(): string|JSX.Element {
        return this.localizePair(LocaleKeys.ASSET_COLLATION.CODEPATH, this.props.collation.codepath)
    }

    drawStringKeys(): string|JSX.Element {
        return this.localizePair(LocaleKeys.ASSET_COLLATION.STRING_KEYS, JSON.stringify(this.props.collation.customStringKeys))
    }

    draw() {
        return [ <div> { this.drawCodepath() } { this.drawStringKeys() } </div> ]
    }

    render(): JSX.Element|JSX.Element[] {
        return this.draw() 
    }
}