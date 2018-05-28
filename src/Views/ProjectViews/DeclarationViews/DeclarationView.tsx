import * as React from 'react'
import { GeneralAssetDeclaration } from 'cundef/dist';
import CuntentComponent from '../../../Application/CuntentComponent';
import LocaleKeys from '../../../Localize/Keys';

export class DeclarationView extends CuntentComponent<{ decl: GeneralAssetDeclaration }, {}> {
    render() {
        return <div style={{backgroundColor: "#ddffff"}}>
            { this.localize(LocaleKeys.ASSET_DECLARATION.TITLE).concat(': ', this.props.decl.title) } <br/>
            { this.localize(LocaleKeys.ASSET_DECLARATION.CODEPATH).concat(': ', this.props.decl.codepath) } <br/>
            { this.localize(LocaleKeys.ASSET_DECLARATION.CLASSNAME).concat(': ', this.props.decl.classname) } <br/>
            { this.localize(LocaleKeys.ASSET_DECLARATION.STRING_KEYS).concat(': ', JSON.stringify(this.props.decl.stringKeys)) } <br/>
        </div>
    }
}