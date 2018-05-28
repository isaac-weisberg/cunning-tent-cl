import * as React from 'react'
import { GeneralAssetDeclaration } from 'cundef/dist';
import CuntentComponent from '../../../Application/CuntentComponent';
import LocaleKeys from '../../../Localize/Keys';

export default class DeclarationArrayView extends CuntentComponent<{ decl: GeneralAssetDeclaration[] }, {}> {
    render() {
        return <div>
            <hr/>
            { this.localize(LocaleKeys.PROJECT.GENERALS) } <br/>
            { this.props.decl.length == 0 
                ? this.localize(LocaleKeys.ASSET_DECLARATION.NO_DECLARATIONS)
                : "cool"
            }
        </div>
    }
} 