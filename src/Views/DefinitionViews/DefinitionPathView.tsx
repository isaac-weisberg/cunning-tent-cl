import * as React from 'react'
import CuntentComponent from '../../Application/CuntentComponent';
import LocaleKeys from '../../Localize/Keys';

export class DefinitionPathView extends CuntentComponent<{ path: string|null }, {}> {
    render() {
        return <div>
            { this.props.path != null
                ? this.localize(LocaleKeys.DEFININITION.FOUND_AT).concat(this.props.path)
                : this.localize(LocaleKeys.DEFININITION.NONE_FOUND)
            }
        </div>
    }
}