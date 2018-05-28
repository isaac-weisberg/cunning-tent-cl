import * as React from 'react'
import { GeneralAssetDeclaration } from 'cundef/dist';
import CuntentComponent from '../../../Application/CuntentComponent';
import LocaleKeys from '../../../Localize/Keys';

export default class DeclarationView extends CuntentComponent<{ decl: GeneralAssetDeclaration[] }, {}> {
    render() {
        return <div>
            <hr/>
            { this.localize(LocaleKeys.PROJECT.GENERALS) }
        </div>
    }
} 