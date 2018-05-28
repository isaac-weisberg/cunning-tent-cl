import * as React from 'react'
import LocaleKeys from '../../../Localize/Keys';
import { GenericCollationView } from './GenericCollationView';
import { GenericAtomicCollation } from 'cuntent-assembler/dist';

export class GenericAtomicCollationView<Type extends GenericAtomicCollation> extends GenericCollationView<Type> {
    drawRoot = () => {
        return <div>
           { this.localizePair(LocaleKeys.ASSET_COLLATION.ROOT, this.props.collation.root) }
        </div> 
    }

    draw = () => {
        return super.draw().concat([ this.drawRoot() ])
    }
}