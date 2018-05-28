import * as React from 'react'
import CuntentComponent from '../../Application/CuntentComponent';
import LocaleKeys from '../../Localize/Keys';

export class ProjectPathView extends CuntentComponent<{ path: string|null }, {}> {
    render() {
        return <div>
            { this.props.path != null
                ? this.localize(LocaleKeys.PROJECT.FOUND_AT).concat(this.props.path)
                : this.localize(LocaleKeys.PROJECT.NONE_FOUND)
            }
        </div>
    }
}